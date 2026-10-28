/**
 * Case study meta lab (/lab/case-study-meta)
 *
 * Layouts for the case study header's facts (role, timeline, team, stack),
 * the label/value rows CaseStudyHeader draws under the outcomes. Each option
 * is shown in the real header (the design system's title, summary and
 * outcomes) with the template's four facts, then with the Scorpion Design
 * System's three, whose stack line is the longest value on the site. The
 * chosen layout moves into scorp-ds's CaseStudyHeader; this page retires.
 */

import type { ReactNode } from 'react'
import { CaseStudyContent, CaseStudyHeader, type CaseStudy } from '@scorp-ds/components'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import { projects } from '../data/projects'
import { usePageTitle } from '../lib/usePageTitle'

type Meta = NonNullable<CaseStudy['meta']>

// the case study's own AA theme pairs (scorp-ds CaseStudy.tsx)
const LABEL = 'text-secondary-700 dark:text-secondary-600'
const BODY = 'text-secondary-800 dark:text-secondary-500'
const TITLE = 'text-[var(--text-primary)]'
const RULE = 'border-[var(--surface-container-stroke)]'

const studyOf = (slug: string) => {
  const p = projects.find((x) => x.slug === slug)
  if (!p?.caseStudy) throw new Error(`no case study: ${slug}`)
  return { title: p.title, ...p.caseStudy } as CaseStudy
}
const TEMPLATE = studyOf('case-study-template')
const SCORP = studyOf('scorpion-ui')

