/**
 * Quick replies under a finished reading: three follow-ups built from the
 * cards just drawn, client-side and free. Each one is sent as the visitor's
 * next message, so the Seer answers it like anything typed. Deduped against
 * what was already asked, topped up from general follow-ups so there are
 * always three.
 */

import { CARD_BY_ID } from '../../data/tarot'
import type { ChatMessage, Draw } from './contract'

const COUNT = 3

const FALLBACKS = [
  'What should I sit with tonight?',
  'What is one thing I can act on?',
  'What is this reading warning me about?',
  'Where is the hope in this?',
  'How will I know if this is working?',
  'What am I not seeing yet?',
]

const cardName = (id: string) => CARD_BY_ID.get(id)?.name ?? id

function fromDraw(draw: Draw): string[] {
  const out: string[] = []
  // Reversed cards first: they are the ones that invite the question.
  const cards = [...draw.cards].sort((a, b) => Number(b.reversed) - Number(a.reversed))
  const ask = (c: Draw['cards'][number]) =>
    c.reversed ? `Why is ${cardName(c.id)} reversed here?` : `What does ${cardName(c.id)} ask of me?`

  out.push(ask(cards[0]))
  if (draw.cards.length >= 3) {
    const past = draw.cards.find((c) => c.position === 'past') ?? draw.cards[0]
    const future = draw.cards.find((c) => c.position === 'future') ?? draw.cards[draw.cards.length - 1]
    out.push(`How do I get from ${cardName(past.id)} to ${cardName(future.id)}?`)
    out.push(ask(cards[1]))
  } else {
    out.push('Lay three cards on this for the bigger picture')
  }
  return out
}

/**
 * Three follow-ups after the Seer's latest reply, drawn from the most recent
 * reading in the sitting (so they keep coming while those cards are on the
 * table). None until a reading has happened.
 */
export function quickReplies(messages: ChatMessage[]): string[] {
  if (messages[messages.length - 1]?.role !== 'reader') return []
  const reading = [...messages].reverse().find((m) => m.role === 'reader' && m.draw)
  if (!reading || reading.role !== 'reader' || !reading.draw) return []
  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => m.text.trim().toLowerCase()))
  const seen = new Set<string>()
  return [...fromDraw(reading.draw), ...FALLBACKS]
    .filter((q) => {
      const key = q.toLowerCase()
      if (asked.has(key) || seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, COUNT)
}
