/**
 * Tag — a small uppercase chip for state eyebrows in the game chrome
 * (the item card's "equipped" / "in your pack"). A thin adapter over the
 * DS Badge: `filled` maps to the bone variant (the tier-neutral filled
 * chip that never rides the accent or the theme), quiet chips to the
 * muted default. Uppercase + tracking are this site's chip voice, so
 * they ride in via className rather than the DS.
 */

import { type ReactNode } from 'react'
import { Badge } from '@scorp-ds/components'

export default function Tag({ filled = false, children }: { filled?: boolean; children: ReactNode }) {
  return (
    <Badge variant={filled ? 'bone' : 'default'} size="small" className="uppercase [letter-spacing:.08em]">
      {children}
    </Badge>
  )
}
