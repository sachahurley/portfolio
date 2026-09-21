/**
 * The parlor's thread store (spec §4): localStorage `sh_tarot_threads`,
 * newest-updated first, capped at 20 with pinned threads never pruned.
 * Every read/write tolerates private mode by doing nothing (the parlor's
 * no-error rule extends to its bookkeeping); a quota error prunes one more
 * unpinned thread and retries once.
 *
 * Cards are stored by id and rehydrated through the deck data; threads
 * whose draws no longer resolve are dropped on load rather than rendered
 * broken (same rule the old ledger had).
 *
 * Signing model: Reader text that arrived over the API carries the
 * server's signature (SignedReaderText) and is what future requests may
 * carry back as context. Canned text (greetings, fallbacks, closers) has
 * no signature, renders like any other Reader line, and is simply left
 * out of requests; buildParlorRequest below owns that rule.
 */

import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import {
  PARLOR_SLOTS,
  resolveParlorItem,
  type ParlorKind,
  type ParlorSavedItem,
} from './parlorLoot'
import {
  PARLOR_DRAWS_CHAR_BUDGET,
  PARLOR_DRAWS_MAX,
  PARLOR_RECENT_MAX,
  type ParlorDraw,
  type ParlorRecent,
  type ParlorRequest,
  type ParlorTurn,
  type ParlorVisitor,
  type SpreadId,
} from './contract'

const KEY = 'sh_tarot_threads'
export const THREADS_MAX = 20
export const PINS_MAX = 5

export interface SavedCard {
  id: string
  position: string
  reversed: boolean
}

/** A Reader text as stored: signed when it came over the API, bare when
 *  canned (fallback reading, greeting, closer). */
export interface StoredReaderText {
  text: string
  msgIndex?: number
  userMsgCount?: number
  sig?: string
  /** Canned stand-in after a failed cut; a retry replaces it. */
  failed?: boolean
}

export type Msg =
  | { kind: 'user'; id: string; at: number; text: string }
  | ({ kind: 'reader'; id: string; at: number } & StoredReaderText)
  | {
      kind: 'offer'
      id: string
      at: number
      spreadId: SpreadId
      question?: string
      status: 'open' | 'cut' | 'declined'
    }
  | {
      kind: 'draw'
      id: string
      at: number
      spreadId: SpreadId
      question?: string
      cards: SavedCard[]
      /** The reading for this draw; null while the cut is in flight. */
      reading: StoredReaderText | null
      /** The Clarifier charm's follow-up card was already pulled. */
      clarified?: boolean
    }
  | { kind: 'system'; id: string; at: number; text: string }

export interface Thread {
  id: string
  title: string
  titled: boolean
  createdAt: number
  updatedAt: number
  pinned: boolean
  closed: boolean
  /** Server-attested user-message count, updated from each done event. */
  userMsgCount: number
  messages: Msg[]
}

export const msgId = () => crypto.randomUUID()

export function newThread(): Thread {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title: 'A new sitting',
    titled: false,
    createdAt: now,
    updatedAt: now,
    pinned: false,
    closed: false,
    userMsgCount: 0,
    messages: [],
  }
}

// -- persistence ------------------------------------------------------------

function isMsg(value: unknown): value is Msg {
  if (typeof value !== 'object' || value === null) return false
  const m = value as Record<string, unknown>
  if (typeof m.id !== 'string' || typeof m.at !== 'number') return false
  switch (m.kind) {
    case 'user':
    case 'system':
      return typeof m.text === 'string'
    case 'reader':
      return typeof m.text === 'string'
    case 'offer':
      return typeof m.spreadId === 'string' && typeof m.status === 'string'
    case 'draw':
      return typeof m.spreadId === 'string' && Array.isArray(m.cards)
    default:
      return false
  }
}

function isThread(value: unknown): value is Thread {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.createdAt === 'number' &&
    typeof t.updatedAt === 'number' &&
    typeof t.closed === 'boolean' &&
    typeof t.userMsgCount === 'number' &&
    Array.isArray(t.messages) &&
    (t.messages as unknown[]).every(isMsg)
  )
}

