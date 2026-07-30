import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React$1 from 'react';
import { Button as Button$1 } from '@base-ui/react/button';
import { VariantProps } from 'class-variance-authority';
import { useRender } from '@base-ui/react/use-render';
import { Separator as Separator$1 } from '@base-ui/react/separator';
import { Toggle as Toggle$1 } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroup$1 } from '@base-ui/react/toggle-group';
import { LucideIcon } from 'lucide-react';
import { Checkbox as Checkbox$1 } from '@base-ui/react/checkbox';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup as RadioGroup$1 } from '@base-ui/react/radio-group';
import { Switch as Switch$1 } from '@base-ui/react/switch';
import { Select as Select$1 } from '@base-ui/react/select';
import { Slider as Slider$1 } from '@base-ui/react/slider';
import { Avatar as Avatar$1 } from '@base-ui/react/avatar';
import { Tabs as Tabs$1 } from '@base-ui/react/tabs';
import { Tooltip as Tooltip$1 } from '@base-ui/react/tooltip';
import { Popover as Popover$1 } from '@base-ui/react/popover';
import { Menu } from '@base-ui/react/menu';
import { Dialog as Dialog$1 } from '@base-ui/react/dialog';
import { AlertDialog as AlertDialog$1 } from '@base-ui/react/alert-dialog';
import { ToasterProps } from 'sonner';
import { Accordion as Accordion$1 } from '@base-ui/react/accordion';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
type ButtonProps = Button$1.Props & VariantProps<typeof buttonVariants> & {
    /** Show a spinner and block interaction. Sets aria-busy for a11y. */
    loading?: boolean;
    /** Optional label to replace children while loading. */
    loadingText?: React$1.ReactNode;
    /** Optional icon element to render before children. Mutually exclusive with trailingIcon. */
    leadingIcon?: React$1.ReactNode;
    /** Optional icon element to render after children. Mutually exclusive with leadingIcon. */
    trailingIcon?: React$1.ReactNode;
};
declare function Button({ className, variant, size, loading, loadingText, leadingIcon, trailingIcon, disabled, children, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

declare function Separator({ className, orientation, ...props }: Separator$1.Props): react_jsx_runtime.JSX.Element;

declare const buttonGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>): react_jsx_runtime.JSX.Element;
declare function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;
declare function ButtonGroupSeparator({ className, orientation, ...props }: React.ComponentProps<typeof Separator>): react_jsx_runtime.JSX.Element;

declare function BackButton({ onClick, className, ...props }: Omit<React$1.ComponentProps<typeof Button>, "children" | "variant" | "size">): react_jsx_runtime.JSX.Element;

declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, ...props }: Toggle$1.Props & VariantProps<typeof toggleVariants>): react_jsx_runtime.JSX.Element;

declare function ToggleGroup({ className, variant, size, spacing, orientation, children, ...props }: ToggleGroup$1.Props & VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
}): react_jsx_runtime.JSX.Element;
declare function ToggleGroupItem({ className, children, variant, size, ...props }: Toggle$1.Props & VariantProps<typeof toggleVariants>): react_jsx_runtime.JSX.Element;

declare function Label({ className, ...props }: React$1.ComponentProps<"label">): react_jsx_runtime.JSX.Element;

