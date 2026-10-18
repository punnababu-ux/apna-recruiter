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
 * BottomNavMenu — the "More" card. A card of icon tiles that rises from
 * just above the bar (the bar stays visible and tappable, its More tab
 * becomes an ✕), over a dimmed page. Flat destinations only: a section with
 * sub-pages belongs in the bar, with its sub-pages as chips on the page.
 * Tap outside or Escape closes it; picking a tile closes it too.
 *
 *   <BottomNavMenu open={open} onOpenChange={setOpen} items={[
 *     { href: "/campus-ai", label: "Campus AI", icon: Trophy, dot: true },
 *   ]} />
 *
 * Usage:
 *   <BottomNav items={[
 *     { href: "/jobs", label: "Jobs", icon: Briefcase, active: true },
 *     { label: "More", icon: MoreHorizontal, onClick: () => setOpen(true) },
 *   ]} />
 *
 * `featured` raises one item (the middle one) into a tile above the bar —
 * a promoted destination, not a tab (First Club's "Finds").
 */

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Coin } from "@/components/ui/coin"
import { Badge } from "@/components/ui/badge"

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
  /** The bar's one promoted destination (e.g. Plans): a raised tile in
   *  the gold-on-plum offer colours, rising above the bar, instead of a
   *  tab. Put it in the middle slot; use it for at most one item. */
  featured?: boolean
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
        "fixed bottom-0 left-0 right-0 z-modal md:hidden",
        "box-content flex h-16 items-stretch border-t border-border bg-card pb-safe",
        className
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon

        const inner = (
          <>
            {/* Icon with optional badge */}
            <div
              className={cn(
                "relative flex h-7 w-14 items-center justify-center rounded-full transition-select",
                item.active && "bg-accent"
              )}
            >
              {/* The badge is anchored to the icon, not the 56px pill, so a
                  dot or count sits on the icon's top-right corner. */}
              <span className="relative flex">
                <Icon
                  className={cn(
                    "size-5 transition-interactive",
                    item.active ? "text-primary dark:text-cta-primary" : "text-muted-foreground"
                  )}
                  aria-hidden
                />
                {item.badge && (
                  <span className="absolute -top-1.5 left-3 flex items-center">
                    {item.badge}
                  </span>
                )}
              </span>
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-2xs leading-none transition-interactive",
                item.active ? "font-semibold text-primary dark:text-cta-primary" : "font-medium text-muted-foreground"
              )}
            >
              {item.label}
            </span>
          </>
        )

        const sharedClass =
          "ink relative flex flex-1 flex-col items-center justify-center gap-1 py-2 touch-manipulation"

        if (item.featured && item.href) {
          // Raised above the bar (-mt-5), ringed in the bar's colour so it
          // reads as lifted off it; the coin carries the icon.
          return (
            <Link
              key={i}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className="relative flex flex-1 flex-col items-center justify-start touch-manipulation outline-none"
            >
              <span className="ink press relative -mt-5 flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-offer-premium text-surface-inverted-fg shadow-elevated ring-4 ring-card transition-interactive">
                <Coin icon={Icon} size="lg" />
                <span className="text-xs leading-none font-semibold">{item.label}</span>
              </span>
            </Link>
          )
        }

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

export interface BottomNavMenuItem {
  href: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  active?: boolean
  /** A small red dot on the tile: something new in there. */
  dot?: boolean
}

export interface BottomNavMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: BottomNavMenuItem[]
  /** Accessible name of the card. */
  label?: string
  /** The bar has a `featured` (raised) item: sit high enough to clear it. */
  clearFeatured?: boolean
  /** Above the tiles, full width — e.g. the account alert the desktop shows
   *  in its sidebar, read first when the card opens. */
  header?: React.ReactNode
}

export function BottomNavMenu({ open, onOpenChange, items, label = "More", clearFeatured, header }: BottomNavMenuProps) {
  const firstRef = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    if (!open) return
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <>
      {/* Under the bar (z-overlay < the bar's z-modal), so the bar stays
          tappable; the same dim + blur as SheetOverlay. */}
      <div
        aria-hidden
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 z-overlay bg-scrim animate-in fade-in duration-150 supports-backdrop-filter:backdrop-blur-xs md:hidden"
      />
      {/* pb-safe-16: the bar's 64px plus the home-indicator inset, so the
          card sits just above the bar on every phone. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-overlay pb-safe-16 md:hidden">
        <div
          role="dialog"
          aria-label={label}
          data-slot="bottom-nav-menu"
          className={cn(
            "pointer-events-auto mx-2 grid grid-cols-4 gap-x-2 gap-y-5 rounded-2xl bg-card px-3 py-5 shadow-elevated animate-in fade-in slide-in-from-bottom-4 duration-200",
            // 8px above the bar; 28px above a raised item's 20px rise.
            clearFeatured ? "mb-7" : "mb-2"
          )}
        >
          {header && <div className="col-span-4">{header}</div>}
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                ref={i === 0 ? firstRef : undefined}
                href={item.href}
                onClick={() => onOpenChange(false)}
                aria-current={item.active ? "page" : undefined}
                className="ink press-subtle relative flex flex-col items-center gap-2 rounded-xl py-1 text-center outline-none transition-interactive focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {/* Neutral tiles; only the current page's tile takes the
                    green accent — the same pairing as the bar's active tab. */}
                <span
                  className={cn(
                    "relative flex size-12 items-center justify-center rounded-full",
                    item.active ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.dot && (
                    <Badge variant="count" size="dot" className="absolute top-0.5 right-0.5 ring-2 ring-card" />
                  )}
                </span>
                <span className="text-xs leading-tight font-medium text-foreground">
                  {item.label}
                  {item.dot && <span className="sr-only">, new</span>}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
