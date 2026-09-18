/**
 * town/buildings — procedural isometric gothic buildings at art-pixel scale.
 *
 * One grid cell is one ART PIXEL (the scene displays the grid at integer
 * zoom), so detail lives at 1px: selective outlines, pointed lancets,
 * 2px crenel teeth, slender spires. Tones are a limited 5-step ink ramp;
 * the scene colors each step as mix(dark, ink, luma) so gem themes retint
 * the whole town. Standard three-face light: roof lightest, right (SE)
 * face mid, left (SW) face darkest.
 *
 * Every cell a building paints also writes its id into the parallel `ids`
 * buffer, so per-pixel hit-testing falls out of the paint for free. The
 * silhouette outline is NOT baked here: outlinePass() runs after all
 * buildings paint and draws a single 1px rim wherever a building meets
 * ground, sky, or a building drawn earlier (so abutting silhouettes get
 * one seam, not two).
 */

import {
  isoToCell,
  type BuildingKind,
  type IsoOrigin,
  type RoofKind,
  type TownBuilding,
} from '../../lib/iso'
import { hashNoise } from '../../lib/dither/render'

// The limited ramp. Index = tone id; luma drives both the themed render
// (mix(dark, ink, luma)) and the raw-gray debug colors below.
export const TONES = {
  SKY: 0,
  OUTLINE: 1, // silhouette rim + openings (doors, the well shaft)
  GROUND: 2,
  SHADE: 3, // left (SW) face, eaves, far roof slopes
  LIT: 4, // right (SE) face
  ROOF: 5, // top light: roofs, trim, bone, beams
  GLASS: 6, // window glow / gleams
} as const

export const TONE_LUMA: number[] = [0, 0.05, 0.14, 0.3, 0.58, 0.88, 1]

/** Raw grays for debugging the geometry without theming. */
export const TONE_COLORS: string[] = [
  'transparent',
  '#0d0d0d',
  '#242424',
  '#4d4d4d',
  '#949494',
  '#e0e0e0',
  '#ffffff',
]

export interface Grid {
  cols: number
  rows: number
  tone: Uint8Array
  ids: Uint8Array
}

export function makeGrid(cols: number, rows: number): Grid {
  return { cols, rows, tone: new Uint8Array(cols * rows), ids: new Uint8Array(cols * rows) }
}

function put(g: Grid, c: number, r: number, tone: number, id: number) {
  if (c < 0 || c >= g.cols || r < 0 || r >= g.rows) return
  const i = r * g.cols + c
  g.tone[i] = tone
  g.ids[i] = id
}

/** Baked per-building info the scene needs after painting. */
export interface BakedBuilding {
  b: TownBuilding
  /** Painted bounds in art px (hotspots + hover glow). */
  minC: number
  minR: number
  maxC: number
  maxR: number
  /** Cells to flicker as window glints. */
  glintCells: Array<{ c: number; r: number }>
  /** The door cells (enter-transition beat). */
  doorCells: Array<{ c: number; r: number }>
  /** Label-plate anchor cell (top of the silhouette). */
  anchorC: number
  anchorR: number
}

type Mark = (c: number, r: number, tone: number) => void

/** Per-mass geometry handed to the dressers. */
export interface MassGeom {
  W: { c: number; r: number }
  S: { c: number; r: number }
  E: { c: number; r: number }
  N: { c: number; r: number }
  rim(c: number): number // wall top row at column c
  base(c: number): number // wall base row at column c
}

interface MassSpec {
  ix: number
  iy: number
  w: number
  d: number
  h: number
  roof: RoofKind
  carriesDoor?: boolean
  /** Tower plinth: bottom `rows` at full width, shaft inset above. */
  batter?: { rows: number; inset: number }
}

/** Roof lift above the flat diamond top at column c. */
function roofRise(roof: RoofKind, c: number, effW: number, effE: number): number {
  const span = effE - effW
  const mid = effW + (span >> 1)
  switch (roof) {
    case 'gable':
      return Math.min(Math.min(c - effW, effE - c) >> 1, 6)
    case 'cone': {
      const width = Math.max(3, Math.round(span * 0.42))
      const coneH = Math.max(8, Math.round(span * 0.6))
      const d = Math.abs(c - mid)
      return d <= width ? Math.round(coneH * (1 - d / width)) : 0
    }
    case 'spike': {
      const width = Math.max(2, Math.round(span * 0.3))
      const coneH = Math.max(8, Math.round(span * 0.7))
      const d = Math.abs(c - mid)
      return d <= width ? Math.round(coneH * (1 - d / width)) : 0
    }
    default:
      return 0
  }
}

