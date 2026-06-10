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
  LayoutList,
  Languages,
  ListChecks,
  MapPin,
  MoreVertical,
  PhoneCall,
  PowerOff,
  Share2,
  Table2,
  Upload,
  User,
  UserPlus,
} from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, use, useMemo, useState } from "react"
import confetti from "canvas-confetti"
import { AddCandidateDialog, type NewCandidateData } from "@/components/onlyrounds/add-candidate-dialog"

import {
  CandidateCard,
  type Candidate,
} from "@/components/onlyrounds/candidate-card"
import {
  CandidateDrawer,
  type DrawerCandidate,
} from "@/components/onlyrounds/candidate-drawer"

import { SearchFilterBar } from "@/components/onlyrounds/search-filter-bar"
import { RoundSummaryStrip } from "@/components/onlyrounds/round-summary-strip"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { CandidateTable } from "@/components/onlyrounds/candidate-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { IconLabel } from "@/components/onlyrounds/shared"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ── Mock data ─────────────────────────────────────────────────────────────

const FILTERS = [
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
  // Note: "source" filter is computed dynamically from candidates state
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
    source: "applied",
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
    mediaType: "audio",
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
  sadanand: {
    id: "sadanand",
    name: "Sadanand",
    role: "Se Engineer",
    company: "Apna",
    email: "buruds@gmail.com",
    phone: "+919164862614",
    score: 0,
    verdict: "fit",
    source: "sourced",
    sourceDetail: "manually added",
    cefrLevel: "na",
    insights: [],
    callDuration: 0,
    mediaType: "audio",
    recommendations: [
      "No calls successfully completed yet.",
      "The candidate missed two call attempts. Rescheduled for a third attempt.",
    ],
    criteriaGroups: [],
    profile: {
      about: "Sourced candidate. Resume details and work history will populate once automated screening is completed.",
      location: "Bengaluru, KA",
      resumeUrl: undefined,
    },
    communication: [
      {
        id: "s1",
        channel: "call",
        direction: "out",
        title: "Outbound call attempted",
        detail: "Auto-dialler · busy tone.",
        timestamp: "May 14, 2026 · 11:30",
      },
      {
        id: "s2",
        channel: "call",
        direction: "out",
        title: "Outbound call attempted",
        detail: "Auto-dialler · ringing, no answer.",
        timestamp: "Jun 8, 2026 · 14:22",
      },
    ],
  },
  demo1: {
    id: "demo1",
    name: "Karan",
    role: "Se Engineer",
    company: "Apna",
    email: "karan.jain@apna.co",
    phone: "+918601250243",
    score: 0,
    verdict: "fit",
    source: "sourced",
    sourceDetail: "candidates_export.csv",
    cefrLevel: "na",
    insights: [],
    callDuration: 18,
    mediaType: "audio",
    recommendations: [],
    criteriaGroups: [
      {
        id: "must-partial",
        label: "Must-have criteria (partial)",
        items: [
          {
            id: "exp-partial",
            text: "Minimum 2 years of relevant engineering experience",
            score: 6,
            reasoning:
              "Candidate briefly mentioned working at Apna for over a year before the call dropped. Could not confirm full duration or role depth.",
            dealbreaker: true,
            atSecond: 5,
          },
          {
            id: "notice-partial",
            text: "Notice period of 30 days or less",
            score: 0,
            reasoning:
              "Call ended before this was discussed. Could not assess.",
            dealbreaker: true,
          },
        ],
      },
    ],
    cefr: {
      overall: 5.2,
      level: "B1",
      recommendedFor: "Inconclusive — call ended too early for full assessment",
      dimensions: [
        {
          label: "Pronunciation",
          score: 5.5,
          description:
            "Speech was clear in the brief window captured. Accent mild.",
        },
        {
          label: "Fluency",
          score: 5,
          description:
            "Limited sample — only a short greeting and partial answer were recorded.",
        },
        {
          label: "Grammar",
          score: 5,
          description:
            "No grammatical errors in the fragment captured, but sample is too small to conclude.",
        },
      ],
      areasOfImprovement: [
        "Insufficient data — complete the full interview for a reliable assessment.",
      ],
    },
    profile: {
      about: "Sourced candidate. Work history and technical details are pending successful completion of the screening call.",
      location: "Mumbai, MH",
      resumeUrl: undefined,
    },
    communication: [
      {
        id: "d1",
        channel: "call",
        direction: "out",
        title: "AI Call Started (First Attempt)",
        detail: "Call connected. Audio started.",
        timestamp: "Apr 08, 2026 · 19:21",
      },
      {
        id: "d2",
        channel: "call",
        direction: "out",
        title: "AI Call Ended Early (First Attempt)",
        detail: "Dropped off after 15 seconds. Reason: Connection reset.",
        timestamp: "Apr 08, 2026 · 19:21",
        duration: "0:15",
      },
      {
        id: "d3",
        channel: "call",
        direction: "out",
        title: "AI Call Started (Second Attempt)",
        detail: "Call connected. Audio started.",
        timestamp: "Apr 09, 2026 · 08:02",
      },
      {
        id: "d4",
        channel: "call",
        direction: "out",
        title: "AI Call Ended Early (Second Attempt)",
        detail: "Dropped off after 3 seconds. Reason: Candidate hung up.",
        timestamp: "Apr 09, 2026 · 12:32",
        duration: "0:03",
      },
    ],
  },
  chaitra: {
    id: "chaitra",
    name: "chaitra",
    role: "QA Engineer",
    company: "Independent",
    email: "chaitra.b.ext@apna.co",
    phone: "+918971981508",
    score: 0,
    verdict: "fit",
    source: "applied",
    cefrLevel: "na",
    insights: [],
    callDuration: 0,
    mediaType: "audio",
    recommendations: [
      "All 5 call attempts exhausted. Candidate failed to connect or answer any screening requests.",
      "Status is locked as No Response. Reach out manually if you wish to extend more attempts.",
    ],
    criteriaGroups: [],
    profile: {
      about: "Applied via job board. Profile details pending completion of screening round.",
      location: "Bengaluru, KA",
      resumeUrl: undefined,
    },
    communication: [
      {
        id: "ch1",
        channel: "call",
        direction: "out",
        title: "First Attempt: No Answer",
        timestamp: "Apr 08, 2026 · 09:01",
      },
      {
        id: "ch2",
        channel: "call",
        direction: "out",
        title: "Second Attempt: No Answer",
        timestamp: "Apr 08, 2026 · 15:15",
      },
      {
        id: "ch3",
        channel: "call",
        direction: "out",
        title: "Third Attempt: No Answer",
        timestamp: "Apr 09, 2026 · 10:31",
      },
      {
        id: "ch4",
        channel: "call",
        direction: "out",
        title: "Fourth Attempt: No Answer",
        timestamp: "Apr 09, 2026 · 17:46",
      },
      {
        id: "ch5",
        channel: "call",
        direction: "out",
        title: "Fifth Attempt: No Answer",
        timestamp: "Apr 10, 2026 · 11:01",
      },
    ],
  },
  "rohit-notfit": {
    id: "rohit-notfit",
    name: "Rohit Verma",
    role: "QA Trainee",
    company: "Independent",
    email: "rohit.verma@test.co",
    phone: "+919812345678",
    score: 32,
    verdict: "not-fit",
    source: "applied",
    cefrLevel: "B1",
    insights: [
      { tone: "miss", label: "Below required experience", atSecond: 45 },
      { tone: "miss", label: "Salary expectation too high", atSecond: 95 },
      { tone: "ok", label: "Open to office work", atSecond: 135 },
    ],
    callDuration: 210,
    mediaType: "audio",
    recommendations: [
      "Candidate does not meet the minimum experience requirements (has <1 year, requirement is 3+ years).",
      "Salary expectations (exceeds budget by 40%) act as a direct dealbreaker.",
      "Recommend rejecting this candidate.",
    ],
    criteriaGroups: [
      {
        id: "must",
        label: "Must-have criteria",
        items: [
          {
            id: "rm1",
            text: "Must have the minimum required years of total professional experience in manual testing.",
            score: 2,
            reasoning: "Candidate only has 6 months of internship experience, failing the 3-year minimum bar.",
            dealbreaker: true,
            atSecond: 45,
          },
          {
            id: "rm2",
            text: "Must be comfortable with the specified salary budget and compensation structure.",
            score: 3,
            reasoning: "Candidate expects a package significantly above our budget ceiling.",
            dealbreaker: true,
            atSecond: 95,
          },
        ],
      },
    ],
    cefr: {
      overall: 4.8,
      level: "B1",
      recommendedFor: "Not recommended for voice process",
      dimensions: [
        { label: "Pronunciation", score: 5, description: "Accent is strong; some words require close listening." },
        { label: "Fluency", score: 4.5, description: "Frequent pauses and hesitations while searching for words." },
        { label: "Grammar", score: 5, description: "Grammatical errors are frequent but basic meaning is conveyed." },
      ],
      areasOfImprovement: [
        "Work on structural vocabulary and sentence flow.",
        "Practice speaking continuously without long pauses.",
      ],
    },
    profile: {
      about: "Recent QA Intern looking for entry level software testing positions.",
      location: "Noida, UP",
      experienceYears: 0.5,
      currentRole: "QA Intern at Freelancer",
      experience: [
        {
          role: "QA Intern",
          company: "Independent Solutions",
          period: "Nov 2025 – Present",
          description: "Assisted in writing manual test cases and logging basic UI defects.",
        },
      ],
    },
  },
  "anjali-interview": {
    id: "anjali-interview",
    name: "Anjali Mehra",
    role: "Senior QA Engineer",
    company: "Zomato",
    email: "anjali@test.co",
    phone: "+919800000111",
    score: 86,
    verdict: "fit",
    source: "sourced",
    sourceDetail: "manually added",
    cefrLevel: "C2",
    insights: [
      { tone: "ok", label: "5+ years QA experience", atSecond: 30 },
      { tone: "ok", label: "Strong on test automation", atSecond: 120 },
      { tone: "ok", label: "Excellent English fluency", atSecond: 180 },
    ],
    callDuration: 320,
    mediaType: "video",
    recommendations: [
      "Highly experienced candidate with solid automation background. Passed screening with 86/100.",
      "Moved to Technical Interview stage. Hiring manager should focus on her system architectural understanding and leadership skills.",
    ],
    criteriaGroups: [
      {
        id: "must",
        label: "Must-have criteria",
        items: [
          {
            id: "am1",
            text: "Must have the minimum required years of total professional experience in manual testing.",
            score: 9,
            reasoning: "Anjali has over 5 years of professional testing experience, mostly in automated and manual settings.",
            dealbreaker: true,
            atSecond: 30,
          },
        ],
      },
    ],
    cefr: {
      overall: 9.1,
      level: "C2",
      recommendedFor: "Strong fit for voice processes and lead client facing roles",
      dimensions: [
        { label: "Pronunciation", score: 9.5, description: "Extremely clear and articulate." },
        { label: "Fluency", score: 9, description: "Smooth speech delivery with minimal pauses." },
      ],
      areasOfImprovement: [
        "None identified. English communication is near-native.",
      ],
    },
    profile: {
      about: "QA Specialist with 5 years of experience building automated testing pipelines. Proficient in Playwright, Cypress, Selenium, and CI/CD setups.",
      location: "Gurugram, HR",
      experienceYears: 5,
      currentRole: "Senior QA Engineer at Zomato",
      experience: [
        {
          role: "Senior QA Engineer",
          company: "Zomato",
          period: "Jan 2021 – Present",
          description: "Led QA efforts for the core delivery tracking system. Wrote and maintained 1200+ integration and regression tests.",
        },
      ],
    },
  },
  "karthik-review": {
    id: "karthik-review",
    name: "Karthik Nair",
    role: "QA Engineer",
    company: "TCS",
    email: "karthik.nair@tcs.com",
    phone: "+919845012345",
    score: 74,
    verdict: "review",
    source: "sourced",
    sourceDetail: "manually added",
    cefrLevel: "B2",
    insights: [
      { tone: "ok", label: "2 years manual testing experience", atSecond: 42 },
      { tone: "miss", label: "Notice period is 60 days (preferred <=30)", atSecond: 110 },
      { tone: "ok", label: "Good API testing knowledge", atSecond: 165 },
    ],
    callDuration: 280,
    mediaType: "video",
    recommendations: [
      "Overall solid technical answers, but notice period is 60 days which violates preferred threshold.",
      "Check if his notice period is negotiable down to 30 days before proceeding to tech rounds.",
    ],
    criteriaGroups: [
      {
        id: "must",
        label: "Must-have criteria",
        items: [
          {
            id: "km1",
            text: "Must have the minimum required years of total professional experience in manual testing.",
            score: 8,
            reasoning: "Candidate has 2 years of manual testing experience, satisfying the requirement.",
            dealbreaker: true,
            atSecond: 42,
          },
        ],
      },
      {
        id: "preferred",
        label: "Preferred criteria",
        items: [
          {
            id: "kp1",
            text: "Immediate joiner or serving a notice period of 30 days or less.",
            score: 4,
            reasoning: "Notice period is 60 days, exceeding the preferred window.",
          },
        ],
      },
    ],
    cefr: {
      overall: 6.8,
      level: "B2",
      recommendedFor: "Satisfactory for basic client communication",
      dimensions: [
        { label: "Pronunciation", score: 6.5, description: "Accent is minor, clarity is good." },
        { label: "Fluency", score: 7, description: "Flow is natural with minor interruptions." },
      ],
      areasOfImprovement: [
        "Practice phrasing technical jargon to explain structures more simply.",
      ],
    },
    profile: {
      about: "QA Professional with 2 years of experience at TCS in retail banking QA. Hands on experience with SQL databases and manual regression testing.",
      location: "Chennai, TN",
      experienceYears: 2,
      currentRole: "QA Analyst at TCS",
      experience: [
        {
          role: "QA Analyst",
          company: "TCS",
          period: "Jun 2024 – Present",
          description: "Executed monthly regression test cycles. Validated API payloads and verified database integrity via SQL queries.",
        },
      ],
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
  const [candidates, setCandidates] = useState<CandidateRow[]>(CANDIDATES)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const [mainTab, setMainTab] = useState<
    "screening" | "interview" | "selected"
  >("screening")

  const [filters, setFilters] = useState<Record<string, Set<string>>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialing, setIsDialing] = useState(false)
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [candidateToMove, setCandidateToMove] = useState<string | null>(null)

  const candidateObjectToMove = useMemo(() => {
    if (!candidateToMove) return null
    return candidates.find((c) => c.id === candidateToMove)
  }, [candidateToMove, candidates])

  const moveDialogText = useMemo(() => {
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
  }, [candidateObjectToMove, jobTitle])

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

  const handleReTake = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              state: {
                kind: "pending" as const,
                attempted: 0,
                total: 5,
              },
            }
          : c
      )
    )
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

  const handleUpdateNote = (id: string, note: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, note } : c))
    )
  }

  const candidatesForStage = useMemo(
    () => candidates.filter((c) => c.stage === mainTab),
    [mainTab, candidates],
  )

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const aiPicked = filters["ai-status"]
    const cefrPicked = filters["cefr"]
    const sourcePicked = filters["source"]
    return candidatesForStage.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false
      if (aiPicked && aiPicked.size > 0 && !aiPicked.has(aiStatusKey(c))) {
        return false
      }
      if (cefrPicked && cefrPicked.size > 0) {
        if (!c.cefrLevel || !cefrPicked.has(c.cefrLevel)) return false
      }
      if (sourcePicked && sourcePicked.size > 0) {
        // Each option key is either "applied" (for applied candidates) or
        // the sourceDetail string (e.g. "manually added", "candidates_export.csv").
        const candKey =
          c.source === "sourced"
            ? (c.sourceDetail ?? "sourced")
            : "applied"
        if (!sourcePicked.has(candKey)) return false
      }
      return true
    })
  }, [searchQuery, filters, candidatesForStage])

  // Compute the source filter options dynamically from the current candidates list.
  // Each applied candidate contributes an "applied" key; each sourced candidate
  // contributes its sourceDetail string (or "sourced" as fallback) as a unique key.
  const sourceFilterGroup = useMemo(() => {
    const optionMap = new Map<string, { id: string; label: string }>()
    for (const c of candidates) {
      if (c.source === "sourced") {
        const key = c.sourceDetail ?? "sourced"
        // Capitalise "manually added" for display, keep file names as-is
        const label =
          key === "manually added" ? "Manually added" : key
        if (!optionMap.has(key)) optionMap.set(key, { id: key, label })
      } else {
        if (!optionMap.has("applied"))
          optionMap.set("applied", { id: "applied", label: "Applied directly" })
      }
    }
    const opts = Array.from(optionMap.values())
    return {
      label: "Candidate Source",
      options: opts.map((o) => o.label),
      selected: opts
        .filter((o) => filters["source"]?.has(o.id))
        .map((o) => o.label),
      onToggle: (label: string) => {
        const opt = opts.find((o) => o.label === label)
        if (opt) toggleFilter("source", opt.id)
      },
    }
  }, [candidates, filters])

  const filterGroups = useMemo(() => {
    const staticGroups = FILTERS.map((group) => ({
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
    return [...staticGroups, sourceFilterGroup]
  }, [filters, sourceFilterGroup])

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

  const drawerCandidate = useMemo(() => {
    if (!leadId) return null
    const cand = candidates.find((c) => c.id === leadId)
    if (!cand) return null

    const baseDrawer = DRAWER_DATA[leadId] || {
      id: cand.id,
      name: cand.name,
      role: cand.role || jobTitle,
      company: cand.company || "Independent",
      email: cand.email || "",
      phone: cand.phone || "",
      score: 0,
      verdict: "fit" as const,
      state: cand.state,
      source: cand.source || "applied",
      cefrLevel: cand.cefrLevel || "na",
      insights: [],
      callDuration: 0,
      recommendations: [
        "No calls placed yet. Sourced lead awaiting initial contact.",
        "Candidate is ready to receive an automated AI screening call.",
      ],
      criteriaGroups: [],
      profile: {
        about: "Sourced candidate. Resume details and work history will populate once automated screening is completed.",
        location: "Sourced",
        resumeUrl: cand.resumeFile ? URL.createObjectURL(cand.resumeFile) : undefined,
      },
    }

    return {
      ...baseDrawer,
      notes: cand.note || baseDrawer.notes || "",
      state: cand.state,
      stage: cand.stage,
      score: cand.state.kind === "completed" ? cand.state.score : baseDrawer.score,
      verdict: cand.state.kind === "completed" ? cand.state.verdict : baseDrawer.verdict,
      retakeHistory: cand.retakeHistory || baseDrawer.retakeHistory,
    }
  }, [leadId, candidates, jobTitle])
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
          <div className="flex items-start gap-3">
            <BackButton className="mt-0.5" />
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold leading-tight capitalize">{jobTitle}</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <IconLabel icon={Building2}>Simplilearn</IconLabel>
                <span aria-hidden>·</span>
                <IconLabel icon={MapPin}>Hubli</IconLabel>
              </div>
            </div>
          </div>
        }
        description={null}
        tabs={
          <div className="flex items-center justify-between">
            <Tabs value={mainTab} onValueChange={(v) => { setMainTab(v as Stage); setFilters({}); setSearchQuery(""); setIsDialing(false) }}>
              <TabsList variant="line">
                {(["screening", "interview", "selected"] as Stage[]).map((s) => {
                  const count = candidates.filter((c) => c.stage === s).length
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

            {/* View toggle — lives at the far-right of the tab row */}
            <div className="flex items-center gap-1.5 pb-1">
              <ButtonGroup>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setViewMode("card")}
                  className={cn(viewMode === "card" && "bg-muted")}
                  aria-label="Card view"
                >
                  <LayoutList className="size-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setViewMode("table")}
                  className={cn(viewMode === "table" && "bg-muted")}
                  aria-label="Table view"
                >
                  <Table2 className="size-3.5" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        }
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setAddDialogOpen(true)}>
              <UserPlus className="size-4" /> Add candidates
            </Button>
            <Button variant="outline" size="icon" aria-label="Download data">
              <Download className="size-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Share job">
              <Share2 className="size-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
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
          isDialing={isDialing}
          onStartDialing={
            ROUNDS[mainTab].mode === "ai" && candidatesForStage.length > 0
              ? () => setIsDialing(true)
              : undefined
          }
          onStopDialing={() => setIsDialing(false)}
        />

        {/* ── Search + filters ── */}
        <SearchFilterBar
          placeholder="Search by candidate name, email, or phone…"
          value={searchQuery}
          onChange={setSearchQuery}
          filterGroups={filterGroups}
          onClearFilters={handleClearFilters}
        />

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
        ) : viewMode === "card" ? (
          <div className="flex flex-col gap-3">
            {filteredCandidates.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onOpen={() => setLeadId(c.id)}
                onViewInsights={() => setLeadId(c.id)}
                onReTake={() => handleReTake(c.id)}
                onReject={() => handleReject(c.id)}
                onMoveToNextRound={() => setCandidateToMove(c.id)}
                onAddNote={(note) => handleUpdateNote(c.id, note)}
              />
            ))}
          </div>
        ) : (
          <CandidateTable
            candidates={filteredCandidates}
            onOpen={(id) => setLeadId(id)}
            onReTake={handleReTake}
            onReject={handleReject}
            onMoveToNextRound={setCandidateToMove}
          />
        )}
      </main>

      <CandidateDrawer
        open={!!drawerCandidate}
        onOpenChange={(o) => !o && setLeadId(null)}
        candidate={drawerCandidate}
        hasPrev={!!prev}
        hasNext={!!next}
        onPrev={() => prev && setLeadId(prev.id)}
        onNext={() => next && setLeadId(next.id)}
        onReTake={() => drawerCandidate && handleReTake(drawerCandidate.id)}
        onReject={() => drawerCandidate && handleReject(drawerCandidate.id)}
        onMoveToNextRound={() => drawerCandidate && setCandidateToMove(drawerCandidate.id)}
        onAddNote={(note) => drawerCandidate && handleUpdateNote(drawerCandidate.id, note)}
      />

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
