"use client"

import * as React from "react"
import { AlertBanner, Button, Badge, Switch, Label } from "@apna/design-system"
import { toast } from "sonner"
import { AlertCircle, Info, CreditCard, ChevronRight } from "lucide-react"

export default function FeedbackComponentsPage() {
  const [showIcon, setShowIcon] = React.useState(true)
  const [showCTA, setShowCTA] = React.useState(true)
  const [showClose, setShowClose] = React.useState(true)
  const [appearance, setAppearance] = React.useState<"primary" | "secondary">("secondary")

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="destructive">Category 6</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          6. Feedback & Status Banners
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Static alert banners and transient toast notifications.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Alert, AlertBanner, toast } from "@apna/design-system"'}</code>
      </div>

      {/* Configurable Alert Banner */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6 flex flex-wrap gap-6 items-center justify-between">
          <h2 className="text-base font-semibold text-foreground font-heading">
            Configurable Alert Banner
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="toggle-appearance" checked={appearance === "primary"} onCheckedChange={(c) => setAppearance(c ? "primary" : "secondary")} />
              <Label htmlFor="toggle-appearance">Primary Style</Label>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Switch id="toggle-icon" checked={showIcon} onCheckedChange={setShowIcon} />
              <Label htmlFor="toggle-icon">Icon</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="toggle-cta" checked={showCTA} onCheckedChange={setShowCTA} />
              <Label htmlFor="toggle-cta">CTA Link</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="toggle-close" checked={showClose} onCheckedChange={setShowClose} />
              <Label htmlFor="toggle-close">Close Button</Label>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 bg-background space-y-4">
          <AlertBanner
            variant="info"
            appearance={appearance}
            icon={showIcon ? <Info /> : undefined}
            title="Information: Your candidate credits will renew at the beginning of next month."
            action={showCTA ? { label: <span className="flex items-center">View details <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="warning"
            appearance={appearance}
            icon={showIcon ? <CreditCard /> : undefined}
            title="Alert: Plan expires in 7 days, auto-payment is disabled."
            action={showCTA ? { label: <span className="flex items-center">Enable now <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="destructive"
            appearance={appearance}
            icon={showIcon ? <AlertCircle /> : undefined}
            title="Warning: Job posting expired due to missing budget authorization."
            action={showCTA ? { label: <span className="flex items-center">Renew posting <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />

          <AlertBanner
            variant="success"
            appearance={appearance}
            icon={showIcon ? <Info /> : undefined}
            title="Positive: Candidate status updated successfully."
            action={showCTA ? { label: <span className="flex items-center">View candidate <ChevronRight className="size-4 ml-0.5" /></span>, onClick: () => toast("Action clicked") } : undefined}
            onClose={showClose ? () => toast("Close clicked") : undefined}
          />
        </div>
      </div>



      {/* Sonner Toasts */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Transient Toast Notifications
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Candidate status updated successfully!")}
          >
            Trigger Success Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.error("Failed to connect to candidate database.")}
          >
            Trigger Error Toast
          </Button>
        </div>
      </div>
    </div>
  )
}
