# Session 2026-11-12 — Revenue impact and the new-recruiter journey (onboarding)

Hand-off for the next chat. Read AGENTS.md first, then this.

## What shipped (this commit)

| Part | Where |
|---|---|
| `/onboarding`: one screen between the OTP and the first job, after Figma "Onboarding fixes" (Onboarding file `tLfArp5wIWgvEAdzoMv6Tj`, frames 4127:1760 phone, 4149:620 desktop, the ones with "Looking for a job?") | `src/app/(auth)/onboarding/page.tsx`, copy in `src/content/onboarding.ts` |
| OTP `1111` = new recruiter → `/onboarding?phone=` | `src/app/(auth)/login/otp/page.tsx` |
| "Post a job" signs in and opens `/apnahire/jobs/new?flow=essential` (`AFTER_ONBOARDING`) | same page |
| Signed-in redirect only on `/login*` (it sent onboarding to Jobs) | `src/components/auth/signed-in-redirect.tsx` |
| 320px fix: the login bar's logo shrinks (it ran 12px past the screen) | `src/components/auth/auth-shell.tsx` |
| `LegalLinks` split out of `LegalLine`, reused by the terms checkbox | same file |
| Review state: Onboarding, `?offer=off` hides the 10% banner | review-states builder + `docs/reference/REVIEW-STATES.md` |
| Revenue sources and numbers (S12–S14, sections 2g, 2h) | `docs/reference/JOB-POSTING-DATA.md` |

## Form vs Figma

Taken from Figma: title "Create your recruiter account", consultancy Yes / No chips (desktop frame),
7 employee chips with "Not sure", "Official email ID", terms checkbox.
Kept on purpose: email required (the live spec makes it mandatory; only the phone frame says optional),
the 10% first-job banner (the idea under test, not in Figma).
Not taken: Help / Log out icons, the dark "What does apna offer" panel (the login shell is shared).

## Decisions logged (docs/DECISIONS.md, 2026-11-12)

- Onboarding follows Figma "Onboarding fixes" — Decided.
- No upsell to new recruiters — Decided (Punna).
- Reinforce the recruiter from onboarding to payment (five points: social proof, no upsell to
  existing, the journey, returning-user leads, individuals can't post) — logged.
- Onboarding offer, 10% off the first job if posted today — Open (EM-1568 recovery experiment is running).

## Revenue findings (short)

Mid case: the job posting flow is worth about ₹6–12 lakh a month (₹1.4–2.9 lakh a week).
New recruiters are the gap. They drop at the plan step because they see the price there for the first time,
and the upsell adds to the drop. Sources: Ana, "Online Revenue - Weekly Governace" sheet, Slack, Drive, Confluence.

## Next (Punna's plan: "build from onboarding, fix as we arrive")

1. Job posting for a new recruiter: proof lines (social proof) along the way.
2. Plan step / payment: no upsell for new recruiters; say the price early.
3. Not run yet: `npm run test:e2e` with `/onboarding` added to the marketing or app screen lists.
