"use client"

/**
 * ReviewStatesBuilder — pick a screen and its review state, get the URL.
 * Replaces the hidden preview panel (removed 2026-11-07): the states live
 * in the address bar, and this is the one place that lists them all.
 * The option lists mirror the readers in job-plan-selection.tsx,
 * jobs/page.tsx, jobs/[id]/page.tsx and self-checkout.tsx; change those
 * first, then here.
 */

import * as React from "react"
import Link from "next/link"
import { ChipTabs, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, buttonVariants } from "@apna/design-system"
import { OFFER_BANNERS } from "@/components/apnahire/offer-banners"
import { PRICING_PHASES, type PricingPhase } from "@/content/pricing-phase"
import { setPricingPhase, usePricingPhase } from "@/hooks/use-pricing-phase"

type Option = { value: string; label: string }
type Param = { key: string; label: string; options: Option[] }
type Screen = { value: string; label: string; path: string; params: Param[] }

const NONE = ""

export const CREDIT_OPTIONS: Option[] = [
  { value: NONE, label: "No credits" },
  { value: "partial", label: "1 job credit" },
  { value: "job4", label: "4 job credits" },
  { value: "ai", label: "1 Premium + AI" },
  { value: "partial-ai", label: "1 job + 1 Premium + AI" },
  { value: "job4-ai", label: "4 jobs + 1 Premium + AI" },
  { value: "addon", label: "4 jobs + AI add-on credit" },
  { value: "held", label: "4 jobs + Premium + AI + add-on" },
]

const BAR_OPTIONS: Option[] = [
  { value: NONE, label: "None" },
  ...Object.entries(OFFER_BANNERS).map(([value, t]) => ({ value, label: t.label })),
]

const OFF_ON = (label: string): Param["options"] => [
  { value: NONE, label: "New (default)" },
  { value: "0", label },
]

export const SCREENS: Screen[] = [
  {
    value: "express",
    label: "Express checkout",
    path: "/apnahire/jobs/new/plans",
    params: [
      {
        key: "layout",
        label: "Layout",
        options: [
          { value: NONE, label: "Job credits" },
          { value: "subscription", label: "Subscription" },
        ],
      },
      { key: "credits", label: "Credit balance", options: CREDIT_OPTIONS },
    ],
  },
  {
    value: "self",
    label: "Self-checkout",
    path: "/apnahire/credits",
    params: [
      {
        key: "tab",
        label: "Tab",
        options: [
          { value: NONE, label: "Jobs" },
          { value: "database", label: "Database" },
          { value: "unlimited", label: "Unlimited" },
          { value: "enterprise", label: "Enterprise" },
        ],
      },
    ],
  },
  {
    value: "jobs",
    label: "Jobs list",
    path: "/apnahire/jobs",
    params: [{ key: "bar", label: "Offer bar", options: BAR_OPTIONS }],
  },
  {
    value: "job",
    label: "Job candidates",
    path: "/apnahire/jobs/telecaller-koramangala",
    params: [
      {
        key: "tab",
        label: "Tab",
        options: [
          { value: NONE, label: "Applied" },
          { value: "database", label: "Database" },
        ],
      },
      {
        key: "applicants",
        label: "Applicants",
        options: [
          { value: NONE, label: "Some" },
          { value: "0", label: "None yet" },
        ],
      },
      { key: "deck", label: "Phone details", options: OFF_ON("Old details") },
      { key: "views", label: "Compact and table", options: OFF_ON("Old views") },
      { key: "pill", label: "Profile actions", options: OFF_ON("Old footer") },
    ],
  },
  {
    // Signed out only: a signed-in recruiter has no onboarding to do.
    value: "onboarding",
    label: "Onboarding (new recruiter)",
    path: "/onboarding",
    params: [
      {
        key: "offer",
        label: "First-job offer",
        options: [
          { value: NONE, label: "Shown" },
          { value: "off", label: "Hidden" },
        ],
      },
    ],
  },
]

export function buildUrl(path: string, values: Record<string, string>) {
  const query = new URLSearchParams(Object.entries(values).filter(([, v]) => v !== NONE)).toString()
  return query ? `${path}?${query}` : path
}

export function ReviewStatesBuilder() {
  const [screenValue, setScreenValue] = React.useState(SCREENS[0].value)
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [copied, setCopied] = React.useState(false)
  const phase = usePricingPhase()

  const screen = SCREENS.find((s) => s.value === screenValue) ?? SCREENS[0]
  const url = buildUrl(screen.path, values)

  const pickScreen = (next: string) => {
    setScreenValue(next)
    setValues({})
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked: the URL is still on screen to copy by hand.
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Row label="Screen">
        <ChipTabs
          aria-label="Screen"
          variant="choice"
          size="sm"
          items={SCREENS.map((s) => ({ value: s.value, label: s.label }))}
          value={screenValue}
          onValueChange={pickScreen}
        />
      </Row>

      {screen.params.map((p) => (
        <Row key={p.key} label={`${p.label} · ?${p.key}=`}>
          <ChipTabs
            aria-label={p.label}
            variant="choice"
            size="sm"
            items={p.options}
            value={values[p.key] ?? NONE}
            onValueChange={(v) => setValues((prev) => ({ ...prev, [p.key]: v }))}
          />
        </Row>
      ))}

      <Row label="Pricing phase · this browser">
        <ChipTabs<PricingPhase>
          aria-label="Pricing phase"
          variant="choice"
          size="sm"
          items={PRICING_PHASES}
          value={phase}
          onValueChange={setPricingPhase}
        />
      </Row>

      <div className="flex flex-col gap-4 rounded-card-nested bg-muted p-4">
        <code className="font-mono text-sm break-all text-foreground">{url}</code>
        <div className="flex gap-2">
          <a href={url} target="_blank" rel="noreferrer" className={buttonVariants({ size: "default" })}>
            Open
          </a>
          <button type="button" onClick={copy} className={buttonVariants({ variant: "outline", size: "default" })}>
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

/** One link per option, and every layout × credits pair for express checkout. */
function allLinks() {
  const rows: { screen: string; state: string; url: string }[] = []
  for (const screen of SCREENS) {
    rows.push({ screen: screen.label, state: "Default", url: screen.path })
    for (const p of screen.params) {
      for (const o of p.options.filter((o) => o.value !== "")) {
        rows.push({ screen: screen.label, state: `${p.label}: ${o.label}`, url: buildUrl(screen.path, { [p.key]: o.value }) })
      }
    }
  }
  const express = SCREENS[0]
  const [layout, credits] = express.params
  for (const c of credits.options.filter((o) => o.value !== "")) {
    rows.push({
      screen: express.label,
      state: `Subscription + ${c.label}`,
      url: buildUrl(express.path, { [layout.key]: "subscription", [credits.key]: c.value }),
    })
  }
  return rows
}

export function AllStatesTable() {
  const rows = allLinks()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Screen</TableHead>
          <TableHead>State</TableHead>
          <TableHead>URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.url}>
            <TableCell className="text-sm whitespace-nowrap">{r.screen}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{r.state}</TableCell>
            <TableCell>
              <Link href={r.url} target="_blank" className="font-mono text-xs break-all text-info hover:underline">
                {r.url}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
