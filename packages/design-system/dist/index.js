"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  Activity: () => Activity,
  Alert: () => Alert,
  AlertAction: () => AlertAction,
  AlertBanner: () => AlertBanner,
  AlertCircle: () => AlertCircle,
  AlertDescription: () => AlertDescription,
  AlertDialog: () => AlertDialog,
  AlertDialogAction: () => AlertDialogAction,
  AlertDialogCancel: () => AlertDialogCancel,
  AlertDialogContent: () => AlertDialogContent,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogFooter: () => AlertDialogFooter,
  AlertDialogHeader: () => AlertDialogHeader,
  AlertDialogMedia: () => AlertDialogMedia,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogPortal: () => AlertDialogPortal,
  AlertDialogTitle: () => AlertDialogTitle,
  AlertDialogTrigger: () => AlertDialogTrigger,
  AlertTitle: () => AlertTitle,
  AlertTriangle: () => AlertTriangle,
  ApnaLogo: () => ApnaLogo,
  ArrowDown: () => ArrowDown,
  ArrowLeft: () => ArrowLeft,
  ArrowRight: () => ArrowRight,
  ArrowUp: () => ArrowUp,
  ArrowUpDown: () => ArrowUpDown,
  ArrowUpRight: () => ArrowUpRight,
  AtSign: () => AtSign,
  Avatar: () => Avatar,
  AvatarBadge: () => AvatarBadge,
  AvatarFallback: () => AvatarFallback,
  AvatarGroup: () => AvatarGroup,
  AvatarGroupCount: () => AvatarGroupCount,
  AvatarImage: () => AvatarImage,
  Award: () => Award,
  BackButton: () => BackButton,
  Badge: () => Badge,
  BarChart2: () => BarChart2,
  Bell: () => Bell,
  Bold: () => Bold,
  BookOpen: () => BookOpen,
  Bookmark: () => Bookmark,
  BookmarkPlus: () => BookmarkPlus,
  Bot: () => Bot,
  BottomNav: () => BottomNav,
  Brain: () => Brain,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbEllipsis: () => BreadcrumbEllipsis,
  BreadcrumbItem: () => BreadcrumbItem,
  BreadcrumbLink: () => BreadcrumbLink,
  BreadcrumbList: () => BreadcrumbList,
  BreadcrumbPage: () => BreadcrumbPage,
  BreadcrumbSeparator: () => BreadcrumbSeparator,
  Briefcase: () => Briefcase,
  Building: () => Building,
  Building2: () => Building2,
  Button: () => Button,
  ButtonGroup: () => ButtonGroup,
  ButtonGroupSeparator: () => ButtonGroupSeparator,
  ButtonGroupText: () => ButtonGroupText,
  Calendar: () => Calendar,
  CalendarCheck: () => CalendarCheck,
  CalendarClock: () => CalendarClock,
  CalendarDays: () => CalendarDays,
  Check: () => Check,
  CheckCircle2: () => CheckCircle2,
  CheckIcon: () => CheckIcon,
  CheckSquare: () => CheckSquare,
  Checkbox: () => Checkbox,
  ChevronDown: () => ChevronDown,
  ChevronDownIcon: () => ChevronDownIcon,
  ChevronLeft: () => ChevronLeft,
  ChevronRight: () => ChevronRight,
  ChevronRightIcon: () => ChevronRightIcon,
  ChevronUp: () => ChevronUp,
  ChevronUpIcon: () => ChevronUpIcon,
  ChevronsUpDown: () => ChevronsUpDown,
  ChipTabs: () => ChipTabs,
  CircleCheck: () => CircleCheck,
  CircleCheckIcon: () => CircleCheckIcon,
  Clock: () => Clock,
  Code: () => Code,
  Compass: () => Compass,
  Copy: () => Copy,
  Cpu: () => Cpu,
  CreditCard: () => CreditCard,
  Database: () => Database,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogFooter: () => DialogFooter,
  DialogHeader: () => DialogHeader,
  DialogOverlay: () => DialogOverlay,
  DialogPortal: () => DialogPortal,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  DollarSign: () => DollarSign,
  Download: () => Download,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuShortcut: () => DropdownMenuShortcut,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  Edit: () => Edit,
  Edit3: () => Edit3,
  Empty: () => Empty,
  EmptyContent: () => EmptyContent,
  EmptyDescription: () => EmptyDescription,
  EmptyHeader: () => EmptyHeader,
  EmptyMedia: () => EmptyMedia,
  EmptyTitle: () => EmptyTitle,
  ExternalLink: () => ExternalLink,
  Eye: () => Eye,
  EyeOff: () => EyeOff,
  Field: () => Field,
  FieldContent: () => FieldContent,
  FieldDescription: () => FieldDescription,
  FieldError: () => FieldError,
  FieldGroup: () => FieldGroup,
  FieldLabel: () => FieldLabel,
  FieldLegend: () => FieldLegend,
  FieldSeparator: () => FieldSeparator,
  FieldSet: () => FieldSet,
  FieldTitle: () => FieldTitle,
  File: () => File,
  FileCode: () => FileCode,
  FilePlus: () => FilePlus,
  FileSpreadsheet: () => FileSpreadsheet,
  FileText: () => FileText,
  Filter: () => Filter,
  Flag: () => Flag,
  Flame: () => Flame,
  FlaskConical: () => FlaskConical,
  Folder: () => Folder,
  FolderPlus: () => FolderPlus,
  Footprints: () => Footprints,
  Globe: () => Globe,
  GraduationCap: () => GraduationCap,
  Grid: () => Grid,
  Hash: () => Hash,
  Heading: () => Heading,
  Headphones: () => Headphones,
  Heart: () => Heart,
  HelpCircle: () => HelpCircle,
  History: () => History,
  Home: () => Home,
  ImageIcon: () => ImageIcon,
  ImagePlus: () => ImagePlus,
  IndianRupee: () => IndianRupee,
  InfinityIcon: () => InfinityIcon,
  Info: () => Info,
  InfoIcon: () => InfoIcon,
  Input: () => Input,
  Italic: () => Italic,
  JobCard: () => JobCard,
  Label: () => Label,
  Languages: () => Languages,
  Laptop: () => Laptop,
  Layers: () => Layers,
  Layout: () => Layout,
  LayoutGrid: () => LayoutGrid,
  LayoutList: () => LayoutList,
  Lightbulb: () => Lightbulb,
  LinkIcon: () => LinkIcon,
  ListChecks: () => ListChecks,
  ListTodo: () => ListTodo,
  Loader2: () => Loader2,
  Loader2Icon: () => Loader2Icon,
  Lock: () => Lock,
  LogoApnaUnlimited: () => LogoApnaUnlimited,
  Mail: () => Mail,
  MapPin: () => MapPin,
  Mars: () => Mars,
  Maximize2: () => Maximize2,
  Menu: () => Menu,
  MessageCircle: () => MessageCircle,
  MessageCircleQuestion: () => MessageCircleQuestion,
  MessageSquare: () => MessageSquare,
  MessagesSquare: () => MessagesSquare,
  MetricCard: () => MetricCard,
  Mic: () => Mic,
  Minus: () => Minus,
  Monitor: () => Monitor,
  Moon: () => Moon,
  MoreHorizontal: () => MoreHorizontal,
  MoreHorizontalIcon: () => MoreHorizontalIcon,
  MoreVertical: () => MoreVertical,
  Navigation: () => Navigation,
  OctagonXIcon: () => OctagonXIcon,
  OnlyRoundsLogo: () => OnlyRoundsLogo,
  OnlyRoundsLogoMark: () => OnlyRoundsLogoMark,
  Palette: () => Palette,
  PanelLeft: () => PanelLeft,
  PanelLeftIcon: () => PanelLeftIcon,
  Paperclip: () => Paperclip,
  Pause: () => Pause,
  Pencil: () => Pencil,
  Phone: () => Phone,
  PhoneCall: () => PhoneCall,
  PhoneIncoming: () => PhoneIncoming,
  PhoneOff: () => PhoneOff,
  PhoneOutgoing: () => PhoneOutgoing,
  Play: () => Play,
  Plus: () => Plus,
  Popover: () => Popover,
  PopoverContent: () => PopoverContent,
  PopoverDescription: () => PopoverDescription,
  PopoverHeader: () => PopoverHeader,
  PopoverTitle: () => PopoverTitle,
  PopoverTrigger: () => PopoverTrigger,
  PowerOff: () => PowerOff,
  PricingCard: () => PricingCard,
  Puzzle: () => Puzzle,
  QrCode: () => QrCode,
  RadioGroup: () => RadioGroup,
  RadioGroupItem: () => RadioGroupItem,
  RefreshCw: () => RefreshCw,
  ReusableSidebar: () => ReusableSidebar,
  RotateCcw: () => RotateCcw,
  Save: () => Save,
  Search: () => Search,
  SearchFilterBar: () => SearchFilterBar,
  SegmentedTabSwitcher: () => SegmentedTabSwitcher,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectLabel: () => SelectLabel,
  SelectScrollDownButton: () => SelectScrollDownButton,
  SelectScrollUpButton: () => SelectScrollUpButton,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  SelectValue: () => SelectValue,
  Sell: () => Sell,
  Send: () => Send,
  Separator: () => Separator,
  Settings: () => Settings,
  Shapes: () => Shapes,
  Share2: () => Share2,
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetDescription: () => SheetDescription,
  SheetFooter: () => SheetFooter,
  SheetHeader: () => SheetHeader,
  SheetTitle: () => SheetTitle,
  SheetTrigger: () => SheetTrigger,
  ShieldAlert: () => ShieldAlert,
  ShieldCheck: () => ShieldCheck,
  Sidebar: () => Sidebar,
  SidebarContent: () => SidebarContent,
  SidebarFooter: () => SidebarFooter,
  SidebarGroup: () => SidebarGroup,
  SidebarGroupAction: () => SidebarGroupAction,
  SidebarGroupContent: () => SidebarGroupContent,
  SidebarGroupLabel: () => SidebarGroupLabel,
  SidebarHeader: () => SidebarHeader,
  SidebarInput: () => SidebarInput,
  SidebarInset: () => SidebarInset,
  SidebarMenu: () => SidebarMenu,
  SidebarMenuAction: () => SidebarMenuAction,
  SidebarMenuBadge: () => SidebarMenuBadge,
  SidebarMenuButton: () => SidebarMenuButton,
  SidebarMenuItem: () => SidebarMenuItem,
  SidebarMenuSkeleton: () => SidebarMenuSkeleton,
  SidebarMenuSub: () => SidebarMenuSub,
  SidebarMenuSubButton: () => SidebarMenuSubButton,
  SidebarMenuSubItem: () => SidebarMenuSubItem,
  SidebarProvider: () => SidebarProvider,
  SidebarRail: () => SidebarRail,
  SidebarSeparator: () => SidebarSeparator,
  SidebarTrigger: () => SidebarTrigger,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Sliders: () => Sliders,
  SlidersHorizontal: () => SlidersHorizontal,
  Smartphone: () => Smartphone,
  SortableTableHead: () => SortableTableHead,
  Sparkles: () => Sparkles,
  Spinner: () => Spinner,
  Star: () => Star,
  StickyNote: () => StickyNote,
  Sun: () => Sun,
  Switch: () => Switch,
  Table: () => Table,
  Table2: () => Table2,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader,
  TableIcon: () => TableIcon,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Tag: () => Tag,
  Target: () => Target,
  Textarea: () => Textarea,
  Toaster: () => Toaster,
  Toggle: () => Toggle,
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  Tooltip: () => Tooltip,
  TooltipContent: () => TooltipContent,
  TooltipProvider: () => TooltipProvider,
  TooltipTrigger: () => TooltipTrigger,
  Trash: () => Trash,
  Trash2: () => Trash2,
  TrendingUp: () => TrendingUp,
  TriangleAlertIcon: () => TriangleAlertIcon,
  Trophy: () => Trophy,
  Type: () => Type,
  Underline: () => Underline,
  Unlock: () => Unlock,
  Upload: () => Upload,
  User: () => User,
  User2: () => User2,
  UserCheck: () => UserCheck,
  UserPlus: () => UserPlus,
  UserRound: () => UserRound,
  UserSearch: () => UserSearch,
  Users: () => Users,
  Venus: () => Venus,
  Video: () => Video,
  VideoOff: () => VideoOff,
  Voicemail: () => Voicemail,
  Wallet: () => Wallet,
  Wand2: () => Wand2,
  Wrench: () => Wrench,
  X: () => X,
  XCircle: () => XCircle,
  XIcon: () => XIcon,
  Zap: () => Zap,
  badgeVariants: () => badgeVariants,
  buttonGroupVariants: () => buttonGroupVariants,
  buttonVariants: () => buttonVariants,
  capitalize: () => capitalize,
  cn: () => cn,
  inputVariants: () => inputVariants,
  tabsListVariants: () => tabsListVariants,
  textareaVariants: () => textareaVariants,
  toggleVariants: () => toggleVariants,
  useSidebar: () => useSidebar
});
module.exports = __toCommonJS(index_exports);

