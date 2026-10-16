"use client"

/**
 * Showcase demos — the homepage product showcase's right-hand panel: one
 * short, looping, scripted scene per product, built from design-system
 * pieces (Card, Badge, Avatar) rather than screenshots, so they stay crisp,
 * on-brand and light.
 *
 *   SmartJobsDemo    a job goes live; matched applicants arrive; a WhatsApp alert
 *   AiCallingDemo    the agent's call plays out as a transcript; "Shortlisted"
 *   DatabaseDemo     a radius widens around the office; nearby candidates light up
 *   UnlimitedDemo    a role is filled; its slot frees; the next job takes it
 *
 * Every scene steps through its script with `useScript` and restarts when
 * the panel mounts (StoryTabs mounts only the active one). Under reduced
 * motion a scene shows its finished state, still.
 *
 * Names, numbers and jobs are illustrative — a demo of the product, not
 * data.
 */

import * as React from "react"
import {
  Alert,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Briefcase,
  Card,
  CheckCircle2,
  MapPin,
  PhoneCall,
  WhatsApp,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

/** Steps 0 … `steps - 1`, one every `stepMs`, looping. Reduced motion: the last step. */
function useScript(steps: number, stepMs: number) {
  const [step, setStep] = React.useState(0)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(steps - 1)
      return
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), stepMs)
    return () => window.clearInterval(id)
  }, [steps, stepMs])
  return step
}

/** Shared stage: same size for every scene, so switching never jumps. */
function Stage({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card padding="none" className="flex h-96 flex-col overflow-hidden lg:h-full lg:min-h-96" aria-hidden>
      <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-sm font-semibold text-foreground [&_svg]:size-4 [&_svg]:text-primary">
        {icon}
        {title}
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col gap-3 p-5">{children}</div>
    </Card>
  )
}

/** A row that eases in once `show` turns true, and is gone before it. */
function Appear({ show, className, children }: { show: boolean; className?: string; children: React.ReactNode }) {
  if (!show) return null
  return <div className={cn("animate-in fade-in-0 slide-in-from-bottom-2 duration-enter", className)}>{children}</div>
}

/* ── Smart Jobs ─────────────────────────────────────────────────────────── */

const APPLICANTS = [
  { initials: "RV", name: "Rahul Verma", meta: "2.5 yrs · 1.8 km away", match: 94 },
  { initials: "SK", name: "Sneha Kulkarni", meta: "1 yr · 3.2 km away", match: 91 },
  { initials: "AM", name: "Arjun Mehta", meta: "3 yrs · 2.4 km away", match: 88 },
]

export function SmartJobsDemo() {
  const step = useScript(7, 1000)
  const live = step >= 1
  return (
    <Stage title="Smart job post" icon={<Briefcase />}>
      <div className="flex items-start justify-between gap-3 rounded-lg border border-border p-4">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-base font-semibold text-foreground">Delivery Executive</span>
          {/* Location and pay on their own lines: joined, they broke at the
              "·" on phones. */}
          <span className="text-sm text-muted-foreground">Andheri East, Mumbai</span>
          <span className="text-sm whitespace-nowrap text-muted-foreground">₹18,000–22,000 /month</span>
        </div>
        <Badge variant={live ? "success" : "outline"} className="shrink-0 transition-interactive">
          {live ? "Live" : "Posting…"}
        </Badge>
      </div>
      <span className="text-overline text-muted-foreground">Matched applicants</span>
      {APPLICANTS.map((a, i) => (
        <Appear key={a.name} show={step >= i + 2} className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback>{a.initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-foreground">{a.name}</span>
            <span className="truncate text-xs text-muted-foreground">{a.meta}</span>
          </div>
          <Badge variant="info" className="shrink-0">{a.match}% match</Badge>
        </Appear>
      ))}
      <Appear show={step >= 5} className="mt-auto">
        <Alert variant="success">
          <WhatsApp aria-hidden />
          <AlertTitle>3 matched applicants sent to your WhatsApp</AlertTitle>
        </Alert>
      </Appear>
    </Stage>
  )
}

/* ── AI Calling Agent ───────────────────────────────────────────────────── */

const TRANSCRIPT = [
  { from: "ai", text: "Hi Priya, do you have a two-wheeler licence?" },
  { from: "candidate", text: "Yes, for three years." },
  { from: "ai", text: "Can you join this week?" },
  { from: "candidate", text: "Yes, from Monday." },
] as const

export function AiCallingDemo() {
  const step = useScript(7, 1000)
  const done = step >= 5
  return (
    <Stage title="AI Calling Agent" icon={<PhoneCall />}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Priya Sharma</span>
            <span className="text-xs text-muted-foreground">{done ? "Call ended · 1:42" : "On call…"}</span>
          </div>
        </div>
        {!done && (
          <span className="flex h-5 items-center gap-0.5 text-primary">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-full w-1 rounded-full bg-current animate-voice-bar"
                style={{ animationDelay: `${i * 110}ms` }}
              />
            ))}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {TRANSCRIPT.map((line, i) => (
          <Appear
            key={line.text}
            show={step >= i + 1}
            className={cn(
              "max-w-4/5 rounded-xl px-3 py-2 text-sm",
              line.from === "ai" ? "self-start bg-muted text-foreground" : "self-end bg-primary/10 text-foreground"
            )}
          >
            {line.text}
          </Appear>
        ))}
      </div>
      <Appear show={done} className="mt-auto flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
        <span className="text-sm text-muted-foreground">Licence ✓ · Joins Monday ✓</span>
        <Badge variant="success">
          <CheckCircle2 aria-hidden />
          Shortlisted
        </Badge>
      </Appear>
    </Stage>
  )
}

