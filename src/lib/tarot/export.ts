/**
 * Thread export (spec §3.5): a sitting as Markdown for the clipboard, and
 * a single reading as a PNG snapshot drawn entirely to canvas from text
 * and the baked card tiles (no HTML-to-image path, §9.5). Colors and the
 * mono face come from the live theme tokens, so a snapshot matches the
 * parlor the visitor was actually sitting in.
 */

import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import { TAROT_TILES, TAROT_BACK } from '../../game/tarotTiles'
import { TILE_META } from '../../data/tileSheet'
import type { Msg, Thread } from './threads'

/** Reader prose with `[[card:id]]` tokens replaced by the card's name. */
export function mentionsToNames(text: string): string {
  return text.replace(/\[\[card:([A-Za-z0-9_/-]{1,48})\]\]/g, (raw, id: string) => {
    return CARD_BY_ID.get(id)?.name ?? raw
  })
}

const cardLine = (c: { id: string; position: string; reversed: boolean }, spreadId: string) => {
  const spread = SPREADS.find((s) => s.id === spreadId)
  const label = spread?.positions.find((p) => p.id === c.position)?.label ?? c.position
  const name = CARD_BY_ID.get(c.id)?.name ?? c.id
  return `${label}: ${name}${c.reversed ? ', reversed' : ''}`
}

// -- Markdown ---------------------------------------------------------------

export function threadToMarkdown(thread: Thread): string {
  const lines: string[] = [`# ${thread.title}`, '']
  lines.push(
    new Date(thread.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    '',
  )
  for (const m of thread.messages) {
    switch (m.kind) {
      case 'user':
        lines.push(`**You:** ${m.text}`, '')
        break
      case 'reader':
        lines.push(`**The Reader:** ${mentionsToNames(m.text)}`, '')
        break
      case 'system':
        lines.push(`*${m.text}*`, '')
        break
      case 'offer':
        break
      case 'draw': {
        const spread = SPREADS.find((s) => s.id === m.spreadId)
        lines.push(`## ${spread?.name ?? m.spreadId}`, '')
        if (m.question) lines.push(`**Your question:** ${m.question}`, '')
        for (const c of m.cards) lines.push(`- ${cardLine(c, m.spreadId)}`)
        lines.push('')
        if (m.reading) lines.push(mentionsToNames(m.reading.text), '')
        break
      }
    }
  }
  lines.push('---', 'A sitting with the Reader.')
  return lines.join('\n')
}

// -- PNG snapshot -----------------------------------------------------------

const CARD_SCALE = 4
const EXCERPT_CHARS = 300

let sheetPromise: Promise<HTMLImageElement> | null = null
function loadSheet(): Promise<HTMLImageElement> {
  if (!sheetPromise) {
    sheetPromise = new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => {
        sheetPromise = null
        reject(new Error('tile sheet failed to load'))
      }
      img.src = TILE_META.src
    })
  }
  return sheetPromise
}

/** Draw one baked card face, tinted like the site does (mask + fill). */
function drawCard(
  ctx: CanvasRenderingContext2D,
  sheet: HTMLImageElement,
  cardId: string,
  x: number,
  y: number,
  reversed: boolean,
  tint: string,
) {
  const cell = TAROT_TILES[cardId] ?? TAROT_BACK
  const { tile, pitch } = TILE_META
  const gap = pitch - tile
  const sx = gap + cell[0] * pitch
  const sy = gap + cell[1] * pitch
  const sw = 2 * pitch - gap // 25
  const sh = 3 * pitch - gap // 38
  const w = sw * CARD_SCALE
  const h = sh * CARD_SCALE

  const off = document.createElement('canvas')
  off.width = w
  off.height = h
  const octx = off.getContext('2d')
  if (!octx) return
  octx.imageSmoothingEnabled = false
  octx.drawImage(sheet, sx, sy, sw, sh, 0, 0, w, h)
  octx.globalCompositeOperation = 'source-in'
  octx.fillStyle = tint
  octx.fillRect(0, 0, w, h)

  ctx.save()
  if (reversed) {
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(Math.PI)
    ctx.drawImage(off, -w / 2, -h / 2)
  } else {
    ctx.drawImage(off, x, y)
  }
  ctx.restore()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    let line = ''
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word
      if (ctx.measureText(candidate).width > maxWidth && line) {
        lines.push(line)
        line = word
      } else {
        line = candidate
      }
    }
    lines.push(line)
  }
  return lines
}

