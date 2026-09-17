/**
 * town/styles — style systems that turn the semantic tone grid into pixels.
 *
 * The building renderer (buildings.ts) paints MEANING (lit face, shade
 * face, roof, outline...); a TownStyle decides how each meaning looks.
 * Three systems, all colored with the active theme's ink over the dark
 * page ground so egg themes retint every style:
 *
 * - sepia: the town's multi-tone ramp, mix(dark, ink, luma) per tone.
 * - ink:   strict 1-bit "ink & paper" (Polyducks / City Clickers rules):
 *          solid paper roofs + lit faces, 1px vertical hatch on shade
 *          faces, outlines and windows are the ABSENCE of ink, sparse
 *          paper dots for ground. Zero dither on architecture.
 * - mac:   1984 Macintosh look: each tone's luma ordered-dithered
 *          through the 4x4 Bayer matrix, with outlines forced dark so
 *          silhouettes stay crisp.
 */

import { mix } from '../../lib/themes'
import { bayerThreshold } from '../../lib/dither/oneBit'
import { hashNoise } from '../../lib/dither/render'
import { TONES, TONE_LUMA, type Grid } from './buildings'

// The dark ground base, from the same near-black backing family the
// hatched placeholders hardcode in minimal.css; egg themes retint the
// ink only, the dark stays put (the site is locked to dark mode).
export const TOWN_DARK = '#17120d'

export type TownStyleId = 'sepia' | 'ink' | 'mac'

export interface TownStyle {
  id: TownStyleId
  name: string
  /** Build the per-cell fill fn (called once per paint so ramps can
   *  precompute). Returns a fillStyle, or null to leave the cell
   *  transparent so the dark page ground shows through. */
  fill(ink: string): (tone: number, c: number, r: number) => string | null
}

export const TOWN_STYLES: Record<TownStyleId, TownStyle> = {
  sepia: {
    id: 'sepia',
    name: 'sepia',
    fill(ink) {
      const ramp = TONE_LUMA.map((t) => mix(TOWN_DARK, ink, t))
      return (tone) => (tone === TONES.SKY ? null : ramp[tone])
    },
  },
  ink: {
    id: 'ink',
    name: 'ink & paper',
    fill(ink) {
      return (tone, c, r) => {
        switch (tone) {
          case TONES.LIT:
          case TONES.ROOF:
            return ink // solid paper
          case TONES.SHADE:
            return c % 2 === 0 ? ink : null // 1px vertical hatch
          case TONES.GROUND:
            return hashNoise(c, r, 7) > 0.85 ? ink : null // sparse dots
          default:
            // SKY, OUTLINE, GLASS: absence of ink. Windows read as dark
            // dots punched into the paper faces.
            return null
        }
      }
    },
  },
  mac: {
    id: 'mac',
    name: 'mac dither',
    fill(ink) {
      return (tone, c, r) => {
        if (tone === TONES.SKY || tone === TONES.OUTLINE) return null // crisp rims
        if (tone === TONES.GLASS) return ink
        return TONE_LUMA[tone] > bayerThreshold(c, r) ? ink : null
      }
    },
  },
}

/**
 * Paint a tone grid at integer zoom. With `bounds`, cells blit translated
 * so (minC, minR) lands at the canvas origin (the builder's auto-center);
 * the c/r handed to the style stay GRID coordinates, so Bayer and hatch
 * patterns are stable regardless of where the content sits.
 */
export function paintGrid(
  ctx: CanvasRenderingContext2D,
  g: Grid,
  zoom: number,
  style: TownStyle,
  ink: string,
  bounds?: { minC: number; minR: number; maxC: number; maxR: number },
): void {
  const fill = style.fill(ink)
  const c0 = bounds?.minC ?? 0
  const r0 = bounds?.minR ?? 0
  const c1 = bounds?.maxC ?? g.cols - 1
  const r1 = bounds?.maxR ?? g.rows - 1
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const color = fill(g.tone[r * g.cols + c], c, r)
      if (!color) continue
      ctx.fillStyle = color
      ctx.fillRect((c - c0) * zoom, (r - r0) * zoom, zoom, zoom)
    }
  }
}
