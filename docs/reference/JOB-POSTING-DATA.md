# Job posting: data bank

Every number we hold about job posting, with its source and limits, and the
design decisions each one backs. Use it to answer "why did we do this?".
Add new data here first, then log the decision in `docs/DECISIONS.md`.

Last updated 2026-11-12.

## 1. Sources

| # | Source | What it is | Window | Size | Limits |
|---|---|---|---|---|---|
| S1 | Ana analytics, `core_job` + `employer_subdepartment` | Every job created | from 13 Aug 2026 (90 days) | 265,421 jobs | Test jobs, drafts and managed accounts not excluded. Education and English are filled on ~100% of jobs, so a value may be a default |
| S2 | S1, organisations with under 100 jobs | Stand-in for "posted by hand on the dashboard" | same | 206,977 jobs | A proxy: no column says ATS or dashboard. Big agencies posting by hand are left out; small ATS users are left in |
| S3 | Mixpanel "Job posting funnel" (Figma board, employer-app file, node 1610:19163) | Sessions through the live form | 30 days to 3 Nov 2026 | 9,285 desktop + 7,328 mobile web sessions | New recruiters only (user source = Onboarding). Steps 2 and 3 not readable in the screenshots |
| S4 | Clarity (same board) | Time from step 1 to Review; 40+ recordings | same | not stated | Desktop and mobile are different users and job types |
| S5 | Candidate search filter use (`DECISIONS.md`, 2026-11-09) | How often recruiters set each filter when searching candidates | see entry | see entry | Search, not posting: a guide only |
| S6 | Our audit (`history/AUDIT-2026-11-11-JOB-POSTING.md`) | Taps and waits in the prototype | 11 Nov 2026 | one delivery job, phone | Counted by hand; before today's changes |
| S8 | Mixpanel "Old users New jobs – posting funnel 1" (screenshot from Punna) | Sessions through the live form, new against existing recruiters | 3 months to 11 Nov 2026 | 95,150 new + 57,340 existing sessions | Not split by device; how "existing" is defined not stated |
| S9 | "Edited fields" chart (screenshot from Punna) | Count of edits per job field, top 11 | not stated | 15.7k–18.2k per field | No window, no denominator; may count fields rewritten on any edit |
| S10 | Mixpanel posting funnel, recruiters with credits (screenshot from Punna) | Sessions through the live form | 3 months to 11 Nov 2026 | 11,510 sessions | Not split by device or user type |
| S11 | "Edited fields by job lifecycle" table (screenshot from Punna, 2026-11-12; Punna: accurate) | Job lifecycles in which each field was edited, 16 fields | not stated | about 35,560 lifecycles (worked back from the shares) | No window; what a lifecycle is and whether the base is all jobs or edited jobs not stated; no location fields in it |
| S7 | Live form, read on employer.apna.co | The 29 fields live asks | 11 Nov 2026 | — | Desktop only; distance choices not opened |
| S12 | Ana analytics, `hive.BI_Core_Tables.bi_sales_pricing` (one row per `order_id`) | Paid self-serve orders, amount before GST (`sales`) | 13 Aug to 11 Nov 2026 | 54,025 orders, ₹6.82 crore | Refunds not netted; test and internal accounts not excluded; "new" means first self-serve order, so an earlier sales-led buyer counts as new |
| S13 | Sheet "Online Revenue - Weekly Governace" (Drive, 1ulwW8iC…; tabs Express Checkout, Latest 6W - Sales & Breakdown) | Weekly online sales and the express funnel for recruiters with zero credits | weekly, 2 Mar to 2 Nov 2026 | about 14,150 entrants and 4,070 orders a week (6-week average) | The team's own sheet; the week of 2 Nov is part-filled; its express revenue runs 15–20% above S12 (likely a wider "online" definition) |
| S14 | Ana, `bi_sales_pricing` by account (organisation), all channels; and the doc "Employer Online sales - Cohorting" (Drive, 1DBPB8XpGDWU…, Haareesh) | What an account first acquired through express checkout is worth over time | first orders Nov 2025 to Aug 2026; doc: Jun to Aug 2026 | about 23,240 accounts pooled; doc 36,371 organisations | Refunds not netted; no test-account filter; history starts Feb 2022; 365-day value rests on 1,370 accounts; the doc's lifetime figures lean towards frequent buyers |

