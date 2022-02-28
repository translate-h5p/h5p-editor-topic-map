/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ClassicArrow } from "./Arrow";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";
import { ClassicArrowItemType } from "../../types/ClassicArrowItemType";

export default {
  title: "Molecules/ClassicArrow",
  component: ClassicArrow,
  argTypes: {
    type: {
      options: {
        Directional: ArrowType.Directional,
        "Bi-directional": ArrowType.BiDirectional,
        "Non-directional": ArrowType.NonDirectional,
      },
      control: { type: "radio" },
    },
  },
  args: {
    cellSize: 30,
    gapSize: 15,
  },
} as ComponentMeta<typeof ClassicArrow>;

const Template: ComponentStory<typeof ClassicArrow> = args => (
  <ClassicArrow {...args} />
);

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
  type: ArrowType.Directional,
  direction: ArrowDirection.Right,
};

RightDirectionalEmptyArrow.argTypes = {
  direction: {
    options: {
      Left: ArrowDirection.Left,
      Right: ArrowDirection.Right,
    },
    control: { type: "radio" },
  },
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
  type: ArrowType.Directional,
  direction: ArrowDirection.Left,
};

LeftDirectionalCompletedArrow.argTypes = {
  direction: {
    options: {
      Left: ArrowDirection.Left,
      Right: ArrowDirection.Right,
    },
    control: { type: "radio" },
  },
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
  type: ArrowType.BiDirectional,
  direction: ArrowDirection.Right,
};

BidirectionalHorizontalEmptyArrow.argTypes = {
  direction: {
    options: {
      Left: ArrowDirection.Left,
      Right: ArrowDirection.Right,
    },
    control: { type: "radio" },
  },
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  item: {
    startPosition: { x: 0, y: 100 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
  type: ArrowType.Directional,
  direction: ArrowDirection.Up,
};

UpDirectionalEditedArrow.argTypes = {
  direction: {
    options: {
      Up: ArrowDirection.Up,
      Down: ArrowDirection.Down,
    },
    control: { type: "radio" },
  },
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  item: {
    startPosition: { x: 0, y: 0 },
    endPosition: { x: 0, y: 100 },
  } as ClassicArrowItemType,
  type: ArrowType.NonDirectional,
  direction: ArrowDirection.Up,
};

NonDirectionalVerticalEmptyArrow.argTypes = {
  direction: {
    options: {
      Up: ArrowDirection.Up,
      Down: ArrowDirection.Down,
    },
    control: { type: "radio" },
  },
};
