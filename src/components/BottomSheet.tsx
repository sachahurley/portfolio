/**
 * BottomSheet — the iOS-style sheet (all screen sizes), opened by the dock's
 * Menu button or the game frame's character strip.
 *
 * Contents: nav from the world-map registry (icon + game name + plain name,
 * Vault sealed until Level 2), the full character sheet (avatar, name, XP,
 * banners), and the contact links ("dispatch a raven"). Drag the grab handle
 * down to dismiss; also closes on scrim tap, Esc, or selecting a nav link.
 */

import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { LOCATIONS } from '../game/locations'
import CharacterPanel from './game/CharacterPanel'
import PixelStoneBorder from './PixelStoneBorder'
import { ArrowUpRight } from './icons'

export default function BottomSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const location = useLocation()
  const { level, award } = useXp()
  const displayLevel = level.level + 1
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
          {LOCATIONS.map((loc) => {
            const locked = loc.minLevel != null && displayLevel < loc.minLevel
            return locked ? (
              <span key={loc.path} className="nav-sealed" aria-label="Sealed location">
                <span className="gf-ic">?</span> ???
                <span className="nav-real">sealed</span>
              </span>
            ) : (
              <Link
                key={loc.path}
                to={loc.path}
                className={isActive(loc.path) ? 'active' : undefined}
                onClick={onClose}
              >
                <span className="gf-ic">{loc.icon}</span> {loc.name}
                <span className="nav-real">{loc.real}</span>
              </Link>
            )
          })}
        </nav>

        <CharacterPanel />

        {/* Contact — sheet-only by design; no dedicated page, no email. */}
        <div className="sheet-contact">
          <div className="gf-label">dispatch a raven</div>
          <a
            href="https://x.com/sacha_hurley"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => award(XP_AWARDS.follow, 'followed on X', 'follow')}
          >
            X · @sacha_hurley <ArrowUpRight />
          </a>
          <a href="https://github.com/sachahurley" target="_blank" rel="noopener noreferrer">
            GitHub · sachahurley <ArrowUpRight />
          </a>
        </div>

        {/* Carved-stone baseboard along the very bottom of the sheet. */}
        <PixelStoneBorder />
      </div>
    </>
  )
}
