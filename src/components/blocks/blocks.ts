/**
 * blocks — the fresh minimal-isometric foundation for the home-page map.
 *
 * The pipeline's atom: a unit cube (one 2:1 tile footprint, 8 px tall)
 * whose three faces each carry one of five treatments inside the
 * two-tone doctrine: dark (unpainted; the page ground), dim, ink, or a
 * 50% checker of either. A BlockDef is a designed block; stacks of
 * block ids compose into objects; grids of stacks compose into scenes.
 * One renderer draws them all.
 *
 * A Field is the render target: a tone byte per art pixel plus the tile
 * index that painted it, so taps resolve to tiles even on tall stacks.
 * Zoom, colour and interaction belong to the components.
 */

export const TILE_W = 16 // art px: tile diamond width
export const TILE_H = 8 // art px: tile diamond height (2:1)
export const CUBE_H = 8 // art px: one block's wall height

export const TONE = { NONE: 0, INK: 1, DIM: 2 } as const

export type FaceTone = 'dark' | 'dim' | 'ink' | 'checkDim' | 'checkInk'

export interface BlockDef {
  id: string
  name: string
  top: FaceTone
  right: FaceTone
  left: FaceTone
}

/** The original minimal block (Hausbau doctrine). */
export const CLASSIC: BlockDef = { id: 'classic', name: 'classic', top: 'ink', right: 'dim', left: 'dark' }

export type Resolve = (id: string) => BlockDef

/** A face treatment's tone at an art pixel (checkers use global parity
 *  so patterns stay continuous across faces and neighbours). */
function toneAt(face: FaceTone, c: number, r: number): number {
  switch (face) {
    case 'ink':
      return TONE.INK
    case 'dim':
      return TONE.DIM
    case 'checkInk':
      return (c + r) % 2 === 0 ? TONE.INK : TONE.NONE
    case 'checkDim':
      return (c + r) % 2 === 0 ? TONE.DIM : TONE.NONE
    default:
      return TONE.NONE
  }
}

export interface Field {
  w: number
  h: number
  /** Art-pixel tones (TONE values). */
  tone: Uint8Array
  /** Tile index that painted each pixel; -1 = nothing. */
  tile: Int16Array
  /** Grid origin: canvas art-px of tile (0,0)'s top vertex at z 0. */
  ox: number
  oy: number
}

/** Screen position of tile (ix, iy)'s diamond top vertex at elevation z. */
export function vertexOf(f: Field, ix: number, iy: number, z: number): { c: number; r: number } {
  return {
    c: f.ox + (ix - iy) * (TILE_W / 2),
    r: f.oy + (ix + iy) * (TILE_H / 2) - z * CUBE_H,
  }
}

function put(f: Field, c: number, r: number, tone: number, tile: number) {
  if (c < 0 || c >= f.w || r < 0 || r >= f.h) return
  const i = r * f.w + c
  f.tone[i] = tone
  f.tile[i] = tile
}

/** Visit every art pixel of a tile-top diamond (top vertex at c, r). */
export function forEachDiamondCell(
  c: number,
  r: number,
  cb: (x: number, y: number) => void,
): void {
  for (let dy = 0; dy < TILE_H; dy++) {
    for (let dx = -TILE_W / 2; dx < TILE_W / 2; dx++) {
      const nx = Math.abs(dx + 0.5) / (TILE_W / 2)
      const ny = Math.abs(dy + 0.5 - TILE_H / 2) / (TILE_H / 2)
      if (nx + ny < 1) cb(c + dx, r + dy)
    }
  }
}

