/**
 * dither/titleField — the title-screen composition: "SACHA HURLEY" stamped
 * from the shared nameArt letterforms on empty ground. The scene dressing
 * (sky glow, horizon band, orb, birds, register marks) was cut; the piece
 * is the name and its drips, nothing else.
 *
 * Coverage semantics (dither-studio authoring grammar): 0 is ground, 1 is
 * solid ink, anything between falls in the boiling dither band. Letters
 * stamp at LETTER_COVER, just inside the band, so the boil lives in the
 * letters themselves; drips sit deeper in the band and shimmer harder. The
 * lit mask marks the letter pixels that render in the accent colour.
 */

import { buildArt } from '../nameArt'

export interface TitleLayout {
  gw: number
  gh: number
  name: { x: number; y: number; w: number; h: number; cellH: 1 | 2 }
}

export interface TitleField {
  field: Float32Array
  lit: Uint8Array
  layout: TitleLayout
}

/** Drip shades from nameArt's ramp, kept inside the boil band so they shimmer. */
const DRIP_COVER: Record<string, number> = { '▓': 0.7, '▒': 0.55, '░': 0.4 }

/** Letter coverage: high enough to read as solid, but inside the boil band
 *  (the engine only jitters 0.03..0.97) so a sparse flicker plays across the
 *  letterforms — roughly one pixel in ten winks off on any given beat. */
const LETTER_COVER = 0.9

export function buildTitleField(gw: number, gh: number): TitleField {
  const f = new Float32Array(gw * gh)
  const lit = new Uint8Array(gw * gh)

  const put = (x: number, y: number, v: number, isLit = false) => {
    x = Math.round(x)
    y = Math.round(y)
    if (x < 0 || x >= gw || y < 0 || y >= gh) return
    f[y * gw + x] = v
    if (isLit) lit[y * gw + x] = 1
  }

  // Name block. Letter cells are 1x2 grid px (the letterforms are designed
  // for tall cells); square cells when the tall version would crowd the frame.
  const art = buildArt()
  const cellH: 1 | 2 = art.rows * 2 <= gh * 0.55 && art.cols <= gw * 0.85 ? 2 : 1
  const nameW = art.cols
  const nameH = art.rows * cellH
  const nameX = Math.floor((gw - nameW) / 2)
  const nameY = Math.max(4, Math.min(gh - nameH - 4, Math.floor(gh * 0.4 - nameH / 2)))

  const stamp = (cx: number, cy: number, v: number, isLit: boolean) => {
    for (let k = 0; k < cellH; k++) put(nameX + cx, nameY + cy * cellH + k, v, isLit)
  }
  // All letter shades stamp at the same cover: silhouette-first, the carved
  // interior texture would read as noise once boiled.
  for (let y = 0; y < art.rows; y++) {
    const line = art.lines[y]
    for (let x = 0; x < line.length; x++) if (line[x] !== ' ') stamp(x, y, LETTER_COVER, true)
  }
  // Drips sit deeper in the boil band, so the 15fps boil makes them bleed.
  for (const d of art.drips)
    d.chars.forEach((ch, i) => stamp(d.x, d.y + i, DRIP_COVER[ch] ?? 0.4, false))

  return { field: f, lit, layout: { gw, gh, name: { x: nameX, y: nameY, w: nameW, h: nameH, cellH } } }
}
