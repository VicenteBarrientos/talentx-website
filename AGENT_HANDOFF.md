# Agent handoff

Working log for this repo. Several agents touch it (Codex, Cursor, Claude Code),
often from different machines and sessions, so **read the top of this file before
changing anything** and append an entry when you finish.

Newest entry first. Keep entries short: what changed, what it broke, what is left.

---

## 2026-08-17 — Codex: standalone portfolio canary routing

- Started from freshly fetched `origin/main` at `27fba24`; this change does not
  include the separate `f1df7ac` share-asset refresh.
- Added disabled-by-default `beforeFiles` rewrites for `/portfolio`, its child
  paths, and `/portfolio-static`. They require both `PORTFOLIO_ORIGIN` and the
  same-origin cookie `portfolio-zone=standalone`.
- Changed the TalentX `/portfolio` menu entry to a hard navigation so crossing
  into the standalone Next.js zone performs a full page load.
- Kept the sitemap on the parent-hosted `/images/vicente-portfolio-og.jpg`
  during the cookie canary so crawlers without the cookie do not receive a 404.
  Switch it to the child v2 path only in the final ungated cutover.
- The existing parent route and assets remain the default and rollback path.
  Lint, the production build with the real child origin, the emitted rewrite
  manifest, and `git diff --check` pass. Production has not been changed.

## 2026-08-14 — Codex: Grok map flight replaces the portfolio journey

- Replaced the complete matched journey family from Vicente's supplied Grok
  flight: traversal source, 181-frame desktop sequence, opening/destination
  stills, poster and five-second touch/fallback loop. The studio intro and
  lowrider finale remain separate and unchanged.
- Preserved the 1280×720, 24 fps, 15.042 s original at
  `C:\Users\hp\CS50\portfolio-assets\vicente-portfolio-grok-flight-v1.mp4`;
  SHA-256 `2B4D675850D621E5D886E63915EC208881C0475CBF0F05B158988B7EED997EE4`.
  It has no audio or visible watermark.
- Retimed the six stops across the full flight at 1.25 / 3.75 / 6.25 / 8.75 /
  11.25 / 13.75 s. They land on frames 016 / 046 / 076 / 106 / 136 / 166;
  every stop is a distinct forward position, and frame 181 arrives at the
  mountain city. The camera holds altitude throughout rather than landing early.
- Desktop ships 181 WebPs at 960×540, 12 fps (8,357,280 bytes total). The
  repository-only traversal master is 1280×720, 12 fps, 15.083 s and 7,028,738
  bytes. The 1024×576 fallback loop is 24 fps, 5 s and 908,286 bytes; its tail
  eases into the exact opening frame (mean decoded seam difference 5.2 / 255).
- Added `scripts/build-portfolio-journey.py` so the interdependent assets are
  regenerated together from one source instead of drifting across generations.
- Verified all six desktop stops at 1920×911, the arrival/finale handoff and
  reverse-scroll reset, plus the matched mobile loop at 390×844 with no overflow.
  `npm run lint`, `npm run build` and `git diff --check` pass.
- Vicente explicitly authorized production deployment on 2026-08-14. This
  entry's containing commit is the release intended for `origin/main` through
  the repository's GitHub-connected Vercel production path.

## 2026-08-14 — Codex: animated lowrider finale

- Worked in the standalone `agent/finale-video-loop-v2` clone from current
  `origin/main` (`5e8e01a`). No existing checkout was modified.
- Replaced the static-only lowrider presentation with
  `public/videos/vicente-portfolio-finale-loop.mp4`. The matching light WebP
  remains underneath as the poster and complete fallback. The video mounts only
  after the journey begins, plays in the finale, and pauses/resets when the user
  scrolls back; reduced-motion, data-saver and autoplay-error paths keep the
  still.
- Prepared Vicente's supplied clip as a silent, fast-started 1280×720 H.264
  loop: 24 fps, 9.500 s, 3,003,575 bytes. A 0.5 s overlap reduces the original
  hard reset by about 83%; a brief lighthouse/cloud ghost remains during the
  final half-second, while the car and occupants stay stable. The supplied
  download was not altered.
- Verified live playback at 1920×911, the 390×844 crop with no horizontal
  overflow, reduced-motion fallback, and reverse-scroll pause/reset. `npm run
  lint`, `npm run build` and `git diff --check` pass.
