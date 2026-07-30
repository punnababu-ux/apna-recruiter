"use client"

import * as React from "react"
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@apna/design-system"
import { toast } from "sonner"
import { Copy, Layers } from "lucide-react"
import { ThemeToggle } from "@/components/design-system/theme-toggle"

export default function ColorsPage() {
  const semanticColors = [
    { token: "bg-background", label: "Background", role: "Primary page surface" },
    { token: "bg-card", label: "Card", role: "Elevated component containers" },
    { token: "bg-muted", label: "Muted", role: "Subtle backgrounds, tags, disabled" },
    { token: "bg-accent", label: "Accent", role: "Hover/active states" },
    { token: "bg-primary", label: "Primary", role: "Main brand actions & CTA" },
    { token: "bg-secondary", label: "Secondary", role: "Supporting actions & fills" },
    { token: "bg-destructive", label: "Destructive", role: "Errors, deletes, warnings" },
    { token: "bg-info", label: "Info", role: "Informational callouts & chips" },
    { token: "bg-success", label: "Success", role: "Positive verification & badges" },
    { token: "bg-warning", label: "Warning", role: "Cautionary banners & chips" },
  ]

  const primitiveRamps = [
    {
      name: "Gray (Neutral Ramp)",
      steps: [
        { name: "50", token: "--color-gray-50", bg: "bg-gray-50", darkText: true },
        { name: "100", token: "--color-gray-100", bg: "bg-gray-100", darkText: true },
        { name: "200", token: "--color-gray-200", bg: "bg-gray-200", darkText: true },
        { name: "300", token: "--color-gray-300", bg: "bg-gray-300", darkText: true },
        { name: "400", token: "--color-gray-400", bg: "bg-gray-400" },
        { name: "500", token: "--color-gray-500", bg: "bg-gray-500" },
        { name: "600", token: "--color-gray-600", bg: "bg-gray-600" },
        { name: "700", token: "--color-gray-700", bg: "bg-gray-700" },
        { name: "800", token: "--color-gray-800", bg: "bg-gray-800" },
        { name: "900", token: "--color-gray-900", bg: "bg-gray-900" },
        { name: "950", token: "--color-gray-950", bg: "bg-gray-950" },
      ],
    },
    {
      name: "Apna Green (Brand Anchor)",
      steps: [
        { name: "50", token: "--color-apna-green-50", bg: "bg-[var(--color-apna-green-50)]", darkText: true },
        { name: "100", token: "--color-apna-green-100", bg: "bg-[var(--color-apna-green-100)]", darkText: true },
        { name: "200", token: "--color-apna-green-200", bg: "bg-[var(--color-apna-green-200)]", darkText: true },
        { name: "300", token: "--color-apna-green-300", bg: "bg-[var(--color-apna-green-300)]", darkText: true },
        { name: "400", token: "--color-apna-green-400", bg: "bg-[var(--color-apna-green-400)]" },
        { name: "500", token: "--color-apna-green-500", bg: "bg-[var(--color-apna-green-500)]" },
        { name: "600", token: "--color-apna-green-600", bg: "bg-[var(--color-apna-green-600)]" },
        { name: "700", token: "--color-apna-green-700", bg: "bg-[var(--color-apna-green-700)]" },
        { name: "800", token: "--color-apna-green-800", bg: "bg-[var(--color-apna-green-800)]" },
        { name: "900", token: "--color-apna-green-900", bg: "bg-[var(--color-apna-green-900)]" },
        { name: "950", token: "--color-apna-green-950", bg: "bg-[var(--color-apna-green-950)]" },
      ],
    },
    {
      name: "Apna Gold (Brand Anchor)",
      steps: [
        { name: "50", token: "--color-apna-gold-50", bg: "bg-[var(--color-apna-gold-50)]", darkText: true },
        { name: "100", token: "--color-apna-gold-100", bg: "bg-[var(--color-apna-gold-100)]", darkText: true },
        { name: "200", token: "--color-apna-gold-200", bg: "bg-[var(--color-apna-gold-200)]", darkText: true },
        { name: "300", token: "--color-apna-gold-300", bg: "bg-[var(--color-apna-gold-300)]", darkText: true },
        { name: "400", token: "--color-apna-gold-400", bg: "bg-[var(--color-apna-gold-400)]", darkText: true },
        { name: "500", token: "--color-apna-gold-500", bg: "bg-[var(--color-apna-gold-500)]", darkText: true },
        { name: "600", token: "--color-apna-gold-600", bg: "bg-[var(--color-apna-gold-600)]" },
        { name: "700", token: "--color-apna-gold-700", bg: "bg-[var(--color-apna-gold-700)]" },
        { name: "800", token: "--color-apna-gold-800", bg: "bg-[var(--color-apna-gold-800)]" },
        { name: "900", token: "--color-apna-gold-900", bg: "bg-[var(--color-apna-gold-900)]" },
        { name: "950", token: "--color-apna-gold-950", bg: "bg-[var(--color-apna-gold-950)]" },
      ],
    },
    {
      name: "Red (Destructive)",
      steps: [
        { name: "50", token: "--color-red-50", bg: "bg-[var(--color-red-50)]", darkText: true },
        { name: "100", token: "--color-red-100", bg: "bg-[var(--color-red-100)]", darkText: true },
        { name: "200", token: "--color-red-200", bg: "bg-[var(--color-red-200)]", darkText: true },
        { name: "300", token: "--color-red-300", bg: "bg-[var(--color-red-300)]", darkText: true },
        { name: "400", token: "--color-red-400", bg: "bg-[var(--color-red-400)]" },
        { name: "500", token: "--color-red-500", bg: "bg-[var(--color-red-500)]" },
        { name: "600", token: "--color-red-600", bg: "bg-[var(--color-red-600)]" },
        { name: "700", token: "--color-red-700", bg: "bg-[var(--color-red-700)]" },
        { name: "800", token: "--color-red-800", bg: "bg-[var(--color-red-800)]" },
        { name: "900", token: "--color-red-900", bg: "bg-[var(--color-red-900)]" },
        { name: "950", token: "--color-red-950", bg: "bg-[var(--color-red-950)]" },
      ],
    },
    {
      name: "Green (Success)",
      steps: [
        { name: "50", token: "--color-green-50", bg: "bg-[var(--color-green-50)]", darkText: true },
        { name: "100", token: "--color-green-100", bg: "bg-[var(--color-green-100)]", darkText: true },
        { name: "200", token: "--color-green-200", bg: "bg-[var(--color-green-200)]", darkText: true },
        { name: "300", token: "--color-green-300", bg: "bg-[var(--color-green-300)]", darkText: true },
        { name: "400", token: "--color-green-400", bg: "bg-[var(--color-green-400)]" },
        { name: "500", token: "--color-green-500", bg: "bg-[var(--color-green-500)]" },
        { name: "600", token: "--color-green-600", bg: "bg-[var(--color-green-600)]" },
        { name: "700", token: "--color-green-700", bg: "bg-[var(--color-green-700)]" },
        { name: "800", token: "--color-green-800", bg: "bg-[var(--color-green-800)]" },
        { name: "900", token: "--color-green-900", bg: "bg-[var(--color-green-900)]" },
        { name: "950", token: "--color-green-950", bg: "bg-[var(--color-green-950)]" },
      ],
    },
    {
      name: "Blue (Info / Accent)",
      steps: [
        { name: "50", token: "--color-blue-50", bg: "bg-[var(--color-blue-50)]", darkText: true },
        { name: "100", token: "--color-blue-100", bg: "bg-[var(--color-blue-100)]", darkText: true },
        { name: "200", token: "--color-blue-200", bg: "bg-[var(--color-blue-200)]", darkText: true },
        { name: "300", token: "--color-blue-300", bg: "bg-[var(--color-blue-300)]", darkText: true },
        { name: "400", token: "--color-blue-400", bg: "bg-[var(--color-blue-400)]" },
        { name: "500", token: "--color-blue-500", bg: "bg-[var(--color-blue-500)]" },
        { name: "600", token: "--color-blue-600", bg: "bg-[var(--color-blue-600)]" },
        { name: "700", token: "--color-blue-700", bg: "bg-[var(--color-blue-700)]" },
        { name: "800", token: "--color-blue-800", bg: "bg-[var(--color-blue-800)]" },
        { name: "900", token: "--color-blue-900", bg: "bg-[var(--color-blue-900)]" },
        { name: "950", token: "--color-blue-950", bg: "bg-[var(--color-blue-950)]" },
      ],
    },
  ]

  const copySwatch = (event: React.MouseEvent<HTMLDivElement>, label: string) => {
    const el = event.currentTarget
    const computedColor = window.getComputedStyle(el).backgroundColor

    // Convert rgb values to hex format
    let hex = computedColor
    const rgbMatch = computedColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]).toString(16).padStart(2, "0")
      const g = parseInt(rgbMatch[2]).toString(16).padStart(2, "0")
      const b = parseInt(rgbMatch[3]).toString(16).padStart(2, "0")
      hex = `#${r}${g}${b}`.toUpperCase()
    }

    navigator.clipboard.writeText(hex)
    toast.success(`Copied ${hex} (${label}) to clipboard!`)
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="default">Two-Tier Architecture</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          Colors & Token Architecture
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click any color swatch to copy its HEX value directly to your clipboard.
        </p>
      </div>

      {/* Tier 2: Semantics */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Tier 2 — Semantic Intent Roles
            </h2>
            <p className="text-2xs text-muted-foreground">
              These are the ONLY tokens consumed by components. Automatically adapt between light & dark themes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Badge variant="info">Used by Components</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {semanticColors.map((c) => (
            <div
              key={c.token}
              onClick={(e) => copySwatch(e, c.token)}
              className="group cursor-pointer rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/50 transition-all flex flex-col"
            >
              <div className={`h-20 w-full ${c.token} border-b border-border/40 relative flex items-end justify-end p-2`}>
                <div className="rounded-md bg-card/80 p-1 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="size-3 text-foreground" />
                </div>
              </div>
              <div className="p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{c.label}</span>
                  <span className="text-3xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Copy HEX</span>
                </div>
                <p className="text-3xs text-muted-foreground font-mono">{c.token}</p>
                <p className="text-3xs text-muted-foreground">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier 1: Primitives (Collapsed by default in Accordion) */}
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
                      Tier 1 — Primitive Color Ramps (OKLCH Atoms)
                    </h2>
                    <Badge variant="outline" className="text-3xs">Collapsed</Badge>
                  </div>
                  <p className="text-2xs text-muted-foreground">
                    Click to expand raw OKLCH scales defined in <code>primitives.css</code>. Click any step to copy its HEX value.
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6 space-y-6">
              {primitiveRamps.map((ramp) => (
                <div key={ramp.name} className="space-y-2">
                  <h3 className="text-xs font-semibold text-foreground font-mono">
                    {ramp.name}
                  </h3>
                  <div className="grid grid-cols-11 gap-1.5 rounded-xl border border-border bg-card p-2">
                    {ramp.steps.map((step) => (
                      <div
                        key={step.name}
                        onClick={(e) => copySwatch(e, `${ramp.name} step ${step.name}`)}
                        className={`group cursor-pointer h-14 rounded-lg flex flex-col justify-between p-1.5 transition-all hover:scale-105 hover:shadow-md ${step.bg}`}
                      >
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <Copy className={`size-3 ${step.darkText ? "text-slate-900" : "text-white"}`} />
                        </div>
                        <span
                          className={`text-3xs font-mono font-bold ${
                            step.darkText ? "text-slate-900" : "text-white"
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
