import { Story } from '@storybook/react';

export const createTemplate = (elementName: string): Story => {
  return (args: any) => {
    const element = document.createElement(elementName);
    Object.assign(element, args);
    return element;
  };
};
