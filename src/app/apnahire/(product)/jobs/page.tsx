"use client"

/**
 * /apnahire/jobs — Jobs list surface.
 */

import { Plus, Briefcase, Users, CalendarCheck, TrendingUp } from "@apna/design-system"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"

import { MetricCard, SearchFilterBar, Button, Tabs, TabsList, TabsTrigger } from "@apna/design-system"
import { JobsTable, type JobRow, type JobStatus } from "@/components/onlyrounds/jobs-table"
import { PageHeader } from "@/components/onlyrounds/page-header"

const MOCK: JobRow[] = [
  {
    id: "product-designer",
    title: "Senior Product Designer",
    status: "active",
    client: "Flipkart",
    clientLogo: "https://www.google.com/s2/favicons?domain=flipkart.com&sz=128",
    location: "Bengaluru, IN",
    createdAt: "21 Apr 2026",
    owner: "Mitushi Agarwal",
    screening: 24,
    interview: 6,
    shortlisted: 2,
  },
  {
    id: "manual-tester-profile",
    title: "Lead QA Automation Engineer",
    status: "active",
    client: "Swiggy",
    clientLogo: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
    location: "Hyderabad, IN",
    createdAt: "17 Apr 2026",
    owner: "Mitushi Agarwal",
    screening: 12,
    interview: 3,
    shortlisted: 1,
  },
  {
    id: "manual-tester-ravi-english",
    title: "Frontend React Architect",
    status: "published",
    client: "Amazon",
    clientLogo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
    location: "Bengaluru, IN",
    createdAt: "17 Apr 2026",
    owner: "Ravi Kumar",
    screening: 58,
    interview: 14,
    shortlisted: 4,
  },
  {
    id: "full-stack-developer",
    title: "Senior Full Stack Engineer (Node + Next.js)",
    status: "draft",
    client: "Zomato",
    clientLogo: "https://www.google.com/s2/favicons?domain=zomato.com&sz=128",
    location: "Remote",
    createdAt: "12 Apr 2026",
    owner: "Priya Shah",
    screening: 0,
    interview: 0,
    shortlisted: 0,
  },
  {
    id: "mobile-dev-lead",
    title: "iOS Lead Engineer (SwiftUI)",
    status: "active",
    client: "Razorpay",
    clientLogo: "https://www.google.com/s2/favicons?domain=razorpay.com&sz=128",
    location: "Bengaluru, IN",
    createdAt: "10 Apr 2026",
    owner: "Ravi Kumar",
    screening: 31,
    interview: 8,
    shortlisted: 3,
  },
  {
    id: "devops-specialist",
    title: "Principal Cloud DevOps Lead",
    status: "inactive",
    client: "Uber",
    clientLogo: "https://www.google.com/s2/favicons?domain=uber.com&sz=128",
    location: "Gurugram, IN",
    createdAt: "05 Apr 2026",
    owner: "Priya Shah",
    screening: 18,
    interview: 2,
    shortlisted: 1,
  },
]

type JobTab = JobStatus | "all"

const TABS: { value: JobTab; label: string; count: number }[] = [
  { value: "all",       label: "All Jobs",   count: 266 },
  { value: "active",    label: "Active",     count: 166 },
  { value: "published", label: "Published",  count: 4 },
  { value: "inactive",  label: "Inactive",   count: 2 },
  { value: "draft",     label: "Drafts",     count: 94 },
]

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

  const [clientFilters, setClientFilters] = useState<string[]>([])
  const [locationFilters, setLocationFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const setTab = (next: JobTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clients = useMemo(
    () => Array.from(new Set(MOCK.map((j) => j.client))).sort(),
    [],
  )
  const locations = useMemo(
    () => Array.from(new Set(MOCK.map((j) => j.location))).sort(),
    [],
  )

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const filtered = MOCK.filter((j) => {
    if (tab !== "all" && j.status !== tab) return false
    if (clientFilters.length > 0 && !clientFilters.includes(j.client)) return false
    if (locationFilters.length > 0 && !locationFilters.includes(j.location)) return false
    if (searchQuery.trim() && !j.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      {/* Page Title & Action Bar */}
      <PageHeader
        variant="transparent"
        className="px-0 pt-0"
        title="Jobs Directory"
        description="Manage active job openings, candidate evaluation pipelines, and recruiter assignments."
        tabs={
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as JobTab)}
          >
            <TabsList variant="inverted">
              {TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label} ({t.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
        actions={
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/apnahire/jobs/new" />}
            className="gap-2 cursor-pointer font-semibold shadow-xs"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Create new job</span>
          </Button>
        }
      />

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
        <MetricCard
          label="Active Postings"
          value="166"
          icon={<Briefcase />}
          trend={<span className="flex items-center gap-0.5"><TrendingUp className="size-3" /> +12% this mo</span>}
          trendVariant="success"
        />
        <MetricCard
          label="Candidates Screened"
          value="143"
          icon={<Users />}
          trend="Across active roles"
          trendVariant="neutral"
        />
        <MetricCard
          label="Interviews Today"
          value="23"
          icon={<CalendarCheck />}
          trend="6 pending feedback"
          trendVariant="warning"
        />
        <MetricCard
          label="Offer Conversion"
          value="88%"
          icon={<TrendingUp />}
          trend="High conversion"
          trendVariant="success"
        />
      </div>

      {/* Filter and Search Bar */}
      <SearchFilterBar
        className="px-0 pt-0"
        placeholder="Search by job title or client…"
        value={searchQuery}
        onChange={setSearchQuery}
        filterGroups={[
          {
            label: "Client",
            options: clients,
            selected: clientFilters,
            onToggle: (v) => setClientFilters((prev) => toggle(prev, v)),
          },
          {
            label: "Location",
            options: locations,
            selected: locationFilters,
            onToggle: (v) => setLocationFilters((prev) => toggle(prev, v)),
          },
        ]}
        onClearFilters={() => { setClientFilters([]); setLocationFilters([]) }}
      />

      {/* Main Jobs Table List */}
      <main className="flex-1">
        <JobsTable rows={filtered} />
      </main>
    </div>
  )
}
