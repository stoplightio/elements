import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { IPage, Page, PageToc } from '../..';
import { Provider } from '../..';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

// @todo: need to mock useRequest, below does not work anymore
export const knobs = (): IPage => ({
  srn: text('srn', 'gh/stoplightio/personal-space/reference/todos/openapi.json/paths/~1todos/get', 'PageToc'),
  version: text('version', '', 'PageToc'),
});

storiesOf('containers/PageToc', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider {...providerKnobs()}>
        <Page {...knobs()} className="py-12" />
        <PageToc {...knobs()} />
      </Provider>
    </div>
  ));
