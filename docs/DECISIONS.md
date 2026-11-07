# Design decisions log

Questions we have already worked through, so the next person with the same
idea starts from the answer. One entry per question: the question, what we
decided (or are leaning to), why, and what would change the answer. Newest
first. Status: **Decided**, **Leaning** (recommendation, not yet signed off)
or **Open**.

---

## Tinted text, and darker buttons in dark mode (2026-11-07)

- **Decision:** text on a tinted fill uses that tint's foreground (`-subtle-foreground`), not the solid role colour and not `-foreground`. The marketing eyebrow is gray. The selectable-card description drops its `/80` fade. In dark mode only the button fills get darker: green buttons `--cta-primary` green-700, red buttons `--cta-destructive` red-700. `--primary` and `--destructive` stay the bright colours used for text and icons.
- **Why:** the solid colour on its own pale tint was under 4.5:1. Darkening the shared green or red would dim every icon and link. White text only fails on the button fill, so only the fill changes.
- **Left:** Badge `default` and Avatar fallback still use `--primary` (green-500) with white text in dark mode, about 3:1.
- **Status:** Decided (Punna, 2026-11-07: proceed with the suggestion).

## Light-mode contrast: the four faint spots (2026-11-06)

- **Decision:** the four light-mode contrast fixes, accepted together. The Recommended ribbon is sky-600 (white text 5.16:1), which also darkens the recommended card's blue edge. Struck-out plan features drop the `/60` fade and keep the line-through. Plan-page green text (`--checkout-primary`) is green-700 on light, so the "−%" on an upsell tile clears 4.5:1; dark stays green-500. Links on green and blue tinted banners use the text colour meant for that tint (`-subtle-foreground`).
- **Why:** each was under 4.5:1. Darkening the shared green text, rather than only the "−%", keeps one green for ticks, the selected tab and the saving.
- **Would change it:** if the darker green text or the darker blue edge reads too heavy next to the cards.
- **Status:** Decided (Punna, 2026-11-06: go with the proposal).

## Phone plan card: a long benefit beside Buy now (2026-11-06)

- **Question:** at 320px Super premium's "Top placement on job listing" (no-wrap) ran under the Buy now button. Move the button under the benefits, or let the benefit wrap?
- **Decision:** the benefit wraps inside its own line, beside the button (`MobilePlanRow`, `[&_li]:whitespace-normal`); the button stays bottom right on every card, at every width.
- **Why:** each benefit already has its own line there, so the no-wrap only guarded a dotted row that isn't used in this card; the database credits line wraps the same way. Moving the button under the lines by container width either stacked it at 360/375px too or left an overlap at 344–349px. A wrapping row put Annual's button under its lines while Monthly's sat beside, so cards in one list differed (text rule 2).
- **Would change it:** a benefit too long for two lines at 320px, or a call to keep every benefit on one line: then shorten the copy for phones (text rule 4).
- **Status:** Leaning (agent fix, for Punna to confirm).

## Dark mode pricing coherence (2026-11-06)

