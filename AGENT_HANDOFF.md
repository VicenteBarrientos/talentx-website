# Agent handoff

Working log for this repo. Several agents touch it (Codex, Cursor, Claude Code),
often from different machines and sessions, so **read the top of this file before
changing anything** and append an entry when you finish.

Newest entry first. Keep entries short: what changed, what it broke, what is left.

---

## In progress — 2026-08-13, branch `agent/cinematic-card-depth`

- The authoritative checkout is still `C:\Users\hp\Projects\talentx-website`.
  This branch starts at `167953f`; it has not been published yet.
- Background behavior is now hybrid: the 288 KB ambient world video moves in
  the hero on desktop and remains the only video on touch/phone screens. Desktop
  pauses it and crossfades to the scroll-scrub traversal only after the journey
  starts; scrolling back to the hero resumes it. Reduced motion still uses the
  poster and media failure still keeps semantic content available.
- The six scrub destinations now have short dwell zones: the output timestamp is
  repeated for ±0.032 journey progress around each card center, so the camera
  travels between cards and holds while a card is read.
- The old two-layer centered cards were replaced by a single, more transparent
  glass case-study shell. Desktop uses an alternating 896 px lane with text and
  product evidence side-by-side; mobile stacks the same DOM in reading order.
  Only the screenshot/icon and a low-opacity cyan highlight react to a fine
  pointer. Text, backdrop blur, keyboard focus and touch remain geometrically
  stable; the effect is rAF-coalesced and disabled for reduced motion.
- The watchdog no longer treats an in-progress seek as success merely because
  `currentTime` already equals the requested value. It coalesces to one latest
  target, waits up to multiple 800 ms windows, uses RVFC where Chrome services
  it, and conservatively falls back to double-rAF when a throttled browser
  suppresses RVFC. A 250 ms viewport sampler backs up Motion progress for direct
  hash/rail jumps and backgrounded test tabs.
- Local validation passed: ESLint; Next 16 production build; phone emulation
  showed exactly one playing `vicente-portfolio-world.mp4`; a desktop forward
  and reverse pass settled at 0.5 / 1.5 / 2.5 / 3.5 / 4.5 / 5.5 seconds with
  the matching active project and retained the traversal at every stop.
- Still open: the ambient 5-second file itself has a visible loop seam. It is
  now more visible because desktop hero and phones actually play it continuously;
  rebuild that asset before calling the cinematic background final.

## Current state — 2026-08-13

- Production deploys from the current `origin/main`. Claude's functional baseline
  audited on 2026-08-13 is `523cc5f`; later documentation-only commits may advance
  the production hash without changing that runtime implementation.
- The six cards, route dock and route rail align at their measured centers, but a
  later production stress test found that the seek watchdog can abandon the scrub
  video and permanently switch the session to the ambient loop. Treat this as P0.
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

On the workstation used for the 2026-08-13 audit, the authoritative checkout was
`C:\Users\hp\Projects\talentx-website`. The older
`C:\Users\hp\CS50\talentx-website` checkout contains an unpublished, obsolete
handoff commit (`570d9e5`) based on the former ten-second Grok traversal. Do not
push or merge that commit unchanged.

## Gotchas already paid for

- **Vercel plan.** The project is on Hobby, which is restricted to non-commercial
  personal use. The deployment advertises recruiting services, which is commercial
  under Vercel's fair-use definition. Owner is aware; flagged, not resolved.
- **Range requests are cached.** Vercel docs suggest `Range` requests are excluded
  from the CDN cache. Tested on the former 7.6 MB traversal video:
  `X-Vercel-Cache: HIT`
  on both a head request and a mid-file range. Static assets in `/public` do get
  edge-cached. Fast Data Transfer is still billed per byte served.
- **The scrub is desktop-only on purpose.** `SCRUB_MEDIA_QUERY` requires
  `pointer: fine` as well as a width, because a phone in landscape clears any
  width gate, and iOS Low Power Mode refuses to service `currentTime` seeks with
  no error and no detection API. Touch devices get `*-world.mp4` instead.
- **Seek discipline is load-bearing.** Exactly one seek may be in flight
  (`scrubSeekInFlightRef`); iOS cancels seeks issued in rapid succession. The
  current watchdog gives up after two 400 ms timeouts, but this policy also
  abandons the scrub during reproducible desktop scrolling. Do not consider the
  watchdog finished until the P0 below passes.
- **i18n shape must match.** `en` and `es` in `lib/i18n/talentx.ts` are typed as a
  union — if the two objects diverge in shape, TypeScript fails at build.
- **Next.js 16 is not the Next you know.** See `AGENTS.md`.

## Open work

- **P0 — scrub watchdog recovery.** In production at 1920x855, a seven-second
  continuous journey ended on `vicente-portfolio-world.mp4` instead of the scrub
  source. A second test jumping through project centers every 450 ms was still
  seeking at project four and had switched to the ambient loop by project five.
  The timeout retry compares `currentTime` with the requested value without also
  requiring `!video.seeking` and a presented frame. Recover using confirmed
  `requestVideoFrameCallback` presentation and the latest target; do not make two
  merely slow seeks session-terminal. Acceptance: continuous scrolling and
  repeated forward/reverse route jumps retain the six-second traversal, settle on
  the latest target, and never remain stuck beyond 500 ms.
- **P1 — rebuild the touch/fallback loop.** The current five-second world MP4 is
  not seamless: first-to-last mean absolute pixel error is about 40/255 and the
  final frame visibly cuts back to the opening frame. Crossfade an actual ending
  segment into the opening segment and inspect the loop in motion.
