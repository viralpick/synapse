import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Info, CheckCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <Info />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is a default informational alert.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert>
      <CheckCircle />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <Info />
      <AlertTitle>Quick notice</AlertTitle>
    </Alert>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Plain Alert</AlertTitle>
      <AlertDescription>An alert without an icon.</AlertDescription>
    </Alert>
  ),
};
