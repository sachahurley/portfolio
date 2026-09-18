/**
 * VillageIcon — a village kit asset drawn as a menu icon.
 *
 * The nav rows in the bottom sheet and the desktop compass carry the same
 * assets the village home page uses for its tappable buildings, so the menu
 * and the map speak one language.
 *
 * Drawn as an inline SVG whose rects are the art's own pixels rather than a
 * canvas: the parts are 1-bit, so `fill: currentColor` inherits the row's
 * colour and keeps the hover, active-row and gem-theme recolouring the
 * dither icons got for free from their CSS mask. Vector rects also stay
 * crisp at the fractional scale each asset needs to fill its box.
 *
 * Fit: the bitmap is trimmed to its ink bounds and the viewBox is set to
 * them, so every asset scales to fill the box whatever size it was authored
 * at (the parts range from 16x16 to 19x22).
 */

import { itemBmp, trim, type Bitmap, type VillageItem } from './villageKit'

/**
 * The nav assets, keyed by role rather than by part name so the art can be
 * swapped without touching the location registry. These mirror the village
 * home's tap targets (src/data/villageHome.ts), except Home: the scene's
 * single-storey house is 25x15, too wide to fill a square icon box, so the
 * icon uses a two-storey house in the same building language.
 */
const NAV_ICONS = {
  home: { house: { storeys: ['wall_5', 'upper_5'], roof: 'roof_2' } },
  projects: { part: 'hammer_icon' },
  lab: { part: 'brain' },
  notes: { part: 'quill' },
  about: { part: 'skull' },
} satisfies Record<string, VillageItem>

export type VillageIconName = keyof typeof NAV_ICONS

/**
 * One subpath per horizontal run of ink. Every non-zero value counts as ink:
 * 3 is the 'H' highlight seed, which only turns accent under the scene's
 * live cue, and 2 is never present outside a rendered scene.
 */
function bitmapToPath(b: Bitmap): string {
  let d = ''
  for (let y = 0; y < b.h; y++) {
    let x = 0
    while (x < b.w) {
      if (!b.px[y * b.w + x]) {
        x++
        continue
      }
      const start = x
      while (x < b.w && b.px[y * b.w + x]) x++
      const run = x - start
      d += `M${start} ${y}h${run}v1h-${run}z`
    }
  }
  return d
}

interface IconArt {
  d: string
  w: number
  h: number
}

// Five icons, composed once on first use and kept for the session.
const cache = new Map<VillageIconName, IconArt>()

function iconArt(name: VillageIconName): IconArt {
  let art = cache.get(name)
  if (!art) {
    const b = trim(itemBmp(NAV_ICONS[name]))
    art = { d: bitmapToPath(b), w: b.w, h: b.h }
    cache.set(name, art)
  }
  return art
}

export default function VillageIcon({
  name,
  size = 16,
  className,
}: {
  name: VillageIconName
  /** Box the art is fitted into, in px (square, like DitherIcon's size). */
  size?: number
  className?: string
}) {
  const { d, w, h } = iconArt(name)
  return (
    <svg
      className={`vicon${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
