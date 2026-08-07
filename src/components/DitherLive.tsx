/**
 * DitherLive — the welcome title as a live-boiled studio asset. Loads the
 * flat-colour "wild" lettering export, reads it back into a coverage field
 * (lib/dither/liveAsset), and re-thresholds it on canvas at a slow 7fps
 * beat: drip shades and letter rims quietly seethe, letter cores hold
 * still. Entrance is the classic Mac ordered dissolve (~1.5s of pixels
 * arriving in Bayer order). Colours resolve from the sepia tokens each
 * beat, so token changes flow through live. Reduced motion skips the
 * dissolve and the boil and shows the finished still.
 *
 * Displayed at the largest exact integer pixel scale that fits the
 * viewport (nearest-neighbour only, never fractional).
 */

import { useEffect, useRef } from 'react'
import { buildLiveField, renderLiveFrame, type LiveField } from '../lib/dither/liveAsset'
import type { Rgb } from '../lib/dither/render'

const FPS = 7 // slow beat, roughly half the reference clips' 15fps
const FRAMES = 8
const BOIL = 0.1
const DISSOLVE_BEATS = 10 // ~1.4s entrance at 7fps

/** [ground, word rim, mid, dark, then the word elevation bands: each
 *  contour inward of the stroke edge steps one light sepia darker,
 *  hypsometric-map style]. Token names with baked-value fallbacks. */
const PALETTE_VARS: [string, string][] = [
  ['--color-sepia-950', '#1a150f'],
  ['--color-sepia-100', '#fcfbfa'],
  ['--color-sepia-500', '#bfb4a3'],
  ['--color-sepia-700', '#695f4d'],
  ['--color-sepia-300', '#f0ebe4'],
  ['--color-sepia-400', '#e0dace'],
  ['--color-sepia-500', '#bfb4a3'],
]

function parseRgb(s: string): Rgb {
  const m = s.match(/\d+/g)
  return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0]
}

export default function DitherLive({
  src = '/dither/sacha-hurley-wild.webp',
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
    let frame = 0
    let beat = animate ? 0 : DISSOLVE_BEATS
    let raf: number | null = null
    let prev = 0
    let acc = 0

    // Persistent probe span: getComputedStyle resolves var() chains that
    // canvas fillStyle cannot.
    const probe = document.createElement('span')
    probe.style.display = 'none'
    wrap.appendChild(probe)
    function resolvePalette() {
      palette = PALETTE_VARS.map(([v, fb]) => {
        probe.style.color = `var(${v}, ${fb})`
        return parseRgb(getComputedStyle(probe).color)
      })
    }

    function draw() {
      if (!lf || !img || !off || !octx) return
      const progress = Math.min(1, beat / DISSOLVE_BEATS)
      renderLiveFrame(lf, frame, animate ? BOIL : 0, progress, palette, img)
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
        if (beat < DISSOLVE_BEATS) beat++
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
        lf = buildLiveField(rctx.getImageData(0, 0, gw, gh))
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
