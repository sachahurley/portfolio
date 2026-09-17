/**
 * town/kit — the composable isometric object kit (builder lab).
 *
 * A vocabulary of diorama pieces in the floating-slab style: ground
 * plates with dripping fringe edges, roads/rivers/rails carved across
 * them, blob trees, houses, shops, churches, warehouses, terraces,
 * towers, pyramids, truss bridges. Everything is authored on the shared
 * 2:1 tile grid (16x8 art px) with tile footprints, and every render is
 * a SCENE: one plate plus placed items, drawn in painter order, so
 * pieces compose into towns. The single-object preview is just a scene
 * with one item.
 *
 * Strictly two semantic tones (A = primary ink, B = secondary) over the
 * dark ground; the canvas decides how B renders (a dim second colour, or
 * a 50% checker of ink for the 1-colour mode). SKY stays transparent.
 *
 * The ids buffer records which item painted each cell (index + 1), so a
 * scene editor can hit-test placed pieces for free.
 */

import { cellToIso, isoToCell, TILE_H, TILE_W, type IsoOrigin } from '../../lib/iso'
import { hashNoise } from '../../lib/dither/render'
import { makeGrid, type Grid } from './buildings'

export const KT = { SKY: 0, A: 1, B: 2 } as const

export type KitType =
  | 'plate'
  | 'road'
  | 'river'
  | 'rail'
  | 'tree'
  | 'cactus'
  | 'house'
  | 'shop'
  | 'church'
  | 'warehouse'
  | 'terrace'
  | 'spire'
  | 'block'
  | 'pyramid'
  | 'bridge'

/** Bands span the plate; everything else has a placed footprint. */
export function isBand(type: KitType): boolean {
  return type === 'road' || type === 'river' || type === 'rail'
}

export interface KitRecipe {
  type: KitType
  w: number
  d: number
  h: number
  seed: number
}

/** One placed piece in a scene, at tile (ix, iy) on the plate. */
export interface SceneItem extends KitRecipe {
  ix: number
  iy: number
}

export interface KitScene {
  /** Plate size in tiles. */
  w: number
  d: number
  /** Plate texture seed (dots, fringe, sparkles). */
  seed?: number
  items: SceneItem[]
}

export const SCENE_LIMITS = { w: [4, 12] as [number, number], d: [4, 12] as [number, number] }

/** Slider ranges per type (also the sanitize clamps). */
export const KIT_LIMITS: Record<KitType, { w: [number, number]; d: [number, number]; h: [number, number] }> = {
  plate: { w: [2, 8], d: [2, 8], h: [2, 8] },
  road: { w: [3, 8], d: [2, 6], h: [2, 8] },
  river: { w: [3, 8], d: [2, 6], h: [2, 8] },
  rail: { w: [3, 8], d: [2, 6], h: [2, 8] },
  tree: { w: [1, 2], d: [1, 2], h: [8, 24] },
  cactus: { w: [1, 1], d: [1, 1], h: [6, 14] },
  house: { w: [1, 3], d: [1, 2], h: [6, 12] },
  shop: { w: [2, 3], d: [1, 2], h: [7, 12] },
  church: { w: [2, 3], d: [2, 3], h: [8, 14] },
  warehouse: { w: [2, 4], d: [1, 2], h: [7, 12] },
  terrace: { w: [2, 4], d: [1, 1], h: [8, 12] },
  spire: { w: [1, 1], d: [1, 1], h: [14, 32] },
  block: { w: [1, 3], d: [1, 3], h: [12, 40] },
  pyramid: { w: [2, 5], d: [2, 5], h: [8, 24] },
  bridge: { w: [4, 8], d: [1, 1], h: [6, 16] },
}

export const KIT_DEFAULTS: Record<KitType, KitRecipe> = {
  plate: { type: 'plate', w: 5, d: 5, h: 4, seed: 7 },
  road: { type: 'road', w: 6, d: 4, h: 4, seed: 7 },
  river: { type: 'river', w: 6, d: 4, h: 4, seed: 7 },
  rail: { type: 'rail', w: 6, d: 4, h: 4, seed: 7 },
  tree: { type: 'tree', w: 1, d: 1, h: 16, seed: 7 },
  cactus: { type: 'cactus', w: 1, d: 1, h: 10, seed: 7 },
  house: { type: 'house', w: 2, d: 1, h: 8, seed: 7 },
  shop: { type: 'shop', w: 2, d: 2, h: 8, seed: 7 },
  church: { type: 'church', w: 2, d: 2, h: 10, seed: 7 },
  warehouse: { type: 'warehouse', w: 3, d: 1, h: 8, seed: 7 },
  terrace: { type: 'terrace', w: 3, d: 1, h: 9, seed: 7 },
  spire: { type: 'spire', w: 1, d: 1, h: 22, seed: 7 },
  block: { type: 'block', w: 2, d: 2, h: 24, seed: 7 },
  pyramid: { type: 'pyramid', w: 4, d: 4, h: 16, seed: 7 },
  bridge: { type: 'bridge', w: 6, d: 1, h: 10, seed: 7 },
}

