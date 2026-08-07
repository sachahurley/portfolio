/**
 * About (/about)
 *
 * Lead paragraph, a Tools linked list, and "Reach me" (X + GitHub).
 * No skills bars. The old Contact page folded into "Reach me" here.
 */

import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { Item, List } from '../components/Item'
import { ArrowUpRight } from '../components/icons'
import { tools } from '../data/tools'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

export default function About() {
  usePageTitle('About')
  const { award } = useXp()

  return (
    <MinimalPage>
      <BackButton fallback="/" />
      <h1 className="page">about</h1>
      <p className="lead">
        Product designer &amp; builder working where design meets AI. I like
        shipping real things and keeping the craft bar high.
      </p>

      <div className="mn-block">
        <div className="label">tools</div>
        {/* Compact plain list, not Item rows: only the tool name links out. */}
        <ul className="tool-list">
          {tools.map((t) => (
            <li key={t.name}>
              <a className="tool-link" href={t.url} target="_blank" rel="noreferrer">
                {t.name}
                <span className="ext"><ArrowUpRight /></span>
              </a>
              <span className="tool-desc">{t.use} · {t.tier}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mn-block">
        <div className="label">reach me</div>
        <List>
          <Item
            href="https://x.com/sacha_hurley"
            external
            title="X"
            desc="@sacha_hurley"
            onClick={() => award(XP_AWARDS.follow, 'followed on X', 'follow')}
          />
          <Item
            href="https://github.com/sachahurley"
            external
            title="GitHub"
            desc="@sachahurley"
            onClick={() => award(XP_AWARDS.follow, 'followed on GitHub', 'follow-github')}
          />
        </List>
      </div>
    </MinimalPage>
  )
}
