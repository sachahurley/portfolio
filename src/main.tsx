import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fragment Mono (regular 400 only - the site is single-weight): the scorp-ds
// --font-family-mono token names it, but nothing loaded it, so browsers fell
// back to ui-monospace (SF Mono on macOS). Self-hosted via @fontsource.
import '@fontsource/fragment-mono/400.css'

// Load Scorpion UI's CSS variables (design tokens for colors, fonts, etc.)
// This MUST come before your own CSS so the tokens are available
import '@scorp-ds/components/styles'

// Your project's Tailwind CSS (uses the tokens loaded above)
import './index.css'

// Minimal-mode stylesheet (ported from the prototype; uses the aliases in index.css)
import './styles/minimal.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
