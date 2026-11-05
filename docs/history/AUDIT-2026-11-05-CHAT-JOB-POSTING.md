# Audit — Express chat and job posting vs the design system (2026-11-05)

Scope: `src/components/apnahire/chats/`, `post-job/`, `jobs/`. Two Sonnet passes, spot-checked.
Catalog entries for every component used by a page are now in `src/app/design-system/product/catalog.ts`.

## Clean
No raw colours, arbitrary values, `transition-all`, hand-made tooltips or close buttons, or two green CTAs. BackButton and WizardFooter used correctly.

## Fixes (applied 2026-11-05 unless marked)
- ✅ **Card radius:** `rounded-xl`/`rounded-lg` on nested cards → `rounded-card-nested` (NightShiftCard, 5 Preferences accordion items, Review card, ChoiceCards wrapper, screening rows, jobs empty state).
- ⏸ **Sheet corners (kept):** 10 bottom sheets use `rounded-t-2xl`; changing two would split them. Better: give `SheetContent side=bottom` its own corner once, for all. `rounded-t-2xl` → overlay radius (help-menu.tsx:102, job-posting-chrome.tsx:217).
- ✅ **Raw Change buttons** → `Button variant="link-inline"` (wizard-screens.tsx:895, :934, :1209).
- ✅ **Screening suggestions** → `SuggestionChips` (job-fields.tsx). ⏸ Title variants (wizard-screens.tsx:415) kept as pill Buttons: short one-line labels.
- ✅ **"Redraft the job?" dialog:** now `draft` clay + green primary.
- ✅ **Joining-fee PopupHeader:** `art="wallet"`.
- ✅ **ConversationRow:** the open-row bar moved into the primitive (`active`), on `::after`.
- ⏸ **Title case (needs Punna):** category/industry tile titles ("Customer Support") from `lib/apnahire/job-draft`. They are taxonomy keys (maps, saved drafts); renaming needs a migration and may mirror apna's real taxonomy.

## Candidates for new design-system components
- **OptionCard details slot (expanded picked card)** — Wrapper re-implements the card frame with rounded-xl and overrides OptionCard; a footer/details slot removes it (job-fields.tsx:246-273 ChoiceCards wrapper (details + Must-have))
- **SwitchCard (label + sub-line + Switch, bordered row)** — 4 hand-built label + Switch rows (wizard-screens.tsx:576 NightShiftCard (own sky art), wizard-screens.tsx:654 RelocationCard, job-fields.tsx:258 Must-have row, job-fields.tsx:534 Required switch in question row)
- **MenuRow / ListRow (ink row: icon, label, trailing tick or external icon)** — 3 copies of ink relative flex gap-3 rounded row with hover or selected bg (help-menu.tsx:58 Row, wizard-screens.tsx:726 PlaceRow, job-posting-chrome.tsx:237 step-menu rows)
- **Boxed accordion variant** — AccordionItem className rounded-xl border px-4 repeated 5 times with the wrong radius (wizard-screens.tsx:1439,1451,1468,1479,1490)
- **StepNumber (numbered tile)** — 2 numbered tiles; or reuse Stepper (wizard-screens.tsx:371 ManualIntro, job-posting-chrome.tsx:229 step-menu heading)
- **InlineSetting row ('Hiring for X  Change')** — 3 copies of icon + text + Change link; 3 of them use a raw button (895, 934, 1209) instead of link-inline (wizard-screens.tsx:462 Title, wizard-screens.tsx:1284 Perks, wizard-screens.tsx:1208 Salary description)
- **Not new: use SuggestionChips** — Button-as-chip hacks; DS SuggestionChips wraps text already (wizard-screens.tsx:415, job-fields.tsx:569)
- **RemovableChip / FilterChip** — The file itself says no removable-chip primitive exists; a chip is Button xs outline + X. Likely reusable by any applied-filters row. (chat-applied-row.tsx:56-66)
- **SearchField (Input with leading icon)** — Absolute-positioned Search icon + Input drawn twice in one file. Check SearchFilterBar first. (chat-inbox.tsx:377-389, chat-inbox.tsx:390-405)
- **PersonRow (avatar lg + name + meta)** — Same avatar/name/meta strip, fallback bg-accent text-accent-foreground repeated. (chat-thread.tsx:459-477, candidate-profile-panel.tsx:127-136)
- **IconTooltipButton (ghost icon-sm round Button in Tooltip)** — Same Tooltip>Trigger>Button ghost icon-sm rounded-full text-muted-foreground, with label used for aria-label and tooltip. (chat-thread.tsx:596-612, template-picker.tsx:92-112)
- **Side pane band (BAND/SUBROW)** — Three-pane workspace chrome shared by constants; could be a SplitPane / PaneHeader component. (chat-bands.ts, chat-inbox.tsx:369, chat-workspace.tsx:57, chat-thread.tsx:456,512, candidate-profile-panel.tsx:127)
- **CenteredEmpty (Empty with icon, title, text)** — Same Empty + MessageCircle composition three times. (page.tsx:11-20, [id]/page.tsx:21-31, chat-inbox.tsx:433-449)
- **IconList (bulleted list with leading status icons)** — Single use here; only a candidate if reused elsewhere. (candidate-profile-panel.tsx:72-83)
