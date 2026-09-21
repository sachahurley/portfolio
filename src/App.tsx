import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@scorp-ds/components'

// Layout wraps every page with the persistent Minimal-mode chrome
import Layout from './components/Layout'

// XP / progression system
import { XpProvider, useXp, XP_AWARDS } from './context/XpProvider'

// Page components - each one is a different page on your site
import VillageHome from './pages/VillageHome'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Notes from './pages/Notes'
import NotePost from './pages/NotePost'
import Lab from './pages/Lab'
import LabItem from './pages/LabItem'
import WordmarkLab from './pages/WordmarkLab'
import TownLab from './pages/TownLab'
import BuilderLab from './pages/BuilderLab'
import VillageLab from './pages/VillageLab'
import About from './pages/About'
import Character from './pages/Character'
import NotFound from './pages/NotFound'

// Dev-only tools (tree-shaken out of production builds)
const TileBrowser = import.meta.env.DEV ? lazy(() => import('./pages/dev/TileBrowser')) : null

import { locationFor } from './game/locations'
import { TAROT_ENABLED } from './lib/flags'

// Feature-flagged and lazy for the same reason as TileBrowser: with the
// flag off, the parlor (deck data included) never enters the bundle.
const TarotLab = TAROT_ENABLED ? lazy(() => import('./pages/TarotLab')) : null

// On navigation: scroll to top (window AND the game frame's internal
// scroller), announce the arrival in the message log when entering a new
// location, and award discovery XP once per location (de-duped by key,
// so returning visitors' save files keep their earlier discoveries).
function RouteEffects() {
  const location = useLocation()
  const { award, logLine, markChestsSeen } = useXp()
  const prevLocRef = useRef<string | null>(null)
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('gf-viewport')?.scrollTo(0, 0)
    // Chest "new" pips clear when the visitor LEAVES the character screen
    // (route change, not unmount: StrictMode's dev double-mount would mark
    // them seen on arrival).
    if (prevPathRef.current === '/character' && location.pathname !== '/character') {
      markChestsSeen()
    }
    prevPathRef.current = location.pathname
    const loc = locationFor(location.pathname)
    if (!loc) return
    if (prevLocRef.current !== loc.path) {
      prevLocRef.current = loc.path
      logLine(loc.arrive, 'arrive')
    }
    award(XP_AWARDS.visit, `discovered ${loc.real}`, `visit:${loc.path}`)
  }, [location.pathname, award, logLine, markChestsSeen])

  return null
}

function App() {
  return (
    // ThemeProvider locked to dark mode only
    <ThemeProvider forcedTheme="dark">
      <XpProvider>
        {/* BrowserRouter enables client-side navigation (no full page reloads) */}
        <BrowserRouter>
          <RouteEffects />
          {/* Layout provides the persistent dock/sheet/loader on every page */}
          <Layout>
            <Routes>
              {/* Home page - the landing page at "/": the village map */}
              <Route path="/" element={<VillageHome />} />

              {/* Projects index + detail */}
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />

              {/* Lab index + experiment (static routes win over :slug) */}
              <Route path="/lab" element={<Lab />} />
              <Route path="/lab/wordmark" element={<WordmarkLab />} />
              <Route path="/lab/town" element={<TownLab />} />
              <Route path="/lab/builder" element={<BuilderLab />} />
              <Route path="/lab/village" element={<VillageLab />} />
              {TarotLab && (
                <Route path="/lab/tarot" element={<Suspense fallback={null}><TarotLab /></Suspense>} />
              )}
              <Route path="/lab/:slug" element={<LabItem />} />

              {/* Notes index + detail */}
              <Route path="/notes" element={<Notes />} />
              <Route path="/notes/:slug" element={<NotePost />} />

              {/* About */}
              <Route path="/about" element={<About />} />

              {/* Character management (not a world location: no visit XP) */}
              <Route path="/character" element={<Character />} />

              {/* Dev-only: tile asset browser */}
              {TileBrowser && (
                <Route path="/dev/tiles" element={<Suspense fallback={null}><TileBrowser /></Suspense>} />
              )}

              {/* 404 - any unmatched route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </XpProvider>
    </ThemeProvider>
  )
}

export default App