## 2. The live funnel (S3)

| Step | Desktop | Mobile web |
|---|---|---|
| Started posting | 9,285 (56%) | 7,328 (44%) |
| Continued past step 1 | 83.3% (7,738) | 75.0% (5,498) |
| Saw Review | 7,340 | 5,039 |
| Continued past Review | 96.8% (7,107) | 87.1% (4,388) |
| Reached the plan step | 97.6% (6,936) | 98.6% (4,328) |
| Clicked pay | 26.9% (1,869) | 18.7% (808) |
| Job posted | 91.0% (1,701) | 85.4% (690) |
| Started → posted | 18.3% | 9.4% |

**Who these sessions are (Punna, 2026-11-11):** user source = Onboarding
means the recruiter has just signed up and is posting a first job. They have
never posted on apna, and many arrive expecting job posting to be free. They
fill the whole form and meet the price only at the plan step.

Percentages are of the step before. Derived: 79% (desktop) and 69% (mobile)
of starters reach Review; 75% and 59% reach the plan step.

## 2b. New against existing recruiters (S8)

Mixpanel "Old users New jobs – posting funnel 1", sessions, 3 months to
11 Nov 2026, split by user type. Not split by device. Internal users (982
sessions) left out.

| Step | New recruiter | Existing recruiter |
|---|---|---|
| Started posting | 95,150 (62%) | 57,340 (38%) |
| Continued past step 1 | 79.1% (75,280) | 86.2% (49,420) |
| Continued past step 2 | 97.0% (73,000) | 98.2% (48,510) |
| Continued past step 3 | 97.7% (71,350) | 99.1% (48,070) |
| Saw Review | 99.6% (71,030) | 99.8% (47,980) |
| Continued past Review | 94.2% (66,880) | 96.3% (46,190) |
| Reached the plan step | 97.8% (65,390) | 89.1% (41,130) |
| Clicked pay | 31.1% (20,360) | 76.3% (31,370) |
| Job posted | 88.8% (18,080) | 91.4% (28,680) |
| Started → posted | 19.0% | 50.0% |

- **Step 1 is the form's biggest drop, for everyone.** Existing recruiters
  know the form and the price, and 13.8% still leave at step 1 (new: 20.9%).
  But see §2e: recruiters with credits lose only 5.5% there, so most of this
  drop is intent, not the form.
- **Steps 2 and 3 lose little:** 2–3% each for new, 1–2% for existing.
- **Review loses 4–6%.**
- **The pay drop is the price surprise.** 76.3% of existing recruiters click
  pay against 31.1% of new ones: a 45-point gap at the same screen.
- **Existing recruiters post most jobs:** 38% of sessions, 61% of posted jobs
  (28,680 of 46,760).
- **Unexplained:** existing recruiters lose 11% between Review and the plan
  step (new: 2%). Possibly those with credits or a subscription post without
  the plan step, so they are not counted there. Not confirmed.

## 2e. Recruiters who hold credits (S10)

Mixpanel, same nine steps, sessions, 3 months to 11 Nov 2026, recruiters with
credits only. Not split by device or by new and existing.

| Step | With credits |
|---|---|
| Started posting | 11,510 |
| Continued past step 1 | 94.6% (10,890) |
| Continued past step 2 | 99.3% (10,810) |
| Continued past step 3 | 99.7% (10,780) |
| Saw Review | 99.9% (10,770) |
| Continued past Review | 98.2% (10,580) |
| Reached the plan step | 97.0% (10,260) |
| Clicked pay / post | 98.0% (10,050) |
| Job posted | 96.8% (9,726) |
| Started → posted | 84.5% |

