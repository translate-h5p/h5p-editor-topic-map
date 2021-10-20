/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { ArrowDirection, ArrowType } from "../Arrow/Utils";
import { MapEditorView } from "./MapEditorView";

export default {
  title: "Templates/Map Editor View",
  component: MapEditorView,
  args: {
    numberOfColumns: 20,
    numberOfRows: 12,
    updateItems: (items: Array<TopicMapItemType>) =>
      console.info("Items updated", { items }),
    updateArrowItems: (items: Array<ArrowItemType>) =>
      console.info("Arrow items updated", { items }),
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
  initialArrowItems: [],
};

let withItemsItems: Array<TopicMapItemType> = [
  {
    id: "1",
    xPercentagePosition: 0,
    yPercentagePosition: 0,
    widthPercentage: 15,
    heightPercentage: 20,
    backgroundImage: {
      path: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=770&q=80",
      alt: "",
    },
    label: "Label 1",
    description: "",
  },
  {
    id: "2",
    xPercentagePosition: 5,
    yPercentagePosition: 30,
    widthPercentage: 30,
    heightPercentage: 60,
    backgroundImage: {
      path: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
      alt: "",
    },
    label: "Label 2",
    description:
      "Let's put some highlights on these little trees. The sun wouldn't forget them. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. Didn't you know you had that much power? You can move mountains. You can do anything.",
  },
  {
    id: "3",
    xPercentagePosition: 50,
    yPercentagePosition: 30,
    widthPercentage: 20,
    heightPercentage: 40,
    backgroundImage: {
      path: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80",
      alt: "",
    },
    label: "Label 3",
    description:
      "You can do anything here - the only pre-requisite is that it makes you happy.",
  },
];

let withItemsArrows: Array<ArrowItemType> = [
  {
    id: "4",
    xPercentagePosition: 35,
    yPercentagePosition: 40,
    widthPercentage: 15,
    heightPercentage: 0,
    arrowDirection: ArrowDirection.Right,
    arrowType: ArrowType.Directional,
    label: "",
  },
];

export const WithItems = Template.bind({});
WithItems.args = {
  initialGridItems: withItemsItems,
  updateItems: (items: Array<TopicMapItemType>) => {
    withItemsItems = items;
  },
  initialArrowItems: withItemsArrows,
  updateArrowItems: (items: Array<ArrowItemType>) => {
    withItemsArrows = items;
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
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1601242453944-421cde7cfc84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "",
      },
      label: "Label 1",
      description: "",
    },
    {
      id: "2",
      xPercentagePosition: 5,
      yPercentagePosition: 30,
      widthPercentage: 30,
      heightPercentage: 60,
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1596985122625-faf96c53e0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        alt: "",
      },
      label: "Label 2",
      description:
        "Let's put some highlights on these little trees. The sun wouldn't forget them. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. Didn't you know you had that much power? You can move mountains. You can do anything.",
    },
    {
      id: "3",
      xPercentagePosition: 50,
      yPercentagePosition: 30,
      widthPercentage: 20,
      heightPercentage: 50,
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1598328514034-58f20ba7d2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        alt: "",
      },
      label: "Label 3",
      description:
        "You can do anything here - the only pre-requisite is that it makes you happy.",
    },
  ],
  initialArrowItems: [],
};
