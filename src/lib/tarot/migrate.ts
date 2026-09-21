/**
 * One-time migration (spec §7): the v1 ledger (sh_tarot_ledger, whole
 * readings + follow-up exchanges) becomes v2 threads on first parlor load.
 * The old key is removed only after the threads write succeeds.
 *
 * Migrated threads are archives: v1 text predates the signing model, so
 * the server would refuse it as carried context, and a "resumed" old
 * sitting the Reader cannot actually remember would read as amnesia.
 * They open read-only (closed), fully legible, with a quiet system line.
 */

import { SPREADS } from '../../data/tarot'
import { msgId, loadThreads, saveThread, type Msg, type Thread } from './threads'
import type { SpreadId } from './contract'

const LEDGER_KEY = 'sh_tarot_ledger'

interface LegacyReading {
  greeting: string
  cards: { position: string; cardId: string; text: string }[]
  synthesis: string
  farewell: string
}

interface LegacyEntry {
  id: string
  at: number
  spreadId: SpreadId
  question?: string
  cards: { id: string; position: string; reversed: boolean }[]
  reading: LegacyReading
  exchanges: { question: string; reply: string }[]
  chatClosed: boolean
}

function isLegacyEntry(value: unknown): value is LegacyEntry {
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

/** The v1 sectioned reading joined as the prose the v2 thread renders. */
function proseOf(reading: LegacyReading): string {
  return [reading.greeting, ...reading.cards.map((c) => c.text), reading.synthesis, reading.farewell]
    .filter(Boolean)
    .join('\n\n')
}

function toThread(entry: LegacyEntry): Thread {
  const spread = SPREADS.find((s) => s.id === entry.spreadId)
  const date = new Date(entry.at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
  const messages: Msg[] = [
    {
      kind: 'draw',
      id: msgId(),
      at: entry.at,
      spreadId: entry.spreadId,
      ...(entry.question ? { question: entry.question } : {}),
      cards: entry.cards,
      reading: { text: proseOf(entry.reading) },
    },
  ]
  for (const ex of entry.exchanges) {
    messages.push({ kind: 'user', id: msgId(), at: entry.at, text: ex.question })
    messages.push({ kind: 'reader', id: msgId(), at: entry.at, text: ex.reply })
  }
  messages.push({
    kind: 'system',
    id: msgId(),
    at: entry.at,
    text: 'A sitting from the old parlor; the Reader keeps it as a record.',
  })
  return {
    id: entry.id,
    title: entry.question || `${spread?.name ?? entry.spreadId} · ${date}`,
    titled: true,
    createdAt: entry.at,
    updatedAt: entry.at,
    pinned: false,
    closed: true,
    userMsgCount: 0,
    messages,
  }
}

/** Run once per load; a no-op when there is nothing to migrate. */
export function migrateLedger(): void {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(LEDGER_KEY)
  } catch {
    return
  }
  if (!raw) return
  try {
    const parsed: unknown = JSON.parse(raw)
    const entries = Array.isArray(parsed) ? parsed.filter(isLegacyEntry) : []
    const existing = new Set(loadThreads().map((t) => t.id))
    // Oldest first so saveThread's newest-first ordering lands right.
    for (const entry of [...entries].reverse()) {
      if (!existing.has(entry.id)) saveThread(toThread(entry), { touch: false })
    }
    // Only forget the ledger once the threads are actually there.
    const migrated = new Set(loadThreads().map((t) => t.id))
    if (entries.every((e) => migrated.has(e.id))) localStorage.removeItem(LEDGER_KEY)
  } catch {
    /* malformed ledger: leave it untouched */
  }
}
