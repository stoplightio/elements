import { NodeType } from '@stoplight/types';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import model from '../../__fixtures__/schemas/contact.json';
import { Docs, DocsProps } from './Docs';

export default {
  title: 'Internal/Docs',
  component: Docs,
  argTypes: {
    nodeData: {
      control: { type: 'object' },
    },
    nodeType: {
      control: {
        type: 'select',
        options: Object.values(NodeType),
      },
    },
  },
} as Meta<DocsProps>;

export const DocsStory: Story<DocsProps> = args => <Docs {...args} />;
DocsStory.args = {
  nodeType: NodeType.Model,
  nodeData: model,
};
DocsStory.storyName = 'Docs Playground';