- Vicente explicitly authorized production deployment on 2026-08-14. This
  entry's containing commit is the release intended for `origin/main` through
  the repository's GitHub-connected Vercel production path.

## 2026-08-14 — Codex: canonical `/portfolio` route and recruiter SEO

- Made `/portfolio` the canonical portfolio URL. Added direct permanent 308
  redirects from the former Vicente route and all existing legacy team aliases;
  query parameters are preserved and no redirect chains remain.
- Reframed the rendered hero copy and metadata around truthful technical
  recruiting, global talent acquisition, TalentX and Goodwin experience. Added
  `ProfilePage`/`Person` JSON-LD, complete social metadata, canonical tags,
  project-specific bilingual screenshot alt text, `robots.txt` and a sitemap.
- Updated the shared navigation, README and vault references to the canonical
  URL. No journey dimensions, stop positions, media, animation or interaction
  logic changed.
- Verified desktop and mobile layouts, EN/ES query handling, every project hash,
  metadata/JSON-LD, crawl files, one-hop redirects and query preservation.
  `npm run lint`, `npm run build` and `git diff --check` pass.
- Vicente explicitly authorized production deployment on 2026-08-14. This
  entry's containing commit is the release intended for `origin/main` through
  the repository's GitHub-connected Vercel production path.

## 2026-08-14 — Codex: animated Osorno studio intro

- Rebased on the deployed `dc9ec1e` palette release, then added
  `public/videos/vicente-portfolio-studio-loop.mp4` as the intro-only motion
  layer. The 10.005 s source is 1280×720 H.264, 24 fps, fast-started and
  2,381,027 bytes.
- The existing studio WebP remains the priority LCP image, video poster and
  complete fallback. The loop mounts only after window load, is muted and
  `playsInline`, pauses outside the `before` phase, and is skipped for reduced
  motion or data saver. The matched opening/journey/destination media is
  unchanged.
- On wide desktops the studio video and still use `contain`, preserving the
  complete scene with intentional softened margins at the sides, as Vicente
  requested. Phones retain the verified 57% `cover` focal point. Checked
  playback at 1920×855, 1440×900 and 390×844; reduced motion leaves only the
  still. `npm run lint` and `npm run build` pass.
- Source caveat: the supplied MP4 contains a muted AAC track and its first/last
  frames are close but not identical, so a small loop-boundary snap may remain.
  Strip audio and regenerate/crossfade the seam if the clip is revised later.

## 2026-08-14 — Codex: portfolio palette unified with the homepage

- Vicente asked for the portfolio to use the same colors as the TalentX main
  page. Repainted its navigation, cards and controls with the canonical light
  canvas (`#f1f3f6` → `#e2e6ec`), navy primary (`#1d3559`), zinc text, white
  glass surfaces and brand-blue borders.
- Kept the cinematic artwork and all journey behavior intact at full opacity:
  phase scrims are transparent and vignette washes are removed. Unboxed copy is
  white with a restrained dark edge; project cards, screenshot plates, route
  controls, map markers, buttons and chips use the homepage's light language.
- Switched the shared navigation from its cinematic variant to the same light
  variant used on the homepage. Strengthened focus rings and inactive route dots
  for contrast; retained each project's distinct icon hue.
- No content, dimensions, scroll constants, breakpoints, media requests, frame
  sequencing or interaction logic changed. Visually checked at 1920×855 and
  390×844, including a project card and the actual finale artwork. `npm run lint`
  and `npm run build` pass.
- Vicente explicitly authorized production deployment on 2026-08-14. This
  entry's containing commit is the release intended for `origin/main` through
  the repository's GitHub-connected Vercel production path.

## 2026-08-14 — Claude: interaction plan (in progress)

Vicente asked for a more impressive page: more animation, more interactivity.
This entry is the plan; items are struck off in the Log as they land.

**Correction first.** The initial version of this plan was written against the
`C:\Users\hp\CS50\talentx-website` checkout while it was 24 commits behind
`origin/main`, so it proposed work that is already done or no longer exists:

- *Repair the seek watchdog* — there is no video seeking any more. The journey
  is a preloaded frame sequence.
- *Fix the 640px eligibility boundary* — `SCRUB_MEDIA_QUERY` is now
  `(min-width: 1024px) and (pointer: fine)`; the overlap is gone.
