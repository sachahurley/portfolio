/**
 * Toaster
 *
 * One full-width summary plate above the floating menu button (mobile
 * only; the message log covers desktop). Simultaneous toasts fold into
 * a single line: XP amounts sum, the first reason shows, the first
 * plain message (chest / unlocked) appends as a short fragment, and
 * everything else becomes a "+N more" counter. Each new arrival
 * extends the card's life; when it fades out, all consumed toasts are
 * removed and the next arrival starts a fresh card.
 *
 * Deliberately NOT the DS Toaster: this is a summarizer (one folding
 * plate with below-dock exit choreography), not a toast queue. Its plate
 * CSS (.toast) matches the DS Toast recipe token-for-token.
 */

import { useEffect, useRef, useState } from 'react'
import { useXp } from '../context/XpProvider'

const HOLD_MS = 3200
const DONE_MS = 3500

export default function Toaster() {
  const { toasts, removeToast } = useXp()
  const [show, setShow] = useState(false)

  // The done timer reads the toasts present when it fires (any newer
  // arrival re-arms the timers, so in practice this equals the closure).
  const toastsRef = useRef(toasts)
  useEffect(() => {
    toastsRef.current = toasts
  }, [toasts])

  // Re-armed by every arrival (keyed on the newest id, not the array,
  // so removals don't restart the clock).
  const lastId = toasts.length ? toasts[toasts.length - 1].id : 0
  useEffect(() => {
    if (!lastId) return
    const raf = requestAnimationFrame(() => setShow(true))
    const hideTimer = setTimeout(() => setShow(false), HOLD_MS)
    const doneTimer = setTimeout(() => {
      for (const t of toastsRef.current) removeToast(t.id)
    }, DONE_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hideTimer)
      clearTimeout(doneTimer)
    }
  }, [lastId, removeToast])

  const xp = toasts.filter((t) => t.amount != null)
  const plain = toasts.filter((t) => t.amount == null)
  const total = xp.reduce((sum, t) => sum + (t.amount ?? 0), 0)
  // Fragments actually shown: the first XP reason and the first plain
  // message (shortened to its lead clause when riding an XP line, so
  // "found a chest · open it..." reads as "found a chest"). Sentence
  // case: only the line's first fragment is capitalized, so a plain
  // message leading the line caps up and stays lowercase mid-line.
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const plainMsg = plain.length
    ? xp.length
      ? plain[0].msg.split(' · ')[0]
      : cap(plain[0].msg)
    : null
  const more = toasts.length - (xp.length ? 1 : 0) - (plain.length ? 1 : 0)

  return (
    <div id="toaster" aria-live="polite">
      {toasts.length > 0 && (
        <div className={`toast${show ? ' show' : ''}`}>
          {xp.length > 0 && (
            <>
              <span className="toast-xp">+{total} XP</span>
              {' · '}
              {xp[0].msg}
            </>
          )}
          {plainMsg && (
            <>
              {xp.length > 0 && ' · '}
              {plainMsg}
            </>
          )}
          {more > 0 && <span className="toast-more"> · +{more} more</span>}
        </div>
      )}
    </div>
  )
}
