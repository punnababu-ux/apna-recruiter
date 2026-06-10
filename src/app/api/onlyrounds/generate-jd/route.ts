/**
 * POST /api/onlyrounds/generate-jd
 *
 * Two flows in one route:
 *   • Generate from a title           → "{ title }"
 *   • Clean up a pasted/draft JD      → "{ jd }" or "{ title, jd }"
 *
 * Uses Google Gemini via @ai-sdk/google with structured output so the
 * cleanup flow can also infer a job title when the user only pasted the
 * description.
 *
 * Setup: add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local.
 * See INTEGRATION.md for direct-provider / AI Gateway alternatives.
 *
 * ── Dummy mode ────────────────────────────────────────────────────────────
 * When GOOGLE_GENERATIVE_AI_API_KEY is absent the route returns a templated
 * placeholder JD (and a derived title) so the wizard flow works locally
 * without an API key.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// ── Prompts ───────────────────────────────────────────────────────────────

export const SYSTEM_PROMPT =
  "You are an expert recruiter writing job descriptions for the Indian job market.\n\n" +
  "You operate in TWO modes:\n\n" +
  "1. GENERATE mode — the user gives you a job title (no body text). " +
  "Expand it into a full, structured job description.\n\n" +
  "2. CLEANUP mode — the user gives you a rough or pasted job description. " +
  "Rewrite it for clarity, fix grammar/structure, and make it more compelling. " +
  "If a job title is missing or unclear, infer the most appropriate one from the content.\n\n" +
  "── Output structure for `jobDescription` ──\n" +
  "Plain text, no markdown headers, no bold, no asterisks, no emojis. " +
  "Use '- ' (hyphen + space) for bullets, not '•'. Match this template " +
  "exactly:\n\n" +
  "Job Title: <Role>\n\n" +
  "Responsibilities:\n" +
  "- <bullet 1>\n" +
  "- <bullet 2>\n" +
  "- <bullet 3>\n" +
  "- <bullet 4>\n" +
  "- <bullet 5>\n" +
  "- <bullet 6>\n\n" +
  "Requirements:\n" +
  "- <bullet 1>\n" +
  "- <bullet 2>\n" +
  "- <bullet 3>\n" +
  "- <bullet 4>\n" +
  "- <bullet 5>\n" +
  "- <bullet 6>\n\n" +
  "Preferred Qualifications:\n" +
  "- <bullet 1>\n" +
  "- <bullet 2>\n" +
  "- <bullet 3>\n" +
  "- <bullet 4>\n\n" +
  "Benefits:\n" +
  "- <bullet 1>\n" +
  "- <bullet 2>\n" +
  "- <bullet 3>\n" +
  "- <bullet 4>\n" +
  "- <bullet 5>\n\n" +
  "Section guidance:\n" +
  "• Responsibilities / Requirements: 5–7 bullets each, concrete and role-specific.\n" +
  "• Preferred Qualifications: 3–5 bullets — nice-to-haves like advanced degrees, " +
  "cloud platforms, related technologies, methodologies.\n" +
  "• Benefits: 4–6 bullets. First, surface anything the user provided in the " +
  "input — salary range, work setup (5-day WFO, hybrid, fully remote), location, " +
  "and company name. THEN add generic-but-relevant benefits (health coverage, " +
  "growth opportunities, collaborative environment, etc.). If a company name " +
  "is mentioned (e.g. Swiggy, Flipkart), reference it in the last benefit " +
  "(e.g. 'Dynamic and collaborative work environment at Swiggy').\n" +
  "• Compensation format: match what the user wrote (e.g. '45 to 55 lacs per " +
  "year', '₹4-6 LPA fixed + incentives', '$80K-100K'). Don't force a single style.\n\n" +
  "── Priority when title and description disagree ──\n" +
  "• GENERATE mode (no description provided): the TITLE is the source of " +
  "truth. Expand it into a full JD and return the title back (cleaned).\n" +
  "• CLEANUP mode (description provided): the DESCRIPTION is the source of " +
  "truth — that's where the user put their real intent. The title was " +
  "probably typed casually as a seed.\n" +
  "  - Read the description first to decide what role it's really about.\n" +
  "  - If the user's title fits what the description is about, keep a " +
  "cleaned version of it.\n" +
  "  - If the user's title contradicts the description (e.g. title says " +
  "'Customer Support Executive' but the description is about Java backend " +
  "development), DISCARD the user's title and RETURN a new title that " +
  "matches the description (e.g. 'Java Developer', 'Backend Engineer').\n" +
  "  - Build the polished `jobDescription` around what the description " +
  "actually contains, not around the user's typed title.\n" +
  "  - Never refuse — always produce a complete JD.\n\n" +
  "── Title rules (ALWAYS populate the `title` field) ──\n" +
  "• Return a clean, concise job title — typically 2–5 words in proper case.\n" +
  "  Good: 'Java Developer', 'Customer Support Executive', " +
  "'Senior Software Engineer', 'Frontend Engineer'.\n" +
  "  Bad: 'java developer with 5 years of experience in Bengaluru location' " +
  "(strip qualifiers and fix casing).\n" +
  "• Strip qualifiers from the user's input: experience requirements " +
  "('5+ years'), location ('in Bengaluru'), compensation hints, employment " +
  "type ('full-time'), and any descriptive sentence fragments.\n" +
  "• Use proper case (Title Case) for the title — capitalise principal words.\n" +
  "• The `jobDescription` body MUST start with 'Job Title: ' followed by the " +
  "same title value.\n\n" +
  "Use Indian context (rupees, lakhs, LPA, cities, common Indian companies) " +
  "where relevant. Keep it concise and free of corporate jargon."

export const buildUserPrompt = (title: string, jd: string) => {
  const hasTitle = title.trim().length > 0
  const hasJd = jd.trim().length > 50
  if (hasJd && hasTitle) {
    return `Mode: CLEANUP\n\nJob title: ${title}\n\nDraft job description:\n${jd}`
  }
  if (hasJd) {
    return `Mode: CLEANUP\n\nDraft job description (no title provided — please infer one):\n${jd}`
  }
  return `Mode: GENERATE\n\nJob title: ${title || "(not provided)"}`
}

// ── Structured output schema ──────────────────────────────────────────────

export const GenerationSchema = z.object({
  jobDescription: z
    .string()
    .describe(
      "The full job description, formatted as plain text per the system prompt's structure. " +
        "Always populated.",
    ),
  title: z
    .string()
    .optional()
    .describe(
      "The job title. In CLEANUP mode, always populate — infer it from the description if the user " +
        "did not provide one. In GENERATE mode you may echo back the provided title.",
    ),
})

export type GenerationResult = z.infer<typeof GenerationSchema>

// ── Dummy generation ──────────────────────────────────────────────────────

function buildDummyResult(title: string, jd: string): GenerationResult {
  const hasJd = jd.trim().length > 50
  const role =
    title.trim() ||
    (hasJd ? deriveDummyTitle(jd) : "") ||
    "this role"
  const jobDescription =
    `About ${role}\n\n` +
    `We're looking for a ${role} to join a high-growth team. You'll own ` +
    `the end-to-end outcomes for your area, partner closely with cross-` +
    `functional stakeholders, and ship thoughtful work at a steady pace.\n\n` +
    `Responsibilities\n` +
    `• Lead core day-to-day execution for your scope\n` +
    `• Partner with product, design, and data peers\n` +
    `• Communicate trade-offs clearly and raise risks early\n\n` +
    `What we're looking for\n` +
    `• 2+ years of relevant experience\n` +
    `• Strong written communication and a bias for action\n` +
    `• Comfort working through ambiguity`
  return { jobDescription, title: role !== "this role" ? role : undefined }
}

function deriveDummyTitle(jd: string): string {
  const text = jd.trim()
  if (!text) return ""
  const patterns = [
    /looking for (?:an?\s+)?([A-Z][A-Za-z0-9/\-\s]{2,40}?)(?=\s+(?:to|who|with|and|\.|,|$))/,
    /hiring (?:an?\s+)?([A-Z][A-Za-z0-9/\-\s]{2,40}?)(?=\s+(?:to|who|with|and|\.|,|$))/,
    /(?:^|\n)\s*(?:Role|Position|Title)\s*[:\-]\s*([^\n]{2,60})/i,
  ]
  for (const re of patterns) {
    const m = text.match(re)
    if (m?.[1]) return m[1].trim().replace(/\s+/g, " ")
  }
  return text.split(/\n/)[0].trim().split(/\s+/).slice(0, 6).join(" ")
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const title: string = (body?.title ?? "").toString()
    const jd: string = (body?.jd ?? body?.seed ?? "").toString()

    if (!title.trim() && !jd.trim()) {
      return NextResponse.json({ jobDescription: "" })
    }

    // Dummy fallback ONLY for local dev without a Gemini key set.
    // Once GOOGLE_GENERATIVE_AI_API_KEY is configured we never fall back to
    // dummy content — the user should see a real error instead of generic
    // template text that doesn't match what they typed.
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log(
        "[generate-jd] dummy mode — set GOOGLE_GENERATIVE_AI_API_KEY to use live Gemini",
      )
      return NextResponse.json(buildDummyResult(title, jd))
    }

    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: GenerationSchema }),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(title, jd),
    })

    const result: GenerationResult = {
      jobDescription: output?.jobDescription?.trim() ?? "",
      title: output?.title?.trim() || undefined,
    }
    if (!result.jobDescription) {
      console.error("[generate-jd] empty jobDescription from Gemini")
      return NextResponse.json({
        jobDescription: "",
        error:
          "The AI didn't return a usable description. Try simplifying your input or clearing one of the fields.",
      })
    }
    return NextResponse.json(result)
  } catch (err) {
    // Map common Gemini failure modes to actionable user-facing messages.
    const raw = String(
      (err as { message?: unknown })?.message ?? err ?? "",
    )
    console.error("[generate-jd]", raw)

    let error = "Couldn't reach the generator. Try again in a moment."
    if (/prepayment|billing|depleted|credits/i.test(raw)) {
      error =
        "Your Gemini API prepayment credits are depleted. Please check billing or top up credits in Google AI Studio."
    } else if (/rate.?limit|quota|RESOURCE_EXHAUSTED|429/i.test(raw)) {
      error =
        "Rate limit reached on Gemini's free tier (20 req/min). Wait ~30 seconds and try again."
    } else if (
      /NoObjectGenerated|schema|invalid.json|could not parse|validation/i.test(
        raw,
      )
    ) {
      error =
        "The AI couldn't structure a response from that. Try simplifying your input or clearing one of the fields."
    } else if (/timeout|deadline|ECONNRESET|ETIMEDOUT/i.test(raw)) {
      error = "The AI request timed out. Try again in a moment."
    } else if (/401|403|unauthorized|forbidden|api.?key/i.test(raw)) {
      error =
        "Gemini rejected the API key. Check GOOGLE_GENERATIVE_AI_API_KEY in .env.local."
    }
    return NextResponse.json({ jobDescription: "", error })
  }
}
