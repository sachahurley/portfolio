/**
 * Dev-only stand-in Reader, served by scripts/tarotDevApi.ts when no
 * ANTHROPIC_API_KEY is set. Speaks the same NDJSON protocol as
 * api/_lib/chat.ts and draws from the real deck, but the words are canned
 * templates, so the whole parlor flow is testable without a key or spend.
 * No rate limit here, on purpose: it costs nothing.
 */

import type { ChatEvent, ChatMessage, Draw, SpreadId } from '../src/lib/tarot/contract'
import { CARD_BY_ID, SPREADS } from '../src/data/tarot'
import { drawSpread } from '../src/lib/tarot/draw'

const THREE = /\b(three|past|future|career|job|work|situation|relationship|love|spread)\b/i
const ONE = /\b(card|draw|pull|reading|read|tarot|day|today|guidance|question)\b/i

function pickSpread(text: string): SpreadId | null {
  if (THREE.test(text)) return 'three'
  if (ONE.test(text)) return 'one'
  return null
}

function reading(draw: Draw, question: string): string {
  const spread = SPREADS.find((s) => s.id === draw.spread) ?? SPREADS[0]
  const parts = draw.cards.map((c) => {
    const card = CARD_BY_ID.get(c.id)
    const pos = spread.positions.find((p) => p.id === c.position)
    if (!card) return ''
    const sense = c.reversed ? card.meaningRev : card.meaningUp
    const keys = (c.reversed ? card.keywordsRev : card.keywordsUp).join(', ')
    return `In ${pos?.label ?? c.position}, ${pos?.prompt ?? ''}, sits ${card.name}${c.reversed ? ', reversed' : ''}. ${sense[0].toUpperCase()}${sense.slice(1)}. Think ${keys}.`
  })
  return [
    ...parts,
    `Taken together, the cards speak to "${question.slice(0, 80)}" as a matter of where you place your attention next.`,
    'What part of this feels most true to you right now?',
    '(Practice reading: the dev server has no API key, so these words are templated from the card meanings.)',
  ].join('\n\n')
}

export async function handleMockChat(request: Request): Promise<Response> {
  let history: ChatMessage[] = []
  try {
    history = ((await request.json()) as { messages?: ChatMessage[] }).messages ?? []
  } catch {
    return new Response(JSON.stringify({ error: 'bad json' }), { status: 400 })
  }
  const last = history[history.length - 1]
  const question = last?.role === 'user' ? last.text : ''
  const spreadId = pickSpread(question)

  const encoder = new TextEncoder()
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: ChatEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'))
      const say = async (text: string) => {
        for (const word of text.split(/(?<= )/)) {
          send({ t: 'text', d: word })
          await sleep(25)
        }
      }
      if (!spreadId) {
        await say('The candles are steady. Tell me what is on your mind, or ask me to pull a card, and I will lay them out for you.')
      } else {
        await say(spreadId === 'three' ? 'Let me lay out three cards: what was, what is, what may come.' : 'Let me pull a single card for you.')
        const spread = SPREADS.find((s) => s.id === spreadId) ?? SPREADS[0]
        const draw: Draw = {
          spread: spreadId,
          cards: drawSpread(spread).map((d) => ({ id: d.card.id, position: d.position.id, reversed: d.reversed })),
        }
        await sleep(400)
        send({ t: 'draw', draw })
        await sleep(600)
        await say(reading(draw, question))
      }
      send({ t: 'done' })
      controller.close()
    },
  })
  return new Response(stream, {
    status: 200,
    headers: { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-cache' },
  })
}
