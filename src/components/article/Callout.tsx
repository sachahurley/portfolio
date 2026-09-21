/**
 * Aside callout: accent left rule on the muted surface. For constraint notes
 * and "worth knowing" tangents that shouldn't read as body prose.
 */

import type { ReactNode } from 'react'

export default function Callout({ children }: { children: ReactNode }) {
  return <aside className="callout">{children}</aside>
}
