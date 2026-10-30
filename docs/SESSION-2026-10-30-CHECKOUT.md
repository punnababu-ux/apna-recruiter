# Session context — phone checkouts and design versions (2026-10-30)

What one long working session with Punna changed in the two checkouts on
phones, the version switch it set up, and what is still open. Read
`AGENTS.md` first; this file is the working context for picking up from here.

- **Where:** worktree `.claude/worktrees/self-checkout-figma-design-0de944`,
  branch `claude/upsell-popup-card-layout-d08c58`. Dev server:
  `preview_start {name: "apna-recruiter-dev"}` (port 3000).
- **Pages:** express checkout = the job-posting plan step
  (`/apnahire/jobs/new/plans`, `job-plan-selection.tsx` + `job-plan-cards.tsx`);
  self-checkout = `/apnahire/credits` (`self-checkout.tsx`).
- **State of the work:** everything below is **uncommitted**. Punna says when
  to commit and push; don't ask (memory: feedback-no-commit-prompts). Two
  commits from the start of the session are already on main (upsell tile
  width fix, redrawn deck update).

## Where it landed (end of 2026-10-30)

**Express checkout V11 and self-checkout V14 are the near-final phone designs**
(Punna, after Sumit's review rounds). Open them with `?v=v11` on
`/apnahire/jobs/new/plans` and `?v=v14` on `/apnahire/credits`. Comparison
page (every version side by side, 2x iPhone 14 Pro):
https://claude.ai/artifact/GpR3b6G39KK3x7A8MMfumX. Whatever happens next
(cleanup, making one of them the default, removing the switch) starts from
these two. The full spec of each:

**Express V11** (lineage V1 → V6 → V10 → V11; phones)
- Bar: back arrow, "Select a job type" (`text-h5`) beside it, help on the
  right. No line above the cards. (A large title that moved into the bar on
  scroll was built and removed.)
- Job types in one panel (`groupJobs`): `surface-glass-dark`,
  `rounded-frame` (≈28px, concentric with the cards), 12px sides and
  bottom, 16px top; header = briefcase + "Single job posting" (`text-h6`,
  one line) and, right, clock + "Active for 15 days" (`text-xs` medium,
  muted); 12px under the header and between cards.
- Job cards (`MobilePlanRow nested`): `rounded-card-nested`, no blue edge on
  Recommended (the blue tab marks it), price only (no strike, no % OFF).
  Visibility line: ticks (tick / double / tick with trails) + "1x
  visibility, for regular roles" · "2x visibility, for faster hiring" · "4x
  visibility, for hard-to-fill roles". Feature line: "Alerts to
  candidates" / "2x alerts to candidates" (WhatsApp icon, no word
  "WhatsApp"), urgently hiring tag (orange flame), "Top placement on app"
  (blue).
- apna Unlimited frame: same shape as the panel (12px edges, `rounded-frame`,
  16px above a 24px logo row, 12px under). Inner card: "Unlimited jobs for 1
  month", ₹2,499 alone (no /mo, strike or % OFF), "1 job live at a time"
  (green briefcase) under the title; then "Alerts to candidates · Dynamic
  visibility" on one line (violet `Activity` pulse, `text-feature-violet`),
  "200 database credits worth ₹2,000", "Valid in a single city". No reposts
  line.
- 12px between every section of the page; "*GST applicable" 12px under the
  card; 20px to "Trusted by 7 lakh+ businesses & enterprises" (`text-sm`
  semibold, green shield, left). No database credits offer note.

**Self-checkout V14** (lineage V1 → V6 → V10 → V11 → V13 → V14; phones)
- Underline tabs (`lineTabs`); the row scrolls with its own 16px sides
  (starts 16px in, can scroll off the edge, all four tabs reachable at
  320px).
- Jobs tab: the 3 / 6 / 13 credit packs in express V11's panel (package
  icon + "Job credit packages", no "Active for 15 days"), nested cards 12px
  apart, no blue edge; packs keep strike, % OFF and the green per-credit
  note. Inside the panel under the cards: "How job credits work" (link) and
  "Buy a single job credit" (small outline), side by side from 288px inside
  the panel, stacked below (container query).
