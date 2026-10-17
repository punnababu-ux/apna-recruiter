"use client"

/**
 * MobileChipRow — the phone chip row (< md): SegmentedTabSwitcher's mobile
 * layout in its `checkout` appearance, the plans hero's own look (grey
 * track, ringed white pill, green label), so it holds on white and grey
 * surfaces alike. One component so the jobs page and every section's
 * sub-page chips look the same.
 *
 *   MobileChipRow  controlled: `value` / `onValueChange` (the jobs tabs)
 *   SectionChips   links: a section's sub-pages, active by the current route
 *                  (Database, Invite centre — the bottom bar opens the
 *                  section, these chips move between its pages)
 *
 * The row bleeds to the screen edge and re-adds the gutter inside; the
 * defaults mirror a `px-4 sm:px-6` page gutter.
 */

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { SegmentedTabSwitcher, type SegmentedTabItem } from "@apna/design-system"
import { cn } from "@/lib/utils"

export function MobileChipRow<V extends string>({
  items,
  value,
  onValueChange,
  className,
  gutter = "page",
}: {
  items: SegmentedTabItem<V>[]
  value: V
  onValueChange: (value: V) => void
  className?: string
  /** The container's horizontal padding the row bleeds through:
   *  "page" px-4 sm:px-6 · "panel" px-5 (SheetPanel / card sections) ·
   *  "page-start" bleeds to the left edge only (a px-4 container) and
   *  stops at its right, e.g. beside a fixed ⋮ menu at the row's end. */
  gutter?: "page" | "panel" | "page-start"
}) {
  return (
    <SegmentedTabSwitcher
      className={cn("md:hidden", className)}
      items={items}
      value={value}
      onValueChange={onValueChange}
      appearance="checkout"
      // In the app the page itself is the plan-card plum on dark, so the
      // selected pill lifts one step (a light layer) to show, and its label
      // takes the CTA green like the plans page tabs.
      mobileActiveItemClassName="dark:bg-foreground/10"
      mobileActiveClassName="text-checkout-primary dark:text-cta-primary"
      mobileBleedClassName={gutter === "page-start" ? "-ml-4" : gutter === "panel" ? "-mx-5" : "-mx-4 sm:-mx-6"}
      mobileGutterClassName={gutter === "page-start" ? "pr-2 pl-4" : gutter === "panel" ? "px-5" : "px-4 sm:px-6"}
    />
  )
}

/** A section's sub-pages as phone chips, in a `px-4 sm:px-6` band at the
 *  top of the section. Hidden from md, where the sidebar lists them. */
export function SectionChips({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const active = items.find((item) => pathname.startsWith(item.href))?.href ?? items[0].href
  return (
    <div className="px-4 pt-4 sm:px-6 md:hidden">
      <MobileChipRow
        items={items.map((item) => ({ value: item.href, label: item.label }))}
        value={active}
        // replace, not push: switching chips isn't a step to go back
        // through — Back leaves the section.
        onValueChange={(href) => router.replace(href)}
      />
    </div>
  )
}
