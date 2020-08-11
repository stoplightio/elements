import { text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';
import StoryRouter from 'storybook-react-router';

import { API } from '../../containers/API';

const darkMode = () => boolean('dark mode', false);
const specUrl = () =>
  text(
    'specUrl',
    'https://gist.githubusercontent.com/danielflower/5c5ae8a46a0a49aee508690c19b33ada/raw/b06ff4d9764b5800424f6a21a40158c35277ee65/petstore.json',
  );

storiesOf('components/APIComponent', module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs())
  .add('APIComponent', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API specUrl={specUrl()} />
      </div>
    );
  });
