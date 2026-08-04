/**
 * CharacterPanel — the M&M party strip reimagined for one party member: the
 * visitor. Shows the save-file identity (TRAVELLER), level + title, the XP
 * bar, eggs held (the banners earned so far), and the next unlock. Lives in
 * the game frame's right column on desktop.
 */

import { Link } from 'react-router-dom'
import { useXp } from '../../context/XpProvider'
import { THEMES } from '../../lib/themes'

export default function CharacterPanel() {
  const { xp, level, eggs, activeEgg } = useXp()
  const displayLevel = level.level + 1

  return (
    <section className="gf-panel gf-char" aria-label="Character">
      <div className="gf-label">save file</div>
      <div className="gf-charname">TRAVELLER</div>
      <div className="gf-charlvl">
        Level {displayLevel} · {level.title}
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
        {level.need != null ? `${level.cur}/${level.need} XP` : `${xp} XP · MAX`}
      </div>

      {/* Banners (eggs) earned; the active one is marked. The ritual itself
          (dropping an egg into the fire) lives at the Crossroads. */}
      <div className="gf-eggrow" aria-label="Banners earned">
        {eggs.length === 0 ? (
          <span className="gf-dim">no banners yet</span>
        ) : (
          eggs.map((e) => (
            <span
              key={e}
              className={`gf-egg${activeEgg === e ? ' active' : ''}`}
              title={`${THEMES[e].name}${activeEgg === e ? ' (raised)' : ''}`}
              style={{ background: THEMES[e].base, borderColor: THEMES[e].mark }}
            />
          ))
        )}
      </div>

      {displayLevel < 2 && (
        <div className="gf-dim gf-unlock">
          Next: Level 2 reveals a sealed door on the compass.
        </div>
      )}
      {displayLevel >= 2 && eggs.length > 0 && (
        <div className="gf-dim gf-unlock">
          Raise a banner: drop an egg into the <Link to="/">Crossroads fire</Link>.
        </div>
      )}
    </section>
  )
}
