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
 * inward steps darker (100 -> 300 -> 400 -> 600), so thick strokes read
 * with relief. The ramp skips neighbouring tones (100/200 are nearly
 * indistinguishable at art scale, and the deepest band jumps 400 -> 600)
 * so every band is a visible step.
 * Distance only picks the ON colour; coverage (and the boil) is untouched.
 *
 * Two legibility repairs run on the field, because the wild export's
 * strokes are sketchy enough that fragments stop reading as letters:
 *  - bridgeGaps: short ground gaps inside strokes become dark connective
 *    dither, so fragmented strokes (the Y's tail strands) join up.
 *  - patches: caller-supplied segments in asset coordinates that force
 *    connective ink across gaps too wide for the general pass.
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

/** Connective tissue: ground gaps this short (px) between a word pixel and
 *  any other ink get filled with dark dither so stroke fragments join up. */
const BRIDGE_MAX = 3
const BRIDGE_COVER = 0.5
/** Hand-placed patch strokes are solid letter ink, not dither: at drip
 *  density they broke into disconnected dots, and drawn dark they vanished
 *  against the ground, so the repair renders like any other thin stroke of
 *  the lettering (full coverage also exempts it from the boil). */
const PATCH_COVER = 1

/** A repair stroke in asset pixel coordinates: [x0, y0, x1, y1], drawn 2px
 *  wide. Owned by the caller, since segments are specific to one export. */
export type PatchSegment = readonly [number, number, number, number]

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

export function buildLiveField(img: ImageData, patches: readonly PatchSegment[] = []): LiveField {
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
  bridgeGaps(gw, gh, field, shade)
  applyPatches(gw, gh, field, shade, patches)
  bandWordDepth(gw, gh, shade)
  return { gw, gh, field, shade }
}

/**
 * Connective tissue: scan rows and columns for ground runs of BRIDGE_MAX px
 * or less where one end is solid word and the other is any ink, and fill
 * them as dark-drip dither (shade 3 at BRIDGE_COVER). The gaps chopping the
 * Y's tail into boiling specks are 1-3 px; gaps between letters are far
 * wider, so separate glyphs never weld together. Bridges land in the boil
 * band, so they seethe like the drips they imitate.
 */
function bridgeGaps(gw: number, gh: number, field: Float32Array, shade: Uint8Array): void {
  const mark = new Uint8Array(gw * gh)
  const joins = (a: number, b: number) => (a === 1 && b > 0) || (b === 1 && a > 0)
  for (let y = 0; y < gh; y++) {
    let x = 0
    while (x < gw) {
      if (shade[y * gw + x] !== 0) { x++; continue }
      let x2 = x
      while (x2 < gw && shade[y * gw + x2] === 0) x2++
      if (x2 - x <= BRIDGE_MAX && x > 0 && x2 < gw && joins(shade[y * gw + x - 1], shade[y * gw + x2]))
        for (let k = x; k < x2; k++) mark[y * gw + k] = 1
      x = x2
    }
  }
  for (let x = 0; x < gw; x++) {
    let y = 0
    while (y < gh) {
      if (shade[y * gw + x] !== 0) { y++; continue }
      let y2 = y
      while (y2 < gh && shade[y2 * gw + x] === 0) y2++
      if (y2 - y <= BRIDGE_MAX && y > 0 && y2 < gh && joins(shade[(y - 1) * gw + x], shade[y2 * gw + x]))
        for (let k = y; k < y2; k++) mark[k * gw + x] = 1
      y = y2
    }
  }
  for (let i = 0; i < gw * gh; i++) {
    if (mark[i]) {
      shade[i] = 3
      field[i] = BRIDGE_COVER
    }
  }
}

/**
 * Hand-placed repair strokes: walk each segment 2px wide, raising every
 * pixel on the path to solid coverage. Ground and bridge pixels become
 * word ink, so the repaired stroke rims light and reads as part of the
 * letter; drip pixels keep their tone but stop dithering. Runs before
 * bandWordDepth so the new word pixels band like the artwork's own.
 * A stroke that exists to join fragments must never flicker apart, and
 * dark repairs proved invisible against the near-black ground.
 */
function applyPatches(
  gw: number,
  gh: number,
  field: Float32Array,
  shade: Uint8Array,
  patches: readonly PatchSegment[],
): void {
  for (const [x0, y0, x1, y1] of patches) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
    for (let s = 0; s <= steps; s++) {
      const x = Math.round(x0 + ((x1 - x0) * s) / steps)
      const y = Math.round(y0 + ((y1 - y0) * s) / steps)
      for (const dx of [0, 1]) {
        if (x + dx < 0 || x + dx >= gw || y < 0 || y >= gh) continue
        const i = y * gw + x + dx
        if (shade[i] === 0 || shade[i] === 3) shade[i] = 1
        field[i] = Math.max(field[i], PATCH_COVER)
      }
    }
  }
}

/**
 * Elevation banding: BFS distance from each word pixel to the nearest
 * non-word pixel, then contour the strokes inward. The wild asset's
 * strokes run 1..8 px deep, so the bands land as: rim (d<=1) keeps the
 * lightest tone, d=2 -> band 4, d=3..4 -> band 5, d>=5 -> band 6. The
 * darkest band starts at d=5 so only the widest cores go dark: at d=4 it
 * hollowed out the stroke junctions (the Y in HURLEY stopped reading as
 * a letter), so the mid band holds one contour further in to keep the
 * letterforms connected.
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
    if (d >= 5) shade[i] = 6
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
