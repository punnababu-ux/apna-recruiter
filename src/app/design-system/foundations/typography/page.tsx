"use client"

import * as React from "react"
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@apna/design-system"
import { Type, Code, Heading, Layers, ArrowRight } from "@apna/design-system"

export default function TypographyPage() {
  const primitiveWeights = [
    { name: "100", label: "Thin", val: "100", cls: "font-thin" },
    { name: "200", label: "Extra Light", val: "200", cls: "font-extralight" },
    { name: "300", label: "Light", val: "300", cls: "font-light" },
    { name: "400", label: "Regular", val: "400", cls: "font-normal" },
    { name: "500", label: "Medium", val: "500", cls: "font-medium" },
    { name: "600", label: "Semi Bold", val: "600", cls: "font-semibold" },
    { name: "700", label: "Bold", val: "700", cls: "font-bold" },
    { name: "800", label: "Extra Bold", val: "800", cls: "font-extrabold" },
    { name: "900", label: "Black", val: "900", cls: "font-black" },
  ]

  const primitiveSizes = [
    { token: "--font-size-2xs", val: "10px / 0.625rem" },
    { token: "--font-size-xs", val: "12px / 0.75rem" },
    { token: "--font-size-sm", val: "14px / 0.875rem" },
    { token: "--font-size-md", val: "16px / 1.0rem" },
    { token: "--font-size-lg", val: "18px / 1.125rem" },
    { token: "--font-size-xl", val: "20px / 1.25rem" },
    { token: "--font-size-2xl", val: "24px / 1.5rem" },
    { token: "--font-size-3xl", val: "30px / 1.875rem" },
    { token: "--font-size-4xl", val: "36px / 2.25rem" },
    { token: "--font-size-5xl", val: "48px / 3.0rem" },
    { token: "--font-size-6xl", val: "60px / 3.75rem" },
  ]

  const fontFamilies = [
    {
      name: "Sans / Body Font",
      variable: "--font-body",
      primitive: "--font-family-sans",
      fontClass: "font-body",
      stack: 'Figtree / Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
      description: "Primary typeface used for UI copy, form controls, tables, and product content.",
      sample: "The quick brown fox jumps over the lazy dog.",
      icon: Type,
    },
    {
      name: "Heading Font",
      variable: "--font-heading",
      primitive: "--font-family-sans",
      fontClass: "font-heading",
      stack: 'Figtree, ui-sans-serif, system-ui, -apple-system, sans-serif',
      description: "Brand heading typeface used for page titles, hero headers, and card titles.",
      sample: "Build Faster with Apna Hire Design System",
      icon: Heading,
    },
    {
      name: "Monospace Font",
      variable: "--font-mono",
      primitive: "--font-family-mono",
      fontClass: "font-mono",
      stack: 'Geist Mono, ui-monospace, SFMono-Regular, Consolas, monospace',
      description: "Code snippets, token names, technical metrics, and tabular numeric data.",
      sample: "const theme = { primary: 'var(--primary)' }",
      icon: Code,
    },
  ]

  const headings = [
    { label: "Display", className: "text-5xl font-heading font-extrabold tracking-tight", size: "48px / 3.0rem", px: 48, tag: "Display", compose: "font-heading + text-5xl + font-extrabold + leading-tight" },
    { label: "Hero / H1 Large", className: "text-4xl font-heading font-bold tracking-tight", size: "36px / 2.25rem", px: 36, tag: "Hero", compose: "font-heading + text-4xl + font-bold + leading-tight" },
    { label: "Heading 1 (H1)", className: "text-3xl font-heading font-bold tracking-tight", size: "30px / 1.875rem", px: 30, tag: "H1", compose: "font-heading + text-3xl + font-bold + leading-tight" },
    { label: "Heading 2 (H2)", className: "text-2xl font-heading font-semibold tracking-tight", size: "24px / 1.5rem", px: 24, tag: "H2", compose: "font-heading + text-2xl + font-semibold + leading-snug" },
    { label: "Heading 3 (H3)", className: "text-xl font-heading font-semibold", size: "20px / 1.25rem", px: 20, tag: "H3", compose: "font-heading + text-xl + font-semibold + leading-snug" },
    { label: "Heading 4 (H4)", className: "text-lg font-heading font-medium", size: "18px / 1.125rem", px: 18, tag: "H4", compose: "font-heading + text-lg + font-medium + leading-snug" },
    { label: "Heading 5 (H5)", className: "text-base font-heading font-medium", size: "16px / 1.0rem", px: 16, tag: "H5", compose: "font-heading + text-base + font-medium + leading-snug" },
    { label: "Heading 6 (H6)", className: "text-sm font-heading font-semibold", size: "14px / 0.875rem", px: 14, tag: "H6", compose: "font-heading + text-sm + font-semibold + leading-snug" },
    { label: "Heading 7 (H7)", className: "text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground", size: "12px / 0.75rem", px: 12, tag: "H7", compose: "font-heading + text-xs + font-bold + tracking-wider" },
  ]

  const bodyStyles = [
    { label: "Body 2XL", className: "text-2xl font-body font-normal leading-relaxed", size: "24px / 1.5rem", px: 24, role: "Marketing lead paragraph", compose: "font-body + text-2xl + font-normal + leading-relaxed" },
    { label: "Body XL", className: "text-xl font-body font-normal leading-relaxed", size: "20px / 1.25rem", px: 20, role: "Sub-hero lead copy", compose: "font-body + text-xl + font-normal + leading-relaxed" },
    { label: "Body LG", className: "text-lg font-body font-normal leading-normal", size: "18px / 1.125rem", px: 18, role: "Large card lead / prominent intro", compose: "font-body + text-lg + font-normal + leading-normal" },
    { label: "Body MD (Default)", className: "text-base font-body font-normal leading-normal", size: "16px / 1.0rem", px: 16, role: "Standard paragraph & main body", compose: "font-body + text-base + font-normal + leading-normal" },
    { label: "Body SM", className: "text-sm font-body font-normal leading-normal", size: "14px / 0.875rem", px: 14, role: "Form controls, table cells, UI text", compose: "font-body + text-sm + font-normal + leading-normal" },
    { label: "Body XS", className: "text-xs font-body font-normal leading-snug", size: "12px / 0.75rem", px: 12, role: "Meta text, tooltips, sub-labels", compose: "font-body + text-xs + font-normal + leading-snug" },
    { label: "Body 2XS / Micro", className: "text-2xs font-body font-medium leading-snug text-muted-foreground", size: "10px / 0.625rem", px: 10, role: "Badge text, overlines, timestamp", compose: "font-body + text-2xs + font-medium + leading-snug" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="success">Two-Tier Architecture</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          Typography System & Token Architecture
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Two-tier architecture: <strong>Tier 1 Primitives</strong> (Family, Weight 100-900, Size steps) → <strong>Tier 2 Semantics</strong> (`--font-body`, `--font-heading`, `--font-weight-*`) → <strong>Tier 3 Composite Utilities</strong> (`text-h1`, `text-body`).
        </p>
      </div>

      {/* Architecture Flow Banner */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground font-heading">
          <Layers className="size-4 text-primary" />
          <span>How Typography Presets Are Composed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-2xs font-mono">
          <div className="rounded-lg border border-border/80 bg-muted/60 p-3 space-y-1">
            <span className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">Tier 1 — Primitives</span>
            <p className="text-foreground font-semibold">Raw Atoms</p>
            <p className="text-muted-foreground">--font-family-sans</p>
            <p className="text-muted-foreground">--font-weight-700 (700)</p>
            <p className="text-muted-foreground">--font-size-3xl (30px)</p>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-bold uppercase tracking-wider text-primary">Tier 2 — Semantics</span>
              <ArrowRight className="size-3 text-primary hidden md:block" />
            </div>
            <p className="text-foreground font-semibold">Intent Roles</p>
            <p className="text-primary">--font-heading</p>
            <p className="text-primary">--font-weight-bold</p>
            <p className="text-primary">--text-3xl</p>
          </div>

          <div className="rounded-lg border border-border/80 bg-muted/60 p-3 space-y-1">
            <span className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">Tier 3 — Preset Utility</span>
            <p className="text-foreground font-semibold">Composite Preset</p>
            <p className="text-foreground font-bold font-heading text-sm">@utility text-h1</p>
            <p className="text-muted-foreground">className=&quot;text-h1&quot;</p>
          </div>
        </div>
      </div>

      {/* Font Families Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Font Families (Tier 2 Semantic Roles)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Configured via CSS variables in layout & <code>primitives.css</code>.
            </p>
          </div>
          <Badge variant="outline">Font Stacks</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fontFamilies.map((font) => {
            const Icon = font.icon
            return (
              <div
                key={font.name}
                className="rounded-xl border border-border bg-card p-5 space-y-3 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-muted p-1.5 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{font.name}</span>
                    </div>
                    <code className="text-3xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {font.variable}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground">{font.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className={`text-sm ${font.fontClass} text-foreground line-clamp-2`}>
                    {font.sample}
                  </div>
                  <div className="flex items-center justify-between text-3xs font-mono text-muted-foreground">
                    <span className="truncate" title={font.stack}>{font.stack}</span>
                    <span className="shrink-0 text-primary font-medium">← {font.primitive}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Heading Presets (48px to 12px) */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Heading Presets (`font-heading`) — 48px to 12px
            </h2>
            <p className="text-2xs text-muted-foreground">
              9-level heading hierarchy from Display (48px) down to Heading 7 (12px).
            </p>
          </div>
          <Badge variant="info">48px → 12px Scale</Badge>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 divide-y divide-border/60">
          {headings.map((h) => (
            <div key={h.label} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-3xs font-mono px-1.5 py-0">{h.tag}</Badge>
                  <span className="text-xs text-muted-foreground font-semibold">{h.label}</span>
                  <span className="text-3xs text-muted-foreground font-mono">({h.compose})</span>
                </div>
                <div className={`${h.className} text-foreground mt-1`}>
                  The quick brown fox jumps
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-mono shrink-0 self-start sm:self-auto bg-muted px-2 py-1 rounded-md">
                {h.size} ({h.px}px)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Body & Caption Presets (24px to 11px) */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Body & Text Scale (`font-body`) — 24px to 11px
            </h2>
            <p className="text-2xs text-muted-foreground">
              7-level body text scale from Body 2XL (24px) down to Body 2XS Micro (10px-11px).
            </p>
          </div>
          <Badge variant="success">24px → 11px Scale</Badge>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 divide-y divide-border/60">
          {bodyStyles.map((b) => (
            <div key={b.label} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{b.label}</span>
                  <span className="text-3xs text-muted-foreground">· {b.role}</span>
                  <span className="text-3xs text-muted-foreground font-mono">({b.compose})</span>
                </div>
                <div className={`${b.className} text-foreground mt-1`}>
                  The quick brown fox jumps over the lazy dog to verify legibility and line height.
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-mono shrink-0 self-start sm:self-auto bg-muted px-2 py-1 rounded-md">
                {b.size} ({b.px}px)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier 1 Primitives: Weight Scale & Size Steps (Collapsed by default in Accordion) */}
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
                      Tier 1 — Primitive Typography Scales (Raw Atoms)
                    </h2>
                    <Badge variant="outline" className="text-3xs">Collapsed</Badge>
                  </div>
                  <p className="text-2xs text-muted-foreground">
                    Click to expand raw weight integers (100-900) and font size step scales defined in <code>primitives.css</code>.
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight Scale */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-foreground font-mono">
                    Font Weight Scale (--font-weight-100...900)
                  </h3>
                  <div className="space-y-1.5 divide-y divide-border/40">
                    {primitiveWeights.map((w) => (
                      <div key={w.name} className="pt-1.5 first:pt-0 flex items-center justify-between">
                        <span className={`text-xs text-foreground ${w.cls}`}>
                          {w.label} ({w.val}) — Quick Brown Fox
                        </span>
                        <code className="text-3xs font-mono text-muted-foreground">--font-weight-{w.name}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Ramp */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-foreground font-mono">
                    Font Size Step Scale (--font-size-*)
                  </h3>
                  <div className="space-y-1.5 divide-y divide-border/40">
                    {primitiveSizes.map((s) => (
                      <div key={s.token} className="pt-1.5 first:pt-0 flex items-center justify-between">
                        <code className="text-3xs font-mono text-primary">{s.token}</code>
                        <span className="text-xs font-mono text-muted-foreground">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
