/**
 * POST /api/onlyrounds/generate-criteria
 *
 * Generates candidate-evaluation criteria from the job description, job
 * details, and the configured interview tasks. Returns three buckets:
 *   • mustHave   — required; the candidate must meet all of these
 *   • goodToHave — bonus; strengthens a candidate
 *   • redFlag    — dealbreakers; candidates who don't meet these aren't
 *                  shortlisted
 *
 * Uses Google Gemini via @ai-sdk/google. Total criteria across the three
 * buckets are capped at 15.
 *
 * Setup: add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local.
 *
 * ── Dummy mode ────────────────────────────────────────────────────────────
 * When GOOGLE_GENERATIVE_AI_API_KEY is absent the route returns a small set
 * of templated criteria so the UI flow works without an API key.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const MAX_CRITERIA = 15

export const SYSTEM_PROMPT =
  "You are an expert recruiter defining how an AI screener should evaluate " +
  "candidates for a role in the Indian job market.\n\n" +
  "From the job description, job details, and interview tasks provided, " +
  "produce concise, checkable evaluation criteria split into three buckets:\n" +
  "• mustHave — hard requirements the candidate MUST meet (skills, " +
  "experience, availability).\n" +
  "• goodToHave — nice-to-haves that strengthen a candidate but aren't " +
  "required.\n" +
  "• redFlag — dealbreakers. If a candidate does not satisfy one of these, " +
  "they should NOT be shortlisted (e.g. 'No valid two-wheeler license', " +
  "'Cannot work weekends', 'Notice period over 60 days').\n\n" +
  "Rules:\n" +
  "• Each criterion is one short, specific, verifiable line (no sub-bullets).\n" +
  "• The TOTAL number of criteria across all three buckets must be 15 or " +
  "fewer. Aim for ~6 mustHave, ~4 goodToHave, ~3 redFlag.\n" +
  "• Tailor them to the actual role and the screening/interview tasks — " +
  "don't pad with generic filler.\n" +
  "• Use plain language a recruiter would recognise."

export const buildUserPrompt = (input: {
  title: string
  jd: string
  detailsSummary: string
  tasksSummary: string
}) =>
  `Job title: ${input.title || "(not provided)"}\n\n` +
  `Job details:\n${input.detailsSummary || "(none)"}\n\n` +
  `Interview tasks:\n${input.tasksSummary || "(none)"}\n\n` +
  `Job description:\n${input.jd || "(not provided)"}`

export const CriteriaSchema = z.object({
  mustHave: z
    .array(z.string())
    .describe("Required criteria the candidate must meet."),
  goodToHave: z
    .array(z.string())
    .describe("Bonus criteria that strengthen a candidate."),
  redFlag: z
    .array(z.string())
    .describe(
      "Dealbreakers — candidates who don't meet these are not shortlisted.",
    ),
})

export type CriteriaResult = z.infer<typeof CriteriaSchema>

// ── Dummy generation ──────────────────────────────────────────────────────

function buildDummyCriteria(title: string): CriteriaResult {
  const role = title.trim() || "this role"
  return {
    mustHave: [
      `Relevant experience for a ${role}`,
      "Clear spoken communication",
      "Available to start within the expected notice period",
      "Comfortable with the stated work mode and schedule",
    ],
    goodToHave: [
      "Prior experience in a similar industry",
      "Familiarity with common tools for the role",
      "Multilingual ability for customer-facing work",
    ],
    redFlag: [
      "Unwilling to work the required shifts",
      "Compensation expectations far outside the offered range",
    ],
  }
}

// ── Route handler ─────────────────────────────────────────────────────────

function capTotal(result: CriteriaResult): CriteriaResult {
  let budget = MAX_CRITERIA
  const take = (arr: string[]) => {
    const cleaned = (arr ?? [])
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, budget)
    budget -= cleaned.length
    return cleaned
  }
  // Fill in priority order: must-have, then good-to-have, then red-flag.
  const mustHave = take(result.mustHave)
  const goodToHave = take(result.goodToHave)
  const redFlag = take(result.redFlag)
  return { mustHave, goodToHave, redFlag }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const title: string = (body?.title ?? "").toString()
    const jd: string = (body?.jd ?? "").toString()
    const detailsSummary: string = (body?.detailsSummary ?? "").toString()
    const tasksSummary: string = (body?.tasksSummary ?? "").toString()

    if (!jd.trim() && !title.trim()) {
      return NextResponse.json({ mustHave: [], goodToHave: [], redFlag: [] })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log(
        "[generate-criteria] dummy mode — set GOOGLE_GENERATIVE_AI_API_KEY to use live Gemini",
      )
      return NextResponse.json(capTotal(buildDummyCriteria(title)))
    }

    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: CriteriaSchema }),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt({ title, jd, detailsSummary, tasksSummary }),
    })

    if (!output) {
      return NextResponse.json({
        mustHave: [],
        goodToHave: [],
        redFlag: [],
        error: "The AI didn't return criteria. Try again.",
      })
    }
    return NextResponse.json(capTotal(output))
  } catch (err) {
    const raw = String((err as { message?: unknown })?.message ?? err ?? "")
    console.error("[generate-criteria]", raw)
    let error = "Couldn't generate criteria. Try again in a moment."
    if (/rate.?limit|quota|RESOURCE_EXHAUSTED|429/i.test(raw)) {
      error = "Rate limit reached on Gemini's free tier. Wait ~30s and retry."
    } else if (/401|403|unauthorized|api.?key/i.test(raw)) {
      error =
        "Gemini rejected the API key. Check GOOGLE_GENERATIVE_AI_API_KEY in .env.local."
    }
    return NextResponse.json(
      { mustHave: [], goodToHave: [], redFlag: [], error },
    )
  }
}
