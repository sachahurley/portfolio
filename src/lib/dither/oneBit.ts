/**
 * dither/oneBit — collapse rendered art to strict 1-bit.
 *
 * Every cell becomes either the single ink colour or transparent; mid
 * tones survive as Bayer-ordered dither density (darker = sparser ink),
 * the same threshold-dither doctrine as the welcome title. Because the
 * page ground is near-black, "off" is transparency: darkness is the
 * absence of ink, never a second paint colour.
 *
 * Components call this as a post-pass on their own CELL grid (the art
 * scale, not device pixels), so the dither pattern rides the artwork.
 */

export const ONE_BIT_INK = '#f7f5f2' // sepia-200, the site accent

// 4x4 Bayer thresholds normalised to (0..1), matching dither/render.
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16))

/** Normalised Bayer threshold (0..1) for cell (x, y), for callers that
 *  dither inline (e.g. animated cells) instead of via a post-pass. */
export function bayerThreshold(x: number, y: number): number {
  return BAYER4[((y % 4) + 4) % 4][((x % 4) + 4) % 4]
}

function inkChannels(ink: string): [number, number, number] {
  const h = ink.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

/** Rec. 601 luma of one pixel, normalised 0..1. */
function luma(d: Uint8ClampedArray, p: number): number {
  return (0.299 * d[p] + 0.587 * d[p + 1] + 0.114 * d[p + 2]) / 255
}

/**
 * Threshold an ImageData in place at 1px cell scale. Transparent pixels
 * stay transparent; opaque pixels become ink or transparent by luma vs
 * the Bayer matrix.
 */
export function oneBitImageData(img: ImageData, ink: string = ONE_BIT_INK): void {
  const [ir, ig, ib] = inkChannels(ink)
  const d = img.data
  const w = img.width
  for (let y = 0; y < img.height; y++) {
    const row = BAYER4[y % 4]
    for (let x = 0; x < w; x++) {
      const p = (y * w + x) * 4
      if (d[p + 3] < 128) {
        d[p + 3] = 0
        continue
      }
      if (luma(d, p) > row[x % 4]) {
        d[p] = ir
        d[p + 1] = ig
        d[p + 2] = ib
        d[p + 3] = 255
      } else {
        d[p + 3] = 0
      }
    }
  }
}

/**
 * Threshold a rendered canvas in place on its cell grid. `cellPx` is the
 * component's art scale in canvas pixels (PIXEL_SIZE * dpr etc.); each
 * cell is sampled at its centre and repainted whole, so the dither
 * operates at art resolution regardless of the device pixel ratio.
 */
export function oneBitCanvas(
  ctx: CanvasRenderingContext2D,
  wPx: number,
  hPx: number,
  cellPx: number,
  ink: string = ONE_BIT_INK,
): void {
  if (wPx === 0 || hPx === 0) return
  const img = ctx.getImageData(0, 0, wPx, hPx)
  const d = img.data
  const [ir, ig, ib] = inkChannels(ink)
  const cell = Math.max(1, Math.round(cellPx))
  const cols = Math.ceil(wPx / cell)
  const rows = Math.ceil(hPx / cell)
  for (let cy = 0; cy < rows; cy++) {
    const brow = BAYER4[cy % 4]
    for (let cx = 0; cx < cols; cx++) {
      const sx = Math.min(wPx - 1, cx * cell + (cell >> 1))
      const sy = Math.min(hPx - 1, cy * cell + (cell >> 1))
      const sp = (sy * wPx + sx) * 4
      const on = d[sp + 3] >= 128 && luma(d, sp) > brow[cx % 4]
      // Repaint the whole cell from its centre sample.
      const x1 = Math.min(wPx, (cx + 1) * cell)
      const y1 = Math.min(hPx, (cy + 1) * cell)
      for (let y = cy * cell; y < y1; y++) {
        for (let x = cx * cell; x < x1; x++) {
          const p = (y * wPx + x) * 4
          if (on) {
            d[p] = ir
            d[p + 1] = ig
            d[p + 2] = ib
            d[p + 3] = 255
          } else {
            d[p + 3] = 0
          }
        }
      }
    }
  }
  ctx.putImageData(img, 0, 0)
}
