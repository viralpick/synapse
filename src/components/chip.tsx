/**
 * @component Chip
 * @description 인터랙티브한 칩/태그 컴포넌트. 아바타, 아이콘, 컬러 Dot 등의 lead 요소와 X 닫기 버튼을 지원.
 * @useCase 선택된 항목 표시, 필터 태그, 사용자 태그, 카테고리 라벨
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../lib/cn";

// =============================================================================
// CVA Variants
// =============================================================================

const chipVariants = cva(
  "inline-flex items-center font-medium whitespace-nowrap shrink-0 border border-border-200 bg-background-0 text-text-primary transition-all cursor-pointer select-none hover:bg-background-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 focus-visible:border-border-brand",
  {
    variants: {
      size: {
        md: "h-8 px-3 py-1.5 gap-1.5 text-label-2",
        sm: "h-6 px-2 py-1 gap-1 text-label-3",
      },
      shape: {
        rounded: "rounded-large",
        pill: "rounded-round",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "rounded",
      disabled: false,
    },
  }
);

// =============================================================================
// Props
// =============================================================================

/**
 * Chip 컴포넌트 Props
 *
 * @property {"md" | "sm"} size - 칩 크기
 *   - `"md"`: 중간 크기 (height: 32px, 기본값)
 *   - `"sm"`: 작은 크기 (height: 24px)
 *
 * @property {"rounded" | "pill"} shape - 칩 모양
 *   - `"rounded"`: 둥근 모서리 (8px, 기본값)
 *   - `"pill"`: 완전히 둥근 모양 (9999px)
 *
 * @property {ReactNode} leadIcon - 텍스트 앞에 표시되는 아이콘/아바타 (원형 클립 적용)
 * @property {ReactNode} tailIcon - 텍스트 뒤에 표시되는 아이콘 (기본: X). onRemove와 함께 사용 시 클릭 가능
 * @property {ReactNode} tag - 컬러 Dot 인디케이터 (leadIcon 앞에 렌더링)
 * @property {function} onRemove - tailIcon 클릭 시 호출되는 콜백
 * @property {boolean} disabled - 비활성화 상태
 *
 * @example
 * ```tsx
 * <Chip leadIcon={<Avatar><AvatarImage src="..." /></Avatar>} tailIcon={<X />} onRemove={() => {}}>
 *   사용자 이름
 * </Chip>
 *
 * <Chip size="sm" shape="pill" tag={<Dot color="green" size="small" />}>
 *   태그
 * </Chip>
 * ```
 */
export interface ChipProps
  extends Omit<VariantProps<typeof chipVariants>, "disabled"> {
  children?: React.ReactNode;
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  tag?: React.ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  className?: string;
  id?: string;
}

// =============================================================================
// Component
// =============================================================================

function Chip({
  className,
  size = "md",
  shape,
  leadIcon,
  tailIcon,
  tag,
  onRemove,
  onClick,
  disabled = false,
  children,
  ...props
}: ChipProps) {
  const leadSize = size === "sm" ? "size-4" : "size-5";
  const tailSize = size === "sm" ? "size-3" : "size-4";

  const handleRemove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled && onRemove) {
        onRemove(e);
      }
    },
    [disabled, onRemove]
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    },
    [disabled, onClick]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if ((e.key === "Enter" || e.key === " ") && onClick) {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    },
    [disabled, onClick]
  );

  return (
    <div
      data-slot="chip"
      role={onClick ? "button" : undefined}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(chipVariants({ size, shape, disabled }), className)}
      {...props}
    >
      {/* Tag: colored dot indicator */}
      {tag && <span className="shrink-0 flex items-center">{tag}</span>}

      {/* Lead icon: avatar, icon (wrapped in circle clip) */}
      {leadIcon && (
        <span
          className={cn(
            "shrink-0 flex items-center justify-center overflow-hidden rounded-full",
            leadSize
          )}
        >
          {leadIcon}
        </span>
      )}

      {/* Text content */}
      {children && <span className="truncate">{children}</span>}

      {/* Tail icon / close button */}
      {tailIcon &&
        (onRemove ? (
          <button
            type="button"
            data-slot="chip-remove"
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove"
            className={cn(
              "shrink-0 flex items-center justify-center rounded-small text-icon-secondary hover:text-text-primary transition-colors",
              tailSize,
              disabled && "pointer-events-none"
            )}
          >
            {tailIcon}
          </button>
        ) : (
          <span
            className={cn(
              "shrink-0 flex items-center justify-center text-icon-secondary",
              tailSize
            )}
          >
            {tailIcon}
          </span>
        ))}
    </div>
  );
}

export { Chip, chipVariants };
