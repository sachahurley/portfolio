/**
 * loaders — the specs behind the dot-loader lab's gallery.
 *
 * Every loader is a tiny matrix: a set of points (a w x h grid unless the
 * spec sets `count` and places them itself) whose brightness, and
 * optionally position, a `setup` writer updates each frame. The renderer
 * (LoaderGallery) decides how a value becomes ink:
 *
 *   dot     round dot, value = opacity
 *   bead    round dot, value = size and opacity (depth cues for 3D ones)
 *   pixel   square, on at 0.5 and up (strict 1-bit)
 *   dither  square, on where value beats the 4x4 Bayer threshold, the
 *           site's 1-bit doctrine for mid tones
 *
 * Values run 0..1; ACCENT paints a cell in the banner accent instead.
 * Positions are in cell units (cell centres sit on integers). Writers get
 * seconds since mount, already stepped when the spec sets `fps`.
 */

import { hashNoise } from '../../lib/dither/render'

export const ACCENT = 2

export type Render = 'dot' | 'bead' | 'pixel' | 'dither'

export interface Frame {
  n: number
  w: number
  h: number
  v: Float32Array
  x: Float32Array
  y: Float32Array
}

export interface LoaderSpec {
  id: string
  name: string
  note: string
  w: number
  h: number
  pitch: number // CSS px per cell
  render: Render
  count?: number // custom point set; omit for the full w x h grid
  fps?: number // step the clock (chunky 1-bit motion); omit to run every frame
  ghost?: number // opacity of the unlit matrix behind dot loaders
  still?: number // t for the reduced-motion still
  readout?: (t: number) => string
  setup: (f: Frame) => (t: number) => void
}

export function makeFrame(spec: LoaderSpec): Frame {
  const n = spec.count ?? spec.w * spec.h
  const f: Frame = {
    n,
    w: spec.w,
    h: spec.h,
    v: new Float32Array(n),
    x: new Float32Array(n),
    y: new Float32Array(n),
  }
  if (spec.count == null) {
    for (let i = 0; i < n; i++) {
      f.x[i] = i % spec.w
      f.y[i] = Math.floor(i / spec.w)
    }
  }
  return f
}

const TAU = Math.PI * 2
const frac = (n: number) => n - Math.floor(n)
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)
const tri = (n: number) => 1 - Math.abs(frac(n) * 2 - 1) // 0 -> 1 -> 0

/** Stateless loaders: one value per grid cell from (x, y, t). */
const field =
  (fn: (x: number, y: number, t: number) => number) => (f: Frame) => (t: number) => {
    for (let i = 0; i < f.n; i++) f.v[i] = fn(f.x[i], f.y[i], t)
  }

/** Loop 0..1 over `secs`, holding at 1 for the last `hold` of the cycle. */
const progress = (t: number, secs: number, hold = 0.2) => clamp01(frac(t / secs) / (1 - hold))

/* ---------------------------------------------------------------- dots */

// 3x5 dot font, one 3-bit row per line (MSB = left column).
const DIGITS = [
  [7, 5, 5, 5, 7], [2, 6, 2, 2, 7], [7, 1, 7, 4, 7], [7, 1, 7, 1, 7], [5, 5, 7, 1, 1],
  [7, 4, 7, 1, 7], [7, 4, 7, 5, 7], [7, 1, 2, 2, 2], [7, 5, 7, 5, 7], [7, 5, 7, 1, 7],
]

