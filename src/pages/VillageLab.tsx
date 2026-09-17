/**
 * Village Kit lab (/lab/village)
 *
 * Hosts the onebit-kit Village Kit Builder: a self-contained 1-bit
 * pixel-village workshop (124 ASCII-authored parts, House / Tower /
 * Castle / Tree stackers, a phone-framed scene with tappable nav items,
 * and Recipe JSON export) aimed at building the future homepage map.
 *
 * Like Dither Studio, the kit is a workshop, not a dependency: the tool
 * is authored in its own project and shipped here as one flat built
 * file (public/village/index.html), embedded below and openable on its
 * own tab. It keeps its own identity (Pixel Ink paper/ink palette,
 * light/dark by OS preference) inside the site's frame.
 */

import { useEffect } from 'react'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import { ArrowUpRight } from '../components/icons'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

const TOOL_URL = '/village/index.html'

export default function VillageLab() {
  usePageTitle('Village kit')
  const { award } = useXp()

  // Dedicated lab pages award their own visit XP (the LabItem template
  // only covers template-rendered experiments).
  useEffect(() => {
    award(XP_AWARDS.lab, 'entered the village workshop', 'lab:village')
  }, [award])

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Village kit</h1>
      <p className="lead">
        A modular 1-bit pixel village builder: 124 hand-set parts, house and castle stackers, a
        phone-framed scene with tappable nav objects, and recipes that export as JSON. The
        workshop behind the homepage-map project.
      </p>

      <div className="vk-frame">
        <iframe
          src={TOOL_URL}
          title="Village Kit Builder"
          loading="lazy"
        />
      </div>

      <div className="bld-row" style={{ marginTop: 14, justifyContent: 'center' }}>
        <a className="platebtn" href={TOOL_URL} target="_blank" rel="noopener noreferrer">
          open full screen <ArrowUpRight />
        </a>
      </div>

      <p className="town-hint">
        Village parts trace little_bit_village by under_score_lab (CC BY 4.0); the rest are
        originals in the same idiom.
      </p>
    </MinimalPage>
  )
}