// src/components/ui/button.tsx
var React2 = __toESM(require("react"));
var import_button = require("@base-ui/react/button");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// src/icons/icons.tsx
var React = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var Activity = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M80-720q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v80q0 17-11.5 28.5T840-600q-17 0-28.5-11.5T800-640v-80H160v80q0 17-11.5 28.5T120-600q-17 0-28.5-11.5T80-640v-80Zm80 560q-33 0-56.5-23.5T80-240v-80q0-17 11.5-28.5T120-360q17 0 28.5 11.5T160-320v80h640v-80q0-17 11.5-28.5T840-360q17 0 28.5 11.5T880-320v80q0 33-23.5 56.5T800-160H160Zm240-120q11 0 21-5.5t15-16.5l124-248 44 88q5 11 15 16.5t21 5.5h200q17 0 28.5-11.5T880-480q0-17-11.5-28.5T840-520H665l-69-138q-5-11-15-15.5t-21-4.5q-11 0-21 4.5T524-658L400-410l-44-88q-5-11-15-16.5t-21-5.5H120q-17 0-28.5 11.5T80-480q0 17 11.5 28.5T120-440h175l69 138q5 11 15 16.5t21 5.5Zm80-200Z" })
    }
  )
);
Activity.displayName = "Activity";
var AlertCircle = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
AlertCircle.displayName = "AlertCircle";
var AlertTriangle = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q10 0 19.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14 14.5t-20 5.5H109Zm69-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Zm0-100Z" })
    }
  )
);
AlertTriangle.displayName = "AlertTriangle";
var ArrowDown = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-313v-447q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v447l196-196q12-12 28-11.5t28 12.5q11 12 11.5 28T772-452L508-188q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L188-452q-11-11-11-27.5t11-28.5q12-12 28.5-12t28.5 12l195 195Z" })
    }
  )
);
ArrowDown.displayName = "ArrowDown";
var ArrowLeft = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z" })
    }
  )
);
ArrowLeft.displayName = "ArrowLeft";
var ArrowRight = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M647-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h447L451-716q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l264 264q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L508-188q-11 11-27.5 11T452-188q-12-12-12-28.5t12-28.5l195-195Z" })
    }
  )
);
ArrowRight.displayName = "ArrowRight";
var ArrowUp = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-647 244-451q-12 12-28 11.5T188-452q-11-12-11.5-28t11.5-28l264-264q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l264 264q11 11 11 27.5T772-452q-12 12-28.5 12T715-452L520-647v447q0 17-11.5 28.5T480-160q-17 0-28.5-11.5T440-200v-447Z" })
    }
  )
);
ArrowUp.displayName = "ArrowUp";
var ArrowUpDown = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-440q-17 0-28.5-11.5T320-480v-247l-75 75q-11 11-27.5 11T189-652q-12-12-12-28.5t12-28.5l143-143q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l144 144q12 12 11.5 28T531-652q-12 11-28 11.5T475-652l-75-75v247q0 17-11.5 28.5T360-440ZM600-97q-8 0-15-2.5t-13-8.5L428-252q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l75 75v-247q0-17 11.5-28.5T600-520q17 0 28.5 11.5T640-480v247l75-75q11-11 27.5-11t28.5 11q12 12 12 28.5T771-251L628-108q-6 6-13 8.5T600-97Z" })
    }
  )
);
ArrowUpDown.displayName = "ArrowUpDown";
var ArrowUpRight = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M680-624 244-188q-11 11-28 11t-28-11q-11-11-11-28t11-28l436-436H400q-17 0-28.5-11.5T360-720q0-17 11.5-28.5T400-760h320q17 0 28.5 11.5T760-720v320q0 17-11.5 28.5T720-360q-17 0-28.5-11.5T680-400v-224Z" })
    }
  )
);
ArrowUpRight.displayName = "ArrowUpRight";
var AtSign = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h160q17 0 28.5 11.5T680-120q0 17-11.5 28.5T640-80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" })
    }
  )
);
AtSign.displayName = "AtSign";
var Award = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m480-483-68 52q-6 5-12 .5t-4-11.5l26-84-70-56q-5-5-3-11.5t9-6.5h86l26-82q2-7 10-7t10 7l26 82h85q7 0 9.5 6.5T608-582l-71 56 26 84q2 7-4 11.5t-12-.5l-67-52Zm0 363L293-58q-20 7-36.5-5T240-95v-254q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v254q0 20-16.5 32T667-58l-187-62Zm0-200q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" })
    }
  )
);
Award.displayName = "Award";
var BarChart2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M680-160q-17 0-28.5-11.5T640-200v-200q0-17 11.5-28.5T680-440h80q17 0 28.5 11.5T800-400v200q0 17-11.5 28.5T760-160h-80Zm-240 0q-17 0-28.5-11.5T400-200v-560q0-17 11.5-28.5T440-800h80q17 0 28.5 11.5T560-760v560q0 17-11.5 28.5T520-160h-80Zm-240 0q-17 0-28.5-11.5T160-200v-360q0-17 11.5-28.5T200-600h80q17 0 28.5 11.5T320-560v360q0 17-11.5 28.5T280-160h-80Z" })
    }
  )
);
BarChart2.displayName = "BarChart2";
var Bell = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" })
    }
  )
);
Bell.displayName = "Bell";
var Bold = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M352-200q-33 0-56.5-23.5T272-280v-400q0-33 23.5-56.5T352-760h141q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H352Zm41-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" })
    }
  )
);
Bold.displayName = "Bold";
var BookOpen = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 97q-14 0-26.5-3.5T430-194q-39-23-82-34.5T260-240q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-45 0-88 11.5T530-194q-11 6-23.5 9.5T480-181ZM280-494Zm280-115q0-9 6.5-18.5T581-640q29-10 58-15t61-5q20 0 39.5 2.5T778-651q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-600q-26 0-51 5t-48 13q-18 7-29.5-1T560-609Zm0 220q0-9 6.5-18.5T581-420q29-10 58-15t61-5q20 0 39.5 2.5T778-431q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-380q-26 0-51 4.5T601-363q-18 7-29.5-.5T560-389Zm0-110q0-9 6.5-18.5T581-530q29-10 58-15t61-5q20 0 39.5 2.5T778-541q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-490q-26 0-51 5t-48 13q-18 7-29.5-1T560-499Z" })
    }
  )
);
BookOpen.displayName = "BookOpen";
var Bookmark = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m480-240-168 72q-40 17-76-6.5T200-241v-519q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v519q0 43-36 66.5t-76 6.5l-168-72Zm0-88 200 86v-518H280v518l200-86Zm0-432H280h400-200Z" })
    }
  )
);
Bookmark.displayName = "Bookmark";
var BookmarkPlus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m480-240-168 72q-40 17-76-6.5T200-241v-519q0-33 23.5-56.5T280-840h200q17 0 28.5 11.5T520-800q0 17-11.5 28.5T480-760H280v518l200-86 200 86v-238q0-17 11.5-28.5T720-520q17 0 28.5 11.5T760-480v239q0 43-36 66.5t-76 6.5l-168-72Zm0-520H280h240-40Zm200 80h-40q-17 0-28.5-11.5T600-720q0-17 11.5-28.5T640-760h40v-40q0-17 11.5-28.5T720-840q17 0 28.5 11.5T760-800v40h40q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680h-40v40q0 17-11.5 28.5T720-600q-17 0-28.5-11.5T680-640v-40Z" })
    }
  )
);
BookmarkPlus.displayName = "BookmarkPlus";
var Bot = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM360-280h240q17 0 28.5-11.5T640-320q0-17-11.5-28.5T600-360H360q-17 0-28.5 11.5T320-320q0 17 11.5 28.5T360-280Zm-120 80h480v-480H240v480Zm240-240Z" })
    }
  )
);
Bot.displayName = "Bot";
var Brain = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m434-410 4 32q1 8 6.5 13t13.5 5h44q8 0 13.5-5t6.5-13l4-32q8-3 14.5-7t11.5-9l30 13q7 3 14 1t11-9l22-38q4-7 2.5-14t-7.5-12l-26-19q2-8 2-16t-2-16l26-19q6-5 7.5-12t-2.5-14l-22-38q-4-7-11-9t-14 1l-30 13q-5-5-11.5-9t-14.5-7l-4-32q-1-8-6.5-13t-13.5-5h-44q-8 0-13.5 5t-6.5 13l-4 32q-8 3-14.5 7t-11.5 9l-30-13q-7-3-14-1t-11 9l-22 38q-4 7-2.5 14t7.5 12l26 19q-2 8-2 16t2 16l-26 19q-6 5-7.5 12t2.5 14l22 38q4 7 11 9t14-1l30-13q5 5 11.5 9t14.5 7Zm46-50q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460ZM240-252q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v40q0 17-11.5 28.5T560-80q-17 0-28.5-11.5T520-120v-80q0-17 11.5-28.5T560-240h120v-160q0-17 11.5-28.5T720-440h68l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v168q0 17-11.5 28.5T280-80q-17 0-28.5-11.5T240-120v-132Zm254-188Z" })
    }
  )
);
Brain.displayName = "Brain";
var Briefcase = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" })
    }
  )
);
Briefcase.displayName = "Briefcase";
var Building = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-33 0-56.5-23.5T120-200v-400q0-33 23.5-56.5T200-680h80v-80q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760v240h80q33 0 56.5 23.5T840-440v240q0 33-23.5 56.5T760-120H520v-160h-80v160H200Zm0-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" })
    }
  )
);
Building.displayName = "Building";
var Building2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M80-200v-560q0-33 23.5-56.5T160-840h240q33 0 56.5 23.5T480-760v80h320q33 0 56.5 23.5T880-600v400q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200Zm80 0h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z" })
    }
  )
);
Building2.displayName = "Building2";
var Calendar = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" })
    }
  )
);
Calendar.displayName = "Calendar";
var CalendarCheck = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m438-342 139-139q12-12 29-12t29 12q12 12 12 29t-12 29L466-254q-12 12-28 12t-28-12l-85-85q-12-12-12-29t12-29q12-12 29-12t29 12l55 55ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" })
    }
  )
);
CalendarCheck.displayName = "CalendarCheck";
var CalendarClock = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v187q0 17-11.5 28.5T800-493q-17 0-28.5-11.5T760-533v-27H200v400h232q17 0 28.5 11.5T472-120q0 17-11.5 28.5T432-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-92q0-8-6-14t-14-6q-8 0-14 6t-6 14v91q0 8 3 15.5t9 13.5l61 61q6 6 14 6t14-6q6-6 6-14t-6-14l-61-61Z" })
    }
  )
);
CalendarClock.displayName = "CalendarClock";
var CalendarDays = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" })
    }
  )
);
CalendarDays.displayName = "CalendarDays";
var Check = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" })
    }
  )
);
Check.displayName = "Check";
var CheckCircle2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
CheckCircle2.displayName = "CheckCircle2";
var CheckIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" })
    }
  )
);
CheckIcon.displayName = "CheckIcon";
var CheckSquare = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m424-424-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-424ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" })
    }
  )
);
CheckSquare.displayName = "CheckSquare";
var ChevronDown = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" })
    }
  )
);
ChevronDown.displayName = "ChevronDown";
var ChevronDownIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" })
    }
  )
);
ChevronDownIcon.displayName = "ChevronDownIcon";
var ChevronLeft = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z" })
    }
  )
);
ChevronLeft.displayName = "ChevronLeft";
var ChevronRight = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" })
    }
  )
);
ChevronRight.displayName = "ChevronRight";
var ChevronRightIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" })
    }
  )
);
ChevronRightIcon.displayName = "ChevronRightIcon";
var ChevronUp = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-528 324-372q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q12-12 28-12t28 12l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-528Z" })
    }
  )
);
ChevronUp.displayName = "ChevronUp";
var ChevronUpIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-528 324-372q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q12-12 28-12t28 12l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-528Z" })
    }
  )
);
ChevronUpIcon.displayName = "ChevronUpIcon";
var ChevronsUpDown = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z" })
    }
  )
);
ChevronsUpDown.displayName = "ChevronsUpDown";
var CircleCheck = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
CircleCheck.displayName = "CircleCheck";
var CircleCheckIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
CircleCheckIcon.displayName = "CircleCheckIcon";
var Clock = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" })
    }
  )
);
Clock.displayName = "Clock";
var Code = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m193-479 155 155q11 11 11 28t-11 28q-11 11-28 11t-28-11L108-452q-6-6-8.5-13T97-480q0-8 2.5-15t8.5-13l184-184q12-12 28.5-12t28.5 12q12 12 12 28.5T349-635L193-479Zm574-2L612-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L668-268q-12 12-28 11.5T612-269q-12-12-12-28.5t12-28.5l155-155Z" })
    }
  )
);
Code.displayName = "Code";
var Compass = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-440q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320ZM297-277l250-117q6-3 11-8t8-11l117-250q5-10-2.5-17.5T663-683L413-566q-6 3-11 8t-8 11L277-297q-5 10 2.5 17.5T297-277Z" })
    }
  )
);
Compass.displayName = "Compass";
var Copy = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z" })
    }
  )
);
Copy.displayName = "Copy";
var Cpu = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-400v-160q0-17 11.5-28.5T400-600h160q17 0 28.5 11.5T600-560v160q0 17-11.5 28.5T560-360H400q-17 0-28.5-11.5T360-400Zm80-40h80v-80h-80v80Zm-80 280v-40h-80q-33 0-56.5-23.5T200-280v-80h-40q-17 0-28.5-11.5T120-400q0-17 11.5-28.5T160-440h40v-80h-40q-17 0-28.5-11.5T120-560q0-17 11.5-28.5T160-600h40v-80q0-33 23.5-56.5T280-760h80v-40q0-17 11.5-28.5T400-840q17 0 28.5 11.5T440-800v40h80v-40q0-17 11.5-28.5T560-840q17 0 28.5 11.5T600-800v40h80q33 0 56.5 23.5T760-680v80h40q17 0 28.5 11.5T840-560q0 17-11.5 28.5T800-520h-40v80h40q17 0 28.5 11.5T840-400q0 17-11.5 28.5T800-360h-40v80q0 33-23.5 56.5T680-200h-80v40q0 17-11.5 28.5T560-120q-17 0-28.5-11.5T520-160v-40h-80v40q0 17-11.5 28.5T400-120q-17 0-28.5-11.5T360-160Zm320-120v-400H280v400h400ZM480-480Z" })
    }
  )
);
Cpu.displayName = "Cpu";
var CreditCard = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" })
    }
  )
);
CreditCard.displayName = "CreditCard";
var Database = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z" })
    }
  )
);
Database.displayName = "Database";
var DollarSign = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M481-120q-17 0-28.5-11.5T441-160v-46q-45-10-79-35t-55-70q-7-14-.5-29.5T330-363q14-6 29 .5t23 21.5q17 30 43 45.5t64 15.5q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-44q0-17 11.5-28.5T481-840q17 0 28.5 11.5T521-800v44q38 6 66 24.5t46 45.5q9 13 3.5 29T614-634q-14 6-29 .5T557-653q-13-14-30.5-21.5T483-682q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v44q0 17-11.5 28.5T481-120Z" })
    }
  )
);
DollarSign.displayName = "DollarSign";
var Download = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z" })
    }
  )
);
Download.displayName = "Download";
var Edit = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" })
    }
  )
);
Edit.displayName = "Edit";
var Edit3 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" })
    }
  )
);
Edit3.displayName = "Edit3";
var ExternalLink = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h560v-240q0-17 11.5-28.5T800-480q17 0 28.5 11.5T840-440v240q0 33-23.5 56.5T760-120H200Zm560-584L416-360q-11 11-28 11t-28-11q-11-11-11-28t11-28l344-344H600q-17 0-28.5-11.5T560-800q0-17 11.5-28.5T600-840h200q17 0 28.5 11.5T840-800v200q0 17-11.5 28.5T800-560q-17 0-28.5-11.5T760-600v-104Z" })
    }
  )
);
ExternalLink.displayName = "ExternalLink";
var Eye = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" })
    }
  )
);
Eye.displayName = "Eye";
var EyeOff = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" })
    }
  )
);
EyeOff.displayName = "EyeOff";
var File = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" })
    }
  )
);
File.displayName = "File";
var FileCode = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m353-480 59-59q12-12 12-28t-12-28q-12-12-28.5-12T355-595l-87 87q-6 6-8.5 13t-2.5 15q0 8 2.5 15t8.5 13l87 87q12 12 28.5 12t28.5-12q12-12 12-28t-12-28l-59-59Zm254 0-59 59q-12 12-12 28t12 28q12 12 28.5 12t28.5-12l87-87q6-6 8.5-13t2.5-15q0-8-2.5-15t-8.5-13l-87-87q-6-6-13.5-9t-15-3q-7.5 0-15 3t-13.5 9q-12 12-12 28t12 28l59 59ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" })
    }
  )
);
FileCode.displayName = "FileCode";
var FilePlus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-360v80q0 17 11.5 28.5T480-240q17 0 28.5-11.5T520-280v-80h80q17 0 28.5-11.5T640-400q0-17-11.5-28.5T600-440h-80v-80q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v80h-80q-17 0-28.5 11.5T320-400q0 17 11.5 28.5T360-360h80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" })
    }
  )
);
FilePlus.displayName = "FilePlus";
var FileSpreadsheet = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-120q-33 0-56.5-23.5T280-200v-400q0-33 23.5-56.5T360-680h400q33 0 56.5 23.5T840-600v400q0 33-23.5 56.5T760-120H360Zm40-400h320q17 0 28.5-11.5T760-560q0-17-11.5-28.5T720-600H400q-17 0-28.5 11.5T360-560q0 17 11.5 28.5T400-520Zm120 160h80v-80h-80v80Zm0 160h80v-80h-80v80ZM360-360h80v-80h-40q-17 0-28.5 11.5T360-400v40Zm320 0h80v-40q0-17-11.5-28.5T720-440h-40v80Zm-240 80h-80v40q0 17 11.5 28.5T400-200h40v-80Zm240 0v80h40q17 0 28.5-11.5T760-240v-40h-80ZM120-760q0-33 23.5-56.5T200-840h440q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760H200v440q0 17-11.5 28.5T160-280q-17 0-28.5-11.5T120-320v-440Z" })
    }
  )
);
FileSpreadsheet.displayName = "FileSpreadsheet";
var FileText = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" })
    }
  )
);
FileText.displayName = "FileText";
var Filter = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" })
    }
  )
);
Filter.displayName = "Filter";
var Flag = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-400v240q0 17-11.5 28.5T240-120q-17 0-28.5-11.5T200-160v-600q0-17 11.5-28.5T240-800h287q14 0 25 9t14 23l10 48h184q17 0 28.5 11.5T800-680v320q0 17-11.5 28.5T760-320H553q-14 0-25-9t-14-23l-10-48H280Zm306 0h134v-240H543q-14 0-25-9t-14-23l-10-48H280v240h257q14 0 25 9t14 23l10 48Zm-86-160Z" })
    }
  )
);
Flag.displayName = "Flag";
var Flame = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-134 0-227-93t-93-227q0-113 67-217t184-182q22-15 45.5-1.5T480-760v52q0 34 23.5 57t57.5 23q17 0 32.5-7.5T621-657q8-10 20.5-12.5T665-664q63 45 99 115t36 149q0 134-93 227T480-80ZM240-400q0 52 21 98.5t60 81.5q-1-5-1-9v-9q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60v9q0 4-1 9 39-35 60-81.5t21-98.5q0-50-18.5-94.5T648-574q-20 13-42 19.5t-45 6.5q-62 0-107.5-41T401-690q-78 66-119.5 140.5T240-400Zm240 52-57 56q-11 11-17 25t-6 29q0 32 23.5 55t56.5 23q33 0 56.5-23t23.5-55q0-16-6-29.5T537-292l-57-56Z" })
    }
  )
);
Flame.displayName = "Flame";
var FlaskConical = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm0-80h560L520-492v-268h-80v268L200-200Zm280-280Z" })
    }
  )
);
FlaskConical.displayName = "FlaskConical";
var Folder = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" })
    }
  )
);
Folder.displayName = "Folder";
var FolderPlus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-160v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5T640-360v-40h40q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480h-40v-40q0-17-11.5-28.5T600-560q-17 0-28.5 11.5T560-520v40h-40q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400h40Z" })
    }
  )
);
FolderPlus.displayName = "FolderPlus";
var Footprints = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M315-240q-77 0-117-57t-38-128l-18-27q-11-17-36.5-77T80-680q0-103 51-171.5T260-920q85 0 132.5 75.5T440-680q0 58-16 107t-28 79l8 13q8 14 22 44.5t14 63.5q0 57-35.5 95T315-240ZM210-496l110-22q13-32 26.5-73t13.5-89q0-60-27.5-110T260-840q-45 0-72.5 50T160-680q0 63 17.5 111.5T210-496Zm105 176q19 0 32-14t13-39q0-17-8-35t-16-32l-96 20q0 40 17.5 70t57.5 30ZM645-40q-54 0-89.5-38T520-173q0-33 14-63.5t22-44.5l8-13q-12-30-28-79t-16-107q0-89 47.5-164.5T700-720q78 0 129 68.5T880-480q0 91-25.5 150.5T818-253l-18 28q1 71-38.5 128T645-40Zm105-256q15-24 32.5-72T800-480q0-60-27.5-110T700-640q-45 0-72.5 50T600-480q0 48 13.5 88.5T640-318l110 22ZM645-120q40 0 57.5-30t17.5-70l-96-20q-8 14-16 32t-8 35q0 20 12.5 36.5T645-120Z" })
    }
  )
);
Footprints.displayName = "Footprints";
var Globe = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" })
    }
  )
);
Globe.displayName = "Globe";
var GraduationCap = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" })
    }
  )
);
GraduationCap.displayName = "GraduationCap";
var Grid = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v160q0 33-23.5 56.5T360-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h160q33 0 56.5 23.5T440-360v160q0 33-23.5 56.5T360-120H200Zm400-400q-33 0-56.5-23.5T520-600v-160q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H600Zm0 400q-33 0-56.5-23.5T520-200v-160q0-33 23.5-56.5T600-440h160q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H600ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" })
    }
  )
);
Grid.displayName = "Grid";
var Hash = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M807-434 666-234q-11 16-28.5 25t-37.5 9H200q-33 0-56.5-23.5T120-280v-400q0-33 23.5-56.5T200-760h400q20 0 37.5 9t28.5 25l141 200q15 21 15 46t-15 46ZM600-280l142-200-142-200H200v400h400ZM200-680v400-400Z" })
    }
  )
);
Hash.displayName = "Hash";
var Heading = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M420-680H260q-25 0-42.5-17.5T200-740q0-25 17.5-42.5T260-800h440q25 0 42.5 17.5T760-740q0 25-17.5 42.5T700-680H540v460q0 25-17.5 42.5T480-160q-25 0-42.5-17.5T420-220v-460Z" })
    }
  )
);
Heading.displayName = "Heading";
var Headphones = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-120h-80q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120h-80q-33 0-56.5-23.5T600-200v-160q0-33 23.5-56.5T680-440h80v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h80q33 0 56.5 23.5T360-360v160q0 33-23.5 56.5T280-120Zm0-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" })
    }
  )
);
Headphones.displayName = "Headphones";
var Heart = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z" })
    }
  )
);
Heart.displayName = "Heart";
var HelpCircle = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm2 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm4-172q25 0 43.5 16t18.5 40q0 22-13.5 39T502-525q-23 20-40.5 44T444-427q0 14 10.5 23.5T479-394q15 0 25.5-10t13.5-25q4-21 18-37.5t30-31.5q23-22 39.5-48t16.5-58q0-51-41.5-83.5T484-720q-38 0-72.5 16T359-655q-7 12-4.5 25.5T368-609q14 8 29 5t25-17q11-15 27.5-23t34.5-8Z" })
    }
  )
);
HelpCircle.displayName = "HelpCircle";
var History = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-120q-126 0-223-76.5T131-392q-4-15 6-27.5t27-14.5q16-2 29 6t18 24q24 90 99 147t170 57q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h70q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560H160q-17 0-28.5-11.5T120-600v-160q0-17 11.5-28.5T160-800q17 0 28.5 11.5T200-760v54q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm40-376 100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11L452-452q-6-6-9-13.5t-3-15.5v-159q0-17 11.5-28.5T480-680q17 0 28.5 11.5T520-640v144Z" })
    }
  )
);
History.displayName = "History";
var Home = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" })
    }
  )
);
Home.displayName = "Home";
var ImageIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm80-80h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11Z" })
    }
  )
);
ImageIcon.displayName = "ImageIcon";
var ImagePlus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320q17 0 28.5 11.5T560-800q0 17-11.5 28.5T520-760H200v560h560v-320q0-17 11.5-28.5T800-560q17 0 28.5 11.5T840-520v320q0 33-23.5 56.5T760-120H200Zm480-560h-40q-17 0-28.5-11.5T600-720q0-17 11.5-28.5T640-760h40v-40q0-17 11.5-28.5T720-840q17 0 28.5 11.5T760-800v40h40q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680h-40v40q0 17-11.5 28.5T720-600q-17 0-28.5-11.5T680-640v-40ZM450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320Zm30-160Z" })
    }
  )
);
ImagePlus.displayName = "ImagePlus";
var IndianRupee = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M537-132 291-388q-5-5-8-12.5t-3-15.5v-24q0-17 11.5-28.5T320-480h100q53 0 91.5-34.5T558-600H280q-17 0-28.5-11.5T240-640q0-17 11.5-28.5T280-680h266q-17-35-50.5-57.5T420-760H280q-17 0-28.5-11.5T240-800q0-17 11.5-28.5T280-840h400q17 0 28.5 11.5T720-800q0 17-11.5 28.5T680-760h-90q14 17 25 37t17 43h48q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600h-41q-8 85-70 142.5T420-400h-29l204 212q18 19 7.5 43.5T566-120q-8 0-15.5-3t-13.5-9Z" })
    }
  )
);
IndianRupee.displayName = "IndianRupee";
var InfinityIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M220-260q-92 0-156-64T0-480q0-92 64-156t156-64q37 0 71 13t61 37l68 62-60 54-62-56q-16-14-36-22t-42-8q-58 0-99 41t-41 99q0 58 41 99t99 41q22 0 42-8t36-22l310-280q27-24 61-37t71-13q92 0 156 64t64 156q0 92-64 156t-156 64q-37 0-71-13t-61-37l-68-62 60-54 62 56q16 14 36 22t42 8q58 0 99-41t41-99q0-58-41-99t-99-41q-22 0-42 8t-36 22L352-310q-27 24-61 37t-71 13Z" })
    }
  )
);
InfinityIcon.displayName = "InfinityIcon";
var Info = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
Info.displayName = "Info";
var InfoIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
InfoIcon.displayName = "InfoIcon";
var Italic = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M250-200q-21 0-35.5-14.5T200-250q0-21 14.5-35.5T250-300h110l120-360H370q-21 0-35.5-14.5T320-710q0-21 14.5-35.5T370-760h300q21 0 35.5 14.5T720-710q0 21-14.5 35.5T670-660h-90L460-300h90q21 0 35.5 14.5T600-250q0 21-14.5 35.5T550-200H250Z" })
    }
  )
);
Italic.displayName = "Italic";
var Languages = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m603-202-34 97q-4 11-14 18t-22 7q-20 0-32.5-16.5T496-133l152-402q5-11 15-18t22-7h30q12 0 22 7t15 18l152 403q8 19-4 35.5T868-80q-13 0-22.5-7T831-106l-34-96H603ZM362-401 188-228q-11 11-27.5 11.5T132-228q-11-11-11-28t11-28l174-174q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H80q-17 0-28.5-11.5T40-760q0-17 11.5-28.5T80-800h240v-40q0-17 11.5-28.5T360-880q17 0 28.5 11.5T400-840v40h240q17 0 28.5 11.5T680-760q0 17-11.5 28.5T640-720h-76q-21 72-63 148t-83 116l96 98-30 82-122-125Zm266 129h144l-72-204-72 204Z" })
    }
  )
);
Languages.displayName = "Languages";
var Laptop = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M80-160q-33 0-56.5-23.5T0-240h160q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240h160q0 33-23.5 56.5T880-160H80Zm400-40q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200ZM160-320h640v-440H160v440Zm0 0v-440 440Z" })
    }
  )
);
Laptop.displayName = "Laptop";
var Layers = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M161-366q-16-12-15.5-31.5T162-429q11-8 24-8t24 8l270 209 270-209q11-8 24-8t24 8q16 12 16.5 31.5T799-366L529-156q-22 17-49 17t-49-17L161-366Zm270 8L201-537q-31-24-31-63t31-63l230-179q22-17 49-17t49 17l230 179q31 24 31 63t-31 63L529-358q-22 17-49 17t-49-17Zm49-64 230-178-230-178-230 178 230 178Zm0-178Z" })
    }
  )
);
Layers.displayName = "Layers";
var Layout = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z" })
    }
  )
);
Layout.displayName = "Layout";
var LayoutGrid = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v160q0 33-23.5 56.5T360-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h160q33 0 56.5 23.5T440-360v160q0 33-23.5 56.5T360-120H200Zm400-400q-33 0-56.5-23.5T520-600v-160q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H600Zm0 400q-33 0-56.5-23.5T520-200v-160q0-33 23.5-56.5T600-440h160q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H600ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" })
    }
  )
);
LayoutGrid.displayName = "LayoutGrid";
var LayoutList = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M120-280v-400q0-33 23.5-56.5T200-760h560q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H200q-33 0-56.5-23.5T120-280Zm80-320h80v-80h-80v80Zm160 0h400v-80H360v80Zm0 160h400v-80H360v80Zm0 160h400v-80H360v80Zm-160 0h80v-80h-80v80Zm0-160h80v-80h-80v80Z" })
    }
  )
);
LayoutList.displayName = "LayoutList";
var Lightbulb = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM360-200q-17 0-28.5-11.5T320-240q0-17 11.5-28.5T360-280h240q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H360Zm-30-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" })
    }
  )
);
Lightbulb.displayName = "Lightbulb";
var LinkIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h120q17 0 28.5 11.5T440-640q0 17-11.5 28.5T400-600H280q-50 0-85 35t-35 85q0 50 35 85t85 35h120q17 0 28.5 11.5T440-320q0 17-11.5 28.5T400-280H280Zm80-160q-17 0-28.5-11.5T320-480q0-17 11.5-28.5T360-520h240q17 0 28.5 11.5T640-480q0 17-11.5 28.5T600-440H360Zm200 160q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h120q50 0 85-35t35-85q0-50-35-85t-85-35H560q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h120q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H560Z" })
    }
  )
);
LinkIcon.displayName = "LinkIcon";
var ListChecks = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z" })
    }
  )
);
ListChecks.displayName = "ListChecks";
var ListTodo = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z" })
    }
  )
);
ListTodo.displayName = "ListTodo";
var Loader2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" })
    }
  )
);
Loader2.displayName = "Loader2";
var Loader2Icon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" })
    }
  )
);
Loader2Icon.displayName = "Loader2Icon";
var Lock = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" })
    }
  )
);
Lock.displayName = "Lock";
var Mail = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z" })
    }
  )
);
Mail.displayName = "Mail";
var MapPin = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 79q-14 0-28-5t-25-15q-65-60-115-117t-83.5-110.5q-33.5-53.5-51-103T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 45-17.5 94.5t-51 103Q698-301 648-244T533-127q-11 10-25 15t-28 5Zm0-453Zm0 80q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z" })
    }
  )
);
MapPin.displayName = "MapPin";
var Mars = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M800-760v160q0 17-11.5 28.5T760-560q-17 0-28.5-11.5T720-600v-63L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159h-63q-17 0-28.5-11.5T560-760q0-17 11.5-28.5T600-800h160q17 0 28.5 11.5T800-760ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z" })
    }
  )
);
Mars.displayName = "Mars";
var Maximize2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-120q-17 0-28.5-11.5T120-160v-240q0-17 11.5-28.5T160-440q17 0 28.5 11.5T200-400v144l504-504H560q-17 0-28.5-11.5T520-800q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v240q0 17-11.5 28.5T800-520q-17 0-28.5-11.5T760-560v-144L256-200h144q17 0 28.5 11.5T440-160q0 17-11.5 28.5T400-120H160Z" })
    }
  )
);
Maximize2.displayName = "Maximize2";
var Menu = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" })
    }
  )
);
Menu.displayName = "Menu";
var MessageCircle = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Z" })
    }
  )
);
MessageCircle.displayName = "MessageCircle";
var MessageCircleQuestion = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-160H200q-33 0-56.5-23.5T120-240v-560q0-33 23.5-56.5T200-880h560q33 0 56.5 23.5T840-800v560q0 33-23.5 56.5T760-160H600l-92 92q-12 12-28 12t-28-12l-92-92Zm-160-80h192l88 88 88-88h192v-560H200v560Zm280-280Zm-4 240q21 0 35.5-14.5T526-330q0-21-14.5-35.5T476-380q-21 0-35.5 14.5T426-330q0 21 14.5 35.5T476-280Zm70-360q0 17-11 36.5T498-561q-17 15-27.5 28.5T453-505q-4 8-6 16t-4 18q-2 15 8 26t26 11q14 0 25-10t15-27q3-14 11.5-26t27.5-31q35-35 49.5-59t14.5-53q0-54-36.5-87T484-760q-45 0-78 19t-53 53q-7 12-.5 25t20.5 18q13 5 26 0t21-16q11-14 27-22.5t37-8.5q26 0 44 14.5t18 37.5Z" })
    }
  )
);
MessageCircleQuestion.displayName = "MessageCircleQuestion";
var MessageSquare = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Zm120-80h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z" })
    }
  )
);
MessageSquare.displayName = "MessageSquare";
var MessagesSquare = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v503q0 27-24.5 37.5T812-148l-92-92H280Zm-40-200-92 92q-19 19-43.5 8.5T80-377v-463q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240Zm360-80v-280H160v280h440Zm-440 0v-280 280Z" })
    }
  )
);
MessagesSquare.displayName = "MessagesSquare";
var Mic = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 480v-83q-92-13-157.5-78T203-479q-2-17 9-29t28-12q17 0 28.5 11.5T284-480q14 70 69.5 115T480-320q72 0 127-45.5T676-480q4-17 15.5-28.5T720-520q17 0 28 12t9 29q-14 91-79 157t-158 79v83q0 17-11.5 28.5T480-120q-17 0-28.5-11.5T440-160Zm40-320q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" })
    }
  )
);
Mic.displayName = "Mic";
var Minus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z" })
    }
  )
);
Minus.displayName = "Minus";
var Monitor = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M400-200v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h40q17 0 28.5 11.5T640-160q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160q0-17 11.5-28.5T360-200h40ZM160-360h640v-400H160v400Zm0 0v-400 400Z" })
    }
  )
);
Monitor.displayName = "Monitor";
var Moon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-120q-151 0-255.5-104.5T120-480q0-138 90-239.5T440-838q13-2 23 3.5t16 14.5q6 9 6.5 21t-7.5 23q-17 26-25.5 55t-8.5 61q0 90 63 153t153 63q31 0 61.5-9t54.5-25q11-7 22.5-6.5T819-479q10 5 15.5 15t3.5 24q-14 138-117.5 229T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" })
    }
  )
);
Moon.displayName = "Moon";
var MoreHorizontal = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" })
    }
  )
);
MoreHorizontal.displayName = "MoreHorizontal";
var MoreHorizontalIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" })
    }
  )
);
MoreHorizontalIcon.displayName = "MoreHorizontalIcon";
var MoreVertical = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" })
    }
  )
);
MoreVertical.displayName = "MoreVertical";
var Navigation = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-240 222-130q-13 5-24.5 2.5T178-138q-8-8-10.5-20t2.5-25l273-615q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l273 615q5 13 2.5 25T782-138q-8 8-19.5 10.5T738-130L480-240Zm-196-4 196-84 196 84-196-440-196 440Zm196-84Z" })
    }
  )
);
Navigation.displayName = "Navigation";
var OctagonXIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" })
    }
  )
);
OctagonXIcon.displayName = "OctagonXIcon";
var Palette = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" })
    }
  )
);
Palette.displayName = "Palette";
var PanelLeft = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm540-453h100v-107H700v107Zm0 186h100v-106H700v106ZM160-240h460v-480H160v480Zm540 0h100v-107H700v107Z" })
    }
  )
);
PanelLeft.displayName = "PanelLeft";
var PanelLeftIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm540-453h100v-107H700v107Zm0 186h100v-106H700v106ZM160-240h460v-480H160v480Zm540 0h100v-107H700v107Z" })
    }
  )
);
PanelLeftIcon.displayName = "PanelLeftIcon";
var Paperclip = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-330q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v330q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-350q0-17 11.5-28.5T680-720q17 0 28.5 11.5T720-680v350Z" })
    }
  )
);
Paperclip.displayName = "Paperclip";
var Pause = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M600-200q-33 0-56.5-23.5T520-280v-400q0-33 23.5-56.5T600-760h80q33 0 56.5 23.5T760-680v400q0 33-23.5 56.5T680-200h-80Zm-320 0q-33 0-56.5-23.5T200-280v-400q0-33 23.5-56.5T280-760h80q33 0 56.5 23.5T440-680v400q0 33-23.5 56.5T360-200h-80Zm320-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" })
    }
  )
);
Pause.displayName = "Pause";
var Pencil = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" })
    }
  )
);
Pencil.displayName = "Pencil";
var Phone = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" })
    }
  )
);
Phone.displayName = "Phone";
var PhoneCall = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" })
    }
  )
);
PhoneCall.displayName = "PhoneCall";
var PhoneIncoming = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-200q-17 0-28.5-11.5T200-240v-320q0-17 11.5-28.5T240-600q17 0 28.5 11.5T280-560v224l436-436q11-11 28-11t28 11q11 11 11 28t-11 28L336-280h224q17 0 28.5 11.5T600-240q0 17-11.5 28.5T560-200H240Z" })
    }
  )
);
PhoneIncoming.displayName = "PhoneIncoming";
var PhoneOff = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M764-80 570-274q-89 72-193.5 113T162-120q-24 0-33-12t-9-30v-162q0-14 9-24.5t23-13.5l138-28q11-2 27.5 3t24.5 13l94 94q18-11 39-25t37-27L84-760q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11 28t-11 28q-11 11-28 11t-28-11ZM360-244l-66-66-94 20v88q41-3 81-14t79-28Zm322-144-56-56q15-17 30.5-39t24.5-41l-97-98q-8-8-11-22.5t-1-23.5l26-140q3-14 13.5-23t24.5-9h162q18 0 30 12t12 30q0 110-42 214.5T682-388Zm36-212q17-39 26-79t14-81h-88l-18 94 66 66Zm0 0ZM360-244Z" })
    }
  )
);
PhoneOff.displayName = "PhoneOff";
var PhoneOutgoing = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M680-624 244-188q-11 11-28 11t-28-11q-11-11-11-28t11-28l436-436H400q-17 0-28.5-11.5T360-720q0-17 11.5-28.5T400-760h320q17 0 28.5 11.5T760-720v320q0 17-11.5 28.5T720-360q-17 0-28.5-11.5T680-400v-224Z" })
    }
  )
);
PhoneOutgoing.displayName = "PhoneOutgoing";
var Play = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z" })
    }
  )
);
Play.displayName = "Play";
var Plus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" })
    }
  )
);
Plus.displayName = "Plus";
var PowerOff = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M420-120q-17 0-28.5-11.5T380-160v-80L263-357q-11-11-17-25.5t-6-30.5v-187q0-24 11-45t32-32l77 77h-40v186l140 140v74h40v-74l37-37L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11 28t-11 28q-11 11-28 11t-28-11L594-254l-14 14v80q0 17-11.5 28.5T540-120H420Zm266-268-46-46v-166H474L320-754v-46q0-17 11.5-28.5T360-840q17 0 28.5 11.5T400-800v120h160v-120q0-17 11.5-28.5T600-840q17 0 28.5 11.5T640-800v160l-40-40h40q33 0 56.5 23.5T720-600v145q0 16-6 30.5T697-399l-11 11ZM558-516Zm-130 97Z" })
    }
  )
);
PowerOff.displayName = "PowerOff";
var Puzzle = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z" })
    }
  )
);
Puzzle.displayName = "Puzzle";
var QrCode = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M120-560v-240q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v240q0 17-11.5 28.5T400-520H160q-17 0-28.5-11.5T120-560Zm80-40h160v-160H200v160Zm-80 440v-240q0-17 11.5-28.5T160-440h240q17 0 28.5 11.5T440-400v240q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-40h160v-160H200v160Zm320-360v-240q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v240q0 17-11.5 28.5T800-520H560q-17 0-28.5-11.5T520-560Zm80-40h160v-160H600v160Zm160 480v-80h80v80h-80ZM520-360v-80h80v80h-80Zm80 80v-80h80v80h-80Zm-80 80v-80h80v80h-80Zm80 80v-80h80v80h-80Zm80-80v-80h80v80h-80Zm0-160v-80h80v80h-80Zm80 80v-80h80v80h-80Z" })
    }
  )
);
QrCode.displayName = "QrCode";
var RefreshCw = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-70q0-17 11.5-28.5T760-800q17 0 28.5 11.5T800-760v200q0 17-11.5 28.5T760-520H560q-17 0-28.5-11.5T520-560q0-17 11.5-28.5T560-600h128q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q68 0 124.5-34.5T692-367q8-14 22.5-19.5t29.5-.5q16 5 23 21t-1 30q-41 80-117 128t-169 48Z" })
    }
  )
);
RefreshCw.displayName = "RefreshCw";
var RotateCcw = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M393-132q-103-29-168-113.5T160-440q0-57 19-108.5t54-94.5q11-12 27-12.5t29 12.5q11 11 11.5 27T290-586q-24 31-37 68t-13 78q0 81 47.5 144.5T410-209q13 4 21.5 15t8.5 24q0 20-14 31.5t-33 6.5Zm174 0q-19 5-33-7t-14-32q0-12 8.5-23t21.5-15q75-24 122.5-87T720-440q0-100-70-170t-170-70h-3l16 16q11 11 11 28t-11 28q-11 11-28 11t-28-11l-84-84q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l84-84q11-11 28-11t28 11q11 11 11 28t-11 28l-16 16h3q134 0 227 93t93 227q0 109-65 194T567-132Z" })
    }
  )
);
RotateCcw.displayName = "RotateCcw";
var Save = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h447q16 0 30.5 6t25.5 17l114 114q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T760-120H200Zm560-526L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM280-560h280q17 0 28.5-11.5T600-600v-80q0-17-11.5-28.5T560-720H280q-17 0-28.5 11.5T240-680v80q0 17 11.5 28.5T280-560Zm-80-86v446-560 114Z" })
    }
  )
);
Save.displayName = "Save";
var Search = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" })
    }
  )
);
Search.displayName = "Search";
var Send = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" })
    }
  )
);
Send.displayName = "Send";
var Settings = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm7-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" })
    }
  )
);
Settings.displayName = "Settings";
var Shapes = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m297-581 149-243q6-10 15-14.5t19-4.5q10 0 19 4.5t15 14.5l149 243q6 10 6 21t-5 20q-5 9-14 14.5t-21 5.5H331q-12 0-21-5.5T296-540q-5-9-5-20t6-21ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-60v-240q0-17 11.5-28.5T160-420h240q17 0 28.5 11.5T440-380v240q0 17-11.5 28.5T400-100H160q-17 0-28.5-11.5T120-140Zm580-20q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" })
    }
  )
);
Shapes.displayName = "Shapes";
var Share2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" })
    }
  )
);
Share2.displayName = "Share2";
var ShieldAlert = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-320q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm0-160q17 0 28.5-11.5T520-520v-120q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v120q0 17 11.5 28.5T480-480Zm0 396q-7 0-13-1t-12-3q-135-45-215-166.5T160-516v-189q0-25 14.5-45t37.5-29l240-90q14-5 28-5t28 5l240 90q23 9 37.5 29t14.5 45v189q0 140-80 261.5T505-88q-6 2-12 3t-13 1Zm0-80q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" })
    }
  )
);
ShieldAlert.displayName = "ShieldAlert";
var ShieldCheck = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m438-452-56-56q-12-12-28-12t-28 12q-12 12-12 28.5t12 28.5l84 85q12 12 28 12t28-12l170-170q12-12 12-28.5T636-593q-12-12-28.5-12T579-593L438-452Zm42 368q-7 0-13-1t-12-3q-135-45-215-166.5T160-516v-189q0-25 14.5-45t37.5-29l240-90q14-5 28-5t28 5l240 90q23 9 37.5 29t14.5 45v189q0 140-80 261.5T505-88q-6 2-12 3t-13 1Zm0-80q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" })
    }
  )
);
ShieldCheck.displayName = "ShieldCheck";
var Sliders = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z" })
    }
  )
);
Sliders.displayName = "Sliders";
var SlidersHorizontal = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z" })
    }
  )
);
SlidersHorizontal.displayName = "SlidersHorizontal";
var Smartphone = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z" })
    }
  )
);
Smartphone.displayName = "Smartphone";
var Sparkles = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 8.3q-.125 0-.262-.075Q18.6 8.15 18.55 8l-.8-1.75-1.75-.8q-.15-.05-.225-.188Q15.7 5.125 15.7 5t.075-.263Q15.85 4.6 16 4.55l1.75-.8.8-1.75q.05-.15.188-.225.137-.075.262-.075t.263.075q.137.075.187.225l.8 1.75 1.75.8q.15.05.225.187.075.138.075.263t-.075.262Q22.15 5.4 22 5.45l-1.75.8-.8 1.75q-.05.15-.187.225-.138.075-.263.075Zm0 14q-.125 0-.262-.075-.138-.075-.188-.225l-.8-1.75-1.75-.8q-.15-.05-.225-.188-.075-.137-.075-.262t.075-.262q.075-.138.225-.188l1.75-.8.8-1.75q.05-.15.188-.225.137-.075.262-.075t.263.075q.137.075.187.225l.8 1.75 1.75.8q.15.05.225.188.075.137.075.262t-.075.262q-.075.138-.225.188l-1.75.8-.8 1.75q-.05.15-.187.225-.138.075-.263.075ZM9 18.575q-.275 0-.525-.15T8.1 18l-1.6-3.5L3 12.9q-.275-.125-.425-.375-.15-.25-.15-.525t.15-.525q.15-.25.425-.375l3.5-1.6L8.1 6q.125-.275.375-.425.25-.15.525-.15t.525.15q.25.15.375.425l1.6 3.5 3.5 1.6q.275.125.425.375.15.25.15.525t-.15.525q-.15.25-.425.375l-3.5 1.6L9.9 18q-.125.275-.375.425-.25.15-.525.15Zm0-3.425L10 13l2.15-1L10 11 9 8.85 8 11l-2.15 1L8 13ZM9 12Z" })
    }
  )
);
Sparkles.displayName = "Sparkles";
var Star = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z" })
    }
  )
);
Star.displayName = "Star";
var StickyNote = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-200h360v-160q0-17 11.5-28.5T600-400h160v-360H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v367q0 16-6 30.5T817-337L623-143q-11 11-25.5 17t-30.5 6H200Zm240-280H320q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480h120q17 0 28.5 11.5T480-440q0 17-11.5 28.5T440-400Zm200-160H320q-17 0-28.5-11.5T280-600q0-17 11.5-28.5T320-640h320q17 0 28.5 11.5T680-600q0 17-11.5 28.5T640-560ZM200-200v-560 560Z" })
    }
  )
);
StickyNote.displayName = "StickyNote";
var Sun = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Zm297-297Z" })
    }
  )
);
Sun.displayName = "Sun";
var TableIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200Zm80-400h560v-160H200v160Zm213 200h134v-120H413v120Zm0 200h134v-120H413v120ZM200-400h133v-120H200v120Zm427 0h133v-120H627v120ZM200-200h133v-120H200v120Zm427 0h133v-120H627v120Z" })
    }
  )
);
TableIcon.displayName = "TableIcon";
var Table2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120ZM200-640h560v-120H200v120Zm100 80H200v360h100v-360Zm360 0v360h100v-360H660Zm-80 0H380v360h200v-360Z" })
    }
  )
);
Table2.displayName = "Table2";
var Tag = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M807-434 666-234q-11 16-28.5 25t-37.5 9H200q-33 0-56.5-23.5T120-280v-400q0-33 23.5-56.5T200-760h400q20 0 37.5 9t28.5 25l141 200q15 21 15 46t-15 46ZM600-280l142-200-142-200H200v400h400ZM200-680v400-400Z" })
    }
  )
);
Tag.displayName = "Tag";
var Target = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q17 0 28.5 11.5T520-840v291q18 11 29 28.5t11 40.5q0 33-23.5 56.5T480-400q-33 0-56.5-23.5T400-480q0-23 11-41t29-28v-86q-52 14-86 56.5T320-480q0 66 47 113t113 47q66 0 113-47t47-113q0-26-7.5-48T612-570q-10-14-9-31t12-28q12-12 28.5-12t26.5 14q23 31 36.5 68t13.5 79q0 100-70 170t-170 70q-100 0-170-70t-70-170q0-90 57-156.5T440-717v-81q-119 15-199.5 105T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-58-19-109.5T727-683q-11-13-11-30t12-29q12-12 28.5-11.5T784-740q45 53 70.5 119T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" })
    }
  )
);
Target.displayName = "Target";
var Trash = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" })
    }
  )
);
Trash.displayName = "Trash";
var Trash2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" })
    }
  )
);
Trash2.displayName = "Trash2";
var TrendingUp = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M108-255q-12-12-11.5-28.5T108-311l211-214q23-23 57-23t57 23l103 104 208-206h-64q-17 0-28.5-11.5T640-667q0-17 11.5-28.5T680-707h160q17 0 28.5 11.5T880-667v160q0 17-11.5 28.5T840-467q-17 0-28.5-11.5T800-507v-64L593-364q-23 23-57 23t-57-23L376-467 164-255q-11 11-28 11t-28-11Z" })
    }
  )
);
TrendingUp.displayName = "TrendingUp";
var TriangleAlertIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q10 0 19.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14 14.5t-20 5.5H109Zm69-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Zm0-100Z" })
    }
  )
);
TriangleAlertIcon.displayName = "TriangleAlertIcon";
var Trophy = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-200v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h120q17 0 28.5 11.5T680-160q0 17-11.5 28.5T640-120H320q-17 0-28.5-11.5T280-160q0-17 11.5-28.5T320-200h120ZM280-528v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z" })
    }
  )
);
Trophy.displayName = "Trophy";
var Type = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M420-680H260q-25 0-42.5-17.5T200-740q0-25 17.5-42.5T260-800h440q25 0 42.5 17.5T760-740q0 25-17.5 42.5T700-680H540v460q0 25-17.5 42.5T480-160q-25 0-42.5-17.5T420-220v-460Z" })
    }
  )
);
Type.displayName = "Type";
var Underline = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-120q-17 0-28.5-11.5T200-160q0-17 11.5-28.5T240-200h480q17 0 28.5 11.5T760-160q0 17-11.5 28.5T720-120H240Zm240-160q-101 0-157-63t-56-167v-279q0-21 15.5-36t36.5-15q21 0 36 15t15 36v285q0 56 28 91t82 35q54 0 82-35t28-91v-285q0-21 15.5-36t36.5-15q21 0 36 15t15 36v279q0 104-56 167t-157 63Z" })
    }
  )
);
Underline.displayName = "Underline";
var Unlock = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h360v-80q0-50-35-85t-85-35q-42 0-73.5 25.5T364-751q-4 14-16.5 22.5T320-720q-17 0-28.5-11t-8.5-26q14-69 69-116t128-47q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" })
    }
  )
);
Unlock.displayName = "Unlock";
var Upload = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Zm200-486-75 75q-12 12-28.5 11.5T308-572q-11-12-11.5-28t11.5-28l144-144q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l144 144q12 12 11.5 28T652-572q-12 12-28.5 12.5T595-571l-75-75v286q0 17-11.5 28.5T480-320q-17 0-28.5-11.5T440-360v-286Z" })
    }
  )
);
Upload.displayName = "Upload";
var User = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" })
    }
  )
);
User.displayName = "User";
var User2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" })
    }
  )
);
User2.displayName = "User2";
var UserCheck = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-32q0-33 17-62t47-44q51-26 115-44t141-18q8 0 18 .5t18 1.5q16 2 26.5 15t8.5 29q-2 14-12 24t-27 10h-32q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h270q17 0 28.5 11.5T470-200q0 17-11.5 28.5T430-160H160Zm462-96 174-174q11-11 28-11t28 11q11 11 11 28t-11 28L650-172q-12 12-28 12t-28-12l-82-82q-11-11-11-28t11-28q11-11 28-11t28 11l54 54ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" })
    }
  )
);
UserCheck.displayName = "UserCheck";
var UserPlus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M720-520h-80q-17 0-28.5-11.5T600-560q0-17 11.5-28.5T640-600h80v-80q0-17 11.5-28.5T760-720q17 0 28.5 11.5T800-680v80h80q17 0 28.5 11.5T920-560q0 17-11.5 28.5T880-520h-80v80q0 17-11.5 28.5T760-400q-17 0-28.5-11.5T720-440v-80Zm-360 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-240v-32q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240Zm80 0h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" })
    }
  )
);
UserPlus.displayName = "UserPlus";
var UserRound = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" })
    }
  )
);
UserRound.displayName = "UserRound";
var UserSearch = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560ZM856-48 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 27-8 51t-20 45l100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-540-40v-31q0-34 17-63t47-44q42-22 93.5-38.5T383-438q17-2 29 10t12 29q0 17-12 29.5T383-355q-57 7-96 21t-66 28q-10 5-15.5 14.5T200-271v31h184q17 0 28.5 11.5T424-200q0 17-11.5 28.5T384-160H200q-33 0-56.5-23.5T120-240Zm320-400Zm-33 400Z" })
    }
  )
);
UserSearch.displayName = "UserSearch";
var Users = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm800 112H738q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" })
    }
  )
);
Users.displayName = "Users";
var Venus = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M440-200h-40q-17 0-28.5-11.5T360-240q0-17 11.5-28.5T400-280h40v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h40q17 0 28.5 11.5T600-240q0 17-11.5 28.5T560-200h-40v40q0 17-11.5 28.5T480-120q-17 0-28.5-11.5T440-160v-40Zm40-240q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z" })
    }
  )
);
Venus.displayName = "Venus";
var Video = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l126-126q10-10 22-5t12 19v344q0 14-12 19t-22-5L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" })
    }
  )
);
Video.displayName = "Video";
var VideoOff = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m720-540 126-126q10-10 22-5t12 19v344q0 14-12 19t-22-5L720-420q0 17-11.5 28.5T680-380q-17 0-28.5-11.5T640-420v-300H360q-20 0-30-12.5T320-760q0-15 10-27.5t30-12.5h280q33 0 56.5 23.5T720-720v180Zm74 486L54-794q-11-11-11-28t11-28q11-11 28-11t28 11l740 740q11 11 11 28t-11 28q-11 11-28 11t-28-11ZM498-575ZM382-464ZM160-800l80 80h-80v480h480v-80l80 80q0 33-23.5 56.5T640-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Z" })
    }
  )
);
VideoOff.displayName = "VideoOff";
var Voicemail = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M260-320q-75 0-127.5-52.5T80-500q0-75 52.5-127.5T260-680q75 0 127.5 52.5T440-500q0 27-8 52t-22 48h140q-14-23-22-48t-8-52q0-75 52.5-127.5T700-680q75 0 127.5 52.5T880-500q0 75-52.5 127.5T700-320H260Zm0-80q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm440 0q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" })
    }
  )
);
Voicemail.displayName = "Voicemail";
var Wallet = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" })
    }
  )
);
Wallet.displayName = "Wallet";
var Wand2 = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m20 7-.95-2.05L17 4l2.05-.95L20 1l.95 2.05L23 4l-2.05.95ZM8.5 7l-.95-2.05L5.5 4l2.05-.95L8.5 1l.95 2.05L11.5 4l-2.05.95ZM20 18.5l-.95-2.05L17 15.5l2.05-.95.95-2.05.95 2.05 2.05.95-2.05.95ZM5.1 21.7l-2.8-2.8q-.3-.3-.3-.725t.3-.725L13.45 6.3q.3-.3.725-.3t.725.3l2.8 2.8q.3.3.3.725t-.3.725L6.55 21.7q-.3.3-.725.3t-.725-.3Zm.75-2.1L13 12.4 11.6 11l-7.2 7.15Z" })
    }
  )
);
Wand2.displayName = "Wand2";
var Wrench = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M360-360q-100 0-170-70t-70-170q0-20 3-40t11-38q5-10 12.5-15t16.5-7q9-2 18.5.5T199-689l105 105 72-72-105-105q-8-8-10.5-17.5T260-797q2-9 7-16.5t15-12.5q18-8 38-11t40-3q100 0 170 70t70 170q0 23-4 43.5T584-516l202 200q29 29 29 71t-29 71q-29 29-71 29t-71-30L444-376q-20 8-40.5 12t-43.5 4Zm0-80q26 0 52-8t47-25l243 243q5 5 13.5 4.5T729-231q5-5 5-13.5t-5-13.5L486-500q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440Zm109-51Z" })
    }
  )
);
Wrench.displayName = "Wrench";
var X = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" })
    }
  )
);
X.displayName = "X";
var XCircle = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m480-424 116 116q11 11 28 11t28-11q11-11 11-28t-11-28L536-480l116-116q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-536 364-652q-11-11-28-11t-28 11q-11 11-11 28t11 28l116 116-116 116q-11 11-11 28t11 28q11 11 28 11t28-11l116-116Zm0 344q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
    }
  )
);
XCircle.displayName = "XCircle";
var XIcon = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" })
    }
  )
);
XIcon.displayName = "XIcon";
var Zap = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m422-232 207-248H469l29-227-185 267h139l-30 208Zm-62-128H236q-24 0-35.5-21.5T203-423l299-430q10-14 26-19.5t33 .5q17 6 25 21t6 32l-32 259h155q26 0 36.5 23t-6.5 43L416-100q-11 13-27 17t-31-3q-15-7-23.5-21.5T328-139l32-221Zm111-110Z" })
    }
  )
);
Zap.displayName = "Zap";
var Sell = React.forwardRef(
  ({ size = 24, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM513-160l286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Zm220 160Z" })
    }
  )
);
Sell.displayName = "Sell";

