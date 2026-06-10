/**
 * LevelUpModal — the egg-award dialog, mounted once in MinimalChrome.
 *
 * Shows the head of XpProvider's modal queue (threshold numbers 1..3); the
 * queue lets several level-ups from one award present sequentially with a
 * short beat between them. The title uses the display level (band + 1) so it
 * matches the "Level N · ..." progress copy. Esc or the button dismisses.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useXp } from '../context/XpProvider'
import { LEVEL_EGGS, THEMES } from '../lib/themes'
import Egg from './progress/Egg'

export default function LevelUpModal() {
  const { modalQueue, dismissModal } = useXp()
  const head = modalQueue.length ? modalQueue[0] : null
  const [shown, setShown] = useState<number | null>(null)
  const wasOpenRef = useRef(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  // Follow the queue head; when one modal replaces another, pause 260ms so
  // the swap reads as two awards rather than the text flashing in place.
  // (Async timeouts rather than direct setState, per react-hooks rules.)
  useEffect(() => {
    const delay = head != null && wasOpenRef.current ? 260 : 0
    const t = window.setTimeout(() => setShown(head), delay)
    return () => clearTimeout(t)
  }, [head])

  // Focus the close button on open, restore focus on close, Esc dismisses.
  useEffect(() => {
    if (shown == null) {
      wasOpenRef.current = false
      prevFocusRef.current?.focus()
      prevFocusRef.current = null
      return
    }
    wasOpenRef.current = true
    prevFocusRef.current = document.activeElement as HTMLElement | null
    btnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [shown, dismissModal])

  if (shown == null) return null
  const egg = LEVEL_EGGS[shown - 1]
  if (!egg) return null

  return createPortal(
    <div className="emodal open" role="dialog" aria-modal="true" aria-label="Level up">
      <div className="em-card">
        <div className="em-egg">
          <Egg themeId={egg} cls="egg-art-lg" />
        </div>
        <div className="em-title">{`Level ${shown + 1}!`}</div>
        <div className="em-text">
          You earned the <b>{THEMES[egg].name}</b> egg. Drop it into the fire on the home page to
          recolor the site.
        </div>
        <button className="em-btn" ref={btnRef} onClick={dismissModal}>
          Add to your eggs
        </button>
      </div>
    </div>,
    document.body
  )
}
