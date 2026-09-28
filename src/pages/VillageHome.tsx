/**
 * Village home (/) — the home page.
 *
 * Name and bio up top, then the site's apps as a 3 by 2 home-screen grid
 * of 1-bit village-kit icons (VillageScene + data/villageHome.ts
 * HOME_APPS / HOME_SCREEN_LAYOUT): the labeled, glinting icons are the
 * nav. The full scenic village (VILLAGE_HOME) stays in the data file and
 * the other scenery-free takes live at /lab/home-alts. (The old classic
 * list home was retired; it lives on in git history under the
 * v4-village-and-vault tag.)
 */

import { useNavigate } from 'react-router-dom'
import HomeStats from '../components/HomeStats'
import MinimalPage from '../components/MinimalPage'
import VillageScene from '../components/village/VillageScene'
import { HOME_APPS, HOME_SCREEN_LAYOUT } from '../data/villageHome'
import { usePageTitle } from '../lib/usePageTitle'

export default function VillageHome() {
  usePageTitle()
  const navigate = useNavigate()

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
        items={HOME_APPS}
        layout={HOME_SCREEN_LAYOUT}
        onNavigate={(href) => navigate(href)}
      />

      {/* the page's only footer: lifetime totals across every visitor the
          site has ever had (renders nothing until they arrive) */}
      <HomeStats />
    </MinimalPage>
  )
}
