/**
 * The Threads tab (spec §3.5): past sittings newest first with search
 * (titles, spoken text, questions, card names), a spread filter, and
 * inline management: pin (max 5), rename, copy as Markdown, and delete
 * with an inline confirm (no browser dialog). Rows keep the ledger plate
 * recipe; the row body opens the thread, the quiet action row below it
 * does everything else.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import { searchThreads, PINS_MAX, type Thread } from '../../lib/tarot/threads'
import { threadToMarkdown } from '../../lib/tarot/export'
import type { SpreadId } from '../../lib/tarot/contract'

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
  onRename,
  onPin,
  onDelete,
}: {
  threads: Thread[]
  activeId: string | null
  onOpen: (thread: Thread) => void
  onNew: () => void
  onBack: () => void
  onRename: (id: string, title: string) => void
  onPin: (id: string, pinned: boolean) => void
  onDelete: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [spreadFilter, setSpreadFilter] = useState<SpreadId | null>(null)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const pins = threads.filter((t) => t.pinned).length
  const shown = searchThreads(threads, { query, spreadId: spreadFilter })

  const copy = (t: Thread) => {
    navigator.clipboard
      .writeText(threadToMarkdown(t))
      .then(() => {
        setCopiedId(t.id)
        setTimeout(() => setCopiedId((id) => (id === t.id ? null : id)), 2000)
      })
      .catch(() => {})
  }

  return (
    <section className="tarot-ledger" aria-label="Past sittings">
      <div className="pt-panel-actions">
        <Button variant="primary" type="button" onClick={onNew}>
          A new sitting
        </Button>
      </div>

      {threads.length > 1 && (
        <div className="pt-search">
          <Input
            aria-label="Search sittings"
            type="text"
            value={query}
            placeholder="Search the book of sittings"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="pt-filters" role="radiogroup" aria-label="Filter by spread">
            <button
              type="button"
              role="radio"
              aria-checked={spreadFilter === null}
              className={`pt-filter${spreadFilter === null ? ' sel' : ''}`}
              onClick={() => setSpreadFilter(null)}
            >
              All
            </button>
            {SPREADS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={spreadFilter === s.id}
                className={`pt-filter${spreadFilter === s.id ? ' sel' : ''}`}
                onClick={() => setSpreadFilter(spreadFilter === s.id ? null : s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {shown.map((t) => (
        <div key={t.id} className={`tl-row pt-row${t.id === activeId ? ' pt-row-active' : ''}`}>
          {renamingId === t.id ? (
            <form
              className="pt-rename"
              onSubmit={(e) => {
                e.preventDefault()
                if (draft.trim()) onRename(t.id, draft)
                setRenamingId(null)
              }}
            >
              <Input
                aria-label="Sitting name"
                type="text"
                value={draft}
                maxLength={60}
                autoFocus
                onChange={(e) => setDraft(e.target.value)}
              />
              <Button variant="secondary" type="submit">
                Keep
              </Button>
              <Button variant="ghost" type="button" onClick={() => setRenamingId(null)}>
                Leave it
              </Button>
            </form>
          ) : (
            <button type="button" className="pt-row-open" onClick={() => onOpen(t)}>
              <span className="tl-top">
                <span className="tl-name">
                  {t.pinned && <span className="pt-pin-mark" aria-label="Pinned">✦ </span>}
                  {t.title}
                </span>
                <span className="tl-date">{when(t.updatedAt)}</span>
              </span>
              <span className="tl-cards">{summary(t)}</span>
              {t.closed && <span className="tl-q">The audience has ended.</span>}
            </button>
          )}

          {confirmingId === t.id ? (
            <div className="pt-row-actions">
              <span className="pt-act-note">Forget this sitting?</span>
              <button
                type="button"
                className="pt-act pt-act-danger"
                onClick={() => {
                  setConfirmingId(null)
                  onDelete(t.id)
                }}
              >
                Forget
              </button>
              <button type="button" className="pt-act" onClick={() => setConfirmingId(null)}>
                Keep
              </button>
            </div>
          ) : (
            renamingId !== t.id && (
              <div className="pt-row-actions">
                <button
                  type="button"
                  className="pt-act"
                  onClick={() => onPin(t.id, !t.pinned)}
                  disabled={!t.pinned && pins >= PINS_MAX}
                  title={!t.pinned && pins >= PINS_MAX ? `Up to ${PINS_MAX} pins` : undefined}
                >
                  {t.pinned ? 'Unpin' : 'Pin'}
                </button>
                <button
                  type="button"
                  className="pt-act"
                  onClick={() => {
                    setDraft(t.title)
                    setRenamingId(t.id)
                  }}
                >
                  Rename
                </button>
                <button type="button" className="pt-act" onClick={() => copy(t)}>
                  {copiedId === t.id ? 'Copied' : 'Copy'}
                </button>
                <button type="button" className="pt-act" onClick={() => setConfirmingId(t.id)}>
                  Forget
                </button>
              </div>
            )
          )}
        </div>
      ))}

      {!threads.length && <p className="pt-system">No sittings yet; the book is blank.</p>}
      {threads.length > 0 && !shown.length && (
        <p className="pt-system">Nothing in the book answers to that.</p>
      )}

      <div className="tl-back">
        <Button variant="secondary" type="button" onClick={onBack}>
          Return to the table
        </Button>
      </div>
    </section>
  )
}
