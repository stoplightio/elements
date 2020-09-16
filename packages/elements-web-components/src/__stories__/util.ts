import { Annotations, BaseStory } from '@storybook/addons';
import { Args as DefaultArgs } from '@storybook/addons/dist/types';
import { StoryFnHtmlReturnType } from '@storybook/web-components/dist/client/preview/types';

export const createTemplate = (
  elementName: string,
): BaseStory<DefaultArgs, StoryFnHtmlReturnType> & Annotations<DefaultArgs, StoryFnHtmlReturnType> => {
  return (args: any) => {
    const element = document.createElement(elementName);
    Object.assign(element, args);
    return element;
  };
};
