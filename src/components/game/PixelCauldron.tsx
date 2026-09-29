/**
 * PixelCauldron — the gem sink on the character screen.
 *
 * A pot of brew that the earned theme gems get dropped into. It replaced the
 * camp fire as the drop target: same imperative handle (setFlare / surge /
 * getElement), plus getAnchor so a drop lands in the brew rather than at the
 * pot's feet.
 *
 * Drawn on a canvas rather than from the Urizen sheet — the sheet only carries
 * a lidded pot and a hanging sign, and neither boils or re-tints. Geometry is
 * in CELLS scaled by an integer PX, so the art stays pixel-perfect.
 *
 * The BODY is traced from reference: a wide oval belly (1.86x wider than tall,
 * widest at mid-height), four curled feet, two soft highlights on the iron.
 * The proportions come off the image as fractions of the belly half-width —
 * wall top 0.79, base 0.76.
 *
 * The TOP is open. An earlier pass capped it with a flat lip slab, which read
 * as a lid sitting on the pot. Now the mouth is an ellipse with a one-cell
 * rim ring, the brew is in plain view, and the boil happens on a surface you
 * can see rather than being implied by bubbles drifting overhead.
 *
 * The doom-fire is back, underneath: the same spread-and-decay loop the camp
 * fire ran, at small scale, as the bed the pot stands in. Brew still runs down
 * the outside — with a fire under it, boiling over is the point.
 *
 * The brew and the embers both take the worn gem's ACCENT, not the theme's
 * fire triple: the triple is dull bone on the default theme, which made the
 * pot look like dishwater.
 *
 * The wrapper is sized to the POT and the taller canvas is bottom-aligned
 * inside it — the recipe PixelFire used. Any overhang can reach the gem
 * sockets, which is why .ch-cauldron is pointer-events: none; otherwise the
 * canvas swallows the pointerdown and the sockets stop being draggable.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES } from '../../lib/themes'
import type { GemSinkHandle } from '../progress/useGemDrag'

const PX = 5 // screen px per art pixel
const COLS = 35
const ROWS = 36
const CX = 17

/* ---- traced body ---- */
const BELLY_HW = 15
const TOP_HW = 12
const BASE_HW = 12
const BODY_H = 16
const FOOT_H = 3

/* ---- the fire it stands in ---- */
const EMBER_ROWS = 5
const EMBER_HALF = 9 // narrower than the base: a fire under the pot, not a pool

const Y_BASE = ROWS - 1 - EMBER_ROWS // the wall's last row
const Y_TOP = Y_BASE - BODY_H // the wall's first row, and the mouth's widest
const Y_BELLY = Y_TOP + 8 // widest at mid-height

/* ---- the open mouth ----
   Well inside the wall. At TOP_HW - 1 it left a single cell of iron either
   side and the brew read as a bowl balanced on the pot rather than as
   something inside it. RIM_T is the ring's thickness, not a slab. */
const MRX = 8
const MRY = 2.4
const RIM_T = 2
const Y_MOUTH = Y_TOP
const ART_TOP = Math.floor(Y_MOUTH - MRY - RIM_T)
const VISUAL_H = (ROWS - ART_TOP) * PX

/** Four curled feet, at the offsets the reference puts them. */
const FEET = [-9, -4, 4, 9]

