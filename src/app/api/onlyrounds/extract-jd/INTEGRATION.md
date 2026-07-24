# JD Extraction — Integration Guide

`POST /api/onlyrounds/extract-jd`

Accepts a free-text job description and returns structured fields that
pre-populate the **Job Details** step of the Create Job wizard.

---

## Request

```json
{
  "jd": "Full text of the job description (required)",
  "title": "Job title if already known (optional)"
}
```

---

## Response

All fields are optional. The model returns only the fields it can extract
with confidence; absent fields must not overwrite existing form state.

```json
{
  "clientId": "flipkart",
  "city": "Bengaluru",
  "area": "Koramangala",
  "experienceType": "any",
  "experiencedPersona": "2+ years in B2C sales, comfortable with targets and field visits.",
  "fresherPersona": "Graduates with strong communication skills and willingness to travel.",
  "workType": "full-time",
  "workMode": "field",
  "scheduleDetails": "Mon–Sat, 9am–6pm; one rotational weekly off.",
  "compExperienced": "₹4–6 LPA fixed + incentives",
  "compFresher": "₹2.5–3.5 LPA fixed + incentives"
}
```

### Field reference

| Field | Type | Allowed values |
|---|---|---|
| `clientId` | `string` | `flipkart` · `swiggy` · `amazon` · `zomato` · `myntra` |
| `city` | `string` | free text (canonical English city name) |
| `area` | `string` | free text (locality within the city) |
| `experienceType` | `enum` | `any` · `experienced` · `freshers` |
| `experiencedPersona` | `string` | 1–2 sentence profile |
| `fresherPersona` | `string` | 1–2 sentence profile |
| `workType` | `enum` | `part-time` · `full-time` · `both` |
| `workMode` | `enum` | `wfh` · `wfo` · `field` · `store` |
| `scheduleDetails` | `string` | free text (hours, shifts, days) |
| `compExperienced` | `string` | free text (e.g. "₹4–6 LPA") |
| `compFresher` | `string` | free text (e.g. "₹2–3 LPA") |

---

## System prompt

Copy this verbatim when calling any provider directly:

```
You are a precise job-details extractor for Indian job postings.
Extract structured fields from the job description provided.
Only populate fields you are confident about —
leave optional fields absent when the information is unclear or not present in the JD.
```

## User prompt template

```
Job title: {title}

Job description:
{jd}
```

Replace `{title}` with the job title (or `"(not provided)"` if absent)
and `{jd}` with the full job description text.

---

## Provider integration

The route uses `@ai-sdk/google` with `gemini-2.5-flash`. To swap providers,
change **only** the model line in `route.ts` — the rest of the code is
provider-agnostic.

---

### Option A — Vercel AI Gateway (recommended for production)

One API key covers Gemini, Claude, OpenAI, and 100+ other models.
Adds automatic failover, cost tracking, and observability with no per-provider keys.

```ts
// route.ts — replace the model line with a plain provider/model string
import { generateText, Output } from "ai"

model: "google/gemini-2.5-flash"   // Gemini
// model: "anthropic/claude-haiku-4.5"   // Claude
// model: "openai/gpt-5.4"               // OpenAI
```

**Authentication — OIDC (recommended):**

```bash
# Link to your Vercel project and pull env vars (provisions VERCEL_OIDC_TOKEN)
vercel link
vercel env pull .env.local
```

The gateway reads `VERCEL_OIDC_TOKEN` automatically. On Vercel deployments the token
is auto-refreshed; locally re-run `vercel env pull .env.local` after ~24 h.

No additional provider packages needed — `ai` handles routing automatically.

---

### Option B — Swapping models via AI Gateway

All models route through AI Gateway — just change the model string.
No provider packages or provider-specific API keys needed.

```ts
// route.ts — swap model string only
model: "google/gemini-2.5-flash"      // Google Gemini (default)
// model: "anthropic/claude-haiku-4.5"   // Anthropic Claude
// model: "openai/gpt-5.4"               // OpenAI
```

Auth is the same as Option A — OIDC via `vercel env pull`.

> **Prefer a specific provider's direct SDK?**
> Call the provider's API yourself using the prompt and JSON Schema in the
> [section below](#calling-any-provider-directly-without-the-ai-sdk), then relay
> the structured result to this route. That keeps the route unchanged while
> letting you use any provider SDK or key of your choice.

---

### Calling any provider directly (without the AI SDK)

If you prefer to call the LLM directly from your own backend and relay
the result to this route, send the JSON below to your provider's chat
completions endpoint and parse the structured output back to the
[response schema](#field-reference) above.

**Messages array**

```json
[
  {
    "role": "system",
    "content": "You are a precise job-details extractor for Indian job postings. Extract structured fields from the job description provided. Only populate fields you are confident about — leave optional fields absent when the information is unclear or not present in the JD."
  },
  {
    "role": "user",
    "content": "Job title: {title}\n\nJob description:\n{jd}"
  }
]
```

**JSON Schema for structured/function-calling output**

```json
{
  "type": "object",
  "properties": {
    "clientId": {
      "type": "string",
      "description": "Client company ID. Must be exactly one of: flipkart, swiggy, amazon, zomato, myntra. Only fill if the company is clearly named in the JD."
    },
    "city": {
      "type": "string",
      "description": "Indian city where the job is based, in canonical English spelling. E.g. 'Bengaluru', 'Mumbai', 'Delhi'."
    },
    "area": {
      "type": "string",
      "description": "Specific locality or area within the city. E.g. 'Koramangala', 'Andheri West'. Leave empty if not mentioned."
    },
    "experienceType": {
      "type": "string",
      "enum": ["any", "experienced", "freshers"],
      "description": "'freshers' if only fresh graduates; 'experienced' if only experienced; 'any' if both or no restriction stated."
    },
    "experiencedPersona": {
      "type": "string",
      "description": "1–2 sentence profile of the ideal experienced candidate. Only fill when experienceType is 'experienced' or 'any'."
    },
    "fresherPersona": {
      "type": "string",
      "description": "1–2 sentence profile of the ideal fresher candidate. Only fill when experienceType is 'freshers' or 'any'."
    },
    "workType": {
      "type": "string",
      "enum": ["part-time", "full-time", "both"],
      "description": "Employment type if explicitly stated."
    },
    "workMode": {
      "type": "string",
      "enum": ["wfh", "wfo", "field", "store"],
      "description": "'wfh'=remote; 'wfo'=office; 'field'=field sales/visits; 'store'=retail store."
    },
    "scheduleDetails": {
      "type": "string",
      "description": "Working hours, shift pattern and days. E.g. 'Mon–Sat, 9am–6pm; rotational weekly off'."
    },
    "compExperienced": {
      "type": "string",
      "description": "Compensation for experienced candidates. E.g. '₹4–6 LPA'. Only fill when experienceType is 'experienced' or 'any'."
    },
    "compFresher": {
      "type": "string",
      "description": "Compensation for fresher candidates. E.g. '₹2–3 LPA'. Only fill when experienceType is 'freshers' or 'any'."
    }
  }
}
```

---

## Error handling

The route always returns HTTP 200. If extraction fails (network error,
missing API key, quota exceeded), it returns `{}` — the wizard navigates
to Step 2 and the user fills fields manually.

Check server logs for `[extract-jd]` entries to diagnose extraction
failures during development.
