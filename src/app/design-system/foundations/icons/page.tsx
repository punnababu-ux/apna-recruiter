"use client"

import * as React from "react"
import { Badge, Button, Input } from "@apna/design-system"
import { Sparkles, Heart, Bookmark, Star, CheckCircle2, Bell, Search, User, Settings, Briefcase, Layers, Filter, FileText, Copy, Plus, Minus, Trash2, Edit3, Share2, Download, Upload, RefreshCw, ExternalLink, Eye, EyeOff, Lock, Unlock, MoreHorizontal, MoreVertical, Check, X, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Home, Menu, Grid, MapPin, Building2, Users, UserPlus, UserCheck, GraduationCap, Award, DollarSign, CreditCard, Calendar, Clock, Target, Zap, XCircle, AlertTriangle, AlertCircle, Info, HelpCircle, ShieldCheck, Activity, FilePlus, Folder, FolderPlus, Mail, MessageSquare, Send, Paperclip, LinkIcon, Tag, Hash, ImageIcon, Wand2, Bot, Brain, Cpu, Lightbulb } from "@apna/design-system"
import { toast } from "sonner"

export default function IconsPage() {
  const [favoriteActive, setFavoriteActive] = React.useState(false)
  const [bookmarkActive, setBookmarkActive] = React.useState(true)
  const [starRating, setStarRating] = React.useState(4)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")

  const iconSizes = [
    { token: "size-3 (12px)", cls: "size-3", px: 12, usage: "Micro inline indicators & small badges" },
    { token: "size-3.5 (14px)", cls: "size-3.5", px: 14, usage: "Compact field icons & sub-labels" },
    { token: "size-4 (16px)", cls: "size-4", px: 16, usage: "Default UI controls, buttons, form inputs, dropdown items" },
    { token: "size-5 (20px)", cls: "size-5", px: 20, usage: "Sub-headings, list item leading icons, card titles" },
    { token: "size-6 (24px)", cls: "size-6", px: 24, usage: "Primary navigation & section header highlights" },
    { token: "size-8 (32px)", cls: "size-8", px: 32, usage: "Empty state illustrations & feature highlights" },
    { token: "size-10 (40px)", cls: "size-10", px: 40, usage: "Large splash graphics & brand badges" },
  ]

  const fullIconLibrary = [
    // Actions
    { name: "Plus", icon: Plus, cat: "Actions" },
    { name: "Minus", icon: Minus, cat: "Actions" },
    { name: "Trash2", icon: Trash2, cat: "Actions" },
    { name: "Edit3", icon: Edit3, cat: "Actions" },
    { name: "Share2", icon: Share2, cat: "Actions" },
    { name: "Download", icon: Download, cat: "Actions" },
    { name: "Upload", icon: Upload, cat: "Actions" },
    { name: "Filter", icon: Filter, cat: "Actions" },
    { name: "RefreshCw", icon: RefreshCw, cat: "Actions" },
    { name: "Copy", icon: Copy, cat: "Actions" },
    { name: "ExternalLink", icon: ExternalLink, cat: "Actions" },
    { name: "Eye", icon: Eye, cat: "Actions" },
    { name: "EyeOff", icon: EyeOff, cat: "Actions" },
    { name: "Lock", icon: Lock, cat: "Actions" },
    { name: "Unlock", icon: Unlock, cat: "Actions" },
    { name: "MoreHorizontal", icon: MoreHorizontal, cat: "Actions" },
    { name: "MoreVertical", icon: MoreVertical, cat: "Actions" },
    { name: "Check", icon: Check, cat: "Actions" },
    { name: "X", icon: X, cat: "Actions" },

    // Navigation
    { name: "Search", icon: Search, cat: "Navigation" },
    { name: "ArrowLeft", icon: ArrowLeft, cat: "Navigation" },
    { name: "ArrowRight", icon: ArrowRight, cat: "Navigation" },
    { name: "ArrowUp", icon: ArrowUp, cat: "Navigation" },
    { name: "ArrowDown", icon: ArrowDown, cat: "Navigation" },
    { name: "ChevronDown", icon: ChevronDown, cat: "Navigation" },
    { name: "ChevronUp", icon: ChevronUp, cat: "Navigation" },
    { name: "ChevronLeft", icon: ChevronLeft, cat: "Navigation" },
    { name: "ChevronRight", icon: ChevronRight, cat: "Navigation" },
    { name: "Home", icon: Home, cat: "Navigation" },
    { name: "Menu", icon: Menu, cat: "Navigation" },
    { name: "Grid", icon: Grid, cat: "Navigation" },
    { name: "MapPin", icon: MapPin, cat: "Navigation" },

    // Product & Work
    { name: "Briefcase", icon: Briefcase, cat: "Product" },
    { name: "Building2", icon: Building2, cat: "Product" },
    { name: "Users", icon: Users, cat: "Product" },
    { name: "UserPlus", icon: UserPlus, cat: "Product" },
    { name: "UserCheck", icon: UserCheck, cat: "Product" },
    { name: "GraduationCap", icon: GraduationCap, cat: "Product" },
    { name: "Award", icon: Award, cat: "Product" },
    { name: "DollarSign", icon: DollarSign, cat: "Product" },
    { name: "CreditCard", icon: CreditCard, cat: "Product" },
    { name: "Calendar", icon: Calendar, cat: "Product" },
    { name: "Clock", icon: Clock, cat: "Product" },
    { name: "Target", icon: Target, cat: "Product" },
    { name: "Zap", icon: Zap, cat: "Product" },
    { name: "User", icon: User, cat: "Product" },
    { name: "Settings", icon: Settings, cat: "Product" },

    // Status & Feedback
    { name: "CheckCircle2", icon: CheckCircle2, cat: "Status" },
    { name: "XCircle", icon: XCircle, cat: "Status" },
    { name: "AlertTriangle", icon: AlertTriangle, cat: "Status" },
    { name: "AlertCircle", icon: AlertCircle, cat: "Status" },
    { name: "Info", icon: Info, cat: "Status" },
    { name: "HelpCircle", icon: HelpCircle, cat: "Status" },
    { name: "Bell", icon: Bell, cat: "Status" },
    { name: "ShieldCheck", icon: ShieldCheck, cat: "Status" },
    { name: "Activity", icon: Activity, cat: "Status" },

    // Content & Files
    { name: "FileText", icon: FileText, cat: "Content" },
    { name: "FilePlus", icon: FilePlus, cat: "Content" },
    { name: "Folder", icon: Folder, cat: "Content" },
    { name: "FolderPlus", icon: FolderPlus, cat: "Content" },
    { name: "Mail", icon: Mail, cat: "Content" },
    { name: "MessageSquare", icon: MessageSquare, cat: "Content" },
    { name: "Send", icon: Send, cat: "Content" },
    { name: "Paperclip", icon: Paperclip, cat: "Content" },
    { name: "Link", icon: LinkIcon, cat: "Content" },
    { name: "Tag", icon: Tag, cat: "Content" },
    { name: "Hash", icon: Hash, cat: "Content" },
    { name: "Image", icon: ImageIcon, cat: "Content" },

    // AI & Magic
    { name: "Sparkles", icon: Sparkles, cat: "AI & Magic" },
    { name: "Wand2", icon: Wand2, cat: "AI & Magic" },
    { name: "Bot", icon: Bot, cat: "AI & Magic" },
    { name: "Brain", icon: Brain, cat: "AI & Magic" },
    { name: "Cpu", icon: Cpu, cat: "AI & Magic" },
    { name: "Lightbulb", icon: Lightbulb, cat: "AI & Magic" },
  ]

  const categories = ["All", "Actions", "Navigation", "Product", "Status", "Content", "AI & Magic"]

  const filteredIcons = fullIconLibrary.filter((ic) => {
    const matchesSearch = ic.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCategory === "All" || ic.cat === selectedCategory
    return matchesSearch && matchesCat
  })

  const copyIconSnippet = (name: string) => {
    const code = `import { ${name} } from "@apna/design-system"`
    navigator.clipboard.writeText(code)
    toast.success(`Copied import for ${name}!`)
  }

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="info">Icon & Symbol System</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          Icons & Symbol System
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Built on Material Symbols Rounded (vendored as SVG components — see <code>@apna/design-system</code>). Guidelines for icon sizing, line vs fill states, and context coloring.
        </p>
      </div>

      {/* Overview Banner */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground font-heading">
          <Layers className="size-4 text-primary" />
          <span>Core Icon Rules & Conventions</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-lg border border-border/80 bg-muted/50 p-3 space-y-1">
            <span className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">1. Reuses Foundations</span>
            <p className="font-semibold text-foreground">No Duplicate Primitives Needed</p>
            <p className="text-2xs text-muted-foreground">Icon sizes reuse Spacing primitives (<code>--space-*</code>) and colors inherit Semantic roles (<code>text-primary</code>, <code>text-muted</code>).</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/50 p-3 space-y-1">
            <span className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">2. Color Context</span>
            <p className="font-semibold text-foreground">Inherits Text Color</p>
            <p className="text-2xs text-muted-foreground">Icons inherit text color via <code>currentColor</code> (`text-foreground`, `text-primary`).</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/50 p-3 space-y-1">
            <span className="text-3xs font-bold uppercase tracking-wider text-muted-foreground">3. State Convention</span>
            <p className="font-semibold text-foreground">Line (Resting) vs Fill (Active)</p>
            <p className="text-2xs text-muted-foreground">Outline icons for resting UI; solid fills (`fill-primary`) for selected states.</p>
          </div>
        </div>
      </div>

      {/* Icon Size Ramp */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Icon Size Ramp (`size-*`)
            </h2>
            <p className="text-2xs text-muted-foreground">
              Sanctioned size steps mapped directly to Tailwind&apos;s <code>size-*</code> utility scale.
            </p>
          </div>
          <Badge variant="outline">Size Ramp</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {iconSizes.map((s) => (
            <div key={s.token} className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-primary">{s.token}</code>
                <span className="text-3xs font-mono text-muted-foreground">{s.px}px</span>
              </div>

              <div className="h-16 w-full rounded-lg bg-muted/50 flex items-center justify-center border border-border/40">
                <Sparkles className={`${s.cls} text-primary`} />
              </div>

              <p className="text-3xs text-muted-foreground">{s.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Line vs Fill State Conventions */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Line (Outline) vs Fill (Solid) Conventions
            </h2>
            <p className="text-2xs text-muted-foreground">
              Outline for resting UI states; Solid fill for active, selected, or toggled states.
            </p>
          </div>
          <Badge variant="success">State Conventions</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Heart Toggle */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground">Favorite / Like Action</span>
              <p className="text-2xs text-muted-foreground">Resting outline → Active filled red heart</p>
            </div>

            <div className="flex items-center justify-center h-20 rounded-xl bg-muted/40 border border-border/40">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFavoriteActive(!favoriteActive)}
                className="gap-2"
              >
                <Heart
                  className={`size-4 transition-colors ${
                    favoriteActive
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
                <span>{favoriteActive ? "Favorited" : "Add to Favorites"}</span>
              </Button>
            </div>

            <code className="text-3xs font-mono text-muted-foreground bg-muted p-2 rounded">
              {favoriteActive ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
            </code>
          </div>

          {/* Bookmark Toggle */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground">Saved Candidate / Job</span>
              <p className="text-2xs text-muted-foreground">Resting outline → Active filled brand green</p>
            </div>

            <div className="flex items-center justify-center h-20 rounded-xl bg-muted/40 border border-border/40">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBookmarkActive(!bookmarkActive)}
                className="gap-2"
              >
                <Bookmark
                  className={`size-4 transition-colors ${
                    bookmarkActive
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <span>{bookmarkActive ? "Saved Candidate" : "Save Candidate"}</span>
              </Button>
            </div>

            <code className="text-3xs font-mono text-muted-foreground bg-muted p-2 rounded">
              {bookmarkActive ? 'fill-primary text-primary' : 'text-muted-foreground'}
            </code>
          </div>

          {/* Rating Stars */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground">Rating & Priority Stars</span>
              <p className="text-2xs text-muted-foreground">Filled gold for rating level → Outline for unselected</p>
            </div>

            <div className="flex items-center justify-center gap-1.5 h-20 rounded-xl bg-muted/40 border border-border/40">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setStarRating(star)}
                  className="cursor-pointer p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`size-5 transition-colors ${
                      star <= starRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <code className="text-3xs font-mono text-muted-foreground bg-muted p-2 rounded">
              fill-amber-400 text-amber-400 ({starRating}/5 selected)
            </code>
          </div>
        </div>
      </div>

      {/* Full System Icons Library Browser */}
      <div className="space-y-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground font-heading">
                System Icon Library ({filteredIcons.length} icons)
              </h2>
              <Badge variant="outline" className="text-3xs">Material Symbols</Badge>
            </div>
            <p className="text-2xs text-muted-foreground mt-0.5">
              Click any icon card to copy its <code>import</code> snippet. Filter by category or search by name.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search icon name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="xs"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {filteredIcons.map((ic) => {
            const IconComponent = ic.icon
            return (
              <div
                key={ic.name}
                onClick={() => copyIconSnippet(ic.name)}
                className="group cursor-pointer rounded-xl border border-border bg-card p-3 space-y-2 text-center shadow-xs hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <div className="h-10 w-full rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <IconComponent className="size-4 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-2xs font-mono font-bold text-foreground truncate" title={ic.name}>{ic.name}</p>
                    <Copy className="size-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <Badge variant="outline" className="text-3xs px-1 py-0">{ic.cat}</Badge>
                </div>
              </div>
            )
          })}
        </div>

        {filteredIcons.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground text-xs">
            No icons found matching &quot;{searchQuery}&quot;. Try another term or category.
          </div>
        )}
      </div>
    </div>
  )
}
