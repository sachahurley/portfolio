/**
 * PixelCastle
 *
 * Procedural pixel-art castle facade for StageHero's background: a coursed
 * stone wall with a round arched gate, a highlighted ring of voussoir stones,
 * and a keystone carved with a skull whose gem eyes pulse slowly. Same
 * technique as PixelStalactites/PixelFire (a PIXEL_SIZE canvas grid) so all
 * three read as one material/art style.
 *
 * The wall/arch/skull geometry is static per size, so it's baked once (on
 * mount and on resize) onto an offscreen canvas; the per-frame animation loop
 * only redraws the two gem cells, not the whole grid.
 */

import { useEffect, useRef } from 'react'

const PIXEL_SIZE = 4

// Warm stone family — tuned to sit alongside PixelStalactites' palette.
const PALETTE = [
  'transparent', // 0: gate opening — the scorpion's lane shows through
  '#241D16',     // 1: wall body (dark course)
  '#2E2519',     // 2: wall body (mid course)
  '#140F0A',     // 3: mortar joint / eye socket (darkest line)
  '#4A3C2A',     // 4: voussoir + keystone highlight stone
  '#0D0906',     // 5: foundation course
  '#C7B896',     // 6: bone (skull)
]

const FOUNDATION_ROWS = 2
const BRICK_W = 5 // grid cells per brick, running-bond masonry
const COURSE_H = 3 // grid rows per course

const GEM_BASE: [number, number, number] = [0x5c, 0x0a, 0x0a] // deep garnet
const GEM_GLOW: [number, number, number] = [0xe6, 0x33, 0x33] // bright pulse peak
const PULSE_HZ = 0.15 // slow — a full pulse roughly every ~6.5s

// Simplified skull, 9 cols x 7 rows: 4 = keystone stone, 6 = bone,
// 3 = socket shadow, 7 = gem (drawn separately so it can animate).
const SKULL = [
  [4, 4, 6, 6, 6, 6, 6, 4, 4],
  [4, 6, 6, 6, 6, 6, 6, 6, 4],
  [6, 6, 3, 3, 6, 3, 3, 6, 6],
  [6, 6, 7, 3, 6, 3, 7, 6, 6],
  [6, 6, 3, 3, 6, 3, 3, 6, 6],
  [4, 6, 6, 3, 3, 3, 6, 6, 4],
  [4, 4, 6, 6, 6, 6, 6, 4, 4],
]
const SKULL_SCALE = 2 // each skull cell draws as a SKULL_SCALE x SKULL_SCALE grid block

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function gemColor(t: number): string {
  const r = Math.round(lerp(GEM_BASE[0], GEM_GLOW[0], t))
  const g = Math.round(lerp(GEM_BASE[1], GEM_GLOW[1], t))
  const b = Math.round(lerp(GEM_BASE[2], GEM_GLOW[2], t))
  return `rgb(${r},${g},${b})`
}

// Running-bond coursed masonry: mortar lines at course/brick edges, a subtle
// two-tone checker between them so the wall reads as individual stones.
function wallTone(col: number, row: number): number {
  const courseIdx = Math.floor(row / COURSE_H)
  const rowInCourse = row % COURSE_H
  const offset = (courseIdx % 2) * Math.floor(BRICK_W / 2)
  const colInBrick = (col + offset) % BRICK_W
  if (rowInCourse === COURSE_H - 1 || colInBrick === 0) return 3
  const brickIdx = Math.floor((col + offset) / BRICK_W)
  return (courseIdx + brickIdx) % 2 === 0 ? 1 : 2
}

interface GemBlock {
  x: number
  y: number
  size: number
}

