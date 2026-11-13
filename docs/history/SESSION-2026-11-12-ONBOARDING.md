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
3. ~~Not run yet: `npm run test:e2e` with `/onboarding` added~~ done in round 2 (below).

---

## Round 2 (same day, evening): the desktop frame and the fields

Punna's two points: (1) on desktop the form sits in a box, on a grey half, beside the brand half;
find a better visual language. (2) Try simpler fields: the hint text inside, moving to the top on tap,
as in Android's Material fields.

Nothing is committed. Live looks the same except the contrast fixes at the end.

### Previews (live untouched)

| Param | Values | What |
|---|---|---|
| `shell` | `panel` · `flat` · `canvas` | The login frame on desktop, on `/login`, `/login/otp`, `/login/enterprise`, `/onboarding` |
| `fields` | `float` | Onboarding's name, company and email carry the label inside (`FloatingInput`) |

Both are read once per page load in `AuthShellFrame`, which stays mounted across the login steps. So
`/login?shell=panel&fields=float`, a number, then OTP `1111` walks the whole flow in the preview.
Builder: `/design-system/engineering/review-states` (screens "Onboarding" and "Login").

### What was built

| Part | Where |
|---|---|
| The frame's layout and its three previews; `AuthCard`; `useAuthPreview` | `src/components/auth/auth-shell-frame.tsx` (new, client) |
| `AuthShell` now passes the pitch to the frame; `LegalLine` stays here | `src/components/auth/auth-shell.tsx` |
| `FloatingInput` (design system): label inside, floats on focus, a value or autofill | `packages/design-system/src/components/ui/floating-input.tsx`, exported, in `COMPONENTS.md`, demo on `/design-system/components/inputs` |
| `TextAnswer`: one typed answer in either look; errors and hints now tied to the input (`aria-describedby`) | `src/app/(auth)/onboarding/page.tsx` |
| The offer banner is `role="note"`, not an alert | same |
| Contrast: `Alert` success / info / destructive and invalid choice chips | `alert.tsx`, `chip-tabs.tsx` (design system) |
| Tests: onboarding in the layout and accessibility lists, both looks, the three frames on desktop | `e2e/app.spec.ts`, `e2e/a11y.spec.ts` |

### Measured (onboarding)

| | Page height at 1440×790 | "Post a job" ends |
|---|---|---|
| Live | 923px | 60px below the fold |
| Live frame, floating fields | 881px | 18px below |
| `panel` or `flat`, today's fields | 831px | 8px below |
| `panel` or `flat`, floating fields | 790px | in view, no scroll |
| `canvas`, floating fields | 881px | 18px below |

Phone, 393×852: live ends 25px below the fold; with floating fields the button is in view.
No sideways scroll at 320px in either look.

### Sumit's lenses and the reels lens (on `panel` + floating fields)

- Lens 5, remove noise: holds. The grey half and the card are gone; the placeholders that repeated the label are gone.
- Lens 11, frames the same shape: holds. The brand panel takes `rounded-card`.
- Lens 30, motion is continuous: holds. The label travels (translate and scale, 150ms); nothing swaps.
- Lens 32, familiar controls: holds. The floating label is Android's.
- Lens 32c, one question per screen on phones: fails, as before this round. Onboarding asks five on one screen (decided 2026-11-12, "Five short answers fit one phone screen"). Not reopened here.
- Where the eye lands: the headline, then the form title; the one saturated block is "Post a job". Holds.
- Accent: green on the button, the focus ring and the offer's tint. Holds.
- Type sizes on the form side: fails by one. Live has three (24 title, 16 button, 14 everything else). The floated label adds a fourth, 12px; that is the cost named in DECISIONS.
- Mechanism: a frame inside a frame is removed; the brand is the figure, the page is the ground.

### Found on the way

- **Contrast, fixed:** the offer banner's green on its green tint (3.8:1 title, 3.2:1 line) and the red chips of a missed choice. See DECISIONS, "Alert and invalid chips".
- **Contrast, not fixed:** the stat labels on the brand side ("Candidates", …) measure 3.1:1 on the mesh. They come from `Stat`, shared with the homepage hero.
- **Not bugs:** the two hydration warnings and the dead "Post a job" seen in Cursor's built-in browser come from that browser (it adds `data-cursor-ref` to the page and swallows the click). Chrome shows neither.

### Open for Punna (answered 2026-11-12, about 22:00; built in round 3)

1. ~~Which frame~~ `panel`, for login, OTP, enterprise login and onboarding together.
2. ~~Floating fields~~ Yes, and the login mobile number and the enterprise fields follow.
3. The 10% first-job banner stays as the quiet notice (`Alert`) until the offer test is decided.
4. Not done: Figma (`FloatingInput` in the hub), the Linux screenshot baseline for the inputs page (push with `[update-linux-snapshots]`).

---

## Round 3 (2026-11-13): the picks go live, and a quieter way to say "answers missing"

Two briefs. First, make round 2's picks real and fix the focus on a missed chip question. Then, from Punna
(about 13:08): every field turning red after an empty press of "Post a job" is overwhelming; make it subtle;
a constant message at the bottom was Punna's idea.

Nothing is committed. Another session worked on the offer banners in the same checkout at the same time
(`offer-bar.tsx`, `self-checkout.tsx`, `offer-banners.tsx`, the banner clays). Those files are not part of this.

### Live now, with no query param

