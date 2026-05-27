/**
 * POST /api/onlyrounds/generate-jd
 *
 * Proxies to the Apna OnlyRounds JD-generation service.
 * Keeps the bearer token server-side (never shipped to the browser).
 *
 * Upstream:
 *   POST {API_BASE}/api/workspace/{WORKSPACE_ID}/jobs/generate-job-description
 *   Body: { "jobDescriptionText": "<seed text>" }
 *   Response envelope: { statusCode, status, message, data }
 *
 * ── Dummy mode ────────────────────────────────────────────────────────────
 * When APNA_ONLYROUND_BEARER_TOKEN is absent, returns a locally-generated
 * placeholder JD so the wizard flow works without staging credentials.
 * Set the env var to enable the live call.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server"

const API_BASE =
  process.env.APNA_ONLYROUND_API_BASE ??
  "https://api.staging.infra.apna.co/only-round"

// Staging default. Override per environment.
const WORKSPACE_ID =
  process.env.APNA_ONLYROUND_WORKSPACE_ID ??
  "aaa1bdde-4796-4f1c-ba2e-34d9be4ed9ce"

const BEARER_TOKEN = process.env.APNA_ONLYROUND_BEARER_TOKEN

// ── Dummy generation ──────────────────────────────────────────────────────

function buildDummyJd(seed: string): string {
  const role = seed.trim() || "this role"
  return (
    `About ${role}\n\n` +
    `We're looking for a ${role} to join a high-growth team. You'll own ` +
    `the end-to-end outcomes for your area, partner closely with cross-` +
    `functional stakeholders, and ship thoughtful work at a steady pace.\n\n` +
    `Responsibilities\n` +
    `• Lead core day-to-day execution for your scope\n` +
    `• Partner with product, design, and data peers\n` +
    `• Communicate trade-offs clearly and raise risks early\n\n` +
    `What we're looking for\n` +
    `• 2+ years of relevant experience\n` +
    `• Strong written communication and a bias for action\n` +
    `• Comfort working through ambiguity`
  )
}

// ── Response shape from the upstream API ──────────────────────────────────
// We don't have a published schema yet, so this is defensive: try the most
// likely keys in order and accept a plain string as a fallback.

function extractJd(data: unknown): string {
  if (typeof data === "string") return data
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>
    for (const key of [
      "jobDescription",
      "jobDescriptionText",
      "description",
      "text",
      "content",
      "generatedText",
    ]) {
      const v = d[key]
      if (typeof v === "string" && v.trim()) return v
    }
  }
  return ""
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const seed: string = (
      body?.seed ??
      body?.title ??
      body?.jobDescriptionText ??
      ""
    )
      .toString()
      .trim()

    if (!seed) {
      return NextResponse.json({ jobDescription: "" })
    }

    // Dummy fallback when no token is configured.
    if (!BEARER_TOKEN) {
      console.log(
        "[generate-jd] dummy mode — set APNA_ONLYROUND_BEARER_TOKEN to use live API",
      )
      return NextResponse.json({ jobDescription: buildDummyJd(seed) })
    }

    const url = `${API_BASE}/api/workspace/${WORKSPACE_ID}/jobs/generate-job-description`
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: `Bearer ${BEARER_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ jobDescriptionText: seed }),
    })

    if (!upstream.ok) {
      console.error(
        "[generate-jd] upstream HTTP",
        upstream.status,
        await upstream.text().catch(() => ""),
      )
      return NextResponse.json({ jobDescription: buildDummyJd(seed) })
    }

    const json = await upstream.json().catch(() => null)

    // Apna envelope: { statusCode, status, message, data }
    if (json?.status === "ERROR") {
      console.error("[generate-jd] upstream ERROR:", json?.message)
      return NextResponse.json({ jobDescription: buildDummyJd(seed) })
    }

    const jobDescription = extractJd(json?.data ?? json)
    if (!jobDescription) {
      console.error(
        "[generate-jd] could not extract JD from response:",
        JSON.stringify(json).slice(0, 500),
      )
      return NextResponse.json({ jobDescription: buildDummyJd(seed) })
    }

    return NextResponse.json({ jobDescription })
  } catch (err) {
    console.error("[generate-jd]", err)
    // Don't block the UI on failure — return empty so the wizard keeps moving.
    return NextResponse.json({ jobDescription: "" }, { status: 200 })
  }
}
