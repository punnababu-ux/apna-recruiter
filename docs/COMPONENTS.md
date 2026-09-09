# Design System Components

Inventory of components in `@apna/design-system`. Organized according to **Ant Design / Material Design 3 (M3)** component taxonomy. Import snippets are copy-paste ready.

> **Before you build a new one:** ⌘-F this file. The closest match is almost always enough. See `AGENTS.md` for the component-first rule.

---

## 1. Actions

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Button           | `import { Button } from "@apna/design-system"`                         | Primary action surface. 6 variants × 4 sizes.    |
| ButtonGroup      | `import { ButtonGroup, ButtonGroupText } from "@apna/design-system"`   | Horizontally grouped buttons with shared border. |
| BackButton       | `import { BackButton } from "@apna/design-system"`                     | Standard back button with border and ChevronLeft. |
| Toggle           | `import { Toggle } from "@apna/design-system"`                         | On/off button. Use for formatting toolbars.      |
| ToggleGroup      | `import { ToggleGroup, ToggleGroupItem } from "@apna/design-system"`   | Multiple toggles, single- or multi-select.       |

## 2. Form & Inputs

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Field            | `import { Field, FieldLabel, FieldDescription, FieldError } from "@apna/design-system"` | Label + control + help/error wrapper. |
| Label            | `import { Label } from "@apna/design-system"`                         | Accessible form label.                           |
| Input            | `import { Input } from "@apna/design-system"`                         | Single-line text input.                          |
| Textarea         | `import { Textarea } from "@apna/design-system"`                       | Multi-line input.                                |
| Checkbox         | `import { Checkbox } from "@apna/design-system"`                       | Binary toggle with `indeterminate` support.      |
| RadioGroup       | `import { RadioGroup, RadioGroupItem } from "@apna/design-system"`     | Single-select from 2+ options.                   |
| Switch           | `import { Switch } from "@apna/design-system"`                         | Instant on/off. Persist on change.               |
| Select           | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@apna/design-system"` | Styled dropdown. Use for 4+ options. |
| Slider           | `import { Slider } from "@apna/design-system"`                         | Range input slider built on Base UI Slider.      |
| SearchFilterBar  | `import { SearchFilterBar } from "@apna/design-system"`               | Search input with optional multi-group filter popover. |

## 3. Data Display

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Avatar           | `import { Avatar, AvatarImage, AvatarFallback } from "@apna/design-system"` | User image with fallback. Supports groups.  |
| Badge            | `import { Badge } from "@apna/design-system"`                         | Status / count marker (`variant`: 7 roles, `size`: "default" · "sm"). |
| MetricCard       | `import { MetricCard } from "@apna/design-system"`                    | Metric summary card with value, icon, and trend. |
| Skeleton         | `import { Skeleton } from "@apna/design-system"`                       | Loading placeholder shape.                       |
| Spinner          | `import { Spinner } from "@apna/design-system"`                       | Indeterminate loading indicator.                 |
| Separator        | `import { Separator } from "@apna/design-system"`                     | Horizontal or vertical divider.                  |
| Empty            | `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@apna/design-system"` | Empty-state scaffold. |

## 4. Navigation

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tabs             | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@apna/design-system"` | Sectioned view switcher.            |
| ChipTabs         | `import { ChipTabs } from "@apna/design-system"`                      | Segmented control / pill-shaped choice tabs.     |
| SegmentedTabSwitcher | `import { SegmentedTabSwitcher } from "@apna/design-system"`      | Responsive section switcher — two-line desktop pill, horizontal-scroll mobile chip carousel. Extracted from self-checkout. |
| Breadcrumb       | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@apna/design-system"` | Hierarchical location trail. |
| Sidebar          | `import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@apna/design-system"` | Persistent app sidebar primitives. |
| ReusableSidebar  | `import { ReusableSidebar } from "@apna/design-system"`                | High-level configurable sidebar shell.           |
| BottomNav        | `import { BottomNav, type BottomNavItem } from "@apna/design-system"` | Fixed mobile bottom tab bar. Hidden at `md+`. Items accept `href` (link) or `onClick` (button) + optional `badge` overlay. |

## 5. Overlays & Dialogs

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tooltip          | `import { Tooltip, TooltipTrigger, TooltipContent } from "@apna/design-system"` | Short hover hint. Not for interactive content. |
| Popover          | `import { Popover, PopoverTrigger, PopoverContent } from "@apna/design-system"` | Click-open floating panel.          |
| DropdownMenu     | `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@apna/design-system"` | Popup action menu built on Base UI Menu. |
| Dialog           | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@apna/design-system"` | Modal. Focus-trapped. |
| AlertDialog      | `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@apna/design-system"` | Confirm destructive / irreversible actions. |
| Sheet            | `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@apna/design-system"` | Edge-docked drawer. |

## 6. Feedback & Status

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Alert            | `import { Alert, AlertTitle, AlertDescription } from "@apna/design-system"` | Static banner. Use for persistent messages. |
| AlertBanner      | `import { AlertBanner } from "@apna/design-system"`                   | High-emphasis action banner with icon, title, and action button. |
| Sonner (toast)   | `import { toast } from "sonner"`                                       | Transient toast. Mounted via `<Toaster />` in root layout. |

## 7. Data & Layout

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Table            | `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter } from "@apna/design-system"` | Semantic tabular data. |
| Accordion        | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@apna/design-system"` | Expand/collapse grouped content. |
| JobCard          | `import { JobCard } from "@apna/design-system"`                        | Candidate-facing job post card.                  |
| PricingCard      | `import { PricingCard } from "@apna/design-system"`                    | Plan/bundle card — ribbon, price+MRP+badge, CTA slot. Pure layout; caller supplies coloured ribbon/badge/cta. |
| ApnaLogo         | `import { ApnaLogo } from "@apna/design-system"`                       | Brand mark lockup with gradient and wordmark.    |
| LogoApnaUnlimited | `import { LogoApnaUnlimited } from "@apna/design-system"`             | "apna ∞ Unlimited" wordmark — `variant="default\|white\|gradient"` (dark/light/Accent-Gradient fill). |

---

## Conventions every component follows

- `"use client"` at the top only when necessary.
- Root element carries `data-slot="<component-name>"` for styling hooks.
- `className` merged through `cn()` (`@/lib/utils`).
- Built on Base UI (`@base-ui/react`) primitives where available.
- Trigger-style props use Base UI's `render={<Component … />}` pattern.
- Variant props powered by `class-variance-authority`.
- Only semantic tokens in `className`. No raw colours.
