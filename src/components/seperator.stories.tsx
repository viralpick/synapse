import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./seperator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <p className="text-label-2 text-text-primary">Above</p>
      <Separator className="my-4" />
      <p className="text-label-2 text-text-primary">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-8 gap-4">
      <span className="text-label-2">Left</span>
      <Separator orientation="vertical" />
      <span className="text-label-2">Right</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div style={{ width: 300 }} className="flex flex-col gap-2">
      <div>
        <h3 className="text-label-1 font-semibold">Title</h3>
        <p className="text-body-s text-text-secondary">Description text</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-label-1 font-semibold">Another Title</h3>
        <p className="text-body-s text-text-secondary">More description</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-label-1 font-semibold">Final Title</h3>
        <p className="text-body-s text-text-secondary">Final description</p>
      </div>
    </div>
  ),
};

export const VerticalInToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-2 h-10">
      <button className="text-label-2 px-2">Bold</button>
      <button className="text-label-2 px-2">Italic</button>
      <Separator orientation="vertical" className="h-5" />
      <button className="text-label-2 px-2">Left</button>
      <button className="text-label-2 px-2">Center</button>
      <Separator orientation="vertical" className="h-5" />
      <button className="text-label-2 px-2">List</button>
    </div>
  ),
};
