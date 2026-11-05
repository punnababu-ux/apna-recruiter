# Work streams — freeze (2026-11-05)

One page: every stream, where it stands, who moves it next. A fresh chat
reads `AGENTS.md` → `docs/README.md` → this file, then starts.
Update it at the end of any session that moves a stream.

## Repo state at freeze
| Worktree (folder) | Branch | State |
|---|---|---|
| `self-checkout-figma-design-0de944` | `claude/organize-knowledge-base-docs-f3827e` | **Uncommitted:** docs reorganized into folders, skills cleaned, this file. Waits for Punna's commit call |
| `apna-ds` (main checkout) | `main` | Clean |
| `epic-bose-ad6f2b`, `ai-calling-upsell-comparison-6160a5`, `rebuy-banner-design-461cc8` | job-posting / figma-sync branches | Clean, nothing ahead of main: safe to remove when Punna wants |

No other branch is ahead of `origin/main`. No stashes.

## Streams
| Stream | State | Next step | Who |
|---|---|---|---|
| Checkouts (express V11, self V14) | Final, in code, no version switch | Only new feedback from Sumit (skill `design-variants`) | Punna brings feedback |
| Figma ↔ code sync | Dev hand-off page complete; nothing blocking (`status/FIGMA-SYNC-STATUS.md`) | Re-audit after the next code change to checkout (skill `figma-code-sync`) | Claude |
| Docs + knowledge base | Organized 2026-11-05 (`docs/README.md`) | Keep the index current | Claude |
| Knowledge graph (graphify) | Rebuilt 2026-11-05 in this worktree: code + 21 docs | See "Recurring" below | Claude, with reminders |
| Product backlog | 23 open items (`status/TODO.md`) | Punna picks the next one | Punna |
| Pricing gaps | 5 open questions (`reference/PRICING.md` → "Still open") | Punna supplies numbers | Punna |
| Marketing pages without Lovable source | Parked (`start-here/AI-HANDOFF.md` → Pending) | Punna's call | Punna |

## 🟡 Needs Punna (sign-off or manual step)
1. **Commit today's work** in this worktree (docs move + skill cleanup). Claude never commits unasked.
2. **Pricing numbers:** new MRPs after Jan 1, 2027; database volume discount %; "Buy 3" per-job prices; extra-slot proration; 47-credit pack MRP and validity.
3. **Subscription assumptions** (PRICING.md §5): DB credits fresh on upgrade; longer term + fewer slots = downgrade; extra jobs expire newest-first at renewal. Confirm or correct.
4. **Copy:** AI Calling Agent page line "Screening that never clocks off"; drop the two repeated stat cards?
5. **Clay assets:** approve the 8 plan pop-up objects once generated (review flow: raw first, cutout after approval).
6. **Live employer.apna.co onboarding capture:** needs Punna's OTP.
7. **Graph labels:** `graphify label .` needs an LLM key (none set). Optional.
8. **Copy the graph to the main checkout** after this branch merges (`cp -R graphify-out ../../../`), so queries from main see the new doc paths.

## 🔁 Recurring — Claude reminds Punna
- **Rebuild the graph** when docs or many files changed, or 7+ days since the last build (last: 2026-11-05).
  - Code only, free: `graphify update .`
  - Docs too (LLM): ask Claude "re-extract docs into graphify" (incremental, only changed docs).
- **Figma re-audit** after a checkout code change.
- **Before production:** strip the hidden prototype-settings ingresses (TODO.md → "Before production").
- **Stale worktrees:** offer to clean up clean, merged ones.

## What Claude does without asking
Docs/index upkeep, graph code updates, lint/type checks, Figma audits when asked
about Figma, renaming/moving docs with every reference fixed, memory upkeep.
Never without Punna: commits, pushes, merges, deleting worktrees, Opus at
medium/high effort, anything in "Needs Punna".
