import { text } from '@storybook/addon-knobs/react';

import { IProvider } from '../../containers/Provider';

export const providerKnobs = (): IProvider => ({
  host: text('apiUrl', 'https://stoplight.io/api', 'Provider'),
  token: text('apiToken', '', 'Provider'),
});
