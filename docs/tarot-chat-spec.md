# The Reader's Parlor v2: Tarot Chat Spec

**v0.1 · 2026-09-20 · builds on `origin/main` (300df80, tarot parlor + ledger)**

## 1. One paragraph

`/lab/tarot` becomes a chat app with one persona: the Reader. Visitors open threads, talk to her about their life and the cards, and she decides when a draw is warranted. She *offers* a spread, and the visitor cuts and flips the cards in the thread. Threads are managed like any LLM chat (title, rename, delete, pin, search, export). Everything is stored in localStorage. Tarot feeds the RPG in four ways: an ongoing XP economy, a 78-card compendium, level-gated spreads, and a new line of parlor loot. Levels extend from 4 to 8.

## 2. Decisions log

| Topic | Decision |
|---|---|
| Conversation model | Open chat. The Reader offers draws via a tool call, and the user cuts |
| Audience | Public visitors + owner. Content gated by level, cost gated by caps |
| Storage | localStorage only, no accounts, no sync |
| Threads | Multiple threads, listed in a drawer (parlor stays full-screen) |
| Visitor cap | 8 user messages per thread, then the Reader closes the audience in-fiction |
| Owner | Secret code entered in the parlor lifts all caps (not the Anthropic spend limit) |
| Retention | 20 threads max. Oldest *unpinned* thread is pruned silently |
| Context sent per turn | "Cards are the memory": every draw + its reading, plus the last 6 chat messages |
| Replies | Token streaming (SSE) for everything, readings included |
| Reading format | Prose. Cards render as a strip above the message; no per-position JSON |
| Model | `claude-haiku-4-5` everywhere (`TAROT_MODEL` override stays) |
| Chat scope | Tarot + self-reflection only. Off-topic asks get an in-character redirect |
| Failures | In-fiction line + retry. Thread stays open |
| Security | BotID + Upstash rate limits + HMAC-signed turns + global budget breaker (§9) |
| Old ledger | Migrated into threads; backfills the compendium |
| Levels | Extend to Level 8 |

## 3. UX

### 3.1 Layout
- Parlor scene (TarotScene) stays full-screen. The thread occupies the table area; composer pinned bottom.
- **Drawer** (existing BottomSheet pattern) holds three tabs: **Threads**, **Compendium**, **Parlor** (loot loadout + owner code field).
- New thread = empty table, Reader greeting (canned, no API call) + 2 to 3 suggested prompts.

### 3.2 Thread message types
| Type | Rendered as |
|---|---|
| `user` | Plain bubble |
| `reader` | Streaming prose, Reader voice |
| `offer` | Reader proposes a spread: spread name + position labels + **Cut the deck** / **Not now**. Only unlocked spreads can be offered |
| `draw` | Card strip (tap-to-flip, existing TarotCardView) + optional question; the reading streams in as the next `reader` message |
| `system` | Quiet in-fiction lines: cap reached, failure, owner mode on |

### 3.3 Draw flow
1. Reader streams a reply, ends with `offer_draw` tool call → `offer` card appears.
2. User may edit the question on the offer card (≤280 chars), then **Cut the deck**.
3. Client draws (`drawSpread`, crypto RNG, unchanged) → shuffle theater → user flips each card.
4. When all are flipped, client sends a `cut` turn. Reader streams the prose reading.
5. User can also force it: a **Draw** button in the composer opens a spread picker (unlocked spreads only).
- Cooldown: keep 30s between cuts (existing `sh_tarot_last`). Owner exempt.
- Only one open `offer` at a time. A new user message dismisses it as "Not now".

