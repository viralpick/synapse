/**
 * @component Skeleton
 * @description Placeholder loading animation for content.
 * Apply custom width/height via className.
 *
 * @useCase Loading states, content placeholders, lazy loading
 */
import { cn } from "../lib/cn";
import React from "react";

/**
 * Skeleton Component
 *
 * 콘텐츠 로딩 중 플레이스홀더를 표시하는 스켈레톤 컴포넌트입니다.
 */
export interface SkeletonProps {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({
  ref,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "animate-pulse rounded-medium bg-background-100",
        className
      )}
      {...props}
    />
  );
}
