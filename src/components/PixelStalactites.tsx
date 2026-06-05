/**
 * PixelStalactites Component
 *
 * A pixel-art rock ceiling along the top of the page from which stalactites of
 * varying lengths hang downward. Companion to PixelFire at the bottom; replaces
 * the older drifting PixelClouds band.
 *
 * The silhouette is procedural but anchored (stalactites are fixed to the
 * ceiling, so they don't drift sideways): a deterministic generator lays out a
 * row of tapering spikes across the full width, each with its own width, length
 * and slightly jagged edges. A lighter outline traces every spike so the shape
 * reads, while the interior shimmers with a slow animated dither so the band
 * stays alive like the fire and the old clouds did.
 *
 * - Full page width (edge to edge), pixelated rendering
 * - Warm stone palette tuned to sit just above the page background (#0A0704)
 */

import { useEffect, useRef, useState } from 'react'

// Warm stone tones, dark → light (index 1 → 5). Tuned to sit just above the
// page background (#0A0704, a warm near-black): the body hides into the bg while
// the outline (2) and rare highlight (5) keep the spikes legible.
const PALETTE = [
  'transparent',  // 0: empty
  '#1C1611',      // 1: warm near-bg (ceiling top edge line)
  '#282119',      // 2: outline — edges, tips, ceiling lip (defines the shape)
  '#201A14',      // 3: base slab / mid churn
  '#18130F',      // 4: body (closest to the background)
  '#4A3C2C',      // 5: warm highlight (sparse mineral fleck)
]

const PIXEL_SIZE = 4    // Each "pixel" is 4x4 real pixels
const CEILING_ROWS = 2  // Solid rock band at the very top
const MAX_LEN = 12      // Longest a spike reaches down (grid rows)
const TOTAL_ROWS = CEILING_ROWS + MAX_LEN

// Deterministic pseudo-random in [0, 1) from a seed — stable across resizes and
// remounts so the cave doesn't reshuffle every render.
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

interface Spike {
  center: number      // grid column of the spike's center
  halfWidth: number   // half-width at the ceiling (widest point)
  length: number      // how many rows it hangs down
}

// Lay out a packed row of stalactites across the width, each with its own width,
// length and spacing. Walks left → right so the same seed yields the same cave.
function buildSpikes(gridWidth: number): Spike[] {
  const spikes: Spike[] = []
  let x = 0
  let i = 0
  while (x < gridWidth + MAX_LEN) {
    const halfWidth = 2 + Math.floor(rand(i * 1.7 + 0.3) * 2) // 2..3 → 4..6 wide
    const length = 3 + Math.floor(rand(i * 2.3 + 1.1) * 10) // 3..12 — dynamic mix, tallest unchanged
    // Squared random → most teeth cluster close together, with occasional wider
    // openings, for irregular spacing rather than an even comb.
    const gap = 1 + Math.floor(Math.pow(rand(i * 3.1 + 2.7), 2) * 6) // 1..7 cells, biased small
    const center = x + halfWidth
    spikes.push({ center, halfWidth, length })
    x = center + halfWidth + gap
    i++
  }
  return spikes
}

// Animated interior field — a few travelling waves interfere into a slow,
// gentle churn inside the spikes so the stone shimmers without the silhouette
// moving. Returns ~[-4, 4], mapped to a couple of tones in the render loop.
function flow(c: number, r: number, f: number): number {
  return (
    Math.sin(c * 0.35 + r * 0.5 - f * 0.8) +
    Math.sin(r * 0.9 - f * 0.5) +
    Math.sin((c * 0.6 + r * 0.4) - f * 0.6) +
    Math.sin(c * 0.2 - f * 0.3)
  )
}

export default function PixelStalactites() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spikesRef = useRef<Spike[]>([])
  const animFrameRef = useRef<number | null>(null)
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
    canvas.height = TOTAL_ROWS * PIXEL_SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Geometry is fixed; only the interior shimmer animates.
    spikesRef.current = buildSpikes(gridWidth)

    const paint = (col: number, row: number, tone: number) => {
      ctx.fillStyle = PALETTE[tone]
      ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
    }

    const animate = (timestamp: number) => {
      const f = timestamp * 0.0022 // slow interior phase

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Solid rock ceiling: a lit lip on top, base slab beneath.
      for (let col = 0; col < gridWidth; col++) {
        paint(col, 0, 2)
        for (let row = 1; row < CEILING_ROWS; row++) paint(col, row, 3)
      }

      // Hang each stalactite from the ceiling, tapering to a point.
      for (const spike of spikesRef.current) {
        for (let r = 0; r <= spike.length; r++) {
          const t = r / spike.length
          // Taper toward the tip, eased so spikes stay broad up top then pinch.
          const base = spike.halfWidth * Math.pow(1 - t, 0.85)
          // Independent left/right jag for an organic, non-symmetric icicle.
          const jagL = rand(spike.center * 1.3 + r * 2.1) < 0.12 ? 1 : 0
          const jagR = rand(spike.center * 2.7 + r * 1.9) < 0.12 ? 1 : 0
          const hwL = Math.max(0, Math.round(base) - jagL)
          const hwR = Math.max(0, Math.round(base) - jagR)
          const row = CEILING_ROWS + r

          for (let col = spike.center - hwL; col <= spike.center + hwR; col++) {
            if (col < 0 || col >= gridWidth) continue
            const isEdge = col === spike.center - hwL || col === spike.center + hwR
            const isTip = r === spike.length
            let tone: number
            if (isEdge || isTip) {
              tone = 2 // outline + tip
            } else {
              const n = flow(spike.center + col, r, f)
              if (n > 2.4) tone = 5      // sparse mineral highlight
              else if (n > 0.8) tone = 3 // mid churn
              else tone = 4              // body (darkest, hides into bg)
            }
            paint(col, row, tone)
          }
        }
      }

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
        style={{ height: `${TOTAL_ROWS * PIXEL_SIZE}px`, imageRendering: 'pixelated' }}
      />
    </header>
  )
}
