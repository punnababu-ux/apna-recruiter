/**
 * POST /api/onlyrounds/extract-jd
 *
 * Extracts structured job-detail fields from a free-text JD using an LLM.
 * The current implementation uses Google Gemini via @ai-sdk/google.
 * See INTEGRATION.md in this directory to swap providers or call the model
 * directly from your own backend.
 *
 * ── Dummy mode ────────────────────────────────────────────────────────────
 * When GOOGLE_GENERATIVE_AI_API_KEY is absent the route returns keyword-matched
 * mock data so the full UI flow works without a real API key.
 * Set the env var to switch to the live Gemini call.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// ── Prompt ─────────────────────────────────────────────────────────────────
// Exported so it can be copied verbatim when calling a provider directly
// (without the AI SDK). See INTEGRATION.md.

export const SYSTEM_PROMPT =
  "You are a precise job-details extractor for Indian job postings. " +
  "Extract structured fields from the job description provided. " +
  "Only populate fields you are confident about — " +
  "leave optional fields absent when the information is unclear or not present in the JD."

export const buildUserPrompt = (title: string, jd: string) =>
  `Job title: ${title || "(not provided)"}\n\nJob description:\n${jd}`

// ── Response schema ────────────────────────────────────────────────────────
// All fields are optional. The model only fills what it is confident about.
// Exported as a Zod schema (for AI SDK structured output) and as a plain
// JSON Schema object (for providers that accept raw JSON Schema).

export const ExtractionSchema = z.object({
  clientId: z
    .string()
    .optional()
    .describe(
      "Client company ID. Must be exactly one of: flipkart, swiggy, amazon, " +
        "zomato, myntra. Only fill if the company is clearly named in the JD.",
    ),
  city: z
    .string()
    .optional()
    .describe(
      "Indian city where the job is based, in canonical English spelling. " +
        "E.g. 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'.",
    ),
  area: z
    .string()
    .optional()
    .describe(
      "Specific locality or area within the city. " +
        "E.g. 'Koramangala', 'Andheri West'. Leave empty if not mentioned.",
    ),
  experienceType: z
    .enum(["any", "experienced", "freshers"])
    .optional()
    .describe(
      "'freshers' if only fresh graduates can apply; " +
        "'experienced' if only experienced candidates; " +
        "'any' if both are welcome or no restriction is stated.",
    ),
  experiencedPersona: z
    .string()
    .optional()
    .describe(
      "1–2 sentence profile of the ideal experienced candidate based on the JD. " +
        "Only fill when experienceType is 'experienced' or 'any'.",
    ),
  fresherPersona: z
    .string()
    .optional()
    .describe(
      "1–2 sentence profile of the ideal fresher candidate based on the JD. " +
        "Only fill when experienceType is 'freshers' or 'any'.",
    ),
  workType: z
    .enum(["part-time", "full-time", "both"])
    .optional()
    .describe("Employment type if explicitly stated in the JD."),
  workMode: z
    .enum(["wfh", "wfo", "field", "store"])
    .optional()
    .describe(
      "'wfh' = work from home / remote; 'wfo' = work from office / on-site; " +
        "'field' = field sales / on-road visits; 'store' = retail store.",
    ),
  scheduleDetails: z
    .string()
    .optional()
    .describe(
      "Working hours, shift pattern, and days. " +
        "E.g. 'Mon–Sat, 9am–6pm; rotational weekly off'.",
    ),
  compExperienced: z
    .string()
    .optional()
    .describe(
      "Compensation range for experienced candidates. " +
        "E.g. '₹4–6 LPA fixed + incentives'. " +
        "Only fill when experienceType is 'experienced' or 'any'.",
    ),
  compFresher: z
    .string()
    .optional()
    .describe(
      "Compensation range for fresher candidates. " +
        "E.g. '₹2–3 LPA fixed + incentives'. " +
        "Only fill when experienceType is 'freshers' or 'any'.",
    ),
})

export type ExtractionResult = z.infer<typeof ExtractionSchema>

// ── Dummy extraction (no API key required) ─────────────────────────────────
// Does light keyword-matching on the JD so every field gets a plausible value
// during local development. Replace with the real AI call by setting
// GOOGLE_GENERATIVE_AI_API_KEY (or any provider key — see INTEGRATION.md).

function buildDummyResponse(title: string, jd: string): ExtractionResult {
  const text = `${title} ${jd}`.toLowerCase()

  // Client detection
  const CLIENT_KEYWORDS: Record<string, string[]> = {
    flipkart: ["flipkart"],
    swiggy: ["swiggy"],
    amazon: ["amazon"],
    zomato: ["zomato"],
    myntra: ["myntra"],
  }
  const clientId = (
    Object.entries(CLIENT_KEYWORDS).find(([, kw]) =>
      kw.some((k) => text.includes(k)),
    )?.[0] ?? "flipkart"
  ) as ExtractionResult["clientId"]

  // City detection
  const CITY_MAP: Record<string, string> = {
    bengaluru: "Bengaluru",
    bangalore: "Bengaluru",
    mumbai: "Mumbai",
    delhi: "Delhi",
    hyderabad: "Hyderabad",
    pune: "Pune",
    chennai: "Chennai",
    kolkata: "Kolkata",
    ahmedabad: "Ahmedabad",
    jaipur: "Jaipur",
    surat: "Surat",
    lucknow: "Lucknow",
    nagpur: "Nagpur",
    indore: "Indore",
    bhopal: "Bhopal",
    noida: "Noida",
    gurgaon: "Gurgaon",
    gurugram: "Gurgaon",
    chandigarh: "Chandigarh",
  }
  const city =
    Object.entries(CITY_MAP).find(([k]) => text.includes(k))?.[1] ??
    "Bengaluru"

  // Work mode
  const workMode: ExtractionResult["workMode"] =
    text.includes("work from home") || text.includes("remote")
      ? "wfh"
      : text.includes("store") || text.includes("retail")
        ? "store"
        : text.includes("field") || text.includes("on-road") || text.includes("visit")
          ? "field"
          : "wfo"

  // Work type
  const workType: ExtractionResult["workType"] =
    text.includes("part time") || text.includes("part-time")
      ? "part-time"
      : text.includes("both")
        ? "both"
        : "full-time"

  // Experience type
  const hasFresher =
    text.includes("fresher") ||
    text.includes("fresh graduate") ||
    text.includes("0 year")
  const hasExperienced =
    text.includes("experienced") ||
    text.includes("years of experience") ||
    /\d\+?\s*years?/.test(text)
  const experienceType: ExtractionResult["experienceType"] =
    hasFresher && !hasExperienced
      ? "freshers"
      : hasExperienced && !hasFresher
        ? "experienced"
        : "any"

  return {
    clientId,
    city,
    area: "Koramangala",
    experienceType,
    ...(experienceType !== "freshers" && {
      experiencedPersona:
        "2+ years in B2C sales or a related field; comfortable with daily targets and independent field visits.",
      compExperienced: "₹4–6 LPA fixed + performance incentives",
    }),
    ...(experienceType !== "experienced" && {
      fresherPersona:
        "Recent graduate with strong communication skills and willingness to travel within the city.",
      compFresher: "₹2.5–3.5 LPA fixed + incentives",
    }),
    workType,
    workMode,
    scheduleDetails: "Mon–Sat, 9 am–6 pm; one rotational weekly off.",
  }
}

// ── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const jd: string = body?.jd ?? ""
    const title: string = body?.title ?? ""

    if (!jd.trim()) {
      return NextResponse.json({})
    }

    // ── Dummy mode ────────────────────────────────────────────────────────
    // Active when GOOGLE_GENERATIVE_AI_API_KEY is not set.
    // Returns keyword-matched mock data so the full UI flow works locally.
    // Set the env var to enable the real Gemini call (see INTEGRATION.md).
    // ─────────────────────────────────────────────────────────────────────
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log("[extract-jd] dummy mode — set GOOGLE_GENERATIVE_AI_API_KEY to use live AI")
      return NextResponse.json(buildDummyResponse(title, jd))
    }

    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: ExtractionSchema }),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(title, jd),
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
    const raw = String((err as { message?: unknown })?.message ?? err ?? "")
    if (/prepayment|billing|depleted|credits/i.test(raw)) {
      console.error(
        "[extract-jd] Prepayment credits depleted. Please check billing or top up credits in Google AI Studio."
      )
    } else {
      console.error("[extract-jd]", err)
    }
    // Return an empty object so the wizard can continue even if extraction
    // fails — the user can fill Step 2 manually.
    return NextResponse.json({}, { status: 200 })
  }
}
