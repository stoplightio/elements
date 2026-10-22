import { NodeType } from '@stoplight/types';
import { Meta, StoryFn } from '@storybook/react-vite';

import model from '../../__fixtures__/schemas/contact.json';
import { Docs, DocsProps } from './Docs';
import { renderExtensionRenderer } from './story-renderer-helper';

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

export const DocsStory: StoryFn<DocsProps> = args => {
  return <Docs {...args} />;
};
DocsStory.args = {
  nodeType: NodeType.Model,
  nodeData: model,
  renderExtensionAddon: renderExtensionRenderer,
};
DocsStory.storyName = 'Docs Playground';
