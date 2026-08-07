/**
 * DitherToy — a pocket dither studio for the lab.
 *
 * Drop (or pick) any image and it collapses to the site's 1-bit look
 * live: luma sampled on a coarse art grid, thresholded against the same
 * 4x4 Bayer matrix the rest of the site uses, single sepia ink on the
 * page ground, with the welcome title's slow boil jittering the mid
 * tones. An ink slider biases the threshold darker or lighter. Defaults
 * to the dungeon-gate hero so there is something to chew on before any
 * image is dropped. Reduced motion renders a still (no boil).
 */

import { useEffect, useRef, useState } from 'react'
import { bayerThreshold, ONE_BIT_INK } from '../lib/dither/oneBit'
import { hashNoise } from '../lib/dither/render'

const CELL = 4 // art cell in CSS px, the site's standard scale
const FPS = 7 // the welcome title's boil beat
const FRAMES = 8
const BOIL = 0.12
const MAX_ROWS = 110

export default function DitherToy() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [src, setSrc] = useState('/dither/sacha-hurley-wild-loop.gif')
  const [bias, setBias] = useState(0)
  const biasRef = useRef(0)
  const drawRef = useRef<(() => void) | null>(null)
  const objUrlRef = useRef<string | null>(null)

  // Slider changes redraw immediately without rebuilding the luma field.
  useEffect(() => {
    biasRef.current = bias
    drawRef.current?.()
  }, [bias])

  // Revoke any picked-file object URL on unmount.
  useEffect(
    () => () => {
      if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current)
    },
    []
  )

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let raf: number | null = null
    let field: Float32Array | null = null
    let cols = 0
    let rows = 0
    let frame = 0
    let prev = 0
    let acc = 0

    const img = new Image()
    img.src = src

    function draw() {
      if (!field || !ctx) return
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx.fillStyle = ONE_BIT_INK
      const b = biasRef.current
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let v = field[r * cols + c] + b
          if (animate && v > 0.03 && v < 0.97) {
            v += (hashNoise(c, r, frame + 1) - 0.5) * BOIL
          }
          if (v > bayerThreshold(c, r)) {
            ctx.fillRect(c * CELL, r * CELL, CELL, CELL)
          }
        }
      }
    }
    drawRef.current = draw

    function build() {
      if (!img.naturalWidth) return
      const w = wrap!.clientWidth
      if (w === 0) return
      cols = Math.max(16, Math.floor(w / CELL))
      rows = Math.min(
        MAX_ROWS,
        Math.max(9, Math.round(cols * (img.naturalHeight / img.naturalWidth)))
      )
      // Sample luma on the art grid via a tiny offscreen draw.
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d')!
      octx.drawImage(img, 0, 0, cols, rows)
      const d = octx.getImageData(0, 0, cols, rows).data
      field = new Float32Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) {
        field[i] =
          d[i * 4 + 3] < 128
            ? 0
            : (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255
      }
      canvas!.width = cols * CELL
      canvas!.height = rows * CELL
      canvas!.style.height = `${rows * CELL}px`
      draw()
    }

    // The boil beat: same even-accumulator discipline as the welcome title.
    function step(ts: number) {
      raf = requestAnimationFrame(step)
      if (!prev) prev = ts
      acc += ts - prev
      prev = ts
      const interval = 1000 / FPS
      if (acc >= interval) {
        acc %= interval
        frame = (frame + 1) % FRAMES
        draw()
      }
    }

    img
      .decode()
      .then(() => {
        if (disposed) return
        build()
        if (animate) raf = requestAnimationFrame(step)
      })
      .catch(() => {})

    const ro = new ResizeObserver(() => build())
    ro.observe(wrap)
    return () => {
      disposed = true
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      drawRef.current = null
    }
  }, [src])

  const pickFile = (file: File | undefined | null) => {
    if (!file || !file.type.startsWith('image/')) return
    if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current)
    objUrlRef.current = URL.createObjectURL(file)
    setSrc(objUrlRef.current)
  }

  return (
    <div
      ref={wrapRef}
      className="dtoy"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        pickFile(e.dataTransfer.files?.[0])
      }}
    >
      <canvas ref={canvasRef} className="dtoy-canvas" aria-label="Dithered preview" />
      <div className="dtoy-controls">
        <label className="btn outline dtoy-file">
          choose an image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => pickFile(e.target.files?.[0])}
            style={{ display: 'none' }}
          />
        </label>
        <label className="dtoy-slider">
          ink
          <input
            type="range"
            min={-0.35}
            max={0.35}
            step={0.01}
            value={bias}
            onChange={(e) => setBias(Number(e.target.value))}
            aria-label="Ink density"
          />
        </label>
        <span className="gf-dim">or drop an image onto the canvas</span>
      </div>
    </div>
  )
}
