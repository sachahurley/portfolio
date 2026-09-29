/**
 * GemShelf, the draggable gem row.
 *
 * Pairs the gem track with the drag-into-the-pot hook: the sink it drops into
 * is whichever GemSinkHandle the host passes (the PixelCauldron sitting under
 * the track in the character screen's stats card). The hook and the track live
 * in one component on purpose, so useGemDrag's unmount cleanup still owns the
 * sockets it dimmed mid-drag.
 *
 * The drag is the flourish, not the only path: a tap on a socket (or
 * Enter/Space, via GemTrack's buttons) wears the gem directly, with the
 * same boil-over and confirmation toast.
 */

import { useCallback, type RefObject } from 'react'
import { useXp } from '../../context/XpProvider'
import { runImpact } from '../../lib/impactFx'
import { THEMES, type ThemeId } from '../../lib/themes'
import GemTrack from './GemTrack'
import { useGemDrag, type GemSinkHandle } from './useGemDrag'

export default function GemShelf({ sinkRef }: { sinkRef: RefObject<GemSinkHandle | null> }) {
  const { setActiveGem, toast } = useXp()

  const activate = useCallback(
    (id: ThemeId) => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        sinkRef.current?.surge()
        const el = sinkRef.current?.getElement()
        if (el) runImpact(el, THEMES[id], sinkRef.current?.getAnchor() ?? undefined)
      }
      setActiveGem(id)
      toast(
        id === 'default'
          ? 'reverted to the default look'
          : `wearing the ${THEMES[id].name} gem · site recolored`
      )
    },
    [sinkRef, setActiveGem, toast]
  )

  const { onPointerDown } = useGemDrag({
    sinkRef,
    onDrop: setActiveGem,
    toast,
    onTap: activate,
  })

  return <GemTrack onGemPointerDown={onPointerDown} onGemActivate={activate} />
}
