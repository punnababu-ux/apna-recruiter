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

import { appliedAgo } from "@/components/apnahire/active-status"
import {
  Card,
  SlidersHorizontal,
  ConversationList,
  ConversationRow,
  LayoutList,
  Menu,
  MoreVertical,
  Pencil,
  Table2,
  ToggleGroup,
  ToggleGroupItem,
  Check,
  X,
  Sheet,
  SheetPanel,
  SheetPanelHeader,
} from "@apna/design-system"
import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, use, useMemo, useState } from "react"
import confetti from "canvas-confetti"
import { AddCandidateDialog, type NewCandidateData } from "@/components/onlyrounds/add-candidate-dialog"

import type { Candidate } from "@/components/onlyrounds/candidate-card"

import { Checkbox, ChevronDown, Database, Download, FilterGroups, Input, Search, SearchFilterBar, UserCheck } from "@apna/design-system"
import { toast } from "sonner"
import { ActiveLeads, FindingCandidates, type ActiveLead } from "@/components/apnahire/jobs/active-leads"
import { CandidateCard, PhoneJobPage, type CallOutcome } from "@/components/apnahire/jobs/phone-job-page"
import { ValueArt } from "@/components/marketing/value-art"
import { WhatsAppIcon } from "@/components/onlyrounds/candidate-card"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { cn } from "@/lib/utils"
import { ApplicantTriageTable } from "@/components/apnahire/jobs/applicant-triage-table"
import { ApplicantTable } from "@/components/apnahire/jobs/applicant-table"
import type { CallStatus } from "@/components/apnahire/jobs/contact-number"
import { ApplicantActions, ApplicantCard, type ApplicantProfile } from "@/components/apnahire/jobs/applicant-card"
import { CandidateProfilePanel, CandidateProfileSheet } from "@/components/apnahire/chats/candidate-profile-panel"
import { useBackToClose } from "@/hooks/use-back-to-close"
import { CandidateDetailsSheet, CandidatePane } from "@/components/apnahire/jobs/candidate-details"
import { MatchBars, matchLevel } from "@/components/apnahire/match-bars"
import type { ApnaJob } from "@/components/apnahire/jobs/job-list"
import type { CandidateFullProfile } from "@/content/chats"
import { MATCH_LABEL, type ChatNote, type ChatThread, type MatchLevel } from "@/content/chats"
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
  EmptyMedia,
  EmptyTitle,
  ArrowUpDown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@apna/design-system"

// ── Mock data ─────────────────────────────────────────────────────────────

/**
 * Filter groups in the order the ECC adoption data set (docs/DECISIONS.md,
 * "Job page filters: which show upfront", 2026-11-06): the five most-used
 * open at the top, the next three under them, the rest under "More
 * filters". Options in a group are OR; groups are AND. `tag` marks the
 * job's own value ("From your job") without ticking it: on the Applied tab
 * people already applied to this job, and the data shows prefills get
 * stripped (salary on 55% of searches).
 *
 * shortcut: Industry, Departments, Companies, Notice period, Job preference
 * and Hide have no mock data, so they list options but don't narrow the
 * list; wire them to real profile fields with the backend.
 */
type FilterOption = { id: string; label: string; test?: (m: ApplyMeta) => boolean; tag?: string }
type FilterDef = { id: string; label: string; tier: "top" | "next" | "more"; options: FilterOption[] }

const AREA_KM: Record<string, number> = {
  Koramangala: 1, "HSR Layout": 4, "BTM Layout": 5, Indiranagar: 7, Marathahalli: 12, Whitefield: 18,
}
const kmOf = (m: ApplyMeta) => AREA_KM[m.location.split(",")[0]] ?? Infinity
const yearsOf = (m: ApplyMeta) => (/fresher/i.test(m.experience) ? 0 : parseInt(m.experience) || 0)
const payOf = (m: ApplyMeta) => Number(m.salary.replace(/[^0-9]/g, "")) || 0
const daysAgo = (ago: string) =>
  /now|today|minute|hour/i.test(ago) ? 0 : /yesterday/i.test(ago) ? 1 : /week/i.test(ago) ? 7 : parseInt(ago) || 99
const degreeOf = (m: ApplyMeta) =>
  /^(12th)/i.test(m.education ?? "") ? "12th" : /^(MBA|M\.|PG)/i.test(m.education ?? "") ? "pg" : "grad"