/** Visual spill beyond the tile footprint, in whole tiles: canopies,
 *  cactus arms and the church's corner tower reach past their tiles, so
 *  the placement rules keep this much clear around them. */
export const KIT_CLEARANCE: Record<KitType, number> = {
  plate: 0, road: 0, river: 0, rail: 0,
  tree: 1, cactus: 1, church: 1,
  house: 0, shop: 0, warehouse: 0, terrace: 0,
  spire: 0, block: 0, pyramid: 0, bridge: 0,
}

const HW = TILE_W / 2 // 8: cols per tile step
const HH = TILE_H / 2 // 4: rows per tile step

interface Ctx {
  g: Grid
  o: IsoOrigin
  seed: number
  /** Item index + 1 written into the ids buffer (0 = ground/plate). */
  id: number
  mark(c: number, r: number, tone: number): void
}

/* ---------------- plate (the floating slab) ---------------- */

function drawPlate(x: Ctx, w: number, d: number) {
  const { o, seed, mark } = x
  const N = isoToCell(0, 0, o)
  const W = isoToCell(0, d, o)
  const S = isoToCell(w, d, o)
  const E = isoToCell(w, 0, o)

  const inside = (c: number, r: number) => {
    const t = cellToIso(c + 0.5, r + 0.5, o)
    return t.ix >= 0 && t.ix < w && t.iy >= 0 && t.iy < d
  }

  // Top: sparse dots on the dark ground (most cells stay SKY).
  for (let r = N.r; r <= S.r; r++) {
    for (let c = W.c; c <= E.c; c++) {
      if (!inside(c, r)) continue
      const n = hashNoise(c, r, seed)
      if (n > 0.95) mark(c, r, KT.B)
      else if (n < 0.02) mark(c, r, KT.A)
      else mark(c, r, KT.SKY) // claim the cell so bounds cover the slab
    }
  }

  // Rim: boundary cells of the diamond in A.
  for (let r = N.r - 1; r <= S.r + 1; r++) {
    for (let c = W.c - 1; c <= E.c + 1; c++) {
      if (inside(c, r)) continue
      if (inside(c - 1, r) || inside(c + 1, r) || inside(c, r - 1) || inside(c, r + 1)) {
        mark(c, r, KT.A)
      }
    }
  }

  // Fringe: drip columns hanging under the two front edges.
  const base = (c: number) => (c <= S.c ? W.r + ((c - W.c) >> 1) : S.r - ((c - S.c) >> 1))
  for (let c = W.c; c <= E.c; c++) {
    if (hashNoise(c, 3, seed) < 0.22) continue // comb gaps
    const len = 2 + Math.floor(hashNoise(c, 5, seed) * 6)
    const b = base(c) + 1
    for (let i = 1; i <= len; i++) mark(c, b + i, KT.B)
    if (hashNoise(c, 9, seed) > 0.8) mark(c, b + len + 2, KT.B) // stray drip
  }

  // Sparkles floating near the slab.
  for (let k = 0; k < 6; k++) {
    const sc = W.c - 6 + Math.floor(hashNoise(k, 11, seed) * (E.c - W.c + 12))
    const sr = N.r - 4 + Math.floor(hashNoise(k, 13, seed) * (S.r - N.r + 14))
    if (!inside(sc, sr) && hashNoise(k, 17, seed) > 0.4) {
      mark(sc, sr, KT.A)
      if (hashNoise(k, 19, seed) > 0.7) {
        mark(sc - 1, sr, KT.B)
        mark(sc + 1, sr, KT.B)
        mark(sc, sr - 1, KT.B)
        mark(sc, sr + 1, KT.B)
      }
    }
  }
}

/* ------------- bands: road / river / rail across the plate ------------- */

type BandTone = (dy: number, t: { ix: number; iy: number }, c: number, r: number) => number | null

function carveBand(x: Ctx, pw: number, pd: number, centerIy: number, tone: BandTone) {
  const { o, mark } = x
  const N = isoToCell(0, 0, o)
  const W = isoToCell(0, pd, o)
  const S = isoToCell(pw, pd, o)
  const E = isoToCell(pw, 0, o)
  for (let r = N.r; r <= S.r; r++) {
    for (let c = W.c; c <= E.c; c++) {
      const t = cellToIso(c + 0.5, r + 0.5, o)
      if (t.ix < 0 || t.ix >= pw || t.iy < 0 || t.iy >= pd) continue
      const v = tone(t.iy - centerIy, t, c, r)
      if (v != null) mark(c, r, v)
    }
  }
}

