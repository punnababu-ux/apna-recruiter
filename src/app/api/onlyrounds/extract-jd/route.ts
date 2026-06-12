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
  "leave optional fields absent when the information is unclear or not present in the JD.\n\n" +
  "── Question Sections & Specific Questions ──\n" +
  "Provide 3-5 highly relevant question section categories under `suggestedPresets` (e.g. 'English Communication', 'Technical Fit'). " +
  "For EACH suggested section category, you MUST pre-generate exactly 3 screening questions (and expected ideal responses/answers) tailored to the role. Keep both questions and answers concise (under 2 sentences).\n\n" +
  "── Pipeline Rounds & Criteria ──\n" +
  "Suggest 2-3 pipeline rounds (under `suggestedRounds`) appropriate for this role (e.g. one 'screening' type round like 'Initial Screening' and one or two 'interview' type rounds like 'Technical Round'). " +
  "For EACH round, pre-generate its specific evaluation criteria split into `mustHave` (3-5 items), `goodToHave` (2-4 items), and `redFlag` (1-3 items) based on the JD requirements. Keep criteria as concise, checkable statements."

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
  suggestedPresets: z
    .array(
      z.object({
        title: z.string().describe("Title of the question section, e.g. 'English Speaking', 'React Development'."),
        target: z.enum(["experienced", "freshers"]).describe("Audience target for this section."),
        questions: z.array(
          z.object({
            question: z.string().describe("The screening question text."),
            answer: z.string().describe("The expected response or ideal answer outline."),
          })
        ).describe("Exactly 3 screening questions for this section.")
      })
    )
    .optional()
    .describe("3-5 suggested question sections tailored specifically to this job role based on the JD, each containing 3 pre-generated screening questions and expected answers."),
  suggestedRounds: z
    .array(
      z.object({
        type: z.enum(["screening", "interview"]).describe("Type of round."),
        title: z.string().describe("Round title, e.g. 'Initial AI Screening', 'Technical Deep-dive'."),
        mustHave: z.array(z.string()).describe("Required criteria (3-5 items) the candidate must meet."),
        goodToHave: z.array(z.string()).describe("Bonus criteria (2-4 items) that strengthen a candidate."),
        redFlag: z.array(z.string()).describe("Dealbreakers (1-3 items) that prevent shortlisting."),
      })
    )
    .optional()
    .describe("2-3 suggested rounds/tasks for the interview pipeline, each with pre-generated Must-have, Good-to-have, and Red-flag criteria specifically tailored for it.")
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

  // Mock questions mapping based on category
  const getMockQuestions = (category: string) => {
    if (category === "English Speaking" || category === "Customer Interaction" || category === "Customer Empathy") {
      return [
        {
          question: "Can you introduce yourself in English and describe your background?",
          answer: "Candidate should speak clearly, use correct grammar, and present their experience coherently."
        },
        {
          question: "How would you handle an angry customer query over the phone?",
          answer: "Listen actively, apologize for the issue, remain polite, and explain the steps to resolve it."
        },
        {
          question: "Why are you interested in this role and working with our team?",
          answer: "Demonstrate motivation, highlight relevant skills, and show alignment with customer service."
        }
      ]
    }
    if (category === "Technical Skills" || category === "Coding & Logic" || category === "System Troubleshooting") {
      return [
        {
          question: "Explain the difference between state and props in React.",
          answer: "State is local and managed within a component; props are passed from parent to child and are read-only."
        },
        {
          question: "How do you optimize a React component's rendering performance?",
          answer: "Use memoization (useMemo, useCallback), avoid inline functions, split components, or virtualize long lists."
        },
        {
          question: "What is your approach to writing automated unit tests in React?",
          answer: "Use Jest and React Testing Library to test component behavior, simulate user interactions, and mock external calls."
        }
      ]
    }
    // Default fallback questions
    return [
      {
        question: "Describe your experience relevant to the requirements of this job.",
        answer: "Provide specific examples of past tasks, responsibilities, and achievements related to the role."
      },
      {
        question: "How do you prioritize your work when faced with multiple urgent deadlines?",
        answer: "Assess urgency/impact, communicate with stakeholders, organize tasks systematically, and execute."
      },
      {
        question: "Explain a time you had to learn a new tool or process quickly. How did you go about it?",
        answer: "Read documentation, seek guidance from colleagues, practice hands-on, and ask targeted questions."
      }
    ]
  }

  // Suggested presets based on job category
  const suggestedPresetsList: Array<{
    title: string
    target: "freshers" | "experienced"
    questions?: Array<{ question: string; answer: string }>
  }> = [
    { title: "English Speaking", target: "freshers" },
  ]
  if (text.includes("sales") || text.includes("bd") || text.includes("business development")) {
    suggestedPresetsList.push(
      { title: "Field Sales Capability", target: "experienced" },
      { title: "Customer Interaction", target: "freshers" },
      { title: "Negotiation", target: "experienced" }
    )
  } else if (text.includes("tech") || text.includes("developer") || text.includes("engineer") || text.includes("software")) {
    suggestedPresetsList.push(
      { title: "Technical Skills", target: "experienced" },
      { title: "Coding & Logic", target: "experienced" },
      { title: "System Troubleshooting", target: "experienced" }
    )
  } else if (text.includes("support") || text.includes("customer service") || text.includes("helpdesk")) {
    suggestedPresetsList.push(
      { title: "Customer Empathy", target: "freshers" },
      { title: "Problem Resolution", target: "experienced" },
      { title: "Escalation Handling", target: "experienced" }
    )
  } else {
    suggestedPresetsList.push(
      { title: "Freshers Assessment", target: "freshers" },
      { title: "Experienced Competency", target: "experienced" }
    )
  }

  const suggestedPresets = suggestedPresetsList.map((p) => ({
    ...p,
    questions: getMockQuestions(p.title),
  }))

  const suggestedRounds = [
    {
      type: "screening" as const,
      title: "Initial AI Screening",
      mustHave: [
        "Clearly communicates in English/Hindi",
        "Demonstrates basic knowledge of the role",
        "Willingness to work matching the job schedule"
      ],
      goodToHave: [
        "Prior experience in a similar industry",
        "Proactive attitude during conversation"
      ],
      redFlag: [
        "Extremely poor communication or background noise",
        "Unwilling to work standard shifts"
      ]
    },
    {
      type: "interview" as const,
      title: "Technical deep-dive",
      mustHave: [
        "Solid understanding of core job competencies",
        "Strong problem-solving capability"
      ],
      goodToHave: [
        "Understands relevant frameworks or tools",
        "Good alignment with the team culture"
      ],
      redFlag: [
        "Cannot answer basic industry questions",
        "Lack of interest or unprofessional conduct"
      ]
    }
  ]

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
    suggestedPresets,
    suggestedRounds,
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
