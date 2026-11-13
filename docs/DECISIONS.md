# Design decisions log

Questions we have already worked through, so the next person with the same
idea starts from the answer. One entry per question: the question, what we
decided (or are leaning to), why, and what would change the answer. Newest
first. Status: **Decided**, **Leaning** (recommendation, not yet signed off)
or **Open**.

---


## 2026-11-13 — ID card: wordmark at the foot, centred

**Question.** The ID card's wordmark sat top left and read off balance (Punna). Top centre or the foot?
**Decision.** Centred at the foot, as a sign-off under the photo, name and role. The top stays clear for the lanyard slot, and the photo leads. Visiting card front gains a contact list and a QR to save the contact; the back adds the web address.
**Why.** A portrait card is a centred column; one left-aligned mark breaks it. At the foot the wordmark reads like a signature, which is how the brand uses it everywhere, and it does not crowd the lanyard slot.
**Would change it.** A printer or security spec that needs the issuer at the top.
**Status.** Leaning.

---

## 2026-11-13 — Install icon: the deep green tile

**Question.** Which icon goes on the home screen when a recruiter installs
the dashboard from Chrome ("Install app") or Safari ("Add to Home Screen")?

**Decision.** The deep green tile (`apna-recruiter-icon-dark.svg`): white
"apna", bright green "Recruiter". All four PNGs in `public/recruiter/` come
from it (apple-touch 180 full bleed, 192 and 512 as drawn, maskable 512
with the wordmark in the 80% safe zone). The green tile stays the master
for print and the brand guide.

**Why.** Punna's call: the deep tile is the one we want people to see on
their phone. A web install gets one icon, with no light and dark pair, so
we pick one.

**What would change it.** A native app, which can ship both.

**Status.** Decided.

## 2026-11-13 — apna Recruiter app icon: the green tile

**Question.** The Recruiter home-screen icon was a solid green box, white
wordmark and gold all-caps "RECRUITER", off the new brand. A first redraw
on the candidate icon's light tile looked too much like the candidate app
(Punna: "They are not the same app").

