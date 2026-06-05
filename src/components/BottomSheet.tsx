/**
 * BottomSheet — the iOS-style menu (all screen sizes).
 *
 * A scrim + sliding sheet containing the nav list, then a footer row with the
 * level + XP bar and the Game/Minimal mode toggle (a placeholder for now).
 * Drag the grab handle down to dismiss; also closes on scrim tap, Esc, or
 * selecting a nav link.
 */

import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useXp } from '../context/XpProvider'

const NAV: [string, string][] = [
  ['/', 'Home'],
  ['/projects', 'Projects'],
  ['/lab', 'Lab'],
  ['/notes', 'Notes'],
  ['/about', 'About'],
]

export default function BottomSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const location = useLocation()
  const { level, toast } = useXp()
  const sheetRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  // Close on Escape while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Clear any drag transforms whenever open state flips
  useEffect(() => {
    const sheet = sheetRef.current
    const scrim = scrimRef.current
    if (sheet) sheet.style.transform = ''
    if (scrim) scrim.style.opacity = ''
  }, [open])

  // Drag-to-dismiss
  const onGrabberDown = (e: React.PointerEvent) => {
    const sheet = sheetRef.current
    const scrim = scrimRef.current
    if (!sheet) return
    const startY = e.clientY
    let dy = 0
    sheet.classList.add('dragging')

    const move = (ev: PointerEvent) => {
      dy = Math.max(0, ev.clientY - startY)
      sheet.style.transform = `translateX(-50%) translateY(${dy}px)`
      if (scrim) scrim.style.opacity = String(Math.max(0, 1 - dy / 400))
    }
    const up = () => {
      sheet.classList.remove('dragging')
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerup', up)
      const shouldClose = dy > 120
      sheet.style.transform = ''
      if (scrim) scrim.style.opacity = ''
      if (shouldClose) onClose()
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerup', up)
  }

  return (
    <>
      <div
        ref={scrimRef}
        className={`scrim${open ? ' open' : ''}`}
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        id="sheet"
        className={`sheet${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="grabber" onPointerDown={onGrabberDown} />

        <nav className="menu-nav">
          {NAV.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={isActive(path) ? 'active' : undefined}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="menu-foot">
          <span className="lvl">
            <span>{`lv${level.idx + 1} · ${level.name}`}</span>
            <span className="mbar">
              <i style={{ width: `${level.pct}%` }} />
            </span>
          </span>
          <button
            className="toggle"
            aria-label="Switch to Quest mode"
            onClick={() => toast('Quest mode is coming soon, building minimal first ⚔')}
          >
            <span className="qicon">⚔</span> Quest mode
          </button>
        </div>
      </div>
    </>
  )
}
