/**
 * PortraitPlate — the avatar on the equipment slot's cell.
 *
 * Same ring recipe as the paperdoll and ItemPlate (a notch-clipped
 * wrapper filled with the ring colour, 1px padding, the well re-clipped
 * inside), so the character wears the same frame as their gear wherever
 * the portrait shows: the character sheet's avatar button at the 62px
 * paperdoll size, the side-panel strip at the compact `small` tier, and
 * the menu-sheet row at the `tiny` tier (pair it with cell={2}: integer
 * scales only, or the 1-bit mask blurs).
 */

import PixelPortrait from './PixelPortrait'

export default function PortraitPlate({
  seed,
  cell = 4,
  ink,
  small = false,
  tiny = false,
}: {
  seed: number
  cell?: number
  ink?: string
  small?: boolean
  tiny?: boolean
}) {
  return (
    <span className={`pp-plate${small ? ' sm' : ''}${tiny ? ' xs' : ''}`}>
      <span className="pp-plate-in">
        <PixelPortrait seed={seed} cell={cell} ink={ink} />
      </span>
    </span>
  )
}
