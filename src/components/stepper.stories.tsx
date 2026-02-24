import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Stepper } from "./stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: { onValueChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = { args: { defaultValue: 1 } };
export const SizeMd: Story = { args: { defaultValue: 5, size: "md" } };
export const SizeSm: Story = { args: { defaultValue: 5, size: "sm" } };

export const Fill: Story = { args: { defaultValue: 3, stepperType: "fill" } };
export const Outline: Story = { args: { defaultValue: 3, stepperType: "outline" } };

export const ShapeDefault: Story = { args: { defaultValue: 1, shape: "default" } };
export const ShapePill: Story = { args: { defaultValue: 1, shape: "pill" } };

export const WithoutSeparator: Story = { args: { defaultValue: 5, separator: false } };
export const CustomRange: Story = { args: { defaultValue: 50, min: 0, max: 100, step: 10 } };
export const AtMin: Story = { args: { defaultValue: 0, min: 0, max: 10 } };
export const AtMax: Story = { args: { defaultValue: 10, min: 0, max: 10 } };

export const Disabled: Story = { args: { defaultValue: 5, disabled: true } };

export const OutlinePill: Story = { args: { defaultValue: 1, stepperType: "outline", shape: "pill" } };
export const SmallOutlinePill: Story = { args: { defaultValue: 1, size: "sm", stepperType: "outline", shape: "pill", separator: false } };
