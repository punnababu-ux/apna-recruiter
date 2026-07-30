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
    </div>
  )
}
