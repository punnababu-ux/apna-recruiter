# Job posting audit, 2026-11-11

All four paths of `/apnahire/jobs/new` were walked: regular and essential
(`?flow=essential`), manual and AI (live Gemini 3.8 Flash). Phone is 375px.
Nothing is fixed yet. The open items are in `status/TODO.md` under "Job posting".

## Effort per path (phone, delivery job)
| Path | Taps | Typed fields | Waiting |
|---|---|---|---|
| Regular, manual | 27 | 3 | 20 s (description) |
| Regular, AI | 18 | 1 sentence | 25 s draft, then often 20 s more |
| Essential, manual | 11 | 3 | 20 s (description on Review) |
| Essential, AI | 8 | 1 sentence | 25 s draft |

## Bugs
| # | Where | What happens | Cause |
|---|---|---|---|
| 1 | Salary, both flows | The slider shows ₹15k–₹25k while no salary is set. "Next" then says "Add the salary range". | `?? 15000` / `?? 25000` fallbacks in `Salary` |
| 2 | Description, both flows | "Next" and "Choose a plan" stay live while the AI writes. A tap gives "Add a description". In the essential flow, Review sends you to the description screen with that error while it says "Writing…". | The CTA is not disabled while `writing` |
| 3 | Regular, AI | The draft nearly always leaves industry blank. Answering it makes the description step discard the description it just wrote and write it again, about 20 s more. | Industry is in `descriptionBasisOf` |
| 4 | Essential, desktop | Pay type is not preset to "Fixed only" as it is on phones, so "Next" fails with "Choose a pay type". | `withEssentials` runs only when leaving the title page; on desktop, salary is on that page |
| 5 | Essential | Changing the title from Review's Edit does not update the role or its questions. Read from the code, not reproduced. | `withEssentials` runs after the `returnTo` return in `next()` |
| 6 | Essential | A title that matches no role silently becomes "Other". The company's industry ("IT & Software") goes into every job: a telecaller's description said "our growing IT and software team". | `categoryForTitle` fallback; `COMPANY_INDUSTRY` constant |
| 7 | Desktop, both flows | The chapter marker says "Step 1 of 3"; the stepper and footer say "Step 1 of 4". | Two step counts |
| 8 | Salary preview | "What candidates see" can flash a negative salary ("₹-288") as it counts up. Cosmetic. | `CountUpInr`: rAF time earlier than `t0`; clamp `p` at 0 |

## Changes that would make filling easier, biggest first
1. **Advance on tap for single-choice questions.** Role, industry, workplace,
   education, English and experience each take a tap and then "Next". Moving
   on at the tap saves about 7 taps on the regular manual path.
2. **Preselect what the title already tells us.** The role is marked
   "Suggested" but not selected; workplace and industry are not suggested.
   For "Delivery executive" all three are predictable.
3. **Shorten the AI draft wait.** Of 25 s, 17 s sit on one line
   ("Understanding the role…") and about 7 s are a reveal played after the
   answer has arrived. Roll the lines during the wait; drop the reveal.
4. **Phone Review: answers first.** The candidate preview fills the first
   ~780px, so the editable rows start a full screen down. Rows first,
   preview behind a button.
5. **Essential: description as its own last step.** Also removes bug 2 on
   Review.
6. **Desktop grouped pages: show every missing answer at once.** Today each
   "Next" shows one error, so four empty questions take four presses.

## Other observations
- The regular manual path is 16 single-question screens.
- Desktop essential page 1 is about 1,700px tall.
- Regular desktop is one question per page in a 608px column, mostly empty
  space.
- The Describe drafting screen looked blank for a few seconds in phone
  screenshots; possibly because the pane was hidden (see below).

## Not covered
- **Regular flow on desktop:** one question page checked, not a full walk.
- **Voice input:** not tested.
- **Animation and timing:** the browser pane was hidden during the walks,
  which stalls animations, so motion was not judged.
