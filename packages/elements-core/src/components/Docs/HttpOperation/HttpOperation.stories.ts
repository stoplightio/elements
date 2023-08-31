import { httpOperation } from '../../../__fixtures__/operations/put-todos';
import { createStoriesForDocsComponent } from '../story-helper';
import { HttpOperation } from './HttpOperation';

const { meta, createHoistedStory } = createStoriesForDocsComponent(HttpOperation, 'HttpOperation');

export default meta;

export const Story = createHoistedStory({ data: httpOperation, layoutOptions: { compact: 600 } });