/** True when every card in every draw still resolves against the deck. */
function rehydrates(thread: Thread): boolean {
  for (const m of thread.messages) {
    if (m.kind !== 'draw') continue
    const spread = SPREADS.find((s) => s.id === m.spreadId)
    if (!spread || m.cards.length !== spread.positions.length) return false
    for (const c of m.cards) {
      if (!CARD_BY_ID.get(c.id)) return false
      if (!spread.positions.some((p) => p.id === c.position)) return false
    }
  }
  return true
}

const byRecency = (a: Thread, b: Thread) => b.updatedAt - a.updatedAt

/** Index of the oldest (last, list is newest-first) unpinned thread. */
function oldestUnpinned(threads: Thread[]): number {
  for (let i = threads.length - 1; i >= 0; i--) if (!threads[i].pinned) return i
  return -1
}

function prune(threads: Thread[]): Thread[] {
  const sorted = [...threads].sort(byRecency)
  while (sorted.length > THREADS_MAX) {
    // Oldest unpinned falls off; if everything is pinned, oldest overall.
    const idx = oldestUnpinned(sorted)
    sorted.splice(idx === -1 ? sorted.length - 1 : idx, 1)
  }
  return sorted
}

function persist(threads: Thread[]): Thread[] {
  let next = prune(threads)
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Quota: prune one more unpinned thread and retry once (§4).
    const idx = oldestUnpinned(next)
    if (idx !== -1) {
      next = next.filter((_, i) => i !== idx)
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* private mode: the parlor simply forgets */
      }
    }
  }
  return next
}

export function loadThreads(): Thread[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(isThread)
      .filter(rehydrates)
      // Older saves may predate these fields; default them on the way in.
      .map((t) => ({ ...t, pinned: t.pinned ?? false, titled: t.titled ?? true }))
      .sort(byRecency)
  } catch {
    return []
  }
}

/** Upsert one thread; returns the updated, sorted list. `touch` stamps
 *  updatedAt (the default for live activity; migration preserves history). */
export function saveThread(thread: Thread, opts: { touch?: boolean } = {}): Thread[] {
  const touched = opts.touch === false ? thread : { ...thread, updatedAt: Date.now() }
  const rest = loadThreads().filter((t) => t.id !== thread.id)
  return persist([touched, ...rest])
}

export function deleteThread(id: string): Thread[] {
  const rest = loadThreads().filter((t) => t.id !== id)
  return persist(rest)
}

/** Rename by hand; a hand-given title is final (titled = true, so the
 *  model's title_thread is never asked for again). */
export function renameThread(id: string, title: string): Thread[] {
  const trimmed = title.trim().slice(0, 60)
  if (!trimmed) return loadThreads()
  const next = loadThreads().map((t) =>
    t.id === id ? { ...t, title: trimmed, titled: true } : t,
  )
  return persist(next)
}

/** Toggle a pin; capped at PINS_MAX (the request is ignored past it). */
export function setPinned(id: string, pinned: boolean): Thread[] {
  const all = loadThreads()
  if (pinned && all.filter((t) => t.pinned).length >= PINS_MAX) return all
  return persist(all.map((t) => (t.id === id ? { ...t, pinned } : t)))
}

// -- search (§3.5) ----------------------------------------------------------

/** Everything a thread can be found by: title, spoken text, questions,
 *  and the names of its cards. */
function searchableText(thread: Thread): string {
  const parts: string[] = [thread.title]
  for (const m of thread.messages) {
    if (m.kind === 'user' || m.kind === 'system' || m.kind === 'reader') parts.push(m.text)
    if (m.kind === 'draw') {
      if (m.question) parts.push(m.question)
      if (m.reading) parts.push(m.reading.text)
      for (const c of m.cards) parts.push(CARD_BY_ID.get(c.id)?.name ?? c.id)
    }
    if (m.kind === 'offer' && m.question) parts.push(m.question)
  }
  return parts.join('\n').toLowerCase()
}

export interface ThreadFilter {
  query?: string
  spreadId?: SpreadId | null
  cardId?: string | null
}

