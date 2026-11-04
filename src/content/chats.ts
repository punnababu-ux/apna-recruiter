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

export interface ChatThread {
  id: string
  job: ChatJob
  candidate: { name: string; initial: string; meta: string }
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

export const MOCK_THREADS: ChatThread[] = [
  {
    id: "t-ravi",
    job: DELIVERY,
    candidate: { name: "Ravi Kumar", initial: "R", meta: "M, 24 yrs · 2 yrs experience" },
    status: "urgent",
    lastAt: "2m",
    unread: true,
    summary: "Ravi is interested. He has a bike and a driving licence and asks about the petrol allowance.",
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
    ],
  },
  {
    id: "t-amit",
    job: BACK_OFFICE,
    candidate: { name: "Amit Patil", initial: "A", meta: "M, 27 yrs · 3 yrs experience" },
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
    candidate: { name: "Sana Mirza", initial: "S", meta: "F, 22 yrs · Fresher" },
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
    candidate: { name: "Meera Nair", initial: "M", meta: "F, 25 yrs · 1 yr experience" },
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
    candidate: { name: "Kiran Shinde", initial: "K", meta: "M, 29 yrs · 4 yrs experience" },
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
    candidate: { name: "Imran Shaikh", initial: "I", meta: "M, 31 yrs · 6 yrs experience" },
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
    candidate: { name: "Pooja Rao", initial: "P", meta: "F, 23 yrs · Fresher" },
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
