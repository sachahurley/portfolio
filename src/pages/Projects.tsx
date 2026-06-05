/**
 * Projects Index Page (/projects)
 *
 * Shows a grid of all projects from the data file.
 * Each project card links to either an internal detail page
 * or an external URL.
 */

import { Link } from 'react-router-dom'
import { Button } from '@scorp-ds/components'
import { ArrowLeft } from 'lucide-react'
import { projects } from '../data/projects'
import FeaturedProjectCard from '../components/FeaturedProjectCard'
import PageContainer from '../components/PageContainer'

export default function Projects() {
  return (
    <PageContainer className="space-y-8">

      {/* Back to home */}
      <Link to="/" className="no-underline">
        <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
          Home
        </Button>
      </Link>

      {/* Page header - matches the home page type scale */}
      <div>
        <h1 className="text-base font-mono font-medium text-[var(--text-primary)] leading-[1.7] mb-3">
          Projects
        </h1>
        <p className="text-base font-mono text-[var(--text-secondary)] leading-[1.625]">
          A collection of projects built with AI tools, from design systems
          to web applications. Some live here, some live elsewhere, all built
          with intention.
        </p>
      </div>

      {/* Project grid - single column, full-image cards (matches home) */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <FeaturedProjectCard key={project.slug} project={project} />
        ))}
      </div>

    </PageContainer>
  )
}
