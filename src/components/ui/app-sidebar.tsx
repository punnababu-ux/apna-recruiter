"use client"

import * as React from "react"
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronsUpDown,
  X,
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
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

export type SidebarWorkspace = {
  id: string
  name: string
  subtext: string
  logoUrl?: string
  fallbackLetter: string
}

export type SidebarSubNavItem = {
  href: string
  label: string
}

export type SidebarNavItem = {
  href?: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  items?: SidebarSubNavItem[]
}

export type SidebarAlertBanner = {
  id: string
  title: string
  description: string
  ctaText?: string
  onCtaClick?: () => void
}

export type SidebarBrand = {
  name: string
  logo: React.ReactNode
  href?: string
}

export type ReusableSidebarProps = {
  brand: SidebarBrand
  workspaces: SidebarWorkspace[]
  activeWorkspaceId: string
  onWorkspaceChange: (w: SidebarWorkspace) => void
  navItems: SidebarNavItem[]
  bottomCta?: {
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    href: string
  }
  alertBanner?: SidebarAlertBanner
  footerItems?: {
    href: string
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
}

export function ReusableSidebar({
  brand,
  workspaces,
  activeWorkspaceId,
  onWorkspaceChange,
  navItems,
  bottomCta,
  alertBanner,
  footerItems,
}: ReusableSidebarProps) {
  const pathname = usePathname()
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed"

  const activeWorkspace = React.useMemo(() => {
    return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0]
  }, [workspaces, activeWorkspaceId])

  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})
  const [alertDismissed, setAlertDismissed] = React.useState(false)

  // Reset alert dismissed state when alert banner ID changes
  React.useEffect(() => {
    setAlertDismissed(false)
  }, [alertBanner?.id])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3 px-3 py-3">
        {/* Brand row */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={brand.href ? <Link href={brand.href} /> : undefined}
              tooltip={brand.name}
              className="hover:bg-transparent focus-visible:ring-0 active:bg-transparent"
            >
              <div className="-ml-1 size-7 shrink-0 flex items-center justify-center">
                {brand.logo}
              </div>
              <span className="text-lg font-bold tracking-tight text-secondary-foreground truncate">
                {brand.name}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Workspace selector */}
        {workspaces.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label="Switch workspace"
                  className="flex h-12 w-full items-center gap-3 rounded-lg border border-sidebar-border bg-background px-2.5 text-left text-sm font-medium text-foreground shadow-sm ring-sidebar-ring outline-hidden transition-colors hover:bg-accent/50 focus-visible:ring-2 cursor-pointer"
                >
                  {activeWorkspace.logoUrl ? (
                    <img
                      src={activeWorkspace.logoUrl}
                      alt=""
                      className="-ml-px mr-1 size-5 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="-ml-px mr-1 flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white"
                    >
                      {activeWorkspace.fallbackLetter}
                    </span>
                  )}
                  <span className="flex-1 min-w-0 flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-foreground text-sm">
                      {activeWorkspace.name}
                    </span>
                    <span className="truncate text-2xs text-muted-foreground font-normal">
                      {activeWorkspace.subtext}
                    </span>
                  </span>
                  <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </button>
              }
            />
            <DropdownMenuContent side="right" align="start" className="w-64 p-1.5">
              <DropdownMenuGroup className="space-y-1">
                <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                  Workspaces
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.map((w) => {
                  const isSelected = w.id === activeWorkspace.id
                  return (
                    <DropdownMenuItem
                      key={w.id}
                      onClick={() => onWorkspaceChange(w)}
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm cursor-pointer hover:bg-accent focus:bg-accent"
                    >
                      {w.logoUrl ? (
                        <img
                          src={w.logoUrl}
                          alt=""
                          className="size-5 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white">
                          {w.fallbackLetter}
                        </span>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col text-left leading-tight">
                        <span className="font-semibold text-foreground text-sm truncate">
                          {w.name}
                        </span>
                        <span className="text-2xs text-muted-foreground truncate">
                          {w.subtext}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="size-4 shrink-0 text-primary" />
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                + Add workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-0 px-3 pt-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ href, label, icon: Icon, items }) => {
                const active = href
                  ? pathname === href || pathname.startsWith(`${href}/`)
                  : false
                const isExpanded = !!expandedItems[label]

                return (
                  <SidebarMenuItem key={label}>
                    {items && items.length > 0 ? (
                      <>
                        <SidebarMenuButton
                          onClick={() => toggleExpand(label)}
                          isActive={active}
                          tooltip={label}
                          className="w-full justify-between"
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="mr-1" />
                            <span>{label}</span>
                          </span>
                          <ChevronDown
                            className={cn(
                              "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[collapsible=icon]:hidden",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </SidebarMenuButton>
                        {isExpanded && (
                          <SidebarMenuSub>
                            {items.map((sub) => (
                              <SidebarMenuSubItem key={sub.href}>
                                <SidebarMenuSubButton
                                  render={<Link href={sub.href} />}
                                  isActive={pathname === sub.href}
                                >
                                  <span>{sub.label}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        render={href ? <Link href={href} /> : undefined}
                        isActive={active}
                        tooltip={label}
                      >
                        <Icon className="mr-1" />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom CTA */}
        {bottomCta && (
          <div className="mt-auto px-3 py-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3">
            <Button
              variant="default"
              className="w-full justify-start gap-2.5 h-10 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:rounded-lg"
              render={<Link href={bottomCta.href} />}
            >
              <span className="flex items-center gap-2.5 w-full justify-start group-data-[collapsible=icon]:justify-center">
                <bottomCta.icon className="size-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden truncate">
                  {bottomCta.label}
                </span>
              </span>
            </Button>
          </div>
        )}

        {/* Alert Banner */}
        {alertBanner && !alertDismissed && (
          <div className={cn(
            "p-3 group-data-[collapsible=icon]:p-2 pt-0 group-data-[collapsible=icon]:pt-0",
            !bottomCta && "mt-auto"
          )}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <div className="relative rounded-lg border border-warning/20 bg-warning-subtle p-3 group-data-[collapsible=icon]:p-2 text-xs text-warning-foreground shadow-xs transition-all duration-200">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setAlertDismissed(true)
                      }}
                      className="absolute top-2 right-2 text-warning hover:text-warning-foreground transition-colors group-data-[collapsible=icon]:hidden cursor-pointer"
                      aria-label="Dismiss alert"
                    >
                      <X className="size-3" />
                    </button>
                    <div className="flex gap-2">
                      <AlertCircle className="size-4 shrink-0 text-warning" />
                      <div className="space-y-1 group-data-[collapsible=icon]:hidden text-left">
                        <p className="font-semibold leading-none text-warning-foreground">
                          {alertBanner.title}
                        </p>
                        <p className="text-2xs text-muted-foreground/85 leading-normal">
                          {alertBanner.description}
                        </p>
                        {alertBanner.ctaText && (
                          <button
                            type="button"
                            onClick={alertBanner.onCtaClick}
                            className="text-2xs font-semibold text-warning underline hover:text-warning-foreground block pt-0.5 cursor-pointer"
                          >
                            {alertBanner.ctaText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                }
              />
              <TooltipContent
                side="right"
                align="center"
                hidden={!isCollapsed || isMobile}
                className="max-w-xs p-3 text-left"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-xs text-warning">{alertBanner.title}</p>
                  <p className="text-2xs text-muted-foreground">
                    {alertBanner.description}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </SidebarContent>

      {/* Footer items */}
      {footerItems && footerItems.length > 0 && (
        <SidebarFooter className="px-3 pb-3">
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  tooltip={item.label}
                >
                  <item.icon className="mr-1" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
