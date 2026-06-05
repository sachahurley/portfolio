/**
 * PixelClouds Component
 *
 * A continuous pixel-art cloud band streaming horizontally (left → right)
 * across the top of the page. Companion to PixelFire at the bottom.
 *
 * Rather than discrete sprites, the cloudscape is procedural: a rolling top
 * contour (layered sine waves) defines one continuous block of cloud, scrolled
 * smoothly to the side. The interior is filled with animated dithered pixels so
 * the texture shimmers and flows inside the clouds as they drift.
 *
 * - Full page width (edge to edge), pixelated rendering
 * - Blue palette: shadow → outline → mid → light → white
 * - Smooth 1px horizontal drift; animated interior "pixelize" movement
 */

import { useEffect, useRef, useState } from 'react'

// Mostly white/grey with a hint of blue, dark → light (index 1 → 5)
// Tuned to sit just above the page background (#0A0704, a warm near-black).
// Warm dark tones harmonize with the bg; the contour (2) and rare highlight (5)
// stay light enough that the shape reads without blending in.
const PALETTE = [
  'transparent',  // 0: empty
  '#1C1611',      // 1: warm near-bg (top edge line)
  '#282119',      // 2: lightest contour (outline + sides — defines the shape)
  '#201A14',      // 3: base slab
  '#18130F',      // 4: body (closest to the background)
  '#4A3C2C',      // 5: warm highlight (brightest churn fleck — more contrast)
]

const PIXEL_SIZE = 4         // Each "pixel" is 4x4 real pixels
const CLOUD_ROWS = 9         // Grid rows (~36px) — shorter band
const CLOUD_SPEED = 0.05     // cells per frame — gentle horizontal stream

// Rolling cloud-bottom contour. The flat base sits against the top of the page
// and the humps point downward; this returns the last filled row at a given
// world column (higher row = humps reach further down). Layered sines keep it
// organic and endlessly non-repeating as the world column increases.
const BOT_MIN = 3            // shallowest the cloud reaches down
const BOT_MAX = 8            // deepest the humps point down (keeps a block)
function bottomRowAt(c: number): number {
  // Several octaves, weighted toward higher frequencies, for a bumpy,
  // irregular, organic underside rather than a smooth roll.
  const n =
    Math.sin(c * 0.09 + 0.4) * 1.4 +
    Math.sin(c * 0.23 + 1.3) * 1.5 +
    Math.sin(c * 0.47 + 0.7) * 1.0 +
    Math.sin(c * 0.83 + 2.1) * 0.6
  const mid = (BOT_MIN + BOT_MAX) / 2
  const row = Math.round(mid + n * 0.95)
  return Math.min(BOT_MAX, Math.max(BOT_MIN, row))
}

// Animated interior field. Several travelling waves (all shifting in +c as the
// phase f grows) interfere to make a lively, churning texture that flows
// horizontally through the cloud body — the fire effect, sideways. Returns a
// value ~[-4, 4] that gets mapped to a few tones in the render loop.
function flow(c: number, r: number, f: number): number {
  return (
    Math.sin(c * 0.40 - f * 1.3) +
    Math.sin(r * 1.10 + c * 0.15 - f * 0.6) +
    Math.sin((c * 0.9 + r * 0.7) - f * 0.9) +
    Math.sin(c * 0.18 - f * 0.4)
  )
}

export default function PixelClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offsetRef = useRef<number>(0)
  const animFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)
  const [gridWidth, setGridWidth] = useState(0)

  // Track grid width based on full window width
  useEffect(() => {
    const updateWidth = () => {
      setGridWidth(Math.floor(window.innerWidth / PIXEL_SIZE))
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Main animation loop
  useEffect(() => {
    if (gridWidth === 0) return
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = gridWidth * PIXEL_SIZE
    canvas.height = CLOUD_ROWS * PIXEL_SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = (timestamp: number) => {
      // Frame-rate independent: normalise to a 60fps baseline.
      const last = lastFrameTimeRef.current || timestamp
      const deltaFrames = Math.min((timestamp - last) / 16.67, 3)
      lastFrameTimeRef.current = timestamp

      offsetRef.current += CLOUD_SPEED * deltaFrames
      const offset = offsetRef.current
      const baseCol = Math.floor(offset)
      const fracPx = Math.round((offset - baseCol) * PIXEL_SIZE)
      const f = timestamp * 0.004 // interior animation phase

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      // Smooth sub-pixel horizontal scroll on a crisp integer cell grid.
      ctx.translate(-fracPx, 0)

      for (let i = -1; i <= gridWidth + 1; i++) {
        const wc = baseCol + i
        const bot = bottomRowAt(wc)
        const botL = bottomRowAt(wc - 1)
        const botR = bottomRowAt(wc + 1)
        const sx = i * PIXEL_SIZE

        for (let row = 0; row <= bot; row++) {
          let tone: number
          if (row === bot) {
            tone = 2 // bottom contour outline (downward humps)
          } else if (row > botL || row > botR) {
            tone = 2 // exposed vertical side edge of a hump
          } else {
            // Churning interior: map the travelling-wave field to a few tones
            // so lots of pixels animate across several shades, flowing sideways.
            // Fills all the way up to the top edge of the page.
            const n = flow(wc, row, f)
            if (n > 2.4) tone = 5       // brightest flecks (sparse)
            else if (n > 1.1) tone = 2  // light churn
            else if (n > -0.1) tone = 3 // mid churn (common)
            else tone = 4               // body (darkest)
          }
          ctx.fillStyle = PALETTE[tone]
          ctx.fillRect(sx, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
        }
      }

      ctx.restore()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [gridWidth])

  return (
    <header className="mb-12">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height: `${CLOUD_ROWS * PIXEL_SIZE}px`, imageRendering: 'pixelated' }}
      />
    </header>
  )
}
