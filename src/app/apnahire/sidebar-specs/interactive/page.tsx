"use client"

import * as React from "react"
import {
  ArrowLeft,
  Layout,
  Settings,
  Sparkles,
} from "lucide-react"
import { Badge, Button, SidebarInset, SidebarProvider, SidebarTrigger } from "@apna/design-system"
import { OnlyRoundsSidebar } from "@/components/onlyrounds/app-sidebar"
import { ApnaHireSidebar } from "@/components/apnahire/app-sidebar"
import Link from "next/link"

export default function InteractiveSpecsPage() {
  const [productMode, setProductMode] = React.useState<"onlyrounds" | "apnahire">("apnahire")
  
  // State overrides for the dynamic playground configurations
  const [activeORWorkspace, setActiveORWorkspace] = React.useState<string>("gamma")
  const [activeAHWorkspace, setActiveAHWorkspace] = React.useState<string>("ah-corp")

  const [showAlert, setShowAlert] = React.useState(true)
  const [customAlertTitle, setCustomAlertTitle] = React.useState("Verify Identity")
  const [customAlertDesc, setCustomAlertDesc] = React.useState("Verify your company tax status to post jobs.")

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
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar instance */}
      {productMode === "onlyrounds" ? (
        <OnlyRoundsSidebar
          activeWorkspaceId={activeORWorkspace}
          onWorkspaceChange={(w) => setActiveORWorkspace(w.id)}
        />
      ) : (
        <ApnaHireSidebar
          activeWorkspaceId={activeAHWorkspace}
          onWorkspaceChange={(w) => setActiveAHWorkspace(w.id)}
          showAlert={showAlert}
          alertTitle={customAlertTitle}
          alertDescription={customAlertDesc}
        />
      )}

      {/* Main Content Layout */}
      <SidebarInset className="bg-muted/30">
        {/* Top Header */}
        <header className="h-14 border-b border-border bg-card flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="cursor-pointer" />
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-semibold text-foreground">
              {productMode === "onlyrounds" ? "OnlyRounds App Presets" : "Apna Hire Recruiter Presets"}
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
            {/* Control Panel: Product Choice */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4 text-left">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
                <Layout className="size-4 text-primary" />
                Select Product Shell
              </h3>
              <p className="text-xs text-muted-foreground leading-normal">
                Toggle between the two different product layouts to see how the sidebar adapts brand logo, colors, and navigation lists.
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant={productMode === "apnahire" ? "default" : "outline"}
                  className="flex-1 cursor-pointer"
                  onClick={() => setProductMode("apnahire")}
                >
                  Apna Hire Recruiter
                </Button>
                <Button
                  variant={productMode === "onlyrounds" ? "default" : "outline"}
                  className="flex-1 cursor-pointer"
                  onClick={() => setProductMode("onlyrounds")}
                >
                  OnlyRounds AI
                </Button>
              </div>
            </div>

            {/* Control Panel: Alerts */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4 text-left">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-2">
                <Settings className="size-4 text-primary" />
                Configure Alert Banner
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    id="play-show-alert"
                    type="checkbox"
                    checked={showAlert}
                    onChange={(e) => setShowAlert(e.target.checked)}
                    className="rounded border-border"
                  />
                  <label htmlFor="play-show-alert" className="text-xs text-muted-foreground cursor-pointer select-none">
                    Show Dismissible Warning Banner
                  </label>
                </div>

                {showAlert && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label htmlFor="play-alert-title" className="text-2xs text-muted-foreground">Alert Title</label>
                      <input
                        id="play-alert-title"
                        type="text"
                        value={customAlertTitle}
                        onChange={(e) => setCustomAlertTitle(e.target.value)}
                        className="w-full h-8 px-2 text-xs border border-border rounded-md bg-background focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="play-alert-desc" className="text-2xs text-muted-foreground">Alert Description</label>
                      <textarea
                        id="play-alert-desc"
                        rows={2}
                        value={customAlertDesc}
                        onChange={(e) => setCustomAlertDesc(e.target.value)}
                        className="w-full p-2 text-xs border border-border rounded-md bg-background focus:outline-hidden resize-none"
                      />
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
