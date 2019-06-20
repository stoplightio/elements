import { select, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Content, IContent } from '../../containers/Content';

export const darkMode = () => boolean('dark mode', false);

export const knobs = (groupId = 'Content'): IContent => ({
  uri: select(
    'uri',
    [
      '/tutorial/reference/todos/openapi.v1.json/paths/~1todos/post/post-virtual',
      '/tutorial/reference/todos/models/todo-full.json',
      '/tutorial/docs/markdown/advanced-syntax.md',
      '/tutorial/reference/todos/openapi.v1.json/http_service',
    ],
    '/tutorial/reference/todos/openapi.v1.json/paths/~1todos/post/post-virtual',
    groupId
  ),
  projectId: number('projectId', 10, { min: 1, max: Infinity, range: false, step: 1 }, groupId),
  semver: text('semver', '', groupId),
  apiUrl: text('apiUrl', 'http://localhost:4060/graphql', groupId),
  apiToken: text(
    'apiToken',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTU0MzE1M30.UEt1ni201lejBXJ2XIizAucMluC8r5Ohot7EWptm1nk',
    groupId
  ),
});

storiesOf('containers/Content', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className={cn('p-12', { 'bp3-dark bg-gray-8': darkMode() })}>
      <Content {...knobs()} />
    </div>
  ));
