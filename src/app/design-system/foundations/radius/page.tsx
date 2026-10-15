"use client"

import * as React from "react"
import {
  Badge,
  Button,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Label,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Toggle,
} from "@apna/design-system"
import { Play, Sparkles, Zap, Layers } from "@apna/design-system"

export default function RadiusMotionPage() {
  const [animateKey, setAnimateKey] = React.useState(0)

  const primitiveRadiuses = [
    { token: "rounded-xs", size: "2px", role: "Hairline containers & badges" },
    { token: "rounded-sm", size: "4px", role: "Inputs, selects, textareas (--radius-field)" },
    { token: "rounded-md", size: "6px", role: "Buttons, chips, toggles (--radius-control)" },
    { token: "rounded-lg", size: "8px", role: "Cards, popovers, menus (--radius-surface)" },
    { token: "rounded-xl", size: "12px", role: "Dialogs, sheets, drawers (--radius-overlay)" },
    { token: "rounded-2xl", size: "16px", role: "Marketing blocks (--radius-hero)" },
    { token: "rounded-3xl", size: "24px", role: "Large feature splashes" },
    { token: "rounded-full", size: "9999px", role: "Pills, avatars, capsules (--radius-pill)" },
  ]

  const semanticRadiusRoles = [
    { role: "rounded-field", primitive: "rounded-sm (4px)", usage: "Inputs, textareas, selects" },
    { role: "rounded-control", primitive: "rounded-md (6px)", usage: "Buttons, chips, toggles" },
    { role: "rounded-surface", primitive: "rounded-lg (8px)", usage: "Cards, popovers, menus" },
    { role: "rounded-overlay", primitive: "rounded-xl (12px)", usage: "Dialogs, sheets, drawers" },
    { role: "rounded-hero", primitive: "rounded-2xl (16px)", usage: "Hero containers, splashes" },
    { role: "rounded-pill", primitive: "rounded-full (9999px)", usage: "Avatars, status pills" },
  ]

  const durationTokens = [
    { token: "duration-75", val: "75ms", usage: "Instant micro-flips" },
    { token: "duration-100", val: "100ms", usage: "Fast state toggles" },
    { token: "duration-150", val: "150ms", usage: "Hover / pressed state flips (--duration-hover)" },
    { token: "duration-200", val: "200ms", usage: "Small surface enter (--duration-enter)" },
    { token: "duration-300", val: "300ms", usage: "Dropdown & popover expansion" },
    { token: "duration-500", val: "500ms", usage: "Large panels, sheets, dialogs (--duration-large)" },
    { token: "duration-700", val: "700ms", usage: "Complex page transitions" },
    { token: "duration-1000", val: "1000ms", usage: "Progress bars & ambient loops" },
  ]

  const liveSurfaceUtilities = [
    { name: "ink", what: "While pressed, an ink spreads from the touch point; on release it fills the surface and fades into the hover state.", tokens: "--duration-ink · --duration-ink-fade · --ink-opacity" },
    { name: "press", what: "The control compresses the moment it is pressed. press-subtle is the gentler step for cards.", tokens: "--press-scale · --press-scale-subtle" },
    { name: "transition-interactive", what: "Colour, border, shadow, focus ring and transform changes ease instead of snapping.", tokens: "--duration-hover · --ease-standard" },
    { name: "transition-select", what: "Selection lands with a slight spring: checkbox ticks, radio dots, switch thumbs, chevrons.", tokens: "--duration-select · --ease-select" },
    { name: "tab-indicator · sliding-indicator", what: "One selection pill glides to the active option — tabs, segmented switchers, chip tabs. Never a cross-fade.", tokens: "--duration-slide · --ease-slide" },
  ]

  const easingCurves = [
    { name: "ease-standard", curve: "cubic-bezier(0.2, 0, 0, 1)", desc: "Material-style default for balanced transitions" },
    { name: "ease-decel", curve: "cubic-bezier(0.05, 0.7, 0.1, 1)", desc: "Egress / enter curve — decelerates into view" },
    { name: "ease-emphasis", curve: "cubic-bezier(0.3, 0, 0.8, 0.15)", desc: "Ingress / exit curve — accelerates out of view" },
    { name: "ease-spring", curve: "cubic-bezier(0.34, 1.56, 0.64, 1)", desc: "Playful bouncy spring curve for highlights" },
  ]

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="secondary">Radius & Motion</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          Radius & Motion Tokens
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Modular corner radiuses, transition duration steps, and intent-based easing curves.
        </p>
      </div>

      {/* Live surfaces — the interaction language */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Live Surfaces — Micro-interactions
            </h2>
            <p className="text-2xs text-muted-foreground">
              Built into the primitives, so every screen gets them for free. Press and hold anything below.
            </p>
          </div>
          <Badge variant="secondary">Interactive</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <p className="text-overline text-muted-foreground">Press · ink · focus</p>
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle aria-label="Bold" variant="outline">Bold</Toggle>
              <Toggle aria-label="Italic" variant="outline">Italic</Toggle>
              <Button size="icon" variant="outline" aria-label="Replay">
                <Play />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
            <p className="text-overline text-muted-foreground">Selection glides</p>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="hired">Hired</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-wrap items-center gap-6">
              <Label className="flex items-center gap-2">
                <Checkbox defaultChecked /> Remote
              </Label>
              <Label className="flex items-center gap-2">
                <Switch defaultChecked /> Notify me
              </Label>
            </div>
            <Slider defaultValue={40} aria-label="Salary range" />
          </div>

          <button
            type="button"
            className="ink press-subtle card-hover-lift relative flex flex-col gap-1 rounded-xl border border-border bg-card p-5 text-left lg:col-span-2"
          >
            <span className="text-sm font-semibold text-foreground">A clickable card</span>
            <span className="text-xs text-muted-foreground">
              Lifts on hover, gives under the press, and inks from where you touched it.
            </span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-semibold">Utility</th>
                <th className="px-4 py-2 font-semibold">What the user sees</th>
                <th className="px-4 py-2 font-semibold">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {liveSurfaceUtilities.map((u) => (
                <tr key={u.name} className="border-t border-border">
                  <td className="px-4 py-2 font-mono font-semibold text-foreground">{u.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">{u.what}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{u.tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-2xs text-muted-foreground">
          Reduced motion keeps the feedback (a held tint on press) and drops the movement. Mount{" "}
          <code>&lt;InkProvider /&gt;</code> once at the root so the ink knows where you pressed.
        </p>
      </div>

      {/* Semantic Radius Intent Roles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Semantic Radius Intent Roles (Tier 2)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Components consume these role tokens so the visual softness of the whole app can be retuned in one line.
            </p>
          </div>
          <Badge variant="info">Component Roles</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {semanticRadiusRoles.map((sr) => (
            <div key={sr.role} className="rounded-xl border border-border bg-card p-4 space-y-2 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <code className="text-xs font-mono font-bold text-primary">{sr.role}</code>
                <p className="text-3xs text-muted-foreground">{sr.usage}</p>
              </div>
              <Badge variant="outline" className="text-3xs font-mono shrink-0">
                {sr.primitive}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Motion & Durations Section */}
      <div className="space-y-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Motion Durations (`--duration-*`)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Hover over or click any card to preview its transition duration.
            </p>
          </div>
          <Button variant="outline" size="xs" onClick={() => setAnimateKey((k) => k + 1)}>
            <Play className="size-3 mr-1" /> Re-trigger All Animations
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {durationTokens.map((d) => (
            <div
              key={d.token}
              className="group cursor-pointer rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-foreground">{d.token}</code>
                <Badge variant="secondary" className="text-3xs font-mono">{d.val}</Badge>
              </div>

              {/* Interactive Motion Bar */}
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden relative">
                <div
                  key={animateKey}
                  style={{ transitionDuration: d.val }}
                  className="h-full w-full bg-primary rounded-full transition-transform origin-left -translate-x-full group-hover:translate-x-0"
                />
              </div>

              <p className="text-3xs text-muted-foreground">{d.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Easing Curves */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Easing Curves (`--ease-*`)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Named after intent so timing curves can be swapped system-wide without component edits.
            </p>
          </div>
          <Badge variant="success">Easing Intent Roles</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {easingCurves.map((e) => (
            <div
              key={e.name}
              className="group cursor-pointer rounded-xl border border-border bg-card p-5 space-y-3 shadow-xs hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-1 text-primary">
                    <Zap className="size-3.5" />
                  </div>
                  <code className="text-xs font-mono font-bold text-foreground">{e.name}</code>
                </div>
                <span className="text-3xs font-mono text-muted-foreground truncate max-w-44">{e.curve}</span>
              </div>

              {/* Interactive Easing Preview */}
              <div className="h-8 w-full rounded-lg bg-muted/60 p-1 flex items-center relative overflow-hidden">
                <div
                  key={animateKey}
                  style={{ transition: `transform 500ms ${e.curve}` }}
                  className="h-6 w-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-3xs font-bold shadow-xs transition-transform group-hover:translate-x-48"
                >
                  <Sparkles className="size-3" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Corner Radiuses (Tier 1 Primitives Collapsed by default in Accordion) */}
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
                      Tier 1 — Primitive Corner Radiuses (Raw Atoms)
                    </h2>
                    <Badge variant="outline" className="text-3xs">Collapsed</Badge>
                  </div>
                  <p className="text-2xs text-muted-foreground">
                    Click to expand modular scale driven by <code>--radius-base</code> (8px) and <code>--radius-ratio</code> (1.25).
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {primitiveRadiuses.map((r) => (
                  <div key={r.token} className="rounded-xl border border-border bg-card p-3 text-center space-y-2 flex flex-col justify-between shadow-xs">
                    <div className={`h-14 w-full border-2 border-primary bg-primary/10 ${r.token} mx-auto transition-transform hover:scale-105`} />
                    <div className="space-y-0.5">
                      <p className="text-2xs font-mono font-bold text-foreground">{r.token}</p>
                      <p className="text-3xs text-muted-foreground font-mono">{r.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
