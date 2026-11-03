# Checkout, 2026-11-02 → 11-03: one version, Buy now on every phone card

Follows `docs/SESSION-2026-10-30-CHECKOUT.md` (express V11, self-checkout
V14). This round ended every remaining variant: the checkouts now have one
design, in code, with no switch. Use this file with the design-variants
skill's "Audit: the current version" checklist to get back here quickly.

## Where it landed

**Phone plan cards (`MobilePlanRow`), both checkouts, every tab**
- Price row, right-aligned: `−22%` (green semibold text) · struck price ·
  price, on one centre line. The struck price and % appear only when
  there is a saving (express: only once the 10% offer is claimed).
- Every card ends in its own green `Button variant="checkout" size="sm"`
  "Buy now", bottom right. Enterprise says "Contact sales". This is Sumit's
  call, overriding the one-green recommendation: an exception to the rule, phone plan lists only (AGENTS.md,
  "Two primary (green) CTAs"): no hover on a phone to light one CTA up, and
  each card is its own purchase; the Recommended tab marks the pick.
- Layout: name | price; meta under the name (4px); a rule; then the
  benefits stacked one per line, 12px under the rule, the button beside
  the last line. The button takes only a text line's height (`-my-1.5`),
  so a one-line card (Classic) isn't pushed down.
- A card with no benefits list puts its per-unit price under the rule
  instead ("₹650 /credit", blue), so the button still sits at the bottom:
  self-checkout job credits, database credits.
- Padding with a button: 12px top (24px under the Recommended tab), 16px
  bottom.

**Express checkout (`job-plan-cards.tsx`)**
- Alerts on every job type, phone and desktop: Classic "1x alerts to
  candidates", Premium "2x alerts to candidates", Super premium "4x
  alerts to candidates" (`TIERED_ALERTS`). On desktop Classic's alerts
  row is included (no ✕). The "What each job type gets you" dialog uses
  the same words.
- Not changed: "Premium job + AI calling" (credit holders only) still says
  "WhatsApp alerts to candidates".

**Self-checkout**
- Jobs: per-credit price under the rule, Buy now beside it.
- Unlimited tab: inline −%, Buy now on every plan but the subscriber's own
  (Manage plan's labels and disabled states still apply). The button buys;
  a tap on the card still selects.
- Database: same structure as the job credit cards.
- Enterprise: "Contact sales" on every card.

**Database plans** (`DB_BUNDLES`, prices only; the same today and from
Jan 1): 200 credits ₹1,949 (₹2,800, −30%, 30 days) · 450 ₹3,649 (₹6,300,
−42%, 90 days, recommended) · 1,600 ₹9,999 (₹22,400, −55%, 180 days).
Buying 1,600 (logged in) first offers 2,400 credits for ₹13,999 (₹33,600,
−58%, 360 days, ₹5.83 /credit) in the existing `CreditPackOfferDialog`
(`kind="database"`, `DB_UPSELL_PACK`).

**Job-type explainer** ("How job credits work", desktop and phone): each
card shows the credits a job takes ("1 / 2 / 4 job credits") instead of a
price. Why: on the credit packs page a job's own price makes the recruiter
weigh "buy credits" against "buy one Classic job"; that doubt loses the
pack sale. The card is about what credits get, not what a job costs.

**Order summary**: a job's free database credits are "Valid for 15 days"
(was 7).

**Open: the add-on under the exit coupon.** It shows its list price
(₹1,699) and the 10% appears only once added. A desktop strike with the
new price in the phone button was built and undone (user call): kept as an
exception for now.

**AI calling credits** (express): "AI job credit" is now "Premium + AI
calling credit" everywhere. New balance `"ai-addon"` (0 or 1): the AI
calling add-on credit, shown in the chip and the credits panel only when
held. The add-on is offered on every job type but Premium + AI, in every
credit case; with the add-on credit it is free ("1 credit"), and posting
stays free. Preview balances: "4 job + 1 AI calling add-on credit", "4 job
+ 1 Premium + AI + 1 add-on credit".
The Premium + AI card's price reads just "1 credit" (the card names the
plan); the chip, panel and order summary keep the full name.

## Removed

- `usePriceLayout` and its preview options (badge pill, inline, −% below,
  outline Buy, Buy now, Buy now + tiered alerts) and the `?price=` flag.
- `usePlanCardStyle` and the retired card styles in `mobile-plan-row.tsx`:
  radio left / right, green tint, expand on select, the "inline" row
  layout.

## Still switchable (demo state, not design)

Hidden settings: plan layout (3 jobs / with the monthly plan), credit
balance, office / WFH, job slots, pricing phase, 10% exit offer, Plans in
the nav. Jobs dashboard: the subscriber card's offer strip preview.
Marketing: `?mother=plum|brand`. All come out before production.

## Open

- Database card names wrap to two lines at 375px ("170 database
  credits"); check 320px.
- `scripts/check-alignment.js` not run on desktop this round.
- Nothing committed.
