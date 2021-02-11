import { NodeType } from '@stoplight/types';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import model from '../../__fixtures__/schemas/contact.json';
import { Docs, IDocsProps } from './Docs';

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
} as Meta<IDocsProps>;

export const DocsStory: Story<IDocsProps> = args => <Docs {...args} />;
DocsStory.args = {
  nodeData: model,
  nodeType: NodeType.Model,
};
DocsStory.storyName = 'Docs Playground';
