# JD Generation — Integration Guide

`POST /api/onlyrounds/generate-jd`

Wraps the Apna OnlyRounds JD-generation service. The wizard's
**Generate with AI** button calls this route — it should never call the
upstream service directly (keeps the bearer token out of the browser).

---

## Request (from the browser)

```json
{
  "seed": "Software Engineer"
}
```

`seed` is the title (or a few lines of draft JD) the model expands into a
full job description. The route also accepts `title` or `jobDescriptionText`
as the seed key for convenience.

---

## Response (to the browser)

```json
{
  "jobDescription": "About Software Engineer\n\nWe're looking for..."
}
```

`jobDescription` is the generated text, ready to drop straight into the
JD textarea. The route always returns HTTP 200 — on failure the field is
empty or contains a dummy fallback so the wizard never blocks.

---

## Upstream call

```
POST {APNA_ONLYROUND_API_BASE}/api/workspace/{APNA_ONLYROUND_WORKSPACE_ID}/jobs/generate-job-description

Authorization: Bearer {APNA_ONLYROUND_BEARER_TOKEN}
Content-Type:  application/json

{ "jobDescriptionText": "<seed>" }
```

Response envelope (Apna standard):

```json
{
  "statusCode": 200,
  "status": "SUCCESS",
  "message": "...",
  "data": { "...generated JD lives here..." }
}
```

The route is **defensive about the `data` shape** — it accepts any of
`data` (plain string), `data.jobDescription`, `data.jobDescriptionText`,
`data.description`, `data.text`, `data.content`, `data.generatedText`.
If the upstream contract changes, update `extractJd()` in `route.ts`.

---

## Environment variables

```bash
# .env.local

# Bearer token issued for the staging / production OnlyRounds workspace.
# Without this the route falls back to a local dummy JD so dev keeps moving.
APNA_ONLYROUND_BEARER_TOKEN=eyJhbGciOi...

# Optional — defaults shown.
APNA_ONLYROUND_API_BASE=https://api.staging.infra.apna.co/only-round
APNA_ONLYROUND_WORKSPACE_ID=aaa1bdde-4796-4f1c-ba2e-34d9be4ed9ce
```

For production, pull these from the Vercel project's environment-variable
settings rather than committing them anywhere.

---

## Dummy mode

When `APNA_ONLYROUND_BEARER_TOKEN` is absent the route logs
`[generate-jd] dummy mode` and returns a templated JD built from the
seed string. This keeps the **Generate with AI** button working out of
the box for local development with no secrets.

---

## Error handling

The route never throws to the client:

| Upstream condition | Returned to browser |
|---|---|
| Token missing | Dummy JD |
| Non-2xx HTTP | Dummy JD (server log has the status + body) |
| `status: "ERROR"` envelope | Dummy JD (server log has the message) |
| Unknown `data` shape | Dummy JD (server log has the raw response) |
| Network throw | `{ jobDescription: "" }` |

Check server logs for `[generate-jd]` entries to diagnose failures.

---

## Curl reference

```bash
curl -X POST \
  -H "Authorization: Bearer $APNA_ONLYROUND_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jobDescriptionText":"Software Engineer"}' \
  "$APNA_ONLYROUND_API_BASE/api/workspace/$APNA_ONLYROUND_WORKSPACE_ID/jobs/generate-job-description"
```
