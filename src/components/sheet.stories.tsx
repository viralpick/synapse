import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet";
import { Button } from "./button";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Right</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>A slide-in panel from the right.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <p className="text-body-s text-text-secondary">Sheet body content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button buttonStyle="secondary">Close</Button>
          </SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the menu items.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 p-4">
          {["Home", "Profile", "Settings", "Help"].map((item) => (
            <button key={item} className="text-left text-label-2 py-2 px-3 rounded-medium hover:bg-background-100">
              {item}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>You have new updates.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Actions</SheetTitle>
          <SheetDescription>Choose an action below.</SheetDescription>
        </SheetHeader>
        <div className="flex gap-2 p-4">
          <Button className="flex-1">Share</Button>
          <Button className="flex-1" buttonStyle="secondary">Copy Link</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Settings</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your application settings.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label className="text-label-2 font-medium">Display Name</label>
            <input className="border rounded-medium px-3 py-2 text-body-s" placeholder="Enter name" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-2 font-medium">Bio</label>
            <textarea className="border rounded-medium px-3 py-2 text-body-s" rows={3} placeholder="About you" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button buttonStyle="secondary">Cancel</Button>
          </SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