/* ── Hyperlocal Database ────────────────────────────────────────────────── */

const RADII = [
  { km: 2, count: "128", ring: "scale-40" },
  { km: 3, count: "342", ring: "scale-65" },
  { km: 5, count: "960", ring: "scale-100" },
] as const

/** Candidate dots; `tier` = the radius step (0–2) at which each lights up. */
const DOTS = [
  { at: "top-5/12 left-5/12", tier: 0 },
  { at: "top-7/12 left-7/12", tier: 0 },
  { at: "top-1/2 left-3/8", tier: 0 },
  { at: "top-1/3 left-3/5", tier: 1 },
  { at: "top-2/3 left-1/3", tier: 1 },
  { at: "top-1/4 left-2/5", tier: 1 },
  { at: "top-3/5 left-2/3", tier: 1 },
  { at: "top-1/6 left-1/2", tier: 2 },
  { at: "top-5/6 left-1/2", tier: 2 },
  { at: "top-1/2 left-1/6", tier: 2 },
  { at: "top-1/3 left-5/6", tier: 2 },
  { at: "top-3/4 left-1/5", tier: 2 },
  { at: "top-1/5 left-3/4", tier: 2 },
]

export function DatabaseDemo() {
  const step = useScript(4, 1700)
  const tier = Math.min(step, 2)
  const radius = RADII[tier]
  return (
    <Stage title="Hyperlocal Database" icon={<MapPin />}>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-muted">
        {/* The search radius, growing around the office. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "aspect-square h-full rounded-full border-2 border-primary/40 bg-primary/5 transition-select duration-700",
              radius.ring
            )}
          />
        </div>
        {DOTS.map((dot) => (
          <span
            key={dot.at}
            className={cn(
              "absolute size-2.5 -translate-1/2 rounded-full bg-primary transition-interactive duration-500",
              dot.at,
              dot.tier <= tier ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center rounded-full bg-card p-1.5 shadow-card">
          <MapPin className="size-4 text-primary" aria-hidden />
        </span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-h4 text-foreground tabular-nums">{radius.count}</span>
          <span className="text-sm text-muted-foreground">active jobseekers near your office</span>
        </div>
        <Badge variant="outline" className="shrink-0">Within {radius.km} km</Badge>
      </div>
    </Stage>
  )
}

/* ── apna Unlimited ─────────────────────────────────────────────────────── */

export function UnlimitedDemo() {
  const step = useScript(5, 1400)
  const filled = step === 1
  const free = step === 2
  const reposted = step >= 3
  return (
    <Stage title="apna Unlimited · Monthly plan" icon={<Briefcase />}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Job slots</span>
        <span className="font-semibold text-foreground">{free ? "1 of 2 in use" : "2 of 2 in use"}</span>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-4">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-base font-semibold text-foreground">Delivery Executive</span>
          <span className="text-sm text-muted-foreground">Andheri East, Mumbai</span>
        </div>
        <Badge variant="success" className="shrink-0">Live</Badge>
      </div>
      {free ? (
        <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground animate-in fade-in-0 duration-enter">
          Slot free — post your next job
        </div>
      ) : (
        <div
          key={reposted ? "next" : "first"}
          className="flex h-20 items-center justify-between gap-3 rounded-lg border border-border p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-enter"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-base font-semibold text-foreground">
              {reposted ? "Telecaller" : "Back Office Executive"}
            </span>
            <span className="text-sm text-muted-foreground">{reposted ? "Powai, Mumbai" : "Hinjewadi, Pune"}</span>
          </div>
          <Badge variant={filled ? "secondary" : "success"} className="shrink-0">
            {filled ? "Position filled" : "Live"}
          </Badge>
        </div>
      )}
      <div className="mt-auto flex items-center justify-between gap-3 rounded-lg bg-muted px-3 py-2 text-sm">
        <span className="text-muted-foreground">Jobs posted this month</span>
        <span className="font-semibold text-foreground tabular-nums">{reposted ? 8 : 7} · no extra cost</span>
      </div>
    </Stage>
  )
}
