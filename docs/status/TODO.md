# To-do — product work still to build

The running backlog. Add items as Punna names them, tick them off when they
ship, and keep one line per item. Open price questions live in
`docs/reference/PRICING.md` → "Still open".

## Order of work (prioritized 2026-11-05)
Take one at a time, top down. P0 = now, P1 = next, P2 = after, P3 = later.

1. **P0** ECC 1 · job header, ⋮ side panel (plan, preference, job details), expired/review banners
2. **P0** ECC 2 · Applied tab: pipeline counters, sort, filters (quick + "See more"), high-match group
3. **P0** ECC 3 · candidate card: matching chips, rows, actions (view number, WhatsApp, reject, shortlist), note
4. **P0** ECC 4 · candidate profile drawer: AI matching, full profile, CV, notes, sticky actions
5. **P0** ECC 5 · Database tab: AI-suggested banner, filters, select all, Excel, credit note, pagination
6. **P0** ECC 6 · journeys: no leads yet · leads arriving · expired (= "Job details journeys" below)
7. ✅ **Done** Jobs list: status chips, card states (repost, finish posting), three counts, pending actions, empty state
8. ✅ **Done** Hidden prototype-settings ingresses removed (2026-11-07)
9. **P1** Banners: one rule for which shows when and how they stack
10. ✅ **Done** Subscription city lock (edge cases not checked yet)
11. ✅ **Done** Wire plan end into the jobs list and the next post
12. **P2** Database 1 · search (manual + apnaAI), recent searches, how credits work
13. **P2** Database 2 · results with filters, save search, WhatsApp invite
14. **P2** Database 3 · saved searches + unlocked candidates
15. **P2** Invite centre: database WA invites table, job WA connects (empty + how it works)
16. ✅ **Done** Job posting confirmation pop-ups + their clay icons
17. **P3** Credits & usage page: balances, usage summary, transaction history, past plans
18. **P3** Reports: applications report + 7-day download
19. **P3** Billing: GST profile, billing history with retry payment
20. **P3** Profile page; workspace switcher (if in scope); Refer and earn
21. **P3** Plan cards: AI add-on upfront note, feature explainers (both paused)
22. **P3** Clay objects for plan pop-ups and banners; city-lock clay
23. **P3** Express: resume unlock copy, in-chat search, thread scroll, document requests

Each live-parity item: compare with live first (`docs/reference/LIVE-EMPLOYER-KB.md`, section per area), then build; done = works at 375px and desktop, `npm run check` green.
Open before ECC: keep "View number" as the green action, or make Shortlist primary?

## Job posting (context: `reference/JOB-POSTING.md`)
- [x] AI fill: a detailed description fills every stated field (negations, gender, age, perks, assets, spoken salaries)
- [x] Voice input stops dropping words (desktop) and repeating them (Android)
- [x] Pay type and salary on one screen; pay type as three tiles; "Fixed only" when no incentive is mentioned
- [x] Help lines that only repeat a card's label removed
- [x] "Continue draft" opens on the saved screen
- [ ] Test voice on a real Android phone and desktop Chrome
- [ ] Test the live AI fill (needs the Gemini key; only the keyword fill was tested locally)
- [ ] Walk every screen on desktop after the help-line removal
- [ ] Steps menu: two hand-built chips (step number, "you are here") could be `Badge` (`job-posting-chrome.tsx`)
- [ ] 13 design-system primitive candidates from the 2026-11-05 audit wait for Punna's pick

## Job details & leads
- [ ] Job list → job details flow (`/apnahire/jobs` → `/apnahire/jobs/[id]`): candidate leads, Applied | Database matches (Active leads)
- [ ] Job details journeys: no leads yet · leads arriving · after the job expires (empty states and banners for each)

## Account
- [ ] User profile section (`/apnahire/profile`)
- [ ] Credits & usage page (`/apnahire/usage`): balances, usage, invoices, history. Never a checkout entry point

## Plan cards
- [ ] Tell recruiters upfront, on the plan page, that the AI calling add-on can be added in the next step (and that it costs extra). Tried a line on each card, a line under the cards and a banner; paused 2026-10-29 until the right approach is decided. The banner is kept as `aiAddonBanner` (`job-plan-cards.tsx`)
- [ ] Explain each plan feature to the recruiter (WhatsApp notifications, Urgently hiring tag, Top placement), maybe with a visual of the tag. Tap tooltips were tried and paused (2026-10-29): they got in the way of picking a card. Text and `TapTooltip` are kept, commented out in `FeatureName` (`job-plan-cards.tsx`)

