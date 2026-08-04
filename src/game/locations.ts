/**
 * The world map — every portfolio section as an RPG location.
 *
 * The registry drives the Compass (navigation), arrival lines in
 * the message log, and the Vault's level gate. Paths keep their original
 * URLs so existing deep links and SEO survive the RPG framing; the game
 * names are presentation only.
 */

export interface GameLocation {
  path: string
  /** In-world name shown in the compass and log. */
  name: string
  /** Plain-language name (tooltips, page titles, accessibility). */
  real: string
  /** Unicode glyph shown left of the name (compass + sheet). Rendered via
   *  font fallback — Fragment Mono lacks these; pixel icons come later. */
  icon: string
  /** Message-log line on first arrival and revisits. */
  arrive: string
  /** Minimum display level (1-based) before the compass reveals it. */
  minLevel?: number
}

export const LOCATIONS: GameLocation[] = [
  {
    path: '/',
    name: 'The Crossroads',
    real: 'Home',
    icon: '⌂',
    arrive: 'You stand at the Crossroads. Signposts point everywhere.',
  },
  {
    path: '/projects',
    name: 'Quest Log',
    real: 'Projects',
    icon: '⚔',
    arrive: 'You arrive at the Quest Log. Completed quests await review.',
  },
  {
    path: '/notes',
    name: 'The Library',
    real: 'Notes',
    icon: '✎',
    arrive: 'You enter the Library. The shelves hum quietly.',
  },
  {
    path: '/about',
    name: 'Hall of Records',
    real: 'About',
    icon: '◈',
    arrive: 'You enter the Hall of Records.',
  },
  {
    path: '/lab',
    name: 'The Vault',
    real: 'Lab',
    icon: '✦',
    arrive: 'The Vault door grinds open.',
    minLevel: 2,
  },
]

/** Match a pathname to its location (index pages and their detail pages). */
export function locationFor(pathname: string): GameLocation | undefined {
  if (pathname === '/') return LOCATIONS[0]
  const seg = '/' + pathname.split('/').filter(Boolean)[0]
  return LOCATIONS.find((l) => l.path !== '/' && l.path === seg)
}
