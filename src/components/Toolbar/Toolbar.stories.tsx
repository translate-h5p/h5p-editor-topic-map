/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Toolbar } from "./Toolbar";

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  args: {
    initialHeight: 50,
    initialWidth: 918,
  },
} as ComponentMeta<typeof Toolbar>;

const Template: ComponentStory<typeof Toolbar> = args => <Toolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
