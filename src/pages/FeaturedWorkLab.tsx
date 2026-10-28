/**
 * Featured work lab (/lab/featured-work)
 *
 * Launch-checklist item 8: three ways to put a case study between the home
 * page's bio and its app grid, so a first-time visitor reaches proof in one
 * tap. Each is shown inside a miniature home with working links; the chosen
 * one moves into VillageHome and this page can retire.
 *
 * Case studies come from the real project data (listed ones only), so the
 * directions update themselves as case studies are listed.
 */

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { getListedProjects } from '../data/projects'
import { usePageTitle } from '../lib/usePageTitle'

const studies = getListedProjects().filter((p) => p.caseStudy)
const featured = studies[0]

const DIRECTIONS: { name: string; idea: string; ships: string; render: () => ReactNode }[] = [
  {
    name: 'A. Bio link',
    idea: 'One line under the bio. The quietest change: the home stays a home screen.',
    ships: 'An hour. Points at whichever case study is newest or best.',
    render: () => (
      <p className="bio" style={{ margin: '12px 0 0' }}>
        Latest work:{' '}
        <Link to={`/projects/${featured.slug}`} style={{ color: 'var(--accent)' }}>
          {featured.title} &rarr;
        </Link>
      </p>
    ),
  },
  {
    name: 'B. Quest card',
    idea: 'The featured case study as a card: dithered thumbnail, a kicker, the title and its summary. Reads as the main quest.',
    ships: 'Half a day. Uses the case study’s own thumbnail and summary, so featuring another updates it.',
    render: () => (
      <Link
        to={`/projects/${featured.slug}`}
        className="plate-round"
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 120px) 1fr',
          gap: 16,
          alignItems: 'center',
          background: 'var(--surface-muted)',
          padding: 16,
          textDecoration: 'none',
        }}
      >
        {featured.thumbnail ? (
          <img
            src={featured.thumbnail}
            alt=""
            style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <span />
        )}
        <span>
          <span style={{ display: 'block', color: 'var(--accent)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            featured quest
          </span>
          <span style={{ display: 'block', color: 'var(--fg)', fontSize: 16, marginTop: 4 }}>{featured.title}</span>
          <span style={{ display: 'block', color: 'var(--body)', fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>
            {featured.caseStudy?.summary}
          </span>
        </span>
      </Link>
    ),
  },
  {
    name: 'C. Case files',
    idea: 'A short labelled list of every listed case study, in the rows the Projects page uses.',
    ships: 'An hour. Grows on its own; strongest once two or three case studies are listed.',
    render: () => (
      <div style={{ marginTop: 20 }}>
        <div style={{ color: 'var(--mut)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          case studies
        </div>
        <List>
          {studies.map((p) => (
            <Item key={p.slug} to={`/projects/${p.slug}`} title={p.title} desc={p.description} />
          ))}
        </List>
      </div>
    ),
  },
]

/** A miniature home: name and bio as they are today, then the direction. */
function MiniHome({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: '1px dashed var(--border)', padding: 24, marginTop: 20 }}>
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
  usePageTitle('Featured work', 'Three ways to put a case study on the home page, one tap from the bio.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Featured work</h1>
      <p className="lead">
        Three ways to put a case study between the home page&rsquo;s bio and its app grid, so the first thing after
        who I am is proof. The links work.
      </p>

      {DIRECTIONS.map((d) => (
        <div key={d.name} className="mn-block">
          <div style={{ color: 'var(--accent)' }}>{d.name}</div>
          <p className="lead" style={{ fontSize: 14 }}>
            {d.idea}
          </p>
          <p style={{ color: 'var(--mut)', fontSize: 12, margin: '6px 0 0' }}>{d.ships}</p>
          <MiniHome>{d.render()}</MiniHome>
        </div>
      ))}
    </MinimalPage>
  )
}
