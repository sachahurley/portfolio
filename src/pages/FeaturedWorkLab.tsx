/**
 * Featured work lab (/lab/featured-work)
 *
 * Launch-checklist item 8: a case study between the home page's bio and its
 * app grid, so a first-time visitor reaches proof in one tap. The quest card
 * is the chosen direction; this page tries it with media at different sizes,
 * positions and proportions (QuestCard props), so the art each case study
 * ends up with has a layout ready. The bio-link and case-files directions
 * stay at the bottom for comparison.
 *
 * Case studies come from the real project data (listed ones only).
 */

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import QuestCard, { type QuestCardProps } from '../components/QuestCard'
import { Item, List } from '../components/Item'
import { getListedProjects } from '../data/projects'
import { usePageTitle } from '../lib/usePageTitle'

const studies = getListedProjects().filter((p) => p.caseStudy)
const featured = studies[0]
const card = { to: `/projects/${featured.slug}`, title: featured.title, summary: featured.caseStudy?.summary ?? featured.description }

const THUMB = '/dither/scorp-thumb.png' // 264 x 148, 16:9
const WIDE = '/dither/scorp-storybook.png' // 800 x 448, 16:9
const SQUARE = '/dither/dawg.png' // 1460 x 1540, roughly square

const VARIANTS: { name: string; note: string; props: Omit<QuestCardProps, 'to' | 'title' | 'summary'> }[] = [
  {
    name: '1. Side, small',
    note: 'The original, without the label. Media is a 120px thumbnail; the text leads.',
    props: { layout: 'side', size: 'sm', media: { src: THUMB, aspect: '16 / 9' } },
  },
  {
    name: '2. Side, large',
    note: 'Media takes 40% of the card. The art starts to carry the card.',
    props: { layout: 'side', size: 'md', media: { src: WIDE, aspect: '16 / 9' } },
  },
  {
    name: '3. Media right',
    note: 'Text first, art second: reads like the Projects rows, at card size.',
    props: { layout: 'side-right', size: 'md', media: { src: WIDE, aspect: '16 / 9' } },
  },
  {
    name: '4. Media on top',
    note: 'Full-width art above the title. The biggest the work gets without covering the text.',
    props: { layout: 'top', media: { src: WIDE, aspect: '16 / 9' } },
  },
  {
    name: '5. Banner',
    note: 'A cinematic 21:9 crop on top: more presence than 1, less height than 4.',
    props: { layout: 'top', media: { src: WIDE, aspect: '21 / 9' } },
  },
  {
    name: '6. Overlay',
    note: 'The art fills the card and the title sits on a scrim along the bottom. Most dramatic; needs art with a quiet lower edge.',
    props: { layout: 'overlay', media: { src: WIDE, aspect: '16 / 9' } },
  },
]

const PROPORTIONS: { name: string; note: string; props: Omit<QuestCardProps, 'to' | 'title' | 'summary'> }[] = [
  {
    name: 'Square art',
    note: 'A 1:1 image beside the text at half width (shown with the DAWG portrait as stand-in art).',
    props: { layout: 'side', size: 'lg', media: { src: SQUARE, aspect: '1 / 1' } },
  },
  {
    name: 'Phone screenshot',
    note: 'A tall 9:19.5 app screen, as a mobile case study (Betterfly) would have. Portrait media always stays a narrow column beside the text, even on a phone.',
    props: { layout: 'side', media: { aspect: '9 / 19.5' } },
  },
  {
    name: 'Phone screenshot, on the right',
    note: 'The same tall screen after the text.',
    props: { layout: 'side-right', media: { aspect: '9 / 19.5' } },
  },
]

function Variant({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ color: 'var(--accent)' }}>{name}</div>
      <p style={{ color: 'var(--body)', fontSize: 14, lineHeight: 1.6, margin: '6px 0 16px' }}>{note}</p>
      {children}
    </div>
  )
}

/** A miniature home: name and bio as they are today, then the direction. */
function MiniHome({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: '1px dashed var(--border)', padding: 24 }}>
      <div style={{ color: 'var(--fg)' }}>Sacha Hurley</div>
      <div className="bio">
        <p>
          Product design engineer at Betterfly, working on a health app. Earlier: Meta, EA Sports, and Utility, the
          design agency I co-founded.
        </p>
      </div>
      {children}
      <p style={{ color: 'var(--mut)', fontSize: 12, textAlign: 'center', margin: '24px 0 0' }}>
        the app grid continues here
      </p>
    </div>
  )
}

export default function FeaturedWorkLab() {
  usePageTitle('Featured work', 'Quest card variants: one case study on the home page, with media at different sizes and proportions.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Featured work</h1>
      <p className="lead">
        The quest card, with the media at different sizes, positions and proportions, so whatever art a case study
        has gets a layout that suits it. Each card links to the real case study. Narrow the window to see them stack.
      </p>

      <div className="mn-block">
        <div className="label">in context</div>
        <MiniHome>
          <div style={{ marginTop: 20 }}>
            <QuestCard {...card} layout="side" size="md" media={{ src: WIDE, aspect: '16 / 9' }} />
          </div>
        </MiniHome>
      </div>

      <div className="mn-block">
        <div className="label">size and placement</div>
        {VARIANTS.map((v) => (
          <Variant key={v.name} name={v.name} note={v.note}>
            <QuestCard {...card} {...v.props} />
          </Variant>
        ))}
      </div>

      <div className="mn-block">
        <div className="label">other proportions</div>
        {PROPORTIONS.map((v) => (
          <Variant key={v.name} name={v.name} note={v.note}>
            <QuestCard {...card} {...v.props} />
          </Variant>
        ))}
      </div>

      <div className="mn-block">
        <div className="label">earlier directions</div>
        <Variant name="Bio link" note="One line under the bio. The quietest change.">
          <p className="bio" style={{ margin: 0 }}>
            Latest work:{' '}
            <Link to={card.to} style={{ color: 'var(--accent)' }}>
              {card.title} &rarr;
            </Link>
          </p>
        </Variant>
        <Variant name="Case files" note="Every listed case study in the rows the Projects page uses.">
          <List>
            {studies.map((p) => (
              <Item key={p.slug} to={`/projects/${p.slug}`} title={p.title} desc={p.description} />
            ))}
          </List>
        </Variant>
      </div>
    </MinimalPage>
  )
}
