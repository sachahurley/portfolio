/**
 * PixelCauldron — the gem sink on the character screen.
 *
 * A pot of brew that the earned theme gems get dropped into. It replaced the
 * camp fire as the drop target: same imperative handle (setFlare / surge /
 * getElement), plus getAnchor so a drop lands in the mouth rather than at the
 * pot's feet.
 *
 * Drawn on a canvas rather than from the Urizen sheet — the sheet only carries
 * a lidded pot and a hanging sign, and neither boils or re-tints. Geometry is
 * in CELLS scaled by an integer PX, so the art stays pixel-perfect.
 *
 * Two perspectives, because they are different objects:
 *
 * - `top` looks down INTO the pot. The opening is an ellipse, anything around
 *   it is an elliptical ring, and the wall starts at the opening's widest row
 *   with the opening punched through it.
 * - `side` looks at the pot level-on. There is no visible opening: a flat rim
 *   slab caps the body and the brew MOUNDS UP above it, boiling over the lip.
 *
 * A flat rim slab is only legible in the `side` read, and only because it is
 * narrower than the belly and carries the mound on top. An earlier `top` pass
 * drew a constant-width lip that was the widest thing on the pot with nothing
 * above it, and it read as a table the pot stood behind.
 *
 * The brew takes the worn gem's ACCENT, not the theme's fire triple: the
 * triple is dull bone on the default theme, which made the pot look like
 * dishwater. There is no fire under the pot; it just boils.
 *
 * Like PixelFire before it, the wrapper is sized to the POT and the taller
 * canvas is bottom-aligned inside it, so the rising bubbles spill upward as
 * transparent pixels. That overhang can reach the gem sockets, which is why
 * .ch-cauldron is pointer-events: none - otherwise the canvas swallows the
 * pointerdown and the sockets above it stop being draggable. That is load-bearing, not cosmetic: useGemDrag treats
 * the wrapper's rect (padded 24px above) as the live drop band, and a wrapper
 * that included the headroom would reach up into the gem sockets and turn a
 * 2px twitch into a drop.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES } from '../../lib/themes'
import type { GemSinkHandle } from '../progress/useGemDrag'

const PX = 5 // screen px per art pixel
const COLS = 35
const ROWS = 36
const CX = 17

const FRAME_MS = 110
const SURGE_MS = 850

/** Flat cast iron: a body tone, one light edge, an outline. No long ramp - the
 *  near-solid silhouette is what makes the brew read. */
const IRON = {
  out: '#070502', // outline, and the shadowed right edge
  body: '#14110b', // the flat body, barely off the page colour
  edge: '#332d21', // the single light edge, up the left and over the lip
  mid: '#1f1a11', // a faint inner panel; the reference is flat, not modelled
  rim: '#282219', // lip and trim
}

export type CauldronVariant = 'wide' | 'tall' | 'squat' | 'necked' | 'footed'

type Foot = 'legs' | 'ring' | 'pedestal'

interface Shape {
  /** Which read this pot is drawn for. */
  perspective: 'top' | 'side'
  /** `top`: opening ellipse half-width, half-height, and the thickness of the
   *  ring around it. `side`: mrx is the rim slab's half-width, mry is unused. */
  mrx: number
  mry: number
  rimT: number
  /** `side` only: how far the boiling brew heaps above the rim, and how wide
   *  the heap is. */
  moundW: number
  moundH: number
  /** Body: rows from the top of the wall to the base, where the belly sits
   *  within that span, and the half-widths it interpolates between. */
  bodyH: number
  bellyAt: number
  bellyHw: number
  baseHw: number
  /** Shoulder easing. <1 bulges out fast (round), >1 holds a straighter
   *  shoulder before flaring (urn-like). */
  shoulder: number
  /** How the rim ring is inked: as trim, or as more wall (a pot whose wall
   *  simply ends still needs a pixel of iron there, or the brew floats). */
  rimTone: 'trim' | 'wall'
  foot: Foot
  /** A girth band around the belly. */
  band: boolean
  handles: 'ring' | 'nub' | 'none'
}

/**
 * Five silhouettes on the level-on read: a flat rim slab capping the body,
 * with the brew boiling up over the lip. What varies is the body curve and how
 * much rim overhangs it.
 *
 * The rim MUST stay narrower than the belly. The moment it is the widest thing
 * on the pot it stops reading as a rim and starts reading as a table.
 */
