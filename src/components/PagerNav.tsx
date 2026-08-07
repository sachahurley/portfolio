/**
 * PagerNav — prev/next footer at the bottom of detail pages, walking the
 * global chain from lib/detailNav (projects -> lab -> notes). Richer
 * cousins of the menu buttons: the same pixel-round plate, plus the
 * destination's thumbnail, a section kicker, and its title. The arrows
 * alone carry direction; only assistive tech hears "previous"/"next".
 * Prev is the left-most button with its arrow on the outer left edge;
 * next mirrors it. At the ends of the chain the lone button goes full
 * width (flex handles that for free).
 */

import { Link } from 'react-router-dom'
import DitherIcon from './DitherIcon'
import { getDetailNeighbors, type DetailEntry, type DetailSection } from '../lib/detailNav'

function PagerButton({ entry, dir }: { entry: DetailEntry; dir: 'prev' | 'next' }) {
  return (
    <Link
      className={`pgbtn pgbtn--${dir}`}
      to={entry.path}
      aria-label={`${dir === 'prev' ? 'Previous' : 'Next'}: ${entry.title} (${entry.section})`}
    >
      <DitherIcon name={dir === 'prev' ? 'arrow-left' : 'arrow-right'} size={16} className="pg-arrow" />
      {entry.imgSrc ? (
        <img className="pg-thumb" src={entry.imgSrc} alt="" />
      ) : (
        <span className="pg-thumb" />
      )}
      <span className="pg-txt">
        <span className="pg-kicker">{entry.section}</span>
        <span className="pg-title">{entry.title}</span>
      </span>
    </Link>
  )
}

export default function PagerNav({ section, slug }: { section: DetailSection; slug: string }) {
  const { prev, next } = getDetailNeighbors(section, slug)
  if (!prev && !next) return null
  return (
    <nav className="pager" aria-label="Adjacent pages">
      {prev && <PagerButton entry={prev} dir="prev" />}
      {next && <PagerButton entry={next} dir="next" />}
    </nav>
  )
}
