/**
 * The Seer without a model: what /api/tarot-chat answers while no
 * ANTHROPIC_API_KEY is set (production before the key is connected, and
 * local dev). Same NDJSON protocol as the model path, real draws from the
 * deck, and replies written from the card meanings in src/data/tarot.ts.
 * Costs nothing, so it skips the rate limiter; connecting a key switches
 * the endpoint to the model with no other change.
 */

import type { ChatEvent, ChatMessage, Draw, SpreadId } from '../../src/lib/tarot/contract'
import { CARD_BY_ID, SPREADS, type TarotCard } from '../../src/data/tarot'
import { drawSpread } from '../../src/lib/tarot/draw'

type DrawnRef = Draw['cards'][number]
type Placed = { card: TarotCard; ref: DrawnRef; label: string }

const pick = <T,>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)]
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const sense = (p: Placed) => (p.ref.reversed ? p.card.meaningRev : p.card.meaningUp)
const keys = (p: Placed) => (p.ref.reversed ? p.card.keywordsRev : p.card.keywordsUp)
const named = (p: Placed) => `${p.card.name}${p.ref.reversed ? ', reversed' : ''}`

/** Words that ask for a fresh draw even with cards already on the table. */
const DRAW_ASK = /\b(draw|pull|lay|spread|three|another card|new card|a card|one card)\b/i
/** Looser cues for a first draw: most questions deserve cards. */
const THREE_CUE = /\b(three|past|future|career|job|work|situation|relationship|love|spread|bigger picture)\b/i
const ONE_CUE = /\b(card|draw|pull|reading|read|tarot|day|today|guidance|should|will|how|what|why)\b/i

function placed(draw: Draw): Placed[] {
  const spread = SPREADS.find((s) => s.id === draw.spread) ?? SPREADS[0]
  return draw.cards.flatMap((ref) => {
    const card = CARD_BY_ID.get(ref.id)
    const pos = spread.positions.find((p) => p.id === ref.position)
    return card ? [{ card, ref, label: pos?.label ?? ref.position }] : []
  })
}

function cardsNamedIn(text: string): TarotCard[] {
  const lower = text.toLowerCase()
  return [...CARD_BY_ID.values()]
    .filter((c) => lower.includes(c.name.toLowerCase()))
    .sort((a, b) => lower.indexOf(a.name.toLowerCase()) - lower.indexOf(b.name.toLowerCase()))
}

const CLOSERS = [
  'What part of this feels most true right now?',
  'Where do you already feel this stirring in your life?',
  'What would change if you took this seriously this week?',
]

function readingText(cards: Placed[]): string {
  if (cards.length === 1) {
    const [c] = cards
    return [
      `${named(c)}. ${cap(sense(c))}.`,
      `This card leans on ${keys(c)[0]} and ${keys(c)[1]}. Hold it up against your question and notice where it lands, not where you want it to.`,
      pick(CLOSERS),
    ].join('\n\n')
  }
  const lines = cards.map((c) => `${c.label}: ${named(c)}. ${cap(sense(c))}.`)
  const [past, present, future] = cards
  return [
    ...lines,
    `Read together: ${past.card.name} set the stage, ${present.card.name} is the work in front of you, and ${future.card.name} is where this leads if nothing shifts. The thread between them is ${keys(present)[0]}.`,
    pick(CLOSERS),
  ].join('\n\n')
}

