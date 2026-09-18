// Tile indexer: turns the Urizen OneBit sheet into a searchable asset database.
//
//   node scripts/index-tiles.mjs          (npm run tiles)
//
// Reads   assets-src/tiles/urizen-onebit-v2.png + scripts/tiles/regions.mjs
//         plus scripts/tiles/extras.mjs (the site's own generated stonework,
//         appended below the Urizen rows so it is searchable too)
// Writes  public/tiles/urizen.png          sheet with the black backgrounds made transparent
//         src/data/tiles.json              full manifest (used by the /dev/tiles browser)
//         src/data/tileSheet.ts             sheet geometry (used by <TileBox>)
//         src/data/tileIndex.ts            compact typed id -> position map (used by <Tile>)
//         public/tiles/atlas.json          compact runtime data, fetched by the /lab/tile-atlas page
//
// Tiles you edited in /dev/tiles are marked `locked` and are never overwritten.
// Deterministic and safe to re-run.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { decodePng, encodePng } from './lib/png.mjs'
import { regions, ROSTER } from './tiles/regions.mjs'
import { buildExtras } from './tiles/extras.mjs'
import { buildTarot } from './tiles/tarot.mjs'
import { writeManifest, writeIndex, writeSheet, writeAtlas } from './lib/tiles-manifest.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-src/tiles/urizen-onebit-v2.png')
const OUT_PNG = path.join(root, 'public/tiles/urizen.png')
const OUT_JSON = path.join(root, 'src/data/tiles.json')
const OUT_TS = path.join(root, 'src/data/tileIndex.ts')
const OUT_SHEET = path.join(root, 'src/data/tileSheet.ts')
const OUT_ATLAS = path.join(root, 'public/tiles/atlas.json')

const TILE = 12, PITCH = 13
const img = decodePng(fs.readFileSync(SRC))
const COLS = Math.floor((img.width - 1) / PITCH)
const ROWS = Math.floor((img.height - 1) / PITCH)

const at = (x, y) => (y * img.width + x) * 4
const isMagenta = (i) => img.data[i] === 255 && img.data[i + 1] === 0 && img.data[i + 2] === 255
const isBlank = (i) => img.data[i + 3] === 0 || (img.data[i] | img.data[i + 1] | img.data[i + 2]) === 0

// cell state: 'empty' | 'sep' | 'tile'
function cellKind(c, r) {
  let fg = 0, mag = 0
  for (let j = 0; j < TILE; j++) for (let i = 0; i < TILE; i++) {
    const p = at(1 + c * PITCH + i, 1 + r * PITCH + j)
    if (isMagenta(p)) mag++
    else if (!isBlank(p)) fg++
  }
  if (mag === TILE * TILE) return 'sep'
  return fg ? 'tile' : 'empty'
}
const kinds = Array.from({ length: ROWS }, (_, r) => Array.from({ length: COLS }, (_, c) => cellKind(c, r)))
const sepCols = [...new Set(kinds[0].map((k, c) => (k === 'sep' ? c : -1)).filter((c) => c >= 0))]
const sheetOf = (c) => sepCols.filter((s) => s < c).length

// dominant foreground color of a block (for color filtering)
function dominantColor(x, y, w, h) {
  const counts = new Map()
  for (let r = y; r < y + h; r++) for (let c = x; c < x + w; c++)
    for (let j = 0; j < TILE; j++) for (let i = 0; i < TILE; i++) {
      const p = at(1 + c * PITCH + i, 1 + r * PITCH + j)
      if (isBlank(p) || isMagenta(p)) continue
      const hex = '#' + [0, 1, 2].map((k) => img.data[p + k].toString(16).padStart(2, '0')).join('')
      counts.set(hex, (counts.get(hex) || 0) + 1)
    }
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '#000000'
}

const inside = (reg, c, r) => c >= reg.c[0] && c <= reg.c[1] && r >= reg.r[0] && r <= reg.r[1]

