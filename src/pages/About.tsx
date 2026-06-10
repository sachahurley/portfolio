/**
 * About (/about)
 *
 * Lead paragraph, a Tools linked list, and "Reach me" (X + Email).
 * No skills bars. The old Contact page folded into "Reach me" here.
 */

import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { tools } from '../data/tools'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

export default function About() {
  usePageTitle('About')
  const { award } = useXp()

  return (
    <MinimalPage>
      <h1 className="page">about</h1>
      <p className="lead">
        Product designer &amp; builder working where design meets AI. I like
        shipping real things and keeping the craft bar high.
      </p>

      <div className="mn-block">
        <div className="label">tools</div>
        <List>
          {tools.map((t) => (
            <Item
              key={t.name}
              href={t.url}
              external
              title={t.name}
              desc={`${t.use} · ${t.tier}`}
            />
          ))}
        </List>
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
        </List>
      </div>
    </MinimalPage>
  )
}
