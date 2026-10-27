// Render scripts/og/card.html to public/og.png (1200x630), the share image
// index.html points og:image and twitter:image at. Needs a local Chrome;
// deterministic, safe to re-run. Edit the card in scripts/og/card.html.
//
// Usage: node scripts/bake-og.mjs [path-to-chrome]

import { spawn } from 'node:child_process'
import { writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const card = pathToFileURL(path.join(root, 'scripts/og/card.html')).href
const out = path.join(root, 'public/og.png')
const chromePath = process.argv[2] ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = 9400 + Math.floor(Math.random() * 500)
const profile = path.join(tmpdir(), `bake-og-${port}`)

const chrome = spawn(chromePath, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--allow-file-access-from-files', '--hide-scrollbars', 'about:blank',
], { stdio: 'ignore' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

try {
  let ws
  for (let i = 0; i < 60 && !ws; i++) {
    try {
      const pages = await (await fetch(`http://127.0.0.1:${port}/json`)).json()
      const page = pages.find((t) => t.type === 'page')
      if (page) ws = new WebSocket(page.webSocketDebuggerUrl)
    } catch { /* not up yet */ }
    if (!ws) await wait(250)
  }
  if (!ws) throw new Error('Chrome did not start')
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
  }
  const send = (method, params = {}) =>
    new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })

  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
  await send('Page.enable')
  await send('Page.navigate', { url: card })
  await wait(1500)
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true })
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
  writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
  console.log(`wrote ${path.relative(root, out)}`)
} finally {
  chrome.kill()
  await wait(300)
  rmSync(profile, { recursive: true, force: true })
}
