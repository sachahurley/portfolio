/**
 * Cauldron alternates lab (/lab/cauldron-alts)
 *
 * Five silhouettes for the character screen's gem sink, side by side in the
 * worn theme's colour. None of them carries a flat bar across the top: the
 * rim is an elliptical ring (or absent), so the pot reads as a pot rather
 * than as something standing behind a table.
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
    key: 'rolled',
    title: 'A. Rolled',
    desc: 'A rolled rim ring tucked straight onto a round belly, ring handles, two legs. The reference shape with the bar taken out.',
  },
  {
    key: 'open',
    title: 'B. Open',
    desc: 'No rim at all. The wall simply ends and the brew sits in the opening, so the widest thing on the pot is its belly.',
  },
  {
    key: 'banded',
    title: 'C. Banded',
    desc: 'Squat and wide, with a girth band around the belly doing the decorative work a heavy rim used to do.',
  },
  {
    key: 'bowl',
    title: 'D. Bowl',
    desc: 'Shallow and wide-mouthed, seen further from above. The brew becomes the subject and the iron is just the frame.',
  },
  {
    key: 'urn',
    title: 'E. Urn',
    desc: 'Tall, narrow-mouthed, standing on a pedestal instead of legs. The least cauldron-like, the most alchemical.',
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
        Five pots for the theme card, all boiling in the{' '}
        <span className="ch-wearing">{THEMES[activeGem].name}</span> brew. Wear a different gem
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
