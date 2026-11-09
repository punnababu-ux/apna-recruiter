# Session 2026-11-09: job candidates page (ECC), phones and desktop

Everything here is the default on `/apnahire/jobs/[id]` and `/apnahire/jobs`.
The reasons are in `docs/DECISIONS.md`, entries dated 2026-11-09.

## What shipped
- **Phone candidate card** (`jobs/candidate-deck.tsx`): a tap opens a floating
  card with its neighbours peeking at the sides. The card follows the finger:
  left is next, right is previous. Reject and Shortlist fly it out. Scrolling
  takes it to full screen; back from full screen goes to the list.
- **One profile** (`jobs/candidate-details.tsx`): who, then Profile and Notes,
  in the desktop side panel and the phone card. Actions sit in one footer:
  contact left, decide right.
- **Fields** come from the live applied profile, read 2026-11-09. Phones drop
  what needs a desk to act on. The full list is in DECISIONS.
- **Resume** is a section in Profile, not a tab, until the real file is embedded.
- **Applied tab recency:** "Applied 2 days ago", not Active. A job is live for
  15 days, so Active says little there. Database keeps Active.
- **Small icons** (`jobs/meta-fact.tsx`) replace dots on job and candidate cards.

## How it was tested
- Touch must be tested with real touch events (CDP `Input.dispatchTouchEvent`).
  Mouse tests passed while the finger swipe was broken: `touch-action` has to be
  on the inner scroller (`touch-pan-y`).
- Phone on the same Wi-Fi: `allowedDevOrigins` in `next.config.ts` allows it.
- If a new Tailwind utility does not apply in dev: stop the server, delete
  `.next/dev`, start again.

## Left open (also in `docs/status/TODO.md`)
- Check swipe and the new cards on a real phone.
- Delete the old paths behind `?deck=0` and `?icons=0`.
- Applied tab filters: "Applied in" before "Last active"; drop "Last 30 days".
- Database profile type. View resume and Download are toasts until files exist.
- "Applied today" covers 0 and 1 days in the mock; real data should say yesterday.
