/**
 * FEATURED
 *
 * Shortcuts into the work: one case study or Lab project each, promoted to
 * the home page's Featured section and the menu's Featured group. One list
 * for both surfaces, in display order; swap an entry to feature something
 * else. Tarot keeps its flag.
 */

import type { VillageIconName } from '../components/village/VillageIcon'
import { TAROT_ENABLED } from '../lib/flags'

export interface Featured {
  path: string            // Where the shortcut goes
  label: string           // Its name on the home grid and in the menu
  icon: VillageIconName   // Menu icon (components/village/VillageIcon)
  part: string            // Home-grid sprite (a village kit part)
}

export const FEATURED: Featured[] = [
  { path: '/projects/scorpion-ui', label: 'Scorp DS', icon: 'scorpion', part: 'scorpion_icon' },
  ...(TAROT_ENABLED
    ? [{ path: '/lab/tarot', label: 'Tarot', icon: 'tarot', part: 'crystal_ball' } satisfies Featured]
    : []),
]
