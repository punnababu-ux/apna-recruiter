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
