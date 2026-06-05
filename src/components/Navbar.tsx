/**
 * Responsive Navbar
 * 
 * NOT a Scorpion UI component - built locally using Scorpion UI
 * design tokens for visual consistency. Candidate to add to the
 * design system later.
 * 
 * - Desktop: horizontal links in a row with ThemeToggle
 * - Mobile: hamburger icon that opens a slide-down menu
 */

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// The nav links - each has a label and a path
const navLinks = [
  { label: 'Projects', path: '/projects' },
  { label: 'Notes', path: '/notes' },
]

export default function Navbar() {
  // Controls whether the mobile menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // useLocation tells us which page we're on, so we can highlight the active link
  const location = useLocation()

  // Helper: checks if a nav link matches the current page
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-[var(--surface-page)] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ===== Logo / Site Name ===== */}
          <Link
            to="/"
            className="text-xl font-mono font-light text-[var(--text-primary)] hover:text-[var(--text-primary)] no-underline"
          >
            Sacha Hurley
          </Link>

          {/* ===== Desktop Navigation (hidden on mobile) ===== */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-mono font-medium no-underline transition-colors
                  ${isActive(link.path)
                    ? 'text-amber-500'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

          </div>

          {/* ===== Mobile Controls (hidden on desktop) ===== */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* ===== Mobile Menu (slides down when open) ===== */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-default)]">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block px-4 py-3 rounded-lg text-base font-mono font-medium no-underline transition-colors
                  ${isActive(link.path)
                    ? 'text-amber-500'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
