/**
 * Compass — the game frame's navigation and de facto sitemap. Lists every
 * reachable location; the Vault stays sealed (shown as ???) until the
 * visitor reaches Level 2.
 */

import { Link, useLocation } from 'react-router-dom'
import { LOCATIONS, locationFor } from '../../game/locations'
import { useXp } from '../../context/XpProvider'

export default function Compass() {
  const { level } = useXp()
  const { pathname } = useLocation()
  const displayLevel = level.level + 1
  const here = locationFor(pathname)

  return (
    <nav className="gf-panel gf-compass" aria-label="Menu">
      <div className="gf-label">menu</div>
      <ul>
        {LOCATIONS.map((loc) => {
          const locked = loc.minLevel != null && displayLevel < loc.minLevel
          const active = here?.path === loc.path
          return (
            <li key={loc.path} className={active ? 'sel' : undefined}>
              {locked ? (
                <span className="gf-dest locked" aria-label="Sealed location">
                  <span className="gf-ic">?</span> ??? <span className="gf-lock">sealed</span>
                </span>
              ) : (
                <Link
                  className={`gf-dest${active ? ' active' : ''}`}
                  to={loc.path}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="gf-ic">{loc.icon}</span> {loc.real}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
