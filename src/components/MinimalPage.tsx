/**
 * MinimalPage — the narrow content column for Minimal-mode pages.
 * 644px, centered, with the prototype's 96px/160px vertical rhythm.
 * `flushTop` reduces the top padding for Home, whose pixel graphics sit above.
 * `wide` widens the column for pages that show a grid (the lab tile atlas).
 */

import { type ReactNode } from 'react'

export default function MinimalPage({
  children,
  flushTop = false,
  wide = false,
}: {
  children: ReactNode
  flushTop?: boolean
  wide?: boolean
}) {
  return <div className={`mn-main${flushTop ? ' flush-top' : ''}${wide ? ' wide' : ''}`}>{children}</div>
}
