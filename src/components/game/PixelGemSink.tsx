/**
 * PixelGemSink — the thing earned theme gems get dropped into.
 *
 * Strictly 1-bit, per src/lib/dither/oneBit.ts: every cell is either the ink
 * or nothing. There is no second paint colour and no ramp. Mid tones exist
 * only as Bayer-ordered dither density, so a dim region is sparse ink over the
 * page rather than a darker shade of it. An earlier cauldron here carried five
 * iron tones, a six-step brew ramp and a twelve-step ember ramp — twenty-odd
 * colours — which is why it read as fussy against the rest of the site.
 *
 * The ink is the worn gem's ACCENT. That is the whole idea: the object is
 * drawn in the colour it controls, so dropping a gem in recolours the object
 * and the site in the same stroke.
 *
 * Every variant works the same way. Build a scalar field in 0..1 over the art
 * grid, then `v > bayerThreshold(x, y)` decides ink or nothing. Shape, motion
 * and heat are all just different fields.
 *
 * Exposes the handle useGemDrag consumes (setFlare / surge / getElement /
 * getAnchor). The wrapper is the drop box and the canvas may overhang it, so
 * .ch-gemsink stays pointer-events: none — otherwise the canvas swallows the
 * pointerdown and the gem sockets above stop being draggable.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { bayerThreshold } from '../../lib/dither/oneBit'
import { THEMES } from '../../lib/themes'
import type { GemSinkHandle } from '../progress/useGemDrag'

export type SinkVariant = 'hearth' | 'pool' | 'brazier'

const PX = 5
const FRAME_MS = 110
const SURGE_MS = 850

/** Grid per variant. `fluid` widths are measured from the host element. */
const GRID: Record<SinkVariant, { cols: number; rows: number; fluid: boolean }> = {
  hearth: { cols: 0, rows: 15, fluid: true },
  pool: { cols: 30, rows: 15, fluid: false },
  brazier: { cols: 26, rows: 26, fluid: false },
}

/* ---- brazier silhouette: a bowl on a stem, in cells ---- */
const BOWL_TOP = 14
const BOWL_BOT = 20
const STEM_BOT = 25

