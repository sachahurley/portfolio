/**
 * The Reader's parlor: a canvas banner behind the table. A hooded mystic
 * (a witch tile from the sheet, blown up to chunky pixels), a table edge,
 * her crystal orb, and two candles whose flames flicker on the site's
 * 300ms beat. Theme-inked by reading the CSS custom properties each beat,
 * so gem swaps re-ink the parlor like every other canvas.
 *
 * House canvas rules: aria-hidden art, integer zoom, prefers-reduced-motion
 * gets the still frame (frame 0, no interval).
 */

import { useEffect, useRef } from 'react'
import { useXp } from '../../context/XpProvider'

// Art grid (1 art px = `zoom` screen px)
const ART_W = 72
const ART_H = 36

// Urizen cells (col, row): the reader and her orb
const READER_CELL: readonly [number, number] = [108, 28] // characters/witch class
const ORB_CELL: readonly [number, number] = [3, 22] // items/gem/orb
const TILE = 12
const PITCH = 13

type Rgba = [number, number, number]

function cssColor(name: string, fallback: Rgba): Rgba {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const m = /^#([0-9a-f]{6})$/i.exec(v)
  if (!m) return fallback
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export default function TarotScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeGem } = useXp()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let disposed = false
    let timer = 0

    const sheet = new Image()
    sheet.src = '/tiles/urizen.png'

    const start = () => {
      if (disposed) return
      // Sample the two sprites once (alpha mask only; ink comes from theme)
      const scratch = document.createElement('canvas')
      scratch.width = TILE
      scratch.height = TILE
      const sctx = scratch.getContext('2d')
      if (!sctx) return
      const mask = (cell: readonly [number, number]) => {
        sctx.clearRect(0, 0, TILE, TILE)
        sctx.drawImage(sheet, 1 + cell[0] * PITCH, 1 + cell[1] * PITCH, TILE, TILE, 0, 0, TILE, TILE)
        return sctx.getImageData(0, 0, TILE, TILE)
      }
      const reader = mask(READER_CELL)
      const orb = mask(ORB_CELL)
      // Lowest inked row of a tile, so sprites can rest ON surfaces instead
      // of overlapping them (tiles carry transparent margins that vary).
      const inkBottom = (m: ImageData) => {
        let b = 0
        for (let j = 0; j < TILE; j++)
          for (let i = 0; i < TILE; i++) if (m.data[(j * TILE + i) * 4 + 3] > 0) b = j
        return b
      }
      // Table top edge is art row 19; the orb's last ink row lands on 18,
      // resting just above the table like the candles do.
      const orbOy = 18 - inkBottom(orb)

      const buf = document.createElement('canvas')
      buf.width = ART_W
      buf.height = ART_H
      const bctx = buf.getContext('2d')
      if (!bctx) return
      const img = bctx.createImageData(ART_W, ART_H)

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let frame = 0

      const put = (x: number, y: number, [r, g, b]: Rgba) => {
        if (x < 0 || y < 0 || x >= ART_W || y >= ART_H) return
        const p = (y * ART_W + x) * 4
        img.data[p] = r
        img.data[p + 1] = g
        img.data[p + 2] = b
        img.data[p + 3] = 255
      }
      const blit = (m: ImageData, ox: number, oy: number, color: Rgba) => {
        for (let j = 0; j < TILE; j++)
          for (let i = 0; i < TILE; i++)
            if (m.data[(j * TILE + i) * 4 + 3] > 0) put(ox + i, oy + j, color)
      }

      const draw = () => {
        if (disposed) return
        const fg = cssColor('--fg', [247, 245, 242])
        const body = cssColor('--body', [191, 180, 163])
        const accent = cssColor('--accent', [224, 162, 106])
        img.data.fill(0)

        // the reader, seated behind the table
        blit(reader, Math.floor(ART_W / 2) - 6, 6, fg)
        // table edge (two-tone stone line)
        for (let x = 8; x < ART_W - 8; x++) {
          put(x, 19, body)
          put(x, 20, body)
        }
        for (let x = 10; x < ART_W - 10; x += 3) put(x, 21, body)
        // the orb, resting on the table to her side
        blit(orb, Math.floor(ART_W / 2) + 9, orbOy, accent)
        // orb glint breathes on the beat (2 rows below the orb's top ink)
        if (frame % 2 === 0) put(Math.floor(ART_W / 2) + 13, orbOy + 2, fg)

        // candles at the table's ends
        for (const cx of [10, ART_W - 13]) {
          for (let y = 14; y < 19; y++) {
            put(cx, y, body)
            put(cx + 1, y, body)
            put(cx + 2, y, body)
          }
          // flame: two-frame flicker, opposite phases per candle
          const lit = reduced || (frame + (cx === 10 ? 0 : 1)) % 2 === 0
          put(cx + 1, 12, accent)
          if (lit) {
            put(cx + 1, 11, accent)
            put(cx + (cx === 10 ? 0 : 2), 12, accent)
          }
        }

        bctx.putImageData(img, 0, 0)
        const w = canvas.clientWidth
        const zoom = Math.max(2, Math.min(6, Math.floor(w / ART_W)))
        canvas.width = ART_W * zoom
        canvas.height = ART_H * zoom
        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(buf, 0, 0, canvas.width, canvas.height)
      }

      draw()
      if (!reduced) {
        timer = window.setInterval(() => {
          frame++
          draw()
        }, 300)
      }
    }

    if (sheet.complete) start()
    else sheet.onload = start

    return () => {
      disposed = true
      window.clearInterval(timer)
    }
  }, [activeGem])

  return <canvas ref={canvasRef} className="tarot-scene" aria-hidden="true" />
}
