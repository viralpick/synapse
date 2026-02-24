import type { Meta, StoryObj } from "@storybook/react";
import { Info, HelpCircle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Button } from "./button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button buttonStyle="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Default tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const WithTip: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button buttonStyle="secondary">With arrow</Button>
      </TooltipTrigger>
      <TooltipContent tip tipPosition="top-center">
        Tooltip with arrow
      </TooltipContent>
    </Tooltip>
  ),
};

export const SizeSm: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button buttonStyle="ghost" size="sm">
          <Info className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent size="sm" tip tipPosition="top-center">
        Small
      </TooltipContent>
    </Tooltip>
  ),
};

export const SizeMd: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button buttonStyle="secondary">Medium</Button>
      </TooltipTrigger>
      <TooltipContent size="md" tip tipPosition="top-center">
        Medium tooltip
      </TooltipContent>
    </Tooltip>
  ),
};

export const SizeLg: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button buttonStyle="secondary">Large</Button>
      </TooltipTrigger>
      <TooltipContent size="lg" tip tipPosition="top-center">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Large Tooltip</span>
          <span className="text-text-secondary">
            This supports multi-line content with richer information.
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-16">
      {(
        [
          "top-left", "top-center", "top-right",
          "left-center", null, "right-center",
          "bottom-left", "bottom-center", "bottom-right",
        ] as const
      ).map((pos, i) =>
        pos ? (
          <Tooltip key={pos}>
            <TooltipTrigger asChild>
              <Button buttonStyle="secondary" size="sm" className="w-full">
                {pos}
              </Button>
            </TooltipTrigger>
            <TooltipContent tip tipPosition={pos} size="sm">
              {pos}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div key={i} />
        )
      )}
    </div>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-label-2">Need help?</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-icon-secondary">
            <HelpCircle className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent tip tipPosition="top-center" size="md">
          Click for more information
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
