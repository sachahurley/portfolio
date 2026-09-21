/**
 * Cursor-reactive dot grid - the proof-of-pattern article demo. Canvas logic
 * adapted from the "reactive-grid" lab experiment (src/pages/LabItem.tsx);
 * kept as a copy on purpose so the lab page stays untouched. One twist: dots
 * near the cursor take the live --accent color (read per frame from the
 * document), so the demo re-themes with the egg system.
 */

import { useEffect, useRef } from 'react'

export default function DotGridDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return

    let raf = 0
    const m = { x: -999, y: -999 }

    const size = () => {
      const r = c.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      c.width = r.width * dpr
      c.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    const pos = (e: MouseEvent | TouchEvent) => {
      const r = c.getBoundingClientRect()
      const t = 'touches' in e ? e.touches[0] : e
      m.x = t.clientX - r.left
      m.y = t.clientY - r.top
    }
    const onLeave = () => {
      m.x = -999
      m.y = -999
    }

    window.addEventListener('resize', size)
    c.addEventListener('mousemove', pos)
    c.addEventListener('touchmove', pos, { passive: true })
    c.addEventListener('mouseleave', onLeave)

    const draw = () => {
      const w = c.clientWidth
      const h = c.clientHeight
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim()
      ctx.clearRect(0, 0, w, h)
      const gap = 24
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = m.x - x
          const dy = m.y - y
          const d = Math.hypot(dx, dy)
          const f = Math.max(0, 1 - d / 140)
          const r = 1.1 + f * 3.4
          if (f > 0.05) {
            ctx.globalAlpha = 0.35 + 0.65 * f
            ctx.fillStyle = accent
          } else {
            ctx.globalAlpha = 1
            const g = Math.round(70 + 160 * f)
            ctx.fillStyle = `rgb(${g},${g},${g})`
          }
          ctx.beginPath()
          ctx.arc(x + dx * f * 0.35, y + dy * f * 0.35, r, 0, 7)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      c.removeEventListener('mousemove', pos)
      c.removeEventListener('touchmove', pos)
      c.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} />
}
