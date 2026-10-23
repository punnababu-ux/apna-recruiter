/**
 * Turns a Gemini failure into a message the user can act on, and logs the raw
 * error under the route's tag. `fallback` is used when no known case matches.
 */
export function geminiErrorMessage(tag: string, err: unknown, fallback: string) {
  const raw = String((err as { message?: unknown })?.message ?? err ?? "")
  console.error(`[${tag}]`, raw)
  if (/prepayment|billing|depleted|credits/i.test(raw))
    return "Your Gemini API prepayment credits are depleted. Please check billing or top up credits in Google AI Studio."
  if (/rate.?limit|quota|RESOURCE_EXHAUSTED|429/i.test(raw))
    return "Rate limit reached on Gemini's free tier. Wait ~30 seconds and try again."
  if (/NoObjectGenerated|schema|invalid.json|could not parse|validation/i.test(raw))
    return "The AI couldn't structure a response from that. Try simplifying your input or clearing one of the fields."
  if (/timeout|deadline|ECONNRESET|ETIMEDOUT/i.test(raw)) return "The AI request timed out. Try again in a moment."
  if (/401|403|unauthorized|forbidden|api.?key/i.test(raw))
    return "Gemini rejected the API key. Check GOOGLE_GENERATIVE_AI_API_KEY in .env.local."
  return fallback
}
