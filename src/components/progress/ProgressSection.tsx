/**
 * ProgressSection — the home "Your Progress" block.
 *
 * Header, explainer, level row + XP bar, and the egg track. The explainer
 * deliberately never mentions eggs or the fire: the reward mechanic reveals
 * itself at the first level-up. Earned eggs drag into THE pixel fire at the
 * very bottom of the page (PixelFire, whose handle Home passes down) - there
 * is no separate fire here. The level copy is the shared levelLabel string
 * (same as the menu sheet).
 */

import type { RefObject } from 'react'
import { useXp } from '../../context/XpProvider'
import { levelLabel } from '../../lib/levels'
import type { PixelFireHandle } from '../PixelFire'
import EggTrack from './EggTrack'
import { useEggDrag } from './useEggDrag'

export default function ProgressSection({
  fireApiRef,
}: {
  fireApiRef: RefObject<PixelFireHandle | null>
}) {
  const { level, setActiveEgg, toast } = useXp()

  const { onPointerDown } = useEggDrag({
    fireApiRef,
    onDrop: setActiveEgg,
    toast,
  })

  return (
    <div className="mn-block firesection">
      <div className="label">your progress</div>
      <p className="xp-explain">
        Earn XP as you explore. Each new level brings a surprise reward.
      </p>
      <div className="xp-line">
        <span className="xp-row">{levelLabel(level)}</span>
        <div className="xp-bar">
          <i style={{ width: `${level.pct}%` }} />
        </div>
      </div>
      <EggTrack onEggPointerDown={onPointerDown} />
    </div>
  )
}
