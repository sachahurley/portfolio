/**
 * Layout Component
 *
 * Wraps every page in the RPG game frame: the adventure viewport (page
 * content) on the left; compass, message log, and the character strip
 * stacked in the right column. On desktop the frame is fixed and the
 * viewport scrolls internally; below 960px the frame chrome hides and the
 * page scrolls normally (the "handheld port"). The bottom sheet (character
 * sheet + nav + contact) is owned here so both the dock's Menu button and
 * the character strip can open it.
 */

import { useState, type ReactNode } from 'react'
import MinimalChrome from './MinimalChrome'
import Compass from './game/Compass'
import MessageLog from './game/MessageLog'
import CharacterStrip from './game/CharacterStrip'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="gframe bg-[var(--surface-page)] transition-colors">
      {/* Adventure viewport - where Home, Quest Log, Library, etc. render */}
      <main className="gf-viewport" id="gf-viewport">
        {children}
      </main>

      {/* Right column: navigation, narration, and the visitor's character */}
      <aside className="gf-side">
        <Compass />
        <MessageLog />
        <CharacterStrip onOpen={() => setSheetOpen(true)} />
      </aside>

      {/* Loader (title screen), dock (Menu + campfire), sheet, toasts, modal */}
      <MinimalChrome sheetOpen={sheetOpen} onSheetOpenChange={setSheetOpen} />
    </div>
  )
}
