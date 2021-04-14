import '../index';

import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elements-stoplight-project': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Template = (props: any) => <elements-stoplight-project {...props} />;

export default {
  title: 'web-components/StoplightProject',
  argTypes: {
    workspaceSlug: { control: 'text' },
    projectSlug: { control: 'text' },
    platformUrl: { control: 'text' },
    router: { control: { type: 'inline-radio', options: ['history', 'hash', 'memory'] }, defaultValue: 'history' },
  },
};

export const defaultProject = Template.bind({});
defaultProject.storyName = "Stoplight's Demo workspace";
defaultProject.args = {
  workspaceSlug: 'demo',
  projectSlug: 'public-apis',
  platformUrl: 'https://stoplight.io',
};
