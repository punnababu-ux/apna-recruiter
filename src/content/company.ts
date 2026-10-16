/**
 * Company pages: About (overview, culture, numbers, leadership, management),
 * Join Us, Awards and Customer Stories.
 *
 * Sourcing: copy from the Lovable prototype (apnatime.lovable.app), read on
 * 2026-10-17. The prototype switches these views in place without a URL
 * (About Us / Apna In The News / Customer Stories menus), so they were read
 * by opening each one; counter values come from the counters' targets in
 * its code, since the rendered text reads "0" until they animate. Layout
 * and look are this site's own. "apna" is lower case, as everywhere here.
 *
 * About overview: the prototype's "Built for every job seeker" block is
 * left out by design (user call, 2026-10-17): this is the recruiter site.
 *
 * Customer Stories: the per-company results (PwC, HDFC Bank, …) are the
 * prototype's and have no story pages behind them yet — verify each with
 * the customer before this goes live. Only PwC has a full story (its own
 * page, /customer-stories/pwc); the rest, the talent stories and the
 * library are cards without a page, as in the prototype.
 */

export const ABOUT_OVERVIEW = {
  meta: {
    title: "About us",
    description: "apna is India's largest early-talent, AI-first hiring platform, connecting talent with opportunity at scale.",
  },
  eyebrow: "About apna",
  title: "Building the bridge between talent and opportunity.",
  /** Set in italic in the headline. */
  titleAccent: "opportunity",
  intro:
    "apna is India’s largest early-talent, AI-first hiring solution, built to solve one of the country’s biggest challenges: connecting people to the right opportunities, at scale.",
  founder: {
    eyebrow: "Founded in 2019",
    name: "Nirmit Parikh",
    role: "Founder, Group CEO",
    // His own words, from the Leadership page.
    quote: "Talent is everywhere, but opportunity isn’t.",
  },
  storyTitle: "How we got here",
  body: "Founded in 2019 by Nirmit Parikh, apna set out with a simple mission: to enable livelihoods for billions across India by closing the network and access gap that keeps talented people from finding the right jobs. Today, that mission has grown into India’s largest early-career job marketplace, connecting 6 crore+ job seekers with 7 lakh+ businesses and enterprises across 7,200+ towns and cities.",
  story: [
    {
      marker: "2019",
      title: "A job market where opportunity wasn’t equally accessible.",
      description:
        "Nirmit Parikh identified a fundamental gap in India’s employment ecosystem: for millions of skilled workers beyond the metros, access to the right opportunities was still shaped by middlemen, networks and proximity, not merit. The challenge wasn’t a lack of talent. It was a lack of access.",
    },
    {
      marker: "400M",
      title: "A vast workforce, largely invisible to the formal hiring ecosystem.",
      description:
        "India has a workforce of over 400 million people with real skills and internet access, yet most of them are invisible to traditional professional platforms.",
    },
    {
      marker: "apna",
      title: "apna built the bridge, reimagining how India connects talent with opportunity.",
      description:
        "apna was built to make access to work more direct, inclusive and efficient. What began as a platform connecting individuals with relevant opportunities evolved into a technology-led employment ecosystem, helping talent discover opportunities while enabling employers to access a larger, more relevant workforce.",
    },
    {
      marker: "Today",
      title: "India’s largest early talent pool.",
      description:
        "Today, apna connects 6 crore+ users across 7,200+ towns and cities, creating access to jobs, professional networks and upskilling opportunities. By bringing talent and employers closer together through technology, apna is helping shape a more accessible and efficient workforce ecosystem for India.",
    },
  ],
  mission: {
    title: "What sets apna apart is how we build.",
    description:
      "Our mission is to enable livelihoods for billions, by closing the network and access gap that keeps talented people from the right jobs.",
  },
  audiences: [
    {
      key: "recruiters",
      label: "For recruiters",
      title: "Built for recruiters across every hiring need.",
      description:
        "Everything you need to find, screen, and hire the right talent faster, powered by AI and India's largest early-career marketplace.",
      items: [
        {
          title: "Full-funnel hiring, automated",
          tagline: "From sourcing to shortlist, hands-free.",
          description:
            "AI runs the entire hiring workflow end to end, sourcing, interviewing, and shortlisting candidates without manual intervention, cutting average hiring time by up to 50%.",
        },
        {
          title: "AI that calls, screens & never gives up",
          tagline: "Every candidate, followed through.",
          description:
            "AI-led calling engages candidates 24/7, conducting screening interviews and shortlisting in real time, with up to 5 automated follow-ups per candidate, driving response rates as high as 80%.",
        },
        {
          title: "Precision candidate discovery",
          tagline: "Not just nearby. Exactly right.",
          description:
            "Radius-based search combined with 22+ advanced filters lets recruiters pinpoint candidates by location, skill, experience, and intent, surfacing the most relevant match instead of the widest possible list.",
        },
        {
          title: "Recruiter workflows, simplified",
          tagline: "Post, manage, hire, without the friction.",
          description:
            "Ready-to-use AI templates strip the manual effort out of job posting and candidate management, giving recruiters hours back in their day.",
        },
        {
          title: "Trust & verification built in",
          tagline: "Safety first, always.",
          description:
            "Rigorous verification protocols and scam-free safeguards protect both sides of the marketplace, built from the ground up for millions of first-time job seekers and the recruiters hiring them.",
        },
      ],
    },
  ],
} as const

