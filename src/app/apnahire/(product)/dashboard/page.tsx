import { redirect } from "next/navigation"

/**
 * /apnahire/dashboard — redirects to the default active section.
 * "Search Candidates" is the default active item per the wireframe.
 */
export default function ApnaHireDashboardPage() {
  redirect("/apnahire/database/search-candidates")
}
