/**
 * Apna Chat — mock threads for the recruiter inbox (phone tab
 * /apnahire/chats, desktop sidebar). Scripted prototype text, shaped by the
 * Apna Chat MVP PRD (2026-11-04): one thread for each job and candidate, AI
 * openers on Premium, Super premium and subscription jobs, "Urgent: needs
 * reply" when a candidate answers on a job without the AI add-on.
 * Replace with the API when it exists.
 */

import { COMPANY_NAME } from "@/lib/apnahire/job-draft"
import { generateThreads } from "@/content/chats-generated"

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

/** A candidate who can't be reached: "deleted" (account deleted) or "blocked" (the candidate blocked this
 *  recruiter). The PRD's words for a deleted account are "Candidate not available". For a block the copy stays
 *  neutral ("Chat not available"): it does not tell the recruiter who blocked whom. History stays readable;
 *  messages and calls stop. */
export type Unavailable = "deleted" | "blocked"

export const UNAVAILABLE_COPY: Record<Unavailable, { preview: string; notice: string; reason: string }> = {
  deleted: {
    preview: "Candidate not available",
    notice: "This candidate deleted their account. You can't send messages.",
    reason: "This candidate deleted their account.",
  },
  blocked: {
    preview: "Chat not available",
    notice: "This chat is not available. You can't send messages.",
    reason: "This chat is not available.",
  },
}

/** Shown on a job that expired (PRD): the thread stays open, the AI sends nothing new. */
export const EXPIRED_NOTICE =
  "This job expired. You can still reply. Apna Assistant sends no new messages."

export type Sender = "ai" | "recruiter" | "candidate"

/** Delivery state of a recruiter or AI message (WhatsApp's clock, one tick,
 *  two ticks, two blue ticks). Candidate messages have none. */
export type MessageStatus = "sending" | "sent" | "delivered" | "read"

export interface ChatMessage {
  id: string
  from: Sender
  text: string
  /** The day it was sent, as the divider shows it: "Today", "Yesterday", a
   *  weekday ("Mon") or a date ("2 Nov"). The prototype's today is Wednesday
   *  4 Nov. */
  day: string
  /** The clock time, as shown: "10:42 am". */
  time: string
  /** A candidate quick reply ("Interested", "Call me"), shown as a chip. */
  quickReply?: boolean
  /** Recruiter and AI messages only: where it is on its way to the candidate. */
  status?: MessageStatus
  /** A photo sent in the message, shown above the text. */
  image?: { src: string; alt: string; width: number; height: number }
  /** Files the recruiter attached (images included) in this message, sent with the text as the caption.
   *  Images the recruiter picks are kept here (not in `image`, which is for the mock photos): an image with a
   *  `url` shows as media, any other file as a ChatFileCard. Prototype: nothing is uploaded; `url` is a
   *  browser object URL that lives until the page closes. */
  files?: ChatFile[]
}

/** A file attached to a message. `size` is in bytes, `type` the MIME type. */
export interface ChatFile {
  name: string
  size: number
  type: string
  url?: string
}

/** Attachment limits (the recruiter's side; nothing is uploaded in the prototype). */
export const MAX_FILE_BYTES = 25 * 1024 * 1024
export const MAX_FILES_PER_MESSAGE = 10

export interface ChatJob {
  id: string
  title: string
  tier: JobTier
  area: string
  city: string
  /** The paid AI screening add-on (not on Classic). */
  aiAddOn: boolean
  /** The job has expired: threads stay open, the AI sends nothing new. */
  expired?: boolean
}