/** Answers about cards already on the table, keyed on the common asks. */
function tableAnswer(question: string, cards: Placed[]): string {
  const q = question.toLowerCase()
  const reversed = cards.find((c) => c.ref.reversed)
  const upright = [...cards].reverse().find((c) => !c.ref.reversed)
  const last = cards[cards.length - 1]
  const anchor = reversed ?? cards[0]

  if (/sit with|tonight|reflect/.test(q)) {
    return `Sit with ${anchor.card.name}. ${cap(sense(anchor))}. Before you sleep, ask yourself where ${keys(anchor)[0]} is showing up for you right now.`
  }
  if (/act on|do next|next step|one thing/.test(q)) {
    return `Start with ${last.card.name}. It asks for ${keys(last)[0]}, so choose one small, concrete move toward it this week and let the rest follow.`
  }
  if (/warn|careful|watch/.test(q)) {
    return reversed
      ? `The caution is in ${reversed.card.name}, reversed: ${sense(reversed)}. Watch for ${keys(reversed).join(', ')}.`
      : `No card here is reversed, so the caution is a gentle one. ${anchor.card.name} in the ${anchor.label.toLowerCase()} shows what happens when ${keys(anchor)[0]} goes unexamined; don't let it repeat.`
  }
  if (/hope|bright|good/.test(q)) {
    const c = upright ?? last
    return `The hope sits with ${c.card.name}. ${cap(c.card.meaningUp)}. That is the door the cards leave open.`
  }
  if (/know if|working|sign/.test(q)) {
    return `You'll know when ${keys(last)[0]} starts to feel ordinary rather than effortful. That is ${last.card.name} arriving.`
  }
  if (/not seeing|missing|blind|hidden/.test(q)) {
    return `Look at ${anchor.card.name} again, especially its quieter note of ${keys(anchor)[2]}. It is easy to overlook because it asks something of you.`
  }
  return `Look again at the cards on the table: ${cards.map((c) => c.card.name).join(', ')}. The answer is in how they lean on each other, and ${anchor.card.name} is where I would start. What do you notice first?`
}

function cardAnswer(asked: TarotCard[], cards: Placed[]): string {
  if (asked.length >= 2) {
    const [a, b] = asked
    const pa = cards.find((c) => c.card.id === a.id)
    const pb = cards.find((c) => c.card.id === b.id)
    const ka = pa ? keys(pa) : a.keywordsUp
    const kb = pb ? keys(pb) : b.keywordsUp
    return `From ${a.name} to ${b.name}: loosen your grip on ${ka[0]} and let ${kb[0]} take its place. The bridge between them is ${kb[1]}, practiced a little each day.`
  }
  const c = asked[0]
  const onTable = cards.find((p) => p.card.id === c.id)
  const base = `${c.name}. Upright, ${c.meaningUp}. Reversed, ${c.meaningRev}.`
  if (!onTable) return `${base} Its keywords are ${c.keywordsUp.join(', ')}.`
  return `${base} In your spread it sits in the ${onTable.label.toLowerCase()} position, ${onTable.ref.reversed ? 'reversed' : 'upright'}, so lean on that reading: ${keys(onTable).join(', ')}.`
}

export function templatedReply(history: ChatMessage[]): Response {
  const last = history[history.length - 1]
  const question = last?.role === 'user' ? last.text : ''
  const latest = [...history].reverse().find((m) => m.role === 'reader' && m.draw)
  const table = latest?.role === 'reader' && latest.draw ? placed(latest.draw) : []
  const asked = cardsNamedIn(question)
  const withoutNames = asked.reduce((s, c) => s.replace(new RegExp(c.name, 'gi'), ''), question)

  let spreadId: SpreadId | null = null
  if (!asked.length || DRAW_ASK.test(withoutNames)) {
    if (!table.length || DRAW_ASK.test(withoutNames)) {
      spreadId = THREE_CUE.test(withoutNames) ? 'three' : ONE_CUE.test(withoutNames) ? 'one' : null
    }
  }

  const encoder = new TextEncoder()
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: ChatEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'))
      const say = async (text: string) => {
        for (const word of text.split(/(?<= )/)) {
          send({ t: 'text', d: word })
          await sleep(18)
        }
      }
      if (spreadId) {
        await say(
          spreadId === 'three'
            ? pick(['Three cards, then: what was, what is, what may come.', 'Let me lay out the past, the present, and the road ahead.'])
            : pick(['Let me pull a single card for you.', 'One card, then. Let us see what the deck offers.']),
        )
        const spread = SPREADS.find((s) => s.id === spreadId) ?? SPREADS[0]
        const draw: Draw = {
          spread: spreadId,
          cards: drawSpread(spread).map((d) => ({ id: d.card.id, position: d.position.id, reversed: d.reversed })),
        }
        await sleep(400)
        send({ t: 'draw', draw })
        await sleep(600)
        await say(readingText(placed(draw)))
      } else if (asked.length) {
        await say(cardAnswer(asked, table))
      } else if (table.length) {
        await say(tableAnswer(question, table))
      } else {
        await say('The candles are lit. Tell me what is on your mind, or ask me to pull a card, and I will lay a spread for it.')
      }
      send({ t: 'done' })
      controller.close()
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
