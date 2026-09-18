/**
 * Typed-out text. The site's first per-character reveal, so the a11y split
 * lives here: the animated copy is aria-hidden while a visually-hidden twin
 * carries the full text, so screen readers get each section once, whole,
 * never per keystroke. Under prefers-reduced-motion (or after a skip) the
 * full text renders immediately.
 *
 * rAF accumulator rather than setInterval: characters per second stays
 * steady under frame drops, and there is no timer to leak.
 */

import { useEffect, useRef, useState } from 'react'

const CPS = 35 // characters per second

export default function Typewriter({
  text,
  active,
  skip,
  onDone,
}: {
  text: string
  /** Starts typing when true; false renders nothing (section not reached). */
  active: boolean
  /** Jump to the end (visitor tapped, or a later section forced completion). */
  skip?: boolean
  onDone?: () => void
}) {
  const [shown, setShown] = useState(0)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const instant = reduced || skip

  useEffect(() => {
    if (!active || doneRef.current) return
    if (instant) {
      setShown(text.length)
      doneRef.current = true
      onDoneRef.current?.()
      return
    }
    let raf = 0
    let last = performance.now()
    let acc = 0
    let count = 0
    const tick = (now: number) => {
      acc += ((now - last) / 1000) * CPS
      last = now
      const next = Math.min(text.length, Math.floor(acc))
      if (next !== count) {
        count = next
        setShown(next)
      }
      if (count >= text.length) {
        doneRef.current = true
        onDoneRef.current?.()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, instant, text])

  if (!active) return null
  return (
    <>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
      <span className="sr-only">{text}</span>
    </>
  )
}
