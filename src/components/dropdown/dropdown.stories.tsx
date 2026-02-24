import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { User, Settings, Bell, Mail } from "lucide-react";
import { Select, MultiSelect } from "./dropdown";
import type { DropdownOption } from "./dropdown";

const basicOptions: DropdownOption[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
];

const iconOptions: DropdownOption[] = [
  { value: "profile", label: "Profile", leadIcon: <User className="size-4" /> },
  { value: "settings", label: "Settings", leadIcon: <Settings className="size-4" /> },
  { value: "notifications", label: "Notifications", leadIcon: <Bell className="size-4" /> },
  { value: "messages", label: "Messages", leadIcon: <Mail className="size-4" /> },
];

const captionOptions: DropdownOption[] = [
  { value: "admin", label: "Admin", caption: "Full access" },
  { value: "editor", label: "Editor", caption: "Can edit content" },
  { value: "viewer", label: "Viewer", caption: "Read-only access" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Dropdown",
  component: Select,
  tags: ["autodocs"],
  args: { onValueChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Select>;

// === Select (Single) ===

export const Default: Story = {
  render: (args) => (
    <Select
      {...args}
      options={basicOptions}
      placeholder="Select an option"
    />
  ),
};

export const WithValue: Story = {
  render: (args) => (
    <Select
      {...args}
      options={basicOptions}
      value="2"
      placeholder="Select"
    />
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <Select
      {...args}
      options={basicOptions}
      label="Category"
      placeholder="Choose category"
    />
  ),
};

export const SizeSm: Story = {
  render: (args) => (
    <Select
      {...args}
      options={basicOptions}
      size="sm"
      placeholder="Small select"
    />
  ),
};

export const InlineVariant: Story = {
  render: (args) => (
    <Select
      {...args}
      options={basicOptions}
      variant="inline"
      placeholder="Inline style"
    />
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Select
      {...args}
      options={iconOptions}
      placeholder="Select action"
    />
  ),
};

export const WithCaptions: Story = {
  render: (args) => (
    <Select
      {...args}
      options={captionOptions}
      label="Role"
      placeholder="Select role"
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select
      {...args}
      options={basicOptions}
      disabled
      placeholder="Disabled"
    />
  ),
};

export const WithDisabledOption: Story = {
  render: (args) => (
    <Select
      {...args}
      options={[
        { value: "1", label: "Available" },
        { value: "2", label: "Unavailable", disabled: true },
        { value: "3", label: "Also available" },
      ]}
      placeholder="Select"
    />
  ),
};

export const AlignRight: Story = {
  render: (args) => (
    <div className="flex justify-end" style={{ width: 300 }}>
      <Select
        {...args}
        options={basicOptions}
        side="right"
        placeholder="Right aligned"
      />
    </div>
  ),
};

// === MultiSelect ===

export const MultiSelectDefault: Story = {
  render: () => (
    <MultiSelect
      options={basicOptions}
      placeholder="Select options"
      onValuesChange={fn()}
    />
  ),
};

export const MultiSelectWithValues: Story = {
  render: () => (
    <MultiSelect
      options={basicOptions}
      values={["1", "3"]}
      placeholder="Select"
      onValuesChange={fn()}
    />
  ),
};

export const MultiSelectWithLabel: Story = {
  render: () => (
    <MultiSelect
      options={iconOptions}
      label="Permissions"
      placeholder="Select permissions"
      onValuesChange={fn()}
    />
  ),
};

export const MultiSelectWithCaptions: Story = {
  render: () => (
    <MultiSelect
      options={captionOptions}
      label="Roles"
      placeholder="Select roles"
      values={["admin"]}
      onValuesChange={fn()}
    />
  ),
};

export const MultiSelectDisabled: Story = {
  render: () => (
    <MultiSelect
      options={basicOptions}
      disabled
      placeholder="Disabled multi"
      onValuesChange={fn()}
    />
  ),
};
