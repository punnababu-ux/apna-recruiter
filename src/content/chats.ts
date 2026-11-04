/**
 * Apna Chat — mock threads for the recruiter inbox (phone tab
 * /apnahire/chats, desktop sidebar). Scripted prototype text, shaped by the
 * Apna Chat MVP PRD (2026-11-04): one thread for each job and candidate, AI
 * openers on Premium, Super premium and subscription jobs, "Urgent: needs
 * reply" when a candidate answers on a job without the AI add-on.
 * Replace with the API when it exists.
 */

import { COMPANY_NAME } from "@/lib/apnahire/job-draft"

export type JobTier = "classic" | "premium" | "super-premium" | "subscription"

export const TIER_LABEL: Record<JobTier, string> = {
  classic: "Classic",
  premium: "Premium",
  "super-premium": "Super premium",
  subscription: "Subscription",
}

/** AI messages for each candidate, opener included (PRD: access by job
 *  tier). Classic gets none: the recruiter sends a template. */
export const AI_MESSAGE_LIMIT: Record<JobTier, number> = {
  classic: 0,
  premium: 3,
  "super-premium": 5,
  subscription: 3,
}

/** The inbox's status filters, in the PRD's order. "active" is a thread the
 *  recruiter has answered: it shows under All only. */
export type ThreadStatus = "urgent" | "ai-screening" | "shortlisted" | "interview" | "closed" | "active"

export const STATUS_FILTERS: { value: Exclude<ThreadStatus, "active">; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "ai-screening", label: "AI screening" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "closed", label: "Closed" },
]

/** Why a closed thread closed (PRD FR-2, FR-4, edge cases). */
export type ClosedReason = "not-interested" | "no-reply" | "not-a-fit"

export const CLOSED_LABEL: Record<ClosedReason, string> = {
  "not-interested": "Not interested",
  "no-reply": "No reply",
  "not-a-fit": "Not a fit",
}

export type Sender = "ai" | "recruiter" | "candidate"

export interface ChatMessage {
  id: string
  from: Sender
  text: string
  /** As shown: "10:42 am". */
  time: string
  /** A candidate quick reply ("Interested", "Call me"), shown as a chip. */
  quickReply?: boolean
  /** Recruiter messages: the candidate has read it. */
  read?: boolean
  /** A photo sent in the message, shown above the text. */
  image?: { src: string; alt: string; width: number; height: number }
}

export interface ChatJob {
  id: string
  title: string
  tier: JobTier
  area: string
  city: string
  /** The paid AI screening add-on (not on Classic). */
  aiAddOn: boolean
}

export interface CandidateProfile {
  location: string
  experience: string
  education: string
  languages: string[]
  skills: string[]
  currentSalary?: string
  expectedSalary?: string
  availability: string
  /** Shown instead of the number: calls are masked (PRD FR-10). */
  phoneMasked: string
}

export type MatchLevel = "high" | "medium" | "low"

export const MATCH_LABEL: Record<MatchLevel, string> = {
  high: "High match",
  medium: "Medium match",
  low: "Low match",
}

export interface JobMatch {
  level: MatchLevel
  /** 0 to 100. */
  score: number
  /** Why a good match, tied to the job's must-haves. */
  strengths: string[]
  /** Why not. */
  gaps: string[]
}

export interface ChatNote {
  id: string
  text: string
  /** As shown: "Today, 11:05 am". */
  at: string
}

export interface ChatThread {
  id: string
  job: ChatJob
  candidate: { name: string; initial: string; meta: string; photo?: string }
  status: ThreadStatus
  closedReason?: ClosedReason
  /** Relative, as shown in the inbox: "2m". */
  lastAt: string
  unread: boolean
  /** Urgent threads: the AI's summary of the candidate's replies (FR-6). */
  summary?: string
  /** Urgent threads: replies the recruiter can send with one tap. */
  suggestedReplies?: string[]
  messages: ChatMessage[]
  /** The candidate's profile, for the profile panel beside the thread. */
  profile: CandidateProfile
  /** How well the candidate fits this job, and why. */
  match: JobMatch
  /** The resume is behind a database credit until the recruiter unlocks it. */
  resumeUnlocked: boolean
  /** The recruiter's private notes on this candidate, newest first. */
  notes: ChatNote[]
}

export const RECRUITER_NAME = "Alok Singh"

export const AI_NAME = "Apna Assistant"