- **This is the form's own friction.** A recruiter who has already paid has
  no price doubt. They lose 5.5% at step 1 and 8.1% across the whole form
  (to past Review). That is the most a better form can win back from
  committed recruiters.
- **Step 1 by commitment:** with credits 5.5%, existing 13.8%, new 20.9%. So
  most of the step 1 drop is intent (looking around, unsure about cost), not
  the form. This corrects §2b's "two thirds is the form".
- **Step 1 is still the form's largest drop,** 5.5 of the 8.1 points.
- **Pay is not a problem once paid for:** 98%.

## 2c. Cross-checks between the sources

| Check | S3 (Onboarding, 30 days, both devices) | S8 (New user, 3 months) | Verdict |
|---|---|---|---|
| Continued past step 1 | 79.7% | 79.1% | Agree |
| Reached Review, of starters | 74.5% | 74.7% | Agree |
| Continued past Review | 92.9% | 94.2% | Agree |
| Reached the plan step | 98.0% | 97.8% | Agree |
| Clicked pay | 23.8% | 31.1% | **Differ by 7 points** |
| Job posted, of pay clicks | 89.3% | 88.8% | Agree |
| Started → posted | 14.4% | 19.0% | Differ, from the pay step only |
| Sessions per month | about 16,600 | about 31,700 | **S8's "new" is about twice as many** |

- **"New user" is wider than "Onboarding".** S8 has about twice the monthly
  sessions, so it includes new recruiters who did not come straight from
  sign-up. They pay more often (31% against 24%). The form steps agree to
  within 1.5 points, so the form findings stand on both.
- **Jobs do not reconcile (major).** S8 shows 46,760 jobs posted in 3 months
  (new + existing). S1 has 265,421 jobs created in 90 days, and 206,977 even
  after removing 100+ job organisations: over four times more. So most rows
  in S1 did not come through this web funnel: likely drafts saved before
  payment, ATS and bulk posts, the employer app, and jobs created by
  internal teams. The role mix and per-role answers in §4–§6 may therefore
  describe more than dashboard-posted, live jobs. To fix: re-run S1 for
  posted jobs only, and find the field that marks where a job was created.
- **Time does not reconcile.** Mixpanel's own step times are hours to days
  (step 1: 8.8 hours for new, 1.5 days for existing), Clarity's are minutes.
  Mixpanel's is an average that includes people who leave and come back;
  use Clarity's percentiles for "how long the form takes".

## 2d. Most edited fields (S9)

Chart "Edited fields" from Punna, 2026-11-11. Top 11 only; window, what
counts as an edit, and the denominator are not stated.

| Field | Edits |
|---|---|
| companyLocationGeometry | 18,180 |
| nbLocationDataFromApiCA | 18,170 |
| nbLocationDataFromApiIl | 18,110 |
| interviewLocationGeometry | 18,110 |
| companyArea | 17,050 |
| companyCity | 16,980 |
| interviewArea | 16,410 |
| interviewCity | 16,330 |
| jobArea | 15,690 |
| jobCity | 15,690 |
| area | 15,680 |

- **All eleven are location.** Three places are stored: the company's, the
  interview's and the job's, each as city, area and map point.
- **They move together** (15.7k–18.2k), so this is about one kind of edit,
  not eleven.
- **Punna (2026-11-11):** the edits are mostly to the job's location and the
  walk-in (interview) location. So recruiters do correct these; it is not
  only a logging effect. The company fields likely follow the same change.
- **Not in the top 11:** walk-in, contact, who can contact, perks. So this
  chart neither backs nor breaks "after posting" for them.

## 2f. Edited fields by job lifecycle (S11)

Table from Punna, 2026-11-12, given as the accurate edited-fields data. A
"lifecycle" is one job from posting on; the share is of about 35,560
lifecycles (13,479 ÷ 37.9%). A lifecycle can edit several fields.

