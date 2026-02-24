import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = { args: { className: "h-4 w-48" } };
export const Circle: Story = { args: { className: "size-10 rounded-full" } };
export const Line: Story = { args: { className: "h-4 w-64" } };
export const Block: Story = { args: { className: "h-24 w-full" } };

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 300 }}>
      <Skeleton className="h-32 w-full rounded-large" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 300 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};