/** Where brew runs down the outside, and how far each one reaches. */
const DRIPS = [
  { dx: -8, max: 3 },
  { dx: -3, max: 7 }, // the long one
  { dx: 4, max: 4 },
  { dx: 8, max: 3 },
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
  rim: '#332c1e',
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
 * bulges out fast under the mouth and then holds (the reference is at full
 * width a quarter of the way down), the lower one holds and drops away late.
 */
function halfW(y: number): number {
  if (y < Y_TOP || y > Y_BASE) return 0
  if (y <= Y_BELLY) {
    const t = (Y_BELLY - y) / (Y_BELLY - Y_TOP) // 1 at the mouth, 0 at the belly
    return Math.round(TOP_HW + (BELLY_HW - TOP_HW) * Math.sqrt(1 - t))
  }
  const u = (y - Y_BELLY) / (Y_BASE - Y_BELLY)
  return Math.round(BASE_HW + (BELLY_HW - BASE_HW) * Math.sqrt(Math.max(0, 1 - u * u)))
}

/** Half-width of the mouth ellipse at row y, or -1 when the row misses it. */
function mouthHw(y: number, grow = 0): number {
  const ry = MRY + grow
  const b = (y - Y_MOUTH) / ry
  if (Math.abs(b) > 1) return -1
  return Math.round((MRX + grow) * Math.sqrt(1 - b * b))
}

/** The two soft highlights the reference puts on the iron. */
function inHighlight(x: number, y: number): boolean {
  const a = ((x - (CX - 7)) / 3.6) ** 2 + ((y - (Y_BELLY + 1)) / 4) ** 2
  const b = ((x - (CX + 5)) / 3) ** 2 + ((y - (Y_BELLY + 1)) / 3.4) ** 2
  return a <= 1 || b <= 1
}

interface Bubble {
  x: number
  y: number
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
  const bubblesRef = useRef<Bubble[]>([])
  const dripsRef = useRef<number[]>(DRIPS.map((d) => Math.round(d.max * 0.6)))
  const emberRef = useRef<number[][]>([])
  const [visible, setVisible] = useState(false)

  const { activeGem } = useXp()
  // The brew wears whatever gem you wore. THEMES.default.accent is a getter
  // that resolves the scorp-ds token, so the stock pot follows the DS.
  const accent = THEMES[activeGem].accent
  const palette = useMemo(
    () => ({
      shadow: shade(accent, -0.78),
      deep: shade(accent, -0.45),
      body: shade(accent, -0.12),
      lit: accent,
      hot: shade(accent, 0.45),
      flash: shade(accent, 0.8),
      ember: [
        null,
        shade(accent, -0.75),
        shade(accent, -0.55),
        shade(accent, -0.3),
        shade(accent, -0.05),
        accent,
        shade(accent, 0.25),
        shade(accent, 0.45),
        shade(accent, 0.62),
        shade(accent, 0.78),
        shade(accent, 0.9),
        '#fff6e8',
      ] as (string | null)[],
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

    // 1. the doom-fire bed the pot stands in
    const eb = emberRef.current
    for (let y = 0; y < EMBER_ROWS; y++) {
      for (let x = 0; x < EMBER_HALF * 2 + 1; x++) {
        const v = eb[y]?.[x] ?? 0
        if (v > 0) P(CX - EMBER_HALF + x, Y_BASE + 1 + y, p.ember[Math.min(p.ember.length - 1, v)]!)
      }
    }

    // 2. feet: four stubs standing in the embers, each curling at the sole
    for (const ox of FEET) {
      const out = Math.sign(ox)
      for (let y = Y_BASE + 1; y <= Y_BASE + FOOT_H; y++) {
        const sole = y === Y_BASE + FOOT_H
        P(CX + ox - 1, y, IRON.edge)
        P(CX + ox, y, sole ? IRON.out : IRON.body)
        if (sole) P(CX + ox + out, y, IRON.out) // the curl
      }
    }

    // 3. the wall: nearly solid, with the reference's two soft highlights. No
    //    hole is punched for the mouth - the brew is laid over its top rows,
    //    so the wall's own top edge serves as the near rim.
    for (let y = Y_TOP; y <= Y_BASE; y++) {
      const hw = halfW(y)
      for (let x = CX - hw; x <= CX + hw; x++) {
        const fromLeft = x - (CX - hw)
        const fromRight = CX + hw - x
        P(
          x,
          y,
          fromLeft === 0 || fromRight === 0
            ? IRON.out
            : fromLeft === 1
              ? IRON.edge
              : inHighlight(x, y)
                ? IRON.mid
                : IRON.body
        )
      }
    }
    // firelight bounced onto the underside, so the pot reads as sitting IN it
    for (let y = Y_BASE - 2; y <= Y_BASE; y++) {
      const hw = halfW(y)
      for (let x = CX - hw + 1; x < CX + hw; x++) {
        P(x, y, p.deep, 0.06 + (y - (Y_BASE - 2)) * 0.07)
      }
    }

    // 4. the rim: the FAR arc only, an elliptical ring rising behind the brew.
    //    The near arc is not drawn - the wall is already the front edge of the
    //    pot, and ringing it too laid a black band across the shoulder.
    //    Not a slab across the top either: that read as a lid.
    for (let y = ART_TOP; y < Y_MOUTH; y++) {
      const outer = mouthHw(y, RIM_T)
      if (outer < 2) continue
      const inner = mouthHw(y)
      for (let x = CX - outer; x <= CX + outer; x++) {
        if (inner >= 0 && x >= CX - inner && x <= CX + inner) continue
        P(x, y, x < CX ? IRON.edge : IRON.rim)
      }
    }

    // 5. the brew, in plain view. The far arc is the pot's inner wall above
    //    the liquid line, which is what gives the mouth depth.
    for (let y = Y_MOUTH - MRY; y <= Y_MOUTH + MRY; y++) {
      const hw = mouthHw(y)
      if (hw < 0) continue
      const b = (y - Y_MOUTH) / MRY
      for (let x = CX - hw; x <= CX + hw; x++) {
        if (b < -0.55) {
          P(x, y, p.shadow)
          continue
        }
        const edgeX = x <= CX - hw + 1 || x >= CX + hw - 1
        P(x, y, edgeX ? p.deep : b < -0.1 ? p.body : p.lit)
      }
    }

    // 6. the boil, on the surface you can now see
    for (const b of bubblesRef.current) {
      const t = b.age / b.life
      if (t < 0.45) P(b.x, b.y, p.hot)
      else if (t < 0.8) {
        P(b.x, b.y, p.flash)
        P(b.x + 1, b.y, p.hot)
      } else {
        P(b.x - 1, b.y, p.lit)
        P(b.x + 1, b.y, p.lit)
      }
    }
    // wet specular along the near edge
    const sy = Math.round(Y_MOUTH + MRY * 0.4)
    const shw = mouthHw(sy)
    if (shw > 4) for (let x = CX - shw + 2; x <= CX - Math.max(1, shw - 6); x++) P(x, sy, p.hot, 0.9)

    // 7. brew running down the outside. With a fire under it, boiling over is
    //    the point.
    const lens = dripsRef.current
    for (let i = 0; i < DRIPS.length; i++) {
      const x = CX + DRIPS[i].dx
      const len = lens[i]
      const from = Math.round(Y_MOUTH + MRY) + 1 // clear of the rim ring
      for (let k = 0; k < len; k++) {
        // a run is ONE cell wide. Lighting its neighbour too made every drip
        // read as a bar rather than a trickle.
        P(x, from + k, k === len - 1 ? p.flash : k === 0 ? p.body : p.lit)
      }
      if (len > 2) P(x + 1, from + len - 1, p.lit, 0.85)
    }
  }, [palette])

  /** One tick. Pools are rebuilt rather than mutated: they live behind refs,
   *  and mutating through a ref is what react-hooks/immutability exists to
   *  stop. */
  const step = useCallback(() => {
    const heat = heatLevel()
    const W = EMBER_HALF * 2 + 1

    // embers: doom-fire spread, seeded hottest under the pot's middle
    const prev =
      emberRef.current.length === EMBER_ROWS
        ? emberRef.current
        : Array.from({ length: EMBER_ROWS }, () => new Array<number>(W).fill(0))
    const next = Array.from({ length: EMBER_ROWS }, () => new Array<number>(W).fill(0))
    for (let y = 0; y < EMBER_ROWS - 1; y++) {
      for (let x = 0; x < W; x++) {
        const d = Math.floor(Math.random() * 3)
        next[y][Math.max(0, Math.min(W - 1, x - d + 1))] = Math.max(0, prev[y + 1][x] - d)
      }
    }
    const base = heat === 2 ? 11 : heat === 1 ? 9 : 6
    for (let x = 0; x < W; x++) {
      const f = Math.abs(x / EMBER_HALF - 1)
      next[EMBER_ROWS - 1][x] = Math.max(0, Math.round(base * (1 - f * f * 1.1)))
    }
    emberRef.current = next

    // surface bubbles
    const bubbles = bubblesRef.current
      .map((b) => ({ ...b, age: b.age + 1 }))
      .filter((b) => b.age <= b.life)
    const want = heat === 2 ? 10 : heat === 1 ? 7 : 5
    for (let i = bubbles.length; i < want; i++) {
      const y = Math.round(Y_MOUTH + (Math.random() * 0.9 - 0.2) * MRY)
      const hw = Math.max(1, mouthHw(y) - 2)
      bubbles.push({
        x: CX + Math.round((Math.random() * 2 - 1) * hw),
        y,
        age: 0,
        life: heat === 2 ? 4 : 6 + Math.floor(Math.random() * 4),
      })
    }
    bubblesRef.current = bubbles

    // drips creep down and get pulled back up, further when hot
    const floor = heat === 2 ? 0.85 : heat === 1 ? 0.6 : 0.4
    dripsRef.current = dripsRef.current.map((len, i) => {
      const max = DRIPS[i].max + (heat === 2 ? 2 : 0)
      // never one cell: a lone run is just its own pale tip, which reads as
      // a stray white pixel rather than as brew
      const lo = Math.max(2, Math.round(max * floor))
      const move = Math.random() < (heat === 2 ? 0.55 : 0.3) ? (Math.random() < 0.5 ? -1 : 1) : 0
      return Math.max(lo, Math.min(max, len + move))
    })
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
      // the canvas is bottom-aligned in the wrapper, so measure the mouth up
      // from the bottom edge rather than down from a top that isn't the art's
      return {
        x: r.left + r.width / 2,
        y: r.bottom - (ROWS - Y_MOUTH - 0.5) * PX,
        rx: MRX * PX,
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
      for (let i = 0; i < 40; i++) step()
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
