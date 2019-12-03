import { object, text } from '@storybook/addon-knobs/react';
import * as React from 'react';

import { IProvider } from '../../containers/Provider';

export const providerKnobs = (): IProvider => ({
  host: text('host', 'https://stoplight.io/api', 'Provider'),
  token: text('token', '', 'Provider'),
  icons: object('icons', {}),
  components: object('components', {
    link: ({ node, children }, key) => {
      return (
        <a key={key} href={node.url}>
          {children}
        </a>
      );
    },
  }),
});
