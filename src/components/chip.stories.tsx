import type { Meta, StoryObj } from "@storybook/react";
import { X, Circle } from "lucide-react";
import { Chip } from "./chip";
import { Dot } from "./dot";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Chip>;

// =============================================================================
// Helper: 아바타 Lead
// =============================================================================

const ChipAvatar = () => (
  <Avatar className="size-full">
    <AvatarImage
      src="https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=80&h=80&fit=crop&crop=face"
      alt="User"
    />
    <AvatarFallback>U</AvatarFallback>
  </Avatar>
);

// =============================================================================
// Basic Variants
// =============================================================================

export const Default: Story = {
  args: {
    children: "Chip",
    leadIcon: <ChipAvatar />,
    tailIcon: <X />,
    onRemove: () => {},
  },
};

export const SizeMd: Story = {
  args: {
    children: "Chip",
    size: "md",
    leadIcon: <ChipAvatar />,
    tailIcon: <X />,
    onRemove: () => {},
  },
};

export const SizeSm: Story = {
  args: {
    children: "Chip",
    size: "sm",
    leadIcon: <ChipAvatar />,
    tailIcon: <X />,
    onRemove: () => {},
  },
};

export const ShapeRounded: Story = {
  args: {
    children: "Chip",
    shape: "rounded",
    leadIcon: <ChipAvatar />,
    tailIcon: <X />,
    onRemove: () => {},
  },
};

export const ShapePill: Story = {
  args: {
    children: "Chip",
    shape: "pill",
    leadIcon: <ChipAvatar />,
    tailIcon: <X />,
    onRemove: () => {},
  },
};

export const Disabled: Story = {
  args: {
    children: "Chip",
    disabled: true,
    leadIcon: <ChipAvatar />,
    tailIcon: <X />,
    onRemove: () => {},
  },
};

// =============================================================================
// Design Grid: 4 columns × 4 rows (디자인 스크린샷 매칭)
// Columns: rounded md, pill md, rounded sm, pill sm
// Rows: default, hover, focused, disabled
// =============================================================================

export const DesignGrid: Story = {
  name: "Chip / Design Grid",
  render: () => {
    const cols = [
      { shape: "rounded", size: "md" },
      { shape: "pill", size: "md" },
      { shape: "rounded", size: "sm" },
      { shape: "pill", size: "sm" },
    ] as const;

    return (
      <div className="space-y-6">
        <table className="border-separate border-spacing-4">
          <thead>
            <tr>
              <th className="text-caption-1 text-text-tertiary font-normal text-left pr-4">State</th>
              {cols.map((c) => (
                <th key={`${c.shape}-${c.size}`} className="text-caption-1 text-text-tertiary font-normal">
                  {c.shape} / {c.size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Default */}
            <tr>
              <td className="text-caption-1 text-text-secondary pr-4">Default</td>
              {cols.map((c) => (
                <td key={`default-${c.shape}-${c.size}`}>
                  <Chip size={c.size} shape={c.shape} leadIcon={<ChipAvatar />} tailIcon={<X />} onRemove={() => {}}>
                    Chip
                  </Chip>
                </td>
              ))}
            </tr>
            {/* Hover (시뮬레이션) */}
            <tr>
              <td className="text-caption-1 text-text-secondary pr-4">Hover</td>
              {cols.map((c) => (
                <td key={`hover-${c.shape}-${c.size}`}>
                  <Chip
                    size={c.size}
                    shape={c.shape}
                    leadIcon={<ChipAvatar />}
                    tailIcon={<X />}
                    onRemove={() => {}}
                    className="bg-background-100"
                  >
                    Chip
                  </Chip>
                </td>
              ))}
            </tr>
            {/* Focused (시뮬레이션) */}
            <tr>
              <td className="text-caption-1 text-text-secondary pr-4">Focused</td>
              {cols.map((c) => (
                <td key={`focused-${c.shape}-${c.size}`}>
                  <Chip
                    size={c.size}
                    shape={c.shape}
                    leadIcon={<ChipAvatar />}
                    tailIcon={<X />}
                    onRemove={() => {}}
                    className="ring-2 ring-offset-1 ring-blue-500 border-border-brand"
                  >
                    Chip
                  </Chip>
                </td>
              ))}
            </tr>
            {/* Disabled */}
            <tr>
              <td className="text-caption-1 text-text-secondary pr-4">Disabled</td>
              {cols.map((c) => (
                <td key={`disabled-${c.shape}-${c.size}`}>
                  <Chip size={c.size} shape={c.shape} leadIcon={<ChipAvatar />} tailIcon={<X />} onRemove={() => {}} disabled>
                    Chip
                  </Chip>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};

// =============================================================================
// Chip Lead Variants (디자인 오른쪽 섹션)
// 3 lead types × 2 sizes
// =============================================================================

export const ChipLeadVariants: Story = {
  name: "Chip Lead / All Types",
  render: () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {(["md", "sm"] as const).map((size) => (
          <div key={size} className="flex items-center gap-4">
            <span className="text-caption-1 text-text-tertiary w-8">{size}</span>
            {/* Outline circle */}
            <Chip size={size} leadIcon={<Circle className="size-full text-icon-secondary" />} tailIcon={<X />} onRemove={() => {}}>
              Chip
            </Chip>
            {/* Avatar */}
            <Chip size={size} leadIcon={<ChipAvatar />} tailIcon={<X />} onRemove={() => {}}>
              Chip
            </Chip>
            {/* Colored dot */}
            <Chip size={size} tag={<Dot color="red" size="medium" />} tailIcon={<X />} onRemove={() => {}}>
              Chip
            </Chip>
          </div>
        ))}
      </div>
    </div>
  ),
};

// =============================================================================
// Interactive Example
// =============================================================================

export const Interactive: Story = {
  name: "Interactive / Removable",
  render: () => {
    const items = ["React", "TypeScript", "Tailwind", "Storybook", "Radix UI"];

    return (
      <InteractiveChips items={items} />
    );
  },
};

function InteractiveChips({ items: initialItems }: { items: string[] }) {
  const [items, setItems] = React.useState(initialItems);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip
          key={item}
          size="md"
          shape="pill"
          leadIcon={<ChipAvatar />}
          tailIcon={<X />}
          onRemove={() => setItems((prev) => prev.filter((i) => i !== item))}
        >
          {item}
        </Chip>
      ))}
      {items.length === 0 && (
        <span className="text-caption-1 text-text-tertiary">모든 칩이 제거되었습니다</span>
      )}
    </div>
  );
}

import * as React from "react";