export default function PixelCastle() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number | null = null
    let disposed = false
    let onScreen = true
    let staticLayer: HTMLCanvasElement | null = null
    let gems: GemBlock[] = []
    let cols = 0
    let rows = 0

    function build() {
      const w = wrap!.clientWidth
      const h = wrap!.clientHeight
      cols = Math.max(1, Math.floor(w / PIXEL_SIZE))
      rows = Math.max(1, Math.floor(h / PIXEL_SIZE))
      canvas!.width = cols * PIXEL_SIZE
      canvas!.height = rows * PIXEL_SIZE

      const tone = new Uint8Array(cols * rows)
      const at = (c: number, r: number) => r * cols + c

      // Round arch: a rectangular jamb topped by a semicircle, centred in the
      // wall. archRadius/jambRows are sized off the available wall height so
      // the gate stays proportional whether the stage is 200px or 140px.
      const innerRows = Math.max(1, rows - FOUNDATION_ROWS)
      const archRadius = Math.max(4, Math.min(Math.round(innerRows * 0.32), Math.floor(cols / 3)))
      const jambRows = Math.round(innerRows * 0.42)
      const springRow = rows - FOUNDATION_ROWS - jambRows
      const gateBottomRow = rows - FOUNDATION_ROWS - 1
      const archCenterCol = Math.floor(cols / 2)

      // Base wall texture everywhere first.
      for (let r = 0; r < rows - FOUNDATION_ROWS; r++) {
        for (let c = 0; c < cols; c++) tone[at(c, r)] = wallTone(c, r)
      }

      // Cut the opening, ringed by a thin lip then a thick voussoir stone
      // band — substantial enough that the keystone above doesn't read as
      // top-heavy against a hairline arch edge.
      const RING_LIP = 1
      const RING_STONE = 3
      const R1 = archRadius // opening
      const R2 = archRadius + RING_LIP // + outline lip
      const R3 = archRadius + RING_LIP + RING_STONE // + voussoir stone band
      const halfAt = (r: number, R: number) => (r <= springRow ? Math.sqrt(Math.max(0, R * R - (springRow - r) ** 2)) : R)
      const ringTopRow = springRow - R3
      for (let r = Math.max(0, ringTopRow); r <= gateBottomRow; r++) {
        const hOpen = halfAt(r, R1)
        const hLip = halfAt(r, R2)
        const hStone = halfAt(r, R3)
        const lo = Math.max(0, Math.ceil(archCenterCol - hStone))
        const hi = Math.min(cols - 1, Math.floor(archCenterCol + hStone))
        for (let c = lo; c <= hi; c++) {
          const d = Math.abs(c - archCenterCol)
          if (d <= hOpen) tone[at(c, r)] = 0
          else if (d <= hLip) tone[at(c, r)] = 3
          else if (d <= hStone) tone[at(c, r)] = 4
        }
      }
      // Foundation course along the base, full width.
      for (let r = rows - FOUNDATION_ROWS; r < rows; r++) {
        for (let c = 0; c < cols; c++) tone[at(c, r)] = 5
      }

      // Stamp the keystone/skull, overlapping the ring's apex like a real
      // protruding keystone. Skipped if the box is too short to fit it.
      gems = []
      const skullW = SKULL[0].length * SKULL_SCALE
      const skullH = SKULL.length * SKULL_SCALE
      const left = archCenterCol - Math.floor(skullW / 2)
      const top = Math.round(ringTopRow - skullH * 0.6)
      if (top >= 0 && left >= 0 && left + skullW <= cols) {
        for (let sr = 0; sr < SKULL.length; sr++) {
          for (let sc = 0; sc < SKULL[0].length; sc++) {
            const v = SKULL[sr][sc]
            for (let dy = 0; dy < SKULL_SCALE; dy++) {
              for (let dx = 0; dx < SKULL_SCALE; dx++) {
                const c = left + sc * SKULL_SCALE + dx
                const r = top + sr * SKULL_SCALE + dy
                if (c < 0 || c >= cols || r < 0 || r >= rows) continue
                if (v === 7) continue // gem — drawn/animated separately below
                tone[at(c, r)] = v
              }
            }
            if (v === 7) {
              gems.push({
                x: (left + sc * SKULL_SCALE) * PIXEL_SIZE,
                y: (top + sr * SKULL_SCALE) * PIXEL_SIZE,
                size: SKULL_SCALE * PIXEL_SIZE,
              })
            }
          }
        }
      }

      // Bake the static scene once; the animation loop only redraws the gems.
      const layer = document.createElement('canvas')
      layer.width = canvas!.width
      layer.height = canvas!.height
      const lctx = layer.getContext('2d')!
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = tone[at(c, r)]
          if (v === 0) continue
          lctx.fillStyle = PALETTE[v]
          lctx.fillRect(c * PIXEL_SIZE, r * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
        }
      }
      for (const g of gems) {
        lctx.fillStyle = gemColor(0)
        lctx.fillRect(g.x, g.y, g.size, g.size)
      }
      staticLayer = layer
    }

    function frame(now: number) {
      if (disposed || !staticLayer) return
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(staticLayer, 0, 0)
      const t = Math.sin(now * 0.001 * PULSE_HZ * 2 * Math.PI) * 0.5 + 0.5
      for (const g of gems) {
        ctx!.fillStyle = `rgba(230,51,51,${0.12 + 0.22 * t})`
        ctx!.fillRect(g.x - PIXEL_SIZE, g.y - PIXEL_SIZE, g.size + PIXEL_SIZE * 2, g.size + PIXEL_SIZE * 2)
        ctx!.fillStyle = gemColor(t)
        ctx!.fillRect(g.x, g.y, g.size, g.size)
      }
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (raf != null || disposed) return
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      if (raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    build()
    start()

    const ro = new ResizeObserver(() => {
      build()
    })
    ro.observe(wrap)

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (onScreen) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      disposed = true
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div ref={wrapRef} className="pixel-castle" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'pixelated' }}
      />
    </div>
  )
}
