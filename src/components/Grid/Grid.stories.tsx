/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid } from "./Grid";

export default {
  title: "Organisms/Grid",
  component: Grid,
  args: {
    numberOfColumns: 30,
    numberOfRows: 30,
    initialItems: [],
    gapSize: 8,
    updateItems: () => console.info("Items updated"),
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
  initialItems: [
    {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    },

    {
      id: "2",
      xPercentagePosition: 25,
      yPercentagePosition: 60,
      widthPercentage: 65,
      heightPercentage: 32,
    },
  ],
};
