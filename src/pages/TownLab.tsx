/**
 * Town lab (/lab/town)
 *
 * A gothic isometric town where every building is a section of the site:
 * the Quest Log keep (Projects), the Library (Notes), the Vault tower
 * (Lab), the Hall of Records chapel (About), the Mirror Monument
 * (Character), and the plaza bonfire (Home). Tap or click a building to
 * enter it; the Old Well keeps a secret. A candidate future home page,
 * proving the tappable interaction before any walkable-character work.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import TownScene from '../components/town/TownScene'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

export default function TownLab() {
  usePageTitle('Town lab')
  const navigate = useNavigate()
  const { award, logLine } = useXp()

  // Dedicated lab pages award their own visit XP (the LabItem template
  // only covers template-rendered experiments).
  useEffect(() => {
    award(XP_AWARDS.lab, 'surveyed the Town', 'lab:town')
  }, [award])

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Town lab</h1>
      <p className="lead">
        The site as a gothic town: every building is a section. Tap one to enter it.
      </p>

      <TownScene
        onEnter={(path) => navigate(path)}
        onSecret={() => {
          award(XP_AWARDS.secret, 'found the Old Well', 'secret:town-well')
          logLine('Something glimmers at the bottom of the well.', 'hint')
        }}
      />

      <p className="town-hint">
        Keep: Projects · Library: Notes · Tower: Lab · Chapel: About · Monument: Character ·
        Bonfire: Home
      </p>
    </MinimalPage>
  )
}
