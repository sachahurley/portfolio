/**
 * ProjectBlocks — thin adapter over the design system's CaseStudyBlocks.
 * The section library (nine typed blocks + pb layout styles) was upstreamed
 * into @scorp-ds/components; this file exists so page imports and the
 * `ProjectBlock` authoring type in data/projects.ts stay stable.
 */

import { CaseStudyBlocks } from '@scorp-ds/components'
import type { ProjectBlock } from '../data/projects'

export default function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return <CaseStudyBlocks blocks={blocks} />
}
