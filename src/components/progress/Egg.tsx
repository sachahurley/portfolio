/**
 * Egg — thin React wrapper around the eggSVG string builder.
 *
 * Memoized per mount/theme so IDs stay stable across re-renders of the same
 * instance, while separate instances (track vs modal) always get unique IDs.
 */

import { useMemo } from 'react'
import { eggSVG } from '../../lib/eggArt'
import { THEMES, type ThemeId } from '../../lib/themes'

export default function Egg({ themeId, cls }: { themeId: ThemeId; cls?: string }) {
  const html = useMemo(() => eggSVG(THEMES[themeId], cls), [themeId, cls])
  return <span className="egg-wrap" dangerouslySetInnerHTML={{ __html: html }} />
}
