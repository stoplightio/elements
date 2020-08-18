import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { API } from '../../containers/API';

const darkMode = () => boolean('dark mode', false);
const apiDescriptionUrl = () =>
  text('apiDescriptionUrl', 'https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json');

storiesOf('components/APIComponent', module)
  .addDecorator(withKnobs())
  .add('APIComponent', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionUrl={apiDescriptionUrl()} />
      </div>
    );
  });
