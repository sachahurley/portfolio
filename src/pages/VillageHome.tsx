/**
 * Village home (/) — the home page.
 *
 * Name and bio up top, then the site's apps as a 3 by 2 home-screen grid
 * of 1-bit village-kit icons (VillageScene + data/villageHome.ts
 * HOME_APPS / HOME_SCREEN_LAYOUT): the labeled, glinting icons are the
 * nav. Once the lifetime totals load, a seventh app joins on its own row:
 * World, the turning globe, which opens "Thank you for visiting"
 * (WorldStatsModal, mounted site-wide in MinimalChrome) rather than
 * navigating. The full scenic village
 * (VILLAGE_HOME) stays in the data file and the other scenery-free takes
 * live at /lab/home-alts. (The old classic
 * list home was retired; it lives on in git history under the
 * v4-village-and-vault tag.)
 */

import { useNavigate } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import VillageScene from '../components/village/VillageScene'
import { HOME_APPS, HOME_APPS_WITH_WORLD, HOME_SCREEN_LAYOUT } from '../data/villageHome'
import { useSiteStats } from '../lib/siteStats'
import { openWorld } from '../lib/worldDialog'
import { usePageTitle } from '../lib/usePageTitle'

export default function VillageHome() {
  usePageTitle()
  const navigate = useNavigate()
  // The World app only exists once the lifetime totals have loaded: a
  // counter that is wrong is worse than one that is absent.
  const stats = useSiteStats()

  return (
    <MinimalPage flushTop>
      <section className="intro">
        <h1>Sacha Hurley</h1>
      </section>

      <div className="bio">
        <p>
          Product design engineer at Betterfly, working on a health app. Earlier: Meta, EA
          Sports, and Utility, the design agency I co-founded.
        </p>
      </div>

      {/* reward badges retired from the village: the waiting signal
          lives on the character strip / sheet row / dock dot */}
      <VillageScene
        items={stats ? HOME_APPS_WITH_WORLD : HOME_APPS}
        layout={HOME_SCREEN_LAYOUT}
        onNavigate={(href) => navigate(href)}
        onAction={(action) => action === 'world' && openWorld()}
      />
    </MinimalPage>
  )
}
