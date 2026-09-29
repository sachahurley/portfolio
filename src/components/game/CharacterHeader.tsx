/**
 * CharacterHeader, the character screen's title block. Avatar (click to open
 * the appearance modal: figure + ink), editable name (random RPG default;
 * commits on blur or Enter), level + title + XP bar, and the level chest (an
 * unclaimed level-up) that opens the celebration modal; the same chest also
 * waits in the pack. Progress saves automatically, so nothing here is a save
 * button.
 *
 * Unframed and above the grid, not a fourth card: identity is the page's
 * title, not a stat. A 2px rule across the sheet sitting 24px above three
 * card tops would only double the grid's own borders.
 */

import { useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { inkColor } from '../../game/avatarInks'
import AvatarModal from './AvatarModal'
import ChestSignal from './ChestSignal'
import PortraitPlate from './PortraitPlate'
import { Input } from '@scorp-ds/components'

export default function CharacterHeader() {
  const {
    xp,
    level,
    name,
    setName,
    avatarSeed,
    avatarInk,
    pendingLevels,
    celebrateLevel,
  } = useXp()
  const [picking, setPicking] = useState(false)

  const commitName = (value: string) => {
    setName(value)
  }

  return (
    <header className="ch-header" aria-label="Character">
      <div className="ch-header-top">
        <div className="gf-label">character</div>
        {pendingLevels.length > 0 && (
          <button
            type="button"
            className="cs-levelchest"
            onClick={celebrateLevel}
            aria-label="Level up: open your level chest to claim your gem"
            title="Level up"
          >
            <ChestSignal tint="var(--accent)" />
          </button>
        )}
      </div>

      <div className="ch-header-row">
        <button
          className="cs-avatarbtn"
          onClick={() => setPicking(true)}
          aria-haspopup="dialog"
          aria-label="Change appearance"
          title="Change appearance"
        >
          {/* one tier up from the paperdoll cell: cell 6 is a 72px figure in
              the 96px well, and integer scales only or the 1-bit mask blurs */}
          <PortraitPlate seed={avatarSeed} cell={6} ink={inkColor(avatarInk)} large />
        </button>

        <div className="ch-header-id">
          {/* Uncontrolled on purpose: keyed by the saved name, committed on
              blur/Enter, so half-typed names never hit the save. */}
          <Input
            key={name}
            size="small"
            defaultValue={name}
            maxLength={40}
            aria-label="Character name"
            onBlur={(e) => commitName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
            }}
          />
          <div className="cs-lvl">
            Lv {level.level + 1} · {level.title}
          </div>
          <div
            className="gf-xpbar"
            role="progressbar"
            aria-valuenow={level.pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`XP progress: ${level.pct}%`}
          >
            <div className="gf-xpfill" style={{ width: `${level.pct}%` }} />
          </div>
          <div className="gf-xpnum">
            {level.need != null ? `${level.cur}/${level.need} XP` : `${xp} XP · max`}
          </div>
        </div>
      </div>

      <AvatarModal isOpen={picking} onClose={() => setPicking(false)} />
    </header>
  )
}