- **P1 — correct social metadata.** `vicente-portfolio-og.jpg` is 1200x630, while
  `app/meet-the-team/vicente-barrientos/page.tsx` declares 1200x675.
- **P2 — make screenshot refresh transactional.** `npm run shots` logs HTTP status
  but writes the screenshot even for a 404, 500 or login page. Require a successful
  response, write to staging, and replace committed images only after all targets
  pass.
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

**They are correct as of 2026-08-13** — measured 0.164 / 0.330 / 0.497 / 0.664 /
0.830 / 0.997 against constants of 0.159 / 0.326 / 0.492 / 0.659 / 0.826 / 0.992,
a worst case of 30px over a ~6,000px journey. Two content changes in a row — adding
the screenshots, then resizing them — moved the drift only from 22px to 30px, which
is why the constants are still the right call over runtime measurement.

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
30px today. Revisit that trade if content starts changing often — collapsible
detail panels would be the trigger.

## Media

All four portfolio assets must come from the **same footage**. They were once
from two different generations, so the scene changed the moment the scrub took
over from the poster.

| File | Role |
| --- | --- |
| `videos/vicente-portfolio-traversal.mp4` | Desktop scrub. 2,332,368 bytes, 1264x720, 12 fps, 73 frames / 6.083 s. `SCRUB_TIMES` currently ends at 6 s. |
| `videos/vicente-portfolio-world.mp4` | Touch / fallback loop. 288,446 bytes, 1024x576, 24 fps / 5 s. The current seam hard-cuts and must be rebuilt. |
| `images/vicente-portfolio-world.webp` | Poster and LCP element. 1364x777. |
| `images/vicente-portfolio-og.jpg` | Social card. 1200x630; metadata currently declares the wrong height. |

What makes a usable traversal: the camera holds altitude and keeps moving, so
that all six stop times land somewhere visibly different. A clip that descends
and settles on one landmark breaks the effect — the six stops collapse onto the
same shot. Sample the clip at the six stop times before encoding anything.

**How to generate one that works.** Anchoring both a start and an end frame is
what makes this reliable: two wide aerials at the same altitude force the model
to travel between them, so it cannot descend and land the way a text-only prompt
let it. Reuse frames from the current clip and the world stays consistent, which
matters because all four assets have to match. Prompt that worked on Kling 3.0,
first try:

> Slow aerial flight across an archipelago of floating islands above a sea of
> clouds at dusk. Deep blue and indigo tones, a snow-capped volcano on the
> distant horizon, glowing cyan light trails linking the islands. The camera
> drifts steadily forward at CONSTANT ALTITUDE, passing distinct islands on both
> sides — never descending, never landing, never entering any structure. Wide
> establishing shot held throughout. Calm, cinematic, atmospheric haze. No
> people, no text, no logos, no interiors, no fast motion, no shake.

Turn the prompt enhancer OFF — it paraphrases, and the altitude constraint is the
one clause that must survive verbatim. Keep multi-shot off too: a cut is exactly
where a scrubbing visitor parks when they stop scrolling.

The current Kling 3.0 master exists only on the generation workstation at:

`C:\Users\hp\Downloads\hf_20260813_143953_1556fcfc-9cda-4ffb-89cc-9ce2b09e4724.mp4`

Its SHA-256 is
`F0B873D8A8888C21CC3A28C060D84B28473F557110B0ACA2591CFC0C94B58776`.
It is 1908x1084, H.264 Main, 24 fps, 145 frames / 6.0417 s, and has no
audio. Downloads is volatile; preserve this master in durable storage before
cleaning the workstation.

Encode for scrubbing with dense keyframes; hazy, low-detail scenes cost roughly
half what foliage and glass do at the same settings:

```bash
ffmpeg -i src.mp4 -vf "scale=1264:720:flags=lanczos,fps=12" \
  -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -profile:v main \
  -x264-params keyint=2:min-keyint=2:scenecut=0 -movflags +faststart -an out.mp4
```

The committed traversal produced by those settings is not all-intra: 37 of 73
frames are keyframes and the file contains B-frames. Its dependency chain is
short, but it is less deterministic for reverse seeking than the former GOP-1,
no-B encode. Benchmark the repaired watchdog with this exact asset and compare a
`bframes=0` or all-intra variant before changing encoding again.

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

The current capture script does not reject non-2xx responses before overwriting
the committed WebP. Inspect its status output and the six images after every run
until the transactional P2 above is implemented.

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

### 2026-08-13 — Codex: production audit of Claude's purpose-generated flight

- Reviewed Claude's ten commits through `523cc5f` against production. ESLint and
  the Next.js production build pass.
- The new 2.33 MB Kling flight is a stronger visual basis than the former route:
  all six sampled timestamps show distinct forward progress across the islands
  toward the volcano. The six captured project images are valid and the
  viewport-height card sizing keeps their headings below the fixed navigation.
- The scrub reliability claim did not survive stress testing. Both a seven-second
  continuous journey and moderately fast sequential project jumps triggered the
  two-strike watchdog and replaced the traversal with the five-second ambient
  loop for the rest of the mount. Root and acceptance criteria are recorded as P0.
- The ambient loop has a hard end-to-start cut; the Open Graph dimensions disagree
  with the JPEG; and the screenshot command can promote HTTP error pages. These
  remain open above. No runtime code was changed as part of this audit note.

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
