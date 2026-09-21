import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tilesDevApi } from './scripts/tilesDevApi'
import { tarotDevApi } from './scripts/tarotDevApi'

// https://vite.dev/config/
export default defineConfig({
  // tilesDevApi: dev-only save endpoint for /dev/tiles
  // tarotDevApi: dev-only /api/tarot-chat, same handler the Vercel function serves
  plugins: [react(), tilesDevApi(), tarotDevApi()],
  // Bind on all interfaces so both 127.0.0.1 (IPv4) and ::1 (IPv6) work
  server: {
    host: true,
    port: 5173,
    strictPort: true, // fail loudly instead of silently hopping to 5174/5175/...
  },
  // One React instance for app + @scorp-ds/components (avoids invalid hook call / white screen)
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Don't pre-bundle the vendored design-system packages. Serving them
    // directly means the dev.sh dist->vendor sync loop's updates reflect
    // without a Vite restart or `--force` to clear the dependency cache.
    // (@scorp-ds/* resolves into vendor/, not the sibling checkout.)
    exclude: ['@scorp-ds/components', '@scorp-ds/tokens'],
  },
})
