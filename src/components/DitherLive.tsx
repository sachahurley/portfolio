/**
 * DitherLive — the welcome title as a live-boiled studio asset. Loads the
 * flat-colour "wild" lettering export, reads it back into a coverage field
 * (lib/dither/liveAsset), and re-thresholds it on canvas at a slow 7fps
 * beat: drip shades and letter rims quietly seethe, letter cores hold
 * still. Entrance is the classic Mac ordered dissolve (~1.5s of pixels
 * arriving in Bayer order). Once the dissolve lands, the inner elevation
 * bands throb: each eases toward a darker sepia and back on a slow ~5s
 * sine, deeper bands swinging further so the pulse reads from the stroke
 * cores outward. Colours resolve from the sepia tokens each beat, so token
 * changes flow through live. Reduced motion skips the dissolve, the boil,
 * and the throb and shows the finished still.
 *
 * Displayed at the largest exact integer pixel scale that fits the
 * viewport (nearest-neighbour only, never fractional).
 */

import { useEffect, useRef } from 'react'
import {
  buildLiveField,
  renderLiveFrame,
  type LiveField,
  type PatchSegment,
} from '../lib/dither/liveAsset'
import type { Rgb } from '../lib/dither/render'

const FPS = 7 // slow beat, roughly half the reference clips' 15fps
const FRAMES = 8
const BOIL = 0.1
const DISSOLVE_BEATS = 10 // ~1.4s entrance at 7fps

const WILD_SRC = '/dither/sacha-hurley-wild.webp'

/** Repair strokes for the wild export (asset pixel coordinates): the Y at
 *  the end of HURLEY is drawn so sketchily it fell apart. Each stroke
 *  traces a speck trail as solid letter ink, so the whole letterform
 *  connects: the right fork's tip down into the junction (two segments),
 *  then both descender strands from the junction to the tail's bottom. */
const WILD_PATCHES: PatchSegment[] = [
  [312, 32, 313, 42],
  [313, 42, 316, 58],
  [311, 90, 314, 118],
  [318, 88, 320, 128],
]

/** [ground, word rim, mid, dark, then the word elevation bands: each
 *  contour inward of the stroke edge steps darker, hypsometric-map style,
 *  landing on sepia-600 so the stroke cores read properly dark.
 *  Token names with baked-value fallbacks. */
const PALETTE_VARS: [string, string][] = [
  ['--color-sepia-950', '#1a150f'],
  ['--color-sepia-100', '#fcfbfa'],
  ['--color-sepia-500', '#bfb4a3'],
  ['--color-sepia-700', '#695f4d'],
  ['--color-sepia-300', '#f0ebe4'],
  ['--color-sepia-400', '#e0dace'],
  ['--color-sepia-600', '#968a75'],
]

/** The throb: each inner elevation band darkens toward a deeper sepia,
 *  then eases back. Strength scales the excursion so the pulse deepens
 *  toward the stroke cores. The deep floor (cores dipping to sepia-800)
 *  is safe now that the bridge dither and the Y's solid repair strokes
 *  hold the letterforms together through the dark half of the cycle. */
const THROB_BEATS = 35 // full cycle ~5s at 7fps
const THROB: { band: number; dark: [string, string]; strength: number }[] = [
  { band: 4, dark: ['--color-sepia-600', '#968a75'], strength: 0.6 },
  { band: 5, dark: ['--color-sepia-700', '#695f4d'], strength: 0.8 },
  { band: 6, dark: ['--color-sepia-800', '#474030'], strength: 1 },
]

function parseRgb(s: string): Rgb {
  const m = s.match(/\d+/g)
  return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0]
}

