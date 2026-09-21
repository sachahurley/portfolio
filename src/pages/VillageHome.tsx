/**
 * Village home (/) — the home page.
 *
 * The site as a 1-bit pixel village, rendered natively from the village
 * kit (VillageScene + data/villageHome.ts): name and bio up top, then
 * the village where the labeled, glinting icons are the nav. (The old
 * classic list home was retired; it lives on in git history under the
 * v4-village-and-vault tag.)
 */

import { useNavigate } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import VillageScene from '../components/village/VillageScene'
import { VILLAGE_HOME } from '../data/villageHome'
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
      <VillageScene items={VILLAGE_HOME} onNavigate={(href) => navigate(href)} />
    </MinimalPage>
  )
}
