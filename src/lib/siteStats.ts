/**
 * Lifetime site counters, client half: read the totals, and contribute this
 * browser's share of them.
 *
 * The site is otherwise entirely client-side, so these four numbers are the
 * only thing a visitor sees that came from anybody else. They are summed
 * server-side (api/_lib/counters.ts); this module never sends an absolute
 * figure, only the delta since its own last report, which is what keeps a
 * replayed or repeated request from inflating a total.
 *
 * The ledger of what has already been reported lives in its own
 * localStorage entry beside the save rather than inside it, like `sh_side`
 * and `sh_vault`: resetting progress should not make the site forget it
 * already counted this browser as a visitor.
 *
 * A module store rather than context, in the same shape as lib/unlocks.ts.
 */

import { useEffect, useSyncExternalStore } from 'react'

export interface SiteStats {
  travellers: number
  xp: number
  quests: number
  gems: number
}

/** What this browser has contributed so far. */
interface Ledger {
  counted: boolean
  xp: number
  quests: number
  gems: number
}

const LEDGER_KEY = 'sh_site'
const ENDPOINT = '/api/stats'
/** Collect a burst of awards into one request rather than one each. */
const FLUSH_MS = 1200

// ---- store ------------------------------------------------------------------

let stats: SiteStats | null = null
let started = false
const listeners = new Set<() => void>()

function publish(next: SiteStats | null) {
  if (!next) return
  stats = next
  for (const fn of listeners) fn()
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

const isStats = (v: unknown): v is SiteStats => {
  if (!v || typeof v !== 'object') return false
  const s = v as Record<string, unknown>
  return (['travellers', 'xp', 'quests', 'gems'] as const).every(
    (k) => typeof s[k] === 'number' && Number.isFinite(s[k] as number)
  )
}

/**
 * The totals, or null until they arrive. Null is also the permanent answer
 * when the endpoint is unreachable, and callers are expected to render
 * nothing rather than guess: a wrong lifetime total is worse than none.
 */
export function useSiteStats(): SiteStats | null {
  useEffect(() => {
    if (started) return
    started = true
    fetch(ENDPOINT, { headers: { accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        if (isStats(body)) publish(body)
      })
      .catch(() => {
        /* offline, or no counter store wired up: the row stays hidden */
      })
  }, [])

  return useSyncExternalStore(subscribe, () => stats, () => stats)
}

// ---- reporting --------------------------------------------------------------

function readLedger(): Ledger {
  const empty: Ledger = { counted: false, xp: 0, quests: 0, gems: 0 }
  try {
    const raw = localStorage.getItem(LEDGER_KEY)
    if (!raw) return empty
    const l = JSON.parse(raw) as Record<string, unknown>
    const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.floor(v) : 0)
    return { counted: l.counted === true, xp: num(l.xp), quests: num(l.quests), gems: num(l.gems) }
  } catch {
    return empty
  }
}

function writeLedger(l: Ledger) {
  try {
    localStorage.setItem(LEDGER_KEY, JSON.stringify(l))
  } catch {
    /* private window: this browser contributes for this visit only */
  }
}

/** What this browser's save currently amounts to, in counter terms. */
export interface Contribution {
  xp: number
  quests: number
  gems: number
}

/**
 * Send the difference between `now` and what was already reported, and fold
 * the fresh totals back into the store so a visitor sees their own arrival
 * included rather than having to reload for it.
 *
 * A figure that went DOWN means the visitor reset their progress. The
 * ledger rebases to the lower number without reporting anything, so what
 * they earn next counts again: the counter is lifetime XP *generated*, not
 * XP currently held, and re-earning it is really generating it.
 */
export async function reportContribution(now: Contribution, countVisitor: boolean): Promise<void> {
  const ledger = readLedger()
  const deltas: Record<string, number> = {}
  const next: Ledger = { ...ledger }

  for (const key of ['xp', 'quests', 'gems'] as const) {
    const diff = now[key] - ledger[key]
    if (diff > 0) deltas[key] = diff
    next[key] = now[key]
  }
  const firstTime = countVisitor && !ledger.counted
  if (firstTime) {
    deltas.travellers = 1
    next.counted = true
  }

  if (!Object.keys(deltas).length) {
    // Nothing to send, but a rebase after a reset still needs storing.
    if (next.xp !== ledger.xp || next.quests !== ledger.quests || next.gems !== ledger.gems) {
      writeLedger(next)
    }
    return
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(deltas),
    })
    if (!res.ok) return
    const body = await res.json()
    if (isStats(body)) publish(body)
    // Only record the report once the server has taken it: a failed send
    // is retried on the next change rather than silently dropped.
    writeLedger(next)
  } catch {
    /* offline: try again next time something moves */
  }
}

export const FLUSH_DELAY_MS = FLUSH_MS