function drawRoad(x: Ctx, pw: number, pd: number, centerIy: number) {
  carveBand(x, pw, pd, centerIy, (dy, t) => {
    const ady = Math.abs(dy)
    if (ady < 0.14 && Math.floor(t.ix * 1.5) % 2 === 0) return KT.A // dashes
    if (ady < 0.55) return KT.B
    if (ady < 0.75) return KT.A // kerbs
    return null
  })
}

function drawRiver(x: Ctx, pw: number, pd: number, centerIy: number) {
  const { seed } = x
  carveBand(x, pw, pd, centerIy, (dy, t, c, r) => {
    const wob = Math.sin(t.ix * 1.15 + seed * 0.7) * pd * 0.12
    const ady = Math.abs(dy - wob)
    if (ady < 0.5) return hashNoise(c, r, seed + 31) > 0.9 ? KT.SKY : KT.B // water + glints
    if (ady < 0.72) return KT.A // banks
    return null
  })
}

function drawRail(x: Ctx, pw: number, pd: number, centerIy: number) {
  const { o, mark } = x
  carveBand(x, pw, pd, centerIy, (dy, t) => {
    if (Math.abs(dy) < 0.3 && Math.floor(t.ix * 3) % 2 === 0) return KT.B // ties
    return null
  })
  // Rails: continuous plotted 2:1 lines (cell sampling breaks thin bands).
  for (const off of [-0.26, 0.26]) {
    const steps = pw * TILE_W
    for (let sIdx = 0; sIdx <= steps; sIdx++) {
      const ix = (sIdx / steps) * pw
      const q = isoToCell(ix, centerIy + off, o)
      mark(Math.round(q.c), Math.round(q.r), KT.A)
    }
  }
}

/* ---------------- nature ---------------- */

function drawTree(x: Ctx, bx: number, by: number, h: number) {
  const { g, o, seed, mark } = x
  const p = isoToCell(bx + 0.5, by + 0.5, o)
  const trunkH = 3 + (h >> 3)
  for (let i = 0; i < trunkH; i++) {
    mark(p.c, p.r - i, KT.A)
    mark(p.c + 1, p.r - i, KT.A)
  }
  mark(p.c - 2, p.r + 1, KT.A)
  mark(p.c - 1, p.r + 1, KT.A)
  mark(p.c + 2, p.r + 1, KT.A)
  mark(p.c + 1, p.r, KT.A)

  // Canopy: overlapping blobs with 1px dark seam arcs.
  const R = 4 + (h >> 2)
  const ry0 = Math.max(2, R >> 1)
  const cy = p.r - trunkH - ry0
  const blobList: Array<{ c: number; r: number; rx: number }> = [
    { c: p.c, r: cy, rx: R },
    { c: p.c - R + 1, r: cy + 1, rx: R - 2 },
    { c: p.c + R - 1, r: cy + 1, rx: R - 2 },
  ]
  if (h >= 14) blobList.push({ c: p.c + (hashNoise(1, 23, seed) > 0.5 ? 2 : -2), r: cy - ry0 + 1, rx: R - 2 })
  if (h >= 20) blobList.push({ c: p.c - 2, r: cy - 2 * ry0 + 1, rx: R - 3 })
  for (const blob of blobList) {
    const ry = Math.max(3, Math.round(blob.rx * 0.55))
    for (let dr = -ry - 1; dr <= ry + 1; dr++) {
      for (let dc = -blob.rx - 2; dc <= blob.rx + 2; dc++) {
        const e = (dc * dc) / ((blob.rx + 1.5) * (blob.rx + 1.5)) + (dr * dr) / ((ry + 1) * (ry + 1))
        const inner = (dc * dc) / (blob.rx * blob.rx) + (dr * dr) / (ry * ry)
        const c = blob.c + dc
        const r = blob.r + dr
        const inGrid = c >= 0 && c < g.cols && r >= 0 && r < g.rows
        if (inner <= 1) mark(c, r, KT.B)
        else if (e <= 1 && inGrid && g.tone[r * g.cols + c] === KT.B) mark(c, r, KT.SKY) // seam
      }
    }
  }
}