// src/components/ui/spinner.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Loader2Icon, { role: "status", "aria-label": "Loading", className: cn("size-4 animate-spin", className), ...props });
}

// src/components/ui/button.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-heading whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xs active:bg-primary/95 aria-expanded:bg-primary/90",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground border border-border/60 hover:bg-secondary/70 hover:border-border hover:shadow-2xs active:bg-secondary/90 aria-expanded:bg-secondary/80 dark:border-border/30 dark:hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 hover:border-destructive/40 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        success: "bg-success/10 text-success border border-success/30 hover:bg-success/20 hover:border-success/50 focus-visible:border-success/50 focus-visible:ring-success/20 dark:bg-success/20 dark:hover:bg-success/30 dark:focus-visible:ring-success/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 gap-1.5 px-3 text-sm font-semibold font-heading has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2 text-xs font-semibold font-heading in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-2.5 text-xs font-semibold font-heading in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 text-base font-medium font-heading has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9",
        "icon-xs": "size-6 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  loadingText,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  ...props
}) {
  const activeTrailingIcon = leadingIcon ? void 0 : trailingIcon;
  const renderedLeadingIcon = React2.isValidElement(leadingIcon) ? React2.cloneElement(leadingIcon, {
    "data-icon": "inline-start"
  }) : leadingIcon;
  const renderedTrailingIcon = React2.isValidElement(activeTrailingIcon) ? React2.cloneElement(activeTrailingIcon, {
    "data-icon": "inline-end"
  }) : activeTrailingIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_button.Button,
    {
      "data-slot": "button",
      nativeButton: props.nativeButton ?? (props.render ? false : void 0),
      "data-loading": loading || void 0,
      "aria-busy": loading || void 0,
      disabled: disabled || loading,
      className: cn(buttonVariants({ variant, size, className })),
      ...props,
      children: loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Spinner, { "data-icon": "inline-start" }),
        loadingText ?? children
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        renderedLeadingIcon,
        children,
        renderedTrailingIcon
      ] })
    }
  );
}

