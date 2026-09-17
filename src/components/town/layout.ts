/**
 * town/layout — the fixed town: which buildings exist, where they sit on
 * the tile grid, and what they map to. Names come from docs/rpg-structure's
 * world-map table; routes match src/game/locations.ts, so entering a
 * building just navigates and RouteEffects handles the arrival line + XP.
 *
 * LAYOUT INVARIANT (load-bearing for a future walkable character): every
 * building keeps its masses north of the plaza's open ground, and no
 * building sits south of walkable tiles. A character layer can therefore
 * always draw on top of the baked statics with no per-frame depth sorting.
 * If a foreground building is ever added, split the bake into back/front
 * layers at its depth instead.
 */

import { TILE_H, TILE_W, type IsoOrigin, type TownBuilding } from '../../lib/iso'

/** Ground diamond size in tiles. */
export const GRID = 10

/** Native scene size in ART PX (canvas = native x integer zoom). */
export const NATIVE_COLS = 176
export const NATIVE_ROWS = 104

/** Tile (0,0)'s top vertex. cy tuned so the tallest silhouette fits: the
 *  tower's rim sits at row 16 and its spire tip reaches ~row 2; the ground
 *  diamond spans rows 20..100 with 4 margin rows below. */
export const ORIGIN: IsoOrigin = { cx: NATIVE_COLS / 2, cy: 20 }

/** ID written into the hit buffer for the plaza bonfire (routes home). */
export const FIRE_ID = 100

export const TOWN: TownBuilding[] = [
  {
    id: 1,
    kind: 'library',
    path: '/notes',
    label: 'The Library',
    real: 'Notes',
    ix: 1, iy: 2, w: 3, d: 2, h: 18,
    roof: 'gable',
    door: 'right',
    seed: 11,
  },
  {
    id: 2,
    kind: 'keep',
    path: '/projects',
    label: 'Quest Log',
    real: 'Projects',
    ix: 4, iy: 0, w: 3, d: 2, h: 24,
    roof: 'flat',
    parts: [
      // The gatehouse carries the entrance down at plaza level.
      { dix: 0, diy: 2, w: 2, d: 1, h: 10, roof: 'flat', carriesDoor: true },
      // Cone-capped corner turret rising past the main parapet.
      { dix: 2, diy: 0, w: 1, d: 1, h: 30, roof: 'cone' },
    ],
    door: 'right',
    seed: 23,
  },
  {
    id: 3,
    kind: 'tower',
    path: '/lab',
    label: 'The Vault',
    real: 'Lab',
    ix: 8, iy: 1, w: 2, d: 2, h: 40,
    roof: 'cone',
    door: 'left',
    seed: 37,
  },
  {
    id: 4,
    kind: 'chapel',
    path: '/about',
    label: 'Hall of Records',
    real: 'About',
    ix: 1, iy: 5, w: 2, d: 2, h: 14,
    roof: 'gable',
    parts: [
      // Low apse on the shade side (a right-side apse would hide the door).
      { dix: -1, diy: 1, w: 1, d: 1, h: 8, roof: 'gable' },
    ],
    door: 'right',
    seed: 41,
  },
  {
    id: 5,
    kind: 'monument',
    path: '/character',
    label: 'Mirror Monument',
    real: 'Character',
    ix: 8, iy: 6, w: 1, d: 1, h: 12,
    roof: 'spike',
    door: 'left',
    seed: 53,
  },
  {
    id: 6,
    kind: 'well',
    path: null,
    label: 'The Old Well',
    real: '',
    ix: 4, iy: 8, w: 1, d: 1, h: 3,
    roof: 'flat',
    door: 'right',
    seed: 67,
  },
]

/** The bonfire's label plate copy (it routes to `/`). */
export const FIRE_LABEL = { label: 'The Crossroads', real: 'Home' }

/** Plaza bonfire patch, in tile coords of its center point. */
export const FIRE_TILE = { ix: 6, iy: 6.5 }
/** Bonfire sim size in art px. */
export const FIRE_COLS = 22
export const FIRE_ROWS = 16

/** Front-center tile just outside a building's entrance (character entry
 *  point; reserved for the walkable-character follow-up). Follows the
 *  door-carrying part when one exists. */
export function doorTileOf(b: TownBuilding): { ix: number; iy: number } {
  const p = (b.parts ?? []).find((x) => x.carriesDoor)
  const ix = b.ix + (p?.dix ?? 0)
  const iy = b.iy + (p?.diy ?? 0)
  const w = p?.w ?? b.w
  const d = p?.d ?? b.d
  return b.door === 'right'
    ? { ix: ix + Math.floor(w / 2), iy: iy + d }
    : { ix: ix + w, iy: iy + Math.floor(d / 2) }
}

/** Tile walkability mask (1 = open ground). Reserved for the character
 *  follow-up; kept here so the layout owns its own collision truth. */
export function buildWalkMask(): Uint8Array {
  const mask = new Uint8Array(GRID * GRID).fill(1)
  const block = (ix0: number, iy0: number, w: number, d: number) => {
    for (let iy = iy0; iy < iy0 + d; iy++) {
      for (let ix = ix0; ix < ix0 + w; ix++) {
        if (ix >= 0 && ix < GRID && iy >= 0 && iy < GRID) mask[iy * GRID + ix] = 0
      }
    }
  }
  for (const b of TOWN) {
    block(b.ix, b.iy, b.w, b.d)
    for (const p of b.parts ?? []) block(b.ix + p.dix, b.iy + p.diy, p.w, p.d)
  }
  mask[Math.floor(FIRE_TILE.iy) * GRID + Math.floor(FIRE_TILE.ix)] = 0
  return mask
}

// Referenced by TownScene for pointer->tile math (kept exported for the
// character follow-up, which needs the same origin).
export { TILE_W, TILE_H }
