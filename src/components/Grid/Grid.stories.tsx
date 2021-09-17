/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid } from "./Grid";

export default {
  title: "Organisms/Grid",
  component: Grid,
  args: {
    numberOfColumns: 10,
    numberOfRows: 10,
    items: [],
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = args => <Grid {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

const TemplateWithDraggable: ComponentStory<typeof Grid> = args => (
  <Grid {...args} />
);

export const GridWithDraggable = TemplateWithDraggable.bind({});
GridWithDraggable.args = {
  items: [
    {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      xPercentageSize: 10,
      yPercentageSize: 10,
    },

    {
      id: "2",
      xPercentagePosition: 25,
      yPercentagePosition: 60,
      xPercentageSize: 65,
      yPercentageSize: 32,
    },
  ],
};
