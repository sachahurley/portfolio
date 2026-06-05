/**
 * Project Detail Page (/projects/:slug)
 *
 * Shows the full details of a single project.
 * If the project isn't found, shows a "not found" message.
 * External projects don't use this page (they link directly out).
 */

import { useParams, Link } from 'react-router-dom'
import { Button, Badge, Divider, Card } from '@scorp-ds/components'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProjectBySlug } from '../data/projects'
import PageContainer from '../components/PageContainer'

export default function ProjectDetail() {
  // useParams reads the ":slug" from the URL, e.g., /projects/portfolio -> slug = "portfolio"
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  // If no project found, show a helpful message
  if (!project) {
    return (
      <PageContainer className="space-y-6">
        <h1 className="text-base font-mono font-medium text-[var(--text-primary)] leading-[1.7]">
          Project Not Found
        </h1>
        <p className="text-base font-mono text-[var(--text-secondary)] leading-[1.625]">
          The project you're looking for doesn't exist.
        </p>
        <Link to="/projects">
          <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
            Back to Projects
          </Button>
        </Link>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="space-y-8">

      {/* Back link */}
      <Link to="/projects" className="no-underline">
        <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
          All Projects
        </Button>
      </Link>

      {/* Project header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="text-base font-mono font-medium text-[var(--text-primary)] leading-[1.7]">
          {project.title}
        </h1>
        {project.year && (
          <p className="text-sm text-[var(--text-secondary)] font-mono">
            {project.year}
          </p>
        )}
      </div>

      <Divider />

      {/* Project description */}
      <div className="space-y-6">
        <p className="text-base font-mono text-[var(--text-secondary)] leading-[1.625]">
          {project.longDescription || project.description}
        </p>

        {/* Tools used */}
        {project.tools && project.tools.length > 0 && (
          <Card>
            <h2 className="text-base font-mono font-medium text-[var(--text-primary)] mb-3">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Badge key={tool} variant="info">{tool}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* External link if available */}
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline inline-block"
          >
            <Button variant="primary" iconRight={<ExternalLink size={16} className="-translate-y-px" />}>
              Visit Live Project
            </Button>
          </a>
        )}
      </div>

    </PageContainer>
  )
}
