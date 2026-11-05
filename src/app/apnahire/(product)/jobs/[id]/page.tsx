"use client"

/**
 * /onlyrounds/jobs/[id] — Job detail & candidate pipeline.
 *
 * Layout:
 *   PageHeader (title + status + breadcrumb + Round tabs + actions)
 *   (No round summary strip: AI screening was an OnlyRounds feature; apna
 *   Hire's AI calling will be designed as its own add-on, 2026-10-16.)
 *   InfoBanner (round-level CTA, e.g. "Start dialing")
 *   2-column body: FilterPanel (left) + candidate feed (right)
 *   CandidateDrawer (right-side panel; URL-driven via ?leadId=)
 */

import {
  Card,
  Check,
  ConversationList,
  ConversationRow,
  LayoutList,
  Menu,
  MoreVertical,
  Pencil,
  Table2,
  ToggleGroup,
  ToggleGroupItem,
} from "@apna/design-system"
import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, use, useMemo, useState } from "react"
import confetti from "canvas-confetti"
import { AddCandidateDialog, type NewCandidateData } from "@/components/onlyrounds/add-candidate-dialog"

import type { Candidate } from "@/components/onlyrounds/candidate-card"

import { SearchFilterBar } from "@apna/design-system"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { ApplicantTable } from "@/components/apnahire/jobs/applicant-table"
import { ApplicantActions, ApplicantCard, type ApplicantProfile } from "@/components/apnahire/jobs/applicant-card"
import { CandidateProfilePanel, CandidateProfileSheet } from "@/components/apnahire/chats/candidate-profile-panel"
import { MatchBars, matchLevel } from "@/components/apnahire/match-bars"
import type { ApnaJob } from "@/components/apnahire/jobs/job-list"
import { MATCH_LABEL, type ChatNote, type ChatThread } from "@/content/chats"
import { toast } from "sonner"
import { STATUS } from "@/components/apnahire/jobs/job-list"
import { JobInfoPanel, JobStatusBanner } from "@/components/apnahire/jobs/job-info-panel"
import { jobById } from "@/content/apnahire-jobs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"
import { useAppBack } from "@/lib/apnahire/nav"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@apna/design-system"

// ── Mock data ─────────────────────────────────────────────────────────────

/** Applied tab filters, as on live (docs/reference/LIVE-EMPLOYER-KB.md §3 "Applied tab"). */
const FILTERS = [
  {
    id: "show",
    label: "Show candidates who",
    options: [
      { id: "matched", label: "Match the job requirements" },
      { id: "resume", label: "Have a resume" },
      { id: "contacted", label: "Tried to contact you" },
      { id: "featured", label: "Are featured" },
    ],
  },
  {
    id: "applied-in",
    label: "Applied in",
    options: [
      { id: "3", label: "Last 3 days" },
      { id: "7", label: "Last 7 days" },
      { id: "15", label: "Last 15 days" },
      { id: "30", label: "Last 30 days" },
    ],
  },
  {
    id: "english",
    label: "English level",
    options: [
      { id: "basic", label: "Basic" },
      { id: "good", label: "Good" },
      { id: "fluent", label: "Fluent" },
    ],
  },
] as const

