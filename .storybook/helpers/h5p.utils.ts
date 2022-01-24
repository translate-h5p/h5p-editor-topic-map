import { ArrowDirection } from "../../src/types/ArrowDirection";
import { ArrowType } from "../../src/types/ArrowType";
import { ColorTheme } from "../../src/types/ColorTheme";
import { H5PField, H5PFieldGroup } from "../../src/types/h5p/H5PField";
import { H5PFieldType } from "../../src/types/h5p/H5PFieldType";
import { H5PForm } from "../../src/types/h5p/H5PForm";
import { Params } from "../../src/types/h5p/Params";

export const params: Required<Params> = {
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
      description: "",
    },
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "2",
      label: "Label 2",
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      backgroundImage: undefined,
      description: "",
    },
  ],
  arrowItems: [
    {
      heightPercentage: 20,
      widthPercentage: 5,
      id: "1",
      xPercentagePosition: 40,
      yPercentagePosition: 30,
      dialog: {
        links: ["https://example.com", "https://example.com/2"],
      },
      arrowDirection: ArrowDirection.Down,
      arrowType: ArrowType.Directional,
    },
  ],
  appearance: {
    backgroundImage: undefined,
    colorTheme: ColorTheme.Blue,
  },
};

export const semantics: H5PFieldGroup = {
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
      importance: "low",
      field: {
        label: "Item",
        name: "topicMapItem",
        importance: "low",
        type: H5PFieldType.Group,
        fields: [
          {
            name: "id",
            label: "Id",
            type: H5PFieldType.Text,
            widget: "none",
          },
          {
            name: "xPercentagePosition",
            label: "X-position as a percentage of the container width",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            name: "yPercentagePosition",
            label: "Y-position as a percentage of the container height",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            name: "widthPercentage",
            label: "Width as a percentage of the container width",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            name: "heightPercentage",
            label: "Height as a percentage of the container height",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            label: "Label",
            description: "The label is shown on top of the background image",
            name: "label",
            type: H5PFieldType.Text,
          },
          {
            label: "Description",
            description:
              "The description is shown on top of the background image, below the label",
            name: "description",
            type: H5PFieldType.Text,
            optional: true,
          },
          {
            label: "Background image",
            name: "backgroundImage",
            type: H5PFieldType.Image,
          },
          {
            label: "Dialog",
            name: "dialog",
            type: H5PFieldType.Group,
            fields: [
              {
                label: "Text",
                name: "text",
                type: H5PFieldType.Text,
                widget: "html",
              },
              {
                label: "Video",
                name: "video",
                type: H5PFieldType.Video,
              },
              {
                label: "Links",
                name: "links",
                description:
                  "These links are as auxiliary links for the user in the element's modal window",
                type: H5PFieldType.List,
                entity: "linkItem",
                field: {
                  label: "Link",
                  name: "link",
                  type: H5PFieldType.Text,
                },
              },
            ],
          },
          {
            label: "Index",
            description:
              "⚠️ Advanced feature: Used for manually setting tab order.",
            name: "label",
            type: H5PFieldType.Number,
            optional: true,
          },
        ],
      },
    },
    {
      label: "Arrows",
      name: "arrows",
      type: H5PFieldType.List,
      entity: "arrowItem",
      field: {
        label: "Arrow",
        name: "arrow",
        type: H5PFieldType.Group,
        fields: [
          {
            name: "id",
            label: "Id",
            type: H5PFieldType.Text,
            widget: "none",
          },
          {
            name: "xPercentagePosition",
            label: "X-position as a percentage of the container width",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            name: "yPercentagePosition",
            label: "Y-position as a percentage of the container height",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            name: "widthPercentage",
            label: "Width as a percentage of the container width",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            name: "heightPercentage",
            label: "Height as a percentage of the container height",
            type: H5PFieldType.Number,
            widget: "none",
          },
          {
            label: "Show start arrow-head",
            name: "showStartHead",
            type: H5PFieldType.Boolean,
            widget: "none",
            default: false,
          },
          {
            label: "Show end arrow-head",
            name: "showEndHead",
            type: H5PFieldType.Boolean,
            widget: "none",
            default: true,
          },
          {
            label: "Dialog",
            name: "dialog",
            type: H5PFieldType.Group,
            fields: [
              {
                label: "Text",
                name: "text",
                type: H5PFieldType.Text,
                widget: "html",
              },
              {
                label: "Video",
                name: "video",
                type: H5PFieldType.Video,
              },
              {
                label: "Links",
                name: "links",
                description:
                  "These links are as auxiliary links for the user in the element's modal window",
                type: H5PFieldType.List,
                entity: "linkItem",
                field: {
                  label: "Link",
                  name: "link",
                  type: H5PFieldType.Text,
                },
              },
            ],
          },
          {
            label: "Index",
            name: "label",
            type: H5PFieldType.Number,
            optional: true,
            widget: "none",
          },
        ],
      },
    },
    {
      label: "Appearance",
      name: "appearance",
      type: H5PFieldType.Group,
      importance: "low",
      widget: "none",
      fields: [
        {
          label: "Background image",
          name: "gridBackgroundImage",
          type: H5PFieldType.Image,
          optional: true,
        },
        {
          label: "Color theme",
          name: "colorTheme",
          type: H5PFieldType.Select,
          default: ColorTheme.Blue,
          options: Object.entries(ColorTheme).map(([label, value]) => ({
            label,
            value,
          })),
        },
      ],
    },
  ],
};

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
          description: "",
        },
        {
          id: "461c2820-da07-43bb-8d14-a798c396fd7a",
          xPercentagePosition: 45,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 45,
          heightPercentage: 83.33333333333331,
          backgroundImage: { path: "" },
          label: "",
          description: "",
        },
        {
          id: "8123ecbf-d416-42a5-8106-47b440de51ec",
          xPercentagePosition: 15,
          yPercentagePosition: 50,
          widthPercentage: 20,
          heightPercentage: 25,
          backgroundImage: { path: "" },
          label: "",
          description: "",
        },
      ],
      arrowItems: [],
      appearance: {
        colorTheme: ColorTheme.Blue,
      },
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
