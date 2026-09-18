// The tarot deck: 78 card faces + 1 back, baked as tarot/* rows below the
// Urizen art (same contract as extras.mjs). Cards are 2x3 sheet cells, art
// 25x38, single ink (color is irrelevant on screen: <TileBox tint> masks by
// alpha), so a face is really a tiny engraving.
//
// Minor pips are programmatic (suit glyphs in the classic arrangements),
// courts wear a roster figure over a rank letter, and each major composes a
// motif cropped from the sheet itself via the `cropTile` lookup that
// index-tiles.mjs passes in, so the deck can never drift from the atlas.

const INK = [247, 245, 242, 255] // ONE_BIT_INK, matching the Urizen sheets

export const CARD_W = 25
export const CARD_H = 38

const rgba = (width, height) => ({ width, height, data: new Uint8ClampedArray(width * height * 4) })

const px = (img, x, y) => {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return
  img.data.set(INK, (y * img.width + x) * 4)
}

/** Paste opaque pixels of src as ink (any source color becomes the ink). */
function paste(dst, src, ox, oy, { flip = false } = {}) {
  for (let j = 0; j < src.height; j++) {
    for (let i = 0; i < src.width; i++) {
      const [si, sj] = flip ? [src.width - 1 - i, src.height - 1 - j] : [i, j]
      if (src.data[(sj * src.width + si) * 4 + 3] === 0) continue
      px(dst, ox + i, oy + j)
    }
  }
}

/** Mirror src horizontally into dst. */
function pasteMirrored(dst, src, ox, oy) {
  for (let j = 0; j < src.height; j++) {
    for (let i = 0; i < src.width; i++) {
      if (src.data[(j * src.width + (src.width - 1 - i)) * 4 + 3] === 0) continue
      px(dst, ox + i, oy + j)
    }
  }
}

/** Trim a cropped tile to its ink bounds (12x12 blocks carry margins). */
function trim(src) {
  let x0 = src.width, y0 = src.height, x1 = -1, y1 = -1
  for (let j = 0; j < src.height; j++)
    for (let i = 0; i < src.width; i++)
      if (src.data[(j * src.width + i) * 4 + 3] !== 0) {
        if (i < x0) x0 = i
        if (i > x1) x1 = i
        if (j < y0) y0 = j
        if (j > y1) y1 = j
      }
  if (x1 < 0) return src
  const out = rgba(x1 - x0 + 1, y1 - y0 + 1)
  for (let j = 0; j < out.height; j++)
    for (let i = 0; i < out.width; i++) {
      const s = ((y0 + j) * src.width + (x0 + i)) * 4
      out.data.set(src.data.subarray(s, s + 4), (j * out.width + i) * 4)
    }
  return out
}

function drawRows(img, rows, ox, oy) {
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) if (row[i] !== '.') px(img, ox + i, oy + j)
  })
}

// ---------------------------------------------------------------------------
// Tiny fonts and glyphs
// ---------------------------------------------------------------------------

/** 3x5 glyphs: roman numeral chars + court letters. */
const FONT = {
  I: ['XXX', '.X.', '.X.', '.X.', 'XXX'],
  V: ['X.X', 'X.X', 'X.X', 'X.X', '.X.'],
  X: ['X.X', 'X.X', '.X.', 'X.X', 'X.X'],
  P: ['XX.', 'X.X', 'XX.', 'X..', 'X..'],
  N: ['X.X', 'XXX', 'X.X', 'X.X', 'X.X'],
  Q: ['.X.', 'X.X', 'X.X', 'X.X', '.XX'],
  K: ['X.X', 'X.X', 'XX.', 'X.X', 'X.X'],
  A: ['.X.', 'X.X', 'XXX', 'X.X', 'X.X'],
}

function drawText(img, text, cx, oy) {
  const w = text.length * 4 - 1
  let x = cx - Math.floor(w / 2)
  for (const ch of text) {
    const glyph = FONT[ch]
    if (glyph) drawRows(img, glyph, x, oy)
    x += 4
  }
}

const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI']
// 0 has no roman numeral; The Fool wears a diamond instead.
const zeroMark = ['.X.', 'X.X', '.X.']

