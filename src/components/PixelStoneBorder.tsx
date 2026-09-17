/**
 * PixelStoneBorder
 *
 * A static pixel-art carved-stone band: a single row of irregular, bevelled
 * castle blocks in the site's warm sepia palette, with dark mortar gaps, a thin
 * lit top edge, and the occasional jagged crack. Sits as a baseboard along the
 * bottom of the menu sheet. The last block is extended so the run ends on a
 * proper right bevel rather than being sliced by the sheet edge.
 *
 * Companion to PixelStalactites / PixelFire (same canvas + pixelated approach),
 * but static — it draws once per width rather than running a rAF loop. The art
 * itself is lib/stoneBand's cell grid, shared with the tile baker so the atlas
 * lists the same stonework the site draws.
 */

import { useEffect, useRef } from 'react'
import { oneBitCanvas } from '../lib/dither/oneBit'
import { BAND_ROWS, stoneBandCells } from '../lib/stoneBand'

const PIXEL_SIZE = 4

export default function PixelStoneBorder() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function draw() {
      const w = wrap!.clientWidth
      if (w === 0) return
      const cols = Math.ceil(w / PIXEL_SIZE)
      canvas!.width = cols * PIXEL_SIZE
      canvas!.height = BAND_ROWS * PIXEL_SIZE

      const grid = stoneBandCells(cols)
      for (let cy = 0; cy < BAND_ROWS; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          ctx!.fillStyle = grid[cy][cx]
          ctx!.fillRect(cx * PIXEL_SIZE, cy * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
        }
      }

      // Strict 1-bit: collapse the stone tones to ink-density dither.
      oneBitCanvas(ctx!, canvas!.width, canvas!.height, PIXEL_SIZE)
    }

    draw()
    const ro = new ResizeObserver(() => draw())
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="stoneborder" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: BAND_ROWS * PIXEL_SIZE, imageRendering: 'pixelated' }}
      />
    </div>
  )
}
