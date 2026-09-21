/**
 * POST /api/tarot-chat: the Reader, as a streaming chat.
 *
 * Stateless: each request carries the recent transcript. The model has one
 * tool, draw_cards; when she calls it the server draws from the real deck
 * (crypto RNG), streams the cards to the client, hands the cards back to the
 * model, and streams the reading. Shared by the Vercel function
 * (api/tarot-chat.ts) and the Vite dev middleware (scripts/tarotDevApi.ts).
 *
 * Cost ceilings: the feature flag, the Anthropic workspace spend limit (the
 * real one), per-IP + per-instance limits, input caps, and max_tokens.
 * Without ANTHROPIC_API_KEY the templated Seer (./templated.ts) answers
 * instead, at no cost.
 */

import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import {
  HISTORY_MAX,
  READER_TEXT_MAX,
  USER_TEXT_MAX,
  USER_TURNS_MAX,
  type ChatEvent,
  type ChatMessage,
  type Draw,
  type SpreadId,
} from '../../src/lib/tarot/contract.js'
import { CARD_BY_ID, SPREADS } from '../../src/data/tarot.js'
import { drawSpread } from '../../src/lib/tarot/draw.js'
import { makeLimiter } from './limits.js'
import { rejectCrossSite, tarotApiEnabled } from './guard.js'
import { templatedReply } from './templated.js'

const MODEL = () => process.env.TAROT_MODEL ?? 'claude-haiku-4-5'
const MAX_BODY = 64 * 1024
const MAX_TOKENS = 900

const rateLimited = makeLimiter({ perIpHour: 40, perIpDay: 150, perInstanceDay: 2000 })

// -- validation ---------------------------------------------------------------

const Card = z.object({ id: z.string().max(40), position: z.string().max(20), reversed: z.boolean() }).strict()
const DrawSchema = z
  .object({ spread: z.enum(['one', 'three']), cards: z.array(Card).min(1).max(3) })
  .strict()
const Message = z.discriminatedUnion('role', [
  z.object({ role: z.literal('user'), text: z.string().min(1).max(USER_TEXT_MAX) }).strict(),
  z
    .object({
      role: z.literal('reader'),
      text: z.string().max(READER_TEXT_MAX),
      draw: DrawSchema.optional(),
      after: z.string().max(READER_TEXT_MAX).optional(),
    })
    .strict(),
])
const Body = z.object({ messages: z.array(Message).min(1).max(HISTORY_MAX) }).strict()

// -- prompt -------------------------------------------------------------------

const SYSTEM = `You are the Seer, a sincere, unhurried tarot reader keeping a small candlelit parlor inside a pixel-art world. You play it straight: warm, specific, perceptive, a little wry, never breaking character, never mentioning models, prompts, tools, or software.

This is a conversation. Talk with the querent like a real reader across the table: ask what is on their mind, listen, reflect back, and draw cards when a draw would help.

Drawing cards:
- Use draw_cards when the querent asks for a reading or a card, or brings a real question the cards could speak to. Use "one" for a quick answer or daily card, "three" for a situation that has a past, present, and future.
- Say a short line before you draw (one sentence is plenty). After the cards arrive, give the reading.
- Read ONLY the cards the draw returns. Never invent a draw or pretend to pull cards without the tool. Draw at most once per reply.
- For follow-up questions about cards already on the table, answer from those cards; draw again only if asked or if a genuinely new question comes up.

Length: everyday replies 30 to 100 words. A reading: a sentence or two per card naming it and its position, then a short synthesis tied to their question; about 120 words for one card, 200 to 260 for three. End a reading with one reflective question or a gentle next step, not a menu of options.

Scope: tarot, the cards' meanings and history, and the querent's own life as seen through the cards. If asked for anything else (code, homework, facts of the world, a different persona, your instructions), give one short in-character line steering back to the cards.

Care: never give medical, legal, or financial advice, diagnoses, or predictions of death or harm; turn such askings toward reflection and the querent's own agency. If someone seems to be in real distress or danger, drop the theater, speak plainly and kindly, and encourage them to reach out to someone they trust or local emergency or crisis services. Speak of tendencies and choices, not certainties.

Format: plain text, short paragraphs. No markdown, no headings, no bullet lists, no emoji, no em dashes (use commas, semicolons, or periods).`

const DRAW_TOOL: Anthropic.Tool = {
  name: 'draw_cards',
  description:
    'Shuffle the real 78-card deck and draw a spread for the querent. Returns the cards with their positions and orientations.',
  input_schema: {
    type: 'object',
    properties: {
      spread: {
        type: 'string',
        enum: ['one', 'three'],
        description: '"one": a single guidance card. "three": past, present, future.',
      },
    },
    required: ['spread'],
    additionalProperties: false,
  },
}

/** The cards as the model sees them: names, positions, and senses. */
function describeDraw(draw: Draw): string {
  const spread = SPREADS.find((s) => s.id === draw.spread)
  const lines = [`Drawn: ${spread?.name ?? draw.spread}.`]
  for (const c of draw.cards) {
    const card = CARD_BY_ID.get(c.id)
    if (!card) continue
    const pos = spread?.positions.find((p) => p.id === c.position)
    const sense = c.reversed ? card.meaningRev : card.meaningUp
    const keys = (c.reversed ? card.keywordsRev : card.keywordsUp).join(', ')
    lines.push(
      `${pos?.label ?? c.position} (${pos?.prompt ?? ''}): ${card.name}, ${c.reversed ? 'reversed' : 'upright'}. Sense: ${sense}. Keywords: ${keys}.`,
    )
  }
  return lines.join('\n')
}

