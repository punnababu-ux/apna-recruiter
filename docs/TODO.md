# To-do — product work still to build

The running backlog. Add items as Punna names them, tick them off when they
ship, and keep one line per item. Open price questions live in
`docs/PRICING.md` → "Still open".

## Order of work (prioritized 2026-11-05)
Take one at a time, top down. P0 = now, P1 = next, P2 = after, P3 = later.

1. **P0** ECC 1 · job header, ⋮ side panel (plan, preference, job details), expired/review banners
2. **P0** ECC 2 · Applied tab: pipeline counters, sort, filters (quick + "See more"), high-match group
3. **P0** ECC 3 · candidate card: matching chips, rows, actions (view number, WhatsApp, reject, shortlist), note
4. **P0** ECC 4 · candidate profile drawer: AI matching, full profile, CV, notes, sticky actions
5. **P0** ECC 5 · Database tab: AI-suggested banner, filters, select all, Excel, credit note, pagination
6. **P0** ECC 6 · journeys: no leads yet · leads arriving · expired (= "Job details journeys" below)
7. ✅ **Done** Jobs list: status chips, card states (repost, finish posting), three counts, pending actions, empty state
8. **P1** Before production: remove hidden prototype-settings ingresses
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
23. **P3** Express: dark-mode contrast, resume unlock copy, in-chat search, thread scroll, document requests

Each live-parity item: compare with live first (`docs/live-employer-kb/README.md`, section per area), then build; done = works at 375px and desktop, `npm run check` green.
Open before ECC: keep "View number" as the green action, or make Shortlist primary?

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
- [x] Build the plan-ended state (rules: `docs/PRICING.md` → "When a plan ends"): back to credits with no lock, "Your previous plan" renew card in self-checkout, a week-long "Plan ended" banner
- [x] Wire plan end into the jobs list (mock jobs don't expire yet) and the city prompt at the next post (with "Subscription city lock" below)
- [x] Renewal payment failed: the plan ends (no blocking grace period); say why in the banner
- [ ] Credits & usage: past plans in history; later a per-plan audit (jobs posted, applies, unlocks)

## Plan pop-up illustrations
- [ ] Generate 8 clay objects for the plan pop-ups (feedback, plan-ending, plan-cancelled, change-locked, reactivate, downgrade, change-scheduled, upgrade) and swap out the stand-ins. Prompts: `docs/CLAY-ILLUSTRATIONS.md` → "To generate: plan pop-ups"
- [ ] More clay icons: for banners, the remaining pop-ups, and the job posting flow wherever one fits
- [x] Job posting confirmation pop-ups still missing ("Are you sure?", "Continue?", exit/leave), each with its own clay icon
- [ ] Clay icon for the city-lock pop-up (`city-lock-dialog.tsx`, stand-in: "access")

## Before production
- [ ] Remove the hidden prototype-settings ingresses: the silent clicks on "*GST applicable" (`GstNote`, both checkouts) and the post-job "Candidate view" caption, the plan card's "Valid till" line (`SubscriberPlanCard`), the expired banner's "Resubscribe at the same price." (`PlanEndedBanner`), plus `PrototypeSettings` itself (grep `openPrototypeSettings`). Current builds are not production.

## Express (recruiter chat)
- [ ] Dark mode contrast: white text on dark --primary (green-500) and --destructive (red-400) measures 2.65–2.95:1 (unread counts, green and red buttons), under 4.5:1. Product-wide token decision, parked 2026-11-04
- [ ] Confirm the resume unlock cost and copy ("Unlock resume · 1 credit" was written for the prototype)
- [ ] Search within one chat's messages
- [ ] Open a thread at its newest message (scroll after photos load); full-contrast mic button
- [ ] Requests for documents (ID, certificates) are out of the MVP (PRD); no template asks for them. Decide if/when
