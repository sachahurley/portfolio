/**
 * Home alternates lab (/lab/home-alts)
 *
 * Three scenery-free takes on the village home, stacked for comparison:
 * the same sprites, theme inking, hover invert, bob and glints, but only
 * the apps (data/villageHome.ts HOME_APPS), arranged like a phone home
 * screen. Unlisted (not in data/lab.ts, no XP) until one is chosen; the
 * pick then becomes a `layout` prop on the real home's VillageScene.
 */

import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import VillageScene, { type SceneLayout } from '../components/village/VillageScene'
import { HOME_APPS, HOME_SCREEN_LAYOUT } from '../data/villageHome'
import { usePageTitle } from '../lib/usePageTitle'

// Module constants: VillageScene rebuilds whenever its layout changes identity.
const ALTS: { title: string; desc: string; layout: SceneLayout }[] = [
  {
    title: 'A. Main Street',
    desc: 'The village with the scenery gone: the apps on a ground line, one row where it fits.',
    layout: { mode: 'spread', cellPx: 80, cols: [3] },
  },
  {
    title: 'B. Home Screen',
    desc: 'A 3 by 2 grid of equal cells, no ground, the icons floating like apps.',
    layout: HOME_SCREEN_LAYOUT,
  },
  {
    title: 'C. App Tiles',
    desc: 'Each icon framed as a 1-bit app icon; pressing one fills the tile. One row where it fits.',
    layout: { mode: 'grid', cols: [6, 3], cellPx: 80, tile: 28, ground: false },
  },
]

export default function HomeAltsLab() {
  usePageTitle('Home alternates')
  const navigate = useNavigate()

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Home alternates</h1>
      <p className="lead">The village home without its scenery, three ways. Every app still works.</p>

      {ALTS.map((alt) => (
        <section key={alt.title} className="mn-block home-alt">
          <div className="label">{alt.title}</div>
          <p className="home-alt-desc">{alt.desc}</p>
          <VillageScene items={HOME_APPS} layout={alt.layout} onNavigate={(href) => navigate(href)} />
        </section>
      ))}
    </MinimalPage>
  )
}
