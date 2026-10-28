/**
 * Featured with images lab (/lab/featured-images)
 *
 * The home page's Featured items keep their pixel-icon buttons; this page
 * tries four ways to pair each one with a picture of the work. Scorp DS
 * has a 16:9 screenshot and Tarot GPT a 2:3 tarot card (drawn from the
 * tile sheet like the reader's own cards), so every idea is tested against
 * two different proportions. Laid out in HTML with the menu's pixel icons:
 * the home grid's canvas scene can't hold images, so the chosen idea gets
 * built as an HTML section. Every item links to the real page.
 */

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import MinimalPage from '../components/MinimalPage'
import VillageIcon, { type VillageIconName } from '../components/village/VillageIcon'
import { TileBox } from '../components/TileSprite'
import { TAROT_TILES, TAROT_TILE_H, TAROT_TILE_W } from '../game/tarotTiles'
import { TILE_META } from '../data/tileSheet'
import { usePageTitle } from '../lib/usePageTitle'
import FeaturedCard from '../components/FeaturedCard'
import { FEATURED } from '../data/featured'

interface Item {
  label: string
  to: string
  icon: VillageIconName
  line: string
  media: { kind: 'img'; src: string } | { kind: 'card'; id: string }
}

const ITEMS: Item[] = [
  {
    label: 'Scorp DS',
    to: '/projects/scorpion-ui',
    icon: 'scorpion',
    line: 'The design system this site is built from.',
    media: { kind: 'img', src: '/dither/scorp-thumb.png' },
  },
  {
    label: 'Tarot GPT',
    to: '/lab/tarot',
    icon: 'tarot',
    line: 'A pixel mystic reads your journey.',
    media: { kind: 'card', id: 'major/the_star' },
  },
]

/** The picture for an item, sized to a height: a screenshot keeps 16:9, a
 *  tarot card is drawn from the tile sheet at a whole-pixel scale. */
function Picture({ item, height }: { item: Item; height: number }) {
  if (item.media.kind === 'img') {
    return (
      <img
        src={item.media.src}
        alt=""
        className="fi-img"
        style={{ height, width: Math.round((height * 16) / 9) }}
      />
    )
  }
  const cell = TAROT_TILES[item.media.id]
  // a card is 2x3 tiles on the sheet's pitch; pick the whole scale that fits
  const artH = TAROT_TILE_H * TILE_META.pitch - (TILE_META.pitch - TILE_META.tile)
  const scale = Math.max(1, Math.floor(height / artH))
  return (
    <span className="fi-card" style={{ height }}>
      {cell && <TileBox x={cell[0]} y={cell[1]} w={TAROT_TILE_W} h={TAROT_TILE_H} scale={scale} tint="var(--fg)" />}
    </span>
  )
}

function Label({ item }: { item: Item }) {
  return <span className="fi-label">{item.label} ↗</span>
}

/** A: the picture, with the pixel icon pinned to its corner as a badge. */
function BadgeOnPicture() {
  return (
    <div className="fi-row">
      {ITEMS.map((it) => (
        <Link key={it.label} to={it.to} className="fi-item">
          <span className="fi-pic">
            <Picture item={it} height={96} />
            <span className="fi-badge">
              <VillageIcon name={it.icon} size={20} />
            </span>
          </span>
          <Label item={it} />
        </Link>
      ))}
    </div>
  )
}

/** B: the icon button as it is today, with a small picture under it. */
function IconThenPicture() {
  return (
    <div className="fi-row">
      {ITEMS.map((it) => (
        <Link key={it.label} to={it.to} className="fi-item">
          <span className="fi-icon">
            <VillageIcon name={it.icon} size={40} />
          </span>
          <span className="fi-pic fi-pic--small">
            <Picture item={it} height={54} />
          </span>
          <Label item={it} />
        </Link>
      ))}
    </div>
  )
}

/** C: today's icon buttons; hover or focus floats a preview card above. */
function PreviewOnHover() {
  return (
    <div className="fi-row">
      {ITEMS.map((it) => (
        <Link key={it.label} to={it.to} className="fi-item fi-item--hover">
          <span className="fi-preview" aria-hidden="true">
            <Picture item={it} height={84} />
            <span className="fi-preview-line">{it.line}</span>
          </span>
          <span className="fi-icon">
            <VillageIcon name={it.icon} size={40} />
          </span>
          <Label item={it} />
        </Link>
      ))}
    </div>
  )
}

/** D, the chosen idea: the home page's own FeaturedCard, so this stays
 *  exactly what ships (larger 1-bit icon, centred on its row). */
function IconCard() {
  return (
    <div className="featured-cards">
      {FEATURED.map((f) => (
        <FeaturedCard key={f.path} item={f} />
      ))}
    </div>
  )
}

function Idea({ name, idea, children }: { name: string; idea: string; children: ReactNode }) {
  return (
    <div className="mn-block">
      <div style={{ color: 'var(--accent)' }}>{name}</div>
      <p style={{ color: 'var(--body)', fontSize: 14, lineHeight: 1.6, margin: '6px 0 24px' }}>{idea}</p>
      <div className="fi-stage">
        <h2 className="home-section-title">featured</h2>
        {children}
      </div>
    </div>
  )
}

export default function FeaturedImagesLab() {
  usePageTitle('Featured with images', 'Four ways to pair the home page’s featured icons with a picture of the work.')
  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Featured with images</h1>
      <p className="lead">
        The Featured items keep their pixel-icon buttons; these are four ways to add a picture of the work. Scorp DS
        has a wide screenshot and Tarot GPT a tall tarot card, so each idea is shown with both shapes. Everything links.
      </p>

      <Idea
        name="A. Badge on the picture"
        idea="The picture leads and the pixel icon sits on its corner as a badge, like an app icon on a file. Most visual; the icon becomes a marker rather than the button."
      >
        <BadgeOnPicture />
      </Idea>

      <Idea
        name="B. Icon, then picture"
        idea="Today's icon button stays on top and a small picture sits under it, above the label. The closest to the current home: the icon is still the thing you tap."
      >
        <IconThenPicture />
      </Idea>

      <Idea
        name="C. Preview on hover"
        idea="Today's icons, unchanged. Hovering (or tabbing to) one floats a preview card above it with the picture and one line. Quietest at rest; phones see only the icons."
      >
        <PreviewOnHover />
      </Idea>

      <Idea
        name="D. Icon card (chosen, now on the home page)"
        idea="Each item becomes a small card: the picture on top, then the 1-bit icon, larger and centred on the label and one-line description beside it. Gives the work the most room and explains it."
      >
        <IconCard />
      </Idea>
    </MinimalPage>
  )
}
