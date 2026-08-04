/**
 * The world map — every portfolio section as an RPG location.
 *
 * The registry drives the Compass (navigation + hotkeys), arrival lines in
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
  /** Compass hotkey, pressed as a bare digit. */
  hotkey: string
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
    hotkey: '1',
    arrive: 'You stand at the Crossroads. Signposts point everywhere.',
  },
  {
    path: '/projects',
    name: 'Quest Log',
    real: 'Projects',
    hotkey: '2',
    arrive: 'You arrive at the Quest Log. Completed quests await review.',
  },
  {
    path: '/notes',
    name: 'The Library',
    real: 'Notes',
    hotkey: '3',
    arrive: 'You enter the Library. The shelves hum quietly.',
  },
  {
    path: '/about',
    name: 'Hall of Records',
    real: 'About',
    hotkey: '4',
    arrive: 'You enter the Hall of Records.',
  },
  {
    path: '/contact',
    name: "Messenger's Post",
    real: 'Contact',
    hotkey: '5',
    arrive: "You reach the Messenger's Post. Ravens shuffle on their perches.",
  },
  {
    path: '/lab',
    name: 'The Vault',
    real: 'Lab',
    hotkey: '6',
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
