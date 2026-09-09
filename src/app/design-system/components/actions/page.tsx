"use client"

import * as React from "react"
import {
  Button,
  ButtonGroup,
  ButtonGroupText,
  BackButton,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Badge,
} from "@apna/design-system"
import { Bold, Italic, Underline, ChevronDown, Layers, Plus, ArrowRight, Download, Bookmark, Share2, Search, Filter, Sliders } from "@apna/design-system"

export default function ActionsComponentsPage() {
  const [activeSize, setActiveSize] = React.useState<"lg" | "default" | "sm">("lg")

  const sizeLabels = {
    lg: "Large (lg · H5 16px)",
    default: "Medium / Default (default · H6 14px)",
    sm: "Small (sm · H7 12px)",
  }

  const variants = [
    { name: "Primary / Default", variant: "default" as const },
    { name: "Secondary", variant: "secondary" as const },
    { name: "Outline", variant: "outline" as const },
    { name: "Ghost", variant: "ghost" as const },
    { name: "Destructive", variant: "destructive" as const },
    { name: "Link", variant: "link" as const },
  ]

  const buttonTypographySpecs = [
    { size: "Large (lg)", headingRole: "H5 Heading Font", cssSpec: "text-base font-heading font-medium (16px)", usage: "Primary hero CTAs & modal primary action" },
    { size: "Medium / Default (default)", headingRole: "H6 Heading Font", cssSpec: "text-sm font-heading font-semibold (14px)", usage: "Standard card & form action buttons" },
    { size: "Small (sm)", headingRole: "H7 Heading Font", cssSpec: "text-xs font-heading font-semibold (12px)", usage: "Table row actions, inline filters" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="default">Category 1</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          1. Actions & Buttons
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Primary interaction surfaces. Interactive size control, 6 variants, icon slots (leading/trailing), button groups, and toggles.
        </p>
      </div>

      {/* Code Snippet */}
      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Button, ButtonGroup, ButtonGroupText, BackButton, Toggle, ToggleGroup } from "@apna/design-system"'}</code>
      </div>

      {/* Typography Hierarchy Specs */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground font-heading">
          <Layers className="size-4 text-primary" />
          <span>Button Typography Rules Across All Variants (Primary, Secondary, Outline, Ghost, Destructive, Link)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {buttonTypographySpecs.map((spec) => (
            <div key={spec.size} className="rounded-lg border border-border/80 bg-muted/40 p-3 space-y-1.5">
              <span className="text-3xs font-bold font-mono text-primary uppercase tracking-wider">{spec.size}</span>
              <p className="text-xs font-bold font-heading text-foreground">{spec.headingRole}</p>
              <code className="text-3xs font-mono text-muted-foreground block">{spec.cssSpec}</code>
              <p className="text-3xs text-muted-foreground">{spec.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Global Interactive Size Control Bar */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-primary" />
            <span className="text-xs font-bold font-heading text-foreground">Interactive Size Toggle</span>
            <Badge variant="outline" className="text-3xs font-mono">Active: {sizeLabels[activeSize]}</Badge>
          </div>

          {/* Size Segment Selector */}
          <div className="flex items-center gap-1.5 bg-muted p-1 rounded-lg border border-border/60">
            <Button
              variant={activeSize === "lg" ? "default" : "ghost"}
              size="xs"
              onClick={() => setActiveSize("lg")}
              className="text-2xs"
            >
              Large (lg)
            </Button>
            <Button
              variant={activeSize === "default" ? "default" : "ghost"}
              size="xs"
              onClick={() => setActiveSize("default")}
              className="text-2xs"
            >
              Medium (default)
            </Button>
            <Button
              variant={activeSize === "sm" ? "default" : "ghost"}
              size="xs"
              onClick={() => setActiveSize("sm")}
              className="text-2xs"
            >
              Small (sm)
            </Button>
          </div>
        </div>
      </div>

      {/* Button Variant Showcase (Dynamically reacting to activeSize) */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading">
              Button Variants Showcase ({sizeLabels[activeSize]})
            </h2>
            <p className="text-2xs text-muted-foreground">
              Toggle the size control above to see how all 6 variants scale dynamically.
            </p>
          </div>
          <Badge variant="info">Size: {activeSize}</Badge>
        </div>

        <div className="space-y-2 divide-y divide-border/40">
          {variants.map((v) => (
            <div key={v.variant} className="py-5 first:pt-0 last:pb-0 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-heading text-foreground">{v.name}</span>
                <code className="text-3xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  variant=&quot;{v.variant}&quot; size=&quot;{activeSize}&quot;
                </code>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Standard Text */}
                <Button variant={v.variant} size={activeSize}>
                  {v.name} Action
                </Button>

                {/* Leading Icon */}
                <Button variant={v.variant} size={activeSize} leadingIcon={<Plus />}>
                  With Leading Icon
                </Button>

                {/* Trailing Icon */}
                <Button variant={v.variant} size={activeSize} trailingIcon={<ArrowRight />}>
                  With Trailing Icon
                </Button>

                {/* Icon Only */}
                {v.variant !== "link" && (
                  <Button
                    variant={v.variant}
                    size={
                      activeSize === "lg"
                        ? "icon-lg"
                        : activeSize === "sm"
                        ? "icon-sm"
                        : "icon"
                    }
                    aria-label="Action icon"
                  >
                    <Bookmark className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button Groups Showcase (Primary, Secondary, Outline, Text Addon) */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h2 className="text-base font-semibold text-foreground font-heading">
              Button Groups (Primary, Secondary, Outline & Text Addon)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Segmented action controls. Renders seamless merged borders and rounded corners.
            </p>
          </div>
          <Badge variant="success">Segmented Controls</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Button Group */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">1. Primary Button Group (`variant=&quot;default&quot;`)</span>
              <Badge variant="default" className="text-3xs">Primary Style</Badge>
            </div>
            <p className="text-3xs text-muted-foreground">Split button for primary action + dropdown menu.</p>
            <div className="pt-2">
              <ButtonGroup>
                <Button variant="default" size={activeSize} leadingIcon={<Plus />}>
                  Publish Job Post
                </Button>
                <Button
                  variant="default"
                  size={
                    activeSize === "lg"
                      ? "icon-lg"
                      : activeSize === "sm"
                      ? "icon-sm"
                      : "icon"
                  }
                  aria-label="More publishing options"
                  className="border-l border-primary-foreground/20"
                >
                  <ChevronDown className="size-4" />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Secondary Button Group */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">2. Secondary Button Group (`variant=&quot;secondary&quot;`)</span>
              <Badge variant="secondary" className="text-3xs">Secondary Style</Badge>
            </div>
            <p className="text-3xs text-muted-foreground">Segmented action bar for candidate management.</p>
            <div className="pt-2">
              <ButtonGroup>
                <Button variant="secondary" size={activeSize} leadingIcon={<Share2 />}>
                  Share Candidate
                </Button>
                <Button variant="secondary" size={activeSize} leadingIcon={<Download />}>
                  Export Resume
                </Button>
                <Button
                  variant="secondary"
                  size={
                    activeSize === "lg"
                      ? "icon-lg"
                      : activeSize === "sm"
                      ? "icon-sm"
                      : "icon"
                  }
                  aria-label="More candidate options"
                >
                  <ChevronDown className="size-4" />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Outline Button Group */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">3. Outline Button Group (`variant=&quot;outline&quot;`)</span>
              <Badge variant="outline" className="text-3xs">Outline Style</Badge>
            </div>
            <p className="text-3xs text-muted-foreground">Segmented filter bar or view switcher.</p>
            <div className="pt-2">
              <ButtonGroup>
                <Button variant="outline" size={activeSize} leadingIcon={<Filter />}>
                  Filter List
                </Button>
                <Button variant="outline" size={activeSize}>
                  Sort
                </Button>
                <Button
                  variant="outline"
                  size={
                    activeSize === "lg"
                      ? "icon-lg"
                      : activeSize === "sm"
                      ? "icon-sm"
                      : "icon"
                  }
                  aria-label="Search"
                >
                  <Search className="size-4" />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Button Group with Text Addon */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">4. Button Group with Text Addon</span>
              <Badge variant="info" className="text-3xs">Text Addon</Badge>
            </div>
            <p className="text-3xs text-muted-foreground">Prefix label addon with action button.</p>
            <div className="pt-2">
              <ButtonGroup>
                <ButtonGroupText>https://apnahire.com/jobs/</ButtonGroupText>
                <Button variant="default" size={activeSize}>Copy URL</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase 4: Back Button & Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
            Back Button Component
          </h2>
          <div className="flex items-center gap-4">
            <BackButton />
            <span className="text-xs text-muted-foreground">Standard product navigation back link</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
            Formatting Toggles & Toggle Groups
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Toggle aria-label="Toggle bold">
              <Bold className="size-4" />
            </Toggle>

            <ToggleGroup multiple>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
