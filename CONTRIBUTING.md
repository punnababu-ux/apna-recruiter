# Contributing

Thanks for working on Poneglyph. This document captures the workflow rules that are **enforced by Bitbucket branch restrictions** on `main`, plus the local conventions we expect every change to follow.

## Golden rules

1. **Never commit directly to `main`.** Direct pushes are rejected by branch restrictions.
2. **Every change ships through a pull request** with at least one approval and a green build.
3. **Branches are short-lived.** Open a branch, ship a PR, let it get deleted on merge.
4. **Rebase over merge** when keeping a branch fresh — keeps history linear.

## Workflow

### 1. Sync and branch

```bash
git checkout main
git pull --rebase
git checkout -b <type>/<short-slug>
```

Branch name prefixes:

| Prefix      | Use for                                   |
|-------------|-------------------------------------------|
| `feat/`     | New user-facing feature                   |
| `fix/`      | Bug fix                                   |
| `chore/`    | Tooling, deps, internal housekeeping      |
| `refactor/` | Code cleanup with no behaviour change     |
| `docs/`     | Docs only                                 |
| `test/`     | Test-only changes                         |

Slug in kebab-case, under ~40 chars. Examples: `feat/create-job-step-2`, `fix/switch-thumb-alignment`.

### 2. Commit

- Small, logically-scoped commits.
- Subject in imperative mood, under 72 chars. Body optional; use it to explain **why**, not **what**.
- Reference the Jira/Linear ticket where applicable: `feat(jobs): add JD upload flow (ONLY-482)`.

### 3. Verify locally before pushing

Run the full pre-flight:

```bash
npm run check       # lint + token-lint + build
```

Individually, if you're iterating:

```bash
npm run lint
npm run lint:tokens
npm run build
```

All three must pass. Don't push a red branch expecting CI to sort it out.

### 4. Push and open a PR

```bash
git push -u origin <branch>
```

Open the PR in Bitbucket. Fill in:

- **What** the change does.
- **Why** it's needed (link the ticket).
- **Screenshots / clips** for any UI change.
- **Risk** — anything reviewers should probe at.
- **Test plan** — the steps you actually ran.

### 5. Review and merge

- Request at least one reviewer (default reviewers are added automatically).
- Address review comments with follow-up commits; don't force-push while review is in flight.
- Once approved + green, **squash-merge** from the Bitbucket UI.
- The source branch auto-deletes. Don't restore it.

## Branch protection (enforced on `main`)

These are set in **Repository settings → Branch restrictions**:

- Prevent changes without a pull request
- Require approvals: **1**
- Require successful builds: **1**
- Prevent rewriting history (no force push)
- Prevent deletion
- Allowed merge strategies: **Squash** only

If a rule blocks you, it's working as intended — open a PR.

## Code conventions

The design-system and codebase rules live in [AGENTS.md](./AGENTS.md) and the token files under `src/styles/tokens/`. Highlights:

- **Atomic order.** Add/edit tokens → atoms (`src/components/ui/*`) → organisms (`src/components/onlyrounds/*`) → compose on pages. No shortcutting.
- **No arbitrary Tailwind values** in `className` (e.g. `p-[13px]`, `text-[10px]`, `max-h-[60vh]`). Use tokens or standard scale. The `lint:tokens` script blocks violations.
- **No raw hex / rgb / oklch / hsl** in components. Reference CSS custom-property tokens.
- **No inline `style={{ color | background | padding | margin | gap | font* }}`** — the same properties must go through tokens.
- **Client components** start with `"use client"` only when interactivity actually needs it.

## Reporting issues

Open a ticket in the project tracker and link it from the PR. For security issues, do **not** file a public ticket — email the maintainer listed in the repo admin settings.
