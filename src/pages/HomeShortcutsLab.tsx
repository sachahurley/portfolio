/**
 * Home shortcuts lab (/lab/home-shortcuts)
 *
 * The home grid as a phone home screen with three kinds of tile, each
 * looking like what it does:
 * - apps open a place (Projects, Lab, Notes, About),
 * - shortcuts jump to one thing inside an app (Tarot, a featured case study),
 * - widgets show live state and open a tool (Character, World).
 *
 * Three ways to fit a featured case study in, plus the side menu split into
 * places and shortcuts. Laid out in HTML with the menu's pixel icons
 * (VillageIcon) rather than the canvas VillageScene, because a widget spans
 * two cells and the scene grid has no spans; the chosen layout gets built
 * into the real scene. Every tile works: apps and shortcuts navigate, the
 * widgets open the character screen and the World dialog.
 */

import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import VillageIcon, { type VillageIconName } from '../components/village/VillageIcon'
import PixelPortrait from '../components/game/PixelPortrait'
import { inkColor } from '../game/avatarInks'
import { useXp } from '../context/XpProvider'
import { useSiteStats } from '../lib/siteStats'
import { openWorld } from '../lib/worldDialog'
import { getListedProjects } from '../data/projects'
import { usePageTitle } from '../lib/usePageTitle'

const featured = getListedProjects().find((p) => p.caseStudy)!
const SHORT = 'Scorp DS'

/** A pixel scorpion for the Scorp DS shortcut: claws up, tail curling back.
 *  'X' is ink. Drawn as SVG rects like VillageIcon, so it themes the same. */
const SCORPION = [
  '.XX...........XX.',
  'X..X.........X..X',
  'X.XX.........XX.X',
  '.X.X.........X.X.',
  '...X..XXXXX..X...',
  '....XXXXXXXXX....',
  '.XX.XXXXXXXXX.XX.',
  'X..XXXXXXXXXXX..X',
  '.XX.XXXXXXXXX.XX.',
  'X..X.XXXXXXX.X..X',
  '.....XXXXXXX.....',
  '.......XXX.......',
  '........XX.......',
  '........XX..XX...',
  '.........XXX.X...',
  '.............X...',
]

function PixelArt({ rows, size }: { rows: string[]; size: number }) {
  let d = ''
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] === 'X') d += `M${x} ${y}h1v1h-1z`
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

type Icon = VillageIconName | 'scorpion'

function TileIcon({ icon, size }: { icon: Icon; size: number }) {
  return icon === 'scorpion' ? <PixelArt rows={SCORPION} size={size} /> : <VillageIcon name={icon} size={size} />
}

/** An app or shortcut tile: icon over label. Shortcuts carry the ↗ badge. */
function Tile({ icon, label, to, shortcut }: { icon: Icon; label: string; to: string; shortcut?: boolean }) {
  const navigate = useNavigate()
  return (
    <button type="button" className={`hs-tile${shortcut ? ' hs-tile--shortcut' : ''}`} onClick={() => navigate(to)}>
      <span className="hs-icon">
        <TileIcon icon={icon} size={40} />
        {shortcut && <span className="hs-badge" aria-hidden="true">↗</span>}
      </span>
      <span className="hs-label">{label}</span>
    </button>
  )
}

const APPS = (
  <>
    <Tile icon="projects" label="Projects" to="/projects" />
    <Tile icon="lab" label="Lab" to="/lab" />
    <Tile icon="notes" label="Notes" to="/notes" />
    <Tile icon="about" label="About" to="/about" />
  </>
)

/** Character as a widget: the visitor's own avatar, name, level and XP. */
function CharacterWidget() {
  const navigate = useNavigate()
  const { name, level, avatarSeed, avatarInk } = useXp()
  return (
    <button type="button" className="hs-widget" onClick={() => navigate('/character')}>
      <span className="hs-widget-art">
        <PixelPortrait seed={avatarSeed} cell={3} ink={inkColor(avatarInk)} />
      </span>
      <span className="hs-widget-text">
        <span className="hs-widget-title">{name}</span>
        <span className="hs-widget-sub">
          Lv {level.level + 1} · {level.title}
        </span>
        <span className="gf-xpbar" aria-hidden="true">
          <span className="gf-xpfill" style={{ width: `${level.pct}%` }} />
        </span>
      </span>
    </button>
  )
}

/** World as a widget: the globe with the traveller count on the tile. */
function WorldWidget() {
  const stats = useSiteStats()
  return (
    <button type="button" className="hs-widget" onClick={openWorld}>
      <span className="hs-widget-art">
        <VillageIcon name="world" size={36} />
      </span>
      <span className="hs-widget-text">
        <span className="hs-widget-title">{stats ? stats.travellers.toLocaleString() : '···'}</span>
        <span className="hs-widget-sub">travellers so far</span>
      </span>
    </button>
  )
}

