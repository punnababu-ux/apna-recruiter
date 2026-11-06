# Live employer.apna.co — knowledge base (as of 2026-11-05)

What the live recruiter app is today, page by page, so we can pick what to
build later. Captured on the Rishav account (both workspaces) in a read-only
pass: no credits spent, no candidate actions. Candidate personal data is left
out on purpose.

> ⚠️ Costs to know before clicking on live:
> - **View number** (applied or database) uses 1 database credit.
> - **CV viewed** also uses 1 database credit (from the transaction history).
> - **Excel download** uses 2 database credits; **WhatsApp invite** uses 1 database + 1 WhatsApp credit.
> - Sidebar **Contact Sales** sends a sales callback request at once, with no form.

---

## 1. Structure

### Workspaces
A switcher at the top of the sidebar: **"Workspaces (2)"**
- **Rohini Enterprises**: "Company · 24 members". Enterprise URLs (`/enterprise/...`).
- **Rishav**: "Personal · Just you". SMB URLs (`/jobs`, `/mon/...`).

The sidebar, top bar and jobs list differ by workspace:

| | Personal | Company |
|---|---|---|
| Sidebar | Jobs · Database · Reports · Credits & Usage · Billing (New) · Refer and Earn (on some pages) | Jobs · Database (Search candidates, Saved searches, Unlocked candidates) · Invite centre (Database WA invites, Job WA connects) · Reports · Credits & Usage |
| Sidebar footer | Contact Sales (Offers badge) · out-of-credits note "Oh no! You've run out of credits. Upgrade now" · **View plans** (dark, gold coin) | Customer support manager card (name + phone, dismissable) · Help & Support |
| Top bar | Available credits · Support · avatar | Support · avatar; AI calling agent promo strip on top ("Introducing AI Calling Agent… 25% off, Try AI calling") |
| Jobs list | Cards | Rows (table-like) with Duplicate + ⋮ |

### Top-bar menus
- **Available credits** (popover): Job credits, AI job calling credits (ⓘ), Database credits, each with a count; **View plans**.
- **Support** (menu): FAQs; Contact us (Mon–Sun, 9 AM–7 PM): Chat with us, Chat on WhatsApp (Recommended); Schedule training; HR best practices.
- **Avatar**: View profile, Sign out.

---

## 2. Jobs list

### Personal (`/jobs`)
- **Pending actions (1)**: an accordion.
- **All jobs (6)**, **Post a new job**, **All filters**, status chips with counts: Active · Under review · Expired · Select plan.
- **Job card**: ⭐ for premium, title, status tag, area + city, "Posted on", owner, primary action, ⋮.
  - Expired → **Repost now**; footer "Repost now to receive new candidates".
  - Select plan (unpaid draft) → **Finish posting**; footer "Finish job posting to start receiving candidates".
  - Three numbers: **Applied to job** (link) · **Active leads** · **Database matches**.

### Company (`/enterprise/jobs`)
- **Pending actions (1)**: "Book a free live training session with one of our product experts · Schedule training".
- **All jobs (247)**, chips: Active (0) · Under review (15) · Expired (132) · Select plan (100).
- **All filters** dialog: Status, Location (accordions), Clear all / Apply filter.
- **Post a new job ⌄**: Start with new post · Use a job template ("Save 50% more time").
- **Row**: premium mark, title, status tag, location | posted on | owner; Applied to job · Database matches; **Duplicate**; ⋮ → **Edit job**.

### Empty account
"Post your first job": Start with blank form · OR · Use a template.

---

## 3. ECC — a job's candidates (priority)

URL: `/jobs/:jobId/?selectedTab=applied` (database: `selectedTab=database`).

### Header
- Title, status tag (e.g. Expired), one meta line: "city • salary • education • experience".
- **Edit**, and **⋮**, which opens a side panel:
  - **Plan**: "Previous: Premium", count, "Expiring on 8 October".
  - **Preference**: "Candidate communication: Rishav will contact first" · "apna alerts: Daily summary" · Edit.
  - **Job details**: View / edit job.
- Tabs: **Applied to job (519)** | **Database (41,642)**.
- Status banner (expired): "Your job has been expired · Repost now to receive new applications in a single click!", "Expired on 08 Oct '26 · Premium plan", **Repost now**.