// ---------------------------------------------------------------------------
// Assign cells to regions (last match wins) and build assets
// ---------------------------------------------------------------------------
const owner = new Map() // "c,r" -> region index
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
  if (kinds[r][c] !== 'tile') continue
  let idx = -1
  regions.forEach((reg, i) => { if (inside(reg, c, r)) idx = i })
  if (idx < 0 && inside(ROSTER, c, r)) idx = 'roster'
  owner.set(`${c},${r}`, idx)
}

const assets = []
const used = new Set()
const counters = new Map()
const nextDefault = (cat) => {
  const base = cat.split('/').pop()
  const n = (counters.get(cat) || 0) + 1
  counters.set(cat, n)
  return `${base}_${String(n).padStart(2, '0')}`
}
function push(cat, name, x, y, w, h, tags = []) {
  let id = `${cat}/${name}`
  for (let k = 2; used.has(id); k++) id = `${cat}/${name}_v${k}`
  used.add(id)
  const [category, sub] = cat.split('/')
  assets.push({ id, name: id.split('/').pop(), category, sub: sub ?? '', x, y, w, h, sheet: sheetOf(x), color: dominantColor(x, y, w, h), tags })
}

regions.forEach((reg, i) => {
  const names = (reg.names ?? '').split(/\s+/).filter(Boolean)
  const [w, h] = reg.span ?? [1, 1]
  const blocks = []
  for (let r = reg.r[0]; r + h - 1 <= reg.r[1]; r += h)
    for (let c = reg.c[0]; c + w - 1 <= reg.c[1]; c += w) {
      let any = false
      for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++)
        if (owner.get(`${c + dx},${r + dy}`) === i) any = true
      if (any) blocks.push([c, r])
    }
  // cells of multi-cell blocks are claimed even if some were owned by broader regions
  blocks.forEach(([c, r], k) => {
    const nm = names[k] && names[k] !== '-' ? names[k] : nextDefault(reg.cat)
    push(reg.cat, nm, c, r, w, h, reg.tags ?? [])
    for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) owner.set(`${c + dx},${r + dy}`, 'claimed')
  })
})

for (let r = ROSTER.r[0]; r <= ROSTER.r[1]; r++) for (let c = ROSTER.c[0]; c <= ROSTER.c[1]; c++) {
  if (owner.get(`${c},${r}`) !== 'roster') continue
  const race = ROSTER.races[r - ROSTER.r[0]] ?? `race_${r}`
  const cls = ROSTER.classes[c - ROSTER.c[0]] ?? `class_${String(c - ROSTER.c[0]).padStart(2, '0')}`
  push(`characters/${race}`, cls, c, r, 1, 1, ['roster', `race:${race}`, `class:${cls}`])
  owner.set(`${c},${r}`, 'claimed')
}

for (const [key, v] of owner) {
  if (v === 'claimed') continue
  const [c, r] = key.split(',').map(Number)
  if (kinds[r][c] === 'tile') push('uncategorized/misc', nextDefault('uncategorized/misc'), c, r, 1, 1)
}

// ---------------------------------------------------------------------------
// Extras: the site's generated art, laid out on fresh rows below the sheet
// ---------------------------------------------------------------------------
// The tarot bake composes card faces from the sheet's own tiles: crop a
// block by id, ink-only (bg and magenta separators drop to transparent).
const assetById = new Map(assets.map((a) => [a.id, a]))
function cropTile(id) {
  const a = assetById.get(id)
  if (!a) throw new Error(`tarot motif missing from sheet: ${id}`)
  const w = a.w * PITCH - 1
  const h = a.h * PITCH - 1
  const out = { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const p = at(1 + a.x * PITCH + i, 1 + a.y * PITCH + j)
      if (isBlank(p) || isMagenta(p)) continue
      out.data.set(img.data.subarray(p, p + 4), (j * w + i) * 4)
    }
  }
  return out
}

