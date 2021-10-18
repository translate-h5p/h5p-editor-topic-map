/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import {
  params,
  parent,
  semantics,
} from "../../../.storybook/helpers/h5p.utils";
import { TopicMapItemForm, TopicMapItemFormProps } from "./TopicMapItemForm";

export default {
  title: "Organisms/Topic Map Item Form",
  component: TopicMapItemForm,
} as ComponentMeta<typeof TopicMapItemForm>;

const Template: ComponentStory<typeof TopicMapItemForm> = args => (
  <TopicMapItemForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  itemId: "1",
  params,
  semantics,
  parent,
} as unknown as TopicMapItemFormProps;
