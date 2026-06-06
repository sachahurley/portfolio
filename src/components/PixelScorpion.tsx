/**
 * PixelScorpion Component
 *
 * A pixel-art scorpion, reproduced from the source graphic and brought to life:
 * the tail sways in a gentle whip, both pincers open and close, and the whole
 * body has a slow idle sway — the "selected character" feel of a video-game
 * roster. Companion to PixelFire / PixelStalactites; same canvas + RAF +
 * pixelated approach.
 *
 * The art and an articulation rig are baked offline into scorpionPixels.ts
 * (see scripts/bake-scorpion.mjs). Here we just group cells by limb and, each
 * frame, draw each group through its own affine transform (rotation about a
 * joint), all composed under one global sway. Rendering at display resolution
 * keeps the rotated limbs clean while the small square cells read as pixels.
 */

import { useEffect, useMemo, useRef } from 'react'
import { COLS, ROWS, PARTS, TONES, RIG, Part } from './scorpionPixels'

// Warm-stone palette echoing PixelStalactites (whose tones run #4A3C2C → #282119
// in the sepia family) rather than bright amber. Kept a notch brighter than the
// ambient stalactites so the hero still reads on the #0A0704 background:
//   tone 1 = shade → #4A3C2C (the stalactite mineral-highlight tone)
//   tone 2 = body  → #968A75 (sepia-600, muted warm stone)
const PALETTE = ['transparent', '#4A3C2C', '#968A75'] as const

// Sparse brighter specks, scattered deterministically across the body so the
// scorpion reads with a bit more detail instead of two flat tones.
const SPEC_WHITE = '#fdfbf5' // bright warm white highlight
const SPEC_GOLD = '#e0a33d' // gold fleck (matches the site accent)
const rand = (n: number): number => {
  const x = Math.sin(n) * 43758.5453
  return x - Math.floor(x)
}

// --- tiny affine helpers: 2x3 matrix mapping (x,y) -> (a*x+c*y+e, b*x+d*y+f) ---
type Mat = { a: number; b: number; c: number; d: number; e: number; f: number }
const translate = (tx: number, ty: number): Mat => ({ a: 1, b: 0, c: 0, d: 1, e: tx, f: ty })
const scale = (s: number): Mat => ({ a: s, b: 0, c: 0, d: s, e: 0, f: 0 })
// Compose M ∘ N (apply N first, then M).
function mul(M: Mat, N: Mat): Mat {
  return {
    a: M.a * N.a + M.c * N.b,
    b: M.b * N.a + M.d * N.b,
    c: M.a * N.c + M.c * N.d,
    d: M.b * N.c + M.d * N.d,
    e: M.a * N.e + M.c * N.f + M.e,
    f: M.b * N.e + M.d * N.f + M.f,
  }
}
// Rotate by `ang` (radians) about pivot (px,py).
function rotAbout(px: number, py: number, ang: number): Mat {
  const cos = Math.cos(ang), sin = Math.sin(ang)
  return { a: cos, b: sin, c: -sin, d: cos, e: px - cos * px + sin * py, f: py - sin * px - cos * py }
}

interface CellGroup {
  // Flat [col, row, col, row, ...] split by tone so we set fillStyle twice/group.
  gray: number[]
  white: number[]
}

// Build per-limb cell groups once from the baked grids.
function buildGroups() {
  const make = (): CellGroup => ({ gray: [], white: [] })
  const groups = { static: make(), tail: make(), tailTip: make(), fingerA: make(), fingerB: make() }
  for (let r = 0; r < ROWS; r++) {
    const tRow = TONES[r], pRow = PARTS[r]
    for (let c = 0; c < COLS; c++) {
      const tone = tRow.charCodeAt(c) - 48 // '0'..'2'
      if (tone === 0) continue
      const part = pRow.charCodeAt(c) - 48
      let g: CellGroup
      switch (part) {
        case Part.Tail: g = groups.tail; break
        case Part.TailTip: g = groups.tailTip; break
        case Part.ClawAFinger: g = groups.fingerA; break
        case Part.ClawBFinger: g = groups.fingerB; break
        default: g = groups.static // body + fixed claw halves
      }
      ;(tone === 2 ? g.white : g.gray).push(c, r)
    }
  }
  return groups
}

