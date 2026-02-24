import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { onCheckedChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: {} };
export const Checked: Story = { args: { defaultChecked: true } };

export const SizeMd: Story = { args: { size: "md", defaultChecked: true } };
export const SizeSm: Story = { args: { size: "sm", defaultChecked: true } };

export const StyleDefault: Story = { args: { switchStyle: "default", defaultChecked: true } };
export const StyleBrand: Story = { args: { switchStyle: "brand", defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const WithLabel: Story = { args: { label: "Notifications", helpText: "Receive email notifications", defaultChecked: true } };
export const WithLabelLeft: Story = { args: { label: "Dark Mode", labelPosition: "left", defaultChecked: true } };
export const WithLabelBrand: Story = { args: { label: "Feature Flag", helpText: "Enable beta features", switchStyle: "brand" } };
export const WithLabelDisabled: Story = { args: { label: "Locked Setting", helpText: "Contact admin to change", disabled: true, defaultChecked: true } };
