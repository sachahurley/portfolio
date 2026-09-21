/**
 * The Reader's ledger: past sittings, newest first. Each row is a plate
 * button (the spread-chip recipe) that reopens its reading fully revealed.
 * Rendering only; storage and rehydration live in lib/tarot/archive.
 */

import { Button } from '@scorp-ds/components'
import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import type { SavedReading } from '../../lib/tarot/archive'

function when(at: number): string {
  const day = 24 * 60 * 60 * 1000
  const now = new Date()
  const then = new Date(at)
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (at >= midnight) return 'today'
  if (at >= midnight - day) return 'yesterday'
  return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function TarotLedger({
  entries,
  onOpen,
  onBack,
}: {
  entries: SavedReading[]
  onOpen: (entry: SavedReading) => void
  onBack: () => void
}) {
  return (
    <section className="tarot-ledger" aria-label="Past readings">
      {entries.map((e) => {
        const spread = SPREADS.find((s) => s.id === e.spreadId)
        const cards = e.cards
          .map((c) => {
            const card = CARD_BY_ID.get(c.id)
            return card ? `${card.name}${c.reversed ? ', reversed' : ''}` : c.id
          })
          .join(' · ')
        return (
          <button key={e.id} type="button" className="tl-row" onClick={() => onOpen(e)}>
            <span className="tl-top">
              <span className="tl-name">{spread?.name ?? e.spreadId}</span>
              <span className="tl-date">{when(e.at)}</span>
            </span>
            <span className="tl-q">{e.question ? `“${e.question}”` : 'No question asked.'}</span>
            <span className="tl-cards">{cards}</span>
          </button>
        )
      })}
      <div className="tl-back">
        <Button variant="secondary" type="button" onClick={onBack}>
          Return to the table
        </Button>
      </div>
    </section>
  )
}
