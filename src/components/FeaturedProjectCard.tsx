/**
 * FeaturedProjectCard Component
 *
 * An alternative project card with a full background image
 * and all content (title, description, tags, button) overlaid on top.
 *
 * Uses the same stroke style as the Scorpion UI Card component:
 * - 0.5px border with sepia-500 (light) / sepia-800 (dark)
 * - 24px border radius
 *
 * When no thumbnail image is available, shows a warm gradient placeholder.
 */

import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

interface FeaturedProjectCardProps {
  project: Project
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  // The whole card is the button. It always opens this project's dedicated
  // detail page (/projects/:slug), where the link out to the live project lives.
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="no-underline block hover:opacity-90 transition-opacity"
    >
      <div
        className="
          relative overflow-hidden
          rounded-[24px]
          border-[0.5px] border-solid border-sepia-500 dark:border-sepia-800
          aspect-video
          flex flex-col justify-end
          group
        "
      >
        {/* Background layer - thumbnail image or gradient placeholder */}
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          /* Warm gradient placeholder when no image is available */
          <div className="absolute inset-0 bg-gradient-to-br from-sepia-200 via-sepia-100 to-amber-100 dark:from-sepia-950 dark:via-sepia-925 dark:to-amber-950" />
        )}

        {/* Dark gradient overlay - ensures text is readable over any background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content overlaid on the image */}
        <div className="relative z-10 p-8">
          <h3 className="text-xl font-mono font-normal text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
