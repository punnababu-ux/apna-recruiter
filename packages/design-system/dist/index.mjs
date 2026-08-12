// src/components/ui/button.tsx
import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// src/components/ui/spinner.tsx
import { Loader2Icon } from "lucide-react";
import { jsx } from "react/jsx-runtime";
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ jsx(Loader2Icon, { role: "status", "aria-label": "Loading", className: cn("size-4 animate-spin", className), ...props });
}

// src/components/ui/button.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-heading whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xs active:bg-primary/95 aria-expanded:bg-primary/90",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground border border-border/60 hover:bg-secondary/70 hover:border-border hover:shadow-2xs active:bg-secondary/90 aria-expanded:bg-secondary/80 dark:border-border/30 dark:hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 hover:border-destructive/40 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 gap-1.5 px-3 text-sm font-semibold font-heading has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs font-semibold font-heading in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-[min(var(--radius-md),12px)] px-2.5 text-xs font-semibold font-heading in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 text-base font-medium font-heading has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
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
  return /* @__PURE__ */ jsx2(
    ButtonPrimitive,
    {
      "data-slot": "button",
      nativeButton: props.nativeButton ?? (props.render ? false : void 0),
      "data-loading": loading || void 0,
      "aria-busy": loading || void 0,
      disabled: disabled || loading,
      className: cn(buttonVariants({ variant, size, className })),
      ...props,
      children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx2(Spinner, { "data-icon": "inline-start" }),
        loadingText ?? children
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        renderedLeadingIcon,
        children,
        renderedTrailingIcon
      ] })
    }
  );
}

// src/components/ui/button-group.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva as cva2 } from "class-variance-authority";

