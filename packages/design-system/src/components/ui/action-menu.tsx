"use client"

/**
 * ActionMenu — a menu of actions behind a trigger (the ⋮ on a card or row):
 * a dropdown on desktop, a bottom sheet on phones, same rows in both
 * (AGENTS.md → "Menus have one type scale"; user call, 2026-10-29). Use it
 * for every action menu a phone can reach; a bare DropdownMenu opens as a
 * small floating list on a phone, which breaks that rule.
 *
 * API (mirrors DropdownMenu, so moving one over is a rename)
 *   <ActionMenu>
 *     <ActionMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Actions for Telecaller"><MoreVertical /></Button>} />
 *     <ActionMenuContent title="Telecaller" align="end">
 *       <ActionMenuItem onClick={edit}><Pencil /> Edit</ActionMenuItem>
 *       <ActionMenuSeparator />
 *       <ActionMenuItem variant="destructive" onClick={close}><PowerOff /> Close job</ActionMenuItem>
 *     </ActionMenuContent>
 *   </ActionMenu>
 *
 *   title    the sheet's heading on phones (`text-base font-semibold`, with
 *            a rule under it); on desktop it is not shown. Without it the
 *            sheet has no visible heading and is named "Actions".
 *   variant  "destructive" paints the row red.
 *
 * Phones: rows are `text-sm` regular with 20px line icons, 40px+ tall
 * (touch target); a tap runs the action and closes the sheet. The sheet
 * carries the system CloseBubble. Desktop: the DropdownMenu as before.
 *
 * a11y: the dropdown is a Base UI menu (arrow keys, typeahead). The sheet is
 * a dialog titled by `title`; its rows are buttons.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const ActionMenuContext = React.createContext<{ sheet: boolean; close: () => void }>({
  sheet: false,
  close: () => {},
})

function ActionMenu({ children }: { children: React.ReactNode }) {
  const sheet = useIsMobile() === true
  const [open, setOpen] = React.useState(false)
  const ctx = React.useMemo(() => ({ sheet, close: () => setOpen(false) }), [sheet])
  const Root = sheet ? Sheet : DropdownMenu
  return (
    <ActionMenuContext.Provider value={ctx}>
      <Root open={open} onOpenChange={setOpen}>
        {children}
      </Root>
    </ActionMenuContext.Provider>
  )
}

function ActionMenuTrigger(props: React.ComponentProps<typeof DropdownMenuTrigger>) {
  const { sheet } = React.useContext(ActionMenuContext)
  return sheet ? (
    <SheetTrigger {...(props as React.ComponentProps<typeof SheetTrigger>)} />
  ) : (
    <DropdownMenuTrigger {...props} />
  )
}

function ActionMenuContent({
  title,
  align = "end",
  className,
  children,
}: {
  title?: string
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"]
  className?: string
  children: React.ReactNode
}) {
  const { sheet } = React.useContext(ActionMenuContext)
  if (!sheet)
    return (
      <DropdownMenuContent align={align} className={className}>
        {children}
      </DropdownMenuContent>
    )
  return (
    // The CloseBubble sits outside the sheet: no overflow-hidden here.
    <SheetContent side="bottom" data-slot="action-menu-sheet" className={cn("gap-1 rounded-t-2xl border-t-0 p-4 pb-safe-4", className)}>
      <SheetTitle className={title ? "truncate px-2 py-1 text-base font-semibold text-foreground" : "sr-only"}>
        {title ?? "Actions"}
      </SheetTitle>
      {title && <Separator className="my-1" />}
      <div className="flex flex-col gap-1">{children}</div>
    </SheetContent>
  )
}

function ActionMenuItem({
  variant = "default",
  onClick,
  className,
  children,
  disabled,
}: {
  variant?: "default" | "destructive"
  onClick?: () => void
  className?: string
  children: React.ReactNode
  disabled?: boolean
}) {
  const { sheet, close } = React.useContext(ActionMenuContext)
  if (!sheet)
    return (
      <DropdownMenuItem variant={variant} onClick={onClick} disabled={disabled} className={className}>
        {children}
      </DropdownMenuItem>
    )
  return (
    <button
      type="button"
      data-slot="action-menu-item"
      data-variant={variant}
      disabled={disabled}
      onClick={() => {
        onClick?.()
        close()
      }}
      className={cn(
        "ink relative flex min-h-10 items-center gap-3 rounded-control px-2 py-2.5 text-left text-sm font-regular text-foreground transition-interactive hover:bg-muted disabled:pointer-events-none disabled:opacity-50 data-[variant=destructive]:text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
    >
      {children}
    </button>
  )
}

function ActionMenuSeparator({ className }: { className?: string }) {
  const { sheet } = React.useContext(ActionMenuContext)
  return sheet ? <Separator className={cn("my-1", className)} /> : <DropdownMenuSeparator className={className} />
}

export { ActionMenu, ActionMenuTrigger, ActionMenuContent, ActionMenuItem, ActionMenuSeparator }
