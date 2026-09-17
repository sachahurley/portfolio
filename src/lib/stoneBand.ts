/**
 * stoneBand — the carved castle-block baseboard, as a plain cell grid.
 *
 * The art is a run of irregular bevelled blocks (lit left edge, shaded
 * bottom/right, dark mortar gaps, the occasional jagged crack), rolled
 * deterministically from a seeded hash so a given width always draws the
 * same wall. Pure data: the tile baker renders the grid into the sheet and
 * collapses it to 1-bit, so the stonework lives in the atlas as
 * frame/band/stone_band even though no component paints it directly today.
 */

export const BAND_ROWS = 5 // band height in cells - one short course of blocks
const BLOCK_W_MIN = 5 // cells - narrow stones
const BLOCK_W_MAX = 15 // cells - smaller spread = more individual blocks

// Warm sepia stone palette, matching the site's pixel-art tones.
export const BAND_MORTAR = '#15110c' // gaps between blocks
const SHADOW = '#281f16' // bottom/right bevel + outline
const HI = '#4f4331' // left bevel (subtle lit edge), kept dim
const TOP = '#564a37' // thin warm lit top edge (1px), kept dim
const CRACK = '#1c160f' // dark fissure
// Two block families so neighbours differ without breaking the palette.
const BODY_LIGHT = ['#3e3426', '#483d2d', '#4f4330']
const BODY_DARK = ['#332a1e', '#3c3326', '#453a2b']

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/**
 * The band's cells as [row][col] colors (mortar where a cell is untouched).
 * `seed` picks where in the endless wall the run starts, so the baker can
 * bake two different-looking segments.
 */
export function stoneBandCells(cols: number, seed = 5): string[][] {
  const grid: string[][] = Array.from({ length: BAND_ROWS }, () =>
    Array.from({ length: cols }, () => BAND_MORTAR)
  )
  const paint = (cx: number, cy: number, color: string) => {
    if (cx < 0 || cx >= cols || cy < 0 || cy >= BAND_ROWS) return
    grid[cy][cx] = color
  }

  // Continuous (dim) lit top edge across the whole band.
  for (let cx = 0; cx < cols; cx++) paint(cx, 0, TOP)

  const top = 1
  const bot = BAND_ROWS - 1
  let bx = 0
  let i = seed
  while (bx < cols) {
    // Wide, uneven width spread for a natural castle-stone run.
    const bw = BLOCK_W_MIN + Math.floor(rand(i * 1.7) * (BLOCK_W_MAX - BLOCK_W_MIN + 1))
    // The last block extends to the edge so it ends on a right bevel.
    const isLast = bx + bw + 1 >= cols
    const right = isLast ? cols - 1 : bx + bw - 1
    const blockW = right - bx + 1
    const set = rand(i * 3.1) < 0.4 ? BODY_DARK : BODY_LIGHT

    // Block body + bevel (lit left, shaded bottom/right).
    for (let cy = top; cy <= bot; cy++) {
      for (let cx = bx; cx <= right; cx++) {
        if (cx < 0 || cx >= cols) continue
        const isLeft = cx === bx
        const isRight = cx === right
        const isBot = cy === bot
        let tone: string
        if (isLeft) tone = HI
        else if (isBot || isRight) tone = SHADOW
        else {
          const n = rand(cx * 1.3 + cy * 2.7 + i * 0.5) // subtle granular surface
          tone = n > 0.86 ? set[2] : n < 0.22 ? set[0] : set[1]
        }
        paint(cx, cy, tone)
      }
    }

    // ~40% of blocks get a single jagged, asymmetric crack: diagonal drift,
    // jitter, and occasional breaks so it reads as a fissure, not a line.
    if (blockW >= 6 && rand(i * 5.3) < 0.4) {
      const driftDir = rand(i * 6.1) < 0.5 ? -1 : 1
      let ccx = bx + 2 + Math.floor(rand(i * 9.1) * Math.max(1, blockW - 4))
      for (let cy = top + 1; cy <= bot - 1; cy++) {
        if (ccx > bx && ccx < right && rand(ccx * 2.3 + cy * 3.7) > 0.16) {
          paint(ccx, cy, CRACK)
        }
        let step = rand(ccx * 1.9 + cy * 2.1) < 0.6 ? driftDir : 0
        if (rand(cy * 4.4 + i) < 0.28) step += rand(cy * 5.5) < 0.5 ? -1 : 1
        ccx = Math.min(Math.max(ccx + step, bx + 1), right - 1)
      }
    }

    if (isLast) break
    bx += bw + 1 // 1-cell mortar gap between blocks
    i++
  }

  return grid
}
