/**
 * PixelCauldron — the gem sink on the character screen.
 *
 * A pot of brew that the earned theme gems get dropped into. It replaced the
 * camp fire as the drop target: same imperative handle (setFlare / surge /
 * getElement), plus getAnchor so a drop lands in the mouth rather than at the
 * pot's feet.
 *
 * Drawn on a canvas rather than from the Urizen sheet — the sheet only carries
 * a lidded pot and a hanging sign, and neither can boil or re-tint. Geometry is
 * in CELLS on a fixed 34x33 grid scaled by PX, so the art stays pixel-perfect
 * without any integer-scale juggling.
 *
 * Art direction: a flat near-black cast-iron silhouette with a single light
 * edge up the left, ring handles with real holes, two chunky feet, and bubbles
 * that detach off the surface and float up past the rim. Deliberately NOT
 * round-shaded — the flat black body is what makes the brew read.
 *
 * The brew takes the worn gem's ACCENT, not the theme's fire triple: the
 * triple is dull bone on the default theme, which made the pot look like
 * dishwater. There is no fire under the pot; it just boils.
 *
 * Like PixelFire before it, the wrapper is sized to the POT and the taller
 * canvas is bottom-aligned inside it, so the rising bubbles spill upward as
 * transparent pixels. That is load-bearing, not cosmetic: useGemDrag treats
 * the wrapper's rect (padded 24px above) as the live drop band, and a wrapper
 * that included the headroom would reach up into the gem sockets and turn a
 * 2px twitch into a drop.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES } from '../../lib/themes'
import type { GemSinkHandle } from '../progress/useGemDrag'

const PX = 5 // screen px per art pixel
const COLS = 31
const ROWS = 32
const CX = 15

// The pot is stacked as explicit bands rather than one silhouette formula, so
// the lip stays a solid slab and the brew can never eat into it.
const Y_LIP = 9 // topmost row the pot occupies
const Y_INNER = 11 // the far inner wall, seen above the liquid line
const Y_BREW = 12 // first of three brew rows
const Y_BODY = 15 // the front wall starts here and occludes the brew
const Y_BELLY = 20
const Y_BASE = 28
const Y_FOOT = 31

const LIP_HW = 11
const MOUTH_HW = 9
const BELLY_HW = 12
const BELLY_SPAN = 10

/** Rows above the lip are bubble headroom and live OUTSIDE the layout box. */
const ART_TOP = Y_LIP
const VISUAL_H = (ROWS - ART_TOP) * PX

/** Where a dropped gem lands: the middle of the brew band. */
const MY = Y_BREW + 1

const FRAME_MS = 110
const SURGE_MS = 850

/** Flat cast iron: a body tone, one edge light, and an outline. No ramp - the
 *  reference silhouette is nearly solid black, and that is what sells the brew. */