/** Extrude one iso box: roof + two faces, ids written, no silhouette
 *  outline (outlinePass owns that). Returns its geometry for dressers. */
function extrudeMass(m: MassSpec, o: IsoOrigin, seed: number, mark: Mark): MassGeom {
  const W = isoToCell(m.ix, m.iy + m.d, o)
  const S = isoToCell(m.ix + m.w, m.iy + m.d, o)
  const E = isoToCell(m.ix + m.w, m.iy, o)
  const N = isoToCell(m.ix, m.iy, o)
  const base = (c: number) => (c <= S.c ? W.r + ((c - W.c) >> 1) : S.r - ((c - S.c) >> 1))
  const rim = (c: number) => base(c) - m.h
  const flatTop = (c: number) =>
    c <= N.c ? W.r - m.h - ((c - W.c) >> 1) : N.r - m.h + ((c - N.c) >> 1)

  const inset = m.batter?.inset ?? 0
  const effW = W.c + inset
  const effE = E.c - inset
  const mid = effW + ((effE - effW) >> 1)

  for (let c = W.c; c <= E.c; c++) {
    const bse = base(c)

    // Battered plinth columns: just the low base block, no shaft above.
    if (m.batter && (c < effW || c > effE)) {
      const top = bse - m.batter.rows
      for (let r = top; r <= bse; r++) {
        mark(c, r, r === top ? TONES.SHADE : c > S.c ? TONES.LIT : TONES.SHADE)
      }
      continue
    }

    const rm = rim(c)
    const rise = roofRise(m.roof, c, effW, effE)
    const top = flatTop(c) - rise

    // Roof: lightest surface; the far slope of gables/cones one step down;
    // gable ridge caps get a 1px dark ridge line.
    for (let r = top; r <= rm; r++) {
      if (m.roof === 'gable' && r === top && rise === 6) mark(c, r, TONES.OUTLINE)
      else mark(c, r, c < mid && m.roof !== 'flat' ? TONES.LIT : TONES.ROOF)
    }

    // Walls: lit SE face, shaded SW face, 1px corner + eave edges,
    // sparse single-pixel stone noise.
    const lit = c > S.c
    for (let r = rm + 1; r <= bse; r++) {
      let t: number
      if (c === S.c) t = TONES.OUTLINE // the vertical corner between faces
      else if (r === rm + 1) t = TONES.SHADE // eave shadow under the roof
      else if (hashNoise(c, r, seed) > 0.93) t = lit ? TONES.SHADE : TONES.OUTLINE
      else t = lit ? TONES.LIT : TONES.SHADE
      mark(c, r, t)
    }
  }

  return { W, S, E, N, rim, base }
}

export function drawBuilding(g: Grid, b: TownBuilding, o: IsoOrigin): BakedBuilding {
  const baked: BakedBuilding = {
    b,
    minC: g.cols,
    minR: g.rows,
    maxC: 0,
    maxR: 0,
    glintCells: [],
    doorCells: [],
    anchorC: 0,
    anchorR: g.rows,
  }
  const mark: Mark = (c, r, tone) => {
    put(g, c, r, tone, b.id)
    if (c < baked.minC) baked.minC = c
    if (c > baked.maxC) baked.maxC = c
    if (r < baked.minR) baked.minR = r
    if (r > baked.maxR) baked.maxR = r
    if (r < baked.anchorR) {
      baked.anchorR = r
      baked.anchorC = c
    }
  }

  const masses: MassSpec[] = [
    {
      ix: b.ix, iy: b.iy, w: b.w, d: b.d, h: b.h, roof: b.roof,
      batter: b.kind === 'tower' ? { rows: 6, inset: 2 } : undefined,
    },
    ...(b.parts ?? []).map((p) => ({
      ix: b.ix + p.dix, iy: b.iy + p.diy, w: p.w, d: p.d, h: p.h,
      roof: p.roof, carriesDoor: p.carriesDoor,
    })),
  ].sort((a, x) => a.ix + a.w + a.iy + a.d - (x.ix + x.w + x.iy + x.d))

  let mainGeom: MassGeom | null = null
  let doorGeom: MassGeom | null = null
  for (const m of masses) {
    const geom = extrudeMass(m, o, b.seed, mark)
    if (m.ix === b.ix && m.iy === b.iy && m.w === b.w && m.d === b.d) mainGeom = geom
    if (m.carriesDoor) doorGeom = geom
  }

  DRESSERS[b.kind](g, b, { main: mainGeom!, door: doorGeom ?? mainGeom! }, baked, mark)
  return baked
}

