"use client"

/**
 * /onlyrounds/jobs/[id] — Job detail & candidate pipeline.
 *
 * Layout:
 *   PageHeader (title + status + breadcrumb + Round tabs + actions)
 *   RoundSummaryStrip (config snapshot of the active round + Test CTA)
 *   InfoBanner (round-level CTA, e.g. "Start dialing")
 *   2-column body: FilterPanel (left) + candidate feed (right)
 *   CandidateDrawer (right-side panel; URL-driven via ?leadId=)
 */

import {
  ChevronLeft,
  Clock,
  Download,
  Globe,
  Languages,
  ListChecks,
  Mic,
  PhoneCall,
  Share2,
  User,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, use, useState } from "react"
import { toast } from "sonner"

import { BulkActionBar } from "@/components/onlyrounds/bulk-action-bar"
import {
  CandidateCard,
  type Candidate,
} from "@/components/onlyrounds/candidate-card"
import {
  CandidateDrawer,
  type DrawerCandidate,
} from "@/components/onlyrounds/candidate-drawer"
import { FilterPanel, type FilterGroup } from "@/components/onlyrounds/filter-panel"
import { InfoBanner } from "@/components/onlyrounds/info-banner"
import { NetworkShareSheet } from "@/components/onlyrounds/network-share-sheet"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { RoundSummaryStrip } from "@/components/onlyrounds/round-summary-strip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ── Mock data ─────────────────────────────────────────────────────────────

const FILTERS: FilterGroup[] = [
  {
    id: "ai-status",
    label: "AI Evaluation Status",
    options: [
      { id: "fit", label: "Fit", count: 1 },
      { id: "in-progress", label: "Evaluation In-progress", count: 0 },
      { id: "not-interested", label: "Not Interested", count: 0 },
      { id: "no-response", label: "No Response", count: 1 },
      { id: "rejected", label: "Rejected / Not fit", count: 0 },
      { id: "pending", label: "Interview pending", count: 1 },
      { id: "incomplete", label: "Incomplete call", count: 1 },
    ],
  },
  {
    id: "cefr",
    label: "CEFR Score",
    options: [
      { id: "a1", label: "A1 - Beginner", count: 0 },
      { id: "a2", label: "A2 - Elementary", count: 0 },
      { id: "b1", label: "B1 - Intermediate", count: 0 },
      { id: "b2", label: "B2 - Upper Intermediate", count: 0 },
      { id: "c1", label: "C1 - Advanced", count: 1 },
      { id: "c2", label: "C2 - Proficient", count: 0 },
      { id: "na", label: "Not available", count: 3 },
    ],
  },
]

const CANDIDATES: Candidate[] = [
  {
    id: "aditi",
    name: "Aditi Sharma",
    role: "Se Engineer",
    company: "Apna",
    email: "aditi@apna.co",
    phone: "+917003393362",
    state: {
      kind: "completed",
      score: 100,
      verdict: "fit",
      insights: [
        { tone: "ok", label: "Three years experience" },
        { tone: "ok", label: "Agreed to salary budget" },
        { tone: "ok", label: "Agreed to location and shifts" },
        { tone: "ok", label: "15-day notice period" },
        { tone: "ok", label: "Expert in test case design" },
        { tone: "ok", label: "Articulate and clear communicator" },
        { tone: "ok", label: "Exceeds minimum English level" },
        { tone: "ok", label: "Can join in 15 days" },
        { tone: "ok", label: "Experienced in API testing" },
        { tone: "ok", label: "Exceeds preferred English level" },
        { tone: "miss", label: "Employment history not discussed" },
        { tone: "miss", label: "Industry domain not discussed" },
      ],
    },
  },
  {
    id: "sadanand",
    name: "Sadanand",
    role: "Se Engineer",
    company: "Apna",
    email: "buruds@gmail.com",
    phone: "+919164862614",
    state: { kind: "pending", attempted: 0, total: 5 },
  },
  {
    id: "demo1",
    name: "demo 1",
    email: "retaker@test.co",
    phone: "+918637266290",
    state: { kind: "incomplete", attempted: 5, total: 5 },
  },
  {
    id: "chaitra",
    name: "chaitra",
    email: "chaitra.b.ext@apna.co",
    phone: "+918971981508",
    state: { kind: "no-response", attempted: 5, total: 5 },
  },
]

