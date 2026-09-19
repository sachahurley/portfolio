/**
 * GemShelf, the draggable gem row.
 *
 * Pairs the gem track with the drag-into-fire hook: the fire it drops into
 * is whichever PixelFire the host passes a handle for (the card-floor one
 * on the character screen). The hook and the track live in one component
 * on purpose, so useGemDrag's unmount cleanup still owns the sockets it
 * dimmed mid-drag.
 *
 * The drag is the flourish, not the only path: a tap on a socket (or
 * Enter/Space, via GemTrack's buttons) wears the gem directly, with the
 * same fire surge and confirmation toast.
 */

import { useCallback, type RefObject } from 'react'
import { useXp } from '../../context/XpProvider'
import { runImpact } from '../../lib/impactFx'
import { THEMES, type ThemeId } from '../../lib/themes'
import type { PixelFireHandle } from '../PixelFire'
import GemTrack from './GemTrack'
import { useGemDrag } from './useGemDrag'

export default function GemShelf({
  fireApiRef,
}: {
  fireApiRef: RefObject<PixelFireHandle | null>
}) {
  const { setActiveGem, toast } = useXp()

  const activate = useCallback(
    (id: ThemeId) => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fireApiRef.current?.surge()
        const el = fireApiRef.current?.getElement()
        if (el) runImpact(el, THEMES[id])
      }
      setActiveGem(id)
      toast(
        id === 'default'
          ? 'reverted to the default look'
          : `wearing the ${THEMES[id].name} gem · site recolored`
      )
    },
    [fireApiRef, setActiveGem, toast]
  )

  const { onPointerDown } = useGemDrag({
    fireApiRef,
    onDrop: setActiveGem,
    toast,
    onTap: activate,
  })

  return <GemTrack onGemPointerDown={onPointerDown} onGemActivate={activate} />
}
