/**
 * About (/about)
 *
 * Lead paragraph, then Tools and "Reach me" (X + GitHub). Content lives in
 * data/tools.ts. A longer version (a second lead line, how I work, kind
 * words, who I've worked with; content in data/about.ts) is kept but hidden
 * behind SHOW_EXTENDED_ABOUT.
 * No skills bars. The old Contact page folded into "Reach me" here.
 */

import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { LinkList, LinkListItem } from '../components/LinkList'
import { tools } from '../data/tools'
import { endorsements, principles, workedWith } from '../data/about'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

/** Feature flag: the longer About (open-to-work line, principles,
 *  endorsements, client list). Off for now; flip to true to bring it back. */
const SHOW_EXTENDED_ABOUT: boolean = false

export default function About() {
  usePageTitle('About', 'Sacha Hurley, product design engineer working where design meets AI: tools, links and how to reach me.')
  const { award } = useXp()

  return (
    <MinimalPage>
      <BackButton fallback="/" />
      <h1 className="page">about</h1>
      {SHOW_EXTENDED_ABOUT ? (
        <>
          <p className="lead">
            Product design engineer working where design meets AI. I drive rapid
            product delivery for startups and established businesses, without
            compromising on quality or impact.
          </p>
          <p className="lead">
            Interested in AI-first, zero-to-one product work, where the foundations
            are still being decided. Healthcare, creative tools and enterprise
            especially.
          </p>
        </>
      ) : (
        <p className="lead">
          Product design engineer working where design meets AI. I like shipping
          real things and keeping the craft bar high.
        </p>
      )}

      {SHOW_EXTENDED_ABOUT && (
        <>
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
        </>
      )}

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
