"use client"

/**
 * OnlyRoundsSidebar — product shell nav.
 *
 * Alignment contract:
 *   Every glyph — brand mark, workspace badge, nav icon, footer avatar —
 *   sits at the SAME x coordinate in both expanded and collapsed states.
 *   Row height is ALSO constant (h-10 = 40px) across states, so icons
 *   never shift vertically either. Expanding only reveals the label
 *   beside each glyph; collapsing only hides it.
 *
 * Logo treatment:
 *   We render `OnlyRoundsLogoMark` (mark only, no wordmark) as a
 *   standard 20×20 icon and pair it with a text span "OnlyRound AI"
 *   styled inline — same structure as every other nav row. The
 *   primitive hides the span in collapsed mode, just like nav labels.
 *
 * Workspace selector:
 *   White surface with subtle elevation (shadow + border) to read as
 *   an actionable button distinct from the transparent nav rows. In
 *   collapsed mode the chrome drops away and only the gradient badge
 *   remains at the same x as every other glyph.
 */

import {
  Briefcase,
  ChevronsUpDown,
  CreditCard,
  HelpCircle,
  History,
  Settings,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OnlyRoundsLogoMark } from "@/components/ui/logo-onlyrounds"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const NAV: NavItem[] = [
  { href: "/onlyrounds/jobs",     label: "Jobs",     icon: Briefcase },
  { href: "/onlyrounds/clients",  label: "Clients",  icon: Users },
  { href: "/onlyrounds/history",  label: "History",  icon: History },
  { href: "/onlyrounds/credits",  label: "Credits",  icon: CreditCard },
]

export function OnlyRoundsSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3 px-3 py-3">
        {/* Brand row — logo mark + "OnlyRound AI" wordmark. Structured
            like a nav row so the primitive's collapsed-state label-hide
            logic applies uniformly. The OnlyRound gradient is re-used
            on the text via `text-gradient-primary` + `bg-clip-text`. */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/onlyrounds/jobs" />}
              tooltip="OnlyRound AI"
              className="hover:bg-transparent focus-visible:ring-0 active:bg-transparent"
            >
              <OnlyRoundsLogoMark className="-ml-1 size-7!" />
              <span className="text-lg font-bold tracking-tight text-secondary-foreground">
                OnlyRound AI
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Workspace selector — white elevated button. In collapsed mode
            chrome (bg/border/shadow/label/chevron) drops away; only the
            gradient badge remains at the nav-icon x position. */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="Switch workspace"
                className="flex h-10 w-full items-center gap-3 rounded-lg border border-sidebar-border bg-background px-2.5 text-left text-sm font-medium text-foreground shadow-sm ring-sidebar-ring outline-hidden transition-colors hover:bg-accent/50 focus-visible:ring-2"
              >
                <span
                  aria-hidden
                  className="-ml-px mr-1 flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white"
                >
                  G
                </span>
                <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">
                  Gamma Workspace
                </span>
                <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </button>
            }
          />
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Gamma Workspace</DropdownMenuItem>
              <DropdownMenuItem>Apna TalentPass</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>+ Add workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-0 px-3 pt-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      render={<Link href={href} />}
                      isActive={active}
                      tooltip={label}
                    >
                      <Icon className="mr-1" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/onlyrounds/settings" />}
              tooltip="Settings"
            >
              <Settings className="mr-1" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/onlyrounds/help" />}
              tooltip="Help"
            >
              <HelpCircle className="mr-1" />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