- **Question:** on dark, the plan area used three plums (a 40% panel, a solid Unlimited panel, plum-800 cards) on a page whose other cards (login, FAQ) are one frosted glass; the selected tab washed out, the Recommended label failed contrast, and order-summary details looked off.
- **Decision (dark mode only; light untouched):**
  - Plan panels and tracks (tab bar, Job credits and Unlimited panels, the 1/2/3 switch) take the page glass (`--surface-glass`). Plan cards go one step lighter, plum-700 (`--surface-plan-card`), and stay solid: plan cards are never frosted (2026-10-19 rule).
  - The Recommended label is a lighter blue, sky-300 (`--ribbon-fg`): 5.3:1 on its fill (sky-400 was 4.2:1).
  - Phone pricing chips (`/pricing` below md) keep their earlier look: `--checkout-chip` (card at 40%) and `--checkout-chip-pill` (plum-800), apart from the glass track. The app's phone chip rows follow them. Sticky tabs and desktop tabs are unchanged.
  - Order summary: the coupon field has no fill of its own on dark (the Input's `dark:bg-input/30` showed as a box behind the hint). The database chips' unselected fill is `--chip-on-tint` (plum-800), not `--background`, which read as holes.
  - `Button variant="emphasis"` on dark is lavender: plum-300 fill, plum-200 hover, plum-950 label (9.3:1). Gray-700 sat at about 1.5:1 on the plum cards, so an add-on's "Add" faded. The `data-surface="dark"` white inversion is unchanged.
- **Why:** one surface for the whole plan area, cards lifted off it by one step; every label at 4.5:1 or more; the companion CTA visible on plum.
- **Trade-off accepted:** lavender is brighter than the green primary, so an emphasis button can draw the eye before "Proceed to pay" (the AI calling "Add" beside it; the phone header's "Login / Sign up" above the hero's green one). This bends the one-standout rule (Hick / Von Restorff in AGENTS.md).
- **Header:** Punna accepted the header's lavender "Login / Sign up" sitting above the hero's green one on the phone homepage and pricing page in dark mode; it stays lavender like every other emphasis button (2026-11-06).
- **Would change it:** if users pick the add-on or header CTA over the primary more than expected, or reviews say the green no longer leads, move emphasis to a dimmer lavender (plum-400/500 with a light label) or back to a raised gray.
- **Status:** Decided (Punna, 2026-11-06).

## Splitting a large file: keep the entry, add a sibling folder (2026-11-06)

- **Decision:** a file over ~600 lines is split by moving code only. The original `foo.tsx` stays at its path with the same exports; its parts go in a sibling `foo/` folder (no `index.tsx`, so old imports still resolve). Applied to the four OnlyRounds files (`candidate-drawer`, `job-details-step`, `interview-rounds-step`, `create-job-wizard`).
- **Why:** no importer changes, so the split can't break callers and its diff is easy to review; before/after screenshots prove no visual change.
- **Would change it:** if the package grows a public barrel per folder, switch to `foo/index.tsx`.
- **Status:** Decided.

## Logo marquee under reduced motion: one still row, not wrapped (2026-11-06)

- **Decision:** with reduced motion on, the moving logo strip stops and stays one row, clipped at the edge (as before). It is clipped, not scrollable, so axe has no scroll region to flag.
- **Why:** wrapping every logo into rows added about 280px (express) to 520px (self-checkout) to phone pages, for a decorative strip.
- **Would change it:** if the logos ever need to be readable in full for reduced-motion users.
- **Status:** Decided (Punna, 2026-11-06).

## Accessible names start with the visible text (2026-11-06)

- **Decision:** a control's accessible name is its visible text; extra context is sr-only text after it, never an `aria-label` that replaces it (job metric pills, workspace switcher). A phone plan card with its own Buy now button is not `role=radio` (an interactive inside an interactive); the card keeps the tap, the button is the keyboard route.
- **Why:** voice-control users say what they see; a different `aria-label` breaks that (axe `label-content-name-mismatch`). Nested interactives confuse screen readers.
- **Status:** Decided. Colour-contrast shades (ribbon, struck lines, −% on tiles, links on tints) are **Open**, awaiting Punna; proposals in `history/SESSION-2026-11-06-QUALITY.md` §5.

## How the repo is tested, and what CI blocks on (2026-11-06)

- **Decision:** GitHub Actions runs lint, token lint, unit tests, the build and the Playwright layout + accessibility tests on every push to main and every PR. Screenshot (`@visual`) tests run only locally. Known bugs are `test.fixme` with a reason, known axe violations are matched per element in `e2e/a11y.spec.ts`'s `KNOWN`; a check is never weakened to pass.
- **Why:** the gates only worked when someone remembered `npm run check`. Layout bugs (a nowrap label, a halo) were invisible to type checks and to the eye; measuring caught them. Screenshot baselines are macOS renders, and Linux font rendering would fail them every run.
- **Would change it:** a Linux baseline set (Playwright's Docker image) would let CI run `@visual` too.
- **Status:** Decided (Punna asked for CI and tests, 2026-11-06).

## Dependency upgrades: take minor fixes, skip forced downgrades (2026-11-06)

- **Decision:** Next.js 16.2.3 → 16.4.5 (critical advisory) and `npm audit fix`; not `npm audit fix --force`, which proposes downgrades (eslint-config-next 15, shadcn 1). A dev-only advisory (brace-expansion under eslint) is accepted.
- **Why:** the minor upgrade passed build, lint and every browser test; the forced ones would break tooling for advisories that never reach users.
- **New lint rule** `react-hooks/set-state-in-effect` (31 hits) is a warning until fixed (TODO.md → "Lint debt").
- **Status:** Decided.

## New job, no applicants: show active leads from the database (2026-11-06)

- **Decision:** the Applied tab of a job with no applications shows "Finding the right candidates" (clay, one line) and an "Active leads for this job" card: the database credit balance, three top database matches (AI-look header strip, active status, role, company, area, experience, salary), a "+N more · View all leads" tile and "1 profile unlock = 1 database credit". A profile opens the Database tab with it highlighted; View all opens the tab with active leads first.
- **Why:** applications take time; the recruiter can act right away on matches that are likely to answer. Credits show where they're spent (unlocks), never on applicants.
- **Same parts as checkout:** the balance is the express checkout's chip (`AvailableCreditsButton chip kinds={["database"]}`, UserSearch icon, opens the same panel); the cost line uses the panel's wording, "1 database credit unlocks 1 profile".
- **Status:** Leaning. Leads and balance are mock; the Database tab is built next. Preview with `?applicants=0`.

## Filtered list: one results bar with bulk actions (2026-11-06)

- **Decision:** once a filter, a search or a selection is active, the match sections give way to one pinned results bar: select-all · "Showing N of M candidates" (or "N selected") · "N filters · Clear", and Excel + WhatsApp on the right once anything is selected. Every card has a checkbox. The filter panel is capped to the room under the job header and scrolls inside.
- **Why:** the recruiter needs the count of what the filters left, and a filter must stay visible after the panel closes; the pinned bar does both. Bulk Excel and WhatsApp exist on live and act on a picked set.
- **Would change it:** if recruiters still want match sections inside filtered results.
- **One reset at a time:** the bar's Clear shows only while the filter panel is shut; open, the panel's "Clear all" is the one reset (Hick).
- **Status:** Leaning. Excel and WhatsApp are toasts in the prototype.

## Match-section bars dock like the homepage nav (2026-11-06)

- **Decision:** on the job page's detailed list, each match bar is a rounded pill at rest; pinned under the job header it stretches to a square full-width bar with a shadow, and the next section's bar pushes it out. Hand-off: the incoming bar docks (goes full width) one bar-height before it meets the pinned one, and the outgoing bar stays full width until its section has scrolled past, so the two never change shape in opposite directions ("flapping bird", user call 2026-11-06). It sits above the cards' action buttons, below the job header. In the side-filter preview, the filter panel sits on the right, under Filters + Relevance; the status chips sit on the left.
- **Why:** one docking pattern across the product (site-header's pill → bar); the section stays named while its cards scroll.
- **Status:** Leaning. The docked bar spans the content column, not under the sidebar edge to edge like the job header.

## The green active dot means "active in the last 24 hours" (2026-11-06)

- **Decision:** one component, `ActiveStatus`: now / minutes / hours / today → green dot, dark text; yesterday and older → no dot, grey text. Candidate cards and active-lead cards use it.
- **Why:** "Active today" had a dot and "Active 2 hours ago" didn't; the dot must follow recency, not wording.
- **Status:** Decided.

## Match chip says the level, not a percentage (2026-11-06)

- **Decision:** "High match" / "Medium match" / "Low match" ("High" on phones) beside the bars, on cards, compact rows and the table. No %.
- **Why:** the recruiter acts on the level; 88% vs 92% is false precision.
- **Status:** Decided.

## Candidate card: a Z read, recency beside the match (2026-11-06)

- **Decision:** the header is two rows a side: name ↔ match chip, facts ↔ "● Active today · Applied N days ago". The AI panel is one line: "✦ AI match (4/4)" followed by the ticks.
- **Why:** recruiters call the freshest strong matches first, so activity sits with the match where the call is made; a two-row right column matches the left and leaves no empty space under the facts. "Meets N of M requirements" repeated what the ticks show.
- **Status:** Leaning.

## Job page toolbar: side filters, tools split by scope (2026-11-06)

- **Question:** where search, filters, sort, view and the status chips sit once filters move to a left panel.
- **Decision (preview, `?filters=side`, desktop):** Applied / Database tabs get icons and the self-checkout tone (green label + underline). Search (an icon that expands) and the view toggle sit opposite the tabs, so search reads as "within this tab". Under them: Filters + Relevance on the left, above the panel; status chips on the far right. The panel pushes the cards right.
- **Why:** tools that act on the whole tab sit with the tabs; tools that narrow the list sit with the panel that narrows it. The tabs were too quiet to read as the page's main split.
- **Would change it:** usage showing search is the main entry (then keep the full field); the filter data still to come.
- **Status:** Leaning (tab styling applies everywhere; the layout is preview only). Competes with option E (icon tools in the chip row).

## One look for AI: the sky gradient + sparkle (2026-11-06)

**Status:** Decided (Punna). Built for AI match; the rest to follow.

**Decision.** Every AI element (AI match, AI summaries, AI screening
marks) uses one look: the AI calling add-on's sky gradient
(`bg-gradient-ai`) behind it and a `Sparkles` icon in sky (`text-info`).
It is its own token (`--gradient-ai`), not `bg-gradient-product-ai-calling`.

**Why.** Recruiters should learn "sky + sparkle = the AI did this" once
and spot it everywhere. A separate token because product gradients belong
to their product (AGENTS.md); sharing the value keeps the family.

**More vivid (same day, Punna):** `--gradient-ai` is now sky 200 into a
touch of violet (navy 100), changed once for every AI surface, and the AI
calling add-on and the Premium + AI plan block moved onto it.

**Watch.** Keep it to small surfaces (a panel, a tag). On every card a big
gradient would stop standing out (Von Restorff).

**Applied (same day):** the job card's AI match panel; chats' AI avatar
(gradient + sky sparkle), AI screening status icon, AI preview mark, AI
summary chip, summary pop-up text panel and suggested replies; job
posting's drafting sparkle, "AI suggestions" and "Ask AI to change
something". Left as they are: the "AI-filled · check it" badge (already
the sky `info` badge), the "+AI" tag (its own vivid sky → green so a small
tag reads), the moving AI backdrop and voice pill (motion states), and
every "Recommended" sparkle (not AI).

---

## Candidate card: four zones for scanning (2026-11-06)

**Status:** Decided (Punna asked for a clear hierarchy). Built.

**Problem.** Everything had the same weight: requirement chips were
outlined pills like the Call status button, the viewed number floated with
its Copy and QR apart, and labels ("Current / latest") took a column.

**Decision.** One card, four zones, top to bottom:
1. **Who + how well:** name ›, facts (foreground), "Applied … · Active …"
   (small, muted) · the match chip.
2. **Why:** a muted panel titled "✦ AI match · Meets N of M requirements"
   (violet sparkle; live calls it AI matching, and we show the AI, user
   call 2026-11-06; the profile's section is "AI match" too), then the job's
   requirements as text with a green ✓ or a red ✕ (missing ones struck
   through). Text, not pills, so nothing there looks clickable.
3. **Background:** latest job and education, each with an icon; no label
   column.
4. **Act:** under a rule. Contact on the left (View number, or the number
   as one joined control: phone · number · copy | QR), WhatsApp, Call
   status; Reject / Shortlist on the right.
"Add a note" left the card; it stays in the profile.

**Why.** Common practice for list cards: group by question (who, why,
what next), one emphasis per zone, actions in a separate bar, and
controls styled unlike information.

---

## Candidate avatars: photos, else a tinted initial (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** Candidates show their photo when they have one (sample:
Unsplash photos from the chats set, `public/images/chats/CREDITS.md`).
Without a photo, the initials take one of three tints, sky · violet ·
plum, picked from the name so a person keeps their colour everywhere
(`avatarTone`). Applies to job leads, the compact list, chats and the
profile panel.

**Why.** All-grey initials looked the same, so candidates were hard to
tell apart. Green, amber and red are left out because they already mean
match level and actions on the same cards; gold reads as amber.

---

## After View number: call on phones, copy + QR on desktop, call status (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.**
- **Phones:** one outline button with the number that calls it (tel:).
- **Desktop:** the number, a Copy button and a QR button. The QR opens a
  pop-up ("Call {name}", contact clay) with a code to scan with a phone.
  Copy toasts "Number copied". As on live.
- **Both:** a "Call status" menu after WhatsApp: Answered · Not connected ·
  Invalid number. The button then shows the chosen status. As on live.
- The QR is drawn in the browser (`qrcode` package), not by a web service:
  the old OnlyRounds QR used api.qrserver.com, sent the number out and
  showed blank (parked bug).

**Why.** A desktop can't place a call; copy or scan gets the number to the
phone. On a phone, calling is one tap, so copy and QR are noise. Call
status lets the recruiter track who they reached.

**Where.** `src/components/apnahire/jobs/contact-number.tsx`; used by the
card, the profile panel and the table (table: number, copy and QR only).

---

## Applicants are free: no unlock, no credit (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** On a job's Applied tab, View number is free and the resume is
open: no "Unlock", no credit, no "credit used" toast. Credits apply only
when the recruiter finds candidates in the Database tab and unlocks them.

**Why.** Applicants came to the job themselves; they are the job's own
leads. Charging for them would charge twice for one job post.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (toThread gets
resumeUnlocked true; no credit toasts).

---

## Candidate card: whole card opens the profile, match leads (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.**
- No "View profile" / "View profile and resume" link. The name carries a
  chevron, and a click anywhere on the card opens the profile. View number,
  WhatsApp, Reject, Shortlist and Add a note sit above that target.
- The match ("92% match" with bars) takes the top-right corner at 16px
  semibold, where the link was.
- The card does not lift on hover: it holds several actions of its own
  (AGENTS.md, "a card that isn't a target as a whole never lifts").

- Card hierarchy (Punna, same day): who + match · key facts · "Meets N of
  M" with ticked chips, then "Missing: …" in red when not all are met ·
  Current / latest and Education · actions · applied, active, note.
  Skills and languages moved to the profile, which now also shows
  Current / latest and Active (it had come from chats without them).

**Why.** Recruiters click the card anyway; the link repeated that and
took the spot the match deserves. Match is what they sort and decide by.

**Where.** `src/components/apnahire/jobs/applicant-card.tsx`.

---

## Job page filters: which show upfront (2026-11-06, revised with follow-up data)

**Status:** Decided (Punna, 2026-11-06); built in the job page's side panel (`?filters=side`). On the Applied tab the job's values are tagged "From your job" but not ticked: everyone there applied to this job, so a prefill would only hide people.

**Data.** ECC filter adoption follow-up, 7 Oct – 5 Nov 2026, 22,431
recruiters landing on the Database matches tab (`eccjob`). "Changed"
now counts clearing a filter; session key `base_query_id`. The Applied
tab has no events at all, so these numbers stand in for it.

| Filter | Changed | Set | Note |
|---|---|---|---|
| Any filter | 28.0% | 37.8% | |
| Education level | 19.4% | 35.5% | 65% of set values are the job's prefill |
| City | 19.2% | 37.0% | 53% recruiter-chosen: deliberate |
| Salary | 16.7% | 30.6% | 79% prefill; prefill removed on 55% of rows |
| English level | 14.1% | 28.9% | halves on phones |
| Location distance | 13.3% | 38.6% | the most-set filter; was missing before |
| Experience | 13.2% | 22.0% | halves on phones |
| Area | 13.0% | 18.7% | |
| Age | 11.4% | 22.4% | |
| Gender | 10.7% | 20.3% | |
| Last active | 9.6% | 12.7% | never prefilled: every value is chosen |
| Industry · Languages · Must-have keywords | 6–7% | | |
| Departments · Hide · Exclude keywords · Degree · Job preference · Companies · Notice period | ≤3% | | |
| Job title | 0% | | key always empty: broken or unreachable |

Recruiters who filter unlock more in every activity bucket (1.5–2.8×
view-number rate). Correlation, not cause.

**Decision (leaning).**
- **Top of the panel, open by default:** Location (city, area and
  distance as one group), Education, Salary, English level, Experience.
- **Next, open:** Age, Gender, Last active (low volume, but always a
  deliberate choice; it pairs with the green active dot).
- **Collapsed "More filters":** Industry, Languages, Departments, Degree,
  Companies, Notice period, Job preference, Hide candidates.
- **Keywords** (must-have, exclude) go to 🔍 search.
- **Drop Job title** until product checks why it's always empty. Role /
  category doesn't exist in the data.
- **Prefill:** values from the job show as "From your job" and come off
  in one tap. Don't prefill salary (removed on 55% of rows); keep city.
- **Phones:** short option lists stay inline (they hold up on mobile);
  long pickers open their own searchable sheet (they collapse to half).
- **Instrument the Applied tab** before trusting any order there:
  `applicants_tab_shown`, `applicants_filter_applied`,
  `applicants_status_tab_clicked`, `applicants_filter_cleared`.

**What would change it:** Applied-tab events showing a different order;
settling `eccjob` vs `experienced/fresher/any` scope (moves every number).

## Job page header: 3 rows, status stays its own row (2026-11-06)

**Status:** Leaning, now option E (Punna, 2026-11-06): search, filter
and sort narrow or order the same list as the status chips, so they share
the chips' row as one compact icon group (🔍 · filters with a count · sort ·
view ▾). Applied filters show as removable chips under it only when set.
Phones: chips scroll, then 🔍 and one ⚲ that opens a sheet with filters,
sort and view. Icons carry the state (Punna): the sort button shows the
chosen order's icon (Relevance = arrow + sparkle, Recently applied = arrow +
clock) and the view button the chosen view's icon; a click opens a menu that
names every option in words. Each icon button has an aria-label naming the
current choice ("Sort: Relevance") and the same text as a tooltip. Live has 18 filter
groups (docs/reference/LIVE-EMPLOYER-KB.md), too many for a dropdown: ⚲ opens
a side panel on desktop (SheetPanel, sections, Clear all, "Show N
candidates") and the bottom sheet on phones. Was
option D (Punna's idea, 2026-11-06; wireframe
`.screenshots/job-header-wireframe.html`): live's structure. A header band
(title, details, Edit / ⋮, Applied | Database tabs), then per tab a status
chip row and a filter bar (live's left filter column as inline filter chips
plus "+ More"; search, sort and view at its right end). Database gets the
same bar with its own chips and filters. Familiar to live users, and the
list gets the full width. The notes below are the earlier proposal.

**Question.** Put the view switch on the title row beside Edit / ⋮? Merge
the tools row and the status row? Move the statuses into Filters?

**Recommendation.**
- **View switch stays with the list tools**, not on the title row. Edit and
  ⋮ act on the job; the view acts on the candidate list. Controls sit next
  to what they change.
- **Status stays visible, as its own row.** "Action pending" is the
  recruiter's to-do list, and the counts tell them what is waiting. Inside
  Filters it takes a click to see, and it breaks the decided match with the
  jobs list's status tabs (entry below).
- **Filters keep the attributes only:** show candidates who (match, have a
  resume, tried to contact you, are featured), applied in, English level.
- **Phones already merge** status and tools into one row (chips + "Sort &
  filter").

**What would change it.** If recruiters rarely switch status (usage data),
a status dropdown ("All 7 ▾") in the tools row makes desktop 2 rows.

---

## Job page back button: phones only (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** The back button beside a job's title shows on phones only
(`md:hidden`). Desktop has none.

**Why.** On phones the job page is full screen with no top bar, so the back
button is the only way out. On desktop the top bar's breadcrumb ("Jobs ›
job title") and the browser's own back already do it; a third back control
is noise. Fits "Full screen for tasks, sidebar for workspaces" below.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (header).

---

## Sort and view switch: one sort button, outline toggles (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** On a job's Applied tab, beside the status filter:
- **Sort** is one control: an outline button "⇅ Relevance" that opens a
  "Sort by" radio menu, the same as the chats inbox's sort. Not a "Sort by"
  label outside a grey select.
- **View switch** (detailed · compact · table) is the design system's
  `ToggleGroup` with `variant="outline"` on white: the chosen view gets the
  green edge and tint.

**Why.**
- A label outside its field reads as two things; one button names the
  current order and opens the choice.
- A grey select on the grey page faded out. White outline controls stand
  out the same way as Filters beside them.
- The default toggle marked the active view with a faint grey that was hard
  to see. The outline pressed state (green edge + tint) is the system's
  "chosen" look (ChipTabs choice, OptionCard).
- Same sort control as chats, so sorting works the same on both pages.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx`; pattern from
`src/components/apnahire/chats/chat-inbox.tsx` (sortMenu).

## Job posting: a salary without incentives means "Fixed only" (2026-11-06)

- **Question:** When the description gives a salary and doesn't mention incentives, should auto-fill pick a pay type?
- **Decision:** Yes. Salary only → "Fixed only". Salary plus incentives → "Fixed + incentive". Incentives only → "Incentive only". This replaces the 2026-11-05 call that nothing should be pre-selected.
- **Why:** Most jobs pay a fixed salary. If the recruiter doesn't mention incentives, there almost never are any. Leaving the field blank just adds a question they have already answered.
- **What would change it:** Data showing that many recruiters who post a salary only go on to add incentives.
- **Status:** Decided (Punna).
- **Follow-up (same day):** pay type is now three tiles in one row: icon and label, no help line, always visible. Recruiters see the incentive options even when Fixed is pre-selected. Help lines that only repeated their card's label were removed (job type, work from office/home, interview type). Lines that add something were kept (the Field job hint, joining fee, contact number).

---

## Job candidates: three views — detailed, compact, list (2026-11-05)

**Status:** Decided (Punna). Default view still open: detailed today.

**Decision.** A job's Applied tab has three views, switched beside Sort by:
- **Detailed:** full cards (facts, matching chips, details, actions).
- **Compact:** chats-style rows (`ConversationRow`); a row opens the profile.
  From 1024px the profile sits beside the list; below it opens as a panel.
- **List:** a table (`ApplicantTable`) to compare many at once. Tablet and
  up only; on phones a "list" pick shows as compact.

**Why.** Full cards show everything up front and get heavy with many
candidates. A drill-down (as in Workable and in our own chats) is cleaner,
but some recruiters compare in a table (the OnlyRounds table was missed when
it was removed). A table doesn't fit a phone.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx`,
`src/components/apnahire/jobs/applicant-card.tsx`, `applicant-table.tsx`.

---

## Match levels: signal bars, one order, one "Low matches" divider (2026-11-05)

**Status:** Decided (Punna).

**Decision.**
- Match shows as three rising bars (`MatchBars`): high 3 green, medium 2
  amber, low 1 red (unfilled bars: the text colour at 25%, since grey
  vanished on the tinted chip; 2026-11-06), with the score ("88% match"; "88%" on phones).
- Score to level: 75+ high, 50–74 medium, under 50 low (`matchLevel`).
- With Relevance, candidates run from highest score to lowest, with a
  section header opening each level: "High matches 3", "Medium matches 2",
  "Low matches 2" (bars + title + count). **Changed 2026-11-06 (Punna):**
  the single thin "Low matches" divider hid that the top of the list is the
  high matches; each section is now named and visible.
- **Match label: a tinted chip top right** (Punna, 2026-11-06): bars +
  "92% match" in a Badge whose tone follows the level (success / warning /
  destructive). Tried and dropped: plain text (too quiet) and a corner tab
  like the plan cards' Recommended (that tab marks the one recommended
  choice; on every card it would mean nothing).
- Chats uses the same bars in the thread header (it had a trend icon).

**Why.** Sections by card style didn't read accurately. One linear order
with a level mark on every candidate is easier to scan, and the signal-bar
metaphor is already familiar. One mark for match across leads and chats.

**What would change it.** Real scoring from the matching model may need
different thresholds; change them in `matchLevel` only.

**Where.** `src/components/apnahire/match-bars.tsx`.

---

## One candidate profile for chats and a job's leads (2026-11-05)

**Status:** Decided.

**Decision.** A job's candidate profile is the chats "Candidate 360" panel
(`CandidateProfilePanel`), fed by an adapter (`toThread`). On leads the
panel's Call is replaced by View number · WhatsApp · Reject · Shortlist
(`ApplicantActions`), and notes / resume unlocks use the page's handlers.

**Why.** Leads and chats show the same person; two profile designs would
drift. One panel keeps the facts, sections and copy identical.

**Where.** `src/components/apnahire/chats/candidate-profile-panel.tsx`.

---

## Candidate card actions: View number stays the green action (2026-11-05)

**Status:** Leaning (live's choice kept; not yet confirmed by Punna).

**Decision.** As on live employer.apna.co: View number is solid green;
WhatsApp is an icon; Reject and Shortlist are neutral outline buttons with
a red ✕ and a green ✓ (Punna, 2026-11-06: the red and green tints fought the
match chip, which is now the card's one tinted mark). Once decided, a status tag replaces Reject and Shortlist. On
phones the pair takes its own row in equal halves.

**Why.** Contacting the candidate is what most recruiters do first, and it
matches live, so the switch costs nothing to learn. Open alternative:
Shortlist as the green action.

---

## Candidate status filter: use the jobs list's tabs (2026-11-05)

**Status:** Decided (Punna, 2026-11-05). Built.

**Decision.** The All · Action pending · Viewed number · Shortlisted ·
Rejected filter uses the same control as the jobs list's status filter:
`Tabs variant="inverted"` on desktop (grey track, white pill that slides to
the choice), `MobileChipRow` on phones. Not coloured chips per status, not
big pipeline cards.

**Why.**
- **Familiar interaction across pages.** A recruiter filters jobs by status
  on the jobs list, then opens a job and filters candidates by status. The
  two filters are one click apart, so they must look and behave the same:
  same track, same sliding pill, same counts in the label. Nothing new to
  learn, and the second page feels like part of the first.
- **One pattern, one component** (AGENTS.md "Same pattern, same
  component"). The earlier `ChipTabs` drew the same kind of filter a second
  way and read flat.
- Per-status colour would compete with the match bars and status tags; big
  counter cards would push the candidates down the screen.

**Optional, not built.** An unread dot on "Action pending" for new
candidates, as on the jobs list's count.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (pipeline row),
same control as `src/app/apnahire/(product)/jobs/page.tsx`.

---

## Should a job's details page open full screen, without the sidebar? (2026-11-05)

**Status:** Leaning. Recommendation given; Punna to confirm (and maybe Sumit).

**Question.** Job posting opens as its own page with no sidebar. Should
clicking a job in the jobs list do the same: a full page with a back button
and no sidebar?

**Recommendation.**
- **Desktop:** keep the sidebar on the job's details page (the ECC: Applied
  and Database tabs). Optionally collapse it to its icon rail on this page to
  give the compact split view and the table about 180px more, and restore it
  on the jobs list.
- **Phones:** already full screen (no bottom bar, back button in the header).
  Keep it.

**Why: tasks vs workspaces.** The common SaaS rule:

| | A task: no sidebar | A workspace: sidebar stays |
|---|---|---|
| What it is | Has an end: done, posted, paid | You live in it and move between things |
| Examples here | Posting a job, checkout, onboarding | A job's candidates, chats, database |
| Why | Fewer exits, fewer drop-offs | Recruiters move between jobs, chats and database all day |

Job posting is a task with a finish line, so full screen is right there. A
job's candidate list is a workspace: recruiters spend sessions in it, go to
Chats to reply, check database credits, and come back. Hiding the sidebar
would make each of those trips longer.

**What the market does (from general knowledge, not re-checked).** Applicant
tracking systems such as Workable, Greenhouse, Lever, Ashby and LinkedIn
Recruiter keep their main navigation on a job's pipeline page and go full
screen for creating a job or for focused modes. Before quoting this outside
the team, check each product's current UI.

**Already in place.** Desktop has a back button and a breadcrumb ("Jobs ›
job title") on the job page, so the way back is covered without removing the
sidebar.

**What would change the answer.** If usage data shows recruiters mostly
process one job's candidates in one sitting and rarely leave for other
sections, a full-screen job page becomes a better fit. Check that before
switching.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (the job page),
`src/app/apnahire/(wizard)/` (job posting, full screen).

## Job posting: pay type and salary on one screen (2026-11-06)

**Decision.** The three pay-type cards show first. A pick turns them into the
quiet "icon · Fixed + incentive · Change" line (the joining fee's style) and
the amount fields slide in under it. Change opens the cards again and hides
the fields. The separate pay-type screen is gone.

**Why.** One less step, and the answer you just gave stays in view. A quiet
line is enough because the recruiter tapped it a moment ago; the amount is
the open question.

**Where.** `PayTypePicker` and `Salary` in
`src/components/apnahire/post-job/wizard-screens.tsx`; old drafts on
`pay-type` open on `salary` (`post-job-flow.tsx`, RENAMED).
