import { httpService } from '../../../__fixtures__/services/petstore';
import { createStoriesForDocsComponent } from '../story-helper';
import { HttpService } from './HttpService';

const { meta, createHoistedStory } = createStoriesForDocsComponent(HttpService, 'HttpService');

export default meta;

export const Story = createHoistedStory({ data: httpService, layoutOptions: { compact: 600 } });