const LAP = [
  [0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [0, 3], [0, 2], [0, 1],
]

export const DOTS: LoaderSpec[] = [
  {
    id: 'braille-lap',
    name: 'braille lap',
    note: 'A three-dot snake circling a 2x4 braille cell.',
    w: 2, h: 4, pitch: 9, render: 'dot', fps: 12, ghost: 0.12,
    setup: (f) => (t) => {
      const head = Math.floor(t * 12) % 8
      f.v.fill(0)
      ;[1, 0.55, 0.25].forEach((a, k) => {
        const [x, y] = LAP[(head - k + 8) % 8]
        f.v[y * f.w + x] = a
      })
    },
  },
  {
    id: 'orbit',
    name: 'orbit',
    note: 'Eight dots on a ring, an accent head dragging a cubic tail.',
    w: 7, h: 7, pitch: 10, render: 'dot', count: 8,
    setup: (f) => {
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * TAU - Math.PI / 2
        f.x[i] = 3 + Math.cos(a) * 2.6
        f.y[i] = 3 + Math.sin(a) * 2.6
      }
      return (t) => {
        const head = frac(t * 1.2) * 8
        for (let i = 0; i < 8; i++) {
          const d = (head - i + 8) % 8
          f.v[i] = d < 1 ? ACCENT : 0.12 + 0.88 * Math.pow(1 - d / 8, 3)
        }
      }
    },
  },
  {
    id: 'typing',
    name: 'typing',
    note: 'Three dots hopping in turn, the chat-bubble classic.',
    w: 5, h: 3, pitch: 10, render: 'dot', count: 3,
    setup: (f) => (t) => {
      for (let i = 0; i < 3; i++) {
        const lift = Math.max(0, Math.sin(t * TAU * 1.1 - i * 0.8))
        f.x[i] = 0.5 + i * 1.5
        f.y[i] = 1.6 - lift * 1.1
        f.v[i] = 0.35 + 0.65 * lift
      }
    },
  },
  {
    id: 'grid-pulse',
    name: 'grid pulse',
    note: 'A 4x4 grid breathing along its diagonal.',
    w: 4, h: 4, pitch: 12, render: 'dot',
    setup: field((x, y, t) => 0.12 + 0.88 * Math.pow(0.5 + 0.5 * Math.sin(t * 5 - (x + y) * 0.9), 3)),
  },
  {
    id: 'ripple',
    name: 'ripple',
    note: 'Rings dropping out of the centre of a 9x9 matrix.',
    w: 9, h: 9, pitch: 9, render: 'dot', ghost: 0.07,
    setup: field((x, y, t) => {
      const d = Math.hypot(x - 4, y - 4)
      return d > 5.2 ? 0 : Math.pow(Math.max(0, Math.cos(d * 1.2 - t * 5)), 6) * (1 - d / 6)
    }),
  },
  {
    id: 'scope',
    name: 'scope',
    note: 'A sine wave crawling across an LED matrix.',
    w: 17, h: 7, pitch: 7, render: 'dot', ghost: 0.07,
    setup: field((x, y, t) => {
      const yy = 3 + 2.6 * Math.sin(x * 0.55 - t * 4)
      return Math.exp(-((y - yy) ** 2) * 1.6)
    }),
  },
  {
    id: 'equalizer',
    name: 'equalizer',
    note: 'Nine bars of beating sines, accent caps on the peaks.',
    w: 9, h: 7, pitch: 9, render: 'dot', ghost: 0.07,
    setup: field((x, y, t) => {
      const lvl = 1 + Math.round(3 + 2.6 * Math.sin(t * 3.1 + x * 1.9) * Math.sin(t * 1.7 + x * 0.6))
      const r = 6 - y
      return r < lvl - 1 ? 0.85 : r === lvl - 1 ? ACCENT : 0
    }),
  },
  {
    id: 'helix',
    name: 'helix',
    note: 'Two strands twisting past each other; size carries depth.',
    w: 16, h: 6, pitch: 8, render: 'bead', count: 32,
    setup: (f) => (t) => {
      for (let c = 0; c < 16; c++) {
        const p = c * 0.5 - t * 3
        const s = Math.sin(p)
        const k = Math.cos(p)
        f.x[c * 2] = f.x[c * 2 + 1] = c
        f.y[c * 2] = 2.5 + 2.2 * s
        f.y[c * 2 + 1] = 2.5 - 2.2 * s
        f.v[c * 2] = 0.5 + 0.5 * k
        f.v[c * 2 + 1] = 0.5 - 0.5 * k
      }
    },
  },
  {
    id: 'sphere',
    name: 'sphere',
    note: 'Forty-eight Fibonacci points on a tilted, turning globe.',
    w: 11, h: 11, pitch: 8, render: 'bead', count: 48,
    setup: (f) => {
      const P = Array.from({ length: f.n }, (_, i) => {
        const y = 1 - ((i + 0.5) / f.n) * 2
        const r = Math.sqrt(1 - y * y)
        const th = i * 2.39996
        return [Math.cos(th) * r, y, Math.sin(th) * r]
      })
      const b = 0.4
      return (t) => {
        const a = t * 1.1
        P.forEach(([x, y, z], i) => {
          const X = x * Math.cos(a) + z * Math.sin(a)
          const Z = -x * Math.sin(a) + z * Math.cos(a)
          const Y = y * Math.cos(b) - Z * Math.sin(b)
          const Z2 = y * Math.sin(b) + Z * Math.cos(b)
          f.x[i] = 5 + X * 4.6
          f.y[i] = 5 + Y * 4.6
          f.v[i] = 0.08 + 0.92 * Math.pow((Z2 + 1) / 2, 1.5)
        })
      }
    },
  },
  {
    id: 'lattice',
    name: 'lattice',
    note: 'A 3x3x3 dot cube tumbling on two axes.',
    w: 11, h: 11, pitch: 8, render: 'bead', count: 27,
    setup: (f) => {
      const P = Array.from({ length: 27 }, (_, i) => [
        ((i % 3) - 1) * 2.6,
        ((Math.floor(i / 3) % 3) - 1) * 2.6,
        (Math.floor(i / 9) - 1) * 2.6,
      ])
      return (t) => {
        const a = t * 0.9
        const b = t * 0.6
        P.forEach(([x, y, z], i) => {
          const X = x * Math.cos(a) + z * Math.sin(a)
          const Z = -x * Math.sin(a) + z * Math.cos(a)
          const Y = y * Math.cos(b) - Z * Math.sin(b)
          const Z2 = y * Math.sin(b) + Z * Math.cos(b)
          f.x[i] = 5 + X
          f.y[i] = 5 + Y
          f.v[i] = clamp01((Z2 / 4.5 + 1) / 2)
        })
      }
    },
  },
  {
    id: 'sunflower',
    name: 'sunflower',
    note: 'Phyllotaxis seeds, a pulse running out from the heart.',
    w: 11, h: 11, pitch: 8, render: 'dot', count: 60,
    setup: (f) => (t) => {
      for (let i = 0; i < f.n; i++) {
        const r = 0.62 * Math.sqrt(i)
        const a = i * 2.39996 + t * 0.3
        f.x[i] = 5 + Math.cos(a) * r
        f.y[i] = 5 + Math.sin(a) * r
        f.v[i] = 0.1 + 0.9 * Math.pow(0.5 + 0.5 * Math.cos(Math.sqrt(i) * 1.6 - t * 4), 3)
      }
    },
  },
  {
    id: 'rain',
    name: 'rain',
    note: 'Columns falling at their own pace, rerolled on every pass.',
    w: 10, h: 9, pitch: 8, render: 'dot', ghost: 0.06,
    setup: (f) => {
      const heads = Array.from({ length: f.w }, (_, c) => hashNoise(c, 0, 7) * (f.h + 6) - 3)
      const speed = Array.from({ length: f.w }, (_, c) => 5 + hashNoise(c, 1, 7) * 7)
      const wraps = new Array(f.w).fill(0)
      let last = 0
      return (t) => {
        const dt = Math.min(0.1, Math.max(0, t - last))
        last = t
        for (let c = 0; c < f.w; c++) {
          heads[c] += speed[c] * dt
          if (heads[c] - 6 > f.h) {
            wraps[c]++
            heads[c] = -hashNoise(c, wraps[c], 3) * 4
            speed[c] = 5 + hashNoise(c, wraps[c], 9) * 7
          }
        }
        for (let i = 0; i < f.n; i++) {
          const d = heads[f.x[i]] - f.y[i]
          f.v[i] = d < 0 || d > 5 ? 0 : d < 1 ? 1 : 0.7 * (1 - d / 5)
        }
      }
    },
  },
  {
    id: 'cradle',
    name: 'cradle',
    note: "Newton's cradle: the end balls swing, the middle three hold.",
    w: 9, h: 4, pitch: 10, render: 'dot', count: 5,
    setup: (f) => (t) => {
      const s = Math.sin(t * 4.5)
      for (let i = 0; i < 5; i++) {
        const th = i === 0 ? Math.min(0, s) * 0.8 : i === 4 ? Math.max(0, s) * 0.8 : 0
        f.x[i] = 2 + i + 2.6 * Math.sin(th)
        f.y[i] = -1.2 + 2.6 * Math.cos(th)
        f.v[i] = 1
      }
    },
  },
  {
    id: 'lissajous',
    name: 'lissajous',
    note: 'A comet tracing a 3:2 figure, fourteen dots of tail.',
    w: 9, h: 9, pitch: 8, render: 'dot', count: 14,
    setup: (f) => (t) => {
      for (let k = 0; k < f.n; k++) {
        const u = t * 1.2 - k * 0.06
        const i = f.n - 1 - k // head painted last, on top of its tail
        f.x[i] = 4 + 3.6 * Math.sin(u * 3)
        f.y[i] = 4 + 3.6 * Math.sin(u * 2)
        f.v[i] = k === 0 ? ACCENT : Math.pow(1 - k / f.n, 1.5)
      }
    },
  },
  {
    id: 'counter',
    name: 'counter',
    note: 'Elapsed seconds in a 3x5 dot font: the readout is the loader.',
    w: 7, h: 5, pitch: 8, render: 'dot', ghost: 0.08, fps: 4, still: 7,
    setup: (f) => (t) => {
      const sec = Math.floor(t) % 60
      const digits = [Math.floor(sec / 10), sec % 10]
      for (let i = 0; i < f.n; i++) {
        const x = f.x[i]
        const y = f.y[i]
        const d = x < 3 ? 0 : x > 3 ? 1 : -1
        f.v[i] = d < 0 ? 0 : (DIGITS[digits[d]][y] >> (2 - (x - d * 4))) & 1
      }
    },
  },
  {
    id: 'heartbeat',
    name: 'heartbeat',
    note: 'An ECG sweep, the trace fading behind an accent pen.',
    w: 20, h: 9, pitch: 6, render: 'dot', ghost: 0.06,
    setup: (f) => {
      const WAVE = [0, 0, 0, 0, 0, -1, 0, 0, 1, -4, 3, 0, 0, 0, -1, -1, 0, 0, 0, 0]
      return (t) => {
        const s = frac(t * 0.7) * f.w
        const pen = Math.floor(s)
        for (let i = 0; i < f.n; i++) {
          const x = f.x[i]
          const y = f.y[i]
          const a = 5 + WAVE[x]
          const b = 5 + WAVE[(x - 1 + f.w) % f.w]
          const on = y >= Math.min(a, b) && y <= Math.max(a, b)
          const age = (s - x + f.w) % f.w
          f.v[i] = !on ? 0 : x === pen ? ACCENT : Math.max(0, 1 - age / (f.w * 0.75))
        }
      }
    },
  },
]

