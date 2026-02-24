import type { Meta, StoryObj } from "@storybook/react";
import { Home, Folder } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem>Detail</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const SlashDivider: Story = {
  render: () => (
    <Breadcrumb divider="slash">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem>Getting Started</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem icon={<Home />} href="/">Home</BreadcrumbItem>
      <BreadcrumbItem icon={<Folder />} href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const TwoItems: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem>Dashboard</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/category">Category</BreadcrumbItem>
      <BreadcrumbItem href="/category/sub">Subcategory</BreadcrumbItem>
      <BreadcrumbItem href="/category/sub/item">Item</BreadcrumbItem>
      <BreadcrumbItem>Detail</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithOnClick: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem onClick={() => alert("Navigate Home")}>Home</BreadcrumbItem>
      <BreadcrumbItem onClick={() => alert("Navigate Settings")}>Settings</BreadcrumbItem>
      <BreadcrumbItem>Profile</BreadcrumbItem>
    </Breadcrumb>
  ),
};
