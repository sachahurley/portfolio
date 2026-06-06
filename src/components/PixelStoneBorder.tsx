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
 * but static — it draws once per width rather than running a rAF loop.
 */

import { useEffect, useRef } from 'react'

const PIXEL_SIZE = 4
const ROWS = 5 // band height in cells (20px) — one short course of blocks
const BLOCK_W_MIN = 5 // cells — narrow stones
const BLOCK_W_MAX = 15 // cells — smaller spread = more individual blocks

// Warm sepia stone palette, matching the site (stalactites / scorpion tones).
const MORTAR = '#15110c' // gaps between blocks
const SHADOW = '#281f16' // bottom/right bevel + outline
const HI = '#4f4331' // left bevel (subtle lit edge), kept dim
const TOP = '#564a37' // thin warm lit top edge (1px), kept dim
const CRACK = '#1c160f' // dark fissure
// Two body tone-sets so blocks read lighter/darker, like weathered castle stone.
const BODY_LIGHT = ['#3e3426', '#483d2d', '#4f4330']
const BODY_DARK = ['#332a1e', '#3c3326', '#453a2b']

// Deterministic pseudo-random so the wall doesn't reshuffle on every redraw.
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

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
      canvas!.height = ROWS * PIXEL_SIZE

      const paint = (cx: number, cy: number, color: string) => {
        if (cx < 0 || cx >= cols) return
        ctx!.fillStyle = color
        ctx!.fillRect(cx * PIXEL_SIZE, cy * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
      }

      // Mortar fills the gaps the blocks leave behind.
      ctx!.fillStyle = MORTAR
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      // Continuous (dim) lit top edge across the whole band.
      for (let cx = 0; cx < cols; cx++) paint(cx, 0, TOP)

      const top = 1
      const bot = ROWS - 1
      let bx = 0
      let i = 5
      while (bx < cols) {
        // Wide, uneven width spread for a natural castle-stone run.
        const bw = BLOCK_W_MIN + Math.floor(rand(i * 1.7) * (BLOCK_W_MAX - BLOCK_W_MIN + 1))
        // The last block extends to the edge so it ends on a right bevel.
        const isLast = bx + bw + 1 >= cols
        const right = isLast ? cols - 1 : bx + bw - 1
        const blockW = right - bx + 1
        const set = rand(i * 3.1) < 0.4 ? BODY_DARK : BODY_LIGHT

        // Block body + bevel (lit left, shaded bottom/right).
        for (let cy = top; cy <= bot; cy++) {
          for (let cx = bx; cx <= right; cx++) {
            if (cx < 0 || cx >= cols) continue
            const isLeft = cx === bx
            const isRight = cx === right
            const isBot = cy === bot
            let tone: string
            if (isLeft) tone = HI
            else if (isBot || isRight) tone = SHADOW
            else {
              const n = rand(cx * 1.3 + cy * 2.7 + i * 0.5) // subtle granular surface
              tone = n > 0.86 ? set[2] : n < 0.22 ? set[0] : set[1]
            }
            paint(cx, cy, tone)
          }
        }

        // ~40% of blocks get a single jagged, asymmetric crack: diagonal drift,
        // jitter, and occasional breaks so it reads as a fissure, not a line.
        if (blockW >= 6 && rand(i * 5.3) < 0.4) {
          const driftDir = rand(i * 6.1) < 0.5 ? -1 : 1
          let ccx = bx + 2 + Math.floor(rand(i * 9.1) * Math.max(1, blockW - 4))
          for (let cy = top + 1; cy <= bot - 1; cy++) {
            if (ccx > bx && ccx < right && rand(ccx * 2.3 + cy * 3.7) > 0.16) {
              paint(ccx, cy, CRACK)
            }
            let step = rand(ccx * 1.9 + cy * 2.1) < 0.6 ? driftDir : 0
            if (rand(cy * 4.4 + i) < 0.28) step += rand(cy * 5.5) < 0.5 ? -1 : 1
            ccx = Math.min(Math.max(ccx + step, bx + 1), right - 1)
          }
        }

        if (isLast) break
        bx += bw + 1 // 1-cell mortar gap between blocks
        i++
      }
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
        style={{ display: 'block', width: '100%', height: ROWS * PIXEL_SIZE, imageRendering: 'pixelated' }}
      />
    </div>
  )
}
