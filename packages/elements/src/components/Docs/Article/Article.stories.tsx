import { Meta, Story } from '@storybook/react';
import * as React from 'react';

// @ts-ignore
import basic from '../../../__fixtures__/articles/basic.md';
// @ts-ignore
import kitchenSink from '../../../__fixtures__/articles/kitchen-sink.md';
import { Provider } from '../../../containers/Provider';
import { Docs, IDocsProps } from '../index';

const providerDecorator = (Story: React.ComponentType) => (
  <Provider host="http://stoplight-local.com:8080" workspace="elements" project="public-apis">
    <Story />
  </Provider>
);

export default {
  title: 'Internal/Docs/Article',
  component: Docs,
  decorators: [providerDecorator],
  argTypes: {
    nodeData: {
      control: { type: 'text' },
    },
    nodeType: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<IDocsProps>;

const Template: Story<Omit<IDocsProps, 'nodeType'>> = args => <Docs nodeType="article" {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  nodeData: basic,
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  nodeData: kitchenSink,
};
