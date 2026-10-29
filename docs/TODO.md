# To-do — product work still to build

The running backlog. Add items as Punna names them, tick them off when they
ship, and keep one line per item. Open price questions live in
`docs/PRICING.md` → "Still open".

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
- [ ] Job posting after a subscription purchase: ask the recruiter to lock the plan to one city
- [ ] Once locked, it can't be changed in the product; unlocking only through customer support (or special cases, TBD)
- [ ] Before locking: dashboard → available credits / balance shows "City not set", with a way to set it
- [ ] Carry the locked city through every flow that reads it: job posting location, balance view, plan cards ("Valid in a single city"), upgrades

## When a plan ends
- [x] Build the plan-ended state (rules: `docs/PRICING.md` → "When a plan ends"): back to credits with no lock, "Your previous plan" renew card in self-checkout, a week-long "Plan ended" banner
- [ ] Wire plan end into the jobs list (mock jobs don't expire yet) and the city prompt at the next post (with "Subscription city lock" below)
- [x] Renewal payment failed: the plan ends (no blocking grace period); say why in the banner
- [ ] Credits & usage: past plans in history; later a per-plan audit (jobs posted, applies, unlocks)

## Plan pop-up illustrations
- [ ] Generate 8 clay objects for the plan pop-ups (feedback, plan-ending, plan-cancelled, change-locked, reactivate, downgrade, change-scheduled, upgrade) and swap out the stand-ins. Prompts: `docs/CLAY-ILLUSTRATIONS.md` → "To generate: plan pop-ups"
- [ ] More clay icons: for banners, the remaining pop-ups, and the job posting flow wherever one fits
- [ ] Job posting confirmation pop-ups still missing ("Are you sure?", "Continue?", exit/leave), each with its own clay icon
- [ ] Clay icon for the city-lock pop-up (`city-lock-dialog.tsx`, stand-in: "access")

## Before production
- [ ] Remove the hidden prototype-settings ingresses: the silent clicks on "*GST applicable" (`GstNote`, both checkouts) and the post-job "Candidate view" caption, the plan card's "Valid till" line (`SubscriberPlanCard`), the expired banner's "Resubscribe at the same price." (`PlanEndedBanner`), plus `PrototypeSettings` itself (grep `openPrototypeSettings`). Current builds are not production.
