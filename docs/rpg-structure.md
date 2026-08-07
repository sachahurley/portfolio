# SACHA — A Portfolio in the Style of an Old-School RPG

**Structure document · v0.2 · the real build (supersedes the v0.1 lofi-wireframe doc)**

## 1. The concept in one paragraph

The portfolio is a fullscreen, single-screen RPG in the tradition of Might & Magic II/III: an adventure viewport framed by persistent chrome — compass, message log, and the visitor's character in a right-hand column. Every portfolio section is a *location*; exploring, reading quests, and finding secrets earns XP; levelling up unlocks bonus content and banner eggs that re-theme the whole site. Unlike v0.1, this is not a wireframe: the existing pixel-art assets (doom fire, stalactites, castle stage + scorpion, molten drip title, jeweled frame, stone baseboard) ARE the art direction, and the existing theming/XP systems are carried forward, not rebuilt.

## 2. Decisions log (what changed from v0.1 and why)

- **The Library replaces Training Grounds** — the site has 9 published notes and no skills content; nothing gets lost.
- **Contact is sheet-only** — no `/contact` page or compass entry. X + GitHub links live in the bottom sheet ("dispatch a raven"). No email.
- **The egg-and-fire ritual IS "choose your banner"** — levelling grants an egg; dropping it into the Crossroads fire re-themes the site. Not an accent toggle.
- **Saving is automatic and invisible** — every XP gain persists to localStorage instantly (the pre-RPG `sh_min` store, untouched). Nothing in the UI is labeled like a save action. The title screen is where the save file shows: NEW GAME for first-timers, CONTINUE + character summary for returning visitors.
- **Character system** — every visitor gets a randomly generated RPG name (editable) and a procedural pixel-art avatar (grid of candidates + reroll). Both live in the save.
- **Level-ups are pull, not push** — no auto-popping modal. A ▴ LEVEL UP badge appears on the character strip/sheet; clicking it opens the celebration modal (the egg reveal).
- **Mobile scrolls** — below 960px the game frame hides and the site scrolls normally with the dock + sheet (the "handheld port"). Desktop is the fixed single-screen frame.
- **URLs never change** — locations keep their pre-RPG paths, so deep links and SEO survive.

## 3. Screen anatomy (desktop ≥ 960px)

```
┌─────────────────────────────┬──────────────┐
│                             │ ◦ COMPASS    │
│    ADVENTURE VIEWPORT       ├──────────────┤
│    (scrolls internally)     │ MESSAGE LOG  │
│                             ├──────────────┤
│                             │ ☺ NAME Lv2 ▴ │  ← character strip → opens sheet
└─────────────────────────────┴──────────────┘
          [ ◂ | Menu 🔥 ]  ← dock (campfire pill); also opens the sheet
```

- **Adventure viewport** — the only region whose content changes; scrolls internally.
- **Compass** — navigation + sitemap; hotkeys 1–5; sealed locations show `?` / `???`.
- **Message log** — narrates arrivals, XP, level-ups, hints. Replaces toasts on desktop.
- **Character strip** — avatar, name, level + title, mini XP bar, level-up badge; opens the sheet.
- **Bottom sheet** (all breakpoints) — nav (icon + game name + plain name), the character sheet (avatar picker, editable name, XP, banner eggs, level-up badge), contact links, stone baseboard.

## 4. The world map

| Icon | Location | Path | Portfolio section | Notes |
|---|---|---|---|---|
| ⌂ | The Crossroads | `/` | Home / hub | Stage hero, fire + egg ritual live here |
| ⚔ | Quest Log | `/projects` | Projects / case studies | Quest detail = objective · role · journey · loot |
| ✎ | The Library | `/notes` | Notes | v0.1's Training Grounds slot |
| ◈ | Hall of Records | `/about` | About | Character sheet — but the character is Sacha |
| ✦ | The Vault | `/lab` | Lab / experiments | Sealed until Level 2; direct URL still works |

Icons live in `src/game/locations.ts` and are shared by compass + sheet. (Unicode glyphs for now; pixel-art icons can replace them via the pixel toolkit later.)

## 5. XP economy

Discover a location **+25** · open a quest **+15** · read a quest to the end **+35** · find a secret **+50** (existing candidates: the scorpion tap, the menu-fire extinguish). Levels: 100 / 250 / 500 XP → Traveller, Apprentice, Journeyfolk, Archmage. Level 2 unseals the Vault; every level grants a banner egg. Nothing essential is ever locked.

## 6. Later phases (not now)

Sound toggle (M&M-style bleeps) · CRT shader as an option · per-location pixel dioramas in the viewport headers · pixel-art compass icons · quest-format rewrite of the case studies.
