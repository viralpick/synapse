"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "../lib/cn";
import { Select } from "./dropdown/dropdown";
import type { DropdownOption } from "./dropdown/dropdown";

// ============================================================================
// Pagination Context
// ============================================================================

interface PaginationContextValue {
  /** 현재 페이지 (1-indexed) */
  page: number;
  /** 총 페이지 수 */
  totalPages: number;
  /** 페이지 변경 콜백 */
  onPageChange: (page: number) => void;
  /** 페이지당 항목 수 */
  pageSize: number;
  /** 페이지 사이즈 변경 콜백 */
  onPageSizeChange: (size: number) => void;
  /** 사이즈 variant */
  size: "sm" | "md" | "lg";
  /** 비활성화 여부 */
  disabled: boolean;
}

const PaginationContext = React.createContext<PaginationContextValue | null>(
  null
);

function usePaginationContext() {
  const context = React.useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "Pagination components must be used within a Pagination"
    );
  }
  return context;
}

// ============================================================================
// CVA Variants
// ============================================================================

const paginationNumberVariants = cva(
  "inline-flex items-center justify-center shrink-0 tabular-nums font-medium transition-colors cursor-pointer select-none rounded-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1",
  {
    variants: {
      size: {
        sm: "size-6 text-label-3",
        md: "size-8 text-label-2",
        lg: "size-10 text-label-1 font-semibold",
      },
      active: {
        true: "bg-background-inverted text-text-inverted",
        false: "bg-background-100 text-text-primary hover:bg-background-200",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  }
);

const paginationDirectionVariants = cva(
  "inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer rounded-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      size: {
        sm: "size-6 [&_svg]:size-3.5",
        md: "size-8 [&_svg]:size-4",
        lg: "size-10 [&_svg]:size-5",
      },
      variant: {
        filled: "bg-background-100 text-icon-primary hover:bg-background-200",
        ghost: "bg-transparent text-icon-secondary hover:bg-background-100",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "filled",
    },
  }
);

const paginationEllipsisVariants = cva(
  "inline-flex items-center justify-center shrink-0 tabular-nums text-text-secondary select-none",
  {
    variants: {
      size: {
        sm: "size-6 text-label-3",
        md: "size-8 text-label-2",
        lg: "size-10 text-label-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Page Range Algorithm
// ============================================================================

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function generatePageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
): (number | "ellipsis")[] {
  // 표시 가능한 전체 슬롯 수 (boundary + sibling + current + 2 ellipsis)
  const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;

  // 전체 페이지가 슬롯 수보다 적으면 모든 페이지 표시
  if (totalPages <= totalSlots) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, boundaryCount + 1);
  const rightSiblingIndex = Math.min(
    page + siblingCount,
    totalPages - boundaryCount
  );

  const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
  const showRightEllipsis =
    rightSiblingIndex < totalPages - boundaryCount - 1;

  const result: (number | "ellipsis")[] = [];

  // 왼쪽 boundary
  for (let i = 1; i <= boundaryCount; i++) {
    result.push(i);
  }

  // 왼쪽 ellipsis 또는 연결 숫자
  if (showLeftEllipsis) {
    result.push("ellipsis");
  } else {
    for (let i = boundaryCount + 1; i < leftSiblingIndex; i++) {
      result.push(i);
    }
  }

  // sibling 범위 (현재 페이지 포함)
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    result.push(i);
  }

  // 오른쪽 ellipsis 또는 연결 숫자
  if (showRightEllipsis) {
    result.push("ellipsis");
  } else {
    for (let i = rightSiblingIndex + 1; i <= totalPages - boundaryCount; i++) {
      result.push(i);
    }
  }

  // 오른쪽 boundary
  for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
    result.push(i);
  }

  return result;
}

// ============================================================================
// PaginationRoot
// ============================================================================

