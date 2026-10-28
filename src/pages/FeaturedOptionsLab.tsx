/**
 * Featured card options lab (/lab/featured-options)
 *
 * Two open choices on the home page's Featured cards, each shown on the
 * real FeaturedCard so what you pick is what ships:
 * - the Scorpion Design System's picture: the current 1-bit bake, or one
 *   composed from the design system itself (components/featuredArt);
 * - the marker that says "this jumps to a page of the site", since ↗ reads
 *   as leaving it.
 * Each option shows the whole Featured pair, so the picture is judged next
 * to Tarot GPT's card. Every card links to the real page.
 */

import type { ReactNode } from 'react'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import FeaturedCard, { type FeaturedMarker } from '../components/FeaturedCard'
import { FEATURED, type Featured } from '../data/featured'
import { usePageTitle } from '../lib/usePageTitle'

const [SCORP, ...REST] = FEATURED

const PICTURES: { name: string; note: string; media: Featured['media'] }[] = [
  {
    name: '1. Live window',
    note: 'A real design-system Window: component badges and the token meter, rendered live, so the text stays sharp and it retints with the themes.',
    media: { kind: 'art', art: 'window' },
  },
  {
    name: '2. Token ramps',
    note: 'The two colour scales every component is allowed to use. Reads instantly as "design system" and brings the only colour into the section.',
    media: { kind: 'art', art: 'palette' },
  },
  {
    name: '3. Package diagram',
    note: 'The case study’s box-drawing diagram as live text: the terminal look, and it says what the system is made of.',
    media: { kind: 'art', art: 'diagram' },
  },
  {
    name: '4. Big scorpion',
    note: 'The scorpion icon drawn large, the same way Tarot GPT shows a single card. The pair reads as two illustrations.',
    media: { kind: 'art', art: 'sprite' },
  },
  {
    name: '5. Current: 1-bit screenshot',
    note: 'What is live now, for comparison: the dithered Storybook workbench.',
    media: { kind: 'img', src: '/dither/scorp-card.png' },
  },
]

const MARKERS: { name: string; note: string; marker: FeaturedMarker }[] = [
  { name: 'A. None', note: 'No marker. The Featured title and the card itself already say it is a link into the site.', marker: 'none' },
  { name: 'B. Right arrow', note: 'A 1-bit arrow: "go to". Stays inside the site, where ↗ points out of it.', marker: 'arrow' },
  { name: 'C. Shortcut badge', note: 'A curved arrow on the icon’s corner: the desktop convention for a shortcut or alias.', marker: 'alias' },
  { name: 'D. Pin', note: 'Pinned to the home page, the way phones pin shortcuts.', marker: 'pin' },
  { name: 'E. Bookmark', note: 'Saved for you: a bookmark beside the name.', marker: 'bookmark' },
  { name: 'F. Star', note: 'Featured as a star: a highlight rather than a navigation cue.', marker: 'star' },
  { name: 'G. Current: ↗', note: 'What is live now, for comparison. Reads as leaving the site.', marker: 'out' },
]

function Option({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ color: 'var(--accent)' }}>{name}</div>
      <p style={{ color: 'var(--body)', fontSize: 14, lineHeight: 1.6, margin: '6px 0 0' }}>{note}</p>
      <div className="featured-cards">{children}</div>
    </div>
  )
}

export default function FeaturedOptionsLab() {
  usePageTitle('Featured card options', 'Picture and shortcut-marker options for the home page’s featured cards.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Featured card options</h1>
      <p className="lead">
        Two choices for the home page&rsquo;s Featured cards: the Scorpion Design System&rsquo;s picture, and the
        marker that says a card goes to a page of this site. Each shows the whole pair, on the real card.
      </p>

      <div className="mn-block">
        <div className="label">scorpion picture</div>
        {PICTURES.map((p) => (
          <Option key={p.name} name={p.name} note={p.note}>
            <FeaturedCard item={{ ...SCORP, media: p.media }} />
            {REST.map((f) => (
              <FeaturedCard key={f.path} item={f} />
            ))}
          </Option>
        ))}
      </div>

      <div className="mn-block">
        <div className="label">shortcut marker</div>
        {MARKERS.map((m) => (
          <Option key={m.name} name={m.name} note={m.note}>
            {FEATURED.map((f) => (
              <FeaturedCard key={f.path} item={f} marker={m.marker} />
            ))}
          </Option>
        ))}
      </div>
    </MinimalPage>
  )
}
