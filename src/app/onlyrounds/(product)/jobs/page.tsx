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

import { Plus, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"

import { JobsTable, type JobRow, type JobStatus } from "@/components/onlyrounds/jobs-table"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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

  const clients = useMemo(
    () => Array.from(new Set(MOCK.map((j) => j.client))).sort(),
    [],
  )
  const locations = useMemo(
    () => Array.from(new Set(MOCK.map((j) => j.location))).sort(),
    [],
  )

  const filtered = MOCK.filter((j) => {
    if (tab !== "all" && j.status !== tab) return false
    if (clientFilters.length > 0 && !clientFilters.includes(j.client)) return false
    if (locationFilters.length > 0 && !locationFilters.includes(j.location))
      return false
    return true
  })

  const activeFilterCount = clientFilters.length + locationFilters.length

  const clearAll = () => {
    setClientFilters([])
    setLocationFilters([])
  }

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col">
      <PageHeader
        className="mt-2 border-0 bg-transparent"
        tabs={
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as JobTab)}
          >
            <TabsList className="bg-card">
              {TABS.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="leading-none"
                >
                  <span>
                    {t.label}{" "}
                    <span className="text-muted-foreground">({t.count})</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
        actions={
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/onlyrounds/jobs/new" />}
          >
            <Plus className="size-4" />
            Create New Job
          </Button>
        }
      />

      <div className="flex items-center gap-3 px-6 pt-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="bg-card pl-9"
          />
        </div>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline">
                <SlidersHorizontal className="size-3.5" />
                Filters
                {activeFilterCount > 0 ? (
                  <Badge className="ml-1 h-5 min-w-5 bg-success px-1.5 text-white [a]:hover:bg-success/90">
                    {activeFilterCount}
                  </Badge>
                ) : null}
              </Button>
            }
          />
          <PopoverContent align="end" className="w-64 p-0">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-sm font-medium">Filters</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                disabled={activeFilterCount === 0}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </div>
            <FilterSection
              label="Client"
              options={clients}
              selected={clientFilters}
              onToggle={(v) => setClientFilters((prev) => toggle(prev, v))}
            />
            <div className="border-t border-border" />
            <FilterSection
              label="Location"
              options={locations}
              selected={locationFilters}
              onToggle={(v) => setLocationFilters((prev) => toggle(prev, v))}
            />
          </PopoverContent>
        </Popover>
      </div>

      <main className="flex-1 px-6 py-4">
        <JobsTable rows={filtered} />
      </main>
    </div>
  )
}

function FilterSection({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-col gap-1">
        {options.map((opt) => {
          const id = `filter-${label}-${opt}`.replace(/\s+/g, "-").toLowerCase()
          const checked = selected.includes(opt)
          return (
            <label
              key={opt}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-muted"
            >
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={() => onToggle(opt)}
              />
              <span className="truncate">{opt}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
