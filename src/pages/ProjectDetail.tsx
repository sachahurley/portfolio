/**
 * Project detail (/projects/:slug)
 *
 * Title + role meta + prose body (problem / outcome subheads). External
 * projects keep a "View project ↗" CTA. No back button - the dock handles it.
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import { getProjectBySlug } from '../data/projects'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const { award } = useXp()

  useEffect(() => {
    if (project) award(XP_AWARDS.project, `opened ${project.title}`, `project:${project.slug}`)
  }, [project, award])

  if (!project) return <NotFound />

  return (
    <MinimalPage>
      <h1 className="page">{project.title}</h1>
      {project.role && <div className="meta" style={{ marginTop: 4 }}>{project.role}</div>}

      <div className="prose">
        <div className="thumb" />
        <p>
          {project.longDescription || project.description} Placeholder case study -
          in the real build this is a full write-up with the same prose rhythm as
          the notes pages.
        </p>
        <h2>The problem</h2>
        <p>
          What you set out to solve, and the constraints you were working within.
          Subheadings use the same spacing rhythm as the notes pages.
        </p>
        <h2>The outcome</h2>
        <p>
          What shipped and what it changed. Inline{' '}
          <a href="https://x.com/sacha_hurley" target="_blank" rel="noopener noreferrer">
            links
          </a>{' '}
          are amber and underlined.
        </p>
        {project.externalUrl && (
          <p>
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
              View project ↗
            </a>
          </p>
        )}
      </div>

      {project.externalUrl && (
        <a
          className="btn"
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 28 }}
        >
          view project ↗
        </a>
      )}
    </MinimalPage>
  )
}