/* --------------------------------------------------------------- 1-bit */

// Hourglass geometry: interior half-width per row (rows 1..11, neck at 6).
const GLASS_HW = [-1, 3, 3, 2, 1, 0, 0, 0, 1, 2, 3, 3, -1]

// Clockwise spiral through an n x n grid, outside in.
function spiral(n: number): number[] {
  const out: number[] = []
  let [t, b, l, r] = [0, n - 1, 0, n - 1]
  while (t <= b && l <= r) {
    for (let x = l; x <= r; x++) out.push(t * n + x)
    for (let y = t + 1; y <= b; y++) out.push(y * n + r)
    if (t < b) for (let x = r - 1; x >= l; x--) out.push(b * n + x)
    if (l < r) for (let y = b - 1; y > t; y--) out.push(y * n + l)
    t++
    b--
    l++
    r--
  }
  return out
}

export const ONE_BIT: LoaderSpec[] = [
  {
    id: 'bresenham',
    name: 'bresenham',
    note: 'A one-pixel line turning in eight hard steps.',
    w: 9, h: 9, pitch: 7, render: 'pixel', fps: 10,
    setup: field((x, y, t) => {
      const a = ((Math.floor(t * 10) % 8) * Math.PI) / 8
      const d = Math.abs((x - 4) * Math.sin(a) - (y - 4) * Math.cos(a))
      return d < 0.55 && Math.hypot(x - 4, y - 4) <= 4.3 ? 1 : 0
    }),
  },
  {
    id: 'segments',
    name: 'segments',
    note: 'Eight ring segments, the trail dithered down to a grain.',
    w: 13, h: 13, pitch: 5, render: 'dither', fps: 10,
    setup: field((x, y, t) => {
      const d = Math.hypot(x - 6, y - 6)
      if (d < 4 || d > 6.3) return 0
      const pos = frac(Math.atan2(y - 6, x - 6) / TAU + 0.25) * 8
      if (frac(pos) < 0.15) return 0
      const k = (Math.floor(t * 10) - Math.floor(pos) + 800) % 8
      return [1, 0.7, 0.45, 0.25][k] ?? 0.15
    }),
  },
  {
    id: 'radar',
    name: 'radar',
    note: 'A sweep arm whose afterglow is pure Bayer density.',
    w: 15, h: 15, pitch: 5, render: 'dither', fps: 15,
    setup: field((x, y, t) => {
      const d = Math.hypot(x - 7, y - 7)
      if (d > 7.3) return 0
      if (d > 6.4 || d < 1) return 1
      const behind = frac(t * 0.6 - Math.atan2(y - 7, x - 7) / TAU)
      return Math.pow(1 - behind, 3)
    }),
  },
  {
    id: 'breath',
    name: 'breath',
    note: 'A soft disc swelling and sinking through the dither ramp.',
    w: 15, h: 15, pitch: 5, render: 'dither', fps: 12,
    setup: field((x, y, t) => {
      const R = 2.5 + 3.8 * (0.5 - 0.5 * Math.cos(t * 2.2))
      return clamp01((R + 1.5 - Math.hypot(x - 7, y - 7)) / 3)
    }),
  },
  {
    id: 'bayer-fill',
    name: 'bayer fill',
    note: 'One flat value, rising and falling. The matrix does the rest.',
    w: 12, h: 12, pitch: 5, render: 'dither', fps: 12,
    setup: field((_x, _y, t) => clamp01(tri(t * 0.35) * 1.3 - 0.15)),
  },
  {
    id: 'hourglass',
    name: 'hourglass',
    note: 'Twenty-three grains draining through a one-pixel neck.',
    w: 9, h: 13, pitch: 5, render: 'pixel', fps: 10, still: 2,
    setup: (f) => {
      const inside = (x: number, y: number) => GLASS_HW[y] >= 0 && Math.abs(x - 4) <= GLASS_HW[y]
      const walls: number[] = []
      const top: number[] = []
      const bottom: number[] = []
      for (let i = 0; i < f.n; i++) {
        const x = f.x[i]
        const y = f.y[i]
        if (y === 0 || y === f.h - 1) walls.push(i)
        else if (Math.abs(x - 4) === GLASS_HW[y] + 1) walls.push(i)
        else if (inside(x, y) && y < 6) top.push(i)
        else if (inside(x, y) && y > 6) bottom.push(i)
      }
      const off = (i: number) => Math.abs(f.x[i] - 4)
      top.sort((a, b) => f.y[a] - f.y[b] || off(a) - off(b))
      bottom.sort((a, b) => f.y[b] - f.y[a] || off(a) - off(b))
      const neck = 6 * f.w + 4
      return (t) => {
        const p = progress(t, 5, 0.15)
        const drained = Math.floor(p * top.length)
        f.v.fill(0)
        for (const i of walls) f.v[i] = 1
        top.forEach((i, k) => (f.v[i] = k >= drained ? 1 : 0))
        bottom.forEach((i, k) => (f.v[i] = k < drained ? 1 : 0))
        if (p > 0 && p < 1 && Math.floor(t * 10) % 2 === 0) f.v[neck] = 1
      }
    },
  },
  {
    id: 'spiral-snake',
    name: 'spiral snake',
    note: 'Ten pixels winding into the centre and back out.',
    w: 8, h: 8, pitch: 6, render: 'pixel', fps: 16,
    setup: (f) => {
      const path = spiral(8)
      const L = path.length
      // Ping-pong along the spiral; the body is the head's own history, so
      // it folds back cleanly at both turnarounds.
      const at = (step: number) => {
        const p = ((step % (L * 2)) + L * 2) % (L * 2)
        return p < L ? p : L * 2 - 1 - p
      }
      return (t) => {
        const step = Math.floor(t * 16)
        f.v.fill(0)
        for (let k = 0; k < 10; k++) f.v[path[at(step - k)]] = 1
      }
    },
  },
  {
    id: 'life',
    name: 'life',
    note: 'Conway at eight generations a second, reseeding when it stalls.',
    w: 16, h: 16, pitch: 5, render: 'pixel', fps: 8,
    setup: (f) => {
      let cells = new Uint8Array(f.n)
      let next = new Uint8Array(f.n)
      let seed = 0
      let gen = -1
      let quiet = 0
      const reseed = () => {
        seed++
        for (let i = 0; i < f.n; i++) cells[i] = hashNoise(f.x[i], f.y[i], seed) < 0.32 ? 1 : 0
        gen = 0
        quiet = 0
      }
      const step = () => {
        let changed = 0
        let alive = 0
        for (let i = 0; i < f.n; i++) {
          const x = f.x[i]
          const y = f.y[i]
          let n = 0
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++)
              if (dx || dy) n += cells[((y + dy + f.h) % f.h) * f.w + ((x + dx + f.w) % f.w)]
          const live = cells[i] ? n === 2 || n === 3 : n === 3
          next[i] = live ? 1 : 0
          changed += next[i] !== cells[i] ? 1 : 0
          alive += next[i]
        }
        ;[cells, next] = [next, cells]
        gen++
        if (alive === 0 || changed < 3) quiet++
        if (quiet > 6 || gen > 90) reseed()
      }
      return () => {
        if (gen < 0) reseed()
        else step()
        for (let i = 0; i < f.n; i++) f.v[i] = cells[i]
      }
    },
  },
  {
    id: 'plasma',
    name: 'plasma',
    note: 'Four interfering sines, the demoscene staple, in one ink.',
    w: 24, h: 12, pitch: 4, render: 'dither', fps: 12,
    setup: field((x, y, t) => {
      const s =
        Math.sin(x * 0.4 + t) +
        Math.sin(y * 0.5 - t * 1.3) +
        Math.sin((x + y) * 0.3 + t * 0.7) +
        Math.sin(Math.hypot(x - 12, y - 6) * 0.5 - t * 2)
      return clamp01(s / 8 + 0.5)
    }),
  },
  {
    id: 'tunnel',
    name: 'tunnel',
    note: 'Square rings falling into the centre, endlessly.',
    w: 15, h: 15, pitch: 5, render: 'pixel', fps: 12,
    setup: field((x, y, t) => (frac(Math.max(Math.abs(x - 7), Math.abs(y - 7)) / 4 + t * 1.2) < 0.4 ? 1 : 0)),
  },
  {
    id: 'wipe',
    name: 'diagonal wipe',
    note: 'A dithered edge crossing the square, then backing off.',
    w: 12, h: 12, pitch: 5, render: 'dither', fps: 12,
    setup: field((x, y, t) => clamp01(((tri(t * 0.3) * 1.6 - 0.3) * 23 - (x + y)) / 5)),
  },
  {
    id: 'bounce',
    name: 'bounce',
    note: 'A 2x2 ball in a box, squashing flat on every landing.',
    w: 14, h: 10, pitch: 5, render: 'pixel', fps: 15,
    setup: (f) => (t) => {
      const bx = 1 + Math.round(tri(t * 0.35) * 10)
      const ph = frac(t * 1.1)
      const lift = 4 * ph * (1 - ph)
      const by = 7 - Math.round(lift * 6)
      const squash = lift < 0.12
      for (let i = 0; i < f.n; i++) {
        const x = f.x[i]
        const y = f.y[i]
        const wall = x === 0 || y === 0 || x === f.w - 1 || y === f.h - 1
        const ball = squash
          ? y === 8 && x >= bx - 1 && x <= bx + 2
          : x >= bx && x <= bx + 1 && y >= by && y <= by + 1
        f.v[i] = wall || ball ? 1 : 0
      }
    },
  },
]

