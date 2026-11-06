# Session 2026-11-06 — ECC job page (candidates)

Route: `/apnahire/jobs/[id]` (e.g. `/apnahire/jobs/telecaller-koramangala`).
Main file: `src/app/apnahire/(product)/jobs/[id]/page.tsx`. Decisions are in
`docs/DECISIONS.md` (search "Job page", "Match", "active dot", "results bar",
"active leads", "filters").

## Preview flags
- `?filters=side` — the new layout (wide screens, from 1024px): the filter panel sits on the right, plus sticky match bars.
- `?applicants=0` — a new job with no applicants: "Finding the right candidates" + Active leads.

## What is built
- **Tab row:** Applied / Database line tabs with icons. On the right, a search icon that expands into a field, and the view toggle.
- **Row 2:** status chips on the left, Filters + Relevance on the right.
- **Sticky match bars (High / Medium / Low):**
  - A pill at rest. Once pinned: full bleed with the panel closed, column width with rounded bottom corners with the panel open.
  - The label never moves. The next bar pushes the previous one out with no shape flap.
  - Each bar has a hint line (placeholder copy).
  - Logic: `DockingBar` at the end of page.tsx. Layout variables (`--list-top`, `--bleed-*`, `--list-room`) are measured on `<main>`.
- **Card (`jobs/applicant-card.tsx`):**
  - A checkbox, then the name and `ActiveStatus`.
  - The match chip shows the level only: "High match", no percentage.
  - "Applied N days ago" sits under the chip.
  - One-line "AI match (n/m)" with the requirement ticks.
- **Green dot rule (`active-status.tsx`):** active within 24 hours shows a dot and dark text. Older shows grey text, no dot.
- **Results mode:** any filter, search or selection replaces the bars with one sticky bar.
  - It reads "Showing N of M" or "N selected" · filters · Clear, with Excel and WhatsApp buttons.
  - Only one Clear shows: the bar's when the panel is closed, the panel's "Clear all" when it is open.
- **Empty state:** the no-results clay, the reason, and clear-search / clear-filters buttons.
- **Filters:** a `FILTERS` list with tiers top / next / more. Groups combine with AND, options within a group with OR. The job's own values are tagged "From your job".
- **Active leads (`jobs/active-leads.tsx`):**
  - Three leads and a "+12 more" tile.
  - The database credits chip (`AvailableCreditsButton chip kinds={["database"]}`).
  - "1 database credit unlocks 1 profile".

## Not done
- **Phone versions:** filter sheet, card layout, toolbar.
- **Dark mode.**
- **Compact and table views:** no sticky bars, results bar or checkboxes yet.
- **Database tab:** still a placeholder.
- **Journeys:** not started.
- **Filters:** Industry, Department and Notice period don't narrow the list.
- **Mock data:** Location ✕ glitch on chaitra and Karthik.
- **Copy:** the match-bar hint lines are placeholders.
- **Mock values:** the leads and the credit balance are mock data.
