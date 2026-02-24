import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { RadioGroup, RadioGroupItem } from "./radio";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { onValueChange: fn() },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="r1" />
        <label htmlFor="r1" className="text-label-2 cursor-pointer">Option 1</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="r2" />
        <label htmlFor="r2" className="text-label-2 cursor-pointer">Option 2</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="r3" />
        <label htmlFor="r3" className="text-label-2 cursor-pointer">Option 3</label>
      </div>
    </RadioGroup>
  ),
};

export const SizeMd: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="md1" size="md" />
        <label htmlFor="md1" className="text-label-2 cursor-pointer">Medium A</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="md2" size="md" />
        <label htmlFor="md2" className="text-label-2 cursor-pointer">Medium B</label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="a" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="d1" />
        <label htmlFor="d1" className="text-label-2 cursor-pointer">Disabled A</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="d2" />
        <label htmlFor="d2" className="text-label-2 cursor-pointer">Disabled B</label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="1" className="flex flex-row gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="1" id="h1" />
        <label htmlFor="h1" className="text-label-2 cursor-pointer">A</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="2" id="h2" />
        <label htmlFor="h2" className="text-label-2 cursor-pointer">B</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="3" id="h3" />
        <label htmlFor="h3" className="text-label-2 cursor-pointer">C</label>
      </div>
    </RadioGroup>
  ),
};
