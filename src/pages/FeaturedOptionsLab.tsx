/**
 * Featured card options lab (/lab/featured-options)
 *
 * The Scorpion Design System's picture on the home page's Featured card,
 * shown on the real FeaturedCard so what you pick is what ships: pictures
 * composed from the design system itself, the showcase site's scorpion art
 * baked into the site's 1-bit ink (components/featuredArt), and the current
 * bake for comparison. Each option shows the whole Featured pair, so the
 * picture is judged next to Tarot GPT's card. Every card links to the real
 * page. (The shortcut marker was settled as none.)
 */

import type { ReactNode } from 'react'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import FeaturedCard from '../components/FeaturedCard'
import { FEATURED, type Featured } from '../data/featured'
import { usePageTitle } from '../lib/usePageTitle'

const [SCORP, ...REST] = FEATURED

const PICTURES: { name: string; note: string; media: Featured['media'] }[] = [
  {
    name: '11. Component kit',
    note: 'A specimen sheet of real controls: primary and secondary buttons, a status badge, a switch, a checkbox and a slider. The system, shown as what it makes.',
    media: { kind: 'art', art: 'kit' },
  },
  {
    name: '12. Build log',
    note: 'A LogView streaming the build (tokens resolved, components built, stories rendered, axe clean) above a status line. It moves: a line every beat.',
    media: { kind: 'art', art: 'log' },
  },
  {
    name: '13. Meters',
    note: 'Three meters, full: 43 components, 378 tokens, 65 stories. The scale of the system at a glance.',
    media: { kind: 'art', art: 'meters' },
  },
  {
    name: '14. Button row',
    note: 'The button variants side by side with a keyboard hint: the most recognisable component, in every style.',
    media: { kind: 'art', art: 'buttons' },
  },
  {
    name: '15. Tabs and list',
    note: 'A tab bar over a short component list with status badges: a slice of a real app screen.',
    media: { kind: 'art', art: 'tabs' },
  },
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
  {
    name: '6. Showcase wordmark',
    note: 'The showcase site’s top bar: its pixel scorpion logo beside the name, as the system brands itself. The card’s label then repeats the name.',
    media: { kind: 'art', art: 'wordmark' },
  },
  {
    name: '7. Showcase logo',
    note: 'That pixel scorpion logo on its own, large: a proper scorpion, drawn on its own grid, paired with Tarot GPT’s single card.',
    media: { kind: 'art', art: 'logo' },
  },
  {
    name: '8. Showcase illustration',
    note: 'The showcase’s detailed scorpion, re-dithered into the site’s ink. The most crafted picture, and it matches the tarot card’s line work.',
    media: { kind: 'art', art: 'illustration' },
  },
  {
    name: '9. Boxed pixel wordmark',
    note: 'The showcase’s boxed wordmark with the scorpion in the O. Strong, but it reads SCORPION UI, the system’s earlier name.',
    media: { kind: 'art', art: 'boxed' },
  },
  {
    name: '10. Tail close-up',
    note: 'The showcase album art’s stinger, cropped to the card. Atmospheric, but the subject is hard to read at this size.',
    media: { kind: 'art', art: 'stinger' },
  },
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
  usePageTitle('Featured card options', 'Fifteen picture options for the Scorpion Design System’s featured card.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Featured card options</h1>
      <p className="lead">
        Fifteen pictures for the Scorpion Design System&rsquo;s Featured card: live components first, then other
        compositions and the showcase site&rsquo;s scorpion art. Each shows the whole pair, on the real card.
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

    </MinimalPage>
  )
}
