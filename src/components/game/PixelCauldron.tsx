/**
 * PixelCauldron — the gem sink on the character screen.
 *
 * A pot of brew that the earned theme gems get dropped into. It replaced the
 * camp fire as the drop target: same imperative handle (setFlare / surge /
 * getElement), plus getAnchor so a drop lands on the lip rather than at the
 * pot's feet.
 *
 * Drawn on a canvas rather than from the Urizen sheet — the sheet only carries
 * a lidded pot and a hanging sign, and neither boils or re-tints. Geometry is
 * in CELLS scaled by an integer PX, so the art stays pixel-perfect.
 *
 * Traced from a reference, level-on: a wide oval belly, a flat lip slab with
 * dropped end tabs, four curled feet, and two soft highlights on the iron.
 * There is NO visible opening — you never see the surface. The boil is told
 * entirely by what escapes: brew running down the outside in drips, and round
 * bubbles drifting up past the lip.
 *
 * The lip is a flat slab and that is fine HERE, because the belly is wider
 * than it is. A slab that is the widest thing on the pot stops reading as a
 * rim and starts reading as a table the pot stands behind; an earlier
 * top-down pass learned that the hard way.
 *
 * The brew takes the worn gem's ACCENT, not the theme's fire triple: the
 * triple is dull bone on the default theme, which made the pot look like
 * dishwater.
 *
 * The wrapper is sized to the POT and the taller canvas is bottom-aligned
 * inside it, so the rising bubbles spill upward as transparent pixels — the
 * recipe PixelFire used. That overhang can reach the gem sockets, which is why
 * .ch-cauldron is pointer-events: none; otherwise the canvas swallows the
 * pointerdown and the sockets above it stop being draggable.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES } from '../../lib/themes'
import type { GemSinkHandle } from '../progress/useGemDrag'

const PX = 5 // screen px per art pixel
const COLS = 35
const ROWS = 36
const CX = 17

/* ---- traced proportions ----
   Reference measures, as fractions of the belly half-width: lip 0.82, body top
   0.79, base 0.76, and a body 1.86x wider than tall with its widest point at
   mid-height. The belly is the widest thing on the pot; the lip is not. */
const BELLY_HW = 15
const TOP_HW = 12 // the wall just under the lip
const BASE_HW = 12
const LIP_HW = 13 // overhangs the wall by one cell, never reaching the belly
const BODY_H = 16
const FOOT_H = 3

const Y_BASE = ROWS - 1 - FOOT_H // 32
const Y_TOP = Y_BASE - BODY_H // 16, the wall's first row
const Y_BELLY = Y_TOP + 8 // widest at mid-height
const Y_LIP = Y_TOP - 2 // the slab: two rows, with tabs dropped at its ends
const ART_TOP = Y_LIP
const VISUAL_H = (ROWS - ART_TOP) * PX

/** Four curled feet, at the offsets the reference puts them. */
const FEET = [-9, -4, 4, 9]

/** Where brew runs down the outside, and how far each one reaches. */
const DRIPS = [
  { dx: -8, max: 2 },
  { dx: -3, max: 7 }, // the long one; the reference runs it about 40% down
  { dx: 1, max: 2 },
  { dx: 5, max: 4 },
  { dx: 8, max: 2 },
]

const FRAME_MS = 110
const SURGE_MS = 850

/** Warm dark iron. The reference is nearly solid, lifted by two soft
 *  highlights rather than by round modelling. */
const IRON = {
  out: '#0a0805',
  body: '#1a1610',
  mid: '#2b2418', // the two highlight patches
  edge: '#3a3222',
  rim: '#262017',
  rimHi: '#463d2b',
}

