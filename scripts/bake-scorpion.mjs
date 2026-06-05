// One-time bake: decode the source scorpion PNG (no image libs needed, just
// Node's built-in zlib), downsample to its native pixel-art grid, threshold to
// 3 tones, segment into animatable parts, and emit src/components/scorpionPixels.ts.
//
// Usage:
//   node scripts/bake-scorpion.mjs            # write the .ts data file
//   node scripts/bake-scorpion.mjs --ascii    # just print an ASCII preview
//   node scripts/bake-scorpion.mjs --cols 150 # override target grid width
//
// Re-running is safe and deterministic.

import fs from 'node:fs'
import zlib from 'node:zlib'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SRC = process.env.SCORPION_SRC ||
  '/Users/sachahurley/.claude/image-cache/3d36911c-4b12-4180-ab8f-bf17783c8bf1/1.png'

const argv = process.argv.slice(2)
const ASCII_ONLY = argv.includes('--ascii')
const colsArgIdx = argv.indexOf('--cols')
const TARGET_COLS = colsArgIdx >= 0 ? parseInt(argv[colsArgIdx + 1], 10) : 154

// ---------------------------------------------------------------------------
// Minimal PNG decoder for 8-bit truecolor (colorType 2) and truecolor+alpha (6)
// ---------------------------------------------------------------------------
function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG')
  let pos = 8
  let width = 0, height = 0, bitDepth = 0, colorType = 0
  const idat = []
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    const type = buf.toString('ascii', pos + 4, pos + 8)
    const data = buf.subarray(pos + 8, pos + 8 + len)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') {
      break
    }
    pos += 12 + len
  }
  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
    throw new Error(`unsupported PNG: bitDepth ${bitDepth} colorType ${colorType}`)
  }
  const channels = colorType === 6 ? 4 : 3
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const stride = width * channels
  const out = Buffer.alloc(stride * height) // un-filtered, channels-per-pixel
  let rp = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++]
    const row = out.subarray(y * stride, y * stride + stride)
    const prev = y > 0 ? out.subarray((y - 1) * stride, (y - 1) * stride + stride) : null
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[rp++]
      const a = x >= channels ? row[x - channels] : 0
      const b = prev ? prev[x] : 0
      const c = prev && x >= channels ? prev[x - channels] : 0
      let val
      switch (filter) {
        case 0: val = rawByte; break
        case 1: val = rawByte + a; break
        case 2: val = rawByte + b; break
        case 3: val = rawByte + ((a + b) >> 1); break
        case 4: {
          const p = a + b - c
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
          const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c
          val = rawByte + pred
          break
        }
        default: throw new Error('bad filter ' + filter)
      }
      row[x] = val & 0xff
    }
  }
  return { width, height, channels, data: out }
}

// Luminance (0..255) of a source pixel.
function lumAt(img, x, y) {
  const i = (y * img.width + x) * img.channels
  const r = img.data[i], g = img.data[i + 1], b = img.data[i + 2]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// ---------------------------------------------------------------------------
// Downsample to native grid by averaging each block, then threshold to tones.
//   tone 0 = empty (background), 1 = gray shade, 2 = white
// ---------------------------------------------------------------------------
function buildToneGrid(img, targetCols) {
  const cell = img.width / targetCols
  const cols = targetCols
  const rows = Math.round(img.height / cell)
  const tones = []
  for (let r = 0; r < rows; r++) {
    const rowTones = new Array(cols).fill(0)
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor(c * cell), x1 = Math.min(img.width, Math.ceil((c + 1) * cell))
      const y0 = Math.floor(r * cell), y1 = Math.min(img.height, Math.ceil((r + 1) * cell))
      // Max-pool: keep thin white strokes connected (line art, not solid fills).
      // "Is there ink in this block, and how bright is the brightest bit?"
      let mx = 0
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const l = lumAt(img, x, y); if (l > mx) mx = l }
      // Background is near-black; the art is white with some mid-gray edges.
      rowTones[c] = mx < 70 ? 0 : mx < 175 ? 1 : 2
    }
    tones.push(rowTones)
  }
  return { cols, rows, tones }
}

function asciiPreview(grid) {
  const ch = [' ', '.', '#']
  return grid.tones.map((row) => row.map((t) => ch[t]).join('')).join('\n')
}

