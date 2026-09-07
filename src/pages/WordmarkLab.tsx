/**
 * Wordmark lab (/lab/wordmark)
 *
 * Six tunings of the welcome title's live dither, all on the 1-bit block
 * stack ('block' variant of DitherLive). Same pipeline as the welcome
 * screen (Dither Studio asset, ordered dissolve, tonal fade, rim boil);
 * only the studio values change per instance, via the DitherTuning prop.
 * Every demo re-runs its entrance on a shared 9s loop and on click, so
 * the dissolve/fade differences stay comparable. Reduced motion (handled
 * inside DitherLive) shows the finished stills.
 */

import { useEffect, useState } from 'react'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import DitherLive, { type DitherTuning } from '../components/DitherLive'
import { usePageTitle } from '../lib/usePageTitle'

/* Recipes are module constants so their identity is stable across renders
 * (the tuning fields feed DitherLive's effect deps). Welcome-screen stock
 * values for reference: fps 7, frames 8, boil 0.1, dissolve 10, fade 18,
 * fadeFrom sepia-700. */
const RECIPES: { kicker: string; desc: string; tuning: DitherTuning }[] = [
  {
    kicker: '01 · reference beat',
    desc: 'fps 15, frames 12: the full speed of the reference clips instead of the half-time site beat.',
    tuning: { fps: 15, frames: 12 },
  },
  {
    kicker: '02 · slow burn',
    desc: 'fps 4, boil 0.05, dissolve 16, fade 28: statelier beat, calmer rim, longer entrance.',
    tuning: { fps: 4, boil: 0.05, dissolveBeats: 16, fadeBeats: 28 },
  },
  {
    kicker: '03 · hot rim',
    desc: 'boil 0.45: everything else stock; the letter edges seethe hard.',
    tuning: { boil: 0.45 },
  },
  {
    kicker: '04 · snap',
    desc: 'dissolve 2, fade 3: the title materialises almost instantly, then boils as usual.',
    tuning: { dissolveBeats: 2, fadeBeats: 3 },
  },
  {
    kicker: '05 · cinematic',
    desc: 'fps 10, dissolve 30, fade 48, opening from sepia-800: a long ~3s dissolve rising out of near-black.',
    tuning: {
      fps: 10,
      dissolveBeats: 30,
      fadeBeats: 48,
      fadeFrom: ['--color-sepia-800', '#474030'],
    },
  },
  {
    kicker: '06 · negative',
    desc: 'palette inverted: light sepia ground, the lettering dissolves in dark.',
    tuning: {
      palette: [
        ['--color-sepia-100', '#fcfbfa'],
        ['--color-sepia-950', '#1a150f'],
        ['--color-sepia-700', '#695f4d'],
        ['--color-sepia-300', '#f0ebe4'],
        ['--color-sepia-900', '#2b2718'],
        ['--color-sepia-800', '#474030'],
        ['--color-sepia-600', '#968a75'],
      ],
      fadeFrom: ['--color-sepia-300', '#f0ebe4'],
    },
  },
  {
    kicker: '07 · dot matrix',
    desc: 'dot cell 4, size 2, gain 0.82, boil 0.3: the lettering as separated halftone dots that sparkle and churn, entrance unchanged.',
    tuning: { dot: { cell: 4, size: 2, gain: 0.82 }, boil: 0.3 },
  },
  {
    kicker: '08 · triple wave',
    desc: 'reference beat (fps 15, frames 12), three dissolve passes: the title loads in at the body tone, a lighter fire1 pass sweeps over it, then the bright fg pass finishes on top.',
    tuning: {
      fps: 15,
      frames: 12,
      dissolveBeats: 14,
      waves: [
        ['--body', '#bfb4a3'],
        ['--fire1', '#e0dace'],
        ['--fg', '#fdfcfb'],
      ],
    },
  },
  {
    kicker: '09 · fill',
    desc: 'wide tonal gaps: the wordmark dissolves in at deep sepia-700 just above the ground, the body mid fill rises bottom to top behind the dithered edge, then the bright fg fill rises over it and holds.',
    tuning: {
      fill: {
        beats: 20,
        band: 12,
        from: ['--color-sepia-700', '#695f4d'],
        via: ['--body', '#bfb4a3'],
        to: ['--fg', '#fdfcfb'],
      },
    },
  },
]

export default function WordmarkLab() {
  usePageTitle('Wordmark lab')
  // Bumping the epoch remounts every DitherLive so all entrances re-run
  // together; clicking a single demo replays just that one.
  const [epoch, setEpoch] = useState(0)
  const [solo, setSolo] = useState<Record<string, number>>({})
  useEffect(() => {
    const id = setInterval(() => setEpoch((e) => e + 1), 9000)
    return () => clearInterval(id)
  }, [])

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Wordmark lab</h1>
      <p className="lead">
        Six tunings of the welcome title&apos;s live dither on the 1-bit block stack. Same Dither
        Studio pipeline as the welcome screen; only the studio values change. Entrances replay every
        9s, or click a frame to rerun one.
      </p>

      <div className="mn-block">
        {RECIPES.map((r) => (
          <section key={r.kicker} className="wm-demo">
            <div className="wm-kicker">{r.kicker}</div>
            <button
              type="button"
              className="wm-frame"
              aria-label={`Replay ${r.kicker}`}
              onClick={() => setSolo((s) => ({ ...s, [r.kicker]: (s[r.kicker] ?? 0) + 1 }))}
            >
              <DitherLive
                key={`${epoch}-${solo[r.kicker] ?? 0}`}
                variant="block"
                tuning={r.tuning}
              />
            </button>
            <p className="wm-desc">{r.desc}</p>
          </section>
        ))}
      </div>
    </MinimalPage>
  )
}
