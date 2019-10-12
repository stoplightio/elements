import { object, text } from '@storybook/addon-knobs/react';
import * as React from 'react';

import { IProvider } from '../../containers/Provider';

export const providerKnobs = (): IProvider => ({
  host: text('host', 'https://stoplight.io/api', 'Provider'),
  token: text('token', '', 'Provider'),
  icons: object('icons', { group: 'folder-close', item: 'document' }),
  components: object('components', {
    link: ({ node, children }) => {
      return <a href={node.url}>{children}</a>;
    },
  }),
});
