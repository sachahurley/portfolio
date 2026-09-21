/**
 * One card in the spread: a 3D flip from the deck's back to the baked face
 * (tarot/* rows on the Urizen sheet, via the generated tarotTiles map), with
 * reversed cards landing upside down. Faces tint through the theme like
 * every other sprite.
 *
 * A11y follows the house canvas pattern: the art is aria-hidden and a
 * visually-hidden line carries the meaning ("Past: The Tower, reversed").
 *
 * With `onReveal` the card is a button the visitor taps to turn it (the
 * button stays mounted after the flip, just disabled, so the 3D flip
 * transition is never interrupted by a wrapper swap).
 */

import { Badge } from '@scorp-ds/components'
import { TileBox } from '../TileSprite'
import { TAROT_TILES, TAROT_BACK, TAROT_TILE_W, TAROT_TILE_H } from '../../game/tarotTiles'
import type { DrawnCard } from '../../lib/tarot/draw'

export default function TarotCardView({
  drawn,
  faceUp,
  scale = 4,
  onReveal,
}: {
  drawn: DrawnCard
  faceUp: boolean
  /** TileBox pixel scale: 4 desktop (100x152), 3 handheld (75x114). */
  scale?: number
  /** When set, the face-down card is a tap target that turns it over. */
  onReveal?: () => void
}) {
  const cell = TAROT_TILES[drawn.card.id]
  const orientation = drawn.reversed ? ', reversed' : ''
  const card = (
    <div className={`tc-card${faceUp ? ' tc-up' : ''}${drawn.reversed ? ' tc-rev' : ''}`}>
      <div className="tc-inner" aria-hidden="true">
        <div className="tc-back">
          <TileBox x={TAROT_BACK[0]} y={TAROT_BACK[1]} w={TAROT_TILE_W} h={TAROT_TILE_H} scale={scale} tint="var(--body)" />
        </div>
        <div className="tc-face">
          {cell && (
            <TileBox x={cell[0]} y={cell[1]} w={TAROT_TILE_W} h={TAROT_TILE_H} scale={scale} tint="var(--fg)" />
          )}
        </div>
      </div>
      <span className="sr-only">
        {faceUp ? `${drawn.position.label}: ${drawn.card.name}${orientation}` : `${drawn.position.label}: face down`}
      </span>
    </div>
  )
  return (
    <figure className="tc-slot">
      {onReveal ? (
        <button
          type="button"
          className="tc-tap"
          onClick={onReveal}
          disabled={faceUp}
          aria-label={faceUp ? undefined : `Turn the ${drawn.position.label} card`}
        >
          {card}
        </button>
      ) : (
        card
      )}
      <figcaption className="tc-poslabel">
        {drawn.position.label}
        {faceUp && <span className="tc-name">{drawn.card.name}</span>}
        {faceUp && drawn.reversed && (
          <Badge size="small" variant="default">
            Reversed
          </Badge>
        )}
      </figcaption>
    </figure>
  )
}
