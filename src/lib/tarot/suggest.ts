/**
 * Suggestion chips (spec §3.6): built client-side from thread state, zero
 * API cost. Cards on the table become questions, spread status becomes a
 * draw suggestion, and everything is deduped against what the visitor
 * already asked. Rendering shows at most three, under the latest Reader
 * reply; the fresh-thread starters live in fallbackReading.ts instead.
 */

import { CARD_BY_ID } from '../../data/tarot'
import type { Thread } from './threads'

export interface SuggestionChip {
  label: string
  /** 'ask' sends the label as a message; 'draw' opens the spread picker. */
  kind: 'ask' | 'draw'
}

const MAX_CHIPS = 3

export function suggestionChips(thread: Thread): SuggestionChip[] {
  const asked = new Set(
    thread.messages.filter((m) => m.kind === 'user').map((m) => m.text.trim().toLowerCase()),
  )
  const pool: SuggestionChip[] = []

  const draws = thread.messages.filter((m) => m.kind === 'draw' && m.reading)
  const last = draws[draws.length - 1]
  if (last && last.kind === 'draw') {
    // Cards on the table, reversed ones first (they invite the question).
    const cards = [...last.cards].sort((a, b) => Number(b.reversed) - Number(a.reversed))
    for (const c of cards.slice(0, 2)) {
      const name = CARD_BY_ID.get(c.id)?.name ?? c.id
      pool.push({
        kind: 'ask',
        label: c.reversed ? `Why is ${name} reversed here?` : `What does ${name} ask of me?`,
      })
    }
    if (last.cards.length >= 2) {
      const [a, b] = last.cards
      const an = CARD_BY_ID.get(a.id)?.name ?? a.id
      const bn = CARD_BY_ID.get(b.id)?.name ?? b.id
      pool.push({ kind: 'ask', label: `How do ${an} and ${bn} sit together?` })
    }
    // Spread status: a one-card answer invites a fuller spread.
    if (last.spreadId === 'one') pool.push({ kind: 'draw', label: 'Lay a fuller spread on this' })
  } else {
    // Talk so far, no cards yet: the obvious next move is a draw.
    pool.push({ kind: 'draw', label: 'Let the cards weigh in' })
  }
  pool.push({ kind: 'ask', label: 'What should I sit with tonight?' })

  const seen = new Set<string>()
  return pool
    .filter((chip) => {
      const key = chip.label.toLowerCase()
      if (asked.has(key) || seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, MAX_CHIPS)
}
