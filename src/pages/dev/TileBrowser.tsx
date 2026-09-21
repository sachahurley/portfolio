/**
 * /dev/tiles — asset database browser for the Urizen OneBit tiles (dev server only).
 *
 * Filter, search, rename, recategorize, tag and favorite tiles. "Save" writes
 * src/data/tiles.json and regenerates src/data/tileIndex.ts through the
 * tilesDevApi Vite plugin. Edited tiles are marked `locked` so `npm run tiles`
 * never overwrites them.
 */

import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { TileBox } from '../../components/Tile'
import { usePageTitle } from '../../lib/usePageTitle'
import './TileBrowser.css'

interface TileRec {
  id: string
  name: string
  category: string
  sub: string
  x: number
  y: number
  w: number
  h: number
  sheet: number
  color: string
  tags: string[]
  locked?: boolean
}

const SHEETS = ['world', 'dungeon', 'modern', 'sci-fi & ui', 'characters']
const RENDER_CAP = 1500
const slug = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '')
const keyOf = (t: TileRec) => `${t.x},${t.y}`
const idOf = (t: Pick<TileRec, 'category' | 'sub' | 'name'>) => `${t.category}/${t.sub}/${t.name}`

export default function TileBrowser() {
  usePageTitle('Tiles')
  const [tiles, setTiles] = useState<TileRec[] | null>(null)
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [sheet, setSheet] = useState(-1)
  const [favOnly, setFavOnly] = useState(false)
  const [scale, setScale] = useState(3)
  const [tint, setTint] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [sel, setSel] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch('/__tiles')
      .then((r) => r.json())
      .then((d) => setTiles(d.tiles))
      .catch((e) => setError(String(e)))
  }, [])

  // warn before leaving with unsaved edits
  useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])

  const tree = useMemo(() => {
    const m = new Map<string, Map<string, number>>()
    for (const t of tiles ?? []) {
      if (!m.has(t.category)) m.set(t.category, new Map())
      const subs = m.get(t.category)!
      subs.set(t.sub, (subs.get(t.sub) ?? 0) + 1)
    }
    return [...m].sort((a, b) => a[0].localeCompare(b[0]))
  }, [tiles])

  const filtered = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    return (tiles ?? []).filter((t) => {
      if (cat && t.category !== cat && `${t.category}/${t.sub}` !== cat) return false
      if (sheet >= 0 && t.sheet !== sheet) return false
      if (favOnly && !t.tags.includes('fav')) return false
      if (!terms.length) return true
      const hay = `${t.id} ${t.tags.join(' ')}`.toLowerCase()
      return terms.every((term) => hay.includes(term))
    })
  }, [tiles, q, cat, sheet, favOnly])

  const shown = showAll ? filtered : filtered.slice(0, RENDER_CAP)
  const selected = useMemo(() => (tiles ?? []).filter((t) => sel.has(keyOf(t))), [tiles, sel])
  const dupes = useMemo(() => {
    const seen = new Set<string>(), d = new Set<string>()
    for (const t of tiles ?? []) (seen.has(t.id) ? d : seen).add(t.id)
    return d
  }, [tiles])

  function update(keys: Set<string>, fn: (t: TileRec) => Partial<TileRec>) {
    setTiles((prev) =>
      prev!.map((t) => {
        if (!keys.has(keyOf(t))) return t
        const next = { ...t, ...fn(t), locked: true }
        return { ...next, id: idOf(next) }
      }),
    )
    setDirty(true)
    setStatus('')
  }

  function onTileClick(e: MouseEvent, t: TileRec) {
    const k = keyOf(t)
    setSel((prev) => {
      if (e.shiftKey && prev.size) {
        // range select within the current view
        const last = [...prev].pop()!
        const a = shown.findIndex((s) => keyOf(s) === last)
        const b = shown.findIndex((s) => keyOf(s) === k)
        const next = new Set(prev)
        shown.slice(Math.min(a, b), Math.max(a, b) + 1).forEach((s) => next.add(keyOf(s)))
        return next
      }
      if (e.metaKey || e.ctrlKey) {
        const next = new Set(prev)
        if (next.has(k)) next.delete(k)
        else next.add(k)
        return next
      }
      return new Set([k])
    })
  }

  function toggleFav() {
    const allFav = selected.every((t) => t.tags.includes('fav'))
    update(sel, (t) => ({ tags: allFav ? t.tags.filter((x) => x !== 'fav') : [...new Set([...t.tags, 'fav'])] }))
  }

  // keyboard: f = favorite, esc = clear selection
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, select')) return
      if (e.key === 'Escape') setSel(new Set())
      if (e.key === 'f' && sel.size) toggleFav()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  async function save() {
    if (dupes.size) {
      setStatus(`Fix duplicate ids first: ${[...dupes].slice(0, 3).join(', ')}`)
      return
    }
    setStatus('Saving...')
    const res = await fetch('/__tiles', { method: 'POST', body: JSON.stringify({ tiles }) })
    const out = await res.json()
    if (out.ok) {
      setDirty(false)
      setStatus(`Saved ${out.count} tiles`)
    } else setStatus(out.error)
  }

  if (error) return <div className="tb"><p>Could not load tiles: {error}. Run `npm run tiles` and use the dev server.</p></div>
  if (!tiles) return <div className="tb"><p>Loading tiles...</p></div>

  return (
    <div className="tb">
      <aside className="tb-side">
        <h1 className="page">tiles</h1>
        <p className="tb-mut">{tiles.length} assets</p>
        <button className={!cat ? 'on' : ''} onClick={() => setCat('')}>all</button>
        {tree.map(([c, subs]) => (
          <div key={c} className="tb-group">
            <button className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
              {c} <span>{[...subs.values()].reduce((a, b) => a + b, 0)}</span>
            </button>
            {(cat === c || cat.startsWith(c + '/')) &&
              [...subs].sort().map(([s, n]) => (
                <button key={s} className={`tb-sub ${cat === `${c}/${s}` ? 'on' : ''}`} onClick={() => setCat(`${c}/${s}`)}>
                  {s} <span>{n}</span>
                </button>
              ))}
          </div>
        ))}
      </aside>

      <main className="tb-main">
        <div className="tb-bar">
          <input placeholder="search ids and tags" value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={sheet} onChange={(e) => setSheet(Number(e.target.value))}>
            <option value={-1}>all sheets</option>
            {SHEETS.map((s, i) => <option key={s} value={i}>{s}</option>)}
          </select>
          <label><input type="checkbox" checked={favOnly} onChange={(e) => setFavOnly(e.target.checked)} /> favorites</label>
          <label><input type="checkbox" checked={tint} onChange={(e) => setTint(e.target.checked)} /> theme tint</label>
          <label>scale <input type="range" min={1} max={5} value={scale} onChange={(e) => setScale(Number(e.target.value))} /></label>
          <span className="tb-mut">{filtered.length} shown</span>
          <button className="tb-save" disabled={!dirty} onClick={save}>{dirty ? 'save' : 'saved'}</button>
          {status && <span className="tb-status">{status}</span>}
        </div>

        <div className="tb-grid">
          {shown.map((t) => (
            <button
              key={keyOf(t)}
              title={t.id}
              className={`tb-cell ${sel.has(keyOf(t)) ? 'sel' : ''} ${dupes.has(t.id) ? 'dupe' : ''}`}
              onClick={(e) => onTileClick(e, t)}
            >
              <TileBox x={t.x} y={t.y} w={t.w} h={t.h} scale={scale} tint={tint ? 'var(--accent)' : undefined} />
              {t.tags.includes('fav') && <i className="tb-fav" />}
            </button>
          ))}
        </div>
        {!showAll && filtered.length > RENDER_CAP && (
          <button className="tb-more" onClick={() => setShowAll(true)}>show all {filtered.length}</button>
        )}
      </main>

      <aside className="tb-panel">
        {selected.length === 0 && (
          <p className="tb-mut">
            Click a tile to edit it. Cmd-click or shift-click to select many. Press f to favorite, esc to clear.
          </p>
        )}
        {selected.length === 1 && <SingleEditor t={selected[0]} dupe={dupes.has(selected[0].id)} onChange={(p) => update(sel, () => p)} onFav={toggleFav} />}
        {selected.length > 1 && <BulkEditor items={selected} onChange={(fn) => update(sel, fn)} onFav={toggleFav} />}
      </aside>
    </div>
  )
}

