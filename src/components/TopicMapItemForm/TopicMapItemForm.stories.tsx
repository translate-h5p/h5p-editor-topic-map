/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopicMapItemForm, TopicMapItemFormProps } from "./TopicMapItemForm";

export default {
  title: "Organisms/Topic Map Item Form",
  component: TopicMapItemForm,
} as ComponentMeta<typeof TopicMapItemForm>;

const Template: ComponentStory<typeof TopicMapItemForm> = args => (
  <TopicMapItemForm {...args} />
);

const semantics = {
  label: "Topic map editor",
  name: "topicMap",
  type: "group",
  widget: "topicMap",
  importance: "high",
  fields: [
    {
      label: "Topic map items",
      name: "topicMapItems",
      type: "list",
      entity: "Topic map item",
      field: {
        name: "topicMapItem",
        type: "group",
        fields: [
          { name: "id", type: "text", widget: "hidden" },
          { name: "xPercentagePosition", type: "number", widget: "hidden" },
          { name: "yPercentagePosition", type: "number", widget: "hidden" },
          { name: "widthPercentage", type: "number", widget: "hidden" },
          { name: "heightPercentage", type: "number", widget: "hidden" },
          {
            label: "Label",
            description: "The label is shown on top of the background image",
            name: "label",
            type: "text",
          },
          { label: "Background image", name: "backgroundImage", type: "image" },
          {
            label: "Links",
            name: "links",
            description:
              "These links are as auxiliary links for the user in the element's modal window",
            type: "list",
            field: { label: "Link", name: "link", type: "text" },
          },
        ],
      },
    },
    {
      label: "Arrows",
      name: "arrows",
      type: "list",
      entity: "Arrow",
      field: {
        name: "arrow",
        type: "group",
        fields: [
          { name: "showStartHead", type: "boolean", widget: "none" },
          { name: "showEndHead", type: "boolean", widget: "none" },
        ],
      },
    },
  ],
};

const parent = {
  params: {
    topicMap: {
      topicMapItems: [
        {
          id: "6133281e-7b52-408b-a66c-0878fd839ca4",
          xPercentagePosition: 15,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 20,
          heightPercentage: 33.33333333333335,
          backgroundImage: { path: "" },
          label: "",
        },
        {
          id: "461c2820-da07-43bb-8d14-a798c396fd7a",
          xPercentagePosition: 45,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 45,
          heightPercentage: 83.33333333333331,
          backgroundImage: { path: "" },
          label: "",
        },
        {
          id: "8123ecbf-d416-42a5-8106-47b440de51ec",
          xPercentagePosition: 15,
          yPercentagePosition: 50,
          widthPercentage: 20,
          heightPercentage: 25,
          backgroundImage: { path: "" },
          label: "",
        },
      ],
    },
  },
  passReadies: false,
  commonFields: {},
  $form: { 0: { jQuery191012175626087957792: 12 }, length: 1 },
  $common: {
    0: {},
    length: 1,
    prevObject: { 0: { jQuery191012175626087957792: 12 }, length: 1 },
    selector: ".common > .fields",
  },
  $commonButton: { 0: { jQuery191012175626087957792: 7 }, length: 1 },
  zebra: "odd",
  offset: { top: 59.234375, left: 0 },
  currentLibrary: "H5P.TopicMap 0.1",
  metadata: {
    license: "U",
    title: "Topic Map 3",
    authors: [],
    changes: [],
    extraTitle: "Topic Map 3",
  },
  metadataForm: {},
  children: [],
  readies: [],
  ready: (callback: () => void) => callback(),
};

export const Primary = Template.bind({});
// @ts-expect-error asdasd
Primary.args = {
  params: {
    topicMapItems: [
      {
        heightPercentage: 100,
        widthPercentage: 100,
        id: "1",
        label: "Label",
        links: [],
        xPercentagePosition: 0,
        yPercentagePosition: 0,
        backgroundImage: { path: "", alt: "" },
      },
    ],
  },
  semantics,
  parent,
} as TopicMapItemFormProps;
