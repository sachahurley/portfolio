/**
 * MessageLog — the soul of the M&M feel: a persistent strip along the
 * bottom of the game frame narrating arrivals, XP gains, level-ups, and
 * hints. Newest line last; auto-scrolls to the tail. aria-live so screen
 * readers hear awards without needing the visual log.
 */

import { useEffect, useRef } from 'react'
import { useXp } from '../../context/XpProvider'

function fmtTime(at: number) {
  const d = new Date(at)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function MessageLog() {
  const { log } = useXp()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log])

  return (
    <section className="gf-log" aria-label="Message log">
      <div className="gf-label">log</div>
      <div className="gf-logscroll" ref={scrollRef} aria-live="polite">
        {log.length === 0 ? (
          <div className="gf-logline gf-dim">The world is quiet.</div>
        ) : (
          log.map((l) => (
            <div key={l.id} className={`gf-logline is-${l.kind}`}>
              <span className="gf-logtime">{fmtTime(l.at)}</span>
              <span className="gf-logmsg">{l.msg}</span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
