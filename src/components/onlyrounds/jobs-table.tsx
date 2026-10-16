"use client"

/**
 * JobsTable — list of job rows for the Jobs surface.
 *
 * Row anatomy (mobile-first):
 *   [Logo] [Title] [Status badge]          [⋮ menu]
 *          [Client · Location · Created · By owner]  ← one line, wraps
 *   ─────────────────────────────────────────
 *   [Screening] › [Interview] › [Shortlisted]
 *
 * Status semantics:
 *   active    — configured, editable, not yet live
 *   published — live to candidates, no longer editable
 *   inactive  — deactivated
 *   draft     — still being configured
 */

import { Building2, CalendarDays, CheckCircle2, ChevronRight, Copy, MapPin, MessagesSquare, MoreVertical, PowerOff, Share2, Upload, User2, UserSearch } from "@apna/design-system"
import * as React from "react"
import Link from "next/link"

import { IconLabel, ClientLogo } from "@/components/onlyrounds/shared"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type JobStatus = "active" | "draft" | "inactive" | "published"

export type JobRow = {
  id: string
  title: string
  status: JobStatus
  client: string
  clientLogo?: string
  location: string
  createdAt: string
  owner: string
  screening: number
  interview: number
  shortlisted: number
}

const STATUS_VARIANT: Record<JobStatus, "success" | "secondary" | "outline" | "info"> = {
  active: "success",
  draft: "secondary",
  inactive: "outline",
  published: "info",
}

export function JobsTable({ rows }: { rows: JobRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-sm text-muted-foreground">
        No jobs yet. Start by creating your first role.
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {rows.map((row) => (
        <li key={row.id}>
          <JobRowItem row={row} />
        </li>
      ))}
    </ul>
  )
}

/**
 * JobCardFrame — the job card's shell, shared by every jobs list (OnlyRounds
 * and apna hire) so they look identical: [logo] · title + status badge ·
 * one meta line (wraps when it runs out of room) · actions on top, then a
 * divider and a row of metric chips, then an optional banner. Lists differ
 * only in what they pass in.
 *
 * `logo` is optional: pass it only when it tells jobs apart (OnlyRounds'
 * client logos — an agency posts for many clients). A recruiter's own
 * company initial on every card says nothing and costs title width.
 *
 * Title: 16px semibold on phones (the list-title size, as notification rows
 * and order lines; above the 14px filter chips), 18px from sm.
 *
 * The whole card opens the job: the title link's hit area is stretched over
 * the card (a link can't wrap the pills and buttons inside it), and the card
 * presses and ripples. Actions, metric pills and the banner sit above that
 * layer (relative z-10) with their own clicks; the ink utility lets only the
 * innermost pressed surface ripple. Keyboard: one link per card (the title)
 * plus the inner controls.
 */
