"use client"

/**
 * The company-page views that switch or filter: the newsroom's press
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
  SelectValue,
} from "@apna/design-system"
import { CompanyMark } from "@/components/marketing/page-blocks"
import { CUSTOMER_STORIES } from "@/content/company"
import { PRESS } from "@/content/press"

type Filter = (typeof PRESS.filters)[number]

export function PressList() {
  const [filter, setFilter] = React.useState<Filter>("2026")
  const inFilter = (year: string, f: Filter) =>
    f === "Earlier" ? !PRESS.filters.includes(year as Filter) : year === f
  const items = PRESS.items.filter((item) => inFilter(item.year, filter))
  const [lead, ...rest] = items

  return (
    <div className="flex w-full flex-col gap-8">
      <ChipTabs
        aria-label="Year"
        className="self-center"
        items={PRESS.filters.map((f) => ({
          value: f,
          label: f,
          count: PRESS.items.filter((i) => inFilter(i.year, f)).length,
        }))}
        value={filter}
        onValueChange={setFilter}
      />

      {/* The year's most recent story, large. */}
      {lead && (
        <a href={lead.url} target="_blank" rel="noreferrer noopener" className="group">
          <Card
            padding="lg"
            interactive
            className="gap-4 border-card/60 bg-card/80 shadow-card backdrop-blur-xl sm:p-10"
          >
            <span className="text-overline text-muted-foreground tabular-nums">
              {lead.source} · {lead.date}
            </span>
            <h3 className="max-w-3xl text-h3 text-balance text-foreground sm:text-h2">{lead.title}</h3>
            <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
              Read the story
              <ArrowUpRight className="size-4 transition-interactive group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Card>
        </a>
      )}

      {/* The rest of the year: one card of rows. */}
      {rest.length > 0 && (
        <Card padding="none" className="border-card/60 bg-card/80 shadow-card backdrop-blur-xl">
          <ul className="flex flex-col divide-y divide-border">
            {rest.map((item) => (
              <li key={item.url + item.title}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group ink relative flex items-start gap-4 px-5 py-5 transition-interactive hover:bg-muted sm:items-center sm:gap-8 sm:px-8"
                >
                  {/* Phones: the date joins the outlet line under the headline. */}
                  <span className="hidden w-24 shrink-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums sm:block">
                    {item.date}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-base font-semibold text-pretty text-foreground">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.source}
                      <span className="sm:hidden"> · {item.date}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
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
              <Card padding="md" className="h-full gap-3 border-card/60 bg-card/80 backdrop-blur-xl">
                <CompanyMark company={c.company} />
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