export const ABOUT_VALUES = {
  meta: { title: "Our culture and values", description: "The principles that guide how we work at apna." },
  eyebrow: "Our culture",
  title: "Our culture and values",
  description: "The principles that guide how we work and decide how we grow together.",
  values: [
    {
      title: "Ownership",
      points: [
        "We think and act like owners when making any decision at the company.",
        "We collaborate, think, and act to drive outcomes.",
        "We own our decisions end to end and see them through.",
        "We strive to go above and beyond to make apna better every day.",
      ],
    },
    {
      title: "Customer obsession",
      points: [
        "We solve for long-term customer success, not happiness.",
        "We build simple, high quality, and scalable products.",
        "We keep the customer at the centre of every decision.",
        "We obsess over the customer, not the competition.",
      ],
    },
    {
      title: "Empathy",
      points: [
        "We listen to understand.",
        "We are brutally honest but respectful.",
        "We care and build trust with colleagues and customers.",
        "We are inclusive.",
      ],
    },
    {
      title: "Transparency & fairness",
      points: [
        "We believe in sharing across the organisation.",
        "We take unbiased decisions, purely on their merit, aligned to our values.",
        "We do not shy away from speaking fearlessly, especially when sharing bad news.",
        "We have open access to anyone in the company.",
      ],
    },
  ],
  closing: "Building Bharat's workforce in the AI economy.",
} as const

export const ABOUT_NUMBERS = {
  meta: { title: "apna by the numbers", description: "The scale of India's largest early-career hiring marketplace." },
  eyebrow: "By the numbers",
  title: "apna by the numbers.",
  description:
    "The scale of India's largest early-career hiring marketplace, measured across candidates, recruiters, and the towns and cities we reach.",
  groups: [
    {
      key: "overall",
      label: "Overall",
      blurb: "Live counts from India’s largest early-career hiring engine.",
      stats: [
        { value: "6 Cr+", label: "Registered job seekers" },
        { value: "7 L+", label: "Verified recruiters" },
        { value: "7,200+", label: "Towns & cities covered" },
        { value: "30%+", label: "Of Nifty 500 companies hire on apna" },
        { value: "20+", label: "Industries scaling hiring with apna" },
        { value: "10 Cr+", label: "Applications submitted till date" },
      ],
    },
    {
      key: "recruiters",
      label: "For recruiters",
      blurb: "What hiring on apna looks like for businesses of every size.",
      stats: [
        { value: "7 L+", label: "Recruiters hiring on apna" },
        { value: "50 L+", label: "Jobs posted till date" },
        { value: "72 hrs", label: "Median time to first qualified applicant" },
        { value: "20+", label: "Industries hiring across the platform" },
        { value: "900+", label: "Enterprise accounts served" },
        { value: "3x", label: "Faster closures vs traditional channels" },
      ],
    },
    {
      key: "candidates",
      label: "For candidates",
      blurb: "How job seekers find and win work on apna.",
      stats: [
        { value: "6 Cr+", label: "Registered candidates" },
        { value: "10 Cr+", label: "Applications submitted" },
        { value: "7,200+", label: "Towns & cities with active jobs" },
        { value: "5 L+", label: "Interviews scheduled every month" },
        { value: "70%", label: "Candidates from Tier 2 & 3 India" },
        { value: "₹0", label: "Cost to apply, always free" },
      ],
    },
  ],
} as const

