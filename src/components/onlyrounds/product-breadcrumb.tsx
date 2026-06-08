"use client"

/**
 * ProductBreadcrumb — derives the top-bar crumbs from the current URL.
 *
 * Shapes:
 *   List page:    <Section> › <Tab>     e.g. "Jobs › Active"
 *   Detail page:  <Section> › <Item>    e.g. "Jobs › Product Designer"
 *                 (Section becomes a link back to the list.)
 *
 * Only Jobs has tab routing today; other product surfaces (Clients,
 * History, Credits) just show the section name on the list page. Tabs
 * are *only* surfaced as the trailing crumb on the list route — on a
 * detail route they're irrelevant filters and would be misleading.
 */

import Link from "next/link"
import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const SECTION_LABELS: Record<string, string> = {
  jobs: "Jobs",
  clients: "Clients",
  history: "History",
  credits: "Credits",
  settings: "Settings",
  help: "Help",
}

const TAB_LABELS: Record<string, string> = {
  all: "All",
  active: "Active",
  published: "Published",
  inactive: "Inactive",
  draft: "Draft",
}

const SECTIONS_WITH_TABS = new Set(["jobs"])

/** Convert a URL slug to a human-readable label: "manual-tester" → "Manual Tester". */
function humanize(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function Crumbs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Expected shape: /onlyrounds/<section>[/<itemId>]
  const segments = pathname.split("/").filter(Boolean)
  const sectionKey = segments[1] ?? ""
  const itemSlug = segments[2] ?? null
  const section = SECTION_LABELS[sectionKey] ?? "OnlyRound"
  const sectionHref = `/onlyrounds/${sectionKey}`

  // Detail route → item name as trailing crumb; tabs are not relevant here.
  if (itemSlug) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={sectionHref} />}>
              {section}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{humanize(itemSlug)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // List route → existing tab-as-trailing logic.
  const tab = SECTIONS_WITH_TABS.has(sectionKey)
    ? searchParams.get("tab") ?? "active"
    : null
  const tabLabel = tab ? TAB_LABELS[tab] ?? TAB_LABELS.all : null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <span className="text-foreground">{section}</span>
        </BreadcrumbItem>
        {tabLabel ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tabLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function ProductBreadcrumb() {
  return (
    <Suspense fallback={null}>
      <Crumbs />
    </Suspense>
  )
}
