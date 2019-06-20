import { select, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { ISidebar, Sidebar } from '../../containers/Sidebar';

export const darkMode = () => boolean('dark mode', false);

export const knobs = (groupId = 'SidebarContainer'): ISidebar => ({
  org: text('org', 'analytica', groupId),
  project: text('project', 'fantastic-soft-bike', groupId),
  apiUrl: text('apiUrl', 'http://localhost:4060/graphql', groupId),
  apiToken: text(
    'apiToken',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTU0MzE1M30.UEt1ni201lejBXJ2XIizAucMluC8r5Ohot7EWptm1nk',
    groupId
  ),
});

storiesOf('containers/Sidebar', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('p-12', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Sidebar {...knobs()} />
    </div>
  ));
