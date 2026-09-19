// Extra tiles: the site's own generated stonework, baked into the sheet so
// it is named and searchable alongside the Urizen art (/lab/tile-atlas,
// /dev/tiles, <Tile id="frame/..." />).
//
// The art comes from the very module the site draws with (src/lib/
// jeweledFrame.ts), rendered through the same 1-bit pass, so the atlas
// can never drift from the frame on screen. index-tiles.mjs appends
// these below the Urizen rows.

import { buildFramePixels } from '../../src/lib/jeweledFrame.ts'
import { oneBitImageData } from '../../src/lib/dither/oneBit.ts'

// JeweledFrame inks the frame with sepia-500.
const FRAME_INK = '#bfb4a3'

const rgba = (width, height) => ({ width, height, data: new Uint8ClampedArray(width * height * 4) })

function crop(src, x, y, w, h) {
  const out = rgba(w, h)
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const s = ((y + j) * src.width + (x + i)) * 4
      const d = (j * w + i) * 4
      out.data.set(src.data.subarray(s, s + 4), d)
    }
  }
  return out
}

/** The jeweled frame's 48x48 nine-slice source, already collapsed to 1-bit. */
function frameSource() {
  const buf = buildFramePixels()
  const img = { width: buf.w, height: buf.h, data: buf.data }
  oneBitImageData(img, FRAME_INK)
  return img
}

/**
 * Tiles to append. `w`/`h` are sheet cells; art smaller than its block is
 * centred when pasted, so 8px and 16px pieces sit happily on the 12px grid.
 */
export function buildExtras() {
  const src = frameSource()
  return [
    { cat: 'frame/jeweled', name: 'nine_slice', w: 4, h: 4, art: src,
      tags: ['site', 'generated', 'nine-slice'] },
    { cat: 'frame/jeweled', name: 'corner_boss', w: 2, h: 2, art: crop(src, 0, 0, 16, 16),
      tags: ['site', 'generated', 'corner'] },
    { cat: 'frame/jeweled', name: 'edge_stone', w: 1, h: 1, art: crop(src, 16, 0, 8, 8),
      tags: ['site', 'generated', 'edge'] },
  ]
}
