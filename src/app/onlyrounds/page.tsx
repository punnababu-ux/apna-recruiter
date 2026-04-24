import { redirect } from "next/navigation"

/**
 * /onlyrounds — landing. Sends visitors straight to the Jobs list, which
 * is the product's home surface. The design-system showcase moved to
 * `/onlyrounds/tokens`.
 */
export default function OnlyRoundsRootPage() {
  redirect("/onlyrounds/jobs")
}