function SingleEditor({ t, dupe, onChange, onFav }: { t: TileRec; dupe: boolean; onChange: (p: Partial<TileRec>) => void; onFav: () => void }) {
  const snippet = `<Tile id="${t.id}" />`
  return (
    <div className="tb-edit">
      <div className="tb-preview">
        <TileBox x={t.x} y={t.y} w={t.w} h={t.h} scale={8} />
      </div>
      <code className={dupe ? 'dupe' : ''}>{t.id}</code>
      <Field label="name" value={t.name} onCommit={(v) => onChange({ name: slug(v) || t.name })} />
      <Field label="category" value={t.category} onCommit={(v) => onChange({ category: slug(v) || t.category })} />
      <Field label="subcategory" value={t.sub} onCommit={(v) => onChange({ sub: slug(v) || t.sub })} />
      <Field label="tags" value={t.tags.join(', ')} onCommit={(v) => onChange({ tags: v.split(',').map(slug).filter(Boolean) })} />
      <div className="tb-row">
        <Field label="w" value={String(t.w)} onCommit={(v) => onChange({ w: Math.max(1, parseInt(v) || 1) })} />
        <Field label="h" value={String(t.h)} onCommit={(v) => onChange({ h: Math.max(1, parseInt(v) || 1) })} />
      </div>
      <p className="tb-mut">cell {t.x},{t.y} · sheet {SHEETS[t.sheet]} · {t.color}{t.locked ? ' · locked' : ''}</p>
      <button onClick={onFav}>{t.tags.includes('fav') ? 'unfavorite' : 'favorite'}</button>
      <button onClick={() => navigator.clipboard.writeText(snippet)}>copy {snippet}</button>
    </div>
  )
}

