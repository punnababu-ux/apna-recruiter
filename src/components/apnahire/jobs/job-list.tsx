"use client"

/**
 * JobList — apna hire's jobs dashboard list. Same card as every jobs list
 * (JobCardFrame from the shared jobs table), with apna hire's four states,
 * its three metrics, and one AlertBanner per card saying what the job needs
 * next.
 *
 *   State          Badge     Metrics shown          Banner
 *   under_review   warning   – · – · matches        Verify to start receiving candidates (destructive)
 *   active         success   applied · leads · DB   only when a nudge applies (see below)
 *   draft          secondary none                   Finish posting (muted)
 *   expired        destr.    applied · leads · DB   Repost to get new candidates (muted)
 *
 * Unread (applications not yet reviewed, new leads) is a dot on the
 * metric's count, not a second number: the pill keeps one total, and the
 * list it opens shows which ones are new. In the product the dot clears
 * once that list is opened (server state; here it follows the mock).
 *
 * Active-job nudges come from the server (`nudge`), not guessed here:
 *   "active-leads"  — applications are slow but leads are waiting (success)
 *   "improve-reach" — applications are slow; suggestions can help (info)
 *
 * The one next step for a draft or expired job ("Finish posting", "Repost")
 * is a button beside the ⋮ menu from `sm` up, and the banner's link on
 * phones; everything else lives in the menu.
 */

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertBanner,
  Badge,
  Button,
  CalendarDays,
  CircleAlert,
  Copy,
  Database,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Info,
  Lightbulb,
  MapPin,
  MoreVertical,
  Pencil,
  PowerOff,
  RefreshCw,
  Share2,
  Trash2,
  User2,
  UserCheck,
  Users,
} from "@apna/design-system"
import { ClientLogo, IconLabel } from "@/components/onlyrounds/shared"
import { JobCardFrame, JobMetricPill } from "@/components/onlyrounds/jobs-table"

export type ApnaJobStatus = "under_review" | "active" | "draft" | "expired"

export interface ApnaJob {
  id: string
  title: string
  status: ApnaJobStatus
  company: string
  area: string
  city: string
  postedAt: string
  postedBy: string
  applied: number
  /** Applications not yet reviewed. */
  appliedPending?: number
  activeLeads: number
  activeLeadsNew?: number
  dbMatches: number
  /** Server-decided nudge for an active job that's short of applications. */
  nudge?: "active-leads" | "improve-reach"
}

const STATUS: Record<ApnaJobStatus, { label: string; variant: "warning" | "success" | "secondary" | "destructive" }> = {
  under_review: { label: "Under review", variant: "warning" },
  active: { label: "Active", variant: "success" },
  draft: { label: "Draft", variant: "secondary" },
  expired: { label: "Expired", variant: "destructive" },
}

export const STATUS_LABELS: Record<ApnaJobStatus, string> = {
  under_review: STATUS.under_review.label,
  active: STATUS.active.label,
  draft: STATUS.draft.label,
  expired: STATUS.expired.label,
}

/** The banner a card shows, if any — one per card, the most important. */
function jobBanner(job: ApnaJob, go: (path: string) => void): React.ReactNode {
  switch (job.status) {
    case "under_review":
      return (
        <AlertBanner
          variant="destructive"
          icon={<CircleAlert />}
          title="Verify your account to start receiving candidates. It's a one-time step."
          action={{ label: "Verify now", onClick: () => go("/apnahire/settings") }}
        />
      )
    // Draft / expired: on phones the next-step button would crowd the title,
    // so it moves into the banner as its link; from `sm` up it's the button
    // beside ⋮ and the banner stays a plain note.
    case "draft":
    case "expired": {
      const draft = job.status === "draft"
      const props = {
        variant: "muted" as const,
        icon: draft ? <Info /> : <RefreshCw />,
        title: draft ? "Finish posting to start receiving candidates." : "Repost to receive new candidates.",
      }
      const step = draft
        ? { label: "Finish posting", onClick: () => go("/apnahire/jobs/new") }
        : { label: "Repost now", onClick: () => toast.success("Job reposted") }
      return (
        <>
          <AlertBanner {...props} action={step} className="sm:hidden" />
          <AlertBanner {...props} className="max-sm:hidden" />
        </>
      )
    }
    case "active":
      if (job.nudge === "active-leads")
        return (
          <AlertBanner
            variant="success"
            icon={<Users />}
            title={`Not enough applications? ${job.activeLeads} active leads are ready to contact now.`}
            action={{ label: "View active leads", onClick: () => go(`/apnahire/jobs/${job.id}?tab=leads`) }}
          />
        )
      if (job.nudge === "improve-reach")
        return (
          <AlertBanner
            variant="info"
            icon={<Lightbulb />}
            title="Not enough applications? Our suggestions can bring up to 2x more."
            action={{ label: "Update requirements", onClick: () => go(`/apnahire/jobs/${job.id}?edit=requirements`) }}
          />
        )
      return null
  }
}

