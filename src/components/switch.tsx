/**
 * @component Switch
 * @description Toggle switch for ON/OFF states. Built on Radix UI Switch primitive.
 * Variants: default (toggle only), labeled (with label + help text).
 * Styles: default (dark track), brand (blue track).
 * Sizes: md (44×24px), sm (36×20px).
 *
 * @useCase Settings toggle, feature enable/disable, notification ON/OFF, dark mode switch
 */
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const switchTrackVariants = cva(
  "inline-flex items-center shrink-0 rounded-round p-[2px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      size: {
        md: "h-[24px] w-[44px]",
        sm: "h-[20px] w-[36px]",
      },
      switchStyle: {
        default: "",
        brand: "",
      },
    },
    compoundVariants: [
      {
        switchStyle: "default",
        className:
          "data-[state=unchecked]:bg-background-track data-[state=checked]:bg-background-inverted hover:data-[state=checked]:bg-background-inverted-hover",
      },
      {
        switchStyle: "brand",
        className:
          "data-[state=unchecked]:bg-background-track data-[state=checked]:bg-button-brand hover:data-[state=checked]:bg-button-brand-hover",
      },
    ],
    defaultVariants: {
      size: "md",
      switchStyle: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background-0 shadow-sm transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        md: "size-[20px] data-[state=checked]:translate-x-[20px]",
        sm: "size-[16px] data-[state=checked]:translate-x-[16px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Switch component Props
 *
 * @property {"md" | "sm"} size - Switch size
 *   - `"md"`: Large size (default, track 44×24px, thumb 20px)
 *   - `"sm"`: Small size (track 36×20px, thumb 16px)
 *
 * @property {"default" | "brand"} switchStyle - Track color when ON (checked)
 *   - `"default"`: Dark/black track (default)
 *   - `"brand"`: Blue track
 *
 * @property {boolean} checked - Switch ON/OFF state (controlled mode)
 * @property {boolean} defaultChecked - Initial ON/OFF state (uncontrolled mode)
 * @property {(checked: boolean) => void} onCheckedChange - Callback fired when state changes
 * @property {boolean} disabled - Whether the switch is disabled (semi-transparent + no interaction)
 *
 * @property {string} label - Label text. When provided, renders the Labeled variant.
 * @property {string} helpText - Help text displayed below the label (used with label)
 * @property {"left" | "right"} labelPosition - Label position relative to the switch
 *   - `"left"`: Label on the left side of the switch
 *   - `"right"`: Label on the right side of the switch (default)
 *
 * @example
 * ```tsx
 * // Basic switch (controlled)
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * // Brand style
 * <Switch checked={enabled} onCheckedChange={setEnabled} switchStyle="brand" />
 *
 * // Small size (uncontrolled)
 * <Switch size="sm" defaultChecked />
 *
 * // With label
 * <Switch
 *   label="Notifications"
 *   helpText="Receive email notifications"
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 *
 * // Label on left
 * <Switch
 *   label="Dark Mode"
 *   labelPosition="left"
 *   checked={darkMode}
 *   onCheckedChange={setDarkMode}
 * />
 *
 * // Disabled
 * <Switch checked={true} disabled />
 * ```
 */
export interface SwitchProps extends Omit<VariantProps<typeof switchTrackVariants>, "checked"> {
  ref?: React.Ref<React.ComponentRef<typeof SwitchPrimitive.Root>>;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  label?: string;
  helpText?: string;
  labelPosition?: "left" | "right";
  className?: string;
  id?: string;
}

/**
 * Toggle switch component for ON/OFF states.
 *
 * Wraps Radix UI Switch with design system styling.
 * Supports both controlled (checked + onCheckedChange) and uncontrolled (defaultChecked) modes.
 *
 * **Variants:**
 * - Default: Renders the switch toggle only
 * - Labeled: When `label` prop is provided, renders with label + optional help text
 *
 * **Accessibility:**
 * - Label auto-linked via htmlFor/id (click label to toggle)
 * - Keyboard: Space to toggle, Tab to focus
 * - Screen reader: Built-in role="switch" + aria-checked via Radix
 */
function Switch({
  ref,
  className,
  size,
  switchStyle,
  label,
  helpText,
  labelPosition = "right",
  disabled,
  id,
  ...props
}: SwitchProps) {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  const switchElement = (
    <SwitchPrimitive.Root
      id={switchId}
      ref={ref}
      disabled={disabled}
      data-disabled={disabled ? "" : undefined}
      className={cn(switchTrackVariants({ size, switchStyle }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(switchThumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  );

  if (!label) {
    return switchElement;
  }

  const labelElement = (
    <div className="grid gap-1">
      <label
        htmlFor={switchId}
        className={cn(
          "text-label-2 text-text-primary cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {label}
      </label>
      {helpText && (
        <span
          className={cn(
            "text-caption-1 text-text-tertiary",
            disabled && "opacity-50"
          )}
        >
          {helpText}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-8">
      {labelPosition === "left" && labelElement}
      {switchElement}
      {labelPosition === "right" && labelElement}
    </div>
  );
}

export { Switch, switchTrackVariants, switchThumbVariants };
