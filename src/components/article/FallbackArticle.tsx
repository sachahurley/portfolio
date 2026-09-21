/**
 * Minimal article body for projects without a content file in
 * src/content/projects: just the long/short description. The external CTA is
 * rendered by ProjectDetail for all projects, so it isn't repeated here.
 */

import type { Project } from '../../data/projects'

export default function FallbackArticle({ project }: { project: Project }) {
  return <p>{project.longDescription || project.description}</p>
}