/** A: what ships now. Label beside value, two pairs a row, a rule above. */
function Ruled({ meta }: { meta: Meta }) {
  return (
    <dl className={`m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t-hairline pt-6 sm:grid-cols-[auto_1fr_auto_1fr] ${RULE}`}>
      {meta.map((it) => (
        <div key={it.label} className="contents">
          <dt className={`text-xs uppercase leading-5 tracking-wider ${LABEL}`}>{it.label}</dt>
          <dd className={`m-0 text-sm leading-5 ${BODY}`}>{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** B: one column per fact, label over value, no rule, centred like the
 *  outcomes above it. Two up on a phone. */
function Columns({ meta }: { meta: Meta }) {
  const cols = meta.length >= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
  return (
    <dl className={`m-0 grid grid-cols-2 gap-x-8 gap-y-6 ${cols}`}>
      {meta.map((it) => (
        <div key={it.label} className="text-center">
          <dt className={`text-xs uppercase tracking-wider ${LABEL}`}>{it.label}</dt>
          <dd className={`m-0 mt-2 text-sm leading-relaxed ${TITLE}`}>{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** C: a byline. Values only, one run of text, dots between. */
function Byline({ meta }: { meta: Meta }) {
  return (
    <p className={`m-0 text-sm leading-relaxed ${LABEL}`}>
      {meta.map((it, i) => (
        <span key={it.label}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <span className="sr-only">{it.label}: </span>
          {it.value}
        </span>
      ))}
    </p>
  )
}

/** D: each fact on its own plate, label over value. */
function Plates({ meta }: { meta: Meta }) {
  return (
    <dl className="m-0 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {meta.map((it) => (
        <div key={it.label} className="plate-round bg-[var(--surface-muted)] px-4 py-3">
          <dt className={`text-xs uppercase tracking-wider ${LABEL}`}>{it.label}</dt>
          <dd className={`m-0 mt-1 text-sm leading-relaxed ${TITLE}`}>{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** F: one fact a line, label and value joined by a dotted leader. */
function Leaders({ meta }: { meta: Meta }) {
  return (
    <dl className="m-0 flex flex-col gap-2">
      {meta.map((it) => (
        <div key={it.label} className="flex items-baseline gap-3 text-sm">
          <dt className={`flex-none text-xs uppercase tracking-wider ${LABEL}`}>{it.label}</dt>
          <span aria-hidden="true" className={`min-w-4 flex-1 border-b border-dotted ${RULE}`} />
          <dd className={`m-0 text-right leading-relaxed ${TITLE}`}>{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** The header with the facts in a given slot. */
function Header({ study, below, byline }: { study: CaseStudy; below?: ReactNode; byline?: ReactNode }) {
  const { title, summary, outcomes } = study
  return (
    <>
      <CaseStudyHeader study={{ title, summary }} />
      {byline && <div className="mt-4 font-mono">{byline}</div>}
      {outcomes && (
        // the header's own outcomes strip, as the outcomes block draws it
        <CaseStudyContent blocks={[{ type: 'outcomes', items: outcomes }]} />
      )}
      {below && <div className="mt-10 font-mono">{below}</div>}
    </>
  )
}

/** E: the facts beside the summary on wide screens, under it on a phone. */
function SideHeader({ study }: { study: CaseStudy }) {
  const { title, summary, outcomes, meta = [] } = study
  return (
    <header className="font-mono">
      <h1 className={`m-0 text-2xl leading-tight sm:text-page-title ${TITLE}`}>{title}</h1>
      <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <p className={`m-0 text-base leading-relaxed sm:text-lg ${BODY}`}>{summary}</p>
        <dl className={`m-0 flex flex-col gap-4 sm:border-l-hairline sm:pl-6 ${RULE}`}>
          {meta.map((it) => (
            <div key={it.label}>
              <dt className={`text-xs uppercase tracking-wider ${LABEL}`}>{it.label}</dt>
              <dd className={`m-0 mt-1 text-sm leading-relaxed ${TITLE}`}>{it.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      {outcomes && (
        // the header's own outcomes strip, as the outcomes block draws it
        <CaseStudyContent blocks={[{ type: 'outcomes', items: outcomes }]} />
      )}
    </header>
  )
}

type Render = (study: CaseStudy) => ReactNode

const OPTIONS: { name: string; note: string; render: Render }[] = [
  {
    name: 'A. Ruled pairs (now)',
    note: 'What ships today, for comparison: a rule, then label beside value, two pairs a row.',
    render: (s) => <Header study={s} below={<Ruled meta={s.meta ?? []} />} />,
  },
  {
    name: 'B. Columns',
    note: 'One column per fact, label over value, centred, no rule. The same rhythm as the outcomes above it, quieter, so the header reads as two matching strips.',
    render: (s) => <Header study={s} below={<Columns meta={s.meta ?? []} />} />,
  },
  {
    name: 'C. Byline',
    note: 'Values only, one line under the summary, like a byline. The quietest: no labels, no grid, and the outcomes close the header.',
    render: (s) => <Header study={s} byline={<Byline meta={s.meta ?? []} />} />,
  },
  {
    name: 'D. Plates',
    note: 'Each fact on its own card, label over value, two up. Most structured; echoes the callout cards further down the page.',
    render: (s) => <Header study={s} below={<Plates meta={s.meta ?? []} />} />,
  },
  {
    name: 'E. Beside the summary',
    note: 'The facts in a narrow column to the right of the summary, a hairline between, like a magazine standfirst. On a phone they stack under it.',
    render: (s) => <SideHeader study={s} />,
  },
  {
    name: 'F. Dotted leaders',
    note: 'One fact a line, label and value joined by a dotted leader, like a contents page or a terminal spec sheet.',
    render: (s) => <Header study={s} below={<Leaders meta={s.meta ?? []} />} />,
  },
]

const FRAME = { border: '1px dashed var(--border)', padding: '24px 16px', marginTop: 16 }

function Option({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ color: 'var(--accent)' }}>{name}</div>
      <p style={{ color: 'var(--body)', fontSize: 14, lineHeight: 1.6, margin: '6px 0 0' }}>{note}</p>
      {children}
    </div>
  )
}

export default function CaseStudyMetaLab() {
  usePageTitle('Case study meta', 'Layouts for the role, timeline and stack facts in a case study header.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Case study meta</h1>
      <p className="lead">
        Six layouts for the role, timeline, team and stack facts at the top of a case study. Each is shown in the real
        header with the template&rsquo;s four facts, then with the Scorpion Design System&rsquo;s three.
      </p>
      {OPTIONS.map((o) => (
        <Option key={o.name} name={o.name} note={o.note}>
          <div style={FRAME}>{o.render(TEMPLATE)}</div>
          <div style={FRAME}>{o.render(SCORP)}</div>
        </Option>
      ))}
    </MinimalPage>
  )
}