const extras = [...buildExtras(), ...buildTarot(cropTile)]
const extraPlacements = []
let exCol = 0
let exRow = ROWS
let rowTall = 0
for (const t of extras) {
  if (exCol + t.w > COLS) {
    exCol = 0
    exRow += rowTall
    rowTall = 0
  }
  extraPlacements.push({ ...t, x: exCol, y: exRow })
  exCol += t.w
  rowTall = Math.max(rowTall, t.h)
}
const extraRows = extras.length ? exRow + rowTall - ROWS : 0

// Grow the sheet and paste each piece centred in its cell block.
const sheetH = extraRows ? 1 + (ROWS + extraRows) * PITCH : img.height
const sheet = { width: img.width, height: sheetH, data: new Uint8ClampedArray(img.width * sheetH * 4) }
sheet.data.set(img.data.subarray(0, Math.min(img.data.length, sheet.data.length)))
for (const t of extraPlacements) {
  const blockW = t.w * PITCH - 1
  const blockH = t.h * PITCH - 1
  const ox = 1 + t.x * PITCH + Math.floor((blockW - t.art.width) / 2)
  const oy = 1 + t.y * PITCH + Math.floor((blockH - t.art.height) / 2)
  for (let j = 0; j < t.art.height; j++) {
    for (let i = 0; i < t.art.width; i++) {
      const sp = (j * t.art.width + i) * 4
      if (t.art.data[sp + 3] === 0) continue
      const dp = ((oy + j) * sheet.width + (ox + i)) * 4
      sheet.data.set(t.art.data.subarray(sp, sp + 4), dp)
    }
  }
  const [category, sub] = t.cat.split('/')
  assets.push({
    id: `${t.cat}/${t.name}`, name: t.name, category, sub: sub ?? '',
    x: t.x, y: t.y, w: t.w, h: t.h,
    sheet: sheetOf(t.x), color: '#bfb4a3', tags: t.tags ?? [],
  })
}

// ---------------------------------------------------------------------------
// Merge with locked (hand-edited) entries
// ---------------------------------------------------------------------------
let locked = []
if (fs.existsSync(OUT_JSON)) {
  locked = JSON.parse(fs.readFileSync(OUT_JSON, 'utf8')).tiles.filter((t) => t.locked)
}
const lockedPos = new Set(locked.map((t) => `${t.x},${t.y}`))
const lockedIds = new Set(locked.map((t) => t.id))
const merged = [
  ...locked,
  ...assets.filter((a) => !lockedPos.has(`${a.x},${a.y}`) && !lockedIds.has(a.id)),
].sort((a, b) => a.sheet - b.sheet || a.y - b.y || a.x - b.x)

// ---------------------------------------------------------------------------
// Outputs
// ---------------------------------------------------------------------------
const meta = { source: 'Urizen OneBit Tileset v2.0', src: '/tiles/urizen.png', tile: TILE, pitch: PITCH, cols: COLS, rows: ROWS + extraRows, width: sheet.width, height: sheet.height }
writeManifest(OUT_JSON, meta, merged)

writeSheet(OUT_SHEET, meta)
writeIndex(OUT_TS, meta, merged)
fs.mkdirSync(path.dirname(OUT_ATLAS), { recursive: true })
writeAtlas(OUT_ATLAS, meta, merged)

// transparent sheet: black tile backgrounds -> alpha 0
const out = Buffer.from(sheet.data)
for (let i = 0; i < out.length; i += 4) if ((out[i] | out[i + 1] | out[i + 2]) === 0) out[i + 3] = 0
fs.mkdirSync(path.dirname(OUT_PNG), { recursive: true })
fs.writeFileSync(OUT_PNG, encodePng({ width: sheet.width, height: sheet.height, data: out }))

const byCat = {}
for (const t of merged) byCat[t.category] = (byCat[t.category] || 0) + 1
console.log(`${merged.length} tiles (${locked.length} locked, ${extras.length} generated on ${extraRows} extra rows), sheets split at cols ${sepCols.join(', ')}`)
console.log(byCat)
