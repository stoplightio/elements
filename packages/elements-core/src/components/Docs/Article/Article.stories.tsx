// @ts-ignore
import basic from '../../../__fixtures__/articles/basic.md';
// @ts-ignore
import kitchenSink from '../../../__fixtures__/articles/kitchen-sink.md';
// @ts-ignore
import twoTryIts from '../../../__fixtures__/articles/two-try-its.md';
import { createStoriesForDocsComponent } from '../story-helper';
import { Article } from './index';

const { meta, createStory } = createStoriesForDocsComponent(Article);
export default meta;

export const Basic = createStory('Basic', { data: basic });

export const KitchenSink = createStory('Kitchen Sink', { data: kitchenSink });

export const TwoTryIts = createStory('Two Try Its', { data: twoTryIts });
