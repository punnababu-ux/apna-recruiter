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
  "You are an expert recruiter writing job descriptions and setting up interview pipelines for the Indian job market.\n\n" +
  "You operate in TWO modes:\n\n" +
  "1. GENERATE mode — the user gives you a job title or basic prompt. " +
  "Expand it into a full, structured job description.\n\n" +
  "2. CLEANUP mode — the user gives you a rough or pasted job description. " +
  "Rewrite it for clarity, fix grammar/structure, and make it more compelling.\n\n" +
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
  "── Metadata Extraction & Job Details ──\n" +
  "You must also extract/infer the structured job details based on the generated job description:\n" +
  "- `clientId`: Flipkart, Swiggy, Amazon, Zomato, Myntra (must be lowercased, only if mentioned).\n" +
  "- `city` / `area`: Canonical spelling of the Indian city (e.g. Bengaluru, Delhi) and locality if mentioned.\n" +
  "- `experienceType`: 'experienced' (if experience is required), 'freshers' (if fresh graduates only), or 'any'.\n" +
  "- `experiencedPersona` / `fresherPersona`: 1-2 sentence target candidate profile.\n" +
  "- `workType`: 'part-time', 'full-time', or 'both'.\n" +
  "- `workMode`: 'wfh' (remote), 'wfo' (office), 'field', or 'store'.\n" +
  "- `compExperienced` / `compFresher`: Compensation ranges, e.g. '₹4-6 LPA fixed + incentives'.\n\n" +
  "── Question Sections & Specific Questions ──\n" +
  "Provide 3-5 highly relevant question section categories under `suggestedPresets` (e.g. 'English Communication', 'Technical Fit'). " +
  "For EACH suggested section category, you MUST pre-generate exactly 3 screening questions (and expected ideal responses/answers) tailored to the role. Keep both questions and answers concise (under 2 sentences).\n\n" +
  "── Pipeline Rounds & Criteria ──\n" +
  "Suggest 2-3 pipeline rounds (under `suggestedRounds`) appropriate for this role (e.g. one 'screening' type round like 'Initial Screening' and one or two 'interview' type rounds like 'Technical Round'). " +
  "For EACH round, pre-generate its specific evaluation criteria split into `mustHave` (3-5 items), `goodToHave` (2-4 items), and `redFlag` (1-3 items) based on the JD requirements. Keep criteria as concise, checkable statements."

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
  title: z
    .string()
    .describe(
      "The clean, concise job title. In CLEANUP mode, always populate — infer it from the description if the user " +
        "did not provide one. In GENERATE mode you may echo back the provided title.",
    ),
  jobDescription: z
    .string()
    .describe(
      "The full job description, formatted as plain text per the system prompt's template. Always populated.",
    ),
  // Auto-fill details
  clientId: z
    .string()
    .optional()
    .describe(
      "Client company ID. Must be exactly one of: flipkart, swiggy, amazon, zomato, myntra. Only fill if company is named in the JD.",
    ),
  city: z
    .string()
    .optional()
    .describe("Indian city where the job is based, in canonical spelling, e.g. 'Bengaluru', 'Mumbai', 'Delhi'."),
  area: z
    .string()
    .optional()
    .describe("Specific locality or area within the city, e.g. 'Koramangala'. Keep empty if not mentioned."),
  experienceType: z
    .enum(["any", "experienced", "freshers"])
    .optional()
    .describe(
      "'freshers' if only fresh graduates can apply; 'experienced' if only experienced candidates; 'any' if both are welcome.",
    ),
  experiencedPersona: z
    .string()
    .optional()
    .describe(
      "1–2 sentence profile of the ideal experienced candidate. Only fill when experienceType is 'experienced' or 'any'.",
    ),
  fresherPersona: z
    .string()
    .optional()
    .describe(
      "1–2 sentence profile of the ideal fresher candidate. Only fill when experienceType is 'freshers' or 'any'.",
    ),
  workType: z
    .enum(["part-time", "full-time", "both"])
    .optional()
    .describe("Employment type if explicitly stated in the JD."),
  workMode: z
    .enum(["wfh", "wfo", "field", "store"])
    .optional()
    .describe(
      "'wfh' = work from home/remote; 'wfo' = work from office/on-site; 'field' = field sales; 'store' = retail store.",
    ),
  scheduleDetails: z
    .string()
    .optional()
    .describe("Working hours, shift pattern, and days, e.g. 'Mon–Sat, 9am–6pm; rotational weekly off'."),
  compExperienced: z
    .string()
    .optional()
    .describe(
      "Compensation range for experienced candidates, e.g. '₹4–6 LPA fixed + incentives'. Only fill when experienceType is 'experienced' or 'any'.",
    ),
  compFresher: z
    .string()
    .optional()
    .describe(
      "Compensation range for fresher candidates, e.g. '₹2–3 LPA fixed + incentives'. Only fill when experienceType is 'freshers' or 'any'.",
    ),
  // Suggested question sections with pre-generated questions
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
  // Suggested rounds/tasks with pre-generated criteria
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

