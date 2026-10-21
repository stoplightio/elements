import type { Meta } from '@storybook/react-vite';

import { httpService } from '../../../__fixtures__/services/petstore';
import { createStoriesForDocsComponent, docsArgTypes } from '../story-helper';
import { renderExtensionRenderer } from '../story-renderer-helper';
import { HttpService } from './HttpService';

const { createHoistedStory } = createStoriesForDocsComponent(HttpService, 'HttpService');

const meta: Meta<typeof HttpService> = {
  title: 'Internal/Docs/HttpService',
  component: HttpService,
  argTypes: docsArgTypes,
};

export default meta;

export const Story = createHoistedStory({
  data: httpService,
  layoutOptions: { compact: 600 },
  renderExtensionAddon: renderExtensionRenderer,
});
