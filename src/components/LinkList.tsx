/**
 * LinkList / LinkListItem — compact external-link list (About's tools and
 * "reach me").
 *
 * Deliberately not Item rows: the row is not a button and carries no hover
 * plate; only the name links out, inline with the external arrow. Two lines
 * per row: the name link, then the description below it.
 */

import { type ReactNode } from 'react'
import { ArrowUpRight } from './icons'

export function LinkList({ children }: { children: ReactNode }) {
  return <ul className="link-list">{children}</ul>
}

export function LinkListItem({
  href,
  name,
  desc,
  onClick,
}: {
  href: string
  name: string
  desc: ReactNode
  onClick?: () => void
}) {
  return (
    <li>
      <a className="link-list-name" href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {name}
        <span className="ext"><ArrowUpRight /></span>
      </a>
      <span className="link-list-desc">{desc}</span>
    </li>
  )
}
