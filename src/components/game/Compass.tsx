/**
 * Compass: the game frame's navigation, organised like the home page.
 * "Navigation" lists every location, always visible (the ???/sealed
 * treatment only appears if a location sets minLevel; none currently do);
 * "Featured" lists the same shortcuts as the home page's Featured section
 * (data/featured.ts). Character and World are not menu rows: they live in
 * the home page's Adventure section, and Character in the player strip.
 */

import { Link, useLocation } from 'react-router-dom'
import { LOCATIONS, NAV_FEATURED, extraFor, locationFor } from '../../game/locations'
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
  // a featured shortcut outranks its section: on /lab/tarot, Tarot lights, not Lab
  const extra = extraFor(pathname)
  const here = extra ? undefined : locationFor(pathname)

  return (
    <nav className="gf-panel gf-compass" aria-label="Menu">
      <div className="gf-label gf-navlabel" id="compass-nav">navigation</div>
      <ul aria-labelledby="compass-nav">
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
      </ul>
      <div className="gf-label gf-navlabel" id="compass-featured">featured</div>
      <ul aria-labelledby="compass-featured">
        {NAV_FEATURED.map((dest) => (
          <Dest key={dest.path} {...dest} active={extra?.path === dest.path} />
        ))}
      </ul>
    </nav>
  )
}
