import type { Meta } from '@storybook/react-webpack5';

import { httpOperation } from '../../../__fixtures__/operations/put-todos';
import { createStoriesForDocsComponent, docsArgTypes } from '../story-helper';
import { renderExtensionRenderer } from '../story-renderer-helper';
import { HttpOperation } from './HttpOperation';

const { createHoistedStory } = createStoriesForDocsComponent(HttpOperation, 'HttpOperation');

const meta: Meta<typeof HttpOperation> = {
  title: 'Internal/Docs/HttpOperation',
  component: HttpOperation,
  argTypes: docsArgTypes,
};

export default meta;

export const Story = createHoistedStory({
  data: httpOperation,
  renderExtensionAddon: renderExtensionRenderer,
  layoutOptions: { compact: 600 },
});