const IRON = {
  out: '#0b0906', // outline, and the shadowed right edge
  body: '#201b12', // the flat body. Lifted off pure black: the reference sits
  //                  on white, this one sits on a #1A150F page and would vanish
  edge: '#40392a', // the single light edge, up the left and along the lip
  rim: '#2a2419',
  inner: '#100d08', // the pot's inside wall, above the liquid line
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

/** Front-wall half-width at row y: a true circular belly, so the pot reads
 *  round rather than faceted. */
function halfW(y: number): number {
  if (y < Y_BODY || y > Y_BASE) return 0
  const t = (y - Y_BELLY) / BELLY_SPAN
  return Math.max(5, Math.round(BELLY_HW * Math.sqrt(Math.max(0, 1 - t * t))))
}

/** Half-width of the brew band at row y (three rows, tapering to the front). */
function brewHW(y: number): number {
  return y >= Y_BREW + 2 ? MOUTH_HW - 2 : MOUTH_HW
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

const PixelCauldron = forwardRef<GemSinkHandle>(function PixelCauldron(_props, ref) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const flareRef = useRef(false)
  const surgeUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const bubblesRef = useRef<Bubble[]>([])
  const risersRef = useRef<Riser[]>([])
  const [visible, setVisible] = useState(false)

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

    // 1. feet: two chunky stubs under the base
    for (const ox of [-5, 5]) {
      for (let y = Y_BASE + 1; y <= Y_FOOT; y++) {
        P(CX + ox - 1, y, IRON.edge)
        P(CX + ox, y, IRON.body)
        P(CX + ox + 1, y, y === Y_FOOT ? IRON.out : IRON.body)
      }
    }

    // 2. ring handles: drawn in the edge light so they read against the body,
    //    with a real hole between the ring and the belly
    for (const sx of [-1, 1]) {
      const hw = halfW(Y_BELLY - 1)
      const lit = sx < 0 ? IRON.edge : IRON.rim // the shadow side stays dim
      P(CX + sx * (hw + 1), Y_BELLY - 2, lit)
      P(CX + sx * (hw + 2), Y_BELLY - 1, lit)
      P(CX + sx * (hw + 2), Y_BELLY, lit)
      P(CX + sx * (hw + 1), Y_BELLY + 1, sx < 0 ? IRON.body : IRON.out)
    }

    // 3. the brew: three rows under the lip, tapering to the front. The far
    //    inner wall sits above it, which is what gives the pot depth.
    for (let x = CX - MOUTH_HW; x <= CX + MOUTH_HW; x++) P(x, Y_INNER, p.shadow)
    for (let y = Y_BREW; y < Y_BODY; y++) {
      const hw = brewHW(y)
      for (let x = CX - hw; x <= CX + hw; x++) {
        const edgeX = x <= CX - hw + 1 || x >= CX + hw - 1
        P(x, y, edgeX ? p.deep : y === Y_BREW ? p.body : p.lit)
      }
    }

    // 4. the boil: bubbles swelling and popping on the surface
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
    // wet specular along the near edge, so the surface reads as liquid
    for (let x = CX - 5; x <= CX - 1; x++) P(x, Y_BREW + 1, p.hot, 0.9)

    // 5. the front wall, drawn OVER the brew so the liquid ends on a hard line.
    //    Flat black with one light edge up the left, outline down the right.
    for (let y = Y_BODY; y <= Y_BASE; y++) {
      const hw = halfW(y)
      for (let x = CX - hw; x <= CX + hw; x++) {
        const fromLeft = x - (CX - hw)
        const fromRight = CX + hw - x
        P(x, y, fromLeft === 0 || (fromLeft === 1 && y < Y_BELLY) ? IRON.edge : fromRight === 0 ? IRON.out : IRON.body)
      }
    }

    // 6. the lip: a solid slab across the top, overhanging the front wall.
    //    Drawn last so nothing can punch a hole in it.
    for (let x = CX - LIP_HW; x <= CX + LIP_HW; x++) {
      P(x, Y_LIP, IRON.edge)
      P(x, Y_LIP + 1, x === CX + LIP_HW ? IRON.out : IRON.rim)
    }

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
  }, [palette])

  /** One simulation tick. Every pool is rebuilt rather than mutated in place:
   *  these live behind refs, and mutating through a ref is what
   *  react-hooks/immutability exists to stop. */
  const step = useCallback(() => {
    const heat = heatLevel()

    // surface bubbles
    const bubbles = bubblesRef.current
      .map((b) => ({ ...b, age: b.age + 1 }))
      .filter((b) => b.age <= b.life)
    const wantB = heat === 2 ? 10 : heat === 1 ? 7 : 5
    for (let i = bubbles.length; i < wantB; i++) {
      const y = Y_BREW + Math.floor(Math.random() * (Y_BODY - Y_BREW))
      const hw = brewHW(y) - 2
      bubbles.push({
        x: CX + Math.round((Math.random() * 2 - 1) * hw),
        y,
        age: 0,
        life: heat === 2 ? 4 : 6 + Math.floor(Math.random() * 4),
      })
    }
    bubblesRef.current = bubbles

    // risers: detached bubbles floating up past the rim
    const risers = risersRef.current
      .map((r) => ({ ...r, age: r.age + 1, y: r.y - 0.85, x: r.x + r.drift * 0.28 }))
      .filter((r) => r.age <= r.life && r.y > -3)
    // At most one new riser per tick: refilling the pool in one go would
    // launch them in lockstep and they would climb as a rank rather than
    // detaching one at a time.
    const wantR = heat === 2 ? 8 : heat === 1 ? 6 : 4
    if (risers.length < wantR && Math.random() < 0.5) {
      const roll = Math.random()
      risers.push({
        x: CX + (Math.random() * 2 - 1) * (MOUTH_HW - 3),
        y: Y_LIP - 1,
        size: roll < 0.34 ? 1 : roll < 0.74 ? 2 : 3,
        drift: Math.random() < 0.5 ? -1 : 1,
        age: 0,
        life: heat === 2 ? 11 : 9 + Math.floor(Math.random() * 5),
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
      // the canvas is bottom-aligned in the wrapper, so measure the mouth up
      // from the bottom edge rather than down from a top that isn't the art's
      return {
        x: r.left + r.width / 2,
        y: r.bottom - (ROWS - MY - 0.5) * PX,
        rx: MOUTH_HW * PX,
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