## Banners
- [ ] Which banners show at each step of the journey, and how they combine (renewal, expiry, low credits, offers); one rule for priority and stacking

## Subscription city lock
- [x] Job posting after a subscription purchase: ask the recruiter to lock the plan to one city
- [x] Once locked, it can't be changed in the product; unlocking only through customer support (or special cases, TBD)
- [x] Before locking: dashboard → available credits / balance shows "City not set", with a way to set it
- [x] Carry the locked city through every flow that reads it: job posting location, balance view, plan cards ("Valid in a single city"), upgrades

## When a plan ends
- [x] Build the plan-ended state (rules: `docs/reference/PRICING.md` → "When a plan ends"): back to credits with no lock, "Your previous plan" renew card in self-checkout, a week-long "Plan ended" banner
- [x] Wire plan end into the jobs list (mock jobs don't expire yet) and the city prompt at the next post (with "Subscription city lock" below)
- [x] Renewal payment failed: the plan ends (no blocking grace period); say why in the banner
- [ ] Credits & usage: past plans in history; later a per-plan audit (jobs posted, applies, unlocks)

## Plan pop-up illustrations
- [ ] Generate 8 clay objects for the plan pop-ups (feedback, plan-ending, plan-cancelled, change-locked, reactivate, downgrade, change-scheduled, upgrade) and swap out the stand-ins. Prompts: `docs/reference/CLAY-ILLUSTRATIONS.md` → "To generate: plan pop-ups"
- [ ] More clay icons: for banners, the remaining pop-ups, and the job posting flow wherever one fits
- [x] Job posting confirmation pop-ups still missing ("Are you sure?", "Continue?", exit/leave), each with its own clay icon
- [ ] Clay icon for the city-lock pop-up (`city-lock-dialog.tsx`, stand-in: "access")

## Lint debt (2026-11-06)
- [x] 31 `react-hooks/set-state-in-effect` warnings. Resets happen during render; browser-only reads use `useSyncExternalStore` (`useClientSnapshot`). The rule is an error again.
- [x] Phone Super premium card: "Top placement on job listing" ran under the Buy now button; benefits now wrap beside it, and `expectNoTextUnderButtons` (`e2e/helpers.ts`) checks every phone plan card

## Layout bugs (found by the browser tests, 2026-11-06; each is a `test.fixme` — remove it when fixed)
- [x] Plan cards at 320px scroll the page sideways: "Active for 15 days" now moves under the title when the panel is narrow
- [x] Job posting "Describe" screen, phones: the `ai-idle` halo now stays inside the 1rem page padding
- [ ] ECC job page, filter applied, 320px: the results bar's "· 1 filter Clear" runs 16px off screen (`e2e/app.spec.ts`). Left with the ECC phone layout (Punna, 2026-11-06). Also on the design-system score list
- [x] Homepage, 320px: the apna Database / Enterprise cards ran 17px off screen; the card grid is now `grid-cols-1`
- [x] Interview prep lounge, 375px and 320px: overflow fixed (short hero CTA on phones; the carousel's neighbour cards clipped)

## Accessibility (found by `e2e/a11y.spec.ts`, 2026-11-06)
Each is in the spec's `KNOWN` list, matched per element; delete the entry when it is fixed.
- [x] Contrast: the blue "Recommended" ribbon (`Badge` ribbon) is sky-600, 5.16:1 (also the card's blue edge)
- [x] Contrast: struck plan-card feature lines (`job-plan-cards.tsx`) use `text-muted-foreground`, the line-through kept
- [x] Contrast: the "−21%" saving (`--checkout-primary` is green-700 on light; dark stays green-500)
- [x] Contrast: green / blue links on tinted banners use the `-subtle-foreground` text
- [x] Phone plan cards (`mobile-plan-row.tsx`): a radio that contains the Buy now button (nested-interactive)
- [x] A focusable `aria-hidden` span, our own `PrototypeSettings` anchor (aria-hidden-focus)
- [x] `LogoWall` marquee scrolls with nothing focusable inside
- [x] `ToggleGroup` sets `aria-orientation` on `role=group`
- [x] Sidebar brand link has no name (`app-sidebar.tsx`)
- [x] Job metric pills and "Switch workspace": `aria-label` doesn't start with the visible text

Design-system pages (`e2e/components.spec.ts` `KNOWN`, full list in
`docs/history/SESSION-2026-11-06-QUALITY.md` §7):
- [x] Docs header "Back to apna Recruiter" link has no name (`src/app/design-system/layout.tsx`)
- [x] Select trigger on the inputs page has no name; Slider thumbs have no label (`slider.tsx`)
- [x] `table.tsx` scroll container isn't focusable on phones
- [x] Contrast: role-coloured text on `-subtle` tints uses that tint's foreground (banner links, outline badges, struck prices, soft destructive button, info badge, "Verify Identity")
- [x] Contrast: marketing eyebrow is gray; selectable-card description drops the `/80`
- [x] Contrast: Badge `default`, the green count, and the solid avatar fallback use `--cta-primary` (green-700 in dark), same as buttons. Icons and links stay on `--primary`.

## Before production
- [x] Hidden prototype settings removed (2026-11-07). "*GST applicable", "Valid till", "Candidate view" and "Resubscribe at the same price." are plain text. Express review states are `?layout=subscription` and `?credits=` (`partial`, `job4`, `ai`, `partial-ai`, `job4-ai`, `addon`, `held`). A jobs-list offer bar is `?bar=` on `/apnahire/jobs`.

## Design-system score (2026-11-08)
**Target: 8.5/10 against a production design system.** Today it is 7.5 (8.5 as a prototype). The point of this list is that score, not new product features.

Why these, and not more: contrast, CI screenshots, and the hidden preview panel are already done. What still separates this from a system someone else can change safely is a changelog and two files that are too big to review (`wizard-screens.tsx` 2,048 lines, `self-checkout.tsx` 1,075). Each task below is one move. No behavior change. The posting and self-checkout browser tests must stay green.

Done, and not to be undone (`AGENTS.md` → "Quality bar"): darker green labels, display-page demos on real roles, Linux screenshot baselines, the preview panel removed, both `KNOWN` lists empty.

Do in this order, one task at a time:

Changelog
- [ ] Add `packages/design-system/CHANGELOG.md` with one short entry for the token and contrast changes already on main
- [ ] In `AGENTS.md`, one line: a semantic token or a primitive variant gets a changelog line in the same change

Job-posting screens (`wizard-screens.tsx` stays the entry; parts go in `wizard-screens/`; `SCREENS` and the types stay exported from the entry)
- [ ] Move the shared helpers and icon maps
- [ ] Move the opening screens: describe, manual intro, title, category, industry
- [ ] Move workplace, night shift, relocation, and job type
- [ ] Move the location screen
- [ ] Move salary and pay type
- [ ] Move candidate requirements: perks, education, English, experience, preferences
- [ ] Move setup and review: screening, description, interview, contact, review

Self-checkout (`self-checkout.tsx` stays the entry and the export)
- [ ] Move the Jobs tab panel into `self-checkout/`
- [ ] Move the Database tab panel
- [ ] Move the Unlimited and Enterprise tab panels
- [ ] If the file is still over ~600 lines, move the payment and order handlers. Stop once it is under that

Not this plan. They do not move the 7.5, and each is a different stream:
- ECC, including the 320px filter bar. It stays with the ECC phone layout (Layout bugs, and the P0 ECC items above).
- Replacing browser storage (credits, slots, pricing phase) with an account API. That is a product backend, not a design-system change.
- `sidebar.tsx` (723 lines) is a stable primitive. Split it only when a change is already inside it.

## Express (recruiter chat)
- [x] Dark mode contrast: solid green badges and avatars use the darker button fill. Icons and links stay on green-500. (2026-11-07)
- [ ] Confirm the resume unlock cost and copy ("Unlock resume · 1 credit" was written for the prototype)
- [ ] Search within one chat's messages
- [ ] Open a thread at its newest message (scroll after photos load); full-contrast mic button
- [ ] Requests for documents (ID, certificates) are out of the MVP (PRD); no template asks for them. Decide if/when