/**
 * Selective 1px silhouette outline, run once after every building has
 * painted (and before the fire's hit-area is stamped): a building cell
 * bordering sky/ground, the canvas edge, or a building drawn EARLIER
 * (lower rank) becomes the outline tone. The rank rule keeps abutting
 * silhouettes to a single seam.
 */
export function outlinePass(g: Grid, rank: Uint8Array): void {
  const { cols, rows, ids, tone } = g
  const out: number[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c
      const id = ids[i]
      if (id === 0 || tone[i] === TONES.SKY) continue
      let edge = c === 0 || c === cols - 1 || r === 0 || r === rows - 1
      if (!edge) {
        for (const ni of [i - 1, i + 1, i - cols, i + cols]) {
          const nid = ids[ni]
          if (nid === 0 || (nid !== id && rank[nid] < rank[id])) {
            edge = true
            break
          }
        }
      }
      if (edge) out.push(i)
    }
  }
  for (const i of out) tone[i] = TONES.OUTLINE
}

/* ---- dressers: 1px gothic detail per kind ---- */

type Dresser = (
  g: Grid,
  b: TownBuilding,
  geoms: { main: MassGeom; door: MassGeom },
  baked: BakedBuilding,
  mark: Mark,
) => void

/** Pointed arch door, 5 wide x 8 tall, with a 1px light rim. */
function archDoor(geo: MassGeom, side: 'left' | 'right', baked: BakedBuilding, mark: Mark) {
  const c0 = side === 'right' ? geo.S.c : geo.W.c
  const c1 = side === 'right' ? geo.E.c : geo.S.c
  const mc = c0 + ((c1 - c0) >> 1)
  const H = 8
  const profile = (ad: number) => (ad === 2 ? H - 3 : ad === 1 ? H - 1 : H)
  for (let dc = -2; dc <= 2; dc++) {
    const c = mc + dc
    const bse = geo.base(c) - 1
    const hh = profile(Math.abs(dc))
    for (let r = bse - hh + 1; r <= bse; r++) {
      mark(c, r, TONES.OUTLINE)
      baked.doorCells.push({ c, r })
    }
    mark(c, bse - hh, TONES.ROOF) // 1px rim tracing the pointed arch
  }
}

/** Pointed 1x4 lancet window; the top px doubles as a glint. */
function lancet(c: number, r: number, baked: BakedBuilding, mark: Mark) {
  for (let dr = 0; dr < 4; dr++) mark(c, r + dr, TONES.GLASS)
  mark(c, r - 1, TONES.ROOF) // hood point
  baked.glintCells.push({ c, r })
}

/** 2px teeth / 1px gap crenellation along a mass's front eaves; dark so
 *  the battlements silhouette against the light roof plane behind. */
function crenellate(geo: MassGeom, mark: Mark) {
  for (let c = geo.W.c + 1; c < geo.E.c - 1; c += 3) {
    for (const cc of [c, c + 1]) {
      const rm = geo.rim(cc)
      mark(cc, rm - 1, TONES.OUTLINE)
      mark(cc, rm - 2, TONES.OUTLINE)
    }
  }
}

/** 1px darker string-course lines across the lit face every 8 rows. */
function stringCourses(geo: MassGeom, mark: Mark) {
  for (let c = geo.S.c + 1; c < geo.E.c; c++) {
    const rm = geo.rim(c)
    const bse = geo.base(c)
    for (let k = 8; k < bse - rm; k += 8) mark(c, rm + k, TONES.SHADE)
  }
}

