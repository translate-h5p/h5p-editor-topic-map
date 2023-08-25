import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TopicMapItem } from './TopicMapItem';

export default {
  title: 'Molecules/Topic Map Item',
  component: TopicMapItem,
  args: {
    item: {
      id: '1',
      label: 'Label',
      description: '',
      topicImage: {
        path: 'https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80',
        alt: '',
      },
    },
  },
} as ComponentMeta<typeof TopicMapItem>;

const Template: ComponentStory<typeof TopicMapItem> = (args) => (
  <TopicMapItem {...args} />
);

export const NoDescription = Template.bind({});
NoDescription.args = {};

export const WithDescription = Template.bind({});
WithDescription.args = {
  item: {
    id: '1',
    label: 'Label',
    description:
      'Automatically, all of these beautiful, beautiful things will happen. These things happen automatically. All you have to do is just let them happen. A happy cloud. I get carried away with this brush cleaning.',
    topicImage: {
      path: 'https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80',
      alt: '',
    },
  },
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  item: {
    id: '1',
    label: 'Label',
    description:
      'Automatically, all of these beautiful, beautiful things will happen. These things happen automatically. All you have to do is just let them happen. A happy cloud. I get carried away with this brush cleaning.',
  },
};
