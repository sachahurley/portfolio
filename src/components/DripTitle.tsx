/**
 * DripTitle — the welcome screen title: "SACHA HURLEY" in an italic 5x7
 * pixel font with a molten drip animation. Port of a verified reference
 * (the build_italic variant: no frame, letters only) whose grammar is the
 * M&M kit: Genesis palette levels, top-left light, embossed letters. Drips
 * are deterministic looping state machines per column:
 * grow -> pinch -> detach -> falling droplet -> retract; seamless 36-frame
 * loop at 90ms/frame.
 *
 * Colours map to the site's theme tokens instead of the reference's gold:
 * the molten ramp is built from --fire1/2/3 (so egg themes re-colour it),
 * quantized to the Genesis levels. Background is transparent (the loader's
 * --bg shows through) rather than the reference's opaque black.
 *
 * All 36 frames are baked once at native resolution (216x132) on mount;
 * the animation loop just blits the current frame, scaled to an integer
 * device-pixel multiple, nearest-neighbour.
 */

import { useEffect, useRef } from 'react'

// 5x7 font, only the glyphs the name needs.
const FONT: Record<string, string[]> = {
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  C: ['.####', '#....', '#....', '#....', '#....', '#....', '.####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
}

const SC = 3 // each font pixel -> 3x3
const LW = 5 * SC
const LH = 7 * SC
const GAP = 3
const T = 36 // loop length in frames
const FRAME_MS = 90
const SHEAR = 0.6
const W = 216
const H = 132
const WORDS: Array<[string, number]> = [
  ['SACHA', 16],
  ['HURLEY', 74],
]

type RGB = readonly [number, number, number]

// Genesis palette quantization, per channel.
const GEN = [0x00, 0x24, 0x49, 0x6d, 0x92, 0xb6, 0xdb, 0xff]
const q = (c: RGB): RGB =>
  c.map((v) => GEN.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a))) as unknown as RGB