const DRAWER_DATA: Record<string, DrawerCandidate> = {
  aditi: {
    id: "aditi",
    name: "Aditi Sharma",
    role: "Se Engineer",
    company: "Apna",
    email: "aditi@apna.co",
    phone: "+917003393362",
    score: 100,
    verdict: "fit",
    cefrLevel: "C1",
    insights: [
      { tone: "miss", label: "Employment history not discussed" },
      { tone: "ok", label: "Three years experience" },
      { tone: "ok", label: "Agreed to salary budget" },
      { tone: "ok", label: "Agreed to location and shifts" },
      { tone: "ok", label: "15-day notice period" },
      { tone: "ok", label: "Expert in test case design" },
      { tone: "ok", label: "Articulate and clear communicator" },
      { tone: "ok", label: "Exceeds minimum English level" },
      { tone: "ok", label: "Can join in 15 days" },
      { tone: "ok", label: "Experienced in API testing" },
      { tone: "ok", label: "Exceeds preferred English level" },
      { tone: "miss", label: "Industry domain not discussed" },
    ],
    recommendations: [
      "Candidate is a strong technical and cultural fit; recommend proceeding to the technical interview round.",
      "Probe further on her experience with specific defect tracking tools like Jira, as she described the process well but didn't name a tool.",
      "Her detailed answers on API testing with Postman and CI/CD integration are a significant plus.",
    ],
    criteriaGroups: [
      {
        id: "must",
        label: "Must-have criteria",
        items: [
          {
            id: "m1",
            text: "Must have the minimum required years of total professional experience in manual testing.",
            score: 10,
            reasoning:
              "The candidate confirmed she has about three years of professional experience in manual testing, exceeding the minimum.",
            dealbreaker: true,
          },
          {
            id: "m2",
            text: "Must be comfortable with the specified salary budget and compensation structure.",
            score: 10,
            reasoning:
              "When asked about comfort with the specified salary budget and compensation structure, the candidate explicitly confirmed.",
            dealbreaker: true,
          },
          {
            id: "m3",
            text: "Must be willing to work from the designated office location and accept required shift timings.",
            score: 10,
            reasoning:
              "The candidate confirmed she is comfortable traveling daily to the Hubli location and accepts the shift timings.",
            dealbreaker: true,
          },
          {
            id: "m4",
            text: "Must possess clear communication skills to interact with developers and stakeholders.",
            score: 9,
            reasoning:
              "The candidate communicated complex technical concepts clearly and logically; minor accent influence did not impede understanding.",
            dealbreaker: true,
          },
        ],
      },
      {
        id: "preferred",
        label: "Preferred criteria",
        items: [
          {
            id: "p1",
            text: "Immediate joiner or serving a notice period of 30 days or less.",
            score: 10,
            reasoning:
              "The candidate stated she can join within 15 days, which is well within the preferred range.",
          },
          {
            id: "p2",
            text: "Prior experience in the specific industry domain of the hiring company.",
            score: 0,
            reasoning:
              "The specific industry domain of the hiring company was not mentioned during the conversation.",
          },
          {
            id: "p3",
            text: "Basic awareness of API or Database testing alongside manual testing.",
            score: 10,
            reasoning:
              "The candidate demonstrated more than basic awareness, detailing experience with Postman and CI/CD integration.",
          },
        ],
      },
      {
        id: "red-flag",
        label: "Red-flag criteria",
        description: "High score = flag NOT triggered (positive).",
        items: [
          {
            id: "r1",
            text: "Notice period is too long (e.g. 60–90 days) and non-negotiable.",
            score: 10,
            reasoning:
              "The red flag was not triggered. The candidate's notice period is only 15 days.",
            dealbreaker: true,
          },
          {
            id: "r2",
            text: "Salary expectations exceed the maximum budget for the role.",
            score: 10,
            reasoning:
              "The red flag was not triggered. The candidate explicitly confirmed comfort with the salary budget.",
            dealbreaker: true,
          },
          {
            id: "r3",
            text: "Unexplained employment gaps or frequent job hopping (e.g. multiple short stints).",
            score: 0,
            reasoning:
              "This topic was not covered during the conversation, so there is no signal to assess.",
            dealbreaker: true,
          },
        ],
      },
    ],
    cefr: {
      overall: 7.22,
      level: "C1",
      recommendedFor: "Fit for voice process",
      dimensions: [
        {
          label: "Pronunciation",
          score: 7,
          description:
            "Pronunciation is clear and easily understandable. While there is a regional accent, it does not impede comprehension.",
        },
        {
          label: "Fluency",
          score: 7,
          description:
            "The candidate speaks with good fluency and a consistent pace. There are some natural pauses but she maintains flow.",
        },
        {
          label: "Grammar",
          score: 6.5,
          description:
            "Grammar is generally good, and meaning is always clear. There are some minor, common errors.",
        },
        {
          label: "Vocabulary",
          score: 8,
          description:
            "Strong and contextually appropriate vocabulary, especially for the technical domain.",
        },
        {
          label: "Coherence",
          score: 8,
          description:
            "Responses are exceptionally coherent and well-structured. Presents information logically.",
        },
        {
          label: "Mother Tongue Influence",
          score: 5,
          description:
            "A noticeable mother tongue influence is present, but it is consistent and does not make speech difficult to follow.",
        },
      ],
      areasOfImprovement: [
        "Focus on fine-tuning grammar, particularly verb tenses and articles.",
        "Continue practicing pronunciation to further enhance clarity and reduce accent influence.",
        "Build confidence in conversational English to match her high technical proficiency.",
      ],
    },
    profile: {
      about:
        "Manual + API testing engineer with 3 years at Apna. Strong on test-case design, defect tracking, and Postman/CI-CD workflows. Looking for a mid-level QA role in Bengaluru.",
      location: "Hubli, KA",
      experienceYears: 3,
      currentRole: "Software Engineer at Apna",
      experience: [
        {
          role: "Software Engineer (QA)",
          company: "Apna",
          period: "Mar 2024 – Present",
          description:
            "Owned the API test suite for the candidate-matching service; introduced contract tests via Postman; integrated with GitHub Actions for pre-merge runs.",
        },
        {
          role: "Junior QA Engineer",
          company: "Simplilearn",
          period: "Jan 2022 – Feb 2024",
          description:
            "Manual + exploratory testing for the LMS portal. Authored 400+ test cases; ran weekly defect triage with eng leads.",
        },
      ],
      education: [
        {
          degree: "B.E. Computer Science",
          institution: "VTU, Karnataka",
          period: "2018 – 2022",
        },
      ],
      skills: [
        "Manual testing",
        "Postman",
        "API testing",
        "Test case design",
        "Defect tracking",
        "CI/CD",
        "GitHub Actions",
        "Jira",
      ],
      resumeUrl: "#",
    },
  },
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return (
    <Suspense fallback={null}>
      <JobDetailPageInner id={id} />
    </Suspense>
  )
}

