import type { Meta, StoryObj } from "@storybook/react";
import { Dot } from "./dot";

const meta: Meta<typeof Dot> = {
  title: "Components/Dot",
  component: Dot,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Dot>;

export const Default: Story = {};
export const Small: Story = { args: { size: "small" } };
export const Medium: Story = { args: { size: "medium" } };
export const Large: Story = { args: { size: "large" } };
export const XLarge: Story = { args: { size: "xlarge" } };

export const Gray: Story = { args: { color: "gray" } };
export const Red: Story = { args: { color: "red" } };
export const Green: Story = { args: { color: "green" } };
export const Blue: Story = { args: { color: "blue" } };

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["gray", "red", "green", "blue"] as const).map((c) => (
        <div key={c} className="flex items-center gap-2">
          <Dot color={c} size="large" />
          <span className="text-label-2 text-text-secondary capitalize">{c}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["small", "medium", "large", "xlarge"] as const).map((s) => (
        <Dot key={s} size={s} color="blue" />
      ))}
    </div>
  ),
};

export const StatusIndicator: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2"><Dot color="green" /> <span className="text-label-2">Online</span></div>
      <div className="flex items-center gap-2"><Dot color="red" /> <span className="text-label-2">Offline</span></div>
      <div className="flex items-center gap-2"><Dot color="gray" /> <span className="text-label-2">Away</span></div>
    </div>
  ),
};
