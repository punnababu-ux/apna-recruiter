"use client"

/**
 * Job details page: the ⋮ side panel and the status banner (live
 * employer.apna.co, docs/live-employer-kb/README.md §3 "Header").
 *
 *   JobInfoPanel      SheetPanel with three white sections: Plan (job type +
 *                     when it ends), Preference (who contacts first, alerts),
 *                     Job details (view / edit). Draft jobs have no Plan.
 *   JobStatusBanner   one AlertBanner for what the job needs: expired →
 *                     repost, under review → wait, draft → finish posting.
 *                     Active jobs show none.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertBanner,
  Bell,
  Button,
  ChevronRight,
  Clock,
  Info,
  MessageSquare,
  RefreshCw,
  Separator,
  Sheet,
  SheetPanel,
  SheetPanelHeader,
  Star,
} from "@apna/design-system"
import type { ApnaJob } from "@/components/apnahire/jobs/job-list"

const EDIT_HREF = "/apnahire/jobs/new?resume=1"

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 bg-card px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 text-sm [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
      {icon}
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}</span>
      </div>
    </div>
  )
}

export function JobInfoPanel({
  job,
  open,
  onOpenChange,
}: {
  job: ApnaJob
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const expired = job.status === "expired"
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPanel>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          <div className="flex flex-col gap-4 bg-card pt-5">
            <SheetPanelHeader title="About this job" />
            <Separator />
          </div>

          {job.plan && (
            <Section title="Plan">
              <Row icon={<Star />} label={expired ? "Previous plan" : "Job type"} value={`${job.plan} job`} />
              {job.endsOn && (
                <Row
                  icon={<Clock />}
                  label={expired ? "Expired on" : "Live till"}
                  value={job.endsOn}
                />
              )}
            </Section>
          )}

          <Section
            title="Preference"
            action={
              <Button variant="link" size="sm" onClick={() => router.push(EDIT_HREF)}>
                Edit
              </Button>
            }
          >
            <Row icon={<MessageSquare />} label="Candidate communication" value="You contact candidates first" />
            <Row icon={<Bell />} label="apna alerts" value="Daily summary" />
          </Section>

          <Section title="Job details">
            <button
              type="button"
              onClick={() => router.push(EDIT_HREF)}
              className="ink press relative -mx-2 flex items-center justify-between gap-3 rounded-control px-2 py-2 text-sm text-foreground transition-interactive hover:bg-muted"
            >
              View or edit job
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
          </Section>
        </div>
      </SheetPanel>
    </Sheet>
  )
}

export function JobStatusBanner({ job }: { job: ApnaJob }) {
  const router = useRouter()
  switch (job.status) {
    case "expired":
      return (
        <AlertBanner
          variant="destructive"
          icon={<RefreshCw />}
          title={
            <span className="flex flex-col gap-0.5">
              <span>Your job has expired. Repost it to get new applications.</span>
              {job.endsOn && (
                <span className="text-xs text-muted-foreground">
                  Expired on {job.endsOn}
                  {job.plan && ` · ${job.plan} job`}
                </span>
              )}
            </span>
          }
          action={{ label: "Repost now", onClick: () => toast.success("Job reposted") }}
        />
      )
    case "under_review":
      return (
        <AlertBanner
          variant="warning"
          icon={<Clock />}
          title="Your job is under review. It goes live when we approve it, usually in a few hours."
        />
      )
    case "draft":
      return (
        <AlertBanner
          variant="muted"
          icon={<Info />}
          title="Finish posting to start receiving candidates."
          action={{ label: "Finish posting", onClick: () => router.push(EDIT_HREF) }}
        />
      )
    default:
      return null
  }
}