/* ------------------------------------------------------------- formats */

export const INLINE_PULSE: LoaderSpec = {
  id: 'inline-pulse',
  name: 'inline',
  note: 'A 3x3 pulse at text size, sitting on the line.',
  w: 3, h: 3, pitch: 5, render: 'dot',
  setup: field((x, y, t) => 0.15 + 0.85 * Math.pow(0.5 + 0.5 * Math.sin(t * 6 - (x + y) * 1.1), 3)),
}

export const FORMATS: LoaderSpec[] = [
  {
    id: 'progress-dots',
    name: 'progress dots',
    note: 'Determinate: twelve dots, the next one fading in with the remainder.',
    w: 12, h: 1, pitch: 10, render: 'dot', ghost: 0.12, still: 2.4,
    readout: (t) => `${Math.round(progress(t, 4) * 100)}%`,
    setup: (f) => (t) => {
      const lit = progress(t, 4) * f.w
      for (let i = 0; i < f.n; i++) f.v[i] = clamp01(lit - i)
    },
  },
  {
    id: 'one-bit-bar',
    name: '1-bit bar',
    note: 'Determinate: a framed bar whose leading edge dithers in.',
    w: 40, h: 7, pitch: 3, render: 'dither', fps: 20, still: 2.4,
    readout: (t) => `${Math.round(progress(t, 4) * 100)}%`,
    setup: (f) => (t) => {
      const edge = progress(t, 4) * 40
      for (let i = 0; i < f.n; i++) {
        const x = f.x[i]
        const y = f.y[i]
        if (y === 0 || y === f.h - 1 || x === 0 || x === f.w - 1) f.v[i] = 1
        else if (y < 2 || y > f.h - 3 || x < 2 || x > f.w - 3) f.v[i] = 0
        else f.v[i] = clamp01((edge - (x - 2)) / 4)
      }
    },
  },
  {
    id: 'skeleton',
    name: 'dither skeleton',
    note: 'Placeholder lines with a shimmer that is all threshold.',
    w: 36, h: 11, pitch: 4, render: 'dither', fps: 12,
    setup: (f) => {
      const LEN = [36, 28, 20]
      return (t) => {
        const sweep = frac(t * 0.5) * 56 - 10
        for (let i = 0; i < f.n; i++) {
          const x = f.x[i]
          const y = f.y[i]
          const line = Math.floor(y / 4)
          const inBar = y % 4 < 3 && x < LEN[line]
          f.v[i] = inBar ? 0.18 + 0.7 * Math.exp(-((x - sweep - y) ** 2) / 18) : 0
        }
      }
    },
  },
]