/**
 * Pagination 컴포넌트 Props
 *
 * @property {number} page - 현재 페이지 (제어 모드, 1-indexed)
 * @property {number} defaultPage - 초기 페이지 (비제어 모드)
 * @property {number} totalPages - 총 페이지 수 (필수)
 * @property {function} onPageChange - 페이지 변경 콜백
 * @property {number} pageSize - 페이지당 항목 수 (제어 모드)
 * @property {number} defaultPageSize - 초기 페이지 사이즈 (비제어 모드)
 * @property {function} onPageSizeChange - 페이지 사이즈 변경 콜백
 * @property {"sm" | "md" | "lg"} size - 크기 variant
 * @property {boolean} disabled - 비활성화 여부
 *
 * @example
 * ```tsx
 * // 넘버 페이지네이션
 * <Pagination page={page} totalPages={100} onPageChange={setPage}>
 *   <Pagination.Direction direction="prev" />
 *   <Pagination.Numbers />
 *   <Pagination.Direction direction="next" />
 * </Pagination>
 *
 * // 도트 페이지네이션
 * <Pagination page={page} totalPages={5} onPageChange={setPage}>
 *   <Pagination.Direction direction="prev" variant="ghost" />
 *   <Pagination.Dots />
 *   <Pagination.Direction direction="next" variant="ghost" />
 * </Pagination>
 *
 * // 테이블 페이지네이션
 * <Pagination page={page} totalPages={90} onPageChange={setPage} pageSize={10} onPageSizeChange={setPageSize}>
 *   <Pagination.ItemCount />
 *   <Pagination.Direction direction="first" />
 *   <Pagination.Direction direction="prev" />
 *   <Pagination.Direction direction="next" />
 *   <Pagination.Direction direction="last" />
 * </Pagination>
 * ```
 */
export interface PaginationProps {
  ref?: React.Ref<HTMLElement>;
  children?: React.ReactNode;
  className?: string;
  page?: number;
  defaultPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  defaultPageSize?: number;
  onPageSizeChange?: (size: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

function PaginationRoot({
  ref,
  children,
  className,
  page,
  defaultPage = 1,
  totalPages,
  onPageChange,
  pageSize,
  defaultPageSize = 10,
  onPageSizeChange,
  size = "md",
  disabled = false,
  ...props
}: PaginationProps) {
  // Page: controlled / uncontrolled
  const [internalPage, setInternalPage] = React.useState(defaultPage);
  const isPageControlled = page !== undefined;
  const currentPage = isPageControlled ? page : internalPage;

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      const clamped = Math.min(totalPages, Math.max(1, newPage));
      if (!isPageControlled) {
        setInternalPage(clamped);
      }
      onPageChange?.(clamped);
    },
    [totalPages, isPageControlled, onPageChange]
  );

  // PageSize: controlled / uncontrolled
  const [internalPageSize, setInternalPageSize] =
    React.useState(defaultPageSize);
  const isPageSizeControlled = pageSize !== undefined;
  const currentPageSize = isPageSizeControlled ? pageSize : internalPageSize;

  const handlePageSizeChange = React.useCallback(
    (newSize: number) => {
      if (!isPageSizeControlled) {
        setInternalPageSize(newSize);
      }
      onPageSizeChange?.(newSize);
    },
    [isPageSizeControlled, onPageSizeChange]
  );

  const contextValue = React.useMemo(
    () => ({
      page: currentPage,
      totalPages,
      onPageChange: handlePageChange,
      pageSize: currentPageSize,
      onPageSizeChange: handlePageSizeChange,
      size,
      disabled,
    }),
    [
      currentPage,
      totalPages,
      handlePageChange,
      currentPageSize,
      handlePageSizeChange,
      size,
      disabled,
    ]
  );

  return (
    <PaginationContext.Provider value={contextValue}>
      <nav
        ref={ref}
        data-slot="pagination"
        aria-label="Pagination"
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {children}
      </nav>
    </PaginationContext.Provider>
  );
}

// ============================================================================
// Pagination.Number
// ============================================================================

/**
 * 개별 페이지 번호 버튼
 *
 * @property {number} pageNumber - 이 버튼이 나타내는 페이지 번호
 */
export interface PaginationNumberProps
  extends Omit<VariantProps<typeof paginationNumberVariants>, "size"> {
  ref?: React.Ref<HTMLButtonElement>;
  pageNumber: number;
  className?: string;
  children?: React.ReactNode;
}