| Field | Lifecycles | Share |
|---|---|---|
| Maximum salary | 13,479 | 37.9% |
| Minimum salary | 9,522 | 26.8% |
| Minimum experience | 9,064 | 25.5% |
| Education | 8,726 | 24.5% |
| English requirement | 7,993 | 22.5% |
| Title | 7,247 | 20.4% |
| WhatsApp alert | 4,682 | 13.2% |
| Sub-department | 4,619 | 13.0% |
| Gender | 4,025 | 11.3% |
| Department | 2,847 | 8.0% |
| Walk-in | 2,182 | 6.1% |
| Maximum experience | 1,566 | 4.4% |
| Shift | 904 | 2.5% |
| Part-time | 885 | 2.5% |
| Work from home | 428 | 1.2% |
| Openings | 8 | <0.1% |

- **Pay is edited most.** Maximum salary in 38% of lifecycles, minimum in
  27%. The direction (raised or lowered) is not in the table.
- **"Who can apply" comes next.** Minimum experience, education and English,
  each in 22–26%. Recruiters revise requirements after posting.
- **The job's identity is edited too.** Title in 20%, sub-department (our job
  role) in 13%, department in 8%.
- **Walk-in is edited in 6%; gender in 11%.**
- **No location field is in this table.** §2d (S9) shows only location
  fields. The two do not share a field, so they likely come from different
  logs: S9 counts raw field writes, S11 counts jobs where a recruiter changed
  a value. Until that is confirmed, S11 is the one to rely on (Punna:
  accurate), and S9 does not prove recruiters correct locations.
- **Not known:** the window; whether the base is every job or only edited
  jobs; when in the job's life the edit happens (before or after the first
  applicant); whether an edit is by the recruiter or by apna's review team.

## 2g. What a posted job is worth (S12)

Paid self-serve orders, before GST, 13 Aug to 11 Nov 2026. Filter:
`(status='paid' OR payment_status='success') AND invoice_id IS NOT NULL`,
`payment_channel='self'`.

| Checkout | Orders | Revenue | Mean | Share of orders |
|---|---|---|---|---|
| Express checkout (job posting) | 46,797 | ₹4.85 crore | ₹1,036 | 86.6% |
| Subscription, monthly | 3,115 | ₹0.80 crore | ₹2,553 | 5.8% |
| Self-checkout, job posting | 2,107 | ₹0.56 crore | ₹2,671 | 3.9% |
| Self-checkout, database | 843 | ₹0.20 crore | ₹2,370 | 1.6% |
| All self-serve | 54,025 | ₹6.82 crore | ₹1,263 (median ₹699) | 100% |

- **Express by tier:** Classic 28,569 orders (61%), Premium 16,274 (35%),
  Super premium 1,282 (3%).
- **New against repeat (express):** new 14,582 orders at ₹1,012; repeat
  32,215 at ₹1,047. New recruiters do not buy cheaper.
- **Payers:** 39,570 recruiters, 1.37 orders each in the window.
- **Reconciles with S8:** 46,797 express orders against 46,760 jobs posted
  in the Mixpanel funnel over the same 3 months.
- **The team's sheet agrees, a little higher (S13):** express checkout
  sells about ₹44 lakh a week (6-week average), about ₹1.9 crore a month,
  at about ₹1,130 an order.
- **Express funnel, zero credits (S13, 6-week average):** entered posting →
  plan selection 66.4% (the form); plan selection → proceed to pay 39.6%
  (49% in March); proceed → payment started 84.7%; started → success 74.1%.
  Entered → paid 16.5% (24.8% in March). Desktop 19.7%, mobile 13.0%; new
  9.0%, existing 30.0%. Mobile is now half of entrants.
- **The upsell step (S13; Punna, 2026-11-12: the upsell on new recruiters
  causes drop-off):** proceed to pay → payment started was about 91.5% in
  March to May, 86% in the three weeks to 7 Sep (the credit upsell
  returned that week), and 81% in the last three weeks. Upsell credit sales
  are about ₹2.2 lakh a week. Five points at this step are about 6% of
  express orders, about ₹2.5 lakh a week, so the upsell may cost as much as
  it earns. Not proven: the sheet does not split this step by new and
  existing, and the price test ran in the same weeks.