export function JobCardFrame({
  logo,
  title,
  href,
  badge,
  meta,
  actions,
  pills,
  banner,
}: {
  logo?: React.ReactNode
  title: string
  href: string
  /** Status badge — sits beside the title. */
  badge: React.ReactNode
  /** One line of facts (location, date, owner), each led by an icon;
   *  wraps when it doesn't fit. */
  meta: React.ReactNode
  /** Top-right, never wraps (state CTA, ⋮ menu). */
  actions: React.ReactNode
  /** The metrics row under the divider; omitted when there's nothing yet. */
  pills?: React.ReactNode
  /** One AlertBanner at the bottom: what this job needs next. */
  banner?: React.ReactNode
}) {
  return (
    <div className="ink press-subtle relative cursor-pointer rounded-xl border border-border/60 bg-card px-4 py-4 sm:px-5 shadow-card transition-interactive hover:shadow-elevated">
      {/* Header row: Logo · content block · actions */}
      <div className="flex items-start gap-3">
        {logo && <div className="mt-0.5 shrink-0">{logo}</div>}

        {/* Content column — grows to fill available width */}
        <div className="min-w-0 flex-1">
          {/* Title + status badge. The title wraps (up to two lines) rather
              than truncating — "Customer Support Executive" stays readable
              beside its badge on a phone; the badge sits on the first line. */}
          <div className="flex min-w-0 items-start gap-2">
            <Link
              href={href}
              className="group min-w-0 outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              <span className="line-clamp-2 text-base font-semibold group-hover:underline sm:text-lg">{title}</span>
            </Link>
            <span className="mt-0.5 shrink-0 sm:mt-1">{badge}</span>
          </div>

          {/* One line of meta that wraps onto the next when it runs out of
              room. Each item leads with its own icon, so no separator dots —
              they'd dangle at the end of a wrapped line. */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">{meta}</div>
        </div>

        <div className="relative z-10 -mr-1 -mt-1 flex shrink-0 items-center gap-1 self-start">{actions}</div>
      </div>

      {/* Pills — horizontal scroll on mobile */}
      {pills && (
        <>
          <hr className="-mx-4 mt-4 border-t border-border/60 sm:-mx-5" />
          <div className="relative z-10 mt-3 flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar pb-0.5">
            {pills}
          </div>
        </>
      )}

      {banner && <div className="relative z-10 mt-3">{banner}</div>}
    </div>
  )
}

function JobRowItem({ row }: { row: JobRow }) {
  const showRounds = row.status !== "draft"

  return (
    <JobCardFrame
      logo={<ClientLogo name={row.client} src={row.clientLogo} size="md" />}
      title={row.title}
      href={`/apnahire/jobs/${row.id}`}
      badge={
        <Badge variant={STATUS_VARIANT[row.status]} className="h-5 capitalize">
          {row.status}
        </Badge>
      }
      meta={
        <>
          <IconLabel icon={Building2}>{row.client}</IconLabel>
          <IconLabel icon={MapPin}>{row.location}</IconLabel>
          <IconLabel icon={CalendarDays}>Created {row.createdAt}</IconLabel>
          <IconLabel icon={User2}>By {row.owner}</IconLabel>
        </>
      }
      actions={<RowActions status={row.status} />}
      pills={
        showRounds ? (
          <>
            <JobMetricPill
              href={`/apnahire/jobs/${row.id}?round=screening`}
              icon={UserSearch}
              label="Screening"
              count={row.screening}
            />
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <JobMetricPill
              href={`/apnahire/jobs/${row.id}?round=interview`}
              icon={MessagesSquare}
              label="Interview"
              count={row.interview}
            />
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <JobMetricPill
              href={`/apnahire/jobs/${row.id}?round=shortlisted`}
              icon={CheckCircle2}
              label="Shortlisted"
              count={row.shortlisted}
            />
          </>
        ) : undefined
      }
    />
  )
}

/** One metric in the card's pill row. `count` "–" = not counting yet (a job
 *  under review); `extra` is a status tag after it ("4 new", "5 pending") —
 *  pass a default-size Badge so it matches the count's box exactly. */
export function JobMetricPill({
  href,
  icon: Icon,
  label,
  count,
  unread,
}: {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  count: number | string
  /** Something here hasn't been looked at ("4 new", "5 pending"). Shown as
   *  a dot on the count — the exact number lives on the list it opens —
   *  and spoken in full to screen readers. */
  unread?: string
}) {
  const shown = typeof count === "number" ? count.toLocaleString("en-IN") : count
  return (
    // Each chip is its own link (to that list of candidates); the chevron
    // says so. 32px tall — an easy tap.
    <Link
      href={href}
      aria-label={[label, shown, unread].filter(Boolean).join(", ")}
      className="ink press-subtle inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-secondary px-3 text-xs text-secondary-foreground transition-interactive outline-none hover:bg-secondary/80 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Icon className="size-3.5 text-muted-foreground" aria-hidden />
      <span>{label}</span>
      {/* Same box as a default Badge (20px, px-2, text-xs, medium, pill). */}
      <span className="relative inline-flex h-5 min-w-5 items-center justify-center rounded-4xl bg-muted-foreground/25 px-2 text-xs leading-none font-medium tabular-nums text-foreground">
        {shown}
        {/* Unread: a dot on the count's corner, ringed in the pill's colour
            so it reads against the count, with a ping that plays three
            times and stops (animate-unread-ping). One colour for every
            "haven't looked yet". */}
        {unread && (
          <span className="absolute -top-0.5 -right-0.5 flex size-2" aria-hidden>
            <span className="animate-unread-ping absolute inline-flex size-full rounded-full bg-info" />
            <span className="relative inline-flex size-2 rounded-full bg-info ring-2 ring-secondary" />
          </span>
        )}
      </span>
      <ChevronRight className="-mr-1 size-3.5 text-muted-foreground" aria-hidden />
    </Link>
  )
}

function RowActions({ status }: { status: JobStatus }) {
  const canPublish = status === "active" || status === "draft"
  const canDeactivate = status !== "inactive"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Row actions"
            className="text-muted-foreground"
          >
            <MoreVertical className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Share2 className="size-3.5" />
          Share
        </DropdownMenuItem>
        {canPublish ? (
          <DropdownMenuItem>
            <Upload className="size-3.5" />
            Publish
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem>
          <Copy className="size-3.5" />
          Duplicate
        </DropdownMenuItem>
        {canDeactivate ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <PowerOff className="size-3.5" />
              Deactivate
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
