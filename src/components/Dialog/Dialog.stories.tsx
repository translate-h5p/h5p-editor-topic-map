/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Dialog } from "./Dialog";

const componentMeta: ComponentMeta<typeof Dialog> = {
  title: "Molecules/Dialog",
  component: Dialog,
  args: {
    onOpenChange: console.info,
    title: "Title",
    isOpen: true,
    description:
      "When things happen - enjoy them. They're little gifts. Just let this happen. We just let this flow right out of our minds. This is a fantastic little painting. A tree needs to be your friend if you're going to paint him.",
  },
};

export default componentMeta;

const Template: ComponentStory<typeof Dialog> = args => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {};
