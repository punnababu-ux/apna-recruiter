"use client"

/**
 * /apnahire/jobs — "All your jobs": the recruiter's job list. Tabs filter by
 * apna hire's four job states (under review, active, draft, expired), then
 * search and filters, then the cards (JobList).
 */

import { CircleCheck, Clock, FileText, History, LayoutList, Plus } from "@apna/design-system"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"

import {
  SearchFilterBar,
  SegmentedTabSwitcher,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@apna/design-system"
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

/** Phone chips carry an icon, as self-checkout's do. */
const TAB_ICONS: Record<JobTab, React.ReactNode> = {
  all: <LayoutList />,
  active: <CircleCheck />,
  under_review: <Clock />,
  draft: <FileText />,
  expired: <History />,
}

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
  const [searchQuery, setSearchQuery] = useState("")

  const setTab = (next: JobTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const cities = useMemo(() => Array.from(new Set(MOCK.map((j) => j.city))).sort(), [])
  const counts = useMemo(() => {
    const c = Object.fromEntries(TAB_ORDER.map((t) => [t, 0])) as Record<JobTab, number>
    MOCK.forEach((j) => {
      c.all++
      c[j.status]++
    })
    return c
  }, [])

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const filtered = MOCK.filter((j) => {
    if (tab !== "all" && j.status !== tab) return false
    if (cityFilters.length > 0 && !cityFilters.includes(j.city)) return false
    if (searchQuery.trim() && !j.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <PageHeader
        variant="transparent"
        className="px-0 pt-0"
        title="All your jobs"
        actions={
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/apnahire/jobs/new" />}
            aria-label="Create new job"
            className="gap-2 cursor-pointer font-semibold shadow-xs"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Create new job</span>
          </Button>
        }
      />

      {/* Tabs, then search — narrow by state first, then by words. */}
      <div className="flex flex-col gap-3">
        {/* Phones: five tabs don't fit across, so they become self-checkout's
            scrolling chip row (SegmentedTabSwitcher's mobile layout, which
            hides itself from md), styled exactly as there: icon chips, grey
            track fill, white active chip with an inset ring and green label
            (the same classes as pricing-hero.tsx). Its bleed mirrors this
            page's p-4 / sm:p-6 gutter. From md: the tab bar. */}
        <SegmentedTabSwitcher
          className="md:hidden"
          items={TAB_ORDER.map((t) => ({
            value: t,
            label: `${t === "all" ? "All" : STATUS_LABELS[t]} (${counts[t]})`,
            icon: TAB_ICONS[t],
          }))}
          value={tab}
          onValueChange={setTab}
          trackClassName="bg-checkout-track"
          activeClassName="text-checkout-primary"
          mobileActiveClassName="text-checkout-primary"
          inactiveClassName="text-checkout-hero-fg-secondary"
          mutedClassName="text-checkout-hero-fg-secondary"
          activeItemClassName="bg-card inset-ring-1 inset-ring-border shadow-none"
          mobileBleedClassName="-mx-4 sm:-mx-6"
          mobileGutterClassName="px-4 sm:px-6"
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

        <SearchFilterBar
          className="px-0 pt-0"
          placeholder="Search by job title…"
          value={searchQuery}
          onChange={setSearchQuery}
          filterGroups={[
            {
              label: "City",
              options: cities,
              selected: cityFilters,
              onToggle: (v) => setCityFilters((prev) => toggle(prev, v)),
            },
          ]}
          onClearFilters={() => setCityFilters([])}
        />
      </div>

      <main className="flex-1">
        <JobList jobs={filtered} />
      </main>
    </div>
  )
}
