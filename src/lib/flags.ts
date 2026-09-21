/**
 * Feature flags. Build-time, not runtime: Vite inlines these, so a flagged-
 * off feature's UI entry points vanish from the production bundle.
 *
 * TAROT_ENABLED gates the tarot parlor (route, lab row, village tap). Always
 * on in dev; off in deployed builds until VITE_TAROT=1 is set in the Vercel
 * env, so shipping it later is an env flip + redeploy, not a code change.
 * The serverless functions stay deployed either way, but read the same
 * env var at runtime (api/_lib/guard.ts) and answer 404 while it is off,
 * so a flagged-off deploy has no reachable spend surface.
 */

export const TAROT_ENABLED = import.meta.env.DEV || import.meta.env.VITE_TAROT === '1'