function drawCactus(x: Ctx, bx: number, by: number, h: number) {
  const { o, mark } = x
  const p = isoToCell(bx + 0.5, by + 0.5, o)
  for (let i = 0; i < h; i++) {
    mark(p.c, p.r - i, KT.B)
    mark(p.c + 1, p.r - i, KT.B)
  }
  const armR = p.r - (h >> 1)
  for (const side of [-1, 1]) {
    const ac = p.c + (side < 0 ? -3 : 4)
    mark(p.c + (side < 0 ? -1 : 2), armR, KT.B)
    mark(p.c + (side < 0 ? -2 : 3), armR, KT.B)
    for (let i = 0; i < 3; i++) mark(ac, armR - i, KT.B)
  }
  mark(p.c, p.r - h, KT.A) // flower
}

/* ---------------- structures ---------------- */

interface BoxGeom {
  W: { c: number; r: number }
  S: { c: number; r: number }
  E: { c: number; r: number }
  N: { c: number; r: number }
  base(c: number): number
  rim(c: number): number
  flatTop(c: number): number
}

/** Iso box: B faces, dark corner seam. Roofs are drawn by the callers. */
function extrudeBox(x: Ctx, ix: number, iy: number, w: number, d: number, h: number): BoxGeom {
  const { o, mark } = x
  const W = isoToCell(ix, iy + d, o)
  const S = isoToCell(ix + w, iy + d, o)
  const E = isoToCell(ix + w, iy, o)
  const N = isoToCell(ix, iy, o)
  const base = (c: number) => (c <= S.c ? W.r + ((c - W.c) >> 1) : S.r - ((c - S.c) >> 1))
  const rim = (c: number) => base(c) - h
  const flatTop = (c: number) =>
    c <= N.c ? W.r - h - ((c - W.c) >> 1) : N.r - h + ((c - N.c) >> 1)
  for (let c = W.c; c <= E.c; c++) {
    for (let r = rim(c); r <= base(c); r++) {
      mark(c, r, c === S.c ? KT.SKY : KT.B)
    }
  }
  return { W, S, E, N, base, rim, flatTop }
}

function gableRoof(x: Ctx, box: BoxGeom, cap: number, stripeEvery: number) {
  const { W, E, rim, flatTop } = box
  for (let c = W.c; c <= E.c; c++) {
    const rise = Math.min(Math.min(c - W.c, E.c - c) >> 1, cap)
    for (let r = flatTop(c) - rise; r <= rim(c); r++) {
      x.mark(c, r, (c - W.c) % stripeEvery === stripeEvery - 1 ? KT.B : KT.A)
    }
  }
}

function doorOn(x: Ctx, box: BoxGeom, atC: number, w: number, h: number) {
  for (let dc = 0; dc < w; dc++) {
    for (let i = 0; i < h; i++) x.mark(atC + dc, box.base(atC + dc) - i, KT.SKY)
  }
}

function drawHouse(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const box = extrudeBox(x, ix, iy, w, d, h)
  gableRoof(x, box, 4, 4)
  const dc = box.S.c + ((box.E.c - box.S.c) >> 1)
  doorOn(x, box, dc, 2, 4)
  for (let c = box.W.c + 3; c < box.S.c - 1; c += 4) {
    x.mark(c, box.rim(c) + 3, KT.SKY)
    x.mark(c, box.rim(c) + 4, KT.SKY)
  }
}

/** Shop: flat roof, striped awning over a big window + door. */
function drawShop(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const box = extrudeBox(x, ix, iy, w, d, h)
  const { W, S, E, rim, flatTop } = box
  // Flat A cap.
  for (let c = W.c; c <= E.c; c++) {
    for (let r = flatTop(c); r <= rim(c); r++) x.mark(c, r, KT.A)
  }
  // Awning: two stripe rows across the right face, under the cap.
  for (let c = S.c + 1; c < E.c; c++) {
    const r0 = rim(c) + 3
    const t = (c - S.c) % 2 === 0 ? KT.A : KT.B
    x.mark(c, r0, t)
    x.mark(c, r0 + 1, t)
  }
  // Big window + door under the awning.
  const mid = S.c + ((E.c - S.c) >> 1)
  for (let c = S.c + 2; c < mid; c++) {
    for (let i = 2; i <= 4; i++) x.mark(c, box.base(c) - i, KT.SKY)
  }
  doorOn(x, box, mid + 1, 2, 4)
}

/** Church: gabled nave + a spired corner tower with a cross. */
function drawChurch(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const nave = extrudeBox(x, ix, iy, w, d, h)
  gableRoof(x, nave, 5, 5)
  const dc = nave.S.c + ((nave.E.c - nave.S.c) >> 1)
  doorOn(x, nave, dc, 2, 5)
  // Tower at the front corner, taller, with a spike and a cross.
  const tower = extrudeBox(x, ix + w - 1, iy + d - 1, 1, 1, h + 7)
  const mid = tower.W.c + ((tower.E.c - tower.W.c) >> 1)
  for (let c = tower.W.c; c <= tower.E.c; c++) {
    const rise = Math.max(0, 6 - Math.abs(c - mid))
    for (let r = tower.flatTop(c) - rise; r <= tower.rim(c); r++) x.mark(c, r, KT.A)
  }
  const tip = tower.flatTop(mid) - 7
  for (let i = 0; i < 4; i++) x.mark(mid, tip - i, KT.A)
  x.mark(mid - 1, tip - 2, KT.A)
  x.mark(mid + 1, tip - 2, KT.A)
  x.mark(mid, tower.rim(mid) + 3, KT.SKY) // belfry slit
}

