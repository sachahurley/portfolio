/**
 * PixelHearth — the floor of flame the earned theme gems get dropped into.
 *
 * Strictly 1-bit, per src/lib/dither/oneBit.ts: every cell is either the ink
 * or nothing. There is no second paint colour and no ramp. Heat survives only
 * as Bayer-ordered dither density, so the base is solid ink and the tips
 * scatter into the page. A cauldron lived here before, carrying five iron
 * tones, a six-step brew ramp and a twelve-step ember ramp; twenty-odd
 * colours against a site that paints in one is why it read as fussy.
 *
 * The ink is the worn gem's ACCENT. That is the whole idea: the fire is drawn
 * in the colour it controls, so dropping a gem in recolours the flame and the
 * site in the same stroke.
 *
 * The sim is the classic doom-fire spread - each cell pulls from the one
 * below with random decay and wind - which is what the site's old camp fire
 * ran. What is new is the output stage: instead of indexing a palette, the
 * heat is a density and `v > bayerThreshold(x, y)` decides ink or nothing.
 *
 * Fluid width: a floor should reach the walls, so it measures the card it
 * sits in rather than taking a fixed size.
 *
 * Exposes the handle useGemDrag consumes (setFlare / surge / getElement /
 * getAnchor). The wrapper is the drop box, and it stays pointer-events: none
 * so it can never swallow a pointerdown meant for the gem sockets above it.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { bayerThreshold } from '../../lib/dither/oneBit'
import { THEMES } from '../../lib/themes'
import type { GemSinkHandle } from '../progress/useGemDrag'

const PX = 5 // screen px per art cell
const ROWS = 15 // the band's height in cells; flames peak below the ceiling
const MAX = 14 // hottest cell value, and the density denominator
const FRAME_MS = 110
const SURGE_MS = 850

/** A dropped gem lands this far down the band: in the flames, not on the tips. */
const ANCHOR_ROW = 3

const PixelHearth = forwardRef<GemSinkHandle>(function PixelHearth(_props, ref) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const flareRef = useRef(false)
  const surgeUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const fireRef = useRef<number[]>([])
  const [cols, setCols] = useState(40)
  const [visible, setVisible] = useState(false)

  const { activeGem } = useXp()
  // THEMES.default.accent is a getter that resolves the scorp-ds token, so the
  // stock fire follows the design system rather than a mirrored hex.
  const ink = THEMES[activeGem].accent

  /** 0 resting, 1 flaring (a gem is over it), 2 surging (one just landed). */
  const heat = useCallback((): 0 | 1 | 2 => {
    if (performance.now() < surgeUntilRef.current) return 2
    return flareRef.current ? 1 : 0
  }, [])

  const paint = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, cv.width, cv.height)
    ctx.fillStyle = ink
    const fire = fireRef.current
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < cols; x++) {
        const v = (fire[y * cols + x] ?? 0) / MAX
        // the one rule: density becomes ink, everything else is nothing
        if (v > bayerThreshold(x, y)) ctx.fillRect(x * PX, y * PX, PX, PX)
      }
    }
  }, [ink, cols])

  const step = useCallback(() => {
    const h = heat()
    const n = cols * ROWS
    // Rebuilt rather than mutated: the grid lives behind a ref, and mutating
    // through a ref is what react-hooks/immutability exists to stop.
    const prev = fireRef.current.length === n ? fireRef.current : new Array<number>(n).fill(0)
    const next = new Array<number>(n).fill(0)
    for (let x = 0; x < cols; x++) {
      for (let y = 1; y < ROWS; y++) {
        const src = prev[y * cols + x]
        if (src === 0) continue
        const decay = Math.floor(Math.random() * 4)
        const wind = Math.floor(Math.random() * 3) - 1
        const dx = Math.min(Math.max(x + wind, 0), cols - 1)
        next[(y - 1) * cols + dx] = Math.max(0, src - decay)
      }
    }
    // the base row: a flare keeps it hotter, a surge pins it to the ceiling
    const base = (ROWS - 1) * cols
    for (let x = 0; x < cols; x++) {
      const cool = h === 2 ? 0 : Math.floor(Math.random() * (h === 1 ? 2 : 4))
      next[base + x] = MAX - cool
    }
    fireRef.current = next
  }, [heat, cols])

  useImperativeHandle(ref, () => ({
    setFlare(on: boolean) {
      flareRef.current = on
    },
    surge() {
      surgeUntilRef.current = performance.now() + SURGE_MS
    },
    getElement() {
      return wrapRef.current
    },
    getAnchor() {
      const el = wrapRef.current
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + ANCHOR_ROW * PX, rx: r.width / 2 }
    },
  }))

  // Burn only while on screen (the character sheet scrolls on handhelds).
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // A floor should reach the walls, so the grid is measured from the card.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => setCols(Math.max(12, Math.floor(el.clientWidth / PX)))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    cv.width = cols * PX
    cv.height = ROWS * PX
  }, [cols])

  useEffect(() => {
    // Reduced motion gets one settled frame and no loop: still a fire, it
    // just isn't flickering at anyone.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (let i = 0; i < 40; i++) step()
      paint()
      return
    }
    if (!visible) return
    const run = (t: number) => {
      rafRef.current = requestAnimationFrame(run)
      if (t - lastRef.current < FRAME_MS) return
      lastRef.current = t
      step()
      paint()
    }
    rafRef.current = requestAnimationFrame(run)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [visible, step, paint])

  // Repaint at once on a theme change so the ink turns over with the site.
  useEffect(() => {
    paint()
  }, [paint])

  return (
    <div ref={wrapRef} className="ch-hearth" aria-hidden="true" style={{ height: ROWS * PX }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: cols * PX,
          height: ROWS * PX,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
})

export default PixelHearth
