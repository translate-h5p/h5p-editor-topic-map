/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Toolbar } from "./Toolbar";

export default {
  title: "Organisms/Toolbar",
  component: Toolbar,
  ars: {
    setActiveTool: () => console.info("new active tool"),
  },
} as ComponentMeta<typeof Toolbar>;

const Template: ComponentStory<typeof Toolbar> = args => <Toolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
