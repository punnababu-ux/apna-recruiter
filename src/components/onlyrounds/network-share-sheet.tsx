"use client"

/**
 * NetworkShareSheet — "Share this job with your network" dialog.
 *
 * Two-section layout:
 *   1. Copy-link row (copyable URL + "Copy Link" action)
 *   2. Icon row for direct shares (LinkedIn, WhatsApp, X, Email, More)
 *
 * Intentionally light: no network-specific logic here — each icon is a
 * mailto / deep-link anchor wired at call-time. Opens via Dialog primitive.
 */

import { Link2, Mail, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function NetworkShareSheet({
  open,
  onOpenChange,
  jobTitle,
  shareUrl = "https://onlyrounds.apna.co/job/share",
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
  jobTitle: string
  shareUrl?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // no-op
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this job with your network</DialogTitle>
          <DialogDescription>
            Candidates will apply to{" "}
            <span className="font-medium text-foreground">{jobTitle}</span> on
            the other side of this link.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link2 className="size-3.5" />
              Embed LinkedIn Post
            </div>
            <div className="flex items-center gap-2">
              <Input value={shareUrl} readOnly className="h-9 font-mono text-xs" />
              <Button size="sm" variant="default" onClick={copy} className="shrink-0">
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </div>
            <p className="text-2xs text-muted-foreground">
              Copy and paste this link to LinkedIn or any other channel.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              Share interview link directly with candidates
            </h3>
            <p className="text-xs text-muted-foreground">
              Share on WhatsApp, LinkedIn or get an app link to message anywhere.
            </p>
            <div className="mt-1 flex items-center gap-2">
              <ShareIcon label="WhatsApp">
                <MessageCircle className="size-4" />
              </ShareIcon>
              <ShareIcon label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 9.8H5.7v8.5h2.6V9.8zM7 5.6a1.5 1.5 0 1 0 0 3.1 1.5 1.5 0 0 0 0-3.1zm11.3 12.7v-4.6c0-2.4-1.3-3.5-3-3.5-1.4 0-2 .77-2.3 1.3V9.8H10.4v8.5h2.6v-4.7c0-1.1.3-2 1.6-2 1.3 0 1.5 1 1.5 2.1v4.6h2.2z" />
                </svg>
              </ShareIcon>
              <ShareIcon label="Email">
                <Mail className="size-4" />
              </ShareIcon>
              <ShareIcon label="More">
                <Share2 className="size-4" />
              </ShareIcon>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ShareIcon({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground"
    >
      {children}
    </button>
  )
}
