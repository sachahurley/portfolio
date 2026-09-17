/**
 * TileBox — draws one rectangle of the Urizen sheet by cell position.
 *
 * Kept apart from <Tile> so a component that needs a single known sprite (the
 * padlock on a locked row, say) doesn't pull the 5k-entry tile index into the
 * bundle. Prefer <Tile id="..." /> when you want a checked id.
 */

import { type CSSProperties } from 'react'
import { TILE_META } from '../data/tileSheet'

export interface TileBoxProps {
  x: number
  y: number
  w?: number
  h?: number
  scale?: number
  /** Any CSS color. Renders the tile as a single-color silhouette. */
  tint?: string
  label?: string
  className?: string
  style?: CSSProperties
}

export function TileBox({ x, y, w = 1, h = 1, scale = 2, tint, label, className, style }: TileBoxProps) {
  const { src, pitch, tile, width, height } = TILE_META
  const gap = pitch - tile
  const pos = `${-(gap + x * pitch) * scale}px ${-(gap + y * pitch) * scale}px`
  const size = `${width * scale}px ${height * scale}px`
  const url = `url(${src})`

  const sprite: CSSProperties = tint
    ? {
        backgroundColor: tint,
        maskImage: url, maskPosition: pos, maskSize: size, maskRepeat: 'no-repeat',
        WebkitMaskImage: url, WebkitMaskPosition: pos, WebkitMaskSize: size, WebkitMaskRepeat: 'no-repeat',
      }
    : { backgroundImage: url, backgroundPosition: pos, backgroundSize: size, backgroundRepeat: 'no-repeat' }

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={{
        display: 'inline-block',
        flex: 'none',
        width: (w * pitch - gap) * scale,
        height: (h * pitch - gap) * scale,
        imageRendering: 'pixelated',
        ...sprite,
        ...style,
      }}
    />
  )
}
