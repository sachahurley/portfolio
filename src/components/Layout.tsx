/**
 * Layout Component
 *
 * Wraps every page in the RPG game frame: the adventure viewport (page
 * content, ~70% width), the character panel + compass on the right, and the
 * message log along the bottom. On desktop the frame is fixed and the
 * viewport scrolls internally, like a real game UI; below 960px the frame
 * chrome hides and the page scrolls normally with the dock/sheet (the
 * "handheld port"). MinimalChrome still provides the loader (title screen),
 * dock + sheet (mobile nav), toasts (mobile), and the level-up modal.
 */

import { type ReactNode } from 'react'
import MinimalChrome from './MinimalChrome'
import CharacterPanel from './game/CharacterPanel'
import Compass from './game/Compass'
import MessageLog from './game/MessageLog'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="gframe bg-[var(--surface-page)] transition-colors">
      {/* Adventure viewport - where Home, Quest Log, Library, etc. render */}
      <main className="gf-viewport" id="gf-viewport">
        {children}
      </main>

      {/* Right column: the visitor's save file + navigation */}
      <aside className="gf-side">
        <CharacterPanel />
        <Compass />
      </aside>

      {/* Bottom strip: the narrating message log */}
      <MessageLog />

      {/* Loader (title screen), dock + sheet (mobile), toasts, level-up modal */}
      <MinimalChrome />
    </div>
  )
}
