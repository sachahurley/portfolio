/**
 * FeaturedCard: one featured item (data/featured.ts) as a card: the picture
 * on top, then the 1-bit icon, the label with its shortcut marker, and one
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
import DitherIcon from './DitherIcon'
import { FeaturedArtView } from './featuredArt'
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
  if (media.kind === 'art') return <FeaturedArtView art={media.art} />
  const cell = TAROT_TILES[media.id]
  // a card is 2x3 tiles on the sheet's pitch; the whole scale that fits the
  // well with a little air above and below
  const artH = TAROT_TILE_H * TILE_META.pitch - (TILE_META.pitch - TILE_META.tile)
  const scale = Math.max(1, Math.floor((WELL - 24) / artH))
  return cell ? <TileBox x={cell[0]} y={cell[1]} w={TAROT_TILE_W} h={TAROT_TILE_H} scale={scale} tint="var(--fg)" /> : null
}

/**
 * How a card says "this jumps into a page of the site":
 * - out:      ↗ (reads as leaving the site; the original)
 * - none:     nothing; the Featured title and the card itself carry it
 * - arrow:    a 1-bit right arrow, "go to", in-site
 * - alias:    a curved-arrow badge on the icon's corner, the desktop
 *             shortcut / alias convention
 * - pin, bookmark, star: a 1-bit glyph after the label
 */
export type FeaturedMarker = 'out' | 'none' | 'arrow' | 'alias' | 'pin' | 'bookmark' | 'star'

/** The home page's marker until one is chosen. */
export const HOME_MARKER: FeaturedMarker = 'out'

/** The alias badge: a curved arrow, 7x7 art px, drawn as rects like the icons. */
const ALIAS = ['...X...', '...XX..', 'XXXXXX.', 'X..XX..', 'X..X...', 'X......', 'X......']
function AliasBadge() {
  let d = ''
  ALIAS.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] === 'X') d += `M${x} ${y}h1v1h-1z`
  })
  return (
    <span className="featured-alias" aria-hidden="true">
      <svg width={14} height={14} viewBox="0 0 7 7" shapeRendering="crispEdges" fill="currentColor">
        <path d={d} />
      </svg>
    </span>
  )
}

const GLYPH: Partial<Record<FeaturedMarker, 'arrow-right' | 'pin' | 'bookmark' | 'star'>> = {
  arrow: 'arrow-right',
  pin: 'pin',
  bookmark: 'bookmark',
  star: 'star',
}

export default function FeaturedCard({ item, marker = HOME_MARKER }: { item: Featured; marker?: FeaturedMarker }) {
  const glyph = GLYPH[marker]
  // the last word and its marker wrap as one unit
  const words = item.label.split(' ')
  const last = words.pop()
  const lead = words.length ? `${words.join(' ')} ` : ''
  return (
    <Link to={item.path} className="featured-card plate-round">
      {/* the picture is decorative: the label names the card */}
      <span className="featured-pic" aria-hidden="true">
        <Picture media={item.media} />
      </span>
      <span className="featured-foot">
        <span className="featured-icon">
          <VillageScene decorative items={iconFor(item)} layout={ICON_LAYOUT} onNavigate={noop} />
          {marker === 'alias' && <AliasBadge />}
        </span>
        <span className="featured-text">
          {/* a marker is held to the last word, so a wrapped label never
              leaves it alone on a line */}
          <span className="featured-label">
            {lead}
            <span className="featured-lastword">
              {last}
              {marker === 'out' && '\u00a0↗'}
              {glyph && (
                <>
                  {'\u00a0'}
                  <DitherIcon name={glyph} size={12} className="featured-glyph" />
                </>
              )}
            </span>
          </span>
          <span className="featured-line">{item.line}</span>
        </span>
      </span>
    </Link>
  )
}
