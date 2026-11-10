# Job posting flow: context

How the job posting flow at `/apnahire/jobs/new` works today, so a new chat can
pick it up without reading the code. The to-do list is in `status/TODO.md`
under "Job posting". The reasons behind each choice are in `DECISIONS.md`.
Last updated 2026-11-06.

## Shape
- **Start:** "Describe the job" (type or speak) → **Draft my job** (AI fills the
  form) or **Fill manually** (empty form).
- **Then:** one question per screen, in 4 steps, ending on Review:
  - **Job details:** title, category, industry, job type, workplace, location,
    salary (pay type and amount on one screen), perks
  - **Candidates:** education, English, experience, preferences (gender, age,
    assets, languages), screening questions
  - **Description:** written by the AI, editable
  - **Interview:** interview or walk-in, who candidates contact
- **After Review:** the plans step (`/apnahire/jobs/new/plans`, express checkout).
- **Saved draft:** the flow saves as you go (localStorage
  `apnahire:job-draft`). Opening the flow again asks "Continue your draft?".
  `?resume=1` continues without asking; `&stage=…` opens a step's first
  question.

## Preview: short flow (`?flow=short`, 2026-11-10)
- Related questions share a page: 10 pages on phones, 5 on desktop
  (`PHONE_PAGES`, `DESKTOP_PAGES` in `post-job-flow.tsx`). An AI draft lands
  on Review; required answers it missed are asked first, in one pass. Not live; the reasons are in `DECISIONS.md`.

## Preview: essential flow (`?flow=essential`, 2026-11-10)
- **Asks:** title; workplace and location; salary (joining fee as a line with
  Change); "Who can apply". Phones 4 pages, desktop 2, then Review.
- **Works out:** job role from the title (`categoryForTitle`), industry from
  the company (`COMPANY_INDUSTRY`), pay type (fixed), job type (full time),
  the description (written on Review).
- **"Who can apply" follows the role** (`src/lib/apnahire/role-profiles.ts`):
  Delivery asks what they must have and experience; Telesales asks education,
  English, experience. "Add a requirement" shows the rest. The profiles are an
  estimate, not data.
- **After posting:** the job-live screen shows "Finish setup"
  (`post-job/finish-setup.tsx`): who candidates call, walk-in, questions for
  applicants, perks. Answers are not saved to the job yet.
- Not live; the reasons are in `DECISIONS.md`.

## Files
| What | Where |
|---|---|
| Flow, saving, drafting | `src/components/apnahire/post-job/post-job-flow.tsx` |
| Every screen (`SCREENS` list at the end) | `post-job/wizard-screens.tsx` |
| Field editors (choice cards, chips, walk-in, fee…) | `post-job/job-fields.tsx` |
| Describe screen, voice | `post-job/describe-step.tsx`, `src/hooks/use-speech-recognition.ts` |
| AI fill | `src/app/api/apnahire/draft-job/route.ts` (Gemini; prompt + schema) |
| Keyword fill (no AI key, AI failed, live chips) | `src/lib/apnahire/prompt-parse.ts` |
| Draft type, labels, option lists | `src/lib/apnahire/job-draft.ts`, `src/types/apnahire-job.ts` |

## AI fill
- The AI fills every field the description states. A detailed description
  should leave almost nothing to ask.
- "No joining fee" / "no walk-in" count as answers (false). Gender words never
  go into the title. "Age 21–30" is age, never experience.
- Perks, assets and degrees come only from the form's own lists, so the chips
  show as picked.
- Pay type: a salary with no incentive mentioned → "Fixed only". With
  incentives → "Fixed + incentive".
- The joining-fee question is always asked again, even when the text answers
  it (candidate safety).
- **No AI key locally:** without `GOOGLE_GENERATIVE_AI_API_KEY` the route uses
  the keyword parser, the same one that runs when the AI fails. It reads spoken
  salaries ("15 to 20 thousand").

## Voice
- The mic is a round button beside the send arrow, bottom right of the box.
- Uses the browser's own speech-to-text (`en-IN`). Chrome stops listening after
  silence, so the hook restarts until the recruiter taps Stop.
- Android takes one phrase per session (continuous mode repeated words there).
  Desktop keeps every phrase; nothing is merged.

## Screen rules worth knowing
- **Pay type:** three tiles in one row (icon + label, no help line), always
  visible. The amount fields slide in under them once a type is picked.
- **Help lines:** a card has a help line only when it adds something beyond its
  label (the Field job hint, joining fee, contact number).
- **Footer:** in this flow every step's CTA is `emphasis` (dark). Green is only
  for the final post / pay.

## Done so far (newest first)
- 2026-11-06: pay type as three tiles; help lines that repeated labels removed;
  "Continue draft" opens on the saved screen again (it always fell back to
  Describe); voice no longer drops words; AI and keyword fill read negations,
  gender, age, perks, assets and spoken salaries; "Fixed only" when no
  incentive is mentioned.
- 2026-11-06: pay type and salary on one screen.
- 2026-11-05: design-system audit of chat + job posting
  (`history/AUDIT-2026-11-05-CHAT-JOB-POSTING.md`); confirmation pop-ups with
  clay icons.