// ---------------------------------------------------------------------------
// Segmentation. All geometry is in NORMALIZED coords (x,y in 0..1 over the grid
// bounding box) so it's independent of the bake resolution. Parts:
//   body  - everything not claimed below; only the global sway moves it
//   tail  - the curling tail; rotates as a chain about TAIL.base
//   tailTip - far end of the curl (stinger); extra whip about TAIL.tip pivot
//   clawA / clawB - the two left pincers; the "finger" half rotates open/close
// A claw's movable finger = the cells of its region on the upper side of a hinge
// line through {hinge} at {angle} (radians, screen space: +x right, +y down).
const SEG = {
  // Tail: an L-shaped polygon (rectangle over the curl, notched at lower-left so
  // the head/carapace stays in 'body'). Verified/tuned via --overlay.
  tailPoly: [
    [0.477, 0.041], [0.815, 0.041], [0.815, 0.439],
    [0.700, 0.439], [0.700, 0.327], [0.477, 0.327],
  ],
  tailBase: [0.708, 0.418], // joint where the tail leaves the body
  tailMid: [0.754, 0.204],  // joint between base segment and the stinger whip
  // tailTip = tail cells left of this x (the inner stinger + top of the arc)
  tailTipMaxX: 0.715,
  claws: [
    { // upper-left pincer
      name: 'clawA',
      poly: [[0.060, 0.500], [0.300, 0.500], [0.300, 0.720], [0.060, 0.720]],
      hinge: [0.231, 0.643],
      angle: -0.35, // hinge-line slope; cells above it = movable finger
    },
    { // lower pincer
      name: 'clawB',
      poly: [[0.323, 0.760], [0.560, 0.760], [0.560, 0.995], [0.323, 0.995]],
      hinge: [0.535, 0.915],
      angle: 0.0,
    },
  ],
}

// Part ids stored per filled cell.
const PART = { BODY: 0, TAIL: 1, TAIL_TIP: 2, CLAW_A: 3, CLAW_A_FINGER: 4, CLAW_B: 5, CLAW_B_FINGER: 6 }