### Applied tab
- **Filters (left)**
  - Show candidates who: Matched to job requirements (407) ⓘ · Have resume attached (511) · Tried contacting you (1, NEW) · Featured candidate.
  - WhatsApp connect (accordion) · Applied in: last 3 / 7 / 15 / 30 days.
  - **See more**: Location, Gender, Age, Industry, Keywords (including name), Monthly salary, Experience (years), Education, Degree / specialization, English level, Languages known, Job title, Departments, Role / category, Notice period.
- **Pipeline counters** (tabs): All candidates 519 · Action pending 519 · Viewed number 0 · Shortlisted 0 · Rejected 0.
- Sort by: Relevance. "Showing 20 candidates". Download Excel.
- **High matches** group first: ✨ "Candidates matching all your key requirements. Connect with them before someone else does!"
- **Candidate card**
  - Avatar or initials, name, **View full profile** / **View full profile with resume**, ✨ High match tag.
  - Meta: gender + age · experience or Fresher · salary · area, city, state.
  - **Matching:** chips with ticks (Regional languages, Education, English proficiency, Location) + ›.
  - Rows: Current / latest (job, company, dates, role) · Education (degree, college, years) · Skills · Language (English level + others, "|" separated).
  - Actions: **View number** (green, credit) · **WhatsApp** (outline icon) · **Reject** (red outline) · **Shortlist** (green outline).
  - Footer: "Applied a month ago | Active 2 days ago" · **Add a note**.

### Candidate profile (side drawer)
URL: `/jobs/:jobId/:candidateId`.
- Header: initials, name, gender/age, experience, salary, area; High match.
- Tabs (anchors): **AI matching** · **Full profile** · **CV/Resume** · **Notes**.
- **AI matching (based on profile and resume)**: one ✓ line per requirement met (languages, education, English, location). "*This is AI-generated which may make mistakes. Help improve with your feedback" 👍 👎.
- **Full profile**: Work experience (title, company, dates, duration, role) · Education (degree, college, year; 12th; 10th) · Languages · Assets and docs (e.g. Bike) · Departments · Personal details (email).
- Sticky footer: View number · WhatsApp · Reject · Shortlist; "Active 2 hours ago" · Add a note.

### Database tab (AI-suggested)
- Banner: "AI suggested candidates from our database that didn't apply to your job · Connect, discuss & hire", **How it works?**, ✕.
- Filters (4) panel; Active in (All profiles / months); per page; pagination ("Page 1 of 2074").
- Select all · Download Excel · "995 of 995 database credits expiring".
- Card: name ›, experience, salary, area; **Matching:** skill chips; Current / latest; Previous; Education; Pref. location; Skills (+N more); Languages; **View phone number**; footer: "N unlocks", "CV attached", "Active on …".

---

## 4. Database (company workspace)

### Search candidates (`/search`)
- First visit: **Introducing apnaAI** pop-up: "Paste a job description & generate the best relevant search in just 5 seconds", Get started.
- Modes: **Search manually** | **Use apnaAI**.
- Form: Searching for (Freshers only / Experienced only / Any) · Keywords* · Current city/region · Experience (min–max) · Annual salary (min–max) · Minimum education (10th, 12th, ITI, Diploma, Graduate, Post graduate) · Active in (6 months) · Reset · **Search candidates**.
- **How database credits work?** 1 profile unlock = 1 · 1 Excel download = 2* · 1 WhatsApp invite = 1 database + 1 WhatsApp credit* (*already unlocked: 1 database credit for Excel, 1 WhatsApp credit for an invite).
- **Recent searches**: the query (or AI prompt) with **Fill search** and **Search candidates**.

### Results (`/searchList`)
- Top: ← · "166 profiles found for …" · View details ⌄ · **Modify search** · **Save search**.
- Active in (1 month), per page, pagination.
- Select all · Download Excel · **WhatsApp invite (New)** · credits expiring note.
- "Introducing WhatsApp invite (New) · Reach out to potential candidates faster and more efficiently", How it works?, ✕.
- Card: as the job's Database tab, plus **View full profile for free »**.
- **Filters**: applied chips + Reset.
  - Hide candidates that are: Already unlocked · Already downloaded in Excel · Already invited by WhatsApp.
  - Show only candidates who: Are reachable on WhatsApp · Have CV attached · Featured.
  - Must-have keywords · Current city / area (chips + "Show candidates within 5 KM") · Exclude keywords · Experience (Any / Freshers only, range) · Industries · Current/previous company · Annual salary (+ include undisclosed) · Degrees / specialization.
  - Education (with counts) · Gender (counts) · Age · Languages · English fluency (Basic / Good, with explanations) · Departments · Assets · Documents · Certificates · Load more filters.