function drawCube(f: Field, ix: number, iy: number, z: number, tile: number, def: BlockDef, topVisible: boolean) {
  const v = vertexOf(f, ix, iy, z)
  if (topVisible && def.top !== 'dark') {
    forEachDiamondCell(v.c, v.r, (x, y) => {
      const t = toneAt(def.top, x, y)
      if (t !== TONE.NONE) put(f, x, y, t, tile)
    })
  }
  // Right face: hangs from the lower-right diamond edge, CUBE_H tall.
  if (def.right !== 'dark') {
    for (let dx = 0; dx < TILE_W / 2; dx++) {
      const edgeY = Math.round(v.r + TILE_H - (dx + 0.5) / 2 - 0.5)
      for (let dy = 0; dy < CUBE_H; dy++) {
        const t = toneAt(def.right, v.c + dx, edgeY + dy)
        if (t !== TONE.NONE) put(f, v.c + dx, edgeY + dy, t, tile)
      }
    }
  }
  // Left face: mirror, from the lower-left diamond edge.
  if (def.left !== 'dark') {
    for (let dx = -TILE_W / 2; dx < 0; dx++) {
      const edgeY = Math.round(v.r + TILE_H + (dx + 0.5) / 2 - 0.5)
      for (let dy = 0; dy < CUBE_H; dy++) {
        const t = toneAt(def.left, v.c + dx, edgeY + dy)
        if (t !== TONE.NONE) put(f, v.c + dx, edgeY + dy, t, tile)
      }
    }
  }
}

export interface RenderOpts {
  /** Corner-dot lattice on the ground plane (default true). */
  lattice?: boolean
  /** Sky rows to reserve above (defaults to fit maxH cubes). */
  maxH?: number
}

/**
 * Render a grid of block stacks (per-tile arrays of block ids, bottom
 * up) into a Field, back to front. Covered tops are skipped; every
 * painted pixel records its tile for hit-testing.
 */
export function renderStacks(
  stacks: ReadonlyArray<ReadonlyArray<string>>,
  gw: number,
  gh: number,
  resolve: Resolve,
  opts: RenderOpts = {},
): Field {
  const lattice = opts.lattice !== false
  const maxH = opts.maxH ?? Math.max(1, ...stacks.map((s) => s.length))
  const w = (gw + gh) * (TILE_W / 2) + 8
  const h = (gw + gh) * (TILE_H / 2) + maxH * CUBE_H + TILE_H + 8
  const f: Field = {
    w,
    h,
    tone: new Uint8Array(w * h),
    tile: new Int16Array(w * h).fill(-1),
    ox: gh * (TILE_W / 2) + 4,
    oy: maxH * CUBE_H + 4,
  }

  if (lattice) {
    for (let iy = 0; iy <= gh; iy++) {
      for (let ix = 0; ix <= gw; ix++) {
        const v = vertexOf(f, ix, iy, 0)
        put(f, v.c, v.r, TONE.DIM, -1)
      }
    }
  }

  // Back to front (row-major is painter-correct for unit tiles).
  for (let iy = 0; iy < gh; iy++) {
    for (let ix = 0; ix < gw; ix++) {
      const stack = stacks[iy * gw + ix] ?? []
      for (let z = 0; z < stack.length; z++) {
        drawCube(f, ix, iy, z, iy * gw + ix, resolve(stack[z]), z === stack.length - 1)
      }
    }
  }
  return f
}

/** Resolve an art pixel to a tile: painted pixels know their tile (works
 *  on tall stacks); empty pixels fall back to ground-plane math. */
export function tileAt(f: Field, c: number, r: number, gw: number, gh: number): number {
  if (c < 0 || c >= f.w || r < 0 || r >= f.h) return -1
  const hit = f.tile[r * f.w + c]
  if (hit >= 0) return hit
  // A tile's diamond sits BELOW its top vertex (its centre is TILE_H/2
  // lower), so sample from the centre, not the vertex, or empty-ground
  // clicks resolve one tile too far back. Round to the nearest tile
  // centre so a tap lands on the tile it visually points at.
  const diff = (c + 0.5 - f.ox) / (TILE_W / 2) // ix - iy
  const sum = (r + 0.5 - f.oy - TILE_H / 2) / (TILE_H / 2) // ix + iy
  const ix = Math.round((sum + diff) / 2)
  const iy = Math.round((sum - diff) / 2)
  if (ix < 0 || ix >= gw || iy < 0 || iy >= gh) return -1
  return iy * gw + ix
}

/** Paint a Field to a canvas context at integer zoom. */
export function paintField(
  ctx: CanvasRenderingContext2D,
  f: Field,
  zoom: number,
  ink: string,
  dim: string,
): void {
  for (let r = 0; r < f.h; r++) {
    for (let c = 0; c < f.w; c++) {
      const t = f.tone[r * f.w + c]
      if (t === TONE.NONE) continue
      ctx.fillStyle = t === TONE.INK ? ink : dim
      ctx.fillRect(c * zoom, r * zoom, zoom, zoom)
    }
  }
}
