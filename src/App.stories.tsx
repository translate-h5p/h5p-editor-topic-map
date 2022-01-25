/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { params, semantics, parent } from "../.storybook/helpers/h5p.utils";
import { ArrowDirection } from "./types/ArrowDirection";
import { ArrowType } from "./types/ArrowType";
import { Params } from "./types/h5p/Params";
import { App } from "./App";

export default {
  title: "App",
  component: App,
  args: {
    semantics,
    parent,

    setValue: (newParams: Params) =>
      console.info("Params updated", { params: newParams }),
    initialParams: params,
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = args => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  initialParams: {
    ...params,
    topicMapItems: [
      {
        id: "1",
        xPercentagePosition: 0,
        yPercentagePosition: 0,
        widthPercentage: 15,
        heightPercentage: 20,
        topicImage: {
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
        topicImage: {
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
        topicImage: {
          path: "https://images.unsplash.com/photo-1598328514034-58f20ba7d2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          alt: "",
        },
        label: "Label 3",
        description:
          "You can do anything here - the only pre-requisite is that it makes you happy.",
      },
    ],
    arrowItems: [
      {
        id: "4",
        description: "",
        xPercentagePosition: 35,
        yPercentagePosition: 50,
        widthPercentage: 15,
        heightPercentage: 1,
        arrowDirection: ArrowDirection.Right,
        arrowType: ArrowType.Directional,
      },
    ],
  },
};
