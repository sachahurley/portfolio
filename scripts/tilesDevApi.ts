// Dev-server API for the /dev/tiles browser (never included in production builds).
//   GET  /__tiles  -> src/data/tiles.json
//   POST /__tiles  -> { tiles } rewrites tiles.json + tileIndex.ts

import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { writeManifest, writeIndex, type TileRecord } from './lib/tiles-manifest.mjs'

const ID_RE = /^[a-z0-9_]+\/[a-z0-9_]+\/[A-Za-z0-9_]+$/

function validate(tiles: unknown): TileRecord[] {
  if (!Array.isArray(tiles)) throw new Error('tiles must be an array')
  const seen = new Set<string>()
  for (const t of tiles as TileRecord[]) {
    if (typeof t.id !== 'string' || !ID_RE.test(t.id)) throw new Error(`bad id: ${String(t.id)}`)
    if (seen.has(t.id)) throw new Error(`duplicate id: ${t.id}`)
    seen.add(t.id)
    for (const k of ['x', 'y', 'w', 'h'] as const) {
      if (!Number.isInteger(t[k]) || t[k] < 0) throw new Error(`bad ${k} on ${t.id}`)
    }
  }
  return tiles as TileRecord[]
}

export function tilesDevApi(): Plugin {
  return {
    name: 'tiles-dev-api',
    apply: 'serve',
    configureServer(server) {
      const file = path.resolve(server.config.root, 'src/data/tiles.json')
      const indexFile = path.resolve(server.config.root, 'src/data/tileIndex.ts')
      server.middlewares.use('/__tiles', (req, res) => {
        res.setHeader('content-type', 'application/json')
        if (req.method === 'GET') {
          fs.createReadStream(file).pipe(res)
          return
        }
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('{}')
          return
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const tiles = validate(JSON.parse(body).tiles)
            const { meta } = JSON.parse(fs.readFileSync(file, 'utf8'))
            writeManifest(file, meta, tiles)
            writeIndex(indexFile, meta, tiles)
            res.end(JSON.stringify({ ok: true, count: tiles.length }))
          } catch (err) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}
