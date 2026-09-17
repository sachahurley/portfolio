/**
 * StatsBlock, the character screen's gear summary and stat list.
 *
 * Every stat is the level base plus equipped bonuses, shown as
 * `(+bonus) base`. With a pack item selected, each bonus it would change
 * previews as `(+current → +new)` in the up/down colors. Bonuses count up
 * when gear changes (instant under reduced motion). Each stat carries a
 * line of flavor.
 */

import { useEffect, useRef, useState } from 'react'
import {
  SLOTS,
  STAT_FLAVOR,
  STAT_IDS,
  STAT_NAMES,
  sumEquippedStats,
  type Item,
  type SavedItem,
  type Slot,
  type StatId,
} from '../../game/loot'

const COUNT_MS = 400

/** Animate a number toward `value` whenever it changes. */
function useCountUp(value: number): number {
  const [shown, setShown] = useState(value)
  const shownRef = useRef(value)
  useEffect(() => {
    const from = shownRef.current
    if (from === value) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const k = reduced ? 1 : Math.min(1, (t - t0) / COUNT_MS)
      shownRef.current = Math.round(from + (value - from) * k)
      setShown(shownRef.current)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return shown
}

function StatRow({
  stat,
  base,
  bonus,
  preview,
}: {
  stat: StatId
  base: number
  bonus: number
  preview: number | null
}) {
  const shown = useCountUp(bonus)
  const changes = preview != null && preview !== bonus
  return (
    <div className="ch-statrow" title={STAT_FLAVOR[stat]}>
      <div className="ch-stat">
        <span>{STAT_NAMES[stat].toLowerCase()}</span>
        <span>
          {changes ? (
            <span className={preview > bonus ? 'stat-up' : 'stat-down'}>
              (+{bonus} → +{preview}){' '}
            </span>
          ) : (
            shown > 0 && <span className="ch-bonus">(+{shown}) </span>
          )}
          {base}
        </span>
      </div>
      <div className="ch-statflavor">{STAT_FLAVOR[stat]}</div>
    </div>
  )
}

export default function StatsBlock({
  items,
  equipment,
  displayLevel,
  previewItem,
}: {
  items: SavedItem[]
  equipment: Partial<Record<Slot, number>>
  displayLevel: number
  /** A pack item being inspected; its would-be stats preview inline. */
  previewItem: Item | null
}) {
  const base = 4 + 2 * displayLevel
  const bonuses = sumEquippedStats(items, equipment)
  const preview = previewItem
    ? sumEquippedStats(items, { ...equipment, [previewItem.slot]: previewItem.id })
    : null
  const filled = SLOTS.filter((s) => equipment[s] != null).length
  const power = STAT_IDS.reduce((n, s) => n + bonuses[s], 0)

  return (
    <>
      <div className="gf-label ch-sectlabel">stats</div>
      <div className="ch-gearline">
        gear {filled}/{SLOTS.length} · power {power}
      </div>
      <div className="ch-stats">
        {STAT_IDS.map((s) => (
          <StatRow
            key={s}
            stat={s}
            base={base}
            bonus={bonuses[s]}
            preview={preview ? preview[s] : null}
          />
        ))}
      </div>
    </>
  )
}