/** apna hire facts per applicant (mock): what the filters and groups read. */
type ApplyMeta = ApplicantProfile & {
  /** 0 to 100: how well they fit (level from matchLevel). */
  score: number
  resume?: boolean
  contacted?: boolean
  featured?: boolean
  viewed?: boolean
  appliedDays: number
  english: "basic" | "good" | "fluent"
}
const P = (gender: string, age: number, experience: string, salary: string, location: string) => ({ gender, age, experience, salary, location })
const APPLY_META: Record<string, ApplyMeta> = {
  aditi: {
    ...P("Female", 26, "3 years", "₹22,000 /month", "Hinjewadi, Pune"),
    matching: ["Education", "English", "Location", "Languages"],
    current: "Back office executive · Infosys BPM · Jan 2023 – now",
    education: "B.Com · Savitribai Phule Pune University · 2022",
    skills: ["MS Excel", "Data entry", "Email drafting"],
    languages: "English (fluent) | Hindi | Marathi",
    activeAgo: "today",
    score: 92, resume: true, featured: true, appliedDays: 2, english: "fluent",
  },
  sadanand: {
    ...P("Male", 23, "Fresher", "₹15,000 /month", "Wakad, Pune"),
    matching: ["Location"],
    education: "12th pass · Maharashtra State Board · 2021",
    skills: ["Typing"],
    languages: "English (basic) | Marathi",
    activeAgo: "3 days ago",
    score: 38, appliedDays: 5, english: "basic",
  },
  demo1: {
    ...P("Male", 25, "2 years", "₹19,000 /month", "Baner, Pune"),
    matching: ["Education", "English", "Location", "Languages"],
    current: "Data entry operator · Tech Mahindra · 2023 – now",
    education: "BBA · MIT World Peace University · 2022",
    skills: ["MS Excel", "Tally", "Data entry"],
    languages: "English (good) | Hindi",
    activeAgo: "2 hours ago",
    score: 86, resume: true, contacted: true, appliedDays: 1, english: "good",
  },
  chaitra: {
    ...P("Female", 24, "1 year", "₹17,000 /month", "Aundh, Pune"),
    matching: ["Education", "English"],
    current: "Office assistant · Kotak Mahindra Bank · 2024 – now",
    education: "B.A. · Fergusson College · 2023",
    skills: ["Filing", "MS Word"],
    languages: "English (good) | Kannada | Hindi",
    activeAgo: "yesterday",
    score: 64, resume: true, viewed: true, appliedDays: 9, english: "good",
  },
  "rohit-notfit": {
    ...P("Male", 31, "6 years", "₹32,000 /month", "Mumbai"),
    matching: [],
    current: "Sales manager · Reliance Retail · 2019 – now",
    education: "12th pass · CBSE · 2011",
    skills: ["Field sales"],
    languages: "English (basic) | Hindi",
    activeAgo: "a week ago",
    score: 22, appliedDays: 20, english: "basic",
  },
  "anjali-interview": {
    ...P("Female", 27, "4 years", "₹21,000 /month", "Kothrud, Pune"),
    matching: ["Education", "English", "Location", "Languages"],
    current: "MIS executive · Bajaj Finserv · 2022 – now",
    education: "B.Com · Symbiosis · 2020",
    skills: ["MS Excel", "Reports", "SAP"],
    languages: "English (fluent) | Hindi | Marathi",
    activeAgo: "today",
    score: 88, resume: true, appliedDays: 12, english: "fluent",
  },
  "karthik-review": {
    ...P("Male", 29, "5 years", "₹24,000 /month", "Viman Nagar, Pune"),
    matching: ["Education", "English"],
    current: "Customer support · Teleperformance · 2021 – now",
    education: "B.Sc · Pune University · 2018",
    skills: ["CRM", "Email support"],
    languages: "English (good) | Tamil | Hindi",
    activeAgo: "4 days ago",
    score: 58, resume: true, appliedDays: 26, english: "good",
  },
}
const metaOf = (id: string): ApplyMeta =>
  APPLY_META[id] ?? { ...P("—", 0, "—", "—", "—"), matching: [], languages: "—", activeAgo: "—", score: 0, appliedDays: 0, english: "basic" }

/** The job's key requirements: matching ones are strengths, the rest gaps. */
const REQUIREMENTS = ["Education", "English", "Location", "Languages"]
/** As written mid-sentence (English stays capitalised). */
const inSentence = (r: string) => (r === "English" ? r : r.toLowerCase())

