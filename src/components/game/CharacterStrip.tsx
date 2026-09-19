/**
 * CharacterStrip — the compact profile at the bottom of the game frame's
 * right column: avatar, name, level + title, mini XP bar, and badges for a
 * waiting ▴ LEVEL UP or unopened chests. Clicking navigates to /character
 * (the character management screen). Progress saves automatically; this is
 * a readout, never a save button.
 */

import { useNavigate } from 'react-router-dom'
import { Badge } from '@scorp-ds/components'
import { useXp } from '../../context/XpProvider'
import PortraitPlate from './PortraitPlate'

export default function CharacterStrip() {
  const { name, avatarSeed, level, pendingLevels, chests } = useXp()
  const navigate = useNavigate()

  return (
    <button
      className="gf-charstrip"
      onClick={() => navigate('/character')}
      aria-label={`Character: ${name}, level ${level.level + 1} ${level.title}. Open character screen.`}
    >
      <PortraitPlate seed={avatarSeed} cell={3} small />
      <span className="gf-cs-main">
        <span className="gf-cs-name">{name}</span>
        <span className="gf-cs-lvl">
          Lv {level.level + 1} — {level.title}
        </span>
        <span className="gf-cs-bar">
          <i style={{ width: `${level.pct}%` }} />
        </span>
      </span>
      {pendingLevels.length > 0 && <Badge variant="primary" size="small" className="gf-pulse uppercase [letter-spacing:.08em]">▴ level up</Badge>}
      {pendingLevels.length === 0 && chests.length > 0 && (
        <Badge variant="bone" size="small" className="uppercase [letter-spacing:.08em]">
          ▪ {chests.length} chest{chests.length > 1 ? 's' : ''}
        </Badge>
      )}
    </button>
  )
}