/* -------------------------------------------------------------- glyphs */

const BARS = '▁▂▃▄▅▆▇█'

export interface GlyphSpec {
  name: string
  frames: string[]
  ms: number
}

export const GLYPHS: GlyphSpec[] = [
  { name: 'braille', frames: [...'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'], ms: 80 },
  { name: 'braille ring', frames: [...'⣾⣽⣻⢿⡿⣟⣯⣷'], ms: 80 },
  { name: 'line', frames: [...'|/-\\'], ms: 100 },
  { name: 'quadrant', frames: [...'▖▘▝▗'], ms: 120 },
  { name: 'triangle', frames: [...'◢◣◤◥'], ms: 120 },
  { name: 'fill', frames: [...' ▏▎▍▌▋▊▉█'], ms: 90 },
  { name: 'arc', frames: [...'◜◠◝◞◡◟'], ms: 100 },
  { name: 'moon', frames: [...'◐◓◑◒'], ms: 130 },
  { name: 'shade', frames: [...'░▒▓█▓▒'], ms: 110 },
  {
    name: 'bars',
    frames: Array.from({ length: 16 }, (_, k) =>
      Array.from({ length: 5 }, (_, i) =>
        BARS[Math.round(3.5 + 3.5 * Math.sin((k / 16) * TAU + i * 0.9))]
      ).join('')
    ),
    ms: 70,
  },
  {
    name: 'bounce',
    frames: Array.from({ length: 10 }, (_, k) => {
      const i = k < 5 ? k : 9 - k
      return `[${' '.repeat(i)}=${' '.repeat(4 - i)}]`
    }),
    ms: 90,
  },
  { name: 'ellipsis', frames: ['   ', '.  ', '.. ', '...'], ms: 320 },
]
