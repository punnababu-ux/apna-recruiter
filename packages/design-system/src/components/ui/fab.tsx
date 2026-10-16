"use client"

/**
 * Fab — the extended floating action button for a phone screen's one main
 * action ("+ Post a job" on the jobs list). Phones only (< md); desktop puts
 * the same action in the page header.
 *
 * Sits at the bottom right, 16px above the BottomNav (its 64px plus the
 * home-indicator inset). A 48px labelled green pill at rest (14px label,
 * 20px icon — 56px read too heavy over the cards); while the page
 * scrolls down it shrinks to a round icon so it doesn't sit on the content,
 * and expands again on scroll up or when scrolling stops.
 *
 * One per screen, for that screen's primary action only — not on every tab.
 * Give the screen ~80px of room at its end so the last item can scroll
 * clear of it.
 *
 *   <Fab href="/jobs/new" icon={Plus} label="Post a job" />
 *
 * A11y: the label is the accessible name in both states.
 */

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface FabProps {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  className?: string
}

/** Collapsed while scrolling down; expanded on scroll up and at rest. */
function useScrollCollapse() {
  const [collapsed, setCollapsed] = React.useState(false)
  React.useEffect(() => {
    let last = window.scrollY
    let idle: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      const y = window.scrollY
      if (y > last + 4 && y > 24) setCollapsed(true)
      else if (y < last - 4) setCollapsed(false)
      last = y
      clearTimeout(idle)
      idle = setTimeout(() => setCollapsed(false), 700)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(idle)
    }
  }, [])
  return collapsed
}

export function Fab({ label, icon: Icon, href, onClick, className }: FabProps) {
  const collapsed = useScrollCollapse()
  const classes = cn(
    "ink press pointer-events-auto relative flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground shadow-elevated outline-none transition-interactive hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50",
    collapsed ? "w-12" : "px-4",
    className
  )
  const content = (
    <>
      <Icon className="size-5 shrink-0" />
      {!collapsed && <span className="whitespace-nowrap animate-in fade-in duration-150">{label}</span>}
    </>
  )
  return (
    // pb-safe-20: the bar's 64px + 16px gap + the home-indicator inset.
    <div data-slot="fab" className="pointer-events-none fixed right-0 bottom-0 z-sticky pr-4 pb-safe-20 md:hidden">
      {href ? (
        <Link href={href} aria-label={label} className={classes}>
          {content}
        </Link>
      ) : (
        <button type="button" aria-label={label} onClick={onClick} className={classes}>
          {content}
        </button>
      )}
    </div>
  )
}