export interface Person {
  name: string
  role: string
  bio: string
  linkedin: string
}

export const ABOUT_LEADERSHIP = {
  meta: { title: "Our leadership", description: "The leaders and investors behind apna." },
  eyebrow: "Our leadership",
  title: "Guided by experience. Backed by the best.",
  description:
    "Our board comprises industry veterans, strategic investors, and visionary leaders committed to shaping the future of India's workforce.",
  people: [
    {
      name: "Nirmit Parikh",
      role: "Founder, Group CEO",
      bio: "We started apna with a simple belief: that talent is everywhere, but opportunity isn't. Everything we build is in service of closing that gap, using technology to put dignified, life-changing work within reach of every Indian, and to help businesses find the people who will define their next decade.",
      linkedin: "https://www.linkedin.com/in/nirmitparikh/",
    },
    {
      name: "Kartik Narayan",
      role: "CEO",
      bio: "I believe the future of work will be shaped by how intelligently we connect people, opportunity, and technology. At apna, I'm focused on using AI to make hiring more accessible, efficient, and outcome-driven, building for Bharat at scale and redefining what's possible for the future of work.",
      linkedin: "https://www.linkedin.com/in/kartik/",
    },
    {
      name: "Karna Chokshi",
      role: "Group COO",
      bio: "Great execution is what turns ambition into impact. As Group COO, I'm focused on building the operating rigour, systems, and teams that let apna scale with speed and consistency, so every business we serve and every job seeker we reach experiences the same standard of excellence.",
      linkedin: "https://www.linkedin.com/in/karnachokshi/",
    },
  ] satisfies Person[],
  investors: {
    title: "Backed by the investors who backed India's internet.",
    names: ["Lightspeed", "Peak XV Partners", "Tiger Global", "GSV Ventures", "Insight Partners", "Owl Ventures"],
  },
} as const

export const ABOUT_MANAGEMENT = {
  meta: { title: "Management team", description: "The team leading apna forward." },
  eyebrow: "Management team",
  title: "Leading apna forward",
  description:
    "Behind apna is a team united by a shared vision: to make hiring smarter and opportunities more accessible through AI. Across product, engineering, AI, business, operations, customer success, people, and marketing, our teams work together to solve real-world hiring challenges.",
  people: [
    {
      name: "Abhishek Ranjan",
      role: "Chief Technology Officer",
      bio: "Building technology that works in the real world. At apna, I'm focused on creating AI-native systems that make hiring faster, smarter, and more reliable at Bharat-scale, backed by engineering built for performance, ownership, and relentless execution.",
      linkedin: "https://www.linkedin.com/in/abhishek-ranjan-engg/",
    },
    {
      name: "Yuvraj Khemani",
      role: "Head of Finance",
      bio: "Numbers tell the story. I make sure the story adds up. At apna, I build the financial discipline, rigour, and clarity that enable an ambitious AI-native business to scale boldly, responsibly, and sustainably.",
      linkedin: "https://www.linkedin.com/in/yuvraj-khemani-22496081/",
    },
    {
      name: "Akshayita Saxena",
      role: "Head of Growth & Marketing",
      bio: "I believe the most meaningful careers are built around convictions worth pursuing. At apna, I'm focused on taking the future of work deeper into Bharat, using growth, technology, and AI to unlock opportunity across every city, every collar, and every ambition.",
      linkedin: "https://www.linkedin.com/in/saxenaakshayita/",
    },
    {
      name: "Sonu Abhinandan",
      role: "Head of SMB Business",
      bio: "Building for the businesses that power Bharat. At apna, I'm focused on taking smarter, AI-powered hiring deeper into the SMB ecosystem, helping businesses across cities find the right talent, grow faster, and build for what's next.",
      linkedin: "https://www.linkedin.com/in/sonuabhinandan/",
    },
    {
      name: "Mayuresh Shinde",
      role: "Head of Enterprise Business",
      bio: "Enterprise hiring should be more than functional; it should be intelligent, seamless, and outcome-driven. At apna, I'm focused on scaling our AI-native enterprise business and delivering an end-to-end hiring experience that transforms how organisations discover, engage, and hire talent.",
      linkedin: "https://www.linkedin.com/in/mayuresh-shinde-ms-66293a7/",
    },
    {
      name: "Sumit Bajaj",
      role: "Head of Product",
      bio: "I believe the future of hiring is about making the right opportunity discoverable, and the right talent easier to find. At apna, I'm building AI-native products that make hiring smarter, simpler, and more meaningful at Bharat-scale.",
      linkedin: "https://www.linkedin.com/in/sumit-bajaj-6b688624/",
    },
    {
      name: "Kathak Mehta",
      role: "Strategy, CEO's Office",
      bio: "I strategise initiatives at apna, bringing expertise in technology commercialisation, innovation, and entrepreneurship to shape growth and long-term business strategy.",
      linkedin: "https://www.linkedin.com/in/kathak-mehta/",
    },
    {
      name: "Apoorva Patwa",
      role: "Head of HR",
      bio: "Building great companies starts with building great teams. At apna, I'm focused on creating a culture where exceptional talent can thrive, leaders can build with purpose, and people are empowered to shape the future of work.",
      linkedin: "https://www.linkedin.com/in/apoorva-patwa/",
    },
  ] satisfies Person[],
} as const

