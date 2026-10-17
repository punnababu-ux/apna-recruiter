/**
 * Icons — re-exported directly from `lucide-react`.
 *
 * Poneglyph's Figma icon set is built from the same Lucide source (see
 * packages/design-system Figma "Icons" page), so code and design now match
 * exactly, glyph for glyph. Call sites are unaffected: every name below is
 * either a real lucide-react export or one of its own built-in "*Icon"
 * aliases, so nothing downstream needs to change.
 *
 * `Sell` has no Lucide equivalent and is mapped to `Tag`. Two custom glyphs
 * follow the same grid and stroke: `WhatsApp` and `SignalLevel`.
 */
export type { LucideIcon as IconComponent, LucideProps as IconProps } from "lucide-react"

export {
  BadgePercent, CircleAlert,
  Activity, AlertCircle, AlertTriangle, ArrowDown, ArrowLeft,
  ArrowRight, ArrowUp, ArrowUpDown, ArrowUpRight, AtSign, AudioLines,
  Award, Ban, BarChart2, Bell, Bike, Bold, BookOpen,
  Calculator, ChefHat, DoorOpen, HandCoins, Headset, Package, Route, Store, Truck,
  Bookmark, BookmarkPlus, Bot, Brain, Briefcase,
  BriefcaseBusiness,
  Building, Building2, Calendar, CalendarCheck, CalendarClock,
  CalendarDays, Check, CheckCircle2, CheckIcon, CheckSquare,
  ChevronDown, ChevronDownIcon, ChevronLeft, ChevronRight, ChevronRightIcon,
  ChevronUp, ChevronUpIcon, ChevronsUpDown, CircleCheck, CircleCheckBig, CircleCheckIcon,
  Clock, ClockFading, Code, Compass, Copy, Cpu,
  CreditCard, Database, DollarSign, Download, Edit,
  Edit3, ExternalLink, Eye, EyeOff, File,
  FileCode, FilePlus, FileSpreadsheet, FileText, Filter,
  Flag, Flame, FlaskConical, Folder, FolderPlus,
  Footprints, Globe, GraduationCap, Grid, Hash,
  Heading, Headphones, Heart, HeartHandshake, HelpCircle, History,
  Home, ImageIcon, ImagePlus, IndianRupee, InfinityIcon,
  Info, InfoIcon, Italic, KeyRound, Landmark, Languages, Laptop,
  Layers, Layout, LayoutGrid, LayoutList, Lightbulb,
  LinkIcon, ListChecks, ListTodo, Loader2, Loader2Icon,
  Lock, Mail, MapPin, Mars, Maximize2,
  Menu, MessageCircle, MessageCircleQuestion, MessageSquare, MessagesSquare,
  Mic, MicOff, Minus, Monitor, Moon, MoreHorizontal, Newspaper,
  MoreHorizontalIcon, MoreVertical, Navigation, OctagonXIcon, Palette,
  PanelLeft, PanelLeftIcon, Paperclip, Pause, Pencil,
  Phone, PhoneCall, PhoneIncoming, PhoneOff, PhoneOutgoing,
  Play, Plus, PowerOff, Puzzle, QrCode,
  Quote, RefreshCw, Rocket, RotateCcw, Save, Scale, Search, Send,
  Settings, Shapes, Share2, ShieldAlert, ShieldCheck,
  Sliders, SlidersHorizontal, Smartphone, Sparkle, Sparkles, Star,
  StickyNote, Sun, TableIcon, Table2, Tag,
  Target, Trash, Trash2, TrendingUp, TriangleAlertIcon,
  Trophy, Type, Underline, Unlock, Upload,
  User, User2, UserCheck, UserPlus, UserRound,
  UserSearch, Users, Venus, Video, VideoOff,
  Voicemail, Wallet, Wand2, Wrench, X,
  XCircle, XIcon, Zap,
  Tag as Sell,
} from "lucide-react"

import * as React from "react"
import { createLucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** Lucide ships no brand glyphs. This is Tabler's `brand-whatsapp` (MIT,
 *  tabler.io/icons) — same 24px grid, 2px round stroke as Lucide, so it sits
 *  in a feature list next to Check/Flame without looking like a pasted logo. */
export const WhatsApp = createLucideIcon("whatsapp", [
  ["path", { d: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21", key: "bubble" }],
  [
    "path",
    {
      d: "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
      key: "handset",
    },
  ],
])

/** A signal meter for a level from 0–3: Lucide's `chart-no-axes-column-
 *  increasing` (same 24px grid and 2px round stroke as every icon here), with
 *  the bars up to `level` in the current colour and the rest in the border
 *  colour. Size and colour it like any icon (`size-5 text-checkout-primary`).
 *  Plan visibility: Basic 1, Higher 2, Maximum 3. */
export function SignalLevel({
  level,
  className,
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children"> & { level: 0 | 1 | 2 | 3 }) {
  const bars = ["M5 21v-6", "M12 21V9", "M19 21V3"]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-signal-level", className)}
      {...props}
    >
      {bars.map((d, i) => (
        <path key={d} d={d} className={i < level ? undefined : "stroke-border"} />
      ))}
    </svg>
  )
}
