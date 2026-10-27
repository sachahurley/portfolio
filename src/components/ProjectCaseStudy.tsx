/**
 * ProjectCaseStudy: a project's case study, drawn by the design system's
 * CaseStudyPage. It renders the page's own <h1>, so the detail page drops
 * its plain title when it shows one of these.
 *
 * It also names the live figures a `slot` block can ask for, so the data
 * files stay plain serialisable content (see components/caseStudySlots).
 */

import { CaseStudyPage, type CaseStudy } from '@scorp-ds/components'
import { InterfaceSpecimen, PaletteSpecimen } from './caseStudySlots'

const SLOTS = {
  'scorp-interface': <InterfaceSpecimen />,
  'scorp-palette': <PaletteSpecimen />,
}

export default function ProjectCaseStudy({ study }: { study: CaseStudy }) {
  return <CaseStudyPage study={study} slots={SLOTS} />
}
