/**
 * iso — 2:1 dimetric ("isometric" pixel-art) grid math for the town scene.
 *
 * Works in ART PIXELS: one grid cell is one pixel of artwork, displayed at
 * an integer zoom by the scene (2x on phones, 4x on desktop). One tile
 * diamond is TILE_W x TILE_H art px, the classic 2:1 projection where
 * every diagonal edge steps 2 columns per row. Tile coords (ix, iy) run
 * along the two ground axes; cell coords (c, r) are canvas art pixels.
 */

export const TILE_W = 16 // art px per tile diamond width
export const TILE_H = 8 // art px per tile diamond height (2:1)

/** Cell coords of tile grid point (0, 0)'s top vertex. */
export interface IsoOrigin {
  cx: number
  cy: number
}

/** Tile grid point (ix, iy) -> cell coords of that diamond vertex. */
export function isoToCell(ix: number, iy: number, o: IsoOrigin): { c: number; r: number } {
  return {
    c: o.cx + (ix - iy) * (TILE_W / 2),
    r: o.cy + (ix + iy) * (TILE_H / 2),
  }
}

/** Inverse of isoToCell (fractional), for pointer -> tile lookups. */
export function cellToIso(c: number, r: number, o: IsoOrigin): { ix: number; iy: number } {
  const u = (c - o.cx) / (TILE_W / 2)
  const v = (r - o.cy) / (TILE_H / 2)
  return { ix: (v + u) / 2, iy: (v - u) / 2 }
}

export type RoofKind = 'flat' | 'gable' | 'cone' | 'spike'

/** An attached mass (gatehouse, turret, apse) offset from its building's
 *  footprint. Shares the building's id, so hit-testing and hover treat
 *  the composed silhouette as one target. */
export interface BuildingPart {
  dix: number
  diy: number
  w: number
  d: number
  h: number
  roof: RoofKind
  /** This part carries the entrance (arch door + character door tile). */
  carriesDoor?: boolean
}

export type BuildingKind = 'keep' | 'library' | 'tower' | 'chapel' | 'monument' | 'well'

export interface TownBuilding {
  /** 1-based; written into the hit-test ID buffer (0 = nothing). */
  id: number
  kind: BuildingKind
  /** Route to enter, or null for secrets/decoration. */
  path: string | null
  /** RPG name shown on the hover plate ("Quest Log"). */
  label: string
  /** Page name ("Projects"), matching LOCATIONS.real. */
  real: string
  /** Main footprint in tiles. */
  ix: number
  iy: number
  w: number
  d: number
  /** Main wall height in art px. */
  h: number
  roof: RoofKind
  parts?: BuildingPart[]
  /** Which visible face carries the door (left = SW face, right = SE). */
  door: 'left' | 'right'
  /** Deterministic dressing variation. */
  seed: number
}

/**
 * Painter depth of a building including its attached parts: sort ascending
 * and draw, and nearer (screen-lower) masses correctly overpaint farther
 * ones. Parts can extend forward of the main footprint, so they count.
 */
export function depthOf(b: {
  ix: number
  iy: number
  w: number
  d: number
  parts?: BuildingPart[]
}): number {
  let depth = b.ix + b.w + b.iy + b.d
  for (const p of b.parts ?? []) {
    depth = Math.max(depth, b.ix + p.dix + p.w + b.iy + p.diy + p.d)
  }
  return depth
}
