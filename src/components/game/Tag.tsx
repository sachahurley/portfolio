/**
 * Tag — a small sentence-case chip for state eyebrows in the game chrome
 * (the item card's "Equipped" / "In your pack"). A thin adapter over the
 * DS Badge: `filled` maps to the bone variant (the tier-neutral filled
 * chip that never rides the accent or the theme), quiet chips to the
 * muted default. Copy arrives sentence-cased from the call site; the
 * light tracking is this site's chip voice, riding in via className.
 */

import { type ReactNode } from 'react'
import { Badge } from '@scorp-ds/components'

export default function Tag({ filled = false, children }: { filled?: boolean; children: ReactNode }) {
  return (
    <Badge variant={filled ? 'bone' : 'default'} size="small" className="[letter-spacing:.08em]">
      {children}
    </Badge>
  )
}
