/**
 * routePattern — collapse a pathname to the route it matched.
 *
 * Speed Insights groups samples by `route`, and a route is meant to be the
 * PATTERN (`/projects/:slug`), not the path (`/projects/auspex`). Passing the
 * raw pathname would give every case study its own row and fragment an
 * already-small sample; passing nothing at all is what put every visit in the
 * "Unknown" bucket.
 *
 * The list mirrors the <Routes> block in App.tsx. It has to: this app uses
 * <BrowserRouter> rather than a data router, so there is no useMatches() to
 * read the matched pattern back out of, and useParams() returns {} anywhere
 * outside a <Route>. Drift is cheap rather than dangerous - a route missing
 * here just reports its literal path, which is exactly what happens today.
 */

import { matchRoutes } from 'react-router-dom'

const ROUTES = [
  { path: '/' },
  { path: '/projects' },
  { path: '/projects/:slug' },
  { path: '/lab' },
  { path: '/lab/wordmark' },
  { path: '/lab/town' },
  { path: '/lab/builder' },
  { path: '/lab/village' },
  { path: '/lab/home-alts' },
  { path: '/lab/tarot' },
  { path: '/lab/:slug' },
  { path: '/notes' },
  { path: '/notes/:slug' },
  { path: '/about' },
  { path: '/character' },
  { path: '/dev/tiles' },
  { path: '*' },
]

/** The matched pattern for a pathname, or the pathname itself if none match. */
export function routePatternFor(pathname: string): string {
  const matches = matchRoutes(ROUTES, pathname)
  if (!matches?.length) return pathname
  const path = matches[matches.length - 1].route.path
  // the catch-all is a pattern too: every 404 belongs in one bucket
  return path === '*' ? '/*' : (path ?? pathname)
}
