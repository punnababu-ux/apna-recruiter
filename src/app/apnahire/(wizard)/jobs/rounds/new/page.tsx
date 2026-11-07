import { redirect } from "next/navigation"

/** The OnlyRounds interview wizard is reference only. Job posting is
 *  /apnahire/jobs/new. The rounds editor stays in the repo for the AI
 *  interview product (Punna, 2026-11-07). */
export default function InterviewRoundsWizardPage() {
  redirect("/apnahire/jobs/new")
}
