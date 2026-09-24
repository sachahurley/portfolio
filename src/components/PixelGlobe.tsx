/**
 * PixelGlobe — a 1-bit Earth that turns, for the home page's stat card.
 *
 * Not a sprite loop: every frame is ray-cast against an actual sphere, so
 * the land compresses towards the limb and slides across the face the way a
 * globe really does. Screen pixel -> unit sphere -> latitude/longitude ->
 * a sample of the equirectangular mask below. At this size that costs a few
 * hundred lookups a frame, which is cheaper than shipping frames of art and
 * means the turn has no seam to hide.
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
import { THEMES } from '../lib/themes'

/**
 * Equirectangular land mask: 36 columns of 10 degrees of longitude (column
 * 0 starts at 180W) by 18 rows of 10 degrees of latitude (row 0 is the
 * north pole).
 *
 * Deliberately coarse, and deliberately more ocean than the real Earth has
 * at these latitudes. What makes a turning globe legible at this size is
 * the GAPS: continents have to separate and rejoin as they come round. A
 * geographically faithful northern hemisphere is close to unbroken land
 * from Alaska to Kamchatka, which at 24 pixels is one blob that never
 * appears to move.
 */
const LAND = [
  '....................................',
  '..............##...........#####....',
  '....######....##.......########.....',
  '.....#####.........###...#######....',
  '......####.........##.....######....',
  '.......###........####....#####.....',
  '........#........#####.....##.#.....',
  '.........#.......####.....##..#.....',
  '...........###....####........##....',
  '...........###....###..........##...',
  '...........###....###.........###...',
  '...........##.....##..........####..',
  '...........##......#..........###...',
  '...........#........................',
  '...........#........................',
  '....................................',
  '####################################',
  '####################################',
]
const MAP_W = LAND[0].length
const MAP_H = LAND.length

/** Logical pixels across the disc, before the integer upscale. */
const SIZE = 24
/** Integer upscale. Anything non-integer would blur the pixel grid. */
const SCALE = 2
/** One full turn. Slow enough to be ambient, quick enough to be noticed. */
const PERIOD_MS = 18_000
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

    const theme = THEMES[activeGem]
    const ink = hexRgb(theme.text)

    const r = SIZE / 2
    // The limb: everything outside this radius (squared, to keep the inner
    // loop free of square roots) is drawn solid, giving a one-pixel rim.
    const limb2 = ((r - 1) / r) ** 2

    const off = document.createElement('canvas')
    off.width = SIZE
    off.height = SIZE
    const octx = off.getContext('2d')
    if (!octx) return

    canvas.width = SIZE * SCALE
    canvas.height = SIZE * SCALE

    function paint(rotation: number) {
      const img = octx!.createImageData(SIZE, SIZE)
      for (let py = 0; py < SIZE; py++) {
        for (let px = 0; px < SIZE; px++) {
          const nx = (px + 0.5) / r - 1
          const ny = (py + 0.5) / r - 1
          const d2 = nx * nx + ny * ny
          if (d2 > 1) continue // off the disc: paper

          let colour: [number, number, number] | null
          if (d2 > limb2) {
            colour = ink
          } else {
            const nz = Math.sqrt(1 - d2)
            // Screen y grows downward, so north is -ny.
            const lat = Math.asin(-ny)
            const lon = Math.atan2(nx, nz) + rotation
            let u = (lon + Math.PI) / (2 * Math.PI)
            u -= Math.floor(u) // wrap into [0, 1) whatever the rotation is
            const col = Math.min(MAP_W - 1, (u * MAP_W) | 0)
            const row = Math.min(MAP_H - 1, ((0.5 - lat / Math.PI) * MAP_H) | 0)
            // One ink, two densities: land solid, ocean a half-density
            // weave. That IS the 1-bit trick, and it beats colouring the
            // continents, which at this diameter just produced a bright
            // blob competing with the figures below. The accent stays
            // where it belongs, on the numbers.
            colour =
              LAND[row][col] === '#' ? ink : (px + py) % 2 === 0 ? ink : null
          }
          if (!colour) continue
          const k = (py * SIZE + px) * 4
          img.data[k] = colour[0]
          img.data[k + 1] = colour[1]
          img.data[k + 2] = colour[2]
          img.data[k + 3] = 255
        }
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
      const turns = ((performance.now() - start) % PERIOD_MS) / PERIOD_MS
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
