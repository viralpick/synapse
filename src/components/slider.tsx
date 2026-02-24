"use client";

/**
 * @component Slider
 * @description Slider control for selecting a value or range within a bounded interval.
 * Built on Radix UI Slider primitive. Supports single value and range modes.
 * Compound component with Label, Control, Input, and Caption sub-components.
 *
 * @useCase Volume control, price range filter, brightness adjustment, numeric range selection
 */
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, Minus, Plus } from "lucide-react";
import { cn } from "../lib/cn";

// --- Slider Context ---

interface SliderContextValue {
  value: number[];
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  onValueChange: (value: number[]) => void;
}

const SliderContext = React.createContext<SliderContextValue | null>(null);

function useSliderContext() {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("Slider components must be used within a Slider");
  }
  return context;
}

// --- Variants ---

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-round bg-background-track",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderThumbVariants = cva(
  "block rounded-full bg-gray-0 border-2 border-gray-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// --- Components ---

/**
 * Slider 루트 컴포넌트
 *
 * @property {number[]} value - 현재 값 (controlled)
 * @property {number[]} defaultValue - 초기 값 (uncontrolled)
 * @property {(value: number[]) => void} onValueChange - 값 변경 콜백
 * @property {number} min - 최솟값 (기본값: 0)
 * @property {number} max - 최댓값 (기본값: 100)
 * @property {number} step - 단계 (기본값: 1)
 * @property {boolean} disabled - 비활성화 여부
 *
 * @example
 * ```tsx
 * // 단일 값 슬라이더
 * <Slider defaultValue={[50]} min={0} max={100}>
 *   <Slider.Label required helpText="도움말">라벨</Slider.Label>
 *   <Slider.Control showStepper />
 *   <Slider.Input />
 *   <Slider.Caption>설명 텍스트</Slider.Caption>
 * </Slider>
 *
 * // 범위 슬라이더
 * <Slider defaultValue={[20, 80]} min={0} max={100}>
 *   <Slider.Label required helpText="도움말">라벨</Slider.Label>
 *   <Slider.Control />
 *   <Slider.Input />
 *   <Slider.Caption>설명 텍스트</Slider.Caption>
 * </Slider>
 * ```
 */
export interface SliderProps {
  children?: React.ReactNode;
  className?: string;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

function SliderRoot({
  children,
  className,
  value,
  defaultValue = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: number[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      value: currentValue,
      min,
      max,
      step,
      disabled,
      onValueChange: handleValueChange,
    }),
    [currentValue, min, max, step, disabled, handleValueChange]
  );

  return (
    <SliderContext.Provider value={contextValue}>
      <div
        data-slot="slider"
        className={cn("flex flex-col gap-2 w-full", className)}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
}

// --- Slider.Label ---

interface SliderLabelProps {
  children?: React.ReactNode;
  className?: string;
  required?: boolean;
  helpText?: string;
  helpIcon?: React.ReactNode;
}

/**
 * 슬라이더 레이블 (Label + Help text + required + info icon)
 */
function SliderLabel({
  children,
  className,
  required,
  helpText,
  helpIcon,
}: SliderLabelProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span
        className={cn(
          "text-label-2 text-text-primary",
          required && "after:content-['*'] after:ml-0.5 after:text-text-error"
        )}
      >
        {children}
      </span>
      {helpText && (
        <span className="text-caption-1 text-text-tertiary">{helpText}</span>
      )}
      {helpIcon !== undefined ? (
        helpIcon
      ) : (
        <Info className="size-3.5 text-icon-tertiary" />
      )}
    </div>
  );
}

// --- Slider.Control ---

interface SliderControlProps extends VariantProps<typeof sliderTrackVariants> {
  className?: string;
  showStepper?: boolean;
  showMinMax?: boolean;
}

/**
 * 슬라이더 컨트롤 영역 (스텝 버튼 + min/max 레이블 + 트랙/썸)
 */
