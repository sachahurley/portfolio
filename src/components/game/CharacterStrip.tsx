/**
 * CharacterStrip — the compact profile at the bottom of the game frame's
 * right column: avatar, name, level + title, mini XP bar, and a ▴ LEVEL UP
 * badge when a celebration is waiting. Clicking opens the bottom sheet
 * (the full character sheet). Progress saves automatically; this is a
 * readout, never a save button.
 */

import { useXp } from '../../context/XpProvider'
import PixelPortrait from './PixelPortrait'

export default function CharacterStrip({ onOpen }: { onOpen: () => void }) {
  const { name, avatarSeed, level, pendingLevels } = useXp()

  return (
    <button
      className="gf-charstrip"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-controls="sheet"
      aria-label={`Character: ${name}, level ${level.level + 1} ${level.title}. Open character sheet.`}
    >
      <PixelPortrait seed={avatarSeed} cell={3} />
      <span className="gf-cs-main">
        <span className="gf-cs-name">{name}</span>
        <span className="gf-cs-lvl">
          Lv {level.level + 1} — {level.title}
        </span>
        <span className="gf-cs-bar">
          <i style={{ width: `${level.pct}%` }} />
        </span>
      </span>
      {pendingLevels.length > 0 && <span className="gf-cs-badge">▴ level up</span>}
    </button>
  )
}