### Saved searches (`/savedSearch`)
- Filter: Saved date (7 / 30 / 90 days); Saved by (Me / Others).
- "688 saved searches", paginated. Row: name, query summary (or "AI search" + prompt), "Saved on", saved by, Fill search / Search candidates.

### Unlocked candidates (`/unlockedCandidates`)
- "15 candidates". Filters: Unlocked in (1 / 3 / 7 / 15 days) + the search filters.
- Card shows an **Un-locked** tag, "View phone number · No credits will be used for viewing phone number", "Profile unlocked by me, 2 days ago", Comment.

---

## 5. Invite centre (company)

### Database WA invites (`/whatsappInviteCenter`)
- **Create new WhatsApp invite**. Filters: Invited by me; Sent in 7 / 15 / 30 days; Invite by Me / Others.
- Table: Invite details ("Telecaller | Rohini Enterprises", Preview, Invite more candidates, "Sent on … by …") · Status (Sent) · Unlocked · Delivered ⓘ · Accepted.

### Job WA connects (`/whatsappConnect`)
- Empty state: "No WhatsApp connect sent yet · Create and send your first WA connect to track candidate responses here".
- How it works: select from applied candidates → send personalised WhatsApp connects in bulk → reach out to the interested ones.

---

## 6. Reports
- `/reports-dashboard` (Personal) and `/enterprise/reports-dashboard` (Company): one card, **Applications** "Get all applications received in a single report", View report. "Can't find the data you need? Contact sales team".
- **Download applications** (`/download-applications`): "Download applications from last 7 days · CSV across all jobs", "You have downloaded", "You have 0 applications from 0 jobs in the last 7 days", **Download now** (disabled at 0).

---

## 7. Credits & Usage

### Personal (`/mon/credits-and-usage/`)
- Top-right **View plans**. Banner: "Rishav, you've run out of credits 😔 … Upgrade now to save up to ₹7800", **Buy now**, ✕.
- **Available credits**: Job credits · Smart AI job credits · Database credits ("Credits are charged each time you retrieve job posting and database unlocks", Learn more).
- "New update!" note: transaction history is cleaner; invoices moved to Billing.
- **Transaction history**: tabs All · Credits added · Credits spent · Credits returned · Invoices. Rows: type (Credits spent / expired / returned / added), detail ("Posted premium job #id", "Due to expiry of validity period", "Credit(s) refunded", "Complimentary from apna"), ± credits (+ expiry date), date + time. Paginated.

### Company (`/enterprise/mon/credits-and-usage/`)
- **Contact sales**. **Available credits**: Job · Smart AI job · Database (995, "995 credits will expire on Nov 20, 2026 · View all") · WhatsApp invite (2, expiry, View all).
- Tabs **Usage history** | **Transaction history**.
  - Usage: "View usage history of all credits by your team members in this month (dates)". Usage summary tiles (coloured headers): Job credits · AI job calling credits · Database credits · WhatsApp invite credits. A table with tabs Job posting / Database / WhatsApp (Posted date · Details · Job title · Quantity · Credits usage).
  - Transactions: All / Credits added / spent / returned. Rows with action ("Viewed phone number", "CV viewed"), −1 database credit, user (initials + name), date + time. "Showing 1–10 of 301".

---

## 8. Billing (Personal, `/mon/billing/`)
- **Billing profile**: "Add your registered ISD-GST or GST number and company details that would appear on your future invoices", Add GSTIN / ISD-GSTIN; ISD-GSTIN info strip.
- **Billing history**: All · Success · Pending · Failed. Table: Date + time · Plan details (e.g. "4 job credit package + 1 AI credit", "6 months plan", "1 month plan") · Applies until ("Ordered on …") · Amount · Status (Pending) · Action (**Retry payment**). "Showing 1–10 of 217".

---

## 9. Plans (`/buy-plan`)
- "Everything you need to hire". Tabs: **Jobs** (post a job) · **Database** (search 6 Cr+ candidates) · **Enterprise plans** (bulk hiring).
- Jobs: "Job credits · Pick a bundle. Choose the job type later, when you post." · "I need a single job credit ›".
  - 3 credits: ₹1,949, 7% off, ₹650/credit, 30 days.
  - 6 credits (Recommended): ₹3,649, 13% off, ₹608/credit, 90 days.
  - 13 credits: ₹7,099, 22% off, ₹546/credit, 180 days.
