"use client"

import * as React from "react"
import { ArrowLeft, Settings, Sparkles } from "@apna/design-system"
import { Badge, Button, SidebarInset, SidebarProvider, SidebarTrigger } from "@apna/design-system"
import { ApnaHireSidebar } from "@/components/apnahire/app-sidebar"
import Link from "next/link"

export default function InteractiveSpecsPage() {
  // State overrides for the dynamic playground configurations
  const [activeAHWorkspace, setActiveAHWorkspace] = React.useState<string>("ah-corp")

  const [showAlert, setShowAlert] = React.useState(true)
  const [alertVariant, setAlertVariant] = React.useState<"warning" | "info" | "destructive" | "success" | "default">("warning")
  const [alertAppearance, setAlertAppearance] = React.useState<"primary" | "secondary">("secondary")
  const [customAlertTitle, setCustomAlertTitle] = React.useState("Verify Identity: Complete tax verification to post jobs.")
  const [customCtaText, setCustomCtaText] = React.useState("Verify")
  const [showClose, setShowClose] = React.useState(true)

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar instance */}
      <ApnaHireSidebar
        activeWorkspaceId={activeAHWorkspace}
        onWorkspaceChange={(w) => setActiveAHWorkspace(w.id)}
        showAlert={showAlert}
        alertTitle={customAlertTitle}
        alertCtaText={customCtaText}
        alertVariant={alertVariant}
        alertAppearance={alertAppearance}
        alertShowClose={showClose}
      />

      {/* Main Content Layout */}
      <SidebarInset className="bg-muted/30">
        {/* Top Header */}
        <header className="h-14 border-b border-border bg-card flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="cursor-pointer" />
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-semibold text-foreground">
              Apna Hire Recruiter Presets
            </span>
          </div>

          <Link href="/apnahire/sidebar-specs">
            <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer text-xs h-8">
              <ArrowLeft className="size-3.5" />
              Back to Spec Sheet
            </Button>
          </Link>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-4xl">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/20 text-primary">
                Live Playground
              </Badge>
              <span className="text-2xs text-muted-foreground font-mono">Full-Screen Template View</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Interactive Sidebar Playground
            </h2>
            <p className="text-sm text-muted-foreground">
              Interact with the sidebar live on the left! Click the toggle button in the header or use <kbd className="font-mono bg-muted border border-border/80 px-1 rounded text-2xs">Ctrl + B</kbd> to collapse and expand it. Use the options below to configure its presets dynamically.
            </p>
          </div>

          {/* Configuration controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Panel: Alerts */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4 text-left">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
                <Settings className="size-4 text-primary" />
                Configure Alert Banner
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    id="play-show-alert"
                    type="checkbox"
                    checked={showAlert}
                    onChange={(e) => setShowAlert(e.target.checked)}
                    className="rounded border-border cursor-pointer"
                  />
                  <label htmlFor="play-show-alert" className="text-xs text-muted-foreground cursor-pointer select-none font-medium">
                    Show Alert Banner
                  </label>
                </div>

                {showAlert && (
                  <div className="space-y-4 animate-in fade-in duration-200 pt-1">
                    {/* Banner Variant & Appearance Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="play-alert-variant" className="text-2xs font-semibold text-muted-foreground">Banner Type / Variant</label>
                        <select
                          id="play-alert-variant"
                          value={alertVariant}
                          onChange={(e) => setAlertVariant(e.target.value as "warning" | "info" | "destructive" | "success" | "default")}
                          className="w-full h-8 px-2 text-xs border border-border rounded-md bg-background text-foreground focus:outline-hidden cursor-pointer"
                        >
                          <option value="warning">Warning (Amber)</option>
                          <option value="info">Info (Sky Blue)</option>
                          <option value="destructive">Destructive (Red)</option>
                          <option value="success">Success (Green)</option>
                          <option value="default">Default (Gray)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="play-alert-appearance" className="text-2xs font-semibold text-muted-foreground">Style Fill</label>
                        <select
                          id="play-alert-appearance"
                          value={alertAppearance}
                          onChange={(e) => setAlertAppearance(e.target.value as "primary" | "secondary")}
                          className="w-full h-8 px-2 text-xs border border-border rounded-md bg-background text-foreground focus:outline-hidden cursor-pointer"
                        >
                          <option value="secondary">Subtle Background</option>
                          <option value="primary">Primary Gradient</option>
                        </select>
                      </div>
                    </div>

                    {/* Text content inputs */}
                    <div className="space-y-1">
                      <label htmlFor="play-alert-title" className="text-2xs font-semibold text-muted-foreground">Alert Message / Title</label>
                      <input
                        id="play-alert-title"
                        type="text"
                        value={customAlertTitle}
                        onChange={(e) => setCustomAlertTitle(e.target.value)}
                        className="w-full h-8 px-2 text-xs border border-border rounded-md bg-background text-foreground focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="play-alert-cta" className="text-2xs font-semibold text-muted-foreground">CTA Link Label</label>
                      <input
                        id="play-alert-cta"
                        type="text"
                        value={customCtaText}
                        onChange={(e) => setCustomCtaText(e.target.value)}
                        placeholder="Leave blank to hide CTA"
                        className="w-full h-8 px-2 text-xs border border-border rounded-md bg-background text-foreground focus:outline-hidden"
                      />
                    </div>

                    {/* Toggle Close Icon */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        id="play-show-close"
                        type="checkbox"
                        checked={showClose}
                        onChange={(e) => setShowClose(e.target.checked)}
                        className="rounded border-border cursor-pointer"
                      />
                      <label htmlFor="play-show-close" className="text-xs text-muted-foreground cursor-pointer select-none">
                        Show Close Icon (X)
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Interaction Guidance */}
          <div className="rounded-xl border border-border bg-muted/20 p-5 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary animate-pulse" />
              Interaction checklist
            </h4>
            <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-4">
              <li><strong className="text-foreground">Desktop Collapsed State</strong>: Click the header collapse button. Verify that the brand logo and workspace selector shrink seamlessly and their vertical centerline remains locked at exactly <code className="font-mono bg-card px-1 py-0.5 rounded text-foreground">32px</code>.</li>
              <li><strong className="text-foreground">Collapsed Category Access</strong>: Hover or click on the collapsed <strong className="text-foreground">Database</strong> list item. A right-opening popover dropdown appears allowing you to select child routes.</li>
              <li><strong className="text-foreground">Responsive Mobile Test</strong>: Resize the browser window to mobile width. Click the trigger in the top bar to open the sheet. Verify that the selector popover placement opens underneath the trigger, sublists expand inline as accordions, and clicking any route auto-collapses the sheet drawer.</li>
            </ul>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
