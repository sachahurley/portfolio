/**
 * MenuFire — a short doom-fire that burns along the top of the Menu pill.
 *
 * Same spread algorithm and dark palette as PixelFire (the footer fire), just a
 * few rows tall. Lit on mount; when `lit` flips to false (the first tap of the
 * Menu button) it stops re-igniting, burns out, then halts. Decorative and
 * skipped under prefers-reduced-motion. Replaces the old on-load gold stroke
 * sweep on the Menu button.
 */

import { useEffect, useMemo, useRef } from 'react'
import { useXp } from '../context/XpProvider'
import { firePaletteFor } from '../lib/themes'

const PIXEL_SIZE = 4 // matches PixelFire
// A few rows of headroom above the flames so the tips taper off instead of
// being clipped at the canvas ceiling (the base flame only fills the lower part).
const ROWS = 9
const SPEED = 150 // ms between frames (same crackle as PixelFire)

// A puff of smoke particles, emitted once when the fire is extinguished.
type Smoke = { x: number; y: number; vx: number; vy: number; age: number; life: number; size: number }

export default function MenuFire({ lit }: { lit: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Read the latest `lit` inside the loop without re-running the effect.
  const litRef = useRef(lit)
  useEffect(() => {
    litRef.current = lit
  }, [lit])

  // Palette follows the active egg theme (stock amber for default); read via
  // ref inside the loop, same pattern as litRef, so a theme switch recolors
  // the next frame without re-running the mount effect.
  const { activeEgg } = useXp()
  const palette = useMemo(() => firePaletteFor(activeEgg), [activeEgg])
  const paletteRef = useRef(palette)
  useEffect(() => {
    paletteRef.current = palette
  }, [palette])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cols = 0
    let fire: number[] = []
    let raf: number | null = null
    let lastFrame = 0
    let lastTs = 0
    let prevLit = litRef.current
    let smoke: Smoke[] = []
    let disposed = false

    function measure() {
      cols = Math.max(1, Math.floor(wrap!.clientWidth / PIXEL_SIZE))
      canvas!.width = cols * PIXEL_SIZE
      canvas!.height = ROWS * PIXEL_SIZE
      fire = new Array(cols * ROWS).fill(0)
    }

    function igniteBottom() {
      const start = (ROWS - 1) * cols
      const center = (cols - 1) / 2
      const half = center + 1
      for (let x = 0; x < cols; x++) {
        // Dome profile: hottest in the centre, fading to the edges, so the
        // centre flames rise tallest and the sides shorter -> a campfire cone
        // that tapers to a point.
        const d = Math.abs(x - center) / half // 0 centre .. ~1 edge
        const profile = 1 - d * d
        const max = paletteRef.current.length - 1
        fire[start + x] = Math.max(0, Math.round(profile * max) - Math.floor(Math.random() * 3))
      }
    }
    function extinguishBottom() {
      const start = (ROWS - 1) * cols
      for (let x = 0; x < cols; x++) fire[start + x] = 0
    }
    function spread() {
      const center = (cols - 1) / 2
      for (let x = 0; x < cols; x++) {
        for (let y = 1; y < ROWS; y++) {
          const v = fire[y * cols + x]
          if (v === 0) {
            fire[(y - 1) * cols + x] = 0
            continue
          }
          // Faster decay (0..3) + wind makes the flames wispier and more organic.
          const decay = Math.floor(Math.random() * 4)
          let wind = Math.floor(Math.random() * 3) - 1
          // Gentle inward bias so the flames converge to a tip as they rise.
          if (x < center && Math.random() < 0.25) wind += 1
          else if (x > center && Math.random() < 0.25) wind -= 1
          const dx = Math.min(Math.max(x + wind, 0), cols - 1)
          fire[(y - 1) * cols + dx] = Math.max(0, v - decay)
        }
      }
    }
    function drawFire() {
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < cols; x++) {
          const c = fire[y * cols + x]
          if (c === 0) continue
          ctx!.fillStyle = paletteRef.current[c]
          ctx!.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
        }
      }
    }

    // One quick puff rising from the base centre when the fire goes out.
    function spawnSmoke() {
      const cx = (cols * PIXEL_SIZE) / 2
      const baseY = ROWS * PIXEL_SIZE - PIXEL_SIZE
      const jitter = cols * PIXEL_SIZE * 0.34
      for (let i = 0; i < 9; i++) {
        smoke.push({
          x: cx + (Math.random() - 0.5) * jitter,
          y: baseY - Math.random() * 4,
          vx: (Math.random() - 0.5) * 14, // gentle horizontal drift (px/s)
          vy: -(26 + Math.random() * 34), // rise (px/s)
          age: 0,
          life: 0.45 + Math.random() * 0.4,
          size: PIXEL_SIZE * (1 + Math.floor(Math.random() * 2)),
        })
      }
    }

    function drawSmoke() {
      for (const p of smoke) {
        const k = 1 - p.age / p.life // 1 -> 0 over its life
        ctx!.globalAlpha = 0.3 * k
        const g = 140 + Math.round(50 * (1 - k)) // thins to a lighter grey
        ctx!.fillStyle = `rgb(${g}, ${g - 8}, ${g - 16})`
        const s = p.size + Math.round((1 - k) * PIXEL_SIZE) // expands a touch
        ctx!.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s)
      }
      ctx!.globalAlpha = 1
    }

    function frame(ts: number) {
      if (disposed) return
      const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0
      lastTs = ts

      // Emit a single smoke puff at the moment the fire is extinguished.
      if (prevLit && !litRef.current) spawnSmoke()
      prevLit = litRef.current

      // Fire simulation steps at the slower crackle rate.
      if (ts - lastFrame >= SPEED) {
        if (litRef.current) igniteBottom()
        else extinguishBottom()
        spread()
        lastFrame = ts
      }

      // Smoke advances every frame for smooth motion.
      if (smoke.length) {
        for (const p of smoke) {
          p.age += dt
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.vy *= 1 - Math.min(1, dt * 0.8) // ease the rise as it slows
        }
        smoke = smoke.filter((p) => p.age < p.life)
      }

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      drawFire()
      drawSmoke()

      // Stop once extinguished, burned out, and the puff has cleared.
      if (!litRef.current && smoke.length === 0 && fire.every((v) => v === 0)) {
        raf = null
        return
      }
      raf = requestAnimationFrame(frame)
    }

    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(wrap)
    raf = requestAnimationFrame(frame)

    return () => {
      disposed = true
      if (raf != null) cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="menufire" aria-hidden="true">
      <canvas
        ref={canvasRef}
        // Render at the canvas's true pixel size, centred — no width:100% stretch
        // (which was cropping the right edge).
        style={{ height: ROWS * PIXEL_SIZE, imageRendering: 'pixelated', display: 'block', margin: '0 auto' }}
      />
    </div>
  )
}