| What | Where |
|---|---|
| The brand-panel frame on desktop for `/login`, `/login/otp`, `/login/enterprise`, `/onboarding`. Phones unchanged | `src/components/auth/auth-shell.tsx`: one server file again. `auth-shell-frame.tsx`, `?shell=`, `?fields=` and the preview context are deleted |
| `AuthCard` is a plain block: no card at any width (the name is from before) | same |
| The label inside the field: onboarding's name, company and email; the login number, +91 as its `prefix`; the enterprise email (its info button as `trailing`) and password (Show / Hide as `trailing`) | `onboarding/page.tsx`, `login/enterprise/page.tsx`, `marketing/hero-lead-card.tsx` (`floatingLabel`, passed by `/login` only) |
| `FloatingInput` gained `prefix` and `trailing`. The frame carries Input's look and the input inside is bare; a press anywhere on the frame puts the cursor in the field | `packages/design-system/src/components/ui/floating-input.tsx`, `COMPONENTS.md`, demo on `/design-system/components/inputs` |
| A missed chip question takes the cursor (its first chip) and the whole question scrolls into view. It stayed on the button before | `onboarding/page.tsx` (`goToQuestion`) |
| The enterprise password field takes the cursor after Continue. React reused the email step's input there, so `autoFocus` never ran after a click | `login/enterprise/page.tsx` (`key`) |
| Unused copy removed: the placeholders that repeated a label | `content/onboarding.ts`, `content/auth.ts` |

### Preview, live untouched: `/onboarding?check=`

| Value | "Post a job" with answers missing |
|---|---|
| *(none)*, live | Every missing answer in full red: border, chips, checkbox and its error |
| `soft` (what Punna asked to see, 13 Nov afternoon) | A red sentence under every gap (the existing error text). The field, the chips and the checkbox keep their normal look. A line goes as its answer is given; a mistyped email keeps its line |
| `note` | No red. One grey line above the button says what is missing, and stays until nothing is |
| `first` | Only the first missing answer turns red. As each is answered the next takes over, with no second press |

In all of them the cursor goes to the first missing answer and the question scrolls into view.

Order of events: `note` and `first` were built first (Punna's "constant message at the bottom"). Punna saw them and
chose neither: "Let's show the gaps on every field, but in a subtle way, not that red color, full-on red color.
Maybe a red info message." That is `soft`. Nothing is decided; the pick is between live, `soft`, `note` and `first`.

The `note` line's sentences (`missingNote` in `content/onboarding.ts`): "Answer all 5 questions to post this job." ·
"Answer the remaining 3 questions to post this job." · "Add your name and your company name to post this job." ·
"Add a valid official email ID to post this job." · "Agree to the terms to post this job." One line for most,
two at most, at 393, 375 and 320px.

What the previews showed (DECISIONS, 2026-11-13, has the full list):

- `soft`: clearly quieter than live, because no control changes. On an empty form it is still six red sentences. With one or two gaps it is one or two short lines.
- `note`: calm and enough on desktop. On a phone a mistyped email looks filled, and its reason is in the line under the form, which the keyboard may cover. After a tap, nothing marks a missed chip question or the terms.
- `first`: the red moves while typing. The first letter of the name turns the company field red.

### The number field keeps a number's own ten digits (Punna: "Just turn it on. Apply it.")

Found while checking autofill: the field kept the first ten digits of anything. Fixed in `mobileDigits`
(`src/lib/mobile-number.ts`), which `PhoneLoginForm` uses, so `/login` and the homepage store the same digits.
The homepage field's look is not changed.

| Arrives as | Stored before | Stored now |
|---|---|---|
| `+91 98765 43210` (pasted) | 9198765432 | 9876543210 |
| `919876543210` | 9198765432 | 9876543210 |
| `09876543210` | 0987654321 | 9876543210 |
| `98765 43210` | 9876543210 | 9876543210 |
| Chrome autofill of `+919876543210` | 0987654321 | 9876543210 |
| `9123456789` (ten digits that start with 91) | 9123456789 | 9123456789 |
| typed key by key, eleven digits | first ten | first ten |

Rule: digits only; when more than ten arrive, leading 0s and one country code 91 are dropped; then the first ten.
Edge: an eleventh digit typed onto a number that starts with 91 reads as a country code (nine digits show).

### Decided on the way

- **+91 shows only after the field is tapped** (Punna, 2026-11-13, after thinking about always showing it). Hidden while the label rests on the text line, in view once it floats, and it stays while there is a number.
- **The homepage hero's number field is not changed** (open: does it follow the login?). It is the same form as the login's (`PhoneLoginForm`), so the login's look is behind a prop. The hero is a pill with the CTA inside; it already differed from the login.
- **The `note` line counts when three or more questions are missing**, and asks for the terms only when they are all that is left (Claude). Naming everything ran to three lines on a phone.

### Found on the way, not fixed

1. **The enterprise email's info button opens nothing on a tap** (hover and keyboard only). As before it moved into the field. AGENTS.md asks for `TapTooltip`.
2. **Chrome's autofill tint starts after +91** on the login field, because +91 is outside the input. The old field did the same. On fields with no prefix it fills the whole field.
3. **`HeroLeadCard` is on no page.** The homepage uses `HeroLeadForm`.
4. **Dark mode, the brand panel:** the green "Recruiter" in the wordmark is dim on the dark gradient. It was the same on the old brand half.
