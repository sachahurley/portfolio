/**
 * PixelName — the 8-bit welcome screen: the exact AsciiName composition
 * (lib/nameArt.ts — letterforms, carved shading, drips, checkered frame)
 * rendered as chunky solid pixels on a canvas, in the style of the site's
 * other pixel art (PixelFire / PixelStalactites).
 *
 * - Same layout math as AsciiName's fillContainer mode (cell = u*CHAR_W wide,
 *   u*LINE_H tall, 6-col side gutters), so the two versions are cell-for-cell
 *   identical; only the rendering differs.
 * - 8-bit shading: the 135° gradient is quantized into discrete bands, and the
 *   carve tones (█ ▓ ▒ ░) step the band color toward the page background, so
 *   the whole image uses a small fixed palette with hard edges.
 * - Drips replay the ASCII version's CSS choreography (stagger by seed,
 *   steps(6) growth to 55% of the cycle, linger, fade) from a rAF loop.
 * - Theming: reads the same --ascii-gradient-from/-to hooks (plus --bg), so
 *   egg themes recolor this version too. Reduced motion renders static.
 */

import { useEffect, useRef } from 'react'
import { CHAR_W, LINE_H, buildArt, frameTo, mergeDrips, type Composition } from '../lib/nameArt'
import { mix } from '../lib/themes'

// Ink density of each shade glyph -> how far the cell steps toward the bg.
const TONES: Record<string, number> = { '█': 0, '▓': 0.25, '▒': 0.5, '░': 0.72 }
const GRADIENT_BANDS = 6 // discrete gradient steps (the "8-bit palette")
const DRIP_STEPS = 6     // matches steps(6, end) in the ASCII version

function rgbToHex(rgb: string): string {
  const m = rgb.match(/\d+/g)
  if (!m) return '#000000'
  return '#' + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, '0')).join('')
}

export interface PixelNameProps {
  /** Frame grows to fill the parent box (use for full-screen welcome) */
  fillContainer?: boolean
  /** Animate the drips (default true; static under prefers-reduced-motion) */
  animateDrips?: boolean
  /** Cap in px for the cell unit (the ASCII version's maxFontSize) */
  maxCell?: number
  /** Seconds for one drip cycle */
  dripDuration?: number
  className?: string
}