- *Add pointer tilt and a cursor-tracked sheen to project cards* — shipped as
  `PointerDepthCard`.
- *Show the products instead of describing them* — shipped as `npm run shots`.

The lesson is the one already at the top of this file: fetch before planning.
Work now happens on `feat/portfolio-interactions`, branched from `origin/main`.

**What is actually left, in order.**

- **P1 — Keyboard navigation of the journey. Code complete, visual check
  outstanding.** The rail and dock were anchors, so the only keyboard travel was
  Tab. `J`/`K`, `N`/`P` and `1`–`6` now move stop to stop, ignoring presses that
  carry a modifier or land in a field. Arrows, Page keys, Home/End and Space are
  deliberately *not* bound: the journey is ~6,000px of readable cards, and taking
  native scrolling away from keyboard-only visitors is too high a price for a
  shortcut. Discoverable through a `J K` chip on the rail — which only renders at
  ≥1280px, so it never reaches a device with no keyboard — and through
  `aria-keyshortcuts` on the same nav. Navigation centres the target card, which
  is how a stop is defined in the card-height note below, rather than using the
  anchors' top-aligned position.
- **P2 — Make the dock a control, not just a readout. Code complete, visual
  check outstanding.** Dragging across the dots now flies the traversal. Each
  dot's centre maps to its own `PROJECT_CENTERS` entry, so releasing over a dot
  lands exactly on that stop instead of somewhere proportional to the dock's
  width; past either end it clamps. Scrolling during a drag is deliberately
  instant — a smooth animation lags behind the finger. Movement under 3px is
  treated as a tap, so the existing anchors still work; beyond that a
  `onClickCapture` guard stops the drag from also following the dot it ended on.
  `touch-action: pan-y` keeps a vertical swipe that starts on the dock scrolling
  the page. The anchors remain the accessible path; the drag is an enhancement.

  This surfaced a **pre-existing bug, now fixed**: `.routeDockName` was sized
  `min-width: 5.75rem / max-width: 7.5rem`, and the dock is centred with
  `translateX(-50%)`, so the whole control shifted sideways whenever the active
  project's name changed width — a visible wobble during ordinary scrolling, and
  it moved the drag targets out from under the pointer. The label is now a fixed
  `7.5rem`. Clipping behaviour is unchanged, since the old max was already 7.5rem.
  Dot positions were also measured every pointermove; they are now sampled once
  per drag, so no relayout can slide the mapping mid-gesture.
- **P3 — Hero entrance. Code complete, visual check outstanding.** Each name line
  rises from behind its own mask, and the mono eyebrow settles out of noise.
  `leading-[0.86]` makes the h1's line box shorter than its capitals, so the mask
  carries `0.14em` of padding cancelled by an equal negative margin — measured
  clearance is 13.6px above the ink and 4.2px below it at 1440px, so nothing is
  shaved. Only the `aria-hidden` copy of the eyebrow is ever scrambled; the real
  string sits beside it in an `sr-only` span, so assistive tech never reads a
  half-decoded word. Both are inert under reduced motion.
- **P5 — Project shots zoomed out onto a light brand plate. Code complete, visual check
  outstanding.** Vicente's read was that the screenshots felt too big, and the
  measurements agreed: the media box stretched to the height of the text column,
  which left it near-square (427x423 at 1440x900) against captures that are
  1440x900, so `object-cover` cropped **40% of each page's width away** and
  magnified the remainder. The box now carries the captures' own `16/10` and
  `lg:self-start` instead of stretching, with `object-contain` — 421x263, whole
  landing page visible, nothing cropped. Mapulengua is a 1:1 mobile capture and
  letterboxes into the same box, which reads correctly for a phone-first app.

  The plate behind it stays opaque so the journey footage cannot show through
  the product screenshots. The portfolio repaint changed it to brand-50
  `#f2f5f9`, matching the homepage's cool light surfaces. Edges feather into the
  plate via an inset shadow in the plate's own colour rather than a mask — no
  `-webkit-mask-composite` to get wrong in Safari, and it follows the rounded
  corners for free.

  Re-measured after the change: `PROJECT_CENTERS` drift is **0.164 / 0.330 /
  0.497 / 0.664 / 0.830 / 0.997**, identical to the 2026-08-13 reading above, so
  the stops did not move — card height is well under the `110svh` chapter, which
  is what sets the journey's length. Title clearance holds at 1440x800
  (116–151px) and at 375x812 (23–49px); cards are 427–507px against the ~640px
  ceiling. The shots got 4px shorter on phones, so that margin improved slightly.

