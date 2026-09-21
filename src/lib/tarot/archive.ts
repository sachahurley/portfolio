/**
 * The Reader's ledger: finished readings, persisted so a visitor can leaf
 * back through past sittings. localStorage under sh_tarot_ledger, newest
 * first, capped; every read/write tolerates private mode by doing nothing
 * (the parlor's no-error rule extends to its bookkeeping).
 *
 * Cards are stored by id and rehydrated through the deck data on load, so
 * an entry never serializes card art, prompts, or meanings; entries that no
 * longer resolve against the deck (a renamed card, a retired spread) are
 * silently dropped rather than rendered broken.
 */

import { CARD_BY_ID, SPREADS, type SpreadDef } from '../../data/tarot'
import type { DrawnCard } from './draw'
import type { ChatExchange, Reading, SpreadId } from './contract'

const KEY = 'sh_tarot_ledger'
/** Newest sittings kept; older ones fall off the back of the book. */
const MAX = 10

export interface SavedReading {
  id: string
  /** Completion time (Date.now()). */
  at: number
  spreadId: SpreadId
  question?: string
  cards: { id: string; position: string; reversed: boolean }[]
  reading: Reading
  exchanges: ChatExchange[]
  /** True once the audience ended (turns spent or a failed follow-up). */
  chatClosed: boolean
}

function persist(entries: SavedReading[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)))
  } catch {
    /* private mode / quota: the ledger simply forgets */
  }
}

/** Turn a stored entry back into live table state, or null if the deck or
 *  spread data no longer matches what was saved. */
export function rehydrate(entry: SavedReading): { spread: SpreadDef; drawn: DrawnCard[] } | null {
  const spread = SPREADS.find((s) => s.id === entry.spreadId)
  if (!spread || entry.cards.length !== spread.positions.length) return null
  const drawn: DrawnCard[] = []
  for (let i = 0; i < entry.cards.length; i++) {
    const saved = entry.cards[i]
    const card = CARD_BY_ID.get(saved.id)
    const position = spread.positions.find((p) => p.id === saved.position)
    if (!card || !position) return null
    drawn.push({ card, position, reversed: saved.reversed })
  }
  return { spread, drawn }
}

/** Loose shape check for one parsed entry; rehydrate() is the deep check. */
function isEntry(value: unknown): value is SavedReading {
  if (typeof value !== 'object' || value === null) return false
  const e = value as Record<string, unknown>
  const r = e.reading as Record<string, unknown> | undefined
  return (
    typeof e.id === 'string' &&
    typeof e.at === 'number' &&
    typeof e.spreadId === 'string' &&
    Array.isArray(e.cards) &&
    typeof r === 'object' &&
    r !== null &&
    typeof r.greeting === 'string' &&
    Array.isArray(r.cards) &&
    typeof r.synthesis === 'string' &&
    typeof r.farewell === 'string' &&
    Array.isArray(e.exchanges)
  )
}

export function loadLedger(): SavedReading[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isEntry).filter((e) => rehydrate(e) !== null).slice(0, MAX)
  } catch {
    return []
  }
}

/** Prepend a finished reading; returns the updated ledger. */
export function saveReading(entry: SavedReading): SavedReading[] {
  const next = [entry, ...loadLedger().filter((e) => e.id !== entry.id)]
  persist(next)
  return next.slice(0, MAX)
}

/** Record follow-up exchanges on an existing sitting; returns the ledger. */
export function updateReading(
  id: string,
  exchanges: ChatExchange[],
  chatClosed: boolean,
): SavedReading[] {
  const next = loadLedger().map((e) => (e.id === id ? { ...e, exchanges, chatClosed } : e))
  persist(next)
  return next
}