export default function PixelName({
  fillContainer = false,
  animateDrips = true,
  maxCell = 12,
  dripDuration = 2.8,
  className,
}: PixelNameProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate =
      animateDrips && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const art = buildArt()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let comp: Composition | null = null
    let cellW = 0
    let cellH = 0
    let ox = 0
    let oy = 0
    let base: HTMLCanvasElement | null = null
    let colors = { from: '#f97316', to: '#ec4899', bg: '#0a0704' }
    let raf: number | null = null
    let lastFrame = 0

    function resolveColors() {
      const probe = document.createElement('span')
      wrap!.appendChild(probe)
      const get = (v: string, fb: string) => {
        probe.style.color = `var(${v}, ${fb})`
        return rgbToHex(getComputedStyle(probe).color)
      }
      colors = {
        from: get('--ascii-gradient-from', '#f97316'),
        to: get('--ascii-gradient-to', '#ec4899'),
        bg: get('--bg', '#0a0704'),
      }
      probe.remove()
    }

    // 135° gradient quantized into GRADIENT_BANDS steps, then the cell's tone
    // steps it toward the bg. Small palette, hard edges - the 8-bit look.
    function cellColor(ch: string, x: number, y: number): string | null {
      const tone = TONES[ch]
      if (tone === undefined || !comp) return null
      const t = (x / (comp.cols - 1) + y / (comp.rows - 1)) / 2
      const band = Math.min(GRADIENT_BANDS - 1, Math.floor(t * GRADIENT_BANDS))
      const g = mix(colors.from, colors.to, band / (GRADIENT_BANDS - 1))
      return tone > 0 ? mix(g, colors.bg, tone) : g
    }

    // Cumulative rounding: each cell rect snaps to device pixels without the
    // grid drifting, so blocks stay crisp at any size.
    const px = (i: number, cell: number, o: number) => o + Math.round(i * cell)
    function fillCell(c: CanvasRenderingContext2D, x: number, y: number, color: string) {
      const x0 = px(x, cellW, ox)
      const y0 = px(y, cellH, oy)
      c.fillStyle = color
      c.fillRect(x0, y0, px(x + 1, cellW, ox) - x0, px(y + 1, cellH, oy) - y0)
    }

    function renderBase() {
      if (!comp) return
      const lines = animate ? comp.lines : mergeDrips(comp.lines, comp.drips)
      base = document.createElement('canvas')
      base.width = canvas!.width
      base.height = canvas!.height
      const bctx = base.getContext('2d')!
      for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
          const color = cellColor(lines[y][x], x, y)
          if (color) fillCell(bctx, x, y, color)
        }
      }
    }

    function layout() {
      const w = wrap!.clientWidth
      const h = wrap!.clientHeight
      if (w === 0) return
      let u: number
      if (fillContainer && h > 0) {
        // Same sizing as AsciiName: art plus a 6-col / 1-row gutter inside the frame.
        u = Math.min(w / ((art.cols + 16) * CHAR_W), h / ((art.rows + 4) * LINE_H), maxCell)
        comp = frameTo(art, Math.floor(w / (u * CHAR_W)), Math.floor(h / (u * LINE_H)))
      } else {
        comp = frameTo(art, art.cols + 8, art.rows + 4)
        u = Math.min(w / (comp.cols * CHAR_W), maxCell)
        canvas!.style.height = `${Math.round(comp.rows * u * LINE_H)}px`
      }
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round((fillContainer ? h : comp.rows * u * LINE_H) * dpr)
      cellW = u * CHAR_W * dpr
      cellH = u * LINE_H * dpr
      ox = Math.round((canvas!.width - comp.cols * cellW) / 2)
      oy = Math.round((canvas!.height - comp.rows * cellH) / 2)
      resolveColors()
      renderBase()
      draw(performance.now())
    }

    function draw(now: number) {
      if (!comp || !base) return
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(base, 0, 0)
      if (!animate) return
      const tSec = now / 1000
      for (const d of comp.drips) {
        const delay = (d.seed / 8) * dripDuration
        let frac = 1
        let alpha = 1
        if (tSec >= delay) {
          // steps(6, end) over the whole cycle, like the CSS animation:
          // grow to 55%, linger to 82%, fade to 100%.
          const p = (((tSec - delay) % dripDuration) / dripDuration) * DRIP_STEPS
          const stepped = Math.floor(p) / DRIP_STEPS
          frac = stepped < 0.55 ? stepped / 0.55 : 1
          alpha = stepped < 0.82 ? 1 : 1 - (stepped - 0.82) / 0.18
        }
        const visRows = Math.round(frac * d.chars.length)
        for (let i = 0; i < visRows; i++) {
          // Drips render in the "to" color (the wet end), faded by tone + age.
          let color = mix(colors.to, colors.bg, TONES[d.chars[i]] ?? 0)
          if (alpha < 1) color = mix(color, colors.bg, 1 - alpha)
          fillCell(ctx!, d.x, d.y + i, color)
        }
      }
    }

    function tick(now: number) {
      // The drip quantum is dripDuration/6 (~470ms); ~12fps is plenty.
      if (now - lastFrame >= 80) {
        lastFrame = now
        draw(now)
      }
      raf = requestAnimationFrame(tick)
    }

    layout()
    const ro = new ResizeObserver(() => layout())
    ro.observe(wrap)
    if (animate) raf = requestAnimationFrame(tick)
    return () => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [fillContainer, animateDrips, maxCell, dripDuration])

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Sacha Hurley"
      className={className}
      style={{
        position: 'relative',
        userSelect: 'none',
        ...(fillContainer ? { width: '100%', height: '100%', overflow: 'hidden' } : { width: '100%' }),
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: 'block', width: '100%', height: fillContainer ? '100%' : undefined, imageRendering: 'pixelated' }}
      />
    </div>
  )
}
