import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { onCheckedChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = { args: { checked: false } };
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { checked: "indeterminate" } };

export const SizeSm: Story = { args: { checked: true, size: "sm" } };
export const SizeMd: Story = { args: { checked: true, size: "md" } };

export const Disabled: Story = { args: { checked: false, disabled: true } };
export const DisabledChecked: Story = { args: { checked: true, disabled: true } };
export const DisabledIndeterminate: Story = { args: { checked: "indeterminate", disabled: true } };

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox id="terms" checked={checked} onCheckedChange={(v) => setChecked(v as boolean)} />
        <label htmlFor="terms" className="text-label-2 text-text-primary cursor-pointer">Accept terms</label>
      </div>
    );
  },
};

export const TriStateToggle: Story = {
  render: function TriState() {
    const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
    return (
      <div className="flex items-center gap-2">
        <Checkbox checked={checked} onCheckedChange={setChecked} size="md" />
        <span className="text-label-2 text-text-secondary">State: {String(checked)}</span>
      </div>
    );
  },
};
