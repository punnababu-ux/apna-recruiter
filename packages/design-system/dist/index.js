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
  Activity: () => import_lucide_react.Activity,
  Alert: () => Alert,
  AlertAction: () => AlertAction,
  AlertBanner: () => AlertBanner,
  AlertCircle: () => import_lucide_react.AlertCircle,
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
  AlertTriangle: () => import_lucide_react.AlertTriangle,
  ApnaLogo: () => ApnaLogo,
  ArrowDown: () => import_lucide_react.ArrowDown,
  ArrowLeft: () => import_lucide_react.ArrowLeft,
  ArrowRight: () => import_lucide_react.ArrowRight,
  ArrowUp: () => import_lucide_react.ArrowUp,
  ArrowUpDown: () => import_lucide_react.ArrowUpDown,
  ArrowUpRight: () => import_lucide_react.ArrowUpRight,
  AtSign: () => import_lucide_react.AtSign,
  Avatar: () => Avatar,
  AvatarBadge: () => AvatarBadge,
  AvatarFallback: () => AvatarFallback,
  AvatarGroup: () => AvatarGroup,
  AvatarGroupCount: () => AvatarGroupCount,
  AvatarImage: () => AvatarImage,
  Award: () => import_lucide_react.Award,
  BackButton: () => BackButton,
  Badge: () => Badge,
  BarChart2: () => import_lucide_react.BarChart2,
  Bell: () => import_lucide_react.Bell,
  Bold: () => import_lucide_react.Bold,
  BookOpen: () => import_lucide_react.BookOpen,
  Bookmark: () => import_lucide_react.Bookmark,
  BookmarkPlus: () => import_lucide_react.BookmarkPlus,
  Bot: () => import_lucide_react.Bot,
  BottomNav: () => BottomNav,
  Brain: () => import_lucide_react.Brain,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbEllipsis: () => BreadcrumbEllipsis,
  BreadcrumbItem: () => BreadcrumbItem,
  BreadcrumbLink: () => BreadcrumbLink,
  BreadcrumbList: () => BreadcrumbList,
  BreadcrumbPage: () => BreadcrumbPage,
  BreadcrumbSeparator: () => BreadcrumbSeparator,
  Briefcase: () => import_lucide_react.Briefcase,
  Building: () => import_lucide_react.Building,
  Building2: () => import_lucide_react.Building2,
  Button: () => Button,
  ButtonGroup: () => ButtonGroup,
  ButtonGroupSeparator: () => ButtonGroupSeparator,
  ButtonGroupText: () => ButtonGroupText,
  Calendar: () => import_lucide_react.Calendar,
  CalendarCheck: () => import_lucide_react.CalendarCheck,
  CalendarClock: () => import_lucide_react.CalendarClock,
  CalendarDays: () => import_lucide_react.CalendarDays,
  Check: () => import_lucide_react.Check,
  CheckCircle2: () => import_lucide_react.CheckCircle2,
  CheckIcon: () => import_lucide_react.CheckIcon,
  CheckSquare: () => import_lucide_react.CheckSquare,
  Checkbox: () => Checkbox,
  ChevronDown: () => import_lucide_react.ChevronDown,
  ChevronDownIcon: () => import_lucide_react.ChevronDownIcon,
  ChevronLeft: () => import_lucide_react.ChevronLeft,
  ChevronRight: () => import_lucide_react.ChevronRight,
  ChevronRightIcon: () => import_lucide_react.ChevronRightIcon,
  ChevronUp: () => import_lucide_react.ChevronUp,
  ChevronUpIcon: () => import_lucide_react.ChevronUpIcon,
  ChevronsUpDown: () => import_lucide_react.ChevronsUpDown,
  ChipTabs: () => ChipTabs,
  CircleCheck: () => import_lucide_react.CircleCheck,
  CircleCheckIcon: () => import_lucide_react.CircleCheckIcon,
  Clock: () => import_lucide_react.Clock,
  Code: () => import_lucide_react.Code,
  Compass: () => import_lucide_react.Compass,
  Copy: () => import_lucide_react.Copy,
  Cpu: () => import_lucide_react.Cpu,
  CreditCard: () => import_lucide_react.CreditCard,
  Database: () => import_lucide_react.Database,
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
  DollarSign: () => import_lucide_react.DollarSign,
  Download: () => import_lucide_react.Download,
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
  Edit: () => import_lucide_react.Edit,
  Edit3: () => import_lucide_react.Edit3,
  Empty: () => Empty,
  EmptyContent: () => EmptyContent,
  EmptyDescription: () => EmptyDescription,
  EmptyHeader: () => EmptyHeader,
  EmptyMedia: () => EmptyMedia,
  EmptyTitle: () => EmptyTitle,
  ExternalLink: () => import_lucide_react.ExternalLink,
  Eye: () => import_lucide_react.Eye,
  EyeOff: () => import_lucide_react.EyeOff,
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
  File: () => import_lucide_react.File,
  FileCode: () => import_lucide_react.FileCode,
  FilePlus: () => import_lucide_react.FilePlus,
  FileSpreadsheet: () => import_lucide_react.FileSpreadsheet,
  FileText: () => import_lucide_react.FileText,
  Filter: () => import_lucide_react.Filter,
  Flag: () => import_lucide_react.Flag,
  Flame: () => import_lucide_react.Flame,
  FlaskConical: () => import_lucide_react.FlaskConical,
  Folder: () => import_lucide_react.Folder,
  FolderPlus: () => import_lucide_react.FolderPlus,
  Footprints: () => import_lucide_react.Footprints,
  Globe: () => import_lucide_react.Globe,
  GraduationCap: () => import_lucide_react.GraduationCap,
  Grid: () => import_lucide_react.Grid,
  Hash: () => import_lucide_react.Hash,
  Heading: () => import_lucide_react.Heading,
  Headphones: () => import_lucide_react.Headphones,
  Heart: () => import_lucide_react.Heart,
  HelpCircle: () => import_lucide_react.HelpCircle,
  History: () => import_lucide_react.History,
  Home: () => import_lucide_react.Home,
  ImageIcon: () => import_lucide_react.ImageIcon,
  ImagePlus: () => import_lucide_react.ImagePlus,
  IndianRupee: () => import_lucide_react.IndianRupee,
  InfinityIcon: () => import_lucide_react.InfinityIcon,
  Info: () => import_lucide_react.Info,
  InfoIcon: () => import_lucide_react.InfoIcon,
  Input: () => Input,
  Italic: () => import_lucide_react.Italic,
  JobCard: () => JobCard,
  Label: () => Label,
  Languages: () => import_lucide_react.Languages,
  Laptop: () => import_lucide_react.Laptop,
  Layers: () => import_lucide_react.Layers,
  Layout: () => import_lucide_react.Layout,
  LayoutGrid: () => import_lucide_react.LayoutGrid,
  LayoutList: () => import_lucide_react.LayoutList,
  Lightbulb: () => import_lucide_react.Lightbulb,
  LinkIcon: () => import_lucide_react.LinkIcon,
  ListChecks: () => import_lucide_react.ListChecks,
  ListTodo: () => import_lucide_react.ListTodo,
  Loader2: () => import_lucide_react.Loader2,
  Loader2Icon: () => import_lucide_react.Loader2Icon,
  Lock: () => import_lucide_react.Lock,
  LogoApnaUnlimited: () => LogoApnaUnlimited,
  Mail: () => import_lucide_react.Mail,
  MapPin: () => import_lucide_react.MapPin,
  Mars: () => import_lucide_react.Mars,
  Maximize2: () => import_lucide_react.Maximize2,
  Menu: () => import_lucide_react.Menu,
  MessageCircle: () => import_lucide_react.MessageCircle,
  MessageCircleQuestion: () => import_lucide_react.MessageCircleQuestion,
  MessageSquare: () => import_lucide_react.MessageSquare,
  MessagesSquare: () => import_lucide_react.MessagesSquare,
  MetricCard: () => MetricCard,
  Mic: () => import_lucide_react.Mic,
  Minus: () => import_lucide_react.Minus,
  Monitor: () => import_lucide_react.Monitor,
  Moon: () => import_lucide_react.Moon,
  MoreHorizontal: () => import_lucide_react.MoreHorizontal,
  MoreHorizontalIcon: () => import_lucide_react.MoreHorizontalIcon,
  MoreVertical: () => import_lucide_react.MoreVertical,
  Navigation: () => import_lucide_react.Navigation,
  OctagonXIcon: () => import_lucide_react.OctagonXIcon,
  OnlyRoundsLogo: () => OnlyRoundsLogo,
  OnlyRoundsLogoMark: () => OnlyRoundsLogoMark,
  Palette: () => import_lucide_react.Palette,
  PanelLeft: () => import_lucide_react.PanelLeft,
  PanelLeftIcon: () => import_lucide_react.PanelLeftIcon,
  Paperclip: () => import_lucide_react.Paperclip,
  Pause: () => import_lucide_react.Pause,
  Pencil: () => import_lucide_react.Pencil,
  Phone: () => import_lucide_react.Phone,
  PhoneCall: () => import_lucide_react.PhoneCall,
  PhoneIncoming: () => import_lucide_react.PhoneIncoming,
  PhoneOff: () => import_lucide_react.PhoneOff,
  PhoneOutgoing: () => import_lucide_react.PhoneOutgoing,
  Play: () => import_lucide_react.Play,
  Plus: () => import_lucide_react.Plus,
  Popover: () => Popover,
  PopoverContent: () => PopoverContent,
  PopoverDescription: () => PopoverDescription,
  PopoverHeader: () => PopoverHeader,
  PopoverTitle: () => PopoverTitle,
  PopoverTrigger: () => PopoverTrigger,
  PowerOff: () => import_lucide_react.PowerOff,
  PricingCard: () => PricingCard,
  Puzzle: () => import_lucide_react.Puzzle,
  QrCode: () => import_lucide_react.QrCode,
  RadioGroup: () => RadioGroup,
  RadioGroupItem: () => RadioGroupItem,
  RefreshCw: () => import_lucide_react.RefreshCw,
  ReusableSidebar: () => ReusableSidebar,
  RotateCcw: () => import_lucide_react.RotateCcw,
  Save: () => import_lucide_react.Save,
  Search: () => import_lucide_react.Search,
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
  Sell: () => import_lucide_react.Tag,
  Send: () => import_lucide_react.Send,
  Separator: () => Separator,
  Settings: () => import_lucide_react.Settings,
  Shapes: () => import_lucide_react.Shapes,
  Share2: () => import_lucide_react.Share2,
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetDescription: () => SheetDescription,
  SheetFooter: () => SheetFooter,
  SheetHeader: () => SheetHeader,
  SheetTitle: () => SheetTitle,
  SheetTrigger: () => SheetTrigger,
  ShieldAlert: () => import_lucide_react.ShieldAlert,
  ShieldCheck: () => import_lucide_react.ShieldCheck,
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
  Sliders: () => import_lucide_react.Sliders,
  SlidersHorizontal: () => import_lucide_react.SlidersHorizontal,
  Smartphone: () => import_lucide_react.Smartphone,
  SortableTableHead: () => SortableTableHead,
  Sparkles: () => import_lucide_react.Sparkles,
  Spinner: () => Spinner,
  Star: () => import_lucide_react.Star,
  StickyNote: () => import_lucide_react.StickyNote,
  Sun: () => import_lucide_react.Sun,
  Switch: () => Switch,
  Table: () => Table,
  Table2: () => import_lucide_react.Table2,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader,
  TableIcon: () => import_lucide_react.TableIcon,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Tag: () => import_lucide_react.Tag,
  Target: () => import_lucide_react.Target,
  Textarea: () => Textarea,
  Toaster: () => Toaster,
  Toggle: () => Toggle,
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  Tooltip: () => Tooltip,
  TooltipContent: () => TooltipContent,
  TooltipProvider: () => TooltipProvider,
  TooltipTrigger: () => TooltipTrigger,
  Trash: () => import_lucide_react.Trash,
  Trash2: () => import_lucide_react.Trash2,
  TrendingUp: () => import_lucide_react.TrendingUp,
  TriangleAlertIcon: () => import_lucide_react.TriangleAlertIcon,
  Trophy: () => import_lucide_react.Trophy,
  Type: () => import_lucide_react.Type,
  Underline: () => import_lucide_react.Underline,
  Unlock: () => import_lucide_react.Unlock,
  Upload: () => import_lucide_react.Upload,
  User: () => import_lucide_react.User,
  User2: () => import_lucide_react.User2,
  UserCheck: () => import_lucide_react.UserCheck,
  UserPlus: () => import_lucide_react.UserPlus,
  UserRound: () => import_lucide_react.UserRound,
  UserSearch: () => import_lucide_react.UserSearch,
  Users: () => import_lucide_react.Users,
  Venus: () => import_lucide_react.Venus,
  Video: () => import_lucide_react.Video,
  VideoOff: () => import_lucide_react.VideoOff,
  Voicemail: () => import_lucide_react.Voicemail,
  Wallet: () => import_lucide_react.Wallet,
  Wand2: () => import_lucide_react.Wand2,
  Wrench: () => import_lucide_react.Wrench,
  X: () => import_lucide_react.X,
  XCircle: () => import_lucide_react.XCircle,
  XIcon: () => import_lucide_react.XIcon,
  Zap: () => import_lucide_react.Zap,
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
var React = __toESM(require("react"));
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
var import_lucide_react = require("lucide-react");

