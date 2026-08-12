"use client"

/**
 * BottomNav — Fixed mobile bottom navigation bar.
 *
 * Renders a full-width tab bar fixed to the bottom of the viewport.
 * Hidden at the `md` breakpoint (768px+) where the sidebar takes over.
 *
 * API:
 *   items     — Array of nav items (max 5 recommended for thumb reach).
 *               Each item can be a link (pass `href`) or a button (pass `onClick`).
 *   className — Merged onto the root <nav> element.
 *
 * A11y: role="navigation" with aria-label="Main navigation". Active item
 *       gets aria-current="page".
 *
 * Usage:
 *   <BottomNav items={[
 *     { href: "/jobs", label: "Jobs", icon: Briefcase, active: true },
 *     { label: "More", icon: MoreHorizontal, onClick: () => setOpen(true) },
 *   ]} />
 */

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BottomNavItem {
  /** If provided, renders an <a> tag via next/link. */
  href?: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /** Whether this item reflects the current route. */
  active?: boolean
  /** Optional badge node rendered over the icon (e.g. a notification count). */
  badge?: React.ReactNode
  /** Used when `href` is not provided — renders a <button>. */
  onClick?: () => void
}

export interface BottomNavProps {
  items: BottomNavItem[]
  className?: string
}

export function BottomNav({ items, className }: BottomNavProps) {
  return (
    <nav
      data-slot="bottom-nav"
      aria-label="Main navigation"
      className={cn(
        // Fixed bar — hidden on desktop where sidebar is present
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "flex h-16 items-stretch border-t border-border bg-card",
        className
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon

        const inner = (
          <>
            {/* Icon with optional badge */}
            <div className="relative">
              <Icon
                className={cn(
                  "size-5 transition-colors",
                  item.active ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden
              />
              {item.badge && (
                <span className="absolute -top-1 -right-2 flex items-center">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-2xs font-medium leading-none transition-colors",
                item.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
          </>
        )

        const sharedClass =
          "flex flex-1 flex-col items-center justify-center gap-1 py-2 touch-manipulation"

        if (item.href) {
          return (
            <Link
              key={i}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={sharedClass}
            >
              {inner}
            </Link>
          )
        }

        return (
          <button
            key={i}
            type="button"
            onClick={item.onClick}
            className={sharedClass}
            aria-label={item.label}
          >
            {inner}
          </button>
        )
      })}
    </nav>
  )
}