**Decision.** The tile tells the apps apart: candidate app light, Recruiter
green (#186954) with blurred light (green, sky, gold in the corners). White
"apna", pale green "Recruiter" (#C6EFE0), sentence case, both the same
width. Master: `public/brand/apna-recruiter-icon.svg`; PNGs in
`public/recruiter/` (512, 192, maskable 512, apple-touch 180). Dark mode
(iOS 18+ dark icon): a deep green tile (#0B2E25), white "apna", bright
green "Recruiter" (#3EBA8D): `public/brand/apna-recruiter-icon-dark.svg`.
The rule: the tile's hue is the app (candidate neutral, Recruiter green);
dark mode only darkens it. A near-black Recruiter tile was dropped: it
matches the candidate app's dark icon. Android themed icons tint every app
alike, so there only the word "Recruiter" tells them apart; the web
manifest has no dark icon and keeps the green one.

**Why.** On a home screen people find an app by its tile colour before
they read a word, so the word "Recruiter" alone can't separate two apps.
Green is the employer colour, and existing recruiters already know a green
apna icon.

**Would change it.** Store review, or the candidate app moving to green.

**Status.** Decided (Punna, 2026-11-13: "lets go with recruiter in green").

---

## 2026-11-13 — Redrawn: the logo story runs box → name → light → motion, with less text

**Question:** how should Redrawn tell the rebrand, and how much text should a slide carry?
**Decision:** the story is four slides in a row: the logo today, out of the box (the wordmark grows to ~1.9× as the box falls away), the name in black, then "Stripes became light. Light that moves." (the stripes melt into the gradient, then drift on a 16–22s loop). The separate Motion slide is gone; motion is told as what makes the light feel alive. The two type slides are one (demo plus three measured facts). Every slide is a headline plus at most one short line, apart from demos and the principles table.
**Why:** Punna, 2026-11-13: too much text per slide; the colours-into-gradient story had been cut; the logo should be the focus once it leaves the box; type and motion read better merged.
**Would change it:** a presenter who needs speaker notes on the slides; put them in notes, not on the slide.
**Status:** Decided

## 2026-11-13 — Candidates: green leads (proposed)

**Question:** which colour leads on the candidate side: green, sky or gold?
**Decision:** green leads for candidates. Redrawn presents it as a proposal, not a question; sky and gold appear only as "also considered". apna Recruiter material sits on the brand gradient (green, sky and gold together) with the "apna Recruiter" lockup (Punna, 2026-11-13: candidates all green, Recruiter multicolour).
**Why:** each colour has one job. Sky means AI and help; gold means value and offers. Leading candidates with either gives it a second meaning. Green keeps "do this" for everyone, and matches the "one apna" promise on the title slide.
**Would change it:** research showing candidates and employers confuse the two apps, or leadership choosing B or C in the read-round.
**Status:** Leaning (Punna, 2026-11-13: "propose green for now")

## 2026-11-13 — The wordmark leaves the box; only the app icon keeps one

**Question:** keep apna inside the rounded box everywhere, or only where a square is required?
**Decision:** the wordmark stands alone on every surface (site, print, signs, collateral). The box survives only as the app icon (stores, home screens, profile pictures).
**Why:** a box is a platform need for app grids, not a brand idea. Elsewhere it fences the name in and keeps the colours small; out of it, the name reads like a signature and the colours spread as gradients. Punna's framing: removing the box and the stripes "expanded its horizon". Redrawn slide 3 now tells it in four steps (stripes off, name black, box opens, colours fill the page).
**Would change it:** a placement that needs a fixed square mark other than an app or avatar slot.
**Status:** Decided

## 2026-11-13 — Redrawn and the brand guide explain each choice with evidence

**Question:** how do we show that the brand choices were reasoned, not taste?
**Decision:** add three evidence slides to Redrawn (type: measured x-heights 0.55/0.52/0.48 and tabular figures; colour: OKLCH lightness 38/54/77/88, contrast, simulated colour blindness, OKLab mixing; UX: Von Restorff, Hick, Fitts, Gestalt, Doherty, Jakob, WCAG 2.3.3), "Why" lines on brand slides, and matching sections in the guide (numbers table, type table, principles, apna Recruiter lockup, candidate poster, files). All copy rewritten plain: no slogans.
**Why:** Punna asked for every decision to have a story and a reason, and for the copy to sound human. Numbers were measured in the browser or computed (WCAG formula, Machado 2009 simulation), not quoted from memory.
**Would change it:** new brand colours or typefaces: re-measure and update both pages.
**Status:** Decided

## 2026-11-13 — No stripes in the new brand

**Question:** Do the green, sky and gold bars stay as a brand signature (card feet, sign plates, lanyards)?
**Decision:** No. The bars belong to the old logo; the rebrand story is that the colours lift off and become light. Where a surface needs colour it uses a gradient from the library. The bars appear only when showing the old logo (Redrawn's "before" slides). New app icon: black wordmark on soft green, sky and gold light (dark version in the guide: white on the dark gradient). In the product since 2026-11-13: ApnaLogo, public/apna-logo.svg, favicon.ico.
**Why:** Punna, 2026-11-13: keeping the stripes contradicts "lift the colours, keep the name".
**Status:** Decided. App icon: Decided in the product; app stores still need the new artwork uploaded.

## 2026-11-13 — The wordmark is neutral black; plum lives only in gradients

**Question:** What colour is the apna wordmark in the rebrand, and what is plum for?
**Decision:** The wordmark is neutral black (gray-950, #09090B) on light, white on black or the dark gradient. Plum is part of the gradient library only (Database, the deep end of gradients), never the wordmark or a solid fill. The four colours keep one job each: green acts, sky informs, plum deepens, gold rewards.
**Why:** Punna's call. Freed from the stripes, colour belongs to the gradients; a neutral wordmark sits on any of them.
**Would change it:** A brand review that keeps plum as the wordmark colour.
**Status:** Decided (deck + brand guide). The product code (`LogoApnaWordmark`, was plum #4D3951) now matches (--logo-apna → gray-950). The app icon (ApnaLogo, apna-logo.svg) keeps its plum wordmark for now.

## 2026-11-13 — Redrawn tells the story; a separate brand guide holds the rules

**Question:** One long deck, or the Redrawn story plus a brand guide?
**Decision:** Redrawn stays the keynote, staged: intent (no wordmark) → the old logo → the colours lift off → they become light → the black wordmark drawn → what each colour means. Then a slide introduces the guide at `/brand`, which holds wordmark use, clear space, misuse, colour, gradients, type, print, signage and collateral.
**Why:** A story and a reference are read differently; teams need to look rules up.
**Status:** Decided. Candidate lead colour (green, sky or gold) is **Open**: options on the Redrawn "Candidates" slide.

## 2026-11-13 — Offer banners: one negative, and it lives in the chip

- **Question:** the banners sit on the jobs dashboard and the logged-in plans page. A chip that states the problem and a headline that states it again ("Your plan ended" then "Hiring has stopped") reads as two blows.
- **Decision:** one negative per banner, in the chip (the plain fact: "Your plan ended", "0 job credits left", "Plan ends in 5 days"). The headline is the way forward, a gain, with the gold price. It does not say stops, can't, stopped, expired or lose. Urgency stays in the deadline, or as something they can keep before it goes ("Renew before it goes", "Last day to go annual"). Renew, chosen by Punna: "Your **old price** is still yours. Renew before it goes" (rebuy cases and `PlanEndedBanner`). The chip stays a sentence-case `Badge`.
- **Headlines:** Plan ends in 5 days → "Keep your job live at ₹1,500/month", or "Go annual for ₹787/month" in the last week. Upgrade offer → "Go annual for ₹833/month"; last day → "Last day to go annual for ₹833/month". 1 of 1 job live → "Add another live job at ₹1,999/job"; 2 of 2 jobs live → "Add a third live job at ₹1,999/job". 0 job credits left → "Get 6 job credits at ₹608 each"; 1 left → "Keep hiring. Get 6 job credits at ₹608 each". 0 database credits left → "Get 1,000 database credits at ₹6 each"; 80 left → "Get 1,000 more at ₹6 each". Auto-pay is off → "Turn on auto-pay and keep hiring" (the button stays "Turn on auto-pay"; the sub stays the renewal price). Hiring Utsav stays "Hire for 365 days at ₹833/month" and "22 job credits cost ₹455 each".
- **Reason:** two negatives back to back feel punishing. The headline should be the way back.
- **Supersedes:** the "headline says what stops" line in the entry below. Where a banner shows, and the deadline, stay as logged there. The chip stays sentence case.
- **Would change it:** a headline that wraps to three lines on a phone.
- **Status:** Decided. Which banner is due stays Open.

## 2026-11-13 — Offer banners: the headline says the loss, and they sit on the plans page

- **Question:** the banner structure is settled. How does it create urgency, and where does a logged-in recruiter see it?
- **Decision:** the headline says what stops, in plain words ("Your job stops", "You can't post a job"), not a metaphor. The price stays the gold number. A timed offer says a date ("Ends 19 Nov"), and a timer only in the last 24 hours. "Limited time offer" is dropped. The clay shows that same stake, not a document with an arrow. On the logged-in plans page (`/apnahire/credits`) one banner shows above the tabs: Jobs shows 0 job credits, Database shows 0 database credits, Unlimited shows the annual offer, Enterprise shows none. `?bar=` previews any case. The public pricing page stays without it.
- **Not in this pass:** which banner is really due, and how they stack. That stays for the developers.
- **Why:** a price alone gives nothing to lose. The plans page is where the recruiter acts on it.
- **Would change it:** a headline that wraps to three lines on a phone, or a clay render that still needs the arrow to be understood.
- **Status:** Decided (design). The picker is Open.

## 2026-11-13 — Onboarding: "Post a job" with answers missing, said quietly

- **Question:** Punna: pressing "Post a job" with the form unfilled turns every field red with its own error, and that is overwhelming. Make it subtle. Punna's first idea: a constant message at the bottom.
- **Decision:** none yet. Three previews behind `?check=` on `/onboarding`; live is unchanged (every missing answer in full red). Press "Post a job" with answers missing to see them.
  - `soft` (Punna's direction, 2026-11-13 afternoon, after seeing the first two): "Let's show the gaps on every field, but in a subtle way, not that red color, full-on red color. Maybe a red info message." Every missing answer is marked, in words only: its existing error sentence (`ONBOARDING.*.error`, `FieldError`) under the question. The field, the chips and the checkbox keep their normal look: no red border, no red chips, no `aria-invalid`. A line goes as its answer is given, with no second press; a mistyped email keeps its line until the address is right.
  - `note`: nothing turns red and no error line shows. One grey line (`text-sm text-muted-foreground`) appears right above the button, says what is missing, follows the form as it is filled, and goes when nothing is missing. One or two missing questions are named ("Add your name and your company name to post this job."); three or more are counted ("Answer the remaining 3 questions to post this job."); the terms are asked for last, alone ("Agree to the terms to post this job."). Copy: `missingNote` in `src/content/onboarding.ts`.
  - `first`: only the first missing answer turns red, with its existing error. As each is answered the next takes the red, with no second press.
  - All three: the cursor goes to the first missing answer and the whole question scrolls into view. Live does the same since 2026-11-13; until then a missed chip question left the cursor on the button.
- **Why `soft`:** Punna did not want the full red, and did not pick the single line or the first field only. `soft` keeps what live does well, a reason at every gap, and drops what made it loud: the red borders, the red rings, nine red chips and the red checkbox. It also closes the two gaps seen in `note`: a mistyped email has its reason under the field, and a missed chip question or the terms has a line right under it.
- **What `soft` looks like once built:** on an empty form it is still six red sentences, so it reads as six things to do; it is clearly quieter than live because no control changes. With one or two gaps, the usual case, it is one or two short red lines under normal fields. No third colour was tried: red text is the system's error text (`text-destructive`).
- **Seen in `note` and `first` (why they were not picked):**
  1. `note`, a mistyped email: the field looks filled and nothing beside it says what is wrong. On a phone the cursor opens the keyboard, and the line under the form may be behind it. Not checked on a real phone.
  2. `note`, chip questions and the terms: after a tap the browser draws no focus ring on a chip or a checkbox (it does for a keyboard), so nothing on the question marks it. A ring on the first chip was considered and refused: it reads as "Yes" being suggested.
  3. `first`: the red moves while the recruiter types. The first letter of the name turns the company field red.
  4. `note` on phones: the line is one line for most sentences and two for the longest, at 393, 375 and 320px. The button moves down 36 to 56px when it appears.
- **Screen readers:** `soft` and `note` set no `aria-invalid`. In `soft` each line is an alert and a typed field is described by its line. In `note` the line is a live region and the button is described by it.
- **Considered, not built:** a line that never changes ("Fill in every field to post a job"); grey lines in place of red ones.
- **Would change it:** Punna finding six red sentences still too much on an empty press; then `soft` for one or two gaps and the single line when more are missing.
- **Status:** Leaning (`soft`, Punna's direction; to confirm after seeing it). Live stays the full red until then. Code: `src/app/(auth)/onboarding/page.tsx` (`check`, `wordsOnly`), `src/content/onboarding.ts` (`missingNote`).

## 2026-11-13 — Login number: a country code or a leading 0 is dropped, the ten digits are kept

- **Question:** the number field kept the first ten digits of anything. Pasted `+91 98765 43210` became 9198765432, and Chrome's autofill of that number became 0987654321 (it writes the trunk 0 into a `tel-national` field). Both passed the 10-digit check and went on to the OTP.
- **Decision:** Punna, 2026-11-13: "Identify numbers pasted with a zero in front or +91 and place them accurately." The field keeps digits only. When more than ten digits arrive, leading 0s and one country code 91 are dropped, then the first ten are kept. Ten digits or fewer stay as typed, also when they start with 91 or 0, so typing one digit at a time is unchanged. One function, `mobileDigits` (`src/lib/mobile-number.ts`), used by `PhoneLoginForm`: `/login` and the homepage hero get the same digits. The homepage field's look is not changed.
- **Stores 9876543210:** `+91 98765 43210`, `919876543210`, `09876543210`, `98765 43210`, `0091 98765 43210`, and Chrome's autofill of `+919876543210`.
- **Known edge:** an eleventh digit typed onto a number that itself starts with 91 reads as a country code, and the field then shows nine digits. The rule cannot tell the two apart; the recruiter sees it at once and the form does not go on.
- **Would change it:** numbers from other countries being allowed.
- **Status:** Decided (Punna, 2026-11-13).

## 2026-11-13 — Login number: +91 shows once the label floats; the homepage keeps its own field

- **Question:** the floating label moved to the login (entry below). Its number field needs +91. Where is +91 while the label rests on the text line? And does the homepage hero's number field follow? It is the same form (`PhoneLoginForm`).
- **Decision, +91:** only after the field is tapped (Punna, 2026-11-13). Punna thought aloud about keeping +91 always in view on the left, then corrected it: "No, actually no. Plus 91 should only be visible after the field is tapped." Empty and not focused, the field shows one text, "Mobile number". On focus the label floats up and +91 appears before the cursor; it stays while there is a number. The label and +91 never share a line. In code: `FloatingInput`'s `prefix` shows with the value, as in Material.
- **Considered:** +91 always in view with the label always floated (the field would never show the floating motion, and an empty field would show two texts); +91 as its own segment with a rule (more chrome for one fixed prefix).
- **Decision, homepage:** not changed. `/login` passes `floatingLabel`. The hero's pill (48px, the CTA inside it) and `HeroLeadCard` (on no page today) keep their fields. The login and the hero already differed before this: a 44px field with its label above, against a pill with no visible label.
- **Would change it:** Punna wanting the homepage to match the login.
- **Status:** Decided (+91 timing; Punna, 2026-11-13). Open (homepage).

## 2026-11-12 — Login and onboarding on desktop: the form leaves the grey half and its card

- **Question:** Punna: on desktop the screen is split in two, the right half is grey, and on the grey sits another box. Three surfaces hold one form. What frame replaces it?
- **Decision:** `panel` (Punna, 2026-11-12). Live since 2026-11-13 on `/login`, `/login/otp`, `/login/enterprise` and `/onboarding`. One white page. The brand is a rounded panel (`rounded-card`) inset 16px from the window; the form sits on the page, with no card. Phones are unchanged: a brand bar, then the form.
- **Why:** it removes two of the three surfaces and leaves one object (the brand) and one page (the form), which is what phones already show.
- **The other two previews, deleted:** `flat` (the brand half and a white half; the soft gradient ended on a hard line against white and read as cut off) and `canvas` (one gradient, the form in a frosted card; it kept a card, and the inputs sat on glass over a moving gradient). `?shell=` no longer exists.
- **What it changed besides:** the brand panel stays in view while a long form scrolls. "Looking for a job?" moved into the panel beside the logo (as in the phone's brand bar), so the form side holds only the form and centres in the full height.
- **Measured, onboarding at 1440×790** (a 13-inch laptop's window): before, "Post a job" ended 60px below the fold (page 923px). Now, with the floating fields (entry below), the whole form shows with no scroll (page 790px).
- **Reopens:** "The login shell is shared, and it keeps its own look" (entry below, same day). The shell is still shared.
- **Not done:** the brand side's content is unchanged (the homepage pitch). For onboarding it could say what happens next instead; a separate question.
- **Would change it:** the Figma "What does apna offer" dark panel being wanted after all.
- **Status:** Decided (Punna, 2026-11-12). Code: `src/components/auth/auth-shell.tsx`.

## 2026-11-12 — Onboarding: text fields with the label inside (FloatingInput)

- **Question:** Punna: simplify the fields. Only the hint text in the field; on tap it moves to the top, as in Android's Material fields. Or something better?
- **Decision:** adopt (Punna, 2026-11-12), and the login follows. Live since 2026-11-13: onboarding's name, company and email; the login's mobile number; the enterprise email and password. They use the primitive `FloatingInput`. Two changes from Material's outlined field:
  1. The label floats **inside** the box, onto its top line, not onto the border. A label that cuts the border needs a patch of the surface colour behind it; a frosted or gradient surface has none.
  2. Choice questions (consultancy, employees) keep the label above the chips. A chip row has no text line for a label to rest on. The OTP boxes stay as they are.
- **Why:** an empty field shows one text, not two. The placeholders that only repeated the label are gone ("Your full name" / "Enter your full name", "Enterprise Email" / "Enter Enterprise email address"); "e.g. Swiggy" stays and shows on focus. The onboarding form is 42px shorter; on an iPhone 14 Pro (393×852) "Post a job" comes into view (it ended 25px below the fold). Recruiters know the pattern from Android apps.
- **What the login needed:** `prefix` (+91; entry above) and `trailing`, one small action at the end of the field: Show / Hide on the password, the info button on the enterprise email. Both were beside the label above the field before.
- **What it costs:** the label is 12px once the field is filled (14px above the field before). The example shows only on focus. One form has two label positions: inside for typed answers, above for choices.
- **Considered:** labels above with the repeating placeholders removed (a smaller change, larger labels, no height saved). Material's notch on the border (refused, reason 1).
- **Would change it:** recruiters missing the small label or an error in testing.
- **Status:** Decided (Punna, 2026-11-12). Code: `packages/design-system/src/components/ui/floating-input.tsx`; used in `src/app/(auth)/onboarding/page.tsx`, `src/app/(auth)/login/enterprise/page.tsx`, `src/components/marketing/hero-lead-card.tsx` (`floatingLabel`).

## 2026-11-12 — Alert and invalid chips: text on a tint takes the tint's own foreground

- **Question:** axe failed onboarding's offer banner (live) and the red chips of a missed choice question. Both are primitives: `Alert` `success` and `ChipTabs` `aria-invalid`.
- **Decision:** the rule from 2026-11-07 ("Text on a tinted fill uses that tint's `-subtle-foreground`") now holds in both. `Alert` `success`, `info` and `destructive` read `text-*-subtle-foreground` (`warning` already did); an invalid `choice` chip reads `text-destructive-subtle-foreground`.
- **Measured:** the role colour on its tint was 3.6–4.2:1 for the title and 3.2–3.6:1 for the description, light and dark. Now 6.9–9.2:1 and 5.9–7.2:1.
- **Shows on:** onboarding's offer banner; "Plan cancelled" (`cancel-plan-flow.tsx`) and the title-edit note (`job-title-edit.tsx`), both `info`; choice chips with a missing answer (onboarding, OnlyRounds job details and rounds).
- **Not fixed:** the stat labels on the login's brand side (shared `Stat`, also the homepage hero strip) measure 3.1:1 on the mesh. axe cannot read text over a gradient, so no test sees it.
- **Would change it:** Punna wanting a lighter text on these tints; then the `-subtle-fg` tokens change, not the components.
- **Status:** Decided by the 2026-11-07 rule; Punna to look at the three alerts.

## 2026-11-12 — Onboarding follows Figma "Onboarding fixes"

- **Question:** whose form wins for /onboarding: my layout, or the latest Figma (Onboarding file, page "Onboarding fixes", 4127:1760 phone, 4149:620 desktop, the frames with "Looking for a job?")?
- **Decision:** Figma's. The title is "Create your recruiter account". Consultancy is Yes / No chips (the desktop frame; the phone frame's checkbox differs). Employee size gains a "Not sure" chip. The email field is "Official email ID". A terms checkbox is added. Two exceptions. The email stays required, because the live spec makes it mandatory and only the phone frame says optional. The 10% offer banner stays, because it is the idea under test.
- **Not taken:** the Help and Log out icons, and the dark "What does apna offer" panel. The login shell is shared, and it keeps its own look.
- **Would change it:** Figma settles the phone/desktop differences.
- **Status:** Decided (Punna, "Yes, align it").

## 2026-11-12 — Onboarding: one screen, the live fields, the price said first

- **Question:** the prototype had login and OTP but no onboarding, so the journey to the first job could not be designed as one flow. What does a new recruiter see between the OTP and job posting?
- **Decision:** one screen, `/onboarding`: full name, company name, who they hire for (my company / my clients), number of employees (the six live ranges), work email. "Post a job" signs them in and opens job posting. Above the form, the first-job offer ("10% off your first job. Post it today. Jobs start at ₹699."); `?offer=off` hides it. In the prototype the OTP `1111` plays a number with no account.
- **Reason:** the fields are the live ones (Confluence, "Employer Onboarding Flow: Mandatory Email and Employee Count Verification", 2026-08-12, and "Mandatory Consultant Declaration during Onboarding"). Five short answers fit one phone screen; steps would add four taps. The offer says the price before any work, which is where half of new recruiters leave today.
- **Calls to confirm (Punna):** the consultancy checkbox became a two-way choice, so it cannot be skipped; the terms checkbox became the login's "By continuing, you agree" line, since they agreed one screen earlier (legal may want the checkbox back); the layout is ours, the live screen and the Onboarding Figma file were not looked at.
- **Would change it:** the live capture or Figma showing fields or an order this misses; the offer test failing (entry below).
- **Status:** Leaning (the screen); Open (the offer, as below).

## 2026-11-12 — Reinforce the recruiter from onboarding to payment

- **Question:** new recruiters pay 9% of the time, and half of them leave at the plan step. What keeps them going? (Punna's five points, 2026-11-12.)
- **Direction (Punna):**
  1. **Proof for new recruiters:** show how many candidates applied to similar jobs in the last 7 days, or how many recruiters hired for similar roles.
  2. **No upsell to new recruiters** (Punna, confirmed 2026-11-12). A recruiter who has never paid sees no upsell before their first payment; the pack can be offered after the job is posted or on a later posting. Existing recruiters keep the upsell.
  3. **Design one journey,** onboarding → job posting → payment, not three separate flows.
  4. **Proof for returning recruiters:** "your last job got N leads".
  5. **Individuals cannot post a job today.** Whether to let them is open.
- **Reason:** new and existing recruiters pass the form at the same rate; the gap is at the plan step (28.5% click pay against 66.6%) and nothing before it tells a new recruiter what they get. One point more of new recruiters paying is about ₹2.3 lakh a week of first-year value; one point for existing is about ₹0.6 lakh (`docs/reference/JOB-POSTING-DATA.md` §2g, §2h).
- **Rules for the proof lines:** real numbers for the same role and city; hide the line under a floor (a small or zero count argues against buying); prefer "candidates applied" to "recruiters hired" unless hires are reliably recorded; show it once the role and city are known and again at the plan step.
- **Not known:** how many sign-ups are individuals and where they are turned away; whether hire counts exist per role; the upsell step split by new and existing.
- **Would change it:** a test where the proof line does not lift clicks on pay; an upsell split showing new recruiters buy packs without dropping.
- **Status:** Decided (point 2); Leaning (points 1, 3, 4); Open (point 5).

## 2026-11-12 — Onboarding offer: 10% off the first job if posted today

- **Question:** new recruiters expect posting to be free and meet the price only at the plan step, where about 86% leave. Should onboarding say "post your job today and get 10% off"? (Punna's idea; it also answers the open question of 2026-11-11, whether to say the price before the form.)
- **Decision:** none yet. Worth an A/B test: new recruiters only, split at sign-up, one line in onboarding and the same line on the plan step. Judge it on paid orders per sign-up, order value and 90-day repeat, not on form starts.
- **Reason:** per week about 9,135 new recruiters enter posting and about 820 pay (9.0%) at about ₹1,012. The discount gives away about ₹0.8 lakh a week to those who would pay anyway; a new account is worth about ₹2,500 in its first year. So it breaks even at 9.4% paying; at 10% it adds about ₹1.4 lakh a week of first-year value, at 11% about ₹3.6 lakh. Sources: `docs/reference/JOB-POSTING-DATA.md` §2g, §2h. The lift itself is not known.
- **Risks to settle first:** it replaces the exit offer (FIRST10 already gives 10% to those who try to leave, and costs less); "today" must be a real 24-hour limit; discount-led accounts may repeat less; one message with the Jan 1 price rise, not two.
- **Already in flight:** the team's drop-off recovery experiment (Confluence PRD "New User Express Checkout Drop-off Feedback & Discount Recovery Experiment", Jira EM-1568, QA sign-off asked 28 Oct 2026) sends new recruiters who leave the plan step a WhatsApp with feedback options and a 24-hour 10% coupon, 50/50 against a holdout. Its feedback answers are the first direct evidence of why new recruiters do not pay; read its result before testing an upfront offer.
- **Would change it:** a test showing under 9.4% paying, or a lower 90-day repeat than today's 26%.
- **Status:** Open.

## 2026-11-12 — Price order is one component (Decided)
- **Question:** the "reads outward from the price" order (left: price, strike, %; right: %, strike, price) was hand-built per card, and OfferBar broke it on desktop.
- **Decision:** `PriceGroup` in the design system owns the order only (`align` start / end / responsive); callers keep sizes and placement. PricingCard, the Subscription tab and OfferBar use it.
- **Why:** a rule each card re-implements gets missed by the next card.
- **Not moved yet:** the phone plan rows (`MobilePlanRow`, `MobileUnlimitedCard`) and the checkout drawer's pack row already read right-to-left correctly but by hand, with their % under the price.
- **Would change it:** a price layout PriceGroup can't express.
## 2026-11-12 — OfferBar redesign goes into the design system

- **Question:** keep the redesigned banners as a preview, or make them the system?
- **Decision:** the design system's `OfferBar` is rewritten to the new design. It has a clay object, a badge for the trigger, a headline with one gold number, the price with the saving as text, a deadline between price and CTA, and a `default` emphasis CTA. `surface` is subscription / credits / urgent / festive. `RenewalBanner` is removed, and the plan-ended banner is now a rebuy `OfferBar`. The cases live in `src/components/apnahire/offer-banners.tsx`, and all of them show on `/apnahire/banners`.
- **Why:** Punna approved the cases ("you covered all the banners"). One banner replaces two look-alikes.
- **What would change it:** the new clay set (next), or a festive skin capability (examples are on /apnahire/banners).
- **Status:** Decided.

## 2026-11-12 — Rebuy / offer banners: three layout options (preview)
- **Question:** OfferBar and RenewalBanner spread info over three zones (headline | facts | price … CTA); the CTA feels detached from the offer.
- **Options** (preview on /apnahire/jobs?bar=…&banner=d|e|f, `src/components/apnahire/banner-options.tsx`; DS components untouched): A live. B and C (cluster, deal panel) rejected by Punna as too close to today. D stacked column with CTA under the copy + clay art right; E one-line strip with deadline box; F message + CTA left, white receipt card right. From the Figma references (Airtable, Kraken+, ClickUp, Codecademy, Etsy); D–F break DS rules on purpose.
- **Why these:** proximity — what you pay and the button that pays it read as one action; fewer scan zones (Hick).
- **Would change it:** Punna/Sumit picking one; then it moves into the DS component and the preview file goes.
- **Later rounds (same day):** S (two lines + priced CTA), then X from Punna's example (stat tile, chip, gold-free: new `bg-gradient-banner-hero` plum→sky with a green glow, per-month in blue, "Save ₹…" in green), then Y = X with a simple phone (Sumit lenses 1, 3, 5): headline, then price + Save, then CTA; tile, chip, facts and struck price hidden on phones; the subline stays when there's no price (auto-pay).
- **Gradient by family (user call):** subscription banners use the subscription upsell pop-up's look (plum `bg-gradient-offer-bar` with the gold bloom kept to a corner glow; the raw `bg-gradient-offer-premium` washes a wide bar brown); credits banners (job credits, database) use the credits pop-up's green `bg-gradient-offer`. New per-month price gold (`text-highlight`), as in the pop-ups. The preview `--gradient-banner-hero` was removed from the DS.
- **Templates:** 3 — single offer (tones: upgrade / renew / urgent), action without price (auto-pay), two offers (festive). Festive is a skin, not a template.
- **Saving as text, not a chip (user call):** as on the plans page, "−10%" after the struck price, no "Save ₹…" chip. On dark/green banners it uses a new token `--discount-on-dark` (apna green-300, beside `--lapsed-on-dark`): the plans page's dark green vanished, white lost the "saving" meaning. Desktop: price above the CTA; phones: full-width CTA.
- **Status:** Open.

## 2026-11-12 — One look for "show more" buttons

- **Question:** "More preferences" was a full-width outlined button; "More industries" and "More roles" were link buttons with a chevron. Which one?
- **Decision:** the link button with a trailing chevron (down to open, up to close), left-aligned, for every in-place reveal. Fixed: More preferences, the candidate panel's "Show all N" and "+N more", OnlyRounds' "Show more" and "See more". Rule in AGENTS.md ("Same pattern, same component").
- **Reason:** the same action drawn two ways in one flow reads as two different actions (Punna, 2026-11-12).
- **Would change it:** a reveal that loads a large section might earn a bigger button; decide it for every case at once.
- **Status:** Decided.

## 2026-11-12 — "Finish setup" becomes "Add more details", only what posting skipped

- **Question:** the after-posting list repeated Job location and Perks (both asked while posting) and was called "Finish setup", which sounds required.
- **Decision:** renamed "Add more details" ("Optional. Your job is already live."). Rows: who candidates call, walk-in, questions for applicants, distance, gender/age and other preferences. Location and perks dropped; changing them goes through Edit. Pop-up bodies now scroll, so the buttons stay on screen on phones.
- **Reason:** the job is live without it; asking again what was just answered wastes time (Punna, 2026-11-12).
- **Would change it:** data showing recruiters fix wrong locations mostly from this list.
- **Status:** Decided.

## apna Recruiter lockup: "Recruiter" tracked to match "apna" (2026-11-12)
**Status: Decided** (Punna)

- **Question:** "Recruiter" (Inter, outlined) looked loosely spaced beside the tight "apna" wordmark. How to balance them without touching the wordmark?
- **Decision:** only the letter spacing of "Recruiter" changed, in two passes; Punna asked for the second, tighter one. Each letter moved left by 0.95 to 1.3 units per pair (about −4% to −5% of the type size), less for R–e (0.4) and t–e (0.6), which already sat close. Average gap 1.76 → 0.85 units, against 1.35 in "apna"; tighter than "apna" because the letters of "Recruiter" are wider and more open inside. The lockup is now 157×24 (was 165×24). The "apna" artwork, the gap between the words, and the weight and size of "Recruiter" are unchanged.
- **Considered, not taken for now:** a heavier, narrower "Recruiter" (Inter Black squeezed to 92% matched "apna" best). Punna kept Inter Bold for now.
- **Why:** measured, "Recruiter" had Inter's default text spacing, about 30% looser than the wordmark's. Two words in one lockup read as one mark only when their rhythm matches.
- **Not done:** "Recruiter" is still lighter (stem 4.2 vs 4.6) and taller (capital R) than "apna"; that needs a heavier cut or a size change, a separate call. Figma's lockup component and the screenshot baselines are not updated.
- **What would change it:** a brand-team lockup file; then that artwork replaces this.

## Saved-reels tips: a second review lens, never a rule source (2026-11-12)
**Status: Decided** (Punna)

- **Question:** Punna collected design, Claude and dev tips from saved Instagram reels (Meta AI summaries). How should they shape the work?
- **Decision:** they live in the `reels-design-library` skill (`.claude/skills/reels-design-library/`). Its eight principles are read before designing; its review lens runs with Sumit's lenses before a change is shown (`design-variants`, 1c). AGENTS.md and this log win where they disagree.
- **Why:** the reels mostly restate rules we already hold (one green per surface, few type sizes, short motion), so they work as a check and as outside backing, not as new rules. Meta AI summaries were wrong in places (SQL injection figure, WCAG line height, Thinking Orbs platforms), so nothing from them is a rule until checked.
- **Not verified:** listed in the skill under "Not verified"; those items are never stated as fact or recommended.
- **What would change it:** a reel tip that contradicts a rule here and tests better on a real screen; then it is logged as its own decision.

---

## Editing a job after applications start: what may change (2026-11-12)
**Status: Open** (to circle back; Punna)

- **Question:** "View or edit job" needs an edit flow of its own (today it opens the whole posting flow). Once a job has applicants, which fields may still change?
- **Punna's view:** who candidates call (too many calls, divert them), questions for applicants (filter spam from then on) and perks may change; unsure why job location would; perhaps everything may change.
- **Proposal (not agreed):** three groups.
  - *Change any time:* who candidates call, walk-in details, questions for applicants, perks added. They affect what happens next, not who applied.
  - *Change, applies to new applicants only* (with a line saying so): distance, gender, age and other preferences, the address inside the same city, pay raised.
  - *Locked, repost instead:* title, job role, city, job type, pay lowered. They are what candidates applied to and what was reviewed.
- **Why not everything:** an applicant applied to a title, a pay and a place; changing those afterwards means calling people about a job they did not apply to.
- **Why location stays editable:** job location and walk-in location are the most edited fields on live (data bank §2d): a wrong pin or an incomplete address. A correction in the same area is safe; a move to another city is a different job.
- **Details that follow:** earlier applicants show "Not asked" for a question added later; tightening a preference never removes existing applicants; removing a perk is allowed.
- **Update, 2026-11-12 (data bank §2f, S11; Punna: accurate):** fields edited per job lifecycle: maximum salary 37.9%, minimum salary 26.8%, minimum experience 25.5%, education 24.5%, English 22.5%, title 20.4%, WhatsApp alert 13.2%, sub-department 13.0%, gender 11.3%, department 8.0%, walk-in 6.1%. No location field is in it.
  - **It breaks the "locked" group.** Title (20%) and job role (13%) are edited on live today, and pay most of all. Locking them would take away something a fifth to a third of jobs use.
  - **It weakens the location argument.** The earlier chart (§2d) showed only location fields; this table has none. Location stays editable, but "most edited" is no longer backed.
  - **Revised proposal (not agreed):** everything stays editable. Split by what the edit does, not by field: (1) applies at once (contact, walk-in, alerts, perks); (2) applies to new applicants, with a line saying so (pay, experience, education, English, gender, distance); (3) changes what the job is (title, role, city): allowed, but confirmed with "Candidates who already applied saw the earlier job", and likely reviewed again.
- **Punna's direction on pay, 2026-11-12 (Leaning):** do not allow the minimum and maximum salary to be edited after posting. Recruiters mostly change pay when the leads do not come, so fix the cause while posting: on the salary question, say when the range looks low or high for this role and city, so the first number is the right one.
  - **Claude's view (not agreed):** the hint is right and worth building first; it needs a pay range per role and city, which the prototype does not have. A full lock has a cost: 27–38% of jobs change pay today, and a recruiter who cannot raise it must repost, which spends a credit or leaves a dead job. A raise harms no applicant; a cut does. So: hint while posting, pay may be raised but not lowered after posting, and a job with few applicants gets the same hint as a nudge ("Pay is below similar jobs").
  - **What would settle it:** whether pay edits go up or down, and whether they come before or after the first applicant.
- **Punna on the other edited fields, 2026-11-12 (Leaning):** edits to education, English, experience and title are fine; there are many honest reasons (added by mistake, not needed for the role, no leads). The one thing to stop is gaming: a title changed so far that it is another job, to fish for a second pool of candidates. "Telesales" to "Telesales executive" is allowed; "Telesales" to "Field sales" is not.
  - **How to draw the line (Claude, not agreed):** the job role is locked after posting (the code's role list already says so). A new title is allowed when it still maps to the same job role (`categoryForTitle`); a title that maps to another role is refused with "This is a different job. Post it as a new job." Live shows role (sub-department) edited in 13% of lifecycles, so some of that is the gaming and some is a wrong first pick; the role suggestion while posting must be good for the lock to be fair.
- **Title edits, agreed in principle, 2026-11-12 (Punna; Leaning until the edit flow is built):** a new title close to the posted one is allowed; a title with a different meaning is not. When the typed title is too far, the field does not just refuse: an AI hint says it is a different job and offers close titles to pick instead ("Telesales executive", "Telecaller"), plus the way out, "Post it as a new job". Still open: whether the lock starts at posting or at the first applicant (Claude leans to the first applicant).
- **Preview built, 2026-11-12:** `?titleedit=1` in job details, ⋮ "About this job" → Job details → "Job title · Edit" (`JobTitleEdit`, `src/components/apnahire/jobs/job-title-edit.tsx`). A title in the same job role saves. A title in another role shows the AI note "This is a different job", close titles to tap, and "Post it as a new job"; Save is off until the title is close again. Prototype limits: "close" is the keyword role match, a title no rule matches is allowed, close titles are samples for five roles, and the new title shows in the panel row only. It applies from posting, not from the first applicant (that point is still open).
- **Preview built, 2026-11-12:** `?payhint=1` on the salary question (`PayHint` in `wizard-screens.tsx`). In range: one gray line, "Similar delivery jobs pay ₹18,000 to ₹26,000 a month." Midpoint below the range: a warning, "Pay looks low for this role", with "You cannot change pay after you post." Above: an info note, "Check that the amount is for one month." Sample ranges per job role, no city; live pay by role and city (Ana) must replace them. Off by default; nothing live changed.
- **Not known:** the exact fields live lets a recruiter edit after posting (step 3 fully, steps 1 and 2 partly, per Punna), and whether an edit sends the job back for review.
- **Still needed:** whether pay goes up or down; whether edits happen before or after the first applicant; whether the edit is the recruiter's or apna's review team's.
- **What would settle it:** the live list of editable fields, and why recruiters edit location (the edited-fields data by field and by time since posting).

---

## Job details: "About this job" holds the job's settings, edited in the same pop-up (2026-11-12)
**Status: Decided** (Punna)

- **Question:** in job details, ⋮ "About this job" had a "Preference" section whose Edit opened the whole posting flow. And once every Finish setup row was done, the card's banner went and there was no way back to those settings.
- **Decision:** the section is now "Job settings": the seven Finish setup rows with their answers (who candidates call, walk-in, questions, location, distance, preferences, perks). A tap opens the same step-through pop-up, titled "Job settings" here. "apna alerts" moved to its own "Notifications" section (it is not a job setting; no editor yet). "View or edit job" stays for the full job.
- **Why:** one editor for the same settings from the success screen, the job card and job details; it works for jobs from either flow.
- **Prototype limit:** only the last posted job has saved answers; other jobs show sample answers and save nothing. The posted job has no job details page of its own yet.
- **What would change it:** a settings area in job details outside the ⋮ panel.

---

## Job posting, essential: the Finish setup pop-up steps through the rows (2026-11-12)
**Status: Decided** (Punna)

- **Question:** every row had to be opened, answered and closed by itself, then the next one found in the list.
- **Decision:** the list stays as the overview. A tap on any row opens the pop-up there; "Save and next" saves it and moves to the next row not saved yet (later rows first, then earlier ones). "Skip" (outline) moves on without saving. The header says "Job location · 4 of 7". With no unsaved row left, the button is "Done" and the pop-up closes. Closing at any point keeps what was saved; Skip and close drop the open row's unsaved edits.
- **The guard:** it starts only on the recruiter's tap and every step can be skipped. A forced run of seven steps after posting would be the long form again, which essential exists to avoid.
- **What would change it:** recruiters closing at the first step more often than before; then go back to one row per pop-up.

---

## Job posting, essential: Finish setup rows show their answer; preferences and perks show a count (2026-11-12)
**Status: Decided** (Punna)

- **Question:** "Gender, age and other preferences" showed only gender and age, so a driving licence, a certificate or an MBA set there did not show.
- **Decision:** every row shows its answer, saved or not ("None", the job location, "Any distance"); the green tick says it was saved. Two rows show a count: preferences ("5 set", or "Anyone" when nothing is set) and perks ("4 perks", or "None"). Review also lists degrees under Preferences.
- **Why:** only the preferences row is complex: it holds languages, skills, must-haves, degrees, gender and age, which do not fit a row. The other rows hold one short answer, and "None" is a real answer.
- **Tried and dropped:** "Default" / "Done" as states on every row. Punna: it is unclear what the default is, and it hides answers that fit.
- **What would change it:** the preferences panel being split into smaller rows.

---

## Job posting: the job role shows three rows, then "More roles" (2026-11-11)
**Status: Decided** (Punna)

- **Question:** the role list grew to 19 tiles. On desktop it shares a page with Industry, which shows six and "More industries".
- **Decision:** the job role shows six tiles (three rows) and a "More roles" link, as Industry does, on phones and desktop. The picked or suggested role leads, so it is always in the first six.
- **Why:** two lists on one page behave the same way, and Industry is reachable without scrolling past 19 tiles.
- **What would change it:** recruiters picking a role outside the first six often; then order the six by how often each role is posted.

---

## Job posting, essential: Finish setup lives on the job's card, not on the dashboard (2026-11-11)
**Status: Decided** (Punna)

- **Question:** the Finish setup list sat as a block above the Jobs list. It felt wrong there: it is about one job, not the dashboard.
- **Decision:** two places only. (1) The "job is live" screen, as before. (2) The job's own card on the Jobs page: a banner "N optional details left to add · Finish setup" that opens the list in a side panel (`SheetPanel`; full screen on phones). The banner goes once every row is answered. The job just posted leads the Jobs list.
- **Chosen over** opening job details: the side panel keeps the recruiter in the list and is a short task; job details is a workspace for candidates.
- **What would change it:** job details gaining a settings area of its own.

---

## Job posting: recruiters with credits barely drop in the form (2026-11-11)
**Status: Data** (Mixpanel screenshot from Punna; table in `reference/JOB-POSTING-DATA.md` §2e)

- **Numbers (3 months, sessions, credit holders):** 11,510 started; 5.5% leave at step 1; 8.1% leave across the whole form; 98% click pay; 84.5% post.
- **What it corrects:** I had read the step 1 drop (new 20.9%, existing 13.8%) as mostly form friction. Credit holders lose 5.5% there, so most of that drop is intent or price doubt. The form's own friction is about 8 points end to end.
- **For the design:** step 1 is still the form's largest drop, so the opening is the right place to work. But the gain in completed posts is capped at a few points for committed recruiters. The case for the new flows rests on time to post, effort before the price, and phones, more than on conversion.
- **For the default-flow call:** the test should measure time and step 1 drop for new recruiters, not only posted jobs.

---

## Job posting, essential: Finish setup has a "Job location" row (2026-11-11)
**Status: Decided** (Punna)

- **Question:** the job location was asked once, with no way to change it after posting.
- **Decision:** Finish setup gets a "Job location" row, above "How far candidates can live". It opens the same location question as the flow.
- **Why:** on live, the job location and the walk-in location are the most edited fields (data bank §2d). Recruiters correct them after the fact, so the correction should be one tap.
- **What would change it:** the edited-fields chart with a window and totals showing location edits are rare per job.

---

## Job posting: new against existing recruiters in the live funnel (2026-11-11)
**Status: Data** (Mixpanel screenshot from Punna; full table in `reference/JOB-POSTING-DATA.md` §2b)

- **Numbers (3 months, sessions):** new recruiters 95,150 started, 19.0% posted; existing 57,340 started, 50.0% posted. Step 1: new lose 20.9%, existing 13.8%. Steps 2 and 3: 1–3% each. Review: 4–6%. Pay click: new 31.1%, existing 76.3%.
- **What it settles:** step 1 is the form's real problem for everyone, not only first-timers; the pay drop is the price surprise (a 45-point gap at the same screen). Existing recruiters are 38% of sessions and 61% of posted jobs.
- **For the design:** the opening of the flow is where a redesign pays; the later steps already convert. A repost shortcut for existing recruiters is worth a look, since they post most jobs.
- **Unexplained:** existing recruiters lose 11% between Review and the plan step; perhaps credit or subscription holders skip it.

---

## Job posting: the live funnel and time to post (2026-11-11)
**Status: Data** (from Punna's Figma board "02 · Problem", employer-app file, node 1610:19163)

- **Source:** Mixpanel "Job posting funnel", sessions, last 30 days at 3 Nov 2026, new recruiters only (user source = Onboarding). Times from Clarity, Step 1 to Review job.
- **Entries:** desktop 9,285 (56%), mobile web 7,328 (44%).
- **Funnel, share of the step before (count):**

| Step | Desktop | Mobile web |
|---|---|---|
| Step 1 continue | 83.3% (7,738) | 75.0% (5,498) |
| Review shown | 7,340 | 5,039 |
| Review next | 96.8% (7,107) | 87.1% (4,388) |
| Select plan | 97.6% (6,936) | 98.6% (4,328) |
| Pay button click | 26.9% (1,869) | 18.7% (808) |
| Job posted | 91.0% (1,701) | 85.4% (690) |
| Entered to posted | 18.3% | 9.4% |

- **Reading it:** of those who enter, 79% on desktop and 69% on mobile reach Review; 75% and 59% reach the plan step. Step 1 is the biggest drop inside the form (17% desktop, 25% mobile); mobile loses another 13% at Review. The largest drop of all is the plan step: only 27% (desktop) and 19% (mobile) click pay.
- **Time, Step 1 to Review:** 25th percentile 4.4 min desktop, 3.5 min mobile; 75th 12.5 and 8.4; 90th 26.3 and 13.9. The form has 25+ inputs over 3 steps. The board notes desktop and mobile are different users and job types, not a like-for-like comparison.
- **Recordings (40+):** dead clicks on dense chip groups (languages, requirements); the description sits below many selections; back-and-forth before preview; sessions dropped after interruptions or errors.
- **What it means for us:** a shorter first step and a phone Review that opens on the answers aim at the two form drops. But the form is not the main leak: a perfect form lifts "reached plan" from 75% to at most 100% on desktop and 59% to 100% on mobile, while the plan step loses three in four after that.
- **Who these sessions are (Punna):** user source = Onboarding, so each is a recruiter who has just signed up and is posting a first job. Many expect posting to be free and meet the price only at the plan step. The pay drop is therefore mostly a price surprise, not a fault of the plan page; and the form numbers describe first-timers, not recruiters who already know the form.
- **Open question it raises:** should the price be said before or early in the form? Not decided; it could cut wasted effort and it could cut starts.
- **Still missing:** which fields are edited most after posting; the split by ATS and dashboard; the returning-recruiter funnel.

---

## Job posting, essential: what it needed before it can be the default (2026-11-11)
**Status: Decided** (Punna asked for the fixes; the default itself is still open)

- **Finish setup answers are saved** as soon as the job is live and on each "Done", and the list shows on the Jobs page ("Finish setup · <title>") until every row is answered. Prototype: browser storage, last posted job only.
- **Gender and age, verified** (hand-posted jobs, real values, n = 206,977): 33.6% limit gender (20.5% male only, 13.1% female only); 36.1% set a real age limit (max under 60). Male only: Delivery 51.5%, Driver 47.6%, Field Sales 39.1%. Female only: Telesales 30.2%. Age: Customer Support 54.5%, Telesales 46.0%. The earlier 89% was a "field touched" flag, not a limit.
  - **So:** still never asked, but essential's Review always shows a Preferences row ("Any gender, any age" by default) with Change, and Finish setup keeps its row. A third of jobs use it; two thirds do not.
- **Six more roles have settings**, from the most common answers on hand-posted jobs: Inside Sales (12th, basic English), Business Development (graduate, basic), Loan Sales (12th, basic), Front Office (12th, basic), Restaurant Staff (English and experience only; basic English), Warehouse & Logistics (experience only). Data entry already maps to Back Office, and its numbers match. Title rules put the narrower sales roles before Field Sales.
- **Industry:** already the role's usual industry first, then the company's. In production the second comes from the company profile; nothing to build in the prototype.
- **What would change it:** a true ATS marker; funnel data.

---

## Job posting: which flow is the default, regular or essential? (2026-11-11)
**Status: Leaning** (recommendation; Punna to decide)

- **Question:** two flows exist. Which one should recruiters get by default?
- **Leaning:** essential, released as a test against regular, not a hard switch.
- **Why:** it is 11 taps against 27 by hand and 8 against 18 with AI (audit, phone, delivery job). The role defaults are right for most jobs: the most common answer covers 65–98% of jobs in the confirmed roles, and 60% of all jobs set experience to "any". Roles without a profile still get education, English and experience asked, so a wrong guess is not silent. Everything it skips stays editable at Review or after posting.
- **Risks:** gender and age may be set on 50–89% of jobs in some roles (unverified flags); the top 12 roles are only about 39% of hand-posted jobs; there is no funnel data, so the gain in completed posts is not measured.
- **Before it ships:** done on 2026-11-11, see the entry above.
- **What would change it:** funnel data showing recruiters do not drop off in the long form; gender and age confirmed as widely used (then show them at Review, not after posting).

---

## Job posting: distance has "Within the city", and relocation locks it to any distance (2026-11-11)
**Status: Decided** (Punna)

- **Question:** the distance choices were 5, 10, 15, 25 km and any distance. What about "anyone in the city", and a job that accepts candidates willing to relocate?
- **Decision:** a "Within <city>" choice sits between 25 km and any distance. When "Accept candidates willing to relocate" is on, distance is any distance: the other choices are disabled and a line says to turn relocation off in the job's location to set a range. The recruiter's earlier range comes back when relocation is turned off.
- **Why:** a range and relocation contradict each other; and many recruiters mean "anyone in Bengaluru", which no km value says.
- **What would change it:** live's own distance list, still not read.

---

## Job posting: what 265k live jobs say about role questions (2026-11-11)
**Status: Decided for Field Sales and Retail** (Punna); the rest Open

- **Decision:** Field Sales now asks education and English as well as assets and experience, starting on 12th pass and basic English. Retail Sales asks education, English and experience, starting on 12th pass and basic English. Both from the hand-posted numbers below.

- **Source:** Ana analytics, Employer pod, `core_job` joined to `employer_subdepartment`, jobs created from 2026-08-13 (n = 265,421). Test jobs and drafts not excluded. Education and English are filled on ~100% of jobs, so a value may be a default, not a choice.
- **Job mix:** Delivery 11.1%, Field Sales 7.2%, Telesales 6.1%, Cook 3.5%, Accounting 3.2%, Customer Support 2.8%, Retail counter sales 2.3%, Driver 2.3%, Back Office 2.1%, Inside Sales 1.8%, Restaurant staff 1.7%, Front Office 1.7%. The top 20 are about 58% of jobs.
- **Confirms the profiles:** Delivery (97.8% lowest education, 94.5% no English), Driver (87% / 85%), Cook (78% / 65%), Telesales (65% 12th, 67% basic English), Customer Support (68% 12th), Accounting (81% graduate, 80% basic English).
- **Disagrees:** Field Sales is profiled as "no education, no English", but 71% of its jobs set 12th or higher and 62% set some English. Retail is profiled "no education", but 66% set 12th or higher.
- **Experience:** any 60.4%, experienced 35.2%, freshers only 4.4%. Supports reading "freshers are fine" as "any".
- **Gender and age (unverified proxy flags):** gender looks set on 89% of Delivery and 74% of Driver jobs; age on 50–63% of Telesales, Field Sales and Customer Support. If real, "after posting, optional" needs a second look for those roles.
- **Regional language:** 16% for Customer Support, 9% Telesales, under 8% elsewhere.
- **No data:** distance (no column), night shift, the posting funnel by step, time to post, device, and which fields are edited after posting.
- **Roles with no profile yet:** Inside Sales, Restaurant staff, Front Office, BD / pre-sales, Banking sales, Data entry, Logistics.
- **ATS against dashboard (proxy only):** the job table has no column for how a job was posted. Proxy: organisations with 100+ jobs in the window (131 orgs, 58.7k jobs, 22%) are "likely ATS, bulk or agency"; the rest (about 206.8k jobs) are "likely posted by hand". Bulk-format jobs (6.7%) are nearly all Delivery and Driver.
  - **By hand, the mix changes:** Telesales 7.3%, Field Sales 5.7%, Cook 4.3%, Accounting 4.0%, Customer Support 2.9%, Retail 2.6%, Front Office 2.2%, Delivery 2.1%, Back Office 2.1%, Restaurant 2.1%, Inside Sales 2.0%, Driver 1.6%. 85% of Delivery jobs come from high-volume organisations.
  - **By hand, per role:** Delivery 86.9% lowest education, 74.3% no English (25% basic); Field Sales 77% set 12th or higher, 76% some English; Retail counter 65% 12th or higher, 72% some English; Telesales unchanged.
  - **To get a true split:** ask engineering which field marks an ATS or API post.

---

## Job posting, regular: an AI draft preselects "Any" education and "No English" where the role does not need them (2026-11-11)
**Status: Decided** (Punna)

- **Question:** a delivery job described to the AI left education blank in the regular flow, though we know delivery does not need it.
- **Decision:** after an AI draft, a role whose profile does not ask education or English (delivery, driver, field sales, cook, security, housekeeping; retail for education) starts on "Any" / "No English", marked AI-filled so the recruiter checks it. Never overrides what the description said. Typing the title by hand does not do this: a later title change would leave a stale answer. (`openAnswersForRole`, `role-profiles.ts`.)
- **Why:** the AI is told to leave those fields empty for such roles; blank made the recruiter answer what we already know.
- **What would change it:** role profiles from live data.

---

## Job posting: education has "Any", and 10th means 10th pass (2026-11-11)
**Status: Decided** (Punna)

- **Question:** the lowest option was "10th or below · Anyone can apply". Review called it "Any", but the education screen had no "Any" to pick, so Edit showed a different word for the same answer.
- **Decision:** education gets its own first option, "Any · Education does not matter". "10th" is now "10th pass · 10th pass or higher", a real minimum like the rest. Roles that do not need education (delivery, site work) are set to "Any". Candidates are not shown an education line when it is "Any".
- **Why:** "we don't care" and "at least 10th" are different answers; one label for both made Review and the screen disagree.
- **What would change it:** nothing expected. Live's own list was not re-read (signed out).

---

## Job posting, essential: the eight live fields it does not ask (2026-11-11)
**Status: Decided** (Punna)

- **Question:** live asks distance, experience-based skills, past industry experience, gender, age, languages, degree and night shift. What happens to each in essential?
- **Decision:**
  - **Distance:** kept, never asked; the default is any distance, for every workplace and both flows (Punna, 2026-11-11; `distanceKm()` in `job-draft.ts`), changed after posting in Finish setup ("How far candidates can live": 5, 10, 15, 25 km, any distance — live's choices). Regular asks everything, so it shows Distance under Preferences ("Anyone you'd prefer?"), after Languages (Punna, 2026-11-11).
  - **Experience-based skills:** dropped as a field; part of Skills, which the AI fills.
  - **Past industry experience:** dropped from posting; stays in the description if the recruiter says it.
  - **Gender, age:** after posting, optional ("Gender, age and other preferences" in Finish setup).
  - **Languages:** read from the description and shown at Review (Preferences); otherwise not asked.
  - **Degree:** not asked.
  - **Night shift:** read from the description; Review has a "Shift" row (Day shift / Night shift) with Change.
- **Why:** search-filter use (entry below, 2026-11-09): distance is the most-set filter (38.6%), but narrowing it is the recruiter's choice, so it starts open; gender 20.3% and age 22.4% each shut candidates out; industry and languages 6–7%; degree ≤3%. Night shift is something a candidate must know before applying, so it cannot live only in the description. Languages matter for calling roles.
- **What would change it:** job-posting data (these numbers are from candidate search); a role where recruiters set gender or age most of the time.

---

## Job posting: the short flow is retired into regular (2026-11-11)
**Status: Decided** (Punna)

- **Question:** with its desktop pages already the default, short differed from regular only in how Review sends you to missing answers. Keep it as a separate preview?
- **Decision:** no. Review now takes the recruiter through every missing answer in one pass, then back to Review, in every flow. `?flow=short` no longer does anything. Two flows remain: regular (asks everything) and essential (asks only what matching needs).
- **Why:** a third flow that looks the same as regular confused the comparison, and one-pass is better: Review no longer drops the recruiter mid-flow after the first fix.
- **What would change it:** nothing expected; essential's decision is separate.

---

## Job posting, essential: an unmatched title stays "Other" (2026-11-11)
**Status: Decided** (Punna)

- **Question:** the essential flow never asks the role; a title no rule matches becomes "Other" silently. Ask the role in that case?
- **Decision:** no; keep "Other". The description already leaves "Other" out.
- **Why:** Punna's call; it keeps the essential flow free of a conditional question.
- **What would change it:** many jobs landing in "Other", or wrong-candidate complaints traced to it.

---

## Job posting: phone Review answers first; a shorter AI draft wait (2026-11-11)
**Status: Decided** (Punna: "proceed as recommended")

- **Question:** on phones the candidate view filled the first ~780px of Review, so the rows to check started a screen down. And "Draft my job" held one line for ~17 s, then played a ~7 s reveal after the answer had arrived.
- **Decision:** phone (below lg) Review opens on the answers; "See what candidates see" (outline) opens the candidate view in a bottom sheet. The draft strip rolls "Understanding the role… → Setting location & pay… → Working out who can apply… → Writing the job description…" every 4 s while waiting, holds the last, then "Ready, let's check it" for 0.7 s. No "Found: …" reveal; the questions show what was found.
- **Why:** Review is for checking answers; the preview is a second look, one tap away. The wait is the AI's, so the lines run during it, not after. Measured: 20 s (was ~25 s).
- **What would change it:** streaming the draft (then the lines can name what it really found as it finds it).

---

## Job posting, desktop: a topic's questions share a page, both flows (2026-11-11)
**Status: Decided** (Punna)

- **Question:** with the candidate view only at Review, the regular desktop flow was 16 near-empty one-question pages. Group them?
- **Decision:** yes, on desktop in both flows. Regular uses the `?flow=short` split (5 pages: job basics, location and pay, who can apply, description, interview and contact); essential keeps its own. Phones keep one question per screen. A failed Next on a page names every missing answer under its question, with "N answers missing" in the footer. Stage 3 is "Setup & review", since it holds Review.
- **Also:** a title preselects its role, usual industry and workplace (`suggestFromTitle` in `job-draft.ts`), on every path and after an AI draft that left them empty. A changed title replaces only answers still on the last title's suggestion. Essential takes the role's industry before the company's.
- **Why:** 11 fewer presses of Next, and the same desktop pattern in both flows. The title already tells us the role, and for most roles the industry and workplace.
- **What would change it:** recruiters missing a question further down a long page (then split the page).

---

## Job posting, desktop: preview at Review, ruled sections, one AI note, description step (2026-11-11)
**Status: Decided** (Punna)

- **Question:** on desktop the candidate view sat beside every question; grouped pages (essential, short) ran together with no section breaks; every question heading carried "AI-filled · check it"; and the essential flow wrote the description only on Review.
- **Decision:** (1) desktop shows the candidate view only at Review; before it, one centred column like phones. "What candidates see" under salary stays. (2) On a page of several questions, a `Separator` between them. (3) That page carries one note at the top, "AI-filled from your description · check it", instead of a tag per question; one-question screens keep their own tag. (4) The essential flow has a description step of its own after "Who can apply", on phones and desktop, so the recruiter reads it before Review.
- **Why:** a preview of a mostly empty job is noise, and it squeezed the form; the preview earns its place where the post is checked. A repeated tag stops being read. The description is the longest thing the recruiter approves; reading it inside Review's list hides it.
- **What would change it:** recruiters missing the live preview while answering (then a "Preview" button, not a permanent column).

---

## Job posting: a single-choice screen moves on at the tap (2026-11-11)
**Status: Leaning** (from the 2026-11-11 audit; Punna to confirm)

- **Question:** role, industry and workplace each took a tap and then "Next". Should the tap be enough?
- **Decision:** yes, on a page that is that one question alone (`advanceOn` on the screen): the pick shows for 250 ms, then the next screen opens. Back to it does not move on again. Job type (night shift toggle), education and English ("Must have" toggle after the pick), experience (years) and pay keep "Next", because more follows the pick. Desktop grouped pages keep "Next".
- **Why:** the tap already is the answer; the second tap is a confirmation nobody needs. Saves about 3 taps per manual job, fewer surprises than including screens with a follow-up control.
- **What would change it:** recruiters mis-tapping and having to come back, or moving the follow-up toggles off those screens (then education and English join).

---

## Leadership and management: one page (2026-11-11)

- **Decision:** `/about/management` is merged into `/about/leadership` and redirects there. The page shows the founder, CEO and COO as rows, then "Leading apna forward" over the management team's cards, then the investors. Nav and footer lose "Management team". Kathak Mehta is dropped on purpose (Punna).
- **Why:** The Lovable site merged them. Lovable gives the content only; the layout and look stay ours.
- **Status:** Decided (Punna, 2026-11-11).
## Premium + AI rolling line: phone and desktop differ on purpose (2026-11-11)

- **Question:** On phones the "AI calling agent" line itself rolls through the AI points; on desktop "AI calling agent" is a fixed heading with a rolling line under it. Is the difference a bug?
- **Decision:** No. It's deliberate. Phone: one feature line that starts as "AI calling agent" and rolls to "30% higher call pickup", "Ready to interview candidates", "Hindi & English calling" (`RollingLabel`). Desktop: fixed "AI calling agent" heading in the AI block, rolling line under it from "Calls all applicants" (`RollingPoint`).
- **Why:** Punna's call: the phone card has room for one line, so the agent's name has to share it with its points.
- **Changes it:** a phone card with room for the full AI block.
- **Status:** Decided

## Payment success: next step by what was bought (2026-11-11)

- **Question:** Every success page offered "Post a job now", even right after a job was posted or after buying database credits.
- **Decision:** Primary (green) / secondary (outline):
  - Express checkout (job just posted): **Go to dashboard** / Search candidates.
  - Self-checkout, job credits or a subscription: **Post a job** / Go to dashboard.
  - Self-checkout, database credits: **Search candidates** / Go to dashboard.
  The way out is "Go to dashboard", not "Done": it names where it leads.
- **Why:** Punna's call: the primary is the next task for what was bought; posting again after posting was the old support issue. "Done" vs "Go to dashboard" was open; picked the named destination.
- **Changes it:** a dashboard that isn't the recruiter's home, or a purchase that mixes job and database credits (today it follows the first line).
- **Status:** Decided (CTAs), Leaning ("Go to dashboard" over "Done")

## Review states page in the design system (2026-11-11)

- **Decision:** `/design-system/engineering/review-states` lists every review state (express `layout` + `credits`, self-checkout `tab`, jobs-list `bar`, job candidates `tab` / `applicants` / `deck` / `views` / `pill`). It has a builder that makes the URL, and a ready-made link for each state. The pricing phase can be switched there for this browser.
- **Why:** after the hidden preview panel went (2026-11-07), nobody could find the states. This brings the panel's job back without making product copy a control.
- **Would change it:** account data that replaces the params.
- **Status:** Decided (Punna, 2026-11-11).

## Homepage hero screen: a frosted glass frame, no browser bar, no shadow (2026-11-11)

- **Question:** Give the dashboard capture a browser bar and elevation, as in Punna's reference?
- **Decision:** A sheer glass frame (`bg-surface-glass-faint`, 40%, light blur; 12px sides and bottom, 40px top that reads as an empty browser bar; `rounded-card`) with the capture inset (`rounded-card-nested`). No fake dots or URL. No shadow: resting surfaces stay flat; the glass and the glow give the lift.
- **Would change it:** Punna wanting more lift (then `shadow-elevated` once, as a hero exception).
- **Status:** Decided

## Homepage hero: one rounded field with the CTA inside (2026-11-11)

- **Question:** The field and the button beside it read as two parts.
- **Decision:** One 48px fully rounded field with the green CTA inside at its end, 4px in (as `SearchFilterBar`'s phone search holds its Filters pill). Phones: "Continue"; from sm: "Login / Sign up". Placeholder "Mobile number". A one-off: every other input keeps `rounded-field`.
- **Why:** Punna's call: one simpler control. Short phone label so a 10-digit number fits at 320px.
- **Status:** Decided

## Pricing phase defaults to today (2026-11-11)

- **Question:** A fresh login showed the Jan 2027 new-prices banner.
- **Decision:** `DEFAULT_PRICING_PHASE` is "today" (was "december"). The other phases stay reachable by setting `apnahire:pricing-phase`.
- **Why:** Punna's call: today's prices are what a recruiter sees now.
- **Status:** Decided

## Page gradient: the gold brand gradient again, legacy mesh only on logged-in plans (2026-11-11)

- **Question:** Which mother gradient do the marketing pages wear?
- **Decision:** The gold "brand gradient" is live in `:root` (marketing, login, everything). The legacy mesh stays only on the logged-in plans page (`/apnahire/credits`), which marks itself `data-canvas="legacy-mesh"`. Mother plum stays a preview (`?mother=plum`).
- **Why:** Punna's call.
- **Status:** Decided

## Homepage hero: "AI-native" is a sky-to-green sweep (2026-11-11)

- **Question:** The plum text gradient barely showed on the dark headline.
- **Decision:** `--gradient-text-brand` sweeps sky-600 → green-600 (dark: sky-300 → green-300), still the slow `animate-text-gradient` flow.
- **Why:** AI elements wear sky (AGENTS.md); green ties it to the brand. Darker steps keep it readable as a headline.
- **Would change it:** Punna preferring plain text.
- **Status:** Leaning

## Homepage hero: the eyebrow is plain text, not a chip (2026-11-11)

- **Question:** The white hero chip and the white mobile field looked like two inputs.
- **Decision:** Every marketing hero's label (`HeroChip`) is small gray text with its icon, no box. Started on the homepage, then applied to all pages the same day.
- **Why:** Punna's call. Frosted glass barely differed from white; removing the line was the other option.
- **Status:** Decided

## Homepage hero: the candidates page under the form (2026-11-11)

- **Question:** Show the product in the hero, as product-led SaaS sites do?
- **Decision (live; was the `/?hero=screen` preview):** A real capture of a job's candidates page under the form, on a green-and-sky glow (`hero-glow`). Desktop only; phones show no screen (Punna). No play button until there is a demo video. Not the pricing page: the candidates page shows the result a recruiter gets.
- **Why:** Punna's reference; the hero said what apna is but never showed it.
- **Would change it:** captures going stale as the page changes.
- **Status:** Decided

## Marketing headlines: Google Sans Flex bold, not Fraunces (2026-11-11)

- **Question:** Keep the serif (Fraunces) on marketing headlines?
- **Decision:** Google Sans Flex, bold, on every marketing headline and section title (text-editorial-display, text-editorial-h1/h2, text-hero-h1/h2); card titles stay Inter. Body and product stay Inter. The hero fills the first screen with the stats at its foot; "Hiring at scale? Enterprise login" in small text, no icon. Inputs keep `rounded-field` even beside a pill button.
- **Why:** Punna's call: the serif felt off; the enterprise link needed a lead-in. Fully rounded inputs exist nowhere else.
- **Would change it:** Brand asking for a different display face.
- **Status:** Decided

## Homepage hero: one centred stack, no card (2026-11-11)

- **Question:** Should the hero keep copy on the left and the login card on the right?
- **Decision:** One centred stack: chip, headline, subtext, mobile number + "Login / Sign up" in one row, "Enterprise login" under it, then the stats. No card title and no terms line.
- **Why:** Punna's reference (a centred SaaS hero). The terms already show on the login steps that follow, so the hero need not repeat them.
- **Would change it:** Legal asking for the terms at the first tap, or sign-ups falling.
- **Status:** Leaning

## Marketing footer: links, then the wordmark, then the legal bar (2026-11-11)

- **Question:** How should the marketing footer be arranged?
- **Decision:** Social buttons and app links on the left (no small logo or tagline: the wordmark and the contact band already say it), four link columns with gray overline headings on the right, the "apna" watermark under them, and the copyright + legal bar last.
- **Why:** Punna's reference (a dark template footer): the watermark reads as the sign-off between content and the fine print.
- **Would change it:** The watermark feeling cut off from the page end on phones.
- **Status:** Leaning

## Job posting: the description writes itself in the AI's voice (2026-11-10)
**Status: Decided** (Punna)

- **Question:** the description step wrote itself on arrival, but as a plain line, an outlined "Stop" button and an empty box; Describe's "Draft my job" has the loading ring, the backdrop and a rolling status strip. Should the two match?
- **Decision:** yes. While the description is being written, the box wears the loading ring, the page the AI backdrop, and a strip under the box rolls "Reading your answers…", "Writing the summary…", "Listing the responsibilities…", "Adding the requirements…". The text then types into the box (read-only until it lands). The one way out is a link in the strip, "Stop, I'll paste mine" ("Stop" on phones), which leaves the box empty and focused with "Paste or type your description"; "Write it for me" comes back for a change of mind. The essential flow's Review row gets the same strip, compact.
- **Why:** the AI does the same work in both places, so it should look the same (`WritingState`, `useTypeIn` in `post-job/writing-state.tsx`). The way out is a link, not a CTA: the AI is working, not asking. The wait is real (10–15 s with 3.8 Flash), so the lines are not decoration.
- **Also fixed:** the write on arrival used a draft ref that an effect updates after the screen's own effect, so a resumed draft wrote from an empty summary; the screen now passes its draft.
- **Toned down (Punna, 2026-11-11):** the ring and the backdrop were too much, and on a phone the strip overlapped the box's corner and sat washed out under the glow. Now the box shows a skeleton while writing, the strip is a plain muted row under it (the sparkle pulse is the only animation), and the text still types in. One place animates, not three.
- **Length hint (Punna, 2026-11-11):** "Aim for 150+ characters · 0 / 3000" is advice to a person typing, so it is hidden while the AI writes and while its text types in; it shows once the box is theirs to edit.
- **Rewrite with AI (Punna, 2026-11-11):** hidden while the description is written and while it types in; it shows only once there is a description to amend (pasted, typed or the AI's, landed). The "answers changed" alert hides while writing too.
- **What would change it:** streaming the description (then the text arrives word by word and the strip becomes the stream).

---

## Job posting: one role profile drives every surface (2026-11-10)
**Status: Leaning** (built in the `?flow=essential` preview; the table itself is an estimate)

- **Question:** how do we decide which questions a role needs, and keep the chips, steps and Review in step with that?
- **Decision:** one table, a profile per job role (`src/lib/apnahire/role-profiles.ts`). A profile says which "who can apply" questions the role asks and what each starts at. Every surface reads it: the Describe chips, the steps, the defaults, the Review rows. Nothing else keeps its own list.
- **Today:** the role comes from the title by keyword rules (13 roles); the profiles are hand-written by design judgement in three families (desk, field, site).
- **For production:** build the table from the live form's data (per role, how often recruiters set each field to something other than its open answer; ask a field above a threshold, skip it below), keep it as server config so it changes without a release, and let the AI draft return the role so the same profile applies.
- **Connected (same day):** the description writer and the candidate preview leave out an open answer ("10th or below", any experience) in the essential flow, so a skipped question never shows as a requirement. The AI draft's prompt now carries the profiles too (`roleRulesForAi`, sent when the page is on `?flow=essential`), so with live AI the draft fills only what the role asks. Verified live (2026-11-10, new key in `.env.local`): a delivery text that says "12th pass, good English" comes back with no education or English, in the fields and in the description; a telecaller keeps both. **Model (Punna, 2026-11-10): the job draft uses `gemini-3.8-flash` (`DRAFT_MODEL` in `src/lib/ai/google.ts`), chosen 2026-11-10 after trying `gemini-3.1-pro-preview` and `gemini-3.5-flash` too. All three return the same fields on the five demo roles; 3.8 Flash writes the most concrete descriptions of the two Flashes (specific duties, no repeated points), at 14–19 s a draft against 3.5's 11–16 s and Pro's 13–23 s. One nuance: 3.5 Flash read "freshers welcome" as fresher, where 3.8 and Pro gave any. Accuracy comes before speed and cost (Punna); `gemini-2.5-pro` is closed to new keys. The OnlyRounds routes keep Flash. Along the way the live route itself was fixed: Gemini's structured output returned two fields for an all-optional schema, so every field is now required-but-nullable.
- **Demo:** the Describe screen offers five roles to try (delivery, telecaller, housekeeping, accountant, field sales); one tap fills the description.
- **What would change it:** roles the keyword rules cannot tell apart; then the role must be picked or confirmed, not inferred.

---

## Job posting: an AI draft walks the same questions (2026-11-10)
**Status: Decided** (Punna)

- **Question:** after "Draft my job", go straight to Review, or through the questions?
- **Decision:** through the same questions as by hand, in the same order, with the answers filled in. The recruiter taps Next to confirm each. This holds for the live flow and both previews, on phones and desktop.
- **Why:** one path to learn. The jump to Review made the AI path a different flow, hid answers the recruiter never saw, and sent them out and back for anything missing.
- **Replaces:** "AI draft lands on Review" (option D) in the entry below.
- **Kept:** if an answer goes missing after its screen (a later edit), Review still asks for all of them in one pass.
- **What would change it:** data that recruiters tap Next through every filled screen without reading; then a shorter confirm step is worth a test.

---

## Job posting: one question per screen on phones (2026-11-10)
**Status: Decided** (Punna)

- **Question:** should a phone screen hold more than one question, to cut the number of screens?
- **Decision:** no. On phones every question has its own screen, in every version of the flow. Fewer screens come from asking fewer questions, not from sharing a screen. Desktop may group a topic's questions on one page.
- **Why:** two questions on a phone screen scroll, hide the second one under the fold, and make "Next" unclear about what it confirms. Grouping only moved the work; it did not remove any.
- **Not a question:** a line with "Change" (the joining fee under the salary) may share a screen.
- **What would change it:** nothing planned. This replaces the phone grouping in the two previews below.

---

## Job posting: which questions does a job need? (2026-11-10)
**Status: Leaning** (built as a preview, `?flow=essential`, 2026-11-10; waiting for Punna's review)

- **Question:** the short flow only put the same 16 questions on fewer pages. Which of them must the recruiter answer to post a job?
- **Proposal:** sort every field into four groups.
  - **Ask (4):** job title, location with workplace, salary, joining fee.
  - **Confirm (3, filled in for them):** education, experience, English, set from the job role, on one page.
  - **Do not ask:** job role (from the title), industry (from the company), pay type (from the salary), description (the AI writes it).
  - **Default, change on Review:** job type (full time), walk-in (no), contact (me), perks, preferences, screening questions.
- **Why:** candidates are matched on role, place and pay. The rest is a filter or has one common answer, and a question with a common answer should be a default.
- **What would change it:** the back end or policy needs a field answered by hand; data shows a default (full time, role-based education) is wrong too often.
- **Not confirmed:** industry on the company profile; role-based defaults for who can apply.
- **Added 2026-11-10 (Punna): ask some of it after the job is posted.** Leads do not arrive at once, so the wait is the time to ask.
  - **After posting, as a "Finish setup" list** (payment confirmation and the job's page): walk-in or interview details, who candidates contact, screening questions, perks, preferences, description edits.
  - **Each has a default, so a job nobody finishes still works:** contact is the recruiter who posted, no walk-in, no screening questions, no perks shown, no preferences.
  - **Stays before posting:** title, location, salary, joining fee (candidates see it; safety), and who can apply (alerts go out when the job is posted, so a wrong filter wastes them).
  - **Not confirmed:** whether an edit after posting sends the job back to review on the live product; whether alerts go out at once or after review.
- **Added 2026-11-10 (Punna): the questions follow the kind of job.** A delivery job does not need education; it needs a two-wheeler and a licence. So "who can apply" is not one fixed page of education, experience and English.
  - **One table, a profile per job role** (the 13 in `CATEGORIES`, found from the title by `CATEGORY_RULES`): which "who can apply" questions the role asks, what they default to, and what is hidden (still reachable through "Add a requirement").
  - **Three families to start:** desk and calling (education, English, experience); field and delivery (vehicle, licence, smartphone; no education or English); home and site work (experience only, plus gender or age where recruiters ask it).
  - **A hidden question takes the open answer** ("any"), never a narrow one.
  - **Not confirmed:** the profiles are my estimate. They need the live form's data (what recruiters pick per role) before they ship.
- **Skipped questions stay on Review (Punna, 2026-11-10).** A question a role skips (education and English for delivery) is set to its open answer ("Any", "Not needed"), left out of the steps, and shown on Review as its own row with Edit. So nothing is decided out of sight, and one tap changes it.
- **Phone audit, 2026-11-10:** the essential flow now has its own step names (step 3 is "Review"), step menu, progress and manual intro; Review marks missing answers; the manual path gets the role's skills as the AI path does. The live flow needed no change.
- **As built:** pay type defaults to fixed (three choices stay on the pay page). Review lists only what narrows who can apply ("Anyone can apply" when nothing does). "Finish setup" sits on the job-live screen; its answers are not saved to the job yet.

---



## Job posting: fewer steps, and one step at a time on desktop? (2026-11-10)

- **Question:** the flow asks 16 questions on 16 screens, on phones and desktop alike. Desktop has the room for more. Airbnb and most onboarding flows still go one step at a time. Which way?
- **Options:** (A) keep one question per screen everywhere. (B) one long form on desktop. (C) group related questions into pages: short pairs on phones, a topic per page on desktop. (D) after "Draft my job", skip the questions and land on Review.
- **Decision (leaning, built as a preview at `?flow=short`):** C and D together.
  - Phones: 16 screens → 10 pages (title + role, job type + workplace, salary + perks, English + experience, preferences + questions, interview + contact; industry, location, education and description stay alone).
  - Desktop: 16 screens → 5 pages (the job; location and pay; who can apply; description; interview and contact).
  - AI draft: Describe → Review, when the draft answers every required question. If it misses any, the missing ones are asked first, one page after the other ("Next", then "Done" on the last), and only then Review.
  - Changed 2026-11-10 (Punna's review): the first build went to Review with answers missing, and "Choose a plan" sent the recruiter out and back once per missing answer. Review must never be a place you are bounced from: ask everything missing in one pass.
- **Why:**
  - One question per screen pays off when each answer needs thought and the person does it once (Airbnb hosts, onboarding). A recruiter knows these answers, posts often, and most answers are one tap. 16 "Next" taps is the cost; the questions are not.
  - Desktop shows the candidate preview beside the form, so several answers on one page still give instant feedback.
  - One job-details page on desktop was 4.7 screens tall, so it is two pages. No page is over 3 screens.
  - Once the AI has filled the form, the task is "check it", and Review already does that with an Edit per section.
  - Phones keep small pages: a long form on a phone hides errors and the keyboard covers the footer.
- **What would change it:** recruiters skipping the lower questions on a page; AI drafts that are often wrong (then walk the pages after the draft); data showing first-time posters finish the 16-screen flow more often.
- **Open:** Review does not yet mark what is missing before "Choose a plan" is pressed. Industry could come from the company profile, not be asked per job.
- **Status:** Leaning. The live flow is unchanged.

## Job posting: mic beside the send arrow (2026-11-10)

- **Question:** the Speak pill sat at the bottom left of the Describe box, hard to reach with a right thumb. Where should voice go?
- **Decision:** a round mic button next to the send arrow, both at the bottom right (ChatGPT, Claude). The arrow is always shown and disabled until there is text. Options weighed: one button that swaps mic → send (WhatsApp), and Speak in the footer (Gemini Live).
- **Why:** thumb reach on phones; a familiar pattern; you can speak, then type to fix, then send. The swap hides the mic once text exists.
- **What would change it:** recruiters missing the mic (it lost its "Speak" label), or the two ways to proceed (arrow and "Draft my job") confusing people.
- **Status:** Decided (Punna's call).

## Job posting: Describe chips are status, not buttons (2026-11-09)

- **Question:** a user tapped the Role, Area, Salary and Who can apply chips to add that information. They only tick as the prompt covers each one. Should a tap work, or should they stop looking tappable?
- **Decision:** they stay read-only and appear only once the recruiter starts typing or speaking. The + and dashed outline go; an unticked chip is a plain outlined pill with an empty circle (Punna's call).
- **Why:** the + and dashed outline were what invited the tap. The placeholder's example already says what to include, so the empty screen does not need them. Once there is input, they show what is covered.
- **What would change it:** users still tapping them in testing. The alternative is a tap that adds "Salary: " to the box and focuses it.
- **Status:** Decided.

## Small icons for card facts (2026-11-09)

- **Question:** should job and candidate cards use small icons instead of dots?
- **Decision:** yes, the default on phones and desktop (Punna's call; ?icons=0 shows the dots until they are deleted). Job cards: pin, calendar, user, which also drop "Posted" and "By". Candidate cards: briefcase, pin, and a plain clock for Applied, which replaces the green dot. Salary has no icon because the ₹ already says it. Phone cards show only the area, so the line still fits.
- **Why:** an icon earns its place when it replaces a word or a dot.
- **What would change it:** the line feeling busier than the dots at phone width.
- **Status:** Decided.

## "Follow up" as a call status (2026-11-09)

- **Question:** a recruiter may call someone and not decide yet. Answered and Did not pick up do not cover it.
- **Decision:** add "Follow up" to the call status on phones and desktop. It records the call and decides nothing, so the candidate stays out of Shortlisted and Rejected.
- **Why:** it says what happens next, and the candidate is not lost in "Viewed number".
- **What would change it:** recruiters needing a follow-up date or reminder; this has neither yet.
- **Status:** Decided (Punna's call on the need; the label is a recommendation).

## Desktop profile actions as a floating pill (2026-11-09)

- **Question:** the compact profile's footer could leave the screen. Fix the footer, move the actions to the top, or float them?
- **Decision:** the default (Punna's call; ?pill=0 shows the old footer until it is deleted): a pill floating over the bottom of the profile, in compact and the side panel. The profile scrolls clear of it. Separately, the compact pane now measures the room left, so it fits the window in every state.
- **Why:** it stays in reach and keeps the phone's "actions at the bottom" habit, with no bar across the content.
- **What would change it:** the pill covering content recruiters are reading.
- **Status:** Decided.

## Table filters open over the table (2026-11-09)

- **Question:** the filter column squeezed the table. Should it?
- **Decision:** in the table view, filters open as a right side panel over the page, with "Show N candidates" to close. The detailed and compact views keep the column.
- **Why:** a table needs its width. The panel hides the results, so it says how many remain.
- **What would change it:** recruiters wanting to watch rows change while filtering.
- **Status:** Decided (Punna's call).

## Table column order and a fixed action (2026-11-09)

- **Question:** in what order does a recruiter read a row, and how do we stop WhatsApp moving when the number appears?
- **Decision:** Candidate, Match, Applied, Experience, Salary, Area, Status, then the action at the far right: number or View number, WhatsApp, ⋮. The action is right-aligned, and it stays pinned while the table scrolls below xl.
- **Why:** who, how good and how fresh decide whether a row is worth attention; the facts confirm it; Status and the action come last, where the eye ends. Right-aligning leaves only the number's left edge changing.
- **What would change it:** recruiters comparing on salary or experience first.
- **Status:** Decided (Punna's call on the action; the order is a recommendation).

## No match headers in desktop compact (2026-11-09)

- **Question:** the High / Medium headers hung as white strips in the compact list. Are they needed?
- **Decision:** removed from compact. The detailed view and the table keep them.
- **Why:** each card already shows its level and why, and the list is sorted by it. Only the count was new, and it does not change who to open next.
- **What would change it:** recruiters losing track of where a level ends in long lists; then a slim sticky divider.
- **Status:** Decided (Punna's call).

## Table: Call status in the ⋮, and a Status column (2026-11-09)

- **Question:** the inline Call status took room on every row with a number. Where should it go?
- **Decision:** Call status moves to the row's ⋮, shown once the number is out. Contact holds only View number or the number, plus a small ghost WhatsApp icon on every row. A new Status column says Action pending, Viewed number, the call's result, Shortlisted or Rejected.
- **Why:** where a candidate stands is what a recruiter scans a table for; marking a call is an occasional action.
- **What would change it:** recruiters marking calls in long runs, where two clicks per row hurt.
- **Status:** Decided (Punna's call).

## Desktop compact and table views (2026-11-09)

- **Question:** what should desktop's compact and table views be for, and which actions belong on a table row?
- **Decision:** the default (Punna's call; ?views=0 shows the old views until they are deleted). Compact is the phone card beside the new profile; the cards drop their actions, so only the profile's green shows. The table is for scanning and bulk: one contact action by stage (View number, then number with WhatsApp and Call status, then the outcome), Shortlist and Reject in a row's ⋮ and in the bulk bar, Requirements merged into Match (bars and 4/4), Experience, Salary and Applied sortable. Area hides below xl.
- **Why:** three buttons on every row compete, and a recruiter rarely decides from a row before seeing the profile or calling.
- **What would change it:** live data showing frequent rejects straight from a row; then Reject returns as an icon.
- **Status:** Decided.

## Applied candidates show when they applied, not when they were active (2026-11-09)

- **Question:** which recency helps a recruiter on each tab?
- **Decision:** the Applied tab (cards, table, details) shows "Applied 2 days ago" and no active status. The Database tab keeps "Active 2 days ago".
- **Why:** a job is live for 15 days, so everyone who applied was active lately; Active tells the recruiter little there. Applied says who is a fresh lead. In Database the recruiter is hunting, and Active predicts who will respond.
- **What would change it:** data showing Active predicts pickup among applicants, or job lifetimes well beyond 15 days.
- **Status:** Decided (Punna's call).

## New candidate details are the default (2026-11-09)

- **Question:** should the phone card deck and the rethought details stay behind ?deck=1?
- **Decision:** no. They are the default on desktop and phones (Punna's call). The entries below were written while this was a preview. ?deck=0 shows the old details until they are deleted.
- **Why:** Punna reviewed the preview on both platforms and chose it.
- **What would change it:** recruiters missing swipes or actions in the card.
- **Status:** Decided.

## Resume is a row in Profile, not a tab (2026-11-09)

- **Question:** without a resume preview, does the resume need its own tab?
- **Decision:** no, on desktop and phones. Tabs are Profile and Notes. Profile has a Resume section under AI match, with View and Download, shown only when there is a resume. This replaces the Resume tab and the desktop stand-in viewer in the entries below.
- **Why:** the tab held one button and a download icon, so it cost a tap to reach one action.
- **What would change it:** embedding the real document on desktop, as live does; that view could earn a tab back.
- **Status:** Decided, for the preview.

## Candidate profile fields for applied candidates (2026-11-09)

- **Question:** the live applied profile (read 2026-11-09) has fields we missed. Which belong in ours, and which are noise, on each platform? Database profiles are separate and come later.
- **Added, both platforms:** salary and location in the header; job duration and notice period; languages as their own section; candidate preferences; assets and documents; AI disclaimer; resume download.
- **Added, desktop only:** applied date; role and industry on each job; AI feedback thumbs; resume read in place.
- **Removed, both:** Key facts (salary and location moved up, languages got a section); Availability (invented by our mock, not on live); Departments and the Industries section (taxonomy for filters; each job already says its role); "Add a note" in the footer (Notes is a tab); the Resume tab when there is no resume.
- **Removed on phones:** email (Call and WhatsApp are there); lower education levels (highest is enough); role and industry per job; applied date; AI thumbs; the embedded resume (unreadable at 375px, so View and Download). Gender and age move from the header to Personal details, so the header leads with experience, salary and place.
- **Why:** keep what changes whether the recruiter calls this person. On a phone, also drop what needs a desk to act on.
- **What would change it:** recruiters filtering by department in the profile, or asking for email on phones.
- **Status:** Decided; the default since 2026-11-09.

## Candidate details rethink and phone candidate deck (2026-11-09)

- **Question:** the details page lacked a full profile, split notes between top and bottom, and scattered its actions. Should a phone tap open an intermediate card?
- **Decision:** one details layout on desktop and phones: who, then Profile · Resume · Notes, with actions in one fixed footer (contact left, decide right). On phones a tap opens a floating card, not a bottom sheet, with the previous and next cards peeking at its sides (Punna saw cards stacked at the bottom as something to pull up). The cards follow the finger with a slight tilt: left is next, right is previous. Scrolling takes it to full screen. Reject and Shortlist fly the card out.
- **Why:** recruiters learn one action order from the card. Notes are written and read in one tab. The expanded card is a decision step without leaving the list.
- **Swipe never decides:** a slip must not reject a real person, and with side peeks left and right mean next and previous. Decided; the `&swipe=decide` trial is removed.
- **Previous and next are in the floating pill on phones** and in the panel header on desktop.
- **Tabs show at the expanded stage too:** one layout, simpler than revealing them on full screen.
- **Actions on the card, navigation in the pill:** Call, WhatsApp, Reject and Shortlist sit at the bottom of the card and travel with it. A floating pill holds previous, "1 of 4", next and close; there is no back button or top bar. Close replaces the usual CloseBubble here.
- **Expanded is a normal screen:** once scrolled, the card turns into a profile screen: the name block and tabs stay sticky (one header, not a second title bar) and a back button takes the photo's place, because two circles side by side compete; the pill and sideways drag go away. Reaching the top returns it to the card; the back button goes to the list (Punna's call).
- **Card shadows:** stacked cards carry a shadow so they separate. Punna's call; an exception to "resting cards are flat", for this stack only.
- **What would change it:** recruiters missing the swipe on a real phone, or tabs hiding the notes.
- **Status:** Decided; the default since 2026-11-09.

## Phone Sort and Filters: fixed bottom bar (2026-11-10)

- **Question:** two chips left the top row half empty. What fills it?
- **Decision:** remove the row. Sort and Filters are two equal halves in a bar fixed to the bottom of the screen. A filtered list says "Showing 2 of 7".
- **Why:** Punna's call. Always in thumb reach on a long list, and the first candidate sits higher. Quick filter chips were set aside until usage shows which filters matter.
- **Would change it:** Sumit's review, or the bar crowding short screens.
- **Status:** Leaning (Punna, 2026-11-10), pending Sumit.


## Phone To call card: compact Call, decision icons (2026-11-10)

- **Question:** should the phone card keep a full-width Call, and can a recruiter decide without calling?
- **Decision:** To call cards have a compact green Call and WhatsApp on the left, Reject and Shortlist icons on the right. A decision from the card records no call, and Undo returns the candidate to To call. Called and decided cards keep the status button.
- **Why:** Punna's call. Recruiters can clear a clear mismatch in one tap, as on desktop. The gap keeps Reject away from Call.
- **Would change it:** accidental rejects, or recruiters misreading the icons.
- **Status:** Decided (Punna, 2026-11-10).


## One green per surface (2026-11-10)

- **Question:** are repeated green CTAs acceptable (phone plan cards, phone Call, desktop View number)?
- **Decision:** yes, keep all three as they are. The rule is one green per surface: a surface is the screen or one card in a list of equal items. Wherever possible the whole screen is the surface, with a single green.
- **Why:** Punna's call after the research. A repeated action asks "which item?", not "which action?". Design systems mostly say one primary per page, and no controlled study covers repeated buttons, so this is a product judgement.
- **Would change it:** data showing a single green per screen lifts calls or purchases. Options studied: View number green only on card hover; phone Call green only on the next candidate.
- **Status:** Decided (Punna, 2026-11-10).


## Phone candidate statuses: one status, one tap (2026-11-10)

- **Question:** phones showed call results as small text, had no All, no way to postpone, and buttons that did not show the current status.
- **Decision:** chips All, To call, Called, Shortlisted, Rejected, mapped one to one to desktop's All, Action pending, Viewed number, Shortlisted, Rejected. The page opens on To call, or All when no one is left. A called card has a button that shows the status and changes it. After a call, a radio list saves on one tap: Shortlisted, Rejected, Did not pick up, with Later to change nothing. Wrong number is gone on both platforms; desktop's "Not connected" is now "Did not pick up".
- **Why:** a candidate has one status, so radios, not a checklist. One tap suits a recruiter between calls; Undo covers a mis-tap. To call and Called are phone words on purpose, an exception to same words on both platforms.
- **Would change it:** recruiters needing a separate "answered, undecided" status, or mis-taps outweighing the speed.
- **Status:** Decided (Punna, 2026-11-10).

## One card style across the product (2026-11-10)

- **Question:** cards drifted: `rounded-lg` and `rounded-xl` corners and resting shadows, mostly in OnlyRounds, some in checkout and marketing.
- **Decision:** every card uses `rounded-card` or `rounded-card-nested` and is flat at rest. Lint and e2e now enforce it. Checkout's order-summary sections and phone plan cards lost their shadow too.
- **Why:** Punna asked for one style everywhere, and these are existing rules that nothing checked.
- **Would change it:** Sumit preferring the checkout's raised sections; restore them as a logged exception.
- **Status:** Decided. Kept: tiles inside marketing illustrations, the stacked carousel, sticky bars, and the sidebar spec mock-ups.

## Every tappable card ripples (2026-11-10)

- **Question:** candidate cards opened on tap with no visual feedback. Is that acceptable?
- **Decision:** no. Any card that is a tap target as a whole has the ink and press, and an e2e check fails if a stretched link sits in a `Card` without them.
- **Why:** Punna's call. A tap with no response reads as broken, and the miss went unseen because no check covered it.
- **Would change it:** nothing expected.
- **Status:** Decided. Lift stays only on cards with no actions inside, plus the job card, which had it already.

## Job cards match candidate cards (2026-11-10)

- **Question:** the job card and the candidate card looked like two products. Keep both?
- **Decision:** no. Punna prefers the candidate card, so `JobCardFrame` now sits on `Card`: `rounded-card`, flat at rest, a dotted facts line with no icons (two set lines on phones), no rule above the metrics on phones. The metric chips stay chips: tiles were tried on phones and removed (Punna, 2026-11-10), because they read as cards inside the card.
- **Why:** one list card across the product. The old frame also broke the card corner and resting shadow rules.
- **Would change it:** recruiters needing the icons to scan facts.
- **Status:** Decided. OnlyRounds shares the frame, so it gets the same shell and keeps its own meta.

## ECC on phones is its own product (2026-11-09)

- **Question:** should the phone job page keep adapting the desktop page?
- **Decision:** no. Design it phone first, as the posting flow and phone plan cards were. Punna's call. Built in `jobs/phone-job-page.tsx`; the live phone page is unchanged. Shape: one-line app bar with search and filters as icons; no view toggle; "To call" as the default queue; a short card ending in a green Call; Shortlist or Reject asked after the call; a full-screen profile with a bottom action bar and Next.
- **Kept on phones (Punna, 2026-11-09):** icons on the Applied and Database tabs, the job's status in the app bar, and when each database lead was last active. The leads block keeps the product name, "Active leads for this job". Filters and Sort are labelled buttons above the list, not icons in the app bar.
- **Why:** first card starts at 344 of 852px and the first card's main action at 640px. A phone recruiter has a dialer in hand and is working down a queue.
- **Would change it:** phone usage data on this page shows recruiters triage without calling. The Applied tab has no events today, so this is reasoned, not measured.
- **Would reverse if built:** "View number stays the green action" on phones, and Reject and Shortlist on the phone card.
- **Status:** Direction decided. Decided. It is the default phone page, below md (Punna, 2026-11-09). A decision after a call has Undo in its toast. Phones drop the Excel and WhatsApp bulk actions and the view toggle; tablets and desktop keep them. Sumit has not reviewed it yet.

## ECC compact row: only what earns the next click (2026-11-08)

- **Question:** the compact row showed name, match, experience, salary, location, the met requirements and a status line. What does a recruiter need to choose the next candidate, with the profile open beside the list?
- **Decision:** two lines. Name with the time at the right; experience • salary below. Once decided, Shortlisted or Rejected takes the place of the time. The match level shows on a row only when no section header says it (another sort, or results mode). Location, requirements and "Viewed number" are left to the pane and the status chips.
- **Why:** Punna's call. The list is for choosing and the pane is for judging, so anything the pane repeats is noise.
- **Would change it:** recruiters open many rows only to find the location or a missing requirement.
- **Status:** Leaning.

## ECC filters: the right panel is the desktop default (2026-11-08)

- **Question:** which filter layout does a job's candidate list use on desktop?
- **Decision:** the right-hand filter panel (the former `?filters=side` preview), from 1024px, opened from the Filters button. Between 768 and 1023px the popover stays; phones keep the bottom sheet.
- **Why:** Punna's call. The list stays in view while filters change, and filters apply live.
- **Would change it:** recruiters want the panel open on arrival, or a narrow laptop feels cramped with it open.
- **Status:** Decided.

## ECC on phones: header, card, filter sheet (2026-11-08)

- **Question:** how does a job's candidate list work at phone width, where the sticky header took about 200px and each card about 570px?
- **Decision:** the phone header shows status and place only; salary, education and experience are under ⋮. The card puts its facts on two set lines at full width: "gender, age • experience • salary", then location with "Applied N days ago" at the right. Latest job and education take one truncated line each. Once decided, call status and the outcome share a row. The filter sheet shows the top and next filters; the long tail waits behind "More filters", as on the desktop panel.
- **Why:** recruiters scan many candidates, so more of them per screen matters most. Cards fell to 381px. Full detail is one tap away in the profile. Phones may drop what desktop shows (AGENTS.md).
- **Would change it:** recruiters need salary in the job header while they scan, or the truncated job line hides what they judge on.
- **Status:** Leaning.

## ECC results bar on phones (2026-11-08)

- **Question:** how does the results bar fit 320px, where "Showing N of M candidates · 1 filter Clear" ran 16px off screen?
- **Decision:** below `sm`, the bar drops the word "candidates". Once a candidate is selected it also hides "· N filter Clear", and Excel and WhatsApp become icon-only buttons with accessible names.
- **Why:** the count and the bulk actions are what the bar is for. A selection is the moment the actions matter, and the filter count returns as soon as the selection clears.
- **Would change it:** recruiters need to clear filters while candidates are selected on a phone.
- **Status:** Leaning.

## The next score work is a changelog and two file splits (2026-11-08)

- **Question:** what is left to move the repo from 7.5/10 toward a production design system, and what is in scope?
- **Decision:** target **8.5/10**. Do only a short design-system changelog and the splits of `wizard-screens.tsx` and `self-checkout.tsx`, one small move at a time, no behavior change. ECC (including the 320px filter bar) stays with the ECC phone layout. Replacing browser storage with an account API is a product backend, not this plan. `sidebar.tsx` is split only when a change is already inside it.
- **Why:** contrast, CI screenshots, and the hidden preview panel are done. The remaining gap a design system is judged on is being able to see what changed and to review a file. ECC and a real account API would raise a different score, and each is larger than these tasks.
- **Would change it:** Punna picks up ECC, or asks for the account API.
- **Status:** Decided (Punna, 2026-11-08: plan the open score items, keep the tasks small, put them on the to-do list).

## No hidden preview panel (2026-11-07)

- **Decision:** product copy is not a control. "*GST applicable", "Valid till", "Candidate view" and "Resubscribe at the same price." are plain text. The preview panel is gone. Express checkout review states are query params: `?layout=subscription` and `?credits=` (`partial`, `job4`, `ai`, `partial-ai`, `job4-ai`, `addon`, `held`). A jobs-list offer bar is `?bar=` on `/apnahire/jobs`. The pricing phase stays in `apnahire:pricing-phase` (a fresh browser opens on december), with no on-screen switch. These rules are also in AGENTS.md → "Quality bar".
- **Why:** a silent click on a tax line or a date is how a prototype leaks into the product. Tests and the handoff script set the same states through the address bar.
- **Would change it:** account data for the plan layout, the credit balance and the pricing phase. Until then the query and the storage key stay.
- **Status:** Decided (Punna, 2026-11-07: the next score item after CI screenshots).

## Solid green badges and avatars use the button fill (2026-11-07)

- **Decision:** in dark mode, a solid green surface with a light label uses `--cta-primary` (green-700), not `--primary` (green-500). That is Badge `default`, the green count, the avatar badge, and the stepper's current and completed steps. Icons and links stay on `--primary`.
- **Why:** white on green-500 is about 3:1. White on green-700 clears 4.5:1. Darkening `--primary` would dim every green icon and link.
- **Status:** Decided (Punna, 2026-11-07: take the score up, one item at a time).

## The OnlyRounds interview wizard is reference, not a route (2026-11-07)

- **Decision:** keep `src/components/onlyrounds/create-job-wizard.tsx` and its steps. `/apnahire/jobs/rounds/new` redirects to `/apnahire/jobs/new`. Do not fold the rounds editor into `wizard-screens` yet.
- **Why:** today's posting only asks walk-in or scheduled, and AI calling is added at the plan step. The rounds editor is the only built version of an AI interview step, so deleting it means redrawing it later. Two live "create a job" wizards is how people open the wrong one.
- **Would change it:** the AI interview product is designed and needs a route of its own.
- **Status:** Decided (Punna, 2026-11-07).

## Tinted text, and darker buttons in dark mode (2026-11-07)

- **Decision:** text on a tinted fill uses that tint's foreground (`-subtle-foreground`), not the solid role colour and not `-foreground`. The marketing eyebrow is gray. The selectable-card description drops its `/80` fade. In dark mode only the button fills get darker: green buttons `--cta-primary` green-700, red buttons `--cta-destructive` red-700. `--primary` and `--destructive` stay the bright colours used for text and icons.
- **Why:** the solid colour on its own pale tint was under 4.5:1. Darkening the shared green or red would dim every icon and link. White text only fails on the button fill, so only the fill changes.
- **Status:** Decided (Punna, 2026-11-07: proceed with the suggestion). Badge `default`, the green count, the avatar badge and the stepper were moved to `--cta-primary` the same day; see the entry above.

## Light-mode contrast: the four faint spots (2026-11-06)

- **Decision:** the four light-mode contrast fixes, accepted together. The Recommended ribbon is sky-600 (white text 5.16:1), which also darkens the recommended card's blue edge. Struck-out plan features drop the `/60` fade and keep the line-through. Plan-page green text (`--checkout-primary`) is green-700 on light, so the "−%" on an upsell tile clears 4.5:1; dark stays green-500. Links on green and blue tinted banners use the text colour meant for that tint (`-subtle-foreground`).
- **Why:** each was under 4.5:1. Darkening the shared green text, rather than only the "−%", keeps one green for ticks, the selected tab and the saving.
- **Would change it:** if the darker green text or the darker blue edge reads too heavy next to the cards.
- **Status:** Decided (Punna, 2026-11-06: go with the proposal).

## Phone plan card: a long benefit beside Buy now (2026-11-06)

- **Question:** at 320px Super premium's "Top placement on job listing" (no-wrap) ran under the Buy now button. Move the button under the benefits, or let the benefit wrap?
- **Decision:** the benefit wraps inside its own line, beside the button (`MobilePlanRow`, `[&_li]:whitespace-normal`); the button stays bottom right on every card, at every width.
- **Why:** each benefit already has its own line there, so the no-wrap only guarded a dotted row that isn't used in this card; the database credits line wraps the same way. Moving the button under the lines by container width either stacked it at 360/375px too or left an overlap at 344–349px. A wrapping row put Annual's button under its lines while Monthly's sat beside, so cards in one list differed (text rule 2).
- **Would change it:** a benefit too long for two lines at 320px, or a call to keep every benefit on one line: then shorten the copy for phones (text rule 4).
- **Status:** Leaning (agent fix, for Punna to confirm).

## Dark mode pricing coherence (2026-11-06)

- **Question:** on dark, the plan area used three plums (a 40% panel, a solid Unlimited panel, plum-800 cards) on a page whose other cards (login, FAQ) are one frosted glass; the selected tab washed out, the Recommended label failed contrast, and order-summary details looked off.
- **Decision (dark mode only; light untouched):**
  - Plan panels and tracks (tab bar, Job credits and Unlimited panels, the 1/2/3 switch) take the page glass (`--surface-glass`). Plan cards go one step lighter, plum-700 (`--surface-plan-card`), and stay solid: plan cards are never frosted (2026-10-19 rule).
  - The Recommended label is a lighter blue, sky-300 (`--ribbon-fg`): 5.3:1 on its fill (sky-400 was 4.2:1).
  - Phone pricing chips (`/pricing` below md) keep their earlier look: `--checkout-chip` (card at 40%) and `--checkout-chip-pill` (plum-800), apart from the glass track. The app's phone chip rows follow them. Sticky tabs and desktop tabs are unchanged.
  - Order summary: the coupon field has no fill of its own on dark (the Input's `dark:bg-input/30` showed as a box behind the hint). The database chips' unselected fill is `--chip-on-tint` (plum-800), not `--background`, which read as holes.
  - `Button variant="emphasis"` on dark is lavender: plum-300 fill, plum-200 hover, plum-950 label (9.3:1). Gray-700 sat at about 1.5:1 on the plum cards, so an add-on's "Add" faded. The `data-surface="dark"` white inversion is unchanged.
- **Why:** one surface for the whole plan area, cards lifted off it by one step; every label at 4.5:1 or more; the companion CTA visible on plum.
- **Trade-off accepted:** lavender is brighter than the green primary, so an emphasis button can draw the eye before "Proceed to pay" (the AI calling "Add" beside it; the phone header's "Login / Sign up" above the hero's green one). This bends the one-standout rule (Hick / Von Restorff in AGENTS.md).
- **Header:** Punna accepted the header's lavender "Login / Sign up" sitting above the hero's green one on the phone homepage and pricing page in dark mode; it stays lavender like every other emphasis button (2026-11-06).
- **Would change it:** if users pick the add-on or header CTA over the primary more than expected, or reviews say the green no longer leads, move emphasis to a dimmer lavender (plum-400/500 with a light label) or back to a raised gray.
- **Status:** Decided (Punna, 2026-11-06).

## Splitting a large file: keep the entry, add a sibling folder (2026-11-06)

- **Decision:** a file over ~600 lines is split by moving code only. The original `foo.tsx` stays at its path with the same exports; its parts go in a sibling `foo/` folder (no `index.tsx`, so old imports still resolve). Applied to the four OnlyRounds files (`candidate-drawer`, `job-details-step`, `interview-rounds-step`, `create-job-wizard`).
- **Why:** no importer changes, so the split can't break callers and its diff is easy to review; before/after screenshots prove no visual change.
- **Would change it:** if the package grows a public barrel per folder, switch to `foo/index.tsx`.
- **Status:** Decided.

## Logo marquee under reduced motion: one still row, not wrapped (2026-11-06)

- **Decision:** with reduced motion on, the moving logo strip stops and stays one row, clipped at the edge (as before). It is clipped, not scrollable, so axe has no scroll region to flag.
- **Why:** wrapping every logo into rows added about 280px (express) to 520px (self-checkout) to phone pages, for a decorative strip.
- **Would change it:** if the logos ever need to be readable in full for reduced-motion users.
- **Status:** Decided (Punna, 2026-11-06).

## Accessible names start with the visible text (2026-11-06)

- **Decision:** a control's accessible name is its visible text; extra context is sr-only text after it, never an `aria-label` that replaces it (job metric pills, workspace switcher). A phone plan card with its own Buy now button is not `role=radio` (an interactive inside an interactive); the card keeps the tap, the button is the keyboard route.
- **Why:** voice-control users say what they see; a different `aria-label` breaks that (axe `label-content-name-mismatch`). Nested interactives confuse screen readers.
- **Status:** Decided. The colour-contrast shades (ribbon, struck lines, −% on tiles, links on tints) were accepted the same day; see "Light-mode contrast" above.

## How the repo is tested, and what CI blocks on (2026-11-06)

- **Decision:** GitHub Actions runs lint, token lint, unit tests, the build, and the Playwright tests, screenshots included, on every push to main and every PR. macOS baselines (`*-darwin.png`) are for local runs. Linux baselines (`*-linux.png`) are what CI compares, created on the Ubuntu runner the first time they are missing. Known bugs are `test.fixme` with a reason, known axe violations are matched per element in the specs' `KNOWN`; a check is never weakened to pass.
- **Why:** the gates only worked when someone remembered `npm run check`. Layout bugs were invisible to type checks. A macOS screenshot would fail on Linux because the fonts differ, so CI keeps its own set.
- **Would change it:** the runner image changes enough that every screenshot fails. Then regenerate the Linux baselines on that runner with a commit message containing `[update-linux-snapshots]`. Don't raise the pixel tolerance.
- **Status:** Decided (Punna, 2026-11-07: run screenshot tests in CI).

## Dependency upgrades: take minor fixes, skip forced downgrades (2026-11-06)

- **Decision:** Next.js 16.2.3 → 16.4.5 (critical advisory) and `npm audit fix`; not `npm audit fix --force`, which proposes downgrades (eslint-config-next 15, shadcn 1). A dev-only advisory (brace-expansion under eslint) is accepted.
- **Why:** the minor upgrade passed build, lint and every browser test; the forced ones would break tooling for advisories that never reach users.
- **New lint rule** `react-hooks/set-state-in-effect` was a warning, then made an error again once the 31 hits were removed (2026-11-07). It stays an error.
- **Status:** Decided.

## New job, no applicants: show active leads from the database (2026-11-06)

- **Decision:** the Applied tab of a job with no applications shows "Finding the right candidates" (clay, one line) and an "Active leads for this job" card: the database credit balance, three top database matches (AI-look header strip, active status, role, company, area, experience, salary), a "+N more · View all leads" tile and "1 profile unlock = 1 database credit". A profile opens the Database tab with it highlighted; View all opens the tab with active leads first.
- **Why:** applications take time; the recruiter can act right away on matches that are likely to answer. Credits show where they're spent (unlocks), never on applicants.
- **Same parts as checkout:** the balance is the express checkout's chip (`AvailableCreditsButton chip kinds={["database"]}`, UserSearch icon, opens the same panel); the cost line uses the panel's wording, "1 database credit unlocks 1 profile".
- **Status:** Leaning. Leads and balance are mock; the Database tab is built next. Preview with `?applicants=0`.

## Filtered list: one results bar with bulk actions (2026-11-06)

- **Decision:** once a filter, a search or a selection is active, the match sections give way to one pinned results bar: select-all · "Showing N of M candidates" (or "N selected") · "N filters · Clear", and Excel + WhatsApp on the right once anything is selected. Every card has a checkbox. The filter panel is capped to the room under the job header and scrolls inside.
- **Why:** the recruiter needs the count of what the filters left, and a filter must stay visible after the panel closes; the pinned bar does both. Bulk Excel and WhatsApp exist on live and act on a picked set.
- **Would change it:** if recruiters still want match sections inside filtered results.
- **One reset at a time:** the bar's Clear shows only while the filter panel is shut; open, the panel's "Clear all" is the one reset (Hick).
- **Status:** Leaning. Excel and WhatsApp are toasts in the prototype.

## Match-section bars dock like the homepage nav (2026-11-06)

- **Decision:** on the job page's detailed list, each match bar is a rounded pill at rest; pinned under the job header it stretches to a square full-width bar with a shadow, and the next section's bar pushes it out. Hand-off: the incoming bar docks (goes full width) one bar-height before it meets the pinned one, and the outgoing bar stays full width until its section has scrolled past, so the two never change shape in opposite directions ("flapping bird", user call 2026-11-06). It sits above the cards' action buttons, below the job header. In the side-filter preview, the filter panel sits on the right, under Filters + Relevance; the status chips sit on the left.
- **Why:** one docking pattern across the product (site-header's pill → bar); the section stays named while its cards scroll.
- **Status:** Leaning. The docked bar spans the content column, not under the sidebar edge to edge like the job header.

## The green active dot means "active in the last 24 hours" (2026-11-06)

- **Decision:** one component, `ActiveStatus`: now / minutes / hours / today → green dot, dark text; yesterday and older → no dot, grey text. Candidate cards and active-lead cards use it.
- **Why:** "Active today" had a dot and "Active 2 hours ago" didn't; the dot must follow recency, not wording.
- **Status:** Decided.

## Match chip says the level, not a percentage (2026-11-06)

- **Decision:** "High match" / "Medium match" / "Low match" ("High" on phones) beside the bars, on cards, compact rows and the table. No %.
- **Why:** the recruiter acts on the level; 88% vs 92% is false precision.
- **Status:** Decided.

## Candidate card: a Z read, recency beside the match (2026-11-06)

- **Decision:** the header is two rows a side: name ↔ match chip, facts ↔ "● Active today · Applied N days ago". The AI panel is one line: "✦ AI match (4/4)" followed by the ticks.
- **Why:** recruiters call the freshest strong matches first, so activity sits with the match where the call is made; a two-row right column matches the left and leaves no empty space under the facts. "Meets N of M requirements" repeated what the ticks show.
- **Status:** Leaning.

## Job page toolbar: side filters, tools split by scope (2026-11-06)

- **Question:** where search, filters, sort, view and the status chips sit once filters move to a left panel.
- **Decision (preview, `?filters=side`, desktop):** Applied / Database tabs get icons and the self-checkout tone (green label + underline). Search (an icon that expands) and the view toggle sit opposite the tabs, so search reads as "within this tab". Under them: Filters + Relevance on the left, above the panel; status chips on the far right. The panel pushes the cards right.
- **Why:** tools that act on the whole tab sit with the tabs; tools that narrow the list sit with the panel that narrows it. The tabs were too quiet to read as the page's main split.
- **Would change it:** usage showing search is the main entry (then keep the full field); the filter data still to come.
- **Status:** Leaning (tab styling applies everywhere; the layout is preview only). Competes with option E (icon tools in the chip row).

## One look for AI: the sky gradient + sparkle (2026-11-06)

**Status:** Decided (Punna). Built for AI match; the rest to follow.

**Decision.** Every AI element (AI match, AI summaries, AI screening
marks) uses one look: the AI calling add-on's sky gradient
(`bg-gradient-ai`) behind it and a `Sparkles` icon in sky (`text-info`).
It is its own token (`--gradient-ai`), not `bg-gradient-product-ai-calling`.

**Why.** Recruiters should learn "sky + sparkle = the AI did this" once
and spot it everywhere. A separate token because product gradients belong
to their product (AGENTS.md); sharing the value keeps the family.

**More vivid (same day, Punna):** `--gradient-ai` is now sky 200 into a
touch of violet (navy 100), changed once for every AI surface, and the AI
calling add-on and the Premium + AI plan block moved onto it.

**Watch.** Keep it to small surfaces (a panel, a tag). On every card a big
gradient would stop standing out (Von Restorff).

**Applied (same day):** the job card's AI match panel; chats' AI avatar
(gradient + sky sparkle), AI screening status icon, AI preview mark, AI
summary chip, summary pop-up text panel and suggested replies; job
posting's drafting sparkle, "AI suggestions" and "Ask AI to change
something". Left as they are: the "AI-filled · check it" badge (already
the sky `info` badge), the "+AI" tag (its own vivid sky → green so a small
tag reads), the moving AI backdrop and voice pill (motion states), and
every "Recommended" sparkle (not AI).

---

## Candidate card: four zones for scanning (2026-11-06)

**Status:** Decided (Punna asked for a clear hierarchy). Built.

**Problem.** Everything had the same weight: requirement chips were
outlined pills like the Call status button, the viewed number floated with
its Copy and QR apart, and labels ("Current / latest") took a column.

**Decision.** One card, four zones, top to bottom:
1. **Who + how well:** name ›, facts (foreground), "Applied … · Active …"
   (small, muted) · the match chip.
2. **Why:** a muted panel titled "✦ AI match · Meets N of M requirements"
   (violet sparkle; live calls it AI matching, and we show the AI, user
   call 2026-11-06; the profile's section is "AI match" too), then the job's
   requirements as text with a green ✓ or a red ✕ (missing ones struck
   through). Text, not pills, so nothing there looks clickable.
3. **Background:** latest job and education, each with an icon; no label
   column.
4. **Act:** under a rule. Contact on the left (View number, or the number
   as one joined control: phone · number · copy | QR), WhatsApp, Call
   status; Reject / Shortlist on the right.
"Add a note" left the card; it stays in the profile.

**Why.** Common practice for list cards: group by question (who, why,
what next), one emphasis per zone, actions in a separate bar, and
controls styled unlike information.

---

## Candidate avatars: photos, else a tinted initial (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** Candidates show their photo when they have one (sample:
Unsplash photos from the chats set, `public/images/chats/CREDITS.md`).
Without a photo, the initials take one of three tints, sky · violet ·
plum, picked from the name so a person keeps their colour everywhere
(`avatarTone`). Applies to job leads, the compact list, chats and the
profile panel.

**Why.** All-grey initials looked the same, so candidates were hard to
tell apart. Green, amber and red are left out because they already mean
match level and actions on the same cards; gold reads as amber.

---

## After View number: call on phones, copy + QR on desktop, call status (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.**
- **Phones:** one outline button with the number that calls it (tel:).
- **Desktop:** the number, a Copy button and a QR button. The QR opens a
  pop-up ("Call {name}", contact clay) with a code to scan with a phone.
  Copy toasts "Number copied". As on live.
- **Both:** a "Call status" menu after WhatsApp: Answered · Not connected ·
  Invalid number. The button then shows the chosen status. As on live.
- The QR is drawn in the browser (`qrcode` package), not by a web service:
  the old OnlyRounds QR used api.qrserver.com, sent the number out and
  showed blank (parked bug).

**Why.** A desktop can't place a call; copy or scan gets the number to the
phone. On a phone, calling is one tap, so copy and QR are noise. Call
status lets the recruiter track who they reached.

**Where.** `src/components/apnahire/jobs/contact-number.tsx`; used by the
card, the profile panel and the table (table: number, copy and QR only).

---

## Applicants are free: no unlock, no credit (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** On a job's Applied tab, View number is free and the resume is
open: no "Unlock", no credit, no "credit used" toast. Credits apply only
when the recruiter finds candidates in the Database tab and unlocks them.

**Why.** Applicants came to the job themselves; they are the job's own
leads. Charging for them would charge twice for one job post.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (toThread gets
resumeUnlocked true; no credit toasts).

---

## Candidate card: whole card opens the profile, match leads (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.**
- No "View profile" / "View profile and resume" link. The name carries a
  chevron, and a click anywhere on the card opens the profile. View number,
  WhatsApp, Reject, Shortlist and Add a note sit above that target.
- The match ("92% match" with bars) takes the top-right corner at 16px
  semibold, where the link was.
- The card does not lift on hover: it holds several actions of its own
  (AGENTS.md, "a card that isn't a target as a whole never lifts").

- Card hierarchy (Punna, same day): who + match · key facts · "Meets N of
  M" with ticked chips, then "Missing: …" in red when not all are met ·
  Current / latest and Education · actions · applied, active, note.
  Skills and languages moved to the profile, which now also shows
  Current / latest and Active (it had come from chats without them).

**Why.** Recruiters click the card anyway; the link repeated that and
took the spot the match deserves. Match is what they sort and decide by.

**Where.** `src/components/apnahire/jobs/applicant-card.tsx`.

---

## Job page filters: which show upfront (2026-11-06, revised with follow-up data)

**Status:** Decided (Punna, 2026-11-06); built in the job page's side panel (`?filters=side`). On the Applied tab the job's values are tagged "From your job" but not ticked: everyone there applied to this job, so a prefill would only hide people.

**Data.** ECC filter adoption follow-up, 7 Oct – 5 Nov 2026, 22,431
recruiters landing on the Database matches tab (`eccjob`). "Changed"
now counts clearing a filter; session key `base_query_id`. The Applied
tab has no events at all, so these numbers stand in for it.

| Filter | Changed | Set | Note |
|---|---|---|---|
| Any filter | 28.0% | 37.8% | |
| Education level | 19.4% | 35.5% | 65% of set values are the job's prefill |
| City | 19.2% | 37.0% | 53% recruiter-chosen: deliberate |
| Salary | 16.7% | 30.6% | 79% prefill; prefill removed on 55% of rows |
| English level | 14.1% | 28.9% | halves on phones |
| Location distance | 13.3% | 38.6% | the most-set filter; was missing before |
| Experience | 13.2% | 22.0% | halves on phones |
| Area | 13.0% | 18.7% | |
| Age | 11.4% | 22.4% | |
| Gender | 10.7% | 20.3% | |
| Last active | 9.6% | 12.7% | never prefilled: every value is chosen |
| Industry · Languages · Must-have keywords | 6–7% | | |
| Departments · Hide · Exclude keywords · Degree · Job preference · Companies · Notice period | ≤3% | | |
| Job title | 0% | | key always empty: broken or unreachable |

Recruiters who filter unlock more in every activity bucket (1.5–2.8×
view-number rate). Correlation, not cause.

**Decision (leaning).**
- **Top of the panel, open by default:** Location (city, area and
  distance as one group), Education, Salary, English level, Experience.
- **Next, open:** Age, Gender, Last active (low volume, but always a
  deliberate choice; it pairs with the green active dot).
- **Collapsed "More filters":** Industry, Languages, Departments, Degree,
  Companies, Notice period, Job preference, Hide candidates.
- **Keywords** (must-have, exclude) go to 🔍 search.
- **Drop Job title** until product checks why it's always empty. Role /
  category doesn't exist in the data.
- **Prefill:** values from the job show as "From your job" and come off
  in one tap. Don't prefill salary (removed on 55% of rows); keep city.
- **Phones:** short option lists stay inline (they hold up on mobile);
  long pickers open their own searchable sheet (they collapse to half).
- **Instrument the Applied tab** before trusting any order there:
  `applicants_tab_shown`, `applicants_filter_applied`,
  `applicants_status_tab_clicked`, `applicants_filter_cleared`.

**What would change it:** Applied-tab events showing a different order;
settling `eccjob` vs `experienced/fresher/any` scope (moves every number).

## Job page header: 3 rows, status stays its own row (2026-11-06)

**Status:** Leaning, now option E (Punna, 2026-11-06): search, filter
and sort narrow or order the same list as the status chips, so they share
the chips' row as one compact icon group (🔍 · filters with a count · sort ·
view ▾). Applied filters show as removable chips under it only when set.
Phones: chips scroll, then 🔍 and one ⚲ that opens a sheet with filters,
sort and view. Icons carry the state (Punna): the sort button shows the
chosen order's icon (Relevance = arrow + sparkle, Recently applied = arrow +
clock) and the view button the chosen view's icon; a click opens a menu that
names every option in words. Each icon button has an aria-label naming the
current choice ("Sort: Relevance") and the same text as a tooltip. Live has 18 filter
groups (docs/reference/LIVE-EMPLOYER-KB.md), too many for a dropdown: ⚲ opens
a side panel on desktop (SheetPanel, sections, Clear all, "Show N
candidates") and the bottom sheet on phones. Was
option D (Punna's idea, 2026-11-06; wireframe
`.screenshots/job-header-wireframe.html`): live's structure. A header band
(title, details, Edit / ⋮, Applied | Database tabs), then per tab a status
chip row and a filter bar (live's left filter column as inline filter chips
plus "+ More"; search, sort and view at its right end). Database gets the
same bar with its own chips and filters. Familiar to live users, and the
list gets the full width. The notes below are the earlier proposal.

**Question.** Put the view switch on the title row beside Edit / ⋮? Merge
the tools row and the status row? Move the statuses into Filters?

**Recommendation.**
- **View switch stays with the list tools**, not on the title row. Edit and
  ⋮ act on the job; the view acts on the candidate list. Controls sit next
  to what they change.
- **Status stays visible, as its own row.** "Action pending" is the
  recruiter's to-do list, and the counts tell them what is waiting. Inside
  Filters it takes a click to see, and it breaks the decided match with the
  jobs list's status tabs (entry below).
- **Filters keep the attributes only:** show candidates who (match, have a
  resume, tried to contact you, are featured), applied in, English level.
- **Phones already merge** status and tools into one row (chips + "Sort &
  filter").

**What would change it.** If recruiters rarely switch status (usage data),
a status dropdown ("All 7 ▾") in the tools row makes desktop 2 rows.

---

## Job page back button: phones only (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** The back button beside a job's title shows on phones only
(`md:hidden`). Desktop has none.

**Why.** On phones the job page is full screen with no top bar, so the back
button is the only way out. On desktop the top bar's breadcrumb ("Jobs ›
job title") and the browser's own back already do it; a third back control
is noise. Fits "Full screen for tasks, sidebar for workspaces" below.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (header).

---

## Sort and view switch: one sort button, outline toggles (2026-11-06)

**Status:** Decided (Punna). Built.

**Decision.** On a job's Applied tab, beside the status filter:
- **Sort** is one control: an outline button "⇅ Relevance" that opens a
  "Sort by" radio menu, the same as the chats inbox's sort. Not a "Sort by"
  label outside a grey select.
- **View switch** (detailed · compact · table) is the design system's
  `ToggleGroup` with `variant="outline"` on white: the chosen view gets the
  green edge and tint.

**Why.**
- A label outside its field reads as two things; one button names the
  current order and opens the choice.
- A grey select on the grey page faded out. White outline controls stand
  out the same way as Filters beside them.
- The default toggle marked the active view with a faint grey that was hard
  to see. The outline pressed state (green edge + tint) is the system's
  "chosen" look (ChipTabs choice, OptionCard).
- Same sort control as chats, so sorting works the same on both pages.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx`; pattern from
`src/components/apnahire/chats/chat-inbox.tsx` (sortMenu).

## Job posting: a salary without incentives means "Fixed only" (2026-11-06)

- **Question:** When the description gives a salary and doesn't mention incentives, should auto-fill pick a pay type?
- **Decision:** Yes. Salary only → "Fixed only". Salary plus incentives → "Fixed + incentive". Incentives only → "Incentive only". This replaces the 2026-11-05 call that nothing should be pre-selected.
- **Why:** Most jobs pay a fixed salary. If the recruiter doesn't mention incentives, there almost never are any. Leaving the field blank just adds a question they have already answered.
- **What would change it:** Data showing that many recruiters who post a salary only go on to add incentives.
- **Status:** Decided (Punna).
- **Follow-up (same day):** pay type is now three tiles in one row: icon and label, no help line, always visible. Recruiters see the incentive options even when Fixed is pre-selected. Help lines that only repeated their card's label were removed (job type, work from office/home, interview type). Lines that add something were kept (the Field job hint, joining fee, contact number).

---

## Job candidates: three views — detailed, compact, list (2026-11-05)

**Status:** Decided (Punna). Default view still open: detailed today.

**Decision.** A job's Applied tab has three views, switched beside Sort by:
- **Detailed:** full cards (facts, matching chips, details, actions).
- **Compact:** chats-style rows (`ConversationRow`); a row opens the profile.
  From 1024px the profile sits beside the list; below it opens as a panel.
- **List:** a table (`ApplicantTable`) to compare many at once. Tablet and
  up only; on phones a "list" pick shows as compact.

**Why.** Full cards show everything up front and get heavy with many
candidates. A drill-down (as in Workable and in our own chats) is cleaner,
but some recruiters compare in a table (the OnlyRounds table was missed when
it was removed). A table doesn't fit a phone.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx`,
`src/components/apnahire/jobs/applicant-card.tsx`, `applicant-table.tsx`.

---

## Match levels: signal bars, one order, one "Low matches" divider (2026-11-05)

**Status:** Decided (Punna).

**Decision.**
- Match shows as three rising bars (`MatchBars`): high 3 green, medium 2
  amber, low 1 red (unfilled bars: the text colour at 25%, since grey
  vanished on the tinted chip; 2026-11-06), with the score ("88% match"; "88%" on phones).
- Score to level: 75+ high, 50–74 medium, under 50 low (`matchLevel`).
- With Relevance, candidates run from highest score to lowest, with a
  section header opening each level: "High matches 3", "Medium matches 2",
  "Low matches 2" (bars + title + count). **Changed 2026-11-06 (Punna):**
  the single thin "Low matches" divider hid that the top of the list is the
  high matches; each section is now named and visible.
- **Match label: a tinted chip top right** (Punna, 2026-11-06): bars +
  "92% match" in a Badge whose tone follows the level (success / warning /
  destructive). Tried and dropped: plain text (too quiet) and a corner tab
  like the plan cards' Recommended (that tab marks the one recommended
  choice; on every card it would mean nothing).
- Chats uses the same bars in the thread header (it had a trend icon).

**Why.** Sections by card style didn't read accurately. One linear order
with a level mark on every candidate is easier to scan, and the signal-bar
metaphor is already familiar. One mark for match across leads and chats.

**What would change it.** Real scoring from the matching model may need
different thresholds; change them in `matchLevel` only.

**Where.** `src/components/apnahire/match-bars.tsx`.

---

## One candidate profile for chats and a job's leads (2026-11-05)

**Status:** Decided.

**Decision.** A job's candidate profile is the chats "Candidate 360" panel
(`CandidateProfilePanel`), fed by an adapter (`toThread`). On leads the
panel's Call is replaced by View number · WhatsApp · Reject · Shortlist
(`ApplicantActions`), and notes / resume unlocks use the page's handlers.

**Why.** Leads and chats show the same person; two profile designs would
drift. One panel keeps the facts, sections and copy identical.

**Where.** `src/components/apnahire/chats/candidate-profile-panel.tsx`.

---

## Candidate card actions: View number stays the green action (2026-11-05)

**Status:** Leaning (live's choice kept; not yet confirmed by Punna).

**Decision.** As on live employer.apna.co: View number is solid green;
WhatsApp is an icon; Reject and Shortlist are neutral outline buttons with
a red ✕ and a green ✓ (Punna, 2026-11-06: the red and green tints fought the
match chip, which is now the card's one tinted mark). Once decided, a status tag replaces Reject and Shortlist. On
phones the pair takes its own row in equal halves.

**Why.** Contacting the candidate is what most recruiters do first, and it
matches live, so the switch costs nothing to learn. Open alternative:
Shortlist as the green action.

---

## Candidate status filter: use the jobs list's tabs (2026-11-05)

**Status:** Decided (Punna, 2026-11-05). Built.

**Decision.** The All · Action pending · Viewed number · Shortlisted ·
Rejected filter uses the same control as the jobs list's status filter:
`Tabs variant="inverted"` on desktop (grey track, white pill that slides to
the choice), `MobileChipRow` on phones. Not coloured chips per status, not
big pipeline cards.

**Why.**
- **Familiar interaction across pages.** A recruiter filters jobs by status
  on the jobs list, then opens a job and filters candidates by status. The
  two filters are one click apart, so they must look and behave the same:
  same track, same sliding pill, same counts in the label. Nothing new to
  learn, and the second page feels like part of the first.
- **One pattern, one component** (AGENTS.md "Same pattern, same
  component"). The earlier `ChipTabs` drew the same kind of filter a second
  way and read flat.
- Per-status colour would compete with the match bars and status tags; big
  counter cards would push the candidates down the screen.

**Optional, not built.** An unread dot on "Action pending" for new
candidates, as on the jobs list's count.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (pipeline row),
same control as `src/app/apnahire/(product)/jobs/page.tsx`.

---

## Should a job's details page open full screen, without the sidebar? (2026-11-05)

**Status:** Leaning. Recommendation given; Punna to confirm (and maybe Sumit).

**Question.** Job posting opens as its own page with no sidebar. Should
clicking a job in the jobs list do the same: a full page with a back button
and no sidebar?

**Recommendation.**
- **Desktop:** keep the sidebar on the job's details page (the ECC: Applied
  and Database tabs). Optionally collapse it to its icon rail on this page to
  give the compact split view and the table about 180px more, and restore it
  on the jobs list.
- **Phones:** already full screen (no bottom bar, back button in the header).
  Keep it.

**Why: tasks vs workspaces.** The common SaaS rule:

| | A task: no sidebar | A workspace: sidebar stays |
|---|---|---|
| What it is | Has an end: done, posted, paid | You live in it and move between things |
| Examples here | Posting a job, checkout, onboarding | A job's candidates, chats, database |
| Why | Fewer exits, fewer drop-offs | Recruiters move between jobs, chats and database all day |

Job posting is a task with a finish line, so full screen is right there. A
job's candidate list is a workspace: recruiters spend sessions in it, go to
Chats to reply, check database credits, and come back. Hiding the sidebar
would make each of those trips longer.

**What the market does (from general knowledge, not re-checked).** Applicant
tracking systems such as Workable, Greenhouse, Lever, Ashby and LinkedIn
Recruiter keep their main navigation on a job's pipeline page and go full
screen for creating a job or for focused modes. Before quoting this outside
the team, check each product's current UI.

**Already in place.** Desktop has a back button and a breadcrumb ("Jobs ›
job title") on the job page, so the way back is covered without removing the
sidebar.

**What would change the answer.** If usage data shows recruiters mostly
process one job's candidates in one sitting and rarely leave for other
sections, a full-screen job page becomes a better fit. Check that before
switching.

**Where.** `src/app/apnahire/(product)/jobs/[id]/page.tsx` (the job page),
`src/app/apnahire/(wizard)/` (job posting, full screen).

## Job posting: pay type and salary on one screen (2026-11-06)

**Decision.** The three pay-type cards show first. A pick turns them into the
quiet "icon · Fixed + incentive · Change" line (the joining fee's style) and
the amount fields slide in under it. Change opens the cards again and hides
the fields. The separate pay-type screen is gone.

**Why.** One less step, and the answer you just gave stays in view. A quiet
line is enough because the recruiter tapped it a moment ago; the amount is
the open question.

**Where.** `PayTypePicker` and `Salary` in
`src/components/apnahire/post-job/wizard-screens.tsx`; old drafts on
`pay-type` open on `salary` (`post-job-flow.tsx`, RENAMED).
