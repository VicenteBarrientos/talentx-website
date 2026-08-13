# Agent handoff

Working log for this repo. Several agents touch it (Codex, Cursor, Claude Code),
often from different machines and sessions, so **read the top of this file before
changing anything** and append an entry when you finish.

Newest entry first. Keep entries short: what changed, what it broke, what is left.

---

## Current state — 2026-08-12

- Production is `45a77d4`, deployed from GitHub. `origin/main`, local and live all
  agree — verified against the served assets, not assumed.
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

- **Route placement.** The portfolio lives under `/meet-the-team/`, a path that
  promises a team bio and delivers a product portfolio. A dedicated `/portfolio`
  route, with a short recruiting bio left at the old URL, would serve both
  audiences. Not decided.
- **Per-project technical detail.** Considered as collapsibles. See the scroll-math
  note below before building it — anything that expands in place shifts every stop
  after it.
- **Marketing copy is clean.** Checked: no string in `lib/i18n/talentx.ts` mentions
  themes, so the repaint left no stale claims in user-facing text.

---

## Scroll math — `PROJECT_CENTERS`

These six numbers say where each card sits along the journey, as a fraction of its
scroll range. The route rail, the `01 / 06` dock and the video's frame all derive
from them, so if they drift the highlighted project stops matching the card you
are reading.

**They are correct as of 2026-08-12** — measured 0.162 / 0.330 / 0.496 / 0.662 /
0.828 / 0.993 against constants of 0.159 / 0.326 / 0.492 / 0.659 / 0.826 / 0.992,
a worst case of 30px over a ~6,000px journey. Two content changes in a row — adding
the screenshots, then resizing them — moved the drift from 22px to 30px, which is
why the constants are still the right call over runtime measurement.

**The trap when you verify this:** progress is measured against
`#portfolio-journey`, and that section opens with a full-height header block
before the first card. Measuring against the inner card wrapper instead makes
every stop look hundreds of pixels early and invents a bug that is not there.
Paste this in the console on the page to check honestly:

```js
const j = document.getElementById('portfolio-journey');
const range = j.offsetHeight - innerHeight;
const top = j.getBoundingClientRect().top + scrollY;
[...document.querySelectorAll('[id^="project-"]')].map(c => {
  const r = c.getBoundingClientRect();
  return +(((r.top + scrollY + r.height / 2) - innerHeight / 2 - top) / range).toFixed(3);
});
```

Re-tune the constants by hand when the numbers drift enough to matter. Measuring
them from the DOM at runtime was tried and reverted: it works, but it replaces six
verified values with a measurement that has to be right at mount, for a gain of
22px today. Revisit that trade if content starts changing often — collapsible
detail panels would be the trigger.

## Media

All four portfolio assets must come from the **same footage**. They were once
from two different generations, so the scene changed the moment the scrub took
over from the poster.

| File | Role |
| --- | --- |
| `videos/vicente-portfolio-traversal.mp4` | Desktop scrub. Must be exactly 10 s to match `SCRUB_TIMES`. |
| `videos/vicente-portfolio-world.mp4` | Touch / fallback loop. Crossfade the seam or the forward flight cuts on repeat. |
| `images/vicente-portfolio-world.webp` | Poster, and the LCP element. |
| `images/vicente-portfolio-og.jpg` | Social card. |

What makes a usable traversal: the camera holds altitude and keeps moving, so
that all six stop times land somewhere visibly different. A clip that descends
and settles on one landmark breaks the effect — the six stops collapse onto the
same shot. Check by sampling at 0.85, 2.5, 4.15, 5.8, 7.45 and 9.1 s before
encoding anything.

Encode for scrubbing with dense keyframes; hazy, low-detail scenes cost roughly
half what foliage and glass do at the same settings:

```bash
ffmpeg -i src.mp4 -vf "scale=1264:720:flags=lanczos,fps=12" \
  -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -profile:v main \
  -x264-params keyint=2:min-keyint=2:scenecut=0 -movflags +faststart -an out.mp4
```

Gemini/Veo output carries a sparkle watermark in the bottom-right; crop it off
before encoding. Grok output does not.

### Project screenshots

`public/images/projects/<id>.webp`, one per project, wired through the `shot`
field on `PROJECTS`. **Do not hand-edit them** — rerun the capture so every card
keeps the same frame:

```bash
npm run shots          # CHROME_PATH=... if Chrome is not in the usual place
```

It drives an installed Chrome via puppeteer-core (no browser download) at dpr 1,
because the cards render these ~640px wide and dpr 2 quadruples the bytes for no
visible gain. Roughly 300 KB for the six on disk; Next re-encodes to AVIF at the
displayed size, so a visitor fetches about 84 KB, lazily.

Refresh them whenever a product's landing page changes — a stale screenshot is
worse than none.

**Card height is load-bearing.** A stop is reached by centring its card in the
viewport, and the nav is fixed on top, so a card taller than roughly
`viewport - 160px` slides its own title under the nav. Adding the screenshots at a
fixed 16:10 aspect pushed cards to 910px and broke this on every laptop shorter
than ~1000px. The shot is therefore sized in `svh`, not by aspect ratio. If you
add anything to these cards, re-check clearance at 800px viewport height, which is
a 1440x900 laptop once browser chrome is subtracted:

```js
const card = document.querySelector('[id^="project-"]');
const r = card.getBoundingClientRect();
document.scrollingElement.scrollTop = r.top + scrollY + r.height / 2 - innerHeight / 2;
// then: title top must sit below the header's bottom
```

## Log

### 2026-08-13 — Claude: card height fix, verified live

Shots are sized in svh now; at a fixed 16:10 the cards hit 910px and slid their
own titles under the fixed nav on any laptop under ~1000px tall. Verified the
whole journey against production in headless Chrome: video time, dock and rail
all track the right card at each of the six stops, and every screenshot serves
200 at w=640.

### 2026-08-12 — Claude: screenshots on every stop

Each project card now shows its live landing page. Adds `npm run shots` plus
`puppeteer-core` as a devDependency so the images stay reproducible rather than
being a one-off capture.

### 2026-08-12 — Claude: new backdrop footage

Swapped all four assets to a Gemini clip that holds altitude instead of landing
on one pavilion. Desktop payload 7,788 → 3,954 KB, mobile 741 → 452 KB.
Watermark cropped. Duration and dimensions unchanged, so no retuning.

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
