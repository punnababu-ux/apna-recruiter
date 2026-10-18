/**
 * ProductIllustration — the homepage product cards' artwork: a soft
 * pastel tile (`bg-gradient-illustration-*`) with a floating snippet of the
 * product's own UI on it — a deck of applicants to shortlist, the AI agent on a
 * call, a nearby-candidate search, two live Unlimited slots.
 *
 * The style (tile + one crisp floating UI fragment, grey bars standing in
 * for secondary text) follows the reference the product owner shared on
 * 2026-10-16; the content is apna's own and is built from design-system
 * parts (Avatar, Badge, icons), so it stays sharp at any size and follows
 * the theme. Names and numbers are illustrative.
 *
 *   <ProductIllustration product="Smart Jobs" size="lg" className="h-64" />
 *
 * Decorative: `aria-hidden`. Inside a `group` the snippet lifts a little
 * on hover; the AI agent's voice bars always move.
 */

import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Briefcase,
  CheckCircle2,
  Database as DatabaseIcon,
  InfinityIcon,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

type Product = "Smart Jobs" | "AI Calling Agent" | "Hyperlocal Database" | "apna Unlimited"

/** The pastel tiles, by tone. The company pages' illustrations
 *  (company-illustrations.tsx) use the same four. */
export const ILLUSTRATION_TONE = {
  sky: "bg-gradient-illustration-sky",
  green: "bg-gradient-illustration-green",
  plum: "bg-gradient-illustration-plum",
  gold: "bg-gradient-illustration-gold",
} as const
export type IllustrationTone = keyof typeof ILLUSTRATION_TONE

/** A pastel tile with one floating snippet centred on it. */
export function IllustrationTile({
  tone,
  size = "default",
  className,
  children,
}: {
  tone: IllustrationTone
  size?: "default" | "lg"
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center overflow-hidden rounded-xl p-4", ILLUSTRATION_TONE[tone], className)}
    >
      <div className={cn(size === "lg" ? "sm:scale-150" : "sm:scale-125")}>{children}</div>
    </div>
  )
}

/** Each product's `data-product` key: set it on a product surface and the
 *  product colour roles (text-product-accent, bg-product-tint, …) follow. */
export const PRODUCT_KEY: Record<Product, string> = {
  "Smart Jobs": "smart-jobs",
  "AI Calling Agent": "ai-calling",
  "Hyperlocal Database": "database",
  "apna Unlimited": "unlimited",
}

/** Each product's mark: the icon in its page's hero chip and beside its
 *  eyebrow on the homepage card, so one product reads as one thing. */
export const PRODUCT_ICON: Record<Product, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  "Smart Jobs": Briefcase,
  "AI Calling Agent": PhoneCall,
  "Hyperlocal Database": DatabaseIcon,
  "apna Unlimited": InfinityIcon,
}

/** Each product's own gradient (the product identity tokens). */
export const PRODUCT_GRADIENT: Record<Product, string> = {
  "Smart Jobs": "bg-gradient-product-smart-jobs",
  "AI Calling Agent": "bg-gradient-product-ai-calling",
  "Hyperlocal Database": "bg-gradient-product-database",
  "apna Unlimited": "bg-gradient-product-unlimited",
}

/** The floating white surface every snippet sits on. */
export function Float({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card p-3 shadow-popover transition-interactive duration-enter group-hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  )
}

/** Grey bars standing in for secondary text, as in the reference. */
export function Lines({ widths = ["w-24", "w-16"] }: { widths?: string[] }) {
  return (
    <span className="flex flex-col gap-1.5">
      {widths.map((w) => (
        <span key={w} className={cn("h-1.5 rounded-full bg-muted", w)} />
      ))}
    </span>
  )
}

/** One candidate in the Smart Jobs deck. */
function CandidateCard({ initials, name, className }: { initials: string; name: string; className?: string }) {
  return (
    <Float className={cn("flex items-center gap-3", className)}>
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="truncate text-sm font-semibold text-foreground">{name}</span>
        <Lines widths={["w-20"]} />
      </div>
      <Badge variant="outline" className="shrink-0">Shortlist</Badge>
    </Float>
  )
}

/** A deck of applicants: two more peek out behind the front card (opaque,
 *  so only their edges show — a pile, not a muddle), and the deck fans a
 *  little further open on hover. */
