/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ContextMenu } from "./ContextMenu";

export default {
  title: "Molecules/ContextMenu",
  component: ContextMenu,
  args: {
    show: true,
    onEdit: () => console.info("Edit clicked"),
    onDelete: () => console.info("Delete clicked"),
  },
} as ComponentMeta<typeof ContextMenu>;

const Template: ComponentStory<typeof ContextMenu> = args => (
  <div
    style={{
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translate(10%, 10%) translate(16px, 80px)",
      display: "inline-flex",
    }}
  >
    <ContextMenu {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