interface PixelScorpionProps {
  /** Rendered width in CSS px; height follows the art's aspect ratio. */
  width?: number
  /** When false (default), the scorpion is drawn as a single static frame. */
  animated?: boolean
  className?: string
}

export default function PixelScorpion({ width = 340, animated = false, className }: PixelScorpionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const groups = useMemo(() => buildGroups(), [])

  const displayW = width
  const displayH = Math.round((width * ROWS) / COLS)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(displayW * dpr)
    canvas.height = Math.round(displayH * dpr)
    const cell = canvas.width / COLS // canvas px per grid cell

    // Hold a single static frame unless explicitly animated (and motion allowed).
    const reduce = !animated || window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Draw a single cell group through a grid→canvas transform.
    const Sscale = scale(cell)
    // Per-cell color: mostly the base tone, with occasional white/gold specks
    // keyed off the grid position so the pattern is stable (the scorpion is static).
    const colorFor = (c: number, r: number, base: string): string => {
      const h = rand(c * 12.9898 + r * 78.233)
      if (h > 0.95) return SPEC_WHITE
      if (h > 0.89) return SPEC_GOLD
      return base
    }
    const drawGroup = (g: CellGroup, m: Mat) => {
      ctx.setTransform(m.a, m.b, m.c, m.d, m.e, m.f)
      for (let i = 0; i < g.gray.length; i += 2) {
        const c = g.gray[i], r = g.gray[i + 1]
        ctx.fillStyle = colorFor(c, r, PALETTE[1])
        ctx.fillRect(c, r, 1.02, 1.02)
      }
      for (let i = 0; i < g.white.length; i += 2) {
        const c = g.white[i], r = g.white[i + 1]
        ctx.fillStyle = colorFor(c, r, PALETTE[2])
        ctx.fillRect(c, r, 1.02, 1.02)
      }
    }

    const render = (t: number) => {
      // Idle sway of the whole body, plus a tiny vertical bob.
      const θg = reduce ? 0 : 0.025 * Math.sin(t * 0.00175) + 0.008 * Math.sin(t * 0.0011 + 1.3)
      const bob = reduce ? 0 : 0.6 * Math.sin(t * 0.0015 + 0.5)
      const G = mul(translate(0, bob), rotAbout(RIG.swayOrigin[0], RIG.swayOrigin[1], θg))
      const base = mul(Sscale, G) // grid → canvas, with global sway

      // Limb angles (radians). Tail whips with a lagged tip; claws open/close
      // out of sync with each other.
      const θtail = reduce ? 0 : 0.07 * Math.sin(t * 0.00196)
      const θtip = reduce ? 0 : 0.14 * Math.sin(t * 0.00196 + 0.7)
      const θA = reduce ? 0 : -0.13 + 0.13 * Math.sin(t * 0.00273)
      const θB = reduce ? 0 : 0.12 - 0.12 * Math.sin(t * 0.00232 + 1.0)

      const mTail = mul(base, rotAbout(RIG.tailBase[0], RIG.tailBase[1], θtail))
      const mTip = mul(mTail, rotAbout(RIG.tailMid[0], RIG.tailMid[1], θtip))
      const mA = mul(base, rotAbout(RIG.clawA[0], RIG.clawA[1], θA))
      const mB = mul(base, rotAbout(RIG.clawB[0], RIG.clawB[1], θB))

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Painter order: tail behind, body over its base seam, fingers on top.
      drawGroup(groups.tail, mTail)
      drawGroup(groups.tailTip, mTip)
      drawGroup(groups.static, base)
      drawGroup(groups.fingerA, mA)
      drawGroup(groups.fingerB, mB)

      if (!reduce) animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [groups, displayW, displayH, animated])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: `${displayW}px`, height: `${displayH}px`, display: 'block' }}
      aria-hidden="true"
    />
  )
}