const SHAPES: Record<CauldronVariant, Shape> = {
  // Broad and round, a generous rim, the brew heaped low and wide.
  wide: { perspective: 'side', mrx: 11, mry: 0, rimT: 2, moundW: 9, moundH: 4, bodyH: 13, bellyAt: 0.45, bellyHw: 15, baseHw: 8, shoulder: 0.6, rimTone: 'trim', foot: 'legs', band: false, handles: 'ring' },
  // Narrower and taller, with the brew heaped higher above a smaller lip.
  tall: { perspective: 'side', mrx: 9, mry: 0, rimT: 2, moundW: 7, moundH: 5, bodyH: 17, bellyAt: 0.42, bellyHw: 13, baseHw: 6, shoulder: 0.7, rimTone: 'trim', foot: 'legs', band: false, handles: 'ring' },
  // Very wide, very short, sitting low. A stewpot.
  squat: { perspective: 'side', mrx: 10, mry: 0, rimT: 2, moundW: 8, moundH: 4, bodyH: 10, bellyAt: 0.5, bellyHw: 16, baseHw: 9, shoulder: 0.5, rimTone: 'trim', foot: 'legs', band: false, handles: 'ring' },
  // A real neck: the wall holds narrow under the rim before flaring out.
  necked: { perspective: 'side', mrx: 8, mry: 0, rimT: 2, moundW: 6, moundH: 5, bodyH: 15, bellyAt: 0.5, bellyHw: 15, baseHw: 7, shoulder: 1.3, rimTone: 'trim', foot: 'legs', band: false, handles: 'ring' },
  // Standing on a foot ring rather than legs, with a girth band.
  footed: { perspective: 'side', mrx: 10, mry: 0, rimT: 2, moundW: 8, moundH: 4, bodyH: 14, bellyAt: 0.46, bellyHw: 14, baseHw: 9, shoulder: 0.6, rimTone: 'trim', foot: 'ring', band: true, handles: 'nub' },
}

const FOOT_H: Record<Foot, number> = { legs: 3, ring: 2, pedestal: 5 }

interface Geo extends Shape {
  yMouth: number
  yTop: number
  yBelly: number
  yBase: number
  footH: number
  topHw: number
  artTop: number
}

/** Resolve a shape into absolute rows, bottom-aligned in the canvas. */
function geoFor(v: CauldronVariant): Geo {
  const s = SHAPES[v]
  const footH = FOOT_H[s.foot]
  const yBase = ROWS - 1 - footH
  if (s.perspective === 'side') {
    // the rim slab caps the body; the mound heaps above it
    const yTop = yBase - s.bodyH
    const yRim = yTop - s.rimT
    return {
      ...s,
      footH,
      yBase,
      yTop,
      yMouth: yRim, // a dropped gem lands on the lip
      yBelly: yTop + Math.round(s.bodyH * s.bellyAt),
      // the wall sits just inside the rim, so the lip overhangs it
      topHw: s.mrx - 1,
      artTop: yRim - s.moundH,
    }
  }
  // the wall begins at the opening's widest row, so rim and body never step
  const yMouth = yBase - s.bodyH
  return {
    ...s,
    footH,
    yBase,
    yTop: yMouth,
    yMouth,
    yBelly: yMouth + Math.round(s.bodyH * s.bellyAt),
    topHw: s.mrx + s.rimT,
    artTop: Math.floor(yMouth - s.mry - s.rimT),
  }
}

/** The envelope the boiling mound is allowed to reach, per column offset. */
function moundCap(g: Geo, dx: number): number {
  const t = Math.abs(dx) / Math.max(1, g.moundW)
  if (t > 1) return 0
  return Math.max(1, Math.round(g.moundH * Math.sqrt(1 - t * t)))
}

/** Front-wall half-width at row y.
 *
 *  Both halves are circular arcs rather than eased ramps: the eased version
 *  drew long straight diagonals and the pot came out faceted. `shoulder`
 *  biases the upper arc - below 1 it bulges out fast under the lip, above 1
 *  it holds narrow and flares late (a neck). */
function halfW(g: Geo, y: number): number {
  if (y < g.yTop || y > g.yBase) return 0
  if (y <= g.yBelly) {
    const t = (g.yBelly - y) / Math.max(1, g.yBelly - g.yTop) // 1 at the lip, 0 at the belly
    return Math.round(g.topHw + (g.bellyHw - g.topHw) * Math.sqrt(1 - Math.pow(t, 2 * g.shoulder)))
  }
  const u = (y - g.yBelly) / Math.max(1, g.yBase - g.yBelly)
  return Math.round(g.baseHw + (g.bellyHw - g.baseHw) * Math.sqrt(Math.max(0, 1 - u * u)))
}

