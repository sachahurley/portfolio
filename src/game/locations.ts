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
import { FEATURED } from '../data/featured'

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

/**
 * The menu's Featured group: the same shortcuts as the home page's Featured
 * section (data/featured.ts), so both surfaces stay in step. Kept out of
 * LOCATIONS because membership there means an arrival line and discovery
 * XP on every visit (RouteEffects in App.tsx); a featured case study's or
 * Lab project's visits already count towards its section.
 *
 * Character and World are not in the menu: they live in the home page's
 * Adventure section, and Character also in the player strip.
 */
export const NAV_FEATURED: Pick<GameLocation, 'path' | 'real' | 'icon'>[] = FEATURED.map((f) => ({
  path: f.path,
  real: f.label,
  icon: f.icon,
}))

/** The menu extra this pathname is on, if any (it outranks its section). */
export const extraFor = (pathname: string) =>
  NAV_FEATURED.find((d) => pathname === d.path || pathname.startsWith(d.path + '/'))

/** Match a pathname to its location (index pages and their detail pages). */
export function locationFor(pathname: string): GameLocation | undefined {
  if (pathname === '/') return LOCATIONS[0]
  const seg = '/' + pathname.split('/').filter(Boolean)[0]
  return LOCATIONS.find((l) => l.path !== '/' && l.path === seg)
}
