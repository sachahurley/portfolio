/**
 * One card in the spread: a 3D flip from the deck's back to the face, with
 * reversed cards landing upside down. Interim face art is typographic (name
 * on a framed plate); the baked tarot/* tiles replace the face center once
 * scripts/tiles/tarot.mjs lands.
 *
 * A11y follows the house canvas pattern: the art is aria-hidden and a
 * visually-hidden line carries the meaning ("Past: The Tower, reversed").
 */

import type { DrawnCard } from '../../lib/tarot/draw'

const SUIT_MARK: Record<string, string> = {
  wands: '|',
  cups: 'U',
  swords: '†',
  pentacles: '◆',
}

function rankLine(drawn: DrawnCard): string {
  const { card } = drawn
  if (card.arcana === 'major') {
    const numerals = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI']
    return numerals[card.rank ?? 0]
  }
  const mark = SUIT_MARK[card.suit ?? ''] ?? ''
  const rank = card.rank ?? 0
  const face = { 1: 'A', 11: 'P', 12: 'Kn', 13: 'Q', 14: 'K' }[rank]
  return `${face ?? rank} ${mark}`
}

export default function TarotCardView({
  drawn,
  faceUp,
}: {
  drawn: DrawnCard
  faceUp: boolean
}) {
  const orientation = drawn.reversed ? ', reversed' : ''
  return (
    <figure className="tc-slot">
      <div className={`tc-card${faceUp ? ' tc-up' : ''}${drawn.reversed ? ' tc-rev' : ''}`}>
        <div className="tc-inner" aria-hidden="true">
          <div className="tc-back" />
          <div className="tc-face">
            <span className="tc-rank">{rankLine(drawn)}</span>
            <span className="tc-name">{drawn.card.name}</span>
          </div>
        </div>
        <span className="sr-only">
          {faceUp ? `${drawn.position.label}: ${drawn.card.name}${orientation}` : `${drawn.position.label}: face down`}
        </span>
      </div>
      <figcaption className="tc-poslabel">{drawn.position.label}</figcaption>
    </figure>
  )
}
