import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { pick } from 'lodash';
import * as React from 'react';

import { IPage, Page, PageToc } from '../..';
import { Provider } from '../..';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const knobs = (): IPage => ({
  srn: text('srn', 'gh/stoplightio/prism/README.md', 'PageToc'),
  version: text('version', '', 'PageToc'),
  className: text('className', 'mr-8 w-1/4 py-12', 'PageToc'),
});

storiesOf('containers/PageToc', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('absolute top-0 bottom-0 right-0 left-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Provider {...providerKnobs()}>
        <div className="flex h-full overflow-hidden">
          <Page {...pick(knobs(), ['srn', 'version'])} className="py-12 w-3/4" scrollInnerContainer />
          <PageToc {...knobs()} />
        </div>
      </Provider>
    </div>
  ));
