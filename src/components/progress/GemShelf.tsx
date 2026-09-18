/**
 * GemShelf, the draggable gem row.
 *
 * Pairs the gem track with the drag-into-fire hook: the fire it drops into
 * is whichever PixelFire the host passes a handle for (the card-floor one
 * on the character screen). The hook and the track live in one component
 * on purpose, so useGemDrag's unmount cleanup still owns the sockets it
 * dimmed mid-drag.
 */

import type { RefObject } from 'react'
import { useXp } from '../../context/XpProvider'
import type { PixelFireHandle } from '../PixelFire'
import GemTrack from './GemTrack'
import { useGemDrag } from './useGemDrag'

export default function GemShelf({
  fireApiRef,
}: {
  fireApiRef: RefObject<PixelFireHandle | null>
}) {
  const { setActiveGem, toast } = useXp()

  const { onPointerDown } = useGemDrag({
    fireApiRef,
    onDrop: setActiveGem,
    toast,
  })

  return <GemTrack onGemPointerDown={onPointerDown} />
}
