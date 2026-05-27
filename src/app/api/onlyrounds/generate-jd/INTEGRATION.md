# JD Generation — Integration Guide

`POST /api/onlyrounds/generate-jd`

Generates a structured job description from a short seed (title or a few
lines of draft text) using **Google Gemini** via `@ai-sdk/google`. The
wizard's **Generate with AI** button calls this route.

---

## Request

```json
{ "seed": "Software Engineer" }
```

`seed` is the title (or a few lines of draft JD) the model expands into a
full job description.

---

## Response

```json
{
  "jobDescription": "About Software Engineer\n\nWe're looking for a Software Engineer to join..."
}
```

`jobDescription` is the generated text, ready to drop straight into the
JD textarea. The route always returns HTTP 200 — on failure the field is
empty so the wizard never blocks.

---

## Setup

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=<key from aistudio.google.com>
```

> The **same** key powers `/api/onlyrounds/extract-jd` as well — one Gemini
> key, both AI flows.

Without the key the route logs `[generate-jd] dummy mode` and returns a
templated placeholder JD so local dev keeps moving.

---

## System prompt

Copy this verbatim if calling Gemini (or any provider) directly:

```
You are an expert recruiter writing job descriptions for the Indian job market.
Generate a clear, well-structured job description for the role provided.

Structure the output exactly like this (plain text, no markdown headers,
no bold, no asterisks, no emojis):

About <Role>

<One short paragraph introducing the role and the kind of person who would thrive in it.>

Responsibilities
• <bullet 1>
• <bullet 2>
• <bullet 3>
• <bullet 4>

What we're looking for
• <bullet 1>
• <bullet 2>
• <bullet 3>

Keep it concise, candidate-friendly, and free of corporate jargon.
Use '•' (bullet character) for list items. Use rupees (₹) for any
compensation references and Indian context where relevant.
```

## User prompt template

```
Generate a job description based on this seed:

{seed}
```

---

## Provider integration

The route uses `@ai-sdk/google` with `gemini-2.5-flash`. To swap providers,
change **only** the model line in `route.ts` — the rest of the code is
provider-agnostic.

### Option A — AI Gateway (recommended for production)

One key covers Gemini, Claude, OpenAI, and 100+ other models with
automatic failover and observability.

```ts
// route.ts — drop the @ai-sdk/google import, use a plain string instead
import { generateText } from "ai"

const { text } = await generateText({
  model: "google/gemini-2.5-flash", // routes through AI Gateway
  system: SYSTEM_PROMPT,
  prompt: buildUserPrompt(seed),
})
```

Auth via OIDC:

```bash
vercel link
vercel env pull .env.local   # provisions VERCEL_OIDC_TOKEN
```

### Option B — Direct Gemini (what we're shipping today)

```ts
import { google } from "@ai-sdk/google"

model: google("gemini-2.5-flash")
```

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=<key from aistudio.google.com>
```

---

## Calling Gemini directly (without the AI SDK)

If you'd rather call Gemini from your own backend and relay the result to
this route, send a `generateContent` request:

```bash
curl -X POST \
  -H "x-goog-api-key: $GOOGLE_GENERATIVE_AI_API_KEY" \
  -H "Content-Type: application/json" \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
  -d '{
    "system_instruction": { "parts": [{ "text": "<SYSTEM_PROMPT from above>" }] },
    "contents": [{
      "role": "user",
      "parts": [{ "text": "Generate a job description based on this seed:\n\nSoftware Engineer" }]
    }]
  }'
```

The generated text is at `response.candidates[0].content.parts[0].text`.

---

## Error handling

The route never throws to the client:

| Condition | Returned to browser | Server log |
|---|---|---|
| Missing key | Dummy JD | `dummy mode` |
| Gemini error / quota | `{ jobDescription: "" }` | error stack |
| Empty seed | `{ jobDescription: "" }` | — |
| Network throw | `{ jobDescription: "" }` | error stack |

Check server logs for `[generate-jd]` entries to diagnose failures.
