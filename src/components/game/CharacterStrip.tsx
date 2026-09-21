/**
 * CharacterStrip — the compact profile at the bottom of the game frame's
 * right column: avatar, name, level + title, mini XP bar. A small chest
 * sits at the row's end while an unopened chest waits on the character
 * screen (loot chests and level chests alike: an unclaimed level-up is a
 * chest too).
 * Clicking navigates to /character (the character management screen).
 * Progress saves automatically; this is a readout, never a save button.
 */

import { useNavigate } from 'react-router-dom'
import { useXp } from '../../context/XpProvider'
import PortraitPlate from './PortraitPlate'
import ChestSignal from './ChestSignal'
import { inkColor } from '../../game/avatarInks'

export default function CharacterStrip() {
  const { name, avatarSeed, avatarInk, level, pendingLevels, chests } = useXp()
  const navigate = useNavigate()
  // Quiet signals only: the moments themselves already got toasts. Chests
  // waiting show as the chest art itself (iconographic, no text, so the
  // strip's narrow name column stays uncrushed).
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
      <PortraitPlate seed={avatarSeed} cell={3} ink={inkColor(avatarInk)} small />
      <span className="gf-cs-main">
        <span className="gf-cs-name">{name}</span>
        <span className="gf-cs-lvl">
          Lv {level.level + 1} — {level.title}
        </span>
        <span className="xp-mini">
          <i style={{ width: `${level.pct}%` }} />
        </span>
      </span>
      {waiting > 0 && (
        <span className="gf-cs-chest">
          <ChestSignal />
        </span>
      )}
    </button>
  )
}