// src/components/ui/separator.tsx
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { jsx as jsx3 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SeparatorPrimitive,
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
import { jsx as jsx4 } from "react/jsx-runtime";
var buttonGroupVariants = cva2(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical: "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"
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
  return /* @__PURE__ */ jsx4(
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
  return useRender({
    defaultTagName: "div",
    props: mergeProps(
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
  return /* @__PURE__ */ jsx4(
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
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { jsx as jsx5 } from "react/jsx-runtime";
function BackButton({
  onClick,
  className,
  ...props
}) {
  const router = useRouter();
  const handleBack = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      router.back();
    }
  };
  return /* @__PURE__ */ jsx5(
    Button,
    {
      variant: "outline",
      size: "icon-sm",
      "aria-label": "Go back",
      onClick: handleBack,
      className: cn("shrink-0", className),
      ...props,
      children: /* @__PURE__ */ jsx5(ChevronLeft, { className: "size-4" })
    }
  );
}

// src/components/ui/toggle.tsx
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx6 } from "react/jsx-runtime";
var toggleVariants = cva3(
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
  return /* @__PURE__ */ jsx6(
    TogglePrimitive,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/toggle-group.tsx
import * as React2 from "react";
import { Toggle as TogglePrimitive2 } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { jsx as jsx7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx7(
    ToggleGroupPrimitive,
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
      children: /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsx7(
    TogglePrimitive2,
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
import * as React3 from "react";
import { useMemo } from "react";
import { cva as cva4 } from "class-variance-authority";

// src/components/ui/label.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsx8(
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
import { jsx as jsx9, jsxs as jsxs2 } from "react/jsx-runtime";
function FieldSet({ className, ...props }) {
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
var fieldVariants = cva4(
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
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsxs2(
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
        Icon && !hasFieldChild && /* @__PURE__ */ jsx9(Icon, { className: "size-4 text-muted-foreground shrink-0" }),
        children
      ]
    }
  );
}
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsxs2(
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
        /* @__PURE__ */ jsx9(Separator, { className: "absolute inset-0 top-1/2" }),
        children && /* @__PURE__ */ jsx9(
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
  const content = useMemo(() => {
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
    return /* @__PURE__ */ jsx9("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ jsx9("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx9(
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
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva as cva5 } from "class-variance-authority";
import { jsx as jsx10 } from "react/jsx-runtime";
var inputVariants = cva5(
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
  return /* @__PURE__ */ jsx10(
    InputPrimitive,
    {
      type,
      "data-slot": "input",
      className: cn(inputVariants({ inputSize }), className),
      ...props
    }
  );
}

// src/components/ui/textarea.tsx
import { cva as cva6 } from "class-variance-authority";
import { jsx as jsx11 } from "react/jsx-runtime";
var textareaVariants = cva6(
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
  return /* @__PURE__ */ jsx11(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(textareaVariants({ inputSize }), className),
      ...props
    }
  );
}

// src/components/ui/checkbox.tsx
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { jsx as jsx12 } from "react/jsx-runtime";
function Checkbox({ className, ...props }) {
  return /* @__PURE__ */ jsx12(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx12(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
          children: /* @__PURE__ */ jsx12(
            CheckIcon,
            {}
          )
        }
      )
    }
  );
}

// src/components/ui/radio-group.tsx
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { jsx as jsx13 } from "react/jsx-runtime";
function RadioGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx13(
    RadioGroupPrimitive,
    {
      "data-slot": "radio-group",
      className: cn("grid w-full gap-2", className),
      ...props
    }
  );
}
function RadioGroupItem({ className, ...props }) {
  return /* @__PURE__ */ jsx13(
    RadioPrimitive.Root,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx13(
        RadioPrimitive.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "flex size-4 items-center justify-center",
          children: /* @__PURE__ */ jsx13("span", { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
        }
      )
    }
  );
}

// src/components/ui/switch.tsx
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { jsx as jsx14 } from "react/jsx-runtime";
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx14(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent px-px transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx14(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-full group-data-[size=sm]/switch:data-checked:translate-x-full dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
        }
      )
    }
  );
}

// src/components/ui/select.tsx
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDownIcon, CheckIcon as CheckIcon2, ChevronUpIcon } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs3 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
function SelectGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx15(
    SelectPrimitive.Group,
    {
      "data-slot": "select-group",
      className: cn("scroll-my-1", className),
      ...props
    }
  );
}
function SelectValue({ className, ...props }) {
  return /* @__PURE__ */ jsx15(
    SelectPrimitive.Value,
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
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Trigger,
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
        /* @__PURE__ */ jsx15(
          SelectPrimitive.Icon,
          {
            render: /* @__PURE__ */ jsx15(ChevronDownIcon, { className: "pointer-events-none size-4 text-muted-foreground" })
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
  return /* @__PURE__ */ jsx15(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx15(
    SelectPrimitive.Positioner,
    {
      side,
      sideOffset,
      align,
      alignOffset,
      alignItemWithTrigger,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsxs3(
        SelectPrimitive.Popup,
        {
          "data-slot": "select-content",
          "data-align-trigger": alignItemWithTrigger,
          className: cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
          ...props,
          children: [
            /* @__PURE__ */ jsx15(SelectScrollUpButton, {}),
            /* @__PURE__ */ jsx15(SelectPrimitive.List, { children }),
            /* @__PURE__ */ jsx15(SelectScrollDownButton, {})
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
  return /* @__PURE__ */ jsx15(
    SelectPrimitive.GroupLabel,
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
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx15(SelectPrimitive.ItemText, { className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap", children }),
        /* @__PURE__ */ jsx15(
          SelectPrimitive.ItemIndicator,
          {
            render: /* @__PURE__ */ jsx15("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ jsx15(CheckIcon2, { className: "pointer-events-none" })
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
  return /* @__PURE__ */ jsx15(
    SelectPrimitive.Separator,
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
  return /* @__PURE__ */ jsx15(
    SelectPrimitive.ScrollUpArrow,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx15(
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
  return /* @__PURE__ */ jsx15(
    SelectPrimitive.ScrollDownArrow,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx15(
        ChevronDownIcon,
        {}
      )
    }
  );
}

// src/components/ui/slider.tsx
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { jsx as jsx16, jsxs as jsxs4 } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  ...props
}) {
  return /* @__PURE__ */ jsx16(
    SliderPrimitive.Root,
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
      children: /* @__PURE__ */ jsxs4(
        SliderPrimitive.Control,
        {
          "data-slot": "slider-control",
          className: "relative flex w-full items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          children: [
            /* @__PURE__ */ jsx16(
              SliderPrimitive.Track,
              {
                "data-slot": "slider-track",
                className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
                children: /* @__PURE__ */ jsx16(
                  SliderPrimitive.Indicator,
                  {
                    "data-slot": "slider-indicator",
                    className: "absolute h-full bg-primary data-[orientation=vertical]:w-full"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx16(
              SliderPrimitive.Thumb,
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

// src/components/ui/search-filter-bar.tsx
import { Search, SlidersHorizontal } from "lucide-react";

// src/components/ui/badge.tsx
import { mergeProps as mergeProps2 } from "@base-ui/react/merge-props";
import { useRender as useRender2 } from "@base-ui/react/use-render";
import { cva as cva7 } from "class-variance-authority";
var badgeVariants = cva7(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
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
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender2({
    defaultTagName: "span",
    props: mergeProps2(
      {
        className: cn(badgeVariants({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant
    }
  });
}

// src/components/ui/popover.tsx
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { jsx as jsx17 } from "react/jsx-runtime";
function Popover({ ...props }) {
  return /* @__PURE__ */ jsx17(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx17(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx17(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx17(
    PopoverPrimitive.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsx17(
        PopoverPrimitive.Popup,
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
  return /* @__PURE__ */ jsx17(
    "div",
    {
      "data-slot": "popover-header",
      className: cn("flex flex-col gap-0.5 text-sm", className),
      ...props
    }
  );
}
function PopoverTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx17(
    PopoverPrimitive.Title,
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
  return /* @__PURE__ */ jsx17(
    PopoverPrimitive.Description,
    {
      "data-slot": "popover-description",
      className: cn("text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/search-filter-bar.tsx
import { jsx as jsx18, jsxs as jsxs5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs5("div", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ jsxs5("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsx18(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx18(
        Input,
        {
          placeholder,
          value,
          onChange: (e) => onChange(e.target.value),
          className: "bg-card pl-9 text-xs sm:text-sm h-9"
        }
      )
    ] }),
    hasFilters && /* @__PURE__ */ jsxs5(Popover, { children: [
      /* @__PURE__ */ jsx18(
        PopoverTrigger,
        {
          render: /* @__PURE__ */ jsxs5(Button, { variant: "outline", size: "sm", className: "h-9 gap-1.5 cursor-pointer", children: [
            /* @__PURE__ */ jsx18(SlidersHorizontal, { className: "size-4" }),
            /* @__PURE__ */ jsx18("span", { children: "Filters" }),
            activeFilterCount > 0 && /* @__PURE__ */ jsx18(Badge, { variant: "success", className: "ml-1 h-5 min-w-5 px-1.5 text-2xs", children: activeFilterCount })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs5(PopoverContent, { align: "end", className: "w-64 p-0", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between border-b border-border px-3 py-2", children: [
          /* @__PURE__ */ jsx18("span", { className: "text-xs font-semibold text-foreground uppercase tracking-wider", children: "Filters" }),
          /* @__PURE__ */ jsx18(
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
        filterGroups.map((group, i) => /* @__PURE__ */ jsxs5("div", { children: [
          i > 0 && /* @__PURE__ */ jsx18("div", { className: "border-t border-border" }),
          /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-1.5 p-3", children: [
            /* @__PURE__ */ jsx18("span", { className: "text-2xs font-semibold text-muted-foreground", children: group.label }),
            /* @__PURE__ */ jsx18("div", { className: "flex flex-col gap-1", children: group.options.map((opt) => {
              const id = `filter-${group.label}-${opt}`.replace(/\s+/g, "-").toLowerCase();
              return /* @__PURE__ */ jsxs5(
                "label",
                {
                  htmlFor: id,
                  className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-muted",
                  children: [
                    /* @__PURE__ */ jsx18(
                      Checkbox,
                      {
                        id,
                        checked: group.selected.includes(opt),
                        onCheckedChange: () => group.onToggle(opt)
                      }
                    ),
                    /* @__PURE__ */ jsx18("span", { className: "truncate", children: opt })
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
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { jsx as jsx19 } from "react/jsx-runtime";
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx19(
    AvatarPrimitive.Root,
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
  return /* @__PURE__ */ jsx19(
    AvatarPrimitive.Image,
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
  return /* @__PURE__ */ jsx19(
    AvatarPrimitive.Fallback,
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
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(
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
import { jsx as jsx20 } from "react/jsx-runtime";
function Skeleton({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx20(
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
import { cva as cva8 } from "class-variance-authority";
import { jsx as jsx21 } from "react/jsx-runtime";
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsx21(
    "div",
    {
      "data-slot": "empty-header",
      className: cn("flex max-w-sm flex-col items-center gap-2", className),
      ...props
    }
  );
}
var emptyMediaVariants = cva8(
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
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsx21(
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
import * as React4 from "react";
import { jsx as jsx22, jsxs as jsxs6 } from "react/jsx-runtime";
var trendVariantMap = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  neutral: "text-muted-foreground"
};
var MetricCard = React4.forwardRef(
  ({ className, label, value, icon, trend, trendVariant = "neutral", ...props }, ref) => {
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        ref,
        className: cn(
          "rounded-xl border border-border/70 bg-card p-4 shadow-xs text-left transition-all",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx22("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
            icon && /* @__PURE__ */ jsx22("div", { className: "rounded-lg bg-muted/60 p-2 text-foreground [&>svg]:size-4", children: icon })
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "mt-3 flex items-baseline justify-between gap-2", children: [
            /* @__PURE__ */ jsx22("span", { className: "text-2xl font-heading font-bold text-foreground", children: value }),
            trend && /* @__PURE__ */ jsx22("span", { className: cn("text-2xs font-medium", trendVariantMap[trendVariant]), children: trend })
          ] })
        ]
      }
    );
  }
);
MetricCard.displayName = "MetricCard";

// src/components/ui/tabs.tsx
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva as cva9 } from "class-variance-authority";
import { jsx as jsx23 } from "react/jsx-runtime";
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx23(
    TabsPrimitive.Root,
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
var tabsListVariants = cva9(
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
  return /* @__PURE__ */ jsx23(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn(tabsListVariants({ variant }), className),
      ...props
    }
  );
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    TabsPrimitive.Tab,
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
  return /* @__PURE__ */ jsx23(
    TabsPrimitive.Panel,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 text-sm outline-none", className),
      ...props
    }
  );
}

// src/components/ui/chip-tabs.tsx
import { jsx as jsx24, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx24(
    "div",
    {
      role: "tablist",
      "aria-label": ariaLabel,
      className: cn("flex flex-wrap items-center gap-2", className),
      children: items.map((item) => {
        const active = value === item.value;
        const stateClass = variant === "choice" ? active ? "border-primary bg-accent text-accent-foreground" : ariaInvalid ? "border-destructive/60 bg-destructive/5 text-destructive hover:bg-destructive/10" : "border-border bg-muted text-muted-foreground hover:text-foreground" : active ? "border-transparent bg-secondary text-secondary-foreground" : ariaInvalid ? "border-destructive/60 text-destructive hover:bg-destructive/10" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground";
        return /* @__PURE__ */ jsxs7(
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
              typeof item.count === "number" ? /* @__PURE__ */ jsxs7(
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

// src/components/ui/breadcrumb.tsx
import { mergeProps as mergeProps3 } from "@base-ui/react/merge-props";
import { useRender as useRender3 } from "@base-ui/react/use-render";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { jsx as jsx25, jsxs as jsxs8 } from "react/jsx-runtime";
function Breadcrumb({ className, ...props }) {
  return /* @__PURE__ */ jsx25(
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
  return /* @__PURE__ */ jsx25(
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
  return /* @__PURE__ */ jsx25(
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
  return useRender3({
    defaultTagName: "a",
    props: mergeProps3(
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
  return /* @__PURE__ */ jsx25(
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
  return /* @__PURE__ */ jsx25(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx25(ChevronRightIcon, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs8(
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
        /* @__PURE__ */ jsx25(
          MoreHorizontalIcon,
          {}
        ),
        /* @__PURE__ */ jsx25("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}

// src/components/ui/sidebar.tsx
import * as React6 from "react";
import { mergeProps as mergeProps4 } from "@base-ui/react/merge-props";
import { useRender as useRender4 } from "@base-ui/react/use-render";
import { cva as cva10 } from "class-variance-authority";

// src/hooks/use-mobile.ts
import * as React5 from "react";
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
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { jsx as jsx26, jsxs as jsxs9 } from "react/jsx-runtime";
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx26(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ jsx26(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({ ...props }) {
  return /* @__PURE__ */ jsx26(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ jsx26(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx26(
    SheetPrimitive.Backdrop,
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
  return /* @__PURE__ */ jsxs9(SheetPortal, { children: [
    /* @__PURE__ */ jsx26(SheetOverlay, {}),
    /* @__PURE__ */ jsxs9(
      SheetPrimitive.Popup,
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
          showCloseButton && /* @__PURE__ */ jsxs9(
            SheetPrimitive.Close,
            {
              "data-slot": "sheet-close",
              render: /* @__PURE__ */ jsx26(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-3 right-3",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ jsx26(
                  XIcon,
                  {}
                ),
                /* @__PURE__ */ jsx26("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx26(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-0.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx26(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx26(
    SheetPrimitive.Title,
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
  return /* @__PURE__ */ jsx26(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/tooltip.tsx
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { jsx as jsx27, jsxs as jsxs10 } from "react/jsx-runtime";
function TooltipProvider({
  delay = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx27(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delay,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ jsx27(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ jsx27(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
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
  return /* @__PURE__ */ jsx27(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx27(
    TooltipPrimitive.Positioner,
    {
      align,
      alignOffset,
      side,
      sideOffset,
      className: "isolate z-50",
      children: /* @__PURE__ */ jsxs10(
        TooltipPrimitive.Popup,
        {
          "data-slot": "tooltip-content",
          className: cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          ),
          ...props,
          children: [
            children,
            /* @__PURE__ */ jsx27(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })
          ]
        }
      )
    }
  ) });
}

// src/components/ui/sidebar.tsx
import { PanelLeftIcon } from "lucide-react";
import { jsx as jsx28, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx28(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx28(
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
    return /* @__PURE__ */ jsx28(
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
    return /* @__PURE__ */ jsx28(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs11(
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
          /* @__PURE__ */ jsxs11(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx28(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx28(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx28("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx28(
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
        /* @__PURE__ */ jsx28(
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
            children: /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsxs11(
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
        /* @__PURE__ */ jsx28(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx28("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return useRender4({
    defaultTagName: "div",
    props: mergeProps4(
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
  return useRender4({
    defaultTagName: "button",
    props: mergeProps4(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
var sidebarMenuButtonVariants = cva10(
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
  const comp = useRender4({
    defaultTagName: "button",
    props: mergeProps4(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className)
      },
      props
    ),
    render: !tooltip ? render : /* @__PURE__ */ jsx28(TooltipTrigger, { render }),
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
  return /* @__PURE__ */ jsxs11(Tooltip, { children: [
    comp,
    /* @__PURE__ */ jsx28(
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
  return useRender4({
    defaultTagName: "button",
    props: mergeProps4(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx28(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsx28(
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
  return useRender4({
    defaultTagName: "a",
    props: mergeProps4(
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
import * as React8 from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronsUpDown
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// src/components/ui/dropdown-menu.tsx
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ChevronRightIcon as ChevronRightIcon2, CheckIcon as CheckIcon3 } from "lucide-react";
import { jsx as jsx29, jsxs as jsxs12 } from "react/jsx-runtime";
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ jsx29(MenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({ ...props }) {
  return /* @__PURE__ */ jsx29(MenuPrimitive.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx29(MenuPrimitive.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx29(MenuPrimitive.Portal, { children: /* @__PURE__ */ jsx29(
    MenuPrimitive.Positioner,
    {
      className: "isolate z-50 outline-none",
      align,
      alignOffset,
      side,
      sideOffset,
      children: /* @__PURE__ */ jsx29(
        MenuPrimitive.Popup,
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
  return /* @__PURE__ */ jsx29(MenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx29(
    MenuPrimitive.GroupLabel,
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
  return /* @__PURE__ */ jsx29(
    MenuPrimitive.Item,
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
  return /* @__PURE__ */ jsx29(MenuPrimitive.SubmenuRoot, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs12(
    MenuPrimitive.SubmenuTrigger,
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
        /* @__PURE__ */ jsx29(ChevronRightIcon2, { className: "ml-auto" })
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
  return /* @__PURE__ */ jsx29(
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
  return /* @__PURE__ */ jsxs12(
    MenuPrimitive.CheckboxItem,
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
        /* @__PURE__ */ jsx29(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ jsx29(MenuPrimitive.CheckboxItemIndicator, { children: /* @__PURE__ */ jsx29(
              CheckIcon3,
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
  return /* @__PURE__ */ jsx29(
    MenuPrimitive.RadioGroup,
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
  return /* @__PURE__ */ jsxs12(
    MenuPrimitive.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": inset,
      className: cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx29(
          "span",
          {
            className: "pointer-events-none absolute right-2 flex items-center justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ jsx29(MenuPrimitive.RadioItemIndicator, { children: /* @__PURE__ */ jsx29(
              CheckIcon3,
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
  return /* @__PURE__ */ jsx29(
    MenuPrimitive.Separator,
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
  return /* @__PURE__ */ jsx29(
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
import * as React7 from "react";

// src/components/ui/alert.tsx
import { cva as cva11 } from "class-variance-authority";
import { jsx as jsx30 } from "react/jsx-runtime";
var alertVariants = cva11(
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
  return /* @__PURE__ */ jsx30(
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
  return /* @__PURE__ */ jsx30(
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
  return /* @__PURE__ */ jsx30(
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
  return /* @__PURE__ */ jsx30(
    "div",
    {
      "data-slot": "alert-action",
      className: cn("absolute top-2 right-2", className),
      ...props
    }
  );
}

// src/components/ui/alert-banner.tsx
import { XIcon as XIcon2 } from "lucide-react";
import { jsx as jsx31, jsxs as jsxs13 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsx31(
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
          children: icon && /* @__PURE__ */ jsx31("div", { className: cn("flex items-center justify-center [&>svg]:size-4", accentColor), children: icon })
        }
      );
    }
    return /* @__PURE__ */ jsxs13(
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
          /* @__PURE__ */ jsxs13("div", { className: "flex flex-1 items-center gap-2.5 min-w-0", children: [
            icon && /* @__PURE__ */ jsx31("div", { className: cn("shrink-0 flex items-center justify-center [&>svg]:size-4", accentColor), children: icon }),
            /* @__PURE__ */ jsxs13("div", { className: "flex-1 text-xs leading-normal min-w-0", children: [
              /* @__PURE__ */ jsx31(AlertTitle, { className: cn("inline font-medium !mb-0 mr-1.5 leading-normal", textColor), children: title }),
              action && /* @__PURE__ */ jsx31(
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
          onClose && /* @__PURE__ */ jsxs13(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: cn(
                "shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer -mr-1",
                textColor
              ),
              children: [
                /* @__PURE__ */ jsx31(XIcon2, { className: "size-4" }),
                /* @__PURE__ */ jsx31("span", { className: "sr-only", children: "Close" })
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
import { Fragment as Fragment2, jsx as jsx32, jsxs as jsxs14 } from "react/jsx-runtime";
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
  const pathname = usePathname();
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
  return /* @__PURE__ */ jsxs14(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsxs14(SidebarHeader, { className: "gap-3 px-3 py-3", children: [
      /* @__PURE__ */ jsx32(SidebarMenu, { children: /* @__PURE__ */ jsx32(SidebarMenuItem, { children: /* @__PURE__ */ jsxs14(
        SidebarMenuButton,
        {
          render: brand.href ? /* @__PURE__ */ jsx32(Link, { href: brand.href }) : void 0,
          tooltip: brand.name,
          size: "lg",
          className: "hover:bg-transparent focus-visible:ring-0 active:bg-transparent px-0! group-data-[collapsible=icon]:w-10",
          onClick: () => setOpenMobile(false),
          children: [
            /* @__PURE__ */ jsx32("div", { className: "size-10 shrink-0 flex items-center justify-center", children: brand.logo }),
            /* @__PURE__ */ jsx32("span", { className: "text-lg font-bold tracking-tight text-secondary-foreground truncate", children: brand.name })
          ]
        }
      ) }) }),
      workspaces.length > 0 && /* @__PURE__ */ jsxs14(DropdownMenu, { children: [
        /* @__PURE__ */ jsx32(
          DropdownMenuTrigger,
          {
            render: /* @__PURE__ */ jsxs14(
              "button",
              {
                type: "button",
                "aria-label": "Switch workspace",
                className: "flex h-12 w-full items-center gap-3 rounded-lg border border-sidebar-border bg-background px-2.5 text-left text-sm font-medium text-foreground shadow-sm ring-sidebar-ring outline-hidden transition-colors hover:bg-accent/50 focus-visible:ring-2 cursor-pointer group-data-[collapsible=icon]:w-10",
                children: [
                  activeWorkspace.logoUrl ? /* @__PURE__ */ jsx32(
                    "img",
                    {
                      src: activeWorkspace.logoUrl,
                      alt: "",
                      className: "size-5 shrink-0 rounded object-cover"
                    }
                  ) : /* @__PURE__ */ jsx32(
                    "span",
                    {
                      "aria-hidden": true,
                      className: "flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white",
                      children: activeWorkspace.fallbackLetter
                    }
                  ),
                  /* @__PURE__ */ jsxs14("span", { className: "flex-1 min-w-0 flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden", children: [
                    /* @__PURE__ */ jsx32("span", { className: "truncate font-semibold text-foreground text-sm", children: activeWorkspace.name }),
                    activeWorkspace.subtext && /* @__PURE__ */ jsx32("span", { className: "truncate text-2xs text-muted-foreground font-normal", children: activeWorkspace.subtext })
                  ] }),
                  /* @__PURE__ */ jsx32(ChevronsUpDown, { className: "size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs14(DropdownMenuContent, { side: isMobile ? "bottom" : "right", align: isMobile ? "center" : "start", className: cn("w-64 p-1.5", dropdownClassName), children: [
          /* @__PURE__ */ jsxs14(DropdownMenuGroup, { className: "space-y-1", children: [
            /* @__PURE__ */ jsx32(DropdownMenuLabel, { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Workspaces" }),
            /* @__PURE__ */ jsx32(DropdownMenuSeparator, {}),
            workspaces.map((w) => {
              const isSelected = w.id === activeWorkspace.id;
              return /* @__PURE__ */ jsxs14(
                DropdownMenuItem,
                {
                  onClick: () => {
                    onWorkspaceChange(w);
                    setOpenMobile(false);
                  },
                  className: "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm cursor-pointer hover:bg-accent focus:bg-accent",
                  children: [
                    w.logoUrl ? /* @__PURE__ */ jsx32(
                      "img",
                      {
                        src: w.logoUrl,
                        alt: "",
                        className: "size-5 shrink-0 rounded object-cover"
                      }
                    ) : /* @__PURE__ */ jsx32("span", { className: "flex size-5 shrink-0 items-center justify-center rounded bg-gradient-primary text-2xs font-bold text-white", children: w.fallbackLetter }),
                    /* @__PURE__ */ jsxs14("div", { className: "flex-1 min-w-0 flex flex-col text-left leading-tight", children: [
                      /* @__PURE__ */ jsx32("span", { className: "font-semibold text-foreground text-sm truncate", children: w.name }),
                      w.subtext && /* @__PURE__ */ jsx32("span", { className: "text-2xs text-muted-foreground truncate", children: w.subtext })
                    ] }),
                    isSelected && /* @__PURE__ */ jsx32(Check, { className: "size-4 shrink-0 text-primary" })
                  ]
                },
                w.id
              );
            })
          ] }),
          /* @__PURE__ */ jsx32(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx32(
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
    /* @__PURE__ */ jsxs14(SidebarContent, { children: [
      /* @__PURE__ */ jsx32(SidebarGroup, { className: "p-0 px-3 pt-1", children: /* @__PURE__ */ jsx32(SidebarGroupContent, { children: /* @__PURE__ */ jsx32(SidebarMenu, { children: navItems.map(({ href, label, icon: Icon, items, badge }) => {
        const active = href ? pathname === href || pathname.startsWith(`${href}/`) : items?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)) || false;
        const isExpanded = !!expandedItems[label];
        return /* @__PURE__ */ jsx32(SidebarMenuItem, { children: items && items.length > 0 ? isCollapsed ? /* @__PURE__ */ jsxs14(DropdownMenu, { children: [
          /* @__PURE__ */ jsx32(
            DropdownMenuTrigger,
            {
              render: /* @__PURE__ */ jsx32(
                SidebarMenuButton,
                {
                  isActive: active,
                  tooltip: label,
                  className: "w-full justify-between",
                  children: /* @__PURE__ */ jsxs14("span", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx32(Icon, {}),
                    /* @__PURE__ */ jsx32("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs14(DropdownMenuContent, { side: "right", align: "start", className: dropdownClassName, children: [
            /* @__PURE__ */ jsx32(DropdownMenuGroup, { children: /* @__PURE__ */ jsx32(DropdownMenuLabel, { children: label }) }),
            /* @__PURE__ */ jsx32(DropdownMenuSeparator, {}),
            items.map((sub) => /* @__PURE__ */ jsx32(
              DropdownMenuItem,
              {
                render: /* @__PURE__ */ jsx32(Link, { href: sub.href }),
                className: cn(
                  "cursor-pointer",
                  pathname === sub.href && "bg-accent text-accent-foreground font-medium"
                ),
                children: /* @__PURE__ */ jsx32("span", { children: sub.label })
              },
              sub.href
            ))
          ] })
        ] }) : /* @__PURE__ */ jsxs14(Fragment2, { children: [
          /* @__PURE__ */ jsxs14(
            SidebarMenuButton,
            {
              onClick: () => toggleExpand(label),
              isActive: active,
              tooltip: label,
              className: "w-full justify-between",
              children: [
                /* @__PURE__ */ jsxs14("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx32(Icon, {}),
                  /* @__PURE__ */ jsx32("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
                ] }),
                /* @__PURE__ */ jsxs14("span", { className: "flex items-center gap-1 group-data-[collapsible=icon]:hidden", children: [
                  badge,
                  /* @__PURE__ */ jsx32(
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
          isExpanded && /* @__PURE__ */ jsx32(SidebarMenuSub, { children: items.map((sub) => /* @__PURE__ */ jsx32(SidebarMenuSubItem, { children: /* @__PURE__ */ jsx32(
            SidebarMenuSubButton,
            {
              render: /* @__PURE__ */ jsx32(Link, { href: sub.href }),
              isActive: pathname === sub.href,
              onClick: () => setOpenMobile(false),
              children: /* @__PURE__ */ jsx32("span", { children: sub.label })
            }
          ) }, sub.href)) })
        ] }) : /* @__PURE__ */ jsxs14(
          SidebarMenuButton,
          {
            render: href ? /* @__PURE__ */ jsx32(Link, { href }) : void 0,
            isActive: active,
            tooltip: label,
            className: "justify-between",
            onClick: () => setOpenMobile(false),
            children: [
              /* @__PURE__ */ jsxs14("span", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx32(Icon, {}),
                /* @__PURE__ */ jsx32("span", { className: "group-data-[collapsible=icon]:hidden whitespace-nowrap", children: label })
              ] }),
              badge && /* @__PURE__ */ jsx32("span", { className: "group-data-[collapsible=icon]:hidden", children: badge })
            ]
          }
        ) }, label);
      }) }) }) }),
      /* @__PURE__ */ jsxs14("div", { className: "mt-auto flex flex-col", children: [
        footerItems && footerItems.length > 0 && /* @__PURE__ */ jsx32("div", { className: "px-3 pb-2 pt-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3", children: /* @__PURE__ */ jsx32(SidebarMenu, { children: footerItems.map((item) => /* @__PURE__ */ jsx32(SidebarMenuItem, { children: /* @__PURE__ */ jsxs14(
          SidebarMenuButton,
          {
            render: /* @__PURE__ */ jsx32(Link, { href: item.href }),
            tooltip: item.label,
            onClick: () => setOpenMobile(false),
            children: [
              /* @__PURE__ */ jsx32(item.icon, {}),
              /* @__PURE__ */ jsx32("span", { children: item.label })
            ]
          }
        ) }, item.label)) }) }),
        bottomCta && /* @__PURE__ */ jsx32("div", { className: "px-3 py-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-3", children: /* @__PURE__ */ jsx32(
          Button,
          {
            variant: "default",
            className: "w-full justify-start gap-2.5 h-10 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:rounded-lg",
            render: /* @__PURE__ */ jsx32(Link, { href: bottomCta.href }),
            onClick: () => setOpenMobile(false),
            children: /* @__PURE__ */ jsxs14("span", { className: "flex items-center gap-2.5 w-full justify-start group-data-[collapsible=icon]:justify-center", children: [
              /* @__PURE__ */ jsx32(bottomCta.icon, { className: "size-4 shrink-0" }),
              /* @__PURE__ */ jsx32("span", { className: "group-data-[collapsible=icon]:hidden truncate", children: bottomCta.label })
            ] })
          }
        ) }),
        alertBanner && !alertDismissed && /* @__PURE__ */ jsx32("div", { className: "p-3 group-data-[collapsible=icon]:p-2 pt-0 group-data-[collapsible=icon]:pt-0", children: /* @__PURE__ */ jsxs14(Tooltip, { children: [
          /* @__PURE__ */ jsx32(
            TooltipTrigger,
            {
              render: /* @__PURE__ */ jsx32(
                AlertBanner,
                {
                  collapsed: isCollapsed,
                  variant: alertBanner.variant || "warning",
                  appearance: alertBanner.appearance || "secondary",
                  icon: /* @__PURE__ */ jsx32(AlertCircle, { className: "size-4 shrink-0" }),
                  title: alertBanner.title,
                  action: alertBanner.ctaText ? { label: alertBanner.ctaText, onClick: alertBanner.onCtaClick || (() => {
                  }) } : void 0,
                  onClose: alertBanner.showClose !== false ? () => setAlertDismissed(true) : void 0
                }
              )
            }
          ),
          /* @__PURE__ */ jsx32(
            TooltipContent,
            {
              side: "right",
              align: "center",
              hidden: !isCollapsed || isMobile,
              className: "max-w-xs p-3 text-left",
              children: /* @__PURE__ */ jsx32("p", { className: "font-semibold text-xs text-foreground", children: alertBanner.title })
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}

// src/components/ui/bottom-nav.tsx
import Link2 from "next/link";
import { Fragment as Fragment3, jsx as jsx33, jsxs as jsxs15 } from "react/jsx-runtime";
function BottomNav({ items, className }) {
  return /* @__PURE__ */ jsx33(
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
        const inner = /* @__PURE__ */ jsxs15(Fragment3, { children: [
          /* @__PURE__ */ jsxs15("div", { className: "relative", children: [
            /* @__PURE__ */ jsx33(
              Icon,
              {
                className: cn(
                  "size-5 transition-colors",
                  item.active ? "text-primary" : "text-muted-foreground"
                ),
                "aria-hidden": true
              }
            ),
            item.badge && /* @__PURE__ */ jsx33("span", { className: "absolute -top-1 -right-2 flex items-center", children: item.badge })
          ] }),
          /* @__PURE__ */ jsx33(
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
          return /* @__PURE__ */ jsx33(
            Link2,
            {
              href: item.href,
              "aria-current": item.active ? "page" : void 0,
              className: sharedClass,
              children: inner
            },
            i
          );
        }
        return /* @__PURE__ */ jsx33(
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
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon as XIcon3 } from "lucide-react";
import { jsx as jsx34, jsxs as jsxs16 } from "react/jsx-runtime";
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx34(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx34(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx34(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({ ...props }) {
  return /* @__PURE__ */ jsx34(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx34(
    DialogPrimitive.Backdrop,
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
  return /* @__PURE__ */ jsxs16(DialogPortal, { children: [
    /* @__PURE__ */ jsx34(DialogOverlay, {}),
    /* @__PURE__ */ jsxs16(
      DialogPrimitive.Popup,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs16(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              render: /* @__PURE__ */ jsx34(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-2 right-2",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ jsx34(
                  XIcon3,
                  {}
                ),
                /* @__PURE__ */ jsx34("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx34(
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
  return /* @__PURE__ */ jsxs16(
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
        showCloseButton && /* @__PURE__ */ jsx34(DialogPrimitive.Close, { render: /* @__PURE__ */ jsx34(Button, { variant: "outline" }), children: "Close" })
      ]
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx34(
    DialogPrimitive.Title,
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
  return /* @__PURE__ */ jsx34(
    DialogPrimitive.Description,
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
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { jsx as jsx35, jsxs as jsxs17 } from "react/jsx-runtime";
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ jsx35(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx35(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx35(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx35(
    AlertDialogPrimitive.Backdrop,
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
  return /* @__PURE__ */ jsxs17(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx35(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx35(
      AlertDialogPrimitive.Popup,
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
  return /* @__PURE__ */ jsx35(
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
  return /* @__PURE__ */ jsx35(
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
  return /* @__PURE__ */ jsx35(
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
  return /* @__PURE__ */ jsx35(
    AlertDialogPrimitive.Title,
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
  return /* @__PURE__ */ jsx35(
    AlertDialogPrimitive.Description,
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
  return /* @__PURE__ */ jsx35(
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
  return /* @__PURE__ */ jsx35(
    AlertDialogPrimitive.Close,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      render: /* @__PURE__ */ jsx35(Button, { variant, size }),
      ...props
    }
  );
}

// src/components/ui/sonner.tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon as Loader2Icon2 } from "lucide-react";
import { jsx as jsx36 } from "react/jsx-runtime";
var Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx36(
    Sonner,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx36(CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ jsx36(InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx36(TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ jsx36(OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx36(Loader2Icon2, { className: "size-4 animate-spin" })
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
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import * as React9 from "react";
import { jsx as jsx37, jsxs as jsxs18 } from "react/jsx-runtime";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx37(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx37(
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
  return /* @__PURE__ */ jsx37(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("bg-muted/60 [&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx37(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx37(
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
  return /* @__PURE__ */ jsx37(
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
  return /* @__PURE__ */ jsx37(
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
  return /* @__PURE__ */ jsx37(
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
  return /* @__PURE__ */ jsx37(
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
  return /* @__PURE__ */ jsxs18(
    TableHead,
    {
      className: cn("relative select-none", className),
      "aria-sort": sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none",
      ...props,
      children: [
        onSortChange ? /* @__PURE__ */ jsxs18(
          "button",
          {
            type: "button",
            onClick: () => onSortChange(nextSort()),
            className: "group/sort inline-flex items-center gap-1.5 text-left font-medium text-foreground hover:text-foreground",
            children: [
              children,
              /* @__PURE__ */ jsx37(SortIcon, { direction: sort })
            ]
          }
        ) : children,
        resizable ? /* @__PURE__ */ jsx37(
          "span",
          {
            role: "separator",
            "aria-orientation": "vertical",
            "aria-label": "Resize column",
            onPointerDown: handlePointerDown,
            onDoubleClick: (e) => e.stopPropagation(),
            className: "group/resize absolute top-0 right-0 bottom-0 z-10 flex w-3 cursor-col-resize touch-none items-center justify-center",
            children: /* @__PURE__ */ jsx37(
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
    return /* @__PURE__ */ jsx37(ArrowUp, { className: "size-3.5 text-foreground", "aria-hidden": true });
  }
  if (direction === "desc") {
    return /* @__PURE__ */ jsx37(ArrowDown, { className: "size-3.5 text-foreground", "aria-hidden": true });
  }
  return /* @__PURE__ */ jsx37(
    ArrowUpDown,
    {
      className: "size-3.5 text-muted-foreground/60 group-hover/sort:text-muted-foreground",
      "aria-hidden": true
    }
  );
}

// src/components/ui/accordion.tsx
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon as ChevronDownIcon2, ChevronUpIcon as ChevronUpIcon2 } from "lucide-react";
import { jsx as jsx38, jsxs as jsxs19 } from "react/jsx-runtime";
function Accordion({ className, ...props }) {
  return /* @__PURE__ */ jsx38(
    AccordionPrimitive.Root,
    {
      "data-slot": "accordion",
      className: cn("flex w-full flex-col", className),
      ...props
    }
  );
}
function AccordionItem({ className, ...props }) {
  return /* @__PURE__ */ jsx38(
    AccordionPrimitive.Item,
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
  return /* @__PURE__ */ jsx38(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs19(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx38(ChevronDownIcon2, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }),
        /* @__PURE__ */ jsx38(ChevronUpIcon2, { "data-slot": "accordion-trigger-icon", className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx38(
    AccordionPrimitive.Panel,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
      ...props,
      children: /* @__PURE__ */ jsx38(
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
import { jsx as jsx39, jsxs as jsxs20 } from "react/jsx-runtime";
function ApnaLogo({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs20(
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
        /* @__PURE__ */ jsx39(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7.71875 0.5H29.2812C33.2681 0.5 36.5 3.73194 36.5 7.71875V29.2812C36.5 33.2681 33.2681 36.5 29.2812 36.5H7.71875C3.73194 36.5 0.5 33.2681 0.5 29.2812V7.71875C0.5 3.73194 3.73194 0.5 7.71875 0.5Z",
            fill: "white",
            stroke: "#DFE1E6"
          }
        ),
        /* @__PURE__ */ jsx39(
          "path",
          {
            d: "M35.9688 32C34.8948 34.639 32.306 36.5 29.2812 36.5H24.501V32H35.9688Z",
            fill: "#FFD166"
          }
        ),
        /* @__PURE__ */ jsx39(
          "path",
          {
            d: "M12.5 36.5H7.71875C4.69395 36.5 2.10519 34.639 1.03125 32H12.5V36.5Z",
            fill: "#2BB793"
          }
        ),
        /* @__PURE__ */ jsx39("rect", { x: "12.502", y: "32", width: "12", height: "4.5", fill: "#83BDE4" }),
        /* @__PURE__ */ jsx39(
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
import { Fragment as Fragment4, jsx as jsx40, jsxs as jsxs21 } from "react/jsx-runtime";
var STOPS = {
  green300: "#74D7AE",
  green400: "#3EBA8D",
  gold300: "#FFD975",
  sky400: "#7BB9E5"
};
function MarkGradients({ prefix }) {
  return /* @__PURE__ */ jsxs21("defs", { children: [
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-0`,
        x1: "9.67724",
        y1: "5.18445",
        x2: "2.28946",
        y2: "32.7183",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.green300 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.sky400 })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-1`,
        x1: "28.3601",
        y1: "28.3822",
        x2: "38.7089",
        y2: "28.3822",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.gold300 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.green400 })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-2`,
        x1: "32.6782",
        y1: "29.0672",
        x2: "36.8885",
        y2: "31.495",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-3`,
        x1: "13.4626",
        y1: "2.38751",
        x2: "27.0854",
        y2: "15.9916",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.gold300 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.green300, stopOpacity: "0.99" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-4`,
        x1: "5.89046",
        y1: "13.4828",
        x2: "1.11813",
        y2: "10.3991",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.green300 })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-5`,
        x1: "35.7645",
        y1: "11.0953",
        x2: "23.256",
        y2: "33.6919",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.sky400 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21(
      "linearGradient",
      {
        id: `${prefix}-6`,
        x1: "15.632",
        y1: "30.0551",
        x2: "18.6601",
        y2: "41.3405",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx40("stop", { stopColor: STOPS.green300 }),
          /* @__PURE__ */ jsx40("stop", { offset: "1", stopColor: STOPS.gold300 })
        ]
      }
    )
  ] });
}
function MarkPaths({ prefix }) {
  return /* @__PURE__ */ jsxs21(Fragment4, { children: [
    /* @__PURE__ */ jsx40("path", { d: "M19.3545 10.2914C19.2335 10.4971 19.1194 10.7076 19.0125 10.9219L16.3556 15.5005L15.5775 16.8412L14.1615 19.2813L13.3699 20.6452L10.6999 25.2461C10.5725 25.4368 10.4509 25.6324 10.3363 25.8318C9.46695 27.3425 8.96972 29.0927 8.96972 30.9586C8.96972 32.6467 9.37683 34.2404 10.0984 35.6476C10.1778 35.8023 10.2615 35.9558 10.3484 36.1061H9.80956C4.34191 35.8097 0 31.3044 0 25.7901C0 24.0999 0.408027 22.5043 1.13122 21.0957L1.38486 20.6588L1.39265 20.6452L1.66253 20.18L10.0984 5.64342L10.3647 5.18445H10.9593C14.5435 5.37877 17.6437 7.38144 19.3545 10.2914Z", fill: `url(#${prefix}-0)` }),
    /* @__PURE__ */ jsx40("path", { d: "M38.7089 25.7897C38.7089 31.3039 34.367 35.809 28.899 36.1055H28.3601C28.4471 35.9554 28.5307 35.8026 28.6101 35.6477L37.047 21.1086C37.1428 20.9613 37.2353 20.8111 37.324 20.6584L37.577 21.0943C38.301 22.5031 38.7089 24.099 38.7089 25.7897Z", fill: `url(#${prefix}-1)` }),
    /* @__PURE__ */ jsx40("path", { d: "M38.7089 25.7897C38.7089 31.3039 34.367 35.809 28.899 36.1055H28.3601C28.4471 35.9554 28.5307 35.8026 28.6101 35.6477L37.047 21.1086C37.1428 20.9613 37.2353 20.8111 37.324 20.6584L37.577 21.0943C38.301 22.5031 38.7089 24.099 38.7089 25.7897Z", fill: `url(#${prefix}-2)` }),
    /* @__PURE__ */ jsx40("path", { d: "M29.7377 10.3317C29.7377 12.1974 29.2406 13.9475 28.3711 15.4582C28.2564 15.6578 28.135 15.853 28.0072 16.044L25.3374 20.6448L24.5458 19.2809L23.1299 16.8409L22.3517 15.5001L19.6948 10.9216C19.5883 10.707 19.4741 10.4967 19.3529 10.291C17.6421 7.3813 14.5419 5.37863 10.9577 5.18406C10.7674 5.17363 10.5758 5.16837 10.3829 5.16837H10.3722L10.6354 4.71508C12.4867 1.87707 15.6994 0 19.3532 0C23.0068 0 26.2196 1.87707 28.0707 4.71508L28.3338 5.16837L28.3431 5.18406L28.6093 5.64303C29.331 7.05023 29.7377 8.64377 29.7377 10.3317Z", fill: `url(#${prefix}-3)` }),
    /* @__PURE__ */ jsx40("path", { d: "M10.3484 5.18445C10.2613 5.33509 10.1778 5.48801 10.0984 5.64342L1.66253 20.1803C1.56623 20.3283 1.4736 20.4788 1.38486 20.6318L1.13237 20.1965C0.408254 18.7878 0 17.1914 0 15.5005C0 9.98624 4.34191 5.48118 9.80978 5.18445H10.3484Z", fill: `url(#${prefix}-4)` }),
    /* @__PURE__ */ jsx40("path", { d: "M38.7097 15.5005C38.7097 17.1914 38.3013 18.7878 37.5773 20.1965L37.3246 20.6318L37.317 20.6454L37.0477 21.1094L28.6112 35.6479L28.345 36.1063H27.7504C24.1663 35.912 21.0661 33.9093 19.3553 30.9996C19.4765 30.7934 19.5907 30.5827 19.6977 30.3679L19.6984 30.3665L22.3542 25.7901L23.1323 24.4494L24.5483 22.0092L25.3399 20.6452L28.0097 16.0444C28.1372 15.8534 28.2586 15.6579 28.3735 15.4586C29.2428 13.9479 29.7403 12.1978 29.7403 10.3321C29.7403 8.64389 29.3332 7.05059 28.6115 5.64342C28.5321 5.48801 28.4485 5.33509 28.3613 5.18445H28.9001C34.3679 5.48118 38.7097 9.98624 38.7097 15.5005Z", fill: `url(#${prefix}-5)` }),
    /* @__PURE__ */ jsx40("path", { d: "M28.3348 36.1218L28.0721 36.5749C26.221 39.4124 23.0077 41.2904 19.3543 41.2904C15.7008 41.2904 12.4883 39.4133 10.6371 36.5757L10.3736 36.1218L10.3647 36.1064L10.0987 35.6482C9.37684 34.241 8.96973 32.6471 8.96973 30.9587C8.96973 29.093 9.46673 27.3426 10.3363 25.8318C10.4509 25.6327 10.5721 25.4378 10.6995 25.2471L13.3699 20.6453L14.1615 22.0093L15.5775 24.4495L16.3556 25.7903L19.0119 30.3677C19.1187 30.5828 19.2329 30.7935 19.3543 30.9993C21.065 33.909 24.1653 35.9117 27.7494 36.1064C27.9397 36.1167 28.1315 36.1218 28.3243 36.1218H28.3348Z", fill: `url(#${prefix}-6)` })
  ] });
}
function OnlyRoundsLogo({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
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
        /* @__PURE__ */ jsx40(MarkPaths, { prefix: "or-logo" }),
        /* @__PURE__ */ jsx40(
          "path",
          {
            d: "M106.152 27.5463L110.504 16.5062H115.143L107.88 33.8822C107.432 34.9489 106.962 35.8879 106.471 36.6986C105.981 37.5303 105.373 38.1706 104.648 38.6185C103.944 39.0665 103.016 39.2904 101.864 39.2904C101.288 39.2904 100.648 39.1725 99.944 38.9379C99.2614 38.7246 98.6531 38.4689 98.1198 38.1703L99.6872 34.7465C100.05 34.9384 100.381 35.088 100.679 35.1947C100.999 35.3227 101.277 35.3861 101.511 35.3861C101.959 35.3861 102.355 35.2583 102.696 35.0023C103.037 34.7677 103.315 34.4158 103.528 33.9467L104.2 32.3138L96.9675 16.5062H101.608L106.152 27.5463ZM58.1657 9.75427C60.427 9.75428 62.4112 10.2555 64.1179 11.2582C65.8457 12.2394 67.2001 13.6048 68.1814 15.3539C69.1627 17.0819 69.654 19.0769 69.654 21.3383C69.654 23.5783 69.1627 25.5733 68.1814 27.3226C67.2214 29.0503 65.8778 30.4158 64.1501 31.4183C62.4434 32.3997 60.4801 32.89 58.2614 32.89C56.0002 32.89 53.995 32.3996 52.2458 31.4183C50.5178 30.4157 49.1627 29.0506 48.1814 27.3226C47.2 25.5733 46.7097 23.5783 46.7097 21.3383C46.7097 19.0558 47.2002 17.0505 48.1814 15.3226C49.1627 13.5733 50.5069 12.2073 52.2136 11.226C53.9416 10.2446 55.9258 9.75427 58.1657 9.75427ZM145.182 16.1224C146.825 16.1225 148.275 16.4851 149.534 17.2103C150.793 17.9143 151.774 18.896 152.478 20.1547C153.182 21.4132 153.534 22.8637 153.534 24.5062C153.534 26.1487 153.182 27.5992 152.478 28.8578C151.774 30.1165 150.793 31.109 149.534 31.8344C148.297 32.5382 146.867 32.89 145.246 32.89C143.625 32.89 142.174 32.5383 140.894 31.8344C139.636 31.109 138.644 30.1165 137.919 28.8578C137.215 27.5992 136.862 26.1488 136.862 24.5062C136.862 22.8636 137.215 21.4133 137.919 20.1547C138.623 18.8961 139.603 17.9143 140.862 17.2103C142.121 16.485 143.561 16.1224 145.182 16.1224ZM160.256 24.6986C160.256 25.765 160.374 26.6074 160.608 27.226C160.864 27.8233 161.216 28.2611 161.664 28.5385C162.133 28.7945 162.656 28.9222 163.232 28.9222C164.341 28.9435 165.184 28.6126 165.759 27.9301C166.335 27.2261 166.624 26.2127 166.624 24.89V16.5062H170.848V32.5062H166.88L166.72 30.3304C166.187 31.1411 165.514 31.7701 164.704 32.2181C163.915 32.6661 163.019 32.89 162.016 32.89C160.736 32.89 159.648 32.6344 158.752 32.1224C157.877 31.6104 157.205 30.8209 156.736 29.7543C156.267 28.6663 156.032 27.2686 156.032 25.5619V16.5062H160.256V24.6986ZM208.087 32.5062H204.087L203.959 30.266C203.425 31.098 202.743 31.7488 201.911 32.2181C201.079 32.6661 200.13 32.89 199.063 32.89C197.591 32.89 196.311 32.5491 195.223 31.8666C194.157 31.184 193.325 30.213 192.727 28.9545C192.13 27.6958 191.831 26.2129 191.831 24.5062C191.831 22.7782 192.13 21.2953 192.727 20.058C193.325 18.7995 194.157 17.8285 195.223 17.1459C196.311 16.4634 197.591 16.1224 199.063 16.1224C200.108 16.1225 201.037 16.3463 201.847 16.7943C202.679 17.2209 203.351 17.8394 203.863 18.6498V10.1058H208.087V32.5062ZM81.4655 16.1224C82.7239 16.1225 83.8011 16.3782 84.697 16.89C85.593 17.402 86.2755 18.2024 86.7448 19.2904C87.2141 20.3571 87.438 21.7439 87.4167 23.4506V32.5062H83.1931V24.3138C83.193 23.2262 83.0652 22.3838 82.8093 21.7865C82.5746 21.1892 82.2329 20.7622 81.7849 20.5062C81.337 20.229 80.8146 20.0903 80.2175 20.0902C79.1295 20.0689 78.2865 20.3997 77.6892 21.0824C77.1132 21.7651 76.8249 22.7785 76.8249 24.1224V32.5062H72.6013V16.5062H76.569L76.7614 18.682C77.2734 17.8501 77.9243 17.2209 78.7136 16.7943C79.5242 16.3464 80.4416 16.1224 81.4655 16.1224ZM95.0124 32.5062H90.7888V10.1058H95.0124V32.5062ZM126.029 10.1058C127.608 10.1058 129.005 10.4159 130.221 11.0345C131.437 11.6532 132.386 12.5063 133.069 13.5941C133.752 14.6608 134.093 15.9089 134.093 17.3383C134.093 18.8102 133.698 20.1119 132.909 21.2426C132.12 22.3516 131.085 23.194 129.805 23.7699L134.989 32.5062H130.029L125.453 24.5707H122.093V32.5062H117.71V10.1058H126.029ZM183.372 16.1224C184.63 16.1225 185.707 16.3781 186.603 16.89C187.499 17.402 188.182 18.2024 188.651 19.2904C189.12 20.3571 189.344 21.7439 189.323 23.4506V32.5062H185.099V24.3138C185.099 23.2262 184.971 22.3838 184.716 21.7865C184.481 21.1892 184.139 20.7622 183.691 20.5062C183.243 20.229 182.721 20.0903 182.124 20.0902C181.036 20.0689 180.193 20.3997 179.595 21.0824C179.019 21.7651 178.731 22.7785 178.731 24.1224V32.5062H174.508V16.5062H178.475L178.668 18.682C179.18 17.8501 179.831 17.2209 180.62 16.7943C181.43 16.3464 182.348 16.1224 183.372 16.1224ZM240.119 32.5062H235.479L233.559 27.5785H224.343L222.424 32.5062H217.783L226.615 10.1058H231.287L240.119 32.5062ZM247.187 32.5062H242.802V10.1058H247.187V32.5062ZM200.119 20.0258C199.351 20.0258 198.668 20.218 198.071 20.6019C197.495 20.9646 197.036 21.4876 196.695 22.1703C196.375 22.8529 196.215 23.6316 196.215 24.5062C196.215 25.3809 196.386 26.1595 196.727 26.8422C197.069 27.5248 197.527 28.0578 198.103 28.4418C198.701 28.8258 199.383 29.0179 200.151 29.0179C200.855 29.0179 201.473 28.8474 202.007 28.5062C202.561 28.1436 202.999 27.6423 203.319 27.0023C203.639 26.3624 203.82 25.6371 203.863 24.8265V24.1859C203.82 23.3754 203.639 22.6609 203.319 22.0424C202.999 21.4024 202.561 20.912 202.007 20.5707C201.452 20.208 200.823 20.0258 200.119 20.0258ZM145.182 20.0258C144.414 20.0258 143.721 20.218 143.102 20.6019C142.505 20.9859 142.035 21.5198 141.694 22.2025C141.353 22.8638 141.182 23.6317 141.182 24.5062C141.182 25.3808 141.353 26.1595 141.694 26.8422C142.035 27.5035 142.516 28.0265 143.134 28.4105C143.753 28.7943 144.457 28.9857 145.246 28.9857C146.035 28.9857 146.729 28.7944 147.326 28.4105C147.923 28.0265 148.382 27.5034 148.702 26.8422C149.043 26.1595 149.215 25.3809 149.215 24.5062C149.215 23.6316 149.043 22.8638 148.702 22.2025C148.361 21.5199 147.881 20.9859 147.262 20.6019C146.665 20.218 145.972 20.0258 145.182 20.0258ZM58.1657 13.7543C56.8217 13.7543 55.6162 14.0851 54.5495 14.7465C53.5043 15.3864 52.6829 16.2721 52.0856 17.4027C51.4884 18.5333 51.1901 19.8451 51.1901 21.3383C51.1901 22.8103 51.4883 24.1119 52.0856 25.2426C52.683 26.3731 53.5152 27.2688 54.5817 27.9301C55.6483 28.57 56.8749 28.89 58.2614 28.89C59.6267 28.89 60.8214 28.57 61.8454 27.9301C62.8907 27.2687 63.702 26.3732 64.278 25.2426C64.8754 24.1119 65.1735 22.8103 65.1735 21.3383C65.1735 19.8451 64.8752 18.5333 64.278 17.4027C63.6807 16.272 62.8585 15.3865 61.8132 14.7465C60.7679 14.0852 59.5523 13.7543 58.1657 13.7543ZM225.783 23.7064H232.119L228.951 15.5785L225.783 23.7064ZM122.093 20.5707H126.061C126.722 20.5707 127.309 20.4319 127.821 20.1547C128.354 19.8774 128.77 19.4929 129.069 19.0023C129.389 18.5117 129.55 17.9569 129.55 17.3383C129.55 16.3783 129.197 15.5997 128.493 15.0023C127.81 14.4051 126.925 14.1059 125.838 14.1058H122.093V20.5707Z",
            fill: "var(--foreground)"
          }
        ),
        /* @__PURE__ */ jsx40(MarkGradients, { prefix: "or-logo" })
      ]
    }
  );
}
function OnlyRoundsLogoMark({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
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
        /* @__PURE__ */ jsx40(MarkPaths, { prefix: "or-mark" }),
        /* @__PURE__ */ jsx40(MarkGradients, { prefix: "or-mark" })
      ]
    }
  );
}

// src/components/ui/job-card.tsx
import { MapPin, Briefcase, Clock, Building2, BookmarkPlus } from "lucide-react";
import { jsx as jsx41, jsxs as jsxs22 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs22(
    "div",
    {
      className: cn(
        "flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-border/80 hover:shadow-xs",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx41("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxs22("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx41("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 overflow-hidden", children: logoUrl ? /* @__PURE__ */ jsx41("img", { src: logoUrl, alt: `${company} logo`, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx41(Building2, { className: "h-6 w-6 text-muted-foreground/60" }) }),
          /* @__PURE__ */ jsxs22("div", { className: "space-y-1 text-left", children: [
            /* @__PURE__ */ jsx41("h3", { className: "font-heading text-lg font-semibold leading-tight text-foreground line-clamp-1", children: title }),
            /* @__PURE__ */ jsx41("p", { className: "text-sm font-medium text-muted-foreground", children: company })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs22("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs22(Badge, { variant: "outline", className: "gap-1.5 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ jsx41(MapPin, { className: "h-3.5 w-3.5" }),
            location
          ] }),
          /* @__PURE__ */ jsxs22(Badge, { variant: "outline", className: "gap-1.5 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ jsx41(Briefcase, { className: "h-3.5 w-3.5" }),
            jobType
          ] }),
          salary && /* @__PURE__ */ jsx41(Badge, { variant: "outline", className: "gap-1.5 font-medium text-foreground bg-muted/30", children: salary })
        ] }),
        /* @__PURE__ */ jsx41(Separator, { className: "opacity-50" }),
        /* @__PURE__ */ jsxs22("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs22("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx41(Clock, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx41("span", { children: postedAt })
          ] }),
          /* @__PURE__ */ jsxs22("div", { className: "flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsxs22(Button, { variant: "outline", onClick: onSave, className: "h-9 w-9 p-0 sm:w-auto sm:px-4 shrink-0 cursor-pointer", "aria-label": "Save Job", children: [
              /* @__PURE__ */ jsx41(BookmarkPlus, { className: "h-4 w-4 sm:mr-2" }),
              /* @__PURE__ */ jsx41("span", { className: "hidden sm:inline", children: "Save" })
            ] }),
            /* @__PURE__ */ jsx41(Button, { variant: "default", onClick: onApply, className: "h-9 px-6 shrink-0 cursor-pointer", children: "Apply Now" })
          ] })
        ] })
      ]
    }
  );
}
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertAction,
  AlertBanner,
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
  ApnaLogo,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  BackButton,
  Badge,
  BottomNav,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Checkbox,
  ChipTabs,
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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
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
  Input,
  JobCard,
  Label,
  MetricCard,
  OnlyRoundsLogo,
  OnlyRoundsLogoMark,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  ReusableSidebar,
  SearchFilterBar,
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
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
  SortableTableHead,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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
};
//# sourceMappingURL=index.mjs.map