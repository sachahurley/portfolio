/**
 * Featured card pictures composed from the design system itself rather
 * than baked from a screenshot: the work shown as the work. Each is sized
 * for the card's 132px picture well and named so data/featured.ts can ask
 * for one (media: { kind: 'art', art: ... }).
 *
 * - window:  a live Window with component badges and the token meter
 * - palette: the two token ramps (primary amber, secondary sepia)
 * - diagram: the package-layering box diagram, as live text
 * - sprite:  the scorpion sprite at a large whole-pixel size
 */

import { Badge, Meter, Window } from '@scorp-ds/components'
import VillageIcon from './village/VillageIcon'

export type FeaturedArt = 'window' | 'palette' | 'diagram' | 'sprite'

function WindowArt() {
  return (
    <div className="featured-art featured-art--window">
      <Window title="scorp-ds" status="43 components" titleAs="h3" scroll={false} variant="active" bodyClassName="px-3 py-2 flex flex-col gap-2">
        <div className="flex gap-1.5 overflow-hidden">
          <Badge size="sm" variant="success" caps>button</Badge>
          <Badge size="sm" variant="success" caps>table</Badge>
          <Badge size="sm" variant="info" caps>window</Badge>
        </div>
        <Meter value={378} max={378} label="tokens" valueText="378 / 378" size="sm" />
      </Window>
    </div>
  )
}

// Whole class strings so Tailwind keeps them (see caseStudySlots.tsx).
const PRIMARY = [
  'bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500',
  'bg-primary-600', 'bg-primary-700', 'bg-primary-800', 'bg-primary-900', 'bg-primary-950', 'bg-primary-975',
] as const
const SECONDARY = [
  'bg-secondary-50', 'bg-secondary-100', 'bg-secondary-200', 'bg-secondary-300', 'bg-secondary-400', 'bg-secondary-500',
  'bg-secondary-600', 'bg-secondary-700', 'bg-secondary-800', 'bg-secondary-900', 'bg-secondary-950', 'bg-secondary-975',
] as const

function PaletteArt() {
  return (
    <div className="featured-art featured-art--palette">
      {[
        ['primary', PRIMARY],
        ['secondary', SECONDARY],
      ].map(([name, steps]) => (
        <div key={name as string}>
          <div className="featured-art-label">{name as string}</div>
          <div className="flex gap-px bg-secondary-600 p-px">
            {(steps as readonly string[]).map((cls) => (
              <div key={cls} className={`h-6 flex-1 ${cls}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const DIAGRAM = [
  '┌──────────────────────────────────┐',
  '│scorp-ds  ·  package layering     │',
  '├──────────────────────────────────┤',
  '│storybook    65 stories           │',
  '│components   43 components        │',
  '│tokens       378 tokens           │',
  '│tui-art      box frames as text   │',
  '└──────────────────────────────────┘',
].join('\n')

function DiagramArt() {
  return <pre className="featured-art featured-art--diagram">{DIAGRAM}</pre>
}

function SpriteArt() {
  return (
    <span className="featured-art featured-art--sprite">
      <VillageIcon name="scorpion" size={96} />
    </span>
  )
}

export function FeaturedArtView({ art }: { art: FeaturedArt }) {
  if (art === 'window') return <WindowArt />
  if (art === 'palette') return <PaletteArt />
  if (art === 'diagram') return <DiagramArt />
  return <SpriteArt />
}
