import { useEffect } from 'react'
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

const SECTION_LABELS: Record<string, string> = {
  projects: 'projects',
  lab: 'lab',
  notes: 'notes',
  about: 'about',
}

// Scroll to top on navigation and award "explored a section" XP once per section
function RouteEffects() {
  const location = useLocation()
  const { award } = useXp()

  useEffect(() => {
    window.scrollTo(0, 0)
    const seg = location.pathname.split('/').filter(Boolean)[0]
    if (seg && SECTION_LABELS[seg]) {
      award(XP_AWARDS.visit, `explored ${SECTION_LABELS[seg]}`, `visit:/${seg}`)
    }
  }, [location.pathname, award])

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
