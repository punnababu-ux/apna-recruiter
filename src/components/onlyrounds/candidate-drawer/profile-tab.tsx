"use client"

import { Briefcase, FileText, GraduationCap, MapPin } from "@apna/design-system"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { DrawerCandidate } from "@/components/onlyrounds/candidate-drawer/types"

// ── Profile tab ───────────────────────────────────────────────────────────

export function ProfileTab({ candidate }: { candidate: DrawerCandidate }) {
  const p = candidate.profile
  if (!p) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <FileText className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No profile uploaded yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Candidate hasn&apos;t shared a resume or completed their profile.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Quick meta row */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {p.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" />
            {p.location}
          </span>
        )}
        {typeof p.experienceYears === "number" && (
          <span className="inline-flex items-center gap-1">
            <Briefcase className="size-3" />
            {p.experienceYears} years experience
          </span>
        )}
        {p.currentRole && (
          <span className="inline-flex items-center gap-1">
            Currently:{" "}
            <span className="text-foreground">{p.currentRole}</span>
          </span>
        )}
      </div>

      {p.about && (
        <section className="flex flex-col gap-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            About
          </h4>
          <p className="text-sm">{p.about}</p>
        </section>
      )}

      {p.experience && p.experience.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Briefcase className="size-3" />
            Experience
          </h4>
          <ol className="flex flex-col gap-3">
            {p.experience.map((e, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 border border-border bg-muted/10 rounded-lg p-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">{e.role}</span>
                  <span className="shrink-0 text-xs text-muted-foreground font-medium">
                    {e.period}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {e.company}
                </span>
                {e.description && (
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{e.description}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.education && p.education.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <GraduationCap className="size-3" />
            Education
          </h4>
          <ol className="flex flex-col gap-3">
            {p.education.map((e, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 border border-border bg-muted/10 rounded-lg p-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">{e.degree}</span>
                  <span className="shrink-0 text-xs text-muted-foreground font-medium">
                    {e.period}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {e.institution}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.skills && p.skills.length > 0 && (
        <section className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Skills
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {p.skills.map((s) => (
              <Badge key={s} variant="secondary" className="font-normal">
                {s}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {p.resumeUrl && (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => window.open(p.resumeUrl, "_blank")}
        >
          <FileText className="size-3.5" />
          Open resume
        </Button>
      )}
    </div>
  )
}
