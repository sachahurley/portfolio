/**
 * Avatar inks, the limited palette the visitor can repaint their figure
 * with. Portraits are single-ink silhouettes (PixelPortrait masks the tile
 * and fills it), so an ink is just the fill color.
 *
 * Every ink is a scorp-ds token reference, never a hex. `bone` is the stock
 * ink: it follows --fg, so it re-themes with the active gem like the rest
 * of the site's 1-bit art; the others are fixed dyes that hold across themes.
 */

export type AvatarInkId = 'bone' | 'gold' | 'ember' | 'moss' | 'sky' | 'violet'

export interface AvatarInk {
  id: AvatarInkId
  name: string
  color: string
}

export const AVATAR_INKS: readonly AvatarInk[] = [
  { id: 'bone', name: 'Bone', color: 'var(--fg)' },
  { id: 'gold', name: 'Gold', color: 'var(--color-amber-gold)' },
  { id: 'ember', name: 'Ember', color: 'var(--color-red-400)' },
  { id: 'moss', name: 'Moss', color: 'var(--color-green-400)' },
  { id: 'sky', name: 'Sky', color: 'var(--color-blue-400)' },
  { id: 'violet', name: 'Violet', color: 'var(--color-purple-400)' },
]

export const DEFAULT_INK: AvatarInkId = 'bone'

export const isAvatarInkId = (v: unknown): v is AvatarInkId =>
  AVATAR_INKS.some((i) => i.id === v)

/** The CSS color for an ink id (unknown ids fall back to the stock ink). */
export function inkColor(id: AvatarInkId): string {
  return (AVATAR_INKS.find((i) => i.id === id) ?? AVATAR_INKS[0]).color
}