export const CAREERS = {
  meta: { title: "Join us", description: "Build what millions run on. Careers at apna." },
  eyebrow: "Join the mission",
  title: "Build what millions run on",
  description:
    "In the time it takes to read this sentence, someone in India just got hired. Now imagine building that.",
  body: "We move at the pace of real lives. Every launch, every experiment, every line of code closes the gap between someone and their next paycheck. If you want to see your work change lives in seconds, this is your place.",
  cta: { label: "See open roles", href: "https://careers.apna.co" },
  life: {
    title: "Life at apna",
    items: [
      {
        title: "Bold calls over safe ones. Momentum over meetings.",
        description:
          "Speed is the culture. Markets shift. AI shifts. We shift faster. If “figure it out” excites you more than it scares you, you'll feel at home.",
      },
      {
        title: "Ownership over hierarchy.",
        description:
          "We trust our people. You'll run projects that matter, not sit in on ones that don't. Your impact is measured by outcomes, not micromanagement.",
      },
      {
        title: "People who raise your bar.",
        description:
          "Honest feedback. High standards. You will be surrounded by teammates who want you to be better, not just busier.",
      },
    ],
  },
  closing: {
    title: "Ready to make an impact?",
    description:
      "Millions of careers are waiting on the other side of what you build next. Join us in shaping the future of India's workforce.",
  },
} as const

export const AWARDS = {
  meta: { title: "Awards and certifications", description: "Recognition for hiring built with trust, security and scale for Bharat." },
  eyebrow: "Awards and certifications",
  title: "Recognition that belongs to everyone we empower",
  description:
    "Every trophy, certification, and accreditation is a marker of the same thing: hiring built with trust, security, and scale for Bharat.",
  items: [
    {
      by: "OpenAI",
      title: "Honoured for passing 10 billion tokens",
      year: "2025",
      description: "One of the largest AI deployments in Indian hiring, recognised directly by OpenAI.",
    },
    {
      by: "Freshworks",
      title: "Customer Excellence",
      year: "2025",
      description: "Recognised for the quality of service and outcomes we deliver to our customers.",
    },
    {
      by: "Marksmen Daily",
      title: "Most Preferred Workplace for Women 2025-26",
      year: "2025",
      description: "Certified for building an inclusive workplace where women can build long careers.",
    },
    {
      by: "Marksmen Daily, 5th edition",
      title: "Most Preferred Workplace 2025-26",
      year: "2025",
      description: "Certified across five consecutive editions as one of India's most preferred places to work.",
    },
    {
      by: "SRIF, Staffing and Recruitment Industry Federation",
      title: "Title Partner, SRIF HR Summit 2025",
      year: "2025",
      description: "Presented with gratitude for our support of India's staffing and recruitment community.",
    },
    {
      by: "SHRM, presented to Nirmit Parikh",
      title: "SHRM Trailblazer 2026",
      year: "2026",
      description: "In recognition of exceptional leadership and contribution to shaping progressive people practices.",
    },
    {
      by: "Retailers Association of India",
      title: "Distinguished Speaker, Retail HR Tech Summit",
      year: "2024",
      description: "Recognising apna's voice in shaping the future of retail hiring and HR technology.",
    },
    {
      by: "Bengaluru Tech Summit, Government of Karnataka",
      title: "Bengaluru Impact Award, Unicorn 2020-21",
      year: "2021",
      description: "Awarded for emerging as a unicorn and for the impact created for India's workforce.",
    },
  ],
} as const

