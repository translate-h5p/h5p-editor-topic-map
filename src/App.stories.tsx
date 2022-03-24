/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { params, parent, semantics } from "../.storybook/helpers/h5p.utils";
import { App } from "./App";
import { ArrowType } from "./types/ArrowType";
import { ColorTheme } from "./types/ColorTheme";
import { Params } from "./types/H5P/Params";

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

export const WithArrows = Template.bind({});
WithArrows.args = {
  initialParams: {
    ...params,
    arrowItems: [
      {
        id: "d1552416-8133-44ce-84b2-4d472f5c4607",
        label: "Label 3 ⟶ ",
        arrowType: ArrowType.BiDirectional,
        description: "",
        startElementId: "box-3",
        endElementId: "3c4af0be-654f-44bf-8ba6-100813a8f456",
        startPosition: {
          x: 98.38709677419355,
          y: 55.26315789473685,
        },
        endPosition: {
          x: 98.38709677419355,
          y: 28.947368421052634,
        },
        startGridPosition: {
          x: 31,
          y: 11,
        },
        endGridPosition: {
          x: 31,
          y: 5,
        },
        breakpoints: [],
      },
      {
        id: "b1f1e4d8-45f5-4ee4-8cd4-05d976a83327",
        label: " ⟶ Label 1",
        arrowType: ArrowType.Directional,
        description: "",
        startElementId: "3c4af0be-654f-44bf-8ba6-100813a8f456",
        endElementId: "box-1",
        startPosition: {
          x: 75.80645161290323,
          y: 2.631578947368421,
        },
        endPosition: {
          x: 37.096774193548384,
          y: 2.631578947368421,
        },
        startGridPosition: {
          x: 24,
          y: 1,
        },
        endGridPosition: {
          x: 11,
          y: 1,
        },
        breakpoints: [],
      },
      {
        id: "416fa662-26ac-46f5-b1e7-e1888000c0f1",
        label: "Label 1 ⟶ Label 2",
        arrowType: ArrowType.NonDirectional,
        description: "",
        startElementId: "box-1",
        endElementId: "box-2",
        startPosition: {
          x: 1.6129032258064515,
          y: 34.21052631578947,
        },
        endPosition: {
          x: 1.6129032258064515,
          y: 53.94736842105263,
        },
        startGridPosition: {
          x: 1,
          y: 7,
        },
        endGridPosition: {
          x: 1,
          y: 12,
        },
        breakpoints: [],
      },
      {
        id: "8fdbe0f1-774c-4c0a-9070-404e1820ebc6",
        label: "Label 2 ⟶ Label 3",
        arrowType: ArrowType.Directional,
        description: "",
        startElementId: "box-2",
        endElementId: "box-3",
        startPosition: {
          x: 33.87096774193548,
          y: 97.36842105263158,
        },
        endPosition: {
          x: 65.32258064516128,
          y: 97.36842105263158,
        },
        startGridPosition: {
          x: 11,
          y: 19,
        },
        endGridPosition: {
          x: 22,
          y: 19,
        },
        breakpoints: [],
      },
      {
        id: "fbefc064-2b54-4c39-a752-ff56a0f0feac",
        label: "Label 3 ⟶ Label 1",
        arrowType: ArrowType.NonDirectional,
        description: "",
        startElementId: "box-3",
        endElementId: "box-1",
        startPosition: {
          x: 69.35483870967742,
          y: 55.26315789473685,
        },
        endPosition: {
          x: 37.096774193548384,
          y: 34.21052631578947,
        },
        startGridPosition: {
          x: 22,
          y: 11,
        },
        endGridPosition: {
          x: 11,
          y: 7,
        },
        breakpoints: [],
      },
      {
        id: "f9863d3b-9c61-42f8-b3c5-4eebf613ff03",
        label: "Label 2 ⟶ ",
        arrowType: ArrowType.BiDirectional,
        description: "",
        startElementId: "box-2",
        endElementId: "3c4af0be-654f-44bf-8ba6-100813a8f456",
        startPosition: {
          x: 33.87096774193548,
          y: 60.526315789473685,
        },
        endPosition: {
          x: 71.7741935483871,
          y: 23.684210526315788,
        },
        startGridPosition: {
          x: 11,
          y: 12,
        },
        endGridPosition: {
          x: 24,
          y: 5,
        },
        breakpoints: [],
      },
    ],
    topicMapItems: [
      {
        id: "box-1",
        xPercentagePosition: 0,
        yPercentagePosition: 0,
        widthPercentage: 35.483870967741936,
        heightPercentage: 36.84210526315789,
        topicImage: {
          path: "https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          alt: "",
        },
        label: "Label 1",
        description: "",
      },
      {
        id: "box-2",
        xPercentagePosition: 0,
        yPercentagePosition: 58.45913372547407,
        widthPercentage: 35.483870967741936,
        heightPercentage: 42.82358646400045,
        topicImage: {
          path: "https://images.unsplash.com/photo-1621849400072-f554417f7051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
          alt: "",
        },
        label: "Label 2",
        description:
          "Let's put some highlights on these little trees. The sun wouldn't forget them. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. Didn't you know you had that much power? You can move mountains. You can do anything.",
      },
      {
        id: "box-3",
        xPercentagePosition: 68.15715434083602,
        yPercentagePosition: 53.14466702315824,
        widthPercentage: 33.39753396950523,
        heightPercentage: 45.19862137347403,
        topicImage: {
          path: "https://images.unsplash.com/photo-1628105541664-ae6ee8d249ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",
          alt: "",
        },
        label: "Label 3",
        description:
          "You can do anything here - the only pre-requisite is that it makes you happy.",
      },
      {
        id: "3c4af0be-654f-44bf-8ba6-100813a8f456",
        xPercentagePosition: 74.64831189710611,
        yPercentagePosition: 0,
        widthPercentage: 25.80645161290323,
        heightPercentage: 26.31578947368421,
        label: "Label 4",
        description: "",
        topicImage: {
          path: "https://images.unsplash.com/photo-1506543090642-3b27724fdbef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        },
      },
    ],
    colorTheme: ColorTheme.Green,
    gridBackgroundImage: {
      path: "https://images.unsplash.com/photo-1556446384-0c6fd6c8e673?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      alt: "Green hills under clouds",
      copyright: {
        license: "Unsplash License",
        author: "Joseph Liu",
        source: "https://unsplash.com/photos/jwdtI3H-4eg",
        title: "",
        year: "2019",
      },
    },
  },
};

export const WithoutArrows = Template.bind({});
WithoutArrows.args = {
  initialParams: {
    ...params,
    topicMapItems: [
      {
        id: "box-1",
        xPercentagePosition: 0,
        yPercentagePosition: 0,
        widthPercentage: 15,
        heightPercentage: 20,
        topicImage: {
          path: "https://images.unsplash.com/photo-1601242453944-421cde7cfc84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          alt: "",
        },
        topicImageAltText: "Red flower with white background.",
        label: "Label 1",
        description: "",
      },
      {
        id: "box-2",
        xPercentagePosition: 5,
        yPercentagePosition: 30,
        widthPercentage: 30,
        heightPercentage: 60,
        topicImage: {
          path: "https://images.unsplash.com/photo-1596985122625-faf96c53e0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          alt: "",
        },
        topicImageAltText: "Pink flower surrounded by green leaves.",
        label: "Label 2",
        description:
          "Let's put some highlights on these little trees. The sun wouldn't forget them. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. Didn't you know you had that much power? You can move mountains. You can do anything.",
      },
      {
        id: "box-3",
        xPercentagePosition: 50,
        yPercentagePosition: 30,
        widthPercentage: 20,
        heightPercentage: 50,
        topicImage: {
          path: "https://images.unsplash.com/photo-1598328514034-58f20ba7d2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          alt: "",
        },
        topicImageAltText: "Yellow flower with yellow background.",
        label: "Label 3",
        description:
          "You can do anything here - the only pre-requisite is that it makes you happy.",
      },
    ],
    arrowItems: [],
  },
};
