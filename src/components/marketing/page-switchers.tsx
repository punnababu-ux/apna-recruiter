"use client"

/**
 * The company-page views that switch or filter: "apna by the numbers"
 * (Overall / For recruiters / For candidates) and the newsroom's press
 * list (2026 / 2025 / Earlier). Both switch with ChipTabs, the system's
 * segmented chip control. Plus the customer story library (industry
 * Select, search Input, numbered pages).
 */

import * as React from "react"
import {
  ArrowUpRight,
  Button,
  Card,
  ChipTabs,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SectionHeading,
  SelectValue,
} from "@apna/design-system"
import { StatGrid } from "@/components/marketing/page-blocks"
import { ABOUT_NUMBERS, CUSTOMER_STORIES } from "@/content/company"
import { PRESS } from "@/content/press"

type GroupKey = (typeof ABOUT_NUMBERS.groups)[number]["key"]

export function NumbersSwitcher() {
  const [key, setKey] = React.useState<GroupKey>("overall")
  const group = ABOUT_NUMBERS.groups.find((g) => g.key === key)!
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <SectionHeading
        level={2}
        align="center"
        title={ABOUT_NUMBERS.sectionTitle}
        // The line follows the tab (Lovable's own per-tab blurb).
        description={group.blurb}
      />
      <ChipTabs
        aria-label="Numbers for"
        items={ABOUT_NUMBERS.groups.map((g) => ({ value: g.key, label: g.label }))}
        value={key}
        onValueChange={setKey}
      />
      <StatGrid stats={group.stats} size="lg" />
    </div>
  )
}

type Filter = (typeof PRESS.filters)[number]

export function PressList() {
  const [filter, setFilter] = React.useState<Filter>("2026")
  const items = PRESS.items.filter((item) =>
    filter === "Earlier" ? !PRESS.filters.includes(item.year as Filter) : item.year === filter
  )
  return (
    <div className="flex w-full flex-col gap-8">
      <ChipTabs
        aria-label="Year"
        className="self-start"
        items={PRESS.filters.map((f) => ({ value: f, label: f, count: PRESS.items.filter((i) => (f === "Earlier" ? !PRESS.filters.includes(i.year as Filter) : i.year === f)).length }))}
        value={filter}
        onValueChange={setFilter}
      />
      <ul className="flex flex-col divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.url + item.title}>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-start gap-4 py-5 sm:items-center sm:gap-8"
            >
              {/* Phones: the date joins the outlet line under the headline. */}
              <span className="hidden w-24 shrink-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums sm:block">
                {item.date}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-base font-semibold text-pretty text-foreground group-hover:text-primary">
                  {item.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.source}
                  <span className="sm:hidden"> · {item.date}</span>
                </span>
              </span>
              <ArrowUpRight
                className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-interactive group-hover:text-primary"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const LIBRARY = CUSTOMER_STORIES.library
const PAGE_SIZE = 9

/** Customer story library: an industry filter and a search over the
 *  companies, nine to a page. */
export function StoryLibrary() {
  const [industry, setIndustry] = React.useState<string>("")
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const matches = LIBRARY.companies.filter(
    (c) => (!industry || c.industry === industry) && c.company.toLowerCase().includes(query.trim().toLowerCase())
  )
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE))
  const shown = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          value={industry || null}
          onValueChange={(v) => {
            setIndustry((v as string | null) ?? "")
            setPage(1)
          }}
        >
          <SelectTrigger aria-label="Industry" className="w-full">
            <SelectValue placeholder={LIBRARY.allIndustries} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>{LIBRARY.allIndustries}</SelectItem>
            {LIBRARY.industries.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="search"
          aria-label={LIBRARY.search}
          placeholder={LIBRARY.search}
          value={query}
          className="text-base md:text-sm"
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
        />
      </div>

      {shown.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <li key={c.company}>
              <Card padding="md" tone="muted" className="h-full gap-1">
                <span className="text-base font-semibold text-foreground">{c.company}</span>
                <span className="text-sm text-muted-foreground">{c.industry}</span>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-muted-foreground">{LIBRARY.empty}</p>
      )}

      {pages > 1 && (
        <nav aria-label="Library pages" className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Button
              key={n}
              size="icon"
              variant={n === page ? "secondary" : "ghost"}
              aria-current={n === page ? "page" : undefined}
              onClick={() => setPage(n)}
            >
              {n}
            </Button>
          ))}
        </nav>
      )}
    </div>
  )
}
