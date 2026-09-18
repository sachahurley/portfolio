/**
 * Canned reading generator: the offline half of the tarot reader. Builds the
 * exact Reading shape the serverless function returns, so the page renders
 * both through one path and a failed (or rate-limited, or absent) API is
 * invisible to the visitor.
 *
 * Reads okay rather than generic because the per-card meanings in
 * src/data/tarot.ts are real sentences; the templates only frame them.
 * Variation is seeded from the drawn card ids, so a given draw always
 * produces the same canned text (stable across re-renders), while different
 * draws phrase things differently.
 */

import type { Reading } from './contract'
import type { DrawnCard } from './draw'

/** Small string hash -> mulberry32, plenty for picking template variants. */
function seedFrom(cards: DrawnCard[]): () => number {
  let h = 2166136261
  for (const d of cards) {
    for (const ch of `${d.card.id}:${d.reversed ? 'r' : 'u'}`) {
      h ^= ch.charCodeAt(0)
      h = Math.imul(h, 16777619)
    }
  }
  let a = h >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const GREETINGS = [
  'The candles settle. The cards are willing tonight; let us see what they hold.',
  'Sit. The deck has been waiting, and it does not wait idly.',
  'The cards come warm to the hand. Something wishes to be said.',
  'Quiet, now. The spread takes shape, and shapes do not lie.',
]

const FAREWELLS = [
  'The cards rest. Carry what serves; leave the rest on the table.',
  'That is what the spread offers. The rest is walking.',
  'The candle gutters; the reading is done. Return when the road turns.',
  'Take this gently. Cards counsel; they do not command.',
]

/** Per-position framings; {name} is the card, {meaning} its sense. */
const POSITION_TEMPLATES: Record<string, string[]> = {
  guidance: [
    'For the matter at hand, {name} rises: {meaning}. Let that sit before it is argued with.',
    '{name} answers the table. It speaks of {meaning}, and it rarely speaks idly.',
    'One card, plainly given: {name}. Here is {meaning}, offered as a lantern, not a map.',
  ],
  past: [
    'In what has passed, {name} lies: {meaning}. The road behind was shaped by it.',
    'The past shows {name}. In it lies {meaning}, whether or not it was named at the time.',
    'Behind stands {name}: {meaning}. It explains more than it excuses.',
  ],
  present: [
    'In the present, {name} sits squarely: {meaning}. This is the ground now stood upon.',
    'Now turns {name}. The hour holds {meaning}, and asks it be seen clearly.',
    'The present card is {name}: {meaning}. Not a verdict; a weather report.',
  ],
  future: [
    'Ahead waits {name}: {meaning}. A tendency, not a sentence; the walking still matters.',
    'The road forward shows {name}. It leans toward {meaning}, if the present course holds.',
    'For what comes, {name} turns up: {meaning}. Meet it prepared and it softens.',
  ],
}

const SYNTHESIS_TEMPLATES = [
  'Taken together, the spread leans on {kw0}. Beneath it runs {kw1}, quieter but steady. Hold both and the way through is narrower than it looks, and kinder.',
  'The thread between the cards is {kw0}. Where it frays, {kw1} shows through. Neither is the whole story; together they are most of it.',
  'Read as one hand, the cards weigh {kw0} against {kw1}. The balance is unfinished on purpose; it waits on a choice not yet made.',
]

function pick<T>(rng: () => number, list: T[]): T {
  return list[Math.floor(rng() * list.length)]
}

function fill(template: string, name: string, meaning: string): string {
  return template.replaceAll('{name}', name).replaceAll('{meaning}', meaning)
}

export function fallbackReading(cards: DrawnCard[]): Reading {
  const rng = seedFrom(cards)
  const greeting = pick(rng, GREETINGS)
  const farewell = pick(rng, FAREWELLS)

  const cardReadings = cards.map((d) => {
    const templates = POSITION_TEMPLATES[d.position.id] ?? POSITION_TEMPLATES.guidance
    const meaning = d.reversed ? d.card.meaningRev : d.card.meaningUp
    const name = d.reversed ? `${d.card.name}, reversed` : d.card.name
    return {
      position: d.position.id,
      cardId: d.card.id,
      text: fill(pick(rng, templates), name, meaning),
    }
  })

  // Two keywords from different cards where possible, first-and-last so a
  // three-card spread synthesizes its ends.
  const kwOf = (d: DrawnCard) =>
    pick(rng, d.reversed ? d.card.keywordsRev : d.card.keywordsUp)
  const first = cards[0]
  const last = cards[cards.length - 1]
  const kw0 = kwOf(first)
  let kw1 = kwOf(last)
  if (kw1 === kw0) kw1 = kwOf(last)
  const synthesis = pick(rng, SYNTHESIS_TEMPLATES)
    .replaceAll('{kw0}', kw0)
    .replaceAll('{kw1}', kw1)

  return { greeting, cards: cardReadings, synthesis, farewell }
}
