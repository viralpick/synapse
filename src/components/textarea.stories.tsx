import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Textarea } from "./textarea";
import { Button } from "./button";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  args: { onChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { placeholder: "Enter your message...", rows: 4 } };
export const WithValue: Story = { args: { value: "This is some text content.", rows: 4 } };
export const Disabled: Story = { args: { value: "Cannot edit this", disabled: true, rows: 4 } };
export const ReadOnly: Story = { args: { value: "Read only text", readOnly: true, rows: 4 } };

export const WithActions: Story = {
  render: (args) => (
    <Textarea {...args} placeholder="Write a comment..." rows={4}>
      <Textarea.Actions>
        <span className="text-text-secondary text-label-3">0/500</span>
        <Button buttonStyle="secondary" size="sm">Cancel</Button>
        <Button size="sm">Submit</Button>
      </Textarea.Actions>
    </Textarea>
  ),
};

export const DisabledWithActions: Story = {
  render: (args) => (
    <Textarea {...args} value="Locked content" disabled rows={3}>
      <Textarea.Actions>
        <Button buttonStyle="secondary" size="sm" disabled>Cancel</Button>
        <Button size="sm" disabled>Submit</Button>
      </Textarea.Actions>
    </Textarea>
  ),
};
