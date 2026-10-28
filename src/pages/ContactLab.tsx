/**
 * Contact sheet lab (/lab/contact-sheet)
 *
 * Launch-checklist item 3: ways for a visitor to reach Sacha without the
 * page ever showing an email address. Each direction opens in the real DS
 * BottomSheet so it can be tried as it would ship; sending is a demo that
 * stays on the page. Once a direction is chosen it gets a backend and an
 * entry point (a Contact app on the home grid, About's "reach me", the
 * menu), and this page can retire.
 */

import { useState, type FormEvent, type ReactNode } from 'react'
import { BottomSheet, Button, Input, Textarea, Window } from '@scorp-ds/components'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import { usePageTitle } from '../lib/usePageTitle'

type Direction = 'note' | 'word' | 'terminal' | 'call'

const DIRECTIONS: { id: Direction; name: string; idea: string; ships: string }[] = [
  {
    id: 'note',
    name: 'A. Quick note',
    idea: 'One box and an optional reply-to. The fewest decisions between someone and a message.',
    ships: 'Needs a small Vercel function that emails you (Resend, free tier) and a rate limit. About half a day; shared by A, B and C.',
  },
  {
    id: 'word',
    name: 'B. Send word',
    idea: 'Name, reply-to and message in the site’s game voice. Sending earns XP like any other quest.',
    ships: 'Same backend as A, plus an XP award. About half a day.',
  },
  {
    id: 'terminal',
    name: 'C. Terminal mail',
    idea: 'The form as a TUI mail client: header fields, a reason picker, keyboard send. The most on-brand for the design system.',
    ships: 'Same backend as A. A touch slower to fill in on a phone.',
  },
  {
    id: 'call',
    name: 'D. Book a call',
    idea: 'No form at all: a scheduling link for a 20-minute chat, with a quick note as the fallback.',
    ships: 'Needs a scheduler account (Cal.com is free). No backend of ours; an hour to wire.',
  },
]

const muted = 'text-xs text-[var(--mut)]'

/** Shared "sent" state: says plainly that the demo didn't send anything. */
function Sent({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-8 text-center">
      <div className="text-xl text-[var(--fg)]">Sent.</div>
      <p className="mt-2 text-sm text-[var(--body)]">Demo only: nothing left this page.</p>
      <div className="mt-6">
        <Button variant="ghost" size="sm" onClick={onReset}>
          write another
        </Button>
      </div>
    </div>
  )
}

function SheetTitle({ title, line }: { title: string; line: string }) {
  return (
    <>
      <div className="text-xl text-[var(--fg)]">{title}</div>
      <p className="mt-2 text-sm text-[var(--body)]">{line}</p>
    </>
  )
}

/** A form that "sends" by flipping to the Sent state. */
function DemoForm({ children, sent, onSend }: { children: ReactNode; sent: boolean; onSend: () => void }) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSend()
  }
  return sent ? null : (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      {children}
    </form>
  )
}

function QuickNote({ sent, onSend }: { sent: boolean; onSend: () => void }) {
  return (
    <>
      <SheetTitle title="Leave a note" line="Roles, collaborations, or a chat about design systems and building with AI." />
      <DemoForm sent={sent} onSend={onSend}>
        <Textarea label="Message" rows={5} placeholder="What’s on your mind?" required />
        <Input label="Reply to (optional)" type="email" placeholder="you@company.com" />
        <div>
          <Button type="submit">send</Button>
        </div>
      </DemoForm>
    </>
  )
}

function SendWord({ sent, onSend }: { sent: boolean; onSend: () => void }) {
  return (
    <>
      <SheetTitle title="Send word" line="A raven reaches me within the day. I reply within two." />
      <DemoForm sent={sent} onSend={onSend}>
        <Input label="Your name" placeholder="Ada Lovelace" required />
        <Input label="Where I can reply" type="email" placeholder="you@company.com" required />
        <Textarea label="Message" rows={4} placeholder="What are you working on?" required />
        <div className="flex items-center gap-4">
          <Button type="submit">send word</Button>
          <span className="text-xs text-[var(--accent)]">+50 XP</span>
        </div>
      </DemoForm>
    </>
  )
}

const REASONS = ['a role', 'a project', 'just saying hi'] as const

