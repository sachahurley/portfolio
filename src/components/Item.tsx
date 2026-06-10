/**
 * Item / List — the core row component
 *
 * A block link with stacked children: optional date, a title (amber when it's
 * a link), an optional description, and an optional 16:9 thumbnail on the far
 * right. Used by every Minimal-mode page (Home, Projects, Notes, Lab, About).
 */

import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from './icons'

interface ItemProps {
  to?: string        // internal route (React Router)
  href?: string      // external URL
  external?: boolean // append the external-arrow icon + open in a new tab
  date?: string      // note date (shown above the title)
  title: string
  desc?: ReactNode
  img?: boolean      // show a placeholder 16:9 thumbnail
  imgSrc?: string    // a real thumbnail image (overrides the placeholder)
  imgRight?: boolean // on mobile, keep a two-column row with a portrait (4:3) image on the right, instead of stacking it below
  onClick?: () => void
}

export function List({ children }: { children: ReactNode }) {
  return <div className="list">{children}</div>
}

// Row titles never show a trailing period.
function stripTrailingPeriod(s: string): string {
  return s.replace(/\s*\.+\s*$/, '')
}

// Row subtitles (descriptions) are capped at two sentences.
function clampSentences(s: string, max = 2): string {
  const sentences = s.split(/(?<=[.!?])\s+/)
  if (sentences.length <= max) return s
  return sentences.slice(0, max).join(' ').trim()
}

export function Item({ to, href, external, date, title, desc, img, imgSrc, imgRight, onClick }: ItemProps) {
  const hasImg = !!img || !!imgSrc
  const className = `item${hasImg ? ' has-img' : ''}${hasImg && imgRight ? ' img-right' : ''}`

  const displayTitle = stripTrailingPeriod(title)
  const displayDesc = typeof desc === 'string' ? clampSentences(desc) : desc

  const text = (
    <>
      {date && <span className="nd">{date}</span>}
      <span className="t">
        {displayTitle}
        {external && <span className="ext"><ArrowUpRight /></span>}
      </span>
      {displayDesc && <span className="d">{displayDesc}</span>}
    </>
  )

  const thumb = imgSrc ? (
    <img className="thumbimg" src={imgSrc} alt="" />
  ) : (
    <span className="thumbimg" />
  )

  const body = hasImg ? (
    <>
      <span className="txt">{text}</span>
      {thumb}
    </>
  ) : (
    text
  )

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {body}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {body}
    </a>
  )
}
