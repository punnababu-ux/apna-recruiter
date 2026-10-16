import { redirect } from "next/navigation"

/**
 * /apnahire/dashboard — the app's home is the Jobs page (sidebar + job
 * cards; `HOME` in lib/apnahire/nav), where login lands. This route only
 * redirects there. (A literal: nav.ts is a client module.)
 */
export default function ApnaHireDashboardPage() {
  redirect("/apnahire/jobs")
}
