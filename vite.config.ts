import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
    // Don't pre-bundle the linked design-system packages. Serving them directly
    // means edits in ../scorp-ds reflect immediately in dev — no Vite restart or
    // `--force` needed to clear the dependency cache.
    exclude: ['@scorp-ds/components', '@scorp-ds/tokens'],
  },
})
