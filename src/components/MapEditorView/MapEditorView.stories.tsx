/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MapEditorView } from "./MapEditorView";
import { TopicMapItem } from "../../types/TopicMapItem";

export default {
  title: "Templates/MapEditorView",
  component: MapEditorView,
  args: {
    numberOfColumns: 20,
    numberOfRows: 12,
    updateItems: (items: Array<TopicMapItem>) =>
      console.info("Items updated", { items }),
  },
} as ComponentMeta<typeof MapEditorView>;

const Template: ComponentStory<typeof MapEditorView> = args => (
  <div style={{ width: "918px" }}>
    <MapEditorView {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  initialGridItems: [],
};

let withItemsItems = [
  {
    id: "1",
    xPercentagePosition: 0,
    yPercentagePosition: 0,
    widthPercentage: 15,
    heightPercentage: 20,
  },
  {
    id: "2",
    xPercentagePosition: 5,
    yPercentagePosition: 30,
    widthPercentage: 30,
    heightPercentage: 20,
  },
  {
    id: "3",
    xPercentagePosition: 40,
    yPercentagePosition: 30,
    widthPercentage: 15,
    heightPercentage: 50,
  },
];

export const WithItems = Template.bind({});
WithItems.args = {
  initialGridItems: withItemsItems,
  updateItems: (items: Array<TopicMapItem>) => {
    withItemsItems = items;
  },
};

const TemplateFullscreen: ComponentStory<typeof MapEditorView> = args => (
  <MapEditorView {...args} />
);

export const FullscreenEmpty = TemplateFullscreen.bind({});
FullscreenEmpty.args = {};

export const FullscreenWithItems = TemplateFullscreen.bind({});
FullscreenWithItems.args = {
  initialGridItems: [
    {
      id: "1",
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      widthPercentage: 15,
      heightPercentage: 20,
    },
    {
      id: "2",
      xPercentagePosition: 5,
      yPercentagePosition: 30,
      widthPercentage: 30,
      heightPercentage: 20,
    },
    {
      id: "3",
      xPercentagePosition: 40,
      yPercentagePosition: 30,
      widthPercentage: 15,
      heightPercentage: 50,
    },
  ],
};
