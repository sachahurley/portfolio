/**
 * PixelStalactites Component
 *
 * A dithered rock ceiling along the top of the page from which stalactites
 * of varying lengths hang. Rendered in the same register as the welcome
 * title and the dungeon-gate hero: shapes are built from Bayer-ordered
 * dot density in the mid sepia (no solid fills or outlines), denser near
 * the ceiling and sparser toward the tips, with a slow travelling-wave
 * modulation so the dots quietly seethe. Each spike sheds a bright
 * sepia-100 water drip, the one solid accent, matching the welcome ink.
 *
 * The silhouette is procedural but anchored (deterministic per width):
 * spikes never drift, only the dither breathes.
 */

import { useEffect, useRef, useState } from 'react'
import { bayerThreshold } from '../lib/dither/oneBit'

const INK = '#695F4D'  // sepia-700: the welcome dark drip tone (the base dots)
const DRIP = '#FCFBFA' // sepia-100: the welcome ink, for the falling glint

const PIXEL_SIZE = 4 // each art cell is 4x4 CSS px
const MAX_LEN = 12   // longest a spike reaches down (grid rows)
const TOTAL_ROWS = MAX_LEN

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

// Lay out a packed row of stalactites across the width. Narrower teeth than
// the old solid version (3..5 cells wide) so the band reads light.
function buildSpikes(gridWidth: number): Spike[] {
  const spikes: Spike[] = []
  let x = 0
  let i = 0
  while (x < gridWidth + MAX_LEN) {
    const halfWidth = 1 + Math.floor(rand(i * 1.7 + 0.3) * 2) // 1..2 → 3..5 wide
    const length = 3 + Math.floor(rand(i * 2.3 + 1.1) * 10) // 3..12
    // Squared random → most teeth cluster close together, with occasional wider
    // openings, for irregular spacing rather than an even comb.
    const gap = 1 + Math.floor(Math.pow(rand(i * 3.1 + 2.7), 2) * 6) // 1..7 cells
    const center = x + halfWidth
    spikes.push({ center, halfWidth, length })
    x = center + halfWidth + gap
    i++
  }
  return spikes
}

// Slow travelling-wave interference: returns ~[-1, 1], used to modulate the
// dot density so the stone shimmers without the silhouette moving.
function flow(c: number, r: number, f: number): number {
  return (
    Math.sin(c * 0.35 + r * 0.5 - f * 0.8) +
    Math.sin(r * 0.9 - f * 0.5) +
    Math.sin((c * 0.6 + r * 0.4) - f * 0.6) +
    Math.sin(c * 0.2 - f * 0.3)
  ) / 4
}

export default function PixelStalactites() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spikesRef = useRef<Spike[]>([])
  const animFrameRef = useRef<number | null>(null)
  const [gridWidth, setGridWidth] = useState(0)

  // Grid width from the rendered canvas (w-full, so it tracks its container;
  // inside the game frame that is the viewport column, not the window).
  useEffect(() => {
    const canvas = canvasRef.current
    const updateWidth = () => {
      const w = canvas?.clientWidth || window.innerWidth
      setGridWidth(Math.floor(w / PIXEL_SIZE))
    }
    updateWidth()
    const ro = new ResizeObserver(updateWidth)
    if (canvas) ro.observe(canvas)
    return () => ro.disconnect()
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

    // Geometry is fixed; only the dither breathes.
    spikesRef.current = buildSpikes(gridWidth)

    const paint = (col: number, row: number, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
    }

    const animate = (timestamp: number) => {
      const f = timestamp * 0.0022 // slow phase

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const spike of spikesRef.current) {
        // One water drip per spike: forms at the top, descends slowly, then
        // disappears at the tip with a pause before the next forms.
        const dripPhase = rand(spike.center * 0.917)
        const dripSpeed = 1.2 + rand(spike.center * 1.31) * 1.2 // rows/sec
        const dripCycle = spike.length + 1 + 14
        const dripPos = (timestamp * 0.001 * dripSpeed + dripPhase * dripCycle) % dripCycle

        for (let r = 0; r <= spike.length; r++) {
          const t = r / spike.length
          // Taper toward the tip, eased so spikes stay broad up top then pinch.
          const base = spike.halfWidth * Math.pow(1 - t, 0.85)
          // Independent left/right jag for an organic, non-symmetric icicle.
          const jagL = rand(spike.center * 1.3 + r * 2.1) < 0.12 ? 1 : 0
          const jagR = rand(spike.center * 2.7 + r * 1.9) < 0.12 ? 1 : 0
          const hwL = Math.max(0, Math.round(base) - jagL)
          const hwR = Math.max(0, Math.round(base) - jagR)
          const isDrip = dripPos <= spike.length && Math.abs(r - dripPos) < 0.6
          const dripCenter = spike.center + Math.round(Math.sin(r * 0.8 + dripPhase * 6.283))

          for (let col = spike.center - hwL; col <= spike.center + hwR; col++) {
            if (col < 0 || col >= gridWidth) continue
            // The falling drip is the one solid mark: welcome-ink bright.
            if (isDrip && col === dripCenter) {
              paint(col, r, DRIP)
              continue
            }
            // Dot density: dense at the ceiling, sparse toward the tip, a
            // touch heavier along the edges so the shape still reads, all
            // gently modulated by the travelling waves.
            const isEdge = col === spike.center - hwL || col === spike.center + hwR
            const isTip = r === spike.length
            let v = 0.68 - 0.45 * t
            if (isEdge || isTip) v += 0.14
            v += flow(spike.center + col, r, f) * 0.12
            if (v > bayerThreshold(col, r)) paint(col, r, INK)
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
