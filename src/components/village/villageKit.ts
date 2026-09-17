/**
 * villageKit — a faithful read-only port of the onebit-kit Village Kit
 * Builder's compositing + flow-layout engine (public/village/index.html),
 * so exported scene recipes render natively on the site (the village
 * home page) instead of inside the sandboxed iframe tool.
 *
 * Ported semantics (verbatim constants from the tool):
 * - parts are ASCII bitmaps; XWGSB = ink, 'H' = ink + manual highlight,
 *   'o' = opaque paper (erases), '.' = transparent
 * - bitmap values: 0 empty/paper, 1 ink, 2 accent, 3 manual highlight
 * - stackers: house/tower (storeys overlap 1px, roof drop), castle
 *   (three houses side by side, bottom-aligned), tree (stretched trunk
 *   + anchored canopy)
 * - flow layout: GAP=4 ROWGAP=10 PAD=6 art px, wrap at width, per-item
 *   gap/break/lift, center/left align, dotted ground line per row
 * - 'live' cue: enclosed-hole highlights promoted to accent, staggered
 *   idle bob, two twinkling glints per tappable, 300ms beat
 * - active 'invert' style: bounding box +1px toggled
 *
 * Not ported (unused by the site): the 3x5 pixel font, marker/label
 * cues, the phone bezel. Labels render as DOM text in the scene
 * component instead (same mechanism as the tool's CSS labels).
 */

import { CATALOG, type VillagePart } from './catalog.gen'

export const GAP = 4
export const ROWGAP = 10
export const PAD = 6
export const LABEL_H = 24 // css px reserved under a labeled row
export const BEAT_MS = 300 // live-cue animation beat

export interface TapSpec {
  label: string
  href: string
  style?: 'invert' | 'lift' | 'outline'
}
export interface HouseSpec {
  storeys: string[]
  roof?: string
  roofDrop?: number
}
export interface TreeSpec {
  canopy?: string
  trunk?: string
  height?: number
  dx?: number
  dy?: number
}
export interface CastleSpec {
  left: HouseSpec
  wall: HouseSpec
  right?: HouseSpec
}
export interface VillageItem {
  part?: string
  tree?: TreeSpec
  castle?: CastleSpec
  house?: HouseSpec
  lift?: number
  break?: boolean
  gap?: number
  tap?: TapSpec
}

export interface Bitmap {
  w: number
  h: number
  px: Uint8Array
}

// ---- part registry: catalog + synthesized *_inv twins for 'upper' parts
const parts = new Map<string, VillagePart>()
for (const p of CATALOG) parts.set(p.name, p)
for (const p of CATALOG) {
  if (p.cat === 'upper') {
    parts.set(p.name + '_inv', {
      name: p.name + '_inv',
      cat: 'upper',
      kind: 'sprite',
      w: p.w,
      h: p.h,
      rows: p.rows.map((r) => [...r].map((c) => (c === '.' ? 'X' : '.')).join('')),
    })
  }
}
export const getPart = (name: string) => parts.get(name)

const blank = (w: number, h: number): Bitmap => ({ w, h, px: new Uint8Array(w * h) })

const isInk = (p: VillagePart, x: number, y: number) =>
  y >= 0 && y < p.h && x >= 0 && x < p.w && p.rows[y][x] !== '.' && p.rows[y][x] !== 'o'
const isPaper = (p: VillagePart, x: number, y: number) =>
  y >= 0 && y < p.h && x >= 0 && x < p.w && p.rows[y][x] === 'o'

function stampPart(b: Bitmap, p: VillagePart, ox: number, oy: number) {
  for (let y = 0; y < p.h; y++)
    for (let x = 0; x < p.w; x++) {
      const X = ox + x
      const Y = oy + y
      if (X < 0 || Y < 0 || X >= b.w || Y >= b.h) continue
      if (isInk(p, x, y)) b.px[Y * b.w + X] = p.rows[y][x] === 'H' ? 3 : 1
      else if (isPaper(p, x, y)) b.px[Y * b.w + X] = 0
    }
}

/** Copy non-zero pixels; v forces a value (the accent cue), else source. */
function stampBmp(b: Bitmap, s: Bitmap, ox: number, oy: number, v?: number) {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const sv = s.px[y * s.w + x]
      if (sv) {
        const X = ox + x
        const Y = oy + y
        if (X >= 0 && Y >= 0 && X < b.w && Y < b.h) b.px[Y * b.w + X] = v || sv
      }
    }
}

