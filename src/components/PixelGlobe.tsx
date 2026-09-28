/**
 * PixelGlobe — a 1-bit Earth that turns, for the world stats dialog.
 *
 * The frames come from lib/globe.ts (ray-cast against a real sphere, so the
 * land slides round rather than looping), the same art the home grid's
 * World app draws.
 *
 * Inked through the active gem like the village is, in the theme's text
 * colour alone: land solid, ocean a half-density weave, paper transparent
 * so the page shows through and re-theming stays free.
 *
 * Reduced motion gets one still frame rather than a slower spin: the point
 * of the thing is the rotation, and a crawling globe is worse than a fixed
 * one.
 */

import { useEffect, useRef } from 'react'
import { useXp } from '../context/XpProvider'
import { GLOBE_PERIOD_MS, globeMask } from '../lib/globe'
import { THEMES } from '../lib/themes'

/** Logical pixels across the disc, before the integer upscale. */
const SIZE = 24
/** Integer upscale. Anything non-integer would blur the pixel grid. */
const SCALE = 2
/**
 * Redraw beat. Pixel art has nothing to gain from 60fps: at this diameter
 * a frame moves the land by well under a pixel, so ten a second is already
 * finer than the grid can show.
 */
const BEAT_MS = 100

const hexRgb = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]

export default function PixelGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeGem } = useXp()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ink = hexRgb(THEMES[activeGem].text)

    const off = document.createElement('canvas')
    off.width = SIZE
    off.height = SIZE
    const octx = off.getContext('2d')
    if (!octx) return

    canvas.width = SIZE * SCALE
    canvas.height = SIZE * SCALE

    function paint(rotation: number) {
      const mask = globeMask(rotation, SIZE)
      const img = octx!.createImageData(SIZE, SIZE)
      for (let i = 0; i < mask.length; i++) {
        if (!mask[i]) continue
        const k = i * 4
        img.data[k] = ink[0]
        img.data[k + 1] = ink[1]
        img.data[k + 2] = ink[2]
        img.data[k + 3] = 255
      }
      octx!.putImageData(img, 0, 0)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.imageSmoothingEnabled = false
      ctx!.drawImage(off, 0, 0, canvas!.width, canvas!.height)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(0)
      return
    }

    const start = performance.now()
    paint(0)
    const timer = window.setInterval(() => {
      if (document.hidden) return
      const turns = ((performance.now() - start) % GLOBE_PERIOD_MS) / GLOBE_PERIOD_MS
      paint(turns * 2 * Math.PI)
    }, BEAT_MS)

    return () => clearInterval(timer)
  }, [activeGem])

  return (
    <canvas
      ref={canvasRef}
      className="hs-globe"
      aria-hidden="true"
      style={{ width: SIZE * SCALE, height: SIZE * SCALE }}
    />
  )
}
