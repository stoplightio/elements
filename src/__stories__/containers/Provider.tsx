import { text } from '@storybook/addon-knobs/react';

import { IProvider } from '../../containers/Provider';

export const providerKnobs = (): IProvider => ({
  host: text('host', 'https://stoplight.io/api'),
  token: text('token', ''),
});
