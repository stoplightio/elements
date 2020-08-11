import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import StoryRouter from 'storybook-react-router';

import { StoplightProject } from '../../containers/StoplightProject';

const darkMode = () => boolean('dark mode', false);
const workspace = () => text('workspace', 'http://meta.localhost:8080');
const project = () => text('project', 'studio-demo');

storiesOf('components/StoplightProject', module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs())
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <StoplightProject workspace={workspace()} project={project()} />
      </div>
    );
  });
