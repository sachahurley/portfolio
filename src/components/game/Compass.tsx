/**
 * Compass — the game frame's navigation and de facto sitemap. Lists every
 * location, always visible (the ???/sealed treatment only appears if a
 * location sets minLevel; none currently do), then the menu-only extras
 * (Character, Tarot), which share the row markup but aren't world
 * locations, then World, a row that opens the stats dialog instead of
 * navigating (listed once the lifetime totals have loaded).
 */

import { Link, useLocation } from 'react-router-dom'
import { LOCATIONS, NAV_EXTRAS, NAV_WORLD, extraFor, locationFor } from '../../game/locations'
import { useXp } from '../../context/XpProvider'
import { useSiteStats } from '../../lib/siteStats'
import { openWorld } from '../../lib/worldDialog'
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
  // a menu extra outranks its section: on /lab/tarot, Tarot lights, not Lab
  const extra = extraFor(pathname)
  const here = extra ? undefined : locationFor(pathname)
  const stats = useSiteStats()

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
        {NAV_EXTRAS.map((dest) => (
          <Dest key={dest.path} {...dest} active={extra?.path === dest.path} />
        ))}
        {stats && (
          <li>
            <button type="button" className="gf-dest" onClick={openWorld}>
              <VillageIcon name={NAV_WORLD.icon} size={16} className="gf-ic" /> {NAV_WORLD.real}
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
