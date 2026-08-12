# Agent handoff

Working log for this repo. Several agents touch it (Codex, Cursor, Claude Code),
often from different machines and sessions, so **read the top of this file before
changing anything** and append an entry when you finish.

Newest entry first. Keep entries short: what changed, what it broke, what is left.

---

## Current state — 2026-08-12

- `main` is the only long-lived branch. Vercel deploys production from it.
- The site is **light-only**. There is no theme switch, `next-themes` is gone, and
  there are no `dark:` utilities left. `lib/theme-sync.ts` survives solely to append
  `?theme=` to outbound ResumeX links.
- `/meet-the-team/vicente-barrientos` is a scroll-driven portfolio: the backdrop
  advances as you scroll through six project stops.

### Before you review or edit — check what production is actually running

Production has twice been deployed from a **dirty working tree** (`vercel --prod`
from a local folder, not from git). Both times `origin/main` did not describe what
was live, and a reviewer read stale code as a result.

```bash
git fetch origin && git log --oneline HEAD..origin/main
```

Then confirm what production is serving — the deployment metadata shows
`gitDirty: 1` when it was pushed from an uncommitted tree. If you need production
to match git, deploy from GitHub, not from your folder.

## Gotchas already paid for

- **Vercel plan.** The project is on Hobby, which is restricted to non-commercial
  personal use. The deployment advertises recruiting services, which is commercial
  under Vercel's fair-use definition. Owner is aware; flagged, not resolved.
- **Range requests are cached.** Vercel docs suggest `Range` requests are excluded
  from the CDN cache. Tested on the 7.6 MB traversal video: `X-Vercel-Cache: HIT`
  on both a head request and a mid-file range. Static assets in `/public` do get
  edge-cached. Fast Data Transfer is still billed per byte served.
- **The scrub is desktop-only on purpose.** `SCRUB_MEDIA_QUERY` requires
  `pointer: fine` as well as a width, because a phone in landscape clears any
  width gate, and iOS Low Power Mode refuses to service `currentTime` seeks with
  no error and no detection API. Touch devices get `*-world.mp4` instead.
- **Seek discipline is load-bearing.** Exactly one seek may be in flight
  (`scrubSeekInFlightRef`); iOS cancels seeks issued in rapid succession. A
  watchdog gives up after two 400 ms timeouts and falls back to the loop.
- **i18n shape must match.** `en` and `es` in `lib/i18n/talentx.ts` are typed as a
  union — if the two objects diverge in shape, TypeScript fails at build.
- **Next.js 16 is not the Next you know.** See `AGENTS.md`.

## Open work

- **The traversal video needs regenerating.** Two problems: it is a dusk/night
  grade on a light site, and the camera lands on one island at ~3.7 s, so four of
  the six stops resolve to the same glass building. The `*-world.mp4` framing —
  wide aerial, whole archipelago, volcano on the horizon — is the composition to
  keep. Wanted: a slow forward drift at constant altitude that never descends or
  lands, in bright overcast daylight.
- **Route placement.** The portfolio lives under `/meet-the-team/`, a path that
  promises a team bio and delivers a product portfolio. A dedicated `/portfolio`
  route, with a short recruiting bio left at the old URL, would serve both
  audiences. Not decided.
- **Marketing copy is clean.** Checked: no string in `lib/i18n/talentx.ts` mentions
  themes, so the repaint left no stale claims in user-facing text.

---

## Log

### 2026-08-12 — Claude: harden the scrub, trim the portfolio

- `SCRUB_MEDIA_QUERY` now requires `(min-width: 1024px) and (pointer: fine)`. It
  was `(min-width: 640px)`, which let a landscape iPhone download 7.6 MB and then
  fail in Low Power Mode.
- Added a seek watchdog: `setScrubFailed` previously only fired on `onError`, but
  a hung seek raises no error, so the page kept a frozen frame and never fell back.
- The traversal video now mounts after `window.load` so it does not compete with
  the poster, which is the LCP element. The world video still mounts only when the
  scrub is ineligible, so nothing double-loads.
- Status pill renders only for non-`live` projects; six identical LIVE pills said
  nothing, and every card already links out.
- ResumeX icon returned to its own hue (rose). It was the only one of six remapped
  to `brand`, so it matched the route furniture instead of reading as a place.
- Dropped the duplicated intro paragraph in the projects section header.
- Deleted orphaned `public/videos/portfolio-bg.*` (~400 KB, unreferenced).
- README corrected: it still promised light/dark themes, `next-themes` and a cursor
  glow, all removed one commit later.

### 2026-08-11 — Codex: cinematic scroll-driven portfolio (#2)

Scroll-scrubbed traversal video, CSS module, media fallbacks, route rail and dock.
Adds `vicente-portfolio-traversal.mp4` (7.6 MB, 12 fps) and
`vicente-portfolio-world.mp4` (597 KB).

### 2026-08-05 — Cursor: repaint in the light palette

Cool gray canvas, navy `#1d3559` brand accent, dark theme removed entirely along
with the toggle, `ThemeProvider`, `ThemeSync` and the `next-themes` dependency.

### 2026-08-04 — Codex: repository showcase (#1)

README rewrite, `docs/product-preview.png`, canonical URLs pointed at
`talentxrecruiting.com` and `resumex.talentxrecruiting.com`.
