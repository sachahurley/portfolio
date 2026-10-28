/**
 * QuestCard: one case study as a linked card (media, title, summary), for
 * putting work on the home page between the bio and the app grid.
 *
 * Layout and media are props so the same card handles different art:
 * - `side` / `side-right`: media beside the text; `size` sets its column
 *   (sm 120px, md 40%, lg 50%). Below 440px of container width these stack
 *   with the media on top, except portrait media, which stays beside the
 *   text at sm so a tall phone screenshot never fills the screen.
 * - `top`: media above the text, full width.
 * - `overlay`: media fills the card, text sits on a scrim along the bottom.
 *
 * Media without `src` renders the hatch placeholder, so a layout can be
 * tried before its art exists. Styles live in minimal.css (.quest-*).
 */

import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

export type QuestCardLayout = 'side' | 'side-right' | 'top' | 'overlay'

export interface QuestCardProps {
  to: string
  title: string
  summary: string
  media: {
    /** Image path; omit for the hatch placeholder. */
    src?: string
    /** CSS aspect-ratio, e.g. "16 / 9", "21 / 9", "1 / 1", "9 / 19.5". */
    aspect: string
  }
  layout?: QuestCardLayout
  /** Media column width for side layouts. */
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = { sm: '120px', md: '40%', lg: '50%' } as const

/** Taller than wide: phone screenshots and portrait art. */
const isPortrait = (aspect: string) => {
  const [w, h] = aspect.split('/').map((n) => parseFloat(n))
  return h > w
}

export default function QuestCard({ to, title, summary, media, layout = 'side', size = 'sm' }: QuestCardProps) {
  const portrait = isPortrait(media.aspect)
  const style = { '--quest-media': SIZES[portrait ? 'sm' : size] } as CSSProperties
  const cls = ['quest-card', `quest-card--${layout}`, portrait && 'quest-card--portrait'].filter(Boolean).join(' ')
  return (
    <div className="quest-wrap">
      <Link to={to} className={`${cls} plate-round`} style={style}>
        <span className="quest-media" style={{ aspectRatio: media.aspect }}>
          {media.src ? <img src={media.src} alt="" /> : <span className="quest-hatch" />}
        </span>
        <span className="quest-text">
          <span className="quest-title">{title}</span>
          <span className="quest-summary">{summary}</span>
        </span>
      </Link>
    </div>
  )
}