const tokenColor = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback

/**
 * Render one draw as a shareable PNG: parlor frame, title and date, the
 * question (optional), the card strip with position labels, and the first
 * ~300 characters of the reading.
 */
export async function renderReadingSnapshot(
  draw: Extract<Msg, { kind: 'draw' }>,
  opts: { includeQuestion: boolean },
): Promise<Blob> {
  const sheet = await loadSheet()
  const spread = SPREADS.find((s) => s.id === draw.spreadId)

  const bg = tokenColor('--bg', '#141210')
  const fg = tokenColor('--fg', '#e8e0d0')
  const body = tokenColor('--body', '#b8ae9c')
  const mut = tokenColor('--mut', '#6f675a')
  const accent = tokenColor('--accent', '#d8a05a')
  const mono = getComputedStyle(document.body).fontFamily || 'monospace'

  const W = 640
  const PAD = 40
  const textWidth = W - PAD * 2
  const cardW = 25 * CARD_SCALE
  const cardH = 38 * CARD_SCALE
  const gap = 24

  // Measure pass (fonts must match the draw pass).
  const meter = document.createElement('canvas').getContext('2d')
  if (!meter) throw new Error('canvas unavailable')
  const question = opts.includeQuestion && draw.question ? `“${draw.question}”` : null
  meter.font = `12px ${mono}`
  const questionLines = question ? wrapText(meter, question, textWidth) : []
  const raw = mentionsToNames(draw.reading?.text ?? '')
  const excerpt =
    raw.length > EXCERPT_CHARS ? `${raw.slice(0, EXCERPT_CHARS).trimEnd()}…` : raw
  meter.font = `14px ${mono}`
  const excerptLines = wrapText(meter, excerpt.replace(/\n+/g, '  '), textWidth)

  let y = 0
  const headerH = 46 + 20 // title + date
  const questionH = questionLines.length ? questionLines.length * 18 + 14 : 0
  const stripH = cardH + 34
  const excerptH = excerptLines.length * 22 + 20
  const H = PAD + headerH + questionH + stripH + excerptH + PAD

  const canvas = document.createElement('canvas')
  canvas.width = W * 2
  canvas.height = H * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas unavailable')
  ctx.scale(2, 2)
  ctx.imageSmoothingEnabled = false
  ctx.textBaseline = 'top'

  // The parlor frame: fill, then a double border in the frame's voice.
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = mut
  ctx.lineWidth = 2
  ctx.strokeRect(6, 6, W - 12, H - 12)
  ctx.strokeStyle = accent
  ctx.lineWidth = 1
  ctx.strokeRect(11.5, 11.5, W - 23, H - 23)

  y = PAD
  ctx.fillStyle = fg
  ctx.font = `20px ${mono}`
  ctx.textAlign = 'center'
  ctx.fillText('The Reader', W / 2, y)
  y += 30
  ctx.fillStyle = mut
  ctx.font = `11px ${mono}`
  const when = new Date(draw.at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  ctx.fillText(`${spread?.name ?? draw.spreadId} · ${when}`, W / 2, y)
  y += 36

  if (questionLines.length) {
    ctx.fillStyle = body
    ctx.font = `12px ${mono}`
    for (const line of questionLines) {
      ctx.fillText(line, W / 2, y)
      y += 18
    }
    y += 14
  }

  // The strip, centered.
  const n = draw.cards.length
  const stripW = n * cardW + (n - 1) * gap
  let x = (W - stripW) / 2
  for (const c of draw.cards) {
    drawCard(ctx, sheet, c.id, x, y, c.reversed, fg)
    ctx.fillStyle = mut
    ctx.font = `10px ${mono}`
    const label = spread?.positions.find((p) => p.id === c.position)?.label ?? c.position
    ctx.fillText(label.toUpperCase(), x + cardW / 2, y + cardH + 10)
    x += cardW + gap
  }
  y += stripH + 8

  ctx.fillStyle = body
  ctx.font = `14px ${mono}`
  ctx.textAlign = 'left'
  for (const line of excerptLines) {
    ctx.fillText(line, PAD, y)
    y += 22
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png')
  })
}

/** Save a rendered snapshot as a file download. */
export async function downloadReadingSnapshot(
  draw: Extract<Msg, { kind: 'draw' }>,
  opts: { includeQuestion: boolean },
): Promise<void> {
  const blob = await renderReadingSnapshot(draw, opts)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reading-${new Date(draw.at).toISOString().slice(0, 10)}.png`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
