/**
 * FEATURED
 *
 * Shortcuts into the work: one case study or Lab project each, shown as
 * cards in the home page's Featured section and as rows in the menu's
 * Featured group. One list for every surface, in display order; swap an
 * entry to feature something else. Tarot keeps its flag.
 */

import type { VillageIconName } from '../components/village/VillageIcon'
import { TAROT_ENABLED } from '../lib/flags'

export interface Featured {
  path: string            // Where the shortcut goes
  label: string           // Its name on the card and in the menu
  icon: VillageIconName   // The 1-bit icon (components/village/VillageIcon)
  line: string            // One sentence under the label on the home card
  /** The card's picture: an image under public/ (shown cropped to fill),
   *  or a tarot card drawn from the tile sheet by its deck id. */
  media: { kind: 'img'; src: string } | { kind: 'card'; id: string }
}

export const FEATURED: Featured[] = [
  {
    path: '/projects/scorpion-ui',
    label: 'Scorp DS',
    icon: 'scorpion',
    line: 'The design system this site is built from.',
    media: { kind: 'img', src: '/dither/scorp-thumb.png' },
  },
  ...(TAROT_ENABLED
    ? [
        {
          path: '/lab/tarot',
          label: 'Tarot GPT',
          icon: 'tarot',
          line: 'A pixel mystic reads your journey.',
          media: { kind: 'card', id: 'major/the_star' },
        } satisfies Featured,
      ]
    : []),
]