function pointInPoly(x, y, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// Classify a normalized cell coordinate into a part id.
function classify(nx, ny) {
  for (const claw of SEG.claws) {
    if (pointInPoly(nx, ny, claw.poly)) {
      // Side of the hinge line: positive => above (movable finger).
      const dy = ny - claw.hinge[1]
      const dx = nx - claw.hinge[0]
      const side = dy - Math.tan(claw.angle) * dx // <0 => above the sloped line
      const finger = side < 0
      if (claw.name === 'clawA') return finger ? PART.CLAW_A_FINGER : PART.CLAW_A
      return finger ? PART.CLAW_B_FINGER : PART.CLAW_B
    }
  }
  if (pointInPoly(nx, ny, SEG.tailPoly)) {
    return nx < SEG.tailTipMaxX ? PART.TAIL_TIP : PART.TAIL
  }
  return PART.BODY
}

// Bounding box of all filled cells (so normalized coords map to the art, not the
// padded canvas).
function contentBounds(grid) {
  let minC = grid.cols, maxC = 0, minR = grid.rows, maxR = 0
  for (let r = 0; r < grid.rows; r++) for (let c = 0; c < grid.cols; c++) {
    if (grid.tones[r][c] !== 0) {
      if (c < minC) minC = c; if (c > maxC) maxC = c
      if (r < minR) minR = r; if (r > maxR) maxR = r
    }
  }
  return { minC, maxC, minR, maxR, w: maxC - minC + 1, h: maxR - minR + 1 }
}

function buildParts(grid, bounds) {
  const parts = []
  for (let r = 0; r < grid.rows; r++) {
    const row = new Array(grid.cols).fill(0)
    for (let c = 0; c < grid.cols; c++) {
      if (grid.tones[r][c] === 0) continue
      const nx = (c - bounds.minC) / (bounds.w - 1)
      const ny = (r - bounds.minR) / (bounds.h - 1)
      row[c] = classify(nx, ny)
    }
    parts.push(row)
  }
  return parts
}

function overlayPreview(grid, parts) {
  const ch = { 0: '.', 1: 'T', 2: 't', 3: 'A', 4: 'a', 5: 'B', 6: 'b' }
  const lines = []
  for (let r = 0; r < grid.rows; r++) {
    let s = ''
    for (let c = 0; c < grid.cols; c++) {
      s += grid.tones[r][c] === 0 ? ' ' : ch[parts[r][c]]
    }
    lines.push(s)
  }
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
const img = decodePng(fs.readFileSync(SRC))
const grid = buildToneGrid(img, TARGET_COLS)

if (ASCII_ONLY) {
  console.log(`# ${grid.cols} x ${grid.rows} (target cols ${TARGET_COLS})`)
  console.log(asciiPreview(grid))
  process.exit(0)
}

const bounds = contentBounds(grid)
const parts = buildParts(grid, bounds)

if (argv.includes('--overlay')) {
  console.log(`# ${grid.cols} x ${grid.rows}  content ${bounds.w}x${bounds.h}`)
  console.log('# legend: .=body T/t=tail/tip A/a=clawA/finger B/b=clawB/finger')
  console.log(overlayPreview(grid, parts))
  process.exit(0)
}

// ---------------------------------------------------------------------------
// Emit src/components/scorpionPixels.ts
// ---------------------------------------------------------------------------
// Convert a normalized point to grid (col,row) coords at the bake resolution.
const toGrid = ([nx, ny]) => [
  +(bounds.minC + nx * (bounds.w - 1)).toFixed(2),
  +(bounds.minR + ny * (bounds.h - 1)).toFixed(2),
]

// Crop the grids to the content bounding box so the data file (and canvas) carry
// no empty padding; the component centers the cropped art itself.
const tonesRows = []
const partsRows = []
for (let r = bounds.minR; r <= bounds.maxR; r++) {
  let ts = '', ps = ''
  for (let c = bounds.minC; c <= bounds.maxC; c++) {
    ts += String(grid.tones[r][c])
    ps += String(grid.tones[r][c] === 0 ? 0 : parts[r][c])
  }
  tonesRows.push(ts)
  partsRows.push(ps)
}

// Pivots, re-based to the cropped grid origin (minC,minR -> 0,0).
const rebase = ([gx, gy]) => [+(gx - bounds.minC).toFixed(2), +(gy - bounds.minR).toFixed(2)]
const rig = {
  swayOrigin: rebase([bounds.minC + bounds.w / 2, bounds.maxR]), // bottom-center
  tailBase: rebase(toGrid(SEG.tailBase)),
  tailMid: rebase(toGrid(SEG.tailMid)),
  clawA: rebase(toGrid(SEG.claws[0].hinge)),
  clawB: rebase(toGrid(SEG.claws[1].hinge)),
}

const out = `// AUTO-GENERATED by scripts/bake-scorpion.mjs — do not edit by hand.
// Re-bake: node scripts/bake-scorpion.mjs [--cols N]
//
// A cropped pixel-art scorpion plus an articulation rig, baked from the source
// PNG. TONES holds tone indices per cell ('0' empty, '1' gray, '2' white).
// PARTS holds a part id per cell so the component can move limbs independently:
//   0 body  1 tail  2 tailTip  3 clawA  4 clawA finger  5 clawB  6 clawB finger
// RIG pivots are in cropped-grid (col,row) coordinates.

export const COLS = ${bounds.w}
export const ROWS = ${bounds.h}

export const Part = {
  Body: 0,
  Tail: 1,
  TailTip: 2,
  ClawA: 3,
  ClawAFinger: 4,
  ClawB: 5,
  ClawBFinger: 6,
} as const

export const RIG = {
  swayOrigin: [${rig.swayOrigin}] as [number, number],
  tailBase: [${rig.tailBase}] as [number, number],
  tailMid: [${rig.tailMid}] as [number, number],
  clawA: [${rig.clawA}] as [number, number],
  clawB: [${rig.clawB}] as [number, number],
}

export const TONES: readonly string[] = [
${tonesRows.map((r) => '  ' + JSON.stringify(r) + ',').join('\n')}
]

export const PARTS: readonly string[] = [
${partsRows.map((r) => '  ' + JSON.stringify(r) + ',').join('\n')}
]
`

const outPath = path.join(__dirname, '..', 'src', 'components', 'scorpionPixels.ts')
fs.writeFileSync(outPath, out)
console.log(`wrote ${outPath}`)
console.log(`grid ${bounds.w} x ${bounds.h} (cropped), rig`, rig)
