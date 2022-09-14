import type { ErrorBoundaryProps } from '@stoplight/react-error-boundary';
import type { Meta, Story } from '@storybook/react';
import * as React from 'react';

type DocsProps = { data: unknown } & ErrorBoundaryProps;

interface HelperReturn<P extends Partial<DocsProps>> {
  meta: Meta<P>;
  createStory(name: string, input: Partial<P>): Story<P>;
  createHoistedStory(input: Partial<P>): Story<P>;
}

export const createStoriesForDocsComponent = <P extends Partial<DocsProps> = DocsProps>(
  Component: React.ComponentType<P>,
  title?: string,
): HelperReturn<P> => {
  const createStory = (name: string, input: Partial<P>) => {
    const story: Story<P> = args => React.createElement(Component, args);
    story.args = input;
    story.storyName = name;
    return story;
  };
  return {
    meta: {
      title: `Internal/Docs/${title || Component.displayName}`,
      component: Component,
      argTypes: <HelperReturn<P>['meta']['argTypes']>{
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
