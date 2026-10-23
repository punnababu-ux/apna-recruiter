/**
 * Engineering › Architecture — how the project is built, for developers:
 * the stack, the layers, where each kind of code lives, how state and the
 * AI routes work, and the quality gates. Keep it in step with
 * docs/PROJECT-MAP.md when a route or area is added.
 */

import * as React from "react"
import {
  ArrowDown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@apna/design-system"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../../product/showcase-blocks"

export const metadata = { title: "Architecture" }

const STACK: [string, string][] = [
  ["Framework", "Next.js 16 (App Router, Turbopack), React 19, TypeScript"],
  ["Styling", "Tailwind CSS 4, two-tier design tokens (primitives → semantics)"],
  ["Primitives", "Base UI (@base-ui/react), class-variance-authority, tailwind-merge"],
  ["AI", "AI SDK 6 + Gemini 2.5 Flash, zod schemas for structured output"],
  ["Hosting", "Vercel; no database, no auth server — this is a prototype"],
]

/** Top to bottom: each layer may only use the ones below it. */
const LAYERS: { name: string; path: string; what: string }[] = [
  { name: "Pages", path: "src/app/**", what: "Routes and layouts. Compose product components; layout JSX only." },
  {
    name: "Product components",
    path: "src/components/{apnahire,marketing,auth,onlyrounds}",
    what: "Screens and flows. Pure layout, primitive wrappers or slot-only overrides — never a palette.",
  },
  {
    name: "Design system",
    path: "packages/design-system/src (@apna/design-system)",
    what: "Every primitive, icon and hook. Variants are the contract.",
  },
  {
    name: "Tokens",
    path: "packages/design-system/src/styles/tokens",
    what: "primitives.css (raw scales) → semantic.css (roles, light + dark). Components read semantics only.",
  },
]

const FOLDERS: [string, string][] = [
  ["src/app/(marketing)", "Public website: home, pricing, product and company pages (route group, not in the URL)"],
  ["src/app/(auth)", "Login, OTP, enterprise login"],
  ["src/app/apnahire", "The recruiter product: (product) app shell, (wizard) job posting, credits checkout"],
  ["src/app/onlyrounds", "OnlyRounds AI interview tool (redirected to /apnahire in next.config.ts)"],
  ["src/app/api", "The only server code: 5 AI route handlers"],
  ["src/app/design-system", "This docs site"],
  ["src/content", "All copy, prices and plan data as typed TS — never hard-code copy in components"],
  ["src/hooks", "Prototype state (session, credits, slots, subscription) and UI hooks"],
  ["src/lib", "Pure logic: bill maths, prompt parsing, nav, formatting, API helpers"],
  ["src/types", "Shared domain types (job draft, OnlyRounds)"],
  ["scripts", "lint-tokens.sh (token contract), check-alignment.js (run in the page)"],
  ["docs", "PROJECT-MAP, TOKENS, COMPONENTS, PRICING, AI-HANDOFF, TODO"],
]

const STATE_KEYS: [string, string][] = [
  ["apnahire:session", "useSession — who is signed in (phone or enterprise)"],
  ["apnahire:active-subscription", "useActiveSubscription — the subscriber's plan"],
  ["apnahire:job-credits", "Job credits balance"],
  ["apnahire:job-slots", "useJobSlots — active job slots"],
  ["apnahire:job-draft", "The job-posting wizard's draft"],
  ["apnahire:pending-checkout", "A checkout to resume after login"],
  ["apnahire:previous-plan", "usePreviousPlan — ended plan, renew banner"],
  ["apnahire:pricing-phase", "usePricingPhase — before / after the Jan 2027 price change"],
  ["apna:extra-off-deadline", "The 10% exit offer's countdown"],
]

const API_ROUTES: [string, string][] = [
  ["/api/apnahire/draft-job", "One-line description → structured job draft, or apply a follow-up edit"],
  ["/api/onlyrounds/extract-jd", "Pasted JD → structured job fields"],
  ["/api/onlyrounds/generate-jd", "Title + notes → full job description"],
  ["/api/onlyrounds/generate-criteria", "JD → must-have / good-to-have / red-flag criteria (single or bulk)"],
  ["/api/onlyrounds/generate-questions", "Section → interview questions"],
]

function KeyValueTable({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{head[0]}</TableHead>
          <TableHead>{head[1]}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([k, v]) => (
          <TableRow key={k}>
            <TableCell className="font-mono text-xs whitespace-nowrap">{k}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{v}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function ArchitecturePage() {
  return (
    <ShowcasePage
      category="Engineering"
      title="Architecture"
      description="How the project is built: one Next.js app on top of one design-system package. Pages compose product components, product components compose primitives, primitives read tokens. There is no backend beyond five AI routes; prototype state lives in the browser."
    >
      <ShowcaseEntry title="Stack">
        <KeyValueTable head={["Layer", "What we use"]} rows={STACK} />
      </ShowcaseEntry>

      <ShowcaseEntry title="Layers" where="Each layer may only use the layers below it. Never skip down to a raw value.">
        <div className="flex flex-col items-stretch gap-2">
          {LAYERS.map((l, i) => (
            <React.Fragment key={l.name}>
              <div className="flex flex-col gap-1 rounded-card-nested border border-border bg-muted p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{l.name}</span>
                  <code className="font-mono text-xs break-all text-muted-foreground">{l.path}</code>
                </div>
                <p className="text-sm text-muted-foreground">{l.what}</p>
              </div>
              {i < LAYERS.length - 1 && <ArrowDown aria-hidden className="size-4 self-center text-muted-foreground" />}
            </React.Fragment>
          ))}
        </div>
        <RuleList
          rules={[
            "Content (src/content) feeds pages and product components; copy is never typed into JSX.",
            "Need a look a primitive can't give? Add the variant to the primitive first, then use it.",
            "npm run lint:tokens enforces this: no arbitrary values, raw colours or inline styles.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Where code lives">
        <KeyValueTable head={["Folder", "What goes there"]} rows={FOLDERS} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="State — the browser is the backend"
        where="Shared prototype state is kept in localStorage by its own hook, so every page and tab agrees (useSession also fires an event of the same name for the current tab)."
      >
        <KeyValueTable head={["localStorage key", "Owner"]} rows={STATE_KEYS} />
        <RuleList
          rules={[
            "These hooks are the seam for production: swap each for an API call, keep its return shape.",
            "Prototype switches (auth state, pricing phase, preview flags) live in apnahire/prototype-settings.tsx — strip before production.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="AI routes — the only server code"
        component="src/app/api/**/route.ts"
        where="Called from the job-posting wizard and OnlyRounds."
      >
        <KeyValueTable head={["Route", "Does"]} rows={API_ROUTES} />
        <RuleList
          rules={[
            "All use AI SDK generateText with a zod schema (Output.object), on gemini-2.5-flash.",
            "No GOOGLE_GENERATIVE_AI_API_KEY → dummy mode: a keyword parser answers, so the flow works offline.",
            "readJsonBody (src/lib/read-json-body.ts) rejects bodies over 50 KB with 413 before Gemini is called.",
            "geminiErrorMessage (src/lib/gemini-error.ts) turns Gemini failures into one set of user messages.",
            "The routes are public: protect the deployment (Vercel deployment protection) before sharing a URL.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Money" component="src/lib/apnahire/bill.ts" where="The order summary (checkout-drawer.tsx).">
        <RuleList
          rules={[
            "computeBill: items − proration credit − capped coupon = sub total; GST (GST_RATE, 18%) on the sub total.",
            "withGst: the renewal amount — the plan's own price plus GST; coupons are first-cycle only.",
            "Prices and plans come from src/content (job-plans, credit-bundles, subscriptions); keep docs/PRICING.md in sync.",
            "Covered by npm test (src/lib/apnahire/bill.test.ts).",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Quality gates">
        <KeyValueTable
          head={["Command", "Checks"]}
          rows={[
            ["npm run lint", "ESLint (syntax, React rules)"],
            ["npm run lint:tokens", "Token contract: arbitrary values, raw colours, serif outside marketing"],
            ["npm run build", "Builds the design-system package, then the Next.js app (type check)"],
            ["npm run check", "All three — run before every commit"],
            ["npm test", "Unit tests for pure logic (node:test)"],
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Adding something">
        <RuleList
          rules={[
            "A primitive: packages/design-system/src/components/ui/<name>.tsx, export from index.ts, add to docs/COMPONENTS.md and its category page here.",
            "A product component: src/components/<product>/, plus an entry in src/app/design-system/product/catalog.ts.",
            "A page: src/app/<area>/, composing existing components; add the route to docs/PROJECT-MAP.md.",
            "Copy or prices: src/content/*.ts only.",
            "Logic with a branch, money or parsing: src/lib, with a test.",
          ]}
        />
      </ShowcaseEntry>
    </ShowcasePage>
  )
}
