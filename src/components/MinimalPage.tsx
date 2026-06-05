/**
 * MinimalPage — the narrow content column for Minimal-mode pages.
 * 644px, centered, with the prototype's 96px/160px vertical rhythm.
 * `flushTop` reduces the top padding for Home, whose pixel graphics sit above.
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
