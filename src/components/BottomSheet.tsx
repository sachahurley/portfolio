/**
 * BottomSheet — the site menu, opened by the dock's Menu button or the game
 * frame's character strip. The shell (scrim, top-plate panel, grabber,
 * slide + exit animation, Esc, scroll lock) is the DS BottomSheet; this
 * file keeps the contents: nav from the world-map registry, the compact
 * character row, and the contact links.
 *
 * The stone tile-ring seam and drag-to-dismiss were retired with the DS
 * swap (decision 2026-09-18): close is the scrim, Esc, or any nav link.
 */

import { Link, useLocation } from 'react-router-dom'
import { Badge, BottomSheet as DSBottomSheet, Divider, ListRow } from '@scorp-ds/components'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { LOCATIONS } from '../game/locations'
import PortraitPlate from './game/PortraitPlate'
import PixelItem from './game/PixelItem'
import DitherIcon from './DitherIcon'
import VillageIcon from './village/VillageIcon'
import { ArrowUpRight } from './icons'

export default function BottomSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const location = useLocation()
  const { level, award, name, avatarSeed, pendingLevels, chests } = useXp()
  const displayLevel = level.level + 1

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <DSBottomSheet isOpen={open} onClose={onClose} ariaLabel="Menu">
        <nav className="menu-nav">
          {LOCATIONS.map((loc) => {
            const locked = loc.minLevel != null && displayLevel < loc.minLevel
            const active = isActive(loc.path)
            return locked ? (
              <span key={loc.path} className="nav-sealed" aria-label="Sealed location">
                <DitherIcon name="lock" size={20} className="gf-ic" /> ???
                <span className="nav-flavor">sealed</span>
              </span>
            ) : (
              // active = fill + accent text (the DS SideNavigation pattern);
              // the old accent-ring wrapper was retired for storybook parity
              <Link
                key={loc.path}
                to={loc.path}
                className={active ? 'active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={onClose}
              >
                <VillageIcon name={loc.icon} size={20} className="gf-ic" /> {loc.real}
              </Link>
            )
          })}
        </nav>


        {/* Section seams are the DS Divider, NOT a border on the rows:
            the ListRow clips itself to --plate-round, which slices 6px off
            each end of any border it carries, so the seams live outside it
            (that also keeps both lines identical by construction). */}
        <Divider spacing="none" className="sheet-sep" />

        {/* Compact character row (DS ListRow; the full sheet lives at
            /character). .sheet-char is only the layout hook for the bar. */}
        <ListRow
          as={Link}
          asProps={{
            to: '/character',
            onClick: onClose,
            'aria-label': `Character: ${name}. Open character screen.`,
          }}
          className="sheet-char"
          thumb={<PortraitPlate seed={avatarSeed} cell={2} tiny />}
          title={name}
          titleSuffix={
            // Waiting rewards: the chest art itself when a chest waits
            // (mirrors the game frame's character strip), plus the badge
            // counting everything (claims + chests); quiet chevron otherwise.
            pendingLevels.length + chests.length > 0 ? (
              <span className="sheet-char-wait">
                {chests.length > 0 && (
                  <span aria-hidden="true">
                    <PixelItem kind="chest" rarity="common" cell={2} />
                  </span>
                )}
                <Badge variant="bone" size="small" caps>
                  ▴ {pendingLevels.length + chests.length} waiting
                </Badge>
              </span>
            ) : (
              <span className="sheet-char-go">›</span>
            )
          }
          description={
            // level line + the same mini XP readout as the game frame's
            // character strip (.xp-mini), so the sheet row reads level
            // progress too, not just the number
            <>
              {`Lv ${level.level + 1} — ${level.title}`}
              <span className="xp-mini" aria-hidden="true">
                <i style={{ width: `${level.pct}%` }} />
              </span>
            </>
          }
        />

        <Divider spacing="none" className="sheet-sep" />

        {/* Contact — sheet-only by design; no dedicated page, no email. */}
        <div className="sheet-contact">
          <div className="gf-label">dispatch a raven</div>
          <a
            href="https://x.com/sacha_hurley"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => award(XP_AWARDS.follow, 'followed on X', 'follow')}
          >
            X · @sacha_hurley <ArrowUpRight />
          </a>
          <a href="https://github.com/sachahurley" target="_blank" rel="noopener noreferrer">
            GitHub · sachahurley <ArrowUpRight />
          </a>
        </div>
    </DSBottomSheet>
  )
}
