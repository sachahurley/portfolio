// 1-bit art baker: collapses source screenshots to the site's dither look.
//
//   node scripts/bake-dither.mjs
//
// Reads   art/<source>.png (committed build inputs, never served)
// Writes  public/dither/<out>.png
//
// Same doctrine as src/lib/dither/oneBit.ts, run offline instead of on a
// canvas: luma sampled on a coarse cell grid, thresholded against the 4x4
// Bayer matrix, one sepia ink on transparency (darkness is the absence of
// ink, never a second colour), then an integer nearest-neighbour upscale.
// Because the output is transparent it retints with the page, so the gem
// themes carry it for free.
//
// Grid sizes follow the art scale rather than the display size: pick `cols`
// so the cells stay visible, then `scale` so the PNG lands near the size it
// renders at. Deterministic and safe to re-run.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { decodePng, encodePng } from './lib/png.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = path.join(root, 'art')
const OUT_DIR = path.join(root, 'public/dither')

const INK = [0xf7, 0xf5, 0xf2] // sepia-200, the site's single ink

// 4x4 Bayer thresholds normalised to (0..1), matching src/lib/dither.
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16))

// crop is in source pixels and must already carry the output aspect ratio;
// cols x scale decide how coarse the art reads and how big the PNG lands;
// black/white are the luma levels (see `levels`), tuned per source.
const JOBS = [
  {
    src: 'scorp-storybook.png',
    out: 'scorp-storybook.png',
    crop: { x: 0, y: 0, w: 2267, h: 1275 },
    cols: 200,
    scale: 4,
    // Column-width figure (~680px), so the cells stay chunky at 4px each.
  },
  {
    src: 'scorp-storybook.png',
    out: 'scorp-thumb.png',
    crop: { x: 0, y: 0, w: 2267, h: 1275 },
    cols: 132,
    scale: 2,
    // Row thumbnail, 132 CSS px wide: one cell per CSS pixel, doubled for
    // retina. Finer than the rest of the site's art because a UI at 132px
    // only survives as texture. Same source as the figure above; the
    // sidebar-plus-canvas shape is the one that still reads this small.
  },
  {
    src: 'scorp-storybook.png',
    out: 'scorp-card.png',
    crop: { x: 650, y: 175, w: 1100, h: 500 },
    cols: 160,
    scale: 2,
    // The home page's former Featured card (now option 5 in the featured
    // options lab; the card shows the live build log): the dense corner of the workbench (the
    // file list, the Pause and Export buttons, the first log lines), no
    // Storybook chrome and none of the empty log pane, at the card well's
    // ~2.2:1. 320 px wide for a ~300 CSS px card, so the windows and
    // buttons read as interface rather than texture.
  },
  // The showcase site's scorpion art (github.com/sachahurley/
  // scorpion-design-system, public/), for the Featured card options.
  {
    src: 'showcase-scorpion.png',
    out: 'showcase-logo.png',
    mode: 'alpha',
    crop: { x: 91, y: 126, w: 843, h: 787 },
    cols: 30,
    scale: 4,
    // The showcase's pixel scorpion logo (scorpion-hero-v2), cropped to its
    // ink and sampled on its own 30 x 28 cell grid, so every cell lands
    // whole: 120 x 112 px.
  },
  {
    src: 'showcase-wordmark.png',
    out: 'showcase-wordmark.png',
    mode: 'alpha',
    crop: { x: 10, y: 10, w: 938, h: 173 },
    cols: 128,
    scale: 2,
    // The boxed SCORPION UI wordmark (scorpion-ui-graphic-2), on its
    // ~7 px cell grid: 256 x 48 px.
  },
  {
    src: 'showcase-illustration.png',
    out: 'showcase-illustration.png',
    crop: { x: 0, y: 0, w: 1232, h: 924 },
    cols: 176,
    scale: 1,
    // The showcase's detailed scorpion (scorpion-hero), whole frame,
    // re-dithered into the site's ink one cell per CSS pixel so the
    // segments and claws survive: 176 x 132 px, the card well's height.
  },
  {
    src: 'showcase-stinger.png',
    out: 'showcase-stinger.png',
    crop: { x: 0, y: 280, w: 1024, h: 465 },
    cols: 160,
    scale: 2,
    black: 0.06,
    white: 0.4,
    // The album-cover tail close-up (album-cover-stinger-001), banded to
    // the card well's ~2.2:1. Its source is dark, so the white point drops.
  },
]

