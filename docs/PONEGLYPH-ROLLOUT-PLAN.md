# Poneglyph → Recruiter Dashboard
### Design System Status & Rollout Plan

**System:** Poneglyph (`@apna/design-system`)
**Status:** standalone, pre-integration
**Phases:** 4

---

## 1. Where Poneglyph stands today

The system exists, is documented, and has been stress-tested end-to-end against a real commercial flow — but it currently lives on its own, outside the recruiter dashboard's codebase.

| | |
|---|---|
| **44** | components, 7 categories |
| **2** | token tiers — primitive → semantic |
| **40** | Lucide icons, shared by Figma & code |
| **1:1** | Figma ↔ code component parity |

### Component inventory

| Category | Components | Count |
|---|---|:---:|
| Actions | Button, ButtonGroup, BackButton, Toggle, ToggleGroup | 5 |
| Form & Inputs | Field, Label, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Slider, SearchFilterBar | 10 |
| Data Display | Avatar, Badge, MetricCard, Skeleton, Spinner, Separator, Empty | 7 |
| Navigation | Tabs, ChipTabs, SegmentedTabSwitcher, Breadcrumb, Sidebar, ReusableSidebar, BottomNav | 7 |
| Overlays & Dialogs | Tooltip, Popover, DropdownMenu, Dialog, AlertDialog, Sheet | 6 |
| Feedback & Status | Alert, AlertBanner, Sonner (toast) | 3 |
| Data & Layout | Table, Accordion, JobCard, PricingCard, ApnaLogo, LogoApnaUnlimited | 6 |

### Proof of capability

A full self-serve checkout was built end-to-end on Poneglyph components alone — nothing custom, nothing hand-styled:

`PricingHero → JobCreditBundles → PricingCard → CheckoutDrawer → PaymentModal`

Icons are real Lucide components on both sides — the Figma library and `packages/design-system/src/icons/icons.tsx` now re-export from the same `lucide-react` source, glyph for glyph.

### Known gaps — not yet built, verified absent

| Gap | Why it's needed |
|---|---|
| **DateRangePicker** | Filtering applications / interviews by time window. |
| **FileDropzone** | Resume & JD upload with progress and file-type validation. |
| **Virtualized Table** | Rendering 500+ candidate rows without DOM lag. |
| **MultiSelect / Combobox** | Filtering by several skills or cities at once. |
| **Stepper** | Multi-step job creation wizard needs one; none exists. |
| **Bulk-Action Bar** | Floating dock for batch actions on selected rows. |
| **LPA / ₹ Formatter** | Compensation as ₹8.5 LPA / ₹1.2 Cr, not $100k. |
| **Devanagari Fallback** | Regional-script job titles and profiles need font coverage. |

---

## 2. Phased rollout into the dashboard

Four phases, each shipping a complete, usable surface rather than a half-migrated one — later phases build on components the earlier ones introduced.

### Phase 1 — Foundations & shell
*Scoped, non-breaking rollout*

- Token layer, type scale and fonts brought into the dashboard under a scoped layer — unmigrated pages keep running untouched.
- Navigation chrome: `Sidebar` / `BottomNav` replace ad-hoc layout shells.
- Core primitives (`Button`, `Badge`, `Input`, `Field`…) swapped in wherever raw elements currently stand in.
- Playwright visual-regression tooling stood up from scratch — no such tooling exists yet — with a baseline captured across the top recruiter pages before anything else ships.

**New components:** LPA formatter · Devanagari fallback · Toast taxonomy · Playwright visual regression

**Unlocks:** Every screen the phase touches now shares one visual language, and because the rollout is scoped, no page outside that set can break as a side effect. From here on, two independent checks run on every pull request before it can merge: one catches a hardcoded color or spacing value the moment someone types it, the other renders the key pages and compares them pixel-by-pixel against a saved baseline — so a change that passes the first check but still shifts a layout or misaligns a component gets caught before it ships, not after a recruiter notices.

### Phase 2 — Jobs & pipeline hub
*Highest-traffic recruiter surface*

- Job listing and management view rebuilt on `MetricCard`, `SearchFilterBar`, `Table`.
- Job-creation flow restructured as a real multi-step wizard.
- Candidate pipeline review gets an inspection drawer (`Sheet`) instead of full-page context switches.

**New components:** Stepper · FileDropzone

**Unlocks:** The single workflow recruiters spend most of their day in — posting and managing jobs — runs on validated, accessible components with consistent form structure and error handling.

### Phase 3 — Sourcing & candidate database
*Dense, high-volume browsing*

- Candidate search and browse list rebuilt as a virtualized table.
- Multi-skill / multi-city filtering consolidated into one combobox control.
- Bulk selection surfaces a floating action bar for batch operations.

**New components:** Virtualized Table · MultiSelect · Bulk-Action Bar

**Unlocks:** Lists of hundreds of candidates stay smooth to scroll and filter; batch actions on a selection become a first-class pattern instead of one-at-a-time clicks.

### Phase 4 — Remaining surfaces & lock-in
*Full coverage, governance made permanent*

- Invite centre, reports, settings and support brought onto the same components.
- Legacy stylesheets, duplicate components and unreferenced wrappers removed.
- Token-linting and type-checking promoted from opt-in to a hard gate on every route, not just migrated ones.

**New components:** none

**Unlocks:** Full-dashboard consistency with nothing left running on old styling, and drift-prevention becomes structural rather than something a team has to remember to do.

---

## 3. What each phase unlocks

Read together, not as isolated milestones — each phase's capability compounds on the last.

| Phase | Primary surface | New capability | Outcome |
|---|---|---|---|
| 1 · Foundations | Whole shell | Unified nav, type & tokens, drift detection built | One visual language, no regressions — caught by lint + visual-diff CI |
| 2 · Jobs & pipeline | Job posting, pipeline review | Guided wizard, file upload | The busiest daily workflow gets structured, validated forms |
| 3 · Sourcing | Candidate database | Virtualization, multi-filter, bulk actions | Dense lists stay fast; batch work becomes native |
| 4 · Remaining & lock-in | Everything else | CI-enforced governance | Full compliance, legacy code retired, drift prevented by default |

---
*poneglyph · design-system status & rollout · working draft*