function JobActions({ job }: { job: ApnaJob }) {
  const cta =
    job.status === "draft" ? (
      <Button size="sm" variant="outline" className="max-sm:hidden" nativeButton={false} render={<Link href="/apnahire/jobs/new" />}>
        Finish posting
      </Button>
    ) : job.status === "expired" ? (
      <Button size="sm" variant="outline" className="max-sm:hidden" onClick={() => toast.success("Job reposted")}>
        <RefreshCw /> Repost
      </Button>
    ) : null

  return (
    <>
      {cta}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" aria-label={`Actions for ${job.title}`} className="text-muted-foreground">
              <MoreVertical className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          {job.status !== "expired" && (
            <DropdownMenuItem>
              <Pencil className="size-3.5" />
              Edit
            </DropdownMenuItem>
          )}
          {job.status === "active" && (
            <DropdownMenuItem>
              <Share2 className="size-3.5" />
              Share
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Copy className="size-3.5" />
            Duplicate
          </DropdownMenuItem>
          {job.status === "active" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <PowerOff className="size-3.5" />
                Close job
              </DropdownMenuItem>
            </>
          )}
          {job.status === "draft" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="size-3.5" />
                Delete draft
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

function JobCard({ job }: { job: ApnaJob }) {
  const router = useRouter()
  const status = STATUS[job.status]
  // Under review: not live yet, so nothing is counting.
  const counting = job.status !== "under_review"
  const href = `/apnahire/jobs/${job.id}`

  return (
    <JobCardFrame
      logo={<ClientLogo name={job.company} size="md" />}
      title={job.title}
      href={href}
      badge={
        <Badge variant={status.variant} className="h-5">
          {status.label}
        </Badge>
      }
      meta={
        <>
          <IconLabel icon={MapPin}>
            {job.area}, {job.city}
          </IconLabel>
          <IconLabel icon={CalendarDays}>Posted {job.postedAt}</IconLabel>
          <IconLabel icon={User2}>By {job.postedBy}</IconLabel>
        </>
      }
      actions={<JobActions job={job} />}
      pills={
        job.status === "draft" ? undefined : (
          <>
            <JobMetricPill
              href={`${href}?tab=applied`}
              icon={UserCheck}
              label="Applied"
              count={counting ? job.applied : "–"}
              // A dot, not "5 pending": the total stays the one number on
              // the pill; the list it opens shows which are unreviewed.
              unread={counting && job.appliedPending ? `${job.appliedPending} pending` : undefined}
            />
            <JobMetricPill
              href={`${href}?tab=leads`}
              icon={Users}
              label="Active leads"
              count={counting ? job.activeLeads : "–"}
              unread={counting && job.activeLeadsNew ? `${job.activeLeadsNew} new` : undefined}
            />
            <JobMetricPill href={`${href}?tab=database`} icon={Database} label="Database matches" count={job.dbMatches} />
          </>
        )
      }
      banner={jobBanner(job, (path) => router.push(path))}
    />
  )
}

export function JobList({ jobs }: { jobs: ApnaJob[] }) {
  if (jobs.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-sm text-muted-foreground">
        No jobs here yet.
      </div>
    )
  }
  return (
    <ul className="flex flex-col gap-3">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  )
}
