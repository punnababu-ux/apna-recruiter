/**
 * Press releases and coverage — /newsroom.
 *
 * From the Lovable prototype's "Press Releases" view (apnatime.lovable.app),
 * read on 2026-10-17. Entries without a link ("#") and repeated headlines
 * were left out. Rows are [date, headline, outlet, url], newest first.
 */

export interface PressItem {
  date: string
  year: string
  title: string
  source: string
  url: string
}

const ROWS: [string, string, string, string][] = [
  ["31 Aug 2026", "Gig Workers Shift to Fixed-Pay Jobs Amid Soaring Fuel Prices", "ET Hospitality", "https://hospitality.economictimes.indiatimes.com/news/operations/food-and-beverages/rising-fuel-prices-push-gig-workers-towards-fixed-pay-lower-cost-jobs/133644034"],
  ["29 Aug 2026", "Apna Expands AI-Powered Hiring Solutions Across India", "SME Street", "https://smestreet.in/infocus/apna-expands-ai-powered-hiring-solutions-across-india-12449891"],
  ["28 Aug 2026", "From Apple To Apna: Nirmit Parikh’s Mission To Fix India’s Job Market", "Ascendants", "https://ascendants.in/the-ascendants/apna-digital-hiring-platform-india-nirmit-parikh/"],
  ["14 Aug 2026", "AI-skilled job postings more than double in Q1 FY27 as demand spreads beyond tech roles: Report", "ANI News", "https://www.aninews.in/news/business/ai-skilled-job-postings-more-than-double-in-q1-fy27-as-demand-spreads-beyond-tech-roles-report20260814163810"],
  ["05 Aug 2026", "How AI is changing HR & hiring", "Millennium Post", "https://www.millenniumpost.in/k-reers/how-ai-is-changing-hr-hiring-671115"],
  ["23 Jul 2026", "Amazon, Uber to lay off more employees as AI reshapes tech workforce", "NDTV", "https://www.ndtv.com/business-news/amazon-uber-to-lay-off-more-employees-as-ai-reshapes-tech-workforce-11810379"],
  ["20 Jul 2026", "Exclusive: Permanent, industry-aligned skilling institutions key to building India's future-ready workforce, say experts", "Times Now", "https://www.timesnownews.com/business-economy/economy/exclusive-permanent-industry-aligned-skilling-institutions-key-to-building-indias-future-ready-workforce-say-experts-article-155138497"],
  ["16 Jul 2026", "Apna AI Readiness Pulse 2026: AI is becoming a core workplace skill across marketing, advertising and content", "CXOToday", "https://cxotoday.com/media-coverage/apna-ai-readiness-pulse-2026-ai-is-becoming-a-core-workplace-skill-across-marketing-advertising-and-content/"],
  ["16 Jul 2026", "Stock Market Sensex, Nifty live updates today, 16 July: US-Iran war, oil price and more", "NDTV", "https://www.ndtv.com/business-news/stock-market-sensex-share-market-nifty-live-updates-today-16-july-us-iran-war-oil-price-11777698"],
  ["10 Jul 2026", "Karnataka youth jobless, studying, Bengaluru migration and workforce report", "NDTV", "https://www.ndtv.com/india-news/karnataka-youth-jobless-studying-bengaluru-migration-workforce-report-11753068"],
  ["10 Jul 2026", "Can subsidies alone deliver Gujarat's ₹6 lakh cr AI data centre plan?", "Analytics India Magazine", "https://analyticsindiamag.com/ai-features/can-subsidies-alone-deliver-gujarats-6-lakh-cr-ai-data-centre-plan"],
  ["26 Jun 2026", "MSME hiring rises 25% in FY25; sales roles dominate demand: Report", "ET HRWorld", "https://hr.economictimes.indiatimes.com/news/hrtech/talent-acquisition-and-management/msme-hiring-rises-25-in-fy25-sales-roles-dominate-demand-report/132010148"],
  ["26 Jun 2026", "Apna MSME Hiring Pulse 2026: India's MSMEs are hiring more, and hiring differently", "PNI News", "https://www.pninews.com/apna-msme-hiring-pulse-2026-indias-msmes-are-hiring-more-and-hiring-differently/"],
  ["25 Jun 2026", "MSME sector sees 164% surge in AI skill demand; workforce turns geographically dispersed: Report", "ANI News", "https://www.aninews.in/news/business/msme-sector-sees-164-surge-in-ai-skill-demand-workforce-turns-geographically-dispersed-report20260625161445/"],
  ["08 Jun 2026", "Startup news and updates: Daily roundup (June 8, 2026)", "YourStory", "https://yourstory.com/2026/06/startup-news-and-updates-daily-roundup-june-8-2026"],
  ["08 Jun 2026", "Apna eyes ₹150 crore revenue from its AI-led push for India's workforce", "The Hindu BusinessLine", "https://www.thehindubusinessline.com/info-tech/apna-eyes-150-crore-revenue-from-ai-led-push-for-indias-300-million-blue-collar-workers/article71072753.ece"],
  ["08 Jun 2026", "Apna launches India's first AI Interview Prep Lounge in Mumbai", "Indian Startup Times", "https://www.indianstartuptimes.com/news/apna-launches-indias-first-ai-interview-prep-lounge-in-mumbai-to-help-job-seekers-improve-interview-readiness/"],
  ["08 Jun 2026", "Apna opens AI Interview Prep Lounge at Atal Bihari Vajpayee Kaushalya Vikas Kendra", "CXOToday", "https://cxotoday.com/media-coverage/apna-launches-indias-first-ai-interview-prep-lounge-at-atal-bihari-vajpayee-kaushalya-vikas-kendra/"],
  ["08 Jun 2026", "Apna launches India's first AI Interview Preparation Lounge", "Manufacturing Today", "https://www.manufacturingtodayindia.com/apna-ai-interview-lounge"],
  ["05 Jun 2026", "Creator economy jobs: India Inc builds creator workforce as influencer marketing matures", "Business Standard", "https://www.business-standard.com/companies/news/india-inc-builds-creator-workforce-as-influencer-marketing-matures-126060500490_1.html"],
  ["05 Jun 2026", "India AI Mission: States, investment and tech across Karnataka, Uttar Pradesh and Andhra", "NDTV", "https://www.ndtv.com/business-news/india-ai-mission-states-investment-tech-karnataka-uttar-pradesh-andhra-11594912"],
  ["29 May 2026", "Companies lap up creators as they trade side hustles for pay slips", "Livemint", "https://www.livemint.com/industry/corporate-hiring-influencers-content-creators-marketing-11779947055024.html"],
  ["24 Mar 2026", "Ambition 2.0: The Rise Of India's Women Leaders", "Her Circle", "https://www.hercircle.in/engage/career/career/ambition-2-0-the-rise-of-indias-women-leaders-10243.html"],
  ["08 Mar 2026", "Women's applications for leadership roles jump 43% in India: Apna report", "Storyboard18", "https://www.storyboard18.com/how-it-works/womens-applications-for-leadership-roles-jump-43-in-india-apna-report-91469.htm"],
  ["05 Mar 2026", "Women's job applications for leadership roles rise 43% YoY, reports Apna.co", "CXOToday", "https://cxotoday.com/media-coverage/womens-job-applications-for-leadership-roles-rise-43-yoy-reports-apna-co/"],
  ["27 Jan 2026", "Over 9 crore job applications, 14 lakh jobs posted, and 35% increase in women applications in leadership & managerial roles: reveals Apna.co's 'India at Work 2025' report", "CXOToday", "https://cxotoday.com/media-coverage/over-9-crore-job-applications-14-lakh-jobs-posted-and-35-increase-in-women-applications-in-leadership-managerial-roles-reveals-apna-cos-india-at-work-2025-report/"],
  ["12 Jan 2026", "India at Work 2025: Apna's hiring trends and insights report", "LinkedIn", "https://www.linkedin.com/posts/apnahq_indiaatwork2025-apna-hiringinsights-activity-7416456495698952192-SrZp"],
  ["12 Dec 2025", "Apna extends reach among mobile-first jobseekers, aiming for a 30% surge in new users", "MTI News", "https://mtinews.in/apna-extends-reach-among-mobile-first-jobseekers-aiming-for-a-30-surge-in-new-users-by-2026/"],
  ["10 Dec 2025", "Apna deepens its mobile-first push for India's jobseekers", "CXOToday", "https://cxotoday.com/media-coverage/apna-extends-reach-among-mobile-first-jobseekers-aiming-for-a-30-surge-in-new-users-by-2026/"],
  ["25 Sep 2025", "Apna rolls out AI safety system, claims 45% fraud cut in pilot as festive hiring nears 2 lakh", "Fortune India", "https://www.fortuneindia.com/business-news/festive-hiring-seen-at-2-lakh-apnaco-rolls-out-ai-safety-system-claims-45-fraud-cut-in-pilot/127007"],
  ["22 Aug 2025", "Apna launches AI Calling Agent to cut hiring time by half", "Entrackr", "https://entrackr.com/news/apna-launches-ai-calling-agent-to-cut-hiring-time-by-half-9687691"],
  ["14 Aug 2025", "Apna launches job-posting-integrated multilingual AI calling agent", "The Times of India", "https://timesofindia.indiatimes.com/technology/artificial-intelligence/apna-co-launches-job-posting-integrated-multilingual-ai-calling-agent/articleshow/123297077.cms"],
  ["13 Jun 2025", "Apna unveils AI interview tool for job seekers", "The Hindu", "https://www.thehindu.com/business/apnaco-unveils-ai-interview-tool-for-job-seekers/article69691632.ece"],
  ["11 Jun 2025", "Apna's interview prep tool records 760K AI interviews", "Business Standard", "https://www.business-standard.com/companies/start-ups/ai-interview-tools-help-boost-confidence-of-job-seekers-apna-data-125061101237_1.html"],
  ["18 Dec 2024", "Hiring Platform Apna's FY24 Loss More Than Halves To INR 51 Cr", "Inc42", "https://inc42.com/buzz/hiring-platform-apnas-fy24-loss-more-than-halves-to-inr-51-cr"],
  ["26 Nov 2024", "Apna.co sees a significant increase in healthcare job openings", "The Times of India", "https://timesofindia.indiatimes.com/technology/tech-news/apna-co-sees-a-significant-increase-in-healthcare-job-openings/articleshow/115527327.cms"],
  ["14 Nov 2024", "Overall job postings surged by 20% this festive season, professional networking platform apna.co says", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co/news"],
  ["30 Oct 2024", "BFSI among most sought-after sectors by women, 50% of job applicants seek WFH opportunities: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co/news"],
  ["12 Sep 2024", "Small Businesses generate 35 mn job applications till Aug 2024: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co/news"],
  ["28 Aug 2024", "Rubicon, apna.co partner to enable 50,000+ job opportunities in FY25", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co/news"],
  ["09 Jul 2024", "BFSI, hospitality sectors driving job market in 2024: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/Apna.co"],
  ["20 Jun 2024", "Improved hiring sentiment, more job postings in 2024: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co/news"],
  ["30 Apr 2024", "Surge in job application from women from tier II, III cities in last 4 years: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/Apna.co"],
  ["12 Mar 2024", "apna.co introduces “apna Canvas”, aims to connect 2 crore freshers with over 7 lakh organizations for comprehensive hiring", "ForPressRelease", "https://forpressrelease.com/forpressrelease/642149/4/apnaco-introduces-apna-canvas-aims-to-connect-2-crore-freshers-with-over-7-lakh-organizations-for-comprehensive-hiring"],
  ["05 Jan 2024", "How Government Support Propelled Apna.co to Transform Job Market?", "TICE News", "https://www.tice.news/tice-trending/government-support-propelled-apnaco-to-transform-job-market-8611407"],
  ["20 Dec 2023", "Digitization revolutionizing the job industry; 2.1L SMBs and 400 enterprise hired online using apna in 2023; projected to triple by FY25", "CXOToday", "https://cxotoday.com/press-release/digitization-revolutionizing-the-job-industry-2-1l-smbs-and-400-enterprise-hired-online-using-apna-in-2023-projected-to-triple-by-fy25"],
  ["15 Aug 2023", "apna's Independence Day Campaign “Apna India” Celebrates a Year of AI-Powered Milestones", "apna Career Central", "https://apna.co/career-central/category/news"],
  ["10 Aug 2023", "People Matters TechHR 2023 Flashback: Bridging Past and Future in HR Recruitment with apna.co", "apna Career Central", "https://apna.co/career-central/category/news"],
  ["28 Jul 2023", "Introducing Candid by apna: Your Go-To Podcast for Insightful HR Conversations", "apna Career Central", "https://apna.co/career-central/category/news"],
  ["05 Jun 2023", "Freshers Rising to the Skills-Based Economy in India, shows apna's research", "apna Career Central", "https://apna.co/career-central/category/news"],
  ["18 May 2023", "Tech Careers Redefined: apna.co Partners with AWS re/Start via Generation India Foundation", "apna Career Central", "https://apna.co/career-central/category/news"],
  ["27 Apr 2023", "Swiggy partners with apna to hire 10,000 gig workers from tier 2, 3 cities", "Business Standard", "https://business-standard.com/amp/companies/news/swiggy-partners-with-apna-to-hire-10-000-gig-workers-from-tier-2-3-cities-123042700686_1.html"],
  ["25 Apr 2023", "Vodafone Idea partners with apna to enable access to 40,000 jobs in Gujarat", "The Fast Mode", "https://www.thefastmode.com/investments-and-expansions/27107-vodafone-idea-partners-with-apna-to-enable-access-to-40-000-jobs-in-gujarat"],
  ["15 Mar 2023", "Salary remains a key motivator for 74% Indians; benefits like medical insurance becomes important criteria: apna.co", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co/news"],
  ["28 Feb 2023", "Women job seekers posted 44 applications every minute in 2023: Job portal", "The Economic Times", "https://economictimes.indiatimes.com/topic/Apna.co"],
  ["10 Feb 2023", "One crore job applications received from women in tier-II, III cities in 2023: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co-jobs/news"],
  ["20 Jan 2023", "Majority of companies planning to recruit this fiscal: Report", "The Economic Times", "https://economictimes.indiatimes.com/topic/apna-co-jobs/news"],
]

export const PRESS = {
  meta: { title: "Press releases", description: "News, announcements and media coverage on how apna is building the future of work for Bharat." },
  eyebrow: "Newsroom",
  title: "Press releases",
  titleAccent: "Press",
  description: "News, announcements and media coverage on how apna is building the future of work for Bharat.",
  /** The year filter: the two latest years, then everything older. */
  filters: ["2026", "2025", "Earlier"] as const,
  items: ROWS.map(([date, title, source, url]): PressItem => ({ date, year: date.slice(-4), title, source, url })),
}