// src/components/ui/button-group.tsx
var import_merge_props = require("@base-ui/react/merge-props");
var import_use_render = require("@base-ui/react/use-render");
var import_class_variance_authority2 = require("class-variance-authority");

// src/components/ui/separator.tsx
var import_separator = require("@base-ui/react/separator");
var import_jsx_runtime4 = require("react/jsx-runtime");
function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_separator.Separator,
    {
      "data-slot": "separator",
      orientation,
      className: cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/button-group.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var buttonGroupVariants = (0, import_class_variance_authority2.cva)(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        // The `!` (important) markers are load-bearing: Button's base radius
        // is `rounded-full` (pill), and without `!important` these
        // corner-squaring overrides lose the cascade to it unpredictably —
        // producing a half-round/half-square seam between grouped buttons.
        // The first child also needs an EXPLICIT outer-corner override
        // (mirroring the last child's `rounded-r-lg!`) — without it, its
        // untouched outer corner just falls back to Button's own
        // `rounded-full` instead of the group's modest `rounded-lg`.
        horizontal: "*:data-slot:rounded-r-none! [&>[data-slot]:first-child]:rounded-l-lg! [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none! [&>[data-slot]~[data-slot]]:border-l-0",
        vertical: "flex-col *:data-slot:rounded-b-none! [&>[data-slot]:first-child]:rounded-t-lg! [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none! [&>[data-slot]~[data-slot]]:border-t-0"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(buttonGroupVariants({ orientation }), className),
      ...props
    }
  );
}
function ButtonGroupText({
  className,
  render,
  ...props
}) {
  return (0, import_use_render.useRender)({
    defaultTagName: "div",
    props: (0, import_merge_props.mergeProps)(
      {
        className: cn(
          "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text"
    }
  });
}
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    Separator,
    {
      "data-slot": "button-group-separator",
      orientation,
      className: cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/back-button.tsx
var import_navigation = require("next/navigation");
var import_jsx_runtime6 = require("react/jsx-runtime");
function BackButton({
  onClick,
  className,
  ...props
}) {
  const router = (0, import_navigation.useRouter)();
  const handleBack = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      router.back();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    Button,
    {
      variant: "outline",
      size: "icon-sm",
      "aria-label": "Go back",
      onClick: handleBack,
      className: cn("shrink-0", className),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronLeft, { className: "size-4" })
    }
  );
}

// src/components/ui/toggle.tsx
var import_toggle = require("@base-ui/react/toggle");
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime7 = require("react/jsx-runtime");
var toggleVariants = (0, import_class_variance_authority3.cva)(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted"
      },
      size: {
        default: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_toggle.Toggle,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/toggle-group.tsx
var React3 = __toESM(require("react"));
var import_toggle2 = require("@base-ui/react/toggle");
var import_toggle_group = require("@base-ui/react/toggle-group");
var import_jsx_runtime8 = require("react/jsx-runtime");
var ToggleGroupContext = React3.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_toggle_group.ToggleGroup,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      "data-spacing": spacing,
      "data-orientation": orientation,
      style: { "--gap": spacing },
      className: cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        ToggleGroupContext.Provider,
        {
          value: { variant, size, spacing, orientation },
          children
        }
      )
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}) {
  const context = React3.useContext(ToggleGroupContext);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_toggle2.Toggle,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      "data-spacing": context.spacing,
      className: cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      ),
      ...props,
      children
    }
  );
}

// src/components/ui/field.tsx
var React4 = __toESM(require("react"));
var import_react = require("react");
var import_class_variance_authority4 = require("class-variance-authority");

// src/components/ui/label.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function Label({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "label",
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/field.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function FieldSet({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "fieldset",
    {
      "data-slot": "field-set",
      className: cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      ),
      ...props
    }
  );
}
function FieldLegend({
  className,
  variant = "legend",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": variant,
      className: cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      ),
      ...props
    }
  );
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      "data-slot": "field-group",
      className: cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      ),
      ...props
    }
  );
}
var fieldVariants = (0, import_class_variance_authority4.cva)(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": orientation,
      className: cn(fieldVariants({ orientation }), className),
      ...props
    }
  );
}
function FieldContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      "data-slot": "field-content",
      className: cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      ),
      ...props
    }
  );
}
function FieldLabel({
  className,
  icon: Icon,
  children,
  ...props
}) {
  const hasFieldChild = React4.Children.toArray(children).some(
    (child) => React4.isValidElement(child) && child.props?.["data-slot"] === "field"
  );
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    Label,
    {
      "data-slot": "field-label",
      className: cn(
        "group/field-label peer/field-label flex w-fit gap-2 items-center leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      ),
      ...props,
      children: [
        Icon && !hasFieldChild && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { className: "size-4 text-muted-foreground shrink-0" }),
        children
      ]
    }
  );
}
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      "data-slot": "field-label",
      className: cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className
      ),
      ...props
    }
  );
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "p",
    {
      "data-slot": "field-description",
      className: cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!children,
      className: cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Separator, { className: "absolute inset-0 top-1/2" }),
        children && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "span",
          {
            className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
            "data-slot": "field-separator-content",
            children
          }
        )
      ]
    }
  );
}
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = (0, import_react.useMemo)(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values()
    ];
    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: cn("text-sm font-normal text-destructive", className),
      ...props,
      children: content
    }
  );
}

// src/components/ui/input.tsx
var import_input = require("@base-ui/react/input");
var import_class_variance_authority5 = require("class-variance-authority");
var import_jsx_runtime11 = require("react/jsx-runtime");
var inputVariants = (0, import_class_variance_authority5.cva)(
  "w-full min-w-0 rounded-lg border border-input bg-transparent transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      inputSize: {
        sm: "h-9 px-3 py-1.5 text-sm file:h-7 file:text-xs",
        default: "h-10 px-3.5 py-2 text-sm file:h-8 file:text-sm",
        lg: "h-11 px-4 py-2.5 text-sm file:h-9 file:text-sm"
      }
    },
    defaultVariants: {
      inputSize: "default"
    }
  }
);
function Input({ className, type, inputSize, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_input.Input,
    {
      type,
      "data-slot": "input",
      className: cn(inputVariants({ inputSize }), className),
      ...props
    }
  );
}

// src/components/ui/textarea.tsx
var import_class_variance_authority6 = require("class-variance-authority");
var import_jsx_runtime12 = require("react/jsx-runtime");
var textareaVariants = (0, import_class_variance_authority6.cva)(
  "flex field-sizing-content w-full rounded-lg border border-input bg-transparent transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      inputSize: {
        sm: "min-h-14 px-3 py-2 text-sm",
        default: "min-h-20 px-3.5 py-2.5 text-sm",
        lg: "min-h-24 px-4 py-3 text-sm"
      }
    },
    defaultVariants: {
      inputSize: "default"
    }
  }
);
function Textarea({ className, inputSize, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(textareaVariants({ inputSize }), className),
      ...props
    }
  );
}

// src/components/ui/checkbox.tsx
var import_checkbox = require("@base-ui/react/checkbox");
var import_jsx_runtime13 = require("react/jsx-runtime");
function Checkbox({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_checkbox.Checkbox.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        import_checkbox.Checkbox.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            CheckIcon,
            {}
          )
        }
      )
    }
  );
}

// src/components/ui/radio-group.tsx
var import_radio = require("@base-ui/react/radio");
var import_radio_group = require("@base-ui/react/radio-group");
var import_jsx_runtime14 = require("react/jsx-runtime");
function RadioGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    import_radio_group.RadioGroup,
    {
      "data-slot": "radio-group",
      className: cn("grid w-full gap-2", className),
      ...props
    }
  );
}
function RadioGroupItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    import_radio.Radio.Root,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        import_radio.Radio.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "flex size-4 items-center justify-center",
          children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
        }
      )
    }
  );
}

// src/components/ui/switch.tsx
var import_switch = require("@base-ui/react/switch");
var import_jsx_runtime15 = require("react/jsx-runtime");
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_switch.Switch.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent px-px transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_switch.Switch.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-full group-data-[size=sm]/switch:data-checked:translate-x-full dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}

// src/components/ui/select.tsx
var import_select = require("@base-ui/react/select");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Select = import_select.Select.Root;
function SelectGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.Group,
    {
      "data-slot": "select-group",
      className: cn("scroll-my-1", className),
      ...props
    }
  );
}
function SelectValue({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.Value,
    {
      "data-slot": "select-value",
      className: cn("flex flex-1 text-left", className),
      ...props
    }
  );
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    import_select.Select.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-9 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          import_select.Select.Icon,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ChevronDownIcon, { className: "pointer-events-none size-4 text-muted-foreground" })
          }
        )
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_select.Select.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.Positioner,
    {
      side,
      sideOffset,
      align,
      alignOffset,
      alignItemWithTrigger,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        import_select.Select.Popup,
        {
          "data-slot": "select-content",
          "data-align-trigger": alignItemWithTrigger,
          className: cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
          ...props,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(SelectScrollUpButton, {}),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_select.Select.List, { children }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(SelectScrollDownButton, {})
          ]
        }
      )
    }
  ) });
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.GroupLabel,
    {
      "data-slot": "select-label",
      className: cn("px-1.5 py-1 text-xs font-medium text-muted-foreground", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    import_select.Select.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_select.Select.ItemText, { className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap", children }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          import_select.Select.ItemIndicator,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(CheckIcon, { className: "pointer-events-none" })
          }
        )
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.Separator,
    {
      "data-slot": "select-separator",
      className: cn("pointer-events-none -mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.ScrollUpArrow,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        ChevronUpIcon,
        {}
      )
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_select.Select.ScrollDownArrow,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        ChevronDownIcon,
        {}
      )
    }
  );
}

