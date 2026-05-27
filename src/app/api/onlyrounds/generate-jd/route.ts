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
  "Structure the `jobDescription` output exactly like this (plain text, no markdown " +
  "headers, no bold, no asterisks, no emojis):\n\n" +
  "About <Role>\n\n" +
  "<One short paragraph introducing the role and the kind of person who would thrive in it.>\n\n" +
  "Responsibilities\n" +
  "• <bullet 1>\n" +
  "• <bullet 2>\n" +
  "• <bullet 3>\n" +
  "• <bullet 4>\n\n" +
  "What we're looking for\n" +
  "• <bullet 1>\n" +
  "• <bullet 2>\n" +
  "• <bullet 3>\n\n" +
  "Always return the `title` field in CLEANUP mode (infer it if not provided). " +
  "In GENERATE mode you may echo the provided title back. " +
  "Use '•' (bullet character) for list items. Use rupees (₹) for compensation " +
  "and Indian context where relevant. Keep it concise and free of corporate jargon."

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
      console.error("[generate-jd] empty jobDescription from model")
      return NextResponse.json(buildDummyResult(title, jd))
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error("[generate-jd]", err)
    return NextResponse.json({ jobDescription: "" }, { status: 200 })
  }
}