### 3.4 Caps
- Visitor: 8 user messages per thread (cuts don't count). On message 8's reply, the Reader closes the audience; the composer becomes **Begin a new sitting**.
- Loot perk can add +2 (see §6.4).
- Enforced server-side via signed turn counters (§9.2), no server storage needed.

### 3.5 Thread management
- **Auto-title**: on the first reading, the model calls `title_thread` (≤40 chars). Before that the title is the first user message, truncated.
- **Rename, delete** (delete asks inline, no browser dialog).
- **Pin**: max 5 pins. Pinned threads never prune.
- **Search**: client-side over titles, messages, card names, questions. Filters: spread, card.
- **Export**: (a) copy thread as Markdown, (b) download a single reading as a PNG snapshot (card strip + question + first ~300 chars + parlor frame).

### 3.6 Card mentions, suggestion chips, quoting
- **Card mentions:** the Reader writes `[[card:major/the_tower]]` when she names a card. The client renders it as a tappable chip (opens the compendium entry). The server drops any id not in the deck, so she can't invent cards. The streaming parser holds back a partial `[[...` until it closes, so no broken tokens flash on screen.
- **Suggestion chips (zero API cost):** 3 chips under each Reader reply, built client-side from state: cards on the table ("Why is the Moon reversed here?"), spread status ("Draw a clarifier", "Try a deeper spread" if unlocked), cap ("One more question left"). Deduped against what the user already asked. New threads get 3 random starters from a pool of ~12.
- **Quote to ask:** selecting text in a reading shows **Ask the Reader**, which drops the quote into the composer as context (≤200 chars, sent inside the `<question>` block).
- **Ask from the compendium:** a card's detail page has **Ask the Reader about this card**, which opens a new thread seeded with that card.
- Rotating canned greetings for new threads (no API call).

## 4. Data model (localStorage)

| Key | Contents |
|---|---|
| `sh_tarot_threads` | `Thread[]`, newest-updated first, max 20 |
| `sh_tarot_codex` | Compendium + streak state (§6.2) |
| `sh_tarot_parlor` | Equipped parlor loot + owner code |
| `sh_tarot_last` | Last cut timestamp (existing) |
| `sh_tarot_ledger` | Read once for migration, then removed |

```ts
interface Thread {
  id: string
  title: string
  titled: boolean          // true once model/user set it
  createdAt: number
  updatedAt: number
  pinned: boolean
  closed: boolean          // cap reached
  messages: Msg[]
}
type Msg =
  | { kind: 'user'; id: string; at: number; text: string }
  | { kind: 'reader'; id: string; at: number; text: string; failed?: boolean }
  | { kind: 'offer'; id: string; at: number; spreadId: SpreadId; question?: string;
      status: 'open' | 'cut' | 'declined' }
  | { kind: 'draw'; id: string; at: number; spreadId: SpreadId; question?: string;
      cards: { id: string; position: string; reversed: boolean }[] }
  | { kind: 'system'; id: string; at: number; text: string }
```
- Cards by id only, rehydrated through `CARD_BY_ID` (same rule as `archive.ts`). Threads whose draws no longer resolve are dropped.
- Size check: a Celtic Cross thread at cap is ~15KB, so 20 threads is ~300KB. All writes wrapped in try/catch; on quota error, prune one more unpinned thread and retry once.

## 5. API: `POST /api/tarot-chat` (v2, streaming)

`/api/tarot` (one-shot JSON reading) is retired after migration. One endpoint handles both chat and cut turns.

**Request**
```ts
interface ParlorRequest {
  turn: { kind: 'message'; text: string }
      | { kind: 'cut'; spreadId: SpreadId; question?: string; cards: DrawnCardPayload[] }
  draws: { spreadId; question?; cards: DrawnCardPayload[]; reading: string }[] // all draws in thread
  recent: { role: 'user' | 'reader'; text: string }[]   // last 6 messages
  userMessageCount: number
  unlockedSpreads: SpreadId[]
  visitor: VisitorSummary & { activeGem: string | null }
  parlor: { voice: string | null; perks: string[] }
  needsTitle: boolean
}
```
Header `x-tarot-owner: <code>` optional. Each prior reader text carries its `sig` (§9.2).

**Response**: `text/event-stream`
- `event: text` → `{ delta }` (append to current reader message)
- `event: offer` → `{ spreadId, question? }` (from `offer_draw` tool; server rejects spreads not in `unlockedSpreads`)
- `event: title` → `{ title }` (from `title_thread` tool)
- Card mentions travel inside `text` deltas as `[[card:<id>]]`; the server strips unknown ids before sending
- `event: done` → `{ closed: boolean }`
- `event: error` → `{ code: 'rate_limited' | 'upstream' | 'invalid' | 'cap' }`

**Server rules**
- Security layers (BotID, Upstash limits, signed turns, kill switch): see §9. Keep same-origin check, deck-id validation, `<question>` delimiting.
- Owner: constant-time compare against env `TAROT_OWNER_KEY`; if it matches, skip limiter + cap. `max_tokens`: 350 chat, 700 reading.
- A `cut` turn forbids tool calls except `title_thread`. A `message` turn allows `offer_draw` + `title_thread`.
- System prompt adds: tarot/reflection scope + redirect, gem mood block (§6.3), voice block (§6.4), unlocked spreads list, existing safety + no-em-dash rules.

**Client failure handling**
| Case | Behavior |
|---|---|
| Cut fails before any text | Render `fallbackReading` converted to prose, marked `failed` (retry replaces it) |
| Chat fails / stream breaks | Keep partial text, append system line ("the candle gutters...") + **Ask again** |
| 429 | Different line ("the Reader needs a moment"), retry disabled for 60s |
| `cap` | Close thread in-fiction |

## 6. RPG hookup

### 6.1 Levels 5 to 8
- `LEVELS = [100, 250, 500, 800, 1200, 1700, 2300]`
- Titles 5 to 8: **TBD** (suggestions: Seer, Oracle, Starwalker, Fatebinder).
- Each new level: new gem + theme palette in `themes.ts` + guaranteed level chest (existing mechanics). 4 new gems to design.
- Sanity check: site content ≈ 500 XP, one-time tarot ≈ 450 XP, the rest from daily draws. L8 is a long tail by design.

### 6.2 Tarot XP + compendium
Award keys go through `award()` for de-dupe/log/toasts. Per-card and per-day tracking lives in `sh_tarot_codex`, NOT as award keys, so the `sh_min` earned set doesn't grow forever.

| Action | XP | Key / tracking | Chest-eligible |
|---|---|---|---|
| Enter parlor (existing) | lab | `lab:tarot` | yes |
| First reading (existing) | 30 | `lab:tarot-reading` | yes |
| Daily first cut | 10 | codex `lastDrawDay` (award without key, guarded by codex) | no |
| New card discovered | 3 (×78 = 234) | codex `cards[id]` | no |
| Suit / Majors complete | 0 (compendium only) | n/a | no |
| Streak 3 / 7 / 30 days | 15 / 30 / 75 | `tarot:streak:3` etc. | yes |
| Rare pull (each once) | 20 | `tarot:rare:<id>` | yes |

Rare pulls: `all-major` (3+ card spread, all Majors), `all-reversed` (3+ cards), `echo` (same card as your previous draw), `alpha-omega` (Fool + World in one spread), `full-court` (4+ court cards).

- Add `tarot:` to `isChestKey`. Chests from `tarot:` sources roll the **parlor loot table** (§6.4); all other chests roll gear as today.
- Codex shape: `{ cards: Record<id, { n, rev, first, last }>, lastDrawDay, streak, bestStreak }`. Day = local date string.
- **Compendium tab**: 78-card grid, undiscovered = card back + `?`. Detail: art, upright/reversed meanings (from `tarot.ts`), times drawn, times reversed, first/last date, link to threads containing it. Progress per suit + Majors.

### 6.3 Level-gated spreads (Reader only offers what's unlocked)
| Level | Spread | Positions |
|---|---|---|
| 1 | One card | guidance |
| 1 | Three cards | past, present, future |
| 2 | Situation (5) | situation, challenge, advice, hidden, outcome |
| 3 | Crossroads (6) | you, path A, path A outcome, path B, path B outcome, counsel |
| 4 | Celtic Cross (10) | standard 10 positions |

`SpreadId` widens; `validateRequest` spread-size table and `QUESTION`/position limits update. Locked spreads appear dimmed in the Draw picker with "Level N".

### 6.4 Gem mood + parlor loot
**Active gem = Reader mood**: one short prompt block per gem (e.g. ruby blunt, sapphire gentle), plus parlor palette follows the theme vars already in place. Default theme = neutral voice.

**Parlor loot**: a new item family, not equipment slots. Persisted like items (`{id, kind, base, rarity}`), rolled from `tarot:` chests.
| Kind | Loadout slots | Effect |
|---|---|---|
| Card back | 1 | Cosmetic deck back / face palette |
| Prop (candle, crystal, incense...) | 3 | Visible on the TarotScene table |
| Voice | 1 | Alternate Reader persona prompt block, layered over gem mood |
| Charm | 1 | Mechanical perk (one at a time) |

Charms (initial set): **Clarifier** (option to pull +1 clarifier card after any reading), **Patience** (+2 messages per thread), **Balance** (choose reversal rate 0 / 30 / 50%).

## 7. Migration (one-time, on first v2 load)
- Each `sh_tarot_ledger` entry → Thread: `draw` msg + `reader` msg (greeting + card texts + synthesis + farewell joined as prose) + exchanges as user/reader pairs. `closed` = old `chatClosed`. Title = question or "<spread> · <date>".
- Backfill codex from those draws. XP: see open question 3.
- Remove `sh_tarot_ledger` only after threads write succeeds.

## 8. Files touched (expected)
- `src/lib/tarot/contract.ts`: new request/event types, drop `Reading` JSON shape + `isReading` (kept only for migration).
- `src/lib/tarot/archive.ts` → `threads.ts` (CRUD, prune, search, migrate). New `codex.ts`, `parlor.ts`.
- `src/lib/tarot/client.ts`: SSE reader.
- `api/_lib/chat.ts`: streaming + tools + owner check. `api/tarot.ts` + `api/_lib/reading.ts`: retire (keep `cardContextLines`).
- `src/data/tarot.ts`: 3 new spreads. `src/lib/levels.ts`, `src/lib/themes.ts`, `src/game/loot.ts` (`isChestKey`, parlor table).
- `src/pages/TarotLab.tsx`: split into `ParlorThread`, `Composer`, `DrawOffer`, `ParlorDrawer`, `Compendium`.
- `scripts/tarotDevApi.ts`: dev middleware for the streaming endpoint.
- `api/_lib/limits.ts`: rewrite on `@upstash/ratelimit`. New `api/_lib/sign.ts` (HMAC turns). Add `botid` package + client init. Env: `TAROT_SIGNING_KEY`, `TAROT_OWNER_KEY`, `TAROT_CHAT_ENABLED`, `UPSTASH_REDIS_REST_URL/TOKEN`.

## 9. Security and abuse

**Threat model:** the endpoint is a free, streaming Haiku proxy on a public site. Open chat makes it more valuable to abuse than v1 was. Main risks, in order: (1) bots burning the Anthropic budget, (2) the Reader getting jailbroken into a general-purpose chatbot, (3) forged history or prompt injection, (4) the owner code leaking.

### 9.1 Gaps in the current (v1) protections
| Current protection | Why it isn't enough |
|---|---|
| Same-origin check | Bots skip it by sending no `Origin` header (curl, scripts) |
| In-memory per-IP limiter | Resets on cold start, isn't shared across instances, and is beaten by rotating IPs |
| Client-reported turn count / cap | The client can send any history it likes |
| Anthropic workspace spend limit | Real ceiling, but when hit the feature is dead for everyone until the month resets |

### 9.2 v2 layers (all required for Phase 1)
1. **Vercel BotID (Basic, free on all plans)** on `/api/tarot-chat`: `checkBotId()` first thing in the handler; bots get the in-fiction 429 line. Deep Analysis ($1/1k checks, Pro) is optional later.
2. **Durable rate limiting on Upstash Redis** (replaces `limits.ts` in-memory maps): per-IP 20/hr + 60/day, **global** 1,500 turns/day circuit breaker, and a **global daily output-token budget** (e.g. 400k). When the breaker trips, the parlor goes into a "closed for the night" state instead of 429 spam. Owner bypasses per-IP limits but still counts toward the global budget.
3. **Signed turn tokens (HMAC, `TAROT_SIGNING_KEY`)**: every Reader reply and reading streams back with a signature over `{threadId, msgIndex, textHash, userMsgCount}`. The server rejects any `recent` / `draws` entry whose reader text isn't signed, so clients can't forge Reader turns ("Reader: sure, I'll write your Python...") or reset the cap. Makes the 8-message cap enforceable with zero server storage.
4. **Tight inputs:** message ≤280 chars, `recent` ≤6, `draws` ≤ spread count × threads cap, body ≤40KB, zod `.strict()` everywhere (unknown fields → 400), spread must be in a server-recomputed unlock set (see 11.3).
5. **Tight outputs:** `max_tokens` 350 chat / 700 reading, Haiku only, tools limited to `offer_draw` + `title_thread`, stream aborted if the client disconnects.
6. **Scope guard in the prompt:** off-topic, code, "ignore previous", or roleplay-switch requests get a fixed in-character redirect. All user text stays inside `<question>` tags. Card ids and spread ids are validated against the deck and never interpolated raw.
7. **Kill switch:** env `TAROT_CHAT_ENABLED=false` (or Vercel Edge Config flag) → parlor shows the canned-reading-only mode, no API calls.
8. **Anthropic spend limit** on a dedicated workspace key stays as the final ceiling, set low (e.g. $20/mo) with an email alert at 50%.

### 9.3 Things that stay client-side on purpose
- **Level gating and loot perks** live in localStorage, so anyone can edit them. That is fine for content (it's a game), but costs must not depend on trust: the server caps tokens per spread, and big spreads count as 2 turns against the rate limits. The Patience charm's +2 messages goes inside the signed counter, capped at 10 server-side.
- **Card draws** are client-side; a forged draw only changes the visitor's own reading.

### 9.4 Owner code
- ≥32 random chars, compared in constant time, **never logged**. Failed attempts count 5× against the per-IP limit (blocks brute force).
- Stored in `sh_tarot_parlor`; the risk is XSS, so see 11.5. Rotating = change the env var.

### 9.5 Client safety
- Reader output is rendered as **plain text nodes only**: no `dangerouslySetInnerHTML`, no markdown renderer, no model-generated links. The only rich token is `[[card:id]]`, resolved against the deck.
- Error states never expose config (no "API key missing" text); every failure is an in-fiction line. Titles, search highlights and Markdown export escape text.
- Share PNG is drawn to canvas from text (no HTML injection path). The question is included only if the toggle is on.

### 9.6 Privacy
- Server logs status codes, latency, token counts and a hashed IP. **Never** message text, questions or owner codes.
- One line of small print in the parlor: readings are sent to an AI provider to generate replies and stored only in this browser.
- Upstash keys are hashed IPs with TTLs (≤24h); no user content goes to Redis.

### 9.7 Monitoring
- Vercel Firewall tab for BotID blocks. A daily log line with totals (turns, tokens, 429s, BotID blocks, breaker trips). Alert if turns/day > 2× the 7-day average.

## 10. Phases
1. **Chat core + security (§9)**: BotID, Upstash limits, signed turns, kill switch, threads store, streaming endpoint, offer/cut flow, caps, owner code, failures, migration.
2. **Management**: drawer, rename/delete/pin, search, export.
3. **RPG economy**: codex + compendium, XP table, rare pulls, streaks, levels 5 to 8 (titles, gems, themes).
4. **Spreads**: Situation, Crossroads, Celtic Cross + gating (Celtic Cross card layout on mobile needs its own design pass).
5. **Parlor loot**: gem mood prompts, loot table, loadout UI, charms.

## 11. Open questions (defaults in brackets)
1. Level 5 to 8 titles and gem names/palettes. [suggestions in §6.1]
2. Does anything besides gems/chests unlock at 5 to 8? [no; loot carries the late game]
3. Migrated readings: grant card-discovery XP retroactively? [yes, as one batched log line, no per-card toasts]
4. Per-thread cap counts the Reader's closing turn? [no; the 8th user message still gets a full reply]
5. Owner code entry point: Parlor tab field vs typing it into the composer? [Parlor tab field]
6. Keep the 30s cut cooldown for visitors? [yes]
7. Upstash free tier OK, or prefer Vercel KV/Redis marketplace? [Upstash free tier]
8. Share PNG: include the user's question or leave it out for privacy? [include, with a toggle]
