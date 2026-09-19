/**
 * Item / List — the core row component
 *
 * A thin adapter over the design system's ListRow (which was itself
 * promoted from this row): date → meta, title, desc → description, the
 * external-arrow / padlock as titleSuffix, and the thumbnail in the
 * trailing thumb slot. Internal routes render through react-router's
 * Link via as/asProps, so client-side navigation survives.
 *
 * Site-specific extras stay here and in minimal.css: thumbnail sizing
 * (16:9, narrower on phones, portrait 3:4 in tight rows) and the
 * lockmark tint. List keeps its own wrapper: the -12px side margins
 * align the rows' plate padding with the page column, which is layout
 * knowledge Stack shouldn't own.
 */

import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ListRow } from '@scorp-ds/components'
import { ArrowUpRight } from './icons'
import DitherIcon from './DitherIcon'

interface ItemProps {
  to?: string        // internal route (React Router)
  href?: string      // external URL
  external?: boolean // append the external-arrow icon + open in a new tab
  locked?: boolean   // append a padlock (password-locked case study)
  date?: string      // note date (shown above the title)
  title: string
  desc?: ReactNode
  img?: boolean      // show a placeholder 16:9 thumbnail
  imgSrc?: string    // a real thumbnail image (overrides the placeholder)
  imgRight?: boolean // tighter portrait (3:4) thumbnail column
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

export function Item({ to, href, external, locked, date, title, desc, img, imgSrc, imgRight, onClick }: ItemProps) {
  const hasImg = !!img || !!imgSrc

  const displayTitle = stripTrailingPeriod(title)
  const displayDesc = typeof desc === 'string' ? clampSentences(desc) : desc

  const suffix =
    external || locked ? (
      <>
        {external && (
          <span className="ext">
            <ArrowUpRight />
          </span>
        )}
        {locked && (
          <span className="lockmark">
            <DitherIcon name="lock" size={12} title="Password protected" />
          </span>
        )}
      </>
    ) : undefined

  const thumb = hasImg ? (
    imgSrc ? (
      <img className={`thumbimg${imgRight ? ' portrait' : ''}`} src={imgSrc} alt="" />
    ) : (
      <span className={`thumbimg${imgRight ? ' portrait' : ''}`} />
    )
  ) : undefined

  const linkProps = to
    ? { as: Link, asProps: { to, onClick } }
    : {
        as: 'a' as const,
        asProps: {
          href,
          onClick,
          ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        },
      }

  return (
    <ListRow
      {...linkProps}
      meta={date}
      title={displayTitle}
      titleSuffix={suffix}
      description={displayDesc}
      thumb={thumb}
      thumbPosition="end"
    />
  )
}
