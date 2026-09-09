"use client"

import * as React from "react"
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@apna/design-system"
import { Layers } from "@apna/design-system"

export default function SpacingPage() {
  const tshirtSteps = [
    { token: "space-2xs", px: "4px", rem: "0.25rem", role: "Tight inline gaps" },
    { token: "space-xs", px: "8px", rem: "0.5rem", role: "Icon to label spacing" },
    { token: "space-sm", px: "12px", rem: "0.75rem", role: "Field & label gap" },
    { token: "space-md", px: "16px", rem: "1rem", role: "Standard card padding & stack" },
    { token: "space-lg", px: "24px", rem: "1.5rem", role: "Block element separation" },
    { token: "space-xl", px: "32px", rem: "2rem", role: "Section spacing" },
    { token: "space-2xl", px: "48px", rem: "3rem", role: "Major page section gap" },
    { token: "space-3xl", px: "64px", rem: "4rem", role: "Page gutter / max padding" },
  ]

  const contextSteps = [
    { token: "gap-inline", desc: "Inline horizontal element spacing (--space-xs / 8px)" },
    { token: "gap-stack", desc: "Vertical form field stacking (--space-md / 16px)" },
    { token: "p-inset", desc: "Standard card inner padding (--space-md / 16px)" },
    { token: "gap-section", desc: "Major page section padding (--space-2xl / 48px)" },
    { token: "p-page", desc: "Top-level page margin room (--space-3xl / 64px)" },
  ]

  const primitiveSpacingRamp = [
    { name: "--space-0", px: "0px", rem: "0rem" },
    { name: "--space-0-5", px: "2px", rem: "0.125rem" },
    { name: "--space-1", px: "4px", rem: "0.25rem" },
    { name: "--space-1-5", px: "6px", rem: "0.375rem" },
    { name: "--space-2", px: "8px", rem: "0.5rem" },
    { name: "--space-3", px: "12px", rem: "0.75rem" },
    { name: "--space-4", px: "16px", rem: "1.0rem" },
    { name: "--space-5", px: "20px", rem: "1.25rem" },
    { name: "--space-6", px: "24px", rem: "1.5rem" },
    { name: "--space-8", px: "32px", rem: "2.0rem" },
    { name: "--space-10", px: "40px", rem: "2.5rem" },
    { name: "--space-12", px: "48px", rem: "3.0rem" },
    { name: "--space-16", px: "64px", rem: "4.0rem" },
    { name: "--space-20", px: "80px", rem: "5.0rem" },
    { name: "--space-24", px: "96px", rem: "6.0rem" },
    { name: "--space-32", px: "128px", rem: "8.0rem" },
    { name: "--space-64", px: "256px", rem: "16.0rem" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="warning">Spacing Scale</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          Spacing & Layout Scale
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sanctioned T-shirt and Contextual spacing tokens anchored on a 4px base unit. Raw arbitrary values (e.g. <code>p-[13px]</code>) are strictly lint-blocked.
        </p>
      </div>

      {/* Semantic T-Shirt Sizes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              T-Shirt Spacing Roles (Tier 2 Semantics)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Generic layout-agnostic roles (2xs, xs, sm, md, lg, xl, 2xl, 3xl).
            </p>
          </div>
          <Badge variant="info">Tier 2 Roles</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tshirtSteps.map((s) => (
            <div key={s.token} className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-foreground">{s.token}</span>
                  <span className="text-3xs text-muted-foreground font-mono">{s.px}</span>
                </div>
                <p className="text-3xs text-muted-foreground">{s.role}</p>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-sm" style={{ height: s.px }} />
            </div>
          ))}
        </div>
      </div>

      {/* Contextual Spacing Tokens */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Contextual Spacing Roles
            </h2>
            <p className="text-2xs text-muted-foreground">
              Describe WHAT the space separates (inline, stack, inset, section, page). Prefer these in new component code.
            </p>
          </div>
          <Badge variant="success">Context Roles</Badge>
        </div>

        <div className="rounded-xl border border-border bg-card divide-y divide-border/60">
          {contextSteps.map((c) => (
            <div key={c.token} className="p-4 flex items-center justify-between">
              <code className="font-mono text-xs font-bold text-primary">{c.token}</code>
              <span className="text-xs text-muted-foreground">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier 1 Primitives (Collapsed by default in Accordion) */}
      <div className="pt-4 border-t border-border">
        <Accordion className="w-full">
          <AccordionItem value="primitives" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-border bg-muted p-1.5 text-primary">
                  <Layers className="size-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-foreground font-heading">
                      Tier 1 — Primitive Numeric Spacing Scale (4px Base)
                    </h2>
                    <Badge variant="outline" className="text-3xs">Collapsed</Badge>
                  </div>
                  <p className="text-2xs text-muted-foreground">
                    Click to expand 4px numeric steps defined in <code>primitives.css</code> (`--space-0` through `--space-64`).
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {primitiveSpacingRamp.map((p) => (
                    <div key={p.name} className="rounded-lg border border-border/60 bg-muted/40 p-2.5 space-y-1">
                      <code className="text-3xs font-mono font-bold text-primary">{p.name}</code>
                      <p className="text-2xs font-mono text-foreground font-semibold">{p.px}</p>
                      <p className="text-3xs font-mono text-muted-foreground">{p.rem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