- "How job credits work" opens a bottom sheet on phones: 48px clay
  briefcase, "What each job type gets you" / "Credits are spent when you
  post. You can decide the job type later, at posting time.", then express
  V11's job cards read-only (muted fill) with "1 / 2 / 4 job credits" in
  the price slot. Desktop keeps the dialog.
- apna Unlimited card: V11's form ("Unlimited jobs for 1 month", price
  alone, "1 job live at a time"), then "Alerts to candidates" and the
  database credits only (no reposts, no dynamic visibility: this page sells
  no visibility).

**Shared, every version** (made this day): header "Select a job type"; the
line above express cards reads "Single job posting stays active for 15
days" (V11 drops it); no database credits offer in express's footer; 8px
between a phone price and its % OFF badge; dark text on phone meta lines
from V6; the blue edge on Recommended from V6 (not in V11+ panels).

**New in the design system:** `--radius-frame` (`rounded-frame`) and
`--feature-violet` (`text-feature-violet`), both in TOKENS.md; `ValueArt
size="2xs"` (48px); `PopupHeader artSize`; `MobilePlanRow nested` /
`readOnly`; `MobileUnlimitedLine reposts` / `lead`; `JobCreditBundles
grouped` / `footer`; `TrustedByStrip compact`.

**Before shipping:** `npm run check` has not been run (only `tsc`, ESLint
on touched files, `lint:tokens`). Don't run Prettier: no config, it
reformats whole files.

## How to see it

- **Sign in** (prototype): `localStorage.setItem("apnahire:session", JSON.stringify({kind:"phone",phone:"9999999999"}))`.
- **10% offer claimed:** `localStorage.setItem("apna:extra-off-deadline", String(Date.now()+86e6))`.
- **Hidden preview gear:** tap "\*GST applicable" on either page. Sections:
  Design version · Phone plan cards · Phone plan selection · (express) Plan
  layout — "Subscription (3 plans + monthly)" shows the Unlimited card there.
- **2× phone captures:** headless Chrome can't go below ~500px wide, so drive
  it over CDP (`Emulation.setDeviceMetricsOverride` 393×852 = iPhone 14 Pro,
  scale 2; 320 for the narrow check). Set the prototype session and
  `apnahire:pricing-phase` = `today` in localStorage first, remove the Next
  dev badge (`nextjs-portal`), and capture from the viewport (a `clip` is in
  page coordinates and drifts with scroll). Express's subscription layout
  isn't stored: tap "*GST applicable" (a `<p>`), pick "Subscription (3
  plans + monthly)", press Escape. The scripts lived in the scratchpad
  (`cdp/shot.mjs`, `cdp/self*.mjs`, `cdp/sheet.mjs`); rebuild them from this
  if needed.

## Design versions (the switch)

`src/hooks/use-checkout-version.ts` — `useCheckoutVersion()`, `versionAtLeast(v, min)`.
Chosen in the gear ("Design version") or `?v=v2` in the address (wins over
the stored choice, per tab, so two tabs compare side by side). Page roots
carry `data-checkout-version`. Later versions keep earlier ones' changes
(`versionAtLeast`, which reads each version's lineage: V2–V5 stack, V6
starts again from V1, V7–V10 build on V6, V11 on V10, V12 and V13 on V11, V14 on V13). New idea → new entry; V1's path stays untouched.

