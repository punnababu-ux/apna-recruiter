/**
 * POST /api/onlyrounds/extract-jd
 *
 * Accepts { jd: string; title: string } and returns a partial
 * JobDetailsForm with fields confidently inferred from the JD text.
 * Uses Gemini via @ai-sdk/google with structured output.
 *
 * Required env variable (add to .env.local):
 *   GOOGLE_GENERATIVE_AI_API_KEY=<your Gemini API key>
 */

import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// ── Output schema ──────────────────────────────────────────────────────────
// Mirrors the extractable subset of JobDetailsForm from job-details-step.tsx.
// All fields are optional — the model only fills what it is confident about.

const ExtractionSchema = z.object({
  clientId: z
    .string()
    .optional()
    .describe(
      "Client company ID. Must be exactly one of: flipkart, swiggy, amazon, zomato, myntra. " +
        "Only fill if the company is clearly named in the JD. Leave empty if not found.",
    ),
  city: z
    .string()
    .optional()
    .describe(
      "Indian city where the job is based. E.g. 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'. " +
        "Use the canonical English spelling.",
    ),
  area: z
    .string()
    .optional()
    .describe(
      "Specific locality or area within the city. E.g. 'Koramangala', 'Andheri West'. " +
        "Leave empty if not mentioned.",
    ),
  experienceType: z
    .enum(["any", "experienced", "freshers"])
    .optional()
    .describe(
      "'freshers' if only fresh graduates can apply, " +
        "'experienced' if only experienced candidates, " +
        "'any' if both are welcome or no restriction is stated.",
    ),
  experiencedPersona: z
    .string()
    .optional()
    .describe(
      "1–2 sentence profile of the ideal experienced candidate derived from the JD requirements. " +
        "Only fill when experienceType is 'experienced' or 'any'.",
    ),
  fresherPersona: z
    .string()
    .optional()
    .describe(
      "1–2 sentence profile of the ideal fresher candidate derived from the JD requirements. " +
        "Only fill when experienceType is 'freshers' or 'any'.",
    ),
  workType: z
    .enum(["part-time", "full-time", "both"])
    .optional()
    .describe("Employment type if stated in the JD."),
  workMode: z
    .enum(["wfh", "wfo", "field", "store"])
    .optional()
    .describe(
      "Where the work happens: " +
        "'wfh' = work from home / remote, " +
        "'wfo' = work from office / on-site, " +
        "'field' = field sales / on-road visits, " +
        "'store' = retail store.",
    ),
  scheduleDetails: z
    .string()
    .optional()
    .describe(
      "Working hours, shift pattern, and days. E.g. 'Mon–Sat, 9am–6pm; rotational weekly off'.",
    ),
  compExperienced: z
    .string()
    .optional()
    .describe(
      "Compensation for experienced candidates. E.g. '₹4–6 LPA fixed + incentives'. " +
        "Only fill when experienceType is 'experienced' or 'any'.",
    ),
  compFresher: z
    .string()
    .optional()
    .describe(
      "Compensation for fresher candidates. E.g. '₹2–3 LPA fixed + incentives'. " +
        "Only fill when experienceType is 'freshers' or 'any'.",
    ),
})

// ── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const jd: string = body?.jd ?? ""
    const title: string = body?.title ?? ""

    if (!jd.trim()) {
      return NextResponse.json({})
    }

    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: ExtractionSchema }),
      system:
        "You are a precise job-details extractor for Indian job postings. " +
        "Extract structured fields from the job description. " +
        "Only populate fields you are confident about. " +
        "Leave optional fields undefined when the information is absent or ambiguous.",
      prompt:
        `Job title: ${title || "(not provided)"}\n\n` +
        `Job description:\n${jd}`,
    })

    // Drop undefined / empty-string values so they never overwrite existing
    // form state on the client.
    const cleaned = Object.fromEntries(
      Object.entries(output ?? {}).filter(
        ([, v]) => v !== undefined && v !== "",
      ),
    )

    return NextResponse.json(cleaned)
  } catch (err) {
    console.error("[extract-jd]", err)
    // Return an empty object rather than a 500 so the wizard can continue
    // navigation even if extraction fails.
    return NextResponse.json({}, { status: 200 })
  }
}
