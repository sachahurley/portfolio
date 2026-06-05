import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@scorp-ds/components'

// Layout wraps every page with the shared nav and footer
import Layout from './components/Layout'

// Page components - each one is a different page on your site
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Notes from './pages/Notes'
import NotePost from './pages/NotePost'

function App() {
  return (
    // ThemeProvider locked to dark mode only
    <ThemeProvider forcedTheme="dark">
      {/* BrowserRouter enables client-side navigation (no full page reloads) */}
      <BrowserRouter>
        {/* Layout provides the nav bar and footer on every page */}
        <Layout>
          <Routes>
            {/* Home page - the landing page at "/" */}
            <Route path="/" element={<Home />} />

            {/* Projects index - shows all projects at "/projects" */}
            <Route path="/projects" element={<Projects />} />

            {/* Project detail - a specific project at "/projects/scorpion-ui" etc. */}
            <Route path="/projects/:slug" element={<ProjectDetail />} />

            {/* Notes index - all notes at "/notes" */}
            <Route path="/notes" element={<Notes />} />

            {/* Single note - at "/notes/my-first-post" etc. */}
            <Route path="/notes/:slug" element={<NotePost />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
