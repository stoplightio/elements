import '../index';

import { StoryFn } from '@storybook/react-webpack5';
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elements-stoplight-project': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Template: StoryFn = (props: any) => <elements-stoplight-project {...props} />;

export default {
  title: 'web-components/StoplightProject',
  argTypes: {
    projectId: { control: 'text' },
    platformUrl: { control: 'text' },
    router: {
      control: { type: 'inline-radio', options: ['history', 'hash', 'memory'] },
      defaultValue: 'history',
    },
  },
};

export const defaultProject = Template.bind({});
defaultProject.storyName = "Stoplight's Demo workspace";
defaultProject.args = {
  projectId: 'cHJqOjYwNjYx',
  platformUrl: 'https://stoplight.io',
};
