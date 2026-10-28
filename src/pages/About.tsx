/**
 * About (/about)
 *
 * Lead paragraph, then how I work (principles), kind words (endorsements),
 * who I've worked with, Tools and "Reach me" (X + GitHub). Content lives in
 * data/about.ts and data/tools.ts.
 * No skills bars. The old Contact page folded into "Reach me" here.
 */

import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { LinkList, LinkListItem } from '../components/LinkList'
import { tools } from '../data/tools'
import { endorsements, principles, workedWith } from '../data/about'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

export default function About() {
  usePageTitle('About', 'Sacha Hurley, product design engineer working where design meets AI: tools, links and how to reach me.')
  const { award } = useXp()

  return (
    <MinimalPage>
      <BackButton fallback="/" />
      <h1 className="page">about</h1>
      <p className="lead">
        Product design engineer working where design meets AI. I drive rapid
        product delivery for startups and established businesses, without
        compromising on quality or impact.
      </p>

      <div className="mn-block">
        <div className="label">how I work</div>
        <ul className="principles">
          {principles.map((p) => (
            <li key={p.name}>
              <span className="principles-name">{p.name}</span>
              <span className="principles-text">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mn-block">
        <div className="label">kind words</div>
        <div className="kind-words">
          {endorsements.map((e) => (
            <figure key={e.name}>
              <blockquote>
                {e.quote.split('**').map((part, i) =>
                  i % 2 ? <em key={i}>{part}</em> : part,
                )}
              </blockquote>
              <figcaption>
                {e.name}, <span className="kind-words-role">{e.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mn-block">
        <div className="label">worked with</div>
        <p className="worked-with">{workedWith.join(' · ')}</p>
      </div>

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
