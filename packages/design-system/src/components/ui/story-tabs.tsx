"use client"

/**
 * StoryTabs — tabs that play like stories: the active tab fills a progress
 * bar for its turn (`--duration-story`), then hands over to the next, and
 * round again. A vertical list of rich tabs (icon, title, one line) beside
 * one panel; the active tab can open `details` under it. Made for a
 * product showcase where each panel is a short animated demo.
 *
 * API
 *   <StoryTabs
 *     label="apna products"
 *     items={[{ value: "jobs", title: "Smart Jobs", description: "…", icon: <Briefcase />, details: <…/> }]}
 *     value={value} onValueChange={setValue}        // or uncontrolled: defaultValue
 *     renderPanel={(value) => <Demo product={value} />}
 *   />
 *
 *   autoplay        on by default. Stops for good once the viewer picks a
 *                   tab (click, tap or arrow keys) — they're in charge now.
 *   listClassName   e.g. `max-lg:hidden` when phones switch with a chip row
 *                   instead; the panel still follows `value`.
 *
 * From lg the panel stretches to the list's height, so a panel content
 * with `lg:h-full` lines up with the tabs beside it.
 *
 * Behaviour: the bar pauses while the pointer or focus is on the showcase
 * and while it is off-screen. Under reduced motion nothing advances on its
 * own (the bar doesn't run, so it never "ends"). Tabs carry real tab
 * semantics (Base UI Tabs); `details` sit outside the tab button, so links
 * in them are ordinary links.
 */

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

export interface StoryTabItem<V extends string = string> {
  value: V
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  /** Opens under the tab while it is active (features, a "Learn more"). */
  details?: React.ReactNode
}

function StoryTabs<V extends string>({
  label,
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  renderPanel,
  autoplay = true,
  className,
  listClassName,
  panelClassName,
}: {
  /** Names the tab list for assistive tech. */
  label: string
  items: StoryTabItem<V>[]
  value?: V
  defaultValue?: V
  onValueChange?: (value: V) => void
  renderPanel: (value: V) => React.ReactNode
  autoplay?: boolean
  className?: string
  listClassName?: string
  panelClassName?: string
}) {
  const [own, setOwn] = React.useState<V>(defaultValue ?? items[0].value)
  const value = valueProp ?? own
  const setValue = (next: V) => {
    if (valueProp === undefined) setOwn(next)
    onValueChange?.(next)
  }

  const [stopped, setStopped] = React.useState(false)
  const [held, setHeld] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const playing = autoplay && !stopped
  const paused = held || !visible

  const rootRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const advance = () => {
    const i = items.findIndex((item) => item.value === value)
    setValue(items[(i + 1) % items.length].value)
  }

  return (
    <TabsPrimitive.Root
      ref={rootRef}
      data-slot="story-tabs"
      data-story-paused={paused ? "" : undefined}
      orientation="vertical"
      value={value}
      onValueChange={(next) => {
        // Only the viewer changes tabs through here (auto-advance calls
        // setValue directly), so this is the moment to hand over control.
        setStopped(true)
        setValue(next as V)
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false)
      }}
      className={cn("grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-12", className)}
    >
      <TabsPrimitive.List
        aria-label={label}
        className={cn("flex flex-col gap-2 lg:col-span-2", listClassName)}
      >
        {items.map((item) => {
          const active = item.value === value
          return (
            <div
              key={item.value}
              data-active={active ? "" : undefined}
              className="relative flex flex-col overflow-hidden rounded-xl transition-interactive data-active:bg-card data-active:shadow-card"
            >
              <TabsPrimitive.Tab
                value={item.value}
                data-slot="story-tab"
                className="ink relative flex w-full items-center gap-3 rounded-xl p-4 text-left outline-none transition-interactive not-data-active:hover:bg-card/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {item.icon && (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:size-5">
                    {item.icon}
                  </span>
                )}
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-base font-semibold text-foreground">{item.title}</span>
                  {item.description && (
                    <span className="text-sm text-muted-foreground">{item.description}</span>
                  )}
                </span>
              </TabsPrimitive.Tab>

              {active && item.details && (
                <div className="px-4 pb-5 pl-16 animate-in fade-in-0 duration-enter">{item.details}</div>
              )}

              {/* The turn's progress. Its animation ending is what advances
                  the tabs, so the bar and the timing can never disagree. */}
              {active && playing && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-border">
                  <span
                    key={item.value}
                    className="animate-story-progress block h-full bg-primary"
                    onAnimationEnd={advance}
                  />
                </span>
              )}
            </div>
          )
        })}
      </TabsPrimitive.List>

      {/* One panel that always carries the active value — not one per tab.
          Base UI holds an outgoing panel until its animations end, and a
          demo's looping animations never do, so per-tab panels left an
          empty, inert one behind in the grid. */}
      <TabsPrimitive.Panel
        value={value}
        keepMounted
        data-slot="story-panel"
        className={cn("outline-none lg:col-span-3", panelClassName)}
      >
        <React.Fragment key={value}>{renderPanel(value)}</React.Fragment>
      </TabsPrimitive.Panel>
    </TabsPrimitive.Root>
  )
}

export { StoryTabs }
