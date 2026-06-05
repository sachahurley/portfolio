/**
 * Layout Component
 * 
 * Wraps every page with the shared Navbar and Footer.
 * This means you don't have to repeat the nav/footer in every page file.
 */

import { type ReactNode } from 'react'

// "children" is whatever page content gets placed inside the Layout
interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-page)] transition-colors flex flex-col overflow-x-hidden">

      {/* Page content - this is where Home, Projects, Notes, etc. render */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  )
}
