"use client"

/**
 * JobList — apna hire's jobs dashboard list. Same card as every jobs list
 * (JobCardFrame from the shared jobs table), with apna hire's four states,
 * its three metrics, and one AlertBanner per card saying what the job needs
 * next.
 *
 *   State          Badge     Metrics shown          Banner
 *   under_review   warning   – · – · matches        none (verification is the account alert's job)
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
import { MetaFact, useMetaIcons } from "@/components/apnahire/jobs/meta-fact"
import { FinishSetupPanel } from "@/components/apnahire/post-job/finish-setup"
import { toast } from "sonner"
import {
  AlertBanner,
  Badge,
  Button,
  Copy,
  Database,
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuSeparator,
  ActionMenuTrigger,
  Info,
  Lightbulb,
  ListChecks,
  MoreVertical,
  Pencil,
  PowerOff,
  RefreshCw,
  Share2,
  Trash2,
  Calendar,
  MapPin,
  UserCheck,
  UserRound,
  Users,
} from "@apna/design-system"
import { JobCardFrame, JobMetricPill } from "@apna/design-system"

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
  /** Essential flow: optional details still to add after posting (Finish setup). */
  finishSetupLeft?: number
  /** Job details page facts (meta line and the ⋮ panel). */
  salary?: string
  education?: string
  experience?: string
  /** Job type the credit bought; none on a draft. */
  plan?: "Classic" | "Premium" | "Super premium"
  /** The day it stops (or stopped) taking applications. */
  endsOn?: string
  /** Server-decided nudge for an active job that's short of applications. */
  nudge?: "active-leads" | "improve-reach"
}

export const STATUS: Record<ApnaJobStatus, { label: string; variant: "warning" | "success" | "secondary" | "destructive" }> = {
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
function jobBanner(job: ApnaJob, go: (path: string) => void, onFinishSetup: () => void): React.ReactNode {
  // A job just posted through the essential flow: what it can still be told.
  if (job.finishSetupLeft)
    return (
      <AlertBanner
        variant="info"
        icon={<ListChecks />}
        title={`${job.finishSetupLeft} optional ${job.finishSetupLeft === 1 ? "detail" : "details"} left to add.`}
        action={{ label: "Add more details", onClick: onFinishSetup }}
      />
    )
  switch (job.status) {
    // Under review: no card banner — account verification is asked for once,
    // by the account alert (sidebar / More), not on every job.
    case "under_review":
      return null
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
        ? { label: "Finish posting", onClick: () => go("/apnahire/jobs/new?resume=1") }
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
      <ActionMenu>
        <ActionMenuTrigger
          render={
            <Button variant="ghost" size="icon" aria-label={`Actions for ${job.title}`} className="text-muted-foreground">
              <MoreVertical className="size-4" />
            </Button>
          }
        />
        <ActionMenuContent title={job.title} align="end">
          {job.status !== "expired" && (
            <ActionMenuItem>
              <Pencil />
              Edit
            </ActionMenuItem>
          )}
          {job.status === "active" && (
            <ActionMenuItem>
              <Share2 />
              Share
            </ActionMenuItem>
          )}
          <ActionMenuItem>
            <Copy />
            Duplicate
          </ActionMenuItem>
          {job.status === "active" && (
            <>
              <ActionMenuSeparator />
              <ActionMenuItem variant="destructive">
                <PowerOff />
                Close job
              </ActionMenuItem>
            </>
          )}
          {job.status === "draft" && (
            <>
              <ActionMenuSeparator />
              <ActionMenuItem variant="destructive">
                <Trash2 />
                Delete draft
              </ActionMenuItem>
            </>
          )}
        </ActionMenuContent>
      </ActionMenu>
    </>
  )
}

function JobCard({ job }: { job: ApnaJob }) {
  const router = useRouter()
  const status = STATUS[job.status]
  const icons = useMetaIcons()
  // Under review: not live yet, so nothing is counting.
  const counting = job.status !== "under_review"
  const href = `/apnahire/jobs/${job.id}`
  const [setupOpen, setSetupOpen] = React.useState(false)

  return (
    <>
    {job.finishSetupLeft != null && <FinishSetupPanel open={setupOpen} onOpenChange={setSetupOpen} />}
    <JobCardFrame
      title={job.title}
      href={href}
      badge={
        <Badge variant={status.variant} className="h-5">
          {status.label}
        </Badge>
      }
      meta={
        icons ? (
          <span className="flex w-full flex-col gap-0.5 text-sm text-foreground sm:flex-row sm:gap-3">
            <MetaFact icon={MapPin}>{job.area}, {job.city}</MetaFact>
            <span className="flex min-w-0 gap-3">
              <MetaFact icon={Calendar} className="shrink-0">{job.postedAt}</MetaFact>
              <MetaFact icon={UserRound}>{job.postedBy}</MetaFact>
            </span>
          </span>
        ) : (
        // A candidate card's facts: dots, no icons. Phones get two set lines,
        // so a date never cuts off.
        <p className="flex w-full flex-col gap-0.5 text-sm text-foreground sm:flex-row sm:flex-wrap sm:gap-0">
          <span className="truncate">
            {job.area}, {job.city}
          </span>
          <span className="truncate">
            <span aria-hidden className="px-1.5 text-muted-foreground max-sm:hidden">•</span>
            Posted {job.postedAt}
            <span aria-hidden className="px-1.5 text-muted-foreground">•</span>
            By {job.postedBy}
          </span>
        </p>
        )
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
      banner={jobBanner(job, (path) => router.push(path), () => setSetupOpen(true))}
    />
    </>
  )
}

export function JobList({ jobs, empty }: { jobs: ApnaJob[]; empty?: React.ReactNode }) {
  if (jobs.length === 0) {
    if (empty) return <>{empty}</>
    return (
      <div className="flex min-h-64 items-center justify-center rounded-card border border-dashed border-border bg-card p-8 text-sm text-muted-foreground">
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
