/**
 * POST /api/apnahire/draft-job
 *
 * Turns a recruiter's one-line description ("Telecaller in Koramangala,
 * 15-20k, graduate, Hindi") into a structured job draft, or applies a
 * follow-up instruction ("make it 18-22k") to an existing draft.
 *
 * Body: { prompt: string } | { current: JobPostDraft, instruction: string }
 * Returns: Partial<JobPostDraft> — only fields the model is confident about.
 *
 * Same stack as /api/onlyrounds/extract-jd: AI SDK + Gemini, structured
 * output via a zod schema, and a keyword-matching dummy mode when
 * GOOGLE_GENERATIVE_AI_API_KEY is absent so the whole flow works locally.
 */

import { google } from "@ai-sdk/google"
import { generateText, Output } from "ai"
import { NextRequest, NextResponse } from "next/server"

import { readJsonBody } from "@/lib/read-json-body"
import { z } from "zod"

import { ASSETS, CATEGORIES, DEGREES, INDUSTRIES, PERKS } from "@/lib/apnahire/job-draft"
import { parsePrompt } from "@/lib/apnahire/prompt-parse"
import type { JobPostDraft } from "@/types/apnahire-job"

export const SYSTEM_PROMPT =
  "You help small Indian businesses post jobs on apna, a hiring platform for blue- and grey-collar roles " +
  "(telecallers, delivery, sales, support, back office, retail, field staff). " +
  "From the recruiter's description, fill the structured job fields. Fill EVERY field the recruiter stated " +
  "or clearly implied (gender, age, perks, assets, languages, experience, timings and so on); a long description " +
  "should leave almost nothing for the app to ask. Leave a field absent only when nothing in the text points to it. " +
  "A negation is an answer: 'no joining fee' means joiningFee false, 'no walk-in' means walkIn false. " +
  "Gender words ('female telecallers') set `gender`; never put them in `title`. " +
  "'Age 21-30' is age, never experience. " +
  "Salaries are monthly INR (\"15-20k\" means 15000-20000). " +
  "Always write `description`: 80-140 words, plain text, a one-line summary, then 'Responsibilities:' and " +
  "'Requirements:' each followed by 3-5 lines starting with '- '. Do not invent salary, perks or company facts " +
  "in the description. Keep every requirement the recruiter stated exactly — never relax or broaden them. " +
  "Set `industry` only when the business or sector is stated or unambiguous (it is the main reason jobs reach " +
  "the wrong candidates, so the app asks when unsure). Use one role per job. " +
  "When given an existing job and an instruction, return the full updated job."

export const JobDraftSchema = z.object({
  title: z.string().optional().describe("Short job title, e.g. 'Telecaller', 'Delivery Executive'."),
  category: z.enum(CATEGORIES as [string, ...string[]]).optional().describe("apna job role category."),
  industry: z
    .enum(INDUSTRIES as [string, ...string[]])
    .optional()
    .describe("The employer's industry — only when stated or unambiguous."),
  jobType: z.enum(["full_time", "part_time", "both"]).optional(),
  nightShift: z.boolean().optional(),
  locationType: z
    .enum(["office", "home", "field"])
    .optional()
    .describe("office = work from office, home = work from home, field = on-the-road job."),
  city: z.string().optional().describe("Indian city in canonical spelling, e.g. 'Bengaluru'."),
  area: z.string().optional().describe("Locality / office area, e.g. 'Koramangala'."),
  payType: z
    .enum(["fixed", "fixed_incentive", "incentive"])
    .optional()
    .describe("'fixed' when a salary is given and incentives are not mentioned; 'fixed_incentive' when both are; 'incentive' for incentive-only pay."),
  salaryMin: z.number().optional().describe("Monthly fixed salary lower bound in INR."),
  salaryMax: z.number().optional().describe("Monthly fixed salary upper bound in INR."),
  incentive: z.number().optional().describe("Average monthly incentive in INR."),
  perks: z.array(z.enum(PERKS as [string, ...string[]])).optional().describe("Only perks the recruiter names."),
  education: z.enum(["10th", "12th", "diploma", "iti", "graduate", "post_graduate"]).optional(),
  english: z.enum(["none", "basic", "good"]).optional(),
  experienceType: z.enum(["any", "experienced", "fresher"]).optional(),
  minExperienceYears: z.number().optional().describe("Minimum years when experienceType is 'experienced'."),
  maxExperienceYears: z.number().optional().describe("Maximum years when experienceType is 'experienced', if stated."),
  languages: z.array(z.string()).optional().describe("Regional languages required, e.g. ['Hindi']."),
  skills: z.array(z.string()).optional().describe("3-6 short skills relevant to the role."),
  gender: z.enum(["any", "male", "female"]).optional().describe("From words like 'female', 'women', 'male only'."),
  ageMin: z.number().optional().describe("Candidate minimum age in years."),
  ageMax: z.number().optional().describe("Candidate maximum age in years."),
  assets: z
    .array(z.enum(ASSETS as [string, ...string[]]))
    .optional()
    .describe("Things the candidate must own or hold."),
  degrees: z.array(z.enum(DEGREES as [string, ...string[]])).optional().describe("Specific degrees, only if named."),
  relocation: z.boolean().optional().describe("True if candidates willing to relocate may apply."),
  joiningFee: z.boolean().optional().describe("True only if the recruiter says the candidate pays a fee or deposit."),
  walkIn: z.boolean().optional(),
  description: z.string().optional(),
})

