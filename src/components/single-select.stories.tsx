import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SingleSelect } from "./single-select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "strawberry", label: "Strawberry" },
];

const meta: Meta<typeof SingleSelect> = {
  title: "Components/SingleSelect",
  component: SingleSelect,
  tags: ["autodocs"],
  args: { onChange: fn() },
};
export default meta;
type Story = StoryObj<typeof SingleSelect>;

export const Default: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      placeholder="Select a fruit"
    />
  ),
};

export const WithValue: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      value="cherry"
      placeholder="Select a fruit"
    />
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      defaultValue="mango"
      placeholder="Select a fruit"
    />
  ),
};

export const WithNoneOption: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      showNoneItem
      noneLabel="Clear selection"
      placeholder="Select a fruit"
    />
  ),
};

export const NoSearch: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      showSearch={false}
      placeholder="Select (no search)"
    />
  ),
};

export const CustomPlaceholders: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      placeholder="Pick one..."
      searchPlaceholder="Find a fruit..."
      emptyLabel="Nothing matched!"
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      disabled
      placeholder="Disabled"
    />
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={fruits}
      readOnly
      value="banana"
      placeholder="Read only"
    />
  ),
};

export const LargeList: Story = {
  render: (args) => (
    <SingleSelect
      {...args}
      options={Array.from({ length: 500 }, (_, i) => ({
        value: `item-${i}`,
        label: `Item ${i + 1}`,
      }))}
      placeholder="Search from 500 items"
    />
  ),
};