// src/components/ui/slider.tsx
var import_slider = require("@base-ui/react/slider");
var import_jsx_runtime17 = require("react/jsx-runtime");
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_slider.Slider.Root,
    {
      "data-slot": "slider",
      className: cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className
      ),
      defaultValue,
      value,
      min,
      max,
      step,
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
        import_slider.Slider.Control,
        {
          "data-slot": "slider-control",
          className: "relative flex w-full items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              import_slider.Slider.Track,
              {
                "data-slot": "slider-track",
                className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  import_slider.Slider.Indicator,
                  {
                    "data-slot": "slider-indicator",
                    className: "absolute h-full bg-primary data-[orientation=vertical]:w-full"
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              import_slider.Slider.Thumb,
              {
                "data-slot": "slider-thumb",
                className: "block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed hover:bg-muted"
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/ui/badge.tsx
var import_merge_props2 = require("@base-ui/react/merge-props");
var import_use_render2 = require("@base-ui/react/use-render");
var import_class_variance_authority7 = require("class-variance-authority");
var badgeVariants = (0, import_class_variance_authority7.cva)(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        info: "bg-info/10 text-info focus-visible:ring-info/20 dark:bg-info/20 dark:focus-visible:ring-info/40 [a]:hover:bg-info/20",
        success: "bg-success/10 text-success focus-visible:ring-success/20 dark:bg-success/20 dark:focus-visible:ring-success/40 [a]:hover:bg-success/20",
        warning: "bg-warning/10 text-warning focus-visible:ring-warning/20 dark:bg-warning/20 dark:focus-visible:ring-warning/40 [a]:hover:bg-warning/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-5 px-2 py-0.5 text-xs",
        sm: "h-4 px-1.5 py-0 text-2xs"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}) {
  return (0, import_use_render2.useRender)({
    defaultTagName: "span",
    props: (0, import_merge_props2.mergeProps)(
      {
        className: cn(badgeVariants({ variant, size }), className)
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size
    }
  });
}

// src/components/ui/popover.tsx
var import_popover = require("@base-ui/react/popover");
var import_jsx_runtime18 = require("react/jsx-runtime");
function Popover({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_popover.Popover.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_popover.Popover.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_popover.Popover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_popover.Popover.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        import_popover.Popover.Popup,
        {
          "data-slot": "popover-content",
          className: cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          ),
          ...props
        }
      )
    }
  ) });
}
function PopoverHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      "data-slot": "popover-header",
      className: cn("flex flex-col gap-0.5 text-sm", className),
      ...props
    }
  );
}
function PopoverTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_popover.Popover.Title,
    {
      "data-slot": "popover-title",
      className: cn("font-medium", className),
      ...props
    }
  );
}
function PopoverDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_popover.Popover.Description,
    {
      "data-slot": "popover-description",
      className: cn("text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/search-filter-bar.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function SearchFilterBar({
  placeholder = "Search\u2026",
  value,
  onChange,
  filterGroups,
  onClearFilters,
  className
}) {
  const activeFilterCount = filterGroups?.reduce((sum, g) => sum + g.selected.length, 0) ?? 0;
  const hasFilters = (filterGroups?.length ?? 0) > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        Input,
        {
          placeholder,
          value,
          onChange: (e) => onChange(e.target.value),
          className: "bg-card pl-9 text-xs sm:text-sm h-9"
        }
      )
    ] }),
    hasFilters && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Popover, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        PopoverTrigger,
        {
          render: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Button, { variant: "outline", size: "sm", className: "h-9 gap-1.5 cursor-pointer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SlidersHorizontal, { className: "size-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: "Filters" }),
            activeFilterCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Badge, { variant: "success", className: "ml-1 h-5 min-w-5 px-1.5 text-2xs", children: activeFilterCount })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(PopoverContent, { align: "end", className: "w-64 p-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center justify-between border-b border-border px-3 py-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "text-xs font-semibold text-foreground uppercase tracking-wider", children: "Filters" }),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: onClearFilters,
              disabled: activeFilterCount === 0,
              className: "h-6 px-1.5 text-2xs cursor-pointer",
              children: "Clear all"
            }
          )
        ] }),
        filterGroups.map((group, i) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { children: [
          i > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "border-t border-border" }),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex flex-col gap-1.5 p-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "text-2xs font-semibold text-muted-foreground", children: group.label }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex flex-col gap-1", children: group.options.map((opt) => {
              const id = `filter-${group.label}-${opt}`.replace(/\s+/g, "-").toLowerCase();
              return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
                "label",
                {
                  htmlFor: id,
                  className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-muted",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                      Checkbox,
                      {
                        id,
                        checked: group.selected.includes(opt),
                        onCheckedChange: () => group.onToggle(opt)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "truncate", children: opt })
                  ]
                },
                opt
              );
            }) })
          ] })
        ] }, group.label))
      ] })
    ] })
  ] });
}

// src/components/ui/avatar.tsx
var import_avatar = require("@base-ui/react/avatar");
var import_jsx_runtime20 = require("react/jsx-runtime");
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    import_avatar.Avatar.Root,
    {
      "data-slot": "avatar",
      "data-size": size,
      className: cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    import_avatar.Avatar.Image,
    {
      "data-slot": "avatar-image",
      className: cn(
        "aspect-square size-full rounded-full object-cover",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    import_avatar.Avatar.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      ),
      ...props
    }
  );
}
function AvatarBadge({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "span",
    {
      "data-slot": "avatar-badge",
      className: cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      ),
      ...props
    }
  );
}
function AvatarGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      "data-slot": "avatar-group",
      className: cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      ),
      ...props
    }
  );
}
function AvatarGroupCount({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      "data-slot": "avatar-group-count",
      className: cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/skeleton.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function Skeleton({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      "data-slot": "skeleton",
      className: cn(
        "rounded-md",
        variant === "default" && "animate-pulse bg-muted",
        variant === "ai" && "animate-ai-shimmer",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/empty.tsx
var import_class_variance_authority8 = require("class-variance-authority");
var import_jsx_runtime22 = require("react/jsx-runtime");
function Empty({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "div",
    {
      "data-slot": "empty-header",
      className: cn("flex max-w-sm flex-col items-center gap-2", className),
      ...props
    }
  );
}
var emptyMediaVariants = (0, import_class_variance_authority8.cva)(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(emptyMediaVariants({ variant, className })),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "div",
    {
      "data-slot": "empty-title",
      className: cn(
        "font-heading text-sm font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/metric-card.tsx
var React5 = __toESM(require("react"));
var import_jsx_runtime23 = require("react/jsx-runtime");
var trendVariantMap = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  neutral: "text-muted-foreground"
};
var MetricCard = React5.forwardRef(
  ({ className, label, value, icon, trend, trendVariant = "neutral", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "rounded-xl border border-border/70 bg-card p-4 shadow-xs text-left transition-all",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
            icon && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "rounded-lg bg-muted/60 p-2 text-foreground [&>svg]:size-4", children: icon })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mt-3 flex items-baseline justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-2xl font-heading font-bold text-foreground", children: value }),
            trend && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: cn("text-2xs font-medium", trendVariantMap[trendVariant]), children: trend })
          ] })
        ]
      }
    );
  }
);
MetricCard.displayName = "MetricCard";

// src/components/ui/tabs.tsx
var import_tabs = require("@base-ui/react/tabs");
var import_class_variance_authority9 = require("class-variance-authority");
var import_jsx_runtime24 = require("react/jsx-runtime");
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_tabs.Tabs.Root,
    {
      "data-slot": "tabs",
      "data-orientation": orientation,
      className: cn(
        "group/tabs flex gap-3 data-horizontal:flex-col",
        className
      ),
      ...props
    }
  );
}
var tabsListVariants = (0, import_class_variance_authority9.cva)(
  "group/tabs-list inline-flex max-w-full overflow-x-auto no-scrollbar items-center justify-start sm:justify-center rounded-lg p-1 text-muted-foreground group-data-horizontal/tabs:h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none shrink-0",
  {
    variants: {
      variant: {
        default: "bg-muted",
        // No list padding so the first tab's text aligns flush with the
        // page title; taller (48px) row; underline indicator sits at bottom-0.
        line: "gap-6 bg-transparent p-0 group-data-horizontal/tabs:h-12",
        /** White pill with a near-black active chip. Use on gray/tinted canvases
         *  where the default muted pill would be invisible. */
        inverted: "bg-card"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_tabs.Tabs.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn(tabsListVariants({ variant }), className),
      ...props
    }
  );
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_tabs.Tabs.Tab,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-2 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        // Line variant: no internal horizontal padding (underline hugs the
        // label text); the inter-tab spacing comes from TabsList's gap.
        "group-data-[variant=line]/tabs-list:px-0",
        "group-data-[variant=inverted]/tabs-list:data-active:bg-foreground group-data-[variant=inverted]/tabs-list:data-active:text-background group-data-[variant=inverted]/tabs-list:data-active:shadow-none",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-0 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      ),
      ...props
    }
  );
}
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    import_tabs.Tabs.Panel,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 text-sm outline-none", className),
      ...props
    }
  );
}

// src/components/ui/chip-tabs.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function ChipTabs({
  items,
  value,
  onValueChange,
  className,
  size = "md",
  variant = "default",
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "div",
    {
      role: "tablist",
      "aria-label": ariaLabel,
      className: cn("flex flex-wrap items-center gap-2", className),
      children: items.map((item) => {
        const active = value === item.value;
        const stateClass = variant === "choice" ? active ? "border-primary bg-accent text-accent-foreground" : ariaInvalid ? "border-destructive/60 bg-destructive/5 text-destructive hover:bg-destructive/10" : "border-border bg-muted text-muted-foreground hover:text-foreground" : active ? "border-transparent bg-secondary text-secondary-foreground" : ariaInvalid ? "border-destructive/60 text-destructive hover:bg-destructive/10" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground";
        return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": active,
            disabled: item.disabled,
            onClick: () => onValueChange(item.value),
            className: cn(
              "inline-flex items-center gap-1 rounded-full border font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm",
              stateClass
            ),
            children: [
              item.label,
              typeof item.count === "number" ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
                "span",
                {
                  className: cn(
                    "text-xs",
                    active ? "text-secondary-foreground/70" : "text-muted-foreground"
                  ),
                  children: [
                    "(",
                    item.count,
                    ")"
                  ]
                }
              ) : null
            ]
          },
          item.value
        );
      })
    }
  );
}

// src/components/ui/segmented-tab-switcher.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function SegmentedTabSwitcher({
  items,
  value,
  onValueChange,
  trackClassName,
  activeClassName = "text-primary",
  mobileActiveClassName,
  inactiveClassName = "text-muted-foreground",
  mutedClassName = "text-muted-foreground",
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { "data-slot": "segmented-tab-switcher", className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "div",
      {
        className: cn(
          "hidden w-full items-stretch gap-2 rounded-full bg-muted p-2 md:flex",
          trackClassName
        ),
        children: items.map(({ value: v, label, description, icon }) => {
          const active = v === value;
          return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => onValueChange(v),
              "aria-pressed": active,
              className: cn(
                "flex flex-1 flex-col items-start justify-center gap-1 rounded-full px-5 py-3 text-left transition-all duration-200",
                active ? "bg-card shadow-sm" : "hover:bg-card/60"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
                  "span",
                  {
                    className: cn(
                      "flex items-center gap-2 text-sm font-semibold",
                      active ? activeClassName : inactiveClassName
                    ),
                    children: [
                      icon,
                      label
                    ]
                  }
                ),
                description && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                  "span",
                  {
                    className: cn(
                      "text-xs leading-tight",
                      mutedClassName,
                      !active && "opacity-70"
                    ),
                    children: description
                  }
                )
              ]
            },
            v
          );
        })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "no-scrollbar -mx-4 overflow-x-auto pb-1 sm:-mx-10 md:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex w-max gap-2 px-4 sm:px-10", children: items.map(({ value: v, label, icon }) => {
      const active = v === value;
      return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => onValueChange(v),
          "aria-pressed": active,
          className: cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
            active ? cn("border-transparent bg-card font-bold shadow-sm", mobileActiveClassName ?? activeClassName) : cn("border-transparent bg-muted hover:bg-muted", inactiveClassName, trackClassName)
          ),
          children: [
            icon,
            label
          ]
        },
        v
      );
    }) }) })
  ] });
}

// src/components/ui/breadcrumb.tsx
var import_merge_props3 = require("@base-ui/react/merge-props");
var import_use_render3 = require("@base-ui/react/use-render");
var import_jsx_runtime27 = require("react/jsx-runtime");
function Breadcrumb({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "nav",
    {
      "aria-label": "breadcrumb",
      "data-slot": "breadcrumb",
      className: cn(className),
      ...props
    }
  );
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  className,
  render,
  ...props
}) {
  return (0, import_use_render3.useRender)({
    defaultTagName: "a",
    props: (0, import_merge_props3.mergeProps)(
      {
        className: cn("transition-colors hover:text-foreground", className)
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link"
    }
  });
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-normal text-foreground", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ChevronRightIcon, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          MoreHorizontalIcon,
          {}
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}

// src/components/ui/sidebar.tsx
var React7 = __toESM(require("react"));
var import_merge_props4 = require("@base-ui/react/merge-props");
var import_use_render4 = require("@base-ui/react/use-render");
var import_class_variance_authority10 = require("class-variance-authority");

// src/hooks/use-mobile.ts
var React6 = __toESM(require("react"));
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React6.useState(void 0);
  React6.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}

// src/components/ui/sheet.tsx
var import_dialog = require("@base-ui/react/dialog");
var import_jsx_runtime28 = require("react/jsx-runtime");
function Sheet({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_dialog.Dialog.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_dialog.Dialog.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_dialog.Dialog.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_dialog.Dialog.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_dialog.Dialog.Backdrop,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(SheetPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SheetOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
      import_dialog.Dialog.Popup,
      {
        "data-slot": "sheet-content",
        "data-side": side,
        className: cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
            import_dialog.Dialog.Close,
            {
              "data-slot": "sheet-close",
              render: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-3 right-3",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  XIcon,
                  {}
                ),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-0.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_dialog.Dialog.Title,
    {
      "data-slot": "sheet-title",
      className: cn(
        "font-heading text-base font-medium text-foreground",
        className
      ),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_dialog.Dialog.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/tooltip.tsx
var import_tooltip = require("@base-ui/react/tooltip");
var import_jsx_runtime29 = require("react/jsx-runtime");
function TooltipProvider({
  delay = 0,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    import_tooltip.Tooltip.Provider,
    {
      "data-slot": "tooltip-provider",
      delay,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_tooltip.Tooltip.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_tooltip.Tooltip.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_tooltip.Tooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    import_tooltip.Tooltip.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
        import_tooltip.Tooltip.Popup,
        {
          "data-slot": "tooltip-content",
          className: cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          ),
          ...props,
          children: [
            children,
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_tooltip.Tooltip.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })
          ]
        }
      )
    }
  ) });
}

// src/components/ui/sidebar.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "4rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React7.createContext(null);
function useSidebar() {
  const context = React7.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React7.useState(false);
  const [_open, _setOpen] = React7.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React7.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React7.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React7.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React7.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
        className
      ),
      ...props,
      children
    }
  ) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      SheetContent,
      {
        dir,
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          "div",
          {
            "data-slot": "sidebar-container",
            "data-side": side,
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon-sm",
      className: cn(className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(PanelLeftIcon, {}),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    Input,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: cn("h-8 w-full bg-background shadow-none", className),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    Separator,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  render,
  ...props
}) {
  return (0, import_use_render4.useRender)({
    defaultTagName: "div",
    props: (0, import_merge_props4.mergeProps)(
      {
        className: cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label"
    }
  });
}
function SidebarGroupAction({
  className,
  render,
  ...props
}) {
  return (0, import_use_render4.useRender)({
    defaultTagName: "button",
    props: (0, import_merge_props4.mergeProps)(
      {
        className: cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action"
    }
  });
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-0.5", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
var sidebarMenuButtonVariants = (0, import_class_variance_authority10.cva)(
  "peer/menu-button group/menu-button flex w-full items-center gap-3 overflow-hidden rounded-lg px-2.5 text-left text-sm font-medium ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:[&>span:not(:first-child)]:hidden hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-5 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-10 text-sm",
        sm: "h-8 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const { isMobile, state } = useSidebar();
  const comp = (0, import_use_render4.useRender)({
    defaultTagName: "button",
    props: (0, import_merge_props4.mergeProps)(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className)
      },
      props
    ),
    render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(TooltipTrigger, { render }),
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive
    }
  });
  if (!tooltip) {
    return comp;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(Tooltip, { children: [
    comp,
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}) {
  return (0, import_use_render4.useRender)({
    defaultTagName: "button",
    props: (0, import_merge_props4.mergeProps)(
      {
        className: cn(
          "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action"
    }
  });
}
function SidebarMenuBadge({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const [width] = React7.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
}
function SidebarMenuSub({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: cn(
        "ml-5 flex min-w-0 flex-col gap-1 border-l border-sidebar-border pl-3.5 pr-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSubItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: cn("group/menu-sub-item relative", className),
      ...props
    }
  );
}
function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  return (0, import_use_render4.useRender)({
    defaultTagName: "a",
    props: (0, import_merge_props4.mergeProps)(
      {
        className: cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          className
        )
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive
    }
  });
}

// src/components/ui/app-sidebar.tsx
var React9 = __toESM(require("react"));
var import_link = __toESM(require("next/link"));
var import_navigation2 = require("next/navigation");

// src/components/ui/dropdown-menu.tsx
var import_menu = require("@base-ui/react/menu");
var import_jsx_runtime31 = require("react/jsx-runtime");
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_menu.Menu.Positioner,
    {
      className: "isolate z-50 outline-none",
      align,
      alignOffset,
      side,
      sideOffset,
      children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        import_menu.Menu.Popup,
        {
          "data-slot": "dropdown-menu-content",
          className: cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className),
          ...props
        }
      )
    }
  ) });
}
function DropdownMenuGroup({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_menu.Menu.GroupLabel,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_menu.Menu.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSub({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.SubmenuRoot, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    import_menu.Menu.SubmenuTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ChevronRightIcon, { className: "ml-auto" })
      ]
    }
  );
}
function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    DropdownMenuContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
      align,
      alignOffset,
      side,
      sideOffset,
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    import_menu.Menu.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.CheckboxItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              CheckIcon,
              {}
            ) })
          }
        ),
        children
      ]
    }
  );
}
function DropdownMenuRadioGroup({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_menu.Menu.RadioGroup,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...props
    }
  );
}
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    import_menu.Menu.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_menu.Menu.RadioItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              CheckIcon,
              {}
            ) })
          }
        ),
        children
      ]
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    import_menu.Menu.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/alert-banner.tsx
var React8 = __toESM(require("react"));

// src/components/ui/alert.tsx
var import_class_variance_authority11 = require("class-variance-authority");
var import_jsx_runtime32 = require("react/jsx-runtime");
var alertVariants = (0, import_class_variance_authority11.cva)(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "bg-destructive-subtle text-destructive border-destructive/20 *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
        success: "bg-success-subtle text-success border-success/20 *:data-[slot=alert-description]:text-success/90 *:[svg]:text-current",
        warning: "bg-warning-subtle text-warning-foreground border-warning/40 *:data-[slot=alert-description]:text-foreground/80 *:[svg]:text-warning",
        info: "bg-info-subtle text-info border-info/20 *:data-[slot=alert-description]:text-info/90 *:[svg]:text-current"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      ),
      ...props
    }
  );
}
function AlertAction({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "div",
    {
      "data-slot": "alert-action",
      className: cn("absolute top-2 right-2", className),
      ...props
    }
  );
}

