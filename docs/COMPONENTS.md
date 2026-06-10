# Components

Inventory of every component in `src/components/ui/`. Import snippets are
copy-paste ready. If you add a component, add it here in the same commit.

> **Before you build a new one:** ⌘-F this file. The closest match is almost
> always enough. See `AGENTS.md` for the component-first rule.

---

## Actions

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Button           | `import { Button } from "@/components/ui/button"`                       | Primary action surface. 6 variants × 4 sizes.    |
| ButtonGroup      | `import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"` | Horizontally grouped buttons with shared border. |
| BackButton       | `import { BackButton } from "@/components/ui/back-button"`             | Standard back button with border and ChevronLeft. |
| Toggle           | `import { Toggle } from "@/components/ui/toggle"`                       | On/off button. Use for formatting toolbars.      |
| ToggleGroup      | `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"` | Multiple toggles, single- or multi-select.       |

## Form & Input

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Field            | `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"` | Label + control + help/error wrapper.            |
| Label            | `import { Label } from "@/components/ui/label"`                         | Accessible form label.                           |
| Input            | `import { Input } from "@/components/ui/input"`                         | Single-line text input.                          |
| Textarea         | `import { Textarea } from "@/components/ui/textarea"`                   | Multi-line input.                                |
| Checkbox         | `import { Checkbox } from "@/components/ui/checkbox"`                   | Binary toggle with `indeterminate` support.      |
| RadioGroup       | `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"` | Single-select from 2+ options.                   |
| Switch           | `import { Switch } from "@/components/ui/switch"`                       | Instant on/off. Persist on change.               |
| Select           | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"` | Styled dropdown. Use for 4+ options.             |

## Display

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Avatar           | `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"` | User image with fallback. Supports groups.       |
| Badge            | `import { Badge } from "@/components/ui/badge"`                         | Small status / count marker.                     |
| Skeleton         | `import { Skeleton } from "@/components/ui/skeleton"`                   | Loading placeholder shape.                       |
| Spinner          | `import { Spinner } from "@/components/ui/spinner"`                     | Indeterminate loading indicator.                 |
| Separator        | `import { Separator } from "@/components/ui/separator"`                 | Horizontal or vertical divider.                  |
| Empty            | `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"` | Empty-state scaffold.                            |

## Feedback

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Alert            | `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"` | Static banner. Use for persistent messages.      |
| Sonner (toast)   | `import { toast } from "sonner"`                                        | Transient toast. Mounted via `<Toaster />` in root layout. |

## Overlays

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tooltip          | `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"` | Short hover hint. Not for interactive content.   |
| Popover          | `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"` | Click-open floating panel.                       |
| Dialog           | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"` | Modal. Focus-trapped.                            |
| AlertDialog      | `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"` | Confirm destructive / irreversible actions.      |
| Sheet            | `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"` | Edge-docked drawer.                              |

## Navigation

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tabs             | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"` | Sectioned view switcher.                         |
| Breadcrumb       | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"` | Hierarchical location trail.                     |
| Sidebar          | `import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"` | Persistent app sidebar with collapse.            |

## Containers & Layout

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Accordion        | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"` | Expand/collapse grouped content.                 |

## Data

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Table            | `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter } from "@/components/ui/table"` | Semantic tabular data.                           |

---

## Conventions every component follows

- `"use client"` at the top only when necessary.
- Root element carries `data-slot="<component-name>"` for styling hooks.
- `className` merged through `cn()` (`@/lib/utils`).
- Built on Base UI (`@base-ui/react`) primitives where available.
- Trigger-style props use Base UI's `render={<Component … />}` pattern, not
  Radix-style `asChild`.
- Variant props powered by `class-variance-authority`. Variants exported
  alongside the component when they're part of the public API.
- Only semantic tokens in `className`. No raw colours.