/** A lead in the shape of a chat thread, so the chats profile panel (Candidate 360) shows it. */
function toThread(c: CandidateRow, m: ApplyMeta, job: ApnaJob | undefined, notes: ChatNote[], resumeUnlocked: boolean): ChatThread {
  const level = matchLevel(m.score)
  return {
    id: c.id,
    job: { id: job?.id ?? "job", title: job?.title ?? "", tier: "premium", area: job?.area ?? "", city: job?.city ?? "", aiAddOn: false },
    candidate: { name: c.name, initial: c.name.charAt(0).toUpperCase(), meta: `${m.gender}, ${m.age} · ${MATCH_LABEL[level]}` },
    status: "active",
    unread: false,
    messages: [],
    profile: {
      location: m.location,
      experience: m.experience,
      education: m.education ?? "—",
      languages: m.languages.split(" | "),
      skills: m.skills ?? [],
      expectedSalary: m.salary,
      availability: "Can join in 15 days",
      phoneMasked: "Hidden until you view the number",
    },
    match: {
      level,
      score: m.score,
      strengths: m.matching.map((r) => `Meets your ${inSentence(r)} requirement`),
      gaps: REQUIREMENTS.filter((r) => !m.matching.includes(r)).map((r) => `Does not meet your ${inSentence(r)} requirement`),
    },
    resumeUnlocked,
    notes,
  }
}

