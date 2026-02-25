import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import * as React from "react";
import { Pagination } from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { onPageChange: fn() },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

// ============================================================================
// Number + Direction 조합 (디자인 중간 행)
// ============================================================================

export const NumberPagination: Story = {
  render: () => {
    const [page, setPage] = React.useState(57);
    return (
      <Pagination page={page} totalPages={100} onPageChange={setPage}>
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers siblingCount={1} />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

export const NumberPaginationFirstPage: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return (
      <Pagination page={page} totalPages={100} onPageChange={setPage}>
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers siblingCount={1} />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

export const NumberPaginationLastPage: Story = {
  render: () => {
    const [page, setPage] = React.useState(100);
    return (
      <Pagination page={page} totalPages={100} onPageChange={setPage}>
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers siblingCount={1} />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

export const NumberPaginationFewPages: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <Pagination page={page} totalPages={5} onPageChange={setPage}>
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

// ============================================================================
// Dot 페이지네이션 (디자인 하단 행)
// ============================================================================

export const DotPagination: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <Pagination page={page} totalPages={7} onPageChange={setPage}>
        <Pagination.Direction direction="prev" variant="ghost" />
        <Pagination.Dots />
        <Pagination.Direction direction="next" variant="ghost" />
      </Pagination>
    );
  },
};

export const DotPaginationMany: Story = {
  render: () => {
    const [page, setPage] = React.useState(8);
    return (
      <Pagination page={page} totalPages={15} onPageChange={setPage}>
        <Pagination.Direction direction="prev" variant="ghost" />
        <Pagination.Dots maxDots={7} />
        <Pagination.Direction direction="next" variant="ghost" />
      </Pagination>
    );
  },
};

// ============================================================================
// 테이블 페이지네이션 (디자인 상단 행)
// ============================================================================

export const TablePagination: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const totalPages = 90;
    return (
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      >
        <Pagination.ItemCount pageSizeOptions={[10, 20, 50]} />
        <div className="flex items-center gap-1">
          <Pagination.Direction direction="first" />
          <Pagination.Direction direction="prev" />
          <Pagination.Direction direction="next" />
          <Pagination.Direction direction="last" />
        </div>
      </Pagination>
    );
  },
};

export const TablePaginationWithNumbers: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    const [pageSize, setPageSize] = React.useState(20);
    return (
      <Pagination
        page={page}
        totalPages={50}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      >
        <div className="flex items-center justify-between w-full gap-4">
          <Pagination.ItemCount pageSizeOptions={[10, 20, 50]} />
          <div className="flex items-center gap-1">
            <Pagination.Direction direction="prev" />
            <Pagination.Numbers />
            <Pagination.Direction direction="next" />
          </div>
        </div>
      </Pagination>
    );
  },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

// ============================================================================
// Size Variants
// ============================================================================

export const SizeSm: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <Pagination page={page} totalPages={10} onPageChange={setPage} size="sm">
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

export const SizeMd: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <Pagination page={page} totalPages={10} onPageChange={setPage} size="md">
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

export const SizeLg: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <Pagination page={page} totalPages={10} onPageChange={setPage} size="lg">
        <Pagination.Direction direction="prev" />
        <Pagination.Numbers />
        <Pagination.Direction direction="next" />
      </Pagination>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [page, setPage] = React.useState(5);
    return (
      <div className="flex flex-col gap-6">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size}>
            <p className="text-label-2 text-text-secondary mb-2">Size: {size}</p>
            <Pagination page={page} totalPages={20} onPageChange={setPage} size={size}>
              <Pagination.Direction direction="prev" />
              <Pagination.Numbers />
              <Pagination.Direction direction="next" />
            </Pagination>
          </div>
        ))}
      </div>
    );
  },
};

// ============================================================================
// Direction Variants
// ============================================================================

export const DirectionFilled: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <Pagination key={size} page={page} totalPages={10} onPageChange={setPage} size={size}>
            <Pagination.Direction direction="first" />
            <Pagination.Direction direction="prev" />
            <Pagination.Direction direction="next" />
            <Pagination.Direction direction="last" />
          </Pagination>
        ))}
      </div>
    );
  },
};

export const DirectionGhost: Story = {
  render: () => {
    const [page, setPage] = React.useState(3);
    return (
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <Pagination key={size} page={page} totalPages={10} onPageChange={setPage} size={size}>
            <Pagination.Direction direction="first" variant="ghost" />
            <Pagination.Direction direction="prev" variant="ghost" />
            <Pagination.Direction direction="next" variant="ghost" />
            <Pagination.Direction direction="last" variant="ghost" />
          </Pagination>
        ))}
      </div>
    );
  },
};

// ============================================================================
// Individual Number Buttons
// ============================================================================

export const NumberButtons: Story = {
  render: () => {
    const [page, setPage] = React.useState(2);
    return (
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size}>
            <p className="text-label-2 text-text-secondary mb-2">Size: {size}</p>
            <Pagination page={page} totalPages={5} onPageChange={setPage} size={size}>
              <Pagination.Number pageNumber={1} />
              <Pagination.Number pageNumber={2} />
              <Pagination.Number pageNumber={3} />
              <Pagination.Ellipsis />
            </Pagination>
          </div>
        ))}
      </div>
    );
  },
};

// ============================================================================
// Disabled
// ============================================================================

export const Disabled: Story = {
  render: () => (
    <Pagination page={3} totalPages={10} disabled>
      <Pagination.Direction direction="prev" />
      <Pagination.Numbers />
      <Pagination.Direction direction="next" />
    </Pagination>
  ),
};

// ============================================================================
// ItemCount Only
// ============================================================================

export const ItemCountOnly: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);
    return (
      <Pagination
        page={page}
        totalPages={50}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      >
        <Pagination.ItemCount
          pageSizeOptions={[10, 20, 50, 100]}
          showPageInfo
          showPageSizeSelector
        />
      </Pagination>
    );
  },
};

export const ItemCountPageInfoOnly: Story = {
  render: () => (
    <Pagination page={5} totalPages={50}>
      <Pagination.ItemCount showPageSizeSelector={false} showPageInfo />
    </Pagination>
  ),
};