/** Warehouse: barrel roof with curve bands, wide sliding door. */
function drawWarehouse(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const box = extrudeBox(x, ix, iy, w, d, h)
  const { W, E, rim, flatTop } = box
  const mid = W.c + ((E.c - W.c) >> 1)
  const half = Math.max(1, (E.c - W.c) >> 1)
  for (let c = W.c; c <= E.c; c++) {
    const u = (c - mid) / half
    const rise = Math.round(5 * Math.sqrt(Math.max(0, 1 - u * u)))
    for (let r = flatTop(c) - rise; r <= rim(c); r++) {
      x.mark(c, r, (c - W.c) % 4 === 0 ? KT.B : KT.A)
    }
  }
  const dc = box.S.c + ((box.E.c - box.S.c) >> 1) - 2
  doorOn(x, box, dc, 5, 5)
}

/** Terrace: a row of gabled house modules with doors and chimneys. */
function drawTerrace(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const box = extrudeBox(x, ix, iy, w, d, h)
  const { W, E, rim, flatTop } = box
  const moduleW = Math.max(4, Math.round((E.c - W.c) / w))
  for (let c = W.c; c <= E.c; c++) {
    const local = (c - W.c) % moduleW
    const rise = Math.min(Math.min(local, moduleW - local) >> 1, 4)
    // Two-tone pitches per module so each gable reads.
    const tone = local < moduleW / 2 ? KT.A : KT.B
    for (let r = flatTop(c) - rise; r <= rim(c); r++) x.mark(c, r, tone)
    if (local === 0 && c > W.c && c < E.c) {
      for (let r = flatTop(c); r <= rim(c); r++) x.mark(c, r, KT.SKY) // seam
      x.mark(c, flatTop(c) - 1, KT.A) // chimney
      x.mark(c, flatTop(c) - 2, KT.A)
      x.mark(c, flatTop(c) - 3, KT.A)
    }
  }
  // A door + window per module on the right face.
  for (let c = box.S.c + 2; c < E.c - 1; c += moduleW) {
    doorOn(x, box, c, 1, 3)
    x.mark(c + 2, box.base(c + 2) - 5, KT.SKY)
  }
}

/** Spire: slender tower with a tall spike and stacked slit windows. */
function drawSpire(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const box = extrudeBox(x, ix, iy, w, d, h)
  const mid = box.W.c + ((box.E.c - box.W.c) >> 1)
  for (let c = box.W.c; c <= box.E.c; c++) {
    const rise = Math.max(0, 8 - Math.abs(c - mid) * 2)
    for (let r = box.flatTop(c) - rise; r <= box.rim(c); r++) x.mark(c, r, KT.A)
  }
  for (let r = box.rim(mid) + 3; r <= box.base(mid) - 3; r += 4) {
    x.mark(mid + 2, r, KT.SKY)
    x.mark(mid - 2, r, KT.SKY)
  }
  x.mark(mid, box.flatTop(mid) - 9, KT.A) // finial
}

function drawBlock(x: Ctx, ix: number, iy: number, w: number, d: number, h: number) {
  const box = extrudeBox(x, ix, iy, w, d, h)
  const { W, S, E, rim, base, flatTop } = box
  for (let c = W.c + 1; c < E.c; c++) {
    if (c === S.c) continue
    const u = c <= S.c ? c - W.c : c - S.c
    if (u % 3 !== 1) continue
    for (let r = rim(c) + 2; r <= base(c) - 2; r++) {
      const v = r - rim(c)
      if (v % 4 === 2 || v % 4 === 3) x.mark(c, r, KT.SKY)
    }
  }
  for (let c = W.c; c <= E.c; c++) {
    for (let r = flatTop(c); r <= rim(c); r++) x.mark(c, r, KT.A)
    if ((c - W.c) % 2 === 0) x.mark(c, rim(c) + 1, KT.A) // zigzag teeth
  }
  const dc = S.c + ((E.c - S.c) >> 1)
  doorOn(x, box, dc, 1, 4)
}

