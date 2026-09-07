/**
 * DitherLive — the welcome title as a live-boiled studio asset, in one of
 * two variants (both flat-colour exports read back into a coverage field
 * by lib/dither/liveAsset and re-thresholded on canvas at a slow 7fps
 * beat, entering via the classic Mac ordered dissolve while the lettering
 * fades up from a deep sepia to its final tones):
 *
 *  - 'wild': the metal drip lettering. Drip shades and letter rims quietly
 *    seethe, letter cores hold still, and once the dissolve lands the inner
 *    elevation bands throb toward darker sepia and back on a slow ~5s sine.
 *  - 'block': the 1-bit Helvetica stack (SACHA over HURLEY, hard pixel
 *    edges). Letters stay solid flat; the only life after the dissolve is
 *    the rim boil. No banding, bridging, or patches (sculpt=false).
 *
 * Colours resolve from the sepia tokens each beat, so token changes flow
 * through live. Reduced motion skips the dissolve, the boil, and the throb
 * and shows the finished still. Displayed at the largest exact integer
 * pixel scale that fits the viewport (nearest-neighbour only).
 */

import { useEffect, useRef } from 'react'
import {
  buildLiveField,
  renderLiveDotFrame,
  renderLiveFillFrame,
  renderLiveFrame,
  renderLiveWaveFrame,
  type LiveField,
  type PatchSegment,
} from '../lib/dither/liveAsset'
import type { Rgb } from '../lib/dither/render'

const FPS = 7 // slow beat, roughly half the reference clips' 15fps
const FRAMES = 8
const BOIL = 0.1
const DISSOLVE_BEATS = 10 // ~1.4s entrance at 7fps
const FADE_BEATS = 18 // tonal fade-in overlaps the dissolve, ~2.6s at 7fps
/** Where the tonal fade starts: every non-ground colour opens at this deep
 *  sepia and eases up to its resolved tone as FADE_BEATS elapse. */
const FADE_FROM: [string, string] = ['--color-sepia-700', '#695f4d']

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

export type DitherLiveVariant = 'wild' | 'block'
const VARIANTS: Record<
  DitherLiveVariant,
  { src: string; patches: readonly PatchSegment[]; sculpt: boolean }
> = {
  wild: { src: '/dither/sacha-hurley-wild.webp', patches: WILD_PATCHES, sculpt: true },
  block: { src: '/dither/sacha-hurley-block.png', patches: [], sculpt: false },
}

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

/** Overrides for the studio constants above. Every field defaults to the
 *  welcome-screen value, so the prop only exists for the wordmark lab's
 *  tuned variants; omit it and nothing changes. */
export interface DitherTuning {
  fps?: number
  frames?: number
  boil?: number
  dissolveBeats?: number
  fadeBeats?: number
  fadeFrom?: [string, string]
  palette?: [string, string][]
  /** Dot-matrix mode: each asset pixel becomes a cell-px block holding a
   *  centred size-px dot (halftone look); gain < 1 opens solid interiors
   *  into a boiling sparkle. */
  dot?: { cell: number; size: number; gain: number }
  /** Staged-wave mode: the lettering dissolves in at the first colour,
   *  then each later colour sweeps over the previous one as its own
   *  ordered-dissolve pass (dissolveBeats per wave), fully replacing it.
   *  Replaces the tonal fade; token names with baked fallbacks. */
  waves?: [string, string][]
  /** Rising-fill mode: the lettering dissolves in at `from`, then `to`
   *  fills it bottom to top over `beats`, behind a Bayer-dithered edge
   *  `band` asset-px tall. Optional `via` is a mid tone between the base
   *  and final colours: it runs its own full rise first, then the `to`
   *  pass rises over it (beats per pass). Replaces the tonal fade. */
  fill?: {
    beats: number
    band: number
    from: [string, string]
    via?: [string, string]
    to: [string, string]
  }
}

