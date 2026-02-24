import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { AlertCircle, HelpCircle } from "lucide-react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// --- 기본 ---

/** 기본 단일 값 슬라이더 (모든 서브 컴포넌트 포함) */
export const Default: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]} min={0} max={100}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Control />
      <Slider.Input />
      <Slider.Caption>Caption text</Slider.Caption>
    </Slider>
  ),
};

// --- 값 모드 ---

/** 단일 값 + 스텝 버튼 + Label required/helpText */
export const SingleValue: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]} min={0} max={100}>
      <Slider.Label required helpText="Help text">Label</Slider.Label>
      <Slider.Control showStepper />
      <Slider.Input />
      <Slider.Caption>Caption</Slider.Caption>
    </Slider>
  ),
};

/** 범위 슬라이더 (2 thumbs, 2 inputs 자동 렌더링) */
export const Range: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[20, 80]} min={0} max={100}>
      <Slider.Label required helpText="Help text">Label</Slider.Label>
      <Slider.Control />
      <Slider.Input />
      <Slider.Caption>Caption</Slider.Caption>
    </Slider>
  ),
};

// --- 사이즈 ---

/** 작은 트랙/썸 사이즈 (size="sm") */
export const SizeSm: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label>Small Size</Slider.Label>
      <Slider.Control size="sm" />
      <Slider.Input />
    </Slider>
  ),
};

/** 중간(기본) 트랙/썸 사이즈 (size="md") */
export const SizeMd: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label>Medium Size (Default)</Slider.Label>
      <Slider.Control size="md" />
      <Slider.Input />
    </Slider>
  ),
};

// --- 컨트롤 옵션 ---

/** +/- 스텝 버튼 활성 (step=5) */
export const WithStepper: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[30]} min={0} max={100} step={5}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control showStepper />
      <Slider.Input />
    </Slider>
  ),
};

/** min/max 레이블 숨김 */
export const WithoutMinMax: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label>Brightness</Slider.Label>
      <Slider.Control showMinMax={false} />
      <Slider.Input />
    </Slider>
  ),
};

/** 스텝 버튼 + min/max 없음 조합 */
export const WithStepperAndWithoutMinMax: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label>Opacity</Slider.Label>
      <Slider.Control showStepper showMinMax={false} />
      <Slider.Input />
    </Slider>
  ),
};

// --- 비활성화 ---

/** 전체 비활성화 상태 */
export const Disabled: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[40]} disabled>
      <Slider.Label required helpText="Cannot modify">
        Disabled Slider
      </Slider.Label>
      <Slider.Control showStepper />
      <Slider.Input />
      <Slider.Caption>This slider is disabled</Slider.Caption>
    </Slider>
  ),
};

/** 비활성화 범위 슬라이더 */
export const DisabledRange: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[20, 60]} disabled>
      <Slider.Label>Disabled Range</Slider.Label>
      <Slider.Control />
      <Slider.Input />
    </Slider>
  ),
};

// --- 커스텀 설정 ---

/** step=10 커스텀 스텝 */
export const CustomStep: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]} min={0} max={100} step={10}>
      <Slider.Label helpText="Increments of 10">Quantity</Slider.Label>
      <Slider.Control showStepper />
      <Slider.Input />
    </Slider>
  ),
};

/** 커스텀 범위 (min=200, max=500, step=25) */
export const CustomRange: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[300]} min={200} max={500} step={25}>
      <Slider.Label required>Budget ($)</Slider.Label>
      <Slider.Control />
      <Slider.Input />
      <Slider.Caption>Select your budget</Slider.Caption>
    </Slider>
  ),
};

// --- Controlled 모드 ---

/** useState로 controlled 단일 값 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState([50]);
    return (
      <div className="flex flex-col gap-4">
        <Slider value={value} onValueChange={setValue} min={0} max={100}>
          <Slider.Label>Controlled Slider</Slider.Label>
          <Slider.Control showStepper />
          <Slider.Input />
          <Slider.Caption>Current value: {value[0]}</Slider.Caption>
        </Slider>
        <button
          type="button"
          className="text-label-3 text-text-brand underline text-left"
          onClick={() => setValue([75])}
        >
          Set to 75
        </button>
      </div>
    );
  },
};

/** useState로 controlled 범위 값 */
export const ControlledRange: Story = {
  render: function ControlledRangeStory() {
    const [value, setValue] = useState([25, 75]);
    return (
      <div className="flex flex-col gap-4">
        <Slider value={value} onValueChange={setValue} min={0} max={100}>
          <Slider.Label required>Price Filter</Slider.Label>
          <Slider.Control />
          <Slider.Input />
          <Slider.Caption>
            Range: {value[0]} - {value[1]}
          </Slider.Caption>
        </Slider>
        <button
          type="button"
          className="text-label-3 text-text-brand underline text-left"
          onClick={() => setValue([10, 90])}
        >
          Reset to 10-90
        </button>
      </div>
    );
  },
};

// --- Label 변형 ---

/** required 별표 표시 */
export const LabelWithRequired: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label required>Required Field</Slider.Label>
      <Slider.Control />
      <Slider.Input />
    </Slider>
  ),
};

/** helpText 표시 */
export const LabelWithHelpText: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label helpText="This is help text">Label</Slider.Label>
      <Slider.Control />
      <Slider.Input />
    </Slider>
  ),
};

/** 커스텀 help 아이콘 */
export const LabelWithCustomHelpIcon: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label
        helpText="Custom icon"
        helpIcon={<HelpCircle className="size-3.5 text-icon-brand" />}
      >
        Custom Help Icon
      </Slider.Label>
      <Slider.Control />
      <Slider.Input />
    </Slider>
  ),
};

// --- Caption 변형 ---

/** 캡션 커스텀 아이콘 */
export const CaptionWithCustomIcon: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Label>Slider</Slider.Label>
      <Slider.Control />
      <Slider.Input />
      <Slider.Caption
        icon={<AlertCircle className="size-3 text-icon-error" />}
      >
        Warning: value too low
      </Slider.Caption>
    </Slider>
  ),
};

// --- Input 변형 ---

/** 커스텀 placeholder */
export const InputCustomPlaceholder: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[0]} min={0} max={1000}>
      <Slider.Label>Amount</Slider.Label>
      <Slider.Control />
      <Slider.Input placeholder="Enter amount" />
    </Slider>
  ),
};

// --- 최소 구성 ---

/** Control만 단독 사용 (Label, Input, Caption 없음) */
export const ControlOnly: Story = {
  render: (args) => (
    <Slider {...args} defaultValue={[50]}>
      <Slider.Control />
    </Slider>
  ),
};