const PixelGemSink = forwardRef<GemSinkHandle, { variant?: SinkVariant }>(function PixelGemSink(
  { variant = 'hearth' },
  ref
) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const flareRef = useRef(false)
  const surgeUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const tickRef = useRef(0)
  const fireRef = useRef<number[]>([])
  /** Expanding ripple rings (pool), as radii. */
  const ringsRef = useRef<number[]>([])
  /** Surfacing bubbles (pool): x, y, age. */
  const bubRef = useRef<Array<{ x: number; y: number; age: number }>>([])
  /** Only a fluid variant measures; a fixed one derives its width, so this
   *  never has to be written from an effect body. */
  const [fluidCols, setFluidCols] = useState(40)
  const [visible, setVisible] = useState(false)

  const rows = GRID[variant].rows
  const cols = GRID[variant].fluid ? fluidCols : GRID[variant].cols
  const { activeGem } = useXp()
  const ink = THEMES[activeGem].accent

  /** 0 resting, 1 flaring, 2 surging. */
  const heat = useCallback((): 0 | 1 | 2 => {
    if (performance.now() < surgeUntilRef.current) return 2
    return flareRef.current ? 1 : 0
  }, [])

  /** Where the drop lands, in cells from the grid's top. */
  const anchorRow = useMemo(
    () => (variant === 'brazier' ? BOWL_TOP : variant === 'pool' ? rows / 2 : 2),
    [variant, rows]
  )

  const paint = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, cv.width, cv.height)
    ctx.fillStyle = ink
    const h = heat()
    const t = tickRef.current
    const fire = fireRef.current
    const cxc = (cols - 1) / 2

    /** The one rule: density becomes ink, everything else is nothing. */
    const put = (x: number, y: number, v: number) => {
      if (v > bayerThreshold(x, y)) ctx.fillRect(x * PX, y * PX, PX, PX)
    }

    if (variant === 'pool') {
      const rx = cols / 2 - 1
      const ry = rows / 2 - 1
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = (x - cxc) / rx
          const b = (y - (rows - 1) / 2) / ry
          const r = Math.sqrt(a * a + b * b)
          if (r > 1) continue
          // brightest at the middle, thinning to the rim
          let v = (1 - r * r) * (h === 2 ? 1.15 : h === 1 ? 0.95 : 0.82)
          // ripples running outward
          for (const ring of ringsRef.current) {
            v += 0.4 * Math.exp(-((r - ring) ** 2) / 0.012)
          }
          // a slow swell, so a resting pool still moves
          v += 0.05 * Math.sin(r * 6 - t * 0.25)
          put(x, y, v)
        }
      }
      // bubbles surface as voids punched out of the ink
      ctx.globalCompositeOperation = 'destination-out'
      for (const bb of bubRef.current) {
        const s = bb.age < 3 ? 1 : 2
        ctx.fillRect((bb.x - (s - 1)) * PX, (bb.y - (s - 1)) * PX, s * 2 * PX, s * PX)
      }
      ctx.globalCompositeOperation = 'source-over'
      return
    }

    // hearth and brazier both burn; the brazier just has a vessel under it
    const fireRows = variant === 'brazier' ? BOWL_TOP + 1 : rows
    const maxV = 14
    for (let y = 0; y < fireRows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = fire[y * cols + x] ?? 0
        if (val <= 0) continue
        put(x, y, val / maxV)
      }
    }

    if (variant === 'brazier') {
      // the vessel: solid ink, the one place density is not in play
      for (let y = BOWL_TOP; y <= BOWL_BOT; y++) {
        const k = (y - BOWL_TOP) / (BOWL_BOT - BOWL_TOP)
        const hw = Math.round(9 - 5 * k * k)
        for (let x = cxc - hw; x <= cxc + hw; x++) {
          // hollow: only the walls and the base carry ink
          const edge = x <= cxc - hw + 1 || x >= cxc + hw - 1 || y >= BOWL_BOT - 1
          if (edge) ctx.fillRect(Math.round(x) * PX, y * PX, PX, PX)
        }
      }
      for (let y = BOWL_BOT + 1; y <= STEM_BOT; y++) {
        const foot = y >= STEM_BOT - 1
        const hw = foot ? 5 : 1
        for (let x = cxc - hw; x <= cxc + hw; x++) ctx.fillRect(Math.round(x) * PX, y * PX, PX, PX)
      }
    }
  }, [ink, heat, cols, rows, variant])

  const step = useCallback(() => {
    const h = heat()
    tickRef.current += 1

    if (variant === 'pool') {
      // rings expand and retire; a surge sends a big one out
      ringsRef.current = ringsRef.current.map((r) => r + 0.055).filter((r) => r < 1.15)
      const wantRing = h === 2 ? 0.5 : 0.045
      if (Math.random() < wantRing) ringsRef.current = [...ringsRef.current, 0.05]
      bubRef.current = bubRef.current
        .map((b) => ({ ...b, age: b.age + 1 }))
        .filter((b) => b.age < 6)
      const wantBub = h === 2 ? 0.8 : h === 1 ? 0.45 : 0.3
      if (Math.random() < wantBub) {
        const a = Math.random() * Math.PI * 2
        const r = Math.sqrt(Math.random()) * 0.72
        bubRef.current = [
          ...bubRef.current,
          {
            x: Math.round((cols - 1) / 2 + (Math.cos(a) * r * cols) / 2),
            y: Math.round((rows - 1) / 2 + (Math.sin(a) * r * rows) / 2),
            age: 0,
          },
        ]
      }
      return
    }

    // doom-fire: pull from below with random decay and wind. The grid is
    // rebuilt rather than mutated - it lives behind a ref, and mutating
    // through a ref is what react-hooks/immutability exists to stop.
    const fireRows = variant === 'brazier' ? BOWL_TOP + 1 : rows
    const n = cols * fireRows
    const prev = fireRef.current.length === n ? fireRef.current : new Array<number>(n).fill(0)
    const next = new Array<number>(n).fill(0)
    for (let x = 0; x < cols; x++) {
      for (let y = 1; y < fireRows; y++) {
        const src = prev[y * cols + x]
        if (src === 0) continue
        const decay = Math.floor(Math.random() * 4)
        const wind = Math.floor(Math.random() * 3) - 1
        const dx = Math.min(Math.max(x + wind, 0), cols - 1)
        next[(y - 1) * cols + dx] = Math.max(0, src - decay)
      }
    }
    // seed the base row. The brazier's fire only burns inside its bowl.
    const base = (fireRows - 1) * cols
    const cxc = (cols - 1) / 2
    for (let x = 0; x < cols; x++) {
      if (variant === 'brazier' && Math.abs(x - cxc) > 7) continue
      const cool = h === 2 ? 0 : Math.floor(Math.random() * (h === 1 ? 2 : 4))
      next[base + x] = 14 - cool
    }
    fireRef.current = next
  }, [heat, cols, rows, variant])

  useImperativeHandle(ref, () => ({
    setFlare(on: boolean) {
      flareRef.current = on
    },
    surge() {
      surgeUntilRef.current = performance.now() + SURGE_MS
      if (variant === 'pool') ringsRef.current = [...ringsRef.current, 0.02]
    },
    getElement() {
      return wrapRef.current
    },
    getAnchor() {
      const el = wrapRef.current
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        x: r.left + r.width / 2,
        y: r.top + anchorRow * PX,
        rx: Math.min(r.width / 2, 60),
      }
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

  // A fluid variant takes its width from the card it sits in, like the old
  // hearth did: a floor should reach the walls.
  useEffect(() => {
    if (!GRID[variant].fluid) return
    const el = wrapRef.current
    if (!el) return
    const measure = () => setFluidCols(Math.max(12, Math.floor(el.clientWidth / PX)))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [variant])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    cv.width = cols * PX
    cv.height = rows * PX
  }, [cols, rows])

  useEffect(() => {
    // Reduced motion gets one settled frame and no loop.
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
    <div
      ref={wrapRef}
      className="ch-gemsink"
      style={{
        width: GRID[variant].fluid ? '100%' : cols * PX,
        height: rows * PX,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: cols * PX,
          height: rows * PX,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
})

export default PixelGemSink
