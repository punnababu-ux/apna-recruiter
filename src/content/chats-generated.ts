/**
 * Apna Chat — generated mock threads, to test the inbox and thread screens at
 * volume (300 threads instead of 7). A seeded generator (mulberry32, fixed
 * seed; no Math.random, no Date.now), so the server and the client render the
 * same list. The prototype's "now" is Wednesday 4 Nov, 11:20 am.
 *
 * It follows the Apna Chat MVP PRD: one thread for each job and candidate; AI
 * openers and daily follow-ups only on Premium, Super premium and
 * subscription jobs (3 AI messages for each candidate, 5 on Super premium,
 * none on Classic, where the recruiter sends a template); the limit reached
 * with no reply closes the thread as "No reply"; a candidate reply on a job
 * without the AI add-on is "urgent", with the add-on it is "ai-screening",
 * then "shortlisted"; the AI never rejects; Database profiles with no
 * application get a recruiter message only, never an AI opener.
 *
 * Edge cases, by thread id (also exported as EDGE_CASE_IDS):
 *   deleted account            g-edge-deleted
 *   blocked the recruiter      g-edge-blocked
 *   reopened after close       g-edge-reopened-not-interested, g-edge-reopened-no-reply
 *   AI limit 5 -> no reply     g-edge-limit-5 (Super premium)
 *   job expired mid-chat       g-edge-expired
 *   same candidate, two jobs   g-pair-1-a / g-pair-1-b (and g-pair-2 to g-pair-6)
 *   Database, recruiter first  g-edge-database
 *   very long name (40+)       g-edge-long-name-1, g-edge-long-name-2
 *   very long message (600+)   g-edge-long-message
 *   Hindi (Devanagari)         g-edge-hindi
 *   Hinglish                   g-edge-hinglish
 *   emoji                      g-edge-emoji
 *   "Call me" quick reply      g-edge-call-me
 *   60+ messages, many days    g-edge-long-thread
 *   a single message           g-edge-single
 *   recruiter "sending"        g-edge-sending
 *   recruiter "sent"           g-edge-sent
 *   duplicate first names      g-edge-dup-1, g-edge-dup-2, g-edge-dup-3 (two are "Rahul Verma")
 *   12, 27 and 163 unread      g-edge-unread-12, g-edge-unread-27, g-edge-unread-163
 *
 * chats.ts calls generateThreads with its own jobs and AI limits, so this file
 * only imports types from it (no import cycle).
 */

import type {
  ChatJob,
  ChatMessage,
  ChatNote,
  ChatThread,
  ClosedReason,
  JobMatch,
  JobTier,
  MessageStatus,
  Sender,
  ThreadStatus,
} from "@/content/chats"

export const GENERATED_COUNT = 300

/** Thread ids of the edge cases, by name (see the list above). */
export const EDGE_CASE_IDS: Record<string, string[]> = {
  deleted: ["g-edge-deleted"],
  blocked: ["g-edge-blocked"],
  reopened: ["g-edge-reopened-not-interested", "g-edge-reopened-no-reply"],
  limit5: ["g-edge-limit-5"],
  expired: ["g-edge-expired"],
  twoJobs: ["g-pair-1-a", "g-pair-1-b"],
  database: ["g-edge-database"],
  longName: ["g-edge-long-name-1", "g-edge-long-name-2"],
  longMessage: ["g-edge-long-message"],
  hindi: ["g-edge-hindi"],
  hinglish: ["g-edge-hinglish"],
  emoji: ["g-edge-emoji"],
  callMe: ["g-edge-call-me"],
  longThread: ["g-edge-long-thread"],
  single: ["g-edge-single"],
  sending: ["g-edge-sending"],
  sent: ["g-edge-sent"],
  duplicateFirstNames: ["g-edge-dup-1", "g-edge-dup-2", "g-edge-dup-3"],
  unread: ["g-edge-unread-12", "g-edge-unread-27", "g-edge-unread-163"],
}

const SEED = 20261104
const RECRUITER_FIRST = "Alok"

// ---------------------------------------------------------------------------
// Random numbers and time
// ---------------------------------------------------------------------------

function makeRng(seed: number) {
  let a = seed >>> 0
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const int = (lo: number, hi: number) => lo + Math.floor(next() * (hi - lo + 1))
  const chance = (p: number) => next() < p
  const pick = <T>(items: readonly T[]): T => items[Math.floor(next() * items.length)]
  const weighted = <T>(items: readonly (readonly [T, number])[]): T => {
    const total = items.reduce((sum, [, w]) => sum + w, 0)
    let r = next() * total
    for (const [item, w] of items) {
      r -= w
      if (r < 0) return item
    }
    return items[items.length - 1][0]
  }
  const shuffle = <T>(items: readonly T[]): T[] => {
    const out = [...items]
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1))
      ;[out[i], out[j]] = [out[j], out[i]]
    }
    return out
  }
  return { next, int, chance, pick, weighted, shuffle }
}
type Rng = ReturnType<typeof makeRng>