function SliderControl({
  className,
  size,
  showStepper = false,
  showMinMax = true,
}: SliderControlProps) {
  const { value, min, max, step, disabled, onValueChange } =
    useSliderContext();

  const handleDecrement = () => {
    const newValue = value.map((v) => Math.max(min, v - step));
    onValueChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = value.map((v) => Math.min(max, v + step));
    onValueChange(newValue);
  };

  const stepperButtonClasses = cn(
    "inline-flex items-center justify-center size-6 shrink-0 rounded-medium transition-colors cursor-pointer",
    "text-icon-secondary hover:bg-background-100 active:bg-background-200",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showStepper && (
        <button
          type="button"
          aria-label="Decrease value"
          className={stepperButtonClasses}
          disabled={disabled || value.every((v) => v <= min)}
          onClick={handleDecrement}
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
      )}

      {showMinMax && (
        <span className="text-label-3 text-text-secondary tabular-nums shrink-0">
          {min}
        </span>
      )}

      <SliderPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <SliderPrimitive.Track
          className={cn(sliderTrackVariants({ size }))}
        >
          <SliderPrimitive.Range className="absolute h-full bg-gray-900 rounded-round" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(sliderThumbVariants({ size }))}
          />
        ))}
      </SliderPrimitive.Root>

      {showMinMax && (
        <span className="text-label-3 text-text-secondary tabular-nums shrink-0">
          {max}
        </span>
      )}

      {showStepper && (
        <button
          type="button"
          aria-label="Increase value"
          className={stepperButtonClasses}
          disabled={disabled || value.every((v) => v >= max)}
          onClick={handleIncrement}
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

// --- Slider.Input ---

interface SliderInputProps {
  className?: string;
  placeholder?: string;
}

/**
 * 슬라이더 값 입력 필드
 * 단일 값: input 1개, 범위: input 2개 자동 렌더링
 */
function SliderInput({ className, placeholder = "Input" }: SliderInputProps) {
  const { value, min, max, disabled, onValueChange } = useSliderContext();
  const isRange = value.length > 1;

  const handleChange = (index: number, inputValue: string) => {
    const numValue = inputValue === "" ? min : Number(inputValue);
    if (Number.isNaN(numValue)) return;

    const clamped = Math.min(max, Math.max(min, numValue));
    const newValue = [...value];
    newValue[index] = clamped;

    // range 모드에서 순서 보장
    if (isRange) {
      if (index === 0 && clamped > value[1]) {
        newValue[0] = value[1];
      } else if (index === 1 && clamped < value[0]) {
        newValue[1] = value[0];
      }
    }

    onValueChange(newValue);
  };

  const inputClasses = cn(
    "inline-flex items-center w-full h-10 px-2.5 py-2 bg-gray-0 rounded-medium transition-all",
    "text-label-2 text-text-primary placeholder:text-text-tertiary outline-none",
    "focus-within:ring-2 focus-within:ring-border-brand focus-within:ring-offset-1",
    disabled && "opacity-20 cursor-not-allowed"
  );

  if (isRange) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <input
          type="number"
          value={value[0]}
          onChange={(e) => handleChange(0, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={inputClasses}
        />
        <input
          type="number"
          value={value[1]}
          onChange={(e) => handleChange(1, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={inputClasses}
        />
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        type="number"
        value={value[0]}
        onChange={(e) => handleChange(0, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={inputClasses}
      />
    </div>
  );
}

// --- Slider.Caption ---

interface SliderCaptionProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * 슬라이더 캡션 (아이콘 + 설명 텍스트)
 */
function SliderCaption({ children, className, icon }: SliderCaptionProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {icon !== undefined ? (
        icon
      ) : (
        <Info className="size-3 text-icon-tertiary" />
      )}
      <span className="text-caption-1 text-text-tertiary">{children}</span>
    </div>
  );
}

// --- Export ---

const Slider = Object.assign(SliderRoot, {
  Label: SliderLabel,
  Control: SliderControl,
  Input: SliderInput,
  Caption: SliderCaption,
});

export { Slider, sliderTrackVariants, sliderThumbVariants };
