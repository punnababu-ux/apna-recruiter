"use client"

/**
 * JobTitleEdit — PREVIEW ONLY (?titleedit=1). Edit a posted job's title from
 * job details ("About this job"). A title close to the posted one saves; a
 * title that means another job role does not: an AI hint says so, offers
 * close titles to tap, and points to a new job post (DECISIONS.md, "Editing
 * a job after applications start").
 *
 * shortcut: "close" is the same job role by keyword (categoryForTitle), a
 * title no rule matches is allowed, and the new title is kept in this row
 * only. Use the live title matching and save on the job when this ships.
 */

import * as React from "react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle, Button, Field, FieldLabel, Input, Sparkles } from "@apna/design-system"
import { PlanPopup, PopupBody, PopupFooter, PopupHeader } from "@/components/apnahire/plan-popup"
import { useClientSnapshot } from "@/hooks/use-client-snapshot"
import { categoryForTitle } from "@/lib/apnahire/job-draft"

// Sample close titles per job role; the live list comes from the title model.
const CLOSE_TITLES: Record<string, string[]> = {
  Telesales: ["Telesales executive", "Telecaller", "Senior telecaller"],
  "Field Sales": ["Field sales executive", "Sales officer", "Senior sales executive"],
  Delivery: ["Delivery executive", "Delivery rider", "Delivery partner"],
  "Back Office": ["Back office executive", "Data entry operator", "Computer operator"],
  "Customer Support": ["Customer support executive", "Customer care executive", "Helpdesk executive"],
}

const readFlag = () => new URLSearchParams(window.location.search).get("titleedit") === "1"

export function JobTitleEdit({ job }: { job: { title: string } }) {
  const on = useClientSnapshot(readFlag, false)
  const [title, setTitle] = React.useState(job.title)
  const [typed, setTyped] = React.useState(job.title)
  const [open, setOpen] = React.useState(false)
  if (!on) return null
  const role = categoryForTitle(job.title)
  const next = typed.trim()
  const nextRole = next ? categoryForTitle(next) : undefined
  const far = !!role && !!nextRole && nextRole !== role
  const close = (role ? (CLOSE_TITLES[role] ?? []) : []).filter((t) => t.toLowerCase() !== title.toLowerCase())
  return (
    <>
      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-muted-foreground">Job title</span>
          <span className="truncate text-foreground">{title}</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setTyped(title)
            setOpen(true)
          }}
        >
          Edit
        </Button>
      </div>

      <PlanPopup open={open} onOpenChange={setOpen}>
        <PopupHeader title="Edit job title" description={role ? `Job role: ${role}` : undefined} />
        <PopupBody>
          <Field>
            <FieldLabel htmlFor="job-title-edit">Job title</FieldLabel>
            <Input
              id="job-title-edit"
              className="text-base md:text-sm"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              aria-invalid={far ? true : undefined}
              aria-describedby={far ? "job-title-far" : undefined}
            />
          </Field>
          {far && (
            <Alert id="job-title-far" variant="info" role="alert">
              <Sparkles aria-hidden />
              <AlertTitle>This is a different job</AlertTitle>
              <AlertDescription className="flex flex-col items-start gap-3">
                <span>
                  &ldquo;{next}&rdquo; is a {nextRole!.toLowerCase()} job. Yours is posted as {role!.toLowerCase()}.
                  {close.length ? " Try a title close to it:" : ""}
                </span>
                {close.length > 0 && (
                  <span className="flex flex-wrap gap-2">
                    {close.map((t) => (
                      <Button key={t} type="button" variant="outline" size="sm" onClick={() => setTyped(t)}>
                        {t}
                      </Button>
                    ))}
                  </span>
                )}
                <Button variant="link-inline" nativeButton={false} render={<Link href="/apnahire/jobs/new" />}>
                  Post it as a new job
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </PopupBody>
        <PopupFooter>
          <Button type="button" size="lg" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            size="lg"
            disabled={far || !next || next === title}
            onClick={() => {
              setTitle(next)
              setOpen(false)
            }}
          >
            Save
          </Button>
        </PopupFooter>
      </PlanPopup>
    </>
  )
}
