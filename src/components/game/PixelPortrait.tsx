/**
 * PixelPortrait — the visitor's procedural 8-bit avatar.
 *
 * A 12x12-cell face generated deterministically from a seed: the left half
 * is rolled from a seeded hash inside an oval mask, mirrored on X (the
 * mirror-symmetry contract that makes random pixels read as a creature),
 * outlined where filled cells meet empty ones, dithered between two skin
 * tones, with accent-colored eyes. Palette reuses the site's bone/brass/
 * mortar hexes; the eye color reads --accent at draw time, so activating a
 * banner egg re-colors every portrait.
 */

import { useEffect, useRef } from 'react'
import { useXp } from '../../context/XpProvider'

const N = 12
const HALF = N / 2

// 0 empty, 1 outline, 2 skin, 3 skin shade, 4 eye
const COLORS: Record<number, string> = {
  1: '#140F0A', // outline (castle mortar)
  2: '#C7B896', // skin (bone)
  3: '#8A784F', // shade (aged brass)
}
const EYE_ROW = 5
const EYE_COL = 3

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function portraitCells(seed: number): Uint8Array {
  const g = new Uint8Array(N * N)
  // Roll the left half inside an oval face mask.
  for (let r = 1; r < N - 1; r++) {
    for (let c = 1; c < HALF; c++) {
      const dx = (HALF - 0.5 - c) / (HALF - 1)
      const dy = (r - N / 2) / (N / 2 - 1)
      if (dx * dx + dy * dy > 1.02) continue
      if (rand(seed * 7.13 + r * N + c) > 0.3) g[r * N + c] = 2
    }
  }
  // Guarantee the eye and its surround so every face has a readable gaze.
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) g[(EYE_ROW + dr) * N + (EYE_COL + dc)] = 2
  }
  g[EYE_ROW * N + EYE_COL] = 4
  // Mirror onto the right half.
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < HALF; c++) g[r * N + (N - 1 - c)] = g[r * N + c]
  }
  // Shade dither on the lower interior, then outline filled/empty borders.
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = r * N + c
      if (g[i] !== 2) continue
      if (r > N / 2 && rand(seed * 3.7 + i) > 0.6) g[i] = 3
    }
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = r * N + c
      if (g[i] === 0) continue
      const empty = (rr: number, cc: number) =>
        rr < 0 || rr >= N || cc < 0 || cc >= N || g[rr * N + cc] === 0
      if (g[i] !== 4 && (empty(r - 1, c) || empty(r + 1, c) || empty(r, c - 1) || empty(r, c + 1))) {
        g[i] = 1
      }
    }
  }
  return g
}

export default function PixelPortrait({
  seed,
  cell = 4,
  className,
}: {
  seed: number
  /** Screen pixels per grid cell (4 = the site's standard art scale). */
  cell?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeEgg } = useXp() // re-draw when the banner (accent) changes

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const px = cell * Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = N * px
    canvas.height = N * px
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#f0ebe4'
    const g = portraitCells(seed)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const v = g[r * N + c]
        if (v === 0) continue
        ctx.fillStyle = v === 4 ? accent : COLORS[v]
        ctx.fillRect(c * px, r * px, px, px)
      }
    }
  }, [seed, cell, activeEgg])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: N * cell, height: N * cell, imageRendering: 'pixelated', display: 'block' }}
    />
  )
}