// src/components/ui/spinner.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Loader2Icon, { role: "status", "aria-label": "Loading", className: cn("size-4 animate-spin", className), ...props });
}

// src/components/ui/button.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const renderedLeadingIcon = React.isValidElement(leadingIcon) ? React.cloneElement(leadingIcon, {
    "data-icon": "inline-start"
  }) : leadingIcon;
  const renderedTrailingIcon = React.isValidElement(activeTrailingIcon) ? React.cloneElement(activeTrailingIcon, {
    "data-icon": "inline-end"
  }) : activeTrailingIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_button.Button,
    {
      "data-slot": "button",
      nativeButton: props.nativeButton ?? (props.render ? false : void 0),
      "data-loading": loading || void 0,
      "aria-busy": loading || void 0,
      disabled: disabled || loading,
      className: cn(buttonVariants({ variant, size, className })),
      ...props,
      children: loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner, { "data-icon": "inline-start" }),
        loadingText ?? children
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
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
var import_jsx_runtime3 = require("react/jsx-runtime");
function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    Button,
    {
      variant: "outline",
      size: "icon-sm",
      "aria-label": "Go back",
      onClick: handleBack,
      className: cn("shrink-0", className),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react.ChevronLeft, { className: "size-4" })
    }
  );
}

// src/components/ui/toggle.tsx
var import_toggle = require("@base-ui/react/toggle");
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_toggle.Toggle,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/toggle-group.tsx
var React2 = __toESM(require("react"));
var import_toggle2 = require("@base-ui/react/toggle");
var import_toggle_group = require("@base-ui/react/toggle-group");
var import_jsx_runtime7 = require("react/jsx-runtime");
var ToggleGroupContext = React2.createContext({
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  const context = React2.useContext(ToggleGroupContext);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var React3 = __toESM(require("react"));
var import_react = require("react");
var import_class_variance_authority4 = require("class-variance-authority");

// src/components/ui/label.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function Label({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_jsx_runtime9 = require("react/jsx-runtime");
function FieldSet({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  const hasFieldChild = React3.Children.toArray(children).some(
    (child) => React3.isValidElement(child) && child.props?.["data-slot"] === "field"
  );
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
        Icon && !hasFieldChild && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { className: "size-4 text-muted-foreground shrink-0" }),
        children
      ]
    }
  );
}
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Separator, { className: "absolute inset-0 top-1/2" }),
        children && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var import_jsx_runtime10 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
var import_jsx_runtime12 = require("react/jsx-runtime");
function Checkbox({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_checkbox.Checkbox.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        import_checkbox.Checkbox.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_lucide_react.CheckIcon,
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
var import_jsx_runtime13 = require("react/jsx-runtime");
function RadioGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_radio_group.RadioGroup,
    {
      "data-slot": "radio-group",
      className: cn("grid w-full gap-2", className),
      ...props
    }
  );
}
function RadioGroupItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_radio.Radio.Root,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        import_radio.Radio.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "flex size-4 items-center justify-center",
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
        }
      )
    }
  );
}

// src/components/ui/switch.tsx
var import_switch = require("@base-ui/react/switch");
var import_jsx_runtime14 = require("react/jsx-runtime");
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    import_switch.Switch.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent px-px transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
var import_jsx_runtime15 = require("react/jsx-runtime");
var Select = import_select.Select.Root;
function SelectGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_select.Select.Group,
    {
      "data-slot": "select-group",
      className: cn("scroll-my-1", className),
      ...props
    }
  );
}
function SelectValue({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_select.Select.Icon,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react.ChevronDownIcon, { className: "pointer-events-none size-4 text-muted-foreground" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_select.Select.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_select.Select.Positioner,
    {
      side,
      sideOffset,
      align,
      alignOffset,
      alignItemWithTrigger,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        import_select.Select.Popup,
        {
          "data-slot": "select-content",
          "data-align-trigger": alignItemWithTrigger,
          className: cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
          ...props,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectScrollUpButton, {}),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_select.Select.List, { children }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectScrollDownButton, {})
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    import_select.Select.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_select.Select.ItemText, { className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap", children }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_select.Select.ItemIndicator,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react.CheckIcon, { className: "pointer-events-none" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_select.Select.ScrollUpArrow,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_lucide_react.ChevronUpIcon,
        {}
      )
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_select.Select.ScrollDownArrow,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_lucide_react.ChevronDownIcon,
        {}
      )
    }
  );
}