- "1 credit = 1 classic · 2 = 1 premium · 4 = 1 super premium. Need more info?"; Need a custom solution? → Contact sales; "* 18% GST will be added at checkout".
- FAQs (job credits, job types, too few candidates, job vs credit validity: a job stays live 15 days) and testimonials.

## 10. Refer and Earn (Personal, `/referrals`)
- "Earn up to 2500 database credits for free": 100 per successful referral; the friend gets 50 on their first job activation.
- Share link (Copy link, WhatsApp, Facebook, LinkedIn) · invite by email (comma-separated, Send) · "Total database credits earned 0 of 2500 from 0 referrals".
- Your referrals (0) table: Referral name · Status · Updated on; empty state.
- "It is easy to earn with referrals": three steps; Terms & conditions.

## 11. Not covered
- Edit job / View / edit job / the posting flow (we have our own).
- The "Offers" badge target (Contact Sales sent a lead instead).
- The profile page (opening it once sent the pane to sign-in).
- Pipeline tabs other than "All", and candidate states after Shortlist / Reject / View number (needs real actions).
- Phone layouts (captured at desktop width only).

---

## 12. Picking work later (ECC first)

Our prototype already has `/apnahire/jobs/[id]` (Applied | Database matches,
filters, notes, reject), `/database/*`, `/invite-centre`, `/reports`, `/usage`,
`/plan`, `/profile`. Compare each section above against it before planning.

| Priority | Area | Live sections |
|---|---|---|
| P0 | ECC | §3: header + ⋮ panel, banners, pipeline counters, filters, high matches, card, actions, profile drawer, database tab |
| P1 | Jobs list | §2: both layouts, statuses, pending actions |
| P2 | Database + invites | §4, §5 |
| P3 | Account | §1 workspaces and menus, §6 reports, §7 credits, §8 billing, §10 referrals |

Open questions
- Is the Personal ↔ company workspace switch in scope?
- Live makes "View number" the green action on every card. Keep it, or make Shortlist primary?
- One jobs list (cards) or two (cards for Personal, rows for Company)?

## Job page: left filter pane, Applied tab (checked 2026-11-06)

17 collapsible groups; the first few show, "See more" opens the rest.
Counts sit beside most options. Nothing shows which filters are on: no
applied chips, no total count, no Clear all.

| # | Group | Control | Options |
|---|---|---|---|
| 1 | Show candidates who | Checkboxes | Matched to job requirements (407) · Have resume attached (511) · Tried contacting you (1, NEW tag) · Featured candidate |
| 2 | WhatsApp Connect | — | Greyed out (expired job) |
| 3 | Applied in | Single-choice chips | Last 3 / 7 / 15 / 30 days |
| 4 | Location | Single-choice chips | Within 5 km (17) · 10 km (181) · 15 km (282) · 25 km (458) · More than 25 km (61); note "Distance calculated from Kailasipalyam, Bengaluru" |
| 5 | Gender | Chips | Female (182) · Male (327) |
| 6 | Age | Min – Max dropdowns | |
| 7 | Industry | Search select "Select a job industry" | Note: "Showing candidates from industries similar to your preference" |
| 8 | Keywords (including name) | Search field "Search in profile / resume" | |
| 9 | Monthly salary | Min – Max dropdowns | + checkbox "Include those who have not disclosed salary" |
| 10 | Experience (years) | Min – Max dropdowns | |
| 11 | Education | Chips | Diploma (2) · Graduate (424) · Post graduate (93) |
| 12 | Degree / specialization | Search select | |
| 13 | English level | Checkboxes | Basic English (6) · Good English (512) |
| 14 | Languages known | Search select "Select languages" | Note: "Showing candidates who know your preferred languages" |
| 15 | Job title | Search select | |
| 16 | Departments | Search select | Note: similar to your preference |
| 17 | Role / category | Search select | Note: similar to your preference |
| 18 | Notice period | Chips | Immediately available · Up to 15 days · 1 month · 2 months · 3 months |

(18 rows: WhatsApp Connect counted though disabled.)

**Database tab** on this account shows no list or filters: a "Verification
required to access apnaDatabase" card (Start verification · Contact
support). Its filters are unknown until an account is verified.
