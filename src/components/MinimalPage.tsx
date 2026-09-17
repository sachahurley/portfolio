/**
 * MinimalPage — the narrow content column for Minimal-mode pages.
 * 644px, centered, with the prototype's 96px/160px vertical rhythm.
 * `flushTop` starts Home's content at the back-plate line (48px): Home has
 * no back plate, so without it the page would read as starting lower.
 * Pages that need to show something wider than the column (the lab tile
 * atlas grid) break out of it per element, via the .pb-break-full idiom.
 */

import { type ReactNode } from 'react'

export default function MinimalPage({
  children,
  flushTop = false,
}: {
  children: ReactNode
  flushTop?: boolean
}) {
  return <div className={`mn-main${flushTop ? ' flush-top' : ''}`}>{children}</div>
}
