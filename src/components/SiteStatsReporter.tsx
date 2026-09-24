/**
 * SiteStatsReporter: contributes this browser's share of the lifetime site
 * counters. Renders nothing; Layout mounts one for the whole app, so it
 * keeps reporting as the visitor moves around rather than only on Home.
 *
 * Nothing is sent until the visitor has pressed past the title screen. A
 * crawler, a prefetch or a bounced load therefore never becomes a
 * "traveller": the number counts browsers that got far enough to look at
 * the site, which is the most honest thing client-side counting can claim.
 *
 * Reports are debounced, so a visitor who trips several awards at once
 * (arriving, opening a case study, reading it to the end) sends one
 * request carrying the sum rather than three.
 */

import { useEffect, useSyncExternalStore } from 'react'
import { useXp } from '../context/XpProvider'
import { FLUSH_DELAY_MS, reportContribution } from '../lib/siteStats'
import { onTitleScreenGone, titleScreenGone } from '../lib/titleScreen'

export default function SiteStatsReporter() {
  const { xp, gems, getEarned } = useXp()
  const gemCount = gems.length
  // Subscribed rather than held in state: useSyncExternalStore reads the
  // gate after mount, which is the only point at which "is the title screen
  // up" has a truthful answer (see lib/titleScreen.ts).
  const gateDown = useSyncExternalStore(onTitleScreenGone, titleScreenGone, () => false)

  useEffect(() => {
    if (!gateDown) return
    const timer = setTimeout(() => {
      const quests = getEarned().filter((key) => key.startsWith('questdone:')).length
      void reportContribution({ xp, quests, gems: gemCount }, true)
    }, FLUSH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [gateDown, xp, gemCount, getEarned])

  return null
}
