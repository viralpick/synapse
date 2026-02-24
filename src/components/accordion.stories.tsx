import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Info, Settings, User, Bell } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  args: { onValueChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger title="Section 1" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">
            This is the content for section 1.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger title="Section 2" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">
            This is the content for section 2.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger title="Section 3" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">
            This is the content for section 3.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: (args) => (
    <Accordion {...args} type="multiple" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger title="First Section" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Content of the first section.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger title="Second Section" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Content of the second section.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger title="Third Section" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Content of the third section.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SizeMd: Story = {
  render: (args) => (
    <Accordion {...args} type="single" size="md" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger title="Medium Size" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Compact accordion content.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger title="Another Item" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">More compact content.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <Accordion {...args} type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger title="Account Settings" description="Manage your account preferences" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Account settings content here.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger title="Notifications" description="Configure notification preferences" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Notification settings content here.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithLeadIcon: Story = {
  render: (args) => (
    <Accordion {...args} type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger leadIcon={<User />} title="Profile" description="View and edit your profile" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Profile content aligned with the icon.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger leadIcon={<Settings />} title="Settings" description="Application settings" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Settings content here.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger leadIcon={<Bell />} title="Notifications" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Notifications content here.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDescriptionIcon: Story = {
  render: (args) => (
    <Accordion {...args} type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger
          leadIcon={<Settings />}
          title="Advanced Settings"
          description="Requires admin access"
          icon={<Info />}
        />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Advanced settings content.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Accordion {...args} type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger title="Enabled" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">This item is enabled.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger title="Disabled Item" description="This item cannot be opened" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Hidden content.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger title="Also Enabled" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Another enabled item.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const AllClosed: Story = {
  render: (args) => (
    <Accordion {...args} type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger title="Click to open" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">Content revealed on click.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger title="Another item" />
        <AccordionContent>
          <p className="text-body-s text-text-secondary">More content.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
