import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Search, Info, Mail } from "lucide-react";
import { Input } from "./input";
import { Badge } from "./badge";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  args: { onChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: "Enter text..." } };
export const SizeSm: Story = { args: { placeholder: "Small input", size: "sm" } };
export const SizeMd: Story = { args: { placeholder: "Medium input", size: "md" } };

export const WithValue: Story = { args: { value: "Hello World", placeholder: "Enter text..." } };
export const WithDefaultValue: Story = { args: { defaultValue: "Default value" } };

export const WithLeadIcon: Story = { args: { placeholder: "Search...", leadIcon: <Search /> } };
export const WithTailIcon: Story = { args: { placeholder: "Email", tailIcon: <Info /> } };
export const WithBadge: Story = { args: { placeholder: "Search...", badge: <Badge size="sm">⌘E</Badge> } };
export const WithAllSlots: Story = {
  args: { placeholder: "Search...", leadIcon: <Search />, badge: <Badge size="sm">⌘K</Badge>, tailIcon: <Info /> },
};

export const Disabled: Story = { args: { value: "Disabled input", disabled: true } };

export const TypeEmail: Story = { args: { type: "email", placeholder: "email@example.com", leadIcon: <Mail /> } };
export const TypePassword: Story = { args: { type: "password", placeholder: "Password" } };
export const TypeNumber: Story = { args: { type: "number", placeholder: "0" } };