function drawPyramid(x: Ctx, ix: number, iy: number, w: number, h: number) {
  const { o, mark } = x
  const W = isoToCell(ix, iy + w, o)
  const S = isoToCell(ix + w, iy + w, o)
  const E = isoToCell(ix + w, iy, o)
  const center = isoToCell(ix + w / 2, iy + w / 2, o)
  const centerC = Math.round(center.c)
  const apexR = Math.round(center.r) - h
  const base = (c: number) => (c <= S.c ? W.r + ((c - W.c) >> 1) : S.r - ((c - S.c) >> 1))
  for (let c = W.c; c <= E.c; c++) {
    const top = apexR + (Math.abs(c - centerC) >> 1)
    for (let r = top; r <= base(c); r++) {
      mark(c, r, c < centerC ? KT.B : KT.A)
    }
  }
  mark(centerC, apexR - 1, KT.A) // capstone
}

/* ---------------- bridge (truss over a band) ---------------- */

/** Plot a straight segment in tile space with elevation, 1px thick. */
function plot(x: Ctx, ix0: number, iy0: number, e0: number, ix1: number, iy1: number, e1: number, tone: number) {
  const { o, mark } = x
  const steps = Math.max(8, Math.round((Math.abs(ix1 - ix0) + Math.abs(iy1 - iy0)) * TILE_W))
  for (let sIdx = 0; sIdx <= steps; sIdx++) {
    const t = sIdx / steps
    const q = isoToCell(ix0 + (ix1 - ix0) * t, iy0 + (iy1 - iy0) * t, o)
    // isoToCell is fractional for fractional tiles; typed-array writes at
    // fractional indices silently no-op, so snap to the pixel grid here.
    mark(Math.round(q.c), Math.round(q.r - (e0 + (e1 - e0) * t)), tone)
  }
}

/** Truss over the tile row at iyC: posts both sides, top chords, cross
 *  beams, X diagonals. Place it over a road/river/rail band. */
function drawBridge(x: Ctx, ix0: number, iyC: number, span: number, h: number) {
  const center = iyC + 0.5
  const far = center - 0.65
  const near = center + 0.65
  const bays: number[] = []
  for (let ix = ix0 + 1; ix <= ix0 + span - 1; ix += 2) bays.push(ix)
  if (bays.length < 2) bays.push(ix0 + span - 1)
  for (const iy of [far, near]) {
    for (const ix of bays) {
      plot(x, ix, iy, 0, ix, iy, h, KT.A)
      const q = isoToCell(ix, iy, x.o)
      x.mark(Math.round(q.c) + 1, Math.round(q.r), KT.A) // post foot
    }
    plot(x, bays[0], iy, h, bays[bays.length - 1], iy, h, KT.A)
    for (let bIdx = 0; bIdx + 1 < bays.length; bIdx++) {
      plot(x, bays[bIdx], iy, h, bays[bIdx + 1], iy, 2, KT.B)
      plot(x, bays[bIdx], iy, 2, bays[bIdx + 1], iy, h, KT.B)
    }
  }
  for (const ix of bays) plot(x, ix, far, h, ix, near, h, KT.A)
}

/* ---------------- the scene bake ---------------- */

const SCRATCH_C = 224
const SCRATCH_R = 176

export interface KitBaked {
  grid: Grid
  bounds: { minC: number; minR: number; maxC: number; maxR: number }
  origin: IsoOrigin
}

/** Footprint of an item in plate tiles. */
export function footprintOf(item: KitRecipe): { w: number; d: number } {
  if (item.type === 'pyramid') return { w: item.w, d: item.w }
  if (item.type === 'bridge') return { w: item.w, d: 2 }
  return { w: item.w, d: item.d }
}

export interface FitOptions {
  /** Item index in scene.items to skip (the item being moved/edited). */
  ignore?: number
  /** Clearance + band-setback rules (default true). rules: false is the
   *  old footprint-only check, used when loading stored scenes so new
   *  rules never silently prune what someone already built. */
  rules?: boolean
}

/** Whether an item can go at (ix, iy): inside the plate, and (with rules)
 *  respecting clearance gaps and band setbacks so pieces don't blend. */
