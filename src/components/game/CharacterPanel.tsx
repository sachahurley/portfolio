/**
 * CharacterPanel, the identity block of the character screen. Avatar
 * (click to open the picker: 8 procedural candidates + reroll), editable
 * name (random RPG default; commits on blur or Enter), level + title + XP
 * bar, and the ▴ LEVEL UP badge that opens the celebration modal. Progress
 * saves automatically, so nothing here is a save button.
 */

import { useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { randomSeed } from '../../game/names'
import PixelPortrait from './PixelPortrait'
import { Input } from '@scorp-ds/components'

const rollCandidates = () => Array.from({ length: 8 }, () => randomSeed())

export default function CharacterPanel() {
  const {
    xp,
    level,
    name,
    setName,
    avatarSeed,
    setAvatarSeed,
    pendingLevels,
    celebrateLevel,
  } = useXp()
  const [picking, setPicking] = useState(false)
  const [candidates, setCandidates] = useState<number[]>([])

  const togglePicker = () => {
    if (!picking) setCandidates(rollCandidates())
    setPicking(!picking)
  }

  const commitName = (value: string) => {
    setName(value)
  }

  return (
    <section className="cs" aria-label="Character sheet">
      <div className="gf-label">character</div>

      <div className="cs-head">
        <button
          className="cs-avatarbtn"
          onClick={togglePicker}
          aria-expanded={picking}
          aria-label="Change avatar"
          title="Change avatar"
        >
          <PixelPortrait seed={avatarSeed} cell={4} />
        </button>

        <div className="cs-id">
          {/* Uncontrolled on purpose: keyed by the saved name, committed on
              blur/Enter, so half-typed names never hit the save. */}
          <Input
            key={name}
            variant="quiet"
            className="text-base"
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

        {pendingLevels.length > 0 && (
          <button className="cs-levelup" onClick={celebrateLevel}>
            ▴ level up
          </button>
        )}
      </div>

      {picking && (
        <div className="cs-picker" role="group" aria-label="Choose an avatar">
          {candidates.map((s) => (
            <button
              key={s}
              className="cs-cand"
              onClick={() => {
                setAvatarSeed(s)
                setPicking(false)
              }}
              aria-label="Pick this avatar"
            >
              <PixelPortrait seed={s} cell={3} />
            </button>
          ))}
          <button className="cs-reroll" onClick={() => setCandidates(rollCandidates())}>
            ↻ Reroll
          </button>
        </div>
      )}
    </section>
  )
}
