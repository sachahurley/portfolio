/**
 * Cauldron lab (/lab/cauldron)
 *
 * The gem sink on its own, at card size and blown up, with a live gem track
 * so the pot can be checked in every earned brew colour. It began as a
 * five-way shape comparison; the shape is settled (traced from reference), so
 * what is left worth looking at is the pixel art and how each theme reads.
 *
 * Unlisted: not in data/lab.ts, awards no XP.
 */

import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import PixelCauldron from '../components/game/PixelCauldron'
import GemTrack from '../components/progress/GemTrack'
import { useXp } from '../context/XpProvider'
import { THEMES } from '../lib/themes'
import { usePageTitle } from '../lib/usePageTitle'

export default function CauldronLab() {
  usePageTitle('Cauldron')
  const { activeGem, setActiveGem } = useXp()

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Cauldron</h1>
      <p className="lead">
        The theme card&rsquo;s gem sink, boiling in the{' '}
        <span className="ch-wearing">{THEMES[activeGem].name}</span> brew. Wear a different gem and
        it follows.
      </p>

      {/* The real track. No drag here (there is no sink to drop into on this
          page), so the press itself wears the gem. */}
      <div className="cauldron-alt-track">
        <GemTrack onGemPointerDown={(_, id) => setActiveGem(id)} onGemActivate={setActiveGem} />
      </div>

      <div className="cauldron-alts">
        <section className="cauldron-alt">
          <div className="gf-label">at size</div>
          <p className="cauldron-alt-desc">As it sits in the theme card.</p>
          <div className="cauldron-alt-stage">
            <PixelCauldron />
          </div>
        </section>

        <section className="cauldron-alt">
          <div className="gf-label">blown up</div>
          <p className="cauldron-alt-desc">
            Doubled, for the pixels. Whole-number scales only, or the art blurs.
          </p>
          <div className="cauldron-alt-stage cauldron-zoom">
            <PixelCauldron />
          </div>
        </section>
      </div>
    </MinimalPage>
  )
}
