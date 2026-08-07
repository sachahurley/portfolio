/**
 * JeweledFrame — the jeweled stone border around the welcome screen's
 * viewport. A nine-slice whose 48x48 source is generated at runtime by
 * lib/jeweledFrame.ts: 16x16 garnet-jewel corner bosses stay fixed while
 * the 8x8 stone tiles repeat along the edges.
 *
 * Drawn onto a canvas (same approach as PixelStoneBorder) rather than a
 * border-image data URL: some embedded webviews refuse data: image URLs
 * in CSS, and a live canvas renders everywhere.
 *
 * `site` pins the same frame around the browser viewport on every page
 * (mounted once in Layout). The dither ink is transparent between dots,
 * so the site variant lays a bg-colored backing ring underneath to hide
 * content scrolling beneath the stonework.
 */

import { useEffect, useRef } from 'react'
import {
  buildFrameSourceCanvas,
  FRAME_SRC,
  FRAME_TILE,
  FRAME_CORNER,
} from '../lib/jeweledFrame'

export default function JeweledFrame({ site = false }: { site?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // Frame ink: the warm accent sepia (sepia-500), resolved from the token
    // so the hex stays in scorp-ds. Base tokens are static, so once is enough.
    const ink =
      getComputedStyle(document.documentElement).getPropertyValue('--color-sepia-500').trim() ||
      '#bfb4a3'
    const src = buildFrameSourceCanvas(ink)
    // Thinner frame on small screens: the loader keeps its 600px breakpoint;
    // the site variant thins below 960px (the handheld port), where the
    // content column's 24px side padding must still clear it.
    const mq = window.matchMedia(site ? '(max-width: 959px)' : '(max-width: 600px)')

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      const s = mq.matches ? 1 : 2 // art scale: 16px band / 32px corners at 2x
      canvas.width = w
      canvas.height = h
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, w, h)
      const T = FRAME_TILE * s
      const C = FRAME_CORNER * s
      // Edge runs first; the corners paint over them, so a last tile clipped
      // by the viewport edge hides under the corner boss.
      for (let x = C; x < w - C; x += T) {
        ctx.drawImage(src, FRAME_CORNER, 0, FRAME_TILE, FRAME_TILE, x, 0, T, T)
        ctx.drawImage(src, FRAME_CORNER, FRAME_SRC - FRAME_TILE, FRAME_TILE, FRAME_TILE, x, h - T, T, T)
      }
      for (let y = C; y < h - C; y += T) {
        ctx.drawImage(src, 0, FRAME_CORNER, FRAME_TILE, FRAME_TILE, 0, y, T, T)
        ctx.drawImage(src, FRAME_SRC - FRAME_TILE, FRAME_CORNER, FRAME_TILE, FRAME_TILE, w - T, y, T, T)
      }
      ctx.drawImage(src, 0, 0, FRAME_CORNER, FRAME_CORNER, 0, 0, C, C)
      ctx.drawImage(src, FRAME_SRC - FRAME_CORNER, 0, FRAME_CORNER, FRAME_CORNER, w - C, 0, C, C)
      ctx.drawImage(src, 0, FRAME_SRC - FRAME_CORNER, FRAME_CORNER, FRAME_CORNER, 0, h - C, C, C)
      ctx.drawImage(src, FRAME_SRC - FRAME_CORNER, FRAME_SRC - FRAME_CORNER, FRAME_CORNER, FRAME_CORNER, w - C, h - C, C, C)
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    mq.addEventListener('change', draw)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', draw)
    }
  }, [site])

  const frame = (
    <canvas
      ref={canvasRef}
      className={site ? 'jewel-frame jewel-frame--site' : 'jewel-frame'}
      aria-hidden="true"
    />
  )
  if (!site) return frame
  return (
    <>
      <div className="jewel-frame-bg" aria-hidden="true" />
      {frame}
    </>
  )
}