function PaginationNumber({
  ref,
  pageNumber,
  active,
  className,
  children,
  ...props
}: PaginationNumberProps) {
  const { page, onPageChange, size, disabled } = usePaginationContext();
  const isActive = active ?? pageNumber === page;

  return (
    <button
      ref={ref}
      type="button"
      data-slot="pagination-number"
      aria-label={`Go to page ${pageNumber}`}
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      onClick={() => onPageChange(pageNumber)}
      className={cn(
        paginationNumberVariants({ size, active: isActive }),
        disabled && "cursor-not-allowed opacity-40",
        className
      )}
      {...props}
    >
      {children ?? pageNumber}
    </button>
  );
}

// ============================================================================
// Pagination.Ellipsis
// ============================================================================

/**
 * 페이지 범위가 생략되었음을 나타내는 "..." 요소
 */
export interface PaginationEllipsisProps {
  className?: string;
}

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  const { size } = usePaginationContext();

  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden="true"
      className={cn(paginationEllipsisVariants({ size }), className)}
      {...props}
    >
      …
    </span>
  );
}

// ============================================================================
// Pagination.Direction
// ============================================================================

/**
 * 화살표 네비게이션 버튼
 *
 * @property {"first" | "prev" | "next" | "last"} direction - 이동 방향
 * @property {"filled" | "ghost"} variant - 버튼 스타일
 */
export interface PaginationDirectionProps
  extends Omit<VariantProps<typeof paginationDirectionVariants>, "size"> {
  ref?: React.Ref<HTMLButtonElement>;
  direction: "first" | "prev" | "next" | "last";
  className?: string;
  disabled?: boolean;
}

const directionIconMap = {
  first: ChevronsLeft,
  prev: ChevronLeft,
  next: ChevronRight,
  last: ChevronsRight,
} as const;

const directionLabelMap = {
  first: "Go to first page",
  prev: "Go to previous page",
  next: "Go to next page",
  last: "Go to last page",
} as const;

function PaginationDirection({
  ref,
  direction,
  variant,
  disabled: disabledProp,
  className,
  ...props
}: PaginationDirectionProps) {
  const { page, totalPages, onPageChange, size, disabled: contextDisabled } =
    usePaginationContext();

  const Icon = directionIconMap[direction];

  // 경계 자동 비활성화
  const isAtBoundary =
    direction === "first" || direction === "prev"
      ? page <= 1
      : page >= totalPages;
  const isDisabled = disabledProp ?? contextDisabled ?? isAtBoundary;

  const handleClick = () => {
    switch (direction) {
      case "first":
        onPageChange(1);
        break;
      case "prev":
        onPageChange(page - 1);
        break;
      case "next":
        onPageChange(page + 1);
        break;
      case "last":
        onPageChange(totalPages);
        break;
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      data-slot="pagination-direction"
      aria-label={directionLabelMap[direction]}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(
        paginationDirectionVariants({ size, variant }),
        className
      )}
      {...props}
    >
      <Icon />
    </button>
  );
}

// ============================================================================
// Pagination.Numbers
// ============================================================================

/**
 * 페이지 번호를 자동 생성하는 컴포넌트
 *
 * ellipsis 포함 예: ← 1 ... 56 [57] 58 ... 100 →
 *
 * @property {number} siblingCount - 현재 페이지 좌우에 표시할 페이지 수 (기본 1)
 * @property {number} boundaryCount - 양 끝에 항상 표시할 페이지 수 (기본 1)
 * @property {boolean} showDirectionArrows - 좌우 Direction 버튼 표시 여부 (기본 false)
 */
export interface PaginationNumbersProps {
  className?: string;
  siblingCount?: number;
  boundaryCount?: number;
  showDirectionArrows?: boolean;
}

function PaginationNumbers({
  className,
  siblingCount = 1,
  boundaryCount = 1,
  showDirectionArrows = false,
}: PaginationNumbersProps) {
  const { page, totalPages } = usePaginationContext();

  const pages = React.useMemo(
    () => generatePageRange(page, totalPages, siblingCount, boundaryCount),
    [page, totalPages, siblingCount, boundaryCount]
  );

  return (
    <div
      data-slot="pagination-numbers"
      className={cn("flex items-center gap-1", className)}
    >
      {showDirectionArrows && <PaginationDirection direction="prev" />}
      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <PaginationEllipsis key={`ellipsis-${index}`} />
        ) : (
          <PaginationNumber key={item} pageNumber={item} />
        )
      )}
      {showDirectionArrows && <PaginationDirection direction="next" />}
    </div>
  );
}

