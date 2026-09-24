# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - runs `dev.sh`: starts the scorp-ds components watch build (expects a sibling checkout at `~/Projects/scorp-ds`) plus the Vite dev server on port 5173 (`strictPort`, so it fails loudly instead of hopping ports)
- `npm run dev:portfolio-only` - Vite only, no design-system watch (use when not editing scorp-ds)
- `npm run build` - `tsc -b && vite build` (the typecheck; there is no separate typecheck script)
- `npm run lint` - ESLint
- `npm run vendor:ds` - rebuilds `@scorp-ds/components` in the sibling checkout and copies the publishable files into `vendor/scorp-ds/` so the repo stays self-contained for cloud builds (source maps are dropped). Prints the DS commit and branch it built from. After running: review `git status vendor/`, run `npm run build`, commit `vendor/`. See "Working on scorp-ds and the portfolio together" before re-vendoring on a shared branch
- `node scripts/bake-avatars.mjs` - regenerates `src/game/avatarTiles.ts`, the avatar figure pool, from the Urizen tile sheet (`public/tiles/urizen.png`) and `src/data/tileIndex.ts` (deterministic, safe to re-run)
- `node scripts/bake-gear.mjs` - regenerates `src/game/gearTiles.ts`, the character screen's item art, from the tile ids listed in the script (fails if they drift from `BASES` in `src/game/loot.ts`)
- `node scripts/bake-dither.mjs` - regenerates the 1-bit case-study art in `public/dither/` from the committed source screenshots in `art/` (never served). Same Bayer doctrine as `src/lib/dither/oneBit.ts`, run offline; deterministic, safe to re-run
- `npm run tiles` - rebuilds the Urizen tile sheet, index and atlas data. It also bakes the site's own generated stonework (the jeweled frame, from `scripts/tiles/extras.mjs`) onto extra rows, so those tiles are searchable like the rest

There are no tests. Deploys to Vercel as an SPA (`vercel.json` rewrites everything to `index.html`).

## Architecture

React 19 + TypeScript + Vite SPA using react-router-dom and Tailwind 3.

### Design system: vendored scorp-ds

`@scorp-ds/components` and `@scorp-ds/tokens` are `file:` dependencies pointing at `vendor/scorp-ds/packages/`. The source of truth is the sibling `~/Projects/scorp-ds` repo; `npm run vendor:ds` syncs it in. Three consequences:

- `vite.config.ts` excludes both packages from `optimizeDeps` so edits in the sibling repo reflect immediately in dev, and dedupes `react`/`react-dom` to avoid invalid-hook-call white screens.
- `tailwind.config.js` gets its entire theme from `@scorp-ds/tokens/tailwind.preset`; do not add raw values to the Tailwind config.
- Source maps are not vendored (`vendor-ds.sh` deletes them after the copy). They pointed at scorp-ds paths that don't exist here, and as single-line several-hundred-KB files they were the one thing in `vendor/` git could never merge. `check-ds-sync.sh` already excluded them from its diff.

#### Working on scorp-ds and the portfolio together

The `vendor/` directory is committed build output, so two branches that both re-vendor **will** conflict. That is structural, not bad luck. Four rules keep it cheap:

1. **Never hand-merge a conflict in `vendor/`.** The files are minified bundles; a line-wise merge of them is meaningless even when git produces one. Resolve by rebuilding instead: finish the merge for every other file, re-run `vendor:ds` against a scorp-ds checkout that has both sides, then `git add vendor/`. Confirm the result is a superset by diffing a file only the other side touched.
2. **Re-vendor last.** Do it once, immediately before opening the PR, on a branch already up to date with `main`. Re-vendoring mid-branch just means doing it again later.
3. **One vendor PR in flight at a time.** A second one is guaranteed to need a rebuild-resolve.
4. **Point `SCORP_DS_DIR` at a scorp-ds worktree you own**, not the shared `~/Projects/scorp-ds`, which other sessions switch branches in:
   ```
   git -C ~/Projects/scorp-ds worktree add ~/conductor/workspaces/scorp-ds/<name> -b <branch>
   SCORP_DS_DIR=~/conductor/workspaces/scorp-ds/<name> npm run vendor:ds
   ```
   `vendor:ds` prints the commit and branch it built from; check that line, because the answer is otherwise unrecoverable after the fact.

