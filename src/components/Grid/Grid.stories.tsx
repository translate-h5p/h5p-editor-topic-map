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
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1633498103165-98bcbed526ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
        alt: "",
      },
      label: "Label 1",
      links: [],
    },

    {
      id: "2",
      xPercentagePosition: 25,
      yPercentagePosition: 60,
      widthPercentage: 65,
      heightPercentage: 32,
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1601242454027-baa1bcf7ec1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "",
      },
      label: "Label 2",
      links: [],
    },
  ],
};
