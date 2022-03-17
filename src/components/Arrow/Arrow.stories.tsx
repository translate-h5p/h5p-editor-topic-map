/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Arrow } from "./Arrow";
import { ArrowType } from "../../types/ArrowType";
import { ArrowItemType } from "../../types/ArrowItemType";

export default {
  title: "Molecules/Arrow",
  component: Arrow,
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
    gridSize: { width: 1000, height: 600 },
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ArrowItemType,
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ArrowItemType,
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  item: {
    startPosition: { x: 100, y: 0 },
    endPosition: { x: 0, y: 0 },
  } as ArrowItemType,
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  item: {
    startPosition: { x: 0, y: 100 },
    endPosition: { x: 0, y: 0 },
  } as ArrowItemType,
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  item: {
    startPosition: { x: 0, y: 0 },
    endPosition: { x: 0, y: 100 },
  } as ArrowItemType,
};
