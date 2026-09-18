/**
 * Gem — a theme's stone, drawn from the Urizen sheet.
 *
 * Every theme wears the same cut, recoloured: one diamond tile tinted
 * the theme's accent, so the colour alone carries the theme (the cell
 * is hardcoded with its id comment, the TileBand convention, to keep
 * the 5k-entry tile index out of the bundle). `dim` renders the
 * silhouette in the muted tone for unearned sockets.
 */

import { TileBox } from '../TileSprite'
import { THEMES, type ThemeId } from '../../lib/themes'

/** items/gem/diamond, the classic cut (see /lab/tile-atlas). */
const GEM_TILE: readonly [number, number] = [1, 22]

export default function Gem({
  themeId,
  scale = 3,
  dim = false,
  cls,
}: {
  themeId: ThemeId
  /** Screen px per sheet px (3 track, 8 level-up modal). */
  scale?: number
  dim?: boolean
  cls?: string
}) {
  const [x, y] = GEM_TILE
  return (
    <TileBox
      x={x}
      y={y}
      scale={scale}
      tint={dim ? 'var(--mut2)' : THEMES[themeId].accent}
      className={cls ?? 'gem-art'}
    />
  )
}
