"use client"

/**
 * /onlyrounds/jobs — Jobs list surface.
 *
 * Composition:
 *   InfoBanner (top)
 *   PageHeader with tabs (All / Active / Published / Inactive / Draft)
 *     + action cluster: "+ Add Candidates" (outline) · "Share Job ▾" (split primary)
 *   JobsTable with mock rows
 *
 * Tabs drive an in-page status filter; URL wiring TBD.
 */

import { Plus } from "@apna/design-system"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"

import { JobsTable, type JobRow, type JobStatus } from "@/components/onlyrounds/jobs-table"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { Button } from "@/components/ui/button"
import { SearchFilterBar } from "@apna/design-system"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MOCK: JobRow[] = [
  {
    id: "product-designer",
    title: "Product Designer",
    status: "active",
    client: "Flipkart",
    clientLogo: "https://www.google.com/s2/favicons?domain=flipkart.com&sz=128",
    location: "Bengaluru, IN",
    createdAt: "21 Apr 2026",
    owner: "Mitushi Agarwal",
    screening: 24,
    interview: 6,
    shortlisted: 0,
  },
  {
    id: "manual-tester-profile",
    title: "Manual Tester",
    status: "active",
    client: "Swiggy",
    clientLogo: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
    location: "Hyderabad, IN",
    createdAt: "17 Apr 2026",
    owner: "Mitushi Agarwal",
    screening: 12,
    interview: 3,
    shortlisted: 0,
  },
  {
    id: "manual-tester-ravi-english",
    title: "QA Engineer",
    status: "published",
    client: "Amazon",
    clientLogo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
    location: "Hubli, IN",
    createdAt: "17 Apr 2026",
    owner: "Ravi Kumar",
    screening: 58,
    interview: 14,
    shortlisted: 1,
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
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
]

type JobTab = JobStatus | "all"

const TABS: { value: JobTab; label: string; count: number }[] = [
  { value: "all",       label: "All",       count: 266 },
  { value: "active",    label: "Active",    count: 166 },
  { value: "published", label: "Published", count: 4 },
  { value: "inactive",  label: "Inactive",  count: 2 },
  { value: "draft",     label: "Draft",     count: 94 },
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
  const tab = (searchParams.get("tab") as JobTab | null) ?? "active"

  const [clientFilters, setClientFilters] = useState<string[]>([])
  const [locationFilters, setLocationFilters] = useState<string[]>([])

  const setTab = (next: JobTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [searchQuery, setSearchQuery] = useState("")

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
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      <PageHeader
        variant="transparent"
        className="px-6 pt-4"
        title="Jobs"
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
            render={<Link href="/onlyrounds/jobs/new" />}
          >
            <Plus className="size-4" />
            Create new job
          </Button>
        }
      />

      <SearchFilterBar
        className="px-6 pt-3"
        placeholder="Search jobs…"
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

      <main className="flex-1 px-6 py-4">
        <JobsTable rows={filtered} />
      </main>
    </div>
  )
}

