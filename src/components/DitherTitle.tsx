/**
 * DitherTitle — the video-game title screen: "SACHA HURLEY" as a solid
 * dithered silhouette over a live 1-bit ordered-dither scene, drawn at an
 * exact integer pixel scale for any viewport and coloured from the page's
 * CSS variables each beat, so egg themes recolor it live.
 *
 * Rendering rules come from the sibling dither-studio repo's style guide:
 * grid 150-250 px wide, integer nearest-neighbour upscale only (never CSS
 * percentage scaling), even 15fps beat, boil confined to the shaded band.
 * The algorithms are copied (lib/dither), not imported across repos.
 */

import { useEffect, useRef } from 'react'
import { BAYER4, renderDitherFrame, type DitherColors, type Rgb } from '../lib/dither/render'
import { buildTitleField } from '../lib/dither/titleField'
import './DitherTitle.css'

const FPS = 15
const FRAMES = 10
const BOIL = 0.2
const TARGET_GW = 200 // aim for the middle of the style guide's 150-250 band

function parseRgb(s: string): Rgb {
  const m = s.match(/\d+/g)
  return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0]
}

export interface DitherTitleProps {
  /** Fill the parent box (use for the full-screen welcome) */
  fillContainer?: boolean
  /** Blinking prompt text; pass '' to hide */
  prompt?: string
  className?: string
}

export default function DitherTitle({
  fillContainer = false,
  prompt = 'PRESS START',
  className,
}: DitherTitleProps) {
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

    let gw = 0
    let gh = 0
    let scale = 0
    let field: Float32Array | null = null
    let litMask: Uint8Array | null = null
    let img: ImageData | null = null
    let off: HTMLCanvasElement | null = null
    let octx: CanvasRenderingContext2D | null = null
    let colors: DitherColors = { ground: [10, 7, 4], ink: [240, 240, 240], lit: [224, 163, 61] }
    let frame = 0
    let raf: number | null = null
    let prev = 0
    let acc = 0

    // Persistent probe span: getComputedStyle resolves var() chains that
    // canvas fillStyle cannot (same pattern as PixelName).
    const probe = document.createElement('span')
    probe.style.display = 'none'
    wrap.appendChild(probe)
    function resolveColors() {
      const get = (v: string, fb: string): Rgb => {
        probe.style.color = `var(${v}, ${fb})`
        return parseRgb(getComputedStyle(probe).color)
      }
      colors = {
        ground: get('--bg', '#0a0704'),
        ink: get('--fg', '#f0f0f0'),
        lit: get('--accent', '#e0a33d'),
      }
    }

    function draw() {
      if (!field || !img || !off || !octx) return
      renderDitherFrame(field, gw, gh, frame, animate ? BOIL : 0, BAYER4, colors, img, litMask ?? undefined)
      octx.putImageData(img, 0, 0)
      ctx!.imageSmoothingEnabled = false
      ctx!.drawImage(off, 0, 0, canvas!.width, canvas!.height)
    }

    function layout() {
      const vw = wrap!.clientWidth
      const vh = wrap!.clientHeight
      if (vw === 0 || vh === 0) return
      const deviceW = Math.round(vw * dpr)
      const deviceH = Math.round(vh * dpr)
      // Integer scale keeping the grid inside the 150-250 band where possible.
      let sc = Math.max(1, Math.round(deviceW / TARGET_GW))
      let w = Math.floor(deviceW / sc)
      while (w > 250) {
        sc++
        w = Math.floor(deviceW / sc)
      }
      while (w < 150 && sc > 1) {
        sc--
        w = Math.floor(deviceW / sc)
      }
      const h = Math.floor(deviceH / sc)
      if (w !== gw || h !== gh || sc !== scale) {
        gw = w
        gh = h
        scale = sc
        const built = buildTitleField(gw, gh)
        field = built.field
        litMask = built.lit
        off = document.createElement('canvas')
        off.width = gw
        off.height = gh
        octx = off.getContext('2d')!
        img = octx.createImageData(gw, gh)
        for (let p = 3; p < img.data.length; p += 4) img.data[p] = 255
        // Device pixels are an exact integer multiple of the grid; the CSS
        // size mirrors it so the browser never rescales. Letterbox slack
        // (under one scale step per axis) hides in the flex centring against
        // the matching ground colour.
        canvas!.width = gw * scale
        canvas!.height = gh * scale
        canvas!.style.width = `${(gw * scale) / dpr}px`
        canvas!.style.height = `${(gh * scale) / dpr}px`
      }
      resolveColors()
      draw()
    }

    // Even 15fps beat: accumulator drops any backlog after a hidden tab and
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
        resolveColors()
        draw()
      }
    }

    layout()
    const ro = new ResizeObserver(() => layout())
    ro.observe(wrap)
    if (animate) raf = requestAnimationFrame(step)
    return () => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      probe.remove()
    }
  }, [fillContainer])

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Sacha Hurley, press any key or click to enter"
      className={className}
      style={{
        position: 'relative',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fillContainer
          ? { width: '100%', height: '100%', overflow: 'hidden' }
          : { width: '100%', height: '60vh' }),
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', imageRendering: 'pixelated' }} />
      {prompt ? (
        <span className="dither-prompt" aria-hidden="true">
          {prompt}
        </span>
      ) : null}
    </div>
  )
}