function BulkEditor({ items, onChange, onFav }: { items: TileRec[]; onChange: (fn: (t: TileRec) => Partial<TileRec>) => void; onFav: () => void }) {
  const first = items[0]
  return (
    <div className="tb-edit">
      <div className="tb-preview tb-multi">
        {items.slice(0, 48).map((t) => <TileBox key={`${t.x},${t.y}`} x={t.x} y={t.y} w={t.w} h={t.h} scale={2} />)}
      </div>
      <p className="tb-mut">{items.length} selected</p>
      <Field label="move to category" value={first.category} onCommit={(v) => slug(v) && onChange(() => ({ category: slug(v) }))} />
      <Field label="move to subcategory" value={first.sub} onCommit={(v) => slug(v) && onChange(() => ({ sub: slug(v) }))} />
      <Field label="add tag" value="" onCommit={(v) => slug(v) && onChange((t) => ({ tags: [...new Set([...t.tags, slug(v)])] }))} />
      <Field
        label="rename as base_01, base_02..."
        value=""
        onCommit={(v) => {
          const base = slug(v)
          if (!base) return
          const order = new Map(items.map((t, i) => [`${t.x},${t.y}`, i + 1]))
          onChange((t) => ({ name: `${base}_${String(order.get(`${t.x},${t.y}`)).padStart(2, '0')}` }))
        }}
      />
      <button onClick={onFav}>toggle favorite</button>
    </div>
  )
}

/** Text input that commits on enter or blur. Re-keys on value so it resets when the selection changes. */
function Field({ label, value, onCommit }: { label: string; value: string; onCommit: (v: string) => void }) {
  return (
    <label className="tb-field">
      <span>{label}</span>
      <input
        key={value}
        defaultValue={value}
        onBlur={(e) => e.target.value !== value && onCommit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
        }}
      />
    </label>
  )
}