- **Revenue estimate for a better form (2026-11-12):** the form's own
  friction is 8.1 points (§2e). Winning back 2–4 of them lifts the form
  step from 66.4% to 68–70%: 3–6% more orders, about ₹5–12 lakh a month on
  a base of ₹1.6–1.9 crore. The ceiling (all 8 points) is ₹19–23 lakh a
  month. Each 1 point more at plan selection → proceed to pay is about
  ₹4–5 lakh a month. The share won back is an assumption.

## 2h. What an account is worth (S14)

Account = organisation. Accounts whose first order was online express
checkout; revenue from every channel and product, before GST.

| After the first order | Revenue per account |
|---|---|
| First order | about ₹1,040 |
| 30 days | about ₹1,350 |
| 90 days | about ₹1,680 |
| 180 days | about ₹2,050 (median ₹1,299) |
| 365 days | about ₹2,500 (Nov 2025 cohort, 1,370 accounts) |

- **New accounts:** about 3,100 a month (Jun to Aug 2026; 3,755 in Nov 2025).
- **Buying again:** 15% within 30 days, 26% within 90, 33% within 180. Mean
  1.69 orders in 180 days.
- **Sales-led follow-on:** 10.5% of accounts buy through a sales team within
  180 days, at ₹3,991 on average. 180-day revenue: online 78%, inside sales
  15%, field sales 4%.
- **Concentrated:** the top 10% of accounts hold 42% of 180-day revenue; the
  top 1% hold 11.5%.
- **Sales teams live on these accounts:** of ₹15.1 crore sales-led revenue
  (13 Aug to 11 Nov 2026), 52% is from accounts first acquired through
  online express checkout (inside sales 50%, field sales 39%).
- **Who they are (the cohorting doc):** 99% SMB, 8.4% consultant firms. Of
  express buyers in a quarter, 22.5% have bought once, 33.8% are online-only
  repeat (5.4 lifetime orders), 43.7% also buy through sales (20.5 lifetime
  orders); two thirds of that last group were first acquired online.
- **Estimate per account (2026-11-12):** a form that wins back 2–4 points
  adds 90–190 new accounts a month, worth ₹2.3–4.7 lakh in their first year,
  and ₹3.9–7.8 lakh a month of orders from existing accounts: ₹6–12 lakh a
  month in all, about 30% above the per-order estimate in §2g. Ceiling ₹25
  lakh. Not counted: value after 12 months, and accounts with credits.

## 3. Time to post (S4)

Step 1 to Review, by share of sessions:

| Sessions | Desktop | Mobile web |
|---|---|---|
| Fastest 25% | up to 4.4 min | up to 3.5 min |
| 75% | up to 12.5 min | up to 8.4 min |
| 90% | up to 26.3 min | up to 13.9 min |

The form has 25+ inputs over 3 steps (our count from S7: 29 fields).

Recordings: dead clicks and repeated taps on dense chip groups (regional
languages, requirements); the description sits below many selections;
back-and-forth between steps before preview; sessions dropped after an
interruption or error; heavy tapping on Preview while fixing answers.

## 4. Which jobs are posted

| Role | All jobs (S1) | Likely by hand (S2) | From 100+ job organisations |
|---|---|---|---|
| Telesales | 6.1% | 7.3% | 7% |
| Field sales | 7.2% | 5.7% | 39% |
| Cook / chef | 3.5% | 4.3% | 4% |
| Accounting | 3.2% | 4.0% | 2% |
| Customer support | 2.8% | 2.9% | 22% |
| Retail counter sales | 2.3% | 2.6% | 13% |
| Front office | 1.7% | 2.2% | 3% |
| Delivery | 11.1% | 2.1% | 85% |
| Back office | 2.1% | 2.1% | 23% |
| Restaurant staff | 1.7% | 2.1% | 5% |
| Inside sales | 1.8% | 2.0% | 12% |
| Driver | 2.3% | 1.6% | 46% |

