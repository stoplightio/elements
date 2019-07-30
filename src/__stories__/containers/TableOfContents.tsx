import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Provider } from '../../containers/Provider';
import { ITableOfContents, TableOfContents, TableOfContentsSkeleton } from '../../containers/TableOfContents';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const tocKnobs = (): ITableOfContents => ({
  srn: text('srn', 'sl/acxiom/handcrafted-metal-ball', 'TableOfContents'),
});

storiesOf('containers/TableOfContents', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div
      className={cn('px-12 pt-12 absolute bottom-0 left-0 right-0 top-0', { 'bp3-dark bg-gray-8': darkMode() })}
      style={{ width: 400 }}
    >
      <Provider {...providerKnobs()}>
        <TableOfContents {...tocKnobs()} />
      </Provider>
    </div>
  ))
  .add('skeleton', () => (
    <div className={cn('px-12 pt-12 absolute bottom-0 left-0 right-0 top-0', { 'bp3-dark bg-gray-8': darkMode() })}>
      <div className="flex">
        <div style={{ width: 400 }}>
          <Provider {...providerKnobs()}>
            <TableOfContents {...tocKnobs()} />
          </Provider>
        </div>

        <div style={{ width: 400 }}>
          <TableOfContentsSkeleton />
        </div>
      </div>
    </div>
  ));
