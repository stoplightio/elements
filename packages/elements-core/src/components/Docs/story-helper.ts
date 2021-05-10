import { Meta, Story } from '@storybook/react';
import * as React from 'react';

interface HelperReturn<P> {
  meta: Meta<P>;
  createStory(name: string, input: Partial<P>): Story<P>;
  createHoistedStory(input: Partial<P>): Story<P>;
}

export const createStoriesForDocsComponent = <P>(Component: React.ComponentType<P>): HelperReturn<P> => {
  const createStory = (name: string, input: Partial<P>) => {
    const story: Story<P> = args => React.createElement(Component, args);
    story.args = input;
    story.storyName = name;
    return story;
  };
  return {
    meta: {
      title: `Internal/Docs/${Component.displayName}`,
      component: Component,
      argTypes: {
        data: {
          control: { type: 'object' },
        },
        FallbackComponent: { table: { disable: true } },
        recoverableProps: { table: { disable: true } },
      },
    },
    createStory: createStory,
    createHoistedStory: input => createStory(Component.displayName ?? Component.name ?? '_unknown_', input),
  };
};
