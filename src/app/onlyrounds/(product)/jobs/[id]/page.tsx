"use client"

/**
 * /onlyrounds/jobs/[id] — Job detail & candidate pipeline.
 *
 * Layout: main tabs (Screening / Selected) inside PageHeader, then a
 * 2-column body: left FilterPanel (280px), right candidate feed with
 * sub-tabs (Full profile / AI screening insights / Interview violations).
 *
 * Mock data sketches the key states: a rejected-by-AI candidate with an
 * AI-insight chip row, and an incomplete-call candidate with a progress
 * rail. These two rows are the "hard" states that drive most of the
 * component API surface — everything else is a permutation.
 */

import { ChevronLeft, Download, Share2, UserPlus } from "lucide-react"
import Link from "next/link"
import { use, useState } from "react"

import { CandidateCard, type Candidate } from "@/components/onlyrounds/candidate-card"
import { FilterPanel, type FilterGroup } from "@/components/onlyrounds/filter-panel"
import { NetworkShareSheet } from "@/components/onlyrounds/network-share-sheet"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FILTERS: FilterGroup[] = [
  {
    id: "ai-status",
    label: "AI Evaluation Status",
    options: [
      { id: "fit",          label: "Fit",                count: 0 },
      { id: "in-progress",  label: "Evaluation In-progress", count: 1 },
      { id: "not-interested", label: "Not Interested",  count: 0 },
      { id: "no-response",  label: "No Response",        count: 2 },
      { id: "rejected",     label: "Rejected / Not fit", count: 1 },
      { id: "pending",      label: "Interview pending",  count: 0 },
      { id: "incomplete",   label: "Incomplete call",    count: 1 },
    ],
  },
  {
    id: "cefr",
    label: "CEFR Score",
    options: [
      { id: "a1", label: "A1 - Beginner",           count: 0 },
      { id: "a2", label: "A2 - Elementary",         count: 0 },
      { id: "b1", label: "B1 - Intermediate",       count: 1 },
      { id: "b2", label: "B2 - Upper Intermediate", count: 0 },
      { id: "c1", label: "C1 - Advanced",           count: 0 },
      { id: "c2", label: "C2 - Proficient",         count: 0 },
      { id: "na", label: "Not available",           count: 3 },
    ],
  },
]

const CANDIDATES: Candidate[] = [
  {
    id: "chaitra-inbound",
    name: "chaitra_inbound",
    email: "ravi_hindi@test.com",
    phone: "+918971981508",
    score: 1,
    verdict: "not-fit",
    rejectedByAI: true,
    insights: [
      { tone: "miss", label: "Unresponsive to role details" },
      { tone: "miss", label: "Notice period not discussed" },
      { tone: "miss", label: "Salary details not discussed" },
      { tone: "miss", label: "Location / policy not discussed" },
      { tone: "miss", label: "Tools familiarity not discussed" },
      { tone: "miss", label: "Shift / hours not discussed" },
      { tone: "miss", label: "Job hopping not discussed" },
      { tone: "miss", label: "Compensation not discussed" },
    ],
  },
  {
    id: "harsha-ravi-hindi",
    name: "harsha_ravi_hindi_agent",
    email: "harsha_ravi_hindi_agent@test.com",
    phone: "+918971981508",
    statusTag: { label: "Incomplete call", tone: "warning" },
    incompleteCall: {
      attempted: 1,
      total: 2,
      message: "will try again",
    },
  },
]

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const jobTitle = decodeURIComponent(id).replace(/-/g, " ")
  const [mainTab, setMainTab] = useState<"screening" | "selected">("screening")
  const [subTab, setSubTab] = useState<"profile" | "insights" | "violations">(
    "insights",
  )
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <PageHeader
        eyebrow={
          <Link
            href="/onlyrounds/jobs"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" />
            Back to jobs
          </Link>
        }
        title={
          <span className="inline-flex items-center gap-2">
            <span className="capitalize">{jobTitle}</span>
            <Badge variant="success">Active</Badge>
          </span>
        }
        description="Simplilearn | hubli"
        tabs={
          <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as typeof mainTab)}>
            <TabsList variant="inverted">
              <TabsTrigger value="screening">Screening (2)</TabsTrigger>
              <TabsTrigger value="selected">Selected (0)</TabsTrigger>
            </TabsList>
          </Tabs>
        }
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> Download
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="size-4" /> Add Candidates
            </Button>
            <Button size="sm" onClick={() => setShareOpen(true)}>
              <Share2 className="size-4" /> Share Job
            </Button>
          </>
        }
      />

      <main className="flex flex-1 gap-4 px-6 py-6">
        <FilterPanel
          count={0}
          groups={FILTERS}
          extraTop={
            <div className="flex flex-col gap-2">
              <Input placeholder="Search by candidate name" />
              <p className="text-2xs text-muted-foreground">Keywords (including name)</p>
            </div>
          }
        />

        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <Tabs value={subTab} onValueChange={(v) => setSubTab(v as typeof subTab)}>
            <TabsList variant="line">
              <TabsTrigger value="profile">Full profile</TabsTrigger>
              <TabsTrigger value="insights">AI screening insights</TabsTrigger>
              <TabsTrigger value="violations">Interview violations report</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-4">
            {CANDIDATES.map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>
        </section>
      </main>

      <NetworkShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        jobTitle={jobTitle}
      />
    </div>
  )
}