- **P6 — Backdrop art no longer cropped on desktop. Code complete, visual check
  outstanding.** Both bookend stills are 1672x941 (1.78:1) and were `object-fit:
  cover`. A maximized browser on a 1080p monitor is about 2.1:1, so **18% of the
  artwork was hidden** — 193px off the top and bottom at 1900x876. This is the
  common desktop case, not an ultrawide edge case, and desktop is the audience
  the page is for.

  Past `min-aspect-ratio: 16/9` every backdrop layer switches to `contain`, so
  the whole scene is visible, with a blurred, softened wash behind filling the
  leftover width instead of letterbox bars. Below 16/9, including every phone,
  they all stay on `cover` and the washes are `display: none` — `contain` on a
  portrait viewport would bar far more than it revealed.

  **`.mediaStage` was `-inset-[12%]` and that had to go first.** The oversize
  existed for the spring CSS camera that the frame sequence replaced; its
  computed `transform` is now `none`, so it was purely vestigial — and it broke
  the first attempt at this fix. Anything inside the stage was being fitted to a
  2337x1086 box on a 1900x876 viewport, so `contain` on the finale still showed
  only **81%**. With the stage back to `inset-0`, all four footage layers now
  render 100% visible, and the layers that must agree do: opening 1538x876,
  journey 1537x876, destination 1538x876, so nothing jumps scale at a phase
  change. Verified at 1900x876 and 375x812.

  **Sharpness.** The journey frames are 960x540. Across the oversized stage they
  were upscaled **2.43x**; at `inset-0` with `contain` they are upscaled **1.6x**.
  That is the whole quality gain, and it cost no bytes. If they are ever
  regenerated larger, re-measure before assuming more resolution is needed.

  The washes are second `next/image` elements sharing the *same* `src` and
  `sizes` as their sharp copies, so they resolve to the same optimized URL —
  verified as 2 distinct URLs across 4 `<img>` elements for the bookends, no
  extra download. The stage's wash is the **opening still and never changes**:
  blurring the live journey frame would re-blur the full viewport on every frame
  swap during a scroll, which the compositor budget will not carry.

  `object-fit` for these layers now lives in the CSS module rather than on
  Tailwind `object-cover` utilities, so the wide-viewport override wins on
  specificity instead of racing utility source order.

  If the finale is ever regenerated, generating it at 2:1 or wider would retire
  the blurred fill on most desktops. It is a standalone z-layer, not
  footage-matched, so its aspect is free to change — unlike the opening and
  destination stills, which must stay exact traversal frames.

- **P4 — Per-project technical detail as an overlay. Not started; needs Vicente,
  not an agent.** *Open work* already wants this and correctly rules out
  collapsibles, because anything expanding in place shifts every stop after it. A
  fixed-position overlay sidesteps that entirely: the flow never changes, so
  `PROJECT_CENTERS` cannot drift. The mechanism is a couple of hours' work. The
  blocker is the content — six projects' worth of technical detail, in English
  and Spanish, making factual claims about shipped products on a page recruiters
  read. Do not let an agent invent it.

**Verifying this page in a hidden browser pane — read before trusting a result.**
While the pane is not displayed, `document.visibilityState` is `hidden` and
`requestAnimationFrame` never fires. Three things then look broken that are not:
`scrollTo({behavior:'smooth'})` silently does nothing, the scroll→state sync
never runs so the active project and backdrop frame appear frozen on stop 1, and
screenshots time out. Verify handler logic by wrapping `window.scrollTo` and
asserting on the calls, and verify geometry with `behavior:'auto'`. Anything
frame-driven needs the pane actually on screen.

**Constraints binding every item above.** Card height is load-bearing, so
nothing new goes inside a project card — check clearance at 800px viewport
height if that changes. Section heights must not move or the six constants
drift. `en` and `es` are typed as a union, so new copy lands in both. Every
item needs a reduced-motion branch, and the compositor is already carrying a
fixed backdrop plus `backdrop-filter` cards — prefer transform and opacity,
add no new blur.

## 2026-08-13 — Codex: high-speed lowrider finale release

