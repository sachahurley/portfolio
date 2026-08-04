/**
 * Compass — the game frame's navigation and de facto sitemap. Lists every
 * reachable location with its hotkey; the Vault stays sealed (shown as ???)
 * until the visitor reaches Level 2. Bare digit keys travel; keystrokes in
 * inputs/textareas are ignored.
 */

import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOCATIONS, locationFor } from '../../game/locations'
import { useXp } from '../../context/XpProvider'

export default function Compass() {
  const { level, logLine } = useXp()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const displayLevel = level.level + 1
  const here = locationFor(pathname)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      const loc = LOCATIONS.find((l) => l.hotkey === e.key)
      if (!loc) return
      if (loc.minLevel && displayLevel < loc.minLevel) {
        logLine('A sealed door. It does not yield — yet.', 'hint')
        return
      }
      navigate(loc.path)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, displayLevel, logLine])

  return (
    <nav className="gf-panel gf-compass" aria-label="Compass">
      <div className="gf-label">compass</div>
      <ul>
        {LOCATIONS.map((loc) => {
          const locked = loc.minLevel != null && displayLevel < loc.minLevel
          const active = here?.path === loc.path
          return (
            <li key={loc.path}>
              {locked ? (
                <span className="gf-dest locked" aria-label="Sealed location">
                  <span className="gf-key">{loc.hotkey}</span> ??? <span className="gf-lock">sealed</span>
                </span>
              ) : (
                <Link
                  className={`gf-dest${active ? ' active' : ''}`}
                  to={loc.path}
                  aria-current={active ? 'page' : undefined}
                  title={loc.real}
                >
                  <span className="gf-key">{loc.hotkey}</span> {loc.name}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
