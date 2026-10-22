/**
 * Post intent — "post a job with AI calling", carried from a link to the
 * order summary.
 *
 * The homepage's AI Calling Agent card opens job posting with
 * `?addon=ai-calling` (through login). PostJobFlow remembers it here for
 * the browser session; the plan step reads it and opens the order summary
 * with the AI calling agent already added (still removable). Cleared when
 * the job goes live, with the draft.
 */

const KEY = "apnahire:post-with-ai-calling"

/** The query value that asks for the AI calling agent on the job. */
export const AI_CALLING_ADDON_PARAM = "ai-calling"

/** Remember the intent when the URL asks for it (`?addon=ai-calling`). */
export function rememberPostIntent(search: string) {
  if (new URLSearchParams(search).get("addon") !== AI_CALLING_ADDON_PARAM) return
  try {
    window.sessionStorage.setItem(KEY, "1")
  } catch {
    // Storage blocked: the summary just opens without the add-on.
  }
}

export function wantsAiCalling(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === "1"
  } catch {
    return false
  }
}

export function clearPostIntent() {
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    // Storage blocked: nothing to clear.
  }
}
