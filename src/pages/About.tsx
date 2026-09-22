/**
 * About (/about)
 *
 * Lead paragraph, then Tools and "Reach me" (X + GitHub), both as the
 * compact LinkList.
 * No skills bars. The old Contact page folded into "Reach me" here.
 */

import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { LinkList, LinkListItem } from '../components/LinkList'
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
        <LinkList>
          {tools.map((t) => (
            <LinkListItem key={t.name} href={t.url} name={t.name} desc={`${t.use} · ${t.tier}`} />
          ))}
        </LinkList>
      </div>

      <div className="mn-block">
        <div className="label">reach me</div>
        <LinkList>
          <LinkListItem
            href="https://x.com/sacha_hurley"
            name="X"
            desc="@sacha_hurley"
            onClick={() => award(XP_AWARDS.follow, 'followed on X', 'follow')}
          />
          <LinkListItem
            href="https://github.com/sachahurley"
            name="GitHub"
            desc="@sachahurley"
            onClick={() => award(XP_AWARDS.follow, 'followed on GitHub', 'follow-github')}
          />
        </LinkList>
      </div>
    </MinimalPage>
  )
}
