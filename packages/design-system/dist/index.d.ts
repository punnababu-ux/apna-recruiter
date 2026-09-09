import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React$1 from 'react';
import { Button as Button$1 } from '@base-ui/react/button';
import { VariantProps } from 'class-variance-authority';
import { useRender } from '@base-ui/react/use-render';
import { Separator as Separator$1 } from '@base-ui/react/separator';
import { Toggle as Toggle$1 } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroup$1 } from '@base-ui/react/toggle-group';
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
import { Menu as Menu$1 } from '@base-ui/react/menu';
import { Dialog as Dialog$1 } from '@base-ui/react/dialog';
import { AlertDialog as AlertDialog$1 } from '@base-ui/react/alert-dialog';
import { ToasterProps } from 'sonner';
import { Accordion as Accordion$1 } from '@base-ui/react/accordion';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | "success" | null | undefined;
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

/**
 * Material Symbols Rounded — vendored as individual SVG React components.
 *
 * Generated from https://github.com/google/material-design-icons
 * (symbols/web/<name>/materialsymbolsrounded/<name>_24px.svg), Apache-2.0.
 *
 * Each export is named after the lucide-react icon it replaces, so existing
 * call sites only need their import source changed, not their JSX. The
 * underlying glyph shape now matches the Poneglyph Figma design system's
 * Material Symbols icon set exactly (same source, same names).
 *
 * Do not hand-edit — regenerate from the mapping table if icons change.
 */

interface IconProps extends React$1.SVGProps<SVGSVGElement> {
    size?: number | string;
}
/** Compatible with the shape of lucide-react's IconComponent type, for call
 *  sites that type a prop as `icon?: IconComponent`. */
type IconComponent = React$1.ForwardRefExoticComponent<IconProps & React$1.RefAttributes<SVGSVGElement>>;
declare const Activity: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const AlertCircle: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const AlertTriangle: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ArrowDown: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ArrowLeft: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ArrowRight: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ArrowUp: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ArrowUpDown: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ArrowUpRight: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const AtSign: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Award: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const BarChart2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Bell: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Bold: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const BookOpen: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Bookmark: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const BookmarkPlus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Bot: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Brain: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Briefcase: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Building: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Building2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Calendar: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CalendarCheck: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CalendarClock: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CalendarDays: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Check: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CheckCircle2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CheckIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CheckSquare: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronDown: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronDownIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronLeft: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronRight: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronRightIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronUp: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronUpIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ChevronsUpDown: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CircleCheck: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CircleCheckIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Clock: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Code: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Compass: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Copy: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Cpu: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const CreditCard: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Database: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const DollarSign: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Download: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Edit: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Edit3: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ExternalLink: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Eye: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const EyeOff: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const File: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const FileCode: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const FilePlus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const FileSpreadsheet: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const FileText: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Filter: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Flag: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Flame: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const FlaskConical: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Folder: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const FolderPlus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Footprints: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Globe: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const GraduationCap: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Grid: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Hash: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Heading: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Headphones: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Heart: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const HelpCircle: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const History: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Home: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ImageIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ImagePlus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const IndianRupee: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const InfinityIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Info: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const InfoIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Italic: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Languages: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Laptop: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Layers: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Layout: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const LayoutGrid: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const LayoutList: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Lightbulb: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const LinkIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ListChecks: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ListTodo: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Loader2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Loader2Icon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Lock: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Mail: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MapPin: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Mars: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Maximize2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Menu: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MessageCircle: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MessageCircleQuestion: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MessageSquare: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MessagesSquare: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Mic: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Minus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Monitor: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Moon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MoreHorizontal: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MoreHorizontalIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const MoreVertical: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Navigation: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const OctagonXIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Palette: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PanelLeft: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PanelLeftIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Paperclip: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Pause: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Pencil: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Phone: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PhoneCall: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PhoneIncoming: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PhoneOff: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PhoneOutgoing: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Play: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Plus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const PowerOff: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Puzzle: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const QrCode: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const RefreshCw: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const RotateCcw: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Save: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Search: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Send: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Settings: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Shapes: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Share2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ShieldAlert: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const ShieldCheck: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Sliders: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const SlidersHorizontal: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Smartphone: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Sparkles: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Star: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const StickyNote: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Sun: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const TableIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Table2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Tag: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Target: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Trash: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Trash2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const TrendingUp: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const TriangleAlertIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Trophy: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Type: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Underline: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Unlock: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Upload: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const User: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const User2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const UserCheck: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const UserPlus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const UserRound: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const UserSearch: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Users: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Venus: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Video: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const VideoOff: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Voicemail: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Wallet: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Wand2: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Wrench: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const X: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const XCircle: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const XIcon: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Zap: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const Sell: React$1.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React$1.RefAttributes<SVGSVGElement>>;

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
    icon?: IconComponent;
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