| Version | Adds | Where |
|---|---|---|
| **V1** · frozen Oct 30 | everything in "Shared by all versions" below; 10% said in a strip pinned at the bottom of the header, with a countdown | both |
| **V2** | phone tab strip = standard underline tabs (Tabs `line`, `tone="checkout"`: green label + 3px green underline; the Unlimited tab's underline is its gold); 10% = solid green success `AlertBanner` (one row: icon + "Extra 10% off applied", countdown right) above the tab heading, no header strip | tabs: self only; banner: both |
| **V3** | phone Unlimited card without the dark frame: white card, 2px plum edge (`--checkout-unlimited-edge`), "apna Unlimited" as a corner tab (24px, plum, gold wordmark nudged 1px down), 32px top padding; selectable like the other cards (no Buy now — the sticky CTA reads "Get apna unlimited • ₹2,499"). Self-checkout's Enterprise tab on phones: one comparison table (`EnterpriseCompareTable`: a column per plan with its lakh price, each feature named once, units in the row name, tap a column to choose; "Every plan: valid for 360 days, with a dedicated account manager." as the section subtitle (replacing the audience line)) | Unlimited: both; table: self |
| **V4** | express job cards on phones show features as signals. A key above the cards (`SignalKey`): each column's lit icon on top, its name under it ("WhatsApp alerts to candidates", "Urgently hiring tag", "Top placement"), a one-line STE100 explainer on tap (`TapTooltip`). Each card: under its name, visibility bars (`SignalBars`, 1–3) beside who it's for (`TIER_FOR`: "Basic visibility, for regular roles" / "Higher visibility, for faster hiring" / "Maximum visibility, for hard-to-fill roles"); then a 3-column row on the key's grid (`SignalRow`): WhatsApp icon + reach bars (0–2, 2 = "2x"), urgent and top icons lit or faded. No feature text | express |
| **V5** | the selection tick is a green circle on the card's top-right corner, half outside it (white ring), instead of the corner tab (`CornerTick` in `mobile-plan-row.tsx`) | both |
| **V6** | built on **V1** (not V5; `LINEAGE` in the hook). Phones, both checkouts: no sticky buy bar, no selected state, no button on any card (the Unlimited card's Buy now too). A tap on a card buys it: job/credit/DB packs and Unlimited open the order summary (via the same upsells as the old bar), subscription rows buy their plan, Enterprise opens contact sales. `MobilePlanRow` ignores `selected` and `MobileUnlimitedCard` drops `cta` in V6. Express job cards use V4's "who it's for" lines with V1's visibility ticks; cards without the Recommended tab have 16px top padding (no tick tab to clear) | both |
| **V7** | built on V6. Express job cards on phones: the feature line opens with the boost (`TIER_BOOST`: Classic 1x, Premium and Premium + AI 2x, Super premium 3x), the multiplier itself as the icon ("2x", medium weight, green) and "Boost" as the label; the visibility line's ticks become antenna bars (1, 2, 3). Classic now has a feature line (just the boost) | express |
| **V8** | built on V6. The same boost item, but its icon is the antenna bars (1, 2, 3) and the label reads "1x boost" / "2x boost" / "3x boost"; the visibility line keeps V6's ticks | express |
| **V9** | built on V6. Self-checkout's phone tab strip uses V2's underline tabs (`lineTabs()` in the hook: V2 and later, or V9); nothing else from V2 (no 10% banner). The Unlimited card takes V10's copy ("Alerts to candidates", "Job reposts and swapping") | self |
| **V10** | built on V6. Express job cards on phones: the visibility line shows four antenna bars (`SignalBars max={4}`, lit 1, 2, 4) and says the multiplier (`TIER_BOOST_FOR`): "1x visibility, for regular roles", "2x visibility, for faster hiring", "4x visibility, for hard-to-fill roles" (Premium + AI: "2x visibility, with AI calling"). The job cards' feature line drops "WhatsApp" (the icon says it): "Alerts to candidates", "2x alerts to candidates". The Unlimited card (`MobileUnlimitedLine`) follows: "Alerts to candidates", "Job reposts and swapping" (no "WhatsApp", no "Free"/"Unlimited": the icons say it) | express |
| **V11** | built on V10. Express on phones: the three job types sit in one panel whose header reads "Single job posting" (`text-h6`, left) and, opposite, "Active for 15 days" with the clock (`text-xs` medium, muted, right); the line above the cards is gone in V11; no struck price or % OFF on any card, job or Unlimited (`!groupJobs` / `!v11`) (`surface-glass-dark`, like the desktop `PlanFrame`), apart from the subscription card. Both frames (this panel and the Unlimited card's dark frame) measure the same: 361px wide, 12px sides and bottom, inner cards 337px with the nested corner (`MobilePlanRow nested`, as the Unlimited inner card). 12px between cards and between the two frames. Frame corners are concentric with the cards: new token `--radius-frame` (`rounded-frame`, card-nested + 12px ≈ 28px; in TOKENS.md). The job panel's header: briefcase icon + "Single job posting", 16px above, 12px under (`groupJobs`). The Unlimited card (Sumit's copy, 2026-10-30): title "Unlimited jobs for 1 month", price without "/mo", "1 job live at a time" (briefcase) under the title; "Alerts to candidates · Dynamic visibility" flowing on one line (`MobileUnlimitedLine lead`, placed after the alerts), then the database credits line. The pulse (`Activity`) is violet: new semantic token `--feature-violet` (`text-feature-violet`, apna-navy 600, dark navy 400; in TOKENS.md). Top placement stays blue (`text-info`; it was gray briefly) (`MobileUnlimitedLine lead`, drawn by `MobileFeatureLine before`), no "Job reposts and swapping" line (`MobileUnlimitedLine reposts={false}`). "1 month" breaks AGENTS.md's "term length always in days" rule (`SUBSCRIPTION_TERMS`); confirm before it leaves V11 Header: as every version (back arrow, "Select a job type" beside it). A large title that moved into the bar on scroll was tried and removed (user call, 2026-10-30). Visibility lines use the ticks again (`VisibilityLine ticks`) with V10's "1x / 2x / 4x visibility" copy; the Unlimited card's "Dynamic visibility" has a green pulse (`Activity`), not a level. The Unlimited frame has the job panel's header room: 16px above, a 24px logo row, 12px under Page column gap 12px (was 20), so "*GST applicable" sits 12px under the card. Trusted-by line: `TrustedByStrip compact`: `text-sm` semibold, green `ShieldCheck`, "Trusted by 7 lakh+ businesses & enterprises" (no "for hiring"), left-aligned, 20px under the GST note (`pt-2` on top of the 12px gap) No blue edge on the Recommended card in the panel (`MobilePlanRow nested` skips it); the tab alone marks it | express |
| **V12** | built on V11. The Unlimited card's "Dynamic visibility" pulse is blue (`text-info`) instead of V11's violet, to compare. Blue is also Top placement's colour | express |
| **V13** | built on V11. Self-checkout's Jobs tab on phones: the 3, 6, 13 credit packs in express V11's panel (`JobCreditBundles grouped`): `Package` icon + "Job credit packages" (no "Active for 15 days"), nested cards 12px apart, no blue edge, the page heading dropped; "How job credits work" (was "What 1 job credit will get you?"; opens the same job types dialog) and "Buy a single job credit" inside the panel; side by side when the panel is ≥288px inside, stacked below that (`@container`, `@2xs`; 320px phones) under the cards (`footer`). The Unlimited card takes express V11's form (`unlimited-side-card.tsx`): "Unlimited jobs for 1 month", price alone, "1 job live at a time"; no "Job reposts and swapping" (removed later that day) and no "Dynamic visibility" (this page sells no visibility). Pack prices keep their strike and % OFF. Both panel headers: 6px side padding, 8px gap, title on one line On phones "How job credits work" opens a bottom sheet (`JobTypesDialog` → `PlanPopup` + `PopupHeader` with the desktop dialog's words: "What each job type gets you" / "Credits are spent when you post. You can decide the job type later, at posting time.", clay `job-types` at the new 48px `ValueArt size="2xs"` via `PopupHeader artSize`): express V11's job cards (`MobilePlanRow readOnly nested`, muted fill, no tap), each with "1 / 2 / 4 job credits" in the price slot, the visibility line and feature line; desktop keeps the dialog | self |
| **V14** | built on V13. Self-checkout's phone tab strip uses V9's underline tabs (`lineTabs()` now covers V2+, V9, V14) The underline strip scrolls: the row is `w-max` with its own `px-4` (the strip drops its padding), so it starts 16px in, scrolls off the left edge when swiped and ends 16px in; before, it was squeezed to the screen and Database / Enterprise plans were cut off at 320–360px. Applies to every underline-tab version (V2+, V9, V14) | self |

## Shared by all versions (V1 and later)

**Phone plan cards** (`mobile-plan-row.tsx`: `MobilePlanRow`, `MobileUnlimitedCard`, `MobileFeatureLine`, `MobileUnlimitedLine`, `MobileSlotLine`)
- Feature line, always shown: short labels with trailing dots, only what
  the plan includes ("WhatsApp alerts to candidates", "Urgently hiring tag", "Top
  placement") — no ✕ items; Classic (nothing extra) has no line and no
  rule (`tierLine` returns null; `MobilePlanRow` shows the line or nothing
  in the "line" layout). Applies to V1–V3; V4/V5 replace it with the signal
  row. Job cards show **no** database credits; only the Unlimited card
  does (`UserSearch` icon).
- No radio by default: selection = green edge + a green corner tab with a
  white tick (top-right, drawn over the border by the row's wrapper —
  clipping it inside the card left a white fringe; the check is nudged
  1px down-left for optical centre). "Recommended" is the same kind of tab
  top-left (blue, sparkle). Both tabs 20px tall, card radius on both
  rounded corners; cards have 22px top padding. Cards are 16px apart on
  every tab, both checkouts.
- Other styles stay switchable in the gear (`use-plan-card-style.ts`):
  layout "Feature line" (default) / "Expand on select"; selection "Corner
  tick" (default) / "Green tint" / "Radio after the price" / "Radio first".
- Meta-line icons are 16px (visibility ticks read too small at 14).
- Credit packs: per-credit amount under "Valid for N days", left, green.
- Unlimited card (V1/V2): title "Unlimited monthly plan" in both checkouts;
  slot line "1 active job slot for 30 days" (plain, not bold; gray icon in
  self-checkout, green in express); WhatsApp first in its feature line;
  "Valid in a single city"; its own **Buy now** (standard `sm` button,
  `px-3.5`); tap anywhere goes to its checkout; compact logo strip.

**Express checkout**
- Header title "Select a job type" on the plan step (renamed 2026-10-30,
  every version; was "Choose a job & publish"; other steps: "Create new job"), `text-h5`; bar is a 64px row like self-checkout's
  (`JobPostingChrome`), 12px back-button gap.
- No "Choose a job basis your hiring needs" heading; "Single job posting
  stays active for 15 days" (every version; was "All jobs are active…",
  then "All jobs stay active…": the subscription isn't 15 days), 14px medium.

**Self-checkout**
- Top bar "Select plans", white from the start. "Everything you need to
  hire" removed.
- Phones/tablets: tabs live in a white strip under the bar (with a shadow),
  in the flow; they slide away on scroll down and return on scroll up.
  Hero tabs hidden below lg. V1 pills: unselected tabs `text-muted-foreground`,
  selected label bold.
- Headings `text-h4`, no icons: "Job credit packages", "Database credit
  packages", "apna Unlimited plans", "Enterprise plans". 16px from the strip
  or banner to the heading on every tab.
- "What 1 job credit will get you?" link + "Buy 1 job credit" (small outline
  button) on one row under the job packs. Database note: "1 credit = 1
  candidate profile unlock" only.
- Unlimited tab rows: stacked like the Jobs-tab Unlimited card (slot line
  under the name, same feature line).
- "Need a custom solution?" uses `text-plan-name` on phones; Contact sales
  is the small button there.
- 32px under "\*GST applicable"; the buy bar's room moved to the page end
  (TrustedByBand `max-md:pb-32`). Tab containers are `w-full` (a flex
  column had shrunk the Enterprise cards at ~400px).

**Design system**
- `Badge` labels `leading-none` (centred on 1× screens).
- `Tabs` `TabsList tone="checkout"` (line variant: green, 3px; list with
  `data-product` → that product's accent).
- `--checkout-unlimited-edge` token (plum 600).
- `SegmentedTabSwitcher` is unchanged (an `inverted` look was tried and
  removed).

## Files touched this session

- `src/hooks/use-checkout-version.ts` (new) — versions V1–V14, `lineTabs()`.
- `src/hooks/use-plan-card-style.ts` (new) — card layout / selection styles.
- `src/components/apnahire/mobile-plan-row.tsx` — `MobilePlanRow`,
  `MobileUnlimitedCard` (V3 branch), `MobileFeatureLine`,
  `MobileUnlimitedLine`, `MobileSlotLine`, `CornerTick` (V5 circle).
- `src/components/apnahire/job-plan-cards.tsx` — express phone cards,
  `tierLine`, V4 signals (`SignalBars`, `SignalKey`, `SignalRow`,
  `TIER_FOR`), V3 Unlimited selection.
- `src/components/apnahire/job-plan-selection.tsx` — express page (10%
  strip / banner, heading removed).
- `src/components/apnahire/self-checkout.tsx` — top bar, tab strip,
  `DockedPlanTabs` / `CompactPlanTabs` (V2 line tabs), 10% banner, links.
- `src/components/apnahire/enterprise-pricing-table.tsx` — V3
  `EnterpriseCompareTable`.
- `src/components/apnahire/offers/extra-off-line.tsx` — `ExtraOffBar` (V1),
  `ExtraOffBanner` (V2+).
- Also: `checkout-top-bar.tsx`, `post-job/job-posting-chrome.tsx`,
  `pricing-hero.tsx`, `prototype-settings.tsx`, both preview gears,
  `job-credit-bundles.tsx`, `database-credit-bundles.tsx`,
  `subscription-plans.tsx`, `unlimited-side-card.tsx`,
  `contact-sales-card.tsx`, `subscriber-plan-card.tsx`,
  `marketing/proof-bands.tsx`; design system `badge.tsx`, `tabs.tsx`,
  `semantic.css`, `index.css`; `AGENTS.md`, `docs/COMPONENTS.md`.

## Open / to check

- Every version, phones (2026-10-30): 8px between a price and its % OFF
  badge (`MobilePlanRow` / `MobileUnlimitedCard` price block `gap-2`, was 4px).

- Every version (2026-10-30): the "Limited time offer: Database credits"
  note is gone from express checkout's footer (only "*GST applicable";
  `DbCreditsOfferNote` is kept but unused).
- Don't run Prettier on these files: the repo has no Prettier config, so
  it reformats with defaults (semicolons, wrapping). It happened once to
  `job-plan-cards.tsx` and was reverted by patch.

- V7/V8 (boost): Classic gains a feature line, against the "nothing extra,
  no line" call; confirm. `SignalBars` is now an SVG on the 24 grid with
  2px round-capped strokes (matches the line icons; also changes V4/V5).
- V6 and later (so V7, V8): no selection, so the Recommended phone card
  keeps a 2px blue edge (`border-ribbon-fill`, the tab's colour) in
  `MobilePlanRow`. V7's multiplier icon is medium weight to match the
  strokes.
- V6 and later: `MobileMetaLine` text is `text-foreground` (dark, like
  express V6's visibility line), so "Valid for N days" and "1 active job
  slot for N days" read dark in both checkouts; icons follow the text
  unless they carry their own colour.
- Comparison artifact "Checkout versions":
  https://claude.ai/artifact/GpR3b6G39KK3x7A8MMfumX. Express V6 · V10 · V11 · V12 · V7 · V8
  (3 plans + monthly, whole Unlimited card), then self-checkout V6 vs V9
  (Jobs tab); phone-width columns, 16px apart. Source page:
  scratchpad `v6-vs-v7.html`. Captures: iPhone 14 Pro 393×852 at 2x over
  CDP (scratchpad `cdp/shot.mjs` for express, `cdp/self6.mjs` /
  `self9.mjs` for self-checkout), pricing phase `today` (localStorage
  `apnahire:pricing-phase`) so no new-price notices, Next dev badge
  removed. The subscription layout isn't stored, so the script taps
  "*GST applicable" (a `<p>`) and picks "Subscription (3 plans + monthly)".
- Bottom of the logged-in self-checkout page with the fixed buy bar
  (the new end-of-page room) wasn't captured.
- "Unlimited monthly plan" wraps to two lines at 390px when the 10% strike
  price shows (V1/V2 card).
- The desktop Unlimited card keeps the title "Unlimited job posts".
- AGENTS.md documents the shared rules above (corner tabs, 10% strip, card
  name); the version switch itself is in the hook's header comment and in
  memory (project-checkout-versions).
- V4/V5 signal rows still show missing features faded (Classic's row is
  all faded). The "no negative items" call was made for V1; ask whether it
  applies to the signals too.
- V4 key: "Top placement" fits one line now that WhatsApp's label wraps to
  two; Super premium's "2x" WhatsApp is shown only as two bars.
- Before committing: `npm run check` (lint + lint:tokens + build) — only
  `tsc`, ESLint on touched files and `lint:tokens` were run this session.
