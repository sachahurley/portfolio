/**
 * dither/render — the 1-bit ordered-dither engine, copied from the sibling
 * dither-studio repo (studio.html). DOM-free and dependency-free; the two
 * repos stay decoupled, so algorithms move across as copies, never imports.
 *
 * The look's invariants (dither-studio docs/STYLE-GUIDE.md): ordered
 * threshold matrix (not error diffusion), coarse grid (150-250 px wide),
 * integer nearest-neighbour upscale only, and boil jitter confined to the
 * shaded band so silhouettes never flicker.
 */

export type Rgb = [number, number, number]

export function bayer(n: number): number[][] {
  let m = [[0]]
  for (let i = 0; i < n; i++) {
    const s = m.length
    const out: number[][] = []
    for (let y = 0; y < s * 2; y++) out.push(new Array(s * 2).fill(0))
    for (let y = 0; y < s; y++)
      for (let x = 0; x < s; x++) {
        const v = m[y][x] * 4
        out[y][x] = v + 0
        out[y][x + s] = v + 2
        out[y + s][x] = v + 3
        out[y + s][x + s] = v + 1
      }
    m = out
  }
  const n2 = m.length * m.length
  return m.map((r) => r.map((v) => (v + 0.5) / n2))
}

export const BAYER2 = bayer(1)
export const BAYER4 = bayer(2)

/** Cheap deterministic hash noise, stable per (x, y, seed). */
export function hashNoise(x: number, y: number, seed: number): number {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0
  h = (h ^ (h >>> 13)) * 1274126177
  h = h ^ (h >>> 16)
  return ((h >>> 0) % 100000) / 100000
}

export interface DitherColors {
  ground: Rgb
  ink: Rgb
  lit: Rgb
}

/**
 * Threshold one animation frame of the coverage field into the caller-owned
 * ImageData (alpha must be pre-filled 255). A pixel is on when its jittered
 * coverage beats the tiled matrix; on-pixels take `ink`, or `lit` where the
 * optional mask marks them (the title's name block and orb). Boil jitters
 * only the shaded band, keyed off the pre-jitter value, so solid cores and
 * empty ground never flicker.
 */
export function renderDitherFrame(
  field: Float32Array,
  gw: number,
  gh: number,
  frame: number,
  boil: number,
  matrix: number[][],
  colors: DitherColors,
  img: ImageData,
  lit?: Uint8Array,
): void {
  const s = matrix.length
  const d = img.data
  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      const i = y * gw + x
      const v0 = field[i]
      let v = v0
      if (boil > 0 && v > 0.03 && v < 0.97)
        v = Math.min(1, Math.max(0, v + (hashNoise(x, y, frame + 1) - 0.5) * boil))
      const on = v > matrix[y % s][x % s]
      const c = on ? (lit && lit[i] ? colors.lit : colors.ink) : colors.ground
      const p = i * 4
      d[p] = c[0]
      d[p + 1] = c[1]
      d[p + 2] = c[2]
    }
  }
}
