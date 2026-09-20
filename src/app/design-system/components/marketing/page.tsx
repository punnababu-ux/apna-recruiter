"use client"

import * as React from "react"
import {
  ArrowRight,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CheckCircle2,
  Section,
  SectionHeading,
  Sparkles,
} from "@apna/design-system"

export default function MarketingComponentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="destructive">Category 8</Badge>
        </div>
        <h1 className="mt-2 font-heading text-2xl font-bold text-foreground">
          8. Marketing &amp; Layout
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The band, the surface, and the block that opens a band. Marketing
          pages are stacks of these three.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>
          {'import { Section, SectionHeading, Card } from "@apna/design-system"'}
        </code>
      </div>

      {/* ── Section ─────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Section — tones
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            One band of a page: full-bleed background, page gutters, and a
            centred column capped to a content width. <code>tone</code> paints
            the band; <code>width</code> caps the column.
          </p>
        </div>

        <div className="divide-y divide-border">
          {(["transparent", "muted", "card", "ink"] as const).map((tone) => (
            <Section key={tone} tone={tone} size="sm">
              <div className="flex items-center justify-between gap-4">
                <code className="font-mono text-xs opacity-70">
                  tone=&quot;{tone}&quot;
                </code>
                <span className="text-sm">
                  Descendants inherit the band&apos;s foreground.
                </span>
              </div>
            </Section>
          ))}
        </div>
      </div>

      {/* ── SectionHeading ──────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">
            SectionHeading
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Carries the easy-to-forget bits: balanced title, a reading measure
            on the description, and the gap. Sets no colour, so it works
            unchanged on an ink band.
          </p>
        </div>

        <Section tone="transparent" size="sm">
          <SectionHeading
            level={1}
            eyebrow={
              <Badge size="lg" variant="outline">
                <CheckCircle2 aria-hidden />
                India&apos;s #1 Hiring Platform
              </Badge>
            }
            title={
              <>
                India&apos;s Largest{" "}
                <span className="text-primary">AI-Native</span> Early Talent
                Platform
              </>
            }
            description="level={1} uses the fluid display preset — 40px on a phone, 60px from ~1280 up, with no breakpoint classes on the page."
          />
        </Section>

        <Section tone="muted" size="sm">
          <SectionHeading
            align="center"
            eyebrow={
              <span className="text-overline text-primary">
                The apna hiring suite
              </span>
            }
            title="A single platform for every hiring need"
            description="align=&quot;center&quot; with a plain-text eyebrow. The description is capped to a reading measure rather than the full band."
          />
        </Section>

        <Section tone="ink" size="sm">
          <SectionHeading
            title="The same component, on ink"
            description="No tone prop was passed here — the heading reads the band's tone and moves its muted foreground with it."
            actions={
              <Button size="sm" variant="outline">
                Action <ArrowRight aria-hidden />
              </Button>
            }
          />
        </Section>
      </div>

      {/* ── Card ────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Card — tones
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The base surface. <code>tone=&quot;ink&quot;</code> moves the
            background, border and description colour together — the reason
            this is a primitive and not a class string.
          </p>
        </div>

        <div className="grid gap-4 bg-background p-4 sm:grid-cols-2 sm:p-6">
          {(["default", "muted", "ink", "ghost"] as const).map((tone) => (
            <Card key={tone} tone={tone} interactive>
              <CardHeader>
                <CardTitle>tone=&quot;{tone}&quot;</CardTitle>
                <CardDescription>
                  CardDescription follows the tone without being told about it.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button size="sm" variant={tone === "ink" ? "outline" : "default"}>
                  <Sparkles aria-hidden />
                  Action
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Type presets ────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border/60 bg-muted/30 p-4 sm:p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Marketing type presets
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Resize the window — <code>text-display-lg</code> is fluid.
          </p>
        </div>

        <div className="space-y-6 bg-background p-4 sm:p-6">
          <div>
            <code className="font-mono text-xs text-muted-foreground">
              text-display-lg
            </code>
            <p className="text-display-lg text-foreground">Hire top talent</p>
          </div>
          <div>
            <code className="font-mono text-xs text-muted-foreground">
              text-lead
            </code>
            <p className="text-lead text-muted-foreground">
              Subcopy under a headline. Sets size and rhythm but no colour, so
              it can sit on any surface.
            </p>
          </div>
          <div>
            <code className="font-mono text-xs text-muted-foreground">
              text-quote
            </code>
            <p className="text-quote text-foreground">
              &ldquo;We replaced four hiring tools with one.&rdquo;
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <code className="font-mono text-xs text-muted-foreground">
              Badge size
            </code>
            <Badge size="sm">sm</Badge>
            <Badge>default</Badge>
            <Badge size="lg">lg — marketing eyebrow</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
