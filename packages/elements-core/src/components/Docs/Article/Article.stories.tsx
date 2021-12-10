// @ts-ignore
import basic from '../../../__fixtures__/articles/basic.md';
// @ts-ignore
import kitchenSink from '../../../__fixtures__/articles/kitchen-sink.md';
// @ts-ignore
import multipleTryIts from '../../../__fixtures__/articles/multiple-try-its.md';
import { createStoriesForDocsComponent } from '../story-helper';
import { Article } from './index';

const { meta, createStory } = createStoriesForDocsComponent(Article);
export default meta;

export const Basic = createStory('Basic', { data: basic });

export const KitchenSink = createStory('Kitchen Sink', { data: kitchenSink });

export const MultipleTryIts = createStory('Multiple Try Its', { data: multipleTryIts });
