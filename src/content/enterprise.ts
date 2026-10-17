/**
 * /enterprise — apna Enterprise. Copy verbatim from the live page,
 * employer.apna.co/apna-enterprise (read 2026-10-17), with typos fixed
 * ("mangement", "upto"). Two exceptions, flagged for Punna:
 *   - Reports' description: the live card repeats the section subtitle, so
 *     the line is taken from the live card's own picture ("Download
 *     candidate applications … across all jobs").
 *   - Vivek Sinha's quote drops the "Vivek Sinha: Founder CEO, Emversity.
 *     Ex-COO Unacademy" prefix the live card prints inside the quote; the
 *     company moves to his role line.
 */

export const ENTERPRISE = {
  meta: {
    title: "apna Enterprise",
    description:
      "Scalable recruitment for large-scale hiring: hire from a pool of 50M jobseekers in 200+ industries across 900+ cities in India.",
  },
  hero: {
    eyebrow: "Enterprise",
    title: "apna enterprise hiring solutions.",
    description:
      "Get closer to your target fillrate! Hire from a pool of 50M jobseekers in 200+ industries across 900+ cities in India.",
    cta: "Contact sales",
    logosTitle: "Innovative brands achieve significant results with apna Enterprise.",
    /** The live page's wall, limited to the marks we have (content/logos.ts). */
    logos: ["Aditya Birla Capital", "Bajaj Allianz", "BigBasket", "Jio", "Urban Company"],
  },
  features: {
    eyebrow: "Hiring which scales with your needs",
    title: "Everything your business needs with our Enterprise-exclusive features",
    items: [
      { icon: "award", title: "Employer branding", description: "Brand your company and become an employer of choice!" },
      {
        icon: "users",
        title: "Team management",
        description: "Give logins to your entire recruitment team. Specify access and usage permissions!",
      },
      {
        icon: "share",
        title: "ATS Integrations",
        description: "Connect with your ATS, google-sheets or ERPs, right out of the box.",
      },
      {
        icon: "chart",
        title: "Reports",
        description: "Download candidate applications received across all your jobs.",
      },
      {
        icon: "zap",
        title: "Power features to optimise hiring",
        description: "WA invites, AI lead management, Job Boosting, templates",
      },
      {
        icon: "headset",
        title: "Dedicated Customer Support",
        description: "Our team will help you onboard and solve issues to improve hiring outcomes.",
      },
    ],
  },
  plus: {
    title: "Plus you will get",
    items: [
      {
        icon: "userPlus",
        title: "Smart Inbound hiring",
        description: "Get Inbound Applications from High-Intent, Relevant Candidates",
      },
      {
        icon: "search",
        title: "AI-Powered Database Search",
        description: "Quickly connect with and hire relevant, active jobseekers around your office.",
      },
      {
        icon: "calendar",
        title: "Walk-ins",
        description: "Publish Walk-in details and get up to 5X more walk-ins compared to competition.",
      },
    ],
  },
  playbook: {
    eyebrow: "Introducing",
    title: "The India Gen Z Talent Playbook 2025",
    description:
      "Insights from 140+ People & Talent Leaders on hiring, engaging, and retaining India’s largest workforce generation.",
    cta: "Download Playbook",
    href: "https://apna.co/genzplaybook#download",
    image: "/images/enterprise/genz-playbook.avif",
  },
  testimonials: {
    title: "Customer testimonials",
    items: [
      {
        name: "Yacoob Tameem",
        role: "Talent Acquisition Manager",
        photo: "/images/enterprise/yacoob.avif",
        quote:
          "Apna has been instrumental in helping us build a robust team of fitness professionals, center managers, and sales executives, among others. Their platform's efficiency, customer service and the quality of candidates, even in the T2/ T3 market have exceeded our expectations. The biggest differentiator of Apna from a product POV is the ability to tailor/filter the search for talent on an extremely nuanced level. This coupled with their readiness to always help makes them a trusted & credible talent partner for us.",
      },
      {
        name: "Vivek Sinha",
        role: "Co-Founder, Emversity",
        photo: "/images/enterprise/vivek-sinha.avif",
        quote:
          "Hey, heard good things about Apna platform from my HR head today. Apparently, last 15 positions closed in Inside Sales were through Apna. On a side note, my advice is that sometime in future you should revise prices. My HR head told me that it is turning out to be Rs. 850 per hire for us :) Leaving too much money on the table :)",
      },
      {
        name: "Sandeep Yadav",
        role: "Regional Manager- People & Culture",
        photo: "/images/enterprise/sandeep-yadav.avif",
        quote:
          "Apna has a strong database of profiles. The quality of responses from job postings has been fantastic. It has given vast accessibility to most of job seekers in India and the relevance of the profiles is undoubtedly good. About one-third of our hiring is done through Apna. We are pleased with the services and cooperation extended by Apna. The speed of your response to our concerns and queries is highly appreciable. Please extend our deepest gratitude to the entire team.",
      },
    ],
  },
  faqs: [
    {
      value: "why-apna",
      question: "Why should I use Apna over others?",
      answer:
        "Apna has the largest pool of active candidates; it took us just 5 years to reach a 5 cr+ candidate base. Apna makes the hiring experience very personalised for you: you can opt to receive callbacks from relevant candidates, WhatsApp all the candidates in bulk to filter at scale or use our Web Dashboard to shortlist or reject applications. You can boost your job by posting a premium / Super Premium job basis your hiring needs.",
    },
    {
      value: "bulk-hiring",
      question: "I want to hire more than 10 people, do you have any bulk-hiring plans?",
      answer:
        "Yes, we offer bulk-hiring plans personalised for your needs at discounted prices. You can request a callback from our Sales team by clicking on Contact Sales button above.",
    },
    {
      value: "benefits",
      question: "What are the benefits of enterprise plan?",
      answer:
        "Enterprise plans give you access to Premium features, more visibility, API integrations and dedicated account management support. We make sure you are well taken care of!",
    },
    {
      value: "pricing",
      question: "How are the enterprise plans priced?",
      answer:
        "Enterprise plans are useful for continuous hiring and are per unit more economical compared to the retail plans. Additionally the package comes with branding capabilities, premium features, API integrations, reports and dedicated support.",
    },
  ],
} as const
