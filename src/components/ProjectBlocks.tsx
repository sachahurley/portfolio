/**
 * ProjectBlocks — thin adapter over the design system's CaseStudyBlocks.
 * The section library (typed blocks + pb layout styles) was upstreamed into
 * @scorp-ds/components; this file exists so page imports and the
 * `ProjectBlock` authoring type in data/projects.ts stay stable.
 *
 * It also names the live figures a `slot` block can ask for, so the data
 * files stay plain serialisable content (see components/caseStudySlots).
 */

import { CaseStudyBlocks } from '@scorp-ds/components'
import type { ProjectBlock } from '../data/projects'
import { InterfaceSpecimen, PaletteSpecimen } from './caseStudySlots'

const SLOTS = {
  'scorp-interface': <InterfaceSpecimen />,
  'scorp-palette': <PaletteSpecimen />,
}

export default function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return <CaseStudyBlocks blocks={blocks} slots={SLOTS} />
}
