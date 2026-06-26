"use client"

import * as React from "react"
import {
  Briefcase,
  CreditCard,
  HelpCircle,
  Info,
  Laptop,
  MessageSquare,
  PanelLeft,
  Phone,
  Plus,
  Settings,
  Tablet,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OnlyRoundsLogoMark } from "@/components/ui/logo-onlyrounds"
import { ReusableSidebar, type SidebarWorkspace, type SidebarNavItem } from "@/components/ui/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

// Predefined Mock Workspaces for both products
const ONLYROUNDS_WORKSPACES: SidebarWorkspace[] = [
  { id: "or-gamma", name: "Gamma Workspace", fallbackLetter: "G" },
  { id: "or-talentpass", name: "Apna TalentPass", fallbackLetter: "A", logoUrl: "/vercel.svg" },
  { id: "or-beta", name: "Beta Design System", fallbackLetter: "B" },
]

const APNAHIRE_WORKSPACES: SidebarWorkspace[] = [
  { id: "ah-corp", name: "Apna Corp Workspace", subtext: "Enterprise Plan", fallbackLetter: "A", logoUrl: "/vercel.svg" },
  { id: "ah-tech", name: "Beta Tech Group", subtext: "Growth Tier", fallbackLetter: "B" },
]

// Predefined Navigation for both products
const ONLYROUNDS_NAV: SidebarNavItem[] = [
  {
    href: "/onlyrounds/jobs",
    label: "Jobs",
    icon: Briefcase,
    items: [
      { href: "/onlyrounds/jobs", label: "All Jobs" },
      { href: "/onlyrounds/jobs/new", label: "Create Job" },
    ],
  },
  { href: "/onlyrounds/clients", label: "Clients", icon: Users },
  { href: "/onlyrounds/credits", label: "Credits", icon: CreditCard },
]

const APNAHIRE_NAV: SidebarNavItem[] = [
  {
    label: "Talent Sourcing",
    icon: Users,
    items: [
      { href: "/onlyrounds/clients", label: "Active Pools" },
      { href: "/onlyrounds/jobs", label: "Talent Search" },
    ],
  },
  { href: "/onlyrounds/jobs", label: "Assessments", icon: Briefcase },
  { href: "/onlyrounds/credits", label: "Billing & Invoices", icon: CreditCard },
]