export type GenerationResult = z.infer<typeof GenerationSchema>

// ── Dummy generation ──────────────────────────────────────────────────────

function buildDummyResult(title: string, jd: string): GenerationResult {
  const hasJd = jd.trim().length > 50
  const role =
    title.trim() ||
    (hasJd ? deriveDummyTitle(jd) : "") ||
    "Software Engineer"

  const jobDescription =
    `Job Title: ${role}\n\n` +
    `Responsibilities:\n` +
    `- Lead core day-to-day development and design of components\n` +
    `- Partner with product, design, and data peers\n` +
    `- Communicate trade-offs clearly and raise risks early\n` +
    `- Write clean, maintainable, and well-tested code\n` +
    `- Debug complex issues and implement robust fixes\n` +
    `- Participate in code reviews and mentor junior developers\n\n` +
    `Requirements:\n` +
    `- 2+ years of professional software development experience\n` +
    `- Strong understanding of computer science fundamentals\n` +
    `- Experience with web technologies like HTML, CSS, JavaScript\n` +
    `- Excellent communication and collaboration skills\n` +
    `- Ability to work independently in a fast-paced environment\n` +
    `- Degree in Computer Science or a related field\n\n` +
    `Preferred Qualifications:\n` +
    `- Experience with TypeScript and React\n` +
    `- Familiarity with cloud services like AWS or GCP\n` +
    `- Knowledge of CI/CD pipelines and automated testing\n\n` +
    `Benefits:\n` +
    `- Competitive compensation and performance-based bonuses\n` +
    `- Comprehensive health insurance coverage\n` +
    `- Flexible working hours and remote work options\n` +
    `- Professional development and learning opportunities`

  return {
    title: role,
    jobDescription,
    clientId: "flipkart",
    city: "Bengaluru",
    area: "Koramangala",
    experienceType: "experienced",
    experiencedPersona: "Experienced software developer comfortable writing React and TypeScript code independently.",
    workType: "full-time",
    workMode: "wfo",
    scheduleDetails: "Mon-Fri, 9:00 AM - 6:00 PM",
    compExperienced: "₹12–18 LPA fixed",
    suggestedPresets: [
      {
        title: "Technical Skills",
        target: "experienced",
        questions: [
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
      },
      {
        title: "Problem Solving",
        target: "experienced",
        questions: [
          {
            question: "Describe a complex bug you resolved recently. How did you diagnose it?",
            answer: "Used browser DevTools to inspect state, checked network logs, isolated code locally, and patched the root cause."
          },
          {
            question: "How do you handle disagreement in technical design decisions with a peer?",
            answer: "Discuss trade-offs objectively, run light benchmarks/prototypes, align on team principles, or escalate if needed."
          },
          {
            question: "What is your process for breaking down a large, ambiguous feature request?",
            answer: "Identify core requirements, define API contracts, create smaller sub-tasks, and ship incremental MVP updates."
          }
        ]
      }
    ],
    suggestedRounds: [
      {
        type: "screening",
        title: "Initial AI Screening",
        mustHave: [
          "At least 2 years of React development experience",
          "Clear explanation of React state management concepts",
          "Available for a full-time in-office role in Bengaluru"
        ],
        goodToHave: [
          "Familiarity with TypeScript",
          "Basic understanding of CI/CD concepts"
        ],
        redFlag: [
          "Unable to work regular in-office hours",
          "Casing/grammar extremely unclear in speech"
        ]
      },
      {
        type: "interview",
        title: "Technical Deep-dive",
        mustHave: [
          "Hands-on coding capability during design discussion",
          "Ability to optimize React rendering performance",
          "Familiarity with modern React hooks and lifecycle"
        ],
        goodToHave: [
          "Prior experience in B2C or e-commerce products",
          "Strong unit-testing habits"
        ],
        redFlag: [
          "Inability to explain core JavaScript functions",
          "Struggles with basic component decomposition"
        ]
      }
    ]
  }
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

    if (!output || !output.jobDescription) {
      console.error("[generate-jd] empty jobDescription from Gemini")
      return NextResponse.json({
        jobDescription: "",
        error:
          "The AI didn't return a usable description. Try simplifying your input or clearing one of the fields.",
      })
    }
    return NextResponse.json(output)
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
