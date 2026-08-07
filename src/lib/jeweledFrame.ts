/**
 * jeweledFrame — Might & Magic III-style jeweled stone frame, generated at
 * runtime as a 48x48 nine-slice source image (slice inset 16px: corners stay
 * fixed, 8px edge tiles repeat, interior is transparent).
 *
 * Faithful port of a verified reference implementation; only the colour
 * ramps are re-tuned to the site's pixel-art palette (PixelCastle's warm
 * stone and bone, the aged-brass door pulls, the keystone's garnet gems).
 * Rules the reference encodes:
 *  - every RGB channel is one of the 8 Sega Genesis levels
 *    (0x00 0x24 0x49 0x6D 0x92 0xB6 0xDB 0xFF)
 *  - everything sits on an 8px tile grid; corner bosses are 16x16
 *  - light source is top-left: blocks are embossed (light top-left, dark
 *    mortar bottom-right), the carved inset inverts the bevel so it reads
 *    as engraved
 *  - pixel-perfect scaling only (integer drawImage scale + image-rendering:
 *    pixelated; never stretch the edge tiles)
 */

import { oneBitImageData } from './dither/oneBit'

export const FRAME_SRC = 48 // nine-slice source size (exact 9-slice frame)
export const FRAME_TILE = 8 // edge stone tile (repeats along the runs)
export const FRAME_CORNER = 16 // corner boss (stays fixed)

const TILE = FRAME_TILE
const CORNER = FRAME_CORNER

type RGB = readonly [number, number, number]

// Light -> dark ramps, all channels on the Genesis levels.
// Warm sepia stone: PixelCastle's bone/stone family.
const STONE: RGB[] = [
  [219, 182, 146],
  [182, 146, 109],
  [146, 109, 73],
  [109, 73, 36],
  [73, 36, 0],
  [36, 36, 0],
  [0, 0, 0],
]
// Garnet: the keystone skull's gem eyes (#5C0A0A base, #E63333 glow).
const GARNET: RGB[] = [
  [219, 73, 36],
  [182, 36, 36],
  [146, 36, 36],
  [73, 0, 0],
  [36, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]
// Aged brass: the gateway's door ring pulls (#8A784F).
const BRASS: RGB[] = [
  [219, 182, 109],
  [182, 146, 73],
  [146, 109, 73],
  [109, 73, 36],
  [73, 36, 0],
  [36, 36, 0],
  [0, 0, 0],
]
const WHITE: RGB = [255, 255, 255]
const BLACK: RGB = [0, 0, 0]

interface Buf {
  w: number
  h: number
  // ArrayBuffer-backed explicitly: ImageData rejects ArrayBufferLike views
  data: Uint8ClampedArray<ArrayBuffer>
}

const makeBuf = (w: number, h: number): Buf => ({ w, h, data: new Uint8ClampedArray(w * h * 4) })

function put(b: Buf, x: number, y: number, c: RGB) {
  if (x < 0 || x >= b.w || y < 0 || y >= b.h) return
  const i = (y * b.w + x) * 4
  b.data[i] = c[0]
  b.data[i + 1] = c[1]
  b.data[i + 2] = c[2]
  b.data[i + 3] = 255
}

// Opaque tile paste (source tiles have no transparency).
function paste(dst: Buf, src: Buf, ox: number, oy: number) {
  for (let y = 0; y < src.h; y++) {
    for (let x = 0; x < src.w; x++) {
      const si = (y * src.w + x) * 4
      const di = ((oy + y) * dst.w + (ox + x)) * 4
      dst.data[di] = src.data[si]
      dst.data[di + 1] = src.data[si + 1]
      dst.data[di + 2] = src.data[si + 2]
      dst.data[di + 3] = src.data[si + 3]
    }
  }
}

// Alpha composite for the round jewel (skips its transparent corners).
function compositeOver(dst: Buf, src: Buf, ox: number, oy: number) {
  for (let y = 0; y < src.h; y++) {
    for (let x = 0; x < src.w; x++) {
      const si = (y * src.w + x) * 4
      if (src.data[si + 3] === 0) continue
      const di = ((oy + y) * dst.w + (ox + x)) * 4
      dst.data[di] = src.data[si]
      dst.data[di + 1] = src.data[si + 1]
      dst.data[di + 2] = src.data[si + 2]
      dst.data[di + 3] = 255
    }
  }
}

// 8x8 stone block: embossed block, engraved square inset with a dark pip.
function blockTile(size = TILE): Buf {
  const R = STONE
  const t = makeBuf(size, size)
  const m = size - 1
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let c: RGB
      if (y === m || x === m) {
        c = y === m ? R[5] : R[3] // mortar bottom / gap right
      } else if (y === 0 || x === 0) {
        c = x + y <= 1 ? R[0] : R[1] // top-left highlight
      } else {
        c = R[1] // stone face
      }
      put(t, x, y, c)
    }
  }
  put(t, 1, 1, R[0]) // sparkle
  const a = Math.floor(size / 4)
  const b = size - Math.floor(size / 4) - 1
  for (let i = a; i <= b; i++) {
    put(t, i, a, R[4]) // engraved: dark top
    put(t, a, i, R[4]) // engraved: dark left
    put(t, i, b, R[2]) // light lip bottom
    put(t, b, i, R[2]) // light lip right
  }
  put(t, Math.floor((a + b) / 2), Math.floor((a + b) / 2), R[5]) // centre pip
  return t
}