/** Crop to the ink bounds. Exported for VillageIcon, which needs tight
 *  bounds to scale a part into a fixed icon box. */
export function trim(b: Bitmap): Bitmap {
  let minX = b.w
  let minY = b.h
  let maxX = -1
  let maxY = -1
  for (let y = 0; y < b.h; y++)
    for (let x = 0; x < b.w; x++)
      if (b.px[y * b.w + x]) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
  if (maxX < 0) return blank(1, 1)
  const t = blank(maxX - minX + 1, maxY - minY + 1)
  for (let y = minY; y <= maxY; y++)
    for (let x = minX; x <= maxX; x++) t.px[(y - minY) * t.w + (x - minX)] = b.px[y * b.w + x]
  return t
}

const partBmp = (p: VillagePart): Bitmap => {
  const b = blank(p.w, p.h)
  stampPart(b, p, 0, 0)
  return b
}

/** House/tower stack: storeys bottom->top overlapping 1px, centered, roof on top. */
function house(h: HouseSpec): Bitmap {
  const walls = h.storeys.map((n) => parts.get(n)).filter(Boolean) as VillagePart[]
  const roof = h.roof ? parts.get(h.roof) : undefined
  const W = Math.max(roof ? roof.w : 0, ...walls.map((w) => w.w), 1)
  const wallH = walls.reduce((a, w) => a + w.h - 1, 1)
  const b = blank(W, wallH + (roof ? roof.h : 0))
  let y = b.h
  for (const w of walls) {
    y -= w.h
    stampPart(b, w, Math.floor((W - w.w) / 2), y)
    y += 1
  }
  if (roof) {
    const drop = h.roofDrop != null ? h.roofDrop : +((roof.meta && roof.meta.drop) || 0)
    stampPart(b, roof, Math.floor((W - roof.w) / 2), y - 1 - roof.h + drop)
  }
  return trim(b)
}

function castle(c: CastleSpec): Bitmap {
  const L = house(c.left)
  const Wl = house(c.wall)
  const R = house(c.right || c.left)
  const H = Math.max(L.h, Wl.h, R.h)
  const b = blank(L.w + Wl.w + R.w, H)
  stampBmp(b, L, 0, H - L.h)
  stampBmp(b, Wl, L.w, H - Wl.h)
  stampBmp(b, R, L.w + Wl.w, H - R.h)
  return b
}

function tree(t: TreeSpec): Bitmap {
  const tp = t.trunk ? parts.get(t.trunk.startsWith('trunk_') ? t.trunk : 'trunk_' + t.trunk) : null
  const cp = t.canopy
    ? parts.get(t.canopy.startsWith('canopy_') ? t.canopy : 'canopy_' + t.canopy)
    : null
  if (!tp && !cp) return blank(1, 1)
  const extra = Math.max(0, (t.height ?? 0) | 0)
  let trunk: Bitmap | null = null
  let topX = 0
  if (tp) {
    const sr = +(tp.meta && tp.meta.stretch != null ? tp.meta.stretch : Math.floor(tp.h / 2))
    topX = +(tp.meta && tp.meta.top != null ? tp.meta.top : Math.floor(tp.w / 2))
    trunk = blank(tp.w, tp.h + extra)
    for (let y = 0; y < trunk.h; y++) {
      const sy = y <= sr ? y : y - extra > sr ? y - extra : sr
      for (let x = 0; x < tp.w; x++) if (isInk(tp, x, sy)) trunk.px[y * trunk.w + x] = 1
    }
  }
  const [ax, ay] = cp && cp.meta && cp.meta.anchor ? cp.meta.anchor : [0, 0]
  const cx = trunk ? topX - ax + ((t.dx ?? 0) | 0) : 0
  const cy = trunk ? -ay + ((t.dy ?? 0) | 0) : 0
  const minX = Math.min(0, cx)
  const minY = Math.min(0, cy)
  const W = Math.max(trunk ? trunk.w : 0, cp ? cx + cp.w : 0) - minX
  const H = Math.max(trunk ? trunk.h : 0, cp ? cy + cp.h : 0) - minY
  const b = blank(W, H)
  if (trunk) stampBmp(b, trunk, -minX, -minY)
  if (cp) stampPart(b, cp, cx - minX, cy - minY)
  return b
}

export const itemBmp = (it: VillageItem): Bitmap =>
  it.part
    ? partBmp(parts.get(it.part) ?? { name: '?', w: 1, h: 1, cat: 'prop', kind: 'sprite', rows: ['.'] })
    : it.tree
      ? tree(it.tree)
      : it.castle
        ? castle(it.castle)
        : house(it.house ?? { storeys: [] })

