/**
 * @component Stepper
 * @description Numeric stepper with increment/decrement buttons for precise value control.
 * Types: fill (gray background), outline (bordered).
 * Shapes: default (rounded corners), pill (fully rounded).
 * Sizes: md (36px), sm (28px).
 * Optional separator lines between buttons and value display.
 *
 * @useCase Quantity selector, numeric input, pagination step, configuration value adjustment
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import { cn } from "../lib/cn";

const stepperVariants = cva(
  "inline-flex items-center overflow-hidden transition-all",
  {
    variants: {
      size: {
        md: "h-[36px]",
        sm: "h-[28px]",
      },
      stepperType: {
        fill: "bg-button-tertiary",
        outline: "bg-background-0 border border-border-200",
      },
      shape: {
        default: "rounded-medium",
        pill: "rounded-round",
      },
    },
    defaultVariants: {
      size: "md",
      stepperType: "fill",
      shape: "default",
    },
  }
);

/**
 * Stepper component Props
 *
 * @property {number} value - Current value (controlled mode)
 * @property {number} defaultValue - Initial value (uncontrolled mode, default: 0)
 * @property {(value: number) => void} onValueChange - Callback fired when value changes
 * @property {number} min - Minimum allowed value (default: 0)
 * @property {number} max - Maximum allowed value (default: 99)
 * @property {number} step - Increment/decrement step size (default: 1)
 *
 * @property {"md" | "sm"} size - Stepper size
 *   - `"md"`: Medium size (default, 36px height)
 *   - `"sm"`: Small size (28px height)
 *
 * @property {"fill" | "outline"} stepperType - Visual style
 *   - `"fill"`: Gray filled background (default)
 *   - `"outline"`: White background with border
 *
 * @property {"default" | "pill"} shape - Corner style
 *   - `"default"`: Rounded corners (default)
 *   - `"pill"`: Fully rounded corners
 *
 * @property {boolean} separator - Show vertical separator lines between sections (default: true)
 * @property {boolean} disabled - Whether the stepper is disabled
 *
 * @example
 * ```tsx
 * // Basic stepper (controlled)
 * const [count, setCount] = useState(1);
 * <Stepper value={count} onValueChange={setCount} />
 *
 * // Uncontrolled with range
 * <Stepper defaultValue={5} min={1} max={10} />
 *
 * // Outline + pill style
 * <Stepper stepperType="outline" shape="pill" value={count} onValueChange={setCount} />
 *
 * // Small size without separator
 * <Stepper size="sm" separator={false} defaultValue={1} />
 *
 * // Disabled
 * <Stepper value={1} disabled />
 * ```
 */
export interface StepperProps extends VariantProps<typeof stepperVariants> {
  ref?: React.Ref<HTMLDivElement>;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  separator?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Numeric stepper component with +/- buttons.
 *
 * Supports both controlled (value + onValueChange) and uncontrolled (defaultValue) modes.
 * Value is clamped between min and max. Buttons auto-disable at boundaries.
 *
 * **Variants:**
 * - fill: Gray background (bg-button-tertiary)
 * - outline: White background with border
 *
 * **Shapes:**
 * - default: Rounded corners (rounded-medium)
 * - pill: Fully rounded (rounded-round)
 *
 * **Accessibility:**
 * - Keyboard: Tab to focus buttons, Enter/Space to activate
 * - Buttons disable at min/max boundaries
 * - aria-label on buttons for screen readers
 */
function Stepper({
  ref,
  className,
  size,
  stepperType,
  shape,
  separator = true,
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 99,
  step = 1,
  disabled,
  ...props
}: StepperProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (newValue: number) => {
    const clamped = Math.min(max, Math.max(min, newValue));
    if (!isControlled) {
      setInternalValue(clamped);
    }
    onValueChange?.(clamped);
  };

  const isAtMin = currentValue <= min;
  const isAtMax = currentValue >= max;

  const iconSize = size === "sm" ? 14 : 16;

  const buttonClasses = cn(
    "inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-inset",
    size === "sm" ? "w-[28px] h-full" : "w-[36px] h-full",
    stepperType === "fill"
      ? "hover:bg-button-tertiary-hover active:bg-gray-400"
      : "hover:bg-background-50 active:bg-background-100"
  );

  const separatorClasses = cn(
    "w-px h-full shrink-0",
    stepperType === "fill" ? "bg-border-100" : "bg-border-200"
  );

  const valueClasses = cn(
    "inline-flex items-center justify-center shrink-0 select-none tabular-nums text-text-primary",
    size === "sm" ? "w-[28px] text-label-3" : "w-[36px] text-label-2"
  );

  return (
    <div
      ref={ref}
      className={cn(
        stepperVariants({ size, stepperType, shape }),
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <button
        type="button"
        aria-label="Decrease value"
        className={buttonClasses}
        disabled={disabled || isAtMin}
        onClick={() => handleChange(currentValue - step)}
      >
        <Minus size={iconSize} strokeWidth={1.5} />
      </button>
      {separator && <div className={separatorClasses} />}
      <span className={valueClasses}>{currentValue}</span>
      {separator && <div className={separatorClasses} />}
      <button
        type="button"
        aria-label="Increase value"
        className={buttonClasses}
        disabled={disabled || isAtMax}
        onClick={() => handleChange(currentValue + step)}
      >
        <Plus size={iconSize} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export { Stepper, stepperVariants };
