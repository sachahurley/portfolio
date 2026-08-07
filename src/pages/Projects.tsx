/**
 * Projects index (/projects)
 *
 * A clean row list of all projects. Every project opens its detail page
 * here; external projects house their link-out CTA on that page.
 */

import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { Item, List } from '../components/Item'
import { projects } from '../data/projects'
import { usePageTitle } from '../lib/usePageTitle'

export default function Projects() {
  usePageTitle('Projects')

  return (
    <MinimalPage>
      <BackButton fallback="/" />
      <h1 className="page">Projects</h1>
      <p className="lead">
        A few things I've designed and built.
      </p>

      <div className="mn-block">
        <List>
          {projects.map((p) => (
            <Item
              key={p.slug}
              to={`/projects/${p.slug}`}
              title={p.title}
              desc={p.description}
              img={p.img}
              imgSrc={p.thumbnail}
              imgRight={p.imgRight}
            />
          ))}
        </List>
      </div>
    </MinimalPage>
  )
}
