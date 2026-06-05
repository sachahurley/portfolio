/**
 * Layout Component
 *
 * Wraps every page. Renders the page content plus the persistent Minimal-mode
 * chrome (loader, floating dock, bottom sheet, toasts). No header, no footer.
 */

import { type ReactNode } from 'react'
import MinimalChrome from './MinimalChrome'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-page)] transition-colors flex flex-col overflow-x-hidden">
      {/* Page content - this is where Home, Projects, Notes, etc. render */}
      <main className="flex-1">{children}</main>

      {/* The only persistent UI: floating dock + sheet + loader + toasts */}
      <MinimalChrome />
    </div>
  )
}