export const CUSTOMER_STORIES = {
  meta: { title: "Customer stories", description: "From Nifty 500 giants to fast-scaling startups, this is how India hires with apna." },
  eyebrow: "Customer stories",
  title: "Real businesses. Real hires.",
  description: "From Nifty 500 giants to fast-scaling startups, this is how India hires with apna.",
  stats: [
    { value: "30%+", label: "Of Nifty 500 companies hire on apna" },
    { value: "20+", label: "Industries scaling hiring with apna" },
    { value: "7 Lakh+", label: "Recruiters trust apna" },
    { value: "6 Cr+", label: "Job seekers on the platform" },
    { value: "900+", label: "Cities covered" },
  ],
  featured: {
    title: "Featured stories",
    items: [
      { company: "PwC", href: "/customer-stories/pwc", result: "43% more quality campus registrations by turning Campus Contender into an employer branding moment." },
      { company: "HDFC Bank", result: "Reduced cost-per-hire by 40% for frontline sales roles." },
      { company: "Zomato", result: "Scaled fleet operations simultaneously in 50+ new pin codes." },
      { company: "Flipkart", result: "Staffed festive season warehouses with 8,000+ hires in 3 weeks." },
      { company: "Tata Motors", result: "Built a shop-floor talent pipeline across 6 manufacturing plants." },
      { company: "Swiggy", result: "Cut time-to-onboard for city fleet partners from 9 days to 2." },
      { company: "Licious", result: "Hired trained store and delivery staff across 14 cities." },
      { company: "BigBasket", result: "Ran always-on hiring for dark stores with 30% lower attrition." },
      { company: "Teamlease", result: "Sourced 25,000+ verified candidates for client mandates in a quarter." },
    ],
  },
  talent: {
    title: "Talent stories",
    items: [
      { tag: "Work & career", title: "How Meera Nair went from tele-caller to branch sales lead in 18 months" },
      { tag: "Logistics", title: "How Arjun Sharma switched from retail floor to warehouse operations" },
      { tag: "Work & career", title: "How Priya Deshmukh restarted her career after a five-year break" },
      { tag: "BPO", title: "How Imran Qureshi turned a night-shift job into a team-lead role" },
    ],
  },
  library: {
    title: "Customer story library",
    allIndustries: "All industries",
    search: "Search companies",
    empty: "No customer stories match your filters yet.",
    industries: ["Staffing", "BPO", "BFSI", "Logistics & Delivery", "Manufacturing", "Retail", "Food & QSR", "Travel & Hospitality", "Healthcare", "Construction", "IT/Tech", "Others"],
    companies: ([["Delhivery","Logistics & Delivery"],["HDFC Bank","BFSI"],["Zomato","Food & QSR"],["Amazon","Logistics & Delivery"],["Flipkart","Retail"],["Reliance Retail","Retail"],["Swiggy","Food & QSR"],["Tata Motors","Manufacturing"],["ICICI Bank","BFSI"],["Licious","Food & QSR"],["BigBasket","Retail"],["Teamlease","Staffing"],["Quess Corp","Staffing"],["Randstad India","Staffing"],["Adecco India","Staffing"],["Concentrix","BPO"],["Teleperformance","BPO"],["WNS Global","BPO"],["Firstsource","BPO"],["Axis Bank","BFSI"],["Bajaj Finserv","BFSI"],["Paytm","BFSI"],["PolicyBazaar","BFSI"],["Blue Dart","Logistics & Delivery"],["Ecom Express","Logistics & Delivery"],["Porter","Logistics & Delivery"],["Zepto","Logistics & Delivery"],["Mahindra & Mahindra","Manufacturing"],["Havells","Manufacturing"],["Foxconn India","Manufacturing"],["DMart","Retail"],["Lenskart","Retail"],["Titan","Retail"],["Domino's India","Food & QSR"],["Rebel Foods","Food & QSR"],["Cafe Coffee Day","Food & QSR"],["OYO","Travel & Hospitality"],["MakeMyTrip","Travel & Hospitality"],["IndiGo","Travel & Hospitality"],["Taj Hotels","Travel & Hospitality"],["Apollo Hospitals","Healthcare"],["PharmEasy","Healthcare"],["Practo","Healthcare"],["L&T Construction","Construction"],["Godrej Properties","Construction"],["Shapoorji Pallonji","Construction"],["TCS","IT/Tech"],["Infosys BPM","IT/Tech"],["Wipro","IT/Tech"],["Byju's","Others"],["Urban Company","Others"],["Vodafone Idea","Others"]] as const).map(([company, industry]) => ({ company, industry })),
  },
  closing: { title: "Your industry's next hiring story starts here.", cta: "Talk to sales" },
} as const