// ---- flow layout ----------------------------------------------------------

export interface Placement {
  x: number
  y: number
}
export interface LayoutRow {
  top: number
  h: number
}
export interface Layout {
  pos: Placement[]
  rows: LayoutRow[]
  H: number
}

/**
 * The tool's text-like flow: wrap at W-PAD, row height from the tallest
 * lifted item plus the live cue's 4px headroom, bottoms on the row
 * baseline. footPx reserves label room below each row (art px).
 */
export function layoutItems(
  items: VillageItem[],
  bs: Bitmap[],
  W: number,
  opts: { align: 'left' | 'center'; head: number; foot: number },
): Layout {
  const pos: Placement[] = []
  const rows: LayoutRow[] = []
  let x = PAD
  let rowTop = PAD
  let row: number[] = []
  const flush = () => {
    if (!row.length) return
    const h = Math.max(...row.map((i) => bs[i].h + (items[i].lift || 0))) + opts.head
    const used = row.reduce((a, i, k) => a + bs[i].w + (k ? (items[i].gap ?? GAP) : 0), 0)
    const off = opts.align === 'center' ? Math.floor((W - PAD * 2 - used) / 2) : 0
    let cx = PAD + off
    row.forEach((i, k) => {
      if (k) cx += items[i].gap ?? GAP
      pos[i] = { x: cx, y: rowTop + h - bs[i].h - (items[i].lift || 0) }
      cx += bs[i].w
    })
    rows.push({ top: rowTop, h })
    rowTop += h + ROWGAP + opts.foot
    row = []
  }
  items.forEach((it, i) => {
    const w = bs[i].w
    const g = row.length ? (it.gap ?? GAP) : 0
    if (it.break || (row.length && x + g + w > W - PAD)) {
      flush()
      x = PAD
    }
    x += (row.length ? g : 0) + w
    row.push(i)
  })
  flush()
  return { pos, rows, H: rowTop - ROWGAP + PAD }
}

// ---- live-cue highlight detection (enclosed holes -> accent) --------------

/** Marks ink pixels adjacent to enclosed holes (>=2 px) and manual 'H's. */
function stampHi(b: Bitmap, s: Bitmap, ox: number, oy: number) {
  // Flood-fill the sprite's background from its border; remaining empty
  // regions are holes. Holes of >=2 px promote their ink neighbours.
  const lab = new Int32Array(s.w * s.h) // 0 unvisited, -1 border bg, >0 hole id
  const stack: number[] = []
  const pushBg = (i: number) => {
    if (!s.px[i] && !lab[i]) {
      lab[i] = -1
      stack.push(i)
    }
  }
  for (let x = 0; x < s.w; x++) {
    pushBg(x)
    pushBg((s.h - 1) * s.w + x)
  }
  for (let y = 0; y < s.h; y++) {
    pushBg(y * s.w)
    pushBg(y * s.w + s.w - 1)
  }
  while (stack.length) {
    const i = stack.pop()!
    const x = i % s.w
    const y = (i - x) / s.w
    if (x > 0) pushBg(i - 1)
    if (x < s.w - 1) pushBg(i + 1)
    if (y > 0) pushBg(i - s.w)
    if (y < s.h - 1) pushBg(i + s.w)
  }
  let nextId = 0
  const size: number[] = [0]
  for (let i0 = 0; i0 < s.px.length; i0++) {
    if (s.px[i0] || lab[i0]) continue
    const id = ++nextId
    size[id] = 0
    lab[i0] = id
    stack.push(i0)
    while (stack.length) {
      const i = stack.pop()!
      size[id]++
      const x = i % s.w
      const y = (i - x) / s.w
      const grow = (j: number) => {
        if (!s.px[j] && !lab[j]) {
          lab[j] = id
          stack.push(j)
        }
      }
      if (x > 0) grow(i - 1)
      if (x < s.w - 1) grow(i + 1)
      if (y > 0) grow(i - s.w)
      if (y < s.h - 1) grow(i + s.w)
    }
  }
  const ok = (id: number) => id > 0 && size[id] >= 2
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const i = y * s.w + x
      const v = s.px[i]
      if (!v) continue
      const holey =
        v === 3 ||
        (x > 0 && ok(lab[i - 1])) ||
        (x < s.w - 1 && ok(lab[i + 1])) ||
        (y > 0 && ok(lab[i - s.w])) ||
        (y < s.h - 1 && ok(lab[i + s.w]))
      if (holey) {
        const X = ox + x
        const Y = oy + y
        if (X >= 0 && Y >= 0 && X < b.w && Y < b.h) b.px[Y * b.w + X] = 2
      }
    }
}

