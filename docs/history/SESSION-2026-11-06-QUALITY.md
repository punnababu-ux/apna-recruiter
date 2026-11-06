# Session 2026-11-06 — Code quality: CI, browser tests, fixes

Why: a code-quality review rated the repo 7/10 as a prototype, about 5.5/10
against production design systems (Polaris, Primer, Radix). The gaps were no
CI, almost no tests, very large files, no per-component tests. This session
closes them in order. Read this before touching `e2e/`, the CI workflow or the
lint config.

## Done (pushed to main)

### 1. CI — `03e6848`
- `.github/workflows/check.yml`: on every push to main and every PR, runs
  `npm ci` → `lint` → `lint:tokens` → `npm test` → `build`, then installs
  Chromium and runs `npm run test:e2e`. A failing run uploads
  `playwright-report/` as an artifact (7 days).
- `gh` is not signed in on Punna's machine. Check runs with
  `curl -s https://api.github.com/repos/punnababu-ux/apna-recruiter/actions/runs?per_page=3`
  (the repo is readable without auth).

### 2. Browser tests — `e13682b`
- Dev deps: `@playwright/test`, `@axe-core/playwright`. Scripts:
  `test:e2e` (layout + accessibility), `test:visual` (screenshots).
- `playwright.config.ts`: projects `phone` (375×812, touch) and `desktop`
  (1440×900); its own server on **:3100** (dev locally, `next start` in CI;
  reuses one already running). Locally drives the installed Chrome
  (`channel: "chrome"`), CI uses Playwright's Chromium.
- **`@visual` tests are local only** (`grepInvert` in CI): baselines are
  macOS renders and would never match Linux font rendering. After an
  intended visual change, `npm run test:visual -- --update-snapshots` and
  look at the diff before committing the PNGs.
- `e2e/helpers.ts` — one place for:
  - `open(page, path, { offer, returning })`: the same seed as
    `scripts/capture-handoff.mjs` (phone session, job draft, pricing phase
    "today"), and on **every** load (reloads too) hides the Next dev badge
    (it covered bottom-left buttons on phones) and the caret.
  - `prototype(page, ...labels)`: the hidden prototype panel.
  - `expectNoHorizontalOverflow(page, label)`: compares `scrollWidth` with
    **`documentElement.clientWidth`**, not `innerWidth` (on a touch viewport
    `innerWidth` grows with wide content, so the old check could never fail),
    and names the culprit elements, skipping ones inside a clipping parent.
  - `expectNoCollapsedButtons`: buttons ≥ 24px; link variants (no
    min-height) skipped.
  - `expectCardsAligned`: runs `scripts/check-alignment.js`.
  - `expectAccessible`: axe, WCAG 2.1 A/AA.
- `e2e/checkout.spec.ts` (both checkouts, every tab and state, summaries,
  320px), `e2e/job-posting.spec.ts` (walks all 19 screens to plans, drafts,
  Back, Save & exit), `e2e/a11y.spec.ts` (11 screens + a keyboard check).
- **a11y `KNOWN` list:** today's violations are matched per element
  (selector + HTML), so they pass but any new one fails. Delete an entry when
  its cause is fixed. Same list in `docs/status/TODO.md` → "Accessibility".
- Gotchas: running several Playwright processes at once clashes on
  `test-results/` (use `--output=/tmp/pw-<name>`). A killed run can leave a
  stuck `next dev` on :3100; the next run then hangs before any test
  (`lsof -iTCP:3100 -sTCP:LISTEN`, kill it).

### 3. Two phone layout bugs the tests found — `9011ec3`
- Plan cards at 320px: "Active for 15 days" (nowrap) ran 12px off the screen.
  Now `@container` on the panel, and the row stacks below `@2xs` (panel
  < 288px ≈ screens < 344px). `job-plan-cards.tsx`.
- Describe screen: the `ai-idle` halo was inset −1.5rem on a 1rem page
  padding → 8px past every phone screen. Now −1rem
  (design-system `styles/index.css`).
- AGENTS.md "Text that grows" rules 9–11 (narrow fallback for every nowrap;
  decorative layers inside the page padding; measure with `test:e2e`) and the
  test commands in "Quality gates".