const buildPrompt = (prompt: string) => `Recruiter's description:\n${prompt}`
const buildRefinePrompt = (current: JobPostDraft, instruction: string) =>
  `Current job (JSON):\n${JSON.stringify(current)}\n\nRecruiter's instruction:\n${instruction}`

// ── Dummy mode ─────────────────────────────────────────────────────────────
// Keyword parsing shared with the describe screen's live chips
// (src/lib/apnahire/prompt-parse.ts), plus a templated description.

function buildDummyDraft(source: string): Partial<JobPostDraft> {
  const out = parsePrompt(source)
  const role = out.title ?? "team member"
  const where = out.area ? `${out.area}, ${out.city}` : out.city ?? "our office"
  const duties = (out.skills?.length ? out.skills : ["Day-to-day role duties", "Coordinating with the team"]).map(
    (s) => `- ${s}`,
  )
  out.description = [
    `We're hiring a ${role} to join our team in ${where}.`,
    "",
    "Responsibilities:",
    ...duties,
    "- Keep accurate daily records and report progress to your manager",
    "",
    "Requirements:",
    out.education ? `- ${out.education === "graduate" ? "Graduate" : "Minimum " + out.education} education` : "- Willingness to learn",
    out.experienceType === "experienced" && out.minExperienceYears
      ? out.maxExperienceYears && out.maxExperienceYears > out.minExperienceYears
        ? `- ${out.minExperienceYears}–${out.maxExperienceYears} years of relevant experience`
        : `- ${out.minExperienceYears}+ year(s) of relevant experience`
      : "- Freshers and experienced candidates can apply",
    out.languages?.length ? `- Comfortable speaking ${out.languages.join(", ")}` : "- Clear communication skills",
  ].join("\n")
  return out
}

function buildDummyRefine(current: JobPostDraft, instruction: string): Partial<JobPostDraft> {
  // Only fields the instruction itself mentions; the description is kept
  // unless the recruiter asked about it.
  const patch = buildDummyDraft(instruction)
  delete patch.description
  if (!/title|role|designation|hiring a|hire a/i.test(instruction)) delete patch.title
  if (!/skill/i.test(instruction)) delete patch.skills
  delete patch.category
  if (!/industry/i.test(instruction)) delete patch.industry
  // Moving city without naming an area: the old locality belongs to the old
  // city, so drop it rather than produce "Koramangala, Deoria".
  if (patch.city && patch.city !== current.city && !patch.area) patch.area = ""
  // "add Kannada" adds to the list rather than replacing it.
  if (patch.languages) patch.languages = Array.from(new Set([...current.languages, ...patch.languages]))
  return { ...current, ...patch }
}

// ── Handler ────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let prompt = ""
  let instruction = ""
  let current: JobPostDraft | undefined
  let refining = false
  // The local parser's answer — used whenever the live AI can't give one.
  const fallback = () =>
    refining && current ? buildDummyRefine(current, instruction) : buildDummyDraft(prompt)
  try {
    const { body, reject } = await readJsonBody(req)
    if (reject) return reject
    prompt = body?.prompt ?? ""
    instruction = body?.instruction ?? ""
    current = body?.current
    refining = Boolean(current && instruction.trim())

    if (!refining && !prompt.trim()) return NextResponse.json({})

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.log("[draft-job] dummy mode — set GOOGLE_GENERATIVE_AI_API_KEY to use live AI")
      return NextResponse.json(fallback())
    }

    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({ schema: JobDraftSchema }),
      system: SYSTEM_PROMPT,
      prompt: refining && current ? buildRefinePrompt(current, instruction) : buildPrompt(prompt),
    })

    const cleaned = Object.fromEntries(
      Object.entries(output ?? {}).filter(([, v]) => v !== undefined && v !== ""),
    )
    // An empty answer from the AI would leave every field blank: fill from
    // the local parser instead.
    return NextResponse.json(Object.keys(cleaned).length ? cleaned : fallback())
  } catch (err) {
    console.error("[draft-job]", err)
    // The AI failed (rate limit, timeout, bad output). Don't hand back an
    // empty draft — that's the "auto-fill didn't happen" bug — fill from
    // the local parser; the review screen asks for whatever is still missing.
    try {
      return NextResponse.json(prompt.trim() || refining ? fallback() : {})
    } catch {
      return NextResponse.json({})
    }
  }
}
