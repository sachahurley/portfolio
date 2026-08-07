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

export default function Layout({ children }: LayoutProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const fullPage = useLocation().pathname === '/character'

  return (
    <div className={`gframe${fullPage ? ' gf-full' : ''} bg-[var(--surface-page)] transition-colors`}>
      {/* Adventure viewport - where Home, Quest Log, Library, etc. render */}
      <main className="gf-viewport" id="gf-viewport">
        {children}
      </main>

      {/* Right column: navigation, narration, and the visitor's character */}
      {!fullPage && (
        <aside className="gf-side">
          <Compass />
          <MessageLog />
          <CharacterStrip />
        </aside>
      )}

      {/* The welcome screen's jeweled stone frame, pinned around the
          viewport on every page */}
      <JeweledFrame site />

      {/* Loader (title screen), dock (Menu + campfire), sheet, toasts, modal */}
      <MinimalChrome sheetOpen={sheetOpen} onSheetOpenChange={setSheetOpen} />
    </div>
  )
}