function JobDetailPageInner({ id }: { id: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const leadId = searchParams.get("leadId")

  const jobTitle = decodeURIComponent(id).replace(/-/g, " ")
  const [mainTab, setMainTab] = useState<
    "screening" | "interview" | "selected"
  >("screening")
  const [shareOpen, setShareOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const hasSelection = selectedIds.size > 0
  const allSelected = selectedIds.size === CANDIDATES.length

  const toggleSelected = (id: string, next: boolean) => {
    setSelectedIds((prev) => {
      const out = new Set(prev)
      if (next) out.add(id)
      else out.delete(id)
      return out
    })
  }
  const selectAll = (next: boolean) => {
    setSelectedIds(next ? new Set(CANDIDATES.map((c) => c.id)) : new Set())
  }
  const clearSelection = () => setSelectedIds(new Set())

  // Drawer driven by ?leadId= so the panel survives reloads.
  const setLeadId = (next: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set("leadId", next)
    else params.delete("leadId")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const drawerCandidate = leadId ? DRAWER_DATA[leadId] ?? null : null
  const drawerIndex = leadId ? CANDIDATES.findIndex((c) => c.id === leadId) : -1
  const prev =
    drawerIndex > 0 ? CANDIDATES[drawerIndex - 1] : null
  const next =
    drawerIndex >= 0 && drawerIndex < CANDIDATES.length - 1
      ? CANDIDATES[drawerIndex + 1]
      : null

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
        description="Simplilearn · Hubli"
        tabs={
          <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as typeof mainTab)}>
            <TabsList variant="line">
              <TabsTrigger value="screening">
                <PhoneCall className="size-3.5" />
                Screening (4)
              </TabsTrigger>
              <TabsTrigger value="interview">
                <User className="size-3.5" />
                Interview (0)
              </TabsTrigger>
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
              <UserPlus className="size-4" /> Add candidates
            </Button>
            <Button size="sm" onClick={() => setShareOpen(true)}>
              <Share2 className="size-4" /> Share job
            </Button>
          </>
        }
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4">
        {/* Round summary strip — what's configured for the active round */}
        <RoundSummaryStrip
          roundName="Screening"
          mode="ai"
          meta={[
            { icon: Clock, label: "30 mins" },
            { icon: User, label: "Isha (Senior AI recruiter)" },
            { icon: Globe, label: "Web" },
            { icon: Languages, label: "English" },
            { icon: ListChecks, label: "30 criteria" },
          ]}
          onTest={() => undefined}
        />

        {/* Round-level CTA banner */}
        <InfoBanner
          variant="info"
          title="Start dialing for Screening candidates"
          description="Candidates are ready for Screening. The interview will start when you begin dialing."
          action={<Button size="sm">
            <Mic className="size-4" />
            Start Dialing
          </Button>}
        />

        {/* Two-column body */}
        <div className="flex gap-4">
          <FilterPanel
            count={0}
            groups={FILTERS}
            extraTop={
              <div className="flex flex-col gap-2">
                <Input placeholder="Search by candidate name" inputSize="sm" />
                <p className="text-2xs text-muted-foreground">
                  Keywords (including name)
                </p>
              </div>
            }
          />

          <section className="flex min-w-0 flex-1 flex-col gap-3">
            {hasSelection ? (
              <BulkActionBar
                selectedCount={selectedIds.size}
                totalCount={CANDIDATES.length}
                allSelected={allSelected}
                onSelectAll={selectAll}
                onClear={clearSelection}
                onMoveToNextRound={() => {
                  toast.success(
                    `Moved ${selectedIds.size} candidate${selectedIds.size === 1 ? "" : "s"} to next round`,
                  )
                  clearSelection()
                }}
                onReject={() => {
                  toast.success(
                    `Rejected ${selectedIds.size} candidate${selectedIds.size === 1 ? "" : "s"}`,
                  )
                  clearSelection()
                }}
                onReTake={() => {
                  toast.success(
                    `Re-take queued for ${selectedIds.size} candidate${selectedIds.size === 1 ? "" : "s"}`,
                  )
                  clearSelection()
                }}
              />
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <strong className="font-semibold text-foreground">
                    {CANDIDATES.length}
                  </strong>{" "}
                  candidates
                </p>
                <Button variant="ghost" size="sm">
                  <Download className="size-3.5" />
                  Download data
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {CANDIDATES.map((c) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  onOpen={() => setLeadId(c.id)}
                  onViewInsights={() => setLeadId(c.id)}
                  selectable
                  selected={selectedIds.has(c.id)}
                  onSelectChange={(next) => toggleSelected(c.id, next)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <CandidateDrawer
        open={!!drawerCandidate}
        onOpenChange={(o) => !o && setLeadId(null)}
        candidate={drawerCandidate}
        roundName="Screening"
        hasPrev={!!prev}
        hasNext={!!next}
        onPrev={() => prev && setLeadId(prev.id)}
        onNext={() => next && setLeadId(next.id)}
      />

      <NetworkShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        jobTitle={jobTitle}
      />
    </div>
  )
}
