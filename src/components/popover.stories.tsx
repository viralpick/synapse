import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button buttonStyle="secondary">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-body-s text-text-secondary">
          This is popover content.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Set Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-3">
          <h4 className="text-label-1 font-semibold">Dimensions</h4>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-label-2 text-text-secondary">Width</label>
              <input className="border rounded-medium px-2 py-1 text-body-s" defaultValue="100%" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-label-2 text-text-secondary">Height</label>
              <input className="border rounded-medium px-2 py-1 text-body-s" defaultValue="25px" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button buttonStyle="secondary">Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <p className="text-body-s">Aligned to start</p>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-end" style={{ width: 300 }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button buttonStyle="secondary">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="text-body-s">Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>User Info</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-background-100 flex items-center justify-center text-label-2 font-bold">
              JD
            </div>
            <div>
              <p className="text-label-1 font-semibold">John Doe</p>
              <p className="text-caption-1 text-text-secondary">john@example.com</p>
            </div>
          </div>
          <hr className="border-border-100" />
          <p className="text-body-s text-text-secondary">
            Software Engineer at Acme Corp.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