- Vicente approved the generated artwork and integrated page, then explicitly
  authorized production deployment.
- Added `public/images/vicente-portfolio-finale.webp` (1672×941, 182,268 bytes,
  SHA-256 `5A325FDE284A2F193668CAD5117FF084A78A3F6B8CEDDA2FA4B4A1A5416F22A5`).
  The full-quality generated source is kept outside git at
  `C:\Users\hp\CS50\portfolio-assets\vicente-portfolio-lowrider-finale-v1.png`
  (2,112,479 bytes, SHA-256
  `159564CFFF846A6F3179C198F429CB604E09DBFB7FCB25D249DD69D543424030`).
- The exact traversal endpoint remains `vicente-portfolio-destination.webp`.
  The new scene is a separate z-layer that appears only in the `after` phase,
  after the footage-matched endpoint settles. Do not replace the destination
  still or use the finale as a video poster.
- The finale crossfades in over 520 ms after a 180 ms endpoint hold and reverses
  cleanly back into the scrub journey. Procedural stars are hidden in the finale,
  the final name/summary/social actions are unboxed text over the dark left side
  (no glass card), and the mobile crop is biased to 70%.
- Verified locally at 1280×720 and 390×844, including reverse scroll.
  `npm run lint` and `npm run build` pass. Production verification and the exact
  deployed commit are recorded in the release commit/follow-up handoff.

## Current state — 2026-08-13

- Production deploys from the current `origin/main`.
- The backdrop is a three-state experience: an opaque still before the journey,
  the frame sequence (desktop) or ambient loop (touch) during it, and an
  opaque still after. Verified end to end on 2026-08-13 — the six stops land on
  frames 016 / 046 / 076 / 106 / 136 / 166 with the dock and rail naming the right card.
- `main` is the only long-lived branch. Vercel deploys production from it.
- The site is **light-only**. There is no theme switch, `next-themes` is gone, and
  there are no `dark:` utilities left. `lib/theme-sync.ts` survives solely to append
  `?theme=` to outbound ResumeX links.
- The portfolio now shares the homepage's light canvas, navy accent, zinc text
  and white surface palette across navigation, cards and controls. Its cinematic
  artwork stays fully opaque with transparent phase scrims; unboxed copy is white
  for contrast instead of inheriting a separate local dark theme.
- `/portfolio` is the canonical scroll-driven recruiting profile and product
  portfolio; the former `/meet-the-team/vicente-barrientos` URL permanently
  redirects there. The backdrop advances as you scroll through six project stops.

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
- **There is no video seeking any more.** The journey is a preloaded frame
  sequence, so the watchdog, strike counter, generation coalescing and
  presentation confirmation are all gone. If you are tempted to reintroduce a
  scrubbed video, read the numbers in the 2026-08-13 log entry first.
- **The touch gate is now a bandwidth choice, not a technical one.**
  `SCRUB_MEDIA_QUERY` still restricts the journey to fine pointers, but its
  original reason — iOS Low Power Mode refusing to service seeks — no longer
  applies to drawing images. Measured cost of opening it: 904 KB at 480px,
  1,192 KB at 640px, against 281 KB for the current ambient loop.
- **i18n shape must match.** `en` and `es` in `lib/i18n/talentx.ts` are typed as a
  union — if the two objects diverge in shape, TypeScript fails at build.
- **Next.js 16 is not the Next you know.** See `AGENTS.md`.

## Open work

- **Per-project technical detail.** Considered as collapsibles. See the scroll-math
  note below before building it — anything that expands in place shifts every stop
  after it. Now planned as a fixed-position overlay instead (P4, 2026-08-14),
  which keeps the flow — and therefore the six constants — untouched.
- **Marketing copy is clean.** Checked: no string in `lib/i18n/talentx.ts` mentions
  themes, so the repaint left no stale claims in user-facing text.

---

## Scroll math — `PROJECT_CENTERS`

These six numbers say where each card sits along the journey, as a fraction of its
scroll range. The route rail, the `01 / 06` dock and the displayed frame all derive
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

All matched journey assets must come from the **same footage**. They were once
from two different generations, so the scene changed the moment the scrub took
over from the poster.

