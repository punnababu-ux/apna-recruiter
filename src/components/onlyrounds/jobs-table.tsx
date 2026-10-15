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
 * and apna hire) so they look identical: logo · title + status badge ·
 * one meta line (wraps when it runs out of room) · actions on top, then a
 * divider and a row of metric chips, then an optional banner. Lists differ
 * only in what they pass in.
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
  logo: React.ReactNode
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
    <div className="rounded-xl border border-border/60 bg-card px-4 py-4 sm:px-5 shadow-card transition-shadow hover:shadow-elevated">
      {/* Header row: Logo · content block · actions */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{logo}</div>

        {/* Content column — grows to fill available width */}
        <div className="min-w-0 flex-1">
          {/* Title + status badge on one line; the title truncates first. */}
          <div className="flex min-w-0 items-center gap-2">
            <Link href={href} className="group min-w-0">
              <span className="block truncate text-sm font-medium group-hover:underline sm:text-base">{title}</span>
            </Link>
            <span className="shrink-0">{badge}</span>
          </div>

          {/* One line of meta that wraps onto the next when it runs out of
              room. Each item leads with its own icon, so no separator dots —
              they'd dangle at the end of a wrapped line. */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">{meta}</div>
        </div>

        <div className="-mr-1 -mt-1 flex shrink-0 items-center gap-1 self-start">{actions}</div>
      </div>

      {/* Pills — horizontal scroll on mobile */}
      {pills && (
        <>
          <hr className="-mx-4 mt-4 border-t border-border/60 sm:-mx-5" />
          <div className="mt-3 flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar pb-0.5">
            {pills}
          </div>
        </>
      )}

      {banner && <div className="mt-3">{banner}</div>}
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
  extra,
}: {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  count: number | string
  extra?: React.ReactNode
}) {
  return (
    // Each chip is its own link (to that list of candidates); the chevron
    // says so. 32px tall — an easy tap.
    <Link
      href={href}
      className="ink press-subtle inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-secondary px-3 text-xs text-secondary-foreground transition-interactive outline-none hover:bg-secondary/80 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Icon className="size-3.5 text-muted-foreground" aria-hidden />
      <span>{label}</span>
      {/* Same box as a default Badge (20px, px-2, text-xs, medium, pill), so
          the count and a status tag beside it ("5 pending") read as a pair. */}
      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-4xl bg-muted-foreground/25 px-2 text-xs leading-none font-medium tabular-nums text-foreground">
        {typeof count === "number" ? count.toLocaleString("en-IN") : count}
      </span>
      {extra}
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
