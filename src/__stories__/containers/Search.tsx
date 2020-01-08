import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Provider } from '../../containers/Provider';
import { ISearchContainer, Search } from '../../containers/Search';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const searchKnobs = (): ISearchContainer => ({
  srn: text('srn', 'gh/stoplightio/studio-demo/docs/markdown/stoplight-flavored-markdown.md'),
  group: text('group', undefined),
  isOpen: false,
  onClose: () => console.log('closing time'),
});

storiesOf('containers/Search', module)
  .addDecorator(withKnobs)
  .add('Search', () => (
    <div
      className={cn('px-12 pt-12 absolute bottom-0 left-0 right-0 top-0', { 'bp3-dark bg-gray-8': darkMode() })}
      style={{ width: 400 }}
    >
      <Provider {...providerKnobs()}>
        <Search {...searchKnobs()} />
      </Provider>
    </div>
  ));
