import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { StoplightProject } from '../../containers/StoplightProject';

const darkMode = () => boolean('dark mode', false);
const platformUrl = () => text('platformUrl', 'https://stoplight.io');
const workspaceSlug = () => text('workspaceSlug', 'elements');
const projectSlug = () => text('projectSlug', 'public-apis');
const branchSlug = () => text('branchSlug', '');
const authToken = () => text('authToken', '');

storiesOf('Public/StoplightProject', module)
  .addDecorator(withKnobs())
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <StoplightProject
          platformUrl={platformUrl()}
          workspaceSlug={workspaceSlug()}
          projectSlug={projectSlug()}
          branchSlug={branchSlug()}
          authToken={authToken()}
        />
      </div>
    );
  });
