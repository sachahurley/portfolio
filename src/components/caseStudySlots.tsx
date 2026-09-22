/**
 * Live figures for `slot` case-study blocks.
 *
 * These are the alternative to a screenshot: instead of a picture of the
 * design system, the figure IS the design system, rendered from the same
 * package the rest of the page imports. They retint with the gem themes,
 * never go stale against a version bump, and prove the claim the surrounding
 * copy makes.
 *
 * ProjectBlocks maps these onto the slot names the data files use.
 */

import {
  Badge,
  Button,
  Meter,
  StatusLine,
  StatusLineSegment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Window,
} from '@scorp-ds/components'

/** A working pane composed from Window, Table, Badge, Meter and StatusLine. */
export function InterfaceSpecimen() {
  const rows: { name: string; kind: string; state: string; tone: 'success' | 'info' }[] = [
    { name: 'Button', kind: 'actions', state: 'stable', tone: 'success' },
    { name: 'Window', kind: 'terminal', state: 'new', tone: 'info' },
    { name: 'LogView', kind: 'terminal', state: 'new', tone: 'info' },
  ]
  return (
    <Window
      title="components.tsx"
      status="43 exported"
      titleAs="h3"
      scroll={false}
      variant="active"
      actions={
        <Button size="small" variant="ghost">
          docs
        </Button>
      }
      bodyClassName="p-4 flex flex-col gap-4"
    >
      <Table density="compact">
        <TableHeader>
          <TableRow>
            <TableHead>component</TableHead>
            <TableHead>family</TableHead>
            <TableHead>state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.kind}</TableCell>
              <TableCell>
                <Badge size="sm" variant={r.tone} caps>
                  {r.state}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Meter value={378} max={378} label="tokens resolved" valueText="378 / 378" size="sm" />
      <StatusLine
        aria-label="Design system status"
        left={<StatusLineSegment icon="Check" tone="success">build ok</StatusLineSegment>}
        right={<StatusLineSegment>dark</StatusLineSegment>}
      />
    </Window>
  )
}

// The two scales every component is allowed to name, at every step that
// exists. Written out rather than generated because Tailwind only keeps
// classes it can see as whole strings in the source.
const PRIMARY = [
  ['50', 'bg-primary-50'], ['100', 'bg-primary-100'], ['200', 'bg-primary-200'],
  ['300', 'bg-primary-300'], ['400', 'bg-primary-400'], ['500', 'bg-primary-500'],
  ['600', 'bg-primary-600'], ['700', 'bg-primary-700'], ['800', 'bg-primary-800'],
  ['900', 'bg-primary-900'], ['950', 'bg-primary-950'], ['975', 'bg-primary-975'],
] as const

const SECONDARY = [
  ['50', 'bg-secondary-50'], ['100', 'bg-secondary-100'], ['200', 'bg-secondary-200'],
  ['300', 'bg-secondary-300'], ['400', 'bg-secondary-400'], ['500', 'bg-secondary-500'],
  ['600', 'bg-secondary-600'], ['700', 'bg-secondary-700'], ['800', 'bg-secondary-800'],
  ['900', 'bg-secondary-900'], ['950', 'bg-secondary-950'], ['975', 'bg-secondary-975'],
] as const

function Ramp({ name, alias, steps }: { name: string; alias: string; steps: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline gap-2 text-xs text-secondary-600">
        <span className="text-[var(--text-primary)]">{alias}</span>
        <span>aliases {name}</span>
      </div>
      {/* A mid-tone ground shows through the gaps. It has to be mid rather
          than the usual hairline: the darkest steps sit within a hair of the
          figure's own background, so a dark divider would let them read as a
          hole punched in the ramp. */}
      <div className="flex gap-px bg-secondary-600 p-px">
        {steps.map(([step, cls]) => (
          <div key={step} className="flex-1">
            <div className={`h-9 ${cls}`} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-px px-px">
        {steps.map(([step]) => (
          <div key={step} className="flex-1 text-center text-[9px] leading-none text-secondary-600">
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}

/** The two scales as stepped bars: what 378 tokens looks like as a quantity. */
export function PaletteSpecimen() {
  return (
    <div className="flex flex-col gap-5 p-4">
      <Ramp alias="primary" name="amber" steps={PRIMARY} />
      <Ramp alias="secondary" name="sepia" steps={SECONDARY} />
    </div>
  )
}