/** 5x5 suit glyphs for pips and bands. */
const SUIT_GLYPHS = {
  wands: ['...XX', '..XX.', '..X..', '.XX..', 'XX...'],
  cups: ['X...X', 'X...X', '.XXX.', '..X..', '.XXX.'],
  swords: ['..X..', '..X..', '..X..', 'XXXXX', '..X..'],
  pentacles: ['.XXX.', 'X...X', 'X.X.X', 'X...X', '.XXX.'],
}

// ---------------------------------------------------------------------------
// Card chrome
// ---------------------------------------------------------------------------

/** Border with notched corners, and a pinline under the rank band. */
function cardBase() {
  const img = rgba(CARD_W, CARD_H)
  for (let x = 1; x < CARD_W - 1; x++) {
    px(img, x, 0)
    px(img, x, CARD_H - 1)
  }
  for (let y = 1; y < CARD_H - 1; y++) {
    px(img, 0, y)
    px(img, CARD_W - 1, y)
  }
  // notch the corners (the site's stepped-plate corner language)
  for (const [cx, cy] of [[0, 0], [CARD_W - 1, 0], [0, CARD_H - 1], [CARD_W - 1, CARD_H - 1]]) {
    const p = (cy * CARD_W + cx) * 4
    img.data[p + 3] = 0
    px(img, cx === 0 ? 1 : CARD_W - 2, cy)
    px(img, cx, cy === 0 ? 1 : CARD_H - 2)
  }
  // dotted pinline under the band
  for (let x = 2; x < CARD_W - 2; x += 2) px(img, x, 8)
  return img
}

const CX = Math.floor(CARD_W / 2) // 12

// ---------------------------------------------------------------------------
// Minors
// ---------------------------------------------------------------------------

// Pip anchor grid: columns left/center/right, rows 0..3 (fractions allowed).
const PL = 4, PC = 10, PR = 16
const pipY = (row) => 10 + Math.round(row * 6)
const PIPS = {
  2: [[PC, 0], [PC, 3]],
  3: [[PC, 0], [PL, 3], [PR, 3]],
  4: [[PL, 0], [PR, 0], [PL, 3], [PR, 3]],
  5: [[PL, 0], [PR, 0], [PC, 1.5], [PL, 3], [PR, 3]],
  6: [[PL, 0], [PR, 0], [PL, 1.5], [PR, 1.5], [PL, 3], [PR, 3]],
  7: [[PL, 0], [PR, 0], [PL, 1.5], [PR, 1.5], [PC, 0.75], [PL, 3], [PR, 3]],
  8: [[PL, 0], [PR, 0], [PL, 1], [PR, 1], [PL, 2], [PR, 2], [PL, 3], [PR, 3]],
  9: [[PL, 0], [PR, 0], [PL, 1], [PR, 1], [PC, 1.5], [PL, 2], [PR, 2], [PL, 3], [PR, 3]],
  10: [[PL, 0], [PR, 0], [PL, 1], [PR, 1], [PC, 0.5], [PC, 2.5], [PL, 2], [PR, 2], [PL, 3], [PR, 3]],
}

/** The prop each ace holds up (and courts wear small). */
const ACE_PROPS = {
  wands: 'weapons/staff/staff_wood',
  cups: 'props/misc/chalice',
  swords: 'weapons/sword/sword',
  pentacles: 'items/treasure/gold_coin',
}

const COURT_LETTER = { 11: 'P', 12: 'N', 13: 'Q', 14: 'K' }
/** Roster figures for the courts, one demeanor per suit. */
const COURT_FIGURES = {
  wands: 'characters/green_hat',
  cups: 'characters/base',
  swords: 'characters/base_armored',
  pentacles: 'characters/gray',
}
// page / knight / queen / king poses by class column (verified visually).
const COURT_CLASSES = { 11: 'class_00', 12: 'class_04', 13: 'class_02', 14: 'class_03' }

