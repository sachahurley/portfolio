/**
 * TileBand — one Urizen tile repeated into a horizontal band.
 *
 * Used as the baseboard along the bottom of the menu sheet. The cell is
 * given as sheet coordinates rather than a tile id so the 5k-entry index
 * stays out of the bundle (same reason PixelPortrait and PixelItem take
 * cells); the id is in the comment above each constant, and the atlas at
 * /lab/tile-atlas is the place to look one up.
 *
 * Enough tiles are rendered to cover the widest host (the sheet is capped
 * at 540px) and the row simply clips, so there is no measuring to do.
 */

import { TileBox } from './TileSprite'

/** structure/stone_wall/stone_wall_01 — irregular rubble courses. */
const BASEBOARD_TILE: readonly [number, number] = [0, 2]

const SCALE = 2 // 24px per tile
const COVERS_PX = 1200 // longest run we ever need (the sheet's tall edge)

export default function TileBand({
  cell = BASEBOARD_TILE,
  scale = SCALE,
  tint = 'var(--mut2)',
  className,
}: {
  cell?: readonly [number, number]
  scale?: number
  tint?: string
  className?: string
}) {
  const [x, y] = cell
  const count = Math.ceil(COVERS_PX / (12 * scale))

  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <TileBox key={i} x={x} y={y} scale={scale} tint={tint} />
      ))}
    </div>
  )
}
