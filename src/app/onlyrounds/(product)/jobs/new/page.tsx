"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { CreateJobWizard } from "@/components/onlyrounds/create-job-wizard"
import { PageHeader } from "@/components/onlyrounds/page-header"

export default function CreateJobPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageHeader
        title={
          <Link
            href="/onlyrounds/jobs"
            aria-label="Back to jobs"
            className="group inline-flex items-center gap-2 hover:text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
              <ArrowLeft className="size-4" />
            </span>
            Create a new job
          </Link>
        }
      />
      <CreateJobWizard />
    </div>
  )
}
