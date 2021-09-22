/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styles from "./MapEditorView.module.scss";

import { MapEditorView } from "./MapEditorView";

export default {
  title: "Templates/MapEditorView",
  component: MapEditorView,
  args: {
    numberOfColumns: 20,
    numberOfRows: 12,
    gridItems: [],
  },
} as ComponentMeta<typeof MapEditorView>;

const Template: ComponentStory<typeof MapEditorView> = args => (
  <div className={styles.mapEditorViewWidth}>
    <MapEditorView {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {};

export const WithItems = Template.bind({});
WithItems.args = {
  gridItems: [
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

const TemplateFullscreen: ComponentStory<typeof MapEditorView> = args => (
  <MapEditorView {...args} />
);

export const FullscreenEmpty = TemplateFullscreen.bind({});
FullscreenEmpty.args = {};

export const FullscreenWithItems = TemplateFullscreen.bind({});
FullscreenWithItems.args = {
  gridItems: [
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
