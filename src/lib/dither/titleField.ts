/**
 * dither/titleField — the title-screen composition: "SACHA HURLEY" stamped
 * solid from the shared nameArt letterforms over a reflowing dither scene
 * (sparse sky, wavy ground band, orb with a dithered halo, register marks,
 * birds). Every background element is positioned as a fraction of the grid
 * so the piece recomposes at any viewport; the name block is knocked out
 * first so nothing ever touches the letters.
 *
 * Coverage semantics (dither-studio authoring grammar): 0 is ground, 1 is
 * solid ink, anything between falls in the boiling dither band. The lit mask
 * marks pixels (name letters, orb disc) that render in the accent colour.
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
  const maxAt = (x: number, y: number, v: number) => {
    x = Math.round(x)
    y = Math.round(y)
    if (x < 0 || x >= gw || y < 0 || y >= gh) return
    f[y * gw + x] = Math.max(f[y * gw + x], v)
  }

  // Sky: quiet solid ground colour for the top half, a sparse boiling dither
  // glow concentrated just above the horizon. Values under 0.03 sit outside
  // the boil band, so the upper sky stays perfectly still and empty.
  for (let y = 0; y < gh; y++) {
    const v = Math.min(1, Math.max(0, Math.pow(y / gh, 3.5) * 0.22))
    for (let x = 0; x < gw; x++) f[y * gw + x] = v
  }

  // Wavy solid ground band, the stage floor.
  const groundAt = (x: number) =>
    gh * 0.88 + gh * 0.02 * Math.sin(x / 17) + gh * 0.012 * Math.sin(x / 7 + 1.7)
  for (let x = 0; x < gw; x++)
    for (let y = Math.max(0, Math.round(groundAt(x))); y < gh; y++) f[y * gw + x] = 1

  // Orb: solid lit disc with a dithered halo falling off to 1.7r, tucked in
  // the top-right corner clear of the name block at every viewport shape.
  const ox = gw * 0.88
  const oy = gh * 0.11
  const r = Math.min(gw, gh) * 0.06
  for (let y = 0; y < gh; y++)
    for (let x = 0; x < gw; x++) {
      const d = Math.hypot(x - ox, y - oy)
      if (d < r) {
        f[y * gw + x] = 1
        lit[y * gw + x] = 1
      } else if (d < r * 1.7) maxAt(x, y, 0.45 * (1 - (d - r) / (0.7 * r)))
    }

  // Three 3-px birds.
  for (const [bx, by] of [
    [0.3, 0.1],
    [0.36, 0.075],
    [0.42, 0.115],
  ]) {
    put(gw * bx, gh * by, 1)
    put(gw * bx + 1, gh * by - 1, 1)
    put(gw * bx + 2, gh * by, 1)
  }

  // Name block. Letter cells are 1x2 grid px (the letterforms are designed
  // for tall cells); square cells when the tall version would crowd the frame.
  const art = buildArt()
  const cellH: 1 | 2 = art.rows * 2 <= gh * 0.55 && art.cols <= gw * 0.85 ? 2 : 1
  const nameW = art.cols
  const nameH = art.rows * cellH
  const nameX = Math.floor((gw - nameW) / 2)
  const nameY = Math.max(4, Math.min(gh - nameH - 4, Math.floor(gh * 0.4 - nameH / 2)))

  // Knockout: background never touches the letters at any viewport shape.
  for (let y = nameY - 3; y < nameY + nameH + 3; y++)
    for (let x = nameX - 3; x < nameX + nameW + 3; x++)
      if (x >= 0 && x < gw && y >= 0 && y < gh) {
        f[y * gw + x] = 0
        lit[y * gw + x] = 0
      }

  const stamp = (cx: number, cy: number, v: number, isLit: boolean) => {
    for (let k = 0; k < cellH; k++) put(nameX + cx, nameY + cy * cellH + k, v, isLit)
  }
  // All letter shades stamp solid: silhouette-first, the carved interior
  // texture would read as noise once boiled.
  for (let y = 0; y < art.rows; y++) {
    const line = art.lines[y]
    for (let x = 0; x < line.length; x++) if (line[x] !== ' ') stamp(x, y, 1, true)
  }
  // Drips sit in the boil band, so the 15fps boil makes them bleed for free.
  for (const d of art.drips)
    d.chars.forEach((ch, i) => stamp(d.x, d.y + i, DRIP_COVER[ch] ?? 0.4, false))

  // Register marks: 3-dot clusters centred above and below the name.
  const midX = nameX + (nameW >> 1)
  for (const dy of [-6, nameH + 5])
    for (const dx of [-4, 0, 4]) put(midX + dx, nameY + dy, 1)

  // Tick row standing on the ground.
  for (let x = Math.round(gw * 0.14); x <= gw * 0.36; x += 6) {
    const gy = Math.round(groundAt(x))
    put(x, gy - 2, 1)
    put(x, gy - 3, 1)
  }

  // Quiet band behind the HTML "PRESS START" prompt (bottom 16% of the
  // wrapper) so the text sits on solid ground colour, not boiling dither.
  // Clamped above the ground line so the stage floor keeps its wavy edge.
  for (let y = Math.round(gh * 0.79); y < gh * 0.87; y++)
    for (let x = Math.round(gw * 0.26); x < gw * 0.74; x++)
      if (y >= 0 && y < gh && y < groundAt(x) - 1) {
        f[y * gw + x] = 0
        lit[y * gw + x] = 0
      }

  return { field: f, lit, layout: { gw, gh, name: { x: nameX, y: nameY, w: nameW, h: nameH, cellH } } }
}
