import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { IProvider, Provider } from '../../containers/Provider';

export const providerKnobs = (): IProvider => ({
  host: text('apiUrl', 'https://stoplight.io/api', 'Provider'),
  token: text('apiToken', '', 'Provider'),
});

storiesOf('containers/Provider', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute bottom-0 left-0 px-12 pt-12 right-0 top-0')}>
      <Provider {...providerKnobs()} />
    </div>
  ));
