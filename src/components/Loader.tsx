/**
 * Loader — full-screen welcome screen shown on initial load.
 * Stays up until the visitor taps, clicks, or presses a key, then fades
 * out and unmounts.
 *
 * The title is DripTitle (italic molten-drip "SACHA HURLEY"); the older
 * PixelName/AsciiName letterform renderers still exist in the repo but
 * are unused.
 */

import { useEffect, useState } from 'react'
import DripTitle from './DripTitle'
import JeweledFrame from './JeweledFrame'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)

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
      <JeweledFrame />
    </div>
  )
}
