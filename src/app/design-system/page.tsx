import * as React from "react"
import Link from "next/link"
import { Palette, Type, Maximize2, Sparkles, Zap, CheckSquare, Eye, Navigation, MessageSquare, Bell, TableIcon, ArrowRight, ShieldCheck } from "@apna/design-system"

import { ApnaLogo, Badge, Button } from "@apna/design-system"

export default function DesignSystemOverviewPage() {
  const categories = [
    {
      title: "1. Actions",
      href: "/design-system/components/actions",
      icon: Zap,
      desc: "Button, ButtonGroup, BackButton, Toggle, ToggleGroup",
      count: "5 Components",
      badge: "Core",
    },
    {
      title: "2. Form & Inputs",
      href: "/design-system/components/inputs",
      icon: CheckSquare,
      desc: "Field, Label, Input, Textarea, Checkbox, RadioGroup, Switch, Select",
      count: "8 Components",
      badge: "Form",
    },
    {
      title: "3. Data Display",
      href: "/design-system/components/display",
      icon: Eye,
      desc: "Avatar, Badge, Skeleton, Spinner, Separator, Empty",
      count: "6 Components",
      badge: "Display",
    },
    {
      title: "4. Navigation",
      href: "/design-system/components/navigation",
      icon: Navigation,
      desc: "Tabs, ChipTabs, Breadcrumb, Sidebar, ReusableSidebar",
      count: "5 Components",
      badge: "Nav",
    },
    {
      title: "5. Overlays & Dialogs",
      href: "/design-system/components/overlays",
      icon: MessageSquare,
      desc: "Tooltip, Popover, DropdownMenu, Dialog, AlertDialog, Sheet",
      count: "6 Components",
      badge: "Overlays",
    },
    {
      title: "6. Feedback & Status",
      href: "/design-system/components/feedback",
      icon: Bell,
      desc: "Alert, Sonner (Toast)",
      count: "2 Components",
      badge: "Status",
    },
    {
      title: "7. Data & Layout",
      href: "/design-system/components/data-layout",
      icon: TableIcon,
      desc: "Table, Accordion, Brand Logos",
      count: "4 Components",
      badge: "Layout",
    },
  ]

  const foundations = [
    { title: "Colors & Tokens", href: "/design-system/foundations/colors", icon: Palette, desc: "Semantic roles & primitive ramps" },
    { title: "Typography", href: "/design-system/foundations/typography", icon: Type, desc: "Type scale & heading roles" },
    { title: "Spacing Scale", href: "/design-system/foundations/spacing", icon: Maximize2, desc: "T-shirt & context steps" },
    { title: "Radius & Motion", href: "/design-system/foundations/radius", icon: Sparkles, desc: "Durations & corner radiuses" },
  ]

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="default">v1.0 Production Ready</Badge>
              <Badge variant="outline" className="gap-1 font-mono">
                <ShieldCheck className="size-3 text-emerald-500" />
                Ant / M3 Structure
              </Badge>
            </div>

            <h1 className="text-3xl font-bold font-heading text-foreground tracking-tight flex items-center gap-3">
              <ApnaLogo className="h-9 w-auto" />
              Design System
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Structured component library built on Base UI primitives, strict semantic tokens, and atomic composition. Organized cleanly into 7 functional categories.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="default"
              size="default"
              render={
                <Link href="/design-system/components/actions">
                  Browse Components
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              }
            />
          </div>
        </div>
      </div>

      {/* Component Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground font-heading">
            Component Taxonomy (7 Categories)
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            36+ Components
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-lg border border-border/80 bg-muted/60 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                    <Badge variant="outline" className="text-3xs font-mono">
                      {cat.count}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                  View Components <ArrowRight className="ml-1 size-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Design System Foundations */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground font-heading">
          Foundations & Tokens
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foundations.map((f) => {
            const Icon = f.icon
            return (
              <Link
                key={f.href}
                href={f.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-accent/40"
              >
                <div className="rounded-lg border border-border bg-muted p-2 text-muted-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">{f.title}</span>
                  <span className="text-3xs text-muted-foreground">{f.desc}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
