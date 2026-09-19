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
import VillageScene, { type VillageBadge } from '../components/village/VillageScene'
import { useXp } from '../context/XpProvider'
import { VILLAGE_HOME } from '../data/villageHome'
import { usePageTitle } from '../lib/usePageTitle'

export default function VillageHome() {
  usePageTitle()
  const navigate = useNavigate()

  // Rewards waiting on the character screen badge the sword hotspot, so
  // the home page carries the same pull as the side strip and the sheet.
  const { chests, pendingLevels } = useXp()
  const charBadge: VillageBadge | null =
    pendingLevels.length > 0
      ? { text: '▴ level up', aria: 'level up waiting', accent: true }
      : chests.length > 0
        ? {
            text: `▪ ${chests.length}`,
            aria: `${chests.length} chest${chests.length > 1 ? 's' : ''} waiting`,
          }
        : null

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

      <VillageScene
        items={VILLAGE_HOME}
        onNavigate={(href) => navigate(href)}
        badges={charBadge ? { '/character': charBadge } : undefined}
      />
    </MinimalPage>
  )
}
