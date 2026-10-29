import { NextResponse } from "next/server"
import { underRateLimit } from "@/lib/rate-limit"

/** Largest body the AI routes accept. A long JD is ~10 KB; this leaves room. */
export const MAX_BODY_BYTES = 50_000

/**
 * Reads a JSON body for a public AI route (every call goes to Gemini and is
 * billed). Returns `reject` — a 429 when the caller is over the rate limit,
 * a 413 when the body is too large — else the parsed body ({} when it isn't
 * valid JSON).
 */
export async function readJsonBody(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  if (!underRateLimit(ip)) {
    return { body: null, reject: NextResponse.json({ error: "Too many requests." }, { status: 429 }) }
  }
  const text = await req.text()
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return { body: null, reject: NextResponse.json({ error: "Request too large." }, { status: 413 }) }
  }
  try {
    return { body: JSON.parse(text) ?? {}, reject: null }
  } catch {
    return { body: {}, reject: null }
  }
}