export default function DitherLive({
  src = WILD_SRC,
  className,
}: {
  src?: string
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let disposed = false
    let lf: LiveField | null = null
    let img: ImageData | null = null
    let off: HTMLCanvasElement | null = null
    let octx: CanvasRenderingContext2D | null = null
    let palette: Rgb[] = PALETTE_VARS.map(() => [0, 0, 0])
    let throbDarks: Rgb[] = THROB.map(() => [0, 0, 0])
    let frame = 0
    let beat = animate ? 0 : DISSOLVE_BEATS
    let throbBeat = 0
    let raf: number | null = null
    let prev = 0
    let acc = 0

    // Persistent probe span: getComputedStyle resolves var() chains that
    // canvas fillStyle cannot.
    const probe = document.createElement('span')
    probe.style.display = 'none'
    wrap.appendChild(probe)
    function resolvePalette() {
      const resolve = ([v, fb]: [string, string]): Rgb => {
        probe.style.color = `var(${v}, ${fb})`
        return parseRgb(getComputedStyle(probe).color)
      }
      palette = PALETTE_VARS.map(resolve)
      throbDarks = THROB.map((t) => resolve(t.dark))
    }

    function draw() {
      if (!lf || !img || !off || !octx) return
      const progress = Math.min(1, beat / DISSOLVE_BEATS)
      // Raised-cosine throb phase: rests at the base tones, dips darkest
      // mid-cycle.
      const phase = (1 - Math.cos((2 * Math.PI * throbBeat) / THROB_BEATS)) / 2
      const pal = palette.slice()
      THROB.forEach((t, j) => {
        const base = palette[t.band]
        const dark = throbDarks[j]
        const k = phase * t.strength
        pal[t.band] = [
          Math.round(base[0] + (dark[0] - base[0]) * k),
          Math.round(base[1] + (dark[1] - base[1]) * k),
          Math.round(base[2] + (dark[2] - base[2]) * k),
        ]
      })
      renderLiveFrame(lf, frame, animate ? BOIL : 0, progress, pal, img)
      octx.putImageData(img, 0, 0)
      ctx!.imageSmoothingEnabled = false
      ctx!.drawImage(off, 0, 0, canvas!.width, canvas!.height)
    }

    function layout() {
      if (!lf) return
      const vw = Math.round(wrap!.clientWidth * dpr)
      const vh = Math.round(wrap!.clientHeight * dpr)
      if (vw === 0 || vh === 0) return
      const k = Math.max(1, Math.min(Math.floor(vw / lf.gw), Math.floor(vh / lf.gh)))
      canvas!.width = lf.gw * k
      canvas!.height = lf.gh * k
      canvas!.style.width = `${(lf.gw * k) / dpr}px`
      canvas!.style.height = `${(lf.gh * k) / dpr}px`
      resolvePalette()
      draw()
    }

    // Even beat with an accumulator: a hidden tab drops its backlog and
    // advances exactly one frame (same discipline as the studio).
    function step(ts: number) {
      raf = requestAnimationFrame(step)
      if (!prev) prev = ts
      acc += ts - prev
      prev = ts
      const interval = 1000 / FPS
      if (acc >= interval) {
        acc %= interval
        frame = (frame + 1) % FRAMES
        // The throb waits out the dissolve, then starts from rest.
        if (beat < DISSOLVE_BEATS) beat++
        else throbBeat = (throbBeat + 1) % THROB_BEATS
        resolvePalette()
        draw()
      }
    }

    const image = new Image()
    image.src = src
    image
      .decode()
      .then(() => {
        if (disposed) return
        const gw = image.naturalWidth
        const gh = image.naturalHeight
        const read = document.createElement('canvas')
        read.width = gw
        read.height = gh
        const rctx = read.getContext('2d')!
        rctx.drawImage(image, 0, 0)
        lf = buildLiveField(rctx.getImageData(0, 0, gw, gh), src === WILD_SRC ? WILD_PATCHES : [])
        off = document.createElement('canvas')
        off.width = gw
        off.height = gh
        octx = off.getContext('2d')!
        img = octx.createImageData(gw, gh)
        for (let p = 3; p < img.data.length; p += 4) img.data[p] = 255
        layout()
        if (animate) raf = requestAnimationFrame(step)
      })
      .catch(() => {})

    const ro = new ResizeObserver(() => layout())
    ro.observe(wrap)
    return () => {
      disposed = true
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      probe.remove()
    }
  }, [src])

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Sacha Hurley, press any key or click to enter"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: 'block', imageRendering: 'pixelated' }}
      />
    </div>
  )
}