- Still open: on the Super premium phone card, "Top placement on job listing"
  runs under the Buy now button (overlap, not overflow, so the tests miss it).

## In progress (this file is updated as each part lands)

### 4. Dependencies (done locally, not pushed yet)
- `npm audit fix` (non-breaking) → lockfile only.
- **Next.js 16.2.3 → 16.4.5** (and `eslint-config-next` to match; both
  stay pinned exact). Fixes a critical Next advisory (Server Components DoS,
  proxy cache poisoning, App Router XSS) and the high `sharp` / `postcss`
  ones it bundles. Verified: build, 69/69 layout + a11y, 64/64 visual.
- Left: 15 advisories (3 low, 11 moderate, 1 high). The high one is
  `brace-expansion` under `eslint` → dev machines only, never shipped. The
  suggested `--force` fixes are downgrades (eslint-config-next 15, shadcn 1),
  so not taken.
- The new `eslint-config-next` adds `react-hooks/set-state-in-effect`: 31
  existing hits. Set to **warn** in `eslint.config.mjs` until fixed (list in
  TODO.md → "Lint debt"); set back to error then.

### 5–8. Parallel agents (sections below are filled in as each finishes)
Split so no two agents edit the same file:
- **A11y fixes** — the code-only issues from the KNOWN list; colour
  contrast is proposed, not applied (needs Punna's sign-off on shades).
- **More layout tests** — ECC job page, jobs list, chats, marketing pages.
- **Component tests** — every design-system category page, light and dark.
- **File splits** — the four OnlyRounds files untouched since 2026-10-16
  (`candidate-drawer`, `job-details-step`, `interview-rounds-step`,
  `create-job-wizard`). Not `wizard-screens.tsx` or the ECC job page: both
  changed today.

### 5. A11y fixes (done locally, not pushed yet)
Six KNOWN groups removed from `e2e/a11y.spec.ts`; only the four colour-contrast
entries remain. `a11y.spec` 26/26, `checkout.spec` 24/24.

| Issue | File | Change |
|---|---|---|
| `nested-interactive` | `src/components/apnahire/mobile-plan-row.tsx` | A phone plan card that has a Buy now button is no longer `role=radio`: the card still takes the tap (`onClick`), the button is the keyboard route. `MobileUnlimitedCard` the same; a selected card with a CTA gets `aria-current`. Cards without a CTA stay radios. |
| `aria-hidden-focus` | `prototype-settings.tsx` | Our own invisible popover anchor (`aria-hidden` + `role=button`) is now `tabIndex={-1}`. Not a Base UI bug. |
| `scrollable-region-focusable` | design-system `logo-wall.tsx` | Marquee is `overflow-clip` and no longer turns into a scroller under reduced motion: it stays one still row, clipped at the edge, exactly as before. (The agent first made it wrap into rows; Punna chose the single row because wrapping added up to 520px to phone checkout pages.) The non-marquee row: see "Reconciling" below. |
| `aria-allowed-attr` | design-system `toggle-group.tsx` | Passes `aria-orientation={undefined}` to Base UI; arrow keys still follow `orientation`. |
| `link-name` | design-system `app-sidebar.tsx` + product `app-sidebar.tsx` | New optional `brand.label`, the `aria-label` when only the wordmark shows. Product sets "apna Hire home". |
| `label-content-name-mismatch` | `job-list-card.tsx` (metric pills), design-system `app-sidebar.tsx` (workspace switcher) | `aria-label` dropped; the name is the visible text plus sr-only extras (", 5 pending"; "Switch workspace", which also names the collapsed button). |

Rule this follows: **an accessible name starts with the visible text.** Add
context as sr-only text after it, never as an `aria-label` that replaces it.

**Contrast proposals (not applied, need Punna's sign-off):**

| Element | Now | Proposed |
|---|---|---|
| Blue "Recommended" ribbon, white text (`--ribbon-fill`, `semantic.css:701`) | sky-500, 3.67:1 | sky-600 (`--color-apna-sky-600`), 5.16:1. Also darkens the recommended card's blue edge. |
| Struck feature lines (`text-muted-foreground/60`, `job-plan-cards.tsx:382`) | 2.42:1 | drop the `/60` → 5.28:1; the line-through still says "missing". |
| "−21%" on upsell tiles (`--checkout-primary`, `semantic.css:577`) | green-600 on green-50, 4.25:1 | green-700, 5.94:1. Also darkens the plan pages' green text. |
| Green link on a success-tinted pill (jobs list) | `text-success`, 3.77:1 | `text-success-subtle-fg`, 9.22:1 |
| Blue link on an info-tinted pill (jobs list) | `text-info`, 4.23:1 | `text-info-subtle-fg` |

Note: with several agents sharing the dev server, the default worker count hit
30s timeouts; `--workers=2` passes.

### 6. App and marketing layout tests (done locally, not pushed yet)
New `e2e/app.spec.ts` and `e2e/marketing.spec.ts`. Every `apnahire` product
route and all 18 marketing pages: no horizontal overflow and no collapsed
buttons at 375px, 320px (phone only) and desktop; screens marked "scroll" are
scrolled to the bottom and back and re-checked.

- **app.spec:** jobs list (each status tab, search hit / no hit, a location
  filter); ECC job page (default, `?applicants=0`, `?tab=database`,
  `?leadId=aditi`, Shortlisted, compact view, a filter applied; desktop only:
  `?filters=side` closed / open and the table view); job states (expired, under
  review, draft, `delivery-andheri`); chats (inbox, a thread, a missing
  thread); and the remaining product routes (dashboard, settings, database,
  invite centre, reports, …).
- **marketing.spec:** a hard-coded `ROUTES` list (no dynamic routes). **A new
  marketing page needs a line in `ROUTES`;** a new product route goes in the
  `screens(...)` lists in `app.spec.ts`.
- **`@visual`:** 10 baselines (jobs list, ECC default and `?applicants=0`,
  homepage, pricing; both projects). The homepage and pricing shots mask
  animated elements (`[class*=animate-]`), which hides a large part of the homepage.
- **Counts:** app 77 pass on phone / 42 on desktop; marketing 33 / 18. Skips
  are the 320px tests on desktop, desktop-only screens on phone, and 4 fixmes.
- Scrolling tests use `test.slow()`. Always pass `--output=/tmp/pw-<name>` when
  several runs share the machine.

**Bugs found, marked `test.fixme`** (`fixme320` in app.spec, `FIXME` in
marketing.spec; delete the mark when fixed):
1. ECC job page, filter applied, phone 320px: the results bar's "· 1 filter
   Clear" ends 16px past the screen; "Clear" is cut off.
2. Homepage, phone 320px: the apna Database and Enterprise product cards' 3-tile
   stat row ("22+ Precision filters") ends 17px past the screen.
3. Interview prep lounge, phone 375px and 320px: the "Prepare for 25,000+ top
   roles" title and role-chip row overflow (page scrolls 37px / 70px sideways).

### 7. Component tests (done locally, not pushed yet)
New `e2e/components.spec.ts`: the 8 design-system category pages (`actions`,
`data-layout`, `display`, `feedback`, `inputs`, `marketing`, `navigation`,
`overlays`) plus `product/pop-ups`, each in light and dark, phone and desktop.
Three checks each: no horizontal overflow / collapsed buttons, axe, and
`@visual` (desktop only, 18 baselines in `e2e/components.spec.ts-snapshots/`).
108 tests: 90 pass, 18 skipped (phone visual), none `fixme`.

- **Dark mode:** `next-themes` with `attribute="class"`, key `theme`. The spec
  seeds `localStorage.theme` in an init script and asserts `<html class="dark">`.
  It has its own small loader, because `open()` clears localStorage on first
  load and would wipe the seed. Wanted: a `theme` option on `open()`.
- **Timeout:** 90s for this file; at 7 workers against `next dev`, first-compile
  pages time out. Run with `--workers=3` locally.
- **Updating baselines:** `npx playwright test e2e/components.spec.ts --grep @visual --project=desktop --update-snapshots`.
- **KNOWN** matches rule + selector/HTML + the `fg>bg` colour pair axe
  measured, tagged by theme. A KNOWN entry that no longer matches does **not**
  fail, so delete entries by hand when you fix them. Entries (17), most needing
  a token decision:
  - `link-name`: docs header "Back to apna Recruiter"
    (`src/app/design-system/layout.tsx`), `Button render={<Link>}` drops the text.
  - `button-name`: inputs-page Select trigger. `label`: Slider thumbs (`slider.tsx`).
  - `scrollable-region-focusable`: `table.tsx` container (phone); `logo-wall.tsx`
    (likely stale after §5's fix).
  - Contrast, dark: white on the dark green primary (2.95–3.08:1, the parked
    Express item); `text-warning-foreground` on the dark warning tint
    ("Verify Identity", 2.19:1; should be `text-warning`).
  - Contrast, light: Button `destructive` soft (4.13), Badge `info` sm (4.42),
    Badge `ribbon` (3.67, same as §5), navigation link chip (4.43), marketing
    eyebrow `text-primary` (4.29; AGENTS.md says eyebrows are gray),
    selectable-card description `/80` (3.92), demo-only `text-warning` on white
    and a hand-painted `bg-emerald-500/15` avatar on the display page.
  - Contrast, both: role-coloured links and outline Badges on `-subtle` fills
    (AlertBanner, RenewalBanner; 3.6–4.2), struck price on tinted fills (3.5–4.5).

### Reconciling the parallel parts (after all four landed)
- `components.spec`'s LogoWall KNOWN entry was removed. It still failed on the
  design-system marketing page, because the non-marquee `LogoWall` (an
  `overflow-x-auto` row) was left alone in §5. Fixed there: the scroller is
  `tabIndex={0}`, `role="region"`, `aria-label="Client logos"`, with the
  standard `focus-visible:ring-3 ring-ring/50` ring. No KNOWN entry left for it.
- **No visual change from this batch.** Proved by reverting only `logo-wall.tsx`
  and running every checkout and job-posting `@visual` test against the
  baselines from before today: 64/64 matched. With the single-row logo wall
  restored, the original checkout baselines pass unchanged; the 4 new
  homepage/pricing baselines (§6) were re-taken once the wrap was dropped.
  Interaction changes are keyboard and screen-reader only (§5, plus the new
  Tab stop on the non-marquee logo row).
- **Final run** on the production build (`next start -p 3100`): tsc, lint (0
  errors, 31 known warnings), lint:tokens, 10 unit tests, and **403 Playwright
  tests passed, 93 skipped** (platform-only checks and the 4 fixmes in §6),
  visual included.
- **Gotcha:** `CI=1 npx playwright test` fails every test locally: CI mode
  uses Playwright's bundled Chromium, which isn't installed here (local runs use
  installed Chrome). To test the production build locally, run `npm run build`,
  start `npx next start -p 3100` yourself, then run `npx playwright test`
  without `CI` (it reuses the server).

### 8. File splits (done locally, not pushed yet)
Four OnlyRounds files split by moving code, with no behaviour or visual change.
**Convention:** the original `foo.tsx` stays the entry point (same path, same
exports); its parts live in a sibling `foo/` folder, imported as
`@/components/onlyrounds/foo/*`. No `index.tsx`, so old imports still resolve
to the entry. No importer changed.

| File | Lines before → entry now | Parts in the sibling folder |
|---|---|---|
| `candidate-drawer.tsx` | 1771 → 120 | `types`, `contact-actions`, `drawer-body`, `insights-tab`, `media-players`, `profile-tab`, `violations-tab`, `timeline-tab`, `criteria-blocks`, `utils` |
| `job-details-step.tsx` | 1687 → 383 | `validation`, `section`, `question-shared`, `question-sections-editor`, `question-section-item`, `question-section-body` |
| `interview-rounds-step.tsx` | 1631 → 207 | `constants`, `use-id-generator`, `task-type-picker`, `task-card`, `screening-summary`, `task-editors`, `cefr-addon`, `criteria-editor`, `interviewer`, `read-only-views`, `skeletons` |
| `create-job-wizard.tsx` | 1400 → 626 | `types`, `steps`, `utils`, `description-step`, `populate-from-generation`, `wizard-top-bar`, `wizard-footer`, `exit-dialog` |

- Public exports unchanged (`CandidateDrawer` + types, `validateSection`,
  `getSectionStatus`, `validateJobDetails`, `InterviewRoundsStep`, `ROUTES`,
  `GenerationData`, `CreateJobWizard`). `ROUTES` stays in `create-job-wizard.tsx`.
- The wizard's top bar, footer, exit dialog and `populateFromGeneration` were
  lifted out with props named after the original locals, so the JSX is verbatim.
- `job-details-step/question-shared.ts` and `interview-rounds-step/constants.tsx`
  exist only to share values between the parts.
- **Verified:** tsc, eslint (6 existing set-state-in-effect warnings, now spread
  over the new files), lint:tokens. 70 before/after screenshots at 1440×900:
  66 identical; the other 4 vary run to run before the split too (timing-dependent
  heights, sticky-footer full-page capture, a typing placeholder).
- **Gotcha:** `next.config.ts` redirects `/onlyrounds/*` to `/apnahire/*`, so
  the candidate drawer (only used by `src/app/onlyrounds/(product)/jobs/[id]/page.tsx`)
  has no live route. It was tested through a temporary page, since deleted.
  The wizard is live at `/apnahire/jobs/rounds/new`.

### 9. Dark-mode pricing and order-summary colours (committed, not pushed)
Punna's dark-mode review of the plans pages and the order summary. Dark mode
only; light mode resolves to the same values as before. Decisions and the
trade-off: `docs/DECISIONS.md` → "Dark mode pricing coherence".

- **Plan area (option 2):** plan panels and tracks (tab bar, Job credits and
  Unlimited panels, the 1/2/3 switch) take the page glass (`--surface-glass`);
  plan cards go one step lighter, plum-700 (`--surface-plan-card`), and stay
  solid. Two readers were pinned so they don't move with it:
  `--app-chip-pill` and `--checkout-discount-bg`.
- **Recommended label:** `--ribbon-fg` sky-300. 5.3:1 on its fill (was 4.2:1).
- **Phone pricing chips** keep their earlier look through two new tokens,
  `--checkout-chip` (card at 40%) and `--checkout-chip-pill` (plum-800), used
  by `SegmentedTabSwitcher`'s phone row in the checkout look (also the app's
  `MobileChipRow`). Sticky tabs and desktop tabs unchanged.
- **Order summary:** the coupon field drops the Input's `dark:bg-input/30` (a
  box behind the hint; hint now 7.0:1). The database add-on's unselected chips
  use the new `--chip-on-tint` (plum-800; `--background` read as holes),
  labels 6.5:1.
- **Emphasis button** on dark: lavender plum-300, hover plum-200, plum-950
  label (9.3:1; 7.3–9.3:1 against the surfaces). Gray-700 was ~1.5:1 on the
  plum cards. The `data-surface="dark"` white inversion is unchanged.
- **Files:** `semantic.css`, `index.css`, `button.tsx` (JSDoc), `chip-tabs.tsx`,
  `segmented-tab-switcher.tsx`, `checkout-drawer.tsx`, `TOKENS.md`,
  `DECISIONS.md`.
- **Baselines re-taken:** four dark component shots (`actions`, `data-layout`,
  `inputs`, `navigation`). They still passed before (each change is under the
  1% pixel tolerance), so they were re-taken with `--update-snapshots=all` and
  diffed old against new: only the lavender emphasis buttons, the chip fills,
  the lighter Recommended label and the plan panel's edge changed. No light
  baseline changed. No axe KNOWN entry was fixed or added by this batch.
- **Verified:** full Playwright run (403 passed, 93 skipped), the dark set
  re-run stable, tsc, lint:tokens, unit tests. `npm run lint` reports 133
  errors, all in the git-ignored `playwright-report/` folder (a local HTML
  report); the source has 0 errors and 31 warnings.
