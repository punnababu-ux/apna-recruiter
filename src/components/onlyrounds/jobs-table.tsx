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

import { Building2, CalendarDays, CheckCircle2, ChevronRight, Copy, JobCardFrame, JobMetricPill, MapPin, MessagesSquare, MoreVertical, PowerOff, Share2, Upload, User2, UserSearch } from "@apna/design-system"
import * as React from "react"

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