// src/components/ui/slider.tsx
var import_slider = require("@base-ui/react/slider");
var import_jsx_runtime16 = require("react/jsx-runtime");
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        import_slider.Slider.Control,
        {
          "data-slot": "slider-control",
          className: "relative flex w-full items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              import_slider.Slider.Track,
              {
                "data-slot": "slider-track",
                className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
                children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  import_slider.Slider.Indicator,
                  {
                    "data-slot": "slider-indicator",
                    className: "absolute h-full bg-primary data-[orientation=vertical]:w-full"
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
var import_jsx_runtime17 = require("react/jsx-runtime");
function Popover({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_popover.Popover.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_popover.Popover.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_popover.Popover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_popover.Popover.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    "div",
    {
      "data-slot": "popover-header",
      className: cn("flex flex-col gap-0.5 text-sm", className),
      ...props
    }
  );
}
function PopoverTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_popover.Popover.Description,
    {
      "data-slot": "popover-description",
      className: cn("text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/search-filter-bar.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react.Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        Input,
        {
          placeholder,
          value,
          onChange: (e) => onChange(e.target.value),
          className: "bg-card pl-9 text-xs sm:text-sm h-9"
        }
      )
    ] }),
    hasFilters && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Popover, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        PopoverTrigger,
        {
          render: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Button, { variant: "outline", size: "sm", className: "h-9 gap-1.5 cursor-pointer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react.SlidersHorizontal, { className: "size-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: "Filters" }),
            activeFilterCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Badge, { variant: "success", className: "ml-1 h-5 min-w-5 px-1.5 text-2xs", children: activeFilterCount })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(PopoverContent, { align: "end", className: "w-64 p-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center justify-between border-b border-border px-3 py-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-xs font-semibold text-foreground uppercase tracking-wider", children: "Filters" }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
        filterGroups.map((group, i) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
          i > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "border-t border-border" }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex flex-col gap-1.5 p-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-2xs font-semibold text-muted-foreground", children: group.label }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "flex flex-col gap-1", children: group.options.map((opt) => {
              const id = `filter-${group.label}-${opt}`.replace(/\s+/g, "-").toLowerCase();
              return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
                "label",
                {
                  htmlFor: id,
                  className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-muted",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                      Checkbox,
                      {
                        id,
                        checked: group.selected.includes(opt),
                        onCheckedChange: () => group.onToggle(opt)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "truncate", children: opt })
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
var import_jsx_runtime19 = require("react/jsx-runtime");
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
var import_jsx_runtime20 = require("react/jsx-runtime");
function Skeleton({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
var import_jsx_runtime21 = require("react/jsx-runtime");
function Empty({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
var React4 = __toESM(require("react"));
var import_jsx_runtime22 = require("react/jsx-runtime");
var trendVariantMap = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  neutral: "text-muted-foreground"
};
var MetricCard = React4.forwardRef(
  ({ className, label, value, icon, trend, trendVariant = "neutral", ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "rounded-xl border border-border/70 bg-card p-4 shadow-xs text-left transition-all",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
            icon && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "rounded-lg bg-muted/60 p-2 text-foreground [&>svg]:size-4", children: icon })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "mt-3 flex items-baseline justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-2xl font-heading font-bold text-foreground", children: value }),
            trend && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: cn("text-2xs font-medium", trendVariantMap[trendVariant]), children: trend })
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
var import_jsx_runtime23 = require("react/jsx-runtime");
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    import_tabs.Tabs.Panel,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 text-sm outline-none", className),
      ...props
    }
  );
}

