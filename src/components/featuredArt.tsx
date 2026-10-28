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
 *
 * And the showcase site's scorpion art, baked into the site's 1-bit ink by
 * scripts/bake-dither.mjs (sources in art/):
 * - wordmark:     the showcase top bar's logo beside the system's name
 * - logo:         that pixel scorpion logo, large
 * - illustration: the showcase's detailed scorpion, re-dithered
 * - boxed:        the boxed SCORPION UI pixel wordmark
 * - stinger:      the album-cover tail close-up
 *
 * And compositions of live components (the picture is inert decoration:
 * FeaturedCard marks it inert, so none of these controls take focus):
 * - kit:     a specimen sheet: buttons, a switch, a checkbox, a slider
 * - log:     a LogView streaming build lines, with a status line
 * - meters:  three meters: components, tokens, stories
 * - buttons: the button variants in a row, with a keyboard hint
 * - tabs:    a tab bar over a short component list
 */

import { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Checkbox,
  Kbd,
  LogView,
  Meter,
  Slider,
  StatusLine,
  StatusLineSegment,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Window,
  type LogLine,
} from '@scorp-ds/components'
import VillageIcon from './village/VillageIcon'

export type FeaturedArt =
  | 'window'
  | 'palette'
  | 'diagram'
  | 'sprite'
  | 'wordmark'
  | 'logo'
  | 'illustration'
  | 'boxed'
  | 'stinger'
  | 'kit'
  | 'log'
  | 'meters'
  | 'buttons'
  | 'tabs'

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

/** A baked 1-bit picture, centred whole in the well at its own pixel size. */
function Baked({ src, cover = false }: { src: string; cover?: boolean }) {
  return (
    <span className="featured-art featured-art--baked">
      <img src={src} alt="" className={cover ? 'featured-art-img featured-art-img--cover' : 'featured-art-img'} />
    </span>
  )
}

/** The showcase top bar's branding: the pixel logo beside the name. */
function WordmarkArt() {
  return (
    <span className="featured-art featured-art--wordmark">
      <img src="/dither/showcase-logo.png" alt="" className="featured-art-img" style={{ width: 60, height: 56 }} />
      {/* stacked as a lockup: one line would outgrow the card */}
      <span className="featured-art-name">
        Scorpion
        <br />
        Design System
      </span>
    </span>
  )
}

function KitArt() {
  return (
    <div className="featured-art featured-art--kit">
      <div className="flex items-center gap-2">
        <Button size="sm">ship</Button>
        <Button size="sm" variant="secondary">docs</Button>
        <Badge size="sm" variant="success" caps>stable</Badge>
      </div>
      <div className="flex items-center gap-4">
        <Switch size="sm" checked label="dark" onCheckedChange={() => {}} />
        <Checkbox size="sm" defaultChecked label="tokens" />
      </div>
      <Slider defaultValue={62} aria-label="Density" />
    </div>
  )
}

// The log replays this build forever as a rolling window of three lines, a
// new one every beat, so it is never half empty or cut off; reduced motion
// shows the last three, still.
const BUILD: Omit<LogLine, 'id'>[] = [
  { level: 'info', text: 'tokens: 378 resolved' },
  { level: 'info', text: 'components: 43 built' },
  { level: 'debug', text: 'stories: 65 rendered' },
  { level: 'info', text: 'axe: 0 violations' },
  { level: 'info', text: 'vendored to 3 sites' },
]
const LOG_ROWS = 3

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function LogArt() {
  // t counts lines written so far; it only grows, so ids stay unique
  const [t, setT] = useState(() => (reducedMotion() ? BUILD.length : LOG_ROWS))
  useEffect(() => {
    if (reducedMotion()) return
    const id = window.setInterval(() => setT((i) => i + 1), 1400)
    return () => window.clearInterval(id)
  }, [])
  const lines: LogLine[] = Array.from({ length: LOG_ROWS }, (_, k) => {
    const id = t - LOG_ROWS + k
    return { ...BUILD[id % BUILD.length], id }
  })
  return (
    <div className="featured-art featured-art--log">
      <LogView lines={lines} framed={false} className="featured-log" />
      <StatusLine
        left={<StatusLineSegment icon="Check" tone="success">build ok</StatusLineSegment>}
        right={<StatusLineSegment>scorp-ds</StatusLineSegment>}
      />
    </div>
  )
}

function MetersArt() {
  return (
    <div className="featured-art featured-art--meters">
      <Meter value={43} max={43} label="components" valueText="43" size="sm" />
      <Meter value={378} max={378} label="tokens" valueText="378" size="sm" />
      <Meter value={65} max={65} label="stories" valueText="65" size="sm" />
    </div>
  )
}

function ButtonsArt() {
  return (
    <div className="featured-art featured-art--buttons">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm">primary</Button>
        <Button size="sm" variant="secondary">secondary</Button>
        <Button size="sm" variant="outline">outline</Button>
        <Button size="sm" variant="ghost">ghost</Button>
      </div>
      <div className="featured-art-hint">
        <Kbd keys={['⌘', 'K']} size="sm" /> <span>to search 43 components</span>
      </div>
    </div>
  )
}

function TabsArt() {
  return (
    <div className="featured-art featured-art--tabs">
      <Tabs defaultValue="components">
        <TabsList>
          <TabsTrigger value="tokens">tokens</TabsTrigger>
          <TabsTrigger value="components">components</TabsTrigger>
          <TabsTrigger value="docs">docs</TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          <div className="featured-art-rows">
            <span>Button</span>
            <Badge size="sm" variant="success" caps>stable</Badge>
            <span>Window</span>
            <Badge size="sm" variant="info" caps>new</Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function FeaturedArtView({ art }: { art: FeaturedArt }) {
  if (art === 'kit') return <KitArt />
  if (art === 'log') return <LogArt />
  if (art === 'meters') return <MetersArt />
  if (art === 'buttons') return <ButtonsArt />
  if (art === 'tabs') return <TabsArt />
  if (art === 'wordmark') return <WordmarkArt />
  if (art === 'logo') return <Baked src="/dither/showcase-logo.png" />
  if (art === 'illustration') return <Baked src="/dither/showcase-illustration.png" />
  if (art === 'boxed') return <Baked src="/dither/showcase-wordmark.png" />
  if (art === 'stinger') return <Baked src="/dither/showcase-stinger.png" cover />
  if (art === 'window') return <WindowArt />
  if (art === 'palette') return <PaletteArt />
  if (art === 'diagram') return <DiagramArt />
  return <SpriteArt />
}