function SmartJobs() {
  return (
    <div className="relative w-64 pt-8">
      <CandidateCard
        initials="AM"
        name="Arjun Mehta"
        className="absolute inset-x-0 top-0 scale-90 shadow-card group-hover:-translate-y-2"
      />
      <CandidateCard
        initials="SK"
        name="Sneha Kulkarni"
        className="absolute inset-x-0 top-4 scale-95 shadow-card group-hover:-translate-y-1.5"
      />
      <CandidateCard initials="RV" name="Rahul Verma" className="relative" />
    </div>
  )
}

function AiCalling() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <Float className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <PhoneCall className="size-4" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-foreground">AI agent calling…</span>
          <span className="text-xs text-muted-foreground">Priya S.</span>
        </div>
        <span className="flex h-4 items-center gap-0.5 text-product-accent">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-full w-0.5 rounded-full bg-current animate-voice-bar"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </span>
      </Float>
      <Float className="ml-8 flex items-center justify-between gap-2 py-2">
        <Lines widths={["w-16"]} />
        <Badge variant="success">
          <CheckCircle2 />
          Shortlisted
        </Badge>
      </Float>
    </div>
  )
}

function Database() {
  return (
    <div className="flex w-72 flex-col items-center gap-3">
      <Float className="flex w-full items-center gap-2 rounded-full px-4">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">Delivery executives</span>
        <Badge variant="outline" className="shrink-0">
          <MapPin />2 km
        </Badge>
      </Float>
      <Float className="flex items-center gap-2 self-end py-2">
        <MapPin className="size-4 shrink-0 text-product-accent" />
        <span className="text-xs font-semibold text-foreground">960 active jobseekers nearby</span>
      </Float>
    </div>
  )
}

function Unlimited() {
  return (
    <div className="flex w-64 flex-col gap-2">
      {["Delivery Executive", "Telecaller"].map((title, i) => (
        <Float key={title} className={cn("flex items-center justify-between gap-2 py-2.5", i === 1 && "ml-6")}>
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">{title}</span>
            <Lines widths={["w-14"]} />
          </div>
          <Badge variant="success" className="shrink-0">Live</Badge>
        </Float>
      ))}
      <Badge variant="outline" className="self-start bg-card shadow-card">
        <InfinityIcon className="text-product-accent" />
        Unlimited job posts
      </Badge>
    </div>
  )
}

const SNIPPETS: Record<Product, () => React.JSX.Element> = {
  "Smart Jobs": SmartJobs,
  "AI Calling Agent": AiCalling,
  "Hyperlocal Database": Database,
  "apna Unlimited": Unlimited,
}

export function ProductIllustration({
  product,
  size = "default",
  bare = false,
  className,
}: {
  product: Product
  /** No tile of its own: the snippet alone, for a surface that already
   *  wears the product's gradient (its product page's hero). */
  bare?: boolean
  /** The snippet's scale: "default" for the cards, "lg" for a big tile
   *  (the detail rows). Phones keep it at 1×. */
  size?: "default" | "lg"
  className?: string
}) {
  const Snippet = SNIPPETS[product]
  return (
    <div
      aria-hidden
      // The art always wears its own product's colour, wherever it's shown.
      data-product={PRODUCT_KEY[product]}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-xl p-4",
        !bare && PRODUCT_GRADIENT[product],
        className
      )}
    >
      <div className={cn(size === "lg" ? "sm:scale-150" : "sm:scale-125")}>
        <Snippet />
      </div>
    </div>
  )
}

/** Trust & verification: a verified recruiter and a passed scam check.
 *  On the green gradient — green reads as "verified/safe", and in About's
 *  feature list it comes three items after the AI Calling Agent's green,
 *  so the repeat is far enough apart (user call, 2026-10-17). */
export function TrustIllustration({ size = "default", className }: { size?: "default" | "lg"; className?: string }) {
  return (
    <IllustrationTile tone="green" size={size} className={className}>
      <div className="flex w-64 flex-col gap-2">
        <Float className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">Kiran Stores</span>
            <Lines widths={["w-16"]} />
          </div>
          <Badge variant="success" className="shrink-0">
            <ShieldCheck />
            Verified
          </Badge>
        </Float>
        <Float className="ml-6 flex items-center gap-2 py-2">
          <CheckCircle2 className="size-4 shrink-0 text-success" />
          <span className="text-xs font-semibold text-foreground">Scam check passed</span>
        </Float>
      </div>
    </IllustrationTile>
  )
}