| File | Role |
| --- | --- |
| `videos/vicente-portfolio-traversal.mp4` | **Source only — never served.** 7,028,738 bytes, 1280x720, 12 fps / 15.083 s. The frame sequence and both bookend stills derive from it. |
| `images/journey/f_001…181.webp` | Desktop journey: 181 stills at 960x540, 12 fps / 15 s, 8,357,280 bytes total. |
| `videos/vicente-portfolio-world.mp4` | Touch / fallback loop. 908,286 bytes, 1024x576, 24 fps / 5 s. The tail eases into the exact opening frame. |
| `images/vicente-portfolio-world.webp` | Matched reference poster. 122,796 bytes, 1280x720; the current component mounts the exact opening still instead. |
| `images/vicente-portfolio-og.jpg` | Social card. 53,036 bytes, 1200x675 — must match the size declared in the route metadata. |
| `images/vicente-portfolio-opening.webp` | Exact first traversal frame, shown before the journey. 155,170 bytes, 1280x720. |
| `images/vicente-portfolio-destination.webp` | Exact last traversal frame, shown after. 155,856 bytes, 1280x720. |

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

The current Grok master is preserved outside Downloads at:

`C:\Users\hp\CS50\portfolio-assets\vicente-portfolio-grok-flight-v1.mp4`

Its SHA-256 is
`2B4D675850D621E5D886E63915EC208881C0475CBF0F05B158988B7EED997EE4`.
It is 1280x720 H.264 High, 24 fps, 361 frames / 15.042 s, and has no audio.
The source also carries an attached MJPEG cover; the builder deliberately selects
the timed H.264 stream.

Regenerate every matched derivative together with the repository script:

```bash
python scripts/build-portfolio-journey.py path/to/source.mp4
```

The current journey is a preloaded frame sequence, so the committed traversal is
a regeneration master with a normal two-second GOP, not a seek-optimized runtime
asset. Do not bring dense keyframes or browser video seeking back without first
re-measuring the frame-sequence implementation it would replace.

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

### 2026-08-13 — Codex: Osorno studio cover and unboxed introductions

- Built and approved from the isolated checkout
  `C:\Users\hp\CS50\talentx-cover-preview` on branch
  `agent/osorno-studio-cover`, based on production commit `b31b6a0`.
- Adds `public/images/vicente-portfolio-studio-cover.webp` (1672x941, 296,524
  bytes) as a distinct intro-only environment. Its generated source remains at
  `C:\Users\hp\CS50\portfolio-assets\vicente-portfolio-osorno-studio-cover-v2.png`.
- The separately generated seated avatar was deliberately left out of this
  release. Its reusable transparent source remains at
  `C:\Users\hp\CS50\portfolio-assets\vicente-avatar-seated-v1.png`.
- The hero copy and the pre-project `What I Build` introduction are deliberately
  unboxed text over their scenes: no glass background, border, blur, radius, or
  card shadow. Project cards and the closing CTA retain their glass treatment.
- The exact opening/destination stills and both existing videos are unchanged.
  The studio gives way to the footage-matched opening layer only when the journey
  becomes active; route navigation is hidden before and after the journey.
- Verified locally at desktop/mobile breakpoints, including cover -> active world.
  ESLint and the Next.js production build pass. Vicente approved deploying this
  avatar-free version on 2026-08-13.

### 2026-08-13 — Codex: static bookends, dwell zones, seek recovery

The backdrop becomes three explicit states, with opaque stills at both ends that
retire the translucent ghost frame. Each stop gains a dwell window so the footage
rests on its frame instead of sliding past, which also lands the last stop on
5.5 s exactly instead of drifting to 5.83. The seek pipeline coalesces to the
newest generation and waits for presentation, retiring the P0: a 7 s continuous
scroll and eight rapid stop-to-stop jumps both keep the traversal now.

### 2026-08-13 — Claude: social card size, loop seam, screenshot guard

Three defects of mine that the audit caught. The OG image was 1200x630 while the
route declared 1200x675; regenerated at the declared size, which is the source
frame's own 16:9, so no crop is involved any more. The ambient loop was never
seamless despite a commit message and a handoff entry of mine claiming it was —
the crossfade blended the tail toward later footage instead of back onto the
head, so it hard-cut from volcano to archipelago every five seconds. Rebuilt
properly: mean difference across the loop point falls from 34 to 6 of 255.
`npm run shots` now refuses to overwrite an image unless the response is 2xx, so
a site that is down can no longer be committed as if it were the product.

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
