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
 * sit on the same 24px grid: `WhatsApp` and `VisibilityTicks` (plan visibility: one tick, double tick, tick with speed lines).
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
  Voicemail, Wallet, Wand2, Wrench, X, ReceiptText,
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

/** Plan visibility as ticks (user call, 2026-10-21; Punna's own glyphs):
 *  Basic one tick, Higher a double tick, Maximum a tick with speed lines.
 *  Filled shapes on the 24px grid, in the current colour — size and colour
 *  it like any icon (`size-4 text-checkout-primary`). */
const VISIBILITY_TICKS = {
  1: "M9.54996 15.15L18.025 6.675C18.225 6.475 18.4583 6.375 18.725 6.375C18.9916 6.375 19.225 6.475 19.425 6.675C19.625 6.875 19.725 7.1125 19.725 7.3875C19.725 7.6625 19.625 7.9 19.425 8.1L10.25 17.3C10.05 17.5 9.81663 17.6 9.54996 17.6C9.2833 17.6 9.04996 17.5 8.84996 17.3L4.54996 13C4.34996 12.8 4.25413 12.5625 4.26246 12.2875C4.2708 12.0125 4.37496 11.775 4.57496 11.575C4.77496 11.375 5.01246 11.275 5.28746 11.275C5.56246 11.275 5.79996 11.375 5.99996 11.575L9.54996 15.15Z",
  2: "M1.74991 13.0497C1.54991 12.8497 1.45408 12.6164 1.46241 12.3497C1.47075 12.0831 1.57491 11.8497 1.77491 11.6497C1.97491 11.4664 2.20825 11.3706 2.47491 11.3622C2.74158 11.3539 2.97491 11.4497 3.17491 11.6497L7.42491 15.8997C7.62491 16.0997 7.72075 16.3331 7.71241 16.5997C7.70408 16.8664 7.59991 17.0997 7.39991 17.2997C7.19991 17.4831 6.96658 17.5789 6.69991 17.5872C6.43325 17.5956 6.19991 17.4997 5.99991 17.2997L1.74991 13.0497ZM12.3499 15.1747L20.8499 6.67472C21.0499 6.47472 21.2832 6.37889 21.5499 6.38722C21.8166 6.39555 22.0499 6.49972 22.2499 6.69972C22.4332 6.89972 22.5291 7.13305 22.5374 7.39972C22.5457 7.66639 22.4499 7.89972 22.2499 8.09972L13.0499 17.2997C12.8499 17.4997 12.6166 17.5997 12.3499 17.5997C12.0832 17.5997 11.8499 17.4997 11.6499 17.2997L7.39991 13.0497C7.21658 12.8664 7.12491 12.6372 7.12491 12.3622C7.12491 12.0872 7.21658 11.8497 7.39991 11.6497C7.59991 11.4497 7.83741 11.3497 8.11241 11.3497C8.38741 11.3497 8.62491 11.4497 8.82491 11.6497L12.3499 15.1747ZM16.5749 8.12472L13.0499 11.6497C12.8666 11.8331 12.6374 11.9247 12.3624 11.9247C12.0874 11.9247 11.8499 11.8331 11.6499 11.6497C11.4499 11.4497 11.3499 11.2122 11.3499 10.9372C11.3499 10.6622 11.4499 10.4247 11.6499 10.2247L15.1749 6.69972C15.3582 6.51639 15.5874 6.42472 15.8624 6.42472C16.1374 6.42472 16.3749 6.51639 16.5749 6.69972C16.7749 6.89972 16.8749 7.13722 16.8749 7.41222C16.8749 7.68722 16.7749 7.92472 16.5749 8.12472Z",
  3: "M11.0001 18.0004C10.7168 18.0004 10.4793 17.9046 10.2876 17.7129C10.0959 17.5212 10.0001 17.2837 10.0001 17.0004C10.0001 16.7171 10.0959 16.4796 10.2876 16.2879C10.4793 16.0962 10.7168 16.0004 11.0001 16.0004H15.0001C15.2834 16.0004 15.5209 16.0962 15.7126 16.2879C15.9043 16.4796 16.0001 16.7171 16.0001 17.0004C16.0001 17.2837 15.9043 17.5212 15.7126 17.7129C15.5209 17.9046 15.2834 18.0004 15.0001 18.0004H11.0001ZM6.05011 15.1504L14.5001 6.70039C14.7001 6.50039 14.9334 6.40039 15.2001 6.40039C15.4668 6.40039 15.7001 6.50039 15.9001 6.70039C16.1001 6.90039 16.2001 7.13789 16.2001 7.41289C16.2001 7.68789 16.1001 7.92539 15.9001 8.12539L6.75011 17.3004C6.55011 17.5004 6.31678 17.6004 6.05011 17.6004C5.78344 17.6004 5.55011 17.5004 5.35011 17.3004L1.07511 13.0254C0.875109 12.8254 0.779276 12.5879 0.787609 12.3129C0.795943 12.0379 0.900109 11.8004 1.10011 11.6004C1.30011 11.4004 1.53761 11.3004 1.81261 11.3004C2.08761 11.3004 2.32511 11.4004 2.52511 11.6004L6.05011 15.1504ZM15.0001 14.0004C14.7168 14.0004 14.4793 13.9046 14.2876 13.7129C14.0959 13.5212 14.0001 13.2837 14.0001 13.0004C14.0001 12.7171 14.0959 12.4796 14.2876 12.2879C14.4793 12.0962 14.7168 12.0004 15.0001 12.0004H19.0001C19.2834 12.0004 19.5209 12.0962 19.7126 12.2879C19.9043 12.4796 20.0001 12.7171 20.0001 13.0004C20.0001 13.2837 19.9043 13.5212 19.7126 13.7129C19.5209 13.9046 19.2834 14.0004 19.0001 14.0004H15.0001ZM19.0001 10.0004C18.7168 10.0004 18.4793 9.90456 18.2876 9.71289C18.0959 9.52122 18.0001 9.28372 18.0001 9.00039C18.0001 8.71706 18.0959 8.47956 18.2876 8.28789C18.4793 8.09622 18.7168 8.00039 19.0001 8.00039H23.0001C23.2834 8.00039 23.5209 8.09622 23.7126 8.28789C23.9043 8.47956 24.0001 8.71706 24.0001 9.00039C24.0001 9.28372 23.9043 9.52122 23.7126 9.71289C23.5209 9.90456 23.2834 10.0004 23.0001 10.0004H19.0001Z",
} as const

export function VisibilityTicks({
  level,
  className,
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children"> & { level: 1 | 2 | 3 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("lucide lucide-visibility-ticks", className)}
      {...props}
    >
      <path d={VISIBILITY_TICKS[level]} />
    </svg>
  )
}

