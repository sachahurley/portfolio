/**
 * Loader — the title screen shown on initial load.
 * Stays up until the visitor taps, clicks, or presses a key, then fades
 * out and unmounts.
 *
 * The title is DitherLive (SACHA HURLEY on sepia-950, entering via the
 * WELCOME_TUNING rising-fill recipe with a quiet rim boil; WELCOME_ART
 * below picks which lettering variant); below it, in flow so it never
 * overlaps the
 * art, the role line and the save-file readout: just the press-any-key
 * (or tap, on touch screens) prompt for
 * first-time visitors, CONTINUE plus the character (portrait, name,
 * banners) for returning ones (currently hidden behind SHOW_SAVE_READOUT) —
 * saving itself is automatic, this is
 * just where the save shows. The prompt is boxed in an asterisk border
 * that blinks along with the text.
 */

import { useEffect, useState } from 'react'
import DitherLive, { type DitherLiveVariant, type DitherTuning } from './DitherLive'
import JeweledFrame from './JeweledFrame'
import PixelPortrait from './game/PixelPortrait'
import { inkColor } from '../game/avatarInks'
import { useXp } from '../context/XpProvider'
import { dismissTitleScreen } from '../lib/titleScreen'

/** Which welcome lettering to show: 'block' is the 1-bit Helvetica stack,
 *  'wild' the metal drip lettering (kept fully wired; flip to bring it back). */
const WELCOME_ART: DitherLiveVariant = 'block'

/** Welcome entrance: the wordmark lab's "09 · fill" recipe (keep the two in
 *  sync when tuning). Dissolves in at deep sepia-700, then the body mid fill
 *  and the bright fg fill rise bottom to top behind a dithered edge. Module
 *  constant so its identity is stable across renders (it feeds DitherLive's
 *  effect deps). */
const WELCOME_TUNING: DitherTuning = {
  fill: {
    beats: 20,
    band: 12,
    from: ['--color-sepia-700', '#695f4d'],
    via: ['--body', '#bfb4a3'],
    to: ['--fg', '#fdfcfb'],
  },
}

/** Feature flag: the CONTINUE save readout for returning visitors (portrait,
 *  name, banner count). Off for now; flip to true to bring it back. Saving
 *  still happens either way, this only hides the readout. */
const SHOW_SAVE_READOUT: boolean = false

/** The role line under the wordmark: the art only says the name, and without
 *  this testers read the title screen as a game or a brand, not a person. */
const ROLE = 'Product Design Engineer'

/** Phones and tablets have no key to press: the prompt says tap instead. The
 *  overlay dismisses on click either way, so only the copy changes. Module
 *  constant: this is a client-only SPA and the primary pointer doesn't change
 *  mid-visit. */
const TOUCH = window.matchMedia('(pointer: coarse)').matches

/** The press-any-key prompt inside a border drawn from asterisks. Rendered
 *  as three pre-wrapped monospace lines so the edge rows always match the
 *  text row's width; the whole box shares the ts-hint blink. */
function StarBox({ text }: { text: string }) {
  const inner = `* ${text} *`
  const edge = '*'.repeat(inner.length)
  return <span className="ts-hint ts-hint-box">{`${edge}\n${inner}\n${edge}`}</span>
}

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)
  const { isReturning, name, avatarSeed, avatarInk, gems } = useXp()

  // Once dismissed, let the 0.4s opacity fade play, then unmount. The gate
  // is published on the same beat, so entrances underneath the overlay (the
  // home stat row's count-up) start when the visitor can actually see them
  // rather than while the title screen is still covering the page.
  useEffect(() => {
    if (!hidden) return
    dismissTitleScreen()
    const t = setTimeout(() => setGone(true), 450)
    return () => clearTimeout(t)
  }, [hidden])

  // The overlay blocks the whole site, so a key press dismisses it too.
  useEffect(() => {
    if (hidden) return
    const onKey = () => setHidden(true)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hidden])

  if (gone) return null

  return (
    // Dismiss on click, NOT pointerdown: hiding on pointerdown turns off the
    // overlay's pointer-events mid-tap, so the tap's pointerup/click would
    // fall through and activate whatever sits underneath on the page.
    <div id="loader" className={hidden ? 'hide' : undefined} onClick={() => setHidden(true)}>
      {/* the art takes the leftover height; its integer scaling shrinks to fit */}
      <div className="title-art">
        <DitherLive
          variant={WELCOME_ART}
          tuning={WELCOME_TUNING}
          fit="fill-height"
          ariaLabel={`Sacha Hurley, ${ROLE}. ${TOUCH ? 'Tap' : 'Press any key'} to begin.`}
        />
      </div>
      <div className="title-save">
        <span className="ts-line">{ROLE}</span>
        {isReturning ? (
          <>
            {SHOW_SAVE_READOUT && (
              <div className="ts-char">
                <PixelPortrait seed={avatarSeed} cell={3} ink={inkColor(avatarInk)} />
                <span className="ts-line">
                  continue — {name}
                  {gems.length > 0 && ` · ${gems.length} banner${gems.length > 1 ? 's' : ''}`}
                </span>
              </div>
            )}
            <StarBox text={TOUCH ? 'tap to continue' : 'press any key'} />
          </>
        ) : (
          <StarBox text={TOUCH ? 'tap to begin' : 'press any key to begin'} />
        )}
      </div>
      <JeweledFrame />
    </div>
  )
}
