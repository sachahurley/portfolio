/**
 * Cauldron alternates lab (/lab/cauldron-alts)
 *
 * Five silhouettes for the character screen's gem sink, side by side in the
 * worn theme's colour. All five use the level-on read: a flat lip slab capping
 * the body, with the brew heaped over it rather than seen down into. Only the
 * body curve and the lip's overhang vary.
 *
 * Unlisted (not in data/lab.ts, no XP) until one is chosen; the pick then
 * becomes the `variant` prop on the real PixelCauldron in Character.
 */

import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import PixelCauldron, { type CauldronVariant } from '../components/game/PixelCauldron'
import GemTrack from '../components/progress/GemTrack'
import { useXp } from '../context/XpProvider'
import { THEMES } from '../lib/themes'
import { usePageTitle } from '../lib/usePageTitle'

const ALTS: { key: CauldronVariant; title: string; desc: string }[] = [
  {
    key: 'wide',
    title: 'A. Wide',
    desc: 'Broad and round with a generous lip, the brew heaped low and wide across it.',
  },
  {
    key: 'tall',
    title: 'B. Tall',
    desc: 'Narrower and taller, with the brew piled higher over a smaller lip. The most pot-like of the five.',
  },
  {
    key: 'squat',
    title: 'C. Squat',
    desc: 'Very wide, very short, sitting low to the ground. A stewpot: the least fussy silhouette.',
  },
  {
    key: 'necked',
    title: 'D. Necked',
    desc: 'A real neck — the wall holds narrow under the lip before flaring out, so the rim overhangs hardest here.',
  },
  {
    key: 'footed',
    title: 'E. Footed',
    desc: 'Standing on a foot ring rather than legs, with a girth band around the belly.',
  },
]

export default function CauldronAltsLab() {
  usePageTitle('Cauldron alternates')
  const { activeGem, setActiveGem } = useXp()

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Cauldron alternates</h1>
      <p className="lead">
        Five silhouettes for the theme card, all seen level-on: a flat lip capping the body with
        the brew boiling up over it. Boiling in the{' '}
        <span className="ch-wearing">{THEMES[activeGem].name}</span> brew — wear a different gem
        below and they all follow it.
      </p>

      {/* The real track, so the pots can be seen in every earned colour. No
          drag here (there is no single sink to drop into on this page), so
          the press itself wears the gem. */}
      <div className="cauldron-alt-track">
        <GemTrack onGemPointerDown={(_, id) => setActiveGem(id)} onGemActivate={setActiveGem} />
      </div>

      <div className="cauldron-alts">
        {ALTS.map((alt) => (
          <section key={alt.key} className="cauldron-alt">
            <div className="gf-label">{alt.title}</div>
            <p className="cauldron-alt-desc">{alt.desc}</p>
            <div className="cauldron-alt-stage">
              <PixelCauldron variant={alt.key} />
            </div>
          </section>
        ))}
      </div>
    </MinimalPage>
  )
}