type Pipeline = "all" | "pending" | "viewed" | "shortlisted" | "rejected"
const PIPELINE: { value: Pipeline; label: string }[] = [
  { value: "all", label: "All candidates" },
  { value: "pending", label: "Action pending" },
  { value: "viewed", label: "Viewed number" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
]
function pipelineOf(c: CandidateRow, viewed: Set<string>): Exclude<Pipeline, "all"> {
  if (c.state.kind === "completed" && c.state.verdict === "not-fit") return "rejected"
  if (c.stage !== "screening") return "shortlisted"
  if (metaOf(c.id).viewed || viewed.has(c.id)) return "viewed"
  return "pending"
}

const SORTS = ["Relevance", "Recently applied"] as const

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
    source: "applied",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    source: "sourced",
    sourceDetail: "manually added",
    state: { kind: "pending", attempted: 0, total: 5 },
    cefrLevel: "na",
    stage: "screening",
    retakeHistory: [
      { label: "First Attempt: Candidate was a fit", at: "May 14, 2026 at 11:30 AM" },
      { label: "Second Attempt: Interview pending", at: "Jun 8, 2026 at 02:22 PM" },
    ],
  },
  {
    id: "demo1",
    name: "Karan",
    role: "Se Engineer",
    company: "Apna",
    email: "karan.jain@apna.co",
    phone: "+918601250243",
    source: "sourced",
    sourceDetail: "candidates_export.csv",
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
    source: "applied",
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
    source: "applied",
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
    source: "sourced",
    sourceDetail: "manually added",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
  {
    id: "karthik-review",
    name: "Karthik Nair",
    role: "QA Engineer",
    company: "TCS",
    email: "karthik.nair@tcs.com",
    phone: "+919845012345",
    source: "sourced",
    sourceDetail: "manually added",
    state: {
      kind: "completed",
      score: 74,
      verdict: "review",
      insights: [
        { tone: "ok", label: "2 years manual testing experience" },
        { tone: "miss", label: "Notice period is 60 days (preferred <=30)" },
        { tone: "ok", label: "Good API testing knowledge" },
      ],
    },
    cefrLevel: "b2",
    stage: "screening",
  },
]


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

  const job = jobById(id)
  const jobTitle = job?.title ?? decodeURIComponent(id).replace(/-/g, " ")
  const status = STATUS[job?.status ?? "active"]
  const meta = [job ? `${job.area}, ${job.city}` : null, job?.salary, job?.education, job?.experience].filter(Boolean)
  const [infoOpen, setInfoOpen] = useState(false)
  const [candidates, setCandidates] = useState<CandidateRow[]>(CANDIDATES)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const [mainTab, setMainTab] = useState<"applied" | "database">(
    searchParams.get("tab") === "database" ? "database" : "applied",
  )
  const [pipeline, setPipeline] = useState<Pipeline>("all")
  const [viewed, setViewed] = useState<Set<string>>(() => new Set())
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Relevance")

  const [filters, setFilters] = useState<Record<string, Set<string>>>({})
  const [searchQuery, setSearchQuery] = useState("")
  // Detailed cards (default), a compact list that drills into the profile,
  // or a table ("list", tablet and up). Phones show the table's pick as compact.
  const [pickedView, setListView] = useState<"detailed" | "compact" | "list">("detailed")
  const [notes, setNotes] = useState<Record<string, ChatNote[]>>({})
  const [unlocked, setUnlocked] = useState<Set<string>>(() => new Set())
  const wide = useMinWidth(1024)
  const tablet = useMinWidth(768)
  const listView = pickedView === "list" && !tablet ? "compact" : pickedView
  // Phones: card view only (a table doesn't fit), and Back falls back to Jobs
  // when there's no in-app history (src/lib/apnahire/nav.ts).
  const back = useAppBack()
  const [candidateToMove, setCandidateToMove] = useState<string | null>(null)

  const candidateObjectToMove = useMemo(() => {
    if (!candidateToMove) return null
    return candidates.find((c) => c.id === candidateToMove)
  }, [candidateToMove, candidates])

  const moveDialogText = (() => {
    if (!candidateObjectToMove) return null
    const name = candidateObjectToMove.name
    const isMovingToSelected = candidateObjectToMove.stage === "interview"
    
    if (isMovingToSelected) {
      return {
        title: `🎉 Select ${name} for this Role?`,
        description: `Are you sure you want to move ${name} to the Selected stage? Congratulations on finding a match for the ${jobTitle} position!`,
        actionLabel: "Yes, Select Candidate! 🎉",
      }
    } else {
      return {
        title: "Move Candidate to Next Round?",
        description: `Are you sure you want to move ${name} to the Tech Interview round? They will progress to the next stage in the pipeline.`,
        actionLabel: "Move to Interview",
      }
    }
  })()

  const triggerConfetti = () => {
    // Center pop
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    })
    
    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
    }, 200)
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })
    }, 350)
  }

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

  const handleAddCandidates = (newCands: NewCandidateData[]) => {
    const newRows: CandidateRow[] = newCands.map((c) => ({
      id: `cand-${Math.random().toString(36).substring(2, 11)}`,
      name: c.name,
      email: c.email,
      phone: c.phone,
      role: jobTitle,
      company: "Independent",
      stage: "screening" as const,
      state: { kind: "pending" as const, attempted: 0, total: 5 },
      cefrLevel: "na" as const,
      resumeFile: c.resumeFile,
      source: "sourced" as const,
      sourceDetail: c.sourceDetail,
    }))
    setCandidates((prev) => [...prev, ...newRows])
  }

  const handleReject = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const currentScore = c.state.kind === "completed" ? c.state.score : 30
        return {
          ...c,
          state: {
            kind: "completed" as const,
            score: currentScore,
            verdict: "not-fit" as const,
            insights: c.state.kind === "completed" ? c.state.insights : [],
          },
        }
      })
    )
  }

  const handleMoveToNextRound = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        let nextStage = c.stage
        if (c.stage === "screening") nextStage = "interview"
        else if (c.stage === "interview") nextStage = "selected"
        return {
          ...c,
          stage: nextStage,
        }
      })
    )
  }

  const pipelineCounts = useMemo(() => {
    const counts: Record<Pipeline, number> = { all: candidates.length, pending: 0, viewed: 0, shortlisted: 0, rejected: 0 }
    for (const c of candidates) counts[pipelineOf(c, viewed)]++
    return counts
  }, [candidates, viewed])

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const show = filters["show"]
    const days = filters["applied-in"]
    const english = filters["english"]
    const maxDays = days?.size ? Math.max(...[...days].map(Number)) : Infinity
    const rows = candidates.filter((c) => {
      const m = metaOf(c.id)
      if (pipeline !== "all" && pipelineOf(c, viewed) !== pipeline) return false
      if (q && !c.name.toLowerCase().includes(q)) return false
      if (show?.has("matched") && matchLevel(m.score) !== "high") return false
      if (show?.has("resume") && !m.resume) return false
      if (show?.has("contacted") && !m.contacted) return false
      if (show?.has("featured") && !m.featured) return false
      if (m.appliedDays > maxDays) return false
      if (english?.size && !english.has(m.english)) return false
      return true
    })
    return sort === "Recently applied"
      ? [...rows].sort((a, b) => metaOf(a.id).appliedDays - metaOf(b.id).appliedDays)
      : [...rows].sort((a, b) => metaOf(b.id).score - metaOf(a.id).score)
  }, [searchQuery, filters, candidates, pipeline, sort, viewed])


  const filterGroups = (() => {
    return FILTERS.map((group) => ({
      label: group.label,
      options: group.options.map((o) => o.label),
      selected: group.options
        .filter((o) => filters[group.id]?.has(o.id))
        .map((o) => o.label),
      onToggle: (label: string) => {
        const opt = group.options.find((o) => o.label === label)
        if (opt) toggleFilter(group.id, opt.id)
      },
    }))
  })()

  const handleClearFilters = () => {
    setFilters({})
  }

  // Drawer driven by ?leadId= so the panel survives reloads.
  const setLeadId = (next: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set("leadId", next)
    else params.delete("leadId")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Relevance runs high → low; one divider marks where low matches start.
  const firstLow = sort === "Relevance" ? filteredCandidates.findIndex((c) => matchLevel(metaOf(c.id).score) === "low") : -1
  const lowDivider = (
    <div className="flex items-center gap-3 text-caption text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      Low matches
      <span className="h-px flex-1 bg-border" />
    </div>
  )

  // Compact on wide screens: list + profile side by side, the first lead open.
  const split = listView === "compact" && wide
  const selectedId = leadId ?? (split ? filteredCandidates[0]?.id : undefined)
  const selected = candidates.find((c) => c.id === selectedId)
  const selectedThread = selected
    ? toThread(selected, metaOf(selected.id), job, notes[selected.id] ?? [], unlocked.has(selected.id))
    : undefined
  const viewNumber = (id: string) => {
    setViewed((v) => new Set(v).add(id))
    toast("1 database credit used")
  }
  const actionsFor = (c: CandidateRow) => (
    <ApplicantActions
      name={c.name}
      phone={c.phone}
      status={pipelineOf(c, viewed)}
      onViewNumber={() => viewNumber(c.id)}
      onReject={() => handleReject(c.id)}
      onShortlist={() => handleMoveToNextRound(c.id)}
    />
  )
  const panelProps = (c: CandidateRow) => ({
    actions: actionsFor(c),
    onAddNote: (text: string) =>
      setNotes((n) => ({ ...n, [c.id]: [{ id: `n${Date.now()}`, text, at: "Today" }, ...(n[c.id] ?? [])] })),
    onUnlockResume: () => {
      setUnlocked((u) => new Set(u).add(c.id))
      toast("1 database credit used")
    },
  })

  return (
    <div className="flex min-h-svh flex-col">
      <PageHeader
        // Desktop: sticks beneath the 64px top bar so the job title + round
        // tabs stay in view while the candidate list scrolls. Phones: the
        // page is full screen (no top or bottom bar), so this header is the
        // screen's app bar: Back · title · ⋮, then status + facts, then tabs.
        className="sticky top-0 z-sticky md:top-16"
        title={
          <div className="flex items-start gap-3">
            <BackButton className="mt-0.5" onClick={back} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="line-clamp-2 text-lg leading-tight font-semibold capitalize md:text-xl">{jobTitle}</span>
                <Badge variant={status.variant} className="hidden md:inline-flex">{status.label}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <Badge variant={status.variant} className="md:hidden">{status.label}</Badge>
                {/* The • travels with the fact after it, so a wrapped line never ends on one. */}
                {meta.map((m, i) => (
                  <span key={m} className="whitespace-nowrap">
                    {i > 0 && <span aria-hidden className="pr-2">•</span>}
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="About this job" className="shrink-0 text-muted-foreground md:hidden" onClick={() => setInfoOpen(true)}>
              <MoreVertical className="size-5" />
            </Button>
          </div>
        }
        description={null}
        tabs={
          <div className="flex items-center justify-between gap-3">
            {/* min-w-0 lets the tab strip scroll on narrow screens instead of
             * pushing the view toggle (and the page) past the viewport. */}
            <Tabs className="min-w-0" value={mainTab} onValueChange={(v) => { setMainTab(v as "applied" | "database"); setFilters({}); setSearchQuery("") }}>
              <TabsList variant="line">
                <TabsTrigger value="applied">Applied to job ({candidates.length})</TabsTrigger>
                <TabsTrigger value="database">Database ({(job?.dbMatches ?? 0).toLocaleString("en-IN")})</TabsTrigger>
              </TabsList>
            </Tabs>

          </div>
        }
        actions={
          // Desktop only; phones have ⋮ beside the title.
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" size="sm" onClick={() => router.push("/apnahire/jobs/new?resume=1")}>
              <Pencil className="size-4" /> Edit
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="About this job" onClick={() => setInfoOpen(true)}>
              <MoreVertical className="size-4" />
            </Button>
          </div>
        }
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 md:px-6">
        {job && <JobStatusBanner job={job} />}
        {job && <JobInfoPanel job={job} open={infoOpen} onOpenChange={setInfoOpen} />}

        {mainTab === "database" ? (
          // Step 5 builds the AI-suggested database list.
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>Candidates from our database</EmptyTitle>
              <EmptyDescription>People who did not apply but match this job. Coming next.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            {/* ── Search + filters ── */}
            <SearchFilterBar
              placeholder="Search by candidate name"
              value={searchQuery}
              onChange={setSearchQuery}
              filterGroups={filterGroups}
              onClearFilters={handleClearFilters}
            />

            {/* ── Pipeline counters + sort ── */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Phones: the house chip row (as on the jobs list). */}
              <MobileChipRow
                items={PIPELINE.map((p) => ({ value: p.value, label: `${p.label} (${pipelineCounts[p.value]})` }))}
                value={pipeline}
                onValueChange={setPipeline}
              />
              {/* Desktop: the jobs list's status filter control, so both pages behave alike. */}
              <Tabs value={pipeline} onValueChange={(v) => setPipeline(v as Pipeline)} className="max-md:hidden">
                <TabsList variant="inverted" aria-label="Candidate status">
                  {PIPELINE.map((p) => (
                    <TabsTrigger key={p.value} value={p.value}>
                      {p.label} ({pipelineCounts[p.value]})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="whitespace-nowrap">Sort by</span>
                <Select value={sort} onValueChange={(v) => v && setSort(v as (typeof SORTS)[number])}>
                  <SelectTrigger size="sm" className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORTS.map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ToggleGroup
                  aria-label="List view"
                  value={[listView]}
                  onValueChange={(v) => v[0] && setListView(v[0] as "detailed" | "compact" | "list")}
                  className="ml-auto lg:ml-0"
                >
                  <ToggleGroupItem value="detailed" aria-label="Detailed cards">
                    <LayoutList />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="compact" aria-label="Compact list">
                    <Menu />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="Table" className="max-md:hidden">
                    <Table2 />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {filteredCandidates.length === 0 ? (
              <Empty className="border border-dashed border-border">
                <EmptyHeader>
                  <EmptyTitle>No candidates match your filters</EmptyTitle>
                  <EmptyDescription>Clear some filters or change your search.</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" size="sm" onClick={() => { setFilters({}); setSearchQuery(""); setPipeline("all") }}>
                    Clear all filters
                  </Button>
                </EmptyContent>
              </Empty>
            ) : listView === "detailed" ? (
              <div className="flex flex-col gap-3">
                {filteredCandidates.map((c, i) => {
                  const m = metaOf(c.id)
                  return (
                    <React.Fragment key={c.id}>
                      {i === firstLow && lowDivider}
                      <ApplicantCard
                        name={c.name}
                        phone={c.phone}
                        profile={m}
                        match={{ level: matchLevel(m.score), score: m.score }}
                        resume={m.resume}
                        appliedDays={m.appliedDays}
                        status={pipelineOf(c, viewed)}
                        onOpen={() => setLeadId(c.id)}
                        onViewNumber={() => viewNumber(c.id)}
                        onReject={() => handleReject(c.id)}
                        onShortlist={() => handleMoveToNextRound(c.id)}
                      />
                    </React.Fragment>
                  )
                })}
              </div>
            ) : listView === "list" ? (
              <ApplicantTable
                rows={filteredCandidates.map((c) => {
                  const m = metaOf(c.id)
                  return {
                    id: c.id,
                    name: c.name,
                    phone: c.phone,
                    profile: m,
                    match: { level: matchLevel(m.score), score: m.score },
                    requirements: `${m.matching.length} of ${REQUIREMENTS.length}`,
                    applied: m.appliedDays <= 1 ? "Today" : `${m.appliedDays} days ago`,
                    status: pipelineOf(c, viewed),
                  }
                })}
                dividerBefore={firstLow >= 0 ? filteredCandidates[firstLow]?.id : undefined}
                onOpen={setLeadId}
                onViewNumber={viewNumber}
                onReject={handleReject}
                onShortlist={handleMoveToNextRound}
              />
            ) : (
              // Compact: the chats list's row. Wide screens show the profile beside it.
              <div className="flex items-start gap-4">
                <Card padding="none" className="min-w-0 flex-1 overflow-hidden lg:max-w-sm">
                  <ConversationList label="Candidates">
                    {filteredCandidates.map((c, i) => {
                      const m = metaOf(c.id)
                      const level = matchLevel(m.score)
                      const status = pipelineOf(c, viewed)
                      return (
                        <React.Fragment key={c.id}>
                          {i === firstLow && <div className="bg-muted px-4 py-2">{lowDivider}</div>}
                          <ConversationRow
                            name={c.name}
                            initial={c.name.charAt(0).toUpperCase()}
                            subtitle={`${m.experience} • ${m.salary} • ${m.location}`}
                            previewIcon={<Check />}
                            preview={
                              m.matching.length
                                ? `Meets ${m.matching.length} of ${REQUIREMENTS.length}: ${m.matching.join(", ")}`
                                : "Meets none of your key requirements"
                            }
                            time={m.appliedDays <= 1 ? "Today" : `${m.appliedDays}d ago`}
                            statusIcon={<MatchBars level={level} score={m.score} />}
                            status={
                              status !== "pending" ? (
                                <Badge variant={status === "rejected" ? "destructive" : status === "shortlisted" ? "success" : "secondary"}>
                                  {PIPELINE.find((p) => p.value === status)?.label}
                                </Badge>
                              ) : undefined
                            }
                            active={split && c.id === selectedId}
                            render={<button type="button" onClick={() => setLeadId(c.id)} />}
                          />
                        </React.Fragment>
                      )
                    })}
                  </ConversationList>
                </Card>
                {split && selected && selectedThread && (
                  <Card padding="none" className="sticky top-48 hidden max-h-svh min-w-0 flex-1 overflow-y-auto lg:block">
                    <CandidateProfilePanel key={selected.id} thread={selectedThread} {...panelProps(selected)} />
                  </Card>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Detailed view and phones: the profile opens as the side panel. */}
      {selected && selectedThread && (
        <CandidateProfileSheet
          title="Candidate profile"
          open={!!leadId && !split}
          onOpenChange={(o) => !o && setLeadId(null)}
          thread={selectedThread}
          {...panelProps(selected)}
        />
      )}

      <AddCandidateDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddCandidates={handleAddCandidates}
      />

      <AlertDialog open={!!candidateToMove} onOpenChange={(open) => !open && setCandidateToMove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{moveDialogText?.title || "Move Candidate to Next Round?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {moveDialogText?.description || "Are you sure you want to move this candidate to the next round?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (candidateToMove) {
                  const isMovingToSelected = candidateObjectToMove?.stage === "interview"
                  handleMoveToNextRound(candidateToMove)
                  setCandidateToMove(null)
                  if (isMovingToSelected) {
                    triggerConfetti()
                  }
                }
              }}
            >
              {moveDialogText?.actionLabel || "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

/** True while the viewport is at least `px` wide (false on the server). */
function useMinWidth(px: number) {
  return React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(`(min-width: ${px}px)`)
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia(`(min-width: ${px}px)`).matches,
    () => false,
  )
}
