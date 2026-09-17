/**
 * PixelItem, the art for a piece of loot (or an unopened chest).
 *
 * Draws the slot's base type from the Urizen OneBit sheet as a single-ink
 * silhouette, tinted with the rarity tier's color, so a rare reads as rare
 * straight from the pack grid. Cells come from GEAR_TILES (baked by
 * scripts/bake-gear.mjs); a base index out of range falls back to the
 * slot's first type, so a stale save still renders.
 *
 * Deliberately independent of the active egg: loot never re-themes.
 */

import { TileBox } from '../TileSprite'
import { CHEST_TILE, GEAR_TILES } from '../../game/gearTiles'
import { RARITY_COLORS, type Rarity, type Slot } from '../../game/loot'

export default function PixelItem({
  kind,
  base = 0,
  rarity,
  cell = 4,
  className,
}: {
  kind: Slot | 'chest'
  /** Base-type index within the slot; ignored for 'chest'. */
  base?: number
  rarity: Rarity
  /** Screen pixels per sheet pixel (3 pack, 4 slots and dialogs). */
  cell?: number
  className?: string
}) {
  const [x, y, dx, dy] = kind === 'chest' ? CHEST_TILE : (GEAR_TILES[kind][base] ?? GEAR_TILES[kind][0])

  return (
    <TileBox
      x={x}
      y={y}
      scale={cell}
      tint={RARITY_COLORS[rarity]}
      className={className}
      // the baked shift centers the glyph's ink in the tile box; purely
      // visual, so the layout box stays where the grid put it
      style={{ display: 'block', transform: `translate(${dx * cell}px, ${dy * cell}px)` }}
    />
  )
}
