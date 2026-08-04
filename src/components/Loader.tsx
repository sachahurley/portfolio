/**
 * Loader — the title screen shown on initial load.
 * Stays up until the visitor taps, clicks, or presses a key, then fades
 * out and unmounts.
 *
 * The title is DripTitle (italic molten-drip "SACHA HURLEY"); beneath it,
 * the save-file readout: NEW GAME for first-time visitors, CONTINUE plus
 * the character (portrait, name, level, banners) for returning ones —
 * saving itself is automatic, this is just where the save shows. The older
 * PixelName/AsciiName letterform renderers still exist in the repo but
 * are unused.
 */

import { useEffect, useState } from 'react'
import DripTitle from './DripTitle'
import JeweledFrame from './JeweledFrame'
import PixelPortrait from './game/PixelPortrait'
import { useXp } from '../context/XpProvider'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)
  const { isReturning, name, level, avatarSeed, eggs } = useXp()

  // Once dismissed, let the 0.4s opacity fade play, then unmount.
  useEffect(() => {
    if (!hidden) return
    const t = setTimeout(() => setGone(true), 450)
    return () => clearTimeout(t)
  }, [hidden])

  // The overlay blocks the whole site, so a key press dismisses it too.
  useEffect(() => {
    if (hidden) return
    const onKey = () => setHidden(true)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hidden])

  if (gone) return null

  return (
    // Dismiss on click, NOT pointerdown: hiding on pointerdown turns off the
    // overlay's pointer-events mid-tap, so the tap's pointerup/click would
    // fall through and activate whatever sits underneath on the page.
    <div id="loader" className={hidden ? 'hide' : undefined} onClick={() => setHidden(true)}>
      <DripTitle />
      <div className="title-save">
        {isReturning ? (
          <>
            <div className="ts-char">
              <PixelPortrait seed={avatarSeed} cell={3} />
              <span className="ts-line">
                continue — {name} · Lv {level.level + 1} {level.title}
                {eggs.length > 0 && ` · ${eggs.length} banner${eggs.length > 1 ? 's' : ''}`}
              </span>
            </div>
            <span className="ts-hint">press any key</span>
          </>
        ) : (
          <>
            <span className="ts-line">new game</span>
            <span className="ts-hint">press any key to begin</span>
          </>
        )}
      </div>
      <JeweledFrame />
    </div>
  )
}
