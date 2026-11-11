# Job posting flow: context

How the job posting flow at `/apnahire/jobs/new` works today, so a new chat can
pick it up without reading the code. The to-do list is in `status/TODO.md`
under "Job posting". The reasons behind each choice are in `DECISIONS.md`.
Last updated 2026-11-11.

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

## State on 2026-11-11 (read this first)
- **Data behind the decisions:** `JOB-POSTING-DATA.md` (funnel, time to post, job mix, per-role answers, gaps).
- **Two flows:** regular (asks everything) and essential (`?flow=essential`,
  asks only what matching needs; preview, waiting on Punna). `?flow=short` is
  retired: its desktop pages and one-pass Review are now regular.
- **Desktop:** a topic's questions share a page (`DESKTOP_PAGES`, 5 pages;
  essential 3: job, who can apply, description), a `Separator` between them,
  one "AI-filled" note per page, every missing answer named under its question
  ("N answers missing"). Candidate view only at Review. Stage 3 is "Setup & review".
- **Phones:** one question per screen. Role, industry and workplace move on at
  the tap (`advanceOn`). Review opens on the answers; "See what candidates see"
  opens the candidate view in a bottom sheet.
- **Title suggestions:** `suggestFromTitle` / `withTitleSuggestions` in
  `job-draft.ts` preselect role, industry and workplace; also after an AI draft.
- **AI draft strip** (`drafting-state.tsx`): four lines roll every 4 s while
  waiting, then "Ready" for 0.7 s; no reveal after. ~20 s measured.
- **Description:** essential has its own step before Review. "Rewrite with AI"
  shows only once a description exists, never while writing.
- **Review:** walks every missing answer in one pass, then back.
- **Essential, fields not asked (decided 2026-11-11, see DECISIONS):** Review
  has a "Shift" row (day / night, Change opens job type); languages from the
  description show under Preferences; gender and age are in Finish setup;
  degree, experience-based skills and past industry are not asked. Distance
  is never asked: it defaults to any distance in both flows, and Finish setup's "How far candidates can live" changes it.
  Regular shows it under Preferences (`DistanceField`).
- **Essential, ready-for-default fixes (2026-11-11):** Finish setup answers
  are saved (`apnahire:finish-setup`); the posted job leads the Jobs list
  and its card's banner opens them in a side panel (`FinishSetupPanel`); Review always has a Preferences row; 18 role
  profiles, tuned from Ana's live-job data (see DECISIONS). Education has
  "Any"; distance has "Within <city>" and is locked by relocation.
- **Kept on purpose:** an unmatched title becomes "Other" in essential.
- **Presentation:** `docs/presentations/job-posting-flows.html`, published at
  https://claude.ai/artifact/4KSptg81ELuVtePvwsqDkx (live form vs our flows).
  Live form fields were read from employer.apna.co on 2026-11-11.
- **Open / not done:** e2e walk tests were adapted for auto-advance and desktop
  pages; screenshot baselines (`@visual`) need updating after review. Nothing
  committed. Live taps/time not measured. Bug seen: with "telecaller … BPO"
  the AI picks a role the title rule disagrees with, so "Role looks like
  Telesales" shows on page 1 and Review.

## Preview: essential flow (`?flow=essential`, 2026-11-10)
- **Asks:** title; workplace and location; salary (joining fee as a line with
  Change); "Who can apply". Desktop 2 pages; phones one question per screen
  (6 for a delivery job, 7 for a telecaller), then Review.
- **Works out:** job role from the title (`categoryForTitle`), industry from
  the company (`COMPANY_INDUSTRY`), pay type (fixed), job type (full time),
  the description (written on Review).
- **"Who can apply" follows the role** (`src/lib/apnahire/role-profiles.ts`):
  Delivery asks what they must have and experience; Telesales asks education,
  English, experience. A skipped question takes its open answer and shows on
  Review as its own row with Edit; the candidate preview and the description
  leave it out. "Add a requirement" shows the rest. The profiles are an
  estimate, not data.
- **Describe chips follow the role** (`rolePromptChips`): role, area, salary,
  then the role's own questions once the text names the role. "Try a role"
  (`DEMO_ROLES`) fills the box with a sample for five roles.
- **After posting:** the job-live screen shows "Finish setup"
  (`post-job/finish-setup.tsx`): who candidates call, walk-in, questions for
  applicants, job location, distance, preferences, perks. The pop-up steps
  through the rows ("Save and next", "Skip"). The same rows are on the job's
  card (side panel) and in job details, ⋮ "About this job" → "Job settings"
  (`JobSetup`). Prototype: only the last posted job's answers are saved.
- **Its own chrome:** step 3 is "Review"; the step menu, progress bar and the
  manual intro list only its questions. Review marks a missing answer "Not
  answered yet" and rewrites a description written before a late answer.
- Not live; the reasons are in `DECISIONS.md`.

## Files
| What | Where |
|---|---|
| Flow, saving, drafting | `src/components/apnahire/post-job/post-job-flow.tsx` |
| Every screen (`SCREENS` list at the end) | `post-job/wizard-screens.tsx` |
| Field editors (choice cards, chips, walk-in, fee…) | `post-job/job-fields.tsx` |
| Describe screen, voice | `post-job/describe-step.tsx`, `src/hooks/use-speech-recognition.ts` |
| AI fill | `src/app/api/apnahire/draft-job/route.ts` (Gemini; prompt + schema); model and key in `src/lib/ai/google.ts` |
| Keyword fill (no AI key, AI failed, live chips) | `src/lib/apnahire/prompt-parse.ts` |
| Draft type, labels, option lists | `src/lib/apnahire/job-draft.ts`, `src/types/apnahire-job.ts` |

## AI fill
- The AI fills every field the description states. A detailed description
  should leave almost nothing to ask. The schema is required-but-nullable:
  with optional fields Gemini's structured output answered with two fields.
- `?flow=essential`: the request carries `flow`, and the prompt gains the role
  profiles (`roleRulesForAi`), so the draft and its description leave out
  what the role does not ask (no education for a delivery job).
- "No joining fee" / "no walk-in" count as answers (false). Gender words never
  go into the title. "Age 21–30" is age, never experience.
- Perks, assets and degrees come only from the form's own lists, so the chips
  show as picked.
- Pay type: a salary with no incentive mentioned → "Fixed only". With
  incentives → "Fixed + incentive".
- The joining-fee question is always asked again, even when the text answers
  it (candidate safety).
- **No AI key locally:** without `GOOGLE_GENERATIVE_AI_API_KEY` (or
  `GEMINI_API_KEY`; `src/lib/ai/google.ts` takes either) the route uses
  the keyword parser, the same one that runs when the AI fails. It reads spoken
  salaries ("15 to 20 thousand").

## Description step
- Writes itself on arrival (and on Review in the essential flow): a skeleton
  in the box, a rolling strip under it (`post-job/writing-state.tsx`) with a
  "Stop, I'll paste mine" link. The text types into the box; stopping leaves
  it empty and focused for a paste.

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
