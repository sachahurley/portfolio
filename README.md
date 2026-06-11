# portfolio

Sacha's personal site: projects, notes, lab experiments, and an XP/egg progression system. React 19 + TypeScript + Vite, styled with Tailwind and the scorp-ds design system (vendored in `vendor/`).

## Develop

```sh
npm install
npm run dev
```

`npm run dev` also starts a watch build of scorp-ds and expects a checkout at `~/Projects/scorp-ds`. Without one, use `npm run dev:portfolio-only`.

## Other commands

```sh
npm run build       # typecheck and production build
npm run lint        # eslint
npm run vendor:ds   # sync the vendored design system from ../scorp-ds
```

Content lives in `src/data/*.ts`. Deploys to Vercel.
