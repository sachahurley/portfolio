import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@scorp-ds/components'

// Layout wraps every page with the persistent Minimal-mode chrome
import Layout from './components/Layout'

// XP / progression system
import { XpProvider, useXp, XP_AWARDS } from './context/XpProvider'

// Page components - each one is a different page on your site
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Notes from './pages/Notes'
import NotePost from './pages/NotePost'
import Lab from './pages/Lab'
import LabItem from './pages/LabItem'
import About from './pages/About'
import NotFound from './pages/NotFound'

import { locationFor } from './game/locations'

// On navigation: scroll to top (window AND the game frame's internal
// scroller), announce the arrival in the message log when entering a new
// location, and award discovery XP once per location (de-duped by key,
// so returning visitors' save files keep their earlier discoveries).
function RouteEffects() {
  const location = useLocation()
  const { award, logLine } = useXp()
  const prevLocRef = useRef<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('gf-viewport')?.scrollTo(0, 0)
    const loc = locationFor(location.pathname)
    if (!loc) return
    if (prevLocRef.current !== loc.path) {
      prevLocRef.current = loc.path
      logLine(loc.arrive, 'arrive')
    }
    award(XP_AWARDS.visit, `discovered ${loc.name}`, `visit:${loc.path}`)
  }, [location.pathname, award, logLine])

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
              {/* Home page - the landing page at "/" */}
              <Route path="/" element={<Home />} />

              {/* Projects index + detail */}
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />

              {/* Lab index + experiment */}
              <Route path="/lab" element={<Lab />} />
              <Route path="/lab/:slug" element={<LabItem />} />

              {/* Notes index + detail */}
              <Route path="/notes" element={<Notes />} />
              <Route path="/notes/:slug" element={<NotePost />} />

              {/* About */}
              <Route path="/about" element={<About />} />

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
