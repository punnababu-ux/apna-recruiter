"use client"

/**
 * JobsTable — list of job rows for the Jobs surface.
 *
 * Row anatomy:
 *   avatar · [title + status + client] · meta (location / created / owner)
 *          · rounds pipeline (round counts + selected) · overflow menu
 *
 * Status semantics:
 *   active    — configured, editable, not yet live
 *   published — live to candidates, no longer editable
 *   inactive  — deactivated
 *   draft     — still being configured
 *
 * Overflow menu: Share · Publish · Duplicate · Deactivate.
 * Rows are links into the job-detail route.
 */

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Copy,
  MapPin,
  MessagesSquare,
  MoreVertical,
  PowerOff,
  Share2,
  Upload,
  User2,
  UserSearch,
} from "lucide-react"
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
import { cn } from "@/lib/utils"

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

function JobRowItem({ row }: { row: JobRow }) {
  const showRounds = row.status !== "draft"

  return (
    <div className="rounded-xl border border-border/60 bg-card px-5 py-4 shadow-card transition-shadow hover:shadow-elevated">
      <div className="flex items-start gap-4">
        <ClientLogo name={row.client} src={row.clientLogo} size="md" />

        <div className="min-w-0 flex-1">
          <Link href={`/onlyrounds/jobs/${row.id}`} className="group block">
            <span className="block truncate font-medium group-hover:underline">
              {row.title}
            </span>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <IconLabel icon={Building2}>{row.client}</IconLabel>
              <span aria-hidden>·</span>
              <IconLabel icon={MapPin}>{row.location}</IconLabel>
              <span aria-hidden>·</span>
              <IconLabel icon={CalendarDays}>
                Created {row.createdAt}
              </IconLabel>
              <span aria-hidden>·</span>
              <IconLabel icon={User2}>By {row.owner}</IconLabel>
            </div>
          </Link>
        </div>

        <Badge
          variant={STATUS_VARIANT[row.status]}
          className={cn("self-center capitalize")}
        >
          {row.status}
        </Badge>
        <div className="self-center">
          <RowActions status={row.status} />
        </div>
      </div>

      {showRounds ? (
        <>
          <hr className="-mx-5 mt-4 border-t border-border/60" />
          <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
            <RoundPill
              href={`/onlyrounds/jobs/${row.id}?round=screening`}
              icon={UserSearch}
              label="Screening"
              count={row.screening}
            />
            <ChevronRight
              className="size-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <RoundPill
              href={`/onlyrounds/jobs/${row.id}?round=interview`}
              icon={MessagesSquare}
              label="Interview"
              count={row.interview}
            />
            <ChevronRight
              className="size-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <RoundPill
              href={`/onlyrounds/jobs/${row.id}?round=shortlisted`}
              icon={CheckCircle2}
              label="Shortlisted"
              count={row.shortlisted}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}



function RoundPill({
  href,
  icon: Icon,
  label,
  count,
}: {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  count: number
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
    >
      <Icon className="size-3.5 text-muted-foreground" aria-hidden />
      <span>{label}</span>
      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted-foreground/25 px-1 text-xs leading-none font-semibold tabular-nums text-foreground">
        {count}
      </span>
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
