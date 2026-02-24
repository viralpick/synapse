import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Plus, ArrowRight, Search, Trash2 } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { onClick: fn() },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: "Button" } };
export const Secondary: Story = { args: { children: "Button", buttonStyle: "secondary" } };
export const Tertiary: Story = { args: { children: "Button", buttonStyle: "tertiary" } };
export const Ghost: Story = { args: { children: "Button", buttonStyle: "ghost" } };

export const SizeLg: Story = { args: { children: "Large", size: "lg" } };
export const SizeMd: Story = { args: { children: "Medium", size: "md" } };
export const SizeSm: Story = { args: { children: "Small", size: "sm" } };
export const SizeXs: Story = { args: { children: "XSmall", size: "xs" } };

export const Destructive: Story = { args: { children: "Delete", target: "destructive" } };
export const DestructiveSecondary: Story = { args: { children: "Delete", target: "destructive", buttonStyle: "secondary" } };
export const Brand: Story = { args: { children: "Brand", target: "brand" } };
export const BrandSecondary: Story = { args: { children: "Brand", target: "brand", buttonStyle: "secondary" } };

export const WithLeadIcon: Story = { args: { children: "Add Item", leadIcon: <Plus /> } };
export const WithTailIcon: Story = { args: { children: "Next", tailIcon: <ArrowRight /> } };
export const IconOnly: Story = { args: { children: <Search />, buttonType: "icon", "aria-label": "Search" } };
export const IconOnlySm: Story = { args: { children: <Trash2 />, buttonType: "icon", size: "sm", target: "destructive", "aria-label": "Delete" } };

export const Disabled: Story = { args: { children: "Disabled", disabled: true } };
export const DisabledSecondary: Story = { args: { children: "Disabled", buttonStyle: "secondary", disabled: true } };
