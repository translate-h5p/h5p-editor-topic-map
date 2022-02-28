/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ClassicArrow } from "./Arrow";
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
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  item: {
    startPosition: { x: 0, y: 100 },
    endPosition: { x: 0, y: 0 },
  } as ClassicArrowItemType,
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  item: {
    startPosition: { x: 0, y: 0 },
    endPosition: { x: 0, y: 100 },
  } as ClassicArrowItemType,
};
