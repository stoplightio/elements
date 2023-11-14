import type { ErrorBoundaryProps } from '@stoplight/react-error-boundary';
import type { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';

type DocsProps = { data: any } & ErrorBoundaryProps;

type storyOptions = DocsProps & { layoutOptions?: object };

interface HelperReturn<P extends DocsProps> {
  meta: Meta<DocsProps>;
  createStory(name: string, input: storyOptions): StoryFn<P>;
  createHoistedStory(input: storyOptions): StoryFn<P>;
}

export const createStoriesForDocsComponent = (
  Component: React.ComponentType<DocsProps>,
  title?: string,
): HelperReturn<DocsProps> => {
  const createStory = (name: string, input: storyOptions) => {
    const story: StoryFn<DocsProps> = (args: any) => React.createElement(Component, args);
    story.args = input;
    story.storyName = name;
    return story;
  };
  return {
    meta: {
      title: `Internal/Docs/${title || Component.displayName}`,
      component: Component,
      argTypes: <HelperReturn<DocsProps>['meta']['argTypes']>{
        data: {
          control: { type: 'object' },
        },
        FallbackComponent: { table: { disable: true } },
        recoverableProps: { table: { disable: true } },
      },
    },
    createStory: createStory,
    createHoistedStory: input => createStory(title ?? Component.displayName ?? Component.name ?? '_unknown_', input),
  };
};
