import { H5PField } from "../../src/types/h5p/H5PField";
import { H5PFieldType } from "../../src/types/h5p/H5PFieldType";
import { H5PForm } from "../../src/types/h5p/H5PForm";

export const params = {
  topicMapItems: [
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "1",
      label: "Label 1",
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      backgroundImage: { path: "", alt: "" },
      dialog: {
        links: ["https://example.com", "https://example.com/2"],
      },
    },
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "2",
      label: "Label 2",
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      backgroundImage: { path: "", alt: "" },
    },
  ],
};

export const semantics: H5PField = {
  label: "Topic map editor",
  name: "topicMap",
  type: H5PFieldType.Group,
  widget: "topicMap",
  importance: "high",
  fields: [
    {
      label: "Topic map items",
      name: "topicMapItems",
      type: H5PFieldType.List,
      entity: "Topic map item",
      field: {
        name: "topicMapItem",
        type: H5PFieldType.Group,
        fields: [
          { name: "id", type: H5PFieldType.Text, widget: "hidden" },
          {
            name: "xPercentagePosition",
            type: H5PFieldType.Number,
            widget: "hidden",
          },
          {
            name: "yPercentagePosition",
            type: H5PFieldType.Number,
            widget: "hidden",
          },
          {
            name: "widthPercentage",
            type: H5PFieldType.Number,
            widget: "hidden",
          },
          {
            name: "heightPercentage",
            type: H5PFieldType.Number,
            widget: "hidden",
          },
          {
            label: "Label",
            description: "The label is shown on top of the background image",
            name: "label",
            type: H5PFieldType.Text,
          },
          {
            label: "Background image",
            name: "backgroundImage",
            type: H5PFieldType.Image,
          },
          {
            label: "Links",
            name: "links",
            description:
              "These links are as auxiliary links for the user in the element's modal window",
            type: H5PFieldType.List,
            field: { label: "Link", name: "link", type: H5PFieldType.Text },
          },
        ],
      },
    },
    {
      label: "Arrows",
      name: "arrows",
      type: H5PFieldType.List,
      entity: "Arrow",
      field: {
        name: "arrow",
        type: H5PFieldType.Group,
        fields: [
          { name: "showStartHead", type: H5PFieldType.Boolean, widget: "none" },
          { name: "showEndHead", type: H5PFieldType.Boolean, widget: "none" },
        ],
      },
    },
  ],
} as H5PField;

export const parent: H5PForm = {
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
      arrowItems: [],
    },
  },
  passReadies: false,
  commonFields: {},
  $form: null,
  $common: null,
  $commonButton: null,
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
  metadataForm: null,
  children: [],
  readies: [],
  ready: (callback: () => void) => callback(),
  parent: null,
  addLanguages: langCode => {},
  removeLanguages: langCode => {},
};
