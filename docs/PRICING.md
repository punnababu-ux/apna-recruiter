# Pricing chart — every plan in the prototype (as of 2026-10-22)

Source of truth is the code; this is the index. ✅ = confirmed by product · ⚠️ = reconstructed / DEMO / inconsistent · ❓ = missing.
All prices ₹, before GST.

Sections 1, 3, 4 and 5 follow the proposed online plans sheet
("Apna_Online_Plans_Proposed – Proposed Plans", 2026-10-22): its price
cells, not its Notes column. Its "Price on Jan 1, 2027" row is section 9.
Today's plans (before the sheet) are section 10; what is charged from
Jan 1 is section 11.

## 0. Pricing phases — the prototype switch · `content/pricing-phase.ts`
Hidden preview settings → "Plans and prices" (both checkouts; it holds on
the dashboard too). Every card, upsell, the slots-full pop-up and what
reaches the order summary read `usePlans()` (`content/plan-catalog.ts`),
so the switch reprices all of it (user call, 2026-10-22).

| Phase | Plans charged | Notices (banner, notification, "₹X from Jan 1") |
|---|---|---|
| Today | Section 10 | None |
| New plans | Sections 1, 3, 4, 5 | None |
| December, new prices announced (default) | Sections 1, 3, 4, 5 | All, logged in only (section 9) |
| From Jan 1, new prices | Section 11 | None |

## 1. Job posts — single (express checkout plans step) · `content/job-plans.ts`
Struck price = job credits × 899.
| Tier | Price | MRP | Job credits | Live | DB credits | Status |
|---|---|---|---|---|---|---|
| Classic job | 699 | 899 | 1 | 15 d | 10 | ✅ sheet |
| Premium job | 1,399 | 1,798 | 2 | 15 d | 30 | ✅ sheet |
| Super premium job | 2,799 | 3,596 | 4 | 15 d | 60 | ✅ sheet |

DB credits per tier are the board's job-post freebies, not from the sheet.

## 2. "Buy 3" offer (zero credits) · `content/offers.ts`
| Tier | Per job | Jobs | Valid | Status |
|---|---|---|---|---|
| Classic | 549 | 3 | 90 d | ⚠️ DEMO |
| Premium | 1,099 | 3 | 90 d | ⚠️ DEMO |
| Super premium | 2,199 | 3 | 90 d | ⚠️ DEMO |

## 3. Job credit bundles (self-checkout, Jobs tab) · `content/credit-bundles.ts`
Struck price = credits × 699.
| Credits | Valid | Price | MRP | % off | Per credit |
|---|---|---|---|---|---|
| 1 | 30 d | 699 | 899 | 22% | 699 |
| 3 | 30 d | 1,999 | 2,097 | 5% | 666 |
| 6 | 90 d | 3,649 | 4,194 | 13% | 608 |
| 22 | 365 d | 9,999 | 15,378 | 35% | 455 (sheet 454.50) |
| 47 (upsell pack) | 360 d | 19,999 | 32,853 ⚠️ | 39% | 426 |

The 47-credit pack is the sheet's "Upsell" column, offered from the 22-credit
bundle. Its MRP is derived (47 × 699); the sheet gives none.

## 4. Database credit bundles (self-checkout, Database tab) · `content/credit-bundles.ts`
Struck price = credits × 14.
| Credits | Valid | Price | MRP | % off | Per credit |
|---|---|---|---|---|---|
| 200 | 30 d | 1,999 | 2,800 | 29% | 10 |
| 450 | 90 d | 3,649 | 6,300 | 42% | 8.1 |
| 1,600 | 365 d | 9,999 | 22,400 | 55% | 6.25 |

