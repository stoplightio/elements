import { JSONSchema7 } from 'json-schema';

import model from '../../../__fixtures__/schemas/contact.json';
import { createStoriesForDocsComponent } from '../story-helper';
import { Model } from './Model';

const { meta, createHoistedStory } = createStoriesForDocsComponent(Model);

export default meta;

export const Story = createHoistedStory({ data: model as JSONSchema7, layoutOptions: { compact: 600 } });