/** Half-width of the opening ellipse at row y, or -1 when the row misses it. */
function mouthHw(g: Geo, y: number, grow = 0): number {
  const ry = g.mry + grow
  const b = (y - g.yMouth) / ry
  if (Math.abs(b) > 1) return -1
  return Math.round((g.mrx + grow) * Math.sqrt(1 - b * b))
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

interface Bubble {
  x: number
  y: number
  age: number
  life: number
}
/** A bubble that has left the surface and is floating up past the rim. */
interface Riser {
  x: number
  y: number
  size: number
  drift: number
  age: number
  life: number
}

const PixelCauldron = forwardRef<GemSinkHandle, { variant?: CauldronVariant }>(function PixelCauldron(
  { variant = 'wide' },
  ref
) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const flareRef = useRef(false)
  const surgeUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const bubblesRef = useRef<Bubble[]>([])
  /** Per-column heights of the boiling mound (side perspective only). */
  const moundRef = useRef<number[]>([])
  const risersRef = useRef<Riser[]>([])
  const [visible, setVisible] = useState(false)

  const g = useMemo(() => geoFor(variant), [variant])
  const visualH = (ROWS - g.artTop) * PX

  const { activeGem } = useXp()
  // The brew wears whatever gem you wore. THEMES.default.accent is a getter
  // that resolves the scorp-ds token, so the stock pot follows the DS.
  const accent = THEMES[activeGem].accent
  const palette = useMemo(
    () => ({
      shadow: shade(accent, -0.8),
      deep: shade(accent, -0.5),
      body: shade(accent, -0.12),
      lit: accent,
      hot: shade(accent, 0.5),
      flash: shade(accent, 0.85),
    }),
    [accent]
  )

  /** 0 resting, 1 flaring, 2 surging — drives how hard it boils. */
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

    // 1. foot
    if (g.foot === 'legs') {
      for (const ox of [-(g.baseHw - 2), g.baseHw - 2]) {
        for (let y = g.yBase + 1; y <= g.yBase + g.footH; y++) {
          const last = y === g.yBase + g.footH
          P(CX + ox - 2, y, IRON.edge)
          P(CX + ox - 1, y, last ? IRON.out : IRON.mid)
          P(CX + ox, y, last ? IRON.out : IRON.body)
          P(CX + ox + 1, y, IRON.out)
        }
      }
    } else if (g.foot === 'ring') {
      for (let y = g.yBase + 1; y <= g.yBase + g.footH; y++) {
        const hw = g.baseHw + (y === g.yBase + g.footH ? 1 : 0)
        for (let x = CX - hw; x <= CX + hw; x++) {
          P(x, y, x === CX - hw ? IRON.edge : x === CX + hw ? IRON.out : IRON.body)
        }
      }
    } else {
      for (let y = g.yBase + 1; y <= g.yBase + g.footH; y++) {
        const flare = y > g.yBase + g.footH - 2
        const hw = flare ? g.baseHw + 3 : 3
        for (let x = CX - hw; x <= CX + hw; x++) {
          P(x, y, x === CX - hw ? IRON.edge : x === CX + hw ? IRON.out : IRON.body)
        }
      }
    }

    // 2. handles, drawn before the wall so the ring reads as passing behind it
    if (g.handles === 'ring') {
      for (const sx of [-1, 1]) {
        const hw = halfW(g, g.yBelly - 1)
        const lit = sx < 0 ? IRON.edge : IRON.rim // light comes from the upper left
        P(CX + sx * (hw + 1), g.yBelly - 2, lit)
        P(CX + sx * (hw + 2), g.yBelly - 1, lit)
        P(CX + sx * (hw + 2), g.yBelly, lit)
        P(CX + sx * (hw + 1), g.yBelly + 1, sx < 0 ? IRON.body : IRON.out)
      }
    } else if (g.handles === 'nub') {
      for (const sx of [-1, 1]) {
        const hw = halfW(g, g.yTop + 1)
        const lit = sx < 0 ? IRON.edge : IRON.rim
        P(CX + sx * (hw + 1), g.yTop + 1, lit)
        P(CX + sx * (hw + 1), g.yTop + 2, sx < 0 ? IRON.body : IRON.out)
      }
    }

    // 3. the wall.
    if (g.perspective === 'side') {
      // Level-on: flat blocky shading, dark at the silhouette edge and lighter
      // through the mass, the way the reference reads. No round modelling.
      for (let y = g.yTop; y <= g.yBase; y++) {
        const hw = halfW(g, y)
        for (let x = CX - hw; x <= CX + hw; x++) {
          const fromLeft = x - (CX - hw)
          const fromRight = CX + hw - x
          const d = Math.min(fromLeft, fromRight)
          P(x, y, d === 0 ? IRON.out : fromLeft <= 1 ? IRON.edge : d === 1 ? IRON.body : IRON.mid)
        }
      }
    } else {
      // Top-down: the opening is punched out of the wall's upper rows.
      for (let y = g.yTop; y <= g.yBase; y++) {
        const hw = halfW(g, y)
        const hole = y <= g.yMouth + g.mry ? mouthHw(g, y) : -1
        for (let x = CX - hw; x <= CX + hw; x++) {
          if (hole >= 0 && x >= CX - hole && x <= CX + hole) continue
          const fromLeft = x - (CX - hw)
          const fromRight = CX + hw - x
          P(
            x,
            y,
            fromLeft === 0 || (fromLeft === 1 && y < g.yBelly) ? IRON.edge : fromRight === 0 ? IRON.out : IRON.body
          )
        }
      }
    }
    if (g.band) {
      for (let y = g.yBelly; y <= g.yBelly + 1; y++) {
        const hw = halfW(g, y)
        for (let x = CX - hw; x <= CX + hw; x++) {
          P(x, y, x === CX - hw ? IRON.edge : x === CX + hw ? IRON.out : y === g.yBelly ? IRON.rim : IRON.out)
        }
      }
    }

    if (g.perspective === 'side') {
      // 4. the rim slab: flat, and deliberately narrower than the belly. It is
      //    only a rim because the body is wider and the mound sits on it.
      for (let y = g.yMouth; y < g.yTop; y++) {
        const first = y === g.yMouth
        for (let x = CX - g.mrx; x <= CX + g.mrx; x++) {
          const end = x === CX - g.mrx || x === CX + g.mrx
          P(x, y, end ? IRON.out : first ? IRON.edge : IRON.rim)
        }
      }

      // 5. the brew, heaped over the lip. Each column has its own height and
      //    wobbles, so the surface boils rather than sitting as a dome.
      const cols = moundRef.current
      for (let i = 0; i < cols.length; i++) {
        const x = CX - g.moundW + i
        const h = cols[i]
        for (let k = 0; k < h; k++) {
          const y = g.yMouth - 1 - k
          P(x, y, k === h - 1 ? p.hot : k >= h - 2 ? p.lit : k === 0 ? p.deep : p.body)
        }
      }
      // a wet band along the lip line, on the lit side
      for (let x = CX - g.moundW + 1; x <= CX - Math.max(1, g.moundW - 4); x++) P(x, g.yMouth - 1, p.flash, 0.85)
    } else {
      // 4. the rim: an elliptical RING around the opening.
      if (g.rimT > 0) {
        for (let y = g.artTop; y <= g.yMouth + g.mry + g.rimT; y++) {
          const outer = mouthHw(g, y, g.rimT)
          if (outer < 2) continue // a 1px cap on the far arc reads as a spike
          const inner = mouthHw(g, y)
          for (let x = CX - outer; x <= CX + outer; x++) {
            if (inner >= 0 && x >= CX - inner && x <= CX + inner) continue
            const far = y < g.yMouth
            const mid = g.rimTone === 'wall' ? IRON.body : IRON.rim
            P(x, y, far && x < CX ? IRON.edge : far ? mid : x > CX + outer - 2 ? IRON.out : mid)
          }
        }
      }

      // 5. the brew, filling the opening ellipse. The far arc is the pot's
      //    inner wall above the liquid line, which is what gives it depth.
      for (let y = g.yMouth - g.mry; y <= g.yMouth + g.mry; y++) {
        const hw = mouthHw(g, y)
        if (hw < 0) continue
        const b = (y - g.yMouth) / g.mry
        for (let x = CX - hw; x <= CX + hw; x++) {
          if (b < -0.55) {
            P(x, y, p.shadow)
            continue
          }
          const edgeX = x <= CX - hw + 1 || x >= CX + hw - 1
          P(x, y, edgeX ? p.deep : b < -0.1 ? p.body : p.lit)
        }
      }
      const sy = Math.round(g.yMouth + g.mry * 0.35)
      const shw = mouthHw(g, sy)
      if (shw > 4) for (let x = CX - shw + 2; x <= CX - Math.max(1, shw - 6); x++) P(x, sy, p.hot, 0.9)
    }

    // 6. the boil: bubbles swelling and popping on the surface. The level-on
    //    read has no visible surface - its boil IS the mound.
    if (g.perspective === 'top') for (const b of bubblesRef.current) {
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
    // wet specular, so the surface reads as liquid rather than a flat disc
    const sy = Math.round(g.yMouth + g.mry * 0.35)
    const shw = mouthHw(g, sy)
    if (shw > 4) for (let x = CX - shw + 2; x <= CX - Math.max(1, shw - 6); x++) P(x, sy, p.hot, 0.9)

    // 7. risers: bubbles that have left the pot and are floating up
    for (const r of risersRef.current) {
      const fade = Math.max(0.5, 1 - r.age / r.life)
      const x = Math.round(r.x)
      const y = Math.round(r.y)
      if (r.size <= 1) {
        P(x, y, p.lit, fade)
      } else if (r.size === 2) {
        P(x, y, p.flash, fade)
        P(x + 1, y, p.lit, fade)
        P(x, y + 1, p.lit, fade)
        P(x + 1, y + 1, p.body, fade)
      } else {
        P(x, y - 1, p.lit, fade)
        P(x - 1, y, p.flash, fade)
        P(x, y, p.hot, fade)
        P(x + 1, y, p.lit, fade)
        P(x - 1, y + 1, p.lit, fade)
        P(x, y + 1, p.body, fade)
      }
    }
  }, [palette, g])

  /** One simulation tick. Every pool is rebuilt rather than mutated in place:
   *  these live behind refs, and mutating through a ref is what
   *  react-hooks/immutability exists to stop. */
  const step = useCallback(() => {
    const heat = heatLevel()

    // the mound: each column random-walks under its envelope, so the heap
    // churns instead of sitting still. Hotter pushes the floor up.
    if (g.perspective === 'side') {
      const n = g.moundW * 2 + 1
      const floor = heat === 2 ? 0.8 : heat === 1 ? 0.55 : 0.35
      const prev = moundRef.current.length === n ? moundRef.current : new Array<number>(n).fill(1)
      const next = prev.map((h, i) => {
        const cap = moundCap(g, i - g.moundW)
        if (cap === 0) return 0
        const lo = Math.max(1, Math.round(cap * floor))
        return Math.max(lo, Math.min(cap, h + (Math.random() < 0.5 ? -1 : 1)))
      })
      // pair the columns up: at one cell each the heap's top edge reads as a
      // comb, where the reference is chunky two-cell blocks
      for (let i = 0; i + 1 < n; i += 2) next[i + 1] = next[i]
      moundRef.current = next
    }

    // surface bubbles, scattered across the visible brew
    const bubbles = bubblesRef.current
      .map((b) => ({ ...b, age: b.age + 1 }))
      .filter((b) => b.age <= b.life)
    const wantB = heat === 2 ? 10 : heat === 1 ? 7 : 5
    for (let i = bubbles.length; i < wantB; i++) {
      const y = Math.round(g.yMouth + (Math.random() * 0.9 - 0.25) * g.mry)
      const hw = Math.max(1, mouthHw(g, y) - 2)
      bubbles.push({
        x: CX + Math.round((Math.random() * 2 - 1) * hw),
        y,
        age: 0,
        life: heat === 2 ? 4 : 6 + Math.floor(Math.random() * 4),
      })
    }
    bubblesRef.current = bubbles

    // At most one new riser per tick: refilling the pool in one go would
    // launch them in lockstep and they would climb as a rank rather than
    // detaching one at a time.
    const risers = risersRef.current
      .map((r) => ({ ...r, age: r.age + 1, y: r.y - 0.85, x: r.x + r.drift * 0.28 }))
      .filter((r) => r.age <= r.life && r.y > -3)
    const wantR = heat === 2 ? 8 : heat === 1 ? 6 : 4
    if (risers.length < wantR && Math.random() < 0.5) {
      const roll = Math.random()
      risers.push({
        x: CX + (Math.random() * 2 - 1) * Math.max(1, (g.perspective === 'side' ? g.moundW : g.mrx) - 2),
        y: g.artTop - 1,
        size: roll < 0.34 ? 1 : roll < 0.74 ? 2 : 3,
        drift: Math.random() < 0.5 ? -1 : 1,
        age: 0,
        life: heat === 2 ? 11 : 9 + Math.floor(Math.random() * 5),
      })
    }
    risersRef.current = risers
  }, [heatLevel, g])

  useImperativeHandle(
    ref,
    () => ({
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
          y: r.bottom - (ROWS - g.yMouth - 0.5) * PX,
          rx: (g.perspective === 'side' ? g.mrx : g.mrx) * PX,
        }
      },
    }),
    [g]
  )

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
      for (let i = 0; i < 12; i++) step()
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
      style={{ width: COLS * PX, height: visualH }}
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