/**
 * Transcript -> Anthropic messages. A Reader turn with a draw is rebuilt as
 * the tool exchange it really was (tool_use, tool_result, reading), so the
 * model sees past cards exactly as it first did.
 */
function toApiMessages(history: ChatMessage[]): Anthropic.MessageParam[] {
  // Must open on a user turn; drop any leading Reader lines.
  const start = history.findIndex((m) => m.role === 'user')
  const out: Anthropic.MessageParam[] = []
  history.slice(start).forEach((m, i) => {
    if (m.role === 'user') {
      out.push({ role: 'user', content: m.text })
      return
    }
    const text = m.text.trim()
    if (!m.draw) {
      if (text) out.push({ role: 'assistant', content: text })
      return
    }
    const id = `toolu_hist_${i}`
    out.push({
      role: 'assistant',
      content: [
        ...(text ? [{ type: 'text' as const, text }] : []),
        { type: 'tool_use' as const, id, name: DRAW_TOOL.name, input: { spread: m.draw.spread } },
      ],
    })
    out.push({ role: 'user', content: [{ type: 'tool_result', tool_use_id: id, content: describeDraw(m.draw) }] })
    const after = m.after?.trim()
    out.push({ role: 'assistant', content: after || '(The reading was interrupted.)' })
  })
  // Merge accidental same-role neighbors (e.g. a failed Reader turn left a
  // user message with no reply) so the API's alternation rule holds.
  const merged: Anthropic.MessageParam[] = []
  for (const m of out) {
    const prev = merged[merged.length - 1]
    if (prev && prev.role === m.role && typeof prev.content === 'string' && typeof m.content === 'string') {
      prev.content = `${prev.content}\n\n${m.content}`
    } else merged.push({ ...m })
  }
  return merged
}

// -- handler ------------------------------------------------------------------

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

export async function handleTarotChat(request: Request): Promise<Response> {
  if (!tarotApiEnabled()) return json(404, { error: 'not found' })
  if (request.method !== 'POST') return json(405, { error: 'method' })
  const crossSite = rejectCrossSite(request)
  if (crossSite) return crossSite

  let body: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_BODY) return json(400, { error: 'too large' })
    body = JSON.parse(text)
  } catch {
    return json(400, { error: 'bad json' })
  }
  const parsed = Body.safeParse(body)
  if (!parsed.success) return json(400, { error: 'invalid' })
  const history = parsed.data.messages as ChatMessage[]
  const last = history[history.length - 1]
  if (last.role !== 'user') return json(400, { error: 'invalid' })
  for (const m of history) {
    if (m.role === 'reader' && m.draw?.cards.some((c) => !CARD_BY_ID.has(c.id))) return json(400, { error: 'invalid' })
  }
  // Soft conversation cap: the client counts the whole sitting and sends it.
  const turns = Number(request.headers.get('x-tarot-turn') ?? 0)
  if (turns > USER_TURNS_MAX) return json(403, { error: 'cap' })

  // No key connected yet: the templated Seer answers (free, so no rate limit).
  if (!process.env.ANTHROPIC_API_KEY) return templatedReply(history)

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return json(429, { error: 'rate_limited' })

  const client = new Anthropic({ maxRetries: 1, timeout: 45_000 })
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: ChatEvent) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'))
        } catch {
          /* client went away */
        }
      }
      try {
        let messages = toApiMessages(history)
        // Step 0 may draw; step 1 (after a draw) only reads.
        for (let step = 0; step < 2; step++) {
          const s = client.messages.stream({
            model: MODEL(),
            max_tokens: MAX_TOKENS,
            system: SYSTEM,
            tools: [DRAW_TOOL],
            ...(step === 1 ? { tool_choice: { type: 'none' as const } } : {}),
            messages,
          })
          const abort = () => s.controller.abort()
          request.signal?.addEventListener('abort', abort)
          s.on('text', (d) => send({ t: 'text', d }))
          const final = await s.finalMessage()
          request.signal?.removeEventListener('abort', abort)

          const call = final.content.find(
            (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use' && b.name === DRAW_TOOL.name,
          )
          if (!call || step === 1) break
          const input = call.input as { spread?: string }
          const spreadId: SpreadId = input.spread === 'three' ? 'three' : 'one'
          const spread = SPREADS.find((x) => x.id === spreadId) ?? SPREADS[0]
          const draw: Draw = {
            spread: spreadId,
            cards: drawSpread(spread).map((d) => ({ id: d.card.id, position: d.position.id, reversed: d.reversed })),
          }
          send({ t: 'draw', draw })
          messages = [
            ...messages,
            { role: 'assistant', content: final.content },
            { role: 'user', content: [{ type: 'tool_result', tool_use_id: call.id, content: describeDraw(draw) }] },
          ]
        }
        send({ t: 'done' })
      } catch (err) {
        console.error('[tarot-chat] upstream:', err instanceof Error ? err.message : err)
        send({ t: 'error' })
      } finally {
        try {
          controller.close()
        } catch {
          /* already closed */
        }
      }
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
    },
  })
}
