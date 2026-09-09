"use client"

import * as React from "react"
import { Badge } from "./badge"
import { Button } from "./button"
import { Separator } from "./separator"
import { MapPin, Briefcase, Clock, Building2, BookmarkPlus } from "@/icons/icons"
import { cn } from "@/lib/utils"

export interface JobCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  company: string
  location: string
  salary?: string
  jobType: string
  postedAt: string
  logoUrl?: string
  onApply?: () => void
  onSave?: () => void
}

export function JobCard({
  title,
  company,
  location,
  salary,
  jobType,
  postedAt,
  logoUrl,
  onApply,
  onSave,
  className,
  ...props
}: JobCardProps) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-border/80 hover:shadow-xs",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 overflow-hidden">
            {logoUrl ? (
              <img src={logoUrl} alt={`${company} logo`} className="h-full w-full object-cover" />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground/60" />
            )}
          </div>
          <div className="space-y-1 text-left">
            <h3 className="font-heading text-lg font-semibold leading-tight text-foreground line-clamp-1">
              {title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">{company}</p>
          </div>
        </div>
      </div>

      {/* Badges / Meta */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="gap-1.5 font-normal text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </Badge>
        <Badge variant="outline" className="gap-1.5 font-normal text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5" />
          {jobType}
        </Badge>
        {salary && (
          <Badge variant="outline" className="gap-1.5 font-medium text-foreground bg-muted/30">
            {salary}
          </Badge>
        )}
      </div>

      <Separator className="opacity-50" />

      {/* Footer */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{postedAt}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={onSave} className="h-9 w-9 p-0 sm:w-auto sm:px-4 shrink-0 cursor-pointer" aria-label="Save Job">
            <BookmarkPlus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button variant="default" onClick={onApply} className="h-9 px-6 shrink-0 cursor-pointer">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  )
}
