"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-3 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

// Pill variants (default, inverted) are fully rounded — track, indicator and
// triggers — like every other segmented control in the system (ChipTabs,
// SegmentedTabSwitcher). They were rounded-lg/md here, so the jobs tabs read
// square next to self-checkout's job-slot switch. `line` stays square.
const tabsListVariants = cva(
  "group/tabs-list relative isolate inline-flex max-w-full overflow-x-auto no-scrollbar items-center justify-start sm:justify-center rounded-full p-1 text-muted-foreground group-data-horizontal/tabs:h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none shrink-0",
  {
    variants: {
      variant: {
        default: "bg-muted",
        // No list padding so the first tab's text aligns flush with the
        // page title; taller (48px) row; underline indicator sits at bottom-0.
        line: "gap-6 bg-transparent p-0 group-data-horizontal/tabs:h-12",
        /** White pill with a near-black active chip. Use on gray/tinted canvases
         *  where the default muted pill would be invisible. */
        inverted: "bg-card",
        /** Self-checkout's look (the plans hero switcher): grey track, white
         *  pill with a strong inset ring, active label in checkout green.
         *  Fixed across themes, like the checkout surfaces it sits on. */
        checkout: "bg-checkout-track",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      {/* One indicator per list that glides to the active tab (Base UI
       * measures it into --active-tab-*), instead of each tab painting its
       * own active background and the selection jumping between them. */}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className={cn(
          "absolute -z-1 tab-indicator",
          "top-(--active-tab-top) left-(--active-tab-left) h-(--active-tab-height) w-(--active-tab-width)",
          "group-data-[variant=default]/tabs-list:rounded-full group-data-[variant=default]/tabs-list:bg-background group-data-[variant=default]/tabs-list:shadow-card dark:group-data-[variant=default]/tabs-list:border dark:group-data-[variant=default]/tabs-list:border-input dark:group-data-[variant=default]/tabs-list:bg-input/30",
          "group-data-[variant=inverted]/tabs-list:rounded-full group-data-[variant=inverted]/tabs-list:bg-tabs-inverted-pill",
          "group-data-[variant=checkout]/tabs-list:rounded-full group-data-[variant=checkout]/tabs-list:bg-plan-card group-data-[variant=checkout]/tabs-list:ring-1 group-data-[variant=checkout]/tabs-list:ring-plan-pill-ring",
          "group-data-[variant=line]/tabs-list:rounded-full group-data-[variant=line]/tabs-list:bg-foreground",
          "group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:top-auto group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:bottom-0 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:h-0.5",
          "group-data-vertical/tabs:group-data-[variant=line]/tabs-list:left-auto group-data-vertical/tabs:group-data-[variant=line]/tabs-list:right-0 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:w-0.5"
        )}
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "ink relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-2 rounded-full border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-interactive group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Line variant: no internal horizontal padding (underline hugs the
        // label text); the inter-tab spacing comes from TabsList's gap. No
        // ink either — there is no surface for it to fill.
        "group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:before:hidden",
        "group-data-[variant=inverted]/tabs-list:data-active:text-tabs-inverted-label",
        "group-data-[variant=checkout]/tabs-list:font-semibold group-data-[variant=checkout]/tabs-list:text-checkout-hero-fg-secondary group-data-[variant=checkout]/tabs-list:not-data-active:hover:text-checkout-hero-fg",
        "data-active:text-foreground dark:data-active:text-foreground",
        "group-data-[variant=checkout]/tabs-list:data-active:text-checkout-primary dark:group-data-[variant=checkout]/tabs-list:data-active:text-checkout-primary",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
