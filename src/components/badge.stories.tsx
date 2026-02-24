import type { Meta, StoryObj } from "@storybook/react";
import { Check, X } from "lucide-react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Badge" } };
export const SizeLg: Story = { args: { children: "Large", size: "lg" } };
export const SizeSm: Story = { args: { children: "Small", size: "sm" } };

export const ShapeRounded: Story = { args: { children: "Rounded", shape: "rounded" } };
export const ShapePill: Story = { args: { children: "Pill", shape: "pill" } };

export const Filled: Story = { args: { children: "Filled", badgeStyle: "filled" } };
export const Light: Story = { args: { children: "Light", badgeStyle: "light" } };

export const ThemeRed: Story = { args: { children: "Error", theme: "red" } };
export const ThemeBlue: Story = { args: { children: "Info", theme: "blue" } };
export const ThemeGreen: Story = { args: { children: "Success", theme: "green" } };
export const ThemeYellow: Story = { args: { children: "Warning", theme: "yellow" } };
export const ThemePurple: Story = { args: { children: "Purple", theme: "purple" } };
export const ThemeSlate: Story = { args: { children: "Slate", theme: "slate" } };

export const FilledRed: Story = { args: { children: "Error", theme: "red", badgeStyle: "filled" } };
export const FilledBlue: Story = { args: { children: "Info", theme: "blue", badgeStyle: "filled" } };
export const FilledGreen: Story = { args: { children: "Success", theme: "green", badgeStyle: "filled" } };

export const WithOutline: Story = { args: { children: "Outlined", outline: true, theme: "blue" } };
export const Inactive: Story = { args: { children: "Inactive", active: false } };

export const WithLeftIcon: Story = { args: { children: "Verified", leftIcon: <Check className="size-3" />, theme: "green" } };
export const WithRightIcon: Story = { args: { children: "Remove", rightIcon: <X className="size-3" />, theme: "red" } };

export const CustomColor: Story = { args: { children: "Custom", color: "#8B5CF6" } };

export const AllThemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["gray", "red", "blue", "green", "yellow", "purple", "slate"] as const).map((theme) => (
        <Badge key={theme} theme={theme}>{theme}</Badge>
      ))}
    </div>
  ),
};
