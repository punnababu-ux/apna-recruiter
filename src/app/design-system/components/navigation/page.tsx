"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ChipTabs,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Badge,
} from "@apna/design-system"

export default function NavigationComponentsPage() {
  const [activeChip, setActiveChip] = React.useState("active")

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="warning">Category 4</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          4. Navigation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tabs, chip pill tabs, breadcrumb trails, and sidebars.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Tabs, ChipTabs, Breadcrumb, Sidebar } from "@apna/design-system"'}</code>
      </div>

      {/* Breadcrumb */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Breadcrumb Trail
        </h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/apnahire/jobs">Jobs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Frontend Engineer</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Candidates</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Chip Tabs */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Chip / Pill Tabs
        </h2>
        <ChipTabs
          items={[
            { value: "active", label: "Active Jobs", count: 12 },
            { value: "draft", label: "Drafts", count: 4 },
            { value: "closed", label: "Closed", count: 28 },
          ]}
          value={activeChip}
          onValueChange={setActiveChip}
        />
      </div>

      {/* Standard Tabs */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Standard View Tabs
        </h2>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Candidates</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="hired">Hired</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="p-4 text-xs text-muted-foreground">
            Displaying all 142 candidates across pipeline stages.
          </TabsContent>
          <TabsContent value="shortlisted" className="p-4 text-xs text-muted-foreground">
            Displaying 18 shortlisted candidates.
          </TabsContent>
          <TabsContent value="hired" className="p-4 text-xs text-muted-foreground">
            Displaying 4 hired candidates.
          </TabsContent>
        </Tabs>
      </div>

      {/* Inverted Black Tabs */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Inverted (Black Pill) Tabs
        </h2>
        <p className="text-xs text-muted-foreground">
          Use <code className="font-mono bg-muted px-1 rounded">variant=&quot;inverted&quot;</code> on <code className="font-mono bg-muted px-1 rounded">&lt;TabsList&gt;</code> for directory surfaces and table headers like the Jobs Directory page.
        </p>
        <Tabs defaultValue="all">
          <TabsList variant="inverted">
            <TabsTrigger value="all">All (266)</TabsTrigger>
            <TabsTrigger value="active">Active (166)</TabsTrigger>
            <TabsTrigger value="published">Published (4)</TabsTrigger>
            <TabsTrigger value="draft">Drafts (94)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Persistent App Sidebar */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading flex items-center gap-2">
              App Sidebar & ReusableSidebar Shell
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Configurable 240px wide persistent sidebar shell with workspace switcher, grouped routes, sub-navigation, and alert banners.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/apnahire/sidebar-specs/interactive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              Open Full-Screen Playground ↗
            </a>
            <a
              href="/apnahire/sidebar-specs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              View Spec Sheet ↗
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden bg-background">
          <div className="bg-muted/30 border-b border-border p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
            <span>Embedded Interactive Viewport</span>
            <span className="font-mono text-2xs font-normal">Collapsible: Icon mode</span>
          </div>

          <div className="h-120 relative overflow-hidden flex border-t border-border/40 bg-card">
            {/* Embedded Mini Sidebar */}
            <div className="w-64 shrink-0 border-r border-border bg-sidebar h-full flex flex-col justify-between p-3 space-y-4">
              {/* Header / Brand */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <span className="font-bold font-heading text-sm text-foreground">Apna Hire</span>
                  <Badge variant="info" className="ml-auto text-3xs px-1 py-0">v2.0</Badge>
                </div>

                {/* Workspace Switcher */}
                <div className="rounded-lg border border-border bg-background p-2 flex items-center justify-between text-xs cursor-pointer hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="size-5 rounded bg-primary text-white text-3xs font-bold flex items-center justify-center shrink-0">R</div>
                    <div className="truncate">
                      <p className="font-semibold text-foreground text-xs leading-none">Rohini Enterprises</p>
                      <p className="text-3xs text-muted-foreground mt-0.5">Company Account</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 space-y-1 overflow-y-auto">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md bg-accent text-accent-foreground font-medium text-xs">
                  <span className="size-4 shrink-0">💼</span>
                  <span>Jobs</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground text-xs cursor-pointer">
                    <span className="flex items-center gap-2.5">
                      <span className="size-4 shrink-0">🗄️</span>
                      <span>Database</span>
                    </span>
                    <span className="text-3xs text-muted-foreground">▾</span>
                  </div>
                  <div className="pl-8 space-y-1 text-2xs text-muted-foreground">
                    <p className="py-1 px-2 rounded hover:bg-muted cursor-pointer">Search Candidates</p>
                    <p className="py-1 px-2 rounded hover:bg-muted cursor-pointer">Saved Searches</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground text-xs cursor-pointer">
                  <span className="size-4 shrink-0">📊</span>
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground text-xs cursor-pointer">
                  <span className="size-4 shrink-0">💳</span>
                  <span>Credits</span>
                </div>
              </div>

              {/* Alert Banner */}
              <div className="rounded-lg border border-warning/30 bg-warning-subtle p-2.5 text-2xs space-y-1">
                <p className="font-semibold text-warning-foreground">Verify Identity</p>
                <p className="text-muted-foreground">Complete recruiter verification to post active jobs.</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 bg-muted/20 flex flex-col justify-center items-center text-center space-y-2">
              <p className="text-sm font-semibold text-foreground">Interactive Sidebar Preview</p>
              <p className="text-xs text-muted-foreground max-w-sm">
                The sidebar is fully responsive, theme-aware, and supports smooth collapse animations, workspace switching, and popover submenus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