/** Every AI message starts with this label (PRD guardrails). */
export const AI_LABEL = `${AI_NAME} for ${RECRUITER_NAME}, ${COMPANY_NAME}`

/** Shown in every thread (PRD guardrails). */
export const MONEY_WARNING = "Apna never asks for money. Report any request for payment."

/** Candidate quick replies (FR-4). */
export const QUICK_REPLIES = ["Interested", "Not interested", "Call me"] as const

const DELIVERY: ChatJob = {
  id: "delivery-andheri",
  title: "Delivery Executive",
  tier: "super-premium",
  area: "Andheri East",
  city: "Mumbai",
  aiAddOn: false,
}

const TELECALLER: ChatJob = {
  id: "telecaller-koramangala",
  title: "Telecaller",
  tier: "premium",
  area: "Koramangala",
  city: "Bengaluru",
  aiAddOn: true,
}

const BACK_OFFICE: ChatJob = {
  id: "back-office-pune",
  title: "Back Office Executive",
  tier: "classic",
  area: "Hinjewadi",
  city: "Pune",
  aiAddOn: false,
}

type ThreadBase = Omit<ChatThread, "profile" | "match" | "resumeUnlocked" | "notes">

const BASE_THREADS: ThreadBase[] = [
  {
    id: "t-ravi",
    job: DELIVERY,
    candidate: { name: "Ravi Kumar", initial: "R", meta: "M, 24 yrs · 2 yrs experience", photo: "/images/chats/ravi-kumar.jpg" },
    status: "urgent",
    lastAt: "2m",
    unread: true,
    summary: "Ravi is interested. He has a bike (he sent a photo) and a driving licence and asks about the petrol allowance.",
    suggestedReplies: ["Yes, we pay ₹2,000 each month for petrol.", "Can you come for an interview tomorrow?"],
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Ravi, thanks for applying for Delivery Executive in Andheri East. The salary is ₹18,000 to ₹22,000 each month. Are you interested? Do you have a bike and a driving licence?",
        time: "10:31 am",
      },
      { id: "m2", from: "candidate", text: "Interested", time: "10:40 am", quickReply: true },
      { id: "m3", from: "candidate", text: "Yes, I have both. Is there a petrol allowance?", time: "10:41 am" },
      {
        id: "m3b",
        from: "candidate",
        text: "This is my bike.",
        time: "10:42 am",
        image: { src: "/images/chats/bike.jpg", alt: "Ravi's motorbike, parked on a street", width: 600, height: 900 },
      },
    ],
  },
  {
    id: "t-amit",
    job: BACK_OFFICE,
    candidate: { name: "Amit Patil", initial: "A", meta: "M, 27 yrs · 3 yrs experience", photo: "/images/chats/amit-patil.jpg" },
    status: "urgent",
    lastAt: "18m",
    unread: true,
    summary: "Amit wants a call. He has done data entry for 3 years.",
    suggestedReplies: ["I will call you at 4 pm today.", "What time can I call you?"],
    messages: [
      {
        id: "m1",
        from: "recruiter",
        text: "Hi Amit, thanks for applying for Back Office Executive in Hinjewadi. Can you tell me about your data entry experience?",
        time: "9:15 am",
        read: true,
      },
      { id: "m2", from: "candidate", text: "Call me", time: "10:24 am", quickReply: true },
    ],
  },
  {
    id: "t-sana",
    job: TELECALLER,
    candidate: { name: "Sana Mirza", initial: "S", meta: "F, 22 yrs · Fresher", photo: "/images/chats/sana-mirza.jpg" },
    status: "ai-screening",
    lastAt: "35m",
    unread: false,
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Sana, thanks for applying for Telecaller in Koramangala. The shift is 9 am to 6 pm. Are you interested? Can you speak Kannada and English?",
        time: "9:02 am",
      },
      { id: "m2", from: "candidate", text: "Interested", time: "9:20 am", quickReply: true },
      { id: "m3", from: "candidate", text: "I speak Kannada, English and Hindi.", time: "9:21 am" },
      {
        id: "m4",
        from: "ai",
        text: "Thank you. When can you start? And are you comfortable with a target of 80 calls each day?",
        time: "9:21 am",
      },
    ],
  },
  {
    id: "t-meera",
    job: TELECALLER,
    candidate: { name: "Meera Nair", initial: "M", meta: "F, 25 yrs · 1 yr experience", photo: "/images/chats/meera-nair.jpg" },
    status: "shortlisted",
    lastAt: "1h",
    unread: true,
    summary: "Good fit. Meera speaks Kannada and English, can start on Monday and has done sales calls for a year.",
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Meera, thanks for applying for Telecaller in Koramangala. The shift is 9 am to 6 pm. Are you interested? Can you speak Kannada and English?",
        time: "8:10 am",
      },
      { id: "m2", from: "candidate", text: "Yes, I speak both. I did sales calls for one year.", time: "8:30 am" },
      { id: "m3", from: "ai", text: "Thank you. When can you start?", time: "8:30 am" },
      { id: "m4", from: "candidate", text: "From Monday.", time: "8:44 am" },
    ],
  },
  {
    id: "t-kiran",
    job: DELIVERY,
    candidate: { name: "Kiran Shinde", initial: "K", meta: "M, 29 yrs · 4 yrs experience", photo: "/images/chats/kiran-shinde.jpg" },
    status: "interview",
    lastAt: "Yesterday",
    unread: false,
    messages: [
      { id: "m1", from: "candidate", text: "Interested", time: "Yesterday", quickReply: true },
      {
        id: "m2",
        from: "recruiter",
        text: "Thanks Kiran. Please come for an interview on Thursday at 11 am.",
        time: "Yesterday",
        read: true,
      },
      { id: "m3", from: "candidate", text: "Okay sir, I will come.", time: "Yesterday" },
    ],
  },
  {
    id: "t-imran",
    job: BACK_OFFICE,
    candidate: { name: "Imran Shaikh", initial: "I", meta: "M, 31 yrs · 6 yrs experience", photo: "/images/chats/imran-shaikh.jpg" },
    status: "closed",
    closedReason: "not-interested",
    lastAt: "Mon",
    unread: false,
    messages: [
      {
        id: "m1",
        from: "recruiter",
        text: "Hi Imran, thanks for applying for Back Office Executive in Hinjewadi. Are you available for an interview this week?",
        time: "Mon",
        read: true,
      },
      { id: "m2", from: "candidate", text: "Not interested", time: "Mon", quickReply: true },
    ],
  },
  {
    id: "t-pooja",
    job: TELECALLER,
    candidate: { name: "Pooja Rao", initial: "P", meta: "F, 23 yrs · Fresher", photo: "/images/chats/pooja-rao.jpg" },
    status: "closed",
    closedReason: "no-reply",
    lastAt: "Sun",
    unread: false,
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Pooja, thanks for applying for Telecaller in Koramangala. The shift is 9 am to 6 pm. Are you interested?",
        time: "Fri",
      },
      { id: "m2", from: "ai", text: "Hi Pooja, are you still interested in the Telecaller job?", time: "Sat" },
      { id: "m3", from: "ai", text: "Hi Pooja, this is the last message about the Telecaller job. Reply any time.", time: "Sun" },
    ],
  },
]

