/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Arrow } from "./Arrow";
import { ArrowDirection, ArrowType } from "./Utils";

export default {
  title: "Organisms/Arrow",
  component: Arrow,
  argTypes: {
    type: {
      // prettier-ignore
      // prettier removes the button titles.
      options: {"Directional": ArrowType.Directional, "BiDirectional": ArrowType.BiDirectional, "NonDirectional": ArrowType.NonDirectional},
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  type: ArrowType.Directional,
  direction: ArrowDirection.Right,
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  start: {
    x: 100,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  type: ArrowType.Directional,
  direction: ArrowDirection.Left,
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  type: ArrowType.BiDirectional,
  direction: ArrowDirection.Right,
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  start: {
    x: 0,
    y: 100,
  },
  end: {
    x: 0,
    y: 0,
  },
  type: ArrowType.Directional,
  direction: ArrowDirection.Up,
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 100,
  },
  type: ArrowType.NonDirectional,
  direction: ArrowDirection.Up,
};
