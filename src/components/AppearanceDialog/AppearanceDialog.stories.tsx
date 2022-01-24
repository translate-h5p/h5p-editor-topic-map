/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AppearanceDialog } from "./AppearanceDialog";
import { getBackgroundImageField } from "../../utils/H5P/form.utils";
import {
  params,
  parent,
  semantics,
} from "../../../.storybook/helpers/h5p.utils";

export default {
  title: "Organisms/Appearance dialog",
  component: AppearanceDialog,
  args: {
    isOpen: true,
    setIsOpen: isOpen => console.info({ isOpen }),
    backgroundImageField: getBackgroundImageField(semantics),
    onSave: newParams => console.info({ params: newParams }),
    parent,
    params,
  },
} as ComponentMeta<typeof AppearanceDialog>;

const Template: ComponentStory<typeof AppearanceDialog> = args => (
  <AppearanceDialog {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