// ============================================================================
// Pagination.Dots
// ============================================================================

/**
 * 도트 스타일 페이지 인디케이터
 *
 * @property {number} maxDots - 최대 표시 도트 수 (기본 7)
 */
export interface PaginationDotsProps {
  className?: string;
  maxDots?: number;
}

function PaginationDots({ className, maxDots = 7 }: PaginationDotsProps) {
  const { page, totalPages, onPageChange, disabled } = usePaginationContext();

  // 슬라이딩 윈도우 계산
  const visibleDots = React.useMemo(() => {
    if (totalPages <= maxDots) {
      return range(1, totalPages);
    }

    const half = Math.floor(maxDots / 2);
    let start = page - half;
    let end = page + half;

    if (start < 1) {
      start = 1;
      end = maxDots;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxDots + 1;
    }

    return range(start, end);
  }, [page, totalPages, maxDots]);

  return (
    <div
      data-slot="pagination-dots"
      className={cn("flex items-center gap-1.5", className)}
      role="tablist"
      aria-label="Page dots"
    >
      {visibleDots.map((p) => (
        <button
          key={p}
          type="button"
          role="tab"
          aria-selected={p === page}
          aria-label={`Page ${p}`}
          disabled={disabled}
          onClick={() => onPageChange(p)}
          className={cn(
            "rounded-full transition-all",
            p === page
              ? "size-2.5 bg-gray-900"
              : "size-1.5 bg-gray-400 hover:bg-gray-600",
            disabled && "cursor-not-allowed opacity-40"
          )}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Pagination.ItemCount
// ============================================================================

/**
 * 페이지 정보 및 페이지 사이즈 셀렉터
 *
 * @property {number[]} pageSizeOptions - 선택 가능한 페이지 사이즈 목록
 * @property {string} pageSizeLabel - 페이지 사이즈 레이블 (기본: "페이지당 데이터 수")
 * @property {function} formatPageInfo - 페이지 정보 포맷 함수
 * @property {boolean} showPageSizeSelector - 페이지 사이즈 셀렉터 표시 여부
 * @property {boolean} showPageInfo - 페이지 정보 표시 여부
 */
export interface PaginationItemCountProps {
  className?: string;
  pageSizeOptions?: number[];
  pageSizeLabel?: string;
  formatPageInfo?: (page: number, totalPages: number) => string;
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
}

function PaginationItemCount({
  className,
  pageSizeOptions = [10, 20, 50, 100],
  pageSizeLabel = "페이지당 데이터 수",
  formatPageInfo = (p, total) => `${p}/${total} 페이지`,
  showPageSizeSelector = true,
  showPageInfo = true,
}: PaginationItemCountProps) {
  const { page, totalPages, pageSize, onPageSizeChange, disabled } =
    usePaginationContext();

  const options: DropdownOption[] = React.useMemo(
    () =>
      pageSizeOptions.map((s) => ({
        value: String(s),
        label: String(s),
      })),
    [pageSizeOptions]
  );

  return (
    <div
      data-slot="pagination-item-count"
      className={cn("flex items-center gap-3", className)}
    >
      {showPageSizeSelector && (
        <div className="flex items-center gap-2">
          <span className="text-label-2 text-text-secondary whitespace-nowrap">
            {pageSizeLabel}
          </span>
          <Select
            options={options}
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange(Number(v))}
            size="sm"
            disabled={disabled}
          />
        </div>
      )}
      {showPageInfo && (
        <span className="text-label-2 text-text-primary tabular-nums whitespace-nowrap">
          {formatPageInfo(page, totalPages)}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

const Pagination = Object.assign(PaginationRoot, {
  Number: PaginationNumber,
  Ellipsis: PaginationEllipsis,
  Direction: PaginationDirection,
  Numbers: PaginationNumbers,
  Dots: PaginationDots,
  ItemCount: PaginationItemCount,
});

export {
  Pagination,
  paginationNumberVariants,
  paginationDirectionVariants,
  paginationEllipsisVariants,
};
