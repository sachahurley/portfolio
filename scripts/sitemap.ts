/**
 * sitemap: a build-only Vite plugin that writes dist/sitemap.xml from the
 * same data the site renders (projects, lab, notes), so the sitemap can
 * never list a page that does not exist or miss a new one.
 *
 * The data modules are loaded through a throwaway Vite SSR server, which
 * resolves their imports and `import.meta.env` exactly as the app build
 * does. Drafts, unlisted projects and dev-only routes are left out.
 */

import { createServer, type Plugin } from 'vite'
import { writeFileSync } from 'node:fs'
import path from 'node:path'

const ORIGIN = 'https://www.sacha.cool'
const SECTIONS = ['/', '/projects', '/lab', '/notes', '/about']

type Slugged = { slug: string; unlisted?: boolean }

export function sitemap(): Plugin {
  let outDir = 'dist'
  let root = process.cwd()
  return {
    name: 'sitemap',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const server = await createServer({
        root,
        configFile: false,
        logLevel: 'silent',
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
      })
      try {
        const projects = (await server.ssrLoadModule('/src/data/projects.ts')).projects as Slugged[]
        const lab = (await server.ssrLoadModule('/src/data/lab.ts')).lab as Slugged[]
        const notes = (await server.ssrLoadModule('/src/data/posts.ts')).getSortedPosts() as Slugged[]
        const paths = [
          ...SECTIONS,
          ...projects.filter((p) => !p.unlisted).map((p) => `/projects/${p.slug}`),
          ...lab.map((x) => `/lab/${x.slug}`),
          ...notes.map((n) => `/notes/${n.slug}`),
        ]
        const xml =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          paths.map((p) => `  <url><loc>${ORIGIN}${p}</loc></url>`).join('\n') +
          '\n</urlset>\n'
        writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
      } finally {
        await server.close()
      }
    },
  }
}