export function searchThreads(threads: Thread[], filter: ThreadFilter): Thread[] {
  const q = filter.query?.trim().toLowerCase() ?? ''
  return threads.filter((t) => {
    const draws = t.messages.filter((m) => m.kind === 'draw')
    if (filter.spreadId && !draws.some((d) => d.spreadId === filter.spreadId)) return false
    if (filter.cardId && !draws.some((d) => d.cards.some((c) => c.id === filter.cardId)))
      return false
    if (q && !searchableText(t).includes(q)) return false
    return true
  })
}

// -- parlor settings + loot (sh_tarot_parlor) --------------------------------

const PARLOR_KEY = 'sh_tarot_parlor'

export interface ParlorLoadout {
  back: number | null
  props: number[]
  voice: number | null
  charm: number | null
}

export interface ParlorSettings {
  ownerCode: string | null
  /** DERIVED from the equipped voice/charm on load; carried in requests. */
  voice: string | null
  perks: string[]
  /** Parlor loot owned (rolled from tarot: chests) and what is equipped. */
  owned: ParlorSavedItem[]
  loadout: ParlorLoadout
  /** Balance charm setting: reversal chance in percent. */
  reversalRate: 0 | 30 | 50
}

const emptyLoadout = (): ParlorLoadout => ({ back: null, props: [], voice: null, charm: null })

const isParlorItem = (v: unknown): v is ParlorSavedItem => {
  if (typeof v !== 'object' || v === null) return false
  const i = v as Record<string, unknown>
  return (
    typeof i.id === 'number' &&
    typeof i.kind === 'string' &&
    i.kind in PARLOR_SLOTS &&
    typeof i.base === 'number' &&
    typeof i.rarity === 'string'
  )
}

export function loadParlorSettings(): ParlorSettings {
  try {
    const raw = localStorage.getItem(PARLOR_KEY)
    const parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
    const owned = Array.isArray(parsed.owned) ? parsed.owned.filter(isParlorItem) : []
    const ownedIds = new Set(owned.map((i) => i.id))
    const l = (parsed.loadout ?? {}) as Record<string, unknown>
    const slot = (v: unknown) => (typeof v === 'number' && ownedIds.has(v) ? v : null)
    const loadout: ParlorLoadout = {
      back: slot(l.back),
      props: Array.isArray(l.props)
        ? l.props.filter((v): v is number => typeof v === 'number' && ownedIds.has(v)).slice(0, PARLOR_SLOTS.prop)
        : [],
      voice: slot(l.voice),
      charm: slot(l.charm),
    }
    // voice/perks derive from the loadout; the request contract stays flat.
    const keyOf = (id: number | null, kind: ParlorKind) => {
      const item = id != null ? owned.find((i) => i.id === id && i.kind === kind) : undefined
      return item ? resolveParlorItem(item).key : null
    }
    const charmKey = keyOf(loadout.charm, 'charm')
    const rate = parsed.reversalRate
    return {
      ownerCode:
        typeof parsed.ownerCode === 'string' && parsed.ownerCode ? parsed.ownerCode : null,
      voice: keyOf(loadout.voice, 'voice'),
      perks: charmKey ? [charmKey] : [],
      owned,
      loadout,
      reversalRate: rate === 0 || rate === 50 ? rate : 30,
    }
  } catch {
    return {
      ownerCode: null,
      voice: null,
      perks: [],
      owned: [],
      loadout: emptyLoadout(),
      reversalRate: 30,
    }
  }
}

export function saveParlorSettings(settings: ParlorSettings): void {
  try {
    // voice/perks are derived; only the sources of truth persist.
    localStorage.setItem(
      PARLOR_KEY,
      JSON.stringify({
        ownerCode: settings.ownerCode,
        owned: settings.owned,
        loadout: settings.loadout,
        reversalRate: settings.reversalRate,
      }),
    )
  } catch {
    /* private mode */
  }
}

