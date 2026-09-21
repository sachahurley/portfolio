/**
 * Anchored section heading for articles. Auto-derives the id from string
 * children when none is given, shows a hover-revealed "#" link, and handles
 * hash deep links itself: article content is lazy-loaded, so by the time an
 * H2 mounts, RouteEffects has already scrolled to top - the mount effect
 * re-scrolls to the target section.
 */

import { useEffect, useRef, type ReactNode } from 'react'

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function H2({ id, children }: { id?: string; children: ReactNode }) {
  const anchor = id ?? (typeof children === 'string' ? slugify(children) : undefined)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (anchor && window.location.hash.slice(1) === anchor) {
      ref.current?.scrollIntoView()
    }
  }, [anchor])

  return (
    <h2 id={anchor} ref={ref}>
      {children}
      {anchor && (
        <a className="h2-anchor" href={`#${anchor}`} aria-label="Link to section">
          #
        </a>
      )}
    </h2>
  )
}
