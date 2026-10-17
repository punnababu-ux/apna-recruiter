"use client"

/**
 * ScrollStack — cards that stack as you scroll: from lg, each card pins a
 * little lower than the one before it, the next slides up over it, and the
 * cards underneath ease back (scale down) the deeper they sit, so the back
 * card is the smallest and the front one full size. Below lg it's a plain column — a phone card is taller than the
 * screen, and a pinned card that tall hides its own bottom.
 *
 * API
 *   <ScrollStack>
 *     <ScrollStackItem>…one card…</ScrollStackItem>
 *     <ScrollStackItem>…</ScrollStackItem>
 *   </ScrollStack>
 *
 *   ScrollStackItem is the card's frame (opaque `bg-card`, `rounded-card`,
 *   border); pass layout and padding through `className`. Up to six items
 *   get their own pin offset.
 *
 * Behaviour: the pinning is CSS (`position: sticky`); the recede is one
 * passive scroll listener writing `--stack-depth` per card — how many cards
 * lie on top of it (fractional while one slides in) — read by the
 * `stack-item` utility: the deeper, the smaller. Each card also gets a
 * measured tail margin (`--stack-tail`) so the finished deck leaves as one,
 * ledges intact, instead of the front card sliding up over them. Reduced motion keeps the stacking and drops the
 * recede. The marketing header is 4.5rem; the first card pins at 6rem.
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
      const live = wide.matches && !calm.matches
      // How far each card is covered by the one after it (0 → 1)…
      const covers = items.map((item, i) => {
        const next = items[i + 1]
        if (!next || !live) return 0
        const a = item.getBoundingClientRect()
        const b = next.getBoundingClientRect()
        return Math.min(1, Math.max(0, (a.bottom - b.top) / Math.max(1, a.height - LEDGE_PX)))
      })
      // …and its depth: how many cards lie on top of it. A card is as deep
      // as its own cover plus every cover above it, so the back card ends
      // smallest and the front card stays full size — a real deck.
      let depth = 0
      for (let i = items.length - 1; i >= 0; i--) {
        depth += covers[i]
        items[i].style.setProperty("--stack-depth", depth.toFixed(3))
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // Leave as one deck. A sticky card lets go when the stack's bottom
    // reaches its own bottom edge, so cards pinned at different heights (and
    // of different heights) let go one by one and their ledges collapse.
    // Each card's tail margin pads it to the same release point as the
    // front card, so the whole deck scrolls away together.
    const align = () => {
      const items = [...root.querySelectorAll<HTMLElement>(":scope > [data-slot=scroll-stack-item]")]
      const last = items[items.length - 1]
      if (!last) return
      const reach = (el: HTMLElement) => (parseFloat(getComputedStyle(el).top) || 0) + el.offsetHeight
      const end = reach(last)
      items.forEach((item) => {
        const tail = wide.matches ? Math.max(0, end - reach(item)) : 0
        item.style.setProperty("--stack-tail", `${Math.round(tail)}px`)
      })
      schedule()
    }
    const resize = new ResizeObserver(align)
    root.querySelectorAll(":scope > [data-slot=scroll-stack-item]").forEach((item) => resize.observe(item))

    align()
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", align)
    wide.addEventListener("change", align)
    calm.addEventListener("change", schedule)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", align)
      wide.removeEventListener("change", align)
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
      {/* A beat of scroll after the last card lands, so the finished deck
          holds before it leaves (sticky cards can't outlive their parent). */}
      <div aria-hidden className="hidden lg:block lg:h-24" />
    </div>
  )
}

function ScrollStackItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="scroll-stack-item"
      className={cn("stack-item rounded-card border border-border lg:sticky lg:mb-(--stack-tail) lg:shadow-card", className)}
      {...props}
    />
  )
}

export { ScrollStack, ScrollStackItem }
