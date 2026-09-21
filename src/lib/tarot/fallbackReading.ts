/**
 * Canned parlor text: the offline half of the Reader. When the API is
 * absent, failing, rate-limited, or closed for the night, these keep the
 * parlor in fiction; no error UI exists on purpose.
 *
 * The fallback reading is prose (v2 renders readings as flowing text).
 * It reads okay rather than generic because the per-card meanings in
 * src/data/tarot.ts are real sentences; the templates only frame them.
 * Variation is seeded from the drawn card ids, so a given draw always
 * produces the same canned text, while different draws phrase things
 * differently.
 */

import type { DrawnCard } from './draw'

/** In-fiction lines for when a chat turn fails: the candle falters but the
 *  audience continues (the visitor may ask again). */
export const CHAT_FALTERS = [
  'The candle gutters; the Reader waits for the flame to steady. Ask again in a moment.',
  'The Reader tilts her head, listening to something far off. The words did not reach her.',
  'A draft moves through the parlor and the cards shiver. Whatever was said is lost to it.',
] as const

/** The gentler line for a rate limit: the Reader needs a moment. */
export const BREATHER_LINE = 'The Reader needs a moment; the parlor has been busy tonight.'

/** The parlor is closed (kill switch or the nightly budget breaker). */
export const CLOSED_LINE = 'The parlor is closed for the night; the candles are out. Return with the day.'

/** In-fiction closers for when the audience truly ends (cap reached). */
export const CHAT_CLOSERS = [
  'The cards have said what they will say tonight; sit with them a while.',
  'The candles gutter; the Reader folds her hands. The rest is yours to walk.',
  'She turns her palm over the spread: what you seek is already in the cards before you.',
] as const

/** Rotating canned greetings for a fresh thread (no API call, §3.6). */
export const GREETING_LINES = [
  'Sit. The deck has been waiting, and it does not wait idly. What brings you to the table?',
  'The candles settle as you take the chair. Speak, or let the cards open the matter.',
  'The Reader looks up as though she expected you at this exact hour. What is on your mind?',
  'Warm your hands; the parlor keeps its own weather. Tell me what walks with you tonight.',
] as const

/** Starter prompts offered under the greeting of an empty thread. */
export const STARTER_PROMPTS = [
  'What should I be paying attention to right now?',
  'Read the road ahead for me.',
  'I have a decision I keep circling.',
  'What does the deck make of a first-time visitor?',
  'Something ended recently. Help me sit with it.',
  'Draw whatever the night calls for.',
  'What am I not seeing about my work?',
  'Ask the cards about what I left behind.',
  'Where is my energy best spent this season?',
  'I do not believe in this. Convince the cards otherwise.',
  'What follows me from the past?',
  'Give me one card and one hard truth.',
] as const

export function pickFrom(list: readonly string[]): string {
  return list[Math.floor(Math.random() * list.length)]
}

export function chatFallback(): string {
  return pickFrom(CHAT_FALTERS)
}

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

/** Positions without a dedicated set (the wider spreads) lead with their
 *  label, which reads cleanly whatever the label is. */
const GENERIC_TEMPLATES = [
  '{label}: {name}. It carries {meaning}, and asks to be taken plainly.',
  '{label}: {name} turns up. Here lies {meaning}.',
  '{label}: the deck sets down {name}. Read in it {meaning}.',
]

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

/** The canned reading as one prose passage (v2's reading shape). */
export function fallbackProse(cards: DrawnCard[]): string {
  const rng = seedFrom(cards)
  const parts: string[] = [pick(rng, GREETINGS)]

  for (const d of cards) {
    const templates = POSITION_TEMPLATES[d.position.id] ?? GENERIC_TEMPLATES
    const meaning = d.reversed ? d.card.meaningRev : d.card.meaningUp
    const name = d.reversed ? `${d.card.name}, reversed` : d.card.name
    parts.push(fill(pick(rng, templates), name, meaning).replaceAll('{label}', d.position.label))
  }

  if (cards.length > 1) {
    // Two keywords from different cards where possible, first-and-last so
    // a three-card spread synthesizes its ends.
    const kwOf = (d: DrawnCard) => pick(rng, d.reversed ? d.card.keywordsRev : d.card.keywordsUp)
    const first = cards[0]
    const last = cards[cards.length - 1]
    const kw0 = kwOf(first)
    let kw1 = kwOf(last)
    if (kw1 === kw0) kw1 = kwOf(last)
    parts.push(pick(rng, SYNTHESIS_TEMPLATES).replaceAll('{kw0}', kw0).replaceAll('{kw1}', kw1))
  }

  parts.push(pick(rng, FAREWELLS))
  return parts.join('\n\n')
}
