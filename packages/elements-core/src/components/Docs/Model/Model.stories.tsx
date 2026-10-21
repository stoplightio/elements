import type { Meta } from '@storybook/react-vite';
import { JSONSchema7 } from 'json-schema';

import model from '../../../__fixtures__/schemas/contact.json';
import { createStoriesForDocsComponent, docsArgTypes } from '../story-helper';
import { renderExtensionRenderer } from '../story-renderer-helper';
import { Model } from './Model';

const { createHoistedStory } = createStoriesForDocsComponent(Model);

const meta: Meta<typeof Model> = {
  title: 'Internal/Docs/Model',
  component: Model,
  argTypes: docsArgTypes,
};

export default meta;

export const Story = createHoistedStory({
  data: model as JSONSchema7,
  renderExtensionAddon: renderExtensionRenderer,
  layoutOptions: { compact: 600 },
});
