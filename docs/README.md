# Docs index — start here

Every doc in this repo, by what you need it for. Rules live in `AGENTS.md`
(repo root); everything else is here. Keep this file current when you add,
move or retire a doc.

## Reading order for a new chat or agent
1. `AGENTS.md` — the contract (jump to the section you need; don't read it all).
2. `docs/start-here/AI-HANDOFF.md` — working context, workflows, what is pending.
3. `docs/status/WORK-STREAMS.md` — every stream's state, what needs Punna, recurring reminders.
4. `docs/start-here/PROJECT-MAP.md` — "what Punna says → route → file". Use it instead of exploring.

## Folders
| Folder | Holds | Changes |
|---|---|---|
| `start-here/` | Orientation: handoff + project map | Every session that moves the work |
| `reference/` | Lookups: components, tokens, pricing, clay style | When the code they describe changes |
| `status/` | Live trackers: backlog, Figma sync, review boards | After every step on that track |
| `history/` | Session records, audits, plans | Only the open session's file is edited; past ones stay as written |

## Every doc
| File | Use it for |
|---|---|
| `start-here/AI-HANDOFF.md` | Pick up mid-project: current focus, workflows, pending |
| `start-here/PROJECT-MAP.md` | Find the route and file for a term |
| `reference/COMPONENTS.md` | Design-system component inventory + import snippets |
| `reference/TOKENS.md` | Every semantic token and its primitive (grep it) |
| `reference/PRICING.md` | Every plan's price in the prototype, open price questions |
| `reference/LIVE-EMPLOYER-KB.md` | The live employer.apna.co app, page by page (read before planning recruiter-app work) |
| `reference/CLAY-ILLUSTRATIONS.md` | Clay 3D illustration style, rules, live prompt |
| `reference/CLAY-PROMPTS-V2.md` | Draft v2 clay prompts (not live yet; replaces the style once approved) |
| `status/WORK-STREAMS.md` | Freeze: streams, needs-Punna list, recurring reminders (graph rebuild) |
| `status/TODO.md` | Product backlog, one line per item |
| `status/FIGMA-SYNC-STATUS.md` | Figma ↔ code sync progress; resume Figma work from here |
| `status/REVIEW-BOARDS.md` | Links to the screenshot review boards (private artifacts) |
| `history/SESSION-2026-10-30-CHECKOUT.md` | Phone checkouts + version switch (express V11, self V14) |
| `history/SESSION-2026-11-03-CHECKOUT.md` | Switch removed; one design; Buy now on every phone card |
| `history/AUDIT-2026-10.md` | October 2026 code + layout audit findings |
| `history/PONEGLYPH-ROLLOUT-PLAN.md` / `.html` | Plan to roll the design system into the recruiter dashboard |

## Elsewhere
- **On the docs site:** `/design-system/engineering/working-rules` shows these rules for people; update it when this index or the AGENTS.md working rules change.
- **Skills** (`.claude/skills/`): `design-variants` — Sumit's review lenses and version comparisons; `figma-code-sync` — Figma ↔ code audits.
- **API notes:** `src/app/api/onlyrounds/{extract-jd,generate-jd}/INTEGRATION.md`.
- **Knowledge graph:** `graphify-out/` in the main checkout (`/graphify query "…"`); refresh with `graphify update .`.
- **Agent memory:** `~/.claude/projects/-Users-punna-babu-apna-ds/memory/MEMORY.md` (per-user, not in git).

## Naming rules
- UPPER-KEBAB-CASE `.md`, named for the content, not the session.
- Dated records go in `history/` as `<KIND>-YYYY-MM-DD-<topic>.md`.
- A move updates every reference (`grep -rn "docs/<name>"`), memory files included.
