/**
 * The world map — every portfolio section as a location.
 *
 * The registry drives the menu (navigation) and arrival lines in the
 * message log. No location is currently level-gated (minLevel is unused
 * but the seal mechanism stays wired for future use). Paths keep their original
 * URLs so existing deep links and SEO survive the RPG framing; the
 * log lines keep an RPG tone but name pages by their real names.
 */

import type { VillageIconName } from '../components/village/VillageIcon'

export interface GameLocation {
  path: string
  /** Page name — the label in both nav surfaces and in log lines. */
  real: string
  /** Village asset shown left of the name (menu + sheet), rendered by
   *  VillageIcon from the same kit the village home page draws with. */
  icon: VillageIconName
  /** Message-log line on first arrival and revisits. */
  arrive: string
  /** Minimum display level (1-based) before the compass reveals it. */
  minLevel?: number
}

export const LOCATIONS: GameLocation[] = [
  {
    path: '/',
    real: 'Home',
    icon: 'home',
    arrive: 'You arrive at Home. Signposts point everywhere.',
  },
  {
    path: '/projects',
    real: 'Projects',
    icon: 'projects',
    arrive: 'You arrive at Projects. Completed quests await review.',
  },
  {
    path: '/lab',
    real: 'Lab',
    icon: 'lab',
    arrive: 'The Lab door grinds open.',
  },
  {
    path: '/notes',
    real: 'Notes',
    icon: 'notes',
    arrive: 'You enter Notes. The shelves hum quietly.',
  },
  {
    path: '/about',
    real: 'About',
    icon: 'about',
    arrive: 'You enter About.',
  },
]

/** Match a pathname to its location (index pages and their detail pages). */
export function locationFor(pathname: string): GameLocation | undefined {
  if (pathname === '/') return LOCATIONS[0]
  const seg = '/' + pathname.split('/').filter(Boolean)[0]
  return LOCATIONS.find((l) => l.path !== '/' && l.path === seg)
}