type FilterGroup = {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
};
interface SearchFilterBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    /** Pass one or more filter groups to show the Filters popover. */
    filterGroups?: FilterGroup[];
    /** Called when "Clear all" is clicked in the filter popover. */
    onClearFilters?: () => void;
    className?: string;
}
declare function SearchFilterBar({ placeholder, value, onChange, filterGroups, onClearFilters, className, }: SearchFilterBarProps): react_jsx_runtime.JSX.Element;

declare function Avatar({ className, size, ...props }: Avatar$1.Root.Props & {
    size?: "default" | "sm" | "lg";
}): react_jsx_runtime.JSX.Element;
declare function AvatarImage({ className, ...props }: Avatar$1.Image.Props): react_jsx_runtime.JSX.Element;
declare function AvatarFallback({ className, ...props }: Avatar$1.Fallback.Props): react_jsx_runtime.JSX.Element;
declare function AvatarBadge({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function AvatarGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AvatarGroupCount({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | "success" | "info" | "warning" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, size, render, ...props }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>): React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>>;

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

/**
 * MetricCard — A reusable stat/metric summary card for dashboards and directory headers.
 */
interface MetricCardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Metric label / header text */
    label: React$1.ReactNode;
    /** Primary metric value display (e.g. "166", "88%", "$4.2k") */
    value: React$1.ReactNode;
    /** Optional icon displayed in top right */
    icon?: React$1.ReactNode;
    /** Optional trend or secondary helper text (e.g. "+12% this mo") */
    trend?: React$1.ReactNode;
    /** Optional variant for trend color ('success' | 'warning' | 'destructive' | 'neutral') */
    trendVariant?: "success" | "warning" | "destructive" | "neutral";
}
declare const MetricCard: React$1.ForwardRefExoticComponent<MetricCardProps & React$1.RefAttributes<HTMLDivElement>>;

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

interface SegmentedTabItem<V extends string = string> {
    value: V;
    label: string;
    description?: string;
    icon?: React$1.ReactNode;
}
interface SegmentedTabSwitcherProps<V extends string = string> {
    items: SegmentedTabItem<V>[];
    value: V;
    onValueChange: (value: V) => void;
    /** Desktop pill background, and each inactive mobile chip's own
     *  background (the mobile row itself is never painted). Defaults to
     *  `bg-muted`. */
    trackClassName?: string;
    /** Icon/label colour for the active item on the desktop pill. Defaults
     *  to `text-primary`. */
    activeClassName?: string;
    /** Icon/label colour for the active chip on mobile — a brand accent
     *  often reads better here than the desktop's neutral active colour
     *  (that's the case in the source this was extracted from). Defaults
     *  to `activeClassName`. */
    mobileActiveClassName?: string;
    /** Icon/label colour for inactive items, both layouts. Defaults to
     *  `text-muted-foreground`. */
    inactiveClassName?: string;
    /** Desktop description-line colour (both states). Defaults to
     *  `text-muted-foreground`. */
    mutedClassName?: string;
    className?: string;
}
declare function SegmentedTabSwitcher<V extends string = string>({ items, value, onValueChange, trackClassName, activeClassName, mobileActiveClassName, inactiveClassName, mutedClassName, className, }: SegmentedTabSwitcherProps<V>): react_jsx_runtime.JSX.Element;

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
    ctaText?: string;
    onCtaClick?: () => void;
    variant?: "warning" | "info" | "destructive" | "success" | "default";
    appearance?: "primary" | "secondary";
    showClose?: boolean;
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

interface BottomNavItem {
    /** If provided, renders an <a> tag via next/link. */
    href?: string;
    label: string;
    icon: React$1.ComponentType<React$1.SVGProps<SVGSVGElement>>;
    /** Whether this item reflects the current route. */
    active?: boolean;
    /** Optional badge node rendered over the icon (e.g. a notification count). */
    badge?: React$1.ReactNode;
    /** Used when `href` is not provided — renders a <button>. */
    onClick?: () => void;
}
interface BottomNavProps {
    items: BottomNavItem[];
    className?: string;
}
declare function BottomNav({ items, className }: BottomNavProps): react_jsx_runtime.JSX.Element;

declare function Popover({ ...props }: Popover$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: Popover$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function PopoverContent({ className, align, alignOffset, side, sideOffset, ...props }: Popover$1.Popup.Props & Pick<Popover$1.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">): react_jsx_runtime.JSX.Element;
declare function PopoverHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function PopoverTitle({ className, ...props }: Popover$1.Title.Props): react_jsx_runtime.JSX.Element;
declare function PopoverDescription({ className, ...props }: Popover$1.Description.Props): react_jsx_runtime.JSX.Element;

declare function DropdownMenu({ ...props }: Menu$1.Root.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuPortal({ ...props }: Menu$1.Portal.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuTrigger({ ...props }: Menu$1.Trigger.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuContent({ align, alignOffset, side, sideOffset, className, ...props }: Menu$1.Popup.Props & Pick<Menu$1.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">): react_jsx_runtime.JSX.Element;
declare function DropdownMenuGroup({ ...props }: Menu$1.Group.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: Menu$1.GroupLabel.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, ...props }: Menu$1.Item.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSub({ ...props }: Menu$1.SubmenuRoot.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: Menu$1.SubmenuTrigger.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSubContent({ align, alignOffset, side, sideOffset, className, ...props }: React$1.ComponentProps<typeof DropdownMenuContent>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }: Menu$1.CheckboxItem.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: Menu$1.RadioGroup.Props): react_jsx_runtime.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, inset, ...props }: Menu$1.RadioItem.Props & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: Menu$1.Separator.Props): react_jsx_runtime.JSX.Element;
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
    variant?: "default" | "destructive" | "success" | "info" | "warning" | null | undefined;
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
    /** Collapsed icon-only mode for compact containers like sidebars */
    collapsed?: boolean;
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

interface LogoApnaUnlimitedProps extends React$1.SVGProps<SVGSVGElement> {
    variant?: "default" | "white" | "gradient";
}
declare function LogoApnaUnlimited({ className, variant, ...props }: LogoApnaUnlimitedProps): react_jsx_runtime.JSX.Element;

interface JobCardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    title: string;
    company: string;
    location: string;
    salary?: string;
    jobType: string;
    postedAt: string;
    logoUrl?: string;
    onApply?: () => void;
    onSave?: () => void;
}
declare function JobCard({ title, company, location, salary, jobType, postedAt, logoUrl, onApply, onSave, className, ...props }: JobCardProps): react_jsx_runtime.JSX.Element;

interface PricingCardProps extends Omit<React$1.ComponentProps<"div">, "title"> {
    ribbon?: React$1.ReactNode;
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    meta?: React$1.ReactNode;
    price: React$1.ReactNode;
    mrp?: React$1.ReactNode;
    badge?: React$1.ReactNode;
    priceSuffix?: React$1.ReactNode;
    cta: React$1.ReactNode;
}
declare function PricingCard({ ribbon, title, subtitle, meta, price, mrp, badge, priceSuffix, cta, className, ...props }: PricingCardProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;
/** Capitalise the first character of a string. */
declare function capitalize(s: string): string;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Activity, Alert, AlertAction, AlertBanner, type AlertBannerProps, AlertCircle, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AlertTriangle, ApnaLogo, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown, ArrowUpRight, AtSign, Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, Award, BackButton, Badge, BarChart2, Bell, Bold, BookOpen, Bookmark, BookmarkPlus, Bot, BottomNav, type BottomNavItem, type BottomNavProps, Brain, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Briefcase, Building, Building2, Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText, Calendar, CalendarCheck, CalendarClock, CalendarDays, Check, CheckCircle2, CheckIcon, CheckSquare, Checkbox, ChevronDown, ChevronDownIcon, ChevronLeft, ChevronRight, ChevronRightIcon, ChevronUp, ChevronUpIcon, ChevronsUpDown, type ChipTabItem, ChipTabs, CircleCheck, CircleCheckIcon, Clock, Code, Compass, Copy, Cpu, CreditCard, Database, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DollarSign, Download, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Edit, Edit3, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, ExternalLink, Eye, EyeOff, Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, File, FileCode, FilePlus, FileSpreadsheet, FileText, Filter, type FilterGroup, Flag, Flame, FlaskConical, Folder, FolderPlus, Footprints, Globe, GraduationCap, Grid, Hash, Heading, Headphones, Heart, HelpCircle, History, Home, type IconComponent, type IconProps, ImageIcon, ImagePlus, IndianRupee, InfinityIcon, Info, InfoIcon, Input, Italic, JobCard, type JobCardProps, Label, Languages, Laptop, Layers, Layout, LayoutGrid, LayoutList, Lightbulb, LinkIcon, ListChecks, ListTodo, Loader2, Loader2Icon, Lock, LogoApnaUnlimited, type LogoApnaUnlimitedProps, Mail, MapPin, Mars, Maximize2, Menu, MessageCircle, MessageCircleQuestion, MessageSquare, MessagesSquare, MetricCard, type MetricCardProps, Mic, Minus, Monitor, Moon, MoreHorizontal, MoreHorizontalIcon, MoreVertical, Navigation, OctagonXIcon, OnlyRoundsLogo, OnlyRoundsLogoMark, Palette, PanelLeft, PanelLeftIcon, Paperclip, Pause, Pencil, Phone, PhoneCall, PhoneIncoming, PhoneOff, PhoneOutgoing, Play, Plus, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, PowerOff, PricingCard, type PricingCardProps, Puzzle, QrCode, RadioGroup, RadioGroupItem, RefreshCw, ReusableSidebar, type ReusableSidebarProps, RotateCcw, Save, Search, SearchFilterBar, type SearchFilterBarProps, type SegmentedTabItem, SegmentedTabSwitcher, type SegmentedTabSwitcherProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Sell, Send, Separator, Settings, Shapes, Share2, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, ShieldAlert, ShieldCheck, Sidebar, type SidebarAlertBanner, type SidebarBrand, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, type SidebarNavItem, SidebarProvider, SidebarRail, SidebarSeparator, type SidebarSubNavItem, SidebarTrigger, type SidebarWorkspace, Skeleton, Slider, Sliders, SlidersHorizontal, Smartphone, type SortDirection, SortableTableHead, Sparkles, Spinner, Star, StickyNote, Sun, Switch, Table, Table2, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableIcon, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Tag, Target, Textarea, Toaster, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Trash, Trash2, TrendingUp, TriangleAlertIcon, Trophy, Type, Underline, Unlock, Upload, User, User2, UserCheck, UserPlus, UserRound, UserSearch, Users, Venus, Video, VideoOff, Voicemail, Wallet, Wand2, Wrench, X, XCircle, XIcon, Zap, badgeVariants, buttonGroupVariants, buttonVariants, capitalize, cn, inputVariants, tabsListVariants, textareaVariants, toggleVariants, useSidebar };
