# Launch checklist: getting sacha.cool ready to share

The highest-impact work before sharing the portfolio, from the audit on
2026-10-28. Tick items off here as they land (link the PR). Start at the top:
everything under "Before you share" should be done before the first post.

## Before you share

- [ ] **1. Finish the Meta case study.** Correct every section of
  `/projects/meta-ads-manager` (the draft's specifics are invented; see the
  comment in `src/data/projects.ts`), decide on art (real, recreated, or drop
  the four placeholder figures), then remove `unlisted`.
- [x] **2. Hide the sealed demo.** It was a fake project listed beside the real
  one. Now `unlisted`; re-list it if real NDA work gets sealed.
- [ ] **3. A way to reach you: a contact sheet.** About only has X and GitHub.
  Pick a direction (ideas below) and the delivery (mail app, or a form that
  emails you).
- [x] **4. Shared links skip the welcome screen.** A deep link opens straight
  to its page; home keeps the title screen; a refresh starts over at home.
- [ ] **5. Link a résumé PDF from About.** Needs the file.
- [ ] **6. Test the share preview.** Paste
  `https://www.sacha.cool/projects/scorpion-ui` into LinkedIn's Post Inspector,
  Slack and iMessage; check the card.

## First week after sharing

- [ ] **7. Betterfly case study.** Same format and process as Meta.
- [ ] **8. Featured work on the home page.** Pick a direction (ideas below) so
  a first-time visitor reaches a case study in one tap.
- [ ] **9. Case-study share cards.** Write each case study's title and summary
  into its page at build time, so a shared case study previews as itself
  instead of the site-wide card.
- [ ] **10. Write or delete the "Playgrounds Beat Decks" note.** Hidden as a
  draft in `src/data/posts.ts`.

## Later

- [ ] An accessibility pass across every page.
- [ ] The quest-objectives side panel on case studies.
- [ ] A regular notes cadence (newest note: February 2026).

## Done before this list

Case studies redesigned (scorp-ds #79, portfolio #101), quick fixes (#100),
About content (#102), Meta draft and open-to-work line (#103), refresh starts
at home (#104).
