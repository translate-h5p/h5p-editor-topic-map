/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContextMenuButtonType } from "../ContextMenu/ContextMenu";

import { ContextMenuButton } from "./ContextMenuButton";

export default {
  title: "Atoms/ContextMenuButton",
  component: ContextMenuButton,
  args: {
    icon: ContextMenuButtonType.Delete,
    onClick: () => console.info("Toolbar button clicked"),
    label: "Delete",
  },
} as ComponentMeta<typeof ContextMenuButton>;

const Template: ComponentStory<typeof ContextMenuButton> = args => (
  <ContextMenuButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
