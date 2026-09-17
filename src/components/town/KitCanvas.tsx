/**
 * KitCanvas — renders a kit scene (one plate + placed items) auto-fitted
 * and centered at an integer zoom.
 *
 * Two colour modes, both themed through the active ink:
 * - 2 colours: A = ink, B = a dim mix of ink toward the dark ground.
 * - 1 colour: A = ink, B = a 50% Bayer checker of ink (the classic 1-bit
 *   way to fake a second tone).
 * Scene changes re-bake; colour/ink changes only repaint.
 *
 * With `onTile`, clicks report the tile under the pointer and which item
 * painted that cell (from the bake's ids buffer), which is all a scene
 * editor needs for place/remove.
 */

import { useEffect, useMemo, useRef } from 'react'
import { mix } from '../../lib/themes'
import { bayerThreshold } from '../../lib/dither/oneBit'
import { cellToIso } from '../../lib/iso'
import { bakeKitScene, KT, type KitBaked, type KitScene } from './kit'
import { TOWN_DARK } from './styles'

interface KitCanvasProps {
  scene: KitScene
  colours: 1 | 2
  ink: string
  /** Click report: plate tile + item index (-1 = ground) under the pointer. */
  onTile?: (info: { ix: number; iy: number; item: number }) => void
  /** Item index to highlight with a selection glow. */
  selected?: number | null
  ariaLabel: string
}

export default function KitCanvas({ scene, colours, ink, onTile, selected, ariaLabel }: KitCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bakedRef = useRef<KitBaked | null>(null)
  const coloursRef = useRef<1 | 2>(colours)
  const inkRef = useRef(ink)
  const selectedRef = useRef<number | null>(selected ?? null)
  const zoomRef = useRef(2)

  const paint = () => {
    const st = bakedRef.current
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!st || !wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { grid, bounds } = st
    const contentW = bounds.maxC - bounds.minC + 1
    const contentH = bounds.maxR - bounds.minR + 1
    const zoom = Math.max(
      2,
      Math.min(8, Math.floor(Math.min(wrap.clientWidth / contentW, wrap.clientHeight / contentH))),
    )
    zoomRef.current = zoom
    const cw = contentW * zoom
    const ch = contentH * zoom
    canvas.width = cw
    canvas.height = ch
    canvas.style.width = `${cw}px`
    canvas.style.height = `${ch}px`
    canvas.style.left = `${Math.floor((wrap.clientWidth - cw) / 2)}px`
    canvas.style.top = `${Math.floor((wrap.clientHeight - ch) / 2)}px`
    // Expose the mapping for tooling/tests: tile (ix, iy) centers at
    // ((cx + (ix-iy)*8) * zoom, (cy + (ix+iy)*4) * zoom) in canvas px.
    canvas.dataset.zoom = String(zoom)
    canvas.dataset.cx = String(st.origin.cx - bounds.minC)
    canvas.dataset.cy = String(st.origin.cy - bounds.minR)

    const inkColor = inkRef.current
    const two = coloursRef.current === 2
    const bColor = mix(TOWN_DARK, inkColor, 0.5)
    ctx.clearRect(0, 0, cw, ch)
    for (let r = bounds.minR; r <= bounds.maxR; r++) {
      for (let c = bounds.minC; c <= bounds.maxC; c++) {
        const v = grid.tone[r * grid.cols + c]
        if (v === KT.A) ctx.fillStyle = inkColor
        else if (v === KT.B) {
          if (two) ctx.fillStyle = bColor
          else if (bayerThreshold(c, r) < 0.5) ctx.fillStyle = inkColor
          else continue
        } else continue
        ctx.fillRect((c - bounds.minC) * zoom, (r - bounds.minR) * zoom, zoom, zoom)
      }
    }

    // Selection glow: sparkle-fill the selected item's cells (the town's
    // hover recipe). Best seen in 2-colour mode; in 1-colour it reads as
    // a solidified checker.
    const sel = selectedRef.current
    if (sel != null && sel >= 0) {
      ctx.fillStyle = inkColor
      const id = sel + 1
      for (let r = bounds.minR; r <= bounds.maxR; r++) {
        for (let c = bounds.minC; c <= bounds.maxC; c++) {
          if (grid.ids[r * grid.cols + c] === id && bayerThreshold(c, r) < 0.25) {
            ctx.fillRect((c - bounds.minC) * zoom, (r - bounds.minR) * zoom, zoom, zoom)
          }
        }
      }
    }
  }
  const paintRef = useRef(paint)
  paintRef.current = paint

  // Scene changes re-bake (colours/ink deliberately excluded).
  const sceneKey = useMemo(() => JSON.stringify(scene), [scene])
  useEffect(() => {
    bakedRef.current = bakeKitScene(scene)
    paintRef.current()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey])

  // Colour-mode / ink / selection changes only repaint.
  useEffect(() => {
    coloursRef.current = colours
    inkRef.current = ink
    selectedRef.current = selected ?? null
    paintRef.current()
  }, [colours, ink, selected])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => paintRef.current())
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="bld-frame">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', imageRendering: 'pixelated', cursor: onTile ? 'crosshair' : undefined }}
        aria-label={ariaLabel}
        role="img"
        onClick={(e) => {
          if (!onTile) return
          const st = bakedRef.current
          if (!st) return
          const zoom = zoomRef.current
          const c = st.bounds.minC + Math.floor(e.nativeEvent.offsetX / zoom)
          const r = st.bounds.minR + Math.floor(e.nativeEvent.offsetY / zoom)
          if (c < 0 || c >= st.grid.cols || r < 0 || r >= st.grid.rows) return
          const t = cellToIso(c + 0.5, r + 0.5, st.origin)
          onTile({
            ix: Math.floor(t.ix),
            iy: Math.floor(t.iy),
            item: st.grid.ids[r * st.grid.cols + c] - 1,
          })
        }}
      />
    </div>
  )
}
