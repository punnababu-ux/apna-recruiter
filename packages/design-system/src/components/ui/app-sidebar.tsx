"use client"

import * as React from "react"
import { AlertCircle, Check, ChevronDown, ChevronRight, ChevronsUpDown, X } from "@/icons/icons"
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
import { AlertBanner } from "@/components/ui/alert-banner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  subtext?: string
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
  badge?: React.ReactNode
}

export type SidebarAlertBanner = {
  id: string
  title: string
  ctaText?: string
  onCtaClick?: () => void
  variant?: "warning" | "info" | "destructive" | "success" | "default"
  appearance?: "primary" | "secondary"
  showClose?: boolean
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
  /** One promoted destination at the very bottom, under the alert banner
   *  (e.g. "View plans"): a dark nav row with a chevron. */
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
  dropdownClassName?: string
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
  dropdownClassName,
}: ReusableSidebarProps) {
  const pathname = usePathname()
  const { state, isMobile, setOpenMobile } = useSidebar()
  const isCollapsed = state === "collapsed" && !isMobile

  const activeWorkspace = React.useMemo(() => {
    return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0]
  }, [workspaces, activeWorkspaceId])

  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>(() => {
    // Pre-open any group whose sub-items include the current pathname so the
    // active item is visible immediately without a manual expand click.
    const initial: Record<string, boolean> = {}
    for (const item of navItems) {
      if (item.items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`))) {
        initial[item.label] = true
      }
    }
    return initial
  })
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
              size="lg"
              className="hover:bg-transparent focus-visible:ring-0 active:bg-transparent px-0! group-data-[collapsible=icon]:w-10"
              onClick={() => setOpenMobile(false)}
            >
              <div className="size-10 shrink-0 flex items-center justify-center">
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
                  className="flex h-12 w-full items-center gap-3 rounded-lg border border-sidebar-border bg-background px-2.5 text-left text-sm font-medium text-foreground shadow-sm ring-sidebar-ring outline-hidden transition-colors hover:bg-accent/50 focus-visible:ring-2 cursor-pointer group-data-[collapsible=icon]:w-10"
                >
                  {activeWorkspace.logoUrl ? (
                    <img
                      src={activeWorkspace.logoUrl}
                      alt=""
                      className="size-5 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white"
                    >
                      {activeWorkspace.fallbackLetter}
                    </span>
                  )}
                  <span className="flex-1 min-w-0 flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-foreground text-sm">
                      {activeWorkspace.name}
                    </span>
                    {activeWorkspace.subtext && (
                      <span className="truncate text-2xs text-muted-foreground font-normal">
                        {activeWorkspace.subtext}
                      </span>
                    )}
                  </span>
                  <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </button>
              }
            />
            <DropdownMenuContent side={isMobile ? "bottom" : "right"} align={isMobile ? "center" : "start"} className={cn("w-64 p-1.5", dropdownClassName)}>
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
                      onClick={() => {
                        onWorkspaceChange(w)
                        setOpenMobile(false)
                      }}
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
                        {w.subtext && (
                          <span className="text-2xs text-muted-foreground truncate">
                            {w.subtext}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="size-4 shrink-0 text-primary" />
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenMobile(false)}
                className="cursor-pointer px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
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
              {navItems.map(({ href, label, icon: Icon, items, badge }) => {
                const active = href
                  ? pathname === href || pathname.startsWith(`${href}/`)
                  : items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)) || false
                const isExpanded = !!expandedItems[label]

                return (
                  <SidebarMenuItem key={label}>
                    {items && items.length > 0 ? (
                      isCollapsed ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <SidebarMenuButton
                                isActive={active}
                                tooltip={label}
                                className="w-full justify-between"
                              >
                                <span className="flex items-center gap-3">
                                  <Icon />
                                  <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">{label}</span>
                                </span>
                              </SidebarMenuButton>
                            }
                          />
                          <DropdownMenuContent side="right" align="start" className={dropdownClassName}>
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>{label}</DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            {items.map((sub) => (
                              <DropdownMenuItem
                                key={sub.href}
                                render={<Link href={sub.href} />}
                                className={cn(
                                  "cursor-pointer",
                                  pathname === sub.href && "bg-accent text-accent-foreground font-medium"
                                )}
                              >
                                <span>{sub.label}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <>
                          <SidebarMenuButton
                            onClick={() => toggleExpand(label)}
                            isActive={active}
                            tooltip={label}
                            className="w-full justify-between"
                          >
                            <span className="flex items-center gap-3">
                              <Icon />
                              <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">{label}</span>
                            </span>
                            <span className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                              {badge}
                              <ChevronDown
                                className={cn(
                                  "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                                  isExpanded && "rotate-180"
                                )}
                              />
                            </span>
                          </SidebarMenuButton>
                          {isExpanded && (
                            <SidebarMenuSub>
                              {items.map((sub) => (
                                <SidebarMenuSubItem key={sub.href}>
                                  <SidebarMenuSubButton
                                    render={<Link href={sub.href} />}
                                    isActive={pathname === sub.href}
                                    onClick={() => setOpenMobile(false)}
                                  >
                                    <span>{sub.label}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}
                        </>
                      )
                    ) : (
                      <SidebarMenuButton
                        render={href ? <Link href={href} /> : undefined}
                        isActive={active}
                        tooltip={label}
                        className="justify-between"
                        onClick={() => setOpenMobile(false)}
                      >
                        <span className="flex items-center gap-3">
                          <Icon />
                          <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">{label}</span>
                        </span>
                        {badge && <span className="group-data-[collapsible=icon]:hidden">{badge}</span>}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col">
          {/* Footer items */}
          {footerItems && footerItems.length > 0 && (
            <div className="px-3 pb-2 pt-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3">
              <SidebarMenu>
                {footerItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      tooltip={item.label}
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          )}

          {/* Alert Banner composed directly from AlertBanner design system
              primitive. Collapsed, the banner is an icon tile; hovering (or
              focusing / tapping) it opens the full banner beside it, CTA and
              close included. It used to open a tooltip, which drew the title
              in foreground text on the tooltip's foreground fill: a blank
              black box. A popover, not a tooltip, because the banner has a
              button in it. */}
          {alertBanner && !alertDismissed && (() => {
            const banner = (collapsed: boolean) => (
              <AlertBanner
                collapsed={collapsed}
                variant={alertBanner.variant || "warning"}
                appearance={alertBanner.appearance || "secondary"}
                icon={<AlertCircle className="size-4 shrink-0" />}
                title={alertBanner.title}
                action={
                  alertBanner.ctaText
                    ? { label: alertBanner.ctaText, onClick: alertBanner.onCtaClick || (() => {}) }
                    : undefined
                }
                onClose={alertBanner.showClose !== false ? () => setAlertDismissed(true) : undefined}
              />
            )
            return (
              <div className="p-3 group-data-[collapsible=icon]:p-2 pt-0 group-data-[collapsible=icon]:pt-0">
                {isCollapsed ? (
                  <Popover>
                    <PopoverTrigger
                      openOnHover
                      delay={100}
                      nativeButton={false}
                      aria-label={alertBanner.title}
                      render={banner(true)}
                    />
                    <PopoverContent
                      side="right"
                      align="center"
                      sideOffset={12}
                      className="w-72 gap-0 overflow-hidden rounded-xl p-0"
                    >
                      {banner(false)}
                    </PopoverContent>
                  </Popover>
                ) : (
                  banner(false)
                )}
              </div>
            )
          })()}

          {/* Bottom link — under the banner, the last thing in the sidebar.
              A destination, not an action: shaped like a nav row (left-aligned,
              chevron = "goes to another page"), on the dark emphasis surface so
              it stands out from the plain nav items without competing with the
              page's own green CTA. Collapsed: an icon tile the size and inset
              of the nav buttons above (40px, 12px in), so its icon sits on
              the same centre line; a 32px tile 8px in sat 8px to the left. */}
          {bottomCta && (
            <div className="px-3 pb-3 group-data-[collapsible=icon]:pb-2">
              <Link
                href={bottomCta.href}
                aria-label={isCollapsed ? bottomCta.label : undefined}
                title={isCollapsed ? bottomCta.label : undefined}
                onClick={() => setOpenMobile(false)}
                className="ink press-subtle relative flex h-10 w-full items-center gap-2.5 rounded-lg bg-cta-emphasis px-3 text-sm font-medium text-cta-emphasis-foreground outline-none transition-interactive hover:bg-cta-emphasis-hover focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
              >
                <bottomCta.icon className="size-4 shrink-0" />
                <span className="truncate group-data-[collapsible=icon]:hidden">{bottomCta.label}</span>
                <ChevronRight className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