export default function DitherLive({
  variant = 'wild',
  className,
  tuning,
}: {
  variant?: DitherLiveVariant
  className?: string
  tuning?: DitherTuning
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    fps = FPS,
    frames = FRAMES,
    boil = BOIL,
    dissolveBeats = DISSOLVE_BEATS,
    fadeBeats = FADE_BEATS,
    fadeFrom: fadeFromVar = FADE_FROM,
    palette: paletteVars = PALETTE_VARS,
    dot,
    waves,
    fill,
  } = tuning ?? {}

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
    // Waves own the entrance end-to-end (one dissolveBeats-long pass per
    // colour); fill appends its rises (one per stage) after the dissolve.
    const totalBeats = fill
      ? dissolveBeats + fill.beats * (fill.via ? 2 : 1)
      : dissolveBeats * Math.max(1, waves?.length ?? 1)
    let palette: Rgb[] = paletteVars.map(() => [0, 0, 0])
    let throbDarks: Rgb[] = THROB.map(() => [0, 0, 0])
    let waveColors: Rgb[] = (waves ?? []).map(() => [0, 0, 0])
    let fillFrom: Rgb = [0, 0, 0]
    let fillStages: Rgb[] = []
    let fadeFrom: Rgb = [0, 0, 0]
    let frame = 0
    let beat = animate ? 0 : totalBeats
    let fadeBeat = animate ? 0 : fadeBeats
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
      palette = paletteVars.map(resolve)
      throbDarks = THROB.map((t) => resolve(t.dark))
      waveColors = (waves ?? []).map(resolve)
      if (fill) {
        fillFrom = resolve(fill.from)
        fillStages = (fill.via ? [fill.via, fill.to] : [fill.to]).map(resolve)
      }
      fadeFrom = resolve(fadeFromVar)
    }

    function draw() {
      if (!lf || !img || !off || !octx) return
      if (fill) {
        const progress = Math.min(1, beat / dissolveBeats)
        // Sequential rises: each stage waits out the previous full pass.
        const rises = fillStages.map((_, i) =>
          Math.min(1, Math.max(0, (beat - dissolveBeats - i * fill.beats) / fill.beats)),
        )
        renderLiveFillFrame(
          lf, frame, animate ? boil : 0, progress, rises, fill.band,
          palette[0], fillFrom, fillStages, img,
        )
        octx.putImageData(img, 0, 0)
        ctx!.imageSmoothingEnabled = false
        ctx!.drawImage(off, 0, 0, canvas!.width, canvas!.height)
        return
      }
      if (waves && waves.length > 0) {
        // Sequential per-wave progress; the fade and throb don't apply.
        const ps = waves.map((_, i) =>
          Math.min(1, Math.max(0, (beat - i * dissolveBeats) / dissolveBeats)),
        )
        renderLiveWaveFrame(lf, frame, animate ? boil : 0, ps, palette[0], waveColors, img)
        octx.putImageData(img, 0, 0)
        ctx!.imageSmoothingEnabled = false
        ctx!.drawImage(off, 0, 0, canvas!.width, canvas!.height)
        return
      }
      const progress = Math.min(1, beat / dissolveBeats)
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
      // Tonal entrance: the lettering opens at FADE_FROM and eases up to
      // its final tones; only the ground (band 0) holds its colour.
      const fade = 1 - (1 - Math.min(1, fadeBeat / fadeBeats)) ** 2
      if (fade < 1) {
        for (let i = 1; i < pal.length; i++) {
          const base = pal[i]
          pal[i] = [
            Math.round(fadeFrom[0] + (base[0] - fadeFrom[0]) * fade),
            Math.round(fadeFrom[1] + (base[1] - fadeFrom[1]) * fade),
            Math.round(fadeFrom[2] + (base[2] - fadeFrom[2]) * fade),
          ]
        }
      }
      if (dot) renderLiveDotFrame(lf, frame, animate ? boil : 0, progress, pal, img, dot.cell, dot.size, dot.gain)
      else renderLiveFrame(lf, frame, animate ? boil : 0, progress, pal, img)
      octx.putImageData(img, 0, 0)
      ctx!.imageSmoothingEnabled = false
      ctx!.drawImage(off, 0, 0, canvas!.width, canvas!.height)
    }

    function layout() {
      if (!lf) return
      const vw = Math.round(wrap!.clientWidth * dpr)
      const vh = Math.round(wrap!.clientHeight * dpr)
      if (vw === 0 || vh === 0) return
      const pw = lf.gw * (dot?.cell ?? 1)
      const ph = lf.gh * (dot?.cell ?? 1)
      const k = Math.max(1, Math.min(Math.floor(vw / pw), Math.floor(vh / ph)))
      canvas!.width = pw * k
      canvas!.height = ph * k
      canvas!.style.width = `${(pw * k) / dpr}px`
      canvas!.style.height = `${(ph * k) / dpr}px`
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
      const interval = 1000 / fps
      if (acc >= interval) {
        acc %= interval
        frame = (frame + 1) % frames
        // The throb waits out the dissolve (all waves), then starts from rest.
        if (beat < totalBeats) beat++
        else throbBeat = (throbBeat + 1) % THROB_BEATS
        if (fadeBeat < fadeBeats) fadeBeat++
        resolvePalette()
        draw()
      }
    }

    const art = VARIANTS[variant]
    const image = new Image()
    image.src = art.src
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
        lf = buildLiveField(rctx.getImageData(0, 0, gw, gh), art.patches, art.sculpt)
        off = document.createElement('canvas')
        off.width = gw * (dot?.cell ?? 1)
        off.height = gh * (dot?.cell ?? 1)
        octx = off.getContext('2d')!
        img = octx.createImageData(off.width, off.height)
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
  }, [variant, fps, frames, boil, dissolveBeats, fadeBeats, fadeFromVar, paletteVars, dot, waves, fill])

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
