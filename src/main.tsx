import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Load Scorpion UI's CSS variables (design tokens for colors, fonts, etc.)
// This MUST come before your own CSS so the tokens are available
import '@scorp-ds/components/styles'

// Your project's Tailwind CSS (uses the tokens loaded above)
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
