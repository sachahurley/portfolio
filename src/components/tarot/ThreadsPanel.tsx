/**
 * The Threads tab of the parlor drawer (spec §3.5, phase 2 shell): past
 * sittings newest first, each row reopening its thread, plus a fresh
 * sitting. Rename, delete, pin, and search arrive in phase 3; rows reuse
 * the ledger's plate recipe (.tl-row) so nothing new is invented.
 */

import { Button } from '@scorp-ds/components'
import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import type { Thread } from '../../lib/tarot/threads'

function when(at: number): string {
  const day = 24 * 60 * 60 * 1000
  const now = new Date()
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (at >= midnight) return 'today'
  if (at >= midnight - day) return 'yesterday'
  return new Date(at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function summary(thread: Thread): string {
  const draws = thread.messages.filter((m) => m.kind === 'draw')
  if (!draws.length) {
    const firstUser = thread.messages.find((m) => m.kind === 'user')
    return firstUser ? 'An audience without cards, so far.' : 'The table sits ready.'
  }
  const last = draws[draws.length - 1]
  const spread = SPREADS.find((s) => s.id === last.spreadId)
  const cards = last.cards
    .map((c) => {
      const card = CARD_BY_ID.get(c.id)
      return card ? `${card.name}${c.reversed ? ', reversed' : ''}` : c.id
    })
    .join(' · ')
  return `${spread?.name ?? last.spreadId}: ${cards}`
}

export default function ThreadsPanel({
  threads,
  activeId,
  onOpen,
  onNew,
  onBack,
}: {
  threads: Thread[]
  activeId: string | null
  onOpen: (thread: Thread) => void
  onNew: () => void
  onBack: () => void
}) {
  return (
    <section className="tarot-ledger" aria-label="Past sittings">
      <div className="pt-panel-actions">
        <Button variant="primary" type="button" onClick={onNew}>
          A new sitting
        </Button>
      </div>
      {threads.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`tl-row${t.id === activeId ? ' pt-row-active' : ''}`}
          onClick={() => onOpen(t)}
        >
          <span className="tl-top">
            <span className="tl-name">{t.title}</span>
            <span className="tl-date">{when(t.updatedAt)}</span>
          </span>
          <span className="tl-cards">{summary(t)}</span>
          {t.closed && <span className="tl-q">The audience has ended.</span>}
        </button>
      ))}
      {!threads.length && <p className="pt-system">No sittings yet; the book is blank.</p>}
      <div className="tl-back">
        <Button variant="secondary" type="button" onClick={onBack}>
          Return to the table
        </Button>
      </div>
    </section>
  )
}