export interface CandidateProfile {
  location: string
  experience: string
  /** Latest role: "Back office executive · Infosys BPM · Jan 2023 – now". */
  current?: string
  /** Last seen on apna: "today", "2 days ago". */
  activeAgo?: string
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
  candidate: {
    name: string
    initial: string
    meta: string
    photo?: string
    /** "deleted": account deleted (Candidate not available). "blocked": the candidate blocked the recruiter. */
    availability?: Unavailable
  }
  status: ThreadStatus
  closedReason?: ClosedReason
  /** The status before the recruiter closed the thread: "Reopen chat" goes back to it. */
  statusBeforeClose?: Exclude<ThreadStatus, "closed">
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
  /** "application": the candidate applied (the default). "database": the recruiter found the profile and wrote
   *  first; there is no AI opener. */
  source?: "application" | "database"
  /** A closed thread the candidate wrote to again: it is urgent. */
  reopened?: boolean
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
    unread: true,
    summary: "Ravi is interested. He has a bike (he sent a photo) and a driving licence and asks about the petrol allowance.",
    suggestedReplies: ["Yes, we pay ₹2,000 each month for petrol.", "Can you come for an interview tomorrow?"],
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Ravi, thanks for applying for Delivery Executive in Andheri East. The salary is ₹18,000 to ₹22,000 each month. Are you interested? Do you have a bike and a driving licence?",
        day: "Today",
        time: "10:31 am",
        status: "read",
      },
      { id: "m2", from: "candidate", text: "Interested", day: "Today", time: "10:40 am", quickReply: true },
      { id: "m3", from: "candidate", text: "Yes, I have both. Is there a petrol allowance?", day: "Today", time: "10:41 am" },
      {
        id: "m3b",
        from: "candidate",
        text: "This is my bike.",
        day: "Today",
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
    unread: true,
    summary: "Amit wants a call. He has done data entry for 3 years.",
    suggestedReplies: ["I will call you at 4 pm today.", "What time can I call you?"],
    messages: [
      {
        id: "m1",
        from: "recruiter",
        text: "Hi Amit, thanks for applying for Back Office Executive in Hinjewadi. Can you tell me about your data entry experience?",
        day: "Today",
        time: "9:15 am",
        status: "read",
      },
      { id: "m2", from: "candidate", text: "Call me", day: "Today", time: "10:26 am", quickReply: true },
    ],
  },
  {
    id: "t-sana",
    job: TELECALLER,
    candidate: { name: "Sana Mirza", initial: "S", meta: "F, 22 yrs · Fresher", photo: "/images/chats/sana-mirza.jpg" },
    status: "ai-screening",
    unread: false,
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Sana, thanks for applying for Telecaller in Koramangala. The shift is 9 am to 6 pm. Are you interested? Can you speak Kannada and English?",
        day: "Today",
        time: "9:30 am",
        status: "read",
      },
      { id: "m2", from: "candidate", text: "Interested", day: "Today", time: "9:58 am", quickReply: true },
      { id: "m3", from: "candidate", text: "I speak Kannada, English and Hindi.", day: "Today", time: "10:08 am" },
      {
        id: "m4",
        from: "ai",
        text: "Thank you. When can you start? And are you comfortable with a target of 80 calls each day?",
        day: "Today",
        time: "10:09 am",
        status: "delivered",
      },
    ],
  },
  {
    id: "t-meera",
    job: TELECALLER,
    candidate: { name: "Meera Nair", initial: "M", meta: "F, 25 yrs · 1 yr experience", photo: "/images/chats/meera-nair.jpg" },
    status: "shortlisted",
    unread: true,
    summary: "Good fit. Meera speaks Kannada and English, can start on Monday and has done sales calls for a year.",
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Meera, thanks for applying for Telecaller in Koramangala. The shift is 9 am to 6 pm. Are you interested? Can you speak Kannada and English?",
        day: "Today",
        time: "8:10 am",
        status: "read",
      },
      { id: "m2", from: "candidate", text: "Yes, I speak both. I did sales calls for one year.", day: "Today", time: "8:30 am" },
      { id: "m3", from: "ai", text: "Thank you. When can you start?", day: "Today", time: "8:31 am", status: "read" },
      { id: "m4", from: "candidate", text: "From Monday.", day: "Today", time: "9:44 am" },
    ],
  },
  {
    id: "t-kiran",
    job: DELIVERY,
    candidate: { name: "Kiran Shinde", initial: "K", meta: "M, 29 yrs · 4 yrs experience", photo: "/images/chats/kiran-shinde.jpg" },
    status: "interview",
    unread: false,
    messages: [
      { id: "m1", from: "candidate", text: "Interested", day: "Yesterday", time: "4:10 pm", quickReply: true },
      {
        id: "m2",
        from: "recruiter",
        text: "Thanks Kiran. Please come for an interview on Thursday at 11 am.",
        day: "Yesterday",
        time: "4:25 pm",
        status: "read",
      },
      { id: "m3", from: "candidate", text: "Okay sir, I will come.", day: "Yesterday", time: "4:31 pm" },
    ],
  },
  {
    id: "t-imran",
    job: BACK_OFFICE,
    candidate: { name: "Imran Shaikh", initial: "I", meta: "M, 31 yrs · 6 yrs experience", photo: "/images/chats/imran-shaikh.jpg" },
    status: "closed",
    closedReason: "not-interested",
    unread: false,
    messages: [
      {
        id: "m1",
        from: "recruiter",
        text: "Hi Imran, thanks for applying for Back Office Executive in Hinjewadi. Are you available for an interview this week?",
        day: "Mon",
        time: "11:05 am",
        status: "read",
      },
      { id: "m2", from: "candidate", text: "Not interested", day: "Mon", time: "2:40 pm", quickReply: true },
    ],
  },
  {
    id: "t-pooja",
    job: TELECALLER,
    candidate: { name: "Pooja Rao", initial: "P", meta: "F, 23 yrs · Fresher", photo: "/images/chats/pooja-rao.jpg" },
    status: "closed",
    closedReason: "no-reply",
    unread: false,
    messages: [
      {
        id: "m1",
        from: "ai",
        text: "Hi Pooja, thanks for applying for Telecaller in Koramangala. The shift is 9 am to 6 pm. Are you interested?",
        day: "Fri",
        time: "10:00 am",
        status: "read",
      },
      {
        id: "m2",
        from: "ai",
        text: "Hi Pooja, are you still interested in the Telecaller job?",
        day: "Sat",
        time: "10:00 am",
        status: "read",
      },
      {
        id: "m3",
        from: "ai",
        text: "Hi Pooja, this is the last message about the Telecaller job. Reply any time.",
        day: "Sun",
        time: "10:00 am",
        status: "delivered",
      },
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

const HAND_WRITTEN_THREADS: ChatThread[] = BASE_THREADS.map((t) => ({ ...t, ...DETAILS[t.id] }))

/** The 7 hand-written threads, then the generated ones (see chats-generated.ts). */
export const MOCK_THREADS: ChatThread[] = [
  ...HAND_WRITTEN_THREADS,
  ...generateThreads([DELIVERY, TELECALLER, BACK_OFFICE], AI_MESSAGE_LIMIT),
]

/** The groups of canned responses, in picker order. "Mine" holds the ones the recruiter saved. */
export const TEMPLATE_GROUPS = ["Greeting", "Interview", "Follow-up", "Closing", "Mine"] as const
export type TemplateGroup = (typeof TEMPLATE_GROUPS)[number]

export interface ChatTemplate {
  id: string
  group: TemplateGroup
  /** The short name in the picker. */
  label: string
  /** The message. Placeholders: {name} (candidate first name), {job}, {company}, {area}. */
  text: string
}

/** Canned responses (PRD FR-3 "Templates"). None asks for documents: that is out of the MVP (PRD). */
export const TEMPLATES: ChatTemplate[] = [
  {
    id: "greet-intro",
    group: "Greeting",
    label: "Say hello",
    text: "Hi {name}, this is " + RECRUITER_NAME + " from {company}. Thank you for applying for {job}.",
  },
  {
    id: "greet-role",
    group: "Greeting",
    label: "About the role",
    text: "Hi {name}, we have an opening for {job} in {area}. Are you still looking for work?",
  },
  {
    id: "int-invite",
    group: "Interview",
    label: "Invite to interview",
    text: "Hi {name}, we would like to meet you for {job}. Can you come to our office in {area} this week?",
  },
  {
    id: "int-time",
    group: "Interview",
    label: "Ask for a time",
    text: "Which day and time suit you best for the interview? We are free from 10 am to 5 pm.",
  },
  {
    id: "int-confirm",
    group: "Interview",
    label: "Confirm the slot",
    text: "Your interview for {job} is confirmed. We will see you at {company}, {area}. Please reply to confirm.",
  },
  {
    id: "follow-nudge",
    group: "Follow-up",
    label: "Nudge for a reply",
    text: "Hi {name}, just checking in. Are you still interested in the {job} role at {company}?",
  },
  {
    id: "follow-call",
    group: "Follow-up",
    label: "Ask for a call",
    text: "Hi {name}, when can we call you to talk about {job}? A time today or tomorrow works.",
  },
  {
    id: "close-thanks",
    group: "Closing",
    label: "Thank and close",
    text: "Thank you for your time, {name}. We will get back to you soon about {job}.",
  },
  {
    id: "close-nofit",
    group: "Closing",
    label: "Not a fit",
    text: "Thank you for your interest, {name}. We will not move ahead for {job} this time. We wish you the best.",
  },
]

/** What a thread fills into a template. */
export interface TemplateContext {
  name: string
  job: string
  company: string
  area: string
}

/** Fills {name} {job} {company} {area} in a template for one thread. Unknown placeholders stay as written. */
export function fillTemplate(text: string, ctx: TemplateContext) {
  return text.replace(/\{(name|job|company|area)\}/g, (_, key: keyof TemplateContext) => ctx[key])
}
