/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Draggable } from "./Draggable";

export default {
  title: "Components/Draggable",
  component: Draggable,
  args: {
    updatePosition: newPos => {
      console.info("New position", newPos);
    },
    initialXPosition: 200,
    initialYPosition: 200,
    height: 100,
    width: 100,
    updateSize: newSize => console.info("New size:", newSize),
  },
} as ComponentMeta<typeof Draggable>;

const Template: ComponentStory<typeof Draggable> = args => (
  <Draggable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