- The top 20 roles are about 58% of all jobs; the top 12 about 39% of likely
  hand-posted jobs. The rest is a long tail.
- 131 organisations with 100+ jobs post 22% of all jobs (58.7k). Bulk-format
  jobs (6.7%) are nearly all delivery and driver.

## 5. What each role asks for (S2 unless marked)

Most common answer in bold. "Lowest" = live's "10th or below", which works as
"any".

| Role | n | Education | English | Experience: any / experienced / freshers only |
|---|---|---|---|---|
| Delivery | 4,314 | **lowest 86.9%**, 12th 12.7% | **none 74.3%**, basic 25.3% | 92.8 / 5.0 / 2.2 |
| Driver (S1) | 6.1k | **lowest 87.2%** | **none 84.7%** | 71.6 / 28.1 / 0.3 |
| Cook / chef (S1) | 9.3k | **lowest 77.7%**, 12th 17.9% | **none 64.5%**, basic 34.2% | 54.5 / 44.4 / 1.2 |
| Telesales | 15,102 | **12th 65.2%**, graduate 22.8% | **basic 68.2%**, good 17.2% | 68.0 / 28.1 / 3.9 |
| Customer support (S1) | 7.5k | **12th 68.4%**, graduate 21.1% | **basic 48.3%**, good 38.6% | 78.0 / 16.4 / 5.6 |
| Accounting (S1) | 8.4k | **graduate 81.0%** | **basic 79.8%** | 32.6 / 65.7 / 1.7 |
| Back office (S1) | 5.6k | graduate 39.2%, 12th 38.3% | **basic 64.0%** | 70.6 / 22.7 / 6.6 |
| Field sales | 11,740 | **12th 40.7%**, graduate 36.4%, lowest 16.6% | **basic 61.2%**, none 24.5% | 55.4 / 42.0 / 2.6 |
| Retail counter sales | 5,377 | **12th 49.0%**, lowest 32.5% | **basic 62.5%**, none 27.7% | 61.5 / 36.4 / 2.2 |
| Front office | 4,453 | **12th 54.3%**, graduate 32.6% | **basic 69.4%**, good 25.9% | 67.7 / 28.7 / 3.6 |
| Restaurant staff | 4,387 | **lowest 58.5%**, 12th 35.7% | **basic 63.0%**, none 30.5% | 67.8 / 30.0 / 2.2 |
| Inside sales | 4,175 | graduate 46.2%, 12th 41.2% | **basic 57.4%**, good 35.2% | 55.4 / 40.2 / 4.3 |
| Data entry | 3,869 | **12th 53.1%**, graduate 32.3% | **basic 79.9%** | 63.6 / 28.2 / 8.2 |
| BD / pre-sales | 3,348 | **graduate 61.6%**, 12th 29.8% | **basic 59.0%**, good 34.0% | 56.2 / 39.7 / 4.2 |
| Banking / loan sales | 2,747 | **12th 48.4%**, graduate 44.4% | **basic 71.9%** | 46.2 / 49.9 / 3.9 |
| Logistics | 1,843 | **lowest 72.1%** | none 50.2%, basic 45.4% | 84.3 / 12.3 / 3.4 |

All jobs (S1): education lowest 32.5%, 12th 30.7%, graduate 28.5%, diploma
5.5%, ITI 1.4%, post graduate 1.4%. English basic 50.2%, none 33.6%, good
16.0%. Experience any 60.4%, experienced 35.2%, freshers only 4.4%. Among
experienced jobs the minimum is most often 1 year (31.7k), then 2 years
(23.0k), 6 months (16.5k), 3 years (13.1k).

## 6. Gender, age, languages, assets

Gender and age use real values (S2): `core_job.gender` is m or f;
`age_requirements` has a minimum and maximum, and a maximum of 60 is read as
"no real limit".

