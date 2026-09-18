/**
 * Tag — a small uppercase chip for state eyebrows in the game chrome
 * (the item card's "equipped" / "in your pack"). Same chip grammar as
 * the character strip's .gf-cs-badge: outlined and muted by default,
 * `filled` for the state that should pop (bone tint, since loot chrome
 * never rides the accent).
 */

import type { ReactNode } from 'react'

export default function Tag({ filled = false, children }: { filled?: boolean; children: ReactNode }) {
  return <span className={`ch-tag${filled ? ' fill' : ''}`}>{children}</span>
}
