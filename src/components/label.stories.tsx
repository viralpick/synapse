import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = { args: { children: "Label" } };
export const Required: Story = { args: { children: "Required Label", required: true } };
export const WithHtmlFor: Story = { args: { children: "Email", htmlFor: "email", required: true } };
