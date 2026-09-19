/**
 * GemTrack — the gem collection row in the theme card.
 *
 * Fixed slot order: [Sepia default] [Lv1 ember] [Lv2 tide] [Lv3 dusk].
 * Every gem sits in a notched socket (the paperdoll's ring trick), so the
 * active one wears the accent ring exactly like a worn equipment slot.
 * The default gem is always present (it represents the stock look);
 * earned gems are accent-tinted and draggable; unearned levels show the
 * coming gem's silhouette dimmed in an empty socket.
 */

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useXp } from '../../context/XpProvider'
import { LEVEL_GEMS, THEMES, type ThemeId } from '../../lib/themes'
import Gem from './Gem'

const SLOTS: ThemeId[] = ['default', ...LEVEL_GEMS]

export default function GemTrack({
  onGemPointerDown,
  onGemActivate,
}: {
  onGemPointerDown: (e: ReactPointerEvent<HTMLElement>, id: ThemeId) => void
  /** Keyboard path (Enter/Space): wear the gem without the drag. */
  onGemActivate: (id: ThemeId) => void
}) {
  const { gems, activeGem } = useXp()

  return (
    <div className="gem-track">
      {SLOTS.map((id, i) => {
        const earned = id === 'default' || gems.includes(id)
        if (!earned) {
          return (
            <span
              key={id}
              className="gem-socket empty"
              role="img"
              aria-label={`Unlocks at level ${i + 1}`}
              title={`Unlocks at level ${i + 1}`}
            >
              <span className="gem-socket-in">
                <Gem themeId={id} dim />
              </span>
            </span>
          )
        }
        const active = activeGem === id
        return (
          <button
            key={id}
            type="button"
            className={`gem-socket track-gem${active ? ' active' : ''}`}
            title={THEMES[id].name}
            aria-label={`Wear the ${THEMES[id].name} gem`}
            aria-pressed={active}
            onPointerDown={(e) => onGemPointerDown(e, id)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter' && e.key !== ' ') return
              e.preventDefault()
              onGemActivate(id)
            }}
          >
            <span className="gem-socket-in">
              <Gem themeId={id} />
            </span>
            <span className="grip" />
          </button>
        )
      })}
    </div>
  )
}