function TerminalMail({ sent, onSend }: { sent: boolean; onSend: () => void }) {
  const [reason, setReason] = useState<(typeof REASONS)[number]>('a role')
  if (sent) return null
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSend()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          onSend()
        }
      }}
    >
      <Window title="mail · new message" status="draft" variant="active">
        <div className="grid gap-3 p-1">
          <div className="grid grid-cols-[56px_1fr] items-center gap-2">
            <span className={`${muted} uppercase tracking-wider`}>to</span>
            <span className="text-sm text-[var(--fg)]">sacha</span>
            <span className={`${muted} uppercase tracking-wider`}>from</span>
            <Input variant="quiet" size="sm" type="email" placeholder="you@company.com" aria-label="From" required />
            <span className={`${muted} uppercase tracking-wider`}>re</span>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="About">
              {REASONS.map((r) => (
                <Button
                  key={r}
                  type="button"
                  size="sm"
                  variant={r === reason ? 'secondary' : 'ghost'}
                  role="radio"
                  aria-checked={r === reason}
                  onClick={() => setReason(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>
          <Textarea rows={5} placeholder="> " aria-label="Message" required />
          <div className={`${muted} flex items-center justify-between uppercase tracking-wider`}>
            <span>esc closes</span>
            <Button type="submit" size="sm" variant="ghost">
              ⌘⏎ send
            </Button>
          </div>
        </div>
      </Window>
    </form>
  )
}

function BookCall({ sent, onSend }: { sent: boolean; onSend: () => void }) {
  const [noting, setNoting] = useState(false)
  if (noting) return <QuickNote sent={sent} onSend={onSend} />
  return (
    <>
      <SheetTitle title="Grab 20 minutes" line="Pick a time that works; it lands straight in my calendar." />
      <div className="mt-6 grid gap-3">
        {['Tue 10:00', 'Wed 14:30', 'Thu 09:00'].map((slot) => (
          <Button key={slot} variant="secondary" onClick={onSend}>
            {slot} · 20 min
          </Button>
        ))}
      </div>
      <p className={`${muted} mt-4`}>Times are a demo. The real version embeds your scheduler.</p>
      <div className="mt-6">
        <Button variant="ghost" size="sm" onClick={() => setNoting(true)}>
          or leave a note instead
        </Button>
      </div>
    </>
  )
}

export default function ContactLab() {
  usePageTitle('Contact sheet', 'Ways to get in touch without an email address on the page: four directions to try.')
  const [open, setOpen] = useState<Direction | null>(null)
  const [sent, setSent] = useState(false)
  const close = () => {
    setOpen(null)
    setSent(false)
  }
  const current = DIRECTIONS.find((d) => d.id === open)

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Contact sheet</h1>
      <p className="lead">
        Four ways to reach me without an email address on the page. Each opens the way it would ship; sending is a
        demo and nothing leaves the page.
      </p>
      <p className="lead">
        The chosen one opens from a Contact app on the home grid, from &ldquo;reach me&rdquo; on About, and from the
        menu.
      </p>

      <div className="mn-block">
        <div className="principles">
          {DIRECTIONS.map((d) => (
            <div key={d.id} className="border-t border-[var(--border)] pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="principles-name" style={{ color: 'var(--accent)' }}>
                    {d.name}
                  </span>
                  <span className="principles-text">{d.idea}</span>
                  <span className="principles-text" style={{ color: 'var(--mut)', fontSize: 12 }}>
                    {d.ships}
                  </span>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setOpen(d.id)} className="shrink-0">
                  open
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet isOpen={open !== null} onClose={close} ariaLabel={current ? current.name : 'Contact'}>
        <div className="mx-auto w-full max-w-lg px-6 pb-8 pt-2">
          {open === 'note' && <QuickNote sent={sent} onSend={() => setSent(true)} />}
          {open === 'word' && <SendWord sent={sent} onSend={() => setSent(true)} />}
          {open === 'terminal' && <TerminalMail sent={sent} onSend={() => setSent(true)} />}
          {open === 'call' && <BookCall sent={sent} onSend={() => setSent(true)} />}
          {sent && <Sent onReset={() => setSent(false)} />}
        </div>
      </BottomSheet>
    </MinimalPage>
  )
}