function parseHex(s: string, fallback: RGB): RGB {
  const m = s.trim().match(/^#([0-9a-f]{6})$/i)
  if (!m) return fallback
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
}

const HILITE: RGB = [255, 255, 219] // hot lip on letter tops (hx 'ffffdb')

/** Molten ramp from the theme's flame tokens: [bright, mid, dim, shadow]. */
function moltenRamp(): RGB[] {
  const st = getComputedStyle(document.documentElement)
  const read = (name: string, fb: RGB) => q(parseHex(st.getPropertyValue(name), fb))
  const f1 = read('--fire1', [0xfd, 0xe6, 0x8a])
  const f2 = read('--fire2', [0xf5, 0x9e, 0x0b])
  const f3 = read('--fire3', [0xb4, 0x53, 0x09])
  const shadow = q(f3.map((v) => Math.round(v * 0.5)) as unknown as RGB)
  return [f1, f2, f3, shadow]
}

interface Drip {
  x: number
  ybot: number
  h: number
}

/** Set of filled font-cells for a word: (cx, cy) grid coords. */
function textCells(word: string): Set<string> {
  const cells = new Set<string>()
  for (let i = 0; i < word.length; i++) {
    const g = FONT[word[i]]
    for (let gy = 0; gy < 7; gy++) {
      for (let gx = 0; gx < 5; gx++) {
        if (g[gy][gx] === '#') cells.add(`${i * 6 + gx},${gy}`)
      }
    }
  }
  return cells
}

function put(buf: Uint8ClampedArray, x: number, y: number, c: RGB) {
  if (x < 0 || x >= W || y < 0 || y >= H) return
  const i = (y * W + x) * 4
  buf[i] = c[0]
  buf[i + 1] = c[1]
  buf[i + 2] = c[2]
  buf[i + 3] = 255
}

/** Molten embossed letters with italic shear. Returns col_x -> bottom_y. */
function drawWord(buf: Uint8ClampedArray, word: string, x0: number, y0: number, AU: RGB[]) {
  const cells = textCells(word)
  const has = (cx: number, cy: number) => cells.has(`${cx},${cy}`)
  const bottoms = new Map<number, number>()
  for (const key of cells) {
    const [cx, cy] = key.split(',').map(Number)
    const top = !has(cx, cy - 1)
    const bot = !has(cx, cy + 1)
    const right = !has(cx + 1, cy)
    for (let py = 0; py < SC; py++) {
      const ry = cy * SC + py
      const sx = Math.floor((LH - 1 - ry) * SHEAR) // italic: 1px steps per row
      for (let px = 0; px < SC; px++) {
        const band = cy < 3 ? AU[0] : cy < 5 ? AU[1] : AU[2]
        let c = band
        if (bot && py === SC - 1) c = AU[3] // shadow bottom
        else if (right && px === SC - 1) c = AU[2]
        else if (top && py === 0) c = HILITE // hot top lip
        put(buf, x0 + cx * SC + px + sx, y0 + ry, c)
      }
    }
    if (bot) {
      const ry = cy * SC + SC - 1
      const sx = Math.floor((LH - 1 - ry) * SHEAR)
      for (let px = 0; px < SC; px++) {
        const x = x0 + cx * SC + px + sx
        bottoms.set(x, Math.max(bottoms.get(x) ?? 0, y0 + ry))
      }
    }
  }
  return bottoms
}

/** Pick ~1/3 of bottom-edge columns, spaced >=4px, deterministic. */
function dripColumns(bottoms: Map<number, number>, salt: number): Drip[] {
  const out: Drip[] = []
  let last = -9
  for (const x of [...bottoms.keys()].sort((a, b) => a - b)) {
    const h = (x * 7919 + salt * 104729) % 97
    if (h < 42 && x - last >= 4) {
      out.push({ x, ybot: bottoms.get(x)!, h })
      last = x
    }
  }
  return out
}

function drawDrips(buf: Uint8ClampedArray, drips: Drip[], f: number, ramp: RGB[]) {
  const GROW = 16
  const HOLD = 2
  for (const { x, ybot, h } of drips) {
    const o = (h * 5) % T // phase offset per drip
    const mlen = 7 + (h % 5) // max attached length 7..11
    const p = (f + o) % T
    // 2px-wide gooey column
    const seg = (y0: number, L: number) => {
      for (let i = 0; i < L; i++) {
        const c = i < 2 ? ramp[2] : ramp[1]
        put(buf, x, y0 + i, c)
        if (i < Math.floor((L * 2) / 3)) put(buf, x + 1, y0 + i, c)
      }
    }
    if (p < GROW) {
      // stretch down
      const L = 2 + Math.floor((p * mlen) / GROW)
      seg(ybot + 1, L)
      put(buf, x, ybot + L, ramp[0]) // bright head
      put(buf, x + 1, ybot + L, ramp[1])
      put(buf, x - 1, ybot + 1, ramp[2]) // meniscus
      put(buf, x + 2, ybot + 1, ramp[2])
    } else if (p < GROW + HOLD) {
      // pinch
      seg(ybot + 1, mlen - 2)
      put(buf, x, ybot + mlen + 1, ramp[0]) // separating bead
      put(buf, x + 1, ybot + mlen + 1, ramp[1])
      put(buf, x, ybot + mlen + 2, ramp[1])
    } else {
      // droplet falls, tail retracts
      const d = p - (GROW + HOLD)
      const L = Math.max(d < 5 ? 2 : 0, mlen - 2 - d * 2)
      seg(ybot + 1, L)
      const fy = ybot + mlen + 1 + Math.floor((d * (d + 3)) / 2) // accelerating
      if (fy < H - 2 && d < 7) {
        put(buf, x, fy, ramp[0])
        put(buf, x + 1, fy, ramp[1])
        put(buf, x, fy + 1, ramp[1])
        put(buf, x + 1, fy + 1, ramp[2])
        if (d < 3) put(buf, x - 1, fy, ramp[1]) // fat fresh droplet
      }
    }
  }
}

/** Bake all T frames at native resolution. */
function bakeFrames(): HTMLCanvasElement[] {
  const AU = moltenRamp()
  const slant = Math.floor((LH - 1) * SHEAR)

  // Letters are static: draw once, then copy per frame and add drips.
  const base = new Uint8ClampedArray(W * H * 4)
  const drips: Drip[] = []
  for (const [word, wy] of WORDS) {
    const ww = word.length * (LW + GAP) - GAP + slant
    const wx = (W - ww) >> 1
    const bottoms = drawWord(base, word, wx, wy, AU)
    drips.push(...dripColumns(bottoms, wy))
  }

  const frames: HTMLCanvasElement[] = []
  for (let f = 0; f < T; f++) {
    const buf = new Uint8ClampedArray(base)
    drawDrips(buf, drips, f, AU)
    const c = document.createElement('canvas')
    c.width = W
    c.height = H
    c.getContext('2d')!.putImageData(new ImageData(buf, W, H), 0, 0)
    frames.push(c)
  }
  return frames
}

export default function DripTitle() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frames = bakeFrames()
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf: number | null = null
    let last = 0
    let idx = 0

    const draw = () => {
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(frames[idx], 0, 0, canvas.width, canvas.height)
    }

    const layout = () => {
      const dpr = window.devicePixelRatio || 1
      const s = Math.max(1, Math.floor(Math.min((wrap.clientWidth * dpr) / W, (wrap.clientHeight * dpr) / H)))
      canvas.width = W * s
      canvas.height = H * s
      canvas.style.width = `${(W * s) / dpr}px`
      canvas.style.height = `${(H * s) / dpr}px`
      draw()
    }
    layout()

    const tick = (now: number) => {
      if (now - last >= FRAME_MS) {
        last = now
        idx = (idx + 1) % T
        draw()
      }
      raf = requestAnimationFrame(tick)
    }
    if (!still) raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(layout)
    ro.observe(wrap)
    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-label="Sacha Hurley"
      role="img"
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />
    </div>
  )
}
