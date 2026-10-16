"use client"

/**
 * /apnahire/jobs — "Jobs": the recruiter's job list. Search and filters
 * first (they cover every state), then tabs by apna hire's four job states
 * (under review, active, draft, expired) with counts of what the search
 * matched, then the cards (JobList).
 *
 * Filters: Location and Posted by. Job state isn't a filter, the tabs are.
 */

import { Fab, Plus } from "@apna/design-system"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"

import {
  SearchFilterBar,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@apna/design-system"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { JobList, STATUS_LABELS, type ApnaJob, type ApnaJobStatus } from "@/components/apnahire/jobs/job-list"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { COMPANY_NAME } from "@/lib/apnahire/job-draft"

/** Sample jobs — one per state and per banner, so every case shows. */
const MOCK: ApnaJob[] = [
  {
    id: "field-sales-pune-review",
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

type JobTab = ApnaJobStatus | "all"
const TAB_ORDER: JobTab[] = ["all", "active", "under_review", "draft", "expired"]

export default function JobsPage() {
  return (
    <Suspense fallback={null}>
      <JobsPageInner />
    </Suspense>
  )
}

function JobsPageInner() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = (searchParams.get("tab") as JobTab | null) ?? "all"

  const [cityFilters, setCityFilters] = useState<string[]>([])
  const [posterFilters, setPosterFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const setTab = (next: JobTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const cities = useMemo(() => Array.from(new Set(MOCK.map((j) => j.city))).sort(), [])
  const posters = useMemo(() => Array.from(new Set(MOCK.map((j) => j.postedBy))).sort(), [])

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  // Search and filters first; the tabs then split what they matched.
  const matched = MOCK.filter((j) => {
    if (cityFilters.length > 0 && !cityFilters.includes(j.city)) return false
    if (posterFilters.length > 0 && !posterFilters.includes(j.postedBy)) return false
    if (searchQuery.trim() && !j.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })
  const counts = Object.fromEntries(TAB_ORDER.map((t) => [t, 0])) as Record<JobTab, number>
  matched.forEach((j) => {
    counts.all++
    counts[j.status]++
  })
  const filtered = matched.filter((j) => tab === "all" || j.status === tab)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <PageHeader
        variant="transparent"
        // Phones: the top bar carries "Jobs", as it does every section's name.
        className="px-0 pt-0 max-md:hidden"
        title="Jobs"
        actions={
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/apnahire/jobs/new" />}
            // Phones post from the floating button instead.
            className="max-md:hidden"
            leadingIcon={<Plus />}
          >
            Create new job
          </Button>
        }
      />

      {/* Search first — it covers every state — then the tabs, whose
          counts show where the matches are. */}
      <div className="flex flex-col gap-3">
        <SearchFilterBar
          className="px-0 pt-0"
          placeholder="Search by job title…"
          value={searchQuery}
          onChange={setSearchQuery}
          filterGroups={[
            {
              label: "Location",
              options: cities,
              selected: cityFilters,
              onToggle: (v) => setCityFilters((prev) => toggle(prev, v)),
            },
            {
              label: "Posted by",
              options: posters,
              selected: posterFilters,
              onToggle: (v) => setPosterFilters((prev) => toggle(prev, v)),
            },
          ]}
          onClearFilters={() => {
            setCityFilters([])
            setPosterFilters([])
          }}
        />
        {/* Phones: five tabs don't fit across, so they become self-checkout's
            scrolling chip row (MobileChipRow, text only). From md: the tab
            bar. */}
        <MobileChipRow
          items={TAB_ORDER.map((t) => ({
            value: t,
            label: `${t === "all" ? "All" : STATUS_LABELS[t]} (${counts[t]})`,
          }))}
          value={tab}
          onValueChange={setTab}
        />
        <div className="hidden md:block">
          <Tabs value={tab} onValueChange={(v) => setTab(v as JobTab)}>
            <TabsList variant="inverted">
              {TAB_ORDER.map((t) => (
                <TabsTrigger key={t} value={t}>
                  {t === "all" ? "All" : STATUS_LABELS[t]} ({counts[t]})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <main className="flex-1">
        <JobList jobs={filtered} />
        {/* Room for the floating button, so the last card scrolls clear. */}
        <div aria-hidden className="h-20 md:hidden" />
      </main>

      {/* Phones: posting is the Jobs tab's main action, at thumb reach. */}
      <Fab href="/apnahire/jobs/new" icon={Plus} label="Post a job" />
    </div>
  )
}
