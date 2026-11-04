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
  MetricCard,
  ChatBubble,
  ChatChoice,
  ChatDayDivider,
  ChatNotice,
  ChatMessageList,
  ConversationRow,
  ConversationList,
  ShieldAlert,
} from "@apna/design-system"
import { User, Plus, Briefcase, Users, CalendarCheck, TrendingUp } from "@apna/design-system"

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
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <h2 className="text-base font-semibold text-foreground font-heading">
            Status Badges & Chips
          </h2>
          <Badge variant="outline" size="sm" className="font-mono">2 Sizes · 7 Variants</Badge>
        </div>

        {/* Default Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground font-heading">Default Size (`size=&quot;default&quot;`)</span>
            <code className="text-2xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">h-5 px-2 py-0.5 text-xs</code>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* Small Size */}
        <div className="space-y-2 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground font-heading">Small Size (`size=&quot;sm&quot;`)</span>
            <code className="text-2xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">h-4 px-1.5 py-0 text-2xs</code>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Badge variant="default" size="sm">Default</Badge>
            <Badge variant="secondary" size="sm">Secondary</Badge>
            <Badge variant="outline" size="sm">Outline</Badge>
            <Badge variant="info" size="sm">Info</Badge>
            <Badge variant="success" size="sm">Success</Badge>
            <Badge variant="warning" size="sm">Warning</Badge>
            <Badge variant="destructive" size="sm">Destructive</Badge>
          </div>
        </div>
      </div>

      {/* Metric / Stat Summary Cards */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Metric & Stat Summary Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Postings"
            value="166"
            icon={<Briefcase />}
            trend="+12% this mo"
            trendVariant="success"
          />
          <MetricCard
            label="Candidates Screened"
            value="143"
            icon={<Users />}
            trend="Across active roles"
            trendVariant="neutral"
          />
          <MetricCard
            label="Interviews Today"
            value="23"
            icon={<CalendarCheck />}
            trend="6 pending feedback"
            trendVariant="warning"
          />
          <MetricCard
            label="Offer Conversion"
            value="88%"
            icon={<TrendingUp />}
            trend="High conversion"
            trendVariant="success"
          />
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

      {/* Chat bubbles */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Chat Messages
        </h2>
        <ChatMessageList className="max-w-xl rounded-lg bg-muted/40 p-4">
          <ChatDayDivider>Today</ChatDayDivider>
          <ChatNotice icon={<ShieldAlert />} tone="warning">
            Apna never asks for money. Report any request for payment.
          </ChatNotice>
          <ChatBubble
            variant="assistant"
            label="Apna Assistant for Alok Singh, PixelVeda Studios"
            time="10:40"
            status="sent"
          >
            Hi! Alok at PixelVeda Studios is hiring a Delivery Executive. Are you interested?
          </ChatBubble>
          <ChatChoice time="10:41">Interested</ChatChoice>
          <ChatBubble variant="incoming" groupPosition="first">
            Is the job in Pune?
          </ChatBubble>
          <ChatBubble variant="incoming" groupPosition="last" time="10:42">
            And what are the shift timings?
          </ChatBubble>
          <ChatBubble variant="outgoing" time="10:44" status="read">
            Yes, Pune. Shifts are 9am to 6pm.
          </ChatBubble>
        </ChatMessageList>
      </div>

      {/* Conversation list */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Conversation List
        </h2>
        <ConversationList label="Conversations" className="max-w-md rounded-lg border border-border">
          <ConversationRow
            name="Ravi Kumar"
            initial="R"
            subtitle="Delivery Executive · Super premium"
            preview="Can you share the joining date?"
            time="10:42"
            unreadCount={2}
            status={<Badge variant="destructive">Urgent: needs reply</Badge>}
          />
          <ConversationRow
            name="Meena Shah"
            initial="M"
            subtitle="Delivery Executive"
            preview="Thanks, I will be there at 11."
            time="Yesterday"
          />
          <ConversationRow
            name="Imran Khan"
            initial="I"
            subtitle="Delivery Executive"
            preview="Interested"
            time="Mon"
            active
          />
        </ConversationList>
        <div className="flex items-center gap-2">
          <Badge variant="count-positive" size="count">3</Badge>
          <span className="text-xs text-muted-foreground">Badge <code>count-positive</code> (green count)</span>
        </div>
      </div>
    </div>
  )
}
