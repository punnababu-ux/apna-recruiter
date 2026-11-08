/**
 * Engineering › Working rules — how people and AI agents work in this repo:
 * where the docs are, the agent working rules, what needs Punna's sign-off,
 * and the recurring upkeep. Mirrors AGENTS.md ("Working rules for AI
 * agents"), docs/README.md and docs/status/WORK-STREAMS.md; change those
 * first, then this page.
 */

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@apna/design-system"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../../product/showcase-blocks"

export const metadata = { title: "Working rules" }

const READING_ORDER: [string, string][] = [
  ["AGENTS.md", "The contract: tokens, composition, copy, layout rules. Jump to the section you need"],
  ["docs/README.md", "Index of every doc, by what you need it for"],
  ["docs/status/WORK-STREAMS.md", "Every stream's state, what needs Punna, recurring reminders"],
  ["docs/start-here/AI-HANDOFF.md", "Working context and workflows"],
  ["docs/start-here/PROJECT-MAP.md", "What Punna says → route → file. Use it instead of exploring"],
]

const DOC_FOLDERS: [string, string][] = [
  ["docs/start-here/", "Orientation: handoff, project map"],
  ["docs/reference/", "Lookups: components, tokens, pricing, clay style, live employer app"],
  ["docs/status/", "Live trackers: work streams, backlog, Figma sync, review boards"],
  ["docs/history/", "Session records, audits, plans. Only the open session's file is edited"],
  [".claude/skills/", "design-variants (Sumit's review lenses), figma-code-sync (Figma ↔ code audits)"],
  ["graphify-out/", "Knowledge graph of code + docs. Ask it with graphify query \"…\""],
]

const MODELS: [string, string][] = [
  ["Haiku / Sonnet subagents", "Searching, reading files, screenshots and captures, bulk renames or copy sweeps, simple checks"],
  ["Opus, default effort", "The main session: plans, decides, reviews the subagents' work"],
  ["Opus, medium or high effort", "Only after asking Punna, with the reason"],
]

const NEEDS_PUNNA = [
  "Commits, pushes, merges and pull requests (Claude never asks in wrap-ups; Punna says when).",
  "Prices and price rules: new MRPs, discounts, proration, pack validity.",
  "Product assumptions Claude made (listed in docs/reference/PRICING.md and memory).",
  "Copy not taken from a source (Lovable, employer.apna.co).",
  "Approving generated clay assets before they are cut out and installed.",
  "Anything that needs Punna's login or OTP.",
  "Deleting worktrees or branches; using Opus at medium or high effort.",
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

export default function WorkingRulesPage() {
  return (
    <ShowcasePage
      category="Engineering"
      title="Working rules"
      description="How people and AI agents work in this repo: where to start, how to save tokens, what needs Punna's sign-off, and the upkeep that keeps a fresh chat fast. The source of truth is AGENTS.md and the docs folder; this page mirrors them."
    >
      <ShowcaseEntry title="Start here" where="A fresh chat or a new teammate reads these, in this order.">
        <KeyValueTable head={["File", "Use it for"]} rows={READING_ORDER} />
      </ShowcaseEntry>

      <ShowcaseEntry title="Where the knowledge lives">
        <KeyValueTable head={["Folder", "Holds"]} rows={DOC_FOLDERS} />
        <RuleList
          rules={[
            "Doc names are UPPER-KEBAB-CASE .md, named for the content; dated records go in docs/history/.",
            "Moving a doc updates every reference to it, memory files included.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Models and agents: save tokens" where='AGENTS.md → "Working rules for AI agents".'>
        <KeyValueTable head={["Who", "Does"]} rows={MODELS} />
        <RuleList
          rules={[
            "Look up before you explore: PROJECT-MAP.md, then graphify query, only then grep. Read the section you need, not whole files.",
            "The quality bar in AGENTS.md is binding: contrast, no setState in effects, no hidden preview panel, no second create-job wizard. A failing check is fixed at the cause. KNOWN and the screenshot tolerance are not loosened.",
            "Independent subagents go out in one message so they run in parallel; each returns a short reply, not file dumps.",
            "Keep progress in a status file so a new chat can resume from it.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Requests and replies">
        <RuleList
          rules={[
            "A long or multi-part message is restated first as numbered parts, each with what \"done\" means; the reply reports against the same numbers.",
            "Every reply leads with the outcome, then grouped points, then what is left or not verified.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry title="Needs Punna" where="The live list, with today's items, is docs/status/WORK-STREAMS.md. Everything else Claude does without asking.">
        <RuleList rules={NEEDS_PUNNA} />
      </ShowcaseEntry>

      <ShowcaseEntry title="Recurring upkeep" where="Claude reminds Punna in one line at the end of a task when one is due.">
        <KeyValueTable
          head={["When", "Do"]}
          rows={[
            ["Docs changed, or 7+ days", "Rebuild the graph: graphify update . (code, free); re-extract changed docs with subagents (LLM)"],
            ["Checkout code changed", "Figma re-audit (skill figma-code-sync)"],
            ["A stream moved", "Update docs/status/WORK-STREAMS.md"],
            ["A design was approved", "Add a dated lens to the design-variants skill, same turn"],
            ["Before production", "Swap localStorage hooks for API calls; keep each hook's return shape"],
          ]}
        />
      </ShowcaseEntry>
    </ShowcasePage>
  )
}