export default function SidebarShowcasePage() {
  const [productMode, setProductMode] = React.useState<"onlyrounds" | "apnahire">("onlyrounds")
  const [viewportMode, setViewportMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop")

  // State overrides for the dynamic playground configurations
  const [activeORWorkspace, setActiveORWorkspace] = React.useState<string>(ONLYROUNDS_WORKSPACES[0].id)
  const [activeAHWorkspace, setActiveAHWorkspace] = React.useState<string>(APNAHIRE_WORKSPACES[0].id)

  const [showAlert, setShowAlert] = React.useState(true)
  const [customAlertTitle, setCustomAlertTitle] = React.useState("Upgrade Account")
  const [customAlertDesc, setCustomAlertDesc] = React.useState("Get access to advanced matching filters.")

  // Sync state if product switcher is used
  React.useEffect(() => {
    if (productMode === "onlyrounds") {
      setCustomAlertTitle("Upgrade Account")
      setCustomAlertDesc("Get access to advanced matching filters.")
    } else {
      setCustomAlertTitle("Verify Identity")
      setCustomAlertDesc("Verify your company tax status to post jobs.")
    }
  }, [productMode])

  return (
    <div className="flex-1 space-y-8 p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Apna Hire Core Component
          </Badge>
          <span className="text-2xs text-muted-foreground">Version 2.5.0</span>
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Recruiter Sidebar Specs & Showcase
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl">
          Demonstrating a highly flexible, props-driven `ReusableSidebar` component. The exact same component is rendered in two different product shells (OnlyRounds vs. Apna Hire) to ensure layout consistency.
        </p>
      </div>

      {/* Main Grid: Interactive Playground + Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Playground (Mock Device Frame) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Product Switcher */}
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Product Configuration</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={productMode === "onlyrounds" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProductMode("onlyrounds")}
                  className="cursor-pointer"
                >
                  OnlyRounds AI
                </Button>
                <Button
                  variant={productMode === "apnahire" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProductMode("apnahire")}
                  className="cursor-pointer"
                >
                  Apna Hire Recruiter
                </Button>
              </div>
            </div>

            {/* Viewport Switcher */}
            <div className="flex flex-col gap-1.5 items-start sm:items-end">
              <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Simulated Viewport</span>
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border">
                <button
                  onClick={() => setViewportMode("desktop")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    viewportMode === "desktop"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Laptop className="size-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setViewportMode("tablet")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    viewportMode === "tablet"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Tablet className="size-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setViewportMode("mobile")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    viewportMode === "mobile"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Phone className="size-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Frame */}
          <div 
            className="border border-border bg-muted/30 rounded-xl overflow-hidden shadow-md flex items-stretch justify-center transition-all duration-300 relative"
            style={{
              height: "650px",
              width: "100%",
            }}
          >
            {/* Device Container */}
            <div 
              className={`bg-background transition-all duration-300 flex border border-border/80 shadow-2xl relative overflow-hidden ${
                viewportMode === "desktop" 
                  ? "w-full h-full rounded-none" 
                  : viewportMode === "tablet" 
                    ? "w-[768px] max-w-full h-[600px] my-auto rounded-xl" 
                    : "w-[360px] max-w-full h-[580px] my-auto rounded-2xl"
              }`}
            >
              <SidebarProvider defaultOpen={viewportMode === "desktop"}>
                {/* Dynamically Configure and Render ReusableSidebar */}
                {productMode === "onlyrounds" ? (
                  <ReusableSidebar
                    brand={{
                      name: "OnlyRound AI",
                      logo: <OnlyRoundsLogoMark className="-ml-1 size-7!" />,
                    }}
                    workspaces={ONLYROUNDS_WORKSPACES}
                    activeWorkspaceId={activeORWorkspace}
                    onWorkspaceChange={(w) => setActiveORWorkspace(w.id)}
                    navItems={ONLYROUNDS_NAV}
                    footerItems={[
                      { href: "/onlyrounds/settings", label: "Settings", icon: Settings },
                      { href: "/onlyrounds/help", label: "Help", icon: HelpCircle },
                    ]}
                  />
                ) : (
                  <ReusableSidebar
                    brand={{
                      name: "Apna Hire",
                      logo: <Users className="text-primary size-5" />,
                    }}
                    workspaces={APNAHIRE_WORKSPACES}
                    activeWorkspaceId={activeAHWorkspace}
                    onWorkspaceChange={(w) => setActiveAHWorkspace(w.id)}
                    navItems={APNAHIRE_NAV}
                    bottomCta={{
                      label: "Invite Recruiter",
                      icon: Plus,
                      href: "/onlyrounds/settings",
                    }}
                    alertBanner={showAlert ? {
                      id: "showcase-ah-alert",
                      title: customAlertTitle,
                      description: customAlertDesc,
                      ctaText: "Verify",
                    } : undefined}
                    footerItems={[
                      { href: "/onlyrounds/settings", label: "Settings", icon: Settings },
                      { href: "/onlyrounds/help", label: "Support", icon: HelpCircle },
                    ]}
                  />
                )}

                {/* Simulated Content Area */}
                <div className="flex-1 bg-muted/20 pl-[16rem] group-data-[collapsible=icon]:pl-[4rem] transition-[padding] duration-200 w-full h-full" /* token-lint-ignore: custom width padding for simulated sidebar */>
                  {/* Top Bar */}
                  <div className="h-14 border-b border-border bg-card flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-5 rounded bg-primary/10 flex items-center justify-center">
                        <PanelLeft className="size-3 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {productMode === "onlyrounds" ? "OnlyRounds App" : "Apna Hire Dashboard"}
                      </span>
                    </div>
                    <div className="size-7 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-muted-foreground">
                      R
                    </div>
                  </div>
                  {/* Content Canvas */}
                  <div className="p-6 space-y-4 text-left">
                    <h3 className="text-sm font-semibold text-foreground">
                      {productMode === "onlyrounds" ? "Evaluation Pipeline" : "Recruitment Overview"}
                    </h3>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-accent/25 rounded" />
                      <div className="h-4 w-[90%] bg-accent/25 rounded" /* token-lint-ignore: custom percentage widths for simulated placeholder lines */ />
                      <div className="h-4 w-[60%] bg-accent/25 rounded" /* token-lint-ignore: custom percentage widths for simulated placeholder lines */ />
                    </div>
                  </div>
                </div>
              </SidebarProvider>
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Specs */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Controls Panel */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="size-4 text-muted-foreground" />
              Configure Active Preset
            </h3>
            
            {/* Custom Banner Text */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-foreground">Custom Alert Content</div>
              <div className="flex items-center gap-2">
                <input
                  id="pg-show-alert"
                  type="checkbox"
                  checked={showAlert}
                  onChange={(e) => setShowAlert(e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="pg-show-alert" className="text-xs text-muted-foreground cursor-pointer select-none">
                  Display Dismissible Alert Banner
                </label>
              </div>

              {showAlert && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label htmlFor="alert-title-custom" className="text-2xs text-muted-foreground">Title</label>
                    <input
                      id="alert-title-custom"
                      type="text"
                      value={customAlertTitle}
                      onChange={(e) => setCustomAlertTitle(e.target.value)}
                      className="w-full h-8 px-2 text-xs border border-border rounded-md bg-background focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="alert-desc-custom" className="text-2xs text-muted-foreground">Description</label>
                    <textarea
                      id="alert-desc-custom"
                      rows={2}
                      value={customAlertDesc}
                      onChange={(e) => setCustomAlertDesc(e.target.value)}
                      className="w-full p-2 text-xs border border-border rounded-md bg-background resize-none focus:outline-hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technical specifications panel */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Info className="size-4 text-muted-foreground" />
              Product-Agnostic Specifications
            </h3>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground block mb-0.5">Abstract API Design</span>
                <p>The sidebar makes zero assumptions about links, logos, active routes, or branding. Everything is passed down dynamically via props, allowing it to support multiple applications built on the same core tokens.</p>
              </div>
              <div>
                <span className="font-semibold text-foreground block mb-0.5">Flexible Workspace Selector</span>
                <p>Configured using an array of items. Displays checkmarks on active selections, fallback monogram circles for workspaces without custom brand logos, and subtitle tags for membership tier indicators.</p>
              </div>
              <div>
                <span className="font-semibold text-foreground block mb-0.5">Responsive sheet rendering</span>
                <p>On screen sizes below <code className="bg-muted px-1.5 py-0.5 rounded text-2xs">768px</code>, the sidebar transitions into a collapsible sheet drawer accessible via a header trigger icon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing & Token Table */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs text-left space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="size-5 text-muted-foreground" />
          Component Token Specs
        </h2>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted text-muted-foreground border-b border-border font-medium">
              <tr>
                <th className="px-4 py-2">Role/Token Type</th>
                <th className="px-4 py-2">Token Name / CSS class</th>
                <th className="px-4 py-2">Usage Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-3 font-semibold text-foreground">Background Color</td>
                <td className="px-4 py-3 font-mono text-2xs">bg-sidebar</td>
                <td className="px-4 py-3">Sidebar background color (points to card/neutral surface)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-foreground">Border Utility</td>
                <td className="px-4 py-3 font-mono text-2xs">border-sidebar-border</td>
                <td className="px-4 py-3">Dividers, header lines, and container outlines</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-foreground">Workspace Selector Height</td>
                <td className="px-4 py-3 font-mono text-2xs">h-12</td>
                <td className="px-4 py-3">Allows workspace selector to fit both logo, title and subtext</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-foreground">Alert Banner Tint</td>
                <td className="px-4 py-3 font-mono text-2xs">bg-warning-subtle</td>
                <td className="px-4 py-3">Subtle warning alert background using semantic palettes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-foreground">Nesting Spacing</td>
                <td className="px-4 py-3 font-mono text-2xs">mx-3.5 px-2.5</td>
                <td className="px-4 py-3">Predefined alignment indent matching sidebar grid guidelines</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
