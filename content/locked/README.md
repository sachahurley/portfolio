# Locked case-study content

Plaintext sources for password-locked projects. Each `<slug>.json` here holds
the case-study body for the project with that slug in `src/data/projects.ts`
(the project entry itself has `locked: true` and no `blocks`).

Shape:

```json
{ "blocks": [ /* ProjectBlock[], same vocabulary as projects.ts */ ] }
```

## The lock loop

1. Edit `content/locked/<slug>.json` (create one per locked project).
2. `LOCK_PASSWORD=... node scripts/lock-projects.mjs`
3. Commit the regenerated `src/data/lockedBlocks.gen.ts`.

The `*.json` files are gitignored: only the ciphertext ships. The script is
deterministic, so re-running with the same password and content is diff-clean.

## Passwords

One shared password unlocks every locked project. It is never committed: pass
it via `LOCK_PASSWORD` or `--password` each time you run the script. A visitor
can unlock by typing it on the project page or via a share link:
`/projects/<slug>?key=<password>`.

**Demo only:** the placeholder `sealed-demo` project is locked with
`open-sesame`. That password appears in this file only because the demo
content is itself a placeholder. Never write a real password into the repo,
this file included.