function minorCard(suit, rank, cropTile) {
  const img = cardBase()
  const glyph = SUIT_GLYPHS[suit]
  drawRows(img, glyph, CX - 2, 2) // band: suit glyph centred

  if (rank === 1) {
    const prop = trim(cropTile(ACE_PROPS[suit]))
    paste(img, prop, CX - Math.floor(prop.width / 2), 22 - Math.floor(prop.height / 2))
    drawText(img, 'A', CX, 31)
  } else if (rank <= 10) {
    for (const [x, row] of PIPS[rank]) drawRows(img, glyph, x, pipY(row))
  } else {
    const fig = trim(cropTile(`${COURT_FIGURES[suit]}/${COURT_CLASSES[rank]}`))
    paste(img, fig, CX - Math.floor(fig.width / 2), 19 - Math.floor(fig.height / 2))
    drawText(img, COURT_LETTER[rank], CX, 30)
  }
  return img
}

// ---------------------------------------------------------------------------
// Majors
// ---------------------------------------------------------------------------

/** Hand-drawn justice scales (no scales tile exists in the sheet). */
const SCALES = [
  '......X......',
  '..XXXXXXXXX..',
  '..X...X...X..',
  '.X.X..X..X.X.',
  'X...X.X.X...X',
  '.XXX..X..XXX.',
  '......X......',
  '......X......',
  '.....XXX.....',
  '....XXXXX....',
]

const BOLT = [
  '...XX',
  '..XX.',
  '.XXX.',
  '..XX.',
  '.XX..',
  'XX...',
  'X....',
]

const SPARK = ['.X.', 'XXX', '.X.']

/** Hand-drawn eight-spoke wheel (the summoning circle overwhelms a card). */
const WHEEL = [
  '...XXXXX...',
  '..X..X..X..',
  '.X...X...X.',
  'X.X..X..X.X',
  'X..X.X.X..X',
  'XXXXXXXXXXX',
  'X..X.X.X..X',
  'X.X..X..X.X',
  '.X...X...X.',
  '..X..X..X..',
  '...XXXXX...',
]

/**
 * One entry per major: either a single motif tile (centred), or a compose
 * function for the few that need assembly. Motifs verified against the
 * atlas previews; adjust here and re-run `npm run tiles` to iterate.
 */
const MAJORS = [
  { slug: 'the_fool', motif: 'characters/green_hat/class_00' },
  { slug: 'the_magician', motif: 'magic/spell/summon' },
  { slug: 'the_high_priestess', motif: 'items/book/spellbook' },
  {
    slug: 'the_empress',
    compose(img, cropTile) {
      const crown = trim(cropTile('items/regalia/crown'))
      const heart = trim(cropTile('ui/stat/heart'))
      paste(img, crown, CX - Math.floor(crown.width / 2), 13)
      paste(img, heart, CX - Math.floor(heart.width / 2), 15 + crown.height)
    },
  },
  { slug: 'the_emperor', motif: 'props/decor/throne' },
  { slug: 'the_hierophant', motif: 'magic/portal/arch' },
  {
    slug: 'the_lovers',
    compose(img, cropTile) {
      const heart = trim(cropTile('ui/stat/heart'))
      const fig = trim(cropTile('characters/pose/pose_03'))
      paste(img, heart, CX - Math.floor(heart.width / 2), 12)
      paste(img, fig, CX - fig.width - 1, 15 + heart.height)
      pasteMirrored(img, fig, CX + 2, 15 + heart.height)
    },
  },
  { slug: 'the_chariot', motif: 'props/misc/wagon' },
  { slug: 'strength', motif: 'creatures/animal/lion' },
  { slug: 'the_hermit', motif: 'props/light/lantern' },
  {
    slug: 'wheel_of_fortune',
    compose(img) {
      drawRows(img, WHEEL, CX - 5, 16)
    },
  },
  {
    slug: 'justice',
    compose(img) {
      drawRows(img, SCALES, CX - 6, 15)
    },
  },
  {
    slug: 'the_hanged_man',
    compose(img, cropTile) {
      const fig = trim(cropTile('characters/pose/pose_01'))
      paste(img, fig, CX - Math.floor(fig.width / 2), 17, { flip: true })
      // the rope
      for (let y = 10; y < 17; y++) px(img, CX, y)
    },
  },
  { slug: 'death', motif: 'characters/bone/class_09' },
  {
    slug: 'temperance',
    compose(img, cropTile) {
      const jug = trim(cropTile('food/kitchen/jug'))
      const cup = trim(cropTile('food/kitchen/cup'))
      paste(img, jug, CX - jug.width - 1, 14)
      paste(img, cup, CX + 2, 20)
      // the pour
      px(img, CX, 19)
      px(img, CX + 1, 21)
      px(img, CX + 2, 23)
    },
  },
  { slug: 'the_devil', motif: 'characters/devil/class_00' },
  {
    slug: 'the_tower',
    compose(img, cropTile) {
      const tower = trim(cropTile('structure/tower/stone_tower'))
      paste(img, tower, CX - Math.floor(tower.width / 2), 20)
      drawRows(img, BOLT, CX + 2, 11)
    },
  },
  {
    slug: 'the_star',
    compose(img, cropTile) {
      const star = trim(cropTile('space/star/star_02'))
      paste(img, star, CX - Math.floor(star.width / 2), 18)
      drawRows(img, SPARK, 4, 13)
      drawRows(img, SPARK, 18, 24)
    },
  },
  { slug: 'the_moon', motif: 'items/bone/horn' }, // the horn reads as a crescent
  { slug: 'the_sun', motif: 'space/body/sun' },
  { slug: 'judgement', motif: 'props/market/bell_gold' }, // the call, rung

  { slug: 'the_world', motif: 'props/decor/globe' },
]

