/**
 * EggTrack — the egg collection row in "Your Progress".
 *
 * Fixed slot order: [Amber default] [Lv1 ember] [Lv2 tide] [Lv3 dusk]. The
 * default egg is always present (it represents the stock look); earned eggs
 * are colored and draggable (the grip below each is the real grab target);
 * unearned levels show a subtle outline placeholder. The active egg wears an
 * egg-shaped accent ring.
 */

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useXp } from '../../context/XpProvider'
import { EGGPATH, eggPlaceholderSVG } from '../../lib/eggArt'
import { LEVEL_EGGS, THEMES, type ThemeId } from '../../lib/themes'
import Egg from './Egg'

const SLOTS: ThemeId[] = ['default', ...LEVEL_EGGS]

export default function EggTrack({
  onEggPointerDown,
}: {
  onEggPointerDown: (e: ReactPointerEvent<HTMLElement>, id: ThemeId) => void
}) {
  const { eggs, activeEgg } = useXp()

  return (
    <div className="egg-track">
      {SLOTS.map((id, i) => {
        const earned = id === 'default' || eggs.includes(id)
        if (!earned) {
          return (
            <span
              key={id}
              className="track-egg empty"
              title={`Unlocks at Level ${i + 1}`}
              dangerouslySetInnerHTML={{ __html: eggPlaceholderSVG('egg-art') }}
            />
          )
        }
        const active = activeEgg === id
        return (
          <span
            key={id}
            className={`track-egg${active ? ' active' : ''}`}
            title={THEMES[id].name}
            onPointerDown={(e) => onEggPointerDown(e, id)}
          >
            <Egg themeId={id} cls="egg-art" />
            {active && (
              <svg className="egg-ring" viewBox="0 0 64 82" aria-hidden="true">
                <path d={EGGPATH} vectorEffect="non-scaling-stroke" />
              </svg>
            )}
            <span className="grip" />
          </span>
        )
      })}
    </div>
  )
}
