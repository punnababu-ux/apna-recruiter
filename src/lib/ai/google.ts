/**
 * The Gemini provider for every AI route. The AI SDK reads
 * GOOGLE_GENERATIVE_AI_API_KEY; this machine keeps the same key as
 * GEMINI_API_KEY, so either name turns on live AI. `hasGoogleKey` is the
 * routes' switch between live AI and their local dummy mode.
 */

import { createGoogleGenerativeAI } from "@ai-sdk/google"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
export const hasGoogleKey = Boolean(apiKey)
export const google = createGoogleGenerativeAI({ apiKey })
/** The job-draft model. Gemini 3.8 Flash for the demo (Punna, 2026-11-10): the same fields as Pro, better prose than 3.5;
 *  cost later. The OnlyRounds routes keep 2.5 Flash. */
export const DRAFT_MODEL = "gemini-3.8-flash"
