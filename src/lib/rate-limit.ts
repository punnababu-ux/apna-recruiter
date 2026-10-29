/** Calls one address may make to the AI routes per minute. */
export const MAX_CALLS_PER_MINUTE = 20

// shortcut: counts live per server instance, so a busy deployment allows
// more than the cap; move to Vercel's firewall rate limit if abuse shows up.
const calls = new Map<string, number[]>()

/** True while `ip` is under the cap; records this call. */
export function underRateLimit(ip: string, now = Date.now()) {
  // Keep memory bounded when many addresses call once and never return.
  if (calls.size > 10_000) calls.clear()
  const recent = (calls.get(ip) ?? []).filter((t) => now - t < 60_000)
  if (recent.length >= MAX_CALLS_PER_MINUTE) {
    calls.set(ip, recent)
    return false
  }
  recent.push(now)
  calls.set(ip, recent)
  return true
}
