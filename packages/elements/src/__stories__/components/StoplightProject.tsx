import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { StoplightProject } from '../../containers/StoplightProject';

const darkMode = () => boolean('dark mode', false);
const workspace = () => text('workspace', 'https://elements.stoplight.io');
const project = () => text('project', 'public-apis');
const branch = () => text('branch', '');
const authToken = () => text('authToken', '');

storiesOf('Public/StoplightProject', module)
  .addDecorator(withKnobs())
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <StoplightProject workspace={workspace()} project={project()} branch={branch()} authToken={authToken()} />
      </div>
    );
  });