// src/components/ui/alert-banner.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var accentColorMap = {
  default: "text-foreground",
  destructive: "text-destructive",
  success: "text-success",
  warning: "text-warning",
  info: "text-info"
};
var primaryBgMap = {
  default: "bg-gradient-banner-default text-white",
  destructive: "bg-gradient-banner-destructive text-white",
  success: "bg-gradient-banner-success text-white",
  warning: "bg-gradient-banner-warning text-gray-950",
  info: "bg-gradient-banner-info text-white"
};
var AlertBanner = React8.forwardRef(
  ({
    className,
    variant,
    icon,
    title,
    action,
    onClose,
    borderless = true,
    appearance = "secondary",
    collapsed = false,
    ...props
  }, ref) => {
    const isPrimary = appearance === "primary";
    const safeVariant = variant || "default";
    const accentColor = isPrimary ? "text-white" : accentColorMap[safeVariant];
    const textColor = isPrimary ? "text-white" : "text-foreground";
    if (collapsed) {
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        Alert,
        {
          ref,
          variant: isPrimary ? void 0 : variant,
          className: cn(
            "flex size-10 items-center justify-center p-0 rounded-xl transition-all duration-200 shrink-0 mx-auto",
            borderless && "border-transparent shadow-none",
            isPrimary && cn("bg-transparent", primaryBgMap[safeVariant]),
            className
          ),
          ...props,
          children: icon && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: cn("flex items-center justify-center [&>svg]:size-4", accentColor), children: icon })
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
      Alert,
      {
        ref,
        variant: isPrimary ? void 0 : variant,
        className: cn(
          "relative flex items-center justify-between gap-2.5 py-2.5 px-3 rounded-lg text-left",
          borderless && "border-transparent shadow-none",
          isPrimary && cn("bg-transparent", primaryBgMap[safeVariant]),
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex flex-1 items-center gap-2.5 min-w-0", children: [
            icon && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: cn("shrink-0 flex items-center justify-center [&>svg]:size-4", accentColor), children: icon }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex-1 text-xs leading-normal min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(AlertTitle, { className: cn("inline font-medium !mb-0 mr-1.5 leading-normal", textColor), children: title }),
              action && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                "button",
                {
                  type: "button",
                  onClick: action.onClick,
                  className: cn(
                    "group inline-flex items-center font-semibold underline underline-offset-4 hover:opacity-80 focus-visible:outline-none rounded-sm align-baseline cursor-pointer whitespace-nowrap",
                    accentColor
                  ),
                  children: action.label
                }
              )
            ] })
          ] }),
          onClose && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: cn(
                "shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer -mr-1",
                textColor
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(XIcon, { className: "size-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    );
  }
);
AlertBanner.displayName = "AlertBanner";

// src/components/ui/app-sidebar.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
function ReusableSidebar({
  brand,
  workspaces,
  activeWorkspaceId,
  onWorkspaceChange,
  navItems,
  bottomCta,
  alertBanner,
  footerItems,
  dropdownClassName
}) {
  const pathname = (0, import_navigation2.usePathname)();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;
  const activeWorkspace = React9.useMemo(() => {
    return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  }, [workspaces, activeWorkspaceId]);
  const [expandedItems, setExpandedItems] = React9.useState(() => {
    const initial = {};
    for (const item of navItems) {
      if (item.items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`))) {
        initial[item.label] = true;
      }
    }
    return initial;
  });
  const [alertDismissed, setAlertDismissed] = React9.useState(false);
  React9.useEffect(() => {
    setAlertDismissed(false);
  }, [alertBanner?.id]);
  const toggleExpand = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(SidebarHeader, { className: "gap-3 px-3 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
        SidebarMenuButton,
        {
          render: brand.href ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_link.default, { href: brand.href }) : void 0,
          tooltip: brand.name,
          size: "lg",
          className: "hover:bg-transparent focus-visible:ring-0 active:bg-transparent px-0! group-data-[collapsible=icon]:w-10",
          onClick: () => setOpenMobile(false),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "size-10 shrink-0 flex items-center justify-center", children: brand.logo }),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "text-lg font-bold tracking-tight text-secondary-foreground truncate", children: brand.name })
          ]
        }
      ) }) }),
      workspaces.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          DropdownMenuTrigger,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
              "button",
              {
                type: "button",
                "aria-label": "Switch workspace",
                className: "flex h-12 w-full items-center gap-3 rounded-lg border border-sidebar-border bg-background px-2.5 text-left text-sm font-medium text-foreground shadow-sm ring-sidebar-ring outline-hidden transition-colors hover:bg-accent/50 focus-visible:ring-2 cursor-pointer group-data-[collapsible=icon]:w-10",
                children: [
                  activeWorkspace.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                    "img",
                    {
                      src: activeWorkspace.logoUrl,
                      alt: "",
                      className: "size-5 shrink-0 rounded object-cover"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      className: "flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white",
                      children: activeWorkspace.fallbackLetter
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "flex-1 min-w-0 flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "truncate font-semibold text-foreground text-sm", children: activeWorkspace.name }),
                    activeWorkspace.subtext && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "truncate text-2xs text-muted-foreground font-normal", children: activeWorkspace.subtext })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ChevronsUpDown, { className: "size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DropdownMenuContent, { side: isMobile ? "bottom" : "right", align: isMobile ? "center" : "start", className: cn("w-64 p-1.5", dropdownClassName), children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DropdownMenuGroup, { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DropdownMenuLabel, { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Workspaces" }),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DropdownMenuSeparator, {}),
            workspaces.map((w) => {
              const isSelected = w.id === activeWorkspace.id;
              return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
                DropdownMenuItem,
                {
                  onClick: () => {
                    onWorkspaceChange(w);
                    setOpenMobile(false);
                  },
                  className: "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm cursor-pointer hover:bg-accent focus:bg-accent",
                  children: [
                    w.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                      "img",
                      {
                        src: w.logoUrl,
                        alt: "",
                        className: "size-5 shrink-0 rounded object-cover"
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white", children: w.fallbackLetter }),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "flex-1 min-w-0 flex flex-col text-left leading-tight", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "font-semibold text-foreground text-sm truncate", children: w.name }),
                      w.subtext && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "text-2xs text-muted-foreground truncate", children: w.subtext })
                    ] }),
                    isSelected && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Check, { className: "size-4 shrink-0 text-primary" })
                  ]
                },
                w.id
              );
            })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DropdownMenuSeparator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            DropdownMenuItem,
            {
              onClick: () => setOpenMobile(false),
              className: "cursor-pointer px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground",
              children: "+ Add workspace"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(SidebarContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarGroup, { className: "p-0 px-3 pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenu, { children: navItems.map(({ href, label, icon: Icon, items, badge }) => {
        const active = href ? pathname === href || pathname.startsWith(`${href}/`) : items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)) || false;
        const isExpanded = !!expandedItems[label];
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenuItem, { children: items && items.length > 0 ? isCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DropdownMenu, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                SidebarMenuButton,
                {
                  isActive: active,
                  tooltip: label,
                  className: "w-full justify-between",
                  children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Icon, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(DropdownMenuContent, { side: "right", align: "start", className: dropdownClassName, children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DropdownMenuLabel, { children: label }) }),
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(DropdownMenuSeparator, {}),
            items.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
              DropdownMenuItem,
              {
                render: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_link.default, { href: sub.href }),
                className: cn(
                  "cursor-pointer",
                  pathname === sub.href && "bg-accent text-accent-foreground font-medium"
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { children: sub.label })
              },
              sub.href
            ))
          ] })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_jsx_runtime34.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
            SidebarMenuButton,
            {
              onClick: () => toggleExpand(label),
              isActive: active,
              tooltip: label,
              className: "w-full justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Icon, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "flex items-center gap-1 group-data-[collapsible=icon]:hidden", children: [
                  badge,
                  /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                    ChevronDown,
                    {
                      className: cn(
                        "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          isExpanded && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenuSub, { children: items.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenuSubItem, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            SidebarMenuSubButton,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_link.default, { href: sub.href }),
              isActive: pathname === sub.href,
              onClick: () => setOpenMobile(false),
              children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { children: sub.label })
            }
          ) }, sub.href)) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
          SidebarMenuButton,
          {
            render: href ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_link.default, { href }) : void 0,
            isActive: active,
            tooltip: label,
            className: "justify-between",
            onClick: () => setOpenMobile(false),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Icon, {}),
                /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
              ] }),
              badge && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "group-data-[collapsible=icon]:hidden", children: badge })
            ]
          }
        ) }, label);
      }) }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "mt-auto flex flex-col", children: [
        footerItems && footerItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "px-3 pb-2 pt-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenu, { children: footerItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
          SidebarMenuButton,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_link.default, { href: item.href }),
            tooltip: item.label,
            onClick: () => setOpenMobile(false),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(item.icon, {}),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { children: item.label })
            ]
          }
        ) }, item.label)) }) }),
        bottomCta && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "px-3 py-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          Button,
          {
            variant: "default",
            className: "w-full justify-start gap-2.5 h-10 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:rounded-lg",
            render: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_link.default, { href: bottomCta.href }),
            onClick: () => setOpenMobile(false),
            children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("span", { className: "flex items-center gap-2.5 w-full justify-start group-data-[collapsible=icon]:justify-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(bottomCta.icon, { className: "size-4 shrink-0" }),
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "group-data-[collapsible=icon]:hidden truncate", children: bottomCta.label })
            ] })
          }
        ) }),
        alertBanner && !alertDismissed && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "p-3 group-data-[collapsible=icon]:p-2 pt-0 group-data-[collapsible=icon]:pt-0", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            TooltipTrigger,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                AlertBanner,
                {
                  collapsed: isCollapsed,
                  variant: alertBanner.variant || "warning",
                  appearance: alertBanner.appearance || "secondary",
                  icon: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AlertCircle, { className: "size-4 shrink-0" }),
                  title: alertBanner.title,
                  action: alertBanner.ctaText ? { label: alertBanner.ctaText, onClick: alertBanner.onCtaClick || (() => {
                  }) } : void 0,
                  onClose: alertBanner.showClose !== false ? () => setAlertDismissed(true) : void 0
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            TooltipContent,
            {
              side: "right",
              align: "center",
              hidden: !isCollapsed || isMobile,
              className: "max-w-xs p-3 text-left",
              children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("p", { className: "font-semibold text-xs text-foreground", children: alertBanner.title })
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}

// src/components/ui/bottom-nav.tsx
var import_link2 = __toESM(require("next/link"));
var import_jsx_runtime35 = require("react/jsx-runtime");
function BottomNav({ items, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    "nav",
    {
      "data-slot": "bottom-nav",
      "aria-label": "Main navigation",
      className: cn(
        // Fixed bar — hidden on desktop where sidebar is present
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "flex h-16 items-stretch border-t border-border bg-card",
        className
      ),
      children: items.map((item, i) => {
        const Icon = item.icon;
        const inner = /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_jsx_runtime35.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
              Icon,
              {
                className: cn(
                  "size-5 transition-colors",
                  item.active ? "text-primary" : "text-muted-foreground"
                ),
                "aria-hidden": true
              }
            ),
            item.badge && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { className: "absolute -top-1 -right-2 flex items-center", children: item.badge })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "span",
            {
              className: cn(
                "text-2xs font-medium leading-none transition-colors",
                item.active ? "text-primary" : "text-muted-foreground"
              ),
              children: item.label
            }
          )
        ] });
        const sharedClass = "flex flex-1 flex-col items-center justify-center gap-1 py-2 touch-manipulation";
        if (item.href) {
          return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            import_link2.default,
            {
              href: item.href,
              "aria-current": item.active ? "page" : void 0,
              className: sharedClass,
              children: inner
            },
            i
          );
        }
        return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          "button",
          {
            type: "button",
            onClick: item.onClick,
            className: sharedClass,
            "aria-label": item.label,
            children: inner
          },
          i
        );
      })
    }
  );
}

// src/components/ui/dialog.tsx
var import_dialog2 = require("@base-ui/react/dialog");
var import_jsx_runtime36 = require("react/jsx-runtime");
function Dialog({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_dialog2.Dialog.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_dialog2.Dialog.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_dialog2.Dialog.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_dialog2.Dialog.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    import_dialog2.Dialog.Backdrop,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(DialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(DialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
      import_dialog2.Dialog.Popup,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
            import_dialog2.Dialog.Close,
            {
              "data-slot": "dialog-close",
              render: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-2 right-2",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
                  XIcon,
                  {}
                ),
                /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_dialog2.Dialog.Close, { render: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Button, { variant: "outline" }), children: "Close" })
      ]
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    import_dialog2.Dialog.Title,
    {
      "data-slot": "dialog-title",
      className: cn(
        "font-heading text-base leading-none font-medium",
        className
      ),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    import_dialog2.Dialog.Description,
    {
      "data-slot": "dialog-description",
      className: cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/alert-dialog.tsx
var import_alert_dialog = require("@base-ui/react/alert-dialog");
var import_jsx_runtime37 = require("react/jsx-runtime");
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_alert_dialog.AlertDialog.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_alert_dialog.AlertDialog.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_alert_dialog.AlertDialog.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_alert_dialog.AlertDialog.Backdrop,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(AlertDialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(AlertDialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
      import_alert_dialog.AlertDialog.Popup,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      ),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogMedia({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_alert_dialog.AlertDialog.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn(
        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_alert_dialog.AlertDialog.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    Button,
    {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_alert_dialog.AlertDialog.Close,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      render: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Button, { variant, size }),
      ...props
    }
  );
}

// src/components/ui/sonner.tsx
var import_next_themes = require("next-themes");
var import_sonner = require("sonner");
var import_jsx_runtime38 = require("react/jsx-runtime");
var Toaster = ({ ...props }) => {
  const { theme = "system" } = (0, import_next_themes.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    import_sonner.Toaster,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Loader2Icon, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      toastOptions: {
        classNames: {
          toast: "cn-toast"
        }
      },
      ...props
    }
  );
};

// src/components/ui/table.tsx
var React10 = __toESM(require("react"));
var import_jsx_runtime39 = require("react/jsx-runtime");
function Table({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("bg-muted/60 [&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  );
}
function TableCaption({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("mt-4 text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function SortableTableHead({
  children,
  sort = null,
  onSortChange,
  resizable = false,
  onResize,
  className,
  ...props
}) {
  const lastXRef = React10.useRef(null);
  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    lastXRef.current = e.clientX;
    const handleMove = (ev) => {
      if (lastXRef.current == null) return;
      const delta = ev.clientX - lastXRef.current;
      lastXRef.current = ev.clientX;
      onResize?.(delta);
    };
    const handleUp = () => {
      lastXRef.current = null;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      document.body.style.cursor = "";
    };
    document.body.style.cursor = "col-resize";
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };
  const nextSort = () => {
    if (sort === "asc") return "desc";
    if (sort === "desc") return null;
    return "asc";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
    TableHead,
    {
      className: cn("relative select-none", className),
      "aria-sort": sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none",
      ...props,
      children: [
        onSortChange ? /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => onSortChange(nextSort()),
            className: "group/sort inline-flex items-center gap-1.5 text-left font-medium text-foreground hover:text-foreground",
            children: [
              children,
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SortIcon, { direction: sort })
            ]
          }
        ) : children,
        resizable ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          "span",
          {
            role: "separator",
            "aria-orientation": "vertical",
            "aria-label": "Resize column",
            onPointerDown: handlePointerDown,
            onDoubleClick: (e) => e.stopPropagation(),
            className: "group/resize absolute top-0 right-0 bottom-0 z-10 flex w-3 cursor-col-resize touch-none items-center justify-center",
            children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              "span",
              {
                "aria-hidden": true,
                className: "h-4 w-px bg-border transition-all group-hover/resize:h-full group-hover/resize:w-0.5 group-hover/resize:bg-primary"
              }
            )
          }
        ) : null
      ]
    }
  );
}
function SortIcon({ direction }) {
  if (direction === "asc") {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ArrowUp, { className: "size-3.5 text-foreground", "aria-hidden": true });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ArrowDown, { className: "size-3.5 text-foreground", "aria-hidden": true });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    ArrowUpDown,
    {
      className: "size-3.5 text-muted-foreground/60 group-hover/sort:text-muted-foreground",
      "aria-hidden": true
    }
  );
}

// src/components/ui/accordion.tsx
var import_accordion = require("@base-ui/react/accordion");
var import_jsx_runtime40 = require("react/jsx-runtime");
function Accordion({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    import_accordion.Accordion.Root,
    {
      "data-slot": "accordion",
      className: cn("flex w-full flex-col", className),
      ...props
    }
  );
}
function AccordionItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    import_accordion.Accordion.Item,
    {
      "data-slot": "accordion-item",
      className: cn("not-last:border-b", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_accordion.Accordion.Header, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    import_accordion.Accordion.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ChevronDownIcon, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ChevronUpIcon, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    import_accordion.Accordion.Panel,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        "div",
        {
          className: cn(
            "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
            className
          ),
          children
        }
      )
    }
  );
}

// src/components/ui/logo-apna.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
function ApnaLogo({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
    "svg",
    {
      width: "37",
      height: "37",
      viewBox: "0 0 37 37",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "Apna",
      role: "img",
      className: cn("size-9 shrink-0", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7.71875 0.5H29.2812C33.2681 0.5 36.5 3.73194 36.5 7.71875V29.2812C36.5 33.2681 33.2681 36.5 29.2812 36.5H7.71875C3.73194 36.5 0.5 33.2681 0.5 29.2812V7.71875C0.5 3.73194 3.73194 0.5 7.71875 0.5Z",
            fill: "white",
            stroke: "#DFE1E6"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
          "path",
          {
            d: "M35.9688 32C34.8948 34.639 32.306 36.5 29.2812 36.5H24.501V32H35.9688Z",
            fill: "#FFD166"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
          "path",
          {
            d: "M12.5 36.5H7.71875C4.69395 36.5 2.10519 34.639 1.03125 32H12.5V36.5Z",
            fill: "#2BB793"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("rect", { x: "12.502", y: "32", width: "12", height: "4.5", fill: "#83BDE4" }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M10.358 19.952C10.358 20.1947 10.3883 20.3745 10.449 20.4915C10.5096 20.6085 10.618 20.6974 10.774 20.758L10.254 22.409C9.78598 22.3744 9.40465 22.2855 9.10998 22.1425C8.81531 21.9995 8.57265 21.7677 8.38198 21.447C7.93131 22.123 7.23365 22.461 6.28898 22.461C5.60431 22.461 5.05181 22.2552 4.63148 21.8435C4.21114 21.4319 4.00098 20.901 4.00098 20.251C4.00098 19.4797 4.28697 18.8904 4.85898 18.483C5.43098 18.0757 6.26297 17.872 7.35498 17.872H7.84898V17.703C7.84898 17.3564 7.77964 17.1224 7.64098 17.001C7.50231 16.8797 7.23798 16.819 6.84798 16.819C6.63998 16.819 6.37348 16.8515 6.04848 16.9165C5.72348 16.9815 5.39198 17.0704 5.05398 17.183L4.49498 15.545C4.91965 15.3717 5.38114 15.2374 5.87948 15.142C6.37781 15.0467 6.83064 14.999 7.23798 14.999C8.32998 14.999 9.12297 15.2092 9.61698 15.6295C10.111 16.0499 10.358 16.6934 10.358 17.56V19.952ZM7.08313 20.6537C7.23913 20.6537 7.3843 20.6147 7.51863 20.5367C7.65297 20.4587 7.76347 20.3591 7.85013 20.2377V19.2107H7.57713C7.21313 19.2107 6.94447 19.2757 6.77113 19.4057C6.5978 19.5357 6.51113 19.7351 6.51113 20.0037C6.51113 20.2031 6.56313 20.3612 6.66713 20.4782C6.77113 20.5952 6.9098 20.6537 7.08313 20.6537ZM17.8159 15.974C17.3782 15.324 16.7304 14.999 15.8724 14.999C15.5257 14.999 15.1812 15.0727 14.8389 15.22C14.4965 15.3674 14.1867 15.6057 13.9094 15.935L13.8054 15.259H11.5174V25.152L14.0914 24.892V21.772C14.5074 22.2314 15.0447 22.461 15.7034 22.461C16.2494 22.461 16.7325 22.2985 17.1529 21.9735C17.5732 21.6485 17.8982 21.2022 18.1279 20.6345C18.3576 20.0669 18.4724 19.4234 18.4724 18.704C18.4724 17.534 18.2536 16.624 17.8159 15.974ZM14.8578 20.6277C15.5078 20.6277 15.8328 19.9994 15.8328 18.7427C15.8328 18.2141 15.7982 17.8111 15.7288 17.5337C15.6595 17.2564 15.5663 17.0722 15.4493 16.9812C15.3323 16.8902 15.1828 16.8447 15.0008 16.8447C14.6368 16.8447 14.3335 17.0614 14.0908 17.4947V20.1467C14.2035 20.3201 14.3205 20.4436 14.4418 20.5172C14.5632 20.5909 14.7018 20.6277 14.8578 20.6277ZM25.2095 15.545C24.8758 15.181 24.4186 14.999 23.838 14.999C23.422 14.999 23.0471 15.077 22.7135 15.233C22.3798 15.389 22.0526 15.636 21.732 15.974L21.55 15.259H19.301V22.201H21.875V17.56C22.1696 17.1007 22.46 16.871 22.746 16.871C22.876 16.871 22.9735 16.9187 23.0385 17.014C23.1035 17.1094 23.136 17.287 23.136 17.547V22.201H25.71V17.079C25.71 16.4204 25.5431 15.909 25.2095 15.545ZM32.7455 19.952C32.7455 20.1947 32.7758 20.3745 32.8365 20.4915C32.8971 20.6085 33.0055 20.6974 33.1615 20.758L32.6415 22.409C32.1735 22.3744 31.7921 22.2855 31.4975 22.1425C31.2028 21.9995 30.9601 21.7677 30.7695 21.447C30.3188 22.123 29.6211 22.461 28.6765 22.461C27.9918 22.461 27.4393 22.2552 27.019 21.8435C26.5986 21.4319 26.3885 20.901 26.3885 20.251C26.3885 19.4797 26.6745 18.8904 27.2465 18.483C27.8185 18.0757 28.6505 17.872 29.7425 17.872H30.2365V17.703C30.2365 17.3564 30.1671 17.1224 30.0285 17.001C29.8898 16.8797 29.6255 16.819 29.2355 16.819C29.0275 16.819 28.761 16.8515 28.436 16.9165C28.111 16.9815 27.7795 17.0704 27.4415 17.183L26.8825 15.545C27.3071 15.3717 27.7686 15.2374 28.267 15.142C28.7653 15.0467 29.2181 14.999 29.6255 14.999C30.7175 14.999 31.5105 15.2092 32.0045 15.6295C32.4985 16.0499 32.7455 16.6934 32.7455 17.56V19.952ZM29.9061 20.5367C29.7718 20.6147 29.6266 20.6537 29.4706 20.6537C29.2973 20.6537 29.1586 20.5952 29.0546 20.4782C28.9506 20.3612 28.8986 20.2031 28.8986 20.0037C28.8986 19.7351 28.9853 19.5357 29.1586 19.4057C29.332 19.2757 29.6006 19.2107 29.9646 19.2107H30.2376V20.2377C30.151 20.3591 30.0405 20.4587 29.9061 20.5367Z",
            fill: "#4D3951"
          }
        )
      ]
    }
  );
}

// src/components/ui/logo-onlyrounds.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
var STOPS = {
  green300: "#74D7AE",
  green400: "#3EBA8D",
  gold300: "#FFD975",
  sky400: "#7BB9E5"
};
function MarkGradients({ prefix }) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("defs", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-0`,
        x1: "9.67724",
        y1: "5.18445",
        x2: "2.28946",
        y2: "32.7183",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.green300 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.sky400 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-1`,
        x1: "28.3601",
        y1: "28.3822",
        x2: "38.7089",
        y2: "28.3822",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.gold300 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.green400 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-2`,
        x1: "32.6782",
        y1: "29.0672",
        x2: "36.8885",
        y2: "31.495",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-3`,
        x1: "13.4626",
        y1: "2.38751",
        x2: "27.0854",
        y2: "15.9916",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.gold300 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.green300, stopOpacity: "0.99" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-4`,
        x1: "5.89046",
        y1: "13.4828",
        x2: "1.11813",
        y2: "10.3991",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.green300 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-5`,
        x1: "35.7645",
        y1: "11.0953",
        x2: "23.256",
        y2: "33.6919",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-6`,
        x1: "15.632",
        y1: "30.0551",
        x2: "18.6601",
        y2: "41.3405",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { stopColor: STOPS.green300 }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    )
  ] });
}
function MarkPaths({ prefix }) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_jsx_runtime42.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M19.3545 10.2914C19.2335 10.4971 19.1194 10.7076 19.0125 10.9219L16.3556 15.5005L15.5775 16.8412L14.1615 19.2813L13.3699 20.6452L10.6999 25.2461C10.5725 25.4368 10.4509 25.6324 10.3363 25.8318C9.46695 27.3425 8.96972 29.0927 8.96972 30.9586C8.96972 32.6467 9.37683 34.2404 10.0984 35.6476C10.1778 35.8023 10.2615 35.9558 10.3484 36.1061H9.80956C4.34191 35.8097 0 31.3044 0 25.7901C0 24.0999 0.408027 22.5043 1.13122 21.0957L1.38486 20.6588L1.39265 20.6452L1.66253 20.18L10.0984 5.64342L10.3647 5.18445H10.9593C14.5435 5.37877 17.6437 7.38144 19.3545 10.2914Z", fill: `url(#${prefix}-0)` }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M38.7089 25.7897C38.7089 31.3039 34.367 35.809 28.899 36.1055H28.3601C28.4471 35.9554 28.5307 35.8026 28.6101 35.6477L37.047 21.1086C37.1428 20.9613 37.2353 20.8111 37.324 20.6584L37.577 21.0943C38.301 22.5031 38.7089 24.099 38.7089 25.7897Z", fill: `url(#${prefix}-1)` }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M38.7089 25.7897C38.7089 31.3039 34.367 35.809 28.899 36.1055H28.3601C28.4471 35.9554 28.5307 35.8026 28.6101 35.6477L37.047 21.1086C37.1428 20.9613 37.2353 20.8111 37.324 20.6584L37.577 21.0943C38.301 22.5031 38.7089 24.099 38.7089 25.7897Z", fill: `url(#${prefix}-2)` }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M29.7377 10.3317C29.7377 12.1974 29.2406 13.9475 28.3711 15.4582C28.2564 15.6578 28.135 15.853 28.0072 16.044L25.3374 20.6448L24.5458 19.2809L23.1299 16.8409L22.3517 15.5001L19.6948 10.9216C19.5883 10.707 19.4741 10.4967 19.3529 10.291C17.6421 7.3813 14.5419 5.37863 10.9577 5.18406C10.7674 5.17363 10.5758 5.16837 10.3829 5.16837H10.3722L10.6354 4.71508C12.4867 1.87707 15.6994 0 19.3532 0C23.0068 0 26.2196 1.87707 28.0707 4.71508L28.3338 5.16837L28.3431 5.18406L28.6093 5.64303C29.331 7.05023 29.7377 8.64377 29.7377 10.3317Z", fill: `url(#${prefix}-3)` }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M10.3484 5.18445C10.2613 5.33509 10.1778 5.48801 10.0984 5.64342L1.66253 20.1803C1.56623 20.3283 1.4736 20.4788 1.38486 20.6318L1.13237 20.1965C0.408254 18.7878 0 17.1914 0 15.5005C0 9.98624 4.34191 5.48118 9.80978 5.18445H10.3484Z", fill: `url(#${prefix}-4)` }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M38.7097 15.5005C38.7097 17.1914 38.3013 18.7878 37.5773 20.1965L37.3246 20.6318L37.317 20.6454L37.0477 21.1094L28.6112 35.6479L28.345 36.1063H27.7504C24.1663 35.912 21.0661 33.9093 19.3553 30.9996C19.4765 30.7934 19.5907 30.5827 19.6977 30.3679L19.6984 30.3665L22.3542 25.7901L23.1323 24.4494L24.5483 22.0092L25.3399 20.6452L28.0097 16.0444C28.1372 15.8534 28.2586 15.6579 28.3735 15.4586C29.2428 13.9479 29.7403 12.1978 29.7403 10.3321C29.7403 8.64389 29.3332 7.05059 28.6115 5.64342C28.5321 5.48801 28.4485 5.33509 28.3613 5.18445H28.9001C34.3679 5.48118 38.7097 9.98624 38.7097 15.5005Z", fill: `url(#${prefix}-5)` }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M28.3348 36.1218L28.0721 36.5749C26.221 39.4124 23.0077 41.2904 19.3543 41.2904C15.7008 41.2904 12.4883 39.4133 10.6371 36.5757L10.3736 36.1218L10.3647 36.1064L10.0987 35.6482C9.37684 34.241 8.96973 32.6471 8.96973 30.9587C8.96973 29.093 9.46673 27.3426 10.3363 25.8318C10.4509 25.6327 10.5721 25.4378 10.6995 25.2471L13.3699 20.6453L14.1615 22.0093L15.5775 24.4495L16.3556 25.7903L19.0119 30.3677C19.1187 30.5828 19.2329 30.7935 19.3543 30.9993C21.065 33.909 24.1653 35.9117 27.7494 36.1064C27.9397 36.1167 28.1315 36.1218 28.3243 36.1218H28.3348Z", fill: `url(#${prefix}-6)` })
  ] });
}
function OnlyRoundsLogo({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
    "svg",
    {
      viewBox: "0 0 248 42",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "OnlyRound AI",
      role: "img",
      className: cn("h-8 w-auto", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(MarkPaths, { prefix: "or-logo" }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
          "path",
          {
            d: "M106.152 27.5463L110.504 16.5062H115.143L107.88 33.8822C107.432 34.9489 106.962 35.8879 106.471 36.6986C105.981 37.5303 105.373 38.1706 104.648 38.6185C103.944 39.0665 103.016 39.2904 101.864 39.2904C101.288 39.2904 100.648 39.1725 99.944 38.9379C99.2614 38.7246 98.6531 38.4689 98.1198 38.1703L99.6872 34.7465C100.05 34.9384 100.381 35.088 100.679 35.1947C100.999 35.3227 101.277 35.3861 101.511 35.3861C101.959 35.3861 102.355 35.2583 102.696 35.0023C103.037 34.7677 103.315 34.4158 103.528 33.9467L104.2 32.3138L96.9675 16.5062H101.608L106.152 27.5463ZM58.1657 9.75427C60.427 9.75428 62.4112 10.2555 64.1179 11.2582C65.8457 12.2394 67.2001 13.6048 68.1814 15.3539C69.1627 17.0819 69.654 19.0769 69.654 21.3383C69.654 23.5783 69.1627 25.5733 68.1814 27.3226C67.2214 29.0503 65.8778 30.4158 64.1501 31.4183C62.4434 32.3997 60.4801 32.89 58.2614 32.89C56.0002 32.89 53.995 32.3996 52.2458 31.4183C50.5178 30.4157 49.1627 29.0506 48.1814 27.3226C47.2 25.5733 46.7097 23.5783 46.7097 21.3383C46.7097 19.0558 47.2002 17.0505 48.1814 15.3226C49.1627 13.5733 50.5069 12.2073 52.2136 11.226C53.9416 10.2446 55.9258 9.75427 58.1657 9.75427ZM145.182 16.1224C146.825 16.1225 148.275 16.4851 149.534 17.2103C150.793 17.9143 151.774 18.896 152.478 20.1547C153.182 21.4132 153.534 22.8637 153.534 24.5062C153.534 26.1487 153.182 27.5992 152.478 28.8578C151.774 30.1165 150.793 31.109 149.534 31.8344C148.297 32.5382 146.867 32.89 145.246 32.89C143.625 32.89 142.174 32.5383 140.894 31.8344C139.636 31.109 138.644 30.1165 137.919 28.8578C137.215 27.5992 136.862 26.1488 136.862 24.5062C136.862 22.8636 137.215 21.4133 137.919 20.1547C138.623 18.8961 139.603 17.9143 140.862 17.2103C142.121 16.485 143.561 16.1224 145.182 16.1224ZM160.256 24.6986C160.256 25.765 160.374 26.6074 160.608 27.226C160.864 27.8233 161.216 28.2611 161.664 28.5385C162.133 28.7945 162.656 28.9222 163.232 28.9222C164.341 28.9435 165.184 28.6126 165.759 27.9301C166.335 27.2261 166.624 26.2127 166.624 24.89V16.5062H170.848V32.5062H166.88L166.72 30.3304C166.187 31.1411 165.514 31.7701 164.704 32.2181C163.915 32.6661 163.019 32.89 162.016 32.89C160.736 32.89 159.648 32.6344 158.752 32.1224C157.877 31.6104 157.205 30.8209 156.736 29.7543C156.267 28.6663 156.032 27.2686 156.032 25.5619V16.5062H160.256V24.6986ZM208.087 32.5062H204.087L203.959 30.266C203.425 31.098 202.743 31.7488 201.911 32.2181C201.079 32.6661 200.13 32.89 199.063 32.89C197.591 32.89 196.311 32.5491 195.223 31.8666C194.157 31.184 193.325 30.213 192.727 28.9545C192.13 27.6958 191.831 26.2129 191.831 24.5062C191.831 22.7782 192.13 21.2953 192.727 20.058C193.325 18.7995 194.157 17.8285 195.223 17.1459C196.311 16.4634 197.591 16.1224 199.063 16.1224C200.108 16.1225 201.037 16.3463 201.847 16.7943C202.679 17.2209 203.351 17.8394 203.863 18.6498V10.1058H208.087V32.5062ZM81.4655 16.1224C82.7239 16.1225 83.8011 16.3782 84.697 16.89C85.593 17.402 86.2755 18.2024 86.7448 19.2904C87.2141 20.3571 87.438 21.7439 87.4167 23.4506V32.5062H83.1931V24.3138C83.193 23.2262 83.0652 22.3838 82.8093 21.7865C82.5746 21.1892 82.2329 20.7622 81.7849 20.5062C81.337 20.229 80.8146 20.0903 80.2175 20.0902C79.1295 20.0689 78.2865 20.3997 77.6892 21.0824C77.1132 21.7651 76.8249 22.7785 76.8249 24.1224V32.5062H72.6013V16.5062H76.569L76.7614 18.682C77.2734 17.8501 77.9243 17.2209 78.7136 16.7943C79.5242 16.3464 80.4416 16.1224 81.4655 16.1224ZM95.0124 32.5062H90.7888V10.1058H95.0124V32.5062ZM126.029 10.1058C127.608 10.1058 129.005 10.4159 130.221 11.0345C131.437 11.6532 132.386 12.5063 133.069 13.5941C133.752 14.6608 134.093 15.9089 134.093 17.3383C134.093 18.8102 133.698 20.1119 132.909 21.2426C132.12 22.3516 131.085 23.194 129.805 23.7699L134.989 32.5062H130.029L125.453 24.5707H122.093V32.5062H117.71V10.1058H126.029ZM183.372 16.1224C184.63 16.1225 185.707 16.3781 186.603 16.89C187.499 17.402 188.182 18.2024 188.651 19.2904C189.12 20.3571 189.344 21.7439 189.323 23.4506V32.5062H185.099V24.3138C185.099 23.2262 184.971 22.3838 184.716 21.7865C184.481 21.1892 184.139 20.7622 183.691 20.5062C183.243 20.229 182.721 20.0903 182.124 20.0902C181.036 20.0689 180.193 20.3997 179.595 21.0824C179.019 21.7651 178.731 22.7785 178.731 24.1224V32.5062H174.508V16.5062H178.475L178.668 18.682C179.18 17.8501 179.831 17.2209 180.62 16.7943C181.43 16.3464 182.348 16.1224 183.372 16.1224ZM240.119 32.5062H235.479L233.559 27.5785H224.343L222.424 32.5062H217.783L226.615 10.1058H231.287L240.119 32.5062ZM247.187 32.5062H242.802V10.1058H247.187V32.5062ZM200.119 20.0258C199.351 20.0258 198.668 20.218 198.071 20.6019C197.495 20.9646 197.036 21.4876 196.695 22.1703C196.375 22.8529 196.215 23.6316 196.215 24.5062C196.215 25.3809 196.386 26.1595 196.727 26.8422C197.069 27.5248 197.527 28.0578 198.103 28.4418C198.701 28.8258 199.383 29.0179 200.151 29.0179C200.855 29.0179 201.473 28.8474 202.007 28.5062C202.561 28.1436 202.999 27.6423 203.319 27.0023C203.639 26.3624 203.82 25.6371 203.863 24.8265V24.1859C203.82 23.3754 203.639 22.6609 203.319 22.0424C202.999 21.4024 202.561 20.912 202.007 20.5707C201.452 20.208 200.823 20.0258 200.119 20.0258ZM145.182 20.0258C144.414 20.0258 143.721 20.218 143.102 20.6019C142.505 20.9859 142.035 21.5198 141.694 22.2025C141.353 22.8638 141.182 23.6317 141.182 24.5062C141.182 25.3808 141.353 26.1595 141.694 26.8422C142.035 27.5035 142.516 28.0265 143.134 28.4105C143.753 28.7943 144.457 28.9857 145.246 28.9857C146.035 28.9857 146.729 28.7944 147.326 28.4105C147.923 28.0265 148.382 27.5034 148.702 26.8422C149.043 26.1595 149.215 25.3809 149.215 24.5062C149.215 23.6316 149.043 22.8638 148.702 22.2025C148.361 21.5199 147.881 20.9859 147.262 20.6019C146.665 20.218 145.972 20.0258 145.182 20.0258ZM58.1657 13.7543C56.8217 13.7543 55.6162 14.0851 54.5495 14.7465C53.5043 15.3864 52.6829 16.2721 52.0856 17.4027C51.4884 18.5333 51.1901 19.8451 51.1901 21.3383C51.1901 22.8103 51.4883 24.1119 52.0856 25.2426C52.683 26.3731 53.5152 27.2688 54.5817 27.9301C55.6483 28.57 56.8749 28.89 58.2614 28.89C59.6267 28.89 60.8214 28.57 61.8454 27.9301C62.8907 27.2687 63.702 26.3732 64.278 25.2426C64.8754 24.1119 65.1735 22.8103 65.1735 21.3383C65.1735 19.8451 64.8752 18.5333 64.278 17.4027C63.6807 16.272 62.8585 15.3865 61.8132 14.7465C60.7679 14.0852 59.5523 13.7543 58.1657 13.7543ZM225.783 23.7064H232.119L228.951 15.5785L225.783 23.7064ZM122.093 20.5707H126.061C126.722 20.5707 127.309 20.4319 127.821 20.1547C128.354 19.8774 128.77 19.4929 129.069 19.0023C129.389 18.5117 129.55 17.9569 129.55 17.3383C129.55 16.3783 129.197 15.5997 128.493 15.0023C127.81 14.4051 126.925 14.1059 125.838 14.1058H122.093V20.5707Z",
            fill: "var(--foreground)"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(MarkGradients, { prefix: "or-logo" })
      ]
    }
  );
}
function OnlyRoundsLogoMark({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
    "svg",
    {
      viewBox: "0 0 39 42",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "OnlyRound AI",
      role: "img",
      className: cn("h-6 w-auto", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(MarkPaths, { prefix: "or-mark" }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(MarkGradients, { prefix: "or-mark" })
      ]
    }
  );
}

// src/components/ui/logo-apna-unlimited.tsx
var React11 = __toESM(require("react"));
var import_jsx_runtime43 = require("react/jsx-runtime");
var PATH_D = "M23.3838 0C25.0739 5.87573e-05 26.3498 0.640541 27.2119 1.9209C28.074 3.20122 28.5048 4.99341 28.5049 7.29785C28.5049 8.71485 28.2796 9.98333 27.8271 11.1016C27.3747 12.2197 26.7342 13.0991 25.9062 13.7393C25.0783 14.3794 24.1263 14.6992 23.0508 14.6992C21.7533 14.6992 20.6945 14.2466 19.875 13.3418V19.4883L14.8047 20V0.511719H19.3115L19.5166 1.84375C20.0629 1.19504 20.6733 0.725775 21.3477 0.435547C22.022 0.145319 22.7009 0 23.3838 0ZM87.8594 0.557617C89.777 0.557719 91.5858 1.30074 92.9365 2.63477H92.9453L92.9541 2.62598C94.3046 3.95996 95.0546 5.73596 95.0547 7.62012C95.0547 9.37113 94.4043 11.0557 93.2119 12.3564L92.9707 12.6064C90.3775 15.1663 86.2667 15.3997 83.415 13.165L71.3662 3.75977C70.4573 3.05935 69.3729 2.68457 68.2139 2.68457C66.8549 2.68465 65.5794 3.20144 64.6289 4.14355C63.6784 5.07744 63.1611 6.31146 63.1611 7.62891C63.1611 8.94635 63.6867 10.1804 64.6289 11.1143L64.8203 11.2891C66.6464 12.9234 69.4151 13.0152 71.3662 11.4893L74.2764 9.22168L75.9854 10.5723L72.667 13.165C71.3496 14.1906 69.7819 14.7001 68.2061 14.7002C66.4717 14.7002 64.7454 14.0827 63.3779 12.8486L63.1445 12.6406C61.7771 11.2898 61.0264 9.51335 61.0264 7.62891C61.0264 5.74456 61.7773 3.96886 63.1279 2.63477C64.4871 1.30065 66.2883 0.557617 68.2061 0.557617C69.8152 0.557666 71.3909 1.10018 72.6582 2.08398L84.7236 11.4893C86.7331 13.0568 89.6354 12.8982 91.4531 11.1055L91.6445 10.9062C92.4533 10.0224 92.9121 8.85463 92.9121 7.62891C92.9121 6.31146 92.3866 5.07744 91.4443 4.14355C90.4939 3.20143 89.2183 2.68467 87.8594 2.68457C86.7004 2.68457 85.6076 3.05103 84.707 3.75977L81.8301 6.00293L80.1211 4.64355L83.4062 2.08398C84.6653 1.10007 86.2418 0.557617 87.8594 0.557617ZM6.37695 0C8.52793 4.50261e-05 10.0904 0.41423 11.0635 1.24219C12.0364 2.0702 12.5225 3.33791 12.5225 5.04492V9.75684C12.5225 10.2348 12.5827 10.5889 12.7021 10.8193C12.8216 11.0497 13.0346 11.2252 13.3418 11.3447L12.3174 14.5967C11.3957 14.5284 10.6448 14.3529 10.0645 14.0713C9.48406 13.7896 9.00546 13.3337 8.62988 12.7021C7.7421 14.0335 6.36753 14.6992 4.50684 14.6992C3.15824 14.6992 2.07015 14.2933 1.24219 13.4824C0.414207 12.6715 0 11.6261 0 10.3457C1.41448e-06 8.82628 0.563636 7.66567 1.69043 6.86328C2.81722 6.0609 4.45629 5.65918 6.60742 5.65918H7.58008V5.32617C7.58003 4.64354 7.44396 4.18235 7.1709 3.94336C6.89774 3.70436 6.37663 3.58497 5.6084 3.58496C5.19865 3.58496 4.67343 3.6493 4.0332 3.77734C3.39306 3.90538 2.73997 4.07985 2.07422 4.30176L0.972656 1.0752C1.80916 0.733773 2.71859 0.469042 3.7002 0.28125C4.68187 0.0934557 5.57454 0 6.37695 0ZM50.4736 0C52.6248 0 54.187 0.414185 55.1602 1.24219C56.1333 2.07019 56.6201 3.33773 56.6201 5.04492V9.75684C56.6201 10.2346 56.6794 10.5889 56.7988 10.8193C56.9183 11.0498 57.1321 11.2252 57.4395 11.3447L56.415 14.5967C55.4931 14.5284 54.7416 14.353 54.1611 14.0713C53.581 13.7896 53.103 13.3334 52.7275 12.7021C51.8398 14.0336 50.4652 14.6992 48.6045 14.6992C47.2558 14.6992 46.1669 14.2934 45.3389 13.4824C44.5111 12.6715 44.0977 11.6259 44.0977 10.3457C44.0977 8.82643 44.6605 7.66567 45.7871 6.86328C46.9139 6.06091 48.553 5.6592 50.7041 5.65918H51.6777V5.32617C51.6777 4.64347 51.5407 4.18233 51.2676 3.94336C50.9944 3.70447 50.4731 3.58496 49.7051 3.58496C49.2954 3.58501 48.7707 3.64938 48.1309 3.77734C47.4908 3.90536 46.8376 4.07989 46.1719 4.30176L45.0703 1.0752C45.9068 0.733767 46.8162 0.469038 47.7979 0.28125C48.7794 0.0934997 49.6713 1.4877e-05 50.4736 0ZM100.642 9.53516C100.642 10.1645 100.779 10.7239 101.056 11.2129C101.336 11.7017 101.733 12.0865 102.244 12.3672C102.756 12.6433 103.363 12.7812 104.064 12.7812C104.771 12.7812 105.38 12.6433 105.892 12.3672C106.407 12.0865 106.802 11.7017 107.073 11.2129C107.349 10.7239 107.487 10.1644 107.487 9.53516V0.556641H109.593V9.70508C109.593 10.6784 109.363 11.5414 108.906 12.293C108.449 13.0397 107.806 13.6286 106.978 14.0586C106.149 14.484 105.178 14.6962 104.064 14.6963C102.955 14.6963 101.986 14.4841 101.157 14.0586C100.329 13.6285 99.6858 13.0398 99.2285 12.293C98.7712 11.5414 98.543 10.6785 98.543 9.70508V0.556641H100.642V9.53516ZM166.458 3.89746C167.047 3.89749 167.618 3.99577 168.17 4.19043C168.722 4.38513 169.218 4.69009 169.657 5.10645C170.096 5.52298 170.443 6.06497 170.696 6.73047C170.95 7.39131 171.076 8.19479 171.076 9.14062V9.86133H163.663C163.679 10.497 163.799 11.0428 164.026 11.498C164.275 11.9868 164.622 12.3601 165.065 12.6182C165.509 12.8716 166.028 12.999 166.621 12.999C167.006 12.999 167.357 12.9446 167.674 12.8359C167.991 12.7228 168.264 12.5547 168.495 12.333C168.726 12.1113 168.903 11.8375 169.025 11.5117L170.947 11.8574C170.793 12.4232 170.517 12.9192 170.119 13.3447C169.725 13.7657 169.228 14.0946 168.631 14.3301C168.038 14.5608 167.361 14.6758 166.601 14.6758C165.573 14.6758 164.688 14.4566 163.945 14.0176C163.207 13.5739 162.636 12.9508 162.233 12.1494C161.835 11.3436 161.636 10.3994 161.636 9.31738C161.636 8.24894 161.835 7.30712 162.233 6.49219C162.636 5.67729 163.198 5.04126 163.918 4.58398C164.642 4.12678 165.489 3.89747 166.458 3.89746ZM182.402 14.4658H180.42V12.8428H180.25C180.128 13.0646 179.951 13.3183 179.72 13.6035C179.493 13.8885 179.181 14.1379 178.783 14.3506C178.385 14.5634 177.868 14.6699 177.234 14.6699C176.392 14.6699 175.64 14.4545 174.979 14.0244C174.323 13.5898 173.806 12.9713 173.431 12.1699C173.06 11.3641 172.874 10.3976 172.874 9.27051C172.874 8.14315 173.062 7.17834 173.438 6.37695C173.818 5.5756 174.339 4.96172 175 4.53613C175.661 4.11071 176.411 3.89844 177.248 3.89844C177.895 3.89848 178.416 4.00654 178.81 4.22363C179.208 4.43631 179.516 4.68568 179.733 4.9707C179.955 5.25579 180.128 5.50737 180.25 5.72461H180.372V0.556641H182.402V14.4658ZM157.832 4.0332H159.971V5.66309H157.832V11.4023C157.832 11.7961 157.89 12.0928 158.008 12.292C158.125 12.4865 158.277 12.6199 158.463 12.6924C158.653 12.7602 158.859 12.7949 159.081 12.7949C159.244 12.7949 159.387 12.7833 159.509 12.7607C159.631 12.7382 159.726 12.7196 159.794 12.7061L160.161 14.3838C160.043 14.429 159.875 14.4743 159.658 14.5195C159.441 14.5693 159.169 14.597 158.844 14.6016C158.31 14.6106 157.811 14.5155 157.35 14.3164C156.888 14.1172 156.514 13.809 156.229 13.3926C155.943 12.976 155.801 12.4526 155.801 11.8232V5.66309H154.272V4.0332H155.801V1.53418H157.832V4.0332ZM117.637 3.89746C118.347 3.8975 118.971 4.04695 119.505 4.3457C120.039 4.64 120.454 5.08007 120.748 5.66406C121.042 6.248 121.189 6.97016 121.189 7.83008V14.4658H119.158V8.0752C119.158 7.31915 118.961 6.72735 118.567 6.30176C118.174 5.87186 117.632 5.65729 116.944 5.65723C116.474 5.65723 116.054 5.75922 115.688 5.96289C115.326 6.16661 115.038 6.46569 114.825 6.85938C114.617 7.24865 114.513 7.71935 114.513 8.27148V14.4658H112.482V4.03418H114.432V5.73145H114.561C114.8 5.17928 115.176 4.73537 115.688 4.40039C116.204 4.06548 116.854 3.89751 117.637 3.89746ZM125.94 14.4658H123.909V0.556641H125.94V14.4658ZM130.704 14.4658H128.674V4.03418H130.704V14.4658ZM144.398 3.89746C145.345 3.89752 146.117 4.19501 146.715 4.78809C147.317 5.38122 147.618 6.27571 147.618 7.4707V14.4658H145.587V7.66016C145.587 6.95414 145.394 6.44289 145.01 6.12598C144.625 5.80909 144.165 5.65045 143.631 5.65039C142.97 5.65048 142.456 5.8544 142.09 6.26172C141.723 6.66463 141.539 7.18267 141.539 7.81641V14.4658H139.516V7.53125C139.516 6.96549 139.339 6.51006 138.986 6.16602C138.633 5.82202 138.173 5.6505 137.607 5.65039C137.223 5.65039 136.867 5.75239 136.541 5.95605C136.22 6.15524 135.959 6.43342 135.76 6.79102C135.565 7.14871 135.468 7.5633 135.468 8.03418V14.4658H133.438V4.03418H135.387V5.73145H135.516C135.733 5.15659 136.089 4.70812 136.582 4.38672C137.075 4.06096 137.667 3.89746 138.354 3.89746C139.051 3.89754 139.636 4.06085 140.106 4.38672C140.582 4.71267 140.933 5.1611 141.159 5.73145H141.268C141.517 5.17467 141.913 4.73087 142.456 4.40039C142.999 4.06547 143.647 3.8975 144.398 3.89746ZM152.37 14.4658H150.34V4.03418H152.37V14.4658ZM39.0781 0C40.2216 9.32368e-05 41.1221 0.35842 41.7793 1.0752C42.4366 1.79223 42.7656 2.80017 42.7656 4.09766V14.1865H37.6943V5.01953C37.6943 4.50773 37.6308 4.15762 37.5029 3.96973C37.3749 3.78199 37.1827 3.68755 36.9268 3.6875C36.3634 3.6875 35.7914 4.1401 35.2109 5.04492V14.1865H30.1406V0.511719H34.5703L34.9287 1.9209C35.5603 1.25514 36.2051 0.768242 36.8623 0.460938C37.5196 0.153638 38.2586 0 39.0781 0ZM177.683 5.62305C177.071 5.62305 176.562 5.78178 176.154 6.09863C175.747 6.41553 175.439 6.84781 175.23 7.39551C175.027 7.94336 174.925 8.56179 174.925 9.25C174.925 9.94707 175.029 10.5741 175.237 11.1309C175.446 11.6876 175.754 12.1291 176.161 12.4551C176.573 12.7765 177.081 12.9375 177.683 12.9375C178.267 12.9374 178.76 12.7834 179.163 12.4756C179.57 12.1632 179.879 11.731 180.087 11.1787C180.3 10.6264 180.406 9.98339 180.406 9.25C180.406 8.52579 180.302 7.89185 180.094 7.34863C179.886 6.80539 179.58 6.38147 179.177 6.07812C178.774 5.77483 178.276 5.6231 177.683 5.62305ZM7.04492 8.2959C6.32819 8.29595 5.79939 8.4247 5.45801 8.68066C5.11656 8.93675 4.94531 9.32916 4.94531 9.8584C4.94531 10.2511 5.04806 10.5625 5.25293 10.793C5.4578 11.0234 5.73082 11.1387 6.07227 11.1387C6.37946 11.1387 6.66515 11.0617 6.92969 10.9082C7.19429 10.7546 7.41229 10.5583 7.58301 10.3193V8.2959H7.04492ZM51.1465 8.2959C50.4294 8.2959 49.9 8.42458 49.5586 8.68066C49.2172 8.93675 49.0459 9.32919 49.0459 9.8584C49.0459 10.251 49.1487 10.5625 49.3535 10.793C49.5583 11.0234 49.8315 11.1386 50.1729 11.1387C50.4802 11.1387 50.7666 11.0619 51.0312 10.9082C51.2957 10.7546 51.5129 10.5582 51.6836 10.3193V8.2959H51.1465ZM21.667 3.63574C20.95 3.63581 20.353 4.06248 19.875 4.91602V10.1396C20.0969 10.481 20.3274 10.724 20.5664 10.8691C20.8054 11.0142 21.0785 11.0869 21.3857 11.0869C22.666 11.0867 23.3057 9.84932 23.3057 7.37402C23.3057 6.33263 23.2381 5.53849 23.1016 4.99219C22.965 4.44611 22.7812 4.08357 22.5508 3.9043C22.3203 3.72504 22.0255 3.63574 21.667 3.63574ZM166.472 5.5752C165.901 5.5752 165.403 5.71556 164.978 5.99609C164.557 6.27226 164.23 6.63482 163.999 7.08301C163.8 7.47226 163.689 7.89136 163.665 8.33984H169.086C169.086 7.80562 168.978 7.33192 168.761 6.91992C168.544 6.50355 168.237 6.17548 167.844 5.93555C167.454 5.69563 166.997 5.57525 166.472 5.5752ZM129.699 0C130.052 6.41347e-05 130.354 0.120447 130.603 0.360352C130.856 0.595728 130.982 0.88093 130.982 1.21582C130.982 1.54619 130.856 1.8314 130.603 2.07129C130.354 2.30667 130.052 2.42474 129.699 2.4248C129.346 2.4248 129.043 2.30663 128.789 2.07129C128.54 1.83138 128.416 1.54623 128.416 1.21582C128.416 0.880884 128.54 0.595747 128.789 0.360352C129.043 0.12048 129.346 4.03251e-06 129.699 0ZM151.365 0C151.718 0.000126588 152.02 0.120509 152.269 0.360352C152.522 0.5957 152.648 0.880999 152.648 1.21582C152.648 1.54612 152.522 1.83143 152.269 2.07129C152.02 2.30661 151.718 2.42468 151.365 2.4248C151.012 2.4248 150.709 2.30662 150.455 2.07129C150.206 1.83135 150.081 1.54629 150.081 1.21582C150.081 0.880814 150.206 0.595775 150.455 0.360352C150.709 0.120476 151.012 0 151.365 0Z";
function LogoApnaUnlimited({
  className,
  variant = "default",
  ...props
}) {
  const gradientId = React11.useId();
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
    "svg",
    {
      width: "183",
      height: "20",
      viewBox: "0 0 183 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "apna Unlimited",
      role: "img",
      className: cn("h-5 w-auto shrink-0", className),
      ...props,
      children: [
        variant === "gradient" && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("stop", { style: { stopColor: "var(--color-apna-gold-600)" } }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("stop", { offset: "1", style: { stopColor: "var(--color-apna-gold-400)" } })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
          "path",
          {
            d: PATH_D,
            fill: variant === "gradient" ? `url(#${gradientId})` : variant === "white" ? "#FFFFFF" : "#111827"
          }
        )
      ]
    }
  );
}

// src/components/ui/job-card.tsx
var import_jsx_runtime44 = require("react/jsx-runtime");
function JobCard({
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
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-border/80 hover:shadow-xs",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 overflow-hidden", children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("img", { src: logoUrl, alt: `${company} logo`, className: "h-full w-full object-cover" }) : /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Building2, { className: "h-6 w-6 text-muted-foreground/60" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "space-y-1 text-left", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("h3", { className: "font-heading text-lg font-semibold leading-tight text-foreground line-clamp-1", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "text-sm font-medium text-muted-foreground", children: company })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Badge, { variant: "outline", className: "gap-1.5 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
            location
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Badge, { variant: "outline", className: "gap-1.5 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Briefcase, { className: "h-3.5 w-3.5" }),
            jobType
          ] }),
          salary && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Badge, { variant: "outline", className: "gap-1.5 font-medium text-foreground bg-muted/30", children: salary })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Separator, { className: "opacity-50" }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Clock, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { children: postedAt })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Button, { variant: "outline", onClick: onSave, className: "h-9 w-9 p-0 sm:w-auto sm:px-4 shrink-0 cursor-pointer", "aria-label": "Save Job", children: [
              /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(BookmarkPlus, { className: "h-4 w-4 sm:mr-2" }),
              /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "hidden sm:inline", children: "Save" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Button, { variant: "default", onClick: onApply, className: "h-9 px-6 shrink-0 cursor-pointer", children: "Apply Now" })
          ] })
        ] })
      ]
    }
  );
}

