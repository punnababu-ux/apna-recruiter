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
import * as React from "react"
import { Suspense, useMemo, useState } from "react"

import {
  SearchFilterBar,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@apna/design-system"
import { ValueArt } from "@/components/marketing/value-art"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { JobList, STATUS_LABELS, type ApnaJobStatus } from "@/components/apnahire/jobs/job-list"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { PlanEndedBanner } from "@/components/apnahire/plan-ended"
import { PriceChangeBanner } from "@/components/apnahire/price-change-banner"
import { OFFER_BAR_TEMPLATES, SubscriberPlanCard, type OfferBarTemplate } from "@/components/apnahire/subscriber-plan-card"
import { useSavedFinishSetup } from "@/components/apnahire/post-job/finish-setup"
import { useJobSlots } from "@/hooks/use-job-slots"
import { MOCK_JOBS as MOCK } from "@/content/apnahire-jobs"
import { useFlushHeader } from "@/hooks/use-flush-header"
import { cn } from "@/lib/utils"

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

  // The plan card: subscribers, or a review link (?bar=) from the design
  // system showcase. A plan that just ended has no slots, so the expired
  // banner shows alone unless that link asks for a bar.
  const slots = useJobSlots()
  const bar = searchParams.get("bar")
  const offerBar = bar && bar in OFFER_BAR_TEMPLATES ? (bar as OfferBarTemplate) : null
  const showPlanCard = !!slots || offerBar !== null

  // Search and filters first; the tabs then split what they matched.
  // Essential flow: the job just posted leads the list, with its Finish setup
  // ingress on the card (a side panel), not a block above the list.
  const setup = useSavedFinishSetup()
  const jobs = useMemo(() => {
    if (!setup?.draft.title) return MOCK
    const d = setup.draft
    return [
      {
        id: d.title!.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: d.title!,
        status: "active" as const,
        company: "",
        area: d.area || d.city || "",
        city: d.city || "",
        postedAt: "Today",
        postedBy: "You",
        applied: 0,
        activeLeads: 0,
        dbMatches: 0,
        finishSetupLeft: setup.left,
      },
      ...MOCK,
    ]
  }, [setup])
  const matched = jobs.filter((j) => {
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

  // Phones: while the search band touches the top bar, they read as one
  // header (no line between them).
  useFlushHeader()

  // Phones: the chip row turns into a white bar only once it is actually
  // stuck under the top bar — not while the search band is still scrolling
  // away, which would show the page's grey gap above a white bar. Stuck =
  // its top has reached the bar's foot (64px, its sticky offset).
  const chipBar = React.useRef<HTMLDivElement>(null)
  const [chipsStuck, setChipsStuck] = React.useState(false)
  React.useEffect(() => {
    const update = () => {
      const el = chipBar.current
      if (el) setChipsStuck(el.getBoundingClientRect().top <= 64.5 && window.scrollY > 0)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const clearFilters = () => {
    setCityFilters([])
    setPosterFilters([])
  }
  // Search and filters combine (a job must match both); neither overrides
  // the other. When nothing matches, say which narrowed it and offer to undo
  // exactly that.
  const filterCount = cityFilters.length + posterFilters.length
  const query = searchQuery.trim()
  const emptyState =
    query || filterCount ? (
      <Empty className="rounded-card border border-dashed border-border bg-card">
        <EmptyHeader>
          <EmptyMedia>
            <ValueArt name="no-results" size="sm" />
          </EmptyMedia>
          <EmptyTitle>No jobs match</EmptyTitle>
          <EmptyDescription>
            {query && <>Nothing for &ldquo;{query}&rdquo;</>}
            {query && filterCount ? " with " : null}
            {filterCount ? `${filterCount} filter${filterCount > 1 ? "s" : ""} applied` : null}
            {tab !== "all" ? ` in ${STATUS_LABELS[tab].toLowerCase()} jobs` : null}.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-3">
          {query && (
            <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          )}
          {filterCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </EmptyContent>
      </Empty>
    ) : undefined

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      {/* The Jan 1, 2027 price change, on top of the page (gone on the
          date). Phones: just under the search band, which is part of the
          header there. */}
      <PriceChangeBanner />
      {/* A plan that just ended (a week): the way back. */}
      <PlanEndedBanner />
      {showPlanCard && <SubscriberPlanCard template={offerBar} />}
      <PageHeader
        variant="transparent"
        // Phones: no page title — the bottom bar already says Jobs.
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
          counts show where the matches are. Phones: first, above the
          price-change banner, so it stays joined to the top bar. */}
      <div className="flex flex-col gap-3 max-md:-order-1">
        {/* Phones: the search sits in a white band joined to the top bar
            (one header: logo row + search). The bar stays pinned; this band
            scrolls away with the list. */}
        <div className="max-md:-mx-4 max-md:-mt-4 max-md:border-b max-md:border-border max-md:bg-card max-md:px-4 max-md:pt-1 max-md:pb-3">
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
          onClearFilters={clearFilters}
          // Phones: a pill field with the Filters pill inside it.
          mobileFilters="inside"
          // On the white band: a grey-filled pill with a white Filters pill.
          fieldTone="filled"
        />
        </div>
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

      {/* Phones: the state chips, sticky under the pinned logo row as the
          list scrolls (self-checkout's chip row). A child of the page column,
          not the search block, so it stays sticky for the whole list. From
          md: the tab bar above. */}
      {/* Full-bleed (-mx-4 px-4). Once scrolled, it's a white bar with a line
          under it, as self-checkout's sticky chips are; at the top it sits
          on the page's grey (chipsStuck). pt-2 / pb-2: the chip scroller adds 4px under
          the chips, so they sit 8px from the top and 12px from the bottom. */}
      <div
        ref={chipBar}
        className={cn(
          "sticky top-16 z-docked -mx-4 -my-2 border-b px-4 pt-2 pb-2 transition-interactive md:hidden",
          chipsStuck ? "border-border bg-card" : "border-transparent bg-muted"
        )}
      >
        <MobileChipRow
          items={TAB_ORDER.map((t) => ({
            value: t,
            label: `${t === "all" ? "All" : STATUS_LABELS[t]} (${counts[t]})`,
          }))}
          value={tab}
          onValueChange={setTab}
        />
      </div>

      <main className="flex-1">
        <JobList jobs={filtered} empty={emptyState} />
        {/* Room for the floating button, so the last card scrolls clear. */}
        <div aria-hidden className="h-20 md:hidden" />
      </main>

      {/* Phones: posting is the Jobs tab's main action, at thumb reach. */}
      <Fab href="/apnahire/jobs/new" icon={Plus} label="Post a job" />

    </div>
  )
}
