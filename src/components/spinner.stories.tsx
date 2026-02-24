import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
export const SizeDefault: Story = { args: { size: "default" } };
export const SizeSm: Story = { args: { size: "sm" } };
export const SizeXs: Story = { args: { size: "xs" } };

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="default" />
    </div>
  ),
};
