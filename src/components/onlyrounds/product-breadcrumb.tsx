"use client"

/**
 * ProductBreadcrumb — derives the top-bar crumbs from the current URL.
 *
 * Shape: <Section> › <Tab>  (e.g. "Jobs › Active")
 *
 * Jobs is a primary route — there is no higher node to navigate to — so
 * the first crumb is the section itself and the trailing crumb reflects
 * the current tab (via `?tab=`, defaulting to "All"). Other product
 * surfaces (Clients, History, Credits) just show the section name.
 */

import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
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

function Crumbs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const segments = pathname.split("/").filter(Boolean)
  const sectionKey = segments[1] ?? ""
  const section = SECTION_LABELS[sectionKey] ?? "OnlyRound"

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
