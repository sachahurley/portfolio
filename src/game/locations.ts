/**
 * The world map — every portfolio section as a location.
 *
 * The registry drives the menu (navigation), arrival lines in the
 * message log, and the Lab's level gate. Paths keep their original
 * URLs so existing deep links and SEO survive the RPG framing; the
 * log lines keep an RPG tone but name pages by their real names.
 */

import type { DitherIconName } from '../lib/dither/icons'

export interface GameLocation {
  path: string
  /** Page name — the label in both nav surfaces and in log lines. */
  real: string
  /** Dither-studio icon shown left of the name (menu + sheet), rendered
   *  by DitherIcon from the vendored 1-bit set. */
  icon: DitherIconName
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
    icon: 'folder',
    arrive: 'You arrive at Projects. Completed quests await review.',
  },
  {
    path: '/lab',
    real: 'Lab',
    icon: 'star',
    arrive: 'The Lab door grinds open.',
    minLevel: 2,
  },
  {
    path: '/notes',
    real: 'Notes',
    icon: 'edit',
    arrive: 'You enter Notes. The shelves hum quietly.',
  },
  {
    path: '/about',
    real: 'About',
    icon: 'user',
    arrive: 'You enter About.',
  },
]

/** Match a pathname to its location (index pages and their detail pages). */
export function locationFor(pathname: string): GameLocation | undefined {
  if (pathname === '/') return LOCATIONS[0]
  const seg = '/' + pathname.split('/').filter(Boolean)[0]
  return LOCATIONS.find((l) => l.path !== '/' && l.path === seg)
}
