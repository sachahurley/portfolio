/**
 * Project detail (/projects/:slug)
 *
 * Back button + title + role meta + prose body (problem / outcome subheads).
 * External projects keep a "View project ↗" CTA.
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import PagerNav from '../components/PagerNav'
import { getProjectBySlug } from '../data/projects'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import NotFound from './NotFound'
import { ArrowUpRight } from '../components/icons'
import { usePageTitle } from '../lib/usePageTitle'
import { useReadToEnd } from '../lib/useReadToEnd'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  usePageTitle(project?.title)
  const { award } = useXp()

  useEffect(() => {
    if (project) award(XP_AWARDS.project, `opened ${project.title}`, `project:${project.slug}`)
  }, [project, award])

  // "Read a quest to the end": the bottom sentinel awards once per quest.
  const endRef = useReadToEnd(() => {
    if (project) {
      award(XP_AWARDS.questComplete, `quest complete: ${project.title}`, `questdone:${project.slug}`)
    }
  }, !!project)

  if (!project) return <NotFound />

  return (
    <MinimalPage>
      <BackButton fallback="/projects" />
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
      </div>

      {project.externalUrl && (
        <a
          className="platebtn"
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 28 }}
        >
          view project <ArrowUpRight />
        </a>
      )}

      <PagerNav section="projects" slug={project.slug} />

      {/* read-to-end sentinel (quest completion XP) */}
      <div ref={endRef} aria-hidden="true" />
    </MinimalPage>
  )
}
