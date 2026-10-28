/**
 * Village home (/): the home page.
 *
 * Name and bio up top, then three titled sections of 1-bit village-kit
 * icons (VillageScene, sharing HOME_SECTION_LAYOUT from
 * data/villageHome.ts so their columns line up) and cards:
 * - Navigation: the four core pages.
 * - Featured: shortcuts into the work (data/featured.ts) as cards
 *   (FeaturedCard): a picture, the 1-bit icon, the label and one line.
 * - Adventure: the game layer. Character, and World (the turning globe,
 *   which opens "Thank you for visiting", WorldStatsModal) once the
 *   lifetime totals load: a counter that is wrong is worse than absent.
 * The full scenic village (VILLAGE_HOME) stays in the data file and other
 * scenery-free takes live at /lab/home-alts. (The old classic list home
 * was retired; it lives on in git history under the v4-village-and-vault
 * tag.)
 */

import { useNavigate } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import VillageScene from '../components/village/VillageScene'
import type { ReactNode } from 'react'
import {
  ADVENTURE_APPS,
  ADVENTURE_APPS_WITH_WORLD,
  HOME_NAV_APPS,
  HOME_SECTION_LAYOUT,
} from '../data/villageHome'
import { FEATURED } from '../data/featured'
import FeaturedCard from '../components/FeaturedCard'
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
    <MinimalPage flushTop centerY>
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
      <HomeSection id="home-nav" title="navigation">
        <VillageScene items={HOME_NAV_APPS} layout={HOME_SECTION_LAYOUT} onNavigate={(href) => navigate(href)} />
      </HomeSection>

      <HomeSection id="home-featured" title="featured">
        <div className="featured-cards">
          {FEATURED.map((f) => (
            <FeaturedCard key={f.path} item={f} />
          ))}
        </div>
      </HomeSection>

      <HomeSection id="home-adventure" title="adventure">
        <VillageScene
          items={stats ? ADVENTURE_APPS_WITH_WORLD : ADVENTURE_APPS}
          layout={HOME_SECTION_LAYOUT}
          onNavigate={(href) => navigate(href)}
          onAction={(action) => action === 'world' && openWorld()}
        />
      </HomeSection>
    </MinimalPage>
  )
}

/** A ruled section with a centred title, labelling the grid beneath it. */
function HomeSection({
  id,
  title,
  className,
  children,
}: {
  id: string
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={`home-section${className ? ` ${className}` : ''}`} aria-labelledby={id}>
      <h2 id={id} className="home-section-title">
        {title}
      </h2>
      {children}
    </section>
  )
}
