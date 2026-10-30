/**
 * /interview-prep-lounge — the AI Interview Preparation Lounge, apna's
 * offer to universities, colleges and training institutions.
 *
 * Copy is from the lounge prototype (interview-coach-ai-05.lovable.app),
 * read live via get_page_text on 2026-10-17; the user asked for its content
 * and copy only, so the layout is ours. The stats' numbers come from that
 * page's counter targets (its text reads "0L+" until the counters run).
 * Light edits, only where a line didn't parse: the universities card
 * ("…and prepares, coaches students at scale"), and "apna" in lower case,
 * as everywhere on this site.
 *
 * Photos (public/images/lounge) are the prototype's own, fetched
 * 2026-10-17: the booth and practising photos, the booths photo and the
 * minister's visit. The audiences get 3D clay objects instead of the
 * prototype's line illustrations (user call). The hero's rotating
 * "moments" are the prototype's hero carousel copy.
 */

export const LOUNGE = {
  meta: {
    title: "AI Interview Preparation Lounge",
    description:
      "An AI-powered interview readiness solution for universities, colleges and training institutions, bringing personalised, always-available interview preparation to campus.",
  },
  hero: {
    eyebrow: "For campuses",
    title: "AI Interview Preparation Lounge",
    titleAccent: "Lounge",
    description:
      "The apna AI Interview Preparation Lounge is an AI-powered interview readiness solution designed for universities, colleges and training institutions, bringing personalised, always-available interview preparation directly to campus.",
    cta: "Bring the Lounge to your campus",
    /** The hero's demo recordings (onlyround.ai's pattern): the prototype's
     *  product moments, each to open its recording. PROTOTYPE: no files yet
     *  — add `src` (e.g. "/demos/lounge-mock-interview.mp3") when Punna
     *  shares them; `durationSec` is a placeholder until then. */
    moments: [
      { title: "AI-led mock interview", tags: ["Role-specific", "Resume-aware", "Instant feedback"], durationSec: 120 },
      { title: "Prepare for 25,000+ top roles", tags: ["Sales", "BPO", "IT", "Finance", "Retail"], durationSec: 120 },
      {
        title: "Everyday 10k students are preparing using our lounge",
        tags: ["Campus-ready", "Always available", "Scalable"],
        durationSec: 120,
      },
      {
        title: "Get a report card on WhatsApp",
        tags: ["Customized report", "Post-interview", "Actionable insights"],
        durationSec: 120,
      },
    ],
  },
  stats: [
    { value: "14L+", label: "Interviews completed" },
    { value: "76L+", label: "Minutes of live simulation" },
    { value: "3,100+", label: "Cities and towns live" },
    { value: "4L+", label: "Companies to practise for" },
  ],
  audiences: [
    {
      icon: "student",
      /** Its 3D clay object (ValueArt). */
      art: "student",
      eyebrow: "For students",
      title: "Functional readiness and earned confidence.",
      description: "Practise privately in Hindi, English or regional languages, with real-time improvement.",
    },
    {
      icon: "campus",
      /** Its 3D clay object (ValueArt). */
      art: "university",
      eyebrow: "For universities",
      title: "Knowledge loop that enables candidate-readiness for interviews.",
      description: "Raise readiness at scale, track gaps, and coach every student.",
    },
    {
      icon: "government",
      /** Its 3D clay object (ValueArt). */
      art: "government",
      eyebrow: "For government",
      title: "Inclusive access to preparation and measurable impact.",
      description: "A visible AI skilling asset that reaches all first-generation learners, freshers & students.",
    },
  ],
  pillars: {
    title: "From placement support to career-readiness",
    description:
      "An AI career mentor on every campus, in the student’s language, for the job they want, backed by India’s largest jobs marketplace.",
    items: [
      { icon: "eye", title: "Visible", description: "A physical lounge that signals real institutional commitment towards learning" },
      { icon: "repeat", title: "Repeatable", description: "Unlimited practice every week, not a single pre-placement workshop." },
      { icon: "chart", title: "Measurable", description: "Live dashboards by campus, stream and role-level readiness." },
      { icon: "person", title: "Personalised", description: "Preparation personalised to students’ aspirations & career/scholastic history" },
    ],
  },
  experience: {
    title: "A dedicated AI-powered interview preparation experience",
    description:
      "A proprietary, agentic AI interviewer that conducts real, spoken, multilingual interviews for India’s job seekers.",
    items: [
      {
        icon: "target",
        title: "Role-specific practice",
        description: "Choose the exact company and role: Google, Amazon, Toyota, Hays and 4L+ more.",
      },
      {
        icon: "languages",
        title: "Multilingual confidence",
        description: "Live, spoken interviews in Hindi, English or regional languages, the candidate’s choice.",
      },
      {
        icon: "resume",
        title: "Resume-personalised questions",
        description: "The AI reads each CV and asks relevant questions, not generic prompts.",
      },
      {
        icon: "loop",
        title: "Instant improvement loop",
        description: "A detailed report with strengths, gaps and AI-improved sample answers to revise.",
      },
      {
        icon: "private",
        title: "Private and repeatable",
        description: "Try again without embarrassment. No session is ever shared with recruiters.",
      },
    ],
    footnote: "apna’s AI Preparation Lounge allows students to prepare for 25,000+ roles for top companies.",
    images: [
      { src: "/images/lounge/booth.jpg", alt: "Candidate using an apna AI Interview Preparation booth" },
      {
        src: "/images/lounge/candidate-practising.jpg",
        alt: "Student practising a live spoken AI interview with headphones on",
      },
    ],
  },
  institutions: {
    image: {
      src: "/images/lounge/booths.jpg",
      alt: "Three candidates practising interviews in apna AI Interview Preparation Centre booths",
    },
    title: "Institutions deploy it. Students benefit from it.",
    description:
      "The Lounge turns interview readiness from a one-time workshop into an always-on operating system for learning.",
    items: [
      {
        title: "Scale without new headcount",
        description: "Personalised coaching reaches thousands of students without adding counsellors.",
      },
      {
        title: "Real-time readiness dashboard",
        description: "Sessions, scores and trends, viewable by department, role or campus.",
      },
      {
        title: "One standard, every stream",
        description: "A consistent, benchmarked interview-readiness language across all faculties.",
      },
      {
        title: "Curriculum feedback loop",
        description: "Aggregated gaps show where communication or technical clarity needs attention.",
      },
    ],
  },
  publicOutcomes: {
    image: {
      src: "/images/lounge/minister.jpg",
      alt: "Hon'ble Union Minister Shri Piyush Goyal at the AI Interview Preparation Centre",
      caption: "Hon'ble Union Minister Shri Piyush Goyal at the AI Interview Preparation Centre",
    },
    title: "A visible AI skilling asset, with measurable public outcomes",
    description:
      "The Lounge complements existing programmes by solving the last-mile employability gap: practice, confidence, reporting and job connection.",
    items: [
      { title: "NEP 2020", description: "Career guidance, vocational integration and multilingual experiential learning." },
      {
        title: "Skill India / PMKVY",
        description: "Industry-relevant, demand-driven, employability-focused skill training.",
      },
      {
        title: "Digital India",
        description: "A citizen-facing AI deployment inside the education and skilling ecosystem.",
      },
      {
        title: "Viksit Bharat 2047",
        description: "Inclusive workforce infrastructure for youth, women, rural and first-generation job seekers.",
      },
    ],
    footnote:
      "The government outcome: deployable, multilingual, 24×7 readiness infrastructure, tracked by usage, improvement and placement linkage.",
  },
  closing: {
    title: "Talent is everywhere. Preparation should be too.",
    description: "Bring the AI Interview Prep Lounge to your campus.",
    cta: "Talk to our team",
  },
  howItWorks: {
    title: "How it works",
    loop: "A continuous loop — practise, improve, track.",
    items: [
      {
        title: "Deploy",
        art: "deploy",
        description:
          "The Lounge is installed within the institution's campus environment as a dedicated interview preparation facility.",
      },
      {
        title: "Access",
        art: "lounge-access",
        description: "Students access the Lounge and select the role or career pathway they want to prepare for.",
      },
      {
        title: "Practise",
        art: "practise",
        description: "The AI conducts a structured interview based on the candidate's profile and selected role.",
      },
      {
        title: "Improve",
        art: "improve",
        description:
          "Students receive immediate, actionable feedback and can continue practising to strengthen specific areas.",
      },
      {
        title: "Track",
        art: "track",
        description:
          "Institutions gain cohort-level visibility into interview readiness and areas requiring further intervention.",
      },
    ],
  },
  journey: {
    title: "A four-step journey students understand in minutes.",
    description:
      "Frontier technology that is student-friendly: contextual, multilingual and tied to outcomes.",
    items: [
      { title: "Select role & company", description: "Pick the role, company and career track to practise for." },
      {
        title: "Live AI interview",
        description: "A spoken, adaptive interview in Hindi, English or regional languages.",
      },
      {
        title: "Dynamic & personalised",
        description:
          "Each interview is customised to the resume and aspirations of the student. It coaches, guides and helps prepare.",
      },
      {
        title: "Instant feedback",
        description: "Scores, strengths, gaps and improved answer examples. Report sent to the student on WhatsApp.",
      },
    ],
  },
} as const
