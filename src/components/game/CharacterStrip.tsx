/**
 * CharacterStrip — the compact profile at the bottom of the game frame's
 * right column: avatar, name, level + title, mini XP bar, and a corner dot
 * when a level claim or chest waits. Clicking navigates to /character
 * (the character management screen). Progress saves automatically; this is
 * a readout, never a save button.
 */

import { useNavigate } from 'react-router-dom'
import { useXp } from '../../context/XpProvider'
import PortraitPlate from './PortraitPlate'

export default function CharacterStrip() {
  const { name, avatarSeed, level, pendingLevels, chests } = useXp()
  const navigate = useNavigate()
  // One quiet signal for everything waiting on the character screen
  // (pending level claims + unopened chests); the moment itself already
  // got a toast, so the persistent signal doesn't pulse or shout. It's the
  // dock notch's corner dot, not an inline badge: the strip's column is
  // narrow and a badge in the row crushes the name and level line.
  const waiting = pendingLevels.length + chests.length

  return (
    // Deliberately NOT a DS ListRow: this is a filled footer strip (game
    // chrome) with an embedded XP bar and a corner state dot; expressing
    // it through ListRow would take more overrides than the recipe below.
    <button
      className="gf-charstrip"
      onClick={() => navigate('/character')}
      aria-label={`Character: ${name}, level ${level.level + 1} ${level.title}.${
        waiting > 0 ? ` ${waiting} reward${waiting > 1 ? 's' : ''} waiting.` : ''
      } Open character screen.`}
    >
      <PortraitPlate seed={avatarSeed} cell={3} small />
      <span className="gf-cs-main">
        <span className="gf-cs-name">{name}</span>
        <span className="gf-cs-lvl">
          Lv {level.level + 1} — {level.title}
        </span>
        <span className="xp-mini">
          <i style={{ width: `${level.pct}%` }} />
        </span>
      </span>
      {waiting > 0 && <span className="gf-cs-dot" aria-hidden="true" />}
    </button>
  )
}