type ThreadDetails = Pick<ChatThread, "profile" | "match" | "resumeUnlocked" | "notes">

/** Profile, match and notes for each thread's candidate, by thread id. */
const DETAILS: Record<string, ThreadDetails> = {
  "t-ravi": {
    profile: {
      location: "Andheri West, Mumbai",
      experience: "2 yrs as a delivery partner",
      education: "12th pass",
      languages: ["Hindi", "Marathi"],
      skills: ["Two-wheeler", "Driving licence", "Route knowledge", "Cash handling"],
      currentSalary: "₹16,000 a month",
      expectedSalary: "₹20,000 a month",
      availability: "Can start in 1 week",
      phoneMasked: "+91 ••••• ••321",
    },
    match: {
      level: "high",
      score: 92,
      strengths: [
        "Has his own bike and a driving licence",
        "2 yrs of delivery work",
        "Lives 3 km from Andheri East",
        "Expected salary is inside the range",
      ],
      gaps: ["Asks for a petrol allowance"],
    },
    resumeUnlocked: false,
    notes: [],
  },
  "t-amit": {
    profile: {
      location: "Wakad, Pune",
      experience: "3 yrs in data entry",
      education: "B.Com",
      languages: ["Hindi", "Marathi", "English"],
      skills: ["Data entry", "MS Excel", "Typing 40 wpm"],
      currentSalary: "₹17,000 a month",
      expectedSalary: "₹21,000 a month",
      availability: "Notice period of 30 days",
      phoneMasked: "+91 ••••• ••874",
    },
    match: {
      level: "medium",
      score: 68,
      strengths: ["3 yrs of data entry", "Knows MS Excel", "Lives 8 km from Hinjewadi"],
      gaps: ["Notice period of 30 days", "Expected salary is above the range", "No tally experience"],
    },
    resumeUnlocked: true,
    notes: [{ id: "n1", text: "Asked for a call after 4 pm. Check the notice period.", at: "Today, 10:30 am" }],
  },
  "t-sana": {
    profile: {
      location: "HSR Layout, Bengaluru",
      experience: "Fresher",
      education: "B.A.",
      languages: ["Kannada", "English", "Hindi"],
      skills: ["Communication", "Kannada and English", "Typing"],
      expectedSalary: "₹15,000 a month",
      availability: "Not confirmed yet",
      phoneMasked: "+91 ••••• ••540",
    },
    match: {
      level: "medium",
      score: 64,
      strengths: ["Speaks Kannada and English", "Lives 5 km from Koramangala"],
      gaps: ["No calling experience", "Start date not confirmed", "Target of 80 calls not confirmed"],
    },
    resumeUnlocked: false,
    notes: [],
  },
  "t-meera": {
    profile: {
      location: "BTM Layout, Bengaluru",
      experience: "1 yr in sales calling",
      education: "B.Com",
      languages: ["Kannada", "English", "Malayalam"],
      skills: ["Sales calling", "Lead follow-up", "CRM basics"],
      currentSalary: "₹14,000 a month",
      expectedSalary: "₹17,000 a month",
      availability: "Can start on Monday",
      phoneMasked: "+91 ••••• ••295",
    },
    match: {
      level: "high",
      score: 88,
      strengths: [
        "Speaks Kannada and English",
        "1 yr of sales calling",
        "Can start on Monday",
        "Lives 4 km from Koramangala",
      ],
      gaps: ["Only 1 yr of experience"],
    },
    resumeUnlocked: false,
    notes: [],
  },
  "t-kiran": {
    profile: {
      location: "Powai, Mumbai",
      experience: "4 yrs as a delivery partner",
      education: "10th pass",
      languages: ["Hindi", "Marathi"],
      skills: ["Two-wheeler", "Driving licence", "Route knowledge"],
      currentSalary: "₹19,000 a month",
      expectedSalary: "₹22,000 a month",
      availability: "Can start in 2 weeks",
      phoneMasked: "+91 ••••• ••118",
    },
    match: {
      level: "high",
      score: 85,
      strengths: ["4 yrs of delivery work", "Has a bike and a driving licence", "Expected salary is inside the range"],
      gaps: ["Lives 12 km from Andheri East", "Can start in 2 weeks"],
    },
    resumeUnlocked: true,
    notes: [],
  },
  "t-imran": {
    profile: {
      location: "Kharadi, Pune",
      experience: "6 yrs in back office work",
      education: "B.Com",
      languages: ["Hindi", "English", "Urdu"],
      skills: ["Data entry", "MS Excel", "Tally", "Billing"],
      currentSalary: "₹24,000 a month",
      expectedSalary: "₹30,000 a month",
      availability: "Notice period of 60 days",
      phoneMasked: "+91 ••••• ••762",
    },
    match: {
      level: "low",
      score: 38,
      strengths: ["6 yrs of back office work", "Knows MS Excel and Tally"],
      gaps: [
        "Expected salary is ₹30,000, above the range",
        "Notice period of 60 days",
        "Lives 22 km from Hinjewadi",
        "Said he is not interested",
      ],
    },
    resumeUnlocked: false,
    notes: [],
  },
  "t-pooja": {
    profile: {
      location: "Whitefield, Bengaluru",
      experience: "Fresher",
      education: "12th pass",
      languages: ["Kannada", "Hindi"],
      skills: ["Communication"],
      expectedSalary: "₹14,000 a month",
      availability: "Not confirmed yet",
      phoneMasked: "+91 ••••• ••609",
    },
    match: {
      level: "low",
      score: 35,
      strengths: ["Speaks Kannada"],
      gaps: ["Does not speak English", "No calling experience", "Lives 18 km from Koramangala", "No reply to 3 messages"],
    },
    resumeUnlocked: false,
    notes: [],
  },
}

export const MOCK_THREADS: ChatThread[] = BASE_THREADS.map((t) => ({ ...t, ...DETAILS[t.id] }))
