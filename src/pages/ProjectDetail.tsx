/**
 * Project detail (/projects/:slug)
 *
 * Long-form article template: title + meta header from projects.ts data,
 * then the project's lazy-loaded content file (src/content/projects) or the
 * minimal FallbackArticle when none exists. External projects keep a
 * "view project ↗" CTA. No back button - the dock handles it.
 */

import { Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import { getProjectBySlug } from '../data/projects'
import { projectContent } from '../content/projects/registry'
import FallbackArticle from '../components/article/FallbackArticle'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import NotFound from './NotFound'
import { ArrowUpRight } from '../components/icons'
import { usePageTitle } from '../lib/usePageTitle'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  usePageTitle(project?.title)
  const { award } = useXp()

  useEffect(() => {
    if (project) award(XP_AWARDS.project, `opened ${project.title}`, `project:${project.slug}`)
  }, [project, award])

  if (!project) return <NotFound />

  const Content = projectContent[project.slug]
  const meta = [project.role, project.year].filter(Boolean).join(' · ')

  return (
    <MinimalPage>
      <h1 className="page">{project.title}</h1>
      {meta && <div className="meta" style={{ marginTop: 4 }}>{meta}</div>}

      <div className="prose">
        {Content ? (
          <Suspense fallback={<div className="art-loading" aria-hidden />}>
            <Content />
          </Suspense>
        ) : (
          <FallbackArticle project={project} />
        )}
      </div>

      {project.externalUrl && (
        <a
          className="btn art-cta"
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          view project <ArrowUpRight />
        </a>
      )}
    </MinimalPage>
  )
}
