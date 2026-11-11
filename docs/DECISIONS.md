# Design decisions log

Questions we have already worked through, so the next person with the same
idea starts from the answer. One entry per question: the question, what we
decided (or are leaning to), why, and what would change the answer. Newest
first. Status: **Decided**, **Leaning** (recommendation, not yet signed off)
or **Open**.

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