/** /customer-stories/pwc — the prototype's one full case study. */
export const STORY_PWC = {
  meta: { title: "PwC × apna CampusAI", description: "How PwC turned Campus Contender into an employer branding moment with apna CampusAI." },
  eyebrow: "Customer story · CampusAI",
  title: "43% more quality campus registrations for PwC's Campus Contender",
  description:
    "Campus Contender went from a reliable registration driver to a differentiated employer branding moment for top MBA talent.",
  facts: [
    { label: "Client", value: "PwC" },
    { label: "Industry", value: "Consulting & professional services" },
    { label: "Campaign", value: "Campus Contender" },
    { label: "Campaign type", value: "Employer branding" },
  ],
  headline: { value: "43%", label: "increase in registrations vs. the previous edition of Campus Contender" },
  sections: [
    {
      title: "Company overview",
      paragraphs: [
        "PwC runs Campus Contender, a flagship campus engagement program designed to build brand recall and attract high-quality MBA consulting talent ahead of its hiring cycles. As one of the most recognised names in professional services, PwC's campus programs are held to a high bar, not just for reach, but for the quality of experience they deliver to prospective hires.",
      ],
    },
    {
      title: "The challenge",
      paragraphs: [
        "Campus Contender had run successfully for several years on another campus engagement platform, consistently generating strong registration numbers. But the offline finale, the campaign's most visible moment, lacked the creativity and engagement PwC wanted. The execution felt transactional rather than memorable, limiting the impact of an otherwise strong program on the participants it was designed to win over.",
        "PwC wasn't looking to replace a registration platform. It was looking for a partner capable of elevating the entire campaign experience.",
      ],
    },
    {
      title: "Why PwC chose apna",
      paragraphs: [
        "Rather than pitching apna as another campaign platform, our team proposed a series of enhancements to the offline finale itself: participant experience, event flow, engagement formats, and overall campaign storytelling. This depth of planning signalled that apna was invested in the success of Campus Contender, not just in delivering registrations.",
        "That consultative approach, paired with proactive client success support throughout the campaign, set apna apart from the incumbent vendor.",
      ],
    },
  ],
  solution: {
    title: "The solution",
    intro: "Under its CampusAI Employer Branding offering, apna delivered an end-to-end campaign experience for Campus Contender, including:",
    items: [
      "Campaign microsite hosted on apna",
      "Student outreach and registrations",
      "Assessment platform and candidate management",
      "Communication throughout the campaign",
      "On-ground support for campaign execution",
      "Strategic planning for the offline finale and participant engagement",
    ],
    outro: "apna functioned as an operational partner across both campaign delivery and candidate experience.",
  },
  results: {
    title: "The results",
    columns: ["Metric", "Outcome"] as const,
    rows: [
      { metric: "Registrations vs. previous edition", outcome: "43% increase" },
      { metric: "Assessment participation", outcome: "Strong candidate engagement throughout" },
      { metric: "Campaign execution", outcome: "Successfully delivered multi-stage experience" },
    ],
  },
  impact: {
    title: "Business impact",
    body: "By partnering with apna, PwC turned Campus Contender from a reliable registration driver into a differentiated employer branding moment, reinforcing PwC's position with top MBA talent at a time when every leading consulting firm is competing for the same candidates.",
  },
  closing: { title: "Want a campus campaign like this?", cta: "Get in touch" },
} as const
