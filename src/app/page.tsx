"use client"

import { Fragment, useEffect, useMemo, useRef, useState } from "react"

/**
 * `useMounted()` — true on the client after hydration, false on the server.
 * Implemented via `useSyncExternalStore` (no effect, no cascading render) so
 * it's safe to use as an SSR gate around components that produce
 * non-deterministic HTML (e.g. Calendar's `new Date()`).
 */
// const EMPTY_SUBSCRIBE = () => () => {}
// function useMounted(): boolean {
//   return useSyncExternalStore(
//     EMPTY_SUBSCRIBE,
//     () => true,
//     () => false,
//   )
// }
import { Bold, ChevronDown, Italic, Mail, Settings, Underline, User } from "@apna/design-system"
import { toast } from "sonner"

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { ApnaLogo, Badge, badgeVariants } from "@apna/design-system"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command"
// import {
//   ContextMenu,
//   ContextMenuCheckboxItem,
//   ContextMenuContent,
//   ContextMenuGroup,
//   ContextMenuItem,
//   ContextMenuLabel,
//   ContextMenuSeparator,
//   ContextMenuTrigger,
// } from "@/components/ui/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import {
//   Empty,
//   EmptyContent,
//   EmptyDescription,
//   EmptyHeader,
//   EmptyMedia,
//   EmptyTitle,
// } from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group"
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp"
// import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
// import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
// import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
// import { Slider } from "@/components/ui/slider"
// import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
// import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"
// import { Toggle } from "@/components/ui/toggle"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ModularScalesDemo } from "./_showcase/modular-scales-demo"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
// ---- OnlyRounds product molecules, organisms & templates -------------------
import Link from "next/link"
import { ArrowUpRight, Briefcase, Download, Share2, UserPlus } from "@apna/design-system"
// import { AIInsightChip } from "@/components/onlyrounds/ai-insight-chip"
// import { ScorePill } from "@/components/onlyrounds/score-pill"
// import { RadioCard } from "@/components/onlyrounds/radio-card"
import { Stepper } from "@/components/onlyrounds/stepper"
// import { InfoBanner } from "@/components/onlyrounds/info-banner"
// import { SplitButton } from "@/components/onlyrounds/split-button"
import { PageHeader } from "@/components/onlyrounds/page-header"
// import { FilterPanel } from "@/components/onlyrounds/filter-panel"
import {
  CandidateCard,
  type Candidate,
} from "@/components/onlyrounds/candidate-card"
import { ClientForm } from "@/components/onlyrounds/client-form"
import { CandidateTable } from "@/components/onlyrounds/candidate-table"
import { ClientsTable } from "@/components/onlyrounds/clients-table"
import { JobsTable } from "@/components/onlyrounds/jobs-table"
// import { NetworkShareSheet } from "@/components/onlyrounds/network-share-sheet"
import { ChipTabs } from "@/components/ui/chip-tabs"

// ---------------------------------------------------------------------------
// Token data used by the Foundations + Tokens sections of the showcase.
//
// TIER 1 — PRIMITIVES. Rendered for visual reference only. Components must
// NOT read these directly; they are the raw source of truth that Tier 2
// aliases point at. (See AGENTS.md · Token discipline.)
// ---------------------------------------------------------------------------
const PRIMITIVE_RAMP_STEPS = [
  "50", "100", "200", "300", "400",
  "500", "600", "700", "800", "900", "950",
] as const
const primitiveColorRamps = [
  { hue: "gray",       label: "Neutral · gray",              steps: ["0", ...PRIMITIVE_RAMP_STEPS, "1000"] },
  { hue: "apna-green", label: "Brand · apna-green (#1F8268 @ 600)", steps: [...PRIMITIVE_RAMP_STEPS] }, // token-lint-ignore: brand-ref hex is documentation, not a style value
  { hue: "apna-gold",  label: "Brand · apna-gold (#FFD166 @ 400)",  steps: [...PRIMITIVE_RAMP_STEPS] }, // token-lint-ignore: brand-ref hex is documentation, not a style value
  { hue: "apna-navy",  label: "Brand · apna-navy (#0F0B1A @ 950)",  steps: [...PRIMITIVE_RAMP_STEPS] }, // token-lint-ignore: brand-ref hex is documentation, not a style value
  { hue: "red",        label: "Destructive · red",           steps: [...PRIMITIVE_RAMP_STEPS] },
  { hue: "green",      label: "Reference · green",           steps: [...PRIMITIVE_RAMP_STEPS] },
  { hue: "amber",      label: "Warning · amber",             steps: [...PRIMITIVE_RAMP_STEPS] },
  { hue: "blue",       label: "Info · blue",                 steps: [...PRIMITIVE_RAMP_STEPS] },
] as const
const primitiveRadiusSteps = [
  "radius-none", "radius-xs", "radius-sm", "radius-md",
  "radius-lg", "radius-xl", "radius-2xl", "radius-3xl", "radius-full",
]
const primitiveTypographyScale = [
  "font-size-2xs", "font-size-xs", "font-size-sm", "font-size-md",
  "font-size-lg", "font-size-xl", "font-size-2xl", "font-size-3xl",
  "font-size-4xl", "font-size-5xl",
]
const primitiveDurations = [
  "duration-75", "duration-100", "duration-150", "duration-200",
  "duration-300", "duration-500", "duration-700", "duration-1000",
]

// Spacing showcase data. Numeric steps map 1:1 to Tailwind `p-*` / `gap-*`
// utilities. T-shirt and context roles are token aliases — prefer them in
// templates so the rhythm can be retuned globally without a rewrite.
const primitiveSpaceSteps: { token: string; utility: string; label: string }[] = [
  { token: "space-0-5", utility: "p-0.5", label: "2" },
  { token: "space-1",   utility: "p-1",   label: "4" },
  { token: "space-2",   utility: "p-2",   label: "8" },
  { token: "space-3",   utility: "p-3",   label: "12" },
  { token: "space-4",   utility: "p-4",   label: "16" },
  { token: "space-5",   utility: "p-5",   label: "20" },
  { token: "space-6",   utility: "p-6",   label: "24" },
  { token: "space-8",   utility: "p-8",   label: "32" },
  { token: "space-10",  utility: "p-10",  label: "40" },
  { token: "space-12",  utility: "p-12",  label: "48" },
  { token: "space-16",  utility: "p-16",  label: "64" },
  { token: "space-20",  utility: "p-20",  label: "80" },
  { token: "space-24",  utility: "p-24",  label: "96" },
  { token: "space-32",  utility: "p-32",  label: "128" },
]
// T-shirt aliases are CSS-only (not Tailwind utilities): they share the
// --spacing-* namespace with Tailwind's sizing utilities (max-w-md, w-sm, …),
// so exposing them breaks layouts. Consume via `var(--space-md)` in CSS, or
// map them to a context role (inline / stack / field / inset / section / page).
const spacingTshirtSteps: { token: string; primitive: string }[] = [
  { token: "space-2xs", primitive: "space-1"  },
  { token: "space-xs",  primitive: "space-2"  },
  { token: "space-sm",  primitive: "space-3"  },
  { token: "space-md",  primitive: "space-4"  },
  { token: "space-lg",  primitive: "space-6"  },
  { token: "space-xl",  primitive: "space-8"  },
  { token: "space-2xl", primitive: "space-12" },
  { token: "space-3xl", primitive: "space-16" },
  { token: "space-4xl", primitive: "space-24" },
  { token: "space-5xl", primitive: "space-32" },
]
const spacingContextRoles: { token: string; intent: string; utility: string }[] = [
  { token: "space-inline",  intent: "Between siblings on a row (icon → label)",        utility: "gap-inline"  },
  { token: "space-stack",   intent: "Between stacked blocks inside a section",          utility: "gap-stack"   },
  { token: "space-field",   intent: "Between label, control, help text",                utility: "gap-field"   },
  { token: "space-inset",   intent: "Padding inside a contained surface",               utility: "p-inset"     },
  { token: "space-section", intent: "Between top-level page sections",                  utility: "gap-section" },
  { token: "space-page",    intent: "Page gutter / max breathing room",                 utility: "p-page"      },
]

