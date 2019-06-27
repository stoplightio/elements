import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { IProvider, Provider } from '../../containers/Provider';

export const providerKnobs = (): IProvider => ({
  host: text('apiUrl', 'http://localhost:4500', 'Provider'),
  token: text(
    'apiToken',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MTA3NjU3N30.vt8hZQtaNqu0Y6XIUWRMkfXRNAA-SO_WVJcRMUzX1vI',
    'Provider',
  ),
});

storiesOf('containers/TableOfContents', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute bottom-0 left-0 px-12 pt-12 right-0 top-0')}>
      <Provider {...providerKnobs()} />
    </div>
  ));
