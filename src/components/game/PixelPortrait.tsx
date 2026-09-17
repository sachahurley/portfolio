/**
 * PixelPortrait, the visitor's avatar: a full-body figure from the Urizen
 * OneBit sheet, picked deterministically from the saved avatar seed.
 *
 * The pool (AVATAR_TILES) is baked by scripts/bake-avatars.mjs: races with
 * distinct silhouettes, each in every class loadout. Figures render as a
 * single-ink silhouette in --fg, so they follow the active theme like the
 * rest of the site's 1-bit art. Existing saves keep their seed and simply
 * map onto a figure.
 */

import { TileBox } from '../TileSprite'
import { AVATAR_TILES } from '../../game/avatarTiles'

/** The sheet cell for a seed. */
function avatarTile(seed: number): readonly [number, number] {
  const n = AVATAR_TILES.length
  return AVATAR_TILES[((Math.floor(seed) % n) + n) % n]
}

export default function PixelPortrait({
  seed,
  cell = 4,
  className,
}: {
  seed: number
  /** Screen pixels per sheet pixel (4 = the site's standard art scale). */
  cell?: number
  className?: string
}) {
  const [x, y] = avatarTile(seed)
  return (
    <TileBox
      x={x}
      y={y}
      scale={cell}
      tint="var(--fg)"
      className={className}
      style={{ display: 'block' }}
    />
  )
}
