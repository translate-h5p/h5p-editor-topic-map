/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ToolbarButton } from "./ToolbarButton";

export default {
  title: "Atoms/ToolbarButton",
  component: ToolbarButton,
  args: {
    onClick: () => console.log("hei"),
    label: "Map Color",
    showActive: false,
    activeButton: null,
  },
} as ComponentMeta<typeof ToolbarButton>;

const Template: ComponentStory<typeof ToolbarButton> = args => <ToolbarButton {...args}/>;

export const Primary = Template.bind({});
Primary.args = {};