// 16x16 jewel boss: garnet cabochon in a brass bezel with 4 claw prongs.
function jewel(size = CORNER): Buf {
  const S = GARNET
  const M = BRASS
  const img = makeBuf(size, size)
  const cx = (size - 1) / 2
  const cy = (size - 1) / 2
  const r = size / 2 - 1
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - cx, y - cy)
      if (d > r) continue
      let c: RGB
      if (d > r - 1) {
        c = BLACK // rim
      } else if (d > r - 2.2) {
        c = y > cy ? M[2] : M[1] // bezel
      } else if (d > r - 3.2) {
        c = S[3] // dark stone edge
      } else {
        // cabochon, lit upper-left
        const lt = (cx - x + (cy - y)) / (2 * r)
        c = lt > 0.28 ? S[0] : lt > 0.02 ? S[1] : lt > -0.35 ? S[2] : S[3]
      }
      put(img, x, y, c)
    }
  }
  put(img, Math.floor(cx - r * 0.42), Math.floor(cy - r * 0.42), WHITE) // specular
  const k = Math.floor(r * 0.75)
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      // claw prongs on the diagonals
      const px = Math.floor(cx + sx * k)
      const py = Math.floor(cy + sy * k)
      put(img, px, py, M[1])
      put(img, px + sx, py + sy, M[0])
      put(img, px + sx, py, M[2])
      put(img, px, py + sy, M[2])
    }
  }
  return img
}

// The frame: any size snapped to the 8px grid, transparent interior.
export function buildFramePixels(width = FRAME_SRC, height = FRAME_SRC): Buf {
  const w = Math.max(48, Math.floor(width / TILE) * TILE)
  const h = Math.max(48, Math.floor(height / TILE) * TILE)
  const img = makeBuf(w, h)
  const t = blockTile()
  for (let x = 0; x < w; x += TILE) {
    paste(img, t, x, 0) // top run
    paste(img, t, x, h - TILE) // bottom run
  }
  for (let y = TILE; y < h - TILE; y += TILE) {
    paste(img, t, 0, y) // left run
    paste(img, t, w - TILE, y) // right run
  }
  const boss = jewel()
  for (const [cx, cy] of [
    [0, 0],
    [w - CORNER, 0],
    [0, h - CORNER],
    [w - CORNER, h - CORNER],
  ] as const) {
    // 2x2-tile corner boss under the jewel
    for (const dx of [0, TILE]) {
      for (const dy of [0, TILE]) paste(img, t, cx + dx, cy + dy)
    }
    compositeOver(img, boss, cx, cy)
  }
  return img
}

// Browser-only: the nine-slice source as an offscreen canvas, for drawImage
// compositing (JeweledFrame). Strict 1-bit: the embossed stone/garnet ramps
// collapse to ink-density dither before the tile is baked. A canvas rather
// than a data-URL border-image: some embedded webviews refuse data: image
// URLs in CSS, while drawImage from a canvas renders everywhere.
export function buildFrameSourceCanvas(ink?: string): HTMLCanvasElement {
  const { w, h, data } = buildFramePixels()
  const img = new ImageData(data, w, h)
  oneBitImageData(img, ink)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.putImageData(img, 0, 0)
  return canvas
}
