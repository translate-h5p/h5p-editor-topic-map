/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid } from "./Grid";

export default {
  title: "Components/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = args => <Grid {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  numberOfColumns: 16,
  numberOfRows: 16,
};

const TemplateWithDraggable: ComponentStory<typeof Grid> = args => (
  <Grid {...args} />
);

export const GridWithDraggable = TemplateWithDraggable.bind({});
GridWithDraggable.args = {
  numberOfColumns: 16,
  numberOfRows: 16,
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
      xPercentagePosition: 45,
      yPercentagePosition: 60,
      xPercentageSize: 15,
      yPercentageSize: 10,
    },
  ],
};