// Small gothic skull emblem (7x5): 1 bone (ROOF), 2 socket (OUTLINE).
const SKULL7 = [
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 1, 1, 2, 1],
  [0, 1, 1, 2, 1, 1, 0],
  [0, 1, 2, 1, 2, 1, 0],
]

const DRESSERS: Record<BuildingKind, Dresser> = {
  keep(_g, b, geoms, baked, mark) {
    crenellate(geoms.main, mark)
    stringCourses(geoms.main, mark)
    archDoor(geoms.door, b.door, baked, mark)
    // Skull emblem on the main lit face, above the gatehouse roof.
    const mc = geoms.main.S.c + ((geoms.main.E.c - geoms.main.S.c) >> 1)
    const topR = geoms.main.rim(mc) + 4
    for (let sr = 0; sr < SKULL7.length; sr++) {
      for (let sc = 0; sc < SKULL7[0].length; sc++) {
        const v = SKULL7[sr][sc]
        if (v === 0) continue
        mark(mc - 3 + sc, topR + sr, v === 1 ? TONES.ROOF : TONES.OUTLINE)
      }
    }
    lancet(mc - 6, topR + 9, baked, mark)
    lancet(mc + 6, topR + 9, baked, mark)
  },

  library(_g, b, geoms, baked, mark) {
    archDoor(geoms.door, b.door, baked, mark)
    // Lancets marching along both faces.
    for (const lit of [false, true]) {
      const geo = geoms.main
      const c0 = lit ? geo.S.c + 3 : geo.W.c + 3
      const c1 = lit ? geo.E.c - 2 : geo.S.c - 2
      for (let c = c0; c < c1; c += 5) {
        lancet(c, geo.rim(c) + 4, baked, mark)
      }
    }
  },

  tower(_g, b, geoms, baked, mark) {
    archDoor(geoms.door, b.door, baked, mark)
    stringCourses(geoms.main, mark)
    // Stacked lancets up the lit shaft.
    const geo = geoms.main
    const mc = geo.S.c + ((geo.E.c - geo.S.c) >> 1)
    for (let i = 0; i < 3; i++) lancet(mc, geo.rim(mc) + 4 + i * 10, baked, mark)
  },

  chapel(_g, b, geoms, baked, mark) {
    archDoor(geoms.door, b.door, baked, mark)
    // Rose window above the door: 3x3 ring with a glass heart.
    const geo = geoms.main
    const mc = geo.S.c + ((geo.E.c - geo.S.c) >> 1)
    const rr = geo.rim(mc) + 4
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const edge = Math.abs(dx) + Math.abs(dy) === 2
        mark(mc + dx, rr + dy, edge ? TONES.ROOF : TONES.GLASS)
      }
    }
    baked.glintCells.push({ c: mc, r: rr })
  },

  monument(_g, _b, geoms, baked, mark) {
    // Obelisk (spike roof from the extrude); a mirror-gleam near the tip.
    const geo = geoms.main
    const mc = geo.W.c + ((geo.E.c - geo.W.c) >> 1)
    const tip = geo.rim(mc) - 6
    mark(mc, tip, TONES.GLASS)
    baked.glintCells.push({ c: mc, r: tip })
  },

  well(_g, _b, geoms, baked, mark) {
    // Open shaft with post-and-beam over it.
    const geo = geoms.main
    const mc = geo.W.c + ((geo.E.c - geo.W.c) >> 1)
    const rm = geo.rim(mc)
    for (let c = geo.W.c + 2; c <= geo.E.c - 2; c++) {
      for (let r = rm - 2; r <= rm; r++) mark(c, r, TONES.OUTLINE)
    }
    for (let dy = 1; dy <= 6; dy++) {
      mark(mc - 5, rm - dy, TONES.ROOF)
      mark(mc + 5, rm - dy, TONES.ROOF)
    }
    for (let dx = -5; dx <= 5; dx++) mark(mc + dx, rm - 6, TONES.ROOF)
    baked.glintCells.push({ c: mc, r: rm - 1 })
  },
}
