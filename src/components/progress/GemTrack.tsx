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
}: {
  onGemPointerDown: (e: ReactPointerEvent<HTMLElement>, id: ThemeId) => void
}) {
  const { gems, activeGem } = useXp()

  return (
    <div className="gem-track">
      {SLOTS.map((id, i) => {
        const earned = id === 'default' || gems.includes(id)
        if (!earned) {
          return (
            <span key={id} className="gem-socket empty" title={`Unlocks at level ${i + 1}`}>
              <span className="gem-socket-in">
                <Gem themeId={id} dim />
              </span>
            </span>
          )
        }
        const active = activeGem === id
        return (
          <span
            key={id}
            className={`gem-socket track-gem${active ? ' active' : ''}`}
            title={THEMES[id].name}
            onPointerDown={(e) => onGemPointerDown(e, id)}
          >
            <span className="gem-socket-in">
              <Gem themeId={id} />
            </span>
            <span className="grip" />
          </span>
        )
      })}
    </div>
  )
}
