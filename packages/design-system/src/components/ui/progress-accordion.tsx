"use client"

/**
 * ProgressAccordion — an accordion that walks itself: one item open at a
 * time, a thin loader on top of the open item fills over `interval`, and
 * when it completes the next item opens (looping). Built for a feature list
 * beside a picture that follows the open item (About's "Built for
 * recruiters"): pass `onValueChange` and swap the picture on it.
 *
 * API
 *   <ProgressAccordion
 *     items={[{ value, title, subtitle?, content }]}
 *     value? defaultValue? onValueChange?   // controlled or not
 *     interval={6000}                        // ms each item stays open
 *   />
 *
 * Behaviour
 *   - Clicking an item opens it and restarts its loader there.
 *   - The loader pauses while the pointer is over the list, while focus is
 *     inside it, and while the list is off screen — it never advances
 *     behind the reader's back.
 *   - Reduced motion: no loader, no auto-advance — a plain one-open
 *     accordion.
 *   - One item is always open (clicking the open one doesn't close it).
 *
 * Built on Accordion (Base UI): keyboard and aria come from there. The
 * loader is decorative (`aria-hidden`).
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

export interface ProgressAccordionItem {
  value: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  content: React.ReactNode
}

export interface ProgressAccordionProps {
  items: ProgressAccordionItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** How long each item stays open before the next, in ms. */
  interval?: number
  className?: string
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

function ProgressAccordion({
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  interval = 6000,
  className,
}: ProgressAccordionProps) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value)
  const active = valueProp ?? inner
  const reduced = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [inView, setInView] = React.useState(false)
  // Bumped on every (re)open so the loader restarts even on the same item.
  const [round, setRound] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const open = React.useCallback(
    (next: string) => {
      if (valueProp === undefined) setInner(next)
      onValueChange?.(next)
      setRound((r) => r + 1)
    },
    [valueProp, onValueChange]
  )

  const advance = () => {
    const i = items.findIndex((item) => item.value === active)
    open(items[(i + 1) % items.length].value)
  }

  const paused = hovered || focused || !inView

  return (
    <div
      ref={ref}
      data-slot="progress-accordion"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
      className={className}
    >
      <Accordion
        value={active ? [active] : []}
        onValueChange={(next) => {
          const v = (next as string[])[0]
          if (v) open(v)
        }}
        className="border-t border-border"
      >
        {items.map((item) => {
          const isOpen = item.value === active
          return (
            <AccordionItem key={item.value} value={item.value} className="relative border-b border-border">
              {/* The loader: a hairline track on top of the item; the open
                  one fills over `interval`, then hands over to the next. */}
              {!reduced && (
                <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-0.5 overflow-hidden">
                  {isOpen && (
                    <span
                      key={round}
                      data-paused={paused || undefined}
                      className="progress-fill block h-full bg-foreground"
                      style={{ "--progress-duration": `${interval}ms` } as React.CSSProperties}
                      onAnimationEnd={advance}
                    />
                  )}
                </span>
              )}
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="flex flex-col gap-0.5">
                  <span className={cn("text-base font-semibold transition-interactive", isOpen ? "text-foreground" : "text-muted-foreground")}>
                    {item.title}
                  </span>
                  {item.subtitle && <span className="text-sm font-regular text-muted-foreground">{item.subtitle}</span>}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">{item.content}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export { ProgressAccordion }