/** Box-average the crop's alpha: pixel art on transparency (mode 'alpha').
 *  Thresholded at half rather than dithered, so the cells stay crisp. */
function sampleAlpha({ width, data }, crop, cols, rows) {
  const cellW = crop.w / cols
  const cellH = crop.h / rows
  const out = new Float64Array(cols * rows)
  for (let gy = 0; gy < rows; gy++) {
    const y0 = Math.floor(crop.y + gy * cellH)
    const y1 = Math.max(y0 + 1, Math.floor(crop.y + (gy + 1) * cellH))
    for (let gx = 0; gx < cols; gx++) {
      const x0 = Math.floor(crop.x + gx * cellW)
      const x1 = Math.max(x0 + 1, Math.floor(crop.x + (gx + 1) * cellW))
      let sum = 0
      let n = 0
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          sum += data[(y * width + x) * 4 + 3]
          n++
        }
      }
      out[gy * cols + gx] = sum / n / 255 >= 0.5 ? 1 : 0
    }
  }
  return out
}

/** Box-average the crop down to a cols x rows grid of normalised luma. */
function sampleLuma({ width, data }, crop, cols, rows) {
  const cellW = crop.w / cols
  const cellH = crop.h / rows
  const out = new Float64Array(cols * rows)
  for (let gy = 0; gy < rows; gy++) {
    const y0 = Math.floor(crop.y + gy * cellH)
    const y1 = Math.max(y0 + 1, Math.floor(crop.y + (gy + 1) * cellH))
    for (let gx = 0; gx < cols; gx++) {
      const x0 = Math.floor(crop.x + gx * cellW)
      const x1 = Math.max(x0 + 1, Math.floor(crop.x + (gx + 1) * cellW))
      let sum = 0
      let n = 0
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const p = (y * width + x) * 4
          sum += 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]
          n++
        }
      }
      out[gy * cols + gx] = sum / n / 255
    }
  }
  return out
}

/**
 * Apply the black and white points. Auto-levelling is wrong for these
 * sources: they are dark-theme UI where the background is a hair lighter
 * than true black, so stretching to full range turns every empty panel into
 * a 50% checkerboard. Pinning the black point above the background instead
 * keeps darkness empty, which is the whole doctrine.
 */
function levels(grid, black, white) {
  const span = white - black || 1
  return grid.map((v) => Math.min(1, Math.max(0, (v - black) / span)))
}

function bake(job) {
  const img = decodePng(fs.readFileSync(path.join(SRC_DIR, job.src)))
  const { crop, cols, scale } = job
  if (crop.x + crop.w > img.width || crop.y + crop.h > img.height) {
    throw new Error(`${job.src}: crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} exceeds ${img.width}x${img.height}`)
  }
  const rows = Math.round((cols * crop.h) / crop.w)
  // 'alpha' jobs are pixel art on transparency: ink wherever it is opaque
  const lit =
    job.mode === 'alpha'
      ? sampleAlpha(img, crop, cols, rows)
      : levels(sampleLuma(img, crop, cols, rows), job.black ?? 0.12, job.white ?? 0.75)

  const width = cols * scale
  const height = rows * scale
  const data = Buffer.alloc(width * height * 4) // zeroed = transparent
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      if (lit[gy * cols + gx] <= BAYER4[gy % 4][gx % 4]) continue
      for (let y = gy * scale; y < (gy + 1) * scale; y++) {
        for (let x = gx * scale; x < (gx + 1) * scale; x++) {
          const p = (y * width + x) * 4
          data[p] = INK[0]
          data[p + 1] = INK[1]
          data[p + 2] = INK[2]
          data[p + 3] = 255
        }
      }
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, job.out), encodePng({ width, height, data }))
  console.log(`${job.out}  ${width}x${height}  (${cols}x${rows} cells)`)
}

fs.mkdirSync(OUT_DIR, { recursive: true })
for (const job of JOBS) bake(job)