## 5. Apna unlimited / subscription · `content/subscriptions.ts` (`SUBSCRIPTION_CHART`)
Price / struck price. The Subscription tab's slot picker (1 / 3 / 5) drives
every price. The sheet lists no database credits for plans; 1 and 3 slots
keep the earlier product board chart (2026-10-20), 5 slots is calculated
(user call, 2026-10-22). Worth ₹10 each. Shown wherever a plan is sold:
the Subscription tab, the Jobs tab Unlimited card, express checkout's
Monthly plan card, both upsell pop-ups' plan tiles, the slots-full pop-up
and the order summary (both checkouts).
| Active job slots | Monthly (30 d) | Quarterly (90 d) | Annual (365 d) |
|---|---|---|---|
| 1 | 2,499 / — | 5,999 / 7,497 | 9,999 / 29,988 |
| 3 | 5,999 / 7,497 | 13,499 / 22,491 | 28,999 / 89,964 |
| 5 | 7,999 / 12,495 | 19,999 / 37,485 | 44,999 / 1,49,940 |

Per slot per month: 1 slot 2,499 / 2,000 / 833 · 3 slots 2,000 / 1,500 / 806 · 5 slots 1,600 / 1,333 / 750.

Database credits (each row's `dbCredits`):
| Active job slots | Monthly | Quarterly | Annual |
|---|---|---|---|
| 1 | 200 ✅ | 600 ✅ | 1,000 ✅ |
| 3 | 800 ✅ | 1,200 ✅ | 4,000 ✅ |
| 5 | 1,400 ⚠️ | 1,800 ⚠️ | 7,000 ⚠️ |

⚠️ 5 slots is calculated, not decided: the 1 → 3 step carried on (+300 /
+300 / +1,500 credits a slot; the old chart's 2-slot row fits the same
step). Flagged in code as the row's `dbCreditsEstimated`.

### Subscription language — one vocabulary (`SUBSCRIPTION_TERMS`)
Every surface takes these words from `content/subscriptions.ts`; change
them there, once (user call, 2026-10-22).

| Use | Monthly | Quarterly | Annual |
|---|---|---|---|
| Card header | Monthly | Quarterly | Annual |
| Plan name (tiles, order summary, CTAs) | Monthly plan | Quarterly plan | Annual plan |
| Order summary line | Unlimited monthly plan | Unlimited quarterly plan | Unlimited annual plan |
| Price unit | /month | /quarter | /year |
| Length, validity, slots | 30 days | 90 days | 365 days |

- Slot line: "1 active job slot for 30 days" (`slotTermLabel`), sentence case.
- Database line: "200 database credits worth ₹2,000" (`dbCreditsLabel`).
- Months only for the per-month note ("That's just ₹833 /month") and
  benefits ("8 MONTHS FREE"). Never "yearly", "1 year", "12-months plan",
  "3 months" or "a month" for a term.

- Best for hiring continuously for the same role(s): the job stays live all
  period and can be reposted after each 15-day expiry.
- Annual upgrade pop-up: offered only on the 1-slot monthly plan.
- Extra job slot (slots full): sold as the next slot count's monthly plan
  (`usePlans().slotUpgrade`): new plans 3 slots, ₹2,000 /slot against
  ₹2,499; today 2 slots, ₹2,250 /slot against ₹2,499 (₹4,499, struck
  ₹4,998 ⚠️ derived); from Jan 1 3 slots, ₹2,200 /slot against ₹2,749.

### When a plan ends (decided and built 2026-10-23 · `hooks/use-previous-plan.ts`, `components/apnahire/plan-ended.tsx`)
  A plan ends when a cancelled plan reaches its end date, or a renewal
  payment fails.
  - **Nothing holds the customer back.** No grace period that blocks them:
    the moment the plan ends they are on job credits and can buy credits,
    or any plan, from self-checkout.
  - **All live jobs expire** when the plan ends.
  - **The hiring city is not kept.** Buying a plan again asks to lock a city
    at the next job post, as a first purchase does.
  - **Renew the previous plan from self-checkout** (for 30 days): a slim
    "Your previous plan" card (name, slots, today's price, "Renew") above the plan tabs.
    Today's price, not the old one: the price lock ended with the plan. A
    plan no longer sold shows "View plans" instead.
  - **"Plan ended" banner** (compact, dashboard and Manage plan) for about
    a week: "Your Unlimited monthly plan ended on 10 Nov 2026" + Renew.
    After that, the history lives in Credits & usage (`/apnahire/usage`,
    still to build): the plans bought, when they ran.
  - Later, not now: a plan audit for the customer (jobs posted, applies,
    database unlocks over the plan's life).

### Changing a plan (`/apnahire/plan`, `hooks/use-job-slots.ts`)
  **One change at a time** (user call, 2026-10-23): a booked change blocks
  every other until it is undone or happens. A downgrade waits for the
  renewal date ("Keep current plan" drops it); a cancellation runs the plan
  to its end ("Reactivate plan" undoes it). While either is booked, every
  plan card's CTA is off with a tooltip saying how to undo it, and "Cancel
  plan" explains it is blocked. An upgrade is instant, so it books nothing.
  No other lock (no renewal window).

- **Upgrade** (a longer term and/or more slots, nothing less): instant.
  Credit = what was paid × days left ÷ term days (rounded, never more than
  the new price); pay today = new price − credit. The new plan starts today
  with its own database credits (⚠️ assumed: unused ones don't carry over);
  live jobs stay live; a booked downgrade is dropped.
- **Downgrade** (a shorter term or fewer slots, a mixed change included):
  cyclic. Booked for the renewal date; the plan runs as it is until then and
  can be called off ("Keep current plan"). At renewal, live jobs beyond the
  new slot count expire, newest first.
- Example: 2-slot monthly ₹4,499, 18 of 30 days left → credit ₹2,699;
  3-slot monthly ₹5,999 → pay ₹3,300 today.

## 6. AI calling agent · `content/job-plans.ts`, `apnahire/checkout-drawer.tsx`
| Item | Price | MRP | Valid |
|---|---|---|---|
| AI calling add-on for one job | 1,699 ✅ | — | — |

Sold only as a single add-on (no packs).

### 6b. Database add-on packs (order summary) · `checkout-drawer.tsx`
| Credits | Price | MRP | Valid |
|---|---|---|---|
| 50 | 500 | — | 90 d |
| 100 | 900 | 1,000 (10% off) | 90 d |
| 200 | 1,600 | 2,000 (20% off) | 90 d |

₹10 per credit ✅; volume discount tiers ⚠️ placeholder.

## 7. Enterprise (annual) · `apnahire/enterprise-pricing-table.tsx`
| Plan | Price | Job credits | DB unlocks |
|---|---|---|---|
| Starter | 1,00,000 | 75 | 2,000 |
| Growth | 1,75,000 | 150 | 3,000 |
| Scale | 5,00,000 | 450 | 5,000 |
| Expansion | 8,75,000 | 800 | (see file) |

✅ Confirmed accurate.

## 8. Discounts
- Exit offer: 10% extra off, 24 h, stacks on plan price ✅
- Coupon STAY20: demo only, not a real offer

## 9. Prices from Jan 1, 2027 · `content/price-change.ts` + each plan's `janPrice`
Announced to logged-in recruiters in the December phase (user call, 2026-10-22):
one solid blue banner at the top of the jobs dashboard, self-checkout and
express checkout (`PriceChangeBanner`), one notification, and "₹X from
Jan 1" (gold rising arrow) on every job and plan card and every upsell
tile, both checkouts. Never the order summary, never a logged-out page.
Charging the new prices is pushed by hand (in the prototype: the "From
Jan 1" phase, section 11). Subscriptions already on autopay keep renewing
at their old price ✅ (user call, 2026-10-22).

| Plan | Today | From Jan 1 |
|---|---|---|
| Classic / Premium / Super premium job | 699 / 1,399 / 2,799 | 749 / 1,499 / 2,999 |
| Single job credit | 699 | 749 |
| 3 / 6 / 22 credit packs | 1,999 / 3,649 / 9,999 | 2,099 / 3,999 / 10,999 |
| Unlimited 1 slot (M / Q / A) | 2,499 / 5,999 / 9,999 | 2,749 / 6,599 / 10,999 |
| Unlimited 3 slots | 5,999 / 13,499 / 28,999 | 6,599 / 14,849 ✅ / 31,899 ✅ |
| Unlimited 5 slots | 7,999 / 19,999 / 44,999 | 8,799 / 21,999 / 49,499 |

Unchanged: database packs, the AI calling add-on, database add-on packs,
Enterprise (user call). The 47-credit upsell pack and the "Buy 3" offer
have no Jan price, so their upsell tiles show none (the partner tile does).

## 10. Today's plans (before the sheet) · the `TODAY_*` sets
The plans live at git HEAD on 2026-10-22, the "Today" phase.

| Job posts | Price | MRP | % off |
|---|---|---|---|
| Classic / Premium / Super premium | 699 / 1,399 / 2,799 | 899 / 1,699 / — | 22% / 18% / — |

| Job credits | Valid | Price | MRP | % off | Per credit |
|---|---|---|---|---|---|
| 1 | 30 d | 699 | 899 | 22% | 699 |
| 3 | 30 d | 1,949 | 2,499 | 22% | 650 |
| 6 | 90 d | 3,649 | 4,194 | 13% | 608 |
| 13 | 180 d | 7,099 | 8,999 | 21% | 546 |
| 22 (upsell pack, from 13) | 360 d | 9,999 | 15,378 | 35% | 455 |

| Database credits | Valid | Price | MRP | % off | Per credit |
|---|---|---|---|---|---|
| 170 | 30 d | 1,949 | 3,170 | 38% | 11.5 |
| 380 | 90 d | 3,649 | 6,840 | 46% | 9.6 |
| 900 | 180 d | 7,099 | 15,750 | 54% | 7.9 |

| Active job slots | Monthly | Quarterly | Annual | DB credits (M / Q / A) |
|---|---|---|---|---|
| 1 | 2,499 | 5,999 | 9,999 / 15,999 | 200 / 600 / 1,000 |
| 2 | 4,499 | 9,999 | 22,999 | 500 / 900 / 2,500 |
| 3 | 5,999 | 13,499 | 29,999 | 800 / 1,200 / 4,000 |

## 11. Charged from Jan 1 · `janCatalog` in `content/plan-catalog.ts`
The new plans with each `janPrice` charged, no notices. ⚠️ The struck
prices are DERIVED until product sends the new MRPs (Still open, 7): job
posts keep credits × 899, bundles and the pack are struck at the Jan
single-credit price (× 749), plans at slots × months × 2,749 (the Jan
1-slot monthly), the way the sheet strikes them today.

| Job posts | Price | MRP ⚠️ | % off |
|---|---|---|---|
| Classic / Premium / Super premium | 749 / 1,499 / 2,999 | 899 / 1,798 / 3,596 | 17% |

| Job credits | Price | MRP ⚠️ | % off | Per credit |
|---|---|---|---|---|
| 1 | 749 | 899 | 17% | 749 |
| 3 | 2,099 | 2,247 | 7% | 700 |
| 6 | 3,999 | 4,494 | 11% | 667 |
| 22 | 10,999 | 16,478 | 33% | 500 |
| 47 (upsell pack) | 19,999 | 35,203 | 43% | 426 |

| Active job slots | Monthly | Quarterly | Annual |
|---|---|---|---|
| 1 | 2,749 / — | 6,599 / 8,247 | 10,999 / 32,988 |
| 3 | 6,599 / 8,247 | 14,849 / 24,741 | 31,899 / 98,964 |
| 5 | 8,799 / 13,745 | 21,999 / 41,235 | 49,499 / 1,64,940 |

Database bundles: unchanged (section 4). Annual upgrade: still 8 months free.

## ❓ Still open
7. **Struck prices after Jan 1** will change too; the new MRPs are still to
   come (Punna to circle back). Section 11's are derived stand-ins.
1. **Database volume discount %** (10% / 20% are placeholders).
2. **"Buy 3" per-job prices** (549 / 1,099 / 2,199 are DEMO).
3. **Extra slot proration** — Punna to provide. The demo plan has 2 slots, which isn't a tier.
4. **47-credit upsell pack MRP** (derived) and validity (sheet cell 360 d, notes say 365 d).
5. **Sheet Notes proposals** (Premium 1,499, Super premium 2,999, 3-month packs 3,999, 1-slot annual 10,999) — not applied today; they arrive as the Jan 1 prices (section 9).
6. **Database credits for 5-slot subscriptions** — calculated stand-ins (1,400 / 1,800 / 7,000). Replace in `SUBSCRIPTION_CHART`'s 5-slot row, then drop its `dbCreditsEstimated`.
