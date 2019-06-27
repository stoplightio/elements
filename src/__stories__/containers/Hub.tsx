import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Hub, IHub } from '../../containers/Hub';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const knobs = (): IHub => ({
  srn: text('srn', 'sl/stoplightio/personal-space', 'Hub'),
});

storiesOf('components/Hub', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute bottom-0 left-0 right-0 top-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider {...providerKnobs()}>
        <Hub {...knobs()} />
      </Provider>
    </div>
  ));
