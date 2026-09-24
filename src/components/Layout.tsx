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
import SiteStatsReporter from './SiteStatsReporter'
import JeweledFrame from './JeweledFrame'
import Compass from './game/Compass'
import MessageLog from './game/MessageLog'
import CharacterStrip from './game/CharacterStrip'
import { TAROT_ENABLED } from '../lib/flags'

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
  // Pages that take the whole frame: no side column, single grid area.
  const path = useLocation().pathname
  const fullPage = path === '/character' || (TAROT_ENABLED && path === '/lab/tarot')

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
      className={`gframe${fullPage ? ' gf-full' : ''} bg-[var(--surface-page)] transition-colors`}
    >
      {/* Adventure viewport - where Home, Quest Log, Library, etc. render */}
      <main className="gf-viewport" id="gf-viewport">
        {children}
      </main>

      {/* Right column: navigation, narration, and the visitor's character.
          Collapsible (desktop only, where it exists): the column stays
          mounted and its width animates shut (content clipped at fixed
          width, so nothing squishes and the log keeps its scroll). The
          drawer-pull tab hangs off the column's left edge, so it rides the
          moving seam and ends up waiting at the frame's right edge — one
          tab for both directions. */}
      {!fullPage && (
        <aside className={`gf-side${sideCollapsed ? ' is-closed' : ''}`} id="gf-side">
          <button
            type="button"
            className="gf-collapse"
            onClick={toggleSide}
            aria-label={sideCollapsed ? 'Expand side panel' : 'Collapse side panel'}
            aria-expanded={!sideCollapsed}
            aria-controls="gf-side"
          >
            <span aria-hidden="true">{sideCollapsed ? '‹' : '›'}</span>
          </button>
          <div className="gf-side-in">
            <div className="gf-side-fix">
              <Compass />
              <MessageLog />
              <CharacterStrip />
            </div>
          </div>
        </aside>
      )}

      {/* The welcome screen's jeweled stone frame, pinned around the
          viewport on every page */}
      <JeweledFrame site />

      {/* Loader (title screen), dock (Menu + campfire), sheet, toasts, modal */}
      <MinimalChrome sheetOpen={sheetOpen} onSheetOpenChange={setSheetOpen} />

      {/* Contributes this visit to the lifetime counters in Home's footer */}
      <SiteStatsReporter />
    </div>
  )
}