function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
}
/** k < 0 darkens toward black, k > 0 lightens toward white. */
function shade(hex: string, k: number): string {
  const c = rgb(hex).map((v) =>
    Math.max(0, Math.min(255, k < 0 ? Math.round(v * (1 + k)) : Math.round(v + (255 - v) * k)))
  )
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

/**
 * Wall half-width at row y. Both halves are circular arcs: the upper one
 * bulges out fast under the lip and then holds (the reference is at full width
 * by a quarter of the way down), the lower one holds and drops away late.
 */
function halfW(y: number): number {
  if (y < Y_TOP || y > Y_BASE) return 0
  if (y <= Y_BELLY) {
    const t = (Y_BELLY - y) / (Y_BELLY - Y_TOP) // 1 at the lip, 0 at the belly
    return Math.round(TOP_HW + (BELLY_HW - TOP_HW) * Math.sqrt(1 - t))
  }
  const u = (y - Y_BELLY) / (Y_BASE - Y_BELLY)
  return Math.round(BASE_HW + (BELLY_HW - BASE_HW) * Math.sqrt(Math.max(0, 1 - u * u)))
}

/** The two soft highlights the reference puts on the iron. */
function inHighlight(x: number, y: number): boolean {
  const a = ((x - (CX - 7)) / 3.6) ** 2 + ((y - (Y_BELLY - 1)) / 4.2) ** 2
  const b = ((x - (CX + 5)) / 3) ** 2 + ((y - (Y_BELLY - 1)) / 3.6) ** 2
  return a <= 1 || b <= 1
}

interface Riser {
  x: number
  y: number
  size: number
  drift: number
  age: number
  life: number
}

const PixelCauldron = forwardRef<GemSinkHandle>(function PixelCauldron(_props, ref) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const flareRef = useRef(false)
  const surgeUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const risersRef = useRef<Riser[]>([])
  /** Current length of each drip, in cells. */
  const dripsRef = useRef<number[]>(DRIPS.map((d) => Math.round(d.max * 0.6)))
  const [visible, setVisible] = useState(false)

  const { activeGem } = useXp()
  // The brew wears whatever gem you wore. THEMES.default.accent is a getter
  // that resolves the scorp-ds token, so the stock pot follows the DS.
  const accent = THEMES[activeGem].accent
  const palette = useMemo(
    () => ({
      deep: shade(accent, -0.45),
      body: shade(accent, -0.12),
      lit: accent,
      hot: shade(accent, 0.45),
      flash: shade(accent, 0.8),
    }),
    [accent]
  )

  /** 0 resting, 1 flaring, 2 surging. */
  const heatLevel = useCallback((): 0 | 1 | 2 => {
    if (performance.now() < surgeUntilRef.current) return 2
    return flareRef.current ? 1 : 0
  }, [])

  const paint = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const p = palette
    ctx.clearRect(0, 0, cv.width, cv.height)

    const P = (x: number, y: number, c: string, alpha?: number) => {
      const xi = Math.round(x)
      const yi = Math.round(y)
      if (xi < 0 || xi >= COLS || yi < 0 || yi >= ROWS) return
      if (alpha != null) ctx.globalAlpha = alpha
      ctx.fillStyle = c
      ctx.fillRect(xi * PX, yi * PX, PX, PX)
      if (alpha != null) ctx.globalAlpha = 1
    }

    // 1. feet: four stubs, each curling outward at the sole
    for (const ox of FEET) {
      const out = Math.sign(ox)
      for (let y = Y_BASE + 1; y <= Y_BASE + FOOT_H; y++) {
        const sole = y === Y_BASE + FOOT_H
        P(CX + ox - 1, y, IRON.edge)
        P(CX + ox, y, sole ? IRON.out : IRON.body)
        if (sole) P(CX + ox + out, y, IRON.out) // the curl
      }
    }

    // 2. the wall: nearly solid, with the reference's two soft highlights
    for (let y = Y_TOP; y <= Y_BASE; y++) {
      const hw = halfW(y)
      for (let x = CX - hw; x <= CX + hw; x++) {
        const fromLeft = x - (CX - hw)
        const fromRight = CX + hw - x
        const tone =
          fromLeft === 0 || fromRight === 0
            ? IRON.out
            : fromLeft === 1
              ? IRON.edge
              : inHighlight(x, y)
                ? IRON.mid
                : IRON.body
        P(x, y, tone)
      }
    }

    // 3. the lip: a flat slab, overhanging the wall by a cell, with its ends
    //    dropped into tabs. Narrower than the belly, which is what keeps it a
    //    rim rather than a table.
    for (let x = CX - LIP_HW; x <= CX + LIP_HW; x++) {
      P(x, Y_LIP, x === CX + LIP_HW ? IRON.out : IRON.rimHi)
      P(x, Y_LIP + 1, IRON.out)
    }
    for (const sx of [-1, 1]) {
      P(CX + sx * LIP_HW, Y_TOP, IRON.rim)
      P(CX + sx * (LIP_HW - 1), Y_TOP, IRON.rim)
    }

    // 4. brew running down the outside. This and the risers are the only
    //    evidence it is boiling: the surface is never in view.
    const lens = dripsRef.current
    for (let i = 0; i < DRIPS.length; i++) {
      const x = CX + DRIPS[i].dx
      const len = lens[i]
      for (let k = 0; k < len; k++) {
        const y = Y_TOP + k
        // a run is ONE cell wide. Lighting its neighbour too made every drip
        // read as a bar rather than a trickle.
        P(x, y, k === len - 1 ? p.flash : k === 0 ? p.body : p.lit)
      }
      // only a run with some length beads at its end
      if (len > 2) P(x + 1, Y_TOP + len - 1, p.lit, 0.85)
    }

    // 5. risers: round bubbles drifting up past the lip
    for (const r of risersRef.current) {
      const fade = Math.max(0.45, 1 - r.age / r.life)
      const x = Math.round(r.x)
      const y = Math.round(r.y)
      const s = r.size
      if (s <= 1) {
        P(x, y, p.lit, fade)
      } else if (s === 2) {
        P(x, y, p.hot, fade)
        P(x + 1, y, p.lit, fade)
        P(x, y + 1, p.lit, fade)
        P(x + 1, y + 1, p.body, fade)
      } else {
        // a circle: square minus its corners, with the highlight at top-left
        const r0 = s - 1
        for (let dy = 0; dy <= r0; dy++) {
          for (let dx = 0; dx <= r0; dx++) {
            const corner = (dx === 0 || dx === r0) && (dy === 0 || dy === r0)
            if (corner) continue
            const hi = dx <= 1 && dy <= 1
            const lo = dx >= r0 - 1 && dy >= r0 - 1
            P(x + dx, y + dy, hi ? p.flash : lo ? p.body : p.lit, fade)
          }
        }
      }
    }
  }, [palette])

  /** One tick. Pools are rebuilt rather than mutated: they live behind refs,
   *  and mutating through a ref is what react-hooks/immutability exists to
   *  stop. */
  const step = useCallback(() => {
    const heat = heatLevel()

    // drips creep down and get pulled back up, faster and further when hot
    const floor = heat === 2 ? 0.85 : heat === 1 ? 0.6 : 0.4
    dripsRef.current = dripsRef.current.map((len, i) => {
      const max = DRIPS[i].max + (heat === 2 ? 2 : 0)
      // never one cell: a lone run is just its own pale tip, which reads as
      // a stray white pixel rather than as brew
      const lo = Math.max(2, Math.round(max * floor))
      const move = Math.random() < (heat === 2 ? 0.55 : 0.3) ? (Math.random() < 0.5 ? -1 : 1) : 0
      return Math.max(lo, Math.min(max, len + move))
    })

    // At most one new riser per tick: refilling the pool in one go would
    // launch them in lockstep and they would climb as a rank rather than
    // detaching one at a time.
    const risers = risersRef.current
      .map((r) => ({ ...r, age: r.age + 1, y: r.y - 0.8, x: r.x + r.drift * 0.25 }))
      .filter((r) => r.age <= r.life && r.y > -5)
    const want = heat === 2 ? 9 : heat === 1 ? 7 : 5
    if (risers.length < want && Math.random() < 0.55) {
      const roll = Math.random()
      risers.push({
        x: CX + (Math.random() * 2 - 1) * (LIP_HW - 4),
        // two clear of the lip: spawning on it made bubbles look stuck to the
        // slab rather than already free of the pot
        y: ART_TOP - 3,
        size: roll < 0.3 ? 1 : roll < 0.65 ? 2 : 3,
        drift: Math.random() < 0.5 ? -1 : 1,
        age: 0,
        life: heat === 2 ? 13 : 11 + Math.floor(Math.random() * 5),
      })
    }
    risersRef.current = risers
  }, [heatLevel])

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
      // the canvas is bottom-aligned in the wrapper, so measure the lip up
      // from the bottom edge rather than down from a top that isn't the art's
      return {
        x: r.left + r.width / 2,
        y: r.bottom - (ROWS - Y_LIP - 0.5) * PX,
        rx: LIP_HW * PX,
      }
    },
  }))

  // Boil only while on screen (the character sheet scrolls on handhelds).
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Size the canvas once: the grid is fixed, so this never depends on layout.
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    cv.width = COLS * PX
    cv.height = ROWS * PX
  }, [])

  useEffect(() => {
    // Reduced motion gets one settled frame and no loop: the pot is still a
    // pot, it just isn't boiling at anyone.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (let i = 0; i < 14; i++) step()
      paint()
      return
    }
    if (!visible) return
    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (t - lastRef.current < FRAME_MS) return
      lastRef.current = t
      step()
      paint()
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [visible, step, paint])

  // Repaint immediately on a theme change so the brew turns over with the
  // site rather than on the next frame boundary.
  useEffect(() => {
    paint()
  }, [paint])

  return (
    <div
      ref={wrapRef}
      className="ch-cauldron"
      style={{ width: COLS * PX, height: VISUAL_H }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: COLS * PX,
          height: ROWS * PX,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
})

export default PixelCauldron
