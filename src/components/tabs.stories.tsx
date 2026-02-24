import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  args: { onValueChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Segmented: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" variant="segmented">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body-s text-text-secondary p-4">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-body-s text-text-secondary p-4">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-body-s text-text-secondary p-4">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Fill: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" variant="fill">
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Settings</TabsTrigger>
        <TabsTrigger value="tab3">Members</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body-s text-text-secondary p-4">Overview content</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-body-s text-text-secondary p-4">Settings content</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-body-s text-text-secondary p-4">Members content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" variant="line">
      <TabsList>
        <TabsTrigger value="tab1">Posts</TabsTrigger>
        <TabsTrigger value="tab2">Comments</TabsTrigger>
        <TabsTrigger value="tab3">Likes</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body-s text-text-secondary p-4">Posts content</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-body-s text-text-secondary p-4">Comments content</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-body-s text-text-secondary p-4">Likes content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const SizeSm: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" variant="segmented" size="sm">
      <TabsList>
        <TabsTrigger value="tab1">Small 1</TabsTrigger>
        <TabsTrigger value="tab2">Small 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body-s text-text-secondary p-4">Small size content</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-body-s text-text-secondary p-4">Small tab 2 content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" variant="segmented">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Active</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body-s text-text-secondary p-4">Active tab content</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-body-s text-text-secondary p-4">Third tab content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" variant="segmented">
      <TabsList>
        <TabsTrigger value="tab1">First</TabsTrigger>
        <TabsTrigger value="tab2">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-body-s text-text-secondary p-4">First tab content</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-body-s text-text-secondary p-4">Second tab content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      {(["segmented", "fill", "line"] as const).map((variant) => (
        <div key={variant}>
          <p className="text-label-2 text-text-secondary mb-2 capitalize">{variant}</p>
          <Tabs {...args} defaultValue="tab1" variant={variant}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};
