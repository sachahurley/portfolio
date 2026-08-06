/**
 * ChestRevealModal, the loot reveal, shown after opening a chest on the
 * character screen. Same portal/focus/Esc pattern as LevelUpModal and the
 * same .emodal card chrome; the item pops in with the egg-award keyframe.
 * State lives on the character page (opening is always user-initiated
 * there), so this stays a dumb presentational dialog.
 */

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PixelItem from './game/PixelItem'
import { RARITY_COLORS, RARITY_LABELS, STAT_NAMES, STAT_IDS, type Item } from '../game/loot'

export default function ChestRevealModal({
  item,
  onClose,
}: {
  item: Item | null
  onClose: () => void
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!item) {
      prevFocusRef.current?.focus()
      prevFocusRef.current = null
      return
    }
    prevFocusRef.current = document.activeElement as HTMLElement | null
    btnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [item, onClose])

  if (!item) return null

  return createPortal(
    <div className="emodal open" role="dialog" aria-modal="true" aria-label="Chest opened">
      <div className="em-card">
        <div className="em-item">
          <PixelItem kind={item.slot} base={item.base} seed={item.id} rarity={item.rarity} cell={8} />
        </div>
        <div className="em-title" style={{ color: RARITY_COLORS[item.rarity] }}>
          {item.name}
        </div>
        <div className="em-text">
          <span className={`rar-${item.rarity}`}>{RARITY_LABELS[item.rarity]}</span>
          {item.name !== item.baseName ? ` ${item.baseName.toLowerCase()}` : ` ${item.slot}`}
          <span className="ch-card-stats">
            {STAT_IDS.filter((s) => item.stats[s] != null).map((s) => (
              <span key={s} className="ch-statline">
                +{item.stats[s]} {STAT_NAMES[s]}
              </span>
            ))}
          </span>
        </div>
        <button className="em-btn" ref={btnRef} onClick={onClose}>
          Take it
        </button>
      </div>
    </div>,
    document.body
  )
}
