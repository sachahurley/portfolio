/**
 * Projects index (/projects)
 *
 * A clean row list of all projects. Projects with an externalUrl link out (↗);
 * the rest open their detail page here. The dock's back chevron handles "back".
 */

import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { projects } from '../data/projects'
import { useXp, XP_AWARDS } from '../context/XpProvider'

export default function Projects() {
  const { award } = useXp()

  return (
    <MinimalPage>
      <h1 className="page">Projects</h1>
      <p className="lead">
        A few things I've designed and built. Scorpion links out; the rest open here.
      </p>

      <div className="mn-block">
        <List>
          {projects.map((p) =>
            p.external && p.externalUrl ? (
              <Item
                key={p.slug}
                href={p.externalUrl}
                external
                title={p.title}
                desc={p.description}
                img={p.img}
                imgSrc={p.thumbnail}
                onClick={() => award(XP_AWARDS.project, `opened ${p.title}`, `project:${p.slug}`)}
              />
            ) : (
              <Item
                key={p.slug}
                to={`/projects/${p.slug}`}
                title={p.title}
                desc={p.description}
                img={p.img}
                imgSrc={p.thumbnail}
              />
            )
          )}
        </List>
      </div>
    </MinimalPage>
  )
}
