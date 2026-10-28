/**
 * FeaturedCard: one featured item (data/featured.ts) as a card: the picture
 * on top, then the 1-bit icon, the label with its shortcut arrow, and one
 * line. The home page's Featured section is a grid of these.
 *
 * The picture fills a fixed-height well: an image is cropped to fill it, a
 * tarot card is drawn from the tile sheet at the largest whole-pixel scale
 * that fits, centred on the card surface. The icon is the home grid's own
 * live sprite (a decorative VillageScene): the same accent highlights,
 * glints and idle bob as the Navigation icons, centred on the label and
 * line beside it.
 */

import { Link } from 'react-router-dom'
import VillageScene, { type SceneLayout } from './village/VillageScene'
import type { VillageItem } from './village/villageKit'
import { TileBox } from './TileSprite'
import { TAROT_TILES, TAROT_TILE_H, TAROT_TILE_W } from '../game/tarotTiles'
import { TILE_META } from '../data/tileSheet'
import type { Featured } from '../data/featured'

/** One cell, no ground: the sprite and its live cue's headroom, nothing else. */
const ICON_LAYOUT: SceneLayout = { mode: 'grid', cols: [1], cellPx: 44, ground: false }

// One stable item per featured entry: the scene rebuilds whenever its items
// change identity. The tap is what switches the live cue on; the scene is
// decorative, so it never becomes a second link inside the card.
const iconItems = new Map<string, VillageItem[]>()
function iconFor(item: Featured): VillageItem[] {
  let it = iconItems.get(item.path)
  if (!it) {
    it = [{ part: item.part, tap: { label: item.label, href: item.path, style: 'invert' } }]
    iconItems.set(item.path, it)
  }
  return it
}

const noop = () => {}

/** Height of the picture well, px; matches .featured-pic in minimal.css. */
const WELL = 132

function Picture({ media }: { media: Featured['media'] }) {
  if (media.kind === 'img') return <img src={media.src} alt="" className="featured-img" />
  const cell = TAROT_TILES[media.id]
  // a card is 2x3 tiles on the sheet's pitch; the whole scale that fits the
  // well with a little air above and below
  const artH = TAROT_TILE_H * TILE_META.pitch - (TILE_META.pitch - TILE_META.tile)
  const scale = Math.max(1, Math.floor((WELL - 24) / artH))
  return cell ? <TileBox x={cell[0]} y={cell[1]} w={TAROT_TILE_W} h={TAROT_TILE_H} scale={scale} tint="var(--fg)" /> : null
}

export default function FeaturedCard({ item }: { item: Featured }) {
  return (
    <Link to={item.path} className="featured-card plate-round">
      <span className="featured-pic">
        <Picture media={item.media} />
      </span>
      <span className="featured-foot">
        <span className="featured-icon">
          <VillageScene decorative items={iconFor(item)} layout={ICON_LAYOUT} onNavigate={noop} />
        </span>
        <span className="featured-text">
          {/* the arrow is held to the last word, so a wrapped label never
              leaves it alone on a line */}
          <span className="featured-label">{item.label}{'\u00a0'}↗</span>
          <span className="featured-line">{item.line}</span>
        </span>
      </span>
    </Link>
  )
}