const DAY = 1440
/** "Now" as minutes after midnight: 11:20 am. Times are minutes from today's midnight (negative: earlier days). */
const NOW = 11 * 60 + 20
/** The job that expired mid-chat expired here: no AI message after it. */
const EXPIRY = -4 * DAY + 10 * 60
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** The divider text for a day offset: Today, Yesterday, a weekday (to 6 days), else a date. Today is Wed 4 Nov. */
function dayLabel(d: number) {
  if (d <= 0) return "Today"
  if (d === 1) return "Yesterday"
  if (d <= 6) return WEEKDAYS[(3 - d + 7) % 7]
  const date = new Date(Date.UTC(2026, 10, 4 - d))
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`
}

function parts(abs: number) {
  const d = Math.max(0, Math.ceil(-abs / DAY))
  return { d, tod: abs + d * DAY }
}

function clock(tod: number) {
  const h = Math.floor(tod / 60)
  return `${h % 12 || 12}:${String(tod % 60).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`
}

/** Keeps a message in waking hours by moving it earlier (never later, so the order holds). */
function daytime(rng: Rng, abs: number) {
  const { tod } = parts(abs)
  const dayStart = abs - tod
  if (tod > 22 * 60 + 30) return dayStart + 21 * 60 + rng.int(0, 50)
  if (tod < 7 * 60) return dayStart - DAY + 20 * 60 + rng.int(0, 59)
  return abs
}

function money(n: number) {
  return `₹${Math.floor(n / 1000)},${String(n % 1000).padStart(3, "0")}`
}

// ---------------------------------------------------------------------------
// Names
// ---------------------------------------------------------------------------

type Region =
  | "hindi"
  | "marathi"
  | "gujarati"
  | "muslim"
  | "kannada"
  | "tamil"
  | "telugu"
  | "malayali"
  | "bengali"
  | "punjabi"

const NAMES: Record<Region, { lang: string; m: string[]; f: string[]; last: string[] }> = {
  hindi: {
    lang: "Hindi",
    m: ["Rahul", "Amit", "Sandeep", "Vikas", "Rohit", "Manoj", "Deepak", "Sunil", "Ajay", "Pankaj", "Rakesh", "Suresh"],
    f: ["Priya", "Neha", "Pooja", "Sunita", "Anita", "Kavita", "Rekha", "Seema", "Ritu", "Komal", "Anjali"],
    last: ["Kumar", "Sharma", "Verma", "Yadav", "Singh", "Gupta", "Mishra", "Pandey", "Tiwari", "Chauhan", "Jha"],
  },
  marathi: {
    lang: "Marathi",
    m: ["Sachin", "Nitin", "Prashant", "Ganesh", "Santosh", "Swapnil", "Omkar", "Rahul", "Amit", "Kiran", "Mahesh"],
    f: ["Sneha", "Pallavi", "Snehal", "Rutuja", "Shital", "Pooja", "Madhuri", "Vaishali", "Priyanka"],
    last: ["Patil", "Shinde", "Jadhav", "Pawar", "More", "Kale", "Gaikwad", "Kulkarni", "Deshmukh", "Sawant", "Bhosale"],
  },
  gujarati: {
    lang: "Gujarati",
    m: ["Hardik", "Jignesh", "Bhavesh", "Kalpesh", "Chirag", "Dhruv", "Nilesh", "Mehul"],
    f: ["Hetal", "Khushbu", "Bhumika", "Jinal", "Dipti", "Nisha"],
    last: ["Patel", "Shah", "Mehta", "Desai", "Joshi", "Parmar", "Solanki", "Trivedi", "Thakkar"],
  },
  muslim: {
    lang: "Urdu",
    m: ["Imran", "Faizan", "Salman", "Arif", "Irfan", "Zaid", "Mohammad Asif", "Shahid", "Aamir", "Rizwan"],
    f: ["Sana", "Farheen", "Ayesha", "Nazia", "Rukhsar", "Shabana", "Zoya"],
    last: ["Shaikh", "Ansari", "Khan", "Qureshi", "Siddiqui", "Mirza", "Sayyed", "Pathan", "Mansuri"],
  },
  kannada: {
    lang: "Kannada",
    m: ["Manjunath", "Girish", "Naveen", "Pradeep", "Harish", "Suresh", "Basavaraj", "Mahesh", "Kiran"],
    f: ["Divya", "Shruthi", "Lakshmi", "Pooja", "Ramya", "Chaitra", "Nandini", "Deepa"],
    last: ["Gowda", "Reddy", "Shetty", "Hegde", "Naik", "Rao", "Kumar", "Bhat", "Murthy", "Patil"],
  },
  tamil: {
    lang: "Tamil",
    m: ["Karthik", "Senthil", "Vignesh", "Arun", "Murugan", "Dinesh", "Prakash", "Bala", "Saravanan"],
    f: ["Lakshmi", "Revathi", "Priya", "Divya", "Meena", "Kavitha", "Anitha", "Sowmya"],
    last: ["Kumar", "Raj", "Subramanian", "Iyer", "Pillai", "Selvam", "Murugan", "Rajan", "Natarajan"],
  },
  telugu: {
    lang: "Telugu",
    m: ["Venkat", "Srinivas", "Ravi", "Naresh", "Mahesh", "Sai Kiran", "Ramesh", "Anil"],
    f: ["Swathi", "Sravani", "Bhavani", "Padma", "Sirisha", "Harini"],
    last: ["Reddy", "Naidu", "Rao", "Chowdary", "Goud", "Varma", "Raju", "Prasad"],
  },
  malayali: {
    lang: "Malayalam",
    m: ["Anil", "Sajith", "Rajesh", "Jithin", "Arun", "Biju", "Vishnu", "Abhilash"],
    f: ["Meera", "Anjana", "Athira", "Neethu", "Remya", "Sreeja", "Divya"],
    last: ["Nair", "Menon", "Pillai", "Kurian", "Thomas", "Varghese", "Panicker", "Kumar"],
  },
  bengali: {
    lang: "Bengali",
    m: ["Subhajit", "Debashish", "Sourav", "Abhijit", "Arnab", "Partha", "Tapan"],
    f: ["Moumita", "Sraboni", "Puja", "Rina", "Mitali", "Sharmistha"],
    last: ["Das", "Ghosh", "Banerjee", "Mukherjee", "Chatterjee", "Roy", "Sarkar", "Dutta", "Saha"],
  },
  punjabi: {
    lang: "Punjabi",
    m: ["Gurpreet", "Harpreet", "Jaspreet", "Manpreet", "Amandeep", "Sukhdev", "Rajinder"],
    f: ["Simran", "Harleen", "Manpreet", "Jasleen", "Navdeep", "Kiran"],
    last: ["Singh", "Gill", "Sandhu", "Bajwa", "Chopra", "Arora", "Dhillon"],
  },
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

type Question = readonly [string, readonly string[]]

interface JobSpec {
  job: ChatJob
  /** Monthly salary range. */
  pay: [number, number]
  /** Second sentence of the opener ("The shift is 9 am to 6 pm."). */
  perk: string
  /** The opener's question. */
  ask: string
  /** The AI's screening questions with likely answers (AI add-on jobs). */
  screen: Question[]
  /** Candidate answers to the opener's question. */
  answers: string[]
  /** What candidates ask the recruiter. */
  questions: string[]
  /** Experience as a noun ("delivery work") and as a phrase ("as a delivery partner"). */
  noun: string
  phrase: string
  skills: string[]
  places: string[]
  edu: string[]
  langNeeded: string[]
  regions: [Region, number][]
  /** Share of women among candidates, share of freshers, age range. */
  female: number
  fresher: number
  age: [number, number]
  venue: string
  suggest: string[]
  /** What the recruiter says a rejected candidate lacks. */
  fit: string
  /** How often the job turns up in the list. */
  weight: number
}

type JobKey =
  | "delivery"
  | "telecaller"
  | "backOffice"
  | "fieldSales"
  | "support"
  | "warehouse"
  | "cook"
  | "accountant"
  | "guard"
  | "dataEntry"

const START: Question = [
  "When can you start?",
  ["From Monday.", "Immediately.", "After 15 days, I have a notice period.", "Next week se start kar sakta hoon.", "In 1 month."],
]

function buildJobs(existing: ChatJob[]): Record<JobKey, JobSpec> {
  const find = (id: string, fallback: ChatJob) => existing.find((j) => j.id === id) ?? fallback
  const delivery = find("delivery-andheri", {
    id: "delivery-andheri",
    title: "Delivery Executive",
    tier: "super-premium",
    area: "Andheri East",
    city: "Mumbai",
    aiAddOn: false,
  })
  const telecaller = find("telecaller-koramangala", {
    id: "telecaller-koramangala",
    title: "Telecaller",
    tier: "premium",
    area: "Koramangala",
    city: "Bengaluru",
    aiAddOn: true,
  })
  const backOffice = find("back-office-pune", {
    id: "back-office-pune",
    title: "Back Office Executive",
    tier: "classic",
    area: "Hinjewadi",
    city: "Pune",
    aiAddOn: false,
  })
  const job = (id: string, title: string, tier: JobTier, area: string, city: string, aiAddOn: boolean, expired = false) =>
    ({ id, title, tier, area, city, aiAddOn, ...(expired ? { expired } : {}) }) satisfies ChatJob

  return {
    delivery: {
      job: delivery,
      pay: [18000, 22000],
      perk: "",
      ask: "Are you interested? Do you have a bike and a driving licence?",
      screen: [],
      answers: [
        "Yes, I have both.",
        "Yes sir, bike and licence both are there.",
        "Mere paas bike hai, licence bhi hai.",
        "I have a bike, my licence is being renewed.",
      ],
      questions: [
        "Is there a petrol allowance?",
        "Is it a full-time job?",
        "Is there an incentive for each delivery?",
        "Kab se join karna hai?",
        "Is there PF and insurance?",
      ],
      noun: "delivery work",
      phrase: "as a delivery partner",
      skills: ["Two-wheeler", "Driving licence", "Route knowledge", "Cash handling", "Smartphone"],
      places: ["Andheri West", "Jogeshwari", "Goregaon", "Powai", "Kurla", "Ghatkopar", "Malad", "Vile Parle", "Sakinaka"],
      edu: ["10th pass", "12th pass", "ITI"],
      langNeeded: ["Hindi"],
      regions: [["marathi", 4], ["hindi", 4], ["muslim", 2], ["gujarati", 1]],
      female: 0.06,
      fresher: 0.2,
      age: [20, 38],
      venue: "our Andheri East office",
      suggest: ["Yes, we pay ₹2,000 each month for petrol.", "Can you come for an interview tomorrow?"],
      fit: "a driving licence and a bike",
      weight: 1.6,
    },
    telecaller: {
      job: telecaller,
      pay: [15000, 18000],
      perk: "The shift is 9 am to 6 pm.",
      ask: "Are you interested? Can you speak Kannada and English?",
      screen: [
        ["Thank you. Have you worked in a calling or sales job before?", ["Yes, 1 year in sales calling.", "No, I am a fresher.", "2 years in a call centre."]],
        ["Are you comfortable with a target of 80 calls each day?", ["Yes, no problem.", "Yes sir, I can do it.", "I did 100 calls in my last job."]],
      ],
      answers: ["Yes, I speak both.", "I speak Kannada, English and Hindi.", "Kannada and Hindi only.", "Yes madam, both."],
      questions: ["Is there an incentive?", "Is it work from home?", "Is Saturday a working day?", "Salary kitni milegi?"],
      noun: "calling experience",
      phrase: "in sales calling",
      skills: ["Sales calling", "Lead follow-up", "CRM basics", "Communication", "Typing"],
      places: ["HSR Layout", "BTM Layout", "Whitefield", "Jayanagar", "Marathahalli", "Indiranagar", "Electronic City"],
      edu: ["12th pass", "B.A.", "B.Com", "B.Sc"],
      langNeeded: ["Kannada", "English"],
      regions: [["kannada", 3], ["tamil", 2], ["telugu", 2], ["malayali", 2], ["hindi", 1]],
      female: 0.6,
      fresher: 0.35,
      age: [20, 32],
      venue: "our Koramangala office",
      suggest: ["Yes, there is an incentive of up to ₹3,000.", "Can you come for an interview tomorrow?"],
      fit: "fluent English and Kannada",
      weight: 1.6,
    },
    backOffice: {
      job: backOffice,
      pay: [18000, 24000],
      perk: "",
      ask: "Can you tell me about your data entry experience?",
      screen: [],
      answers: ["I have done data entry for 2 years.", "I know MS Excel and Tally.", "I am a fresher but I type fast.", "Haan ji, 3 saal ka experience hai."],
      questions: ["Is it a desk job?", "What are the timings?", "Is there a Saturday off?", "Can I work from home?"],
      noun: "back office work",
      phrase: "in back office work",
      skills: ["Data entry", "MS Excel", "Tally", "Billing", "Typing 40 wpm"],
      places: ["Wakad", "Baner", "Kharadi", "Aundh", "Pimple Saudagar", "Hadapsar", "Kothrud"],
      edu: ["12th pass", "B.Com", "B.A.", "BBA"],
      langNeeded: ["English"],
      regions: [["marathi", 5], ["hindi", 2], ["muslim", 1], ["gujarati", 1]],
      female: 0.4,
      fresher: 0.2,
      age: [21, 36],
      venue: "our Hinjewadi office",
      suggest: ["I will call you at 4 pm today.", "What time can I call you?"],
      fit: "Tally and billing experience",
      weight: 1.2,
    },
    fieldSales: {
      job: job("field-sales-kothrud", "Field Sales Executive", "subscription", "Kothrud", "Pune", true),
      pay: [20000, 28000],
      perk: "You also get an incentive on every sale.",
      ask: "Are you interested? Do you have a two-wheeler?",
      screen: [
        ["Thank you. How long have you worked in field sales?", ["2 years in FMCG sales.", "I am a fresher but I like sales.", "3 years, insurance and bank products."]],
        ["Are you comfortable with 6 days of field work each week?", ["Yes, no problem.", "Yes sir, bas Sunday off chahiye.", "Yes, I can travel across Pune."]],
      ],
      answers: ["Yes, I have a Splendor.", "Yes sir, bike hai.", "No bike, but I can take a bus.", "Yes, two-wheeler and licence both."],
      questions: ["Is there a travel allowance?", "How much is the incentive?", "Which area will I cover?", "Is there a sales target?"],
      noun: "field sales work",
      phrase: "in field sales",
      skills: ["Field sales", "Two-wheeler", "Lead generation", "Negotiation", "Smartphone"],
      places: ["Kothrud", "Warje", "Karve Nagar", "Bavdhan", "Aundh", "Sinhagad Road", "Hadapsar"],
      edu: ["12th pass", "B.Com", "BBA", "B.A."],
      langNeeded: ["Marathi", "Hindi"],
      regions: [["marathi", 4], ["hindi", 3], ["muslim", 1]],
      female: 0.12,
      fresher: 0.2,
      age: [21, 37],
      venue: "our Kothrud office",
      suggest: ["Yes, ₹1,500 each month for travel.", "Can you come for an interview tomorrow?"],
      fit: "field sales experience and a two-wheeler",
      weight: 1,
    },
    support: {
      job: job("customer-support-whitefield", "Customer Support Executive", "super-premium", "Whitefield", "Bengaluru", true),
      pay: [22000, 30000],
      perk: "The shift is rotational.",
      ask: "Are you interested? Can you speak English and Hindi?",
      screen: [
        ["Thank you. Have you worked in a voice or chat support job?", ["Yes, 2 years in a BPO.", "No, I am a fresher.", "1 year in chat support."]],
        ["Are you comfortable with rotational shifts, including nights?", ["Yes, no problem.", "Night shift is difficult for me.", "Yes, with cab facility."]],
        ["How fast can you type?", ["About 35 wpm.", "40 wpm.", "I am not sure, maybe 25."]],
        ["Do you have a laptop or a stable internet connection at home for training?", ["Yes, both.", "Only mobile data.", "Yes sir."]],
      ],
      answers: ["Yes, I speak both.", "English and Kannada, my Hindi is basic.", "Yes madam.", "Hindi aur English dono aati hain."],
      questions: ["Is there a cab facility?", "Is the training paid?", "Is it a night shift?", "Is it a permanent job?"],
      noun: "customer support work",
      phrase: "in customer support",
      skills: ["Voice support", "Chat support", "Typing 35 wpm", "CRM basics", "English"],
      places: ["Whitefield", "Marathahalli", "Bellandur", "HSR Layout", "Electronic City", "KR Puram", "Indiranagar"],
      edu: ["B.A.", "B.Com", "B.Sc", "BBA", "BCA"],
      langNeeded: ["English", "Hindi"],
      regions: [["kannada", 2], ["tamil", 2], ["telugu", 2], ["malayali", 2], ["hindi", 2], ["bengali", 1]],
      female: 0.55,
      fresher: 0.3,
      age: [21, 33],
      venue: "our Whitefield office",
      suggest: ["Yes, a cab is given for night shifts.", "Can you come for an interview tomorrow?"],
      fit: "fluent English and a support background",
      weight: 1.3,
    },
    warehouse: {
      job: job("warehouse-bhiwandi", "Warehouse Associate", "classic", "Bhiwandi", "Mumbai", false),
      pay: [15000, 18000],
      perk: "PF and ESI are included.",
      ask: "Please reply Interested if you want to continue.",
      screen: [],
      answers: ["Yes sir, I have worked in a godown.", "Fresher hoon sir, kaam seekh lunga.", "2 years at a courier warehouse."],
      questions: ["What is the shift?", "Is night shift there?", "Is overtime paid?", "Rehne ki jagah milegi?"],
      noun: "warehouse work",
      phrase: "in a warehouse",
      skills: ["Loading and unloading", "Inventory counting", "Forklift", "Scanning", "Packing"],
      places: ["Bhiwandi", "Kalyan", "Padgha", "Anjurphata", "Mankoli", "Dapoda", "Thane"],
      edu: ["8th pass", "10th pass", "12th pass", "ITI"],
      langNeeded: ["Hindi"],
      regions: [["hindi", 4], ["marathi", 3], ["muslim", 4]],
      female: 0.05,
      fresher: 0.3,
      age: [19, 40],
      venue: "our Bhiwandi warehouse",
      suggest: ["Yes, overtime is paid double.", "Can you come to the warehouse tomorrow?"],
      fit: "warehouse experience",
      weight: 0.9,
    },
    cook: {
      job: job("cook-andheri", "Cook", "premium", "Andheri West", "Mumbai", false),
      pay: [16000, 22000],
      perk: "Food and one day off each week are included.",
      ask: "Are you interested? Can you cook North Indian and South Indian food?",
      screen: [],
      answers: ["Yes, I can cook both.", "North Indian only.", "Haan ji, 5 saal se cooking kar raha hoon.", "Yes sir, and Chinese too."],
      questions: ["Is accommodation given?", "How many people will I cook for?", "Which day is the weekly off?", "Khana free hoga kya?"],
      noun: "cooking",
      phrase: "as a cook",
      skills: ["North Indian cooking", "South Indian cooking", "Tandoor", "Kitchen hygiene", "Bulk cooking"],
      places: ["Andheri West", "Lokhandwala", "Versova", "Jogeshwari", "Goregaon", "Vile Parle", "Oshiwara"],
      edu: ["8th pass", "10th pass", "12th pass"],
      langNeeded: ["Hindi"],
      regions: [["hindi", 3], ["marathi", 3], ["bengali", 2], ["muslim", 1], ["malayali", 1]],
      female: 0.5,
      fresher: 0.1,
      age: [24, 50],
      venue: "our Andheri West kitchen",
      suggest: ["Yes, food is free on duty.", "Can you come for a cooking test tomorrow?"],
      fit: "bulk cooking experience",
      weight: 0.8,
    },
    accountant: {
      job: job("accountant-thane", "Accountant", "subscription", "Thane West", "Mumbai", false),
      pay: [25000, 35000],
      perk: "The office is open Monday to Saturday.",
      ask: "Are you interested? Do you know Tally and GST filing?",
      screen: [],
      answers: ["Yes, Tally Prime and GST returns.", "Tally yes, GST I am learning.", "5 saal ka experience hai, GST bhi karta hoon.", "I am a fresher with a B.Com."],
      questions: ["How many people are in the accounts team?", "Is there a PF?", "Is the salary negotiable?", "Is there a Saturday off?"],
      noun: "accounts work",
      phrase: "in accounts",
      skills: ["Tally Prime", "GST filing", "Bank reconciliation", "MS Excel", "TDS"],
      places: ["Thane West", "Mulund", "Kalwa", "Dombivli", "Kalyan", "Vikhroli", "Ghodbunder Road"],
      edu: ["B.Com", "M.Com", "BBA", "B.Com with CA Inter"],
      langNeeded: ["English"],
      regions: [["marathi", 3], ["gujarati", 3], ["hindi", 2], ["malayali", 1]],
      female: 0.4,
      fresher: 0.12,
      age: [23, 45],
      venue: "our Thane West office",
      suggest: ["The salary is negotiable for the right profile.", "Can you come for an interview tomorrow?"],
      fit: "GST filing experience",
      weight: 0.7,
    },
    guard: {
      job: job("security-guard-gurugram", "Security Guard", "classic", "Sector 44", "Gurugram", false),
      pay: [16000, 19000],
      perk: "The shift is 12 hours with a weekly off.",
      ask: "Please reply Interested if you want to continue.",
      screen: [],
      answers: ["Yes sir, I was in the army.", "2 years as a guard in a society.", "Fresher hoon, PSARA card nahi hai."],
      questions: ["Is uniform given?", "Is accommodation given?", "Is it a night duty?", "Kitne ghante ki duty hai?"],
      noun: "security work",
      phrase: "as a security guard",
      skills: ["Gate management", "Patrolling", "PSARA card", "Fire safety", "Visitor register"],
      places: ["Sector 44", "Sector 45", "Sikanderpur", "Palam Vihar", "Sohna Road", "Manesar", "Badshahpur"],
      edu: ["8th pass", "10th pass", "12th pass"],
      langNeeded: ["Hindi"],
      regions: [["hindi", 5], ["punjabi", 2], ["bengali", 1]],
      female: 0.03,
      fresher: 0.25,
      age: [22, 52],
      venue: "our Sector 44 site",
      suggest: ["Yes, uniform and shoes are given.", "Can you come to the site tomorrow?"],
      fit: "a PSARA card and guard experience",
      weight: 0.8,
    },
    dataEntry: {
      job: job("data-entry-noida", "Data Entry Operator", "premium", "Sector 62", "Noida", true, true),
      pay: [14000, 18000],
      perk: "The shift is 10 am to 7 pm.",
      ask: "Are you interested? Can you type 35 words per minute?",
      screen: [
        ["Thank you. Have you done data entry or form filling before?", ["Yes, 1 year of data entry.", "No, I am a fresher.", "2 years in a courier office."]],
        ["Do you know MS Excel?", ["Yes, I know the basics.", "Yes, VLOOKUP and pivot tables.", "Not much."]],
      ],
      answers: ["Yes, 40 wpm.", "About 30 wpm.", "Haan, typing speed achhi hai.", "Yes, I can do 35."],
      questions: ["Is it a work from home job?", "What are the timings?", "Is there a typing test?", "Salary kab milti hai?"],
      noun: "data entry",
      phrase: "in data entry",
      skills: ["Data entry", "MS Excel", "Typing 35 wpm", "MS Word", "Form filling"],
      places: ["Sector 62", "Sector 63", "Sector 15", "Indirapuram", "Vaishali", "Ghaziabad", "Greater Noida"],
      edu: ["12th pass", "B.A.", "B.Com", "BCA"],
      langNeeded: ["Hindi", "English"],
      regions: [["hindi", 5], ["punjabi", 1], ["bengali", 1], ["muslim", 1]],
      female: 0.55,
      fresher: 0.35,
      age: [19, 32],
      venue: "our Sector 62 office",
      suggest: ["There is a short typing test at the office.", "Can you come for an interview tomorrow?"],
      fit: "typing speed of 35 wpm",
      weight: 1,
    },
  }
}

// ---------------------------------------------------------------------------
// Candidates
// ---------------------------------------------------------------------------

interface Persona {
  name: string
  first: string
  gender: "M" | "F"
  age: number
  exp: number
  expText: string
  edu: string
  langs: string[]
  place: string
  km: number
  notice: string
  curSal?: number
  expSal: number
  phone: string
}

function makePersona(rng: Rng, spec: JobSpec, over: { name?: string } = {}): Persona {
  const region = NAMES[rng.weighted(spec.regions)]
  const gender = rng.chance(spec.female) ? "F" : "M"
  let last = rng.pick(region.last)
  if (gender === "F" && last === "Singh") last = "Kaur"
  const name = over.name ?? `${rng.pick(gender === "F" ? region.f : region.m)} ${last}`
  const age = rng.int(spec.age[0], spec.age[1])
  const exp = rng.chance(spec.fresher) ? 0 : rng.int(1, Math.max(1, Math.min(9, age - 19)))
  const langs = [region.lang]
  if (region.lang !== "Hindi" && rng.chance(0.55)) langs.push("Hindi")
  if (rng.chance(0.55)) langs.push("English")
  for (const need of spec.langNeeded) if (!langs.includes(need) && rng.chance(0.5)) langs.push(need)
  const [lo, hi] = spec.pay
  const expSal = rng.chance(0.25) ? hi + rng.int(1, 6) * 500 : rng.int(lo / 500, hi / 500) * 500
  return {
    name,
    first: name.split(" ")[0],
    gender,
    age,
    exp,
    expText: exp === 0 ? "Fresher" : `${exp} ${exp === 1 ? "yr" : "yrs"} ${spec.phrase}`,
    edu: rng.pick(spec.edu),
    langs,
    place: rng.pick(spec.places),
    km: rng.int(1, 22),
    notice: rng.weighted([
      ["Can start immediately", 3],
      ["Can start in 1 week", 3],
      ["Can start in 2 weeks", 2],
      ["Can start on Monday", 2],
      ["Notice period of 15 days", 1],
      ["Notice period of 30 days", 2],
      ["Not confirmed yet", 2],
    ]),
    curSal: exp > 0 ? Math.max(8000, expSal - rng.int(1, 4) * 1000) : undefined,
    expSal,
    phone: `+91 ••••• ••${rng.int(100, 999)}`,
  }
}

const NOTES = [
  "Asked for a call after 4 pm. Check the notice period.",
  "Good communication. Call again tomorrow.",
  "Referred by Ramesh from the Andheri team.",
  "Wants Sunday off.",
  "Salary expectation is high. Negotiate.",
  "Prefers WhatsApp calls. Speaks Hinglish.",
  "Has another offer. Decide fast.",
]

// ---------------------------------------------------------------------------
// Conversations
// ---------------------------------------------------------------------------

interface Step {
  from: Sender
  text: string
  /** Minutes since the previous message; a default for the sender if left out. */
  gap?: number
  quick?: boolean
  status?: MessageStatus
}

interface Ctx {
  rng: Rng
  spec: JobSpec
  job: ChatJob
  p: Persona
  source: "application" | "database"
  /** The AI sends messages here (paid job, an application). */
  ai: boolean
  /** The AI also screens (paid job with the add-on). */
  scr: boolean
  /** AI messages allowed for each candidate. */
  limit: number
}

type Kind =
  | "awaiting"
  | "screening"
  | "urgent"
  | "shortlisted"
  | "interview"
  | "active"
  | "notInterested"
  | "noReply"
  | "notFit"

interface Built {
  steps: Step[]
  status: ThreadStatus
  closedReason?: ClosedReason
  summary?: string
  suggest?: string[]
  /** The match score range. */
  band: [number, number]
  /** Chance the thread is unread (when the candidate wrote last). */
  unreadP: number
}

const quick = (text: "Interested" | "Not interested" | "Call me"): Step => ({ from: "candidate", text, quick: true })

function say(c: Ctx, text: string): Step {
  const emoji = c.rng.chance(0.07) ? ` ${c.rng.pick(["🙏", "👍", "😊"])}` : ""
  return { from: "candidate", text: text + emoji }
}

function opener(c: Ctx): Step {
  const { spec, job, p } = c
  const mid = [`The salary is ${money(spec.pay[0])} to ${money(spec.pay[1])} each month.`, spec.perk].filter(Boolean).join(" ")
  if (c.source === "database") {
    const where = `${job.area}, ${job.city}`
    return { from: "recruiter", text: `Hi ${p.first}, I found your profile on Apna. We have an opening for ${job.title} in ${where}. ${mid} Are you interested?` }
  }
  return {
    from: c.ai ? "ai" : "recruiter",
    text: `Hi ${p.first}, thanks for applying for ${job.title} in ${job.area}. ${mid} ${spec.ask}`,
  }
}

/** A daily follow-up from the AI (or the recruiter on Classic and Database threads). */
function nudge(c: Ctx, i: number, last: boolean): Step {
  const { job, p } = c
  const text = last
    ? `Hi ${p.first}, this is the last message about the ${job.title} job. Reply any time.`
    : i === 1
      ? `Hi ${p.first}, are you still interested in the ${job.title} job?`
      : `Hi ${p.first}, the ${job.title} job in ${job.area} is still open. Are you interested?`
  return { from: c.ai ? "ai" : "recruiter", text, gap: DAY }
}

/** The candidate's first answer to the opener: a quick reply, a text, or both. */
function yes(c: Ctx): Step[] {
  const r = c.rng.next()
  const answer = say(c, c.rng.pick(c.spec.answers))
  if (r < 0.35) return [quick("Interested")]
  if (r < 0.6) return [quick("Interested"), answer]
  return [answer]
}

const HINGLISH = [
  "Haan ji, interested hoon. Salary kitni milegi?",
  "Sir mujhe job chahiye, kab aana hai?",
  "जी सर, मैं इंटरेस्टेड हूँ। कब से जॉइन करना है?",
  "Sir ye job permanent hai ya contract par?",
  "Mera abhi kaam nahi hai, jaldi join kar sakta hoon sir 🙏",
  "Office ka address bhej dijiye sir.",
]

const ACKS = ["Ok sir, I will come.", "Ji sir, thank you.", "Okay sir 🙏", "Ok sir, thanks.", "Haan ji, aa jaunga.", "Thank you sir 😊"]

const recruiterReplies = (p: Persona) => [
  `Thanks ${p.first}. I will call you this evening.`,
  "Yes, the salary is as shown. Can you come for an interview this week?",
  "Thanks for your interest. Please send your updated resume.",
  `Thank you ${p.first}. Can you tell me your expected salary?`,
]

const startsText = (c: Ctx) => c.rng.pick(START[1])

function exp(c: Ctx) {
  return c.p.exp > 0 ? `Has ${c.p.expText}.` : "Is a fresher."
}

type Bucket = "min" | "hour" | "yesterday" | "week" | "date"

const AGE: Record<Kind, [Bucket, number][]> = {
  awaiting: [["min", 1], ["hour", 2], ["yesterday", 3], ["week", 3], ["date", 1]],
  screening: [["min", 3], ["hour", 4], ["yesterday", 2], ["week", 1]],
  urgent: [["min", 3], ["hour", 4], ["yesterday", 2], ["week", 1], ["date", 0.3]],
  shortlisted: [["min", 1], ["hour", 3], ["yesterday", 3], ["week", 2], ["date", 0.5]],
  interview: [["hour", 1], ["yesterday", 3], ["week", 4], ["date", 1]],
  active: [["min", 1], ["hour", 2], ["yesterday", 3], ["week", 3], ["date", 2]],
  notInterested: [["yesterday", 1], ["week", 3], ["date", 5]],
  noReply: [["week", 3], ["date", 6]],
  notFit: [["week", 3], ["date", 5]],
}

/** When the newest message was sent, as minutes from today's midnight. */
function pickLast(rng: Rng, kind: Kind) {
  const bucket = rng.weighted(AGE[kind])
  const waking = () => rng.int(8 * 60, 21 * 60 + 30)
  switch (bucket) {
    case "min":
      return NOW - (rng.chance(0.08) ? 0 : rng.int(1, 59))
    case "hour":
      return NOW - rng.int(60, 239)
    case "yesterday":
      return -DAY + waking()
    case "week":
      return -rng.int(2, 6) * DAY + waking()
    default:
      return -rng.int(7, 28) * DAY + waking()
  }
}

const KINDS: Record<Kind, (c: Ctx) => Built> = {
  /** The opener (and a few daily follow-ups) with no reply yet. */
  awaiting: (c) => {
    const steps = [opener(c)]
    const extra = c.ai ? c.rng.int(0, Math.max(0, c.limit - 2)) : c.rng.chance(0.25) ? 1 : 0
    for (let i = 1; i <= extra; i++) steps.push(nudge(c, i, false))
    return { steps, status: c.scr ? "ai-screening" : "active", band: [40, 90], unreadP: 0 }
  },

  /** The AI is asking screening questions; the candidate is answering. */
  screening: (c) => {
    const qs = [...c.spec.screen, START]
    const steps = [opener(c), ...yes(c)]
    const n = c.rng.int(1, Math.min(qs.length, c.limit - 1))
    for (let i = 0; i < n; i++) {
      steps.push({ from: "ai", text: qs[i][0] })
      if (i < n - 1 || c.rng.chance(0.55)) steps.push(say(c, i === qs.length - 1 ? startsText(c) : c.rng.pick(qs[i][1])))
    }
    return { steps, status: "ai-screening", band: [45, 92], unreadP: 0.45 }
  },

  /** The candidate replied on a job without the AI add-on: the recruiter must answer. */
  urgent: (c) => {
    const { rng, spec, p } = c
    const steps = [opener(c)]
    if (c.ai && c.limit >= 3 && rng.chance(0.2)) steps.push(nudge(c, 1, false))
    const question = rng.pick(spec.questions)
    const pat = rng.weighted([["interested", 25], ["question", 22], ["call", 18], ["quick", 18], ["hinglish", 17]] as const)
    let summary = ""
    if (pat === "interested") {
      steps.push(quick("Interested"), say(c, question))
      summary = `${p.first} is interested and asks: "${question}" ${exp(c)}`
    } else if (pat === "question") {
      steps.push(say(c, question))
      summary = `${p.first} asks: "${question}" ${exp(c)}`
    } else if (pat === "call") {
      steps.push(quick("Call me"))
      if (rng.chance(0.3)) steps.push(say(c, "Please call after 5 pm."))
      summary = `${p.first} wants a call. ${exp(c)}`
    } else if (pat === "quick") {
      steps.push(quick("Interested"))
      summary = `${p.first} is interested. ${exp(c)}`
    } else {
      steps.push(say(c, rng.pick(HINGLISH)))
      summary = `${p.first} is interested and replied in Hindi. ${exp(c)}`
    }
    if (rng.chance(0.15)) steps.push({ from: "candidate", text: "Sir please reply", gap: rng.int(30, 300) })
    return { steps, status: "urgent", summary, suggest: spec.suggest, band: [45, 95], unreadP: 0.62 }
  },

  /** Screening done: a good fit, waiting for the recruiter. The AI never rejects. */
  shortlisted: (c) => {
    const qs = [...c.spec.screen, START]
    const steps = [opener(c), ...yes(c)]
    const n = c.rng.int(1, Math.min(qs.length, c.limit - 1))
    for (let i = 0; i < n; i++) {
      steps.push({ from: "ai", text: qs[i][0] })
      steps.push(say(c, i === qs.length - 1 ? startsText(c) : c.rng.pick(qs[i][1])))
    }
    if (n + 1 < c.limit && c.rng.chance(0.5)) {
      steps.push({ from: "ai", text: `Thank you ${c.p.first}. I have shared your answers with ${RECRUITER_FIRST}. He will contact you soon.` })
    }
    const summary = `Good fit. ${exp(c).replace("Has ", "")} ${c.p.notice}. Answered all ${n} questions.`
    return { steps, status: "shortlisted", summary, band: [76, 96], unreadP: 0.4 }
  },

  /** An interview is set. */
  interview: (c) => {
    const { rng, p, spec } = c
    const steps = [opener(c), ...yes(c)]
    if (c.scr) {
      steps.push({ from: "ai", text: START[0] }, say(c, startsText(c)))
    }
    const time = rng.pick(["11 am", "12 noon", "2 pm", "4 pm", "10:30 am"])
    const day = rng.pick(["Thursday", "Friday", "Saturday", "Monday"])
    steps.push(
      { from: "recruiter", text: `Thanks ${p.first}. Please come for an interview on ${day} at ${time} at ${spec.venue}.` },
      say(c, rng.pick(ACKS))
    )
    if (rng.chance(0.4)) {
      steps.push({
        from: "recruiter",
        text: `Hi ${p.first}, a reminder: your interview is at ${time}. Please bring your Aadhaar card and your resume.`,
        gap: rng.int(600, 1200),
      })
      if (rng.chance(0.7)) steps.push(say(c, rng.pick(ACKS)))
    }
    return { steps, status: "interview", band: [72, 95], unreadP: 0.12 }
  },

  /** The recruiter has answered; the thread leaves Urgent and AI screening. */
  active: (c) => {
    const { rng, p } = c
    const steps = [opener(c), ...yes(c)]
    if (c.scr) steps.push({ from: "ai", text: START[0] }, say(c, startsText(c)))
    else if (rng.chance(0.5)) steps.push(say(c, rng.pick(c.spec.questions)))
    steps.push({ from: "recruiter", text: rng.pick(recruiterReplies(p)) })
    if (rng.chance(0.2)) steps.push(say(c, rng.pick(ACKS)))
    else if (rng.chance(0.2)) steps.push({ from: "recruiter", text: "Please share your current address and a photo ID number later." })
    return { steps, status: "active", band: [40, 92], unreadP: 0.3 }
  },

  /** The candidate tapped "Not interested". */
  notInterested: (c) => {
    const steps = [opener(c)]
    if (c.ai && c.limit >= 3 && c.rng.chance(0.25)) steps.push(nudge(c, 1, false))
    steps.push(quick("Not interested"))
    return { steps, status: "closed", closedReason: "not-interested", band: [25, 70], unreadP: 0 }
  },

  /** The AI sent every message it may and the candidate never replied. */
  noReply: (c) => {
    const steps = [opener(c)]
    for (let i = 1; i < c.limit; i++) steps.push(nudge(c, i, i === c.limit - 1))
    return { steps, status: "closed", closedReason: "no-reply", band: [20, 70], unreadP: 0 }
  },

  /** The recruiter closed it: not a fit. */
  notFit: (c) => {
    const { p, spec } = c
    const steps = [opener(c), ...yes(c)]
    if (c.scr) steps.push({ from: "ai", text: START[0] }, say(c, startsText(c)))
    steps.push({
      from: "recruiter",
      text: `Thanks ${p.first}. We need ${spec.fit} for this job, so we cannot go ahead now. We will keep your profile for other openings.`,
    })
    return { steps, status: "closed", closedReason: "not-a-fit", band: [18, 45], unreadP: 0 }
  },
}

const KIND_WEIGHTS: [Kind, number][] = [
  ["awaiting", 9],
  ["screening", 22],
  ["urgent", 22],
  ["shortlisted", 26],
  ["interview", 6],
  ["active", 13],
  ["notInterested", 5],
  ["noReply", 9],
  ["notFit", 7],
]
const DATABASE_KINDS: Kind[] = ["awaiting", "urgent", "interview", "notInterested", "notFit"]

// ---------------------------------------------------------------------------
// From a conversation to a thread
// ---------------------------------------------------------------------------

interface Draft {
  id: string
  spec: JobSpec
  p: Persona
  source: "application" | "database"
  built: Built
  last: number
  unread?: boolean
  availability?: "deleted" | "blocked"
  reopened?: boolean
}

const DEFAULT_LIMITS: Record<JobTier, number> = { classic: 0, premium: 3, "super-premium": 5, subscription: 3 }

interface Gen {
  rng: Rng
  limits: Record<JobTier, number>
  jobs: Record<JobKey, JobSpec>
}

function ctxFor(g: Gen, spec: JobSpec, p: Persona, source: "application" | "database"): Ctx {
  const ai = source === "application" && spec.job.tier !== "classic"
  return { rng: g.rng, spec, job: spec.job, p, source, ai, scr: ai && spec.job.aiAddOn, limit: g.limits[spec.job.tier] }
}

function draft(g: Gen, id: string, spec: JobSpec, kind: Kind, source: "application" | "database" = "application", p?: Persona): Draft {
  const persona = p ?? makePersona(g.rng, spec)
  const built = KINDS[kind](ctxFor(g, spec, persona, source))
  return { id, spec, p: persona, source, built, last: pickLast(g.rng, kind) }
}

/** Kinds a job can have: screening needs the add-on, urgent needs no add-on, no-reply needs the AI. */
function kindsFor(spec: JobSpec, source: "application" | "database"): [Kind, number][] {
  const ai = source === "application" && spec.job.tier !== "classic"
  const scr = ai && spec.job.aiAddOn
  return KIND_WEIGHTS.filter(([k]) => {
    if (source === "database") return DATABASE_KINDS.includes(k)
    if (k === "screening" || k === "shortlisted") return scr
    if (k === "urgent") return !spec.job.aiAddOn
    if (k === "noReply") return ai
    return true
  })
}

function randomDraft(g: Gen, id: string, spec?: JobSpec, p?: Persona): Draft {
  const { rng } = g
  const chosen =
    spec ??
    rng.weighted(Object.values(g.jobs).map((s) => [s, s.weight] as const))
  const source = !chosen.job.aiAddOn && !p && rng.chance(0.14) ? "database" : "application"
  return draft(g, id, chosen, rng.weighted(kindsFor(chosen, source)), source, p)
}

function finish(g: Gen, d: Draft): ChatThread {
  const { rng } = g
  const { spec, p, built } = d
  const n = built.steps.length
  const abs: number[] = new Array(n)
  abs[n - 1] = d.last
  for (let i = n - 1; i > 0; i--) {
    const cur = built.steps[i]
    const prev = built.steps[i - 1]
    const gap =
      cur.gap ??
      (cur.from === "ai"
        ? prev.from === "ai"
          ? DAY
          : rng.int(1, 3)
        : cur.from === "candidate"
          ? rng.weighted([[rng.int(2, 180), 70], [rng.int(180, 600), 25], [rng.int(600, 1500), 5]])
          : rng.chance(0.8)
            ? rng.int(2, 120)
            : rng.int(120, 600))
    abs[i - 1] = daytime(rng, abs[i] - gap)
  }
  if (spec.job.expired) {
    let lastAi = -Infinity
    built.steps.forEach((s, i) => s.from === "ai" && (lastAi = Math.max(lastAi, abs[i])))
    if (lastAi > EXPIRY) {
      const shift = Math.ceil((lastAi - EXPIRY) / DAY) * DAY
      for (let i = 0; i < n; i++) abs[i] -= shift
    }
  }
  const lastAbs = abs[n - 1]
  let lastCandidate = -1
  built.steps.forEach((s, i) => s.from === "candidate" && (lastCandidate = i))
  const messages: ChatMessage[] = built.steps.map((s, i) => {
    const { d: dayOffset, tod } = parts(abs[i])
    const message: ChatMessage = { id: `m${i + 1}`, from: s.from, text: s.text, day: dayLabel(dayOffset), time: clock(tod) }
    if (s.quick) message.quickReply = true
    if (s.from !== "candidate") {
      message.status =
        s.status ??
        (i < lastCandidate
          ? "read"
          : i < n - 1
            ? rng.weighted([["read", 7], ["delivered", 3]] as const)
            : NOW - abs[i] <= 3
              ? rng.weighted([["sent", 4], ["delivered", 4], ["read", 2]] as const)
              : rng.weighted([["read", 5], ["delivered", 4]] as const))
    }
    return message
  })
  const endsWithCandidate = built.steps[n - 1].from === "candidate"
  const unread = endsWithCandidate && (d.unread ?? rng.chance(built.unreadP))

  const profile = {
    location: `${p.place}, ${spec.job.city}`,
    experience: p.exp > 0 ? p.expText : "Fresher",
    education: p.edu,
    languages: p.langs,
    skills: rng.shuffle(spec.skills).slice(0, p.exp > 0 ? rng.int(3, 4) : rng.int(1, 2)),
    ...(p.curSal ? { currentSalary: `${money(p.curSal)} a month` } : {}),
    expectedSalary: `${money(p.expSal)} a month`,
    availability: p.notice,
    phoneMasked: p.phone,
  }
  const notes: ChatNote[] = []
  if (rng.chance(0.05)) {
    const at = parts(Math.min(lastAbs + rng.int(2, 120), NOW))
    notes.push({ id: "n1", text: rng.pick(NOTES), at: `${dayLabel(at.d)}, ${clock(at.tod)}` })
  }
  const thread: ChatThread = {
    id: d.id,
    job: spec.job,
    candidate: {
      name: p.name,
      initial: p.name[0].toUpperCase(),
      meta: `${p.gender}, ${p.age} yrs · ${p.exp === 0 ? "Fresher" : `${p.exp} ${p.exp === 1 ? "yr" : "yrs"} experience`}`,
      ...(d.availability ? { availability: d.availability } : {}),
    },
    status: built.status,
    unread,
    messages,
    profile,
    match: makeMatch(g, d, profile.skills),
    resumeUnlocked: rng.chance(d.source === "database" ? 0.25 : 0.1),
    notes,
    source: d.source,
  }
  if (built.closedReason) thread.closedReason = built.closedReason
  if (built.summary) thread.summary = built.summary
  if (built.suggest) thread.suggestedReplies = built.suggest
  if (d.reopened) thread.reopened = true
  return thread
}

function makeMatch(g: Gen, d: Draft, skills: string[]): JobMatch {
  const { rng } = g
  const { spec, p, built } = d
  const score = rng.int(built.band[0], built.band[1])
  const strengths: string[] = []
  const gaps: string[] = []
  if (p.exp > 0) strengths.push(`${p.exp} ${p.exp === 1 ? "yr" : "yrs"} of ${spec.noun}`)
  else gaps.push(`No ${spec.noun} experience`)
  if (p.km <= 8) strengths.push(`Lives ${p.km} km from ${spec.job.area}`)
  else gaps.push(`Lives ${p.km} km from ${spec.job.area}`)
  if (p.expSal <= spec.pay[1]) strengths.push("Expected salary is inside the range")
  else gaps.push(`Expected salary is ${money(p.expSal)}, above the range`)
  const missing = spec.langNeeded.filter((l) => !p.langs.includes(l))
  if (missing.length) gaps.push(`Does not speak ${missing[0]}`)
  else strengths.push(`Speaks ${spec.langNeeded.join(" and ")}`)
  skills.slice(0, 2).forEach((s) => strengths.push(`Knows ${s}`))
  const lacking = spec.skills.find((s) => !skills.includes(s))
  if (lacking) gaps.push(`No ${lacking} listed`)
  if (p.notice.startsWith("Notice")) gaps.push(p.notice)
  else if (p.notice.startsWith("Not confirmed")) gaps.push("Start date not confirmed")
  else strengths.push(p.notice)
  if (built.closedReason === "not-interested") gaps.unshift("Said they are not interested")
  if (built.closedReason === "no-reply") gaps.unshift(`No reply to ${built.steps.length} messages`)
  const level = score >= 75 ? "high" : score >= 50 ? "medium" : "low"
  const [s, w] = level === "high" ? [4, 1] : level === "medium" ? [3, 3] : [2, 4]
  return {
    level,
    score,
    strengths: rng.shuffle(strengths).slice(0, s),
    gaps: built.closedReason ? gaps.slice(0, w + 1) : rng.shuffle(gaps).slice(0, w),
  }
}

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

const LONG_MESSAGE =
  "Good morning sir. I am writing about the Cook job in Andheri West. I have worked as a cook for 6 years, first at a small " +
  "family restaurant in Kolkata where I made North Indian and Bengali dishes for around 150 customers every day, and then for " +
  "3 years at a private mess in Andheri where I cooked breakfast, lunch and dinner for 40 office workers. I can make roti, " +
  "sabzi, dal, rice, biryani, paneer dishes and South Indian items like idli and dosa. I keep the kitchen clean and I have a " +
  "food handler's certificate. My current salary is ₹19,000 and I am asking for ₹22,000 because the new place is far from my " +
  "home and I will spend money on travel. I can join within 10 days after I tell my present owner. Please tell me if I can " +
  "come for a trial cooking test, and also the timings, the weekly off day and whether food and accommodation are included. " +
  "Thank you very much for your time."

const WAREHOUSE_TOPICS: [string, string][] = [
  ["What is your current address?", "Main Bhiwandi, Kalyan Road ke paas rehta hoon."],
  ["Do you have an Aadhaar and a PAN card?", "Yes sir, both are there."],
  ["Have you worked in a warehouse before?", "Yes, 2 years at a courier godown."],
  ["Can you lift 20 kg boxes?", "Yes sir, that is my daily work."],
  ["The shift is 9 am to 6 pm. Is that fine?", "Ji sir, timing theek hai."],
  ["Is a night shift ok sometimes?", "Ok sir, but extra pay milega?"],
  ["Yes, a night shift pays ₹300 extra for the day.", "Ok sir, no problem."],
  ["Do you have a bank account?", "Yes, SBI account hai."],
  ["Can you join this Monday?", "Monday nahi, next Monday se."],
  ["PF and ESI are included.", "Good sir, thank you."],
  ["Do you have relatives who work with us?", "No sir."],
  ["Please bring 2 passport photos.", "Ok sir, I will bring."],
  ["Safety shoes are given by the company.", "Ok."],
  ["Come to Gate 2 and ask for Mr. Pandey.", "Ji sir, 10 baje pahuch jaunga."],
]

const NUDGES = [
  "Sir?",
  "Hello sir",
  "Sir reply please",
  "Call me sir",
  "Sir mujhe job ki zarurat hai 🙏",
  "Sir kuch update hai kya?",
  "Please sir, one call",
  "Sir interview kab hai?",
  "Sir my number is the same on WhatsApp",
  "Sir please 🙏🙏",
  "Hello? Anyone there?",
  "Sir salary confirm kar dijiye",
]

function edgeDrafts(g: Gen): Draft[] {
  const { rng, jobs } = g
  const out: Draft[] = []
  const ctx = (spec: JobSpec, p: Persona, source: "application" | "database" = "application") => ctxFor(g, spec, p, source)
  const build = (id: string, spec: JobSpec, p: Persona, built: Built, last: number, extra: Partial<Draft> = {}) => {
    const d: Draft = { id, spec, p, source: "application", built, last, ...extra }
    out.push(d)
    return d
  }
  const persona = (spec: JobSpec, name?: string) => makePersona(rng, spec, { name })

  // Deleted account: the thread ends; the recruiter's last message was never delivered.
  {
    const d = draft(g, "g-edge-deleted", jobs.delivery, "active")
    d.availability = "deleted"
    d.built.status = "closed"
    d.last = -3 * DAY + 11 * 60
    out.push(d)
  }
  // Blocked the recruiter: the last message stays on one tick.
  {
    const d = draft(g, "g-edge-blocked", jobs.cook, "active")
    d.availability = "blocked"
    d.built.status = "closed"
    d.built.steps[d.built.steps.length - 1] = { from: "recruiter", text: "Hi, are you still looking for a job?", status: "sent" }
    d.last = -5 * DAY + 15 * 60
    out.push(d)
  }
  // Reopened after "Not interested": the candidate wrote again, so it is urgent.
  {
    const p = persona(jobs.delivery)
    const c = ctx(jobs.delivery, p)
    build(
      "g-edge-reopened-not-interested",
      jobs.delivery,
      p,
      {
        steps: [opener(c), quick("Not interested"), { from: "candidate", text: "Sir, I changed my mind. Is the job still open?", gap: 3 * DAY }],
        status: "urgent",
        summary: `${p.first} said "Not interested" 3 days ago and now asks if the job is still open. ${exp(c)}`,
        suggest: jobs.delivery.suggest,
        band: [60, 85],
        unreadP: 1,
      },
      NOW - 35,
      { unread: true, reopened: true }
    )
  }
  // Reopened after the AI limit: it closed as "No reply", then the candidate answered.
  {
    const p = persona(jobs.cook)
    const c = ctx(jobs.cook, p)
    const steps = [opener(c), nudge(c, 1, false), nudge(c, 2, true)]
    steps.push({ from: "candidate", text: "Sorry sir, I was busy. I am still interested.", gap: 2 * DAY })
    build(
      "g-edge-reopened-no-reply",
      jobs.cook,
      p,
      {
        steps,
        status: "urgent",
        summary: `${p.first} did not reply to 3 messages, then wrote 2 days later: still interested. ${exp(c)}`,
        suggest: jobs.cook.suggest,
        band: [55, 85],
        unreadP: 1,
      },
      -DAY + 9 * 60 + 40,
      { unread: true, reopened: true }
    )
  }
  // Super premium: 5 AI messages, no reply.
  out.push(draft(g, "g-edge-limit-5", jobs.support, "noReply"))
  // Job expired mid-chat: the candidate answered after it expired and the AI did not answer.
  {
    const p = persona(jobs.dataEntry)
    const c = ctx(jobs.dataEntry, p)
    build(
      "g-edge-expired",
      jobs.dataEntry,
      p,
      {
        steps: [
          opener(c),
          say(c, "Yes, 40 wpm."),
          { from: "ai", text: jobs.dataEntry.screen[0][0] },
          { from: "candidate", text: "Yes, 1 year of data entry. Is the job still open?", gap: 3 * DAY },
        ],
        status: "ai-screening",
        band: [60, 90],
        unreadP: 1,
      },
      -2 * DAY + 10 * 60 + 5,
      { unread: true }
    )
  }
  // Same candidate on two jobs (six pairs, in Bengaluru and in Mumbai).
  for (let i = 1; i <= 6; i++) {
    const bengaluru = i % 2 === 1
    const home = bengaluru ? jobs.telecaller : jobs.delivery
    const other = bengaluru ? jobs.support : jobs.warehouse
    const p = persona(home)
    out.push(randomDraft(g, `g-pair-${i}-a`, home, p), randomDraft(g, `g-pair-${i}-b`, other, p))
  }
  // Database profile, no application: the recruiter writes first, no AI.
  {
    const d = draft(g, "g-edge-database", jobs.accountant, "urgent", "database")
    out.push(d)
  }
  // Very long names.
  out.push(
    draft(g, "g-edge-long-name-1", jobs.accountant, "active", "application", persona(jobs.accountant, "Venkata Subramanian Lakshmi Narasimha Iyer")),
    draft(g, "g-edge-long-name-2", jobs.delivery, "urgent", "application", persona(jobs.delivery, "Mohammed Abdul Rahman Mohiuddin Siddiqui Ansari"))
  )
  // A candidate message over 600 characters.
  {
    const p = persona(jobs.cook)
    const c = ctx(jobs.cook, p)
    build(
      "g-edge-long-message",
      jobs.cook,
      p,
      {
        steps: [opener(c), { from: "candidate", text: LONG_MESSAGE }],
        status: "urgent",
        summary: `${p.first} has 6 years of cooking, asks for ₹22,000, can join in 10 days and wants a trial test.`,
        suggest: jobs.cook.suggest,
        band: [70, 92],
        unreadP: 1,
      },
      NOW - 22,
      { unread: true }
    )
  }
  // Hindi (Devanagari) and Hinglish.
  {
    const p = persona(jobs.delivery)
    const c = ctx(jobs.delivery, p)
    build(
      "g-edge-hindi",
      jobs.delivery,
      p,
      {
        steps: [
          opener(c),
          { from: "candidate", text: "जी सर, मैं इंटरेस्टेड हूँ।" },
          { from: "candidate", text: "मेरे पास बाइक और लाइसेंस दोनों हैं। पेट्रोल का पैसा मिलेगा क्या?" },
        ],
        status: "urgent",
        summary: `${p.first} is interested, has a bike and a licence, and asks about petrol money (replied in Hindi).`,
        suggest: jobs.delivery.suggest,
        band: [70, 92],
        unreadP: 1,
      },
      NOW - 9,
      { unread: true }
    )
  }
  {
    const p = persona(jobs.cook)
    const c = ctx(jobs.cook, p)
    build(
      "g-edge-hinglish",
      jobs.cook,
      p,
      {
        steps: [
          opener(c),
          { from: "candidate", text: "Sir namaste, main Bihar se hoon, 5 saal se cooking ka kaam kar raha hoon." },
          { from: "candidate", text: "Salary 20 hazaar se kam nahi chalega sir, khana aur rehna free ho to." },
        ],
        status: "urgent",
        summary: `${p.first} has 5 years of cooking and wants at least ₹20,000 with food and a room.`,
        suggest: jobs.cook.suggest,
        band: [60, 88],
        unreadP: 1,
      },
      -DAY + 18 * 60 + 12,
      { unread: false }
    )
  }
  // Emoji.
  {
    const p = persona(jobs.backOffice)
    const c = ctx(jobs.backOffice, p)
    build(
      "g-edge-emoji",
      jobs.backOffice,
      p,
      {
        steps: [
          opener(c),
          { from: "candidate", text: "Yes sir 🙏🙏 I am very interested 😊🔥" },
          { from: "recruiter", text: "Great! 👍 Can you come tomorrow at 11 am? ⏰" },
          { from: "candidate", text: "👍👍👍" },
        ],
        status: "active",
        band: [55, 90],
        unreadP: 0,
      },
      -DAY + 16 * 60 + 30
    )
  }
  // A "Call me" quick reply on Classic.
  {
    const p = persona(jobs.backOffice)
    const c = ctx(jobs.backOffice, p)
    build(
      "g-edge-call-me",
      jobs.backOffice,
      p,
      {
        steps: [opener(c), quick("Call me")],
        status: "urgent",
        summary: `${p.first} wants a call. ${exp(c)}`,
        suggest: jobs.backOffice.suggest,
        band: [55, 85],
        unreadP: 1,
      },
      NOW - 4,
      { unread: true }
    )
  }
  // 60+ messages over several days.
  {
    const p = persona(jobs.warehouse)
    const c = ctx(jobs.warehouse, p)
    const steps: Step[] = [opener(c), quick("Interested")]
    WAREHOUSE_TOPICS.forEach(([q, a], i) => {
      steps.push(
        { from: "recruiter", text: q, ...(i % 3 === 0 ? { gap: rng.int(600, 900) } : {}) },
        { from: "candidate", text: a },
        { from: "recruiter", text: rng.pick(["Okay.", "Noted.", "Good.", "Thanks."]) },
        { from: "candidate", text: rng.pick(["Ok sir.", "Ji.", "👍", "Thank you sir."]) }
      )
    })
    steps.push(
      { from: "recruiter", text: "Great. See you tomorrow at 10 am.", gap: 700 },
      { from: "candidate", text: "Ok sir 👍" },
      { from: "recruiter", text: "Please carry your documents." },
      { from: "candidate", text: "Ji sir." }
    )
    build("g-edge-long-thread", jobs.warehouse, p, { steps, status: "active", band: [60, 90], unreadP: 0 }, NOW - 20)
  }
  // A single message.
  {
    const p = persona(jobs.warehouse)
    const c = ctx(jobs.warehouse, p)
    build("g-edge-single", jobs.warehouse, p, { steps: [opener(c)], status: "active", band: [40, 80], unreadP: 0 }, NOW - 95)
  }
  // The recruiter's message is still "sending", and one is "sent".
  {
    const p = persona(jobs.delivery)
    const c = ctx(jobs.delivery, p)
    build(
      "g-edge-sending",
      jobs.delivery,
      p,
      {
        steps: [
          opener(c),
          quick("Interested"),
          say(c, "Is there a petrol allowance?"),
          { from: "recruiter", text: "Yes, we pay ₹2,000 each month for petrol.", status: "sending" },
        ],
        status: "active",
        band: [60, 90],
        unreadP: 0,
      },
      NOW
    )
    const q = persona(jobs.backOffice)
    const cq = ctx(jobs.backOffice, q)
    build(
      "g-edge-sent",
      jobs.backOffice,
      q,
      {
        steps: [opener(cq), quick("Interested"), { from: "recruiter", text: "Thanks. I will call you at 4 pm today.", status: "sent" }],
        status: "active",
        band: [55, 88],
        unreadP: 0,
      },
      NOW - 1
    )
  }
  // Duplicate first names (two are the same full name).
  out.push(
    draft(g, "g-edge-dup-1", jobs.delivery, "urgent", "application", persona(jobs.delivery, "Rahul Verma")),
    draft(g, "g-edge-dup-2", jobs.backOffice, "active", "application", persona(jobs.backOffice, "Rahul Yadav")),
    draft(g, "g-edge-dup-3", jobs.warehouse, "urgent", "application", persona(jobs.warehouse, "Rahul Verma"))
  )
  // Many unread messages.
  for (const count of [12, 27, 163]) {
    const p = persona(jobs.guard)
    const c = ctx(jobs.guard, p)
    const steps: Step[] = [opener(c), quick("Interested")]
    while (steps.length < count + 1) {
      const i = steps.length
      steps.push({ from: "candidate", text: NUDGES[i % NUDGES.length], gap: rng.int(1, count > 100 ? 12 : 90) })
    }
    steps[2].gap = 40
    build(
      `g-edge-unread-${count}`,
      jobs.guard,
      p,
      {
        steps,
        status: "urgent",
        summary: `${p.first} is interested and has sent ${count} messages asking for a reply. ${exp(c)}`,
        suggest: jobs.guard.suggest,
        band: [50, 85],
        unreadP: 1,
      },
      NOW - 6,
      { unread: true }
    )
  }
  return out
}

/** The generated threads: GENERATED_COUNT of them, in a fixed order, from a fixed seed. */
export function generateThreads(existingJobs: ChatJob[], limits: Record<JobTier, number> = DEFAULT_LIMITS): ChatThread[] {
  const rng = makeRng(SEED)
  const g: Gen = { rng, limits, jobs: buildJobs(existingJobs) }
  const drafts = edgeDrafts(g)
  for (let i = 1; drafts.length < GENERATED_COUNT; i++) drafts.push(randomDraft(g, `g-${String(i).padStart(3, "0")}`))
  return rng.shuffle(drafts.map((d) => finish(g, d)))
}
