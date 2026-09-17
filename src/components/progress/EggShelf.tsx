/**
 * EggShelf, the draggable egg row.
 *
 * Pairs the egg track with the drag-into-fire hook: the fire it drops into
 * is whichever PixelFire the host passes a handle for (the page-bottom one
 * on the classic home page, the card-floor one on the character screen).
 * The hook and the track live in one component on purpose, so useEggDrag's
 * unmount cleanup still owns the slots it dimmed mid-drag.
 */

import type { RefObject } from 'react'
import { useXp } from '../../context/XpProvider'
import type { PixelFireHandle } from '../PixelFire'
import EggTrack from './EggTrack'
import { useEggDrag } from './useEggDrag'

export default function EggShelf({
  fireApiRef,
}: {
  fireApiRef: RefObject<PixelFireHandle | null>
}) {
  const { setActiveEgg, toast } = useXp()

  const { onPointerDown } = useEggDrag({
    fireApiRef,
    onDrop: setActiveEgg,
    toast,
  })

  return <EggTrack onEggPointerDown={onPointerDown} />
}
