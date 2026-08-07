/**
 * BottomSheet — the iOS-style sheet (all screen sizes), opened by the dock's
 * Menu button or the game frame's character strip.
 *
 * Contents: nav from the world-map registry (Lab sealed until Level 2), a
 * compact character row linking to the /character screen (the full sheet
 * lives there), and the contact links ("dispatch a raven"). Drag the grab
 * handle down to dismiss; also closes on scrim tap, Esc, or a nav link.
 */

import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { LOCATIONS } from '../game/locations'
import PixelPortrait from './game/PixelPortrait'
import PixelStoneBorder from './PixelStoneBorder'
import DitherIcon from './DitherIcon'
import { ArrowUpRight } from './icons'

export default function BottomSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const location = useLocation()
  const { level, award, name, avatarSeed, pendingLevels, chests } = useXp()
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
                <DitherIcon name="lock" size={20} className="gf-ic" /> ???
                <span className="nav-flavor">sealed</span>
              </span>
            ) : (
              <Link
                key={loc.path}
                to={loc.path}
                className={isActive(loc.path) ? 'active' : undefined}
                onClick={onClose}
              >
                <DitherIcon name={loc.icon} size={20} className="gf-ic" /> {loc.real}
              </Link>
            )
          })}
        </nav>

        {/* Compact character row: the full sheet lives at /character. */}
        <Link
          className="sheet-char"
          to="/character"
          onClick={onClose}
          aria-label={`Character: ${name}. Open character screen.`}
        >
          <PixelPortrait seed={avatarSeed} cell={3} />
          <span className="sheet-char-main">
            <span className="sheet-char-name">{name}</span>
            <span className="sheet-char-lvl">
              Lv {level.level + 1} — {level.title}
            </span>
          </span>
          {pendingLevels.length > 0 ? (
            <span className="gf-cs-badge">▴ level up</span>
          ) : chests.length > 0 ? (
            <span className="gf-cs-badge chest">
              ▪ {chests.length} chest{chests.length > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="sheet-char-go">›</span>
          )}
        </Link>

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