function majorCard(index, cropTile) {
  const def = MAJORS[index]
  const img = cardBase()
  if (index === 0) drawRows(img, zeroMark, CX - 1, 3)
  else drawText(img, ROMAN[index], CX, 2)
  if (def.compose) def.compose(img, cropTile)
  else {
    const motif = trim(cropTile(def.motif))
    paste(img, motif, CX - Math.floor(motif.width / 2), 21 - Math.floor(motif.height / 2))
  }
  return img
}

// ---------------------------------------------------------------------------
// Card back: a rune lattice
// ---------------------------------------------------------------------------

function cardBack() {
  const img = cardBase()
  // clear the pinline; the back has no band
  for (let x = 2; x < CARD_W - 2; x += 2) img.data[(8 * CARD_W + x) * 4 + 3] = 0
  // inner frame
  for (let x = 2; x < CARD_W - 2; x++) {
    px(img, x, 2)
    px(img, x, CARD_H - 3)
  }
  for (let y = 2; y < CARD_H - 2; y++) {
    px(img, 2, y)
    px(img, CARD_W - 2, y)
  }
  // diamond lattice
  for (let y = 4; y < CARD_H - 4; y++) {
    for (let x = 4; x < CARD_W - 4; x++) {
      if ((x + y) % 6 === 0 || (x - y) % 6 === 0) px(img, x, y)
    }
  }
  // centre eye
  drawRows(img, ['..X..', '.XXX.', 'XX.XX', '.XXX.', '..X..'], CX - 2, 17)
  return img
}

// ---------------------------------------------------------------------------
// Entry point, called by index-tiles.mjs with a tile cropper
// ---------------------------------------------------------------------------

const SUITS = ['wands', 'cups', 'swords', 'pentacles']
const MINOR_NAMES = { 1: 'ace', 11: 'page', 12: 'knight', 13: 'queen', 14: 'king' }

export function buildTarot(cropTile) {
  const tags = ['site', 'generated', 'tarot']
  const out = []
  MAJORS.forEach((def, i) => {
    out.push({ cat: 'tarot/major', name: def.slug, w: 2, h: 3, art: majorCard(i, cropTile), tags })
  })
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 14; rank++) {
      const name = MINOR_NAMES[rank] ?? String(rank)
      out.push({ cat: `tarot/${suit}`, name, w: 2, h: 3, art: minorCard(suit, rank, cropTile), tags })
    }
  }
  out.push({ cat: 'tarot/back', name: 'back', w: 2, h: 3, art: cardBack(), tags })
  return out
}