export function sceneFits(scene: KitScene, item: SceneItem, opts: FitOptions = {}): boolean {
  const rules = opts.rules !== false
  const others = scene.items.map((it, i) => ({ it, i })).filter(({ i }) => i !== opts.ignore)

  if (isBand(item.type)) {
    if (item.iy < 0 || item.iy >= scene.d) return false
    if (rules) {
      for (const { it } of others) {
        // Bands occupy rows [iy-1, iy+1]; 3 apart keeps a clear row between.
        if (isBand(it.type)) {
          if (Math.abs(item.iy - it.iy) < 3) return false
        } else if (it.type !== 'bridge') {
          // Symmetric setback: a new band can't run through the rows an
          // existing structure occupies (plus the band's own spill).
          const f2 = footprintOf(it)
          if (it.iy <= item.iy + 1 && item.iy - 1 <= it.iy + f2.d - 1) return false
        }
      }
    }
    return true
  }

  const f = footprintOf(item)
  if (item.ix < 0 || item.iy < 0 || item.ix + f.w > scene.w || item.iy + f.d > scene.d) return false
  if (item.type === 'bridge') return true // belongs over bands

  if (rules) {
    // Setback: stay off the rows a band occupies.
    for (const { it } of others) {
      if (!isBand(it.type)) continue
      if (item.iy <= it.iy + 1 && it.iy - 1 <= item.iy + f.d - 1) return false
    }
  }

  for (const { it: other } of others) {
    if (isBand(other.type) || other.type === 'bridge') continue
    const of = footprintOf(other)
    const g = rules ? Math.max(KIT_CLEARANCE[item.type], KIT_CLEARANCE[other.type]) : 0
    if (
      item.ix - g < other.ix + of.w &&
      other.ix < item.ix + f.w + g &&
      item.iy - g < other.iy + of.d &&
      other.iy < item.iy + f.d + g
    ) {
      return false
    }
  }
  return true
}

export function bakeKitScene(scene: KitScene): KitBaked {
  const g = makeGrid(SCRATCH_C, SCRATCH_R)
  const bounds = { minC: SCRATCH_C, minR: SCRATCH_R, maxC: 0, maxR: 0 }
  const ctx: Ctx = {
    g,
    o: { cx: 0, cy: 0 },
    seed: 7,
    id: 0,
    mark(c, r, tone) {
      if (c < 0 || c >= g.cols || r < 0 || r >= g.rows) return
      g.tone[r * g.cols + c] = tone
      g.ids[r * g.cols + c] = ctx.id
      if (c < bounds.minC) bounds.minC = c
      if (c > bounds.maxC) bounds.maxC = c
      if (r < bounds.minR) bounds.minR = r
      if (r > bounds.maxR) bounds.maxR = r
    },
  }
  ctx.o = {
    cx: Math.round(SCRATCH_C / 2 - ((scene.w - scene.d) * HW) / 2),
    cy: Math.min(104, Math.max(28, SCRATCH_R - (scene.w + scene.d) * HH - 20)),
  }

  ctx.id = 0
  ctx.seed = scene.seed ?? 7
  drawPlate(ctx, scene.w, scene.d)

  // Bands first (under everything), then structures back to front.
  const order = [...scene.items.entries()].sort((a, b) => {
    const ia = a[1]
    const ib = b[1]
    const bandA = isBand(ia.type) ? 0 : 1
    const bandB = isBand(ib.type) ? 0 : 1
    if (bandA !== bandB) return bandA - bandB
    const fa = footprintOf(ia)
    const fb = footprintOf(ib)
    return ia.ix + fa.w + ia.iy + fa.d - (ib.ix + fb.w + ib.iy + fb.d)
  })

  for (const [index, item] of order) {
    ctx.id = index + 1
    ctx.seed = item.seed
    const { type, ix, iy, w, h } = item
    const d = item.d
    if (type === 'road') drawRoad(ctx, scene.w, scene.d, iy + 0.5)
    else if (type === 'river') drawRiver(ctx, scene.w, scene.d, iy + 0.5)
    else if (type === 'rail') drawRail(ctx, scene.w, scene.d, iy + 0.5)
    else if (type === 'tree') drawTree(ctx, ix, iy, h)
    else if (type === 'cactus') drawCactus(ctx, ix, iy, h)
    else if (type === 'house') drawHouse(ctx, ix, iy, w, d, h)
    else if (type === 'shop') drawShop(ctx, ix, iy, w, d, h)
    else if (type === 'church') drawChurch(ctx, ix, iy, w, d, h)
    else if (type === 'warehouse') drawWarehouse(ctx, ix, iy, w, d, h)
    else if (type === 'terrace') drawTerrace(ctx, ix, iy, w, d, h)
    else if (type === 'spire') drawSpire(ctx, ix, iy, w, d, h)
    else if (type === 'block') drawBlock(ctx, ix, iy, w, d, h)
    else if (type === 'pyramid') drawPyramid(ctx, ix, iy, w, h)
    else if (type === 'bridge') drawBridge(ctx, ix, iy, w, h)
  }

  bounds.minC = Math.max(0, bounds.minC - 1)
  bounds.minR = Math.max(0, bounds.minR - 1)
  bounds.maxC = Math.min(SCRATCH_C - 1, bounds.maxC + 1)
  bounds.maxR = Math.min(SCRATCH_R - 1, bounds.maxR + 1)
  return { grid: g, bounds, origin: ctx.o }
}

