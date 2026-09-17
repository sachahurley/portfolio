/**
 * Compass — the game frame's navigation and de facto sitemap. Lists every
 * location, always visible (the ???/sealed treatment only appears if a
 * location sets minLevel; none currently do).
 */

import { Link, useLocation } from 'react-router-dom'
import { LOCATIONS, locationFor } from '../../game/locations'
import { useXp } from '../../context/XpProvider'
import { homeToggleRow } from '../../lib/homeVariant'
import DitherIcon from '../DitherIcon'

export default function Compass() {
  const { level } = useXp()
  const { pathname, search } = useLocation()
  const displayLevel = level.level + 1
  const here = locationFor(pathname)
  const toggle = homeToggleRow(search)

  return (
    <nav className="gf-panel gf-compass" aria-label="Menu">
      <ul>
        {LOCATIONS.map((loc) => {
          const locked = loc.minLevel != null && displayLevel < loc.minLevel
          const active = here?.path === loc.path
          return (
            <li key={loc.path} className={active && !locked ? 'sel' : undefined}>
              {locked ? (
                <span className="gf-dest locked" aria-label="Sealed location">
                  <DitherIcon name="lock" size={16} className="gf-ic" /> ???{' '}
                  <span className="gf-lock">sealed</span>
                </span>
              ) : (
                <Link
                  className={`gf-dest${active ? ' active' : ''}`}
                  to={loc.path}
                  aria-current={active ? 'page' : undefined}
                >
                  <DitherIcon name={loc.icon} size={16} className="gf-ic" /> {loc.real}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
      {/* Home-variant toggle: deliberately smaller and plainer than the
          nav rows - a quiet utility link, not a destination. */}
      <div className="menu-alt">
        <Link
          className="home-toggle"
          to={toggle.to}
          aria-label={`Switch to the ${toggle.label.toLowerCase()} page`}
        >
          {toggle.label}
        </Link>
      </div>
    </nav>
  )
}
