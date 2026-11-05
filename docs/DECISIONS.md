# Design decisions log

Questions we have already worked through, so the next person with the same
idea starts from the answer. One entry per question: the question, what we
decided (or are leaning to), why, and what would change the answer. Newest
first. Status: **Decided**, **Leaning** (recommendation, not yet signed off)
or **Open**.

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
  amber, low 1 red, with the score ("88% match"; "88%" on phones).
- Score to level: 75+ high, 50–74 medium, under 50 low (`matchLevel`).
- With Relevance, candidates run from highest score to lowest; one thin
  "Low matches" divider marks where low starts. No "High matches" heading
  or grouped sections.
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
WhatsApp is an icon; Reject (red tint) and Shortlist (green tint) are
companions. Once decided, a status tag replaces Reject and Shortlist. On
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