/** Add a freshly rolled parlor item (id de-duped) and persist. */
export function addParlorItem(item: ParlorSavedItem): ParlorSettings {
  const settings = loadParlorSettings()
  let saved = item
  while (settings.owned.some((i) => i.id === saved.id)) saved = { ...saved, id: saved.id + 1 }
  const next = { ...settings, owned: [...settings.owned, saved] }
  saveParlorSettings(next)
  return loadParlorSettings()
}

/** Equip/unequip one item in its kind's slot(s); persists and re-derives. */
export function toggleParlorEquip(itemId: number): ParlorSettings {
  const settings = loadParlorSettings()
  const item = settings.owned.find((i) => i.id === itemId)
  if (!item) return settings
  const loadout = { ...settings.loadout, props: [...settings.loadout.props] }
  if (item.kind === 'prop') {
    if (loadout.props.includes(itemId)) {
      loadout.props = loadout.props.filter((id) => id !== itemId)
    } else {
      loadout.props = [...loadout.props, itemId].slice(-PARLOR_SLOTS.prop)
    }
  } else {
    const kind = item.kind as 'back' | 'voice' | 'charm'
    loadout[kind] = loadout[kind] === itemId ? null : itemId
  }
  saveParlorSettings({ ...settings, loadout })
  return loadParlorSettings()
}

export function setReversalRate(rate: 0 | 30 | 50): ParlorSettings {
  const settings = loadParlorSettings()
  saveParlorSettings({ ...settings, reversalRate: rate })
  return loadParlorSettings()
}

// -- request assembly -------------------------------------------------------

const isSigned = (
  r: StoredReaderText,
): r is Required<Pick<StoredReaderText, 'text' | 'msgIndex' | 'userMsgCount' | 'sig'>> =>
  typeof r.sig === 'string' &&
  typeof r.msgIndex === 'number' &&
  typeof r.userMsgCount === 'number' &&
  !r.failed

/**
 * Build the stateless request for the next turn. Only signed Reader text
 * travels (the server refuses anything else); canned lines stay local.
 */
export function buildParlorRequest(
  thread: Thread,
  turn: ParlorTurn,
  visitor: ParlorVisitor,
  settings: ParlorSettings,
  unlockedSpreads: SpreadId[],
): ParlorRequest {
  const draws: ParlorDraw[] = []
  const recent: ParlorRecent[] = []
  for (const m of thread.messages) {
    if (m.kind === 'draw' && m.reading && isSigned(m.reading)) {
      draws.push({
        spreadId: m.spreadId,
        ...(m.question ? { question: m.question } : {}),
        cards: m.cards.map((c) => ({
          id: c.id,
          name: CARD_BY_ID.get(c.id)?.name ?? c.id,
          position: c.position,
          reversed: c.reversed,
        })),
        reading: {
          text: m.reading.text,
          msgIndex: m.reading.msgIndex,
          userMsgCount: m.reading.userMsgCount,
          sig: m.reading.sig,
        },
      })
    } else if (m.kind === 'user') {
      recent.push({ role: 'user', text: m.text })
    } else if (m.kind === 'reader' && isSigned(m)) {
      recent.push({
        role: 'reader',
        text: m.text,
        msgIndex: m.msgIndex,
        userMsgCount: m.userMsgCount,
        sig: m.sig,
      })
    }
  }
  // Newest draws first priority: keep the freshest readings within both
  // the count cap and a character budget, so a book of Celtic Crosses
  // never outgrows the server's body cap. Order is preserved.
  const kept: ParlorDraw[] = []
  let chars = 0
  for (let i = draws.length - 1; i >= 0; i--) {
    const size = draws[i].reading.text.length
    if (kept.length >= PARLOR_DRAWS_MAX || chars + size > PARLOR_DRAWS_CHAR_BUDGET) break
    kept.unshift(draws[i])
    chars += size
  }

  return {
    threadId: thread.id,
    turn,
    draws: kept,
    recent: recent.slice(-PARLOR_RECENT_MAX),
    userMessageCount: thread.userMsgCount,
    unlockedSpreads,
    visitor,
    parlor: { voice: settings.voice, perks: settings.perks },
    needsTitle: !thread.titled,
  }
}