// src/components/ui/pricing-card.tsx
var import_jsx_runtime45 = (
  // `flex` (block-level) is load-bearing: without it this div sizes
  // as an inline formatting context around `ribbon`, which reserves
  // baseline/line-height space above the badge — a visible gap
  // between the card's top edge and the ribbon itself.
  require("react/jsx-runtime")
);
function PricingCard({
  ribbon,
  title,
  subtitle,
  meta,
  price,
  mrp,
  badge,
  priceSuffix,
  cta,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
    "div",
    {
      "data-slot": "pricing-card",
      className: cn(
        "relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-border bg-card p-4 pb-4 pt-8 transition-shadow hover:shadow-md",
        props.onClick && "cursor-pointer",
        className
      ),
      ...props,
      children: [
        ribbon && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "absolute right-0 top-0 flex rounded-bl-xl", children: ribbon }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "text-lg font-semibold text-foreground", children: title }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "text-2xs text-muted-foreground", children: subtitle }),
          meta && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: meta })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("hr", { className: "border-border" }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "text-base font-semibold text-foreground", children: price }),
              mrp && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "text-sm text-muted-foreground line-through", children: mrp })
            ] }),
            badge && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "shrink-0", children: badge })
          ] }),
          priceSuffix && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "text-xs italic text-muted-foreground", children: priceSuffix })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "mt-auto", children: cta })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Activity,
  Alert,
  AlertAction,
  AlertBanner,
  AlertCircle,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AlertTriangle,
  ApnaLogo,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  AtSign,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Award,
  BackButton,
  Badge,
  BarChart2,
  Bell,
  Bold,
  BookOpen,
  Bookmark,
  BookmarkPlus,
  Bot,
  BottomNav,
  Brain,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Briefcase,
  Building,
  Building2,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Check,
  CheckCircle2,
  CheckIcon,
  CheckSquare,
  Checkbox,
  ChevronDown,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  ChevronUp,
  ChevronUpIcon,
  ChevronsUpDown,
  ChipTabs,
  CircleCheck,
  CircleCheckIcon,
  Clock,
  Code,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Database,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DollarSign,
  Download,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Edit,
  Edit3,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  ExternalLink,
  Eye,
  EyeOff,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  File,
  FileCode,
  FilePlus,
  FileSpreadsheet,
  FileText,
  Filter,
  Flag,
  Flame,
  FlaskConical,
  Folder,
  FolderPlus,
  Footprints,
  Globe,
  GraduationCap,
  Grid,
  Hash,
  Heading,
  Headphones,
  Heart,
  HelpCircle,
  History,
  Home,
  ImageIcon,
  ImagePlus,
  IndianRupee,
  InfinityIcon,
  Info,
  InfoIcon,
  Input,
  Italic,
  JobCard,
  Label,
  Languages,
  Laptop,
  Layers,
  Layout,
  LayoutGrid,
  LayoutList,
  Lightbulb,
  LinkIcon,
  ListChecks,
  ListTodo,
  Loader2,
  Loader2Icon,
  Lock,
  LogoApnaUnlimited,
  Mail,
  MapPin,
  Mars,
  Maximize2,
  Menu,
  MessageCircle,
  MessageCircleQuestion,
  MessageSquare,
  MessagesSquare,
  MetricCard,
  Mic,
  Minus,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreHorizontalIcon,
  MoreVertical,
  Navigation,
  OctagonXIcon,
  OnlyRoundsLogo,
  OnlyRoundsLogoMark,
  Palette,
  PanelLeft,
  PanelLeftIcon,
  Paperclip,
  Pause,
  Pencil,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOff,
  PhoneOutgoing,
  Play,
  Plus,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PowerOff,
  PricingCard,
  Puzzle,
  QrCode,
  RadioGroup,
  RadioGroupItem,
  RefreshCw,
  ReusableSidebar,
  RotateCcw,
  Save,
  Search,
  SearchFilterBar,
  SegmentedTabSwitcher,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Sell,
  Send,
  Separator,
  Settings,
  Shapes,
  Share2,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ShieldAlert,
  ShieldCheck,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  Slider,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  SortableTableHead,
  Sparkles,
  Spinner,
  Star,
  StickyNote,
  Sun,
  Switch,
  Table,
  Table2,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableIcon,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Target,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Trash,
  Trash2,
  TrendingUp,
  TriangleAlertIcon,
  Trophy,
  Type,
  Underline,
  Unlock,
  Upload,
  User,
  User2,
  UserCheck,
  UserPlus,
  UserRound,
  UserSearch,
  Users,
  Venus,
  Video,
  VideoOff,
  Voicemail,
  Wallet,
  Wand2,
  Wrench,
  X,
  XCircle,
  XIcon,
  Zap,
  badgeVariants,
  buttonGroupVariants,
  buttonVariants,
  capitalize,
  cn,
  inputVariants,
  tabsListVariants,
  textareaVariants,
  toggleVariants,
  useSidebar
});
//# sourceMappingURL=index.js.map