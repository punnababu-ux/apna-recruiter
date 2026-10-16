"use client"

/**
 * SiteSearch — the marketing header's search (prototype: apnatime.lovable.app).
 *
 * Searches what the site can actually take you to: every menu link, grouped
 * by its menu ("Product", "Resources", …), plus the press pull-quotes
 * ("Press"). Picking a result follows its link; outbound ones open apna.co
 * etc. in the same way the menu does. No server index — the content
 * modules are the index, so a new menu item is searchable the moment it is
 * added.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { HOME_PRESS } from "@/content/home"
import { MAIN_NAV } from "@/content/nav"

interface SearchResult {
  id: string
  label: string
  /** Where it sits — the menu section, or the outlet for press. */
  hint: string
  href: string
  external?: boolean
}

interface SearchGroup {
  label: string
  items: SearchResult[]
}

const SEARCH_GROUPS: SearchGroup[] = [
  ...MAIN_NAV.flatMap((group): SearchGroup[] => {
    if (!group.sections) {
      return [{ label: group.label, items: [{ id: group.href!, label: group.label, hint: "Page", href: group.href! }] }]
    }
    const items = group.sections.flatMap((section) =>
      section.items.map((link) => ({
        id: `${group.label}:${section.heading}:${link.label}`,
        label: link.label,
        hint: section.heading,
        href: link.href,
        external: link.external,
      }))
    )
    return [{ label: group.label, items }]
  }),
  {
    label: "Press",
    items: HOME_PRESS.items.map((item) => ({
      id: `press:${item.outlet}`,
      label: item.headline,
      hint: item.outlet,
      href: item.href,
      external: true,
    })),
  },
]

export function SiteSearch({
  className,
  onNavigate,
  autoFocus,
  variant = "default",
}: {
  className?: string
  /** Called after a result is picked — the mobile menu closes itself. */
  onNavigate?: () => void
  /** Focus the field on mount (the header's search icon opens it). */
  autoFocus?: boolean
  /** "spotlight": the header's full-width search — a large borderless
   *  field (the pill is its frame) with results the full pill wide. */
  variant?: "default" | "spotlight"
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const spotlight = variant === "spotlight"

  const go = (result: SearchResult) => {
    setQuery("")
    onNavigate?.()
    if (result.external) window.open(result.href, "_blank", "noopener,noreferrer")
    else router.push(result.href)
  }

  return (
    <Autocomplete
      items={SEARCH_GROUPS}
      value={query}
      onValueChange={setQuery}
      itemToStringValue={(item: SearchResult) => `${item.label} ${item.hint}`}
    >
      <AutocompleteInput
        aria-label="Search the site"
        placeholder={spotlight ? "Search apna" : "Search"}
        autoFocus={autoFocus}
        inputSize={spotlight ? "lg" : "sm"}
        containerClassName={cn(spotlight && "[&>svg]:left-4 [&>svg]:size-5", className)}
        className={
          spotlight
            ? "rounded-full border-transparent bg-transparent pl-12 text-lg focus-visible:border-transparent focus-visible:ring-0 md:text-lg"
            : "rounded-full border-transparent bg-muted"
        }
      />
      {/* Spotlight: the list drops just under the pill, as wide as the field. */}
      <AutocompleteContent className={spotlight ? "max-h-96 p-2" : "w-80"} sideOffset={spotlight ? 14 : 6}>
        <AutocompleteEmpty>No results for &ldquo;{query}&rdquo;</AutocompleteEmpty>
        <AutocompleteList>
          {(group: SearchGroup) => (
            <AutocompleteGroup key={group.label} items={group.items}>
              <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
              <AutocompleteCollection>
                {(result: SearchResult) => (
                  <AutocompleteItem key={result.id} value={result} onClick={() => go(result)}>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className={cn("text-foreground", group.label === "Press" ? "line-clamp-2" : "truncate")}>
                        {result.label}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">{result.hint}</span>
                    </span>
                    {result.external && <ArrowUpRight className="text-muted-foreground" aria-hidden />}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}
