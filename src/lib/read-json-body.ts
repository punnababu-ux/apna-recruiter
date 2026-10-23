import { NextResponse } from "next/server"

/** Largest body the AI routes accept. A long JD is ~10 KB; this leaves room. */
export const MAX_BODY_BYTES = 50_000

/**
 * Reads a JSON body for a public AI route. Returns a 413 response when the
 * body is too large (every byte goes to Gemini and is billed), else the parsed
 * body ({} when it isn't valid JSON).
 */
export async function readJsonBody(req: Request) {
  const text = await req.text()
  if (text.length > MAX_BODY_BYTES) {
    return { body: null, tooLarge: NextResponse.json({ error: "Request too large." }, { status: 413 }) }
  }
  try {
    return { body: JSON.parse(text) ?? {}, tooLarge: null }
  } catch {
    return { body: {}, tooLarge: null }
  }
}
