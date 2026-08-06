/**
 * CharacterStrip — the compact profile at the bottom of the game frame's
 * right column: avatar, name, level + title, mini XP bar, and badges for a
 * waiting ▴ LEVEL UP or unopened chests. Clicking navigates to /character
 * (the character management screen). Progress saves automatically; this is
 * a readout, never a save button.
 */

import { useNavigate } from 'react-router-dom'
import { useXp } from '../../context/XpProvider'
import PixelPortrait from './PixelPortrait'

export default function CharacterStrip() {
  const { name, avatarSeed, level, pendingLevels, chests } = useXp()
  const navigate = useNavigate()

  return (
    <button
      className="gf-charstrip"
      onClick={() => navigate('/character')}
      aria-label={`Character: ${name}, level ${level.level + 1} ${level.title}. Open character screen.`}
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
      {pendingLevels.length === 0 && chests.length > 0 && (
        <span className="gf-cs-badge chest">
          ▪ {chests.length} chest{chests.length > 1 ? 's' : ''}
        </span>
      )}
    </button>
  )
}