| Role | Male only | Female only | No limit | Real age limit | Typical range |
|---|---|---|---|---|---|
| All | 20.5% | 13.1% | 66.3% | 36.1% | 18–36 |
| Delivery | 51.5% | 0.4% | 48.1% | 19.8% | 18–45 |
| Driver | 47.6% | 0.4% | 52.0% | 28.8% | 20–45 |
| Field sales | 39.1% | 2.0% | 59.0% | 40.0% | 18–40 |
| Telesales | 1.9% | 30.2% | 67.9% | 46.0% | 18–35 |
| Customer support | 4.7% | 16.7% | 78.5% | 54.5% | 18–35 |
| Cook | 23.9% | 2.4% | 73.8% | 17.7% | 18–40 |
| Accounting | 13.1% | 13.7% | 73.2% | 27.7% | 18–40 |

- **Do not use** `gender_selected`: it is "the recruiter touched the field"
  (it gave 89% for delivery) and includes "both".
- **Regional language required (S1):** customer support 16.3%, telesales
  8.7%, inside sales 8.8%, field sales 7.3%, under 6% elsewhere.
- **Assets (all organisations):** banking sales 11.6% of jobs have any
  (two-wheeler, licence), BD 6.2%, the other five new roles under 2%.

## 7. Candidate search filters (S5)

Set by: location distance 38.6%, city 37.0%, education 35.5%, salary 30.6%,
English 28.9%, age 22.4%, experience 22.0%, gender 20.3%, area 18.7%;
industry, languages, keywords 6–7%; degree, departments and others 3% or less.

## 8. Our prototype (S6)

| Path (phone, delivery job) | Taps | Typed | Waiting |
|---|---|---|---|
| Regular, by hand | 27 | 3 fields | 20 s |
| Regular, AI | 18 | 1 sentence | 25 s + often 20 s |
| Essential, by hand | 11 | 3 fields | 20 s |
| Essential, AI | 8 | 1 sentence | 25 s |

Measured before the same-day fixes (auto-advance, shorter AI wait), so today's
counts are lower. Not re-counted.

## 9. Decisions and the data behind them

| Decision | Evidence | Strength |
|---|---|---|
| Open with one sentence or one question, not an 11-field page | Step 1 loses 17% on desktop and 25% on mobile, the biggest drop in the form (§2); recruiters who know the form still lose 13.8% there, and steps 2 and 3 lose only 1–3% each (§2b). But recruiters with credits lose only 5.5% at step 1 (§2e), so most of the drop is intent | Medium: step 1 is the right place, the size of the win is small |
| One question per screen on phones | 44% start on mobile web; dead clicks on dense chip groups (§2, §3) | Strong |
| Phone Review opens on the answers | Mobile loses 13% at Review; heavy tapping there to fix answers (§2, §3) | Medium |
| Description is its own step | Recordings: the description sits below many selections (§3) | Medium |
| Essential asks only what the role needs | The most common answer covers 65–98% of jobs in confirmed roles (§5) | Strong for those roles |
| Delivery, driver, cook: no education or English question | 78–87% lowest education; 65–85% no English (§5) | Strong; delivery English weaker by hand (25% basic) |
| Telesales, support, front office, data entry: 12th and basic English | 53–68% and 48–80% (§5) | Strong |
| Accounting: graduate, basic English | 81% and 80% (§5) | Strong |
| Field sales and retail now ask education and English | 77% and 65% set 12th or higher; 76% and 72% some English (§5) | Strong |
| Six new roles and their starting answers | §5, last seven rows | Medium: 1.8k–4.5k jobs each |
| "Freshers are fine" means "any" | 60.4% any, 4.4% freshers only (§5) | Strong |
| Education has "Any"; 10th is a real minimum | 32.5% of jobs sit on the lowest level, used as "any" (§5) | Medium |
| Gender and age: never asked, always one tap away at Review | 33.6% limit gender, 36.1% age; 66% and 64% do not (§6) | Strong |
| Languages: not asked; read from the description | Required on 16% of support jobs, under 9% elsewhere (§6) | Strong |
| Degree: not asked | Set by 3% or less in search (§7) | Weak: search data |
| Distance: kept, default any, changed after posting | The most-set search filter, 38.6% (§7) | Weak: search data; no posting data |
| Perks, walk-in, contact after posting | Live lets recruiters edit step 3 after posting (Punna); walk-in edited in 6.1% (§2f); perks and contact not in §2f | Weak |
| Location is asked with care: one place, a map, popular areas, manual entry | §2d shows location fields written most, but S11 (§2f) has no location field | Weak until the two sources are reconciled |
| "Job location" row in Finish setup | §2d only; not backed by §2f | Weak |
| Walk-in details after posting, in Finish setup | Walk-in is edited in 6.1% of lifecycles (§2f), so it is changed after the fact | Medium |
| The edit flow must allow pay, experience, education, English and title | Edited in 20–38% of lifecycles (§2f) | Strong, direction and timing unknown |
| Prioritise telesales, field sales, cook, accounting in testing | They lead hand-posted jobs; delivery is 85% high-volume organisations (§4) | Medium: proxy |

