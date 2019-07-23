import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { IPage, Page } from '../../containers/Page';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const knobs = (): IPage => ({
  srn: text('srn', 'sl/stoplight/personal-space/reference/todos/openapi.json/paths/~1todos/post', 'Page'),

  version: text('version', '', 'Page'),
});

storiesOf('containers/Page', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider {...providerKnobs()}>
        <Page {...knobs()} className="py-12" />
      </Provider>
    </div>
  ));
