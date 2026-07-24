/**
 * POST /api/onlyrounds/generate-questions
 *
 * Generates screening questions tailored to the job description and a specific
 * section name. Returns a list of 3 questions with expected/ideal responses.
 *
 * Setup: add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local.
 *
 * ── Dummy mode ────────────────────────────────────────────────────────────
 * When GOOGLE_GENERATIVE_AI_API_KEY is absent the route returns a small set
 * of realistic questions tailored to common job categories.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const SYSTEM_PROMPT =
  "You are an expert recruiter generating screening questions for a specific role.\n\n" +
  "Given the job title, job description, section name (topic), and target audience, " +
  "produce exactly 3 high-quality screening questions with their expected answers/responses.\n\n" +
  "Rules:\n" +
  "• Generate exactly 3 questions.\n" +
  "• Each question should be clear, specific, and directly related to the section name (topic) and job role.\n" +
  "• The answer should define what a good candidate response looks like.\n" +
  "• Keep both question and answer concise (under 2 sentences each)."

export const buildUserPrompt = (input: {
  jobTitle: string
  jd: string
  sectionTitle: string
  targetAudience: string
  existingQuestions: string[]
}) =>
  `Job title: ${input.jobTitle || "(not provided)"}\n\n` +
  `Section name / Topic: ${input.sectionTitle || "(not provided)"}\n` +
  `Target Audience: ${input.targetAudience || "both"}\n\n` +
  (input.existingQuestions.length > 0
    ? `IMPORTANT: Do NOT generate any of the following questions as they are already configured for this section (or very similar ones):\n` +
      input.existingQuestions.map((q) => `- ${q}`).join("\n") +
      `\n\n`
    : "") +
  `Job description:\n${input.jd || "(not provided)"}`

export const QuestionsSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe("The screening question text."),
      answer: z.string().describe("The expected response or ideal answer outline."),
    })
  ),
})

export type QuestionsResult = z.infer<typeof QuestionsSchema>

// ── Dummy generation ──────────────────────────────────────────────────────

function buildDummyQuestions(
  jobTitle: string,
  sectionTitle: string,
  existingQuestions: string[],
): QuestionsResult {
  const role = jobTitle || "this role"
  const topic = sectionTitle.toLowerCase()

  let pool = [
    {
      question: `What makes you a great fit for the ${role} position under the ${sectionTitle} category?`,
      answer: "Demonstrates understanding of the role's key responsibilities and links them to personal strengths.",
    },
    {
      question: `Describe a challenging scenario related to ${sectionTitle} you faced and how you overcame it.`,
      answer: "Structured response using the STAR method (Situation, Task, Action, Result) showing problem-solving skills.",
    },
    {
      question: `How do you ensure quality and accuracy in your work under ${sectionTitle}?`,
      answer: "Mentions double-checking work, following guidelines, seeking feedback, and time management.",
    },
    {
      question: `What are the most important skills a person needs to excel in a category like ${sectionTitle}?`,
      answer: "Identifies core functional competencies and attributes required for the category.",
    },
    {
      question: `Describe a time you collaborated with colleagues to deliver a project related to ${sectionTitle}.`,
      answer: "Highlights teamwork, division of labor, communication, and successful project outcomes.",
    },
    {
      question: `How do you handle constructive feedback or mistakes in your work?`,
      answer: "Maintains accountability, learns from the feedback, and outlines steps taken to prevent future errors.",
    },
  ]

  if (topic.includes("english") || topic.includes("communication")) {
    pool = [
      {
        question: "Can you introduce yourself and explain why you are interested in this role?",
        answer: "Clear, fluent speech with good grammar and direct relevance to the job requirements.",
      },
      {
        question: "How would you handle a situation where a customer is angry and speaks fast in English?",
        answer: "Remains calm, listens actively, and responds politely to resolve the issue step-by-step.",
      },
      {
        question: "Describe your experience communicating with teams or clients in your previous work.",
        answer: "Shows confidence, structured communication, and ability to express ideas clearly.",
      },
      {
        question: "How do you check your written work (like emails or documents) for grammatical errors?",
        answer: "Mentions tools used (spellchecks), proofreading, and attention to detail before sending.",
      },
      {
        question: "Describe a time you had to explain a complex topic to someone who was not familiar with it.",
        answer: "Highlights ability to simplify language, use analogies, and verify understanding.",
      },
      {
        question: "What do you do to improve your spoken English or active listening skills?",
        answer: "Lists practical habits: reading, watching English content, conversing, or taking courses.",
      },
    ]
  } else if (topic.includes("tech") || topic.includes("troubleshoot") || topic.includes("coding") || topic.includes("skill")) {
    pool = [
      {
        question: `What are the core technical tools or programming languages you would use for a ${role} position?`,
        answer: "Lists relevant industry-standard tools and briefly explains their hands-on experience with them.",
      },
      {
        question: "Describe a complex technical problem you solved recently. What was your approach?",
        answer: "Logical troubleshooting steps: identifying root cause, testing solutions, and implementing the fix.",
      },
      {
        question: "How do you keep your technical skills updated with the latest industry standards?",
        answer: "Mentions online courses, reading tech blogs, side projects, or active participation in tech communities.",
      },
      {
        question: "Explain how you would troubleshoot a service that has suddenly crashed in production.",
        answer: "Mentions checking logs, checking resource utilization, reproducing locally, or checking recent deployments.",
      },
      {
        question: "How do you verify the quality and reliability of your code before deploying it?",
        answer: "Highlights writing unit tests, manual testing, code reviews, and running CI/CD validation pipelines.",
      },
      {
        question: "What are the key factors you consider when designing a system for scalability and performance?",
        answer: "Mentions database indexing, caching strategies, decoupling components, and horizontal scaling.",
      },
    ]
  } else if (topic.includes("sales") || topic.includes("negotiat") || topic.includes("field")) {
    pool = [
      {
        question: "How do you handle a prospect who repeatedly says they are not interested?",
        answer: "Listens to objections, finds their pain point, and politely offers value rather than pushing aggressively.",
      },
      {
        question: "Describe a time when you successfully closed a difficult sale. What strategy did you use?",
        answer: "Demonstrates persistence, relationship-building, understanding client needs, and a clear closing technique.",
      },
      {
        question: "What are your strategies for planning your daily field visits to maximize meetings?",
        answer: "Mentions route optimization, scheduling appointments in advance, and setting daily targets.",
      },
      {
        question: "How do you research and qualify prospective leads before calling or visiting them?",
        answer: "Highlights analyzing lead demographics, business size, needs, and previous interactions.",
      },
      {
        question: "Describe how you handle rejection or missing a monthly sales target.",
        answer: "Reflects on conversion stats, keeps a positive attitude, refines the pitch, and increases lead outreach.",
      },
      {
        question: "How do you handle objections about price or contract terms during a client meeting?",
        answer: "Focuses on ROI, highlights unique selling points, and works on mutually beneficial packages.",
      },
    ]
  }

  // Filter out any pool questions that match existing questions (case-insensitive)
  const existingSet = new Set(existingQuestions.map((q) => q.toLowerCase().trim()))
  const filtered = pool.filter((item) => !existingSet.has(item.question.toLowerCase().trim()))

  // Return the first 3 remaining, falling back to full list if everything is filtered out
  const finalQuestions = filtered.length > 0 ? filtered : pool

  return { questions: finalQuestions.slice(0, 3) }
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const jobTitle: string = (body?.jobTitle ?? "").toString()
    const jd: string = (body?.jd ?? "").toString()
    const sectionTitle: string = (body?.sectionTitle ?? "").toString()
    const targetAudience: string = (body?.targetAudience ?? "both").toString()
    const existingQuestions: string[] = Array.isArray(body?.existingQuestions)
      ? (body.existingQuestions as unknown[]).map((q) => String(q))
      : []

    if (!sectionTitle.trim()) {
      return NextResponse.json({ questions: [] })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log(
        "[generate-questions] dummy mode — set GOOGLE_GENERATIVE_AI_API_KEY to use live Gemini",
      )
      return NextResponse.json(buildDummyQuestions(jobTitle, sectionTitle, existingQuestions))
    }

    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: QuestionsSchema }),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt({ jobTitle, jd, sectionTitle, targetAudience, existingQuestions }),
    })

    if (!output || !output.questions) {
      return NextResponse.json({
        questions: [],
        error: "The AI didn't return questions. Try again.",
      })
    }
    return NextResponse.json(output)
  } catch (err) {
    const raw = String((err as { message?: unknown })?.message ?? err ?? "")
    console.error("[generate-questions]", raw)
    let error = "Couldn't generate questions. Try again in a moment."
    if (/prepayment|billing|depleted|credits/i.test(raw)) {
      error =
        "Your Gemini API prepayment credits are depleted. Please check billing or top up credits in Google AI Studio."
    } else if (/rate.?limit|quota|RESOURCE_EXHAUSTED|429/i.test(raw)) {
      error = "Rate limit reached on Gemini's free tier. Wait ~30s and retry."
    } else if (/401|403|unauthorized|api.?key/i.test(raw)) {
      error =
        "Gemini rejected the API key. Check GOOGLE_GENERATIVE_AI_API_KEY in .env.local."
    }
    return NextResponse.json(
      { questions: [], error },
    )
  }
}
