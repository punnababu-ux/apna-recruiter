# Pricing chart — every plan in the prototype (as of 2026-10-20)

Source of truth is the code; this is the index. ✅ = confirmed by product · ⚠️ = reconstructed / DEMO / inconsistent · ❓ = missing.
All prices ₹, before GST.

## 1. Job posts — single (express checkout plans step) · `content/job-plans.ts`
| Tier | Price | MRP | DB credits | Status |
|---|---|---|---|---|
| Classic job | 699 | 899 | 10 | ✅ always 699, struck 899 |
| Premium job | 1,399 | 1,699 | 30 | ⚠️ MRP reconstructed |
| Super premium job | 2,799 | ❓ | 60 | ❓ MRP missing |

## 2. "Buy 3" offer (zero credits) · `content/offers.ts`
| Tier | Per job | Jobs | Valid | Status |
|---|---|---|---|---|
| Classic | 549 | 3 | 90 d | ⚠️ DEMO |
| Premium | 1,099 | 3 | 90 d | ⚠️ DEMO |
| Super premium | 2,199 | 3 | 90 d | ⚠️ DEMO |

## 3. Job credit bundles (self-checkout, Jobs tab) · `apnahire/job-credit-bundles.tsx`
| Credits | Valid | Price | MRP |
|---|---|---|---|
| 1 | 30 d | 699 | 899 ✅ |
| 3 | 30 d | 1,949 | 2,499 |
| 6 | 90 d | 3,649 | 4,194 |
| 13 | 180 d | 7,099 | 8,999 |
| 22 (upsell pack) | 360 d | 9,999 | 15,378 |

## 4. Database credit bundles (self-checkout, Database tab) · `apnahire/database-credit-bundles.tsx`
| Credits | Valid | Price | MRP |
|---|---|---|---|
| 170 | 30 d | 1,949 | 3,170 |
| 380 | 90 d | 3,649 | 6,840 |
| 900 | 180 d | 7,099 | 15,750 |

## 5. Apna unlimited / subscription (product board, 2026-10-20)
| Plan | Jobs active | Price | Validity | DB unlocks |
|---|---|---|---|---|
| Monthly | 1 | 2,499 | 30 d | 200 |
| Monthly | 2 | 4,499 | 30 d | 500 |
| Monthly | 3 | 5,999 | 30 d | 800 |
| Quarterly | 1 | 5,999 | 90 d | 600 |
| Quarterly | 2 | 9,999 | 90 d | 900 |
| Quarterly | 3 | 13,499 | 90 d | 1,200 |
| Annual | 1 | 15,999 | 365 d | 1,000 |
| Annual | 2 | 22,999 | 365 d | 2,500 |
| Annual | 3 | 29,999 | 365 d | 4,000 |

Running offer ✅: **Annual, 1 job — sold at 9,999, 15,999 struck.** The prototype sells only the 1-job rows today.
Extra job slot (= upgrade to the next jobs-active row): proration logic to come from Punna.


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

## ❓ Still open
1. **Super premium job MRP** (single post).
2. **Premium MRP** — confirm 1,699.
3. **Database volume discount %** (10% / 20% are placeholders).
4. **MRPs** for the other subscription rows (only Annual 1-job has one).
5. **"Buy 3" per-job prices** (549 / 1,099 / 2,199 are DEMO).
6. **Extra slot proration** — Punna to provide.
7. **Job & database bundle MRPs** — confirmed by product or design-only?
