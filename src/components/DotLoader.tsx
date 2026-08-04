/**
 * DotLoader — inline loading indicator, modeled on a terminal-style
 * spinner: a 2x3 dot-matrix glyph (a braille cell) whose dots twinkle
 * independently at random brightnesses, beside a dim elapsed-time readout
 * ("2.9s", rolling to "28m, 2.9s" past a minute).
 *
 * Colors route through the theme tokens (dots --fg, text --body) so it
 * follows banner re-theming. prefers-reduced-motion: dots hold steady and
 * the readout updates once per second instead of ten times.
 */

import { useEffect, useRef, useState } from 'react'

const DOTS = 6 // 2 cols x 3 rows
const TWINKLE_MS = 130
const ON_CHANCE = 0.55

function formatElapsed(ms: number): string {
  const s = ms / 1000
  if (s < 60) return `${s.toFixed(1)}s`
  const m = Math.floor(s / 60)
  return `${m}m, ${(s % 60).toFixed(1)}s`
}

export default function DotLoader({
  label,
  showElapsed = true,
  startedAt,
  className,
}: {
  /** Optional text after the glyph (shown before the elapsed readout). */
  label?: string
  showElapsed?: boolean
  /** Epoch ms the work started; defaults to mount time. */
  startedAt?: number
  className?: string
}) {
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [elapsed, setElapsed] = useState('')
  const startRef = useRef<number | null>(startedAt ?? null)

  // Anchor the clock on mount (not render, which must stay pure).
  useEffect(() => {
    if (startedAt != null) startRef.current = startedAt
    else if (startRef.current == null) startRef.current = Date.now()
  }, [startedAt])

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const twinkle = () => {
      for (const el of dotRefs.current) {
        if (!el) continue
        const on = Math.random() < ON_CHANCE
        el.style.opacity = on ? String(0.3 + Math.random() * 0.7) : '0'
      }
    }
    if (still) {
      // Steady glyph: all dots on, dimmed.
      for (const el of dotRefs.current) if (el) el.style.opacity = '0.5'
    }

    const tick = () => setElapsed(formatElapsed(Date.now() - (startRef.current ?? Date.now())))
    tick()

    const timers: number[] = [window.setInterval(tick, still ? 1000 : 100)]
    if (!still) timers.push(window.setInterval(twinkle, TWINKLE_MS))
    return () => timers.forEach((t) => clearInterval(t))
  }, [])

  return (
    <span className={`dotloader${className ? ` ${className}` : ''}`} role="status" aria-label={label ?? 'loading'}>
      <span className="dotloader-glyph" aria-hidden="true">
        {Array.from({ length: DOTS }, (_, i) => (
          <span
            key={i}
            className="dotloader-dot"
            ref={(el) => {
              dotRefs.current[i] = el
            }}
          />
        ))}
      </span>
      {label && <span className="dotloader-label">{label}</span>}
      {showElapsed && <span className="dotloader-time">{elapsed}</span>}
    </span>
  )
}
