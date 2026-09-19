/**
 * PortraitPlate — the avatar on the equipment slot's cell.
 *
 * Same ring recipe as the paperdoll and ItemPlate (a notch-clipped
 * wrapper filled with the ring colour, 1px padding, the well re-clipped
 * inside), so the character wears the same frame as their gear wherever
 * the portrait shows: the character sheet's avatar button at the 62px
 * paperdoll size, the side-panel and menu-sheet strips at the compact
 * `small` tier.
 */

import PixelPortrait from './PixelPortrait'

export default function PortraitPlate({
  seed,
  cell = 4,
  small = false,
}: {
  seed: number
  cell?: number
  small?: boolean
}) {
  return (
    <span className={`pp-plate${small ? ' sm' : ''}`}>
      <span className="pp-plate-in">
        <PixelPortrait seed={seed} cell={cell} />
      </span>
    </span>
  )
}
