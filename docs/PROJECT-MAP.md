# Project map — read this instead of exploring

One-page index: what Punna means → where it lives. Rules are in `AGENTS.md`
(read only the section you need); working context and pending list in
`docs/AI-HANDOFF.md`. Keep this file current when you add a route or area.

## Token-saving workflow
- Don't `ls`/grep the whole repo. Find the term below, open that file.
- Don't read AGENTS.md end to end (784 lines); jump to the section by heading.
- Component API → `docs/COMPONENTS.md`; token names → `docs/TOKENS.md` (grep, don't read).
- Verify with `npm run check`; dev server `preview_start {name:"apna-recruiter-dev"}` (port 3002).

## Glossary — what Punna says → where
| Says | Route | Code |
|---|---|---|
| homepage / home | `/` `src/app/(marketing)/page.tsx` | `src/content/home.ts`, `components/marketing/*` |
| pricing page | `/pricing` | `content/pricing.ts`, `apnahire/pricing-hero.tsx` |
| product pages | `/products/{smart-jobs,ai-calling-agent,database,unlimited}` | `marketing/product-page.tsx`, `product-illustrations.tsx`, `content/products.ts` |
| company pages | `/about/*`, `/careers`, `/newsroom/*`, `/customer-stories/*`, `/enterprise` | `marketing/page-blocks.tsx`, `content/company.ts`, `press.ts`, `enterprise.ts` |
| lounge | `/interview-prep-lounge` | `marketing/moment-carousel.tsx`, `content/interview-lounge.ts` |
| header / footer / contact band | marketing layout | `marketing/site-header.tsx`, `site-footer.tsx`, `contact-section.tsx`, `(marketing)/layout.tsx` |
| clay pictures / 3D assets | — | `marketing/value-art.tsx` (`READY`), `public/images/company/values/`, `scripts/clay-cutout.py` |
| login / OTP / enterprise login | `/login`, `/login/otp`, `/login/enterprise` | `components/auth/*`, `content/auth.ts` |
| self-checkout / buy credits / plans page | `/apnahire/credits` | `apnahire/self-checkout.tsx`, `job-credit-bundles.tsx`, `database-credit-bundles.tsx`, `subscription-plans.tsx`, `unlimited-side-card.tsx`, `contact-sales-card.tsx` |
| express checkout / plans step (in job post) | `/apnahire/jobs/new/plans` | `apnahire/job-plan-selection.tsx`, `job-plan-cards.tsx`, `mobile-plan-row.tsx`, `content/job-plans.ts` |
| order summary / checkout drawer | — | `apnahire/checkout-drawer.tsx`, `ai-calling-addon-card.tsx`, `use-attention-ring.ts` |
| payment / success | — | `apnahire/payment-modal.tsx`, `payment-success.tsx` |
| upsell / exit offer / 10% off / coupon | — | `apnahire/offers/*` (`offer-dialog`, `exit-offer-dialog`, `offer-choice`, `extra-off-line`, `use-extra-off`), `content/offers.ts` |
| post a job / job wizard | `/apnahire/jobs/new` | `apnahire/post-job/*`, `lib/apnahire/job-draft.ts`, `prompt-parse.ts` |
| slots full | — | `apnahire/slots/slots-full-dialog.tsx`, `hooks/use-job-slots.ts` |
| dashboard / jobs / job details | `/apnahire/dashboard`, `/apnahire/jobs`, `/apnahire/jobs/[id]` | `apnahire/jobs/job-list.tsx` |
| database (search/saved/unlocked) | `/apnahire/database/*` | — |
| notifications | `/apnahire/notifications` | `apnahire/notifications/*`, `content/notifications.ts`, `hooks/apnahire/use-notifications.ts` |
| sidebar / top bar / bottom nav (product) | — | `apnahire/app-sidebar.tsx`, `top-bar.tsx`, `bottom-nav.tsx`, `lib/apnahire/nav.ts` |
| usage / invoices (parked) | `/apnahire/usage` | — |
| prototype toggles / preview flags | — | `apnahire/prototype-settings.tsx`, `checkout-preview-settings.tsx`, `job-plan-preview-switcher.tsx` |
| GST line | — | `apnahire/gst-note.tsx` (never hand-write) |
| OnlyRounds (separate AI interview tool) | `/onlyrounds/*` | `components/onlyrounds/*`, `lib/onlyrounds`, `hooks/onlyrounds` |
| design-system docs site | `/design-system/*` | category pages under `src/app/design-system/components/` |
| tokens / colours / gradients | — | `packages/design-system/src/styles/tokens/{primitives,semantic}.css`, utilities in `styles/index.css` |
| primitives (Button, PricingCard, Sheet…) | — | `packages/design-system/src/components/ui/<name>.tsx`, export in `index.ts` |
| pricing chart (all plans, gaps) | — | `docs/PRICING.md` — keep in sync with price edits |
| to-do / backlog | — | `docs/TODO.md` — add items as Punna names them |
| alignment check | — | `scripts/check-alignment.js` (run in page, desktop width) |

## Content & copy
All copy in `src/content/*.ts`. Sources: apnatime.lovable.app (marketing),
interview-coach-ai-05.lovable.app (lounge), employer.apna.co (product). Never invent copy.

## Activity (commits since 2026-10-15, by area)
marketing ≫ home > apnahire ≈ design-system > offers, pricing, checkout, express.
Latest: express checkout "trusted by" logo row under plans.

## Pending / parked → `docs/TODO.md` (backlog), `docs/AI-HANDOFF.md` "Pending" + memory `project_parked_items.md`.
