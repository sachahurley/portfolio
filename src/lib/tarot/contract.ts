/**
 * Tarot request/response contract, shared by the client and the serverless
 * function (api/_lib/reading.ts imports this file directly, so it must stay
 * pure TypeScript: no vite-isms, no DOM, no imports beyond the language).
 *
 * The client draws the cards and summarizes the visitor; the server only
 * validates, prompts the model, and shapes the reply. Anything but a valid
 * 200 within the client's timeout means "use the canned fallback reading",
 * so every error path here can afford to be strict.
 */

export const QUESTION_MAX = 280
export const AWARDS_MAX = 40
export const AWARD_KEY_MAX = 64

export type SpreadId = 'one' | 'three'

export interface DrawnCardPayload {
  id: string // deck id, e.g. 'major/the_tower'
  name: string
  position: string // spread position id, e.g. 'past'
  reversed: boolean
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

/** Site-generated activity only; never user-entered text (the question is
 *  the one deliberate exception, carried separately and delimited). */
export interface VisitorSummary {
  returning: boolean
  levelTitle: string
  xp: number
  gems: string[]
  awards: string[] // earned award keys, e.g. 'visit:/projects', 'secret:town-well'
  gear: { slot: string; name: string; topStat: string }[]
  timeOfDay: TimeOfDay
  visited: string[] // paths derived from visit: keys
}

export interface TarotRequest {
  spread: SpreadId
  question?: string
  cards: DrawnCardPayload[]
  visitor: VisitorSummary
}

export interface CardReading {
  position: string
  cardId: string
  text: string
}

export interface Reading {
  greeting: string
  cards: CardReading[]
  synthesis: string
  farewell: string
}

export interface TarotResponse {
  reading: Reading
}

const SPREAD_SIZES: Record<SpreadId, number> = { one: 1, three: 3 }

/**
 * Server-side request validation. `deckIds` is the full set of legal card
 * ids (the server builds it from TAROT_DECK). Returns null when valid, or
 * a short reason for the 400 body.
 */
export function validateRequest(body: unknown, deckIds: ReadonlySet<string>): string | null {
  if (typeof body !== 'object' || body === null) return 'not an object'
  const req = body as Record<string, unknown>
  const spread = req.spread as SpreadId
  if (spread !== 'one' && spread !== 'three') return 'unknown spread'
  if (req.question !== undefined) {
    if (typeof req.question !== 'string') return 'bad question'
    if (req.question.length > QUESTION_MAX) return 'question too long'
  }
  if (!Array.isArray(req.cards) || req.cards.length !== SPREAD_SIZES[spread]) return 'bad cards'
  const seen = new Set<string>()
  for (const c of req.cards as Record<string, unknown>[]) {
    if (typeof c !== 'object' || c === null) return 'bad card'
    if (typeof c.id !== 'string' || !deckIds.has(c.id)) return 'unknown card'
    if (seen.has(c.id)) return 'duplicate card'
    seen.add(c.id)
    if (typeof c.name !== 'string' || c.name.length > 40) return 'bad card name'
    if (typeof c.position !== 'string' || c.position.length > 16) return 'bad position'
    if (typeof c.reversed !== 'boolean') return 'bad orientation'
  }
  const v = req.visitor as Record<string, unknown> | undefined
  if (typeof v !== 'object' || v === null) return 'bad visitor'
  if (typeof v.returning !== 'boolean') return 'bad visitor'
  if (typeof v.levelTitle !== 'string' || v.levelTitle.length > 32) return 'bad visitor'
  if (typeof v.xp !== 'number' || !Number.isFinite(v.xp)) return 'bad visitor'
  for (const list of [v.gems, v.awards, v.visited]) {
    if (!Array.isArray(list) || list.some((s) => typeof s !== 'string')) return 'bad visitor'
  }
  if ((v.awards as string[]).length > AWARDS_MAX) return 'too many awards'
  if ((v.awards as string[]).some((s) => s.length > AWARD_KEY_MAX)) return 'award key too long'
  if (!Array.isArray(v.gear) || v.gear.length > 8) return 'bad gear'
  for (const g of v.gear as Record<string, unknown>[]) {
    if (typeof g !== 'object' || g === null) return 'bad gear'
    if (typeof g.slot !== 'string' || typeof g.name !== 'string' || typeof g.topStat !== 'string')
      return 'bad gear'
    if (g.name.length > 60 || g.slot.length > 16 || g.topStat.length > 16) return 'bad gear'
  }
  const tods: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night']
  if (!tods.includes(v.timeOfDay as TimeOfDay)) return 'bad time of day'
  return null
}

/** Response-shape guard: the model's JSON (or anything else) must match the
 *  Reading contract exactly enough to render. */
export function isReading(value: unknown, expectedPositions: string[]): value is Reading {
  if (typeof value !== 'object' || value === null) return false
  const r = value as Record<string, unknown>
  if (typeof r.greeting !== 'string' || typeof r.synthesis !== 'string') return false
  if (typeof r.farewell !== 'string') return false
  if (!Array.isArray(r.cards) || r.cards.length !== expectedPositions.length) return false
  return (r.cards as Record<string, unknown>[]).every(
    (c, i) =>
      typeof c === 'object' &&
      c !== null &&
      c.position === expectedPositions[i] &&
      typeof c.cardId === 'string' &&
      typeof c.text === 'string' &&
      c.text.length > 0,
  )
}
