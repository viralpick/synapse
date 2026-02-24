import type { Meta, StoryObj } from "@storybook/react";
import { Info } from "lucide-react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
    <Progress value={60}>
      <Progress.Bar />
    </Progress>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Progress value={45}>
      <Progress.Header>
        <Progress.Label>Uploading</Progress.Label>
        <Progress.HelpText>(2 of 5 files)</Progress.HelpText>
      </Progress.Header>
      <Progress.Bar />
    </Progress>
  ),
};

export const WithValue: Story = {
  render: () => (
    <Progress value={72}>
      <div className="flex items-center justify-between">
        <Progress.Label>Storage</Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Bar size="md" />
    </Progress>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Progress value={30}>
      <Progress.Header>
        <Progress.Label>Processing</Progress.Label>
      </Progress.Header>
      <Progress.Bar />
      <Progress.Footer>
        <Progress.Caption>3 of 10 items completed</Progress.Caption>
      </Progress.Footer>
    </Progress>
  ),
};

export const BarSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="text-label-2 text-text-secondary mb-2">Size: {size}</p>
          <Progress value={60}>
            <Progress.Bar size={size} />
          </Progress>
        </div>
      ))}
    </div>
  ),
};

export const Stripped: Story = {
  render: () => (
    <Progress value={55}>
      <Progress.Header>
        <Progress.Label>Downloading</Progress.Label>
        <Progress.Value />
      </Progress.Header>
      <Progress.Bar variant="stripped" size="lg" />
    </Progress>
  ),
};

export const Circle: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Progress key={size} value={65}>
          <Progress.Circle size={size} />
        </Progress>
      ))}
    </div>
  ),
  parameters: { layout: "centered" },
};

export const CircleWithValue: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Progress value={75}>
        <div className="relative inline-flex items-center justify-center">
          <Progress.Circle size="lg" />
          <span className="absolute text-label-2 font-bold">75%</span>
        </div>
      </Progress>
    </div>
  ),
  parameters: { layout: "centered" },
};

export const WithSpinner: Story = {
  render: () => (
    <Progress value={0}>
      <Progress.Header>
        <Progress.Spinner />
        <Progress.Label>Loading...</Progress.Label>
      </Progress.Header>
      <Progress.Bar />
    </Progress>
  ),
};

export const ZeroPercent: Story = {
  render: () => (
    <Progress value={0}>
      <Progress.Header>
        <Progress.Label>Not started</Progress.Label>
        <Progress.Value />
      </Progress.Header>
      <Progress.Bar size="md" />
    </Progress>
  ),
};

export const HundredPercent: Story = {
  render: () => (
    <Progress value={100}>
      <Progress.Header>
        <Progress.Label>Complete</Progress.Label>
        <Progress.Value />
      </Progress.Header>
      <Progress.Bar size="md" />
    </Progress>
  ),
};

export const FullComposition: Story = {
  render: () => (
    <Progress value={42} max={100}>
      <Progress.Header>
        <Progress.Label>Upload Progress</Progress.Label>
        <Progress.HelpText>
          <Info className="inline size-3" /> ETA 2 min
        </Progress.HelpText>
      </Progress.Header>
      <Progress.Bar variant="stripped" size="md" />
      <Progress.Footer>
        <Progress.Caption>42 of 100 files uploaded</Progress.Caption>
      </Progress.Footer>
    </Progress>
  ),
};
