/**
 * Tile — renders one asset from the Urizen OneBit sheet by id.
 *
 *   <Tile id="weapons/sword/katana" />                 // native colors, 2x
 *   <Tile id="items/potion/flask_red" scale={4} />
 *   <Tile id="armor/helm/horned_helm" tint="var(--accent)" />  // follows the egg theme
 *
 * Ids are type-checked against src/data/tileIndex.ts (generated; browse them at
 * /dev/tiles, or on the public atlas at /lab/tile-atlas).
 */

import { TileBox, type TileBoxProps } from './TileSprite'
import { TILES, type TileId } from '../data/tileIndex'

export { TileBox }
export type { TileId }

interface TileProps extends Omit<TileBoxProps, 'x' | 'y' | 'w' | 'h'> {
  id: TileId
}

export function Tile({ id, ...rest }: TileProps) {
  const [x, y, w, h] = TILES[id]
  return <TileBox x={x} y={y} w={w} h={h} {...rest} />
}
