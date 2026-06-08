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
  Building2,
  Clock,
  Copy,
  Download,
  Globe,
  Languages,
  ListChecks,
  MapPin,
  Mic,
  MoreVertical,
  PhoneCall,
  PhoneOutgoing,
  PowerOff,
  Share2,
  Upload,
  User,
  UserPlus,
} from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, use, useMemo, useState } from "react"

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
import { PageHeader } from "@/components/onlyrounds/page-header"
import { RoundSummaryStrip } from "@/components/onlyrounds/round-summary-strip"
import { IconLabel } from "@/components/onlyrounds/shared"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

type Stage = "screening" | "interview" | "selected"

type CandidateRow = Candidate & { stage: Stage }

const CANDIDATES: CandidateRow[] = [
  {
    id: "aditi",
    name: "Aditi Sharma",
    role: "Se Engineer",
    company: "Apna",
    stage: "screening",
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
    cefrLevel: "c1",
  },
  {
    id: "sadanand",
    name: "Sadanand",
    role: "Se Engineer",
    company: "Apna",
    email: "buruds@gmail.com",
    phone: "+919164862614",
    state: { kind: "pending", attempted: 0, total: 5 },
    cefrLevel: "na",
    stage: "screening",
  },
  {
    id: "demo1",
    name: "Karan",
    role: "Se Engineer",
    company: "Apna",
    email: "karan.jain@apna.co",
    phone: "+918601250243",
    state: {
      kind: "incomplete",
      attempted: 2,
      total: 2,
      attempts: [
        { label: "First Attempt: Call Started", at: "Apr 08, 2026 at 07:21 PM" },
        { label: "First Attempt: Call Ended (15s)", at: "Apr 08, 2026 at 07:21 PM" },
        { label: "Second Attempt: Call Started", at: "Apr 09, 2026 at 08:02 AM" },
        { label: "Second Attempt: Call Ended (3s)", at: "Apr 09, 2026 at 12:32 PM" },
      ],
    },
    cefrLevel: "na",
    stage: "screening",
    note: "Hello how are you",
  },
  {
    id: "chaitra",
    name: "chaitra",
    email: "chaitra.b.ext@apna.co",
    phone: "+918971981508",
    state: {
      kind: "no-response",
      attempted: 5,
      total: 5,
      attempts: [
        { label: "First Attempt: Call Started", at: "Apr 08, 2026 at 09:00 AM" },
        { label: "First Attempt: No Answer", at: "Apr 08, 2026 at 09:01 AM" },
        { label: "Second Attempt: Call Started", at: "Apr 08, 2026 at 03:14 PM" },
        { label: "Second Attempt: No Answer", at: "Apr 08, 2026 at 03:15 PM" },
        { label: "Third Attempt: Call Started", at: "Apr 09, 2026 at 10:30 AM" },
        { label: "Third Attempt: No Answer", at: "Apr 09, 2026 at 10:31 AM" },
        { label: "Fourth Attempt: Call Started", at: "Apr 09, 2026 at 05:45 PM" },
        { label: "Fourth Attempt: No Answer", at: "Apr 09, 2026 at 05:46 PM" },
        { label: "Fifth Attempt: Call Started", at: "Apr 10, 2026 at 11:00 AM" },
        { label: "Fifth Attempt: No Answer", at: "Apr 10, 2026 at 11:01 AM" },
      ],
    },
    cefrLevel: "na",
    stage: "screening",
  },
  {
    id: "rohit-notfit",
    name: "Rohit Verma",
    role: "QA Trainee",
    company: "Independent",
    email: "rohit.verma@test.co",
    phone: "+919812345678",
    state: {
      kind: "completed",
      score: 32,
      verdict: "not-fit",
      insights: [
        { tone: "miss", label: "Below required experience" },
        { tone: "miss", label: "Salary expectation too high" },
        { tone: "ok", label: "Open to office work" },
      ],
    },
    cefrLevel: "b1",
    stage: "screening",
  },
  {
    id: "anjali-interview",
    name: "Anjali Mehra",
    role: "Senior QA Engineer",
    company: "Zomato",
    email: "anjali@test.co",
    phone: "+919800000111",
    state: {
      kind: "completed",
      score: 86,
      verdict: "fit",
      insights: [
        { tone: "ok", label: "5+ years QA experience" },
        { tone: "ok", label: "Strong on test automation" },
        { tone: "ok", label: "Excellent English fluency" },
      ],
    },
    cefrLevel: "c2",
    stage: "interview",
  },
]

/**
 * Map a candidate's state to the AI Evaluation Status filter option id.
 * Keep this in sync with the option ids in FILTERS["ai-status"].
 */
type RoundMeta = {
  name: string
  mode: "ai" | "human"
  meta: { icon: typeof Clock; label: string }[]
}

