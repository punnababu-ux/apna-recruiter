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
| Toggle           | `import { Toggle } from "@/components/ui/toggle"`                       | On/off button. Use for formatting toolbars.      |
| ToggleGroup      | `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"` | Multiple toggles, single- or multi-select.       |

## Form & Input

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Field            | `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"` | Label + control + help/error wrapper.            |
| Label            | `import { Label } from "@/components/ui/label"`                         | Accessible form label.                           |
| Input            | `import { Input } from "@/components/ui/input"`                         | Single-line text input.                          |
| InputGroup       | `import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"` | Input with leading/trailing addons.              |
| InputOTP         | `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"` | One-time-password segmented input.               |
| Textarea         | `import { Textarea } from "@/components/ui/textarea"`                   | Multi-line input.                                |
| Checkbox         | `import { Checkbox } from "@/components/ui/checkbox"`                   | Binary toggle with `indeterminate` support.      |
| RadioGroup       | `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"` | Single-select from 2+ options.                   |
| Switch           | `import { Switch } from "@/components/ui/switch"`                       | Instant on/off. Persist on change.               |
| Slider           | `import { Slider } from "@/components/ui/slider"`                       | Numeric range selector.                          |
| Select           | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"` | Styled dropdown. Use for 4+ options.             |
| NativeSelect     | `import { NativeSelect } from "@/components/ui/native-select"`          | Platform-native select. Use on mobile forms.     |
| Combobox         | `import { Combobox, ComboboxInput, ComboboxContent, ComboboxItem } from "@/components/ui/combobox"` | Typeahead select. Search over many options.      |
| DatePicker       | `import { DatePicker } from "@/components/ui/date-picker"`              | Popover + Calendar convenience for single dates. |

## Display

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Avatar           | `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"` | User image with fallback. Supports groups.       |
| Badge            | `import { Badge } from "@/components/ui/badge"`                         | Small status / count marker.                     |
| Card             | `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"` | Elevated container for related content.          |
| Kbd              | `import { Kbd } from "@/components/ui/kbd"`                             | Inline keyboard shortcut marker.                 |
| Skeleton         | `import { Skeleton } from "@/components/ui/skeleton"`                   | Loading placeholder shape.                       |
| Spinner          | `import { Spinner } from "@/components/ui/spinner"`                     | Indeterminate loading indicator.                 |
| Progress         | `import { Progress } from "@/components/ui/progress"`                   | Determinate progress bar.                        |
| Separator        | `import { Separator } from "@/components/ui/separator"`                 | Horizontal or vertical divider.                  |
| AspectRatio      | `import { AspectRatio } from "@/components/ui/aspect-ratio"`            | Locks child to a ratio. Useful for media.        |
| Empty            | `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"` | Empty-state scaffold.                            |
| Item             | `import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"` | Horizontal list row with media + actions.        |

## Feedback

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Alert            | `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"` | Static banner. Use for persistent messages.      |
| Sonner (toast)   | `import { toast } from "sonner"`                                        | Transient toast. Mounted via `<Toaster />` in root layout. |

## Overlays

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tooltip          | `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"` | Short hover hint. Not for interactive content.   |
| HoverCard        | `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"` | Rich hover preview. Interactive allowed.         |
| Popover          | `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"` | Click-open floating panel.                       |
| Dialog           | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"` | Modal. Focus-trapped.                            |
| AlertDialog      | `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"` | Confirm destructive / irreversible actions.      |
| Sheet            | `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"` | Edge-docked drawer.                              |
| Drawer           | `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"` | Bottom-sheet, mobile-first.                      |
| DropdownMenu     | `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"` | Action menu anchored to a trigger.               |
| ContextMenu      | `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu"` | Right-click / long-press menu.                   |
| Menubar          | `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar"` | Horizontal app-level menu bar.                   |

## Navigation

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tabs             | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"` | Sectioned view switcher.                         |
| Breadcrumb       | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"` | Hierarchical location trail.                     |
| Pagination       | `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"` | Paged data navigator.                            |
| NavigationMenu   | `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"` | Top-level site nav with fly-outs.                |
| Sidebar          | `import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"` | Persistent app sidebar with collapse.            |

## Containers & Layout

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Accordion        | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"` | Expand/collapse grouped content.                 |
| Collapsible      | `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"` | Single expand/collapse region.                   |
| Resizable        | `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"` | Drag-resizable split panes.                      |
| ScrollArea       | `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`   | Styled custom scrollbars.                        |

## Data

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Table            | `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter } from "@/components/ui/table"` | Semantic tabular data.                           |
| Chart            | `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart"` | Recharts wrapper with design-system theming.     |

## Complex / composite

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Calendar         | `import { Calendar } from "@/components/ui/calendar"`                   | Date picker built on react-day-picker.           |
| Carousel         | `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"` | Horizontal slide viewer (embla).                 |
| Command          | `import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty, CommandSeparator, CommandShortcut } from "@/components/ui/command"` | Command palette / searchable list.               |

## Utility

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Direction        | `import { Direction } from "@/components/ui/direction"`                 | RTL/LTR direction provider.                      |
| ThemeToggle      | `import { ThemeToggle } from "@/components/ui/theme-toggle"`            | Light/dark/system theme switcher (next-themes).  |

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
