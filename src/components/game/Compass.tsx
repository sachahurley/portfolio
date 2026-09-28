/**
 * Compass — the game frame's navigation and de facto sitemap. Lists every
 * location, always visible (the ???/sealed treatment only appears if a
 * location sets minLevel; none currently do), then the menu-only extras
 * (Character), which share the row markup but aren't world locations.
 */

import { Link, useLocation } from 'react-router-dom'
import { LOCATIONS, NAV_EXTRAS, locationFor } from '../../game/locations'
import { useXp } from '../../context/XpProvider'
import DitherIcon from '../DitherIcon'
import VillageIcon, { type VillageIconName } from '../village/VillageIcon'

function Dest({ path, real, icon, active }: { path: string; real: string; icon: VillageIconName; active: boolean }) {
  return (
    <li>
      <Link
        className={`gf-dest${active ? ' active' : ''}`}
        to={path}
        aria-current={active ? 'page' : undefined}
      >
        <VillageIcon name={icon} size={16} className="gf-ic" /> {real}
      </Link>
    </li>
  )
}

export default function Compass() {
  const { level } = useXp()
  const { pathname } = useLocation()
  const displayLevel = level.level + 1
  const here = locationFor(pathname)

  return (
    <nav className="gf-panel gf-compass" aria-label="Menu">
      <ul>
        {LOCATIONS.map((loc) =>
          loc.minLevel != null && displayLevel < loc.minLevel ? (
            <li key={loc.path}>
              <span className="gf-dest locked" aria-label="Sealed location">
                <DitherIcon name="lock" size={16} className="gf-ic" /> ???{' '}
                <span className="gf-lock">sealed</span>
              </span>
            </li>
          ) : (
            <Dest key={loc.path} {...loc} active={here?.path === loc.path} />
          ),
        )}
        {/* no active state needed: /character is a full-page route, and the
            side column (this compass included) isn't rendered there */}
        {NAV_EXTRAS.map((dest) => (
          <Dest key={dest.path} {...dest} active={false} />
        ))}
      </ul>
    </nav>
  )
}
