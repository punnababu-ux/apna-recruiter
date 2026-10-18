"use client"

/**
 * NavigationMenu — a site header's menus: top-level triggers that open a
 * card of links, plus plain top-level links. Built on Base UI Navigation
 * Menu, which owns the behaviour so pages don't hand-roll it:
 *
 *   · hover opens after a short intent delay; leaving closes after a grace
 *     period (diagonal travel into the card doesn't drop it)
 *   · click opens and pins — clicking a trigger that hover already opened
 *     keeps it open; outside click / Escape close it
 *   · moving between triggers swaps the card in place (it glides and
 *     resizes rather than closing and reopening)
 *   · keyboard: Enter/Space open, arrows move between triggers, Tab into
 *     the card, Escape returns focus to the trigger
 *
 * A trigger never navigates (touch has no hover, so the first tap must open
 * the menu); a section's landing page is the card's first link instead.
 *
 * API
 *   <NavigationMenu aria-label="Main" value={open} onValueChange={setOpen}>
 *     <NavigationMenuList>
 *       <NavigationMenuItem value="about">
 *         <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
 *         <NavigationMenuContent>…<NavigationMenuLink render={<Link href="/about" />}>Overview</NavigationMenuLink>…</NavigationMenuContent>
 *       </NavigationMenuItem>
 *       <NavigationMenuItem>
 *         <NavigationMenuLink render={<Link href="/stories" />}>Customer Stories</NavigationMenuLink>
 *       </NavigationMenuItem>
 *     </NavigationMenuList>
 *     <NavigationMenuPopup />
 *   </NavigationMenu>
 *
 * Triggers and links are unstyled beyond focus — the header styles its own
 * bar items; NavigationMenuPopup is the system's popover card (opaque
 * popover surface, rounded-2xl, shadow-popover, ring), anchored under the
 * active trigger and kept on screen.
 */

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"

import { cn } from "@/lib/utils"
import { ChevronDown } from "@/icons/icons"

function NavigationMenu({ className, onValueChange, ...props }: NavigationMenuPrimitive.Root.Props) {
  // Click opens and pins. Base UI's trigger click toggles, so a click on a
  // menu that hover had just opened CLOSED it — the menu seemed to open and
  // shut at random. Here, a click on a hover-opened menu pins it instead,
  // and a pinned menu doesn't close when the pointer leaves; outside click,
  // Escape, a link or a second click close it as before.
  const hoverOpened = React.useRef(false)
  const pinned = React.useRef(false)
  const handleValueChange: NavigationMenuPrimitive.Root.Props["onValueChange"] = (value, details) => {
    const press = details.reason === "trigger-press"
    const hover = details.reason === "trigger-hover"
    if (value == null) {
      if ((press && hoverOpened.current) || (hover && pinned.current)) {
        if (press) {
          hoverOpened.current = false
          pinned.current = true
        }
        details.cancel()
        return
      }
      hoverOpened.current = false
      pinned.current = false
    } else {
      // A hover onto another trigger moves the card; it's no longer pinned.
      hoverOpened.current = hover
      pinned.current = press
    }
    onValueChange?.(value, details)
  }
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      // A beat of intent before opening, a longer grace before closing.
      delay={100}
      closeDelay={200}
      className={cn("relative", className)}
      onValueChange={handleValueChange}
      {...props}
    />
  )
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function NavigationMenuItem(props: NavigationMenuPrimitive.Item.Props) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />
}

/** A top-level trigger: label + a chevron that turns while its card is open. */
function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn("group/nav-trigger outline-none focus-visible:ring-3 focus-visible:ring-ring/50", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="flex">
        <ChevronDown
          className="size-4 transition-select group-data-[popup-open]/nav-trigger:rotate-180"
          aria-hidden
        />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("nav-menu-content", className)}
      {...props}
    />
  )
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      closeOnClick
      className={cn("outline-none focus-visible:ring-3 focus-visible:ring-ring/50", className)}
      {...props}
    />
  )
}

/** The card the active trigger's content renders into. */
function NavigationMenuPopup({
  className,
  sideOffset = 8,
  align = "start",
  collisionPadding = 16,
}: {
  className?: string
} & Pick<NavigationMenuPrimitive.Positioner.Props, "sideOffset" | "align" | "collisionPadding">) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        className="nav-menu-positioner isolate z-popover"
      >
        <NavigationMenuPrimitive.Popup
          data-slot="navigation-menu-popup"
          className={cn(
            "nav-menu-popup rounded-2xl bg-popover text-popover-foreground shadow-popover ring-1 ring-foreground/10 outline-none",
            className
          )}
        >
          <NavigationMenuPrimitive.Viewport className="relative h-full w-full overflow-hidden" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPopup,
}