// TIER 2 — SEMANTICS. Grouped by role. Every token below is an alias that
// ultimately points at a primitive. Re-theming only changes these mappings.
const surfaceTokens = ["background", "foreground", "card", "card-foreground", "popover", "popover-foreground"]
const semanticGroups = [
  { label: "Primary",   tokens: ["primary", "primary-foreground"] },
  { label: "Secondary", tokens: ["secondary", "secondary-foreground"] },
  { label: "Muted",     tokens: ["muted", "muted-foreground"] },
  { label: "Accent",    tokens: ["accent", "accent-foreground"] },
  { label: "Highlight", tokens: ["highlight", "highlight-foreground"] },
  { label: "Status",    tokens: ["destructive", "destructive-subtle", "success", "success-subtle", "warning", "warning-subtle", "info", "info-subtle"] },
  { label: "Borders",   tokens: ["border", "input", "ring"] },
  { label: "Sidebar",   tokens: ["sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-accent", "sidebar-border"] },
  { label: "Charts",    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] },
]
const buttonVariantList = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const buttonSizeList = ["xs", "sm", "default", "lg"] as const
const badgeVariantList = ["default", "secondary", "destructive", "info", "success", "warning", "outline"] as const

// --- Helpers ---
function Swatch({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    const text = `var(--${token})`
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        toast(`Copied ${text}`)
        setTimeout(() => setCopied(false), 1200)
      })
    }
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy --${token}`}
      className="group/swatch block w-full overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-foreground/30 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="h-16 w-full border-b border-border" style={{ background: `var(--${token})` }} />
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="font-mono text-2xs font-medium">--{token}</div>
        <div className="font-mono text-2xs text-muted-foreground opacity-0 transition-opacity group-hover/swatch:opacity-100">
          {copied ? "copied" : "copy"}
        </div>
      </div>
    </button>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="rounded-xl border border-border bg-card p-6">{children}</div>
    </div>
  )
}

/**
 * LogoTile — previews a brand mark and offers a one-click SVG download.
 *
 * The tricky bit: logos reference CSS custom properties (gradient stops,
 * wordmark `--foreground`) so a naïve serialization produces an SVG that
 * renders correctly only inside *this* document. Before download we walk
 * the rendered DOM, read each node's computed fill / stroke / stop-color,
 * and inline the resolved values — so the downloaded file is portable.
 */
function LogoTile({
  name,
  filename,
  description,
  children,
}: {
  name: string
  filename: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const download = () => {
    const source = containerRef.current?.querySelector("svg")
    if (!source) return

    // Deep-clone so we can mutate freely without touching the live DOM.
    const clone = source.cloneNode(true) as SVGSVGElement

    // Normalize any CSS color string to sRGB. Chrome's getComputedStyle       // token-lint-ignore: pragma below documents lab/oklch/hex in a comment, no literals
    // returns lab() / oklch() when tokens are authored in OKLCH —              // token-lint-ignore: see above
    // those aren't valid in SVG 1.1 and render BLACK in Figma, Illustrator,
    // macOS Preview, and any viewer that predates CSS Color Module 4. The
    // canvas 2D context parses any CSS color and spits it back as sRGB        // token-lint-ignore: see above
    // hex or rgba, which every SVG viewer understands.
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    // Force sRGB so wide-gamut inputs (lab, oklch) get flattened on read-back.
    const ctx = canvas.getContext("2d", { colorSpace: "srgb" })
    const byte = (n: number) => n.toString(16).padStart(2, "0")
    const toSrgb = (color: string) => {
      if (!ctx || !color) return color
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
      return a === 255
        ? `#${byte(r)}${byte(g)}${byte(b)}`
        : `rgba(${r},${g},${b},${(a / 255).toFixed(3)})` // token-lint-ignore: runtime-built sRGB string for SVG export, not a theme literal
    }

    // Walk the ORIGINAL tree in lock-step with the clone so we can read the
    // browser's computed styles and write them onto the cloned attributes.
    const originals = [source, ...Array.from(source.querySelectorAll("*"))]
    const copies = [clone, ...Array.from(clone.querySelectorAll("*"))]
    originals.forEach((node, i) => {
      const cs = getComputedStyle(node)
      const target = copies[i] as Element
      ;(["fill", "stroke"] as const).forEach((prop) => {
        const attr = target.getAttribute(prop)
        // Only resolve `var(...)` refs — leave `url(#…)` gradient refs alone.
        if (attr && attr.includes("var(")) {
          target.setAttribute(prop, toSrgb(cs.getPropertyValue(prop).trim()))
        }
      })
      // <stop> nodes use the `stop-color` CSS property.
      if (node.tagName.toLowerCase() === "stop") {
        const sc = cs.getPropertyValue("stop-color").trim()
        if (sc) target.setAttribute("stop-color", toSrgb(sc))
        const so = cs.getPropertyValue("stop-opacity").trim()
        if (so && so !== "1") target.setAttribute("stop-opacity", so)
      }
    })

    // Ensure the xmlns is present on the root so the file opens standalone.
    if (!clone.getAttribute("xmlns")) {
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    }

    const xml = new XMLSerializer().serializeToString(clone)
    const blob = new Blob(
      [`<?xml version="1.0" encoding="UTF-8"?>\n${xml}`],
      { type: "image/svg+xml;charset=utf-8" },
    )
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${filename}.svg`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="group/logo-tile relative flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-6">
      <div ref={containerRef}>{children}</div>
      <div className="space-y-0.5">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Button
        variant="outline"
        size="xs"
        onClick={download}
        className="absolute right-3 top-3"
        aria-label={`Download ${name} logo as SVG`}
      >
        <Download className="size-3" />
        SVG
      </Button>
    </div>
  )
}

type TocEntry = { id: string; label: string }
type TocGroup = { label: string; items: TocEntry[] }

const TOC_GROUPS: TocGroup[] = [
  {
    label: "Foundations",
    items: [
      { id: "foundations",    label: "Overview" },
      { id: "modular-scales", label: "Modular scales · live" },
      { id: "color-ramps",    label: "Color ramps" },
      { id: "type-scale",     label: "Type scale" },
      { id: "type-roles",     label: "Typography roles" },
      { id: "type-presets",   label: "Typography presets" },
      { id: "radius-scale",   label: "Radius scale" },
      { id: "motion-scale",   label: "Motion" },
      { id: "spacing",        label: "Spacing" },
    ],
  },
  {
    label: "Tokens",
    items: [
      { id: "surfaces",  label: "Surfaces" },
      { id: "primary",   label: "Primary" },
      { id: "secondary", label: "Secondary" },
      { id: "muted",     label: "Muted" },
      { id: "accent",    label: "Accent" },
      { id: "highlight", label: "Highlight" },
      { id: "status",    label: "Status" },
      { id: "borders",   label: "Borders" },
      { id: "charts",    label: "Charts" },
    ],
  },
  {
    label: "Components (M3 / Ant System)",
    items: [
      { id: "buttons",    label: "1. Actions" },
      { id: "forms",      label: "2. Form & Inputs" },
      { id: "badges",     label: "3. Data Display" },
      { id: "navigation", label: "4. Navigation" },
      { id: "overlays",   label: "5. Overlays & Dialogs" },
      { id: "feedback",   label: "6. Feedback & Status" },
      { id: "data",       label: "7. Data & Layout" },
      { id: "logos",      label: "Brand & Logos" },
    ],
  },
  {
    label: "Apna Hire · Product",
    items: [
      { id: "or-overview",   label: "Overview" },
      { id: "or-molecules",  label: "Molecules" },
      { id: "or-organisms",  label: "Organisms" },
      { id: "or-templates",  label: "Templates" },
    ],
  },
]

const TOC: { id: string; label: string }[] = TOC_GROUPS.flatMap((g) => g.items)

// Sample candidates for the OnlyRounds CandidateCard showcase — covers the
// four distinct state branches the component renders.
const SAMPLE_CANDIDATES: Candidate[] = [
  {
    id: "aditi-fit",
    name: "Aditi Sharma",
    role: "Se Engineer",
    company: "Apna",
    email: "aditi@apna.co",
    phone: "+917003393362",
    state: {
      kind: "completed",
      score: 100,
      verdict: "fit",
      insights: [
        { tone: "ok", label: "Three years experience" },
        { tone: "ok", label: "Agreed to salary budget" },
        { tone: "ok", label: "Agreed to location and shifts" },
        { tone: "ok", label: "15-day notice period" },
        { tone: "ok", label: "Expert in test case design" },
        { tone: "ok", label: "Articulate and clear communicator" },
        { tone: "ok", label: "Exceeds minimum English level" },
        { tone: "miss", label: "Employment history not discussed" },
        { tone: "miss", label: "Industry domain not discussed" },
      ],
    },
  },
  {
    id: "sadanand-pending",
    name: "Sadanand",
    role: "Se Engineer",
    company: "Apna",
    email: "buruds@gmail.com",
    phone: "+919164862614",
    state: { kind: "pending", attempted: 0, total: 5 },
  },
  {
    id: "demo-incomplete",
    name: "demo 1",
    email: "retaker@test.co",
    phone: "+918637266290",
    state: { kind: "incomplete", attempted: 5, total: 5 },
  },
  {
    id: "chaitra-no-response",
    name: "chaitra",
    email: "chaitra.b.ext@apna.co",
    phone: "+918971981508",
    state: { kind: "no-response", attempted: 5, total: 5 },
  },
]

/**
 * useActiveSection — tracks which `id`d section is currently centred in the
 * viewport. Used to highlight the matching TOC link. IntersectionObserver
 * picks the first entry intersecting a band near the top third of the page.
 */
function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)
  useEffect(() => {
    if (typeof window === "undefined") return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])
  return active
}

export default function Home() {
  // const mounted = useMounted()
  // const [sliderVal, setSliderVal] = useState<number[]>([40])
  // const [radioVal, setRadioVal] = useState("one")
  // const [checked, setChecked] = useState(true)
  const [switchOn, setSwitchOn] = useState(true)
  const [selectVal, setSelectVal] = useState<string>("apple")
  // const [toggleVal, setToggleVal] = useState<string[]>(["bold"])
  // const [otp, setOtp] = useState("")
  // const [commandQuery, setCommandQuery] = useState("")
  // OnlyRounds demo state
  const [orTab, setOrTab] = useState<"all" | "active">("all")
  const [chipTab, setChipTab] = useState<"all" | "active" | "draft">("active")
  // const [orDirection, setOrDirection] = useState<"inbound" | "outbound">("outbound")
  // const [orFormat, setOrFormat] = useState<"audio" | "video">("audio")
  // const [orShareOpen, setOrShareOpen] = useState(false)
  const tocIds = useMemo(() => TOC.map((t) => t.id), [])
  const active = useActiveSection(tocIds)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky top bar — theme toggle + brand. */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-3">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight">Poneglyph</span>
            <span className="font-mono text-2xs text-muted-foreground">design system</span>
          </div>
          {/* <ThemeToggle /> */}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-12 px-8 pt-8 pb-16">
        {/* Sidebar TOC */}
        <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-52 shrink-0 overflow-y-auto pr-2 text-sm lg:block"> {/* token-lint-ignore: calc() of viewport minus the 5rem sticky header height */}
          <div className="space-y-4">
            {TOC_GROUPS.map((group) => (
              <div key={group.label} className="space-y-1">
                <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </div>
                {group.items.map((t) => {
                  const isActive = active === t.id
                  return (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "block truncate rounded px-2 py-1 transition-colors",
                        isActive
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {t.label}
                    </a>
                  )
                })}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 space-y-14">
          <header className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">
              Pone<span className="text-highlight">glyph</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Two-tier design system · <span className="text-primary font-semibold">Apna</span>{" "}
              themed · Primitives → Semantics · 55 components.
            </p>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Components only ever consume semantic tokens
              (<code className="font-mono text-foreground">--primary</code>,
              {" "}<code className="font-mono text-foreground">--highlight</code>,
              {" "}<code className="font-mono text-foreground">--muted</code>, …).
              Those aliases point at raw primitives below
              (<code className="font-mono text-foreground">--color-apna-green-600</code>,
              {" "}<code className="font-mono text-foreground">--color-apna-gold-400</code>, …).
              Re-theming swaps the mapping, not the primitives.
              See <code className="font-mono text-foreground">AGENTS.md</code> for the rules.
            </p>
          </header>

          {/* ===================================================================
           * FOUNDATIONS · Tier 1 primitives. Visual reference only — these are
           * never read by components directly. They anchor the Tier 2 aliases
           * rendered in the "Surfaces / Primary / …" sections below.
           * ================================================================= */}
          <Section id="foundations" title="Foundations · Tier 1 primitives">
            <p className="max-w-2xl text-sm text-muted-foreground">
              The lowest layer. Raw, theme-agnostic atoms. Components never use
              these directly — semantic tokens (below) alias them.
            </p>
          </Section>

          {/* ===================================================================
           * Modular scales — the two-knob system.
           *
           * The type ramp and radius ramp are generated from base + ratio.
           * Moving either slider mutates a CSS custom property on :root and
           * the whole system retunes live. Change the defaults in
           * `primitives.css` for a permanent shift.
           * ================================================================= */}
          <Section id="modular-scales" title="Modular scales · live">
            <p className="max-w-2xl text-body-sm text-muted-foreground">
              Two knobs — <code className="font-mono">--font-size-ratio</code> and{" "}
              <code className="font-mono">--radius-ratio</code> — govern the
              entire type and corner-radius systems. Drag the sliders to retune
              the rhythm on the fly. Every heading, body line, button, card, and
              input on this page responds.
            </p>
            <ModularScalesDemo />
          </Section>

          <Section id="color-ramps" title="Color ramps">
            <div className="space-y-6">
              {primitiveColorRamps.map((ramp) => (
                <div key={ramp.hue} className="space-y-2">
                  <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                    {ramp.label}
                  </div>
                  <div className="grid grid-cols-6 gap-1 sm:grid-cols-12">
                    {ramp.steps.map((step) => (
                      <div
                        key={step}
                        className="overflow-hidden rounded-md border border-border"
                        title={`--color-${ramp.hue}-${step}`}
                      >
                        <div
                          className="h-10 w-full"
                          style={{ background: `var(--color-${ramp.hue}-${step})` }}
                        />
                        <div className="truncate px-1 py-1 text-center font-mono text-2xs text-muted-foreground">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="type-scale" title="Type scale">
            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              {primitiveTypographyScale.map((t) => (
                <div key={t} className="flex items-baseline gap-6">
                  <code className="w-32 shrink-0 font-mono text-2xs text-muted-foreground">--{t}</code>
                  <div style={{ fontSize: `var(--${t})`, lineHeight: "var(--line-height-snug)" }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="type-roles" title="Typography roles · Tier 2 semantics">
            <p className="max-w-2xl text-sm text-muted-foreground">
              Family, weight, and size are each a swappable layer. Re-alias
              any of these in <code className="font-mono text-foreground">semantic.css</code>
              {" "}to re-theme the whole app.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Families */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                  Families
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-heading text-2xl">Heading</div>
                    <code className="font-mono text-2xs text-muted-foreground">--font-heading</code>
                  </div>
                  <div>
                    <div className="font-body text-base">Body copy sample.</div>
                    <code className="font-mono text-2xs text-muted-foreground">--font-body</code>
                  </div>
                  <div>
                    <div className="font-mono text-sm">code.example()</div>
                    <code className="font-mono text-2xs text-muted-foreground">--font-mono</code>
                  </div>
                </div>
              </div>

              {/* Weights */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                  Weights
                </div>
                <div className="space-y-2">
                  {([
                    ["regular",   "font-regular"],
                    ["medium",    "font-medium"],
                    ["semibold",  "font-semibold"],
                    ["bold",      "font-bold"],
                    ["extrabold", "font-extrabold"],
                  ] as const).map(([name, cls]) => (
                    <div key={name} className="flex items-baseline justify-between gap-4">
                      <span className={`text-lg ${cls}`}>The quick brown fox</span>
                      <code className="font-mono text-2xs text-muted-foreground">{name}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                  Sizes
                </div>
                <div className="space-y-1">
                  {([
                    "text-xs", "text-sm", "text-base",
                    "text-lg", "text-xl", "text-2xl", "text-3xl",
                  ] as const).map((cls) => (
                    <div key={cls} className="flex items-baseline justify-between gap-4">
                      <span className={cls}>Aa — Poneglyph</span>
                      <code className="font-mono text-2xs text-muted-foreground">{cls}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="type-presets" title="Typography presets">
            <p className="max-w-2xl text-sm text-muted-foreground">
              Composite utilities defined in <code className="font-mono text-foreground">globals.css</code>
              {" "}via <code className="font-mono text-foreground">@utility</code>. Each preset bundles
              family + size + weight + line-height + tracking.
            </p>
            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              {([
                ["text-display",  "Build anything. Token-first."],
                ["text-h1",       "Page-level heading"],
                ["text-h2",       "Section heading"],
                ["text-h3",       "Subsection heading"],
                ["text-h4",       "Minor heading"],
                ["text-h5",       "Small heading"],
                ["text-h6",       "Smallest heading"],
                ["text-body",     "Body paragraph — the default weight, size, and line-height for prose."],
                ["text-body-sm",  "Secondary paragraph for dense UI."],
                ["text-caption",  "Helper text, footnotes."],
                ["text-overline", "Eyebrow / kicker"],
              ] as const).map(([cls, sample]) => (
                <div key={cls} className="flex items-baseline gap-6 border-b border-border pb-3 last:border-0 last:pb-0">
                  <code className="w-32 shrink-0 font-mono text-2xs text-muted-foreground">.{cls}</code>
                  <div className={cls}>{sample}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="radius-scale" title="Radius scale">
            <div className="flex flex-wrap gap-4">
              {primitiveRadiusSteps.map((r) => (
                <div key={r} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4">
                  <div
                    className="h-14 w-20 bg-foreground"
                    style={{ borderRadius: `var(--${r})` }}
                  />
                  <div className="font-mono text-2xs">--{r}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="motion-scale" title="Motion">
            <div className="flex flex-wrap gap-3">
              {primitiveDurations.map((d) => (
                <div
                  key={d}
                  className="group rounded-lg border border-border bg-card p-4"
                  style={{ transitionDuration: `var(--${d})` }}
                >
                  <div className="mb-2 font-mono text-2xs text-muted-foreground">--{d}</div>
                  <div
                    className="h-2 w-24 origin-left rounded-full bg-foreground transition-transform group-hover:scale-x-[2]" // token-lint-ignore: transform ratio, not a sized token
                    style={{ transitionDuration: `var(--${d})`, transitionTimingFunction: "var(--ease-standard)" }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Hover a tile to play its duration.</p>
          </Section>

          {/* ===================================================================
           * Spacing — numeric primitives, t-shirt aliases, and context roles.
           *
           * Designers: prefer context roles (gap-stack, p-inset, …) in
           * templates. Reach for the t-shirt scale when the role doesn't fit,
           * and the numeric steps only when you need a specific rhythm. Never
           * reach for arbitrary values — `npm run lint:tokens` blocks those.
           * ================================================================= */}
          <Section id="spacing" title="Spacing">
            {/* Primitive steps — visualise each step as a horizontal bar whose
                width equals the step. Gives you a "ruler" for the scale. */}
            <div className="space-y-3">
              <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                Primitive steps · Tailwind numeric scale
              </div>
              <div className="space-y-1.5">
                {primitiveSpaceSteps.map((s) => (
                  <div key={s.token} className="flex items-center gap-4 rounded-md border border-border bg-card px-3 py-2">
                    <code className="w-28 shrink-0 font-mono text-2xs text-muted-foreground">--{s.token}</code>
                    <code className="w-16 shrink-0 font-mono text-2xs text-muted-foreground">{s.utility}</code>
                    <div className="h-3 rounded-sm bg-foreground" style={{ width: `var(--${s.token})` }} />
                    <code className="ml-auto font-mono text-2xs text-muted-foreground">{s.label}px</code>
                  </div>
                ))}
              </div>
            </div>

            {/* T-shirt aliases — CSS-only role-agnostic sizing.
                NOT exposed as Tailwind utilities (they collide with max-w-*,
                w-*, h-*). Consume via `var(--space-md)` in stylesheets, or
                map to a context role for templates. */}
            <div className="space-y-3">
              <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                T-shirt aliases · CSS-only (var(--space-&lt;size&gt;))
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {spacingTshirtSteps.map((s) => (
                  <div key={s.token} className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2">
                    <code className="w-24 shrink-0 font-mono text-2xs">--{s.token}</code>
                    <div className="h-2 rounded-sm bg-foreground/80" style={{ width: `var(--${s.token})` }} />
                    <code className="ml-auto font-mono text-2xs text-muted-foreground">→ --{s.primitive}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Context roles — describe WHAT the space separates. Preferred in
                new templates; they communicate intent and can be retuned
                globally by re-aliasing a single line in semantic.css. */}
            <div className="space-y-3">
              <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                Context roles · preferred in templates
              </div>
              <div className="grid gap-2">
                {spacingContextRoles.map((r) => (
                  <div key={r.token} className="flex items-center gap-4 rounded-md border border-border bg-card px-3 py-2">
                    <code className="w-32 shrink-0 font-mono text-2xs">--{r.token}</code>
                    <code className="w-24 shrink-0 font-mono text-2xs text-muted-foreground">.{r.utility}</code>
                    <span className="text-sm text-muted-foreground">{r.intent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live example — a card whose internal rhythm is built entirely
                from context roles. Hover to see the targets surface. */}
            <div className="space-y-3">
              <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                Composition example · context roles in practice
              </div>
              <div className="rounded-lg border border-border bg-card p-inset">
                <div className="flex flex-col gap-stack">
                  <div className="flex items-center gap-inline">
                    <div className="size-6 rounded-full bg-primary" />
                    <span className="font-medium">Card title</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Body copy sits in the stack. The icon and title share an
                    inline gap. The surface gets its breathing room from inset
                    padding. Every space here resolves through a single token —
                    retune the system and this card retunes with it.
                  </p>
                  <div className="flex flex-col gap-field">
                    <label className="text-sm font-medium">Field label</label>
                    <input className="rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="field value" />
                    <span className="text-caption">Helper text sits a field-gap below.</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ===================================================================
           * TOKENS · Tier 2 semantics. These are what components read.
           * Each swatch shows the alias name; the colour resolves through the
           * primitive it points at (see docs/TOKENS.md for the mapping table).
           * ================================================================= */}
          <Section id="surfaces" title="Surfaces · Tier 2 semantics">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {surfaceTokens.map((t) => <Swatch key={t} token={t} />)}
            </div>
          </Section>
          {semanticGroups.map((g) => (
            <Section key={g.label} id={g.label.toLowerCase()} title={g.label}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {g.tokens.map((t) => <Swatch key={t} token={t} />)}
              </div>
              {g.label === "Highlight" && (
                <div className="mt-4 rounded-xl border border-border bg-card p-6">
                  <div className="mb-3 font-mono text-2xs uppercase tracking-wider text-muted-foreground">
                    Recipe · inline typography accent
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">
                    Keep your hiring <span className="text-highlight">always on</span>.
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Save <span className="text-highlight font-semibold">~47% instantly</span>{" "}
                    with annual billing.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
{`<h3>Keep your hiring <span className="text-highlight">always on</span>.</h3>`}
                  </pre>
                  <p className="mt-3 text-xs text-muted-foreground">
                    <code className="font-mono">--highlight</code> is reserved for inline text
                    emphasis. Never use it as a button surface — that role belongs to{" "}
                    <code className="font-mono">--primary</code>.
                  </p>
                </div>
              )}
            </Section>
          ))}
          {/* ===== LOGOS ===== */}
          <Section id="logos" title="Logos">
            <Sub title="Brand marks">
              <div className="grid gap-4 sm:grid-cols-2">
                <LogoTile
                  name="Apna Hire"
                  filename="apna-logo"
                  description="Parent brand lockup · gold · green · sky · plum"
                >
                  <ApnaLogo className="h-12 w-auto" />
                </LogoTile>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Brand marks are fixed assets — their colours <em>are</em> the
                brand, not themeable roles. Import from{" "}
                <code className="font-mono">@/components/ui/logo-apna</code> and{" "}
                <code className="font-mono">@/components/ui/logo-onlyrounds</code>.
                Size with <code className="font-mono">className=&quot;h-…&quot;</code>;
                width scales automatically.
              </p>
            </Sub>
          </Section>

          {/* ===== BUTTONS ===== */}
          <Section id="buttons" title="Buttons">
            <Sub title="variants × sizes">
              <div
                className="grid items-center gap-3"
                style={{ gridTemplateColumns: "auto repeat(4, minmax(0, 1fr))" }}
              >
                <div />
                {buttonSizeList.map((s) => (
                  <div key={s} className="text-center font-mono text-2xs text-muted-foreground">{s}</div>
                ))}
                {buttonVariantList.map((v) => (
                  <Fragment key={v}>
                    <div className="font-mono text-xs text-muted-foreground">{v}</div>
                    {buttonSizeList.map((s) => (
                      <div key={s} className="flex justify-center">
                        <Button variant={v} size={s}>Button</Button>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </Sub>

            <Sub title="ButtonGroup">
              <div className="flex flex-wrap gap-4">
                <ButtonGroup>
                  <Button variant="outline"><Bold /></Button>
                  <Button variant="outline"><Italic /></Button>
                  <Button variant="outline"><Underline /></Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="outline">Prev</Button>
                  <ButtonGroupSeparator />
                  <Button variant="outline">Next</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <ButtonGroupText>Copy</ButtonGroupText>
                  <Button variant="outline">npm i</Button>
                </ButtonGroup>
              </div>
            </Sub>
            <Sub title="BackButton">
              <div className="flex flex-wrap gap-4">
                <BackButton />
              </div>
            </Sub>
          </Section>

          {/* ===== BADGES / KBD ===== */}
          <Section id="badges" title="Badges & chips">
            <Sub title="Badge variants">
              <div className="flex flex-wrap gap-2">
                {badgeVariantList.map((v) => <Badge key={v} variant={v}>{v}</Badge>)}
              </div>
            </Sub>
            <Sub title="Applied / Sourced Chips (with Tooltips)">
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <span className={cn(badgeVariants({ variant: "outline" }), "text-2xs leading-none text-muted-foreground font-semibold cursor-help")}>
                        Applied
                      </span>
                    }
                  />
                  <TooltipContent>Applied directly</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <span className={cn(badgeVariants({ variant: "outline" }), "text-2xs leading-none text-muted-foreground font-semibold cursor-help")}>
                        Sourced
                      </span>
                    }
                  />
                  <TooltipContent>manually added</TooltipContent>
                </Tooltip>
              </div>
            </Sub>
            {/* <Sub title="Kbd">
              <div className="flex flex-wrap items-center gap-3">
                <Kbd>⌘</Kbd>
                <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
                <KbdGroup><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd></KbdGroup>
              </div>
            </Sub> */}
          </Section>

          {/* ===== AVATARS ===== */}
          <Section id="avatars" title="Avatar">
            <Sub title="Single & fallback">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="sh" />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
                <Avatar><AvatarFallback>PB</AvatarFallback></Avatar>
                <Avatar>
                  <AvatarFallback>ON</AvatarFallback>
                  <AvatarBadge className="bg-green-500" />
                </Avatar>
              </div>
            </Sub>
            <Sub title="AvatarGroup">
              <AvatarGroup>
                <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
              </AvatarGroup>
            </Sub>
          </Section>

          {/* ===== INDICATORS ===== */}
          <Section id="indicators" title="Indicators">
            <Sub title="Skeleton">
              <div className="space-y-4">
                {/* <Progress value={sliderVal[0]}>
                  <ProgressTrack>
                    <ProgressIndicator />
                  </ProgressTrack>
                </Progress> */}
                <div className="flex items-center gap-6">
                  {/* <Spinner /> */}
                  {/* <Separator orientation="vertical" className="h-6" /> */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </Sub>
          </Section>

          {/* ===== FORMS ===== */}
          <Section id="forms" title="Form controls">
            <Sub title="Input, Textarea, Field">
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="you@example.com" />
                  <FieldDescription>We&apos;ll never share your email.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </Field>
                <Field data-invalid="true">
                  <FieldLabel htmlFor="err">With error</FieldLabel>
                  <Input id="err" aria-invalid defaultValue="not-an-email" />
                  <FieldError>Please enter a valid email.</FieldError>
                </Field>
                {/* <Field>
                  <FieldLabel>InputGroup</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon><Search /></InputGroupAddon>
                    <InputGroupInput placeholder="Search…" />
                  </InputGroup>
                </Field> */}
              </div>
            </Sub>

            {/* <Sub title="InputOTP">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Sub> */}

            <Sub title="Switch">
              <div className="grid gap-4 md:grid-cols-2">
                {/* <div className="flex items-center gap-2">
                  <Checkbox id="cb" checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} />
                  <Label htmlFor="cb">Accept terms</Label>
                </div> */}
                <div className="flex items-center gap-2">
                  <Switch id="sw" checked={switchOn} onCheckedChange={setSwitchOn} />
                  <Label htmlFor="sw">Notifications</Label>
                </div>
                {/* <RadioGroup value={radioVal} onValueChange={setRadioVal} className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="one" id="r1" /> <Label htmlFor="r1">One</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="two" id="r2" /> <Label htmlFor="r2">Two</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="three" id="r3" /> <Label htmlFor="r3">Three</Label>
                  </div>
                </RadioGroup> */}
                {/* <div className="space-y-2">
                  <Label>Slider — {sliderVal[0]}</Label>
                  <Slider
                    value={sliderVal}
                    onValueChange={(v) => setSliderVal(Array.isArray(v) ? [...v] : [v])}
                    max={100}
                    step={1}
                  />
                </div> */}
              </div>
            </Sub>

            <Sub title="Select / NativeSelect">
              <div className="flex flex-wrap gap-4">
                <Select value={selectVal} onValueChange={(v) => setSelectVal(v ?? "")}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Pick a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="cherry">Cherry</SelectItem>
                  </SelectContent>
                </Select>
                {/* <NativeSelect defaultValue="a" className="w-48">
                  <NativeSelectOption value="a">Native A</NativeSelectOption>
                  <NativeSelectOption value="b">Native B</NativeSelectOption>
                </NativeSelect> */}
              </div>
            </Sub>

            {/* <Sub title="Toggle / ToggleGroup">
              <div className="flex items-center gap-4">
                <Toggle aria-label="Bold"><Bold /></Toggle>
                <ToggleGroup value={toggleVal} onValueChange={(v) => setToggleVal([...v])}>
                  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
                  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
                  <ToggleGroupItem value="underline"><Underline /></ToggleGroupItem>
                </ToggleGroup>
              </div>
            </Sub> */}
          </Section>

          {/* ===== NAVIGATION ===== */}
          <Section id="navigation" title="Navigation">
            {/* <Sub title="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Sub> */}
            <Sub title="ChipTabs · pill-shaped segmented control with optional counts">
              <ChipTabs
                aria-label="Jobs status"
                items={[
                  { value: "all",    label: "All",    count: 266 },
                  { value: "active", label: "Active", count: 166 },
                  { value: "draft",  label: "Draft",  count: 94 },
                ]}
                value={chipTab}
                onValueChange={(v) => setChipTab(v as typeof chipTab)}
              />
            </Sub>
            <Sub title="Tabs">
              <div className="flex flex-col gap-6 w-full">
                {/* default — muted background, white active pill */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground font-mono">variant=&quot;default&quot;</p>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList>
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-4 text-sm text-muted-foreground">
                      Your account settings and profile information live here.
                    </TabsContent>
                    <TabsContent value="password" className="pt-4 text-sm text-muted-foreground">
                      Update your password here.
                    </TabsContent>
                    <TabsContent value="team" className="pt-4 text-sm text-muted-foreground">
                      Manage team members and roles.
                    </TabsContent>
                  </Tabs>
                </div>

                {/* inverted — white/card background, near-black active pill. Use on tinted/gray canvases. */}
                <div className="flex flex-col gap-2 rounded-lg bg-muted p-4">
                  <p className="text-xs text-muted-foreground font-mono">variant=&quot;inverted&quot;</p>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList variant="inverted">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-4 text-sm text-muted-foreground">
                      Your account settings and profile information live here.
                    </TabsContent>
                    <TabsContent value="password" className="pt-4 text-sm text-muted-foreground">
                      Update your password here.
                    </TabsContent>
                    <TabsContent value="team" className="pt-4 text-sm text-muted-foreground">
                      Manage team members and roles.
                    </TabsContent>
                  </Tabs>
                </div>

                {/* line — underline indicator, transparent background */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground font-mono">variant=&quot;line&quot;</p>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList variant="line">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-4 text-sm text-muted-foreground">
                      Your account settings and profile information live here.
                    </TabsContent>
                    <TabsContent value="password" className="pt-4 text-sm text-muted-foreground">
                      Update your password here.
                    </TabsContent>
                    <TabsContent value="team" className="pt-4 text-sm text-muted-foreground">
                      Manage team members and roles.
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Sub>
          </Section>

          {/* ===== OVERLAYS ===== */}
          <Section id="overlays" title="Overlays">
            <Sub title="Tooltip, HoverCard, Popover">
              <div className="flex flex-wrap gap-3">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
                  <TooltipContent>Tooltip content</TooltipContent>
                </Tooltip>
                {/* <HoverCard>
                  <HoverCardTrigger render={<Button variant="outline">HoverCard</Button>} />
                  <HoverCardContent>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">@poneglyph</div>
                      <div className="text-xs text-muted-foreground">Design system built on shadcn</div>
                    </div>
                  </HoverCardContent>
                </HoverCard> */}
                <Popover>
                  <PopoverTrigger render={<Button variant="outline">Popover</Button>} />
                  <PopoverContent>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Popover content</div>
                      <div className="text-xs text-muted-foreground">Anchored to the trigger.</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Sub>

            <Sub title="Dialog, AlertDialog, Sheet, Drawer">
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger render={<Button variant="outline">Dialog</Button>} />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Example dialog</DialogTitle>
                      <DialogDescription>Triggered from a Poneglyph button.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline">Close</Button>} />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="destructive">Delete…</Button>} />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Sheet>
                  <SheetTrigger render={<Button variant="outline">Sheet</Button>} />
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>Update your details.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                {/* <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer</DrawerTitle>
                      <DrawerDescription>Bottom-anchored on mobile.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer> */}
              </div>
            </Sub>

            <Sub title="DropdownMenu, ContextMenu">
              <div className="flex flex-wrap items-start gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline">Menu <ChevronDown /></Button>} />
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem><User /> Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
                      <DropdownMenuItem><Settings /> Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
                      <DropdownMenuItem><Mail /> Inbox</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Notifications</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <ContextMenu>
                  <ContextMenuTrigger className="flex h-20 w-48 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                    Right-click me
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuGroup>
                      <ContextMenuLabel>Actions</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuItem>Copy</ContextMenuItem>
                      <ContextMenuItem>Cut</ContextMenuItem>
                      <ContextMenuItem>Paste</ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
                  </ContextMenuContent>
                </ContextMenu> */}
              </div>
            </Sub>
          </Section>

          {/* ===== CONTAINERS ===== */}
          {/* <Section id="containers" title="Containers">
            <Sub title="Card">
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Welcome</CardTitle>
                  <CardDescription>Sign in to continue to Poneglyph.</CardDescription>
                  <CardAction><Button variant="ghost" size="sm"><Bell /></Button></CardAction>
                </CardHeader>
                <CardContent>
                  <Field>
                    <FieldLabel htmlFor="cardEmail">Email</FieldLabel>
                    <Input id="cardEmail" placeholder="you@example.com" />
                  </Field>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>
            </Sub>

            <Sub title="Alert">
              <div className="space-y-3">
                <Alert>
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>This is an informational alert.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription>We couldn&apos;t save your changes.</AlertDescription>
                  <AlertAction><Button variant="outline" size="sm">Retry</Button></AlertAction>
                </Alert>
              </div>
            </Sub>

            <Sub title="Accordion, Collapsible">
              <div className="grid gap-4 md:grid-cols-2">
                <Accordion className="w-full">
                  <AccordionItem value="a">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>Yes. Built on Base UI primitives.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Is it themeable?</AccordionTrigger>
                    <AccordionContent>Yes — every surface binds to a Poneglyph token.</AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Collapsible>
                  <CollapsibleTrigger render={<Button variant="outline">Toggle details</Button>} />
                  <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
                    Revealed content appears here.
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </Sub>

            <Sub title="ScrollArea, AspectRatio">
              <div className="grid gap-4 md:grid-cols-2">
                <ScrollArea className="h-40 rounded-md border border-border p-3">
                  <div className="space-y-2 text-sm">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i}>Scrollable row {i + 1}</div>
                    ))}
                  </div>
                </ScrollArea>
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground">16 / 9</div>
                </AspectRatio>
              </div>
            </Sub>

            <Sub title="Empty, Item">
              <div className="grid gap-4 md:grid-cols-2">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon"><Mail /></EmptyMedia>
                    <EmptyTitle>No messages</EmptyTitle>
                    <EmptyDescription>Your inbox is empty. Come back later.</EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent><Button>Compose</Button></EmptyContent>
                </Empty>
                <div className="space-y-2">
                  <Item>
                    <ItemMedia><Avatar><AvatarFallback>PB</AvatarFallback></Avatar></ItemMedia>
                    <ItemContent>
                      <ItemTitle>Punna Babu</ItemTitle>
                      <ItemDescription>punna.babu@apna.co</ItemDescription>
                    </ItemContent>
                  </Item>
                  <Item variant="outline">
                    <ItemMedia variant="icon"><User /></ItemMedia>
                    <ItemContent>
                      <ItemTitle>Another user</ItemTitle>
                      <ItemDescription>Outline variant</ItemDescription>
                    </ItemContent>
                  </Item>
                </div>
              </div>
            </Sub>
          </Section> */}

          {/* ===== DATA ===== */}
          <Section id="data" title="Data">
            <Sub title="Table">
              <Table>
                <TableCaption>Recent deployments</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Commit</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { s: "Ready", c: "feat: add tokens", a: "punna", d: "42s" },
                    { s: "Ready", c: "chore: upgrade deps", a: "claude", d: "38s" },
                    { s: "Failed", c: "fix: layout bug", a: "punna", d: "12s" },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge variant={row.s === "Failed" ? "destructive" : "secondary"}>{row.s}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{row.c}</TableCell>
                      <TableCell>{row.a}</TableCell>
                      <TableCell className="text-right">{row.d}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Sub>
          </Section>

          {/* ===== CALENDAR / CAROUSEL / COMMAND ===== */}
          {/* <Section id="complex" title="Calendar, Carousel, Command">
            <Sub title="Calendar">
              {mounted && <Calendar mode="single" className="rounded-md border border-border" />}
            </Sub>
            <Sub title="Carousel">
              <Carousel className="mx-auto w-full max-w-md">
                <CarouselContent>
                  {["One", "Two", "Three", "Four"].map((s) => (
                    <CarouselItem key={s}>
                      <div className="flex h-40 items-center justify-center rounded-md border border-border bg-muted text-2xl font-semibold">
                        {s}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Sub>
            <Sub title="Command (inline)">
              <Command className="max-w-md rounded-md border border-border">
                <CommandInput placeholder="Search…" value={commandQuery} onValueChange={setCommandQuery} />
                <CommandList>
                  <CommandEmpty>No results.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem><CalendarIcon /> Calendar</CommandItem>
                    <CommandItem><Mail /> Inbox</CommandItem>
                    <CommandItem><Settings /> Settings</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Account">
                    <CommandItem><User /> Profile</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </Sub>
          </Section> */}

          {/* ===== FEEDBACK ===== */}
          {/* <Section id="feedback" title="Feedback">
            <Sub title="Toast (sonner)">
              <div className="flex gap-3">
                <Button onClick={() => toast("Event created", { description: "Sunday, April 21, 2026" })}>Show toast</Button>
                <Button variant="outline" onClick={() => toast.success("Saved")}>Success</Button>
                <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>Error</Button>
              </div>
            </Sub>
          </Section> */}

          {/* ===================================================================
           * ONLYROUNDS · Product-scoped extension
           * All components below live in src/components/onlyrounds/* and are
           * rendered under the .theme-onlyrounds scope so the OnlyRounds
           * brand gradient & surface tokens apply.
           * =================================================================*/}
          <div className="theme-onlyrounds space-y-14">
            <Section id="or-overview" title="OnlyRounds · Overview">
              <p className="max-w-3xl text-sm text-muted-foreground">
                OnlyRounds is Apna&apos;s AI-screening product. It reuses every primitive above and adds a
                small set of product-scoped molecules, organisms, and full-page templates. The live
                product surfaces render under the{" "}
                <code className="font-mono text-foreground">.theme-onlyrounds</code> class, which
                swaps{" "}
                <code className="font-mono text-foreground">--gradient-primary</code> and{" "}
                <code className="font-mono text-foreground">--gradient-accent</code> to a vibrant
                green→sky→gold mapping.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { href: "/apnahire/jobs",                      label: "Jobs list",        desc: "List + status tabs + actions" },
                  { href: "/apnahire/jobs/manual-tester-profile", label: "Job detail",  desc: "Candidate pipeline w/ filters" },
                  { href: "/apnahire/jobs/new",                  label: "Create job",       desc: "4-step wizard" },
                  { href: "/apnahire/dashboard",                 label: "Dashboard",        desc: "Recruiter overview & metrics" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group/or-link flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{l.label}</span>
                      <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover/or-link:-translate-y-0.5 group-hover/or-link:translate-x-0.5" />
                    </div>
                    <span className="text-xs text-muted-foreground">{l.desc}</span>
                  </Link>
                ))}
              </div>

              <Sub title="Brand gradient tokens (theme-onlyrounds scope)">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div
                      className="h-20 w-full"
                      style={{ background: "var(--gradient-primary)" }} // token-lint-ignore: showcase swatch reads gradient token by design
                    />
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="font-mono text-2xs">--gradient-primary</div>
                      <div className="font-mono text-2xs text-muted-foreground">green → sky → gold</div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div
                      className="h-20 w-full"
                      style={{ background: "var(--gradient-accent)" }} // token-lint-ignore: showcase swatch reads gradient token by design
                    />
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="font-mono text-2xs">--gradient-accent</div>
                      <div className="font-mono text-2xs text-muted-foreground">gold → green</div>
                    </div>
                  </div>
                </div>
              </Sub>
            </Section>

            <Section id="or-molecules" title="OnlyRounds · Molecules">
              {/* <Sub title="AIInsightChip · tone variants">
                <div className="flex flex-wrap gap-2">
                  <AIInsightChip tone="ok">Role fit confirmed</AIInsightChip>
                  <AIInsightChip tone="info">Notice period discussed</AIInsightChip>
                  <AIInsightChip tone="warn">Salary mismatch</AIInsightChip>
                  <AIInsightChip tone="miss">Shift hours not discussed</AIInsightChip>
                </div>
              </Sub> */}

              {/* <Sub title="ScorePill · fit / review / not-fit">
                <div className="flex items-center gap-4">
                  <ScorePill score={92} verdict="fit" />
                  <ScorePill score={58} verdict="review" />
                  <ScorePill score={14} verdict="not-fit" />
                </div>
              </Sub> */}

              {/* <Sub title="RadioCard · large clickable cards">
                <RadioGroup
                  value={orDirection}
                  onValueChange={(v) => setOrDirection(v as typeof orDirection)}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  <RadioCard
                    value="inbound"
                    icon={<PhoneIncoming className="size-4" />}
                    title="Inbound"
                    description="Candidate calls the shared number"
                    selected={orDirection === "inbound"}
                  />
                  <RadioCard
                    value="outbound"
                    icon={<PhoneOutgoing className="size-4" />}
                    title="Outbound"
                    description="We call the candidate automatically"
                    selected={orDirection === "outbound"}
                  />
                </RadioGroup>
                <RadioGroup
                  value={orFormat}
                  onValueChange={(v) => setOrFormat(v as typeof orFormat)}
                  className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  <RadioCard
                    value="audio"
                    icon={<Mic className="size-4" />}
                    title="Audio only"
                    description="Lowest friction"
                    selected={orFormat === "audio"}
                  />
                  <RadioCard
                    value="video"
                    icon={<Video className="size-4" />}
                    title="Audio + video"
                    description="Unlocks proctoring"
                    selected={orFormat === "video"}
                  />
                </RadioGroup>
              </Sub> */}

              <Sub title="Stepper · completed / current / pending">
                <Stepper
                  steps={[
                    { id: "jd",   label: "Job Description",   description: "Title & JD",          status: "completed" },
                    { id: "det",  label: "Job Details",       description: "Experience, pay",     status: "completed" },
                    { id: "hire", label: "Who you're hiring", description: "Screening setup",     status: "current" },
                    { id: "co",   label: "Company & Benefits", description: "Employer branding", status: "pending" },
                  ]}
                />
              </Sub>

              {/* <Sub title="InfoBanner · 4 tones">
                <div className="flex flex-col gap-3">
                  <InfoBanner
                    variant="info"
                    title="Heads up"
                    description="Candidates may hang up in-call; the interview restarts when billing resumes."
                    action={<Button size="sm">Start billing</Button>}
                  />
                  <InfoBanner
                    variant="warning"
                    title="Credits running low"
                    description="You have 18 interview credits remaining on your plan."
                  />
                  <InfoBanner
                    variant="success"
                    title="Job published"
                    description="Your posting is live at onlyrounds.apna.co/j/abc."
                  />
                  <InfoBanner
                    variant="destructive"
                    title="Screening paused"
                    description="A quota was exceeded. Resume to continue evaluations."
                  />
                </div>
              </Sub> */}

              {/* <Sub title="SplitButton · primary action + menu">
                <div className="flex gap-3">
                  <SplitButton
                    onClick={() => setOrShareOpen(true)}
                    menu={
                      <>
                        <DropdownMenuItem>Copy link</DropdownMenuItem>
                        <DropdownMenuItem>Share via email</DropdownMenuItem>
                        <DropdownMenuItem>Embed on LinkedIn</DropdownMenuItem>
                      </>
                    }
                  >
                    <Share2 className="size-4" /> Share Job
                  </SplitButton>
                </div>
              </Sub> */}
            </Section>

            <Section id="or-organisms" title="OnlyRounds · Organisms">
              <Sub title="PageHeader · title + tabs + actions">
                {/* bg-muted mirrors the real product page background so the
                    white header card and inverted tabs render in correct context. */}
                <div className="rounded-lg bg-muted overflow-hidden">
                  <PageHeader
                    title={
                      <span className="inline-flex items-center gap-2">
                        <span>Product Designer</span>
                        <Badge variant="success">Active</Badge>
                      </span>
                    }
                    description="Simplilearn · Hubli"
                    tabs={
                      <Tabs value={orTab} onValueChange={(v) => setOrTab(v as typeof orTab)}>
                        <TabsList variant="inverted">
                          <TabsTrigger value="all">Screening (2)</TabsTrigger>
                          <TabsTrigger value="active">Selected (0)</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    }
                    actions={
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="size-4" /> Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserPlus className="size-4" /> Add candidates
                        </Button>
                        <Button size="sm" onClick={() => {}}>
                          <Share2 className="size-4" /> Share job
                        </Button>
                      </>
                    }
                  />
                </div>
              </Sub>

              <Sub title="JobsTable · title + status + client + location + screening/interview/shortlisted counts">
                <JobsTable
                  rows={[
                    {
                      id: "product-designer",
                      title: "Product Designer",
                      status: "active",
                      client: "Flipkart",
                      clientLogo: "https://www.google.com/s2/favicons?domain=flipkart.com&sz=128",
                      location: "Bengaluru, IN",
                      createdAt: "21 Apr 2026",
                      owner: "Mitushi Agarwal",
                      screening: 24,
                      interview: 6,
                      shortlisted: 0,
                    },
                    {
                      id: "manual-tester",
                      title: "Manual Tester",
                      status: "published",
                      client: "Swiggy",
                      clientLogo: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
                      location: "Hyderabad, IN",
                      createdAt: "17 Apr 2026",
                      owner: "Ravi Kumar",
                      screening: 58,
                      interview: 14,
                      shortlisted: 1,
                    },
                    {
                      id: "backend-eng",
                      title: "Backend Engineer",
                      status: "draft",
                      client: "Amazon",
                      clientLogo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
                      location: "Remote",
                      createdAt: "11 Apr 2026",
                      owner: "Priya Shah",
                      screening: 0,
                      interview: 0,
                      shortlisted: 0,
                    },
                  ]}
                />
              </Sub>

              <Sub title="ClientsTable · logo + name + about + website + email">
                <ClientsTable
                  rows={[
                    {
                      id: "flipkart",
                      name: "Flipkart",
                      logo: "https://www.google.com/s2/favicons?domain=flipkart.com&sz=128",
                      about: "Indian e-commerce marketplace hiring across product, engineering, and operations.",
                      website: "https://flipkart.com",
                      email: "talent@flipkart.com",
                    },
                    {
                      id: "swiggy",
                      name: "Swiggy",
                      logo: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
                      about: "Food delivery and quick-commerce platform operating across Indian cities.",
                      website: "https://swiggy.com",
                      email: "careers@swiggy.com",
                    },
                  ]}
                />
              </Sub>

              <Sub title="ClientForm · new-client collection (name, logo, about, website, email)">
                <div className="max-w-lg rounded-lg border border-border bg-card p-5">
                  <ClientForm onSubmit={() => {}} submitLabel="Add client" />
                </div>
              </Sub>

              {/* <Sub title="FilterPanel · collapsible rail">
                <div className="max-w-sm">
                  <FilterPanel
                    count={2}
                    groups={[
                      {
                        id: "ai-status",
                        label: "AI Evaluation Status",
                        options: [
                          { id: "fit",          label: "Fit",                count: 0 },
                          { id: "in-progress",  label: "Evaluation in-progress", count: 1 },
                          { id: "rejected",     label: "Rejected / Not fit", count: 1 },
                          { id: "incomplete",   label: "Incomplete call",    count: 1 },
                        ],
                      },
                    ]}
                  />
                </div>
              </Sub> */}

              <Sub title="CandidateCard · 4 state variants (completed Fit · pending · incomplete · no-response)">
                <div className="flex flex-col gap-3">
                  {SAMPLE_CANDIDATES.map((c) => (
                    <CandidateCard key={c.id} candidate={c} />
                  ))}
                </div>
              </Sub>

              <Sub title="CandidateTable · list/tabular view of pipeline">
                <CandidateTable
                  candidates={SAMPLE_CANDIDATES.map((c) => ({
                    ...c,
                    stage: "screening",
                  }))}
                  onOpen={() => {}}
                />
              </Sub>

              {/* <Sub title="NetworkShareSheet · dialog">
                <Button onClick={() => setOrShareOpen(true)}>
                  <Share2 className="size-4" /> Open share dialog
                </Button>
                <NetworkShareSheet
                  open={orShareOpen}
                  onOpenChange={setOrShareOpen}
                  jobTitle="Product Designer"
                />
              </Sub> */}
            </Section>

            <Section id="or-templates" title="OnlyRounds · Templates">
              <p className="max-w-3xl text-sm text-muted-foreground">
                Full-page compositions. These live behind the{" "}
                <code className="font-mono text-foreground">/onlyrounds/(product)</code> route group
                with the sidebar shell. Click through to see them in context.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    href: "/onlyrounds/jobs",
                    title: "Jobs list",
                    body: "InfoBanner + PageHeader + status tabs + JobsTable. Landing for recruiters.",
                    icon: Briefcase,
                  },
                  {
                    href: "/onlyrounds/jobs/sample-job",
                    title: "Job detail",
                    body: "FilterPanel + AI screening insights + candidate pipeline + share.",
                    icon: Share2,
                  },
                  {
                    href: "/onlyrounds/jobs/new",
                    title: "Create Job wizard",
                    body: "4-step Stepper wizard with ScreeningConfigurator.",
                    icon: UserPlus,
                  },
                ].map((t) => {
                  const Icon = t.icon
                  return (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="group/or-tpl flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <Icon className="size-4" />
                        </div>
                        <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover/or-tpl:-translate-y-0.5 group-hover/or-tpl:translate-x-0.5" />
                      </div>
                      <div className="text-sm font-medium">{t.title}</div>
                      <p className="text-xs text-muted-foreground">{t.body}</p>
                    </Link>
                  )
                })}
              </div>
            </Section>
          </div>

          {/* ===================================================================
           * APNA HIRE · Product-scoped extension
           * Components under src/components/apnahire/* — the recruiter-facing
           * side of the Apna platform.
           * =================================================================*/}
          <Section id="ah-overview" title="Apna Hire · Overview">
            <p className="max-w-3xl text-sm text-muted-foreground">
              Apna Hire is the recruiter portal for Apna&apos;s job platform. It reuses the shared
              design-system primitives and adds a product-specific sidebar shell with the official
              Apna brand mark, nested navigation, workspace switching, and a{" "}
              <code className="font-mono text-foreground">+ Invite Recruiter</code> CTA.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/apnahire/sidebar-specs",
                  label: "Sidebar specs",
                  desc: "Interactive ApnaHireSidebar showcase — logo, workspaces, nested nav, alert banner",
                },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group/ah-link flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{l.label}</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover/ah-link:-translate-y-0.5 group-hover/ah-link:translate-x-0.5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{l.desc}</span>
                </Link>
              ))}
            </div>
          </Section>

          <footer className="border-t border-border pt-8 text-sm text-muted-foreground">
            Mirrors the Figma file{" "}
            <a className="underline underline-offset-4 hover:text-foreground"
               href="https://www.figma.com/design/uRcYpMrvRFLpWj4TqGOkSt"
               target="_blank" rel="noreferrer noopener">Poneglyph Design System</a>.
          </footer>
        </main>
      </div>
    </div>
  )
}
