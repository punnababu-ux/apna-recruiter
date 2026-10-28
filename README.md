# Poneglyph — apna employer prototype

apna's employer-side prototype: the marketing site, the apna Hire recruiter
app (job posting, checkout, plans, subscriptions) and OnlyRounds, built on
the Poneglyph design system (`packages/design-system`, imported as
`@apna/design-system`).

Accounts, payments and saved state are browser-only mocks (local storage).
The AI routes under `src/app/api` use Gemini when
`GOOGLE_GENERATIVE_AI_API_KEY` is set, and built-in sample data when it isn't.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run check   # lint + token lint + production build; run before every commit
npm test        # bill and plan-change maths
```

## Read first

- `AGENTS.md` — the rules: tokens only, compose from the design system, copy and layout rules.
- `docs/PROJECT-MAP.md` — where everything lives (what's called what → route → files).
- `docs/AI-HANDOFF.md` and `docs/TODO.md` — current context and what's pending.
- `CONTRIBUTING.md` — branch and pull request workflow.
