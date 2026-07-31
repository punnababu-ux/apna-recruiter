"use client"

import * as React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  ApnaLogo,
  Badge,
  Switch,
  Button,
} from "@apna/design-system"
import { JobCard } from "@/components/shared/job-card"
import {
  SingleJobPricing,
  UnlimitedPlans,
  QuantityUpsellModal,
  CrossSellModal,
  CheckoutSummary,
  SingleJobPlan,
} from "@/components/shared/pricing"

export default function DataLayoutComponentsPage() {
  const [showMonthly, setShowMonthly] = React.useState<boolean>(true)
  const [enableOldUser, setEnableOldUser] = React.useState<boolean>(true)

  const [upsellModalOpen, setUpsellModalOpen] = React.useState<boolean>(false)
  const [crossSellModalOpen, setCrossSellModalOpen] = React.useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = React.useState<SingleJobPlan | null>(null)

  const handleSelectPlan = (plan: SingleJobPlan) => {
    setSelectedPlan(plan)
    // Open upsell or cross-sell modal for demonstration
    if (plan.id === "premium") {
      setUpsellModalOpen(true)
    } else {
      setCrossSellModalOpen(true)
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="info">Category 7</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          7. Data & Layout
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tables, accordions, job cards, and interactive subscription pricing suite.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { SingleJobPricing, UnlimitedPlans, CheckoutSummary } from "@/components/shared/pricing"'}</code>
      </div>

      {/* Cards */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Product Cards
        </h2>
        <div className="max-w-md w-full">
          <JobCard
            title="Senior Frontend Engineer"
            company="Acme Corp"
            location="Remote, US"
            jobType="Full-time"
            salary="$120k - $160k"
            postedAt="2 days ago"
          />
        </div>
      </div>

      {/* Interactive Subscription Pricing Suite */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-3">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading">
              Single Job Posting & Subscription Suite
            </h2>
            <p className="text-xs text-muted-foreground">
              Explore single job tiers, apna unlimited cards, dev toggles, and modal flows.
            </p>
          </div>

          {/* Dev Toggles */}
          <div className="flex items-center gap-6 rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground font-medium hover:text-foreground">
              <Switch checked={showMonthly} onCheckedChange={setShowMonthly} />
              Show apna unlimited card
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground font-medium hover:text-foreground">
              <Switch checked={enableOldUser} onCheckedChange={setEnableOldUser} />
              Enable Old User Pricing
            </label>
          </div>
        </div>

        <SingleJobPricing
          showMonthlyCard={showMonthly}
          oldUserPricingEnabled={enableOldUser}
          onSelectPlan={handleSelectPlan}
          onSelectMonthly={() => setCrossSellModalOpen(true)}
          onExploreUnlimited={() => {
            const el = document.getElementById("unlimited-plans-section")
            el?.scrollIntoView({ behavior: "smooth" })
          }}
        />

        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={() => setUpsellModalOpen(true)}>
            Test Buy More Save More Modal
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCrossSellModalOpen(true)}>
            Test Unlimited Upgrade Modal
          </Button>
        </div>
      </div>

      {/* Unlimited Plans Section */}
      <div id="unlimited-plans-section" className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Explore Plans - apna Unlimited
        </h2>
        <UnlimitedPlans />
      </div>

      {/* Checkout Summary Component */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Checkout Summary & Add-ons
        </h2>
        <CheckoutSummary />
      </div>

      {/* Brand Marks */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Brand Mark Lockup
        </h2>
        <div className="p-4 bg-muted/40 rounded-lg inline-block border border-border">
          <ApnaLogo className="h-10 w-auto" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Data Table
        </h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Ananya Sharma</TableCell>
                <TableCell>Frontend Engineer</TableCell>
                <TableCell><Badge variant="success">Shortlisted</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rahul Verma</TableCell>
                <TableCell>Product Designer</TableCell>
                <TableCell><Badge variant="info">In Review</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Accordion */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Accordion Containers
        </h2>
        <Accordion className="w-full max-w-xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the evaluation criterion?</AccordionTrigger>
            <AccordionContent>
              Candidates are evaluated across technical skills, problem solving, and cultural fit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do auto-invites work?</AccordionTrigger>
            <AccordionContent>
              Matching candidates receive automated invitations via WhatsApp or email based on your threshold settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Modals */}
      <QuantityUpsellModal
        open={upsellModalOpen}
        onOpenChange={setUpsellModalOpen}
        planTitle={selectedPlan?.title || "Premium"}
        basePrice={selectedPlan ? (enableOldUser ? selectedPlan.oldUserPrice : selectedPlan.currentPrice) : 1399}
        onProceed={(qty, total) => {
          alert(`Proceeding with ${qty} jobs for ₹${total.toLocaleString()}`)
          setUpsellModalOpen(false)
        }}
      />

      <CrossSellModal
        open={crossSellModalOpen}
        onOpenChange={setCrossSellModalOpen}
        singlePlanTitle={selectedPlan?.title || "Classic job"}
        singlePlanPrice={selectedPlan ? (enableOldUser ? selectedPlan.oldUserPrice : selectedPlan.currentPrice) : 699}
        onContinueSingle={() => {
          alert("Continuing with single job posting")
          setCrossSellModalOpen(false)
        }}
        onSwitchUnlimited={() => {
          alert("Switching to apna Unlimited Monthly Plan")
          setCrossSellModalOpen(false)
        }}
      />
    </div>
  )
}
