/**
 * POST /api/onlyrounds/generate-jd
 *
 * Generates a structured job description from a short seed (job title or
 * a few lines of draft text) using Google Gemini via @ai-sdk/google.
 *
 * Setup: add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local.
 *
 * See INTEGRATION.md in this directory to swap providers or call the model
 * directly from your own backend.
 *
 * ── Dummy mode ────────────────────────────────────────────────────────────
 * When GOOGLE_GENERATIVE_AI_API_KEY is absent the route returns a templated
 * placeholder JD so the wizard flow works without an API key.
 * Set the env var to enable the live Gemini call.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { NextRequest, NextResponse } from "next/server"

// ── Prompt ─────────────────────────────────────────────────────────────────
// Exported so it can be copied verbatim when calling a provider directly
// (without the AI SDK). See INTEGRATION.md.

export const SYSTEM_PROMPT =
  "You are an expert recruiter writing job descriptions for the Indian job market. " +
  "Generate a clear, well-structured job description for the role provided.\n\n" +
  "Structure the output exactly like this (plain text, no markdown headers, " +
  "no bold, no asterisks, no emojis):\n\n" +
  "About <Role>\n\n" +
  "<One short paragraph introducing the role and the kind of person who " +
  "would thrive in it.>\n\n" +
  "Responsibilities\n" +
  "• <bullet 1>\n" +
  "• <bullet 2>\n" +
  "• <bullet 3>\n" +
  "• <bullet 4>\n\n" +
  "What we're looking for\n" +
  "• <bullet 1>\n" +
  "• <bullet 2>\n" +
  "• <bullet 3>\n\n" +
  "Keep it concise, candidate-friendly, and free of corporate jargon. " +
  "Use '•' (bullet character) for list items. Use rupees (₹) for any " +
  "compensation references and Indian context where relevant."

export const buildUserPrompt = (seed: string) =>
  `Generate a job description based on this seed:\n\n${seed}`

// ── Dummy generation ──────────────────────────────────────────────────────

function buildDummyJd(seed: string): string {
  const role = seed.trim() || "this role"
  return (
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
  )
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const seed: string = (body?.seed ?? body?.title ?? body?.jd ?? "")
      .toString()
      .trim()

    if (!seed) {
      return NextResponse.json({ jobDescription: "" })
    }

    // Dummy fallback when no Gemini key is configured.
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log(
        "[generate-jd] dummy mode — set GOOGLE_GENERATIVE_AI_API_KEY to use live Gemini",
      )
      return NextResponse.json({ jobDescription: buildDummyJd(seed) })
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(seed),
    })

    return NextResponse.json({ jobDescription: text.trim() })
  } catch (err) {
    console.error("[generate-jd]", err)
    // Don't block the UI on failure — return empty so the wizard keeps moving.
    return NextResponse.json({ jobDescription: "" }, { status: 200 })
  }
}