const ROUNDS: Record<Stage, RoundMeta> = {
  screening: {
    name: "Screening",
    mode: "ai",
    meta: [
      { icon: Clock, label: "30 mins" },
      { icon: User, label: "Isha (Senior AI recruiter)" },
      { icon: Globe, label: "Web" },
      { icon: Languages, label: "English" },
      { icon: ListChecks, label: "30 criteria" },
    ],
  },
  interview: {
    name: "Tech interview",
    mode: "human",
    meta: [
      { icon: Clock, label: "45 mins" },
      { icon: User, label: "Hiring manager" },
      { icon: Globe, label: "Video" },
      { icon: ListChecks, label: "12 criteria" },
    ],
  },
  selected: {
    name: "Selected",
    mode: "human",
    meta: [{ icon: User, label: "Ready for offer" }],
  },
}

function aiStatusKey(c: Candidate): string {
  if (c.state.kind === "completed") {
    return c.state.verdict === "fit" ? "fit" : "rejected"
  }
  if (c.state.kind === "pending") return "pending"
  if (c.state.kind === "incomplete") return "incomplete"
  if (c.state.kind === "no-response") return "no-response"
  if (c.state.kind === "not-interested") return "not-interested"
  return "in-progress"
}

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
      { tone: "ok", label: "Three years experience", atSecond: 32 },
      { tone: "ok", label: "Agreed to salary budget", atSecond: 78 },
      { tone: "ok", label: "Agreed to location and shifts", atSecond: 102 },
      { tone: "ok", label: "15-day notice period", atSecond: 124 },
      { tone: "ok", label: "Expert in test case design", atSecond: 156 },
      { tone: "ok", label: "Articulate and clear communicator", atSecond: 178 },
      { tone: "ok", label: "Exceeds minimum English level", atSecond: 203 },
      { tone: "ok", label: "Can join in 15 days", atSecond: 220 },
      { tone: "ok", label: "Experienced in API testing", atSecond: 245 },
      { tone: "ok", label: "Exceeds preferred English level", atSecond: 268 },
      { tone: "miss", label: "Industry domain not discussed" },
    ],
    callDuration: 347,
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
            atSecond: 32,
          },
          {
            id: "m2",
            text: "Must be comfortable with the specified salary budget and compensation structure.",
            score: 10,
            reasoning:
              "When asked about comfort with the specified salary budget and compensation structure, the candidate explicitly confirmed.",
            dealbreaker: true,
            atSecond: 78,
          },
          {
            id: "m3",
            text: "Must be willing to work from the designated office location and accept required shift timings.",
            score: 10,
            reasoning:
              "The candidate confirmed she is comfortable traveling daily to the Hubli location and accepts the shift timings.",
            dealbreaker: true,
            atSecond: 102,
          },
          {
            id: "m4",
            text: "Must possess clear communication skills to interact with developers and stakeholders.",
            score: 9,
            reasoning:
              "The candidate communicated complex technical concepts clearly and logically; minor accent influence did not impede understanding.",
            dealbreaker: true,
            atSecond: 178,
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
    violations: [
      {
        id: "v1",
        severity: "info",
        title: "Brief background noise",
        detail:
          "Light traffic noise detected around 02:14. Did not affect comprehension.",
        timestamp: "02:14",
      },
      {
        id: "v2",
        severity: "warning",
        title: "Microphone muted mid-response",
        detail:
          "Candidate's mic was muted for 8 seconds at 03:42. Resumed without prompting.",
        timestamp: "03:42",
      },
    ],
    communication: [
      {
        id: "c1",
        channel: "call",
        direction: "out",
        title: "Outbound call attempted",
        detail: "Auto-dialler · no answer · voicemail not enabled.",
        timestamp: "Mon, 3 Jun · 10:02",
      },
      {
        id: "c2",
        channel: "sms",
        direction: "out",
        title: "SMS reminder sent",
        detail:
          "Hi Aditi! We tried calling — please share a slot to retake the screening.",
        timestamp: "Mon, 3 Jun · 10:15",
      },
      {
        id: "c3",
        channel: "whatsapp",
        direction: "in",
        title: "Replied on WhatsApp",
        detail: "\"Sorry, was in a meeting. Free after 4pm today.\"",
        timestamp: "Mon, 3 Jun · 14:08",
      },
      {
        id: "c4",
        channel: "call",
        direction: "out",
        title: "AI call completed",
        detail: "Screening conducted by Isha. Verdict: Fit (100/100).",
        timestamp: "Mon, 3 Jun · 16:23",
        duration: "5:47",
      },
      {
        id: "c5",
        channel: "email",
        direction: "out",
        title: "Result summary emailed",
        detail: "Recruiter recap + scored criteria sent to recruiter@apna.co.",
        timestamp: "Mon, 3 Jun · 16:24",
      },
    ],
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

  // Filter & search state. `filters` keys are group ids; values are the
  // set of selected option ids within that group. When a group has zero
  // selected options it acts as "any" (no constraint).
  const [filters, setFilters] = useState<Record<string, Set<string>>>({})
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFilter = (groupId: string, optionId: string) => {
    setFilters((prev) => {
      const next = { ...prev }
      const set = new Set(next[groupId] ?? [])
      if (set.has(optionId)) set.delete(optionId)
      else set.add(optionId)
      if (set.size === 0) delete next[groupId]
      else next[groupId] = set
      return next
    })
  }

  const candidatesForStage = useMemo(
    () => CANDIDATES.filter((c) => c.stage === mainTab),
    [mainTab],
  )

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const aiPicked = filters["ai-status"]
    const cefrPicked = filters["cefr"]
    return candidatesForStage.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false
      if (aiPicked && aiPicked.size > 0 && !aiPicked.has(aiStatusKey(c))) {
        return false
      }
      if (cefrPicked && cefrPicked.size > 0) {
        if (!c.cefrLevel || !cefrPicked.has(c.cefrLevel)) return false
      }
      return true
    })
  }, [searchQuery, filters, candidatesForStage])

  const totalFilterCount = Object.values(filters).reduce(
    (acc, set) => acc + set.size,
    0,
  )

  // Drawer driven by ?leadId= so the panel survives reloads.
  const setLeadId = (next: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set("leadId", next)
    else params.delete("leadId")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const drawerCandidate = leadId ? DRAWER_DATA[leadId] ?? null : null
  const drawerIndex = leadId
    ? filteredCandidates.findIndex((c) => c.id === leadId)
    : -1
  const prev = drawerIndex > 0 ? filteredCandidates[drawerIndex - 1] : null
  const next =
    drawerIndex >= 0 && drawerIndex < filteredCandidates.length - 1
      ? filteredCandidates[drawerIndex + 1]
      : null

  return (
    <div className="flex min-h-svh flex-col">
      <PageHeader
        // Sticks directly beneath the 64px ProductTopBar so the job
        // title + round tabs stay in view while the candidate list scrolls.
        className="sticky top-16 z-20"
        title={
          <span className="inline-flex items-center gap-2">
            <span className="capitalize">{jobTitle}</span>
            <Badge variant="success">Active</Badge>
          </span>
        }
        description={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <IconLabel icon={Building2}>Simplilearn</IconLabel>
            <span aria-hidden>·</span>
            <IconLabel icon={MapPin}>Hubli</IconLabel>
          </span>
        }
        tabs={
          <Tabs value={mainTab} onValueChange={(v) => { setMainTab(v as Stage); setFilters({}); setSearchQuery("") }}>
            <TabsList variant="line">
              {(["screening", "interview", "selected"] as Stage[]).map((s) => {
                const count = CANDIDATES.filter((c) => c.stage === s).length
                return (
                  <TabsTrigger key={s} value={s}>
                    {s === "screening" && <PhoneCall className="size-3.5" />}
                    {s === "interview" && <User className="size-3.5" />}
                    {ROUNDS[s].name} ({count})
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        }
        actions={
          <>
            <Button variant="outline" size="sm">
              <UserPlus className="size-4" /> Add candidates
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="size-4" /> Share job
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="More job actions"
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Upload className="size-3.5" />
                  Publish
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="size-3.5" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <PowerOff className="size-3.5" />
                  Deactivate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-6 py-4">
        {/* Round summary strip — what's configured for the active round */}
        <RoundSummaryStrip
          roundName={ROUNDS[mainTab].name}
          mode={ROUNDS[mainTab].mode}
          meta={ROUNDS[mainTab].meta}
          onTest={ROUNDS[mainTab].mode === "ai" ? () => undefined : undefined}
        />

        {/* Round-level CTA banner — only shown for AI rounds */}
        {ROUNDS[mainTab].mode === "ai" && candidatesForStage.length > 0 && (
          <InfoBanner
            variant="info"
            icon={PhoneOutgoing}
            title={`Start dialing for ${ROUNDS[mainTab].name} candidates`}
            description="Candidates are ready. The interview will start when you begin dialing."
            action={
              <Button size="sm">
                <Mic className="size-4" />
                Start Dialing
              </Button>
            }
          />
        )}

        {/* Two-column body — stretches to fill remaining page height so the
            filter sidebar runs the full height of the content area. */}
        <div className="flex flex-1 items-stretch gap-4">
          <FilterPanel
            count={totalFilterCount}
            groups={FILTERS}
            selected={filters}
            onToggle={toggleFilter}
            extraTop={
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Search by candidate name"
                  inputSize="sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <p className="text-2xs text-muted-foreground">
                  Keywords (including name)
                </p>
              </div>
            }
          />

          <section className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <strong className="font-semibold text-foreground">
                  {filteredCandidates.length}
                </strong>
                {filteredCandidates.length !== candidatesForStage.length && (
                  <>
                    {" "}
                    of{" "}
                    <strong className="font-semibold text-foreground">
                      {candidatesForStage.length}
                    </strong>
                  </>
                )}{" "}
                candidates
              </p>
              <Button variant="ghost" size="sm">
                <Download className="size-3.5" />
                Download data
              </Button>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
                <p className="text-sm font-medium">
                  No candidates match your filters
                </p>
                <p className="text-xs text-muted-foreground">
                  Try clearing some filters or adjusting your search.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters({})
                    setSearchQuery("")
                  }}
                  className="mt-1"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredCandidates.map((c) => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    onOpen={() => setLeadId(c.id)}
                    onViewInsights={() => setLeadId(c.id)}
                  />
                ))}
              </div>
            )}
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
    </div>
  )
}
