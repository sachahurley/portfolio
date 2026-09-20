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
import { Badge, BottomSheet as DSBottomSheet, ListRow } from '@scorp-ds/components'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { LOCATIONS } from '../game/locations'
import PortraitPlate from './game/PortraitPlate'
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


        {/* Compact character row (DS ListRow; the full sheet lives at
            /character). .sheet-char is only the section seam above it. */}
        <ListRow
          as={Link}
          asProps={{
            to: '/character',
            onClick: onClose,
            'aria-label': `Character: ${name}. Open character screen.`,
          }}
          className="sheet-char"
          thumb={<PortraitPlate seed={avatarSeed} cell={3} small />}
          title={name}
          titleSuffix={
            pendingLevels.length > 0 ? (
              <Badge variant="primary" size="small" caps className="gf-pulse">▴ level up</Badge>
            ) : chests.length > 0 ? (
              <Badge variant="bone" size="small" caps>
                ▪ {chests.length} chest{chests.length > 1 ? 's' : ''}
              </Badge>
            ) : (
              <span className="sheet-char-go">›</span>
            )
          }
          description={`Lv ${level.level + 1} — ${level.title}`}
        />

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