/** The single-object preview as a one-item scene on a fitted plate. */
export function objectToScene(r: KitRecipe): KitScene {
  if (r.type === 'plate') return { w: r.w, d: r.d, seed: r.seed, items: [] }
  if (isBand(r.type)) {
    return { w: r.w, d: r.d, seed: r.seed, items: [{ ...r, ix: 0, iy: Math.floor((r.d - 1) / 2) }] }
  }
  if (r.type === 'bridge') {
    return {
      w: r.w,
      d: 3,
      seed: r.seed,
      items: [
        { ...KIT_DEFAULTS.road, w: r.w, seed: r.seed, ix: 0, iy: 1 },
        { ...r, ix: 0, iy: 1 },
      ],
    }
  }
  const f = footprintOf(r)
  return { w: f.w + 2, d: f.d + 2, seed: r.seed, items: [{ ...r, ix: 1, iy: 1 }] }
}

/** A little random town, for the "surprise me" button: a main street of
 *  structures facing the road, maybe a second band (with a bridge over a
 *  river), a feature piece or two, trees in the gaps. Everything goes
 *  through the rules-checking sceneFits, so nothing overlaps or blends.
 *  Deterministic per seed. */
export function randomScene(seed: number): KitScene {
  const rnd = (n: number) => hashNoise(n, 47, seed)
  const w = 8 + Math.floor(rnd(1) * 4)
  const d = 6 + Math.floor(rnd(2) * 4)
  const scene: KitScene = { w, d, seed, items: [] }
  const cap = Math.floor((w * d) / 8) // non-band pieces
  let count = 0
  const tryAdd = (item: SceneItem): boolean => {
    if (count >= cap) return false
    if (!sceneFits(scene, item, { rules: true })) return false
    scene.items.push(item)
    count++
    return true
  }

  // Main street: a road with at least 3 rows above for door-facing fronts.
  const roadIy = Math.min(d - 2, Math.max(3, 3 + Math.floor(rnd(3) * (d - 4))))
  scene.items.push({ ...KIT_DEFAULTS.road, seed, ix: 0, iy: roadIy })

  // Street structures above the road, doors facing it, with breathing gaps.
  const street: KitType[] = ['house', 'shop', 'terrace', 'warehouse', 'church']
  let ix = Math.floor(rnd(5) * 2)
  for (let k = 0; k < 6 && ix < w; k++) {
    const type = street[Math.floor(rnd(10 + k) * street.length)]
    const def = KIT_DEFAULTS[type]
    const item: SceneItem = { ...def, seed: seed + k, ix, iy: roadIy - def.d - 1 }
    if (tryAdd(item)) ix += footprintOf(item).w + 1 + Math.floor(rnd(20 + k) * 2)
    else ix += 1
  }

  // Sometimes a second band; a bridge over it when it is a river.
  if (rnd(4) > 0.45) {
    const bandType: KitType = rnd(6) > 0.5 ? 'river' : 'rail'
    for (const cand of [roadIy + 3, roadIy - 3, d - 1, 0]) {
      const band: SceneItem = { ...KIT_DEFAULTS[bandType], seed: seed + 1, ix: 0, iy: cand }
      if (sceneFits(scene, band, { rules: true })) {
        scene.items.push(band)
        if (bandType === 'river' && rnd(7) > 0.5) {
          const span = Math.min(w, 4 + Math.floor(rnd(8) * 3))
          scene.items.push({
            ...KIT_DEFAULTS.bridge, w: span, seed: seed + 2,
            ix: Math.floor(rnd(9) * Math.max(1, w - span)), iy: cand,
          })
        }
        break
      }
    }
  }

  // A feature piece or two, anywhere the rules allow.
  const features: KitType[] = ['spire', 'block', 'pyramid', 'church']
  for (let n = 0; n < 2; n++) {
    const type = features[Math.floor(rnd(40 + n) * features.length)]
    const def = KIT_DEFAULTS[type]
    for (let a = 0; a < 12; a++) {
      const item: SceneItem = {
        ...def, seed: seed + 50 + n,
        ix: Math.floor(rnd(60 + n * 12 + a) * w),
        iy: Math.floor(rnd(90 + n * 12 + a) * d),
      }
      if (tryAdd(item)) break
    }
  }

  // Trees (and the odd cactus) fill the remaining room.
  for (let a = 0; a < 24 && count < cap; a++) {
    const type: KitType = rnd(120 + a) > 0.9 ? 'cactus' : 'tree'
    tryAdd({
      ...KIT_DEFAULTS[type], seed: seed + 100 + a,
      ix: Math.floor(rnd(140 + a) * w),
      iy: Math.floor(rnd(170 + a) * d),
    })
  }
  return scene
}
