/**
 * Feature flags. Build-time, not runtime: Vite inlines these, so a flagged-
 * off feature's UI entry points vanish from the production bundle.
 *
 * TAROT_ENABLED gates the tarot parlor (route, lab row, village tap). On by
 * default; VITE_TAROT=0 in the Vercel env (then a redeploy) is the kill
 * switch. The serverless function reads the same env var at runtime
 * (api/_lib/guard.ts) and answers 404 while it is off. Spend is gated
 * separately: without ANTHROPIC_API_KEY the Seer is templated and free.
 */

export const TAROT_ENABLED = import.meta.env.DEV || import.meta.env.VITE_TAROT !== '0'
