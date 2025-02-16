import { httpOperation } from '../../../__fixtures__/operations/put-todos';
import { createStoriesForDocsComponent } from '../story-helper';
import { renderExtensionRenderer } from '../story-renderer-helper';
import { HttpOperation } from './HttpOperation';

const { meta, createHoistedStory } = createStoriesForDocsComponent(HttpOperation, 'HttpOperation');

export default meta;

export const Story = createHoistedStory({
  data: httpOperation,
  renderExtensionAddon: renderExtensionRenderer,
  layoutOptions: { compact: 600 },
});
