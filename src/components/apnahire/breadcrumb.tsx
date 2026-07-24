"use client"

/**
 * ApnaHireBreadcrumb — derives the top-bar crumbs from the current URL.
 *
 * Shapes:
 *   Top-level page:  <Section>               e.g. "Jobs"
 *   Sub-item page:   <Section> › <Sub-item>  e.g. "Database › Search Candidates"
 */

import Link from "next/link"
import { Suspense } from "react"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@apna/design-system"

/** Map first URL segment (after /apnahire/) → section display label + href */
const SECTIONS: Record<string, { label: string; href: string }> = {
  dashboard:      { label: "Dashboard",      href: "/apnahire/dashboard" },
  jobs:           { label: "Jobs",           href: "/apnahire/jobs" },
  database:       { label: "Database",       href: "/apnahire/database/search-candidates" },
  "invite-centre":{ label: "Invite Centre",  href: "/apnahire/invite-centre/database-wa-invites" },
  reports:        { label: "Reports",        href: "/apnahire/reports" },
  "campus-ai":    { label: "Campus AI",      href: "/apnahire/campus-ai" },
  credits:        { label: "Credits & Usage",href: "/apnahire/credits" },
  settings:       { label: "Settings",       href: "/apnahire/settings" },
  support:        { label: "Support",        href: "/apnahire/support" },
  "sidebar-specs":{ label: "Sidebar Specs",  href: "/apnahire/sidebar-specs" },
}

/** Map second URL segment → sub-item label */
const SUB_LABELS: Record<string, string> = {
  "search-candidates":    "Search Candidates",
  "saved-searches":       "Saved Searches",
  "unlocked-candidates":  "Unlocked Candidates",
  "database-wa-invites":  "Database WA Invites",
  "job-wa-connects":      "Job WA Connects",
}

function humanize(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function Crumbs() {
  const pathname = usePathname()
  // /apnahire/<sectionKey>[/<subKey>]
  const segments = pathname.split("/").filter(Boolean)
  const sectionKey = segments[1] ?? ""
  const subKey     = segments[2] ?? null

  const section = SECTIONS[sectionKey]
  const sectionLabel = section?.label ?? humanize(sectionKey)

  if (subKey) {
    const subLabel = SUB_LABELS[subKey] ?? humanize(subKey)
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={section?.href ?? `/apnahire/${sectionKey}`} />}>
              {sectionLabel}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{subLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <span className="text-foreground">{sectionLabel}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function ApnaHireBreadcrumb() {
  return (
    <Suspense fallback={null}>
      <Crumbs />
    </Suspense>
  )
}
