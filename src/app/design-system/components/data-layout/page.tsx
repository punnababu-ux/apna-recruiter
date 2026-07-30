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
} from "@apna/design-system"
import { JobCard } from "@/components/shared/job-card"
import { PricingCards } from "@/components/shared/pricing-cards"

export default function DataLayoutComponentsPage() {
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
          Tables, accordions, and brand mark lockups.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Table, Accordion, ApnaLogo } from "@apna/design-system"'}</code>
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

      {/* Pricing Cards */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Pricing Cards
        </h2>
        <div className="w-full">
          <PricingCards
            oldUserPricingEnabled={true}
            plans={[
              {
                id: "classic",
                title: "Classic job",
                originalPrice: 999,
                currentPrice: 699,
                actionLabel: "Get classic job",
                features: [
                  { label: "Job will be active for 15 days", included: true },
                  { label: "Higher visibility to candidates", included: false },
                  { label: "WhatsApp job notify", included: false },
                  { label: "Urgently hiring tag", included: false },
                  { label: "Top placements in job listings", included: false },
                ],
              },
              {
                id: "premium",
                title: "Premium job",
                originalPrice: 1999,
                currentPrice: 1399,
                actionLabel: "Get premium job",
                features: [
                  { label: "Job will be active for 15 days", included: true },
                  { label: "Higher visibility to candidates", included: true },
                  { label: "WhatsApp job notify", included: true, highlightIcon: "whatsapp" },
                  { label: "Urgently hiring tag", included: true, highlightIcon: "flame" },
                  { label: "Top placements in job listings", included: false },
                ],
              },
              {
                id: "super",
                title: "Super premium job",
                originalPrice: 2999,
                currentPrice: 2799,
                actionLabel: "Get super premium job",
                features: [
                  { label: "Job will be active for 15 days", included: true },
                  { label: "2x more visibility to candidates", included: true },
                  { label: "2x WhatsApp job notify", included: true, highlightIcon: "whatsapp" },
                  { label: "Urgently hiring tag", included: true, highlightIcon: "flame" },
                  { label: "Top placements in job listings", included: true },
                ],
              },
            ]}
          />
        </div>
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
    </div>
  )
}
