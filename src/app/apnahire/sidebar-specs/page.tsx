"use client"

import * as React from "react"
import { AlertCircle, ChevronDown, ChevronsUpDown, FileCode, Layout, LayoutGrid, Monitor, PanelLeft, Settings, Smartphone, Sparkles, X } from "@apna/design-system"
import { Badge, Button } from "@apna/design-system"
import Link from "next/link"

export default function SidebarSpecsPage() {
  return (
    <div className="flex-1 space-y-8 p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-300 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Apna Hire Core Component
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">v2.5.0 (Static Spec Sheet)</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Recruiter Sidebar Blueprint & Layout Rules
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl text-left">
            Complete static specifications of the `ReusableSidebar` component. This document outlines the geometric alignment rules, state transition guarantees, and layout possibilities across both desktop and mobile viewports.
          </p>
        </div>
        
        <Link href="/apnahire/sidebar-specs/interactive" className="shrink-0">
          <Button className="gap-2 cursor-pointer shadow-xs">
            <Sparkles className="size-4" />
            Open Interactive Showcase
          </Button>
        </Link>
      </div>

      {/* Grid: Component Layout Mockups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Mockups */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Desktop State Mockups (Expanded vs Collapsed) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Monitor className="size-5 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Desktop Layout States
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-muted/10 p-6 rounded-xl border border-border/80">
              
              {/* Expanded Sidebar Mockup */}
              <div className="md:col-span-7 flex flex-col gap-2 text-left">
                <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  1. Expanded View (w-64 / 256px)
                </span>
                
                <div className="flex flex-col h-[400px] w-64 bg-card border border-border rounded-lg shadow-sm overflow-hidden text-xs text-foreground select-none" /* token-lint-ignore: mock layout dimensions */>
                  {/* Brand Row */}
                  <div className="flex h-14 items-center gap-3 border-b border-border/40 px-3">
                    <div className="size-10 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm shrink-0">
                      apna
                    </div>
                    <span className="text-sm font-bold text-foreground font-heading">
                      apna <span className="text-primary font-bold">Hire</span>
                    </span>
                  </div>
                  
                  {/* Workspace Selector */}
                  <div className="p-3">
                    <div className="flex h-12 w-full items-center justify-between rounded-lg border border-border bg-background px-2.5 font-medium shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="size-7 rounded bg-primary/10 flex items-center justify-center font-bold text-primary text-2xs">
                          RE
                        </div>
                        <div className="flex flex-col leading-tight text-left">
                          <span className="font-semibold text-2xs">Rohini Enterprises</span>
                          <span className="text-2xs text-muted-foreground">Company</span>
                        </div>
                      </div>
                      <ChevronsUpDown className="size-3 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Nav list */}
                  <div className="flex-1 px-3 py-2 space-y-1">
                    <div className="flex h-9 items-center gap-3 rounded-md bg-accent px-2.5 text-accent-foreground font-semibold">
                      <LayoutGrid className="size-4 shrink-0 text-primary" />
                      <span>Jobs</span>
                    </div>
                    <div className="flex h-9 items-center justify-between rounded-md px-2.5 text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                      <div className="flex items-center gap-3">
                        <Layout className="size-4 shrink-0" />
                        <span>Database</span>
                      </div>
                      <ChevronDown className="size-3" />
                    </div>
                    <div className="flex h-9 items-center gap-3 rounded-md px-2.5 text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                      <Settings className="size-4 shrink-0" />
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Alert Banner */}
                  <div className="p-3">
                    <div className="relative rounded-lg border border-warning/20 bg-warning-subtle p-2.5 text-warning-foreground shadow-2xs">
                      <div className="flex gap-2">
                        <AlertCircle className="size-3.5 shrink-0 text-warning mt-0.5" />
                        <div className="space-y-0.5 text-2xs leading-tight text-left">
                          <p className="font-semibold text-warning-foreground">Verify Identity</p>
                          <p className="text-muted-foreground/80">Verify tax status to post.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsed Sidebar Mockup */}
              <div className="md:col-span-5 flex flex-col gap-2 text-left">
                <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  2. Collapsed View (w-16 / 64px)
                </span>
                
                <div className="flex flex-col h-[400px] w-16 bg-card border border-border rounded-lg shadow-sm overflow-hidden text-xs text-foreground items-center select-none" /* token-lint-ignore: mock layout dimensions */>
                  {/* Brand Row */}
                  <div className="flex h-14 items-center justify-center border-b border-border/40 w-full">
                    <div className="size-10 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm shrink-0">
                      apna
                    </div>
                  </div>
                  
                  {/* Workspace Selector */}
                  <div className="py-3 w-full flex justify-center">
                    <div className="flex h-12 w-10 items-center justify-center rounded-lg border border-border bg-background shadow-2xs">
                      <div className="size-7 rounded bg-primary/10 flex items-center justify-center font-bold text-primary text-2xs shrink-0">
                        RE
                      </div>
                    </div>
                  </div>
                  
                  {/* Nav list */}
                  <div className="flex-1 py-2 space-y-1 w-full flex flex-col items-center">
                    <div className="flex h-9 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <LayoutGrid className="size-4 shrink-0 text-primary" />
                    </div>
                    <div className="flex h-9 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                      <Layout className="size-4 shrink-0" />
                    </div>
                    <div className="flex h-9 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                      <Settings className="size-4 shrink-0" />
                    </div>
                  </div>

                  {/* Alert Banner (Collapsed) */}
                  <div className="pb-3 w-full flex justify-center">
                    <div className="size-9 rounded-lg border border-warning/20 bg-warning-subtle flex items-center justify-center text-warning shadow-2xs">
                      <AlertCircle className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Section 2: Mobile View Layout */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone className="size-5 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Mobile Layout & Drawer Overlay
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 bg-muted/10 p-6 rounded-xl border border-border/80 items-center justify-center">
              {/* Mobile Phone Mockup */}
              <div className="relative border-4 border-muted-foreground/30 bg-background rounded-2xl w-[280px] h-[450px] shadow-lg overflow-hidden flex flex-col" /* token-lint-ignore: mock phone screen dimensions */>
                {/* Status Bar */}
                <div className="h-5 bg-muted/30 px-3 flex items-center justify-between text-2xs text-muted-foreground font-mono">
                  <span>10:42 AM</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <div className="w-4 h-2 rounded-xs border border-muted-foreground/30 bg-muted-foreground/30" />
                  </div>
                </div>
                
                {/* App Header */}
                <div className="h-10 border-b border-border bg-card flex items-center px-2 justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="size-6 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-3xs">
                      apna
                    </div>
                    <span className="text-2xs font-semibold text-foreground">Apna Hire Dashboard</span>
                  </div>
                  {/* Floating Toggle Trigger */}
                  <div className="size-6 rounded bg-muted flex items-center justify-center border border-border">
                    <PanelLeft className="size-3 text-primary" />
                  </div>
                </div>
                
                {/* Screen Content */}
                <div className="flex-1 p-3 bg-muted/10 space-y-2 text-left">
                  <span className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider block">Screen View</span>
                  <div className="h-3 w-3/4 bg-accent/20 rounded" />
                  <div className="h-3 w-1/2 bg-accent/20 rounded" />
                  <div className="h-24 w-full border border-border/60 bg-card rounded-md p-2 space-y-1.5">
                    <div className="h-2 w-full bg-accent/15 rounded" />
                    <div className="h-2 w-5/6 bg-accent/15 rounded" />
                    <div className="h-2 w-2/3 bg-accent/15 rounded" />
                  </div>
                </div>

                {/* Overlaid Mobile Sheet (Simulated open drawer) */}
                <div className="absolute inset-y-0 left-0 w-[210px] bg-card border-r border-border shadow-2xl flex flex-col text-xs animate-in slide-in-from-left duration-300" /* token-lint-ignore: mock mobile drawer width */>
                  {/* Brand Row */}
                  <div className="flex h-12 items-center justify-between border-b border-border/40 px-2.5">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-xs shrink-0">
                        apna
                      </div>
                      <span className="text-xs font-bold text-foreground font-heading">apna <span className="text-primary font-bold">Hire</span></span>
                    </div>
                    <X className="size-3 text-muted-foreground" />
                  </div>
                  
                  {/* Workspace Selector */}
                  <div className="p-2">
                    <div className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-2 font-medium shadow-2xs">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded bg-primary/10 flex items-center justify-center font-bold text-primary text-2xs">RE</div>
                        <span className="font-semibold text-2xs truncate max-w-[120px]" /* token-lint-ignore: mock layout text constraint */>Rohini Enterprises</span>
                      </div>
                      <ChevronsUpDown className="size-2.5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="flex-1 px-2 py-1 space-y-1 text-left">
                    <div className="flex h-8 items-center gap-2 rounded bg-accent px-2 text-accent-foreground font-semibold">
                      <LayoutGrid className="size-3.5 shrink-0 text-primary" />
                      <span>Jobs</span>
                    </div>
                    {/* Inline Accordion Expanded state on mobile */}
                    <div className="space-y-0.5">
                      <div className="flex h-8 items-center justify-between rounded px-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Layout className="size-3.5 shrink-0" />
                          <span>Database</span>
                        </div>
                        <ChevronDown className="size-2.5 rotate-180" />
                      </div>
                      <div className="pl-6 border-l border-border/60 ml-3.5 py-0.5 space-y-1">
                        <div className="h-6 flex items-center text-primary font-medium">Search Candidates</div>
                        <div className="h-6 flex items-center text-muted-foreground">Saved Searches</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory pointers */}
              <div className="flex-1 space-y-3.5 text-left">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile Sheet Constraints</h4>
                  <p className="text-sm text-foreground">
                    On screens below 768px, the sidebar is rendered in a responsive Sheet drawer that slides in from the left.
                  </p>
                </div>
                <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-4">
                  <li><strong className="text-foreground">Force-Expanded</strong>: The sidebar ignores the collapsed setting on mobile, ensuring full labels and text remain readable in the sheet.</li>
                  <li><strong className="text-foreground">Inline Expansion</strong>: Sub-item categories expand dynamically as accordions instead of opening right-aligned popover menus.</li>
                  <li><strong className="text-foreground">Responsive Workspace Popover</strong>: Switches its anchor point to open on the bottom centered (`side=&quot;bottom&quot; align=&quot;center&quot;`) to prevent clipping.</li>
                  <li><strong className="text-foreground">Instant Auto-Collapse</strong>: Clicking any workspace or navigation route calls `setOpenMobile(false)` to automatically slide the drawer shut.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Code Contract & Alignment Guidelines */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Rules & Layout Contracts Panel */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
              <FileCode className="size-4 text-primary" />
              Sidebar Layout Rules
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <h4 className="font-bold text-foreground uppercase tracking-wider text-2xs">1. Width & Spacing Contract</h4>
                <p className="text-muted-foreground leading-normal">
                  - Expanded: <code className="text-primary font-mono bg-muted px-1 py-0.5 rounded">256px</code> width.
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Collapsed: <code className="text-primary font-mono bg-muted px-1 py-0.5 rounded">64px</code> width.
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Sidebar Header Padding: Locked at <code className="font-mono bg-muted px-1 py-0.5 rounded">px-3</code> (12px left edge offset).
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-foreground uppercase tracking-wider text-2xs">2. Horizontal Alignment Guarantees</h4>
                <p className="text-muted-foreground leading-normal">
                  - Brand Logo is sized to <code className="font-mono bg-muted px-1 py-0.5 rounded">40x40px</code> (`size-10`).
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Workspace button is sized to <code className="font-mono bg-muted px-1 py-0.5 rounded">48px</code> height (`h-12`) with `px-2.5` padding (10px).
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Centerline calculation: <code className="font-mono text-foreground">12px (offset) + 10px (padding) + 10px (half-logo width) = 32px</code>.
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Transition rule: The vertical centerline remains fixed at exactly <strong className="text-foreground">32px</strong> in both states to eliminate layout shifts or jumps.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-foreground uppercase tracking-wider text-2xs">3. Category Sub-menu Rules</h4>
                <p className="text-muted-foreground leading-normal">
                  - Desktop Collapsed: Categories with children open on hover/click as a <code className="text-primary font-mono bg-muted px-1 py-0.5 rounded">DropdownMenu</code> to the right (`side=&quot;right&quot;`).
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Desktop Expanded: Sublist items expand inline vertically with a smooth dropdown chevron.
                </p>
                <p className="text-muted-foreground leading-normal">
                  - Parent Highlight: When any sub-item is active, the parent menu button is automatically styled as active (highlight state).
                </p>
              </div>
            </div>
          </div>
          
          {/* Token Contract Callout */}
          <div className="rounded-xl border border-warning/20 bg-warning-subtle p-5 shadow-xs space-y-2 text-warning-foreground">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              💡 Token Enforcement Rules
            </h4>
            <p className="text-xs text-muted-foreground leading-normal">
              Any modification to this sidebar component is strictly gated by the project token linter (<code className="font-mono bg-background/50 px-1 rounded text-foreground">npm run lint:tokens</code>).
            </p>
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1 mt-2">
              <li>No arbitrary sizes or spacing (e.g. <code className="font-mono">p-[13px]</code>) allowed outside `tokens/*.css`.</li>
              <li>Colors must only be mapped to intent variables (<code className="font-mono text-foreground">var(--primary)</code>, <code className="font-mono text-foreground">bg-card</code>).</li>
              <li>Typography uses semantic scale presets (<code className="font-mono">font-heading</code>, <code className="font-mono">text-xs</code>).</li>
            </ul>
          </div>
          
        </div>
      </div>

      {/* Visual QA Verification Proofs Section */}
      <div className="border-t border-border pt-8 space-y-6">
        <div className="text-left space-y-1.5">
          <Badge variant="outline" className="border-primary/20 text-primary">
            Verification Checkpoints
          </Badge>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Visual QA Build Verification
          </h2>
          <p className="text-sm text-muted-foreground">
            The following static screenshots are captured directly from visual regression test builds to document the verified geometric properties of the sidebar.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex flex-col gap-2.5 text-left bg-card border border-border p-3 rounded-xl shadow-2xs">
            <span className="text-xs font-bold text-foreground">1. Expanded Centerline (32px)</span>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border/60 bg-muted/10 relative" /* token-lint-ignore: screenshot preview layout */>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/specs-logo-expanded.png" 
                alt="Expanded brand alignment showing 32px centerline offset" 
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-2xs text-muted-foreground leading-normal">
              Shows the brand logo and workspace button aligned precisely at the 12px padding margin with a 32px centerline in expanded state.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-left bg-card border border-border p-3 rounded-xl shadow-2xs">
            <span className="text-xs font-bold text-foreground">2. Collapsed Alignment (32px)</span>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border/60 bg-muted/10 relative" /* token-lint-ignore: screenshot preview layout */>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/specs-logo-collapsed.png" 
                alt="Collapsed brand alignment showing stable 32px centerline" 
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-2xs text-muted-foreground leading-normal">
              Shows the collapsed sidebar at 64px width. The brand logo and selector remain locked horizontally with no transition jitter.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-left bg-card border border-border p-3 rounded-xl shadow-2xs">
            <span className="text-xs font-bold text-foreground">3. Collapsed Sublist Popover</span>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border/60 bg-muted/10 relative" /* token-lint-ignore: screenshot preview layout */>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/specs-collapsed-dropdown.png" 
                alt="Sublist items opening in dropdown popover on the right" 
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-2xs text-muted-foreground leading-normal">
              Verifies that collapsed sublist items render inside a popup menu with side=&quot;right&quot; and align=&quot;start&quot; offsets.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-left bg-card border border-border p-3 rounded-xl shadow-2xs">
            <span className="text-xs font-bold text-foreground">4. Active Parent Indicator</span>
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border/60 bg-muted/10 relative" /* token-lint-ignore: screenshot preview layout */>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/specs-active-indicator.png" 
                alt="Parent menu button highlighted when child sub-item is active" 
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-2xs text-muted-foreground leading-normal">
              Verifies that selecting any sublist route highlights the parent category (like Database) with active background indicators.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
