/**
 * The card codex (spec §6.2): per-card discovery counts, the daily-draw
 * day, and streak state, in localStorage under sh_tarot_codex. This is
 * deliberately NOT the award-key set: per-card and per-day tracking lives
 * here so the sh_min earned set never grows without bound; only the
 * once-ever milestones (streaks, rare pulls) become award keys.
 *
 * recordDraw() is the single entry point for a live cut: it updates the
 * codex and reports what the draw earned (new cards, the day's first
 * draw, a streak milestone, rare pulls). The caller turns those into XP;
 * this module never touches the XP context. Rare-pull kinds are detected
 * here but de-duped by award key (tarot:rare:<kind>), so each fires once
 * per save, ever.
 */

import type { SavedCard } from './threads'

const KEY = 'sh_tarot_codex'

export interface CodexCard {
  n: number // times drawn
  rev: number // times drawn reversed
  first: number // Date.now() of discovery
  last: number // Date.now() of latest draw
}

export interface Codex {
  cards: Record<string, CodexCard>
  /** Local date string (YYYY-MM-DD) of the last counted draw. */
  lastDrawDay: string | null
  streak: number
  bestStreak: number
  /** Card ids of the previous draw (for the echo rare). */
  lastDrawCardIds: string[]
}

export const STREAK_MILESTONES = [3, 7, 30] as const
export type RareKind = 'all-major' | 'all-reversed' | 'echo' | 'alpha-omega' | 'full-court'

export const RARE_LABELS: Record<RareKind, string> = {
  'all-major': 'a spread of Majors alone',
  'all-reversed': 'every card reversed',
  echo: 'a card echoes the last draw',
  'alpha-omega': 'the Fool and the World together',
  'full-court': 'a full court assembles',
}

const empty = (): Codex => ({
  cards: {},
  lastDrawDay: null,
  streak: 0,
  bestStreak: 0,
  lastDrawCardIds: [],
})

/** Local calendar day, YYYY-MM-DD (the streak follows the visitor's clock). */
export function localDay(at = new Date()): string {
  const m = String(at.getMonth() + 1).padStart(2, '0')
  const d = String(at.getDate()).padStart(2, '0')
  return `${at.getFullYear()}-${m}-${d}`
}

export function loadCodex(): Codex {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const p = JSON.parse(raw) as Partial<Codex>
    return {
      cards: typeof p.cards === 'object' && p.cards !== null ? p.cards : {},
      lastDrawDay: typeof p.lastDrawDay === 'string' ? p.lastDrawDay : null,
      streak: typeof p.streak === 'number' ? p.streak : 0,
      bestStreak: typeof p.bestStreak === 'number' ? p.bestStreak : 0,
      lastDrawCardIds: Array.isArray(p.lastDrawCardIds)
        ? p.lastDrawCardIds.filter((s): s is string => typeof s === 'string')
        : [],
    }
  } catch {
    return empty()
  }
}

function save(codex: Codex): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(codex))
  } catch {
    /* private mode: the codex simply forgets */
  }
}

const isCourt = (id: string) => /\/(page|knight|queen|king)$/.test(id)

export interface DrawRecord {
  /** Ids newly entered into the codex by this draw. */
  newCards: string[]
  /** True when this was the local day's first counted draw. */
  daily: boolean
  /** The streak milestone crossed today, if any. */
  streakMilestone: number | null
  streak: number
  /** Rare pulls this draw qualifies for (award keys de-dupe repeats). */
  rares: RareKind[]
}

/** Record a live cut. One call per draw (retries re-send the same cut and
 *  must not call this again). */
export function recordDraw(cards: SavedCard[], at = Date.now()): DrawRecord {
  const codex = loadCodex()
  const day = localDay(new Date(at))

  const newCards: string[] = []
  for (const c of cards) {
    const entry = codex.cards[c.id]
    if (!entry) {
      codex.cards[c.id] = { n: 1, rev: c.reversed ? 1 : 0, first: at, last: at }
      newCards.push(c.id)
    } else {
      entry.n += 1
      if (c.reversed) entry.rev += 1
      entry.last = at
    }
  }

  let daily = false
  let streakMilestone: number | null = null
  if (codex.lastDrawDay !== day) {
    daily = true
    const yesterday = localDay(new Date(at - 24 * 60 * 60 * 1000))
    codex.streak = codex.lastDrawDay === yesterday ? codex.streak + 1 : 1
    codex.bestStreak = Math.max(codex.bestStreak, codex.streak)
    codex.lastDrawDay = day
    if ((STREAK_MILESTONES as readonly number[]).includes(codex.streak)) {
      streakMilestone = codex.streak
    }
  }

  const rares: RareKind[] = []
  if (cards.length >= 3 && cards.every((c) => c.id.startsWith('major/'))) rares.push('all-major')
  if (cards.length >= 3 && cards.every((c) => c.reversed)) rares.push('all-reversed')
  if (cards.some((c) => codex.lastDrawCardIds.includes(c.id))) rares.push('echo')
  if (
    cards.some((c) => c.id === 'major/the_fool') &&
    cards.some((c) => c.id === 'major/the_world')
  )
    rares.push('alpha-omega')
  if (cards.filter((c) => isCourt(c.id)).length >= 4) rares.push('full-court')

  codex.lastDrawCardIds = cards.map((c) => c.id)
  save(codex)
  return { newCards, daily, streakMilestone, streak: codex.streak, rares }
}

/**
 * Backfill: absorb draws that predate the codex (migrated v1 sittings, or
 * threads recorded before this module shipped). Discovery only; no daily,
 * streak, or rare credit, and already-known cards are left untouched.
 * Returns how many cards were newly discovered (for one batched award).
 * Idempotent: a second call discovers nothing.
 */
export function absorbDraws(draws: { cards: SavedCard[]; at: number }[]): number {
  if (!draws.length) return 0
  const codex = loadCodex()
  let added = 0
  for (const draw of draws) {
    for (const c of draw.cards) {
      const entry = codex.cards[c.id]
      if (!entry) {
        codex.cards[c.id] = { n: 1, rev: c.reversed ? 1 : 0, first: draw.at, last: draw.at }
        added += 1
      }
    }
  }
  if (added) save(codex)
  return added
}

// -- compendium helpers -----------------------------------------------------

export const SUITS = [
  { prefix: 'major/', label: 'Majors', size: 22 },
  { prefix: 'wands/', label: 'Wands', size: 14 },
  { prefix: 'cups/', label: 'Cups', size: 14 },
  { prefix: 'swords/', label: 'Swords', size: 14 },
  { prefix: 'pentacles/', label: 'Pentacles', size: 14 },
] as const

export function suitProgress(codex: Codex): { label: string; found: number; size: number }[] {
  const found = Object.keys(codex.cards)
  return SUITS.map((s) => ({
    label: s.label,
    found: found.filter((id) => id.startsWith(s.prefix)).length,
    size: s.size,
  }))
}
