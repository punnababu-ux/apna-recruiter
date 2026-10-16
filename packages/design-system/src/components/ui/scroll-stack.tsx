"use client"

/**
 * ScrollStack — cards that stack as you scroll: from lg, each card pins a
 * little lower than the one before it, the next slides up over it, and the
 * cards underneath ease back (scale down) as they're covered, so the deck
 * has depth. Below lg it's a plain column — a phone card is taller than the
 * screen, and a pinned card that tall hides its own bottom.
 *
 * API
 *   <ScrollStack>
 *     <ScrollStackItem>…one card…</ScrollStackItem>
 *     <ScrollStackItem>…</ScrollStackItem>
 *   </ScrollStack>
 *
 *   ScrollStackItem is the card's frame (opaque `bg-card`, `rounded-3xl`,
 *   border); pass layout and padding through `className`. Up to six items
 *   get their own pin offset.
 *
 * Behaviour: the pinning is CSS (`position: sticky`); the recede is one
 * passive scroll listener writing `--stack-cover` (0 → 1) per card, read by
 * the `stack-item` utility. Reduced motion keeps the stacking and drops the
 * recede. The header is 4rem; the first card pins at 6rem.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/** Each card pins 1rem lower than the last, so its predecessor's top edge
 *  stays visible as a ledge. */
const PIN = ["lg:top-24", "lg:top-28", "lg:top-32", "lg:top-36", "lg:top-40", "lg:top-44"]
/** The ledge left showing: a card counts as fully covered at this overlap. */
const LEDGE_PX = 16

function ScrollStack({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = ref.current
    if (!root) return
    const wide = window.matchMedia("(min-width: 64rem)")
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      const items = [...root.querySelectorAll<HTMLElement>(":scope > [data-slot=scroll-stack-item]")]
      items.forEach((item, i) => {
        const next = items[i + 1]
        let cover = 0
        if (next && wide.matches && !calm.matches) {
          const a = item.getBoundingClientRect()
          const b = next.getBoundingClientRect()
          cover = Math.min(1, Math.max(0, (a.bottom - b.top) / Math.max(1, a.height - LEDGE_PX)))
        }
        item.style.setProperty("--stack-cover", cover.toFixed(3))
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    wide.addEventListener("change", schedule)
    calm.addEventListener("change", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      wide.removeEventListener("change", schedule)
      calm.removeEventListener("change", schedule)
    }
  }, [])

  return (
    <div ref={ref} data-slot="scroll-stack" className={cn("flex flex-col gap-6 lg:gap-16", className)}>
      {React.Children.toArray(children).map((child, i) =>
        React.isValidElement<{ className?: string }>(child)
          ? React.cloneElement(child, { className: cn(PIN[Math.min(i, PIN.length - 1)], child.props.className) })
          : child
      )}
    </div>
  )
}

function ScrollStackItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="scroll-stack-item"
      className={cn("stack-item rounded-3xl border border-border bg-card lg:sticky lg:shadow-card", className)}
      {...props}
    />
  )
}

export { ScrollStack, ScrollStackItem }
