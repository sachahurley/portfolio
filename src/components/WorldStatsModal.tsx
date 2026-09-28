/**
 * WorldStatsModal: "Thank you for visiting", opened by the home grid's World app.
 *
 * Four lifetime totals, summed across every visitor the site has ever had
 * (api/_lib/counters.ts). They are the one place the site stops being a
 * private save file and admits other people have been here, and they
 * advertise the game layer without explaining it: a visitor who never opens
 * the character sheet still learns there is XP, that quests get read, and
 * that gems are a thing to claim.
 *
 * Chrome (scrim, plate panel, Esc, focus trap) is the DS Modal. Its body
 * centres the turning globe over the figures, the literal version of what
 * they count: not this visitor, everyone.
 *
 * The page only offers the World app once the totals have arrived (see
 * VillageHome). A lifetime counter that is wrong is worse than one that is
 * absent, so an unreachable endpoint, or a deploy with no counter store
 * wired up, simply has no World app, and this dialog never opens.
 *
 * The figures tick up from zero, staggered left to right, each time the
 * dialog opens (the Modal unmounts its body on close). The tick waits for
 * the row to be on screen and the title screen to be down, and is skipped
 * entirely under prefers-reduced-motion.
 */

import { useEffect, useRef, useState, type RefObject } from 'react'
import { Modal } from '@scorp-ds/components'
import PixelGlobe from './PixelGlobe'
import type { SiteStats } from '../lib/siteStats'
import { onTitleScreenGone, titleScreenGone } from '../lib/titleScreen'

/** How long one cell takes to tick from 0 to its figure. */
const TICK_MS = 420
/** How long each cell waits after the one to its left. */
const STAGGER_MS = 70

const CELLS: { key: keyof SiteStats; label: string; spoken: string }[] = [
  { key: 'travellers', label: 'Travellers', spoken: 'travellers so far' },
  { key: 'xp', label: 'XP earned', spoken: 'XP earned by everyone' },
  { key: 'quests', label: 'Quests read', spoken: 'quests read to the end' },
  { key: 'gems', label: 'Gems claimed', spoken: 'gems claimed' },
]

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * One reveal clock for the whole row: elapsed ms since the tick started, or
 * Infinity once every cell has landed. A single rAF loop rather than a timer
 * per cell, and it stops itself instead of running for the life of the page.
 *
 * Nothing starts until the row is on screen AND the title screen is down;
 * whichever of those arrives second is what fires it.
 */
function useReveal(target: RefObject<HTMLElement | null>, cells: number): number {
  const span = TICK_MS + STAGGER_MS * Math.max(0, cells - 1)
  const [elapsed, setElapsed] = useState(() => (prefersReduced() ? Infinity : 0))

  useEffect(() => {
    const node = target.current
    if (!node || prefersReduced()) return

    let raf = 0
    let onScreen = false
    let running = false

    const start = () => {
      if (running || !onScreen || !titleScreenGone()) return
      running = true
      const t0 = performance.now()
      const step = (now: number) => {
        const t = now - t0
        if (t >= span) {
          setElapsed(Infinity)
          return
        }
        setElapsed(t)
        raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    // 0.6 rather than any sliver: the row should be properly on screen
    // before it starts counting, not clipped by one line at the fold.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) start()
      },
      { threshold: 0.6 }
    )
    io.observe(node)
    const offGate = onTitleScreenGone(start)

    return () => {
      io.disconnect()
      offGate()
      cancelAnimationFrame(raf)
    }
  }, [span, target])

  return elapsed
}

/** A thank-you from the site to the visitor, over what everyone has added up to. */
const TITLE = 'Thank you for visiting'

/** The figure this cell is showing right now, mid-tick. */
function ticked(figure: number, index: number, elapsed: number): number {
  if (!Number.isFinite(elapsed)) return figure
  const frac = Math.min(1, Math.max(0, (elapsed - index * STAGGER_MS) / TICK_MS))
  return Math.ceil(frac * figure)
}

export default function WorldStatsModal({
  stats,
  isOpen,
  onClose,
}: {
  stats: SiteStats
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={TITLE} width="min(560px, 92vw)">
      <StatRow stats={stats} />
    </Modal>
  )
}

function StatRow({ stats }: { stats: SiteStats }) {
  const rowRef = useRef<HTMLUListElement>(null)
  const elapsed = useReveal(rowRef, CELLS.length)

  return (
    <>
      <div className="hs-head">
        <PixelGlobe />
      </div>

      <ul className="hs-row" ref={rowRef}>
        {CELLS.map((cell, i) => {
          const total = stats[cell.key]
          return (
            <li key={cell.key} className="hs-cell">
              <span className="hs-val" aria-hidden="true">
                {ticked(total, i, elapsed).toLocaleString('en-US')}
              </span>
              <span className="hs-label" aria-hidden="true">
                {cell.label}
              </span>
              {/* The spoken version skips the tick and reads as a sentence. */}
              <span className="sr-only">{`${total.toLocaleString('en-US')} ${cell.spoken}`}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