## 10. What the data says we have not solved

- **The form's ceiling is small.** Committed recruiters lose 8.1% across the
  whole form (§2e). A redesign can win back some of that, and time; it cannot
  move the 60–80% who leave for reasons of price or intent. Judge the new
  flows on time to post and on effort before the price, not only on
  completed posts.

- **The plan step is the bigger leak, and it is mostly a price surprise.**
  75% (desktop) and 59% (mobile) reach it, then only 27% and 19% click pay
  (§2). These are first-time recruiters who expected a free post, so the drop
  says "I did not know this costs money" more than "the plan page is hard".
  A perfect form cannot fix that. What might: saying the price before or
  early in the form. Not tested; the risk is fewer people starting.
- **Confirmed by §2b:** existing recruiters click pay at 76.3% against
  31.1% for new ones, and still lose 13.8% at step 1.
- **Requirements are revised after posting.** Experience, education and
  English each change in 22–26% of lifecycles, and pay in 27–38% (§2f). Either
  the first answers were wrong, or recruiters tune them once they see who
  applies. Essential's role defaults could raise or lower this; it is a
  number to watch, and the edit flow has to make these changes easy.
- **The role settings cover a minority.** The top 12 roles are about 39% of
  hand-posted jobs (§4).

## 11. Gaps

| Missing | Why it matters | Who has it |
|---|---|---|
| A true ATS / dashboard marker, and S1 for posted jobs only | §4 and §5 by-hand numbers are a proxy; S1 holds 4× the jobs the funnel posts (§2c) | Engineering; Ana |
| Edited fields beyond the top 11, with the window and what an edit is | The top 11 are all location (§2d); perks, contact and walk-in are not shown | Punna |
| Distance choices and default on the live form | Ours came from candidate search | Read live when signed in |
| Night shift use | No field found | Engineering |
| Steps 2 and 3 of the funnel | Cut off in the screenshots | Mixpanel report |
| Existing recruiters by device, and with credits against paying | §2b is not split; the 11% lost before the plan step is unexplained | Mixpanel |
| Share of first-timers who expected a free post | Would size the price-surprise drop | A survey or support tickets |
| Median time to post | Only 25th, 75th, 90th percentiles | Clarity |
| Assets and degrees per role, by hand | Only seven roles, all organisations | Ana (`bi_job_lifecycle.tag`) |
| Our flows measured with real recruiters | §8 is one hand count | A test |

## 12. Asking for more

Ana (Presto, read-only) is connected as an MCP server: pods Employer, Finance,
Candidate. Job data is `hive.standard_prod_postgres.core_job` (`json_data`:
`min_education`, `english`, `experience_level` a/e/f, `age_requirements`;
top-level `gender`) joined to `employer_subdepartment`. Run queries in a
Sonnet subagent and ask for a short summary.
