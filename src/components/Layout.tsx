/**
 * Layout Component
 *
 * Wraps every page in the RPG game frame: the adventure viewport (page
 * content) on the left; compass, message log, and the character strip
 * stacked in the right column. On desktop the frame is fixed and the
 * viewport scrolls internally; below 960px the frame chrome hides and the
 * page scrolls normally (the "handheld port"). The bottom sheet (nav +
 * character row + contact) is owned here and opened by the dock's Menu
 * button; the character strip navigates to /character instead.
 *
 * /character is the exception: it renders as a full-page modal (gf-full),
 * so the right column drops out and the viewport stops scrolling; the
 * page's own close button is the way back out.
 */

import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import MinimalChrome from './MinimalChrome'
import JeweledFrame from './JeweledFrame'
import Compass from './game/Compass'
import MessageLog from './game/MessageLog'
import CharacterStrip from './game/CharacterStrip'

interface LayoutProps {
  children: ReactNode
}

// The side column's collapsed state survives visits (UI pref, not save data,
// so it lives beside — not inside — the sh_min save blob).
const SIDE_KEY = 'sh_side'

export default function Layout({ children }: LayoutProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sideCollapsed, setSideCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDE_KEY) === '1'
    } catch {
      return false
    }
  })
  const fullPage = useLocation().pathname === '/character'

  const toggleSide = () => {
    setSideCollapsed((collapsed) => {
      const next = !collapsed
      try {
        localStorage.setItem(SIDE_KEY, next ? '1' : '0')
      } catch {
        /* private mode: state still toggles for this visit */
      }
      return next
    })
  }

  return (
    <div
      className={`gframe${fullPage ? ' gf-full' : ''}${!fullPage && sideCollapsed ? ' gf-noside' : ''} bg-[var(--surface-page)] transition-colors`}
    >
      {/* Adventure viewport - where Home, Quest Log, Library, etc. render */}
      <main className="gf-viewport" id="gf-viewport">
        {children}
      </main>

      {/* Right column: navigation, narration, and the visitor's character.
          Collapsible (desktop only, where it exists): a drawer-pull tab
          rides the seam at mid-height; collapsed, the same tab waits at
          the frame's right edge to pull the column back out. */}
      {!fullPage && !sideCollapsed && (
        <aside className="gf-side" id="gf-side">
          <button
            type="button"
            className="gf-collapse"
            onClick={toggleSide}
            aria-label="Collapse side panel"
            aria-expanded="true"
            aria-controls="gf-side"
          >
            <span aria-hidden="true">›</span>
          </button>
          <Compass />
          <MessageLog />
          <CharacterStrip />
        </aside>
      )}
      {!fullPage && sideCollapsed && (
        <button
          type="button"
          className="gf-collapse gf-expand"
          onClick={toggleSide}
          aria-label="Expand side panel"
          aria-expanded="false"
        >
          <span aria-hidden="true">‹</span>
        </button>
      )}

      {/* The welcome screen's jeweled stone frame, pinned around the
          viewport on every page */}
      <JeweledFrame site />

      {/* Loader (title screen), dock (Menu + campfire), sheet, toasts, modal */}
      <MinimalChrome sheetOpen={sheetOpen} onSheetOpenChange={setSheetOpen} />
    </div>
  )
}