// ---- scene render ---------------------------------------------------------

export interface RenderOpts {
  W: number
  align: 'left' | 'center'
  ground: boolean
  /** Reserved label space below each row, art px (0 = no labels). */
  foot: number
  /** 300ms animation frame counter (live cue); pass 0 when reduced. */
  frame: number
  /** Animate the live cue (bob + glints + accent highlights). */
  live: boolean
  /** Index of the hovered/pressed/focused item, or -1. */
  active: number
}

export interface SceneRender {
  bmp: Bitmap
  lay: Layout
  bs: Bitmap[]
}

export function renderScene(items: VillageItem[], opts: RenderOpts): SceneRender {
  const bs = items.map(itemBmp)
  const lay = layoutItems(items, bs, opts.W, {
    align: opts.align,
    head: opts.live ? 4 : 0,
    foot: opts.foot,
  })
  const b = blank(opts.W, lay.H)
  let tapN = 0
  items.forEach((it, i) => {
    const p = lay.pos[i]
    const live = opts.live && !!it.tap
    const phase = live ? tapN++ * 3 : 0
    let liftUp = i === opts.active && it.tap && it.tap.style === 'lift' ? 2 : 0
    if (live && i !== opts.active && (opts.frame + phase) % 8 < 3) liftUp += 1
    stampBmp(b, bs[i], p.x, p.y - liftUp)
    if (live) stampHi(b, bs[i], p.x, p.y - liftUp)
    if (live && i !== opts.active) {
      const put = (x: number, y: number) => {
        if (x >= 0 && y >= 0 && x < b.w && y < b.h) b.px[y * b.w + x] = 2
      }
      const star = (k: number, gx: number, gy: number) => {
        if (k === 0 || k === 2) put(gx, gy)
        if (k === 1) {
          put(gx, gy)
          put(gx - 1, gy)
          put(gx + 1, gy)
          put(gx, gy - 1)
          put(gx, gy + 1)
        }
      }
      star((opts.frame + phase) % 14, p.x + bs[i].w - 1, p.y - 3)
      star((opts.frame + phase + 7) % 14, p.x + 1, p.y + 2)
    }
  })
  // Active style pass (over everything drawn so far).
  const a = opts.active
  if (a >= 0 && items[a]?.tap) {
    const p = lay.pos[a]
    const sb = bs[a]
    const st = items[a].tap!.style || 'invert'
    if (st === 'invert') {
      for (let y = p.y - 1; y < p.y + sb.h + 1; y++)
        for (let x = p.x - 1; x < p.x + sb.w + 1; x++)
          if (x >= 0 && y >= 0 && x < b.w && y < b.h) b.px[y * b.w + x] = b.px[y * b.w + x] ? 0 : 1
    } else if (st === 'outline') {
      const put = (x: number, y: number) => {
        if (x >= 0 && y >= 0 && x < b.w && y < b.h) b.px[y * b.w + x] = 1
      }
      for (let x = p.x - 2; x <= p.x + sb.w + 1; x++)
        if ((x + p.y) % 2 === 0) {
          put(x, p.y - 2)
          put(x, p.y + sb.h + 1)
        }
      for (let y = p.y - 2; y <= p.y + sb.h + 1; y++)
        if ((y + p.x) % 2 === 0) {
          put(p.x - 2, y)
          put(p.x + sb.w + 1, y)
        }
    }
  }
  if (opts.ground)
    for (const r of lay.rows) {
      const gy = r.top + r.h
      for (let gx = PAD; gx < opts.W - PAD; gx += 2) if (gy < b.h) b.px[gy * b.w + gx] = 1
    }
  return { bmp: b, lay, bs }
}

/** Bounding-box hit test in art px, inflated 1px, back to front. */
export function hitItem(
  items: VillageItem[],
  lay: Layout,
  bs: Bitmap[],
  x: number,
  y: number,
): number {
  for (let i = items.length - 1; i >= 0; i--) {
    const q = lay.pos[i]
    const sb = bs[i]
    if (x >= q.x - 1 && x < q.x + sb.w + 1 && y >= q.y - 1 && y < q.y + sb.h + 1) return i
  }
  return -1
}
