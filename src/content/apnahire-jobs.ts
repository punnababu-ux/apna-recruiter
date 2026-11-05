/**
 * Sample apna hire jobs: one per state and per banner, so every case shows.
 * Read by the jobs list and the job details page (`jobById`).
 */

import type { ApnaJob } from "@/components/apnahire/jobs/job-list"
import { COMPANY_NAME } from "@/lib/apnahire/job-draft"

/** Sample jobs — one per state and per banner, so every case shows. */
export const MOCK_JOBS: ApnaJob[] = [
  {
    id: "field-sales-pune-review",
    salary: "₹18,000 – ₹25,000", education: "12th pass", experience: "1–3 years", plan: "Classic", endsOn: "29 Oct 2026",
    title: "Field Sales Executive",
    status: "under_review",
    company: COMPANY_NAME,
    area: "Salunkhe Vihar",
    city: "Pune",
    postedAt: "14 Oct 2026",
    postedBy: "Alok Singh",
    applied: 0,
    activeLeads: 0,
    dbMatches: 82312,
  },
  {
    id: "telecaller-koramangala",
    salary: "₹15,000 – ₹22,000", education: "12th pass", experience: "Freshers", plan: "Premium", endsOn: "27 Oct 2026",
    title: "Telecaller",
    status: "active",
    company: COMPANY_NAME,
    area: "Koramangala",
    city: "Bengaluru",
    postedAt: "12 Oct 2026",
    postedBy: "Alok Singh",
    applied: 0,
    activeLeads: 5,
    activeLeadsNew: 4,
    dbMatches: 4325,
  },
  {
    id: "delivery-andheri",
    salary: "₹20,000 – ₹28,000", education: "10th pass", experience: "Any", plan: "Classic", endsOn: "23 Oct 2026",
    title: "Delivery Executive",
    status: "active",
    company: COMPANY_NAME,
    area: "Andheri East",
    city: "Mumbai",
    postedAt: "8 Oct 2026",
    postedBy: "Priya Shah",
    applied: 6,
    activeLeads: 15,
    dbMatches: 72312,
    nudge: "active-leads",
  },
  {
    id: "back-office-pune",
    salary: "₹16,000 – ₹20,000", education: "Graduate", experience: "Freshers", plan: "Premium", endsOn: "17 Oct 2026",
    title: "Back Office Executive",
    status: "active",
    company: COMPANY_NAME,
    area: "Hinjewadi",
    city: "Pune",
    postedAt: "2 Oct 2026",
    postedBy: "Alok Singh",
    applied: 12,
    appliedPending: 5,
    activeLeads: 8,
    dbMatches: 82312,
    nudge: "improve-reach",
  },
  {
    id: "customer-support-draft",
    salary: "₹18,000 – ₹24,000", education: "12th pass", experience: "Freshers",
    title: "Customer Support Executive",
    status: "draft",
    company: COMPANY_NAME,
    area: "HSR Layout",
    city: "Bengaluru",
    postedAt: "1 Oct 2026",
    postedBy: "Alok Singh",
    applied: 0,
    activeLeads: 0,
    dbMatches: 0,
  },
  {
    id: "field-sales-expired",
    salary: "₹18,000 – ₹25,000", education: "12th pass", experience: "1–3 years", plan: "Premium", endsOn: "14 Sep 2026",
    title: "Field Sales Executive",
    status: "expired",
    company: COMPANY_NAME,
    area: "Salunkhe Vihar",
    city: "Pune",
    postedAt: "30 Aug 2026",
    postedBy: "Alok Singh",
    applied: 12,
    activeLeads: 8,
    dbMatches: 82312,
  },
]

export function jobById(id: string): ApnaJob | undefined {
  return MOCK_JOBS.find((j) => j.id === id)
}