// src/components/ui/chip-tabs.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "div",
    {
      role: "tablist",
      "aria-label": ariaLabel,
      className: cn("flex flex-wrap items-center gap-2", className),
      children: items.map((item) => {
        const active = value === item.value;
        const stateClass = variant === "choice" ? active ? "border-primary bg-accent text-accent-foreground" : ariaInvalid ? "border-destructive/60 bg-destructive/5 text-destructive hover:bg-destructive/10" : "border-border bg-muted text-muted-foreground hover:text-foreground" : active ? "border-transparent bg-secondary text-secondary-foreground" : ariaInvalid ? "border-destructive/60 text-destructive hover:bg-destructive/10" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground";
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
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
              typeof item.count === "number" ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
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
var import_jsx_runtime25 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { "data-slot": "segmented-tab-switcher", className: cn("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      "div",
      {
        className: cn(
          "hidden w-full items-stretch gap-2 rounded-full bg-muted p-2 md:flex",
          trackClassName
        ),
        children: items.map(({ value: v, label, description, icon }) => {
          const active = v === value;
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => onValueChange(v),
              "aria-pressed": active,
              className: cn(
                "flex flex-1 flex-col items-start justify-center gap-1 rounded-full px-8 py-3 text-left transition-all duration-200",
                active ? "bg-card shadow-sm" : "hover:bg-card/60"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
                  "span",
                  {
                    className: cn(
                      "flex items-center gap-2 text-lg leading-7 font-semibold [&_svg]:size-6",
                      active ? activeClassName : inactiveClassName
                    ),
                    children: [
                      icon,
                      label
                    ]
                  }
                ),
                description && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "no-scrollbar -mx-4 overflow-x-auto pb-1 sm:-mx-10 md:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex w-max gap-2 px-4 sm:px-10", children: items.map(({ value: v, label, icon }) => {
      const active = v === value;
      return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => onValueChange(v),
          "aria-pressed": active,
          className: cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors [&_svg]:size-5",
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
var import_jsx_runtime26 = require("react/jsx-runtime");
function Breadcrumb({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.ChevronRightIcon, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          import_lucide_react.MoreHorizontalIcon,
          {}
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}

// src/components/ui/sidebar.tsx
var React6 = __toESM(require("react"));
var import_merge_props4 = require("@base-ui/react/merge-props");
var import_use_render4 = require("@base-ui/react/use-render");
var import_class_variance_authority10 = require("class-variance-authority");

// src/hooks/use-mobile.ts
var React5 = __toESM(require("react"));
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React5.useState(void 0);
  React5.useEffect(() => {
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
var import_jsx_runtime27 = require("react/jsx-runtime");
function Sheet({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_dialog.Dialog.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_dialog.Dialog.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_dialog.Dialog.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_dialog.Dialog.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(SheetPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(SheetOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
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
          showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
            import_dialog.Dialog.Close,
            {
              "data-slot": "sheet-close",
              render: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-3 right-3",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                  import_lucide_react.XIcon,
                  {}
                ),
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-0.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var import_jsx_runtime28 = require("react/jsx-runtime");
function TooltipProvider({
  delay = 0,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_tooltip.Tooltip.Provider,
    {
      "data-slot": "tooltip-provider",
      delay,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_tooltip.Tooltip.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_tooltip.Tooltip.Trigger, { "data-slot": "tooltip-trigger", ...props });
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
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_tooltip.Tooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_tooltip.Tooltip.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_tooltip.Tooltip.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })
          ]
        }
      )
    }
  ) });
}

// src/components/ui/sidebar.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "4rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React6.createContext(null);
function useSidebar() {
  const context = React6.useContext(SidebarContext);
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
  const [openMobile, setOpenMobile] = React6.useState(false);
  const [_open, _setOpen] = React6.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React6.useCallback(
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
  const toggleSidebar = React6.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React6.useEffect(() => {
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
  const contextValue = React6.useMemo(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react.PanelLeftIcon, {}),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
    render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(TooltipTrigger, { render }),
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(Tooltip, { children: [
    comp,
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  const [width] = React6.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
var React8 = __toESM(require("react"));
var import_link = __toESM(require("next/link"));
var import_navigation2 = require("next/navigation");

// src/components/ui/dropdown-menu.tsx
var import_menu = require("@base-ui/react/menu");
var import_jsx_runtime30 = require("react/jsx-runtime");
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    import_menu.Menu.Positioner,
    {
      className: "isolate z-50 outline-none",
      align,
      alignOffset,
      side,
      sideOffset,
      children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.SubmenuRoot, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react.ChevronRightIcon, { className: "ml-auto" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.CheckboxItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              import_lucide_react.CheckIcon,
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_menu.Menu.RadioItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
              import_lucide_react.CheckIcon,
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
var React7 = __toESM(require("react"));

// src/components/ui/alert.tsx
var import_class_variance_authority11 = require("class-variance-authority");
var import_jsx_runtime31 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    "div",
    {
      "data-slot": "alert-action",
      className: cn("absolute top-2 right-2", className),
      ...props
    }
  );
}

// src/components/ui/alert-banner.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
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
var AlertBanner = React7.forwardRef(
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
      return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
          children: icon && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: cn("flex items-center justify-center [&>svg]:size-4", accentColor), children: icon })
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex flex-1 items-center gap-2.5 min-w-0", children: [
            icon && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: cn("shrink-0 flex items-center justify-center [&>svg]:size-4", accentColor), children: icon }),
            /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex-1 text-xs leading-normal min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(AlertTitle, { className: cn("inline font-medium !mb-0 mr-1.5 leading-normal", textColor), children: title }),
              action && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
          onClose && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: cn(
                "shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer -mr-1",
                textColor
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_lucide_react.XIcon, { className: "size-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { className: "sr-only", children: "Close" })
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
var import_jsx_runtime33 = require("react/jsx-runtime");
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
  const activeWorkspace = React8.useMemo(() => {
    return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  }, [workspaces, activeWorkspaceId]);
  const [expandedItems, setExpandedItems] = React8.useState(() => {
    const initial = {};
    for (const item of navItems) {
      if (item.items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`))) {
        initial[item.label] = true;
      }
    }
    return initial;
  });
  const [alertDismissed, setAlertDismissed] = React8.useState(false);
  React8.useEffect(() => {
    setAlertDismissed(false);
  }, [alertBanner?.id]);
  const toggleExpand = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(SidebarHeader, { className: "gap-3 px-3 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
        SidebarMenuButton,
        {
          render: brand.href ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_link.default, { href: brand.href }) : void 0,
          tooltip: brand.name,
          size: "lg",
          className: "hover:bg-transparent focus-visible:ring-0 active:bg-transparent px-0! group-data-[collapsible=icon]:w-10",
          onClick: () => setOpenMobile(false),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "size-10 shrink-0 flex items-center justify-center", children: brand.logo }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-lg font-bold tracking-tight text-secondary-foreground truncate", children: brand.name })
          ]
        }
      ) }) }),
      workspaces.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(DropdownMenu, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          DropdownMenuTrigger,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
              "button",
              {
                type: "button",
                "aria-label": "Switch workspace",
                className: "flex h-12 w-full items-center gap-3 rounded-lg border border-sidebar-border bg-background px-2.5 text-left text-sm font-medium text-foreground shadow-sm ring-sidebar-ring outline-hidden transition-colors hover:bg-accent/50 focus-visible:ring-2 cursor-pointer group-data-[collapsible=icon]:w-10",
                children: [
                  activeWorkspace.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                    "img",
                    {
                      src: activeWorkspace.logoUrl,
                      alt: "",
                      className: "size-5 shrink-0 rounded object-cover"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      className: "flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white",
                      children: activeWorkspace.fallbackLetter
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "flex-1 min-w-0 flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "truncate font-semibold text-foreground text-sm", children: activeWorkspace.name }),
                    activeWorkspace.subtext && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "truncate text-2xs text-muted-foreground font-normal", children: activeWorkspace.subtext })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react.ChevronsUpDown, { className: "size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(DropdownMenuContent, { side: isMobile ? "bottom" : "right", align: isMobile ? "center" : "start", className: cn("w-64 p-1.5", dropdownClassName), children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(DropdownMenuGroup, { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DropdownMenuLabel, { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Workspaces" }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DropdownMenuSeparator, {}),
            workspaces.map((w) => {
              const isSelected = w.id === activeWorkspace.id;
              return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
                DropdownMenuItem,
                {
                  onClick: () => {
                    onWorkspaceChange(w);
                    setOpenMobile(false);
                  },
                  className: "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm cursor-pointer hover:bg-accent focus:bg-accent",
                  children: [
                    w.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                      "img",
                      {
                        src: w.logoUrl,
                        alt: "",
                        className: "size-5 shrink-0 rounded object-cover"
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white", children: w.fallbackLetter }),
                    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex-1 min-w-0 flex flex-col text-left leading-tight", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "font-semibold text-foreground text-sm truncate", children: w.name }),
                      w.subtext && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-2xs text-muted-foreground truncate", children: w.subtext })
                    ] }),
                    isSelected && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react.Check, { className: "size-4 shrink-0 text-primary" })
                  ]
                },
                w.id
              );
            })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DropdownMenuSeparator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(SidebarContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarGroup, { className: "p-0 px-3 pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenu, { children: navItems.map(({ href, label, icon: Icon, items, badge }) => {
        const active = href ? pathname === href || pathname.startsWith(`${href}/`) : items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)) || false;
        const isExpanded = !!expandedItems[label];
        return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenuItem, { children: items && items.length > 0 ? isCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(DropdownMenu, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                SidebarMenuButton,
                {
                  isActive: active,
                  tooltip: label,
                  className: "w-full justify-between",
                  children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(DropdownMenuContent, { side: "right", align: "start", className: dropdownClassName, children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DropdownMenuLabel, { children: label }) }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DropdownMenuSeparator, {}),
            items.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              DropdownMenuItem,
              {
                render: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_link.default, { href: sub.href }),
                className: cn(
                  "cursor-pointer",
                  pathname === sub.href && "bg-accent text-accent-foreground font-medium"
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: sub.label })
              },
              sub.href
            ))
          ] })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_jsx_runtime33.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
            SidebarMenuButton,
            {
              onClick: () => toggleExpand(label),
              isActive: active,
              tooltip: label,
              className: "w-full justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "flex items-center gap-1 group-data-[collapsible=icon]:hidden", children: [
                  badge,
                  /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                    import_lucide_react.ChevronDown,
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
          isExpanded && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenuSub, { children: items.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenuSubItem, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            SidebarMenuSubButton,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_link.default, { href: sub.href }),
              isActive: pathname === sub.href,
              onClick: () => setOpenMobile(false),
              children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: sub.label })
            }
          ) }, sub.href)) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
          SidebarMenuButton,
          {
            render: href ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_link.default, { href }) : void 0,
            isActive: active,
            tooltip: label,
            className: "justify-between",
            onClick: () => setOpenMobile(false),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Icon, {}),
                /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
              ] }),
              badge && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "group-data-[collapsible=icon]:hidden", children: badge })
            ]
          }
        ) }, label);
      }) }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "mt-auto flex flex-col", children: [
        footerItems && footerItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "px-3 pb-2 pt-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenu, { children: footerItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
          SidebarMenuButton,
          {
            render: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_link.default, { href: item.href }),
            tooltip: item.label,
            onClick: () => setOpenMobile(false),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(item.icon, {}),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: item.label })
            ]
          }
        ) }, item.label)) }) }),
        bottomCta && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "px-3 py-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          Button,
          {
            variant: "default",
            className: "w-full justify-start gap-2.5 h-10 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:rounded-lg",
            render: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_link.default, { href: bottomCta.href }),
            onClick: () => setOpenMobile(false),
            children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "flex items-center gap-2.5 w-full justify-start group-data-[collapsible=icon]:justify-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(bottomCta.icon, { className: "size-4 shrink-0" }),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "group-data-[collapsible=icon]:hidden truncate", children: bottomCta.label })
            ] })
          }
        ) }),
        alertBanner && !alertDismissed && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "p-3 group-data-[collapsible=icon]:p-2 pt-0 group-data-[collapsible=icon]:pt-0", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            TooltipTrigger,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                AlertBanner,
                {
                  collapsed: isCollapsed,
                  variant: alertBanner.variant || "warning",
                  appearance: alertBanner.appearance || "secondary",
                  icon: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react.AlertCircle, { className: "size-4 shrink-0" }),
                  title: alertBanner.title,
                  action: alertBanner.ctaText ? { label: alertBanner.ctaText, onClick: alertBanner.onCtaClick || (() => {
                  }) } : void 0,
                  onClose: alertBanner.showClose !== false ? () => setAlertDismissed(true) : void 0
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            TooltipContent,
            {
              side: "right",
              align: "center",
              hidden: !isCollapsed || isMobile,
              className: "max-w-xs p-3 text-left",
              children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("p", { className: "font-semibold text-xs text-foreground", children: alertBanner.title })
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}

// src/components/ui/bottom-nav.tsx
var import_link2 = __toESM(require("next/link"));
var import_jsx_runtime34 = require("react/jsx-runtime");
function BottomNav({ items, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
        const inner = /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_jsx_runtime34.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
              Icon,
              {
                className: cn(
                  "size-5 transition-colors",
                  item.active ? "text-primary" : "text-muted-foreground"
                ),
                "aria-hidden": true
              }
            ),
            item.badge && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "absolute -top-1 -right-2 flex items-center", children: item.badge })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
          return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
        return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
var import_jsx_runtime35 = require("react/jsx-runtime");
function Dialog({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_dialog2.Dialog.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_dialog2.Dialog.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_dialog2.Dialog.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_dialog2.Dialog.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(DialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(DialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
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
          showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
            import_dialog2.Dialog.Close,
            {
              "data-slot": "dialog-close",
              render: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-2 right-2",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                  import_lucide_react.XIcon,
                  {}
                ),
                /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
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
        showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_dialog2.Dialog.Close, { render: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Button, { variant: "outline" }), children: "Close" })
      ]
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
var import_jsx_runtime36 = require("react/jsx-runtime");
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_alert_dialog.AlertDialog.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_alert_dialog.AlertDialog.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_alert_dialog.AlertDialog.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(AlertDialogPortal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(AlertDialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    import_alert_dialog.AlertDialog.Close,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      render: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Button, { variant, size }),
      ...props
    }
  );
}

// src/components/ui/sonner.tsx
var import_next_themes = require("next-themes");
var import_sonner = require("sonner");
var import_jsx_runtime37 = require("react/jsx-runtime");
var Toaster = ({ ...props }) => {
  const { theme = "system" } = (0, import_next_themes.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_sonner.Toaster,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react.CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react.InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react.TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react.OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react.Loader2Icon, { className: "size-4 animate-spin" })
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
var React9 = __toESM(require("react"));
var import_jsx_runtime38 = require("react/jsx-runtime");
function Table({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("bg-muted/60 [&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
  const lastXRef = React9.useRef(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
    TableHead,
    {
      className: cn("relative select-none", className),
      "aria-sort": sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none",
      ...props,
      children: [
        onSortChange ? /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => onSortChange(nextSort()),
            className: "group/sort inline-flex items-center gap-1.5 text-left font-medium text-foreground hover:text-foreground",
            children: [
              children,
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SortIcon, { direction: sort })
            ]
          }
        ) : children,
        resizable ? /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          "span",
          {
            role: "separator",
            "aria-orientation": "vertical",
            "aria-label": "Resize column",
            onPointerDown: handlePointerDown,
            onDoubleClick: (e) => e.stopPropagation(),
            className: "group/resize absolute top-0 right-0 bottom-0 z-10 flex w-3 cursor-col-resize touch-none items-center justify-center",
            children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react.ArrowUp, { className: "size-3.5 text-foreground", "aria-hidden": true });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_lucide_react.ArrowDown, { className: "size-3.5 text-foreground", "aria-hidden": true });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    import_lucide_react.ArrowUpDown,
    {
      className: "size-3.5 text-muted-foreground/60 group-hover/sort:text-muted-foreground",
      "aria-hidden": true
    }
  );
}

// src/components/ui/accordion.tsx
var import_accordion = require("@base-ui/react/accordion");
var import_jsx_runtime39 = require("react/jsx-runtime");
function Accordion({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    import_accordion.Accordion.Root,
    {
      "data-slot": "accordion",
      className: cn("flex w-full flex-col", className),
      ...props
    }
  );
}
function AccordionItem({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_accordion.Accordion.Header, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react.ChevronDownIcon, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react.ChevronUpIcon, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    import_accordion.Accordion.Panel,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
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
var import_jsx_runtime40 = require("react/jsx-runtime");
function ApnaLogo({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7.71875 0.5H29.2812C33.2681 0.5 36.5 3.73194 36.5 7.71875V29.2812C36.5 33.2681 33.2681 36.5 29.2812 36.5H7.71875C3.73194 36.5 0.5 33.2681 0.5 29.2812V7.71875C0.5 3.73194 3.73194 0.5 7.71875 0.5Z",
            fill: "white",
            stroke: "#DFE1E6"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          "path",
          {
            d: "M35.9688 32C34.8948 34.639 32.306 36.5 29.2812 36.5H24.501V32H35.9688Z",
            fill: "#FFD166"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          "path",
          {
            d: "M12.5 36.5H7.71875C4.69395 36.5 2.10519 34.639 1.03125 32H12.5V36.5Z",
            fill: "#2BB793"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("rect", { x: "12.502", y: "32", width: "12", height: "4.5", fill: "#83BDE4" }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
var import_jsx_runtime41 = require("react/jsx-runtime");
var STOPS = {
  green300: "#74D7AE",
  green400: "#3EBA8D",
  gold300: "#FFD975",
  sky400: "#7BB9E5"
};
function MarkGradients({ prefix }) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("defs", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-0`,
        x1: "9.67724",
        y1: "5.18445",
        x2: "2.28946",
        y2: "32.7183",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.green300 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.sky400 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-1`,
        x1: "28.3601",
        y1: "28.3822",
        x2: "38.7089",
        y2: "28.3822",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.gold300 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.green400 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-2`,
        x1: "32.6782",
        y1: "29.0672",
        x2: "36.8885",
        y2: "31.495",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-3`,
        x1: "13.4626",
        y1: "2.38751",
        x2: "27.0854",
        y2: "15.9916",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.gold300 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.green300, stopOpacity: "0.99" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-4`,
        x1: "5.89046",
        y1: "13.4828",
        x2: "1.11813",
        y2: "10.3991",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.green300 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-5`,
        x1: "35.7645",
        y1: "11.0953",
        x2: "23.256",
        y2: "33.6919",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "linearGradient",
      {
        id: `${prefix}-6`,
        x1: "15.632",
        y1: "30.0551",
        x2: "18.6601",
        y2: "41.3405",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { stopColor: STOPS.green300 }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    )
  ] });
}
function MarkPaths({ prefix }) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_jsx_runtime41.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M19.3545 10.2914C19.2335 10.4971 19.1194 10.7076 19.0125 10.9219L16.3556 15.5005L15.5775 16.8412L14.1615 19.2813L13.3699 20.6452L10.6999 25.2461C10.5725 25.4368 10.4509 25.6324 10.3363 25.8318C9.46695 27.3425 8.96972 29.0927 8.96972 30.9586C8.96972 32.6467 9.37683 34.2404 10.0984 35.6476C10.1778 35.8023 10.2615 35.9558 10.3484 36.1061H9.80956C4.34191 35.8097 0 31.3044 0 25.7901C0 24.0999 0.408027 22.5043 1.13122 21.0957L1.38486 20.6588L1.39265 20.6452L1.66253 20.18L10.0984 5.64342L10.3647 5.18445H10.9593C14.5435 5.37877 17.6437 7.38144 19.3545 10.2914Z", fill: `url(#${prefix}-0)` }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M38.7089 25.7897C38.7089 31.3039 34.367 35.809 28.899 36.1055H28.3601C28.4471 35.9554 28.5307 35.8026 28.6101 35.6477L37.047 21.1086C37.1428 20.9613 37.2353 20.8111 37.324 20.6584L37.577 21.0943C38.301 22.5031 38.7089 24.099 38.7089 25.7897Z", fill: `url(#${prefix}-1)` }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M38.7089 25.7897C38.7089 31.3039 34.367 35.809 28.899 36.1055H28.3601C28.4471 35.9554 28.5307 35.8026 28.6101 35.6477L37.047 21.1086C37.1428 20.9613 37.2353 20.8111 37.324 20.6584L37.577 21.0943C38.301 22.5031 38.7089 24.099 38.7089 25.7897Z", fill: `url(#${prefix}-2)` }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M29.7377 10.3317C29.7377 12.1974 29.2406 13.9475 28.3711 15.4582C28.2564 15.6578 28.135 15.853 28.0072 16.044L25.3374 20.6448L24.5458 19.2809L23.1299 16.8409L22.3517 15.5001L19.6948 10.9216C19.5883 10.707 19.4741 10.4967 19.3529 10.291C17.6421 7.3813 14.5419 5.37863 10.9577 5.18406C10.7674 5.17363 10.5758 5.16837 10.3829 5.16837H10.3722L10.6354 4.71508C12.4867 1.87707 15.6994 0 19.3532 0C23.0068 0 26.2196 1.87707 28.0707 4.71508L28.3338 5.16837L28.3431 5.18406L28.6093 5.64303C29.331 7.05023 29.7377 8.64377 29.7377 10.3317Z", fill: `url(#${prefix}-3)` }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M10.3484 5.18445C10.2613 5.33509 10.1778 5.48801 10.0984 5.64342L1.66253 20.1803C1.56623 20.3283 1.4736 20.4788 1.38486 20.6318L1.13237 20.1965C0.408254 18.7878 0 17.1914 0 15.5005C0 9.98624 4.34191 5.48118 9.80978 5.18445H10.3484Z", fill: `url(#${prefix}-4)` }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M38.7097 15.5005C38.7097 17.1914 38.3013 18.7878 37.5773 20.1965L37.3246 20.6318L37.317 20.6454L37.0477 21.1094L28.6112 35.6479L28.345 36.1063H27.7504C24.1663 35.912 21.0661 33.9093 19.3553 30.9996C19.4765 30.7934 19.5907 30.5827 19.6977 30.3679L19.6984 30.3665L22.3542 25.7901L23.1323 24.4494L24.5483 22.0092L25.3399 20.6452L28.0097 16.0444C28.1372 15.8534 28.2586 15.6579 28.3735 15.4586C29.2428 13.9479 29.7403 12.1978 29.7403 10.3321C29.7403 8.64389 29.3332 7.05059 28.6115 5.64342C28.5321 5.48801 28.4485 5.33509 28.3613 5.18445H28.9001C34.3679 5.48118 38.7097 9.98624 38.7097 15.5005Z", fill: `url(#${prefix}-5)` }),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M28.3348 36.1218L28.0721 36.5749C26.221 39.4124 23.0077 41.2904 19.3543 41.2904C15.7008 41.2904 12.4883 39.4133 10.6371 36.5757L10.3736 36.1218L10.3647 36.1064L10.0987 35.6482C9.37684 34.241 8.96973 32.6471 8.96973 30.9587C8.96973 29.093 9.46673 27.3426 10.3363 25.8318C10.4509 25.6327 10.5721 25.4378 10.6995 25.2471L13.3699 20.6453L14.1615 22.0093L15.5775 24.4495L16.3556 25.7903L19.0119 30.3677C19.1187 30.5828 19.2329 30.7935 19.3543 30.9993C21.065 33.909 24.1653 35.9117 27.7494 36.1064C27.9397 36.1167 28.1315 36.1218 28.3243 36.1218H28.3348Z", fill: `url(#${prefix}-6)` })
  ] });
}
function OnlyRoundsLogo({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(MarkPaths, { prefix: "or-logo" }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
          "path",
          {
            d: "M106.152 27.5463L110.504 16.5062H115.143L107.88 33.8822C107.432 34.9489 106.962 35.8879 106.471 36.6986C105.981 37.5303 105.373 38.1706 104.648 38.6185C103.944 39.0665 103.016 39.2904 101.864 39.2904C101.288 39.2904 100.648 39.1725 99.944 38.9379C99.2614 38.7246 98.6531 38.4689 98.1198 38.1703L99.6872 34.7465C100.05 34.9384 100.381 35.088 100.679 35.1947C100.999 35.3227 101.277 35.3861 101.511 35.3861C101.959 35.3861 102.355 35.2583 102.696 35.0023C103.037 34.7677 103.315 34.4158 103.528 33.9467L104.2 32.3138L96.9675 16.5062H101.608L106.152 27.5463ZM58.1657 9.75427C60.427 9.75428 62.4112 10.2555 64.1179 11.2582C65.8457 12.2394 67.2001 13.6048 68.1814 15.3539C69.1627 17.0819 69.654 19.0769 69.654 21.3383C69.654 23.5783 69.1627 25.5733 68.1814 27.3226C67.2214 29.0503 65.8778 30.4158 64.1501 31.4183C62.4434 32.3997 60.4801 32.89 58.2614 32.89C56.0002 32.89 53.995 32.3996 52.2458 31.4183C50.5178 30.4157 49.1627 29.0506 48.1814 27.3226C47.2 25.5733 46.7097 23.5783 46.7097 21.3383C46.7097 19.0558 47.2002 17.0505 48.1814 15.3226C49.1627 13.5733 50.5069 12.2073 52.2136 11.226C53.9416 10.2446 55.9258 9.75427 58.1657 9.75427ZM145.182 16.1224C146.825 16.1225 148.275 16.4851 149.534 17.2103C150.793 17.9143 151.774 18.896 152.478 20.1547C153.182 21.4132 153.534 22.8637 153.534 24.5062C153.534 26.1487 153.182 27.5992 152.478 28.8578C151.774 30.1165 150.793 31.109 149.534 31.8344C148.297 32.5382 146.867 32.89 145.246 32.89C143.625 32.89 142.174 32.5383 140.894 31.8344C139.636 31.109 138.644 30.1165 137.919 28.8578C137.215 27.5992 136.862 26.1488 136.862 24.5062C136.862 22.8636 137.215 21.4133 137.919 20.1547C138.623 18.8961 139.603 17.9143 140.862 17.2103C142.121 16.485 143.561 16.1224 145.182 16.1224ZM160.256 24.6986C160.256 25.765 160.374 26.6074 160.608 27.226C160.864 27.8233 161.216 28.2611 161.664 28.5385C162.133 28.7945 162.656 28.9222 163.232 28.9222C164.341 28.9435 165.184 28.6126 165.759 27.9301C166.335 27.2261 166.624 26.2127 166.624 24.89V16.5062H170.848V32.5062H166.88L166.72 30.3304C166.187 31.1411 165.514 31.7701 164.704 32.2181C163.915 32.6661 163.019 32.89 162.016 32.89C160.736 32.89 159.648 32.6344 158.752 32.1224C157.877 31.6104 157.205 30.8209 156.736 29.7543C156.267 28.6663 156.032 27.2686 156.032 25.5619V16.5062H160.256V24.6986ZM208.087 32.5062H204.087L203.959 30.266C203.425 31.098 202.743 31.7488 201.911 32.2181C201.079 32.6661 200.13 32.89 199.063 32.89C197.591 32.89 196.311 32.5491 195.223 31.8666C194.157 31.184 193.325 30.213 192.727 28.9545C192.13 27.6958 191.831 26.2129 191.831 24.5062C191.831 22.7782 192.13 21.2953 192.727 20.058C193.325 18.7995 194.157 17.8285 195.223 17.1459C196.311 16.4634 197.591 16.1224 199.063 16.1224C200.108 16.1225 201.037 16.3463 201.847 16.7943C202.679 17.2209 203.351 17.8394 203.863 18.6498V10.1058H208.087V32.5062ZM81.4655 16.1224C82.7239 16.1225 83.8011 16.3782 84.697 16.89C85.593 17.402 86.2755 18.2024 86.7448 19.2904C87.2141 20.3571 87.438 21.7439 87.4167 23.4506V32.5062H83.1931V24.3138C83.193 23.2262 83.0652 22.3838 82.8093 21.7865C82.5746 21.1892 82.2329 20.7622 81.7849 20.5062C81.337 20.229 80.8146 20.0903 80.2175 20.0902C79.1295 20.0689 78.2865 20.3997 77.6892 21.0824C77.1132 21.7651 76.8249 22.7785 76.8249 24.1224V32.5062H72.6013V16.5062H76.569L76.7614 18.682C77.2734 17.8501 77.9243 17.2209 78.7136 16.7943C79.5242 16.3464 80.4416 16.1224 81.4655 16.1224ZM95.0124 32.5062H90.7888V10.1058H95.0124V32.5062ZM126.029 10.1058C127.608 10.1058 129.005 10.4159 130.221 11.0345C131.437 11.6532 132.386 12.5063 133.069 13.5941C133.752 14.6608 134.093 15.9089 134.093 17.3383C134.093 18.8102 133.698 20.1119 132.909 21.2426C132.12 22.3516 131.085 23.194 129.805 23.7699L134.989 32.5062H130.029L125.453 24.5707H122.093V32.5062H117.71V10.1058H126.029ZM183.372 16.1224C184.63 16.1225 185.707 16.3781 186.603 16.89C187.499 17.402 188.182 18.2024 188.651 19.2904C189.12 20.3571 189.344 21.7439 189.323 23.4506V32.5062H185.099V24.3138C185.099 23.2262 184.971 22.3838 184.716 21.7865C184.481 21.1892 184.139 20.7622 183.691 20.5062C183.243 20.229 182.721 20.0903 182.124 20.0902C181.036 20.0689 180.193 20.3997 179.595 21.0824C179.019 21.7651 178.731 22.7785 178.731 24.1224V32.5062H174.508V16.5062H178.475L178.668 18.682C179.18 17.8501 179.831 17.2209 180.62 16.7943C181.43 16.3464 182.348 16.1224 183.372 16.1224ZM240.119 32.5062H235.479L233.559 27.5785H224.343L222.424 32.5062H217.783L226.615 10.1058H231.287L240.119 32.5062ZM247.187 32.5062H242.802V10.1058H247.187V32.5062ZM200.119 20.0258C199.351 20.0258 198.668 20.218 198.071 20.6019C197.495 20.9646 197.036 21.4876 196.695 22.1703C196.375 22.8529 196.215 23.6316 196.215 24.5062C196.215 25.3809 196.386 26.1595 196.727 26.8422C197.069 27.5248 197.527 28.0578 198.103 28.4418C198.701 28.8258 199.383 29.0179 200.151 29.0179C200.855 29.0179 201.473 28.8474 202.007 28.5062C202.561 28.1436 202.999 27.6423 203.319 27.0023C203.639 26.3624 203.82 25.6371 203.863 24.8265V24.1859C203.82 23.3754 203.639 22.6609 203.319 22.0424C202.999 21.4024 202.561 20.912 202.007 20.5707C201.452 20.208 200.823 20.0258 200.119 20.0258ZM145.182 20.0258C144.414 20.0258 143.721 20.218 143.102 20.6019C142.505 20.9859 142.035 21.5198 141.694 22.2025C141.353 22.8638 141.182 23.6317 141.182 24.5062C141.182 25.3808 141.353 26.1595 141.694 26.8422C142.035 27.5035 142.516 28.0265 143.134 28.4105C143.753 28.7943 144.457 28.9857 145.246 28.9857C146.035 28.9857 146.729 28.7944 147.326 28.4105C147.923 28.0265 148.382 27.5034 148.702 26.8422C149.043 26.1595 149.215 25.3809 149.215 24.5062C149.215 23.6316 149.043 22.8638 148.702 22.2025C148.361 21.5199 147.881 20.9859 147.262 20.6019C146.665 20.218 145.972 20.0258 145.182 20.0258ZM58.1657 13.7543C56.8217 13.7543 55.6162 14.0851 54.5495 14.7465C53.5043 15.3864 52.6829 16.2721 52.0856 17.4027C51.4884 18.5333 51.1901 19.8451 51.1901 21.3383C51.1901 22.8103 51.4883 24.1119 52.0856 25.2426C52.683 26.3731 53.5152 27.2688 54.5817 27.9301C55.6483 28.57 56.8749 28.89 58.2614 28.89C59.6267 28.89 60.8214 28.57 61.8454 27.9301C62.8907 27.2687 63.702 26.3732 64.278 25.2426C64.8754 24.1119 65.1735 22.8103 65.1735 21.3383C65.1735 19.8451 64.8752 18.5333 64.278 17.4027C63.6807 16.272 62.8585 15.3865 61.8132 14.7465C60.7679 14.0852 59.5523 13.7543 58.1657 13.7543ZM225.783 23.7064H232.119L228.951 15.5785L225.783 23.7064ZM122.093 20.5707H126.061C126.722 20.5707 127.309 20.4319 127.821 20.1547C128.354 19.8774 128.77 19.4929 129.069 19.0023C129.389 18.5117 129.55 17.9569 129.55 17.3383C129.55 16.3783 129.197 15.5997 128.493 15.0023C127.81 14.4051 126.925 14.1059 125.838 14.1058H122.093V20.5707Z",
            fill: "var(--foreground)"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(MarkGradients, { prefix: "or-logo" })
      ]
    }
  );
}
function OnlyRoundsLogoMark({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(MarkPaths, { prefix: "or-mark" }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(MarkGradients, { prefix: "or-mark" })
      ]
    }
  );
}

// src/components/ui/logo-apna-unlimited.tsx
var React10 = __toESM(require("react"));
var import_jsx_runtime42 = require("react/jsx-runtime");
var PATH_D = "M23.3838 0C25.0739 5.87573e-05 26.3498 0.640541 27.2119 1.9209C28.074 3.20122 28.5048 4.99341 28.5049 7.29785C28.5049 8.71485 28.2796 9.98333 27.8271 11.1016C27.3747 12.2197 26.7342 13.0991 25.9062 13.7393C25.0783 14.3794 24.1263 14.6992 23.0508 14.6992C21.7533 14.6992 20.6945 14.2466 19.875 13.3418V19.4883L14.8047 20V0.511719H19.3115L19.5166 1.84375C20.0629 1.19504 20.6733 0.725775 21.3477 0.435547C22.022 0.145319 22.7009 0 23.3838 0ZM87.8594 0.557617C89.777 0.557719 91.5858 1.30074 92.9365 2.63477H92.9453L92.9541 2.62598C94.3046 3.95996 95.0546 5.73596 95.0547 7.62012C95.0547 9.37113 94.4043 11.0557 93.2119 12.3564L92.9707 12.6064C90.3775 15.1663 86.2667 15.3997 83.415 13.165L71.3662 3.75977C70.4573 3.05935 69.3729 2.68457 68.2139 2.68457C66.8549 2.68465 65.5794 3.20144 64.6289 4.14355C63.6784 5.07744 63.1611 6.31146 63.1611 7.62891C63.1611 8.94635 63.6867 10.1804 64.6289 11.1143L64.8203 11.2891C66.6464 12.9234 69.4151 13.0152 71.3662 11.4893L74.2764 9.22168L75.9854 10.5723L72.667 13.165C71.3496 14.1906 69.7819 14.7001 68.2061 14.7002C66.4717 14.7002 64.7454 14.0827 63.3779 12.8486L63.1445 12.6406C61.7771 11.2898 61.0264 9.51335 61.0264 7.62891C61.0264 5.74456 61.7773 3.96886 63.1279 2.63477C64.4871 1.30065 66.2883 0.557617 68.2061 0.557617C69.8152 0.557666 71.3909 1.10018 72.6582 2.08398L84.7236 11.4893C86.7331 13.0568 89.6354 12.8982 91.4531 11.1055L91.6445 10.9062C92.4533 10.0224 92.9121 8.85463 92.9121 7.62891C92.9121 6.31146 92.3866 5.07744 91.4443 4.14355C90.4939 3.20143 89.2183 2.68467 87.8594 2.68457C86.7004 2.68457 85.6076 3.05103 84.707 3.75977L81.8301 6.00293L80.1211 4.64355L83.4062 2.08398C84.6653 1.10007 86.2418 0.557617 87.8594 0.557617ZM6.37695 0C8.52793 4.50261e-05 10.0904 0.41423 11.0635 1.24219C12.0364 2.0702 12.5225 3.33791 12.5225 5.04492V9.75684C12.5225 10.2348 12.5827 10.5889 12.7021 10.8193C12.8216 11.0497 13.0346 11.2252 13.3418 11.3447L12.3174 14.5967C11.3957 14.5284 10.6448 14.3529 10.0645 14.0713C9.48406 13.7896 9.00546 13.3337 8.62988 12.7021C7.7421 14.0335 6.36753 14.6992 4.50684 14.6992C3.15824 14.6992 2.07015 14.2933 1.24219 13.4824C0.414207 12.6715 0 11.6261 0 10.3457C1.41448e-06 8.82628 0.563636 7.66567 1.69043 6.86328C2.81722 6.0609 4.45629 5.65918 6.60742 5.65918H7.58008V5.32617C7.58003 4.64354 7.44396 4.18235 7.1709 3.94336C6.89774 3.70436 6.37663 3.58497 5.6084 3.58496C5.19865 3.58496 4.67343 3.6493 4.0332 3.77734C3.39306 3.90538 2.73997 4.07985 2.07422 4.30176L0.972656 1.0752C1.80916 0.733773 2.71859 0.469042 3.7002 0.28125C4.68187 0.0934557 5.57454 0 6.37695 0ZM50.4736 0C52.6248 0 54.187 0.414185 55.1602 1.24219C56.1333 2.07019 56.6201 3.33773 56.6201 5.04492V9.75684C56.6201 10.2346 56.6794 10.5889 56.7988 10.8193C56.9183 11.0498 57.1321 11.2252 57.4395 11.3447L56.415 14.5967C55.4931 14.5284 54.7416 14.353 54.1611 14.0713C53.581 13.7896 53.103 13.3334 52.7275 12.7021C51.8398 14.0336 50.4652 14.6992 48.6045 14.6992C47.2558 14.6992 46.1669 14.2934 45.3389 13.4824C44.5111 12.6715 44.0977 11.6259 44.0977 10.3457C44.0977 8.82643 44.6605 7.66567 45.7871 6.86328C46.9139 6.06091 48.553 5.6592 50.7041 5.65918H51.6777V5.32617C51.6777 4.64347 51.5407 4.18233 51.2676 3.94336C50.9944 3.70447 50.4731 3.58496 49.7051 3.58496C49.2954 3.58501 48.7707 3.64938 48.1309 3.77734C47.4908 3.90536 46.8376 4.07989 46.1719 4.30176L45.0703 1.0752C45.9068 0.733767 46.8162 0.469038 47.7979 0.28125C48.7794 0.0934997 49.6713 1.4877e-05 50.4736 0ZM100.642 9.53516C100.642 10.1645 100.779 10.7239 101.056 11.2129C101.336 11.7017 101.733 12.0865 102.244 12.3672C102.756 12.6433 103.363 12.7812 104.064 12.7812C104.771 12.7812 105.38 12.6433 105.892 12.3672C106.407 12.0865 106.802 11.7017 107.073 11.2129C107.349 10.7239 107.487 10.1644 107.487 9.53516V0.556641H109.593V9.70508C109.593 10.6784 109.363 11.5414 108.906 12.293C108.449 13.0397 107.806 13.6286 106.978 14.0586C106.149 14.484 105.178 14.6962 104.064 14.6963C102.955 14.6963 101.986 14.4841 101.157 14.0586C100.329 13.6285 99.6858 13.0398 99.2285 12.293C98.7712 11.5414 98.543 10.6785 98.543 9.70508V0.556641H100.642V9.53516ZM166.458 3.89746C167.047 3.89749 167.618 3.99577 168.17 4.19043C168.722 4.38513 169.218 4.69009 169.657 5.10645C170.096 5.52298 170.443 6.06497 170.696 6.73047C170.95 7.39131 171.076 8.19479 171.076 9.14062V9.86133H163.663C163.679 10.497 163.799 11.0428 164.026 11.498C164.275 11.9868 164.622 12.3601 165.065 12.6182C165.509 12.8716 166.028 12.999 166.621 12.999C167.006 12.999 167.357 12.9446 167.674 12.8359C167.991 12.7228 168.264 12.5547 168.495 12.333C168.726 12.1113 168.903 11.8375 169.025 11.5117L170.947 11.8574C170.793 12.4232 170.517 12.9192 170.119 13.3447C169.725 13.7657 169.228 14.0946 168.631 14.3301C168.038 14.5608 167.361 14.6758 166.601 14.6758C165.573 14.6758 164.688 14.4566 163.945 14.0176C163.207 13.5739 162.636 12.9508 162.233 12.1494C161.835 11.3436 161.636 10.3994 161.636 9.31738C161.636 8.24894 161.835 7.30712 162.233 6.49219C162.636 5.67729 163.198 5.04126 163.918 4.58398C164.642 4.12678 165.489 3.89747 166.458 3.89746ZM182.402 14.4658H180.42V12.8428H180.25C180.128 13.0646 179.951 13.3183 179.72 13.6035C179.493 13.8885 179.181 14.1379 178.783 14.3506C178.385 14.5634 177.868 14.6699 177.234 14.6699C176.392 14.6699 175.64 14.4545 174.979 14.0244C174.323 13.5898 173.806 12.9713 173.431 12.1699C173.06 11.3641 172.874 10.3976 172.874 9.27051C172.874 8.14315 173.062 7.17834 173.438 6.37695C173.818 5.5756 174.339 4.96172 175 4.53613C175.661 4.11071 176.411 3.89844 177.248 3.89844C177.895 3.89848 178.416 4.00654 178.81 4.22363C179.208 4.43631 179.516 4.68568 179.733 4.9707C179.955 5.25579 180.128 5.50737 180.25 5.72461H180.372V0.556641H182.402V14.4658ZM157.832 4.0332H159.971V5.66309H157.832V11.4023C157.832 11.7961 157.89 12.0928 158.008 12.292C158.125 12.4865 158.277 12.6199 158.463 12.6924C158.653 12.7602 158.859 12.7949 159.081 12.7949C159.244 12.7949 159.387 12.7833 159.509 12.7607C159.631 12.7382 159.726 12.7196 159.794 12.7061L160.161 14.3838C160.043 14.429 159.875 14.4743 159.658 14.5195C159.441 14.5693 159.169 14.597 158.844 14.6016C158.31 14.6106 157.811 14.5155 157.35 14.3164C156.888 14.1172 156.514 13.809 156.229 13.3926C155.943 12.976 155.801 12.4526 155.801 11.8232V5.66309H154.272V4.0332H155.801V1.53418H157.832V4.0332ZM117.637 3.89746C118.347 3.8975 118.971 4.04695 119.505 4.3457C120.039 4.64 120.454 5.08007 120.748 5.66406C121.042 6.248 121.189 6.97016 121.189 7.83008V14.4658H119.158V8.0752C119.158 7.31915 118.961 6.72735 118.567 6.30176C118.174 5.87186 117.632 5.65729 116.944 5.65723C116.474 5.65723 116.054 5.75922 115.688 5.96289C115.326 6.16661 115.038 6.46569 114.825 6.85938C114.617 7.24865 114.513 7.71935 114.513 8.27148V14.4658H112.482V4.03418H114.432V5.73145H114.561C114.8 5.17928 115.176 4.73537 115.688 4.40039C116.204 4.06548 116.854 3.89751 117.637 3.89746ZM125.94 14.4658H123.909V0.556641H125.94V14.4658ZM130.704 14.4658H128.674V4.03418H130.704V14.4658ZM144.398 3.89746C145.345 3.89752 146.117 4.19501 146.715 4.78809C147.317 5.38122 147.618 6.27571 147.618 7.4707V14.4658H145.587V7.66016C145.587 6.95414 145.394 6.44289 145.01 6.12598C144.625 5.80909 144.165 5.65045 143.631 5.65039C142.97 5.65048 142.456 5.8544 142.09 6.26172C141.723 6.66463 141.539 7.18267 141.539 7.81641V14.4658H139.516V7.53125C139.516 6.96549 139.339 6.51006 138.986 6.16602C138.633 5.82202 138.173 5.6505 137.607 5.65039C137.223 5.65039 136.867 5.75239 136.541 5.95605C136.22 6.15524 135.959 6.43342 135.76 6.79102C135.565 7.14871 135.468 7.5633 135.468 8.03418V14.4658H133.438V4.03418H135.387V5.73145H135.516C135.733 5.15659 136.089 4.70812 136.582 4.38672C137.075 4.06096 137.667 3.89746 138.354 3.89746C139.051 3.89754 139.636 4.06085 140.106 4.38672C140.582 4.71267 140.933 5.1611 141.159 5.73145H141.268C141.517 5.17467 141.913 4.73087 142.456 4.40039C142.999 4.06547 143.647 3.8975 144.398 3.89746ZM152.37 14.4658H150.34V4.03418H152.37V14.4658ZM39.0781 0C40.2216 9.32368e-05 41.1221 0.35842 41.7793 1.0752C42.4366 1.79223 42.7656 2.80017 42.7656 4.09766V14.1865H37.6943V5.01953C37.6943 4.50773 37.6308 4.15762 37.5029 3.96973C37.3749 3.78199 37.1827 3.68755 36.9268 3.6875C36.3634 3.6875 35.7914 4.1401 35.2109 5.04492V14.1865H30.1406V0.511719H34.5703L34.9287 1.9209C35.5603 1.25514 36.2051 0.768242 36.8623 0.460938C37.5196 0.153638 38.2586 0 39.0781 0ZM177.683 5.62305C177.071 5.62305 176.562 5.78178 176.154 6.09863C175.747 6.41553 175.439 6.84781 175.23 7.39551C175.027 7.94336 174.925 8.56179 174.925 9.25C174.925 9.94707 175.029 10.5741 175.237 11.1309C175.446 11.6876 175.754 12.1291 176.161 12.4551C176.573 12.7765 177.081 12.9375 177.683 12.9375C178.267 12.9374 178.76 12.7834 179.163 12.4756C179.57 12.1632 179.879 11.731 180.087 11.1787C180.3 10.6264 180.406 9.98339 180.406 9.25C180.406 8.52579 180.302 7.89185 180.094 7.34863C179.886 6.80539 179.58 6.38147 179.177 6.07812C178.774 5.77483 178.276 5.6231 177.683 5.62305ZM7.04492 8.2959C6.32819 8.29595 5.79939 8.4247 5.45801 8.68066C5.11656 8.93675 4.94531 9.32916 4.94531 9.8584C4.94531 10.2511 5.04806 10.5625 5.25293 10.793C5.4578 11.0234 5.73082 11.1387 6.07227 11.1387C6.37946 11.1387 6.66515 11.0617 6.92969 10.9082C7.19429 10.7546 7.41229 10.5583 7.58301 10.3193V8.2959H7.04492ZM51.1465 8.2959C50.4294 8.2959 49.9 8.42458 49.5586 8.68066C49.2172 8.93675 49.0459 9.32919 49.0459 9.8584C49.0459 10.251 49.1487 10.5625 49.3535 10.793C49.5583 11.0234 49.8315 11.1386 50.1729 11.1387C50.4802 11.1387 50.7666 11.0619 51.0312 10.9082C51.2957 10.7546 51.5129 10.5582 51.6836 10.3193V8.2959H51.1465ZM21.667 3.63574C20.95 3.63581 20.353 4.06248 19.875 4.91602V10.1396C20.0969 10.481 20.3274 10.724 20.5664 10.8691C20.8054 11.0142 21.0785 11.0869 21.3857 11.0869C22.666 11.0867 23.3057 9.84932 23.3057 7.37402C23.3057 6.33263 23.2381 5.53849 23.1016 4.99219C22.965 4.44611 22.7812 4.08357 22.5508 3.9043C22.3203 3.72504 22.0255 3.63574 21.667 3.63574ZM166.472 5.5752C165.901 5.5752 165.403 5.71556 164.978 5.99609C164.557 6.27226 164.23 6.63482 163.999 7.08301C163.8 7.47226 163.689 7.89136 163.665 8.33984H169.086C169.086 7.80562 168.978 7.33192 168.761 6.91992C168.544 6.50355 168.237 6.17548 167.844 5.93555C167.454 5.69563 166.997 5.57525 166.472 5.5752ZM129.699 0C130.052 6.41347e-05 130.354 0.120447 130.603 0.360352C130.856 0.595728 130.982 0.88093 130.982 1.21582C130.982 1.54619 130.856 1.8314 130.603 2.07129C130.354 2.30667 130.052 2.42474 129.699 2.4248C129.346 2.4248 129.043 2.30663 128.789 2.07129C128.54 1.83138 128.416 1.54623 128.416 1.21582C128.416 0.880884 128.54 0.595747 128.789 0.360352C129.043 0.12048 129.346 4.03251e-06 129.699 0ZM151.365 0C151.718 0.000126588 152.02 0.120509 152.269 0.360352C152.522 0.5957 152.648 0.880999 152.648 1.21582C152.648 1.54612 152.522 1.83143 152.269 2.07129C152.02 2.30661 151.718 2.42468 151.365 2.4248C151.012 2.4248 150.709 2.30662 150.455 2.07129C150.206 1.83135 150.081 1.54629 150.081 1.21582C150.081 0.880814 150.206 0.595775 150.455 0.360352C150.709 0.120476 151.012 0 151.365 0Z";
function LogoApnaUnlimited({
  className,
  variant = "default",
  ...props
}) {
  const gradientId = React10.useId();
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
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
        variant === "gradient" && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { style: { stopColor: "var(--color-apna-gold-600)" } }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("stop", { offset: "1", style: { stopColor: "var(--color-apna-gold-400)" } })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
var import_jsx_runtime43 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-border/80 hover:shadow-xs",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 overflow-hidden", children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("img", { src: logoUrl, alt: `${company} logo`, className: "h-full w-full object-cover" }) : /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react.Building2, { className: "h-6 w-6 text-muted-foreground/60" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "space-y-1 text-left", children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("h3", { className: "font-heading text-lg font-semibold leading-tight text-foreground line-clamp-1", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("p", { className: "text-sm font-medium text-muted-foreground", children: company })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Badge, { variant: "outline", className: "gap-1.5 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react.MapPin, { className: "h-3.5 w-3.5" }),
            location
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Badge, { variant: "outline", className: "gap-1.5 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react.Briefcase, { className: "h-3.5 w-3.5" }),
            jobType
          ] }),
          salary && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Badge, { variant: "outline", className: "gap-1.5 font-medium text-foreground bg-muted/30", children: salary })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Separator, { className: "opacity-50" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react.Clock, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { children: postedAt })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Button, { variant: "outline", onClick: onSave, className: "h-9 w-9 p-0 sm:w-auto sm:px-4 shrink-0 cursor-pointer", "aria-label": "Save Job", children: [
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react.BookmarkPlus, { className: "h-4 w-4 sm:mr-2" }),
              /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { className: "hidden sm:inline", children: "Save" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Button, { variant: "default", onClick: onApply, className: "h-9 px-6 shrink-0 cursor-pointer", children: "Apply Now" })
          ] })
        ] })
      ]
    }
  );
}

// src/components/ui/pricing-card.tsx
var import_jsx_runtime44 = (
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
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
    "div",
    {
      "data-slot": "pricing-card",
      className: cn(
        // `card-hover-lift` is the shared card interaction (see styles/index.css).
        "card-hover-lift relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-border bg-card p-4 pb-4 pt-8",
        props.onClick && "cursor-pointer",
        className
      ),
      ...props,
      children: [
        ribbon && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "absolute right-0 top-0 flex rounded-bl-xl", children: ribbon }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "text-lg font-semibold text-foreground", children: title }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "text-2xs text-muted-foreground", children: subtitle }),
          meta && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: meta })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("hr", { className: "border-border" }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "text-base font-semibold text-foreground", children: price }),
              mrp && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "text-sm text-muted-foreground line-through", children: mrp })
            ] }),
            badge && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "shrink-0", children: badge })
          ] }),
          priceSuffix && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "text-xs italic text-muted-foreground", children: priceSuffix })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "mt-auto", children: cta })
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