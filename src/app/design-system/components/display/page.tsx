"use client"

import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Skeleton,
  Spinner,
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  Button,
} from "@apna/design-system"
import { User, Plus } from "lucide-react"

export default function DisplayComponentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="success">Category 3</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          3. Data Display
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Avatars, status badges, loading skeletons, spinners, dividers, and empty states.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Avatar, Badge, Skeleton, Spinner, Separator, Empty } from "@apna/design-system"'}</code>
      </div>

      {/* Badges */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Status Badges & Chips
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* Avatars */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Avatars
        </h2>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarFallback>PB</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">AK</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback className="bg-emerald-500/15 text-emerald-600 font-bold">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Skeletons & Spinners */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Loading Skeletons & Spinners
        </h2>
        <div className="flex items-center gap-6">
          <Spinner className="size-5 text-primary" />
          <Spinner className="size-8 text-muted-foreground" />
          <div className="space-y-2 flex-1 max-w-sm">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>

      {/* Empty States */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Empty States
        </h2>
        <Empty className="py-8 border border-dashed border-border rounded-lg">
          <EmptyHeader>
            <User className="size-8 text-muted-foreground mx-auto" />
            <EmptyTitle>No Candidates Found</EmptyTitle>
            <EmptyDescription>Try adjusting your search criteria or invite candidates directly.</EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" size="sm" className="mt-2">
            <Plus className="mr-1 size-3.5" />
            Add Candidate
          </Button>
        </Empty>
      </div>
    </div>
  )
}