declare function FieldSet({ className, ...props }: React$1.ComponentProps<"fieldset">): react_jsx_runtime.JSX.Element;
declare function FieldLegend({ className, variant, ...props }: React$1.ComponentProps<"legend"> & {
    variant?: "legend" | "label";
}): react_jsx_runtime.JSX.Element;
declare function FieldGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const fieldVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | "responsive" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function Field({ className, orientation, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof fieldVariants>): react_jsx_runtime.JSX.Element;
declare function FieldContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function FieldLabel({ className, icon: Icon, children, ...props }: React$1.ComponentProps<typeof Label> & {
    icon?: LucideIcon;
}): react_jsx_runtime.JSX.Element;
declare function FieldTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function FieldDescription({ className, ...props }: React$1.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function FieldSeparator({ children, className, ...props }: React$1.ComponentProps<"div"> & {
    children?: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function FieldError({ className, children, errors, ...props }: React$1.ComponentProps<"div"> & {
    errors?: Array<{
        message?: string;
    } | undefined>;
}): react_jsx_runtime.JSX.Element | null;

declare const inputVariants: (props?: ({
    inputSize?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
type InputProps = Omit<React$1.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>;
declare function Input({ className, type, inputSize, ...props }: InputProps): react_jsx_runtime.JSX.Element;

declare const textareaVariants: (props?: ({
    inputSize?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
type TextareaProps = React$1.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>;
declare function Textarea({ className, inputSize, ...props }: TextareaProps): react_jsx_runtime.JSX.Element;

declare function Checkbox({ className, ...props }: Checkbox$1.Root.Props): react_jsx_runtime.JSX.Element;

declare function RadioGroup({ className, ...props }: RadioGroup$1.Props): react_jsx_runtime.JSX.Element;
declare function RadioGroupItem({ className, ...props }: Radio.Root.Props): react_jsx_runtime.JSX.Element;

declare function Switch({ className, size, ...props }: Switch$1.Root.Props & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;

declare const Select: typeof Select$1.Root;
declare function SelectGroup({ className, ...props }: Select$1.Group.Props): react_jsx_runtime.JSX.Element;
declare function SelectValue({ className, ...props }: Select$1.Value.Props): react_jsx_runtime.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: Select$1.Trigger.Props & {
    size?: "sm" | "default";
}): react_jsx_runtime.JSX.Element;
declare function SelectContent({ className, children, side, sideOffset, align, alignOffset, alignItemWithTrigger, ...props }: Select$1.Popup.Props & Pick<Select$1.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger">): react_jsx_runtime.JSX.Element;
declare function SelectLabel({ className, ...props }: Select$1.GroupLabel.Props): react_jsx_runtime.JSX.Element;
declare function SelectItem({ className, children, ...props }: Select$1.Item.Props): react_jsx_runtime.JSX.Element;
declare function SelectSeparator({ className, ...props }: Select$1.Separator.Props): react_jsx_runtime.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof Select$1.ScrollUpArrow>): react_jsx_runtime.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof Select$1.ScrollDownArrow>): react_jsx_runtime.JSX.Element;

declare function Slider({ className, defaultValue, value, min, max, step, ...props }: Slider$1.Root.Props): react_jsx_runtime.JSX.Element;

declare function Avatar({ className, size, ...props }: Avatar$1.Root.Props & {
    size?: "default" | "sm" | "lg";
}): react_jsx_runtime.JSX.Element;
declare function AvatarImage({ className, ...props }: Avatar$1.Image.Props): react_jsx_runtime.JSX.Element;
declare function AvatarFallback({ className, ...props }: Avatar$1.Fallback.Props): react_jsx_runtime.JSX.Element;
declare function AvatarBadge({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function AvatarGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AvatarGroupCount({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | "info" | "success" | "warning" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, render, ...props }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;

declare function Skeleton({ className, variant, ...props }: React.ComponentProps<"div"> & {
    variant?: "default" | "ai";
}): react_jsx_runtime.JSX.Element;

declare function Spinner({ className, ...props }: React.ComponentProps<"svg">): react_jsx_runtime.JSX.Element;

declare function Empty({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const emptyMediaVariants: (props?: ({
    variant?: "default" | "icon" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>): react_jsx_runtime.JSX.Element;
declare function EmptyTitle({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyDescription({ className, ...props }: React.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function EmptyContent({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function Tabs({ className, orientation, ...props }: Tabs$1.Root.Props): react_jsx_runtime.JSX.Element;
declare const tabsListVariants: (props?: ({
    variant?: "line" | "default" | "inverted" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function TabsList({ className, variant, ...props }: Tabs$1.List.Props & VariantProps<typeof tabsListVariants>): react_jsx_runtime.JSX.Element;
declare function TabsTrigger({ className, ...props }: Tabs$1.Tab.Props): react_jsx_runtime.JSX.Element;
declare function TabsContent({ className, ...props }: Tabs$1.Panel.Props): react_jsx_runtime.JSX.Element;

type ChipTabItem<V extends string = string> = {
    value: V;
    label: React$1.ReactNode;
    count?: number;
    /** Render the chip non-interactive and dimmed (e.g. an option that
     *  isn't valid given another selection). */
    disabled?: boolean;
};
declare function ChipTabs<V extends string = string>({ items, value, onValueChange, className, size, variant, "aria-label": ariaLabel, "aria-invalid": ariaInvalid, }: {
    items: ChipTabItem<V>[];
    value: V;
    onValueChange: (next: V) => void;
    className?: string;
    size?: "sm" | "md";
    /**
     * Visual treatment:
     * - "default" — segmented control: active chip on the `secondary`
     *   surface, inactive chips text-only. Use for view-switching tabs.
     * - "choice" — single-select form field: inactive chips are filled
     *   grey, the selected chip gets a green (brand) tint + green border.
     */
    variant?: "default" | "choice";
    "aria-label"?: string;
    /** When true (e.g. a required, unselected field), inactive chips gain a
     *  destructive outline to signal a selection is needed. */
    "aria-invalid"?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function Breadcrumb({ className, ...props }: React$1.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbList({ className, ...props }: React$1.ComponentProps<"ol">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;
declare function BreadcrumbPage({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare function TooltipProvider({ delay, ...props }: Tooltip$1.Provider.Props): react_jsx_runtime.JSX.Element;
declare function Tooltip({ ...props }: Tooltip$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function TooltipTrigger({ ...props }: Tooltip$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function TooltipContent({ className, side, sideOffset, align, alignOffset, children, ...props }: Tooltip$1.Popup.Props & Pick<Tooltip$1.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">): react_jsx_runtime.JSX.Element;

type SidebarContextProps = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare function useSidebar(): SidebarContextProps;
declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: React$1.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): react_jsx_runtime.JSX.Element;
declare function Sidebar({ side, variant, collapsible, className, children, dir, ...props }: React$1.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}): react_jsx_runtime.JSX.Element;
declare function SidebarTrigger({ className, onClick, ...props }: React$1.ComponentProps<typeof Button>): react_jsx_runtime.JSX.Element;
declare function SidebarRail({ className, ...props }: React$1.ComponentProps<"button">): react_jsx_runtime.JSX.Element;
declare function SidebarInset({ className, ...props }: React$1.ComponentProps<"main">): react_jsx_runtime.JSX.Element;
declare function SidebarInput({ className, ...props }: React$1.ComponentProps<typeof Input>): react_jsx_runtime.JSX.Element;
declare function SidebarHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarSeparator({ className, ...props }: React$1.ComponentProps<typeof Separator>): react_jsx_runtime.JSX.Element;
declare function SidebarContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarGroupLabel({ className, render, ...props }: useRender.ComponentProps<"div"> & React$1.ComponentProps<"div">): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;
declare function SidebarGroupAction({ className, render, ...props }: useRender.ComponentProps<"button"> & React$1.ComponentProps<"button">): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;
declare function SidebarGroupContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarMenu({ className, ...props }: React$1.ComponentProps<"ul">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuItem({ className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function SidebarMenuButton({ render, isActive, variant, size, tooltip, className, ...props }: useRender.ComponentProps<"button"> & React$1.ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | React$1.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): react_jsx_runtime.JSX.Element;
declare function SidebarMenuAction({ className, render, showOnHover, ...props }: useRender.ComponentProps<"button"> & React$1.ComponentProps<"button"> & {
    showOnHover?: boolean;
}): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;
declare function SidebarMenuBadge({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSkeleton({ className, showIcon, ...props }: React$1.ComponentProps<"div"> & {
    showIcon?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSub({ className, ...props }: React$1.ComponentProps<"ul">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSubItem({ className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSubButton({ render, size, isActive, className, ...props }: useRender.ComponentProps<"a"> & React$1.ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
}): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;

type SidebarWorkspace = {
    id: string;
    name: string;
    subtext?: string;
    logoUrl?: string;
    fallbackLetter: string;
};
type SidebarSubNavItem = {
    href: string;
    label: string;
};
type SidebarNavItem = {
    href?: string;
    label: string;
    icon: React$1.ComponentType<React$1.SVGProps<SVGSVGElement>>;
    items?: SidebarSubNavItem[];
    badge?: React$1.ReactNode;
};
type SidebarAlertBanner = {
    id: string;
    title: string;
    description: string;
    ctaText?: string;
    onCtaClick?: () => void;
};
type SidebarBrand = {
    name: string;
    logo: React$1.ReactNode;
    href?: string;
};
type ReusableSidebarProps = {
    brand: SidebarBrand;
    workspaces: SidebarWorkspace[];
    activeWorkspaceId: string;
    onWorkspaceChange: (w: SidebarWorkspace) => void;
    navItems: SidebarNavItem[];
    bottomCta?: {
        label: string;
        icon: React$1.ComponentType<React$1.SVGProps<SVGSVGElement>>;
        href: string;
    };
    alertBanner?: SidebarAlertBanner;
    footerItems?: {
        href: string;
        label: string;
        icon: React$1.ComponentType<React$1.SVGProps<SVGSVGElement>>;
    }[];
    dropdownClassName?: string;
};
declare function ReusableSidebar({ brand, workspaces, activeWorkspaceId, onWorkspaceChange, navItems, bottomCta, alertBanner, footerItems, dropdownClassName, }: ReusableSidebarProps): react_jsx_runtime.JSX.Element;

declare function Popover({ ...props }: Popover$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: Popover$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function PopoverContent({ className, align, alignOffset, side, sideOffset, ...props }: Popover$1.Popup.Props & Pick<Popover$1.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">): react_jsx_runtime.JSX.Element;
declare function PopoverHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function PopoverTitle({ className, ...props }: Popover$1.Title.Props): react_jsx_runtime.JSX.Element;
declare function PopoverDescription({ className, ...props }: Popover$1.Description.Props): react_jsx_runtime.JSX.Element;

declare function DropdownMenu({ ...props }: Menu.Root.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuPortal({ ...props }: Menu.Portal.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuTrigger({ ...props }: Menu.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuContent({ align, alignOffset, side, sideOffset, className, ...props }: Menu.Popup.Props & Pick<Menu.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">): react_jsx_runtime.JSX.Element;
declare function DropdownMenuGroup({ ...props }: Menu.Group.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: Menu.GroupLabel.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, ...props }: Menu.Item.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSub({ ...props }: Menu.SubmenuRoot.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: Menu.SubmenuTrigger.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSubContent({ align, alignOffset, side, sideOffset, className, ...props }: React$1.ComponentProps<typeof DropdownMenuContent>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }: Menu.CheckboxItem.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: Menu.RadioGroup.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, inset, ...props }: Menu.RadioItem.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: Menu.Separator.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare function Dialog({ ...props }: Dialog$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function DialogTrigger({ ...props }: Dialog$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function DialogPortal({ ...props }: Dialog$1.Portal.Props): react_jsx_runtime.JSX.Element;
declare function DialogClose({ ...props }: Dialog$1.Close.Props): react_jsx_runtime.JSX.Element;
declare function DialogOverlay({ className, ...props }: Dialog$1.Backdrop.Props): react_jsx_runtime.JSX.Element;
declare function DialogContent({ className, children, showCloseButton, ...props }: Dialog$1.Popup.Props & {
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DialogHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ className, showCloseButton, children, ...props }: React$1.ComponentProps<"div"> & {
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DialogTitle({ className, ...props }: Dialog$1.Title.Props): react_jsx_runtime.JSX.Element;
declare function DialogDescription({ className, ...props }: Dialog$1.Description.Props): react_jsx_runtime.JSX.Element;

declare function AlertDialog({ ...props }: AlertDialog$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function AlertDialogTrigger({ ...props }: AlertDialog$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function AlertDialogPortal({ ...props }: AlertDialog$1.Portal.Props): react_jsx_runtime.JSX.Element;
declare function AlertDialogOverlay({ className, ...props }: AlertDialog$1.Backdrop.Props): react_jsx_runtime.JSX.Element;
declare function AlertDialogContent({ className, size, ...props }: AlertDialog$1.Popup.Props & {
    size?: "default" | "sm";
}): react_jsx_runtime.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogMedia({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Title>): react_jsx_runtime.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Description>): react_jsx_runtime.JSX.Element;
declare function AlertDialogAction({ className, ...props }: React$1.ComponentProps<typeof Button>): react_jsx_runtime.JSX.Element;
declare function AlertDialogCancel({ className, variant, size, ...props }: AlertDialog$1.Close.Props & Pick<React$1.ComponentProps<typeof Button>, "variant" | "size">): react_jsx_runtime.JSX.Element;

declare function Sheet({ ...props }: Dialog$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function SheetTrigger({ ...props }: Dialog$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function SheetClose({ ...props }: Dialog$1.Close.Props): react_jsx_runtime.JSX.Element;
declare function SheetContent({ className, children, side, showCloseButton, ...props }: Dialog$1.Popup.Props & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function SheetHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SheetFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SheetTitle({ className, ...props }: Dialog$1.Title.Props): react_jsx_runtime.JSX.Element;
declare function SheetDescription({ className, ...props }: Dialog$1.Description.Props): react_jsx_runtime.JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "info" | "success" | "warning" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof alertVariants>): react_jsx_runtime.JSX.Element;
declare function AlertTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDescription({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertAction({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

interface AlertBannerProps extends Omit<React$1.ComponentProps<typeof Alert>, "title"> {
    /** Optional icon to display on the left. E.g., <CreditCardIcon className="size-4" /> */
    icon?: React$1.ReactNode;
    /** Main message text */
    title: React$1.ReactNode;
    /** Action link configurations */
    action?: {
        label: React$1.ReactNode;
        onClick: () => void;
    };
    /** If provided, renders a close icon on the right */
    onClose?: () => void;
    /** Defaults to true. Removes the prominent border from the alert for a clean banner look. */
    borderless?: boolean;
    /** Style appearance. 'secondary' is subtle background, 'primary' is solid gradient */
    appearance?: "primary" | "secondary";
}
declare const AlertBanner: React$1.ForwardRefExoticComponent<Omit<AlertBannerProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Toaster: ({ ...props }: ToasterProps) => react_jsx_runtime.JSX.Element;

declare function Table({ className, ...props }: React$1.ComponentProps<"table">): react_jsx_runtime.JSX.Element;
declare function TableHeader({ className, ...props }: React$1.ComponentProps<"thead">): react_jsx_runtime.JSX.Element;
declare function TableBody({ className, ...props }: React$1.ComponentProps<"tbody">): react_jsx_runtime.JSX.Element;
declare function TableFooter({ className, ...props }: React$1.ComponentProps<"tfoot">): react_jsx_runtime.JSX.Element;
declare function TableRow({ className, ...props }: React$1.ComponentProps<"tr">): react_jsx_runtime.JSX.Element;
declare function TableHead({ className, ...props }: React$1.ComponentProps<"th">): react_jsx_runtime.JSX.Element;
declare function TableCell({ className, ...props }: React$1.ComponentProps<"td">): react_jsx_runtime.JSX.Element;
declare function TableCaption({ className, ...props }: React$1.ComponentProps<"caption">): react_jsx_runtime.JSX.Element;
type SortDirection = "asc" | "desc" | null;
declare function SortableTableHead({ children, sort, onSortChange, resizable, onResize, className, ...props }: {
    children: React$1.ReactNode;
    sort?: SortDirection;
    onSortChange?: (next: SortDirection) => void;
    resizable?: boolean;
    onResize?: (delta: number) => void;
} & Omit<React$1.ComponentProps<"th">, "children">): react_jsx_runtime.JSX.Element;

declare function Accordion({ className, ...props }: Accordion$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function AccordionItem({ className, ...props }: Accordion$1.Item.Props): react_jsx_runtime.JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: Accordion$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function AccordionContent({ className, children, ...props }: Accordion$1.Panel.Props): react_jsx_runtime.JSX.Element;

/**
 * ApnaLogo — official Apna brand mark.
 *
 * Ships the 37x37 square brand lockup containing the white badge,
 * color accents at the bottom (gold, green, sky), and the logo wordmark.
 *
 * Brand SVGs live in `components/ui/` (outside the token-lint scope) because
 * they are primitives themselves — their colours ARE the brand, not a
 * themeable role.
 */
declare function ApnaLogo({ className, ...props }: React.SVGProps<SVGSVGElement>): react_jsx_runtime.JSX.Element;

/**
 * OnlyRoundsLogo / OnlyRoundsLogoMark — brand marks for the OnlyRounds
 * sub-brand under Apna.
 *
 * Two exports so the sidebar (and anyone else) can swap between a full
 * lockup and an icon-only glyph without clipping tricks:
 *   - <OnlyRoundsLogo />      → 248×42 · mark + wordmark
 *   - <OnlyRoundsLogoMark />  → 39×42  · mark only (the O-ring glyph)
 *
 * The gradients are the designer-approved sRGB stops exported directly
 * from the Figma source. Stops are literal hex because the exported SVGs
 * are final artwork, not theme-reactive surfaces — keeping the glyph
 * consistent with brand guidance across themes.
 *
 * Gradient IDs are namespaced (`or-mark-*` / `or-logo-*`) so both
 * components can render on the same page without defs colliding.
 */
/**
 * Full brand lockup — mark + "OnlyRound AI" wordmark. Use in headers,
 * footers, marketing pages, and the expanded-sidebar state.
 *
 * Intrinsic ratio 248:42 (≈5.9:1). Wordmark uses `var(--foreground)` so
 * it flips with the theme.
 */
declare function OnlyRoundsLogo({ className, ...props }: React.SVGProps<SVGSVGElement>): react_jsx_runtime.JSX.Element;
/**
 * Icon-only variant — just the O-ring mark. Use in the collapsed sidebar
 * rail, favicons, compact app chrome.
 *
 * Intrinsic ratio 39:42 (near-square). No wordmark → safe at 24–32 px.
 */
declare function OnlyRoundsLogoMark({ className, ...props }: React.SVGProps<SVGSVGElement>): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;
/** Capitalise the first character of a string. */
declare function capitalize(s: string): string;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertAction, AlertBanner, type AlertBannerProps, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertTitle, ApnaLogo, Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, BackButton, Badge, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText, Checkbox, type ChipTabItem, ChipTabs, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, Input, Label, OnlyRoundsLogo, OnlyRoundsLogoMark, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, RadioGroup, RadioGroupItem, ReusableSidebar, type ReusableSidebarProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Sidebar, type SidebarAlertBanner, type SidebarBrand, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, type SidebarNavItem, SidebarProvider, SidebarRail, SidebarSeparator, type SidebarSubNavItem, SidebarTrigger, type SidebarWorkspace, Skeleton, Slider, type SortDirection, SortableTableHead, Spinner, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toaster, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, badgeVariants, buttonGroupVariants, buttonVariants, capitalize, cn, inputVariants, tabsListVariants, textareaVariants, toggleVariants, useSidebar };