const FILTERS: FilterDef[] = [
  {
    id: "location",
    label: "Location",
    tier: "top",
    options: [
      { id: "city", label: "Bengaluru", tag: "From your job", test: (m) => m.location.includes("Bengaluru") },
      { id: "5", label: "Within 5 km", test: (m) => kmOf(m) <= 5 },
      { id: "10", label: "Within 10 km", test: (m) => kmOf(m) <= 10 },
      { id: "25", label: "Within 25 km", test: (m) => kmOf(m) <= 25 },
    ],
  },
  {
    id: "education",
    label: "Education",
    tier: "top",
    options: [
      { id: "12th", label: "12th pass", tag: "From your job", test: (m) => degreeOf(m) === "12th" },
      { id: "grad", label: "Graduate", test: (m) => degreeOf(m) === "grad" },
      { id: "pg", label: "Postgraduate", test: (m) => degreeOf(m) === "pg" },
    ],
  },
  {
    id: "salary",
    label: "Expected salary",
    tier: "top",
    options: [
      { id: "15", label: "Up to ₹15,000", test: (m) => payOf(m) <= 15000 },
      { id: "20", label: "₹15,000 – ₹20,000", tag: "From your job", test: (m) => payOf(m) > 15000 && payOf(m) <= 20000 },
      { id: "25", label: "₹20,000 – ₹25,000", test: (m) => payOf(m) > 20000 && payOf(m) <= 25000 },
      { id: "more", label: "Above ₹25,000", test: (m) => payOf(m) > 25000 },
    ],
  },
  {
    id: "english",
    label: "English level",
    tier: "top",
    options: [
      { id: "basic", label: "Basic", test: (m) => m.english === "basic" },
      { id: "good", label: "Good", test: (m) => m.english === "good" },
      { id: "fluent", label: "Fluent", test: (m) => m.english === "fluent" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    tier: "top",
    options: [
      { id: "0", label: "Fresher", tag: "From your job", test: (m) => yearsOf(m) === 0 },
      { id: "1", label: "1 – 2 years", test: (m) => yearsOf(m) >= 1 && yearsOf(m) <= 2 },
      { id: "3", label: "3 – 5 years", test: (m) => yearsOf(m) >= 3 && yearsOf(m) <= 5 },
      { id: "6", label: "More than 5 years", test: (m) => yearsOf(m) > 5 },
    ],
  },
  {
    id: "age",
    label: "Age",
    tier: "next",
    options: [
      { id: "18", label: "18 – 25", test: (m) => m.age <= 25 },
      { id: "26", label: "26 – 30", test: (m) => m.age >= 26 && m.age <= 30 },
      { id: "31", label: "Above 30", test: (m) => m.age > 30 },
    ],
  },
  {
    id: "gender",
    label: "Gender",
    tier: "next",
    options: [
      { id: "female", label: "Female", test: (m) => m.gender === "Female" },
      { id: "male", label: "Male", test: (m) => m.gender === "Male" },
    ],
  },
  {
    id: "active",
    label: "Last active",
    tier: "next",
    options: [
      { id: "1", label: "Today", test: (m) => daysAgo(m.activeAgo) === 0 },
      { id: "3", label: "In the last 3 days", test: (m) => daysAgo(m.activeAgo) <= 3 },
      { id: "7", label: "In the last 7 days", test: (m) => daysAgo(m.activeAgo) <= 7 },
    ],
  },
  {
    id: "show",
    label: "Show candidates who",
    tier: "more",
    options: [
      { id: "matched", label: "Match the job requirements", test: (m) => matchLevel(m.score) === "high" },
      { id: "resume", label: "Have a resume", test: (m) => !!m.resume },
      { id: "contacted", label: "Tried to contact you", test: (m) => !!m.contacted },
      { id: "featured", label: "Are featured", test: (m) => !!m.featured },
    ],
  },
  {
    id: "applied-in",
    label: "Applied in",
    tier: "more",
    options: [
      { id: "3", label: "Last 3 days", test: (m) => m.appliedDays <= 3 },
      { id: "7", label: "Last 7 days", test: (m) => m.appliedDays <= 7 },
      { id: "15", label: "Last 15 days", test: (m) => m.appliedDays <= 15 },
      { id: "30", label: "Last 30 days", test: (m) => m.appliedDays <= 30 },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    tier: "more",
    options: ["Hindi", "Kannada", "Tamil", "Marathi"].map((l) => ({
      id: l.toLowerCase(),
      label: l,
      test: (m: ApplyMeta) => m.languages.includes(l),
    })),
  },
  { id: "industry", label: "Industry", tier: "more", options: ["BPO and call centre", "Retail", "Banking and finance"].map((l) => ({ id: l, label: l })) },
  { id: "department", label: "Department", tier: "more", options: ["Customer support", "Sales", "Back office"].map((l) => ({ id: l, label: l })) },
  { id: "degree", label: "Degree", tier: "more", options: [{ id: "bcom", label: "B.Com", test: (m) => /B\.Com/.test(m.education ?? "") }, { id: "bba", label: "BBA", test: (m) => /BBA/.test(m.education ?? "") }, { id: "bsc", label: "B.Sc", test: (m) => /B\.Sc/.test(m.education ?? "") }, { id: "ba", label: "B.A.", test: (m) => /B\.A\./.test(m.education ?? "") }] },
  { id: "notice", label: "Notice period", tier: "more", options: ["Immediate", "Within 15 days", "Within 30 days"].map((l) => ({ id: l, label: l })) },
]

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
/** Sample photos for some applicants (the chats set); the rest show initials. */
const PHOTOS: Record<string, string> = {
  aditi: "/images/chats/pooja-rao.jpg",
  "anjali-interview": "/images/chats/meera-nair.jpg",
  demo1: "/images/chats/ravi-kumar.jpg",
  "karthik-review": "/images/chats/kiran-shinde.jpg",
}

// Database matches shown while a new job waits for applications.
// shortcut: mock leads and balance; wire to the database search and the
// credits balance when the Database tab is built.
const ACTIVE_LEADS: ActiveLead[] = [
  { id: "lead-simran", name: "Simran Sharma", photo: "/images/chats/sana-mirza.jpg", role: "Sales executive", company: "Reliance Retail", area: "Indiranagar, Bengaluru", experience: "1 year", salary: "₹3.6 lakh /year", activeAgo: "today" },
  { id: "lead-rohan", name: "Rohan Roy", photo: "/images/chats/amit-patil.jpg", role: "Mobile sales executive", company: "Jio Mart", area: "HAL, Bengaluru", experience: "4 years", salary: "₹7 lakh /year", activeAgo: "today" },
  { id: "lead-jagadeesh", name: "Jagadeesh Babu", role: "Sales executive", company: "Nothing", area: "Koramangala, Bengaluru", experience: "4 years", salary: "₹7 lakh /year", activeAgo: "yesterday" },
]
const MORE_LEADS = 12
const DB_CREDITS = 12

const APPLY_META: Record<string, ApplyMeta> = {
  aditi: {
    ...P("Female", 26, "3 years", "₹22,000 /month", "Koramangala, Bengaluru"),
    matching: ["Education", "English", "Location", "Languages"],
    current: "Back office executive · Infosys BPM · Jan 2023 – now",
    education: "B.Com · Savitribai Phule Pune University · 2022",
    skills: ["MS Excel", "Data entry", "Email drafting"],
    languages: "English (fluent) | Hindi | Marathi",
    activeAgo: "today",
    score: 92, resume: true, featured: true, appliedDays: 2, english: "fluent",
  },
  sadanand: {
    ...P("Male", 23, "Fresher", "₹15,000 /month", "HSR Layout, Bengaluru"),
    matching: ["Location"],
    education: "12th pass · Maharashtra State Board · 2021",
    skills: ["Typing"],
    languages: "English (basic) | Marathi",
    activeAgo: "3 days ago",
    score: 38, appliedDays: 5, english: "basic",
  },
  demo1: {
    ...P("Male", 25, "2 years", "₹19,000 /month", "BTM Layout, Bengaluru"),
    matching: ["Education", "English", "Location", "Languages"],
    current: "Data entry operator · Tech Mahindra · 2023 – now",
    education: "BBA · MIT World Peace University · 2022",
    skills: ["MS Excel", "Tally", "Data entry"],
    languages: "English (good) | Hindi",
    activeAgo: "2 hours ago",
    score: 86, resume: true, contacted: true, appliedDays: 1, english: "good",
  },
  chaitra: {
    ...P("Female", 24, "1 year", "₹17,000 /month", "Indiranagar, Bengaluru"),
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
    score: 22, appliedDays: 13, english: "basic",
  },
  "anjali-interview": {
    ...P("Female", 27, "4 years", "₹21,000 /month", "Whitefield, Bengaluru"),
    matching: ["Education", "English", "Location", "Languages"],
    current: "MIS executive · Bajaj Finserv · 2022 – now",
    education: "B.Com · Symbiosis · 2020",
    skills: ["MS Excel", "Reports", "SAP"],
    languages: "English (fluent) | Hindi | Marathi",
    activeAgo: "today",
    score: 88, resume: true, appliedDays: 12, english: "fluent",
  },
  "karthik-review": {
    ...P("Male", 29, "5 years", "₹24,000 /month", "Marathahalli, Bengaluru"),
    matching: ["Education", "English"],
    current: "Customer support · Teleperformance · 2021 – now",
    education: "B.Sc · Pune University · 2018",
    skills: ["CRM", "Email support"],
    languages: "English (good) | Tamil | Hindi",
    activeAgo: "4 days ago",
    score: 58, resume: true, appliedDays: 15, english: "good",
  },
}
const metaOf = (id: string): ApplyMeta =>
  APPLY_META[id] ?? { ...P("—", 0, "—", "—", "—"), matching: [], languages: "—", activeAgo: "—", score: 0, appliedDays: 0, english: "basic" }

/** The job's key requirements: matching ones are strengths, the rest gaps. */
const REQUIREMENTS = ["Education", "English", "Location", "Languages"]
/** As written mid-sentence (English stays capitalised). */
const inSentence = (r: string) => (r === "English" ? r : r.toLowerCase())

// shortcut: invented from the row's facts so the preview reads as a whole
// profile; replace with the candidate's real profile when the API exists.
function fullProfile(name: string, m: ApplyMeta): CandidateFullProfile {
  const [title = "—", company = "—", dates = "—"] = (m.current ?? "").split(" · ")
  const school = m.education?.startsWith("12th") ? [] : ["12th · State board"]
  return {
    work: [
      ...(m.current ? [{ title, company, dates, duration: m.experience, role: "Operations", industry: "Retail", notice: "1 month notice" }] : []),
      { title: "Data entry operator", company: "Concentrix", dates: "2019 – 2021", duration: "2 years", role: "Back office", industry: "BPO" },
    ],
    education: [m.education ?? "—", ...school, "10th · State board"],
    assets: ["Bike", "Aadhaar card", "PAN card"],
    preferences: ["Day shift", "Full time", "Field job"],
    gender: m.gender,
    age: `${m.age} years`,
    appliedAgo: appliedAgo(m.appliedDays),
    email: `${name.split(" ")[0].toLowerCase()}@example.com`,
    hasResume: !!m.resume,
  }
}

/** A lead in the shape of a chat thread, so the chats profile panel (Candidate 360) shows it. */
function toThread(c: CandidateRow, m: ApplyMeta, job: ApnaJob | undefined, notes: ChatNote[], resumeUnlocked: boolean): ChatThread {
  const level = matchLevel(m.score)
  return {
    id: c.id,
    job: { id: job?.id ?? "job", title: job?.title ?? "", tier: "premium", area: job?.area ?? "", city: job?.city ?? "", aiAddOn: false },
    candidate: { name: c.name, initial: c.name.charAt(0).toUpperCase(), photo: PHOTOS[c.id], meta: `${m.gender}, ${m.age} · ${MATCH_LABEL[level]}` },
    status: "active",
    unread: false,
    messages: [],
    profile: {
      location: m.location,
      experience: m.experience,
      current: m.current,
      activeAgo: m.activeAgo,
      education: m.education ?? "—",
      languages: m.languages.split(" | "),
      skills: m.skills ?? [],
      expectedSalary: m.salary,
      availability: "Can join in 15 days",
      phoneMasked: "Hidden until you view the number",
      full: fullProfile(c.name, m),
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

function withOutcome(c: CandidateRow, v: CallOutcome): CandidateRow {
  const score = c.state.kind === "completed" ? c.state.score : 30
  const insights = c.state.kind === "completed" ? c.state.insights : []
  if (v === "rejected") return { ...c, state: { kind: "completed", score, verdict: "not-fit", insights } }
  const state = c.state.kind === "completed" && c.state.verdict === "not-fit" ? { ...c.state, verdict: "review" as const } : c.state
  if (v === "shortlisted") return { ...c, state, stage: c.stage === "screening" ? "interview" : c.stage }
  return { ...c, state, stage: "screening" }
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
  // The default since 2026-11-09. ?deck=0 shows the old details for comparison.
  const deck = searchParams.get("deck") !== "0"
  // The default since 2026-11-09. ?views=0 shows the old compact and table.
  const views = searchParams.get("views") !== "0"
  // The default since 2026-11-09. ?pill=0 shows the old footer.
  const pill = searchParams.get("pill") !== "0"
  const leadPushed = React.useRef(false)

  const job = jobById(id)
  const jobTitle = job?.title ?? decodeURIComponent(id).replace(/-/g, " ")
  const status = STATUS[job?.status ?? "active"]
  const meta = [job ? `${job.area}, ${job.city}` : null, job?.salary, job?.education, job?.experience].filter(Boolean)
  const [infoOpen, setInfoOpen] = useState(false)
  useBackToClose(infoOpen, () => setInfoOpen(false))
  const [candidates, setCandidates] = useState<CandidateRow[]>(CANDIDATES)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  // A new job: no applications yet (or preview with ?applicants=0).
  const noApplicants = searchParams.get("applicants") === "0" || candidates.length === 0
  const [dbFocus, setDbFocus] = useState<string | null>(null)
  const openLead = (id: string | null) => {
    setDbFocus(id)
    setMainTab("database")
  }
  const [mainTab, setMainTab] = useState<"applied" | "database">(
    searchParams.get("tab") === "database" ? "database" : "applied",
  )
  const [pipeline, setPipeline] = useState<Pipeline>("all")
  const [viewed, setViewed] = useState<Set<string>>(() => new Set())
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Relevance")

  const [filters, setFilters] = useState<Record<string, Set<string>>>({})
  // Wide screens: filters are a right-hand panel, opened from the Filters
  // button (default since 2026-11-08). Narrower: popover, then a bottom sheet.
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [moreFilters, setMoreFilters] = useState(false)
  const [picked, setPicked] = useState<Set<string>>(new Set())
  // Where the sticky job header ends: section bars and the filter panel
  // pin right under it. Its height follows the job's details, so measure it.
  const mainRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    const main = mainRef.current
    const header = main?.previousElementSibling as HTMLElement | null
    if (!main || !header) return
    const set = () => {
      const listTop = (parseFloat(getComputedStyle(header).top) || 0) + header.offsetHeight
      main.style.setProperty("--list-top", `${listTop}px`)
      // The room under the header: the filter panel never grows past it, so
      // it can't run off the screen or get pushed up under the tabs.
      main.style.setProperty("--list-room", `${window.innerHeight - listTop - 16}px`)
      // How far the content column sits in from the header's edges: a docked
      // full-width bar reaches out by this much (and pads back in by it + 16px
      // so its label stays put).
      const h = header.getBoundingClientRect()
      const m = main.getBoundingClientRect()
      const cs = getComputedStyle(main)
      const l = m.left + parseFloat(cs.paddingLeft) - h.left
      const r = h.right - (m.right - parseFloat(cs.paddingRight))
      main.style.setProperty("--bleed-l", `${l}px`)
      main.style.setProperty("--bleed-r", `${r}px`)
      main.style.setProperty("--bleed-pl", `${l + 16}px`)
      main.style.setProperty("--bleed-pr", `${r + 16}px`)
    }
    set()
    const ro = new ResizeObserver(set)
    ro.observe(header)
    ro.observe(main)
    window.addEventListener("resize", set)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", set)
    }
  }, [])
  const [searchQuery, setSearchQuery] = useState("")
  // Detailed cards (default), a compact list that drills into the profile,
  // or a table ("list", tablet and up). Phones show the table's pick as compact.
  const [pickedView, setListView] = useState<"detailed" | "compact" | "list">("detailed")
  const [notes, setNotes] = useState<Record<string, ChatNote[]>>({})
  // How the recruiter's call went, per candidate (set after View number).
  const [calls, setCalls] = useState<Record<string, CallStatus>>({})
  const setCall = (id: string) => (v: CallStatus) => setCalls((c) => ({ ...c, [id]: v }))
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
    const rows = candidates.filter((c) => {
      const m = metaOf(c.id)
      if (pipeline !== "all" && pipelineOf(c, viewed) !== pipeline) return false
      if (q && !c.name.toLowerCase().includes(q)) return false
      // Groups AND, options within a group OR. "Show candidates who" is
      // a list of musts, so its options AND.
      return FILTERS.every((group) => {
        const picked = filters[group.id]
        if (!picked?.size) return true
        const tests = group.options.filter((o) => picked.has(o.id) && o.test).map((o) => o.test!)
        if (!tests.length) return true
        return group.id === "show" ? tests.every((t) => t(m)) : tests.some((t) => t(m))
      })
    })
    return sort === "Recently applied"
      ? [...rows].sort((a, b) => metaOf(a.id).appliedDays - metaOf(b.id).appliedDays)
      : [...rows].sort((a, b) => metaOf(b.id).score - metaOf(a.id).score)
  }, [searchQuery, filters, candidates, pipeline, sort, viewed])


  const groupsOf = (tier: FilterDef["tier"]) => filterGroups.filter((_, i) => FILTERS[i].tier === tier)
  const filterGroups = (() => {
    return FILTERS.map((group) => ({
      more: group.tier === "more",
      label: group.label,
      tags: Object.fromEntries(group.options.filter((o) => o.tag).map((o) => [o.label, o.tag!])),
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

  const activeFilterCount = Object.values(filters).reduce((n, set) => n + set.size, 0)
  const moreActive = FILTERS.filter((f) => f.tier === "more").reduce((n, f) => n + (filters[f.id]?.size ?? 0), 0)
  const sortMenu = (
    <>
                {/* One control, as the chats inbox's sort: ⇅ + the current order, a "Sort by" menu. */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="outline" size="sm" aria-label={`Sort candidates, ${sort}`} />}
                  >
                    <ArrowUpDown aria-hidden />
                    {sort}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as (typeof SORTS)[number])}>
                        {SORTS.map((o) => (
                          <DropdownMenuRadioItem key={o} value={o} className="whitespace-nowrap">
                            {o}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
    </>
  )
  const viewToggle = (
    <>
                {/* Outline toggles: the chosen view gets the green edge and tint. */}
                <ToggleGroup
                  variant="outline"
                  aria-label="List view"
                  value={[listView]}
                  onValueChange={(v) => {
                    if (!v[0]) return
                    setListView(v[0] as "detailed" | "compact" | "list")
                    // The panel is a modal over the table; don't pop it open.
                    if (v[0] === "list") setFilterPanelOpen(false)
                  }}
                  className="ml-auto rounded-full bg-card lg:ml-0 [&>*]:px-3! [&>*:first-child]:rounded-l-full! [&>*:first-child]:pl-3.5! [&>*:last-child]:rounded-r-full! max-md:[&>*:nth-last-child(2)]:rounded-r-full! [&>*:last-child]:pr-3.5!"
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
    </>
  )
  const sideFilters = wide
  // A table needs its width: its filters open over it, not beside it.
  const filterColumn = sideFilters && filterPanelOpen && !(views && listView === "list")

  const handleClearFilters = () => {
    setFilters({})
  }

  // Drawer driven by ?leadId= so the panel survives reloads.
  const setLeadId = (next: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set("leadId", next)
    else params.delete("leadId")
    const url = `${pathname}?${params.toString()}`
    // Preview: an open card is a history step, so Android back closes it.
    if (deck && next && !leadId) {
      leadPushed.current = true
      router.push(url, { scroll: false })
    } else if (deck && !next && leadPushed.current) {
      leadPushed.current = false
      router.back()
    } else router.replace(url, { scroll: false })
  }

  // Relevance runs high → low; a section header opens each level
  // (High, Medium, Low matches) with its count (user call, 2026-11-06).
  const levelOf = (c: CandidateRow) => matchLevel(metaOf(c.id).score)
  // Filtered, searched or selecting: one results bar ("Showing N of M")
  // replaces the match sections, so the count and the bulk actions stay in
  // view while scrolling (user call, 2026-11-06).
  const resultsMode = activeFilterCount > 0 || searchQuery.trim() !== "" || picked.size > 0
  const sectionAt = (i: number): MatchLevel | undefined => {
    if (sort !== "Relevance" || resultsMode) return undefined
    const level = levelOf(filteredCandidates[i])
    return i === 0 || levelOf(filteredCandidates[i - 1]) !== level ? level : undefined
  }
  const SECTION_TITLE: Record<MatchLevel, string> = { high: "High matches", medium: "Medium matches", low: "Low matches" }
  // What each level means, on its bar (placeholder copy, user call 2026-11-06).
  const SECTION_HINT: Record<MatchLevel, string> = {
    high: "Meet all your key requirements",
    medium: "Meet most of your requirements, miss one",
    low: "Miss two or more of your requirements",
  }
  // A white bar, not bare text: its top edge lines up with the filter
  // panel, and it reads on the grey page and inside the white list alike.
  // flush = a row inside a list card (rules above and below, no corners).
  // docked: "full" = edge to edge under the job header (panel shut);
  // "column" = the card column's width, bottom corners rounded (panel open).
  const barShell = (flush: boolean, docked: false | "full" | "column", children: React.ReactNode, tall = false) => (
    <div
      className={cn(
        "flex items-center gap-2 bg-card px-4 text-sm font-semibold text-foreground transition-shape",
        tall ? "h-14 gap-3" : "h-10",
        flush
          ? "border-b border-border [&:not(:first-child)]:border-t"
          : docked === "full"
            ? "rounded-none border border-t-0 border-border border-x-transparent pr-(--bleed-pr) pl-(--bleed-pl) shadow-card"
            : docked === "column"
              ? "rounded-t-none rounded-b-card-nested border border-t-0 border-border shadow-card"
              : "rounded-card-nested border border-border"
      )}
    >
      {children}
    </div>
  )
  const sectionHeader = (level: MatchLevel, flush = false, docked: false | "full" | "column" = false) =>
    barShell(
      flush,
      docked,
      // In a list card (compact view) the column is narrow: the hint takes its
      // own line under the title (user call, 2026-11-08).
      <div className={cn("flex min-w-0", flush ? "flex-col gap-0.5" : "items-center gap-2")}>
        <div className="flex items-center gap-2">
          <MatchBars level={level} />
          <span className="whitespace-nowrap">{SECTION_TITLE[level]}</span>
          <span className="font-regular text-muted-foreground">
            {filteredCandidates.filter((c) => levelOf(c) === level).length}
          </span>
        </div>
        {flush ? (
          <span className="truncate text-xs font-regular text-muted-foreground">{SECTION_HINT[level]}</span>
        ) : (
          <span className="truncate font-regular text-muted-foreground max-sm:hidden">· {SECTION_HINT[level]}</span>
        )}
      </div>,
      flush
    )
  const shownIds = filteredCandidates.map((c) => c.id)
  const selectedShown = shownIds.filter((id) => picked.has(id))
  const toggleSelect = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const resultsBar = (docked: false | "full" | "column") =>
    barShell(
      false,
      docked,
      <>
        <Checkbox
          aria-label="Select all shown candidates"
          checked={selectedShown.length > 0 && selectedShown.length === shownIds.length}
          indeterminate={selectedShown.length > 0 && selectedShown.length < shownIds.length}
          onCheckedChange={(on) => setPicked(on ? new Set(shownIds) : new Set())}
        />
        <span className="whitespace-nowrap">
          {selectedShown.length > 0
            ? `${selectedShown.length} selected`
            : <>Showing {shownIds.length} of {candidates.length}<span className="max-sm:hidden"> candidates</span></>}
        </span>
        {activeFilterCount > 0 && (
          // Phones: the bulk actions need this room once something is selected.
          <span className={cn("flex items-center gap-1 font-regular whitespace-nowrap text-muted-foreground", selectedShown.length > 0 && "max-sm:hidden")}>
            · {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}
            {/* One reset on screen: the panel's "Clear all" while it's open,
                this one once it's shut (user call, 2026-11-06). */}
            {!(sideFilters && filterPanelOpen) && (
              <Button variant="link" size="sm" onClick={handleClearFilters}>
                Clear
              </Button>
            )}
          </span>
        )}
        {selectedShown.length > 0 && (
          <div className="ml-auto flex items-center gap-3">
            {views && listView === "list" && (
              <>
                <Button variant="outline" size="sm" onClick={() => decideMany("rejected")}>
                  <X aria-hidden className="text-destructive" /> Reject
                </Button>
                <Button variant="outline" size="sm" onClick={() => decideMany("shortlisted")}>
                  <Check aria-hidden className="text-success" /> Shortlist
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              aria-label="Download Excel"
              onClick={() => toast.success(`Excel with ${selectedShown.length} candidates downloaded`)}
            >
              <Download aria-hidden /> <span className="max-sm:hidden">Excel</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              aria-label="Send WhatsApp"
              onClick={() => toast.success(`WhatsApp sent to ${selectedShown.length} candidates`)}
            >
              <WhatsAppIcon className="size-4 text-success" /> <span className="max-sm:hidden">WhatsApp</span>
            </Button>
          </div>
        )}
      </>,
      // Room for the bulk buttons: 32px buttons get 12px above and below.
      true
    )
  const filterBody = (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <FilterGroups groups={[...groupsOf("top"), ...groupsOf("next")]} touch />
      {/* The long tail, under one toggle: ≤7% of recruiters use any
          of these (ECC data, 2026-11-06). */}
      <button
        type="button"
        aria-expanded={moreFilters || moreActive > 0}
        onClick={() => setMoreFilters((o) => !o)}
        className="flex w-full items-center justify-between gap-2 border-t border-border px-5 py-4 text-sm font-semibold text-foreground hover:bg-muted"
      >
        <span className="flex items-center gap-2">
          More filters
          {moreActive > 0 && <Badge variant="count">{moreActive}</Badge>}
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 text-muted-foreground transition-select", (moreFilters || moreActive > 0) && "rotate-180")}
        />
      </button>
      {(moreFilters || moreActive > 0) && (
        <div className="border-t border-border">
          <FilterGroups groups={groupsOf("more")} touch />
        </div>
      )}
    </div>
  )

  const tableSections = Object.fromEntries(
    filteredCandidates.flatMap((c, i) => {
      const level = sectionAt(i)
      return level ? [[c.id, `${SECTION_TITLE[level]} · ${filteredCandidates.filter((x) => levelOf(x) === level).length}`]] : []
    })
  )

  // Compact on wide screens: list + profile side by side, the first lead open.
  const split = listView === "compact" && wide
  const selectedId = leadId ?? (split ? filteredCandidates[0]?.id : undefined)
  const selected = candidates.find((c) => c.id === selectedId)
  const selectedThread = selected
    ? toThread(selected, metaOf(selected.id), job, notes[selected.id] ?? [], true)
    : undefined
  const viewNumber = (id: string) => {
    // Applicants are the job's own leads: their number and resume are free.
    // Credits apply only to Database candidates.
    setViewed((v) => new Set(v).add(id))
  }
  const actionsFor = (c: CandidateRow) => (
    <ApplicantActions
      name={c.name}
      phone={c.phone}
      status={pipelineOf(c, viewed)}
      callStatus={calls[c.id]}
      onCallStatus={setCall(c.id)}
      onViewNumber={() => viewNumber(c.id)}
      onReject={() => handleReject(c.id)}
      onShortlist={() => handleMoveToNextRound(c.id)}
    />
  )
  const panelProps = (c: CandidateRow) => ({
    actions: actionsFor(c),
    onAddNote: (text: string) =>
      setNotes((n) => ({ ...n, [c.id]: [{ id: `n${Date.now()}`, text, at: "Today" }, ...(n[c.id] ?? [])] })),
  })

  const cardRow = (c: CandidateRow) => {
    const m = metaOf(c.id)
    return {
      id: c.id,
      name: c.name,
      phone: c.phone,
      photo: PHOTOS[c.id],
      level: matchLevel(m.score),
      appliedDays: m.appliedDays,
      experience: m.experience,
      salary: m.salary,
      location: m.location,
      met: m.matching.length,
      total: REQUIREMENTS.length,
      missing: REQUIREMENTS.filter((r) => !m.matching.includes(r)),
      status: pipelineOf(c, viewed),
      callStatus: calls[c.id],
    }
  }

  // Bulk decisions come from the table; Undo puts every row back.
  const decideMany = (v: "shortlisted" | "rejected") => {
    const before = candidates
    setCandidates((p) => p.map((c) => (picked.has(c.id) ? withOutcome(c, v) : c)))
    toast(`${picked.size} candidates ${v}`, { action: { label: "Undo", onClick: () => setCandidates(before) } })
    setPicked(new Set())
  }

  // One status at a time. A decision can be undone: it moves the candidate.
  const setOutcome = (id: string, v: CallOutcome) => {
    const before = candidates.find((c) => c.id === id)
    if (!before) return
    const beforeCall = calls[id]
    // A decision from the card comes before any call, so it records none.
    // These two record the call and decide nothing.
    const callOnly = v === "not-connected" || v === "follow-up"
    const called = callOnly || viewed.has(id) || metaOf(id).viewed
    if (callOnly) setViewed((seen) => new Set(seen).add(id))
    if (called) setCalls((c) => ({ ...c, [id]: callOnly ? v : "answered" }))
    setCandidates((p) => p.map((c) => (c.id === id ? withOutcome(c, v) : c)))
    if (callOnly) return
    toast(`${before.name} ${v}`, {
      action: {
        label: "Undo",
        onClick: () => {
          setCandidates((p) => p.map((c) => (c.id === id ? before : c)))
          setCalls((c) => {
            const next = { ...c }
            if (beforeCall) next[id] = beforeCall
            else delete next[id]
            return next
          })
        },
      },
    })
  }

  // Phones are a product of their own (docs/DECISIONS.md). The server can't see
  // the width, so md:hidden keeps this page from flashing on desktop.
  if (!tablet) {
    return (
      <div className="md:hidden">
        <PhoneJobPage
          title={jobTitle}
          status={status}
          place={job ? `${job.area}, ${job.city}` : undefined}
          appliedCount={noApplicants ? 0 : candidates.length}
          databaseCount={job?.dbMatches ?? 0}
          rows={filteredCandidates.map(cardRow)}
          search={searchQuery}
          onSearch={setSearchQuery}
          filterGroups={filterGroups}
          filterCount={activeFilterCount}
          onClearFilters={handleClearFilters}
          sort={sort}
          sorts={SORTS}
          onSort={(v) => setSort(v as (typeof SORTS)[number])}
          tab={mainTab}
          onTab={setMainTab}
          leadId={leadId}
          onOpenLead={setLeadId}
          profile={selected && selectedThread ? { thread: selectedThread, onAddNote: panelProps(selected).onAddNote } : undefined}
          deck={
            deck
              ? {
                  threadOf: (id) => {
                    const c = candidates.find((x) => x.id === id)
                    return c && toThread(c, metaOf(c.id), job, notes[c.id] ?? [], true)
                  },
                  addNote: (id, text) => {
                    const c = candidates.find((x) => x.id === id)
                    if (c) panelProps(c).onAddNote(text)
                  },
                }
              : undefined
          }
          noApplicants={noApplicants}
          leads={ACTIVE_LEADS}
          moreLeads={MORE_LEADS}
          credits={DB_CREDITS}
          onOpenDatabaseLead={openLead}
          onViewAllLeads={() => openLead(null)}
          banner={job && job.status !== "active" ? <JobStatusBanner job={job} /> : undefined}
          database={
            <Empty className="border border-dashed border-border">
              <EmptyHeader>
                <EmptyTitle>Active leads first, then the rest of our database</EmptyTitle>
                <EmptyDescription>People who did not apply but match this job. Coming next.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          }
          onBack={back}
          onAbout={() => setInfoOpen(true)}
          onCall={viewNumber}
          onOutcome={setOutcome}
        />
        {job && <JobInfoPanel job={job} open={infoOpen} onOpenChange={setInfoOpen} />}
      </div>
    )
  }

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
            {/* Phones only: no top bar there. Desktop has the breadcrumb and the browser back. */}
            <BackButton className="mt-0.5 md:hidden" onClick={back} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="line-clamp-2 text-lg leading-tight font-semibold capitalize md:text-xl">{jobTitle}</span>
                <Badge variant={status.variant} className="hidden md:inline-flex">{status.label}</Badge>
              </div>
              {/* Phones: status and place only, so this sticky header stays
                  short; the rest is under ⋮ (user call, 2026-11-08). */}
              <div className="flex items-center gap-x-2 gap-y-1 text-sm text-muted-foreground md:flex-wrap">
                <Badge variant={status.variant} className="shrink-0 md:hidden">{status.label}</Badge>
                {/* The • travels with the fact after it, so a wrapped line never ends on one. */}
                {meta.map((m, i) => (
                  <span key={m} className={cn("whitespace-nowrap", i > 0 ? "max-md:hidden" : "max-md:min-w-0 max-md:truncate")}>
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
              <TabsList variant="line" tone="checkout">
                <TabsTrigger value="applied"><UserCheck aria-hidden /> Applied to job ({noApplicants ? 0 : candidates.length})</TabsTrigger>
                <TabsTrigger value="database"><Database aria-hidden /> Database ({(job?.dbMatches ?? 0).toLocaleString("en-IN")})</TabsTrigger>
              </TabsList>
            </Tabs>
            {/* Side-filter preview: search and view sit with the tabs, so a
                search reads as "within this tab" (user call, 2026-11-06). */}
            {sideFilters && mainTab === "applied" && !noApplicants && (
              <div className="flex shrink-0 items-center gap-2">
                {/* One round control: a circle that grows into the field in
                    place, and shrinks back when left empty. */}
                {searchOpen || searchQuery ? (
                  <div className="relative w-64">
                    <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      autoFocus
                      aria-label="Search by candidate name"
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => setSearchOpen(false)}
                      onKeyDown={(e) => e.key === "Escape" && (setSearchQuery(""), setSearchOpen(false))}
                      className="h-8 rounded-full pl-9 text-sm"
                    />
                  </div>
                ) : (
                  <Button variant="outline" size="icon-sm" className="rounded-full" aria-label="Search candidates" onClick={() => setSearchOpen(true)}>
                    <Search />
                  </Button>
                )}
                {viewToggle}
              </div>
            )}
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

      <main ref={mainRef} className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 md:px-6">
        {job && <JobStatusBanner job={job} />}
        {job && <JobInfoPanel job={job} open={infoOpen} onOpenChange={setInfoOpen} />}

        {mainTab === "database" ? (
          // Step 5 builds the AI-suggested database list; until then it says
          // which lead was opened (that profile is highlighted there).
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>
                {dbFocus
                  ? `${ACTIVE_LEADS.find((l) => l.id === dbFocus)?.name ?? "This lead"}, highlighted in the database`
                  : "Active leads first, then the rest of our database"}
              </EmptyTitle>
              <EmptyDescription>People who did not apply but match this job. Coming next.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : noApplicants ? (
          <div className="flex flex-col gap-4">
            <FindingCandidates />
            <ActiveLeads leads={ACTIVE_LEADS} more={MORE_LEADS} credits={DB_CREDITS} onOpen={openLead} onViewAll={() => openLead(null)} />
          </div>
        ) : (
          <>
            {/* ── Search + filters ── */}
            {!sideFilters && <SearchFilterBar
              placeholder="Search by candidate name"
              value={searchQuery}
              onChange={setSearchQuery}
              filterGroups={sideFilters ? undefined : filterGroups}
              onClearFilters={handleClearFilters}
            />}

            {/* ── Pipeline counters + sort ── */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Phones: the house chip row (as on the jobs list). */}
              <MobileChipRow
                items={PIPELINE.map((p) => ({ value: p.value, label: `${p.label} (${pipelineCounts[p.value]})` }))}
                value={pipeline}
                onValueChange={setPipeline}
              />
              {/* Desktop: the jobs list's status filter control, so both pages behave alike. */}
              {/* Side filters: status on the left, Filters + sort at the right
                  end, over the panel they open (user call, 2026-11-06). */}
              <div className="flex items-center gap-2 max-md:hidden lg:order-last">
              {sideFilters && (
                <>
                <Button
                  variant="outline"
                  size="sm"
                  aria-expanded={filterPanelOpen}
                  aria-controls="lead-filter-panel"
                  className="aria-expanded:border-primary aria-expanded:bg-accent aria-expanded:text-accent-foreground"
                  onClick={() => setFilterPanelOpen((o) => !o)}
                >
                  <SlidersHorizontal aria-hidden />
                  Filters
                  {activeFilterCount > 0 && <Badge variant="count">{activeFilterCount}</Badge>}
                </Button>
                {sortMenu}
                </>
              )}
              </div>
              <Tabs value={pipeline} onValueChange={(v) => setPipeline(v as Pipeline)} className={cn("max-md:hidden", !sideFilters && "lg:mr-auto")}>
                <TabsList variant="inverted" aria-label="Candidate status">
                  {PIPELINE.map((p) => (
                    <TabsTrigger key={p.value} value={p.value}>
                      {p.label} ({pipelineCounts[p.value]})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className={cn("flex items-center gap-2", sideFilters && "hidden")}>
                {sortMenu}
                {viewToggle}
              </div>
            </div>

            <div className={cn(filterColumn && "flex items-start gap-4")}>
            {filterColumn && (
              <Card id="lead-filter-panel" padding="none" className="sticky top-(--list-top) order-last flex max-h-(--list-room) w-72 shrink-0 flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3">
                  <span className="text-base font-semibold text-foreground">Filters</span>
                  {activeFilterCount > 0 && (
                    <Button variant="link" size="sm" onClick={handleClearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>
                {filterBody}
              </Card>
            )}
            <div className="min-w-0 flex-1">
            {filteredCandidates.length === 0 ? (
              // Nothing left: keep the results bar (what's applied, Clear) and
              // say why in words, with one way out (user call, 2026-11-06).
              <div className="flex flex-col gap-3">
                {resultsMode && resultsBar(false)}
                <Card padding="none">
                  <Empty>
                    <EmptyMedia>
                      <ValueArt name="no-results" size="sm" />
                    </EmptyMedia>
                    <EmptyHeader>
                      <EmptyTitle className="text-lg font-semibold">
                        {resultsMode
                          ? "No candidates match"
                          : `No ${PIPELINE.find((p) => p.value === pipeline)?.label.toLowerCase() ?? ""} candidates yet`}
                      </EmptyTitle>
                      <EmptyDescription>
                        {searchQuery.trim()
                          ? `Nobody named "${searchQuery.trim()}"${activeFilterCount > 0 ? " with these filters" : ""}.`
                          : resultsMode
                            ? `None of the ${pipelineCounts[pipeline]} candidates fit all ${activeFilterCount} ${activeFilterCount === 1 ? "filter" : "filters"}. Remove one to see more.`
                            : "Candidates show here as you act on them."}
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent className="flex-row justify-center gap-3">
                      {searchQuery.trim() && (
                        <Button variant="outline" size="lg" onClick={() => setSearchQuery("")}>
                          Clear search
                        </Button>
                      )}
                      {activeFilterCount > 0 ? (
                        <Button size="lg" onClick={handleClearFilters}>
                          Clear filters
                        </Button>
                      ) : (
                        !resultsMode && pipeline !== "all" && (
                          <Button variant="outline" size="lg" onClick={() => setPipeline("all")}>
                            See all candidates
                          </Button>
                        )
                      )}
                    </EmptyContent>
                  </Empty>
                </Card>
              </div>
            ) : listView === "detailed" ? (
              // One block per match section: its bar is sticky inside the block,
              // so the next section's bar pushes it out as it arrives.
              <div className="flex flex-col gap-3">
                {filteredCandidates
                  .reduce<{ level?: MatchLevel; items: typeof filteredCandidates }[]>((groups, c, i) => {
                    const level = sectionAt(i)
                    if (level || i === 0) groups.push({ level, items: [] })
                    groups[groups.length - 1].items.push(c)
                    return groups
                  }, [])
                  .map((g) => (
                <section key={g.items[0].id} className="flex flex-col gap-3">
                  {/* Above the cards' action bars (z-docked), below the job header.
                      The page-coloured backing masks cards scrolling under it;
                      with the panel shut it runs to the page edges. */}
                  {resultsMode && (
                    <DockingBar key={`results-${filterColumn}`} bleed={!filterColumn}>
                      {(docked) => resultsBar(docked && (filterColumn ? "column" : "full"))}
                    </DockingBar>
                  )}
                  {g.level && (
                    <DockingBar key={String(filterColumn)} bleed={!filterColumn}>
                      {(docked) => sectionHeader(g.level!, false, docked && (filterColumn ? "column" : "full"))}
                    </DockingBar>
                  )}
                {g.items.map((c) => {
                  const m = metaOf(c.id)
                  return (
                    <React.Fragment key={c.id}>
                      <ApplicantCard
                        name={c.name}
                        phone={c.phone}
                        profile={m}
                        match={{ level: matchLevel(m.score), score: m.score }}
                        resume={m.resume}
                        requirements={REQUIREMENTS}
                        photo={PHOTOS[c.id]}
                        callStatus={calls[c.id]}
                        onCallStatus={setCall(c.id)}
                        appliedDays={m.appliedDays}
                        status={pipelineOf(c, viewed)}
                        selected={picked.has(c.id)}
                        onSelect={() => toggleSelect(c.id)}
                        onOpen={() => setLeadId(c.id)}
                        onViewNumber={() => viewNumber(c.id)}
                        onReject={() => handleReject(c.id)}
                        onShortlist={() => handleMoveToNextRound(c.id)}
                      />
                    </React.Fragment>
                  )
                })}
                </section>
                  ))}
              </div>
            ) : listView === "list" && views ? (
              <div className="flex flex-col gap-3">
              {resultsMode && resultsBar(false)}
              <ApplicantTriageTable
                rows={filteredCandidates.map((c) => ({ ...cardRow(c), genderAge: `${metaOf(c.id).gender}, ${metaOf(c.id).age}` }))}
                sections={tableSections}
                picked={picked}
                onPick={toggleSelect}
                onPickAll={(on) => setPicked(on ? new Set(shownIds) : new Set())}
                onOpen={setLeadId}
                onViewNumber={viewNumber}
                onCallStatus={(id, v) => setCall(id)(v)}
                onReject={handleReject}
                onShortlist={handleMoveToNextRound}
              />
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
                sections={tableSections}
                onOpen={setLeadId}
                onViewNumber={viewNumber}
                onReject={handleReject}
                onShortlist={handleMoveToNextRound}
              />
            ) : views ? (
              // Compact: the phone's card and profile, side by side on wide screens.
              <div className="flex items-start gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-3 lg:max-w-sm">
                  {/* No match headers: every card already says its level. */}
                  {filteredCandidates.map((c) => (
                    <CandidateCard key={c.id} candidate={cardRow(c)} active={split && c.id === selectedId} onOpen={() => setLeadId(c.id)} />
                  ))}
                </div>
                {split && selected && selectedThread && (
                  <CandidatePane key={selected.id} thread={selectedThread} onAddNote={panelProps(selected).onAddNote} actions={actionsFor(selected)} floating={pill} />
                )}
              </div>
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
                          {sectionAt(i) && sectionHeader(sectionAt(i)!, true)}
                          <ConversationRow
                            name={c.name}
                            initial={c.name.charAt(0).toUpperCase()}
                            avatarSrc={PHOTOS[c.id]}
                            // Only what earns the next click: the open pane has the rest (user call, 2026-11-08).
                            preview={`${m.experience} • ${m.salary}`}
                            // Once decided, the outcome takes the time's place.
                            time={status === "shortlisted" || status === "rejected" ? "" : m.appliedDays <= 1 ? "Today" : `${m.appliedDays}d ago`}
                            statusIcon={
                              <>
                                {/* Under Relevance the section header already says the level. */}
                                {(sort !== "Relevance" || resultsMode) && <MatchBars level={level} />}
                                {(status === "shortlisted" || status === "rejected") && (
                                  <Badge variant={status === "rejected" ? "destructive" : "success"}>
                                    {PIPELINE.find((p) => p.value === status)?.label}
                                  </Badge>
                                )}
                              </>
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
            </div>
            </div>
          </>
        )}
      </main>

      <Sheet open={sideFilters && filterPanelOpen && views && listView === "list"} onOpenChange={setFilterPanelOpen}>
        <SheetPanel>
          <div className="border-b border-border bg-card py-4">
            <SheetPanelHeader
              title="Filters"
              action={activeFilterCount > 0 && <Button variant="link" size="sm" onClick={handleClearFilters}>Clear all</Button>}
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col bg-card">{filterBody}</div>
          <div className="border-t border-border bg-card p-4">
            <Button size="xl" className="w-full" onClick={() => setFilterPanelOpen(false)}>
              Show {filteredCandidates.length} {filteredCandidates.length === 1 ? "candidate" : "candidates"}
            </Button>
          </div>
        </SheetPanel>
      </Sheet>

      {/* Detailed view and phones: the profile opens as the side panel. */}
      {deck && selected && selectedThread && (
        <CandidateDetailsSheet
          open={!!leadId && !split}
          onOpenChange={(o) => !o && setLeadId(null)}
          thread={selectedThread}
          onAddNote={panelProps(selected).onAddNote}
          footer={actionsFor(selected)}
          floating={pill}
          position={filteredCandidates.findIndex((c) => c.id === selected.id) + 1}
          total={filteredCandidates.length}
          onPrevious={() => setLeadId(filteredCandidates[filteredCandidates.findIndex((c) => c.id === selected.id) - 1]?.id ?? selected.id)}
          onNext={() => setLeadId(filteredCandidates[filteredCandidates.findIndex((c) => c.id === selected.id) + 1]?.id ?? selected.id)}
        />
      )}
      {!deck && selected && selectedThread && (
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

/**
 * A match-section bar that docks like the homepage nav (site-header): a
 * rounded pill in the list; pinned under the job header, it stretches edge
 * to edge, square, with a shadow. Above the cards' action bars (z-docked),
 * below the job header (z-sticky).
 */
// Callers key it on the panel state: the cards reflow at once when the
// panel toggles, so the bar remounts and snaps with them, never easing alone.
function DockingBar({ bleed, children }: { bleed: boolean; children: (docked: boolean) => React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [docked, setDocked] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      const top = parseFloat(getComputedStyle(el).top) || 0
      const r = el.getBoundingClientRect()
      // Docked from the moment it meets the bar pinned above it (within one
      // bar's height of the sticky line) until its whole section has scrolled
      // past. So in a hand-off the outgoing bar leaves full width and the
      // incoming one is already full width: no pill ↔ bar flapping.
      const section = el.parentElement?.getBoundingClientRect()
      setDocked(r.top <= top + r.height + 1 && (section?.bottom ?? 0) > top && window.scrollY > 0)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [])
  return (
    <div
      ref={ref}
      className={cn(
        "sticky top-(--list-top) z-dropdown bg-muted transition-shape",
        // Always reaches the edges; at rest the gutter is padding. Docking
        // eases this padding to 0 while the bar's own padding grows by the
        // same amount on the same curve, so the label never moves.
        bleed && "-mr-(--bleed-r) -ml-(--bleed-l)",
        bleed && (docked ? "px-0" : "pr-(--bleed-r) pl-(--bleed-l)")
      )}
    >
      {children(docked)}
    </div>
  )
}
