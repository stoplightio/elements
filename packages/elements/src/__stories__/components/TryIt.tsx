import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { TryItProvider } from '../../containers/TryIt';

const darkMode = () => boolean('dark mode', false);
const workspace = () => text('workspace', 'elements');
const project = () => text('project', 'studio-demo');
const branch = () => text('branch', 'master');
const node = () => text('node', '/reference/todos/openapi.v1.json/paths/~1todos/get');
const authToken = () => text('authToken', '');

storiesOf('Internal/TryIt', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <TryItProvider
          host="https://stoplight.io"
          workspace={workspace()}
          project={project()}
          branch={branch()}
          node={node()}
          authToken={authToken()}
        />
      </div>
    );
  });
