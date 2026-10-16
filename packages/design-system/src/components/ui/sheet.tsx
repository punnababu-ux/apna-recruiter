"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CloseBubble } from "@/components/ui/close-bubble"
import { XIcon } from "@/icons/icons"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {children}
        {/* A bottom sheet is a pop-up: its close is the CloseBubble, 8px
            above its top-right corner (so the sheet must not clip — no
            overflow-hidden on it). Side and top sheets are panels and keep
            the inside X. */}
        {showCloseButton && side === "bottom" && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<CloseBubble className="absolute -top-10 right-4" />}
          />
        )}
        {showCloseButton && side !== "bottom" && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * SheetPanel — the app's right side panel (order summary, notifications):
 * a muted frame with rounded left corners, holding white card sections.
 * Use it, not a bare `SheetContent side="right"`, for any side panel, so
 * every panel has the same width, surface and header.
 *   size  "md" 448px (default) · "lg" 512px (e.g. the subscription order
 *         summary, whose payment tiles need the room)
 * The `data-[side=right]:` prefix is load-bearing: SheetContent sets its
 * own width under that selector, which a plain `sm:max-w-*` loses to.
 */
function SheetPanel({
  className,
  size = "md",
  ...props
}: Omit<React.ComponentProps<typeof SheetContent>, "side" | "showCloseButton"> & { size?: "md" | "lg" }) {
  return (
    <SheetContent
      side="right"
      showCloseButton={false}
      data-slot="sheet-panel"
      className={cn(
        "gap-0 overflow-hidden bg-muted p-0 data-[side=right]:w-full sm:rounded-l-2xl",
        size === "lg" ? "data-[side=right]:sm:max-w-lg" : "data-[side=right]:sm:max-w-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * SheetPanelHeader — a side panel's title row: the 20px semibold heading
 * title, an optional action ("Mark all as read"), and the close button.
 * Every SheetPanel uses this one row, so panel titles never drift in size
 * or weight. Place it at the top of the panel's first white section.
 */
function SheetPanelHeader({
  title,
  action,
  className,
}: {
  title: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="sheet-panel-header" className={cn("flex items-center justify-between gap-3 px-5", className)}>
      <SheetTitle className="font-heading text-xl font-semibold text-foreground">{title}</SheetTitle>
      <div className="flex shrink-0 items-center gap-2">
        {action}
        <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
          <XIcon className="size-6 text-muted-foreground" aria-hidden />
          <span className="sr-only">Close</span>
        </SheetClose>
      </div>
    </div>
  )
}

export {
  Sheet,
  SheetPanel,
  SheetPanelHeader,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
