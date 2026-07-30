"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Palette,
  Type,
  Maximize2,
  Sparkles,
  Shapes,
  Zap,
  CheckSquare,
  Eye,
  Navigation,
  MessageSquare,
  Bell,
  Table as TableIcon,
  BookOpen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  ApnaLogo,
  Badge,
} from "@apna/design-system"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const DOCS_NAV: NavGroup[] = [
  {
    title: "Foundations",
    items: [
      { href: "/design-system/foundations/colors", label: "Colors & Tokens", icon: Palette },
      { href: "/design-system/foundations/typography", label: "Typography", icon: Type },
      { href: "/design-system/foundations/spacing", label: "Spacing Scale", icon: Maximize2 },
      { href: "/design-system/foundations/radius", label: "Radius & Motion", icon: Sparkles },
      { href: "/design-system/foundations/icons", label: "Icons & Symbols", icon: Shapes },
    ],
  },
  {
    title: "Components (M3 / Ant)",
    items: [
      { href: "/design-system/components/actions", label: "1. Actions", icon: Zap },
      { href: "/design-system/components/inputs", label: "2. Form & Inputs", icon: CheckSquare },
      { href: "/design-system/components/display", label: "3. Data Display", icon: Eye },
      { href: "/design-system/components/navigation", label: "4. Navigation", icon: Navigation },
      { href: "/design-system/components/overlays", label: "5. Overlays & Dialogs", icon: MessageSquare },
      { href: "/design-system/components/feedback", label: "6. Feedback & Status", icon: Bell },
      { href: "/design-system/components/data-layout", label: "7. Data & Layout", icon: TableIcon },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border/60 px-4 py-3">
        <Link href="/design-system" className="flex items-center gap-3">
          <ApnaLogo className="h-8 w-auto shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-foreground">
              Poneglyph DS
            </span>
            <span className="text-2xs text-muted-foreground font-mono">
              v1.0 · M3 Taxonomy
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link href="/design-system">
                    <BookOpen className="size-4 text-primary" />
                    <span>Documentation Overview</span>
                  </Link>
                }
                isActive={pathname === "/design-system"}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {DOCS_NAV.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            <SidebarGroupLabel className="px-3 text-2xs font-bold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={
                        <Link href={item.href} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Icon className="size-4 text-muted-foreground" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge ? (
                            <Badge variant="info" className="text-3xs px-1 py-0">
                              {item.badge}
                            </Badge>
                          ) : null}
                        </Link>
                      }
                      isActive={isActive}
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
