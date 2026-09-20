import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fragment Mono (regular 400 only - the site is single-weight): the scorp-ds
// --font-family-mono token names it, but nothing loaded it, so browsers fell
// back to ui-monospace (SF Mono on macOS). Self-hosted via @fontsource.
import '@fontsource/fragment-mono/400.css'

// Load the scorp-ds design tokens directly (CSS custom properties only).
// The baked components stylesheet is no longer imported: it carried a second
// Tailwind preflight that fought ours, and DS component classes compile
// through this app's own Tailwind pass (the content glob covers the vendored
// dist). MUST come before our CSS so the tokens are available.
import '@scorp-ds/tokens/styles/tokens.css'

// Your project's Tailwind CSS (uses the tokens loaded above)
import './index.css'

// Minimal-mode stylesheet (ported from the prototype; uses the aliases in index.css)
import './styles/minimal.css'

// Rarity palette: loot.ts is the single source of truth; the CSS custom
// properties minimal.css consumes are set once here. Theme gems never touch
// --rar-* (themes.ts removes only its own keys), so these survive re-theming.
import { RARITY_COLORS } from './game/loot'
for (const [rarity, hex] of Object.entries(RARITY_COLORS)) {
  document.documentElement.style.setProperty(`--rar-${rarity}`, hex)
}

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
