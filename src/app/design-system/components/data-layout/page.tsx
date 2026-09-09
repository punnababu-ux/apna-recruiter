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
  LogoApnaUnlimited,
  Badge,
  Button,
  JobCard,
  PricingCard,
  CalendarDays,
  Switch,
  Label,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export default function DataLayoutComponentsPage() {
  const [solidRibbon, setSolidRibbon] = React.useState(true)

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
          Tables, accordions, job cards, and pricing cards.
        </p>
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

      {/* Pricing Card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading">
              Pricing Card
            </h2>
            <p className="text-xs text-muted-foreground">
              Plan/bundle card — ribbon, price+MRP+badge, CTA slot. Pure layout;
              extracted from the apnahire self-checkout page. The ribbon is a
              slot (any node), not a fixed style — toggle below.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="toggle-ribbon" checked={solidRibbon} onCheckedChange={setSolidRibbon} />
            <Label htmlFor="toggle-ribbon">Solid ribbon (self-checkout style)</Label>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-background">
          <div className="max-w-xs w-full">
            <PricingCard
              ribbon={
                <Badge
                  variant={solidRibbon ? undefined : "info"}
                  className={cn(
                    "rounded-none rounded-bl-xl px-4 py-0.5",
                    solidRibbon && "border-transparent bg-info text-info-foreground"
                  )}
                >
                  Recommended
                </Badge>
              }
              title="6 Job credits"
              subtitle="Perfect for growing businesses"
              meta={
                <>
                  <CalendarDays className="size-4 shrink-0" aria-hidden />
                  Valid for 90 days
                </>
              }
              price="₹3,649"
              mrp="₹4,194"
              badge={<Badge variant="success">13% OFF</Badge>}
              priceSuffix="₹608 /credit"
              cta={<Button className="w-full font-semibold">Buy now</Button>}
            />
          </div>
        </div>
      </div>

      {/* Brand Marks */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Brand Mark Lockup
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="p-4 bg-muted/40 rounded-lg inline-block border border-border">
              <ApnaLogo className="h-10 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">ApnaLogo</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="p-4 bg-card rounded-lg inline-block border border-border">
              <LogoApnaUnlimited variant="default" className="h-5 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">LogoApnaUnlimited variant=&quot;default&quot;</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="p-4 bg-foreground rounded-lg inline-block">
              <LogoApnaUnlimited variant="white" className="h-5 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">variant=&quot;white&quot;</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="p-4 bg-foreground rounded-lg inline-block">
              <LogoApnaUnlimited variant="gradient" className="h-5 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">variant=&quot;gradient&quot; (Accent Gradient)</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          <code className="font-mono bg-muted px-1 rounded">default</code> for light surfaces, <code className="font-mono bg-muted px-1 rounded">white</code> or <code className="font-mono bg-muted px-1 rounded">gradient</code> for dark/noir cards — used on the self-checkout Unlimited card.
        </p>
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
    </div>
  )
}
