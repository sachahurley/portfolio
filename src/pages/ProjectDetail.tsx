/**
 * Project detail (/projects/:slug)
 *
 * Back button, then either a full case study (ProjectCaseStudy, which draws
 * its own title) for projects with a `caseStudy` or an unlocked sealed one,
 * or the plain title + role meta + simple prose template. External projects
 * keep a "View project ↗" CTA.
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import PagerNav from '../components/PagerNav'
import ProjectCaseStudy from '../components/ProjectCaseStudy'
import { getProjectBySlug } from '../data/projects'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import NotFound from './NotFound'
import { ArrowUpRight } from '../components/icons'
import { usePageTitle } from '../lib/usePageTitle'
import { useReadToEnd } from '../lib/useReadToEnd'
import { useVault } from '../lib/useVault'
import LockGate from '../components/LockGate'
import { Button } from '@scorp-ds/components'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  usePageTitle(project?.title, project?.description)
  const { award } = useXp()

  // Locked projects: decrypt state for the sealed case-study body
  // (inert for everything else).
  const vault = useVault(project?.locked ? project.slug : null)
  const unlocked = vault.status === 'unlocked'

  useEffect(() => {
    if (project) award(XP_AWARDS.project, `opened ${project.title}`, `project:${project.slug}`)
  }, [project, award])

  // Cracking a sealed case study pays out like picking a lab lock.
  useEffect(() => {
    if (project?.locked && unlocked) {
      award(XP_AWARDS.lab, 'picked a lock', `unlock:${project.slug}`)
    }
  }, [project, unlocked, award])

  // "Read a quest to the end": the bottom sentinel awards once per quest.
  // A locked page is short enough that the sentinel starts in view, so the
  // award only arms once the case study is actually readable.
  const endRef = useReadToEnd(() => {
    if (project) {
      award(XP_AWARDS.questComplete, `quest complete: ${project.title}`, `questdone:${project.slug}`)
    }
  }, !!project && (!project.locked || unlocked))

  if (!project) return <NotFound />

  // The case study to draw, if any: a sealed one once unlocked (its public
  // teaser supplies the title and summary), or the project's own.
  const study =
    project.locked && vault.status === 'unlocked'
      ? {
          title: project.title,
          summary: project.longDescription || project.description,
          ...vault.study,
        }
      : !project.locked && project.caseStudy
        ? { title: project.title, ...project.caseStudy }
        : undefined

  return (
    <MinimalPage>
      <BackButton fallback="/projects" />
      {study ? (
        <ProjectCaseStudy study={study} />
      ) : (
        <>
          <h1 className="page">{project.title}</h1>
          {project.role && <div className="meta" style={{ marginTop: 4 }}>{project.role}</div>}
        </>
      )}

      {study ? null : project.locked ? (
        // Explicit locked branch: a locked project has no `caseStudy`, so
        // without this it would fall into the placeholder prose template.
        <>
          {(project.longDescription || project.description) && (
            <p className="lead" style={{ marginTop: 16 }}>
              {project.longDescription || project.description}
            </p>
          )}
          <LockGate
            kicker="sealed"
            hint="enter the password to unlock"
            inputType="password"
            busy={vault.status === 'checking'}
            error={vault.status === 'locked' && vault.error ? 'that\'s not it' : undefined}
            fails={vault.fails}
            onSubmit={vault.submit}
          >
            {/* the redacted body: hatched placeholder bars until unlocked */}
            <div className="vault-redacted" aria-hidden="true">
              <div className="vault-hatch" />
              <div className="vault-hatch" />
              <div className="vault-hatch" />
            </div>
          </LockGate>
        </>
      ) : (
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
      )}

      {project.externalUrl && (
        <Button
          variant="secondary"
          size="small"
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6"
        >
          view project <ArrowUpRight />
        </Button>
      )}

      <PagerNav section="projects" slug={project.slug} />

      {/* read-to-end sentinel (quest completion XP) */}
      <div ref={endRef} aria-hidden="true" />
    </MinimalPage>
  )
}
