/**
 * DitherIcon — the 1-bit icon set authored in the sibling dither-studio
 * repo (black glyph on a transparent ground, strictly two states per pixel).
 *
 * The component enforces the rendering rules so call sites don't have to:
 * - assets render only at their native pixel size; retina displays load the
 *   natively drawn 2x asset (12↔24, 16↔32, 24↔48) instead of a smoothed
 *   upscale, and `image-rendering: pixelated` covers odd ratios
 * - pass `color` to tint through an alpha mask ('currentColor' or a
 *   Scorpion token value). Tint with flat palette colours only, and express
 *   states by swapping outline↔filled rather than opacity — translucency
 *   introduces grays and breaks the 1-bit look.
 */

import { iconUrl, type IconName, type IconSize, type IconStyle } from '../lib/dither/icons'

const RETINA_PAIR: Partial<Record<IconSize, IconSize>> = { 12: 24, 16: 32, 24: 48 }

// image-set() inside mask-image is what keeps masked icons crisp on 2x
// displays; where unsupported, fall back to the 1x url (slightly soft on
// retina, never broken — an unsupported mask value would paint a solid box).
const supportsMaskImageSet =
  typeof CSS !== 'undefined' &&
  (CSS.supports('mask-image', 'image-set(url("i.png") 1x)') ||
    CSS.supports('-webkit-mask-image', 'image-set(url("i.png") 1x)'))

export interface DitherIconProps {
  name: IconName
  /** outline for resting chrome, filled for the active/selected state */
  variant?: IconStyle
  /** CSS pixel size; also selects the asset — the icon is never resampled */
  size?: IconSize
  /** Tint via alpha mask, e.g. 'currentColor' or a token custom property */
  color?: string
  /** Accessible label; omit for purely decorative icons */
  title?: string
  className?: string
}

export default function DitherIcon({
  name,
  variant = 'outline',
  size = 16,
  color,
  title,
  className,
}: DitherIconProps) {
  const src = iconUrl(name, variant, size)
  const twoX = RETINA_PAIR[size]

  if (color) {
    const mask =
      twoX && supportsMaskImageSet
        ? `image-set(url("${src}") 1x, url("${iconUrl(name, variant, twoX)}") 2x)`
        : `url("${src}")`
    return (
      <span
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        className={className}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          backgroundColor: color,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: '100%',
          WebkitMaskSize: '100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    )
  }

  return (
    <img
      src={src}
      srcSet={twoX ? `${src} 1x, ${iconUrl(name, variant, twoX)} 2x` : undefined}
      width={size}
      height={size}
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      draggable={false}
    />
  )
}