A scorp-ds change must land upstream too. Until its PR merges, the `ds-check` CI job fails by design: it diffs the vendored dist against scorp-ds `main`, which doesn't have the change yet. Merge scorp-ds first, then the portfolio.

### Theming and the XP system (the core cross-file system)

- `src/context/XpProvider.tsx` holds XP, levels, gems, and toasts; persists to localStorage key `sh_min`. `award(amount, reason, key)` is de-duped by key (award constants in `XP_AWARDS`). Crossing a level threshold grants a theme gem and queues the level-up modal.
- `src/lib/themes.ts`: each earned gem carries a palette. Activating a gem re-themes the site by writing CSS custom properties inline on `<html>`. The `default` theme is special: it removes the inline overrides so the scorp-ds token aliases in `index.css` remain the stock look. The contract is the variable structure (`--accent`, `--fire1/2/3`, `--fg`, `--body`), not the hex values.
- All styling routes through these CSS variables. `src/styles/minimal.css` was ported verbatim from a prototype; layout/spacing stays as-is, colors only via token aliases. Site-wide rule: single font weight (400 everywhere); emphasis is carried by color, not weight.

### Lifetime site counters (the home page footer)

The only shared state on an otherwise client-side site: four totals summed across every visitor (`Travellers`, `XP earned`, `Quests read`, `Gems claimed`), shown by `src/components/HomeStats.tsx` under the village.

- `/api/stats` (`api/stats.ts` -> `api/_lib/stats.ts`) serves them. Storage is Upstash Redis over its REST API (`api/_lib/counters.ts`), driven with plain fetch; `INCRBY` is the whole requirement so there is no SDK dependency.
- Env: `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`, or the `KV_REST_API_URL` / `KV_REST_API_TOKEN` aliases that Vercel's Upstash marketplace integration sets. **Until one pair is set in Vercel, the endpoint answers 503 and the footer does not render at all.** That is deliberate: without a store each serverless instance would keep its own copy and the total would jump between cold starts, and a lifetime counter that is quietly fiction is worse than no counter. Locally (no `VERCEL` env var) it falls back to an in-process store so `npm run dev` exercises the real thing; those numbers reset when Vite restarts.
- Clients POST deltas since their own last report, never absolute totals; the ledger of what was already sent lives in `sh_site`, beside the save rather than inside it, so resetting progress does not re-count the browser as a new visitor. `SiteStatsReporter` (mounted by Layout) waits for the title screen to be dismissed before reporting, so a crawler or a bounced load never becomes a traveller.
- The numbers are client-reported and therefore measure browsers that ran the JS, not people. Caps in `counters.ts` plus the rate limiter bound how far a forged request can move a total.
- `npm run dev` serves the endpoint through `scripts/statsDevApi.ts`, the same handler/entry/dev-middleware split the tarot endpoint uses (shared plumbing in `scripts/devApi.ts`).

### Page structure

- `src/App.tsx` defines all routes; `ThemeProvider` is locked to dark mode. `RouteEffects` scrolls to top and awards section-visit XP on navigation.
- `src/components/Layout.tsx` wraps every page and mounts `MinimalChrome` (loader, floating dock, bottom sheet, toasts, level-up modal). There is no header or footer.
- Content is data-driven: add projects/notes/lab items by appending to the arrays in `src/data/*.ts` (each file documents its own shape). Detail pages resolve by `:slug`.
- Pixel-art visuals (`PixelFire`, `PixelClouds`, etc.) are canvas components.