/** The featured case study as a two-cell widget: thumbnail and title. */
function CaseStudyWidget() {
  const navigate = useNavigate()
  return (
    <button type="button" className="hs-widget hs-widget--wide" onClick={() => navigate(`/projects/${featured.slug}`)}>
      {featured.thumbnail && <img className="hs-widget-thumb" src={featured.thumbnail} alt="" />}
      <span className="hs-widget-text">
        <span className="hs-widget-kicker">case study</span>
        <span className="hs-widget-title">{featured.title}</span>
      </span>
    </button>
  )
}

function Option({ name, idea, children }: { name: string; idea: string; children: ReactNode }) {
  return (
    <div className="mn-block">
      <div style={{ color: 'var(--accent)' }}>{name}</div>
      <p style={{ color: 'var(--body)', fontSize: 14, lineHeight: 1.6, margin: '6px 0 24px' }}>{idea}</p>
      <div className="hs-screen">{children}</div>
    </div>
  )
}

function RowLabel({ children }: { children: ReactNode }) {
  return <div className="hs-rowlabel">{children}</div>
}

/** The side menu split into places and shortcuts (a static sketch). */
function MenuSketch() {
  const rows: { icon: Icon; label: string; badge?: boolean }[][] = [
    [
      { icon: 'home', label: 'Home' },
      { icon: 'projects', label: 'Projects' },
      { icon: 'lab', label: 'Lab' },
      { icon: 'notes', label: 'Notes' },
      { icon: 'about', label: 'About' },
    ],
    [
      { icon: 'scorpion', label: SHORT, badge: true },
      { icon: 'tarot', label: 'Tarot', badge: true },
    ],
  ]
  return (
    <div className="hs-menu">
      {rows.map((group, i) => (
        <div key={i}>
          {i === 1 && <div className="hs-rowlabel">shortcuts</div>}
          {group.map((r) => (
            <div key={r.label} className="hs-menu-row">
              <TileIcon icon={r.icon} size={20} />
              <span>{r.label}</span>
              {r.badge && <span className="hs-menu-badge">↗</span>}
            </div>
          ))}
        </div>
      ))}
      <div className="hs-menu-strip">
        <CharacterWidget />
      </div>
    </div>
  )
}

export default function HomeShortcutsLab() {
  usePageTitle('Home shortcuts', 'The home grid as apps, shortcuts and widgets, with a featured case study as a shortcut.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Home shortcuts</h1>
      <p className="lead">
        The home grid as a phone home screen: <em className="hs-em">apps</em> open a place,{' '}
        <em className="hs-em">shortcuts</em> (↗) jump to one thing inside an app, and{' '}
        <em className="hs-em">widgets</em> show live state. Everything here works: tap around.
      </p>

      <Option
        name="A. Shortcut tile"
        idea="The case study joins the grid as its own icon, and Tarot gets the same ↗ badge, so both read as shortcuts. Character and World stay as they are. The smallest change."
      >
        <div className="hs-grid hs-grid--3">
          {APPS}
          <Tile icon="character" label="Character" to="/character" />
          <Tile icon="tarot" label="Tarot" to="/lab/tarot" shortcut />
          <Tile icon="scorpion" label={SHORT} to={`/projects/${featured.slug}`} shortcut />
        </div>
      </Option>

      <Option
        name="B. Widget tile"
        idea="The case study as a two-cell widget in the grid's rhythm: its thumbnail and title. The work gets more presence without leaving the grid."
      >
        <div className="hs-grid hs-grid--3">
          {APPS}
          <CaseStudyWidget />
          <Tile icon="character" label="Character" to="/character" />
          <Tile icon="tarot" label="Tarot" to="/lab/tarot" shortcut />
        </div>
      </Option>

      <Option
        name="C. Apps, shortcuts, widgets (recommended)"
        idea="Three labelled rows. Four apps; a shortcuts row with the case study and Tarot; Character and World as live widgets. Every tile looks like what it does, and the row of places shrinks to the four that matter."
      >
        <div className="hs-grid hs-grid--4">{APPS}</div>
        <RowLabel>shortcuts</RowLabel>
        <div className="hs-grid hs-grid--4">
          <Tile icon="scorpion" label={SHORT} to={`/projects/${featured.slug}`} shortcut />
          <Tile icon="tarot" label="Tarot" to="/lab/tarot" shortcut />
        </div>
        <RowLabel>you</RowLabel>
        <div className="hs-widgets">
          <CharacterWidget />
          <WorldWidget />
        </div>
      </Option>

      <Option
        name="Side menu to match"
        idea="Places only, then a shortcuts group. Character leaves the list for the player strip at the bottom (where it already lives), and World moves to its widget."
      >
        <MenuSketch />
      </Option>
    </MinimalPage>
  )
}
