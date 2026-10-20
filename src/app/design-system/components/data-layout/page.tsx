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
  ProgressAccordion,
  ApnaLogo,
  LogoApnaUnlimited,
  LogoApnaRecruiter,
  LogoApnaWordmark,
  Badge,
  Button,
  JobCardFrame,
  JobMetricPill,
  MoreVertical,
  UserSearch,
  Users,
  PhoneFrame,
  PricingCard,
  ClockFading,
  Switch,
  Label,
} from "@apna/design-system"

export default function DataLayoutComponentsPage() {
  const [titleLed, setTitleLed] = React.useState(false)

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
          Tables, accordions, the jobs list card, and pricing cards.
        </p>
      </div>

      {/* Jobs list card */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="border-b border-border/60 pb-2 text-h6 text-foreground">Jobs list card (JobCardFrame)</h2>
        <JobCardFrame
          title="Telecaller"
          href="#"
          badge={<Badge variant="success">Active</Badge>}
          meta={<span className="text-sm text-muted-foreground">Koramangala, Bengaluru · Posted 12 Oct 2026</span>}
          actions={
            <Button variant="ghost" size="icon-sm" aria-label="Job actions">
              <MoreVertical />
            </Button>
          }
          pills={
            <>
              <JobMetricPill href="#" icon={Users} label="Applied" count={12} />
              <JobMetricPill href="#" icon={UserSearch} label="Active leads" count={5} unread="4 new" />
            </>
          }
        />
      </div>

      {/* Phone frame */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Phone Frame
        </h2>
        <PhoneFrame label="Example mobile screen" className="max-w-56">
          <div className="flex flex-col gap-3 p-4 pt-8">
            <p className="text-base font-semibold text-foreground">Telecaller</p>
            <p className="text-xs text-muted-foreground">Koramangala, Bengaluru · ₹15,000 – ₹20,000</p>
            <Button className="w-full">Apply for job</Button>
          </div>
        </PhoneFrame>
      </div>

      {/* Pricing Card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading">
              Pricing Card
            </h2>
            <p className="text-xs text-muted-foreground">
              Plan/bundle card — ribbon, meta rows, price+MRP+badge, CTA slot.
              Pure layout; extracted from the apnahire self-checkout page. The
              ribbon and badge are slots (any node), not fixed styles.
              `emphasis` picks which line leads: self-checkout uses price-led
              on Jobs and title-led on Database — toggle below.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="toggle-emphasis" checked={titleLed} onCheckedChange={setTitleLed} />
            <Label htmlFor="toggle-emphasis">Title-led (Database style)</Label>
          </div>
        </div>

        {/* As the checkout draws it: the gradient, the dark glass panel
            (surface-glass-dark), and a solid borderless plan card in it.
            See Product › Surfaces for the rules. */}
        <div className="bg-gradient-checkout-hero p-4 sm:p-6">
          <div className="surface-glass-dark w-full max-w-sm rounded-card p-4">
            <PricingCard
              className="border-transparent bg-plan-card"
              emphasis={titleLed ? "title" : "price"}
              ribbon={
                <Badge variant="ribbon" size="ribbon">
                  Recommended
                </Badge>
              }
              title="6 Job credits"
              subtitle="Perfect for growing businesses"
              meta={
                <>
                  <ClockFading aria-hidden />
                  Valid for 90 days
                </>
              }
              price="₹3,649"
              mrp="₹4,194"
              badge={<Badge variant="discount">13% OFF</Badge>}
              priceSuffix="₹608 /credit"
              cta={
                <Button variant="checkout" className="h-10 w-full font-semibold">
                  Buy now
                </Button>
              }
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
              <LogoApnaWordmark className="h-6 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">LogoApnaWordmark</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="p-4 bg-foreground rounded-lg inline-block">
              <LogoApnaWordmark variant="white" className="h-6 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">variant=&quot;white&quot;</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="p-4 bg-card rounded-lg inline-block border border-border">
              <LogoApnaRecruiter className="h-6 w-auto" />
            </div>
            <span className="text-3xs text-muted-foreground font-mono">LogoApnaRecruiter</span>
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
          <code className="font-mono bg-muted px-1 rounded">LogoApnaWordmark</code> is the website header and footer and the
          collapsed sidebar; <code className="font-mono bg-muted px-1 rounded">LogoApnaRecruiter</code> is the expanded sidebar,
          the phone top bar and login. &ldquo;apna&rdquo; is one colour everywhere (<code className="font-mono bg-muted px-1 rounded">--logo-apna</code>),
          &ldquo;Recruiter&rdquo; the CTA green (<code className="font-mono bg-muted px-1 rounded">--logo-hire</code>), both flip for dark.
        </p>
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

      {/* ProgressAccordion */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Progress Accordion
        </h2>
        <p className="text-sm text-muted-foreground">
          Walks itself: the open item&apos;s loader fills, then the next opens. Hover to pause, click to jump.
        </p>
        <ProgressAccordion
          className="w-full max-w-xl"
          interval={4000}
          items={[
            { value: "a", title: "Full-funnel hiring", subtitle: "From sourcing to shortlist", content: "AI runs the hiring workflow end to end." },
            { value: "b", title: "AI that calls", subtitle: "Every candidate, followed through", content: "Screening calls 24/7 with automated follow-ups." },
            { value: "c", title: "Precision discovery", subtitle: "Not just nearby. Exactly right.", content: "Radius search with 22+ filters." },
          ]}
        />
      </div>
    </div>
  )
}
