/**
 * Gem sink lab (/lab/cauldron)
 *
 * Three 1-bit directions for the thing theme gems get dropped into, side by
 * side in the worn brew colour. All three obey src/lib/dither/oneBit.ts: one
 * ink, no second paint colour, mid tones only as Bayer dither density. The
 * pick becomes the `variant` prop on the real PixelGemSink in Character.
 *
 * Unlisted: not in data/lab.ts, awards no XP.
 */

import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import PixelGemSink, { type SinkVariant } from '../components/game/PixelGemSink'
import GemTrack from '../components/progress/GemTrack'
import { useXp } from '../context/XpProvider'
import { THEMES } from '../lib/themes'
import { usePageTitle } from '../lib/usePageTitle'

const ALTS: { key: SinkVariant; title: string; desc: string }[] = [
  {
    key: 'hearth',
    title: 'A. Hearth',
    desc: 'No object at all: a floor of flame along the foot of the card, the way it worked before the cauldron. Heat becomes ink density, so the base is solid and the tips scatter. Fluid width, so it reaches the card walls.',
  },
  {
    key: 'pool',
    title: 'B. Pool',
    desc: 'A surface seen from above. Dense at the middle, thinning to the rim, with ripples running outward and bubbles surfacing as voids punched out of the ink. A drop sends a ring across it.',
  },
  {
    key: 'brazier',
    title: 'C. Brazier',
    desc: 'A vessel, but drawn in about twenty cells rather than modelled: a hollow bowl on a stem, solid ink, with the fire burning inside its walls.',
  },
]

export default function CauldronLab() {
  usePageTitle('Gem sink')
  const { activeGem, setActiveGem } = useXp()

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Gem sink</h1>
      <p className="lead">
        Three 1-bit directions for the theme card, inked in{' '}
        <span className="ch-wearing">{THEMES[activeGem].name}</span>. One ink, no second colour:
        every mid tone is dither density, so dark is the absence of ink. Wear a different gem and
        they all follow.
      </p>

      {/* The real track. No drag here (there is no single sink on this page),
          so the press itself wears the gem. */}
      <div className="cauldron-alt-track">
        <GemTrack onGemPointerDown={(_, id) => setActiveGem(id)} onGemActivate={setActiveGem} />
      </div>

      <div className="cauldron-alts">
        {ALTS.map((alt) => (
          <section key={alt.key} className="cauldron-alt">
            <div className="gf-label">{alt.title}</div>
            <p className="cauldron-alt-desc">{alt.desc}</p>
            <div className="cauldron-alt-stage">
              <PixelGemSink variant={alt.key} />
            </div>
          </section>
        ))}
      </div>
    </MinimalPage>
  )
}
