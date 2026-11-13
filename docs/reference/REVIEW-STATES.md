# Review states

Every prototype state you can set without clicking through the product. They
replace the hidden preview panel that "*GST applicable" used to open (removed
2026-11-07; see `docs/DECISIONS.md`, "No hidden preview panel").

**Live builder:** `/design-system/engineering/review-states`. It makes the URL
and links every state.

## 🛑 Keep this file current

When you add, rename or remove a review state (a URL param or a storage key
that changes what a screen shows), update all three in the same change:

1. The screen that reads it.
2. `SCREENS` in `src/app/design-system/engineering/review-states/review-states-builder.tsx`
   (the builder and the links table read it).
3. The tables below.

Never make product copy a control to reach a state.

## URL params

| Screen | Path | Param | Values | Read in |
|---|---|---|---|---|
| Express checkout | `/apnahire/jobs/new/plans` | `layout` | *(none)* job credits · `subscription` | `src/components/apnahire/job-plan-selection.tsx` |
| | | `credits` | *(none)* no credits · `partial` 1 job · `job4` 4 jobs · `ai` 1 Premium + AI · `partial-ai` 1 job + 1 P+AI · `job4-ai` 4 jobs + 1 P+AI · `addon` 4 jobs + AI add-on credit · `held` 4 jobs + P+AI + add-on | same (`CREDIT_PREVIEWS`) |
| Self-checkout | `/apnahire/credits` (logged out: `/pricing`) | `tab` | `jobs` · `database` · `unlimited` (or `subscription`) · `enterprise` | `src/components/apnahire/self-checkout.tsx` |
| | | `bar` | any key of `OFFER_BANNERS` (logged in only; without it, Jobs shows `credits-0`, Database `database-0`, Unlimited `quarterly-to-annual`, Enterprise none) | same |
| Jobs list | `/apnahire/jobs` | `bar` | any key of `OFFER_BANNERS`: `monthly-to-quarterly`, `quarterly-to-annual` (+ `-ending`, `-last-week`), `slots-2` / `-3`, `database-top-up`, `auto-pay-off`, `rebuy-monthly` / `-quarterly` / `-annual` (on the plan card); `credits-0` / `-1` (+ `-db`), `festive-unlimited` / `-credits` (standalone). All on `/apnahire/banners` | `src/app/apnahire/(product)/jobs/page.tsx`, `src/components/apnahire/offer-banners.tsx` |
| Job candidates | `/apnahire/jobs/<id>` | `tab` | *(none)* Applied · `database` | `src/app/apnahire/(product)/jobs/[id]/page.tsx` |
| | | `applicants` | `0` no applicants yet | same |
| | | `deck` / `views` / `pill` | `0` shows the pre-2026-11-09 version | same |
| Onboarding (new recruiter) | `/onboarding` (signed out; from the OTP, enter `1111`) | `offer` | *(none)* first-job offer shown · `off` hidden | `src/app/(auth)/onboarding/page.tsx` |
| | | `check` | What "Post a job" shows when answers are missing. *(none)* live: every missing answer turns red with its error · `soft` every missing answer gets its error line, and the field, chips and checkbox keep their normal look · `note` no red, one quiet line above the button says what is missing · `first` only the first missing answer turns red, and the next takes over as each is answered (previews, 2026-11-13). Press "Post a job" to see it | same |
| Marketing pages | any | `mother` | `plum` the saved mother gradient | `src/components/marketing/mother-preview.tsx` |

Params combine, e.g. `/apnahire/jobs/new/plans?layout=subscription&credits=job4`.

## Saved in the browser

| Key | Values | Set it |
|---|---|---|
| `apnahire:pricing-phase` (localStorage) | `today` (default) · `new` · `december` · `jan` | The builder page, or `setPricingPhase()` in `src/hooks/use-pricing-phase.ts` |

## Before production

All of these are replaced by account data (plan, balance, pricing date).
