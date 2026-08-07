/**
 * dither/liveAsset — brings a studio-exported dither still to life in the
 * browser. The flat-colour asset is read back into a coverage field, then
 * re-thresholded every beat: the artwork never moves, only threshold
 * decisions inside the shaded band flip (the studio's "animate the
 * threshold, not the artwork" doctrine). Also provides the classic Mac
 * ordered-dissolve entrance: a bias swept out of the threshold so pixels
 * materialise in Bayer order.
 *
 * The wild asset's four flat colours map to shades and coverages:
 *   sepia-950 ground -> 0 (outside the band, never flickers)
 *   sepia-100 words  -> 1.0 solid core; 0.9 where a letter touches ground,
 *                       so a thin edge band quietly boils
 *   sepia-500 drips  -> 0.7 } inside the band: they render as live dither
 *   sepia-700 drips  -> 0.4 } texture instead of flat tone, and seethe
 *
 * Word pixels are additionally banded by distance from the stroke edge,
 * hypsometric-map style: rims stay the lightest sepia and each contour
 * inward steps darker (100 -> 300 -> 400 -> 500), so thick strokes read
 * with relief. The ramp skips neighbouring tones (100/200 are nearly
 * indistinguishable at art scale) so every band is a visible step.
 * Distance only picks the ON colour; coverage (and the boil) is untouched.
 */

import { BAYER4, hashNoise, type Rgb } from './render'

export interface LiveField {
  gw: number
  gh: number
  /** Coverage per pixel (0 ground .. 1 solid ink). */
  field: Float32Array
  /** Palette index of the pixel's on-colour: 0 ground, 1 word rim, 2 mid,
   *  3 dark, then the word elevation bands 4/5/6 (deeper = darker). */
  shade: Uint8Array
}

/** Source colours as baked into the asset (see scripts that exported it). */
const BAKED: Rgb[] = [
  [26, 21, 15], // sepia-950 ground
  [252, 251, 250], // sepia-100 words
  [191, 180, 163], // sepia-500 mid drips
  [105, 95, 77], // sepia-700 dark drips
]

const COVER = [0, 1.0, 0.7, 0.4]
const EDGE_COVER = 0.9

function classify(r: number, g: number, b: number): number {
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < BAKED.length; i++) {
    const [br, bg, bb] = BAKED[i]
    const d = (r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return best
}

export function buildLiveField(img: ImageData): LiveField {
  const gw = img.width
  const gh = img.height
  const field = new Float32Array(gw * gh)
  const shade = new Uint8Array(gw * gh)
  const d = img.data
  for (let i = 0; i < gw * gh; i++) {
    const s = classify(d[i * 4], d[i * 4 + 1], d[i * 4 + 2])
    shade[i] = s
    field[i] = COVER[s]
  }
  // Word pixels with a ground neighbour drop into the boil band, so the
  // letter rims shimmer while the cores hold perfectly still.
  for (let y = 0; y < gh; y++)
    for (let x = 0; x < gw; x++) {
      const i = y * gw + x
      if (shade[i] !== 1) continue
      const touchesGround =
        (x > 0 && shade[i - 1] === 0) ||
        (x < gw - 1 && shade[i + 1] === 0) ||
        (y > 0 && shade[i - gw] === 0) ||
        (y < gh - 1 && shade[i + gw] === 0)
      if (touchesGround) field[i] = EDGE_COVER
    }
  bandWordDepth(gw, gh, shade)
  return { gw, gh, field, shade }
}

/**
 * Elevation banding: BFS distance from each word pixel to the nearest
 * non-word pixel, then contour the strokes inward. The wild asset's
 * strokes run 1..8 px deep, so the bands land as: rim (d<=1) keeps the
 * lightest tone, d=2 -> band 4, d=3 -> band 5, d>=4 -> band 6. The
 * darkest band starts at d=4 (not 5) so the stroke cores read wide,
 * without pushing the dark region much closer to the rims.
 */
function bandWordDepth(gw: number, gh: number, shade: Uint8Array): void {
  const dist = new Int16Array(gw * gh).fill(-1)
  const queue = new Int32Array(gw * gh)
  let tail = 0
  for (let i = 0; i < gw * gh; i++) {
    if (shade[i] !== 1) {
      dist[i] = 0
      queue[tail++] = i
    }
  }
  let head = 0
  while (head < tail) {
    const i = queue[head++]
    const x = i % gw
    const y = (i - x) / gw
    const next = dist[i] + 1
    if (x > 0 && dist[i - 1] === -1) { dist[i - 1] = next; queue[tail++] = i - 1 }
    if (x < gw - 1 && dist[i + 1] === -1) { dist[i + 1] = next; queue[tail++] = i + 1 }
    if (y > 0 && dist[i - gw] === -1) { dist[i - gw] = next; queue[tail++] = i - gw }
    if (y < gh - 1 && dist[i + gw] === -1) { dist[i + gw] = next; queue[tail++] = i + gw }
  }
  for (let i = 0; i < gw * gh; i++) {
    if (shade[i] !== 1) continue
    const d = dist[i]
    if (d >= 4) shade[i] = 6
    else if (d >= 3) shade[i] = 5
    else if (d >= 2) shade[i] = 4
  }
}

/**
 * Threshold one beat into the caller-owned ImageData (alpha pre-filled).
 * `progress` is the dissolve entrance: 0 shows nothing, 1 is the finished
 * piece; between, the threshold is biased so pixels arrive in Bayer order.
 * Boil jitters only the shaded band, keyed off the pre-jitter value, so
 * solid cores and empty ground never flicker.
 */
export function renderLiveFrame(
  lf: LiveField,
  frame: number,
  boil: number,
  progress: number,
  palette: Rgb[],
  img: ImageData,
): void {
  const { gw, gh, field, shade } = lf
  const s = BAYER4.length
  const bias = 1 - progress
  const d = img.data
  for (let y = 0; y < gh; y++) {
    const row = BAYER4[y % s]
    for (let x = 0; x < gw; x++) {
      const i = y * gw + x
      const v0 = field[i]
      let v = v0
      if (boil > 0 && v0 > 0.03 && v0 < 0.97)
        v = Math.min(1, Math.max(0, v0 + (hashNoise(x, y, frame + 1) - 0.5) * boil))
      const on = v > row[x % s] + bias
      const c = on ? palette[shade[i]] : palette[0]
      const p = i * 4
      d[p] = c[0]
      d[p + 1] = c[1]
      d[p + 2] = c[2]
    }
  }
}
