/**
 * PixelPortrait, the visitor's avatar: a full-body figure from the Urizen
 * OneBit sheet, picked deterministically from the saved avatar seed.
 *
 * The pool (AVATAR_TILES) is baked by scripts/bake-avatars.mjs: races with
 * distinct silhouettes, each in every class loadout. Figures render as a
 * single-ink silhouette: --fg by default, so they follow the active theme
 * like the rest of the site's 1-bit art, or the visitor's chosen ink from
 * the avatar palette (game/avatarInks). Existing saves keep their seed and
 * simply map onto a figure.
 */

import { TileBox } from '../TileSprite'
import { AVATAR_TILES } from '../../game/avatarTiles'

/** The sheet cell (plus centering shift) for a seed. */
function avatarTile(seed: number): readonly [number, number, number, number] {
  const n = AVATAR_TILES.length
  return AVATAR_TILES[((Math.floor(seed) % n) + n) % n]
}

export default function PixelPortrait({
  seed,
  cell = 4,
  ink = 'var(--fg)',
  className,
}: {
  seed: number
  /** CSS color the silhouette is painted in. */
  ink?: string
  /** Screen pixels per sheet pixel (4 = the site's standard art scale). */
  cell?: number
  className?: string
}) {
  const [x, y, dx, dy] = avatarTile(seed)
  return (
    <TileBox
      x={x}
      y={y}
      scale={cell}
      tint={ink}
      className={className}
      // the baked shift centers the figure's ink in the tile box; purely
      // visual, so the layout box stays where the row put it
      style={{ display: 'block', transform: `translate(${Math.round(dx * cell)}px, ${Math.round(dy * cell)}px)` }}
    />
  )
}
