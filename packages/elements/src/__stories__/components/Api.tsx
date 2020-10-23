import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { size } from 'lodash';
import * as React from 'react';

import { API } from '../../containers/API';

const darkMode = () => boolean('dark mode', false);
const apiDescriptionUrl = () =>
  text(
    'apiDescriptionUrl',
    'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml',
  );

storiesOf('Public/API', module)
  .addDecorator(withKnobs())
  .add('Sidebar Layout', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionUrl={apiDescriptionUrl()} />
        <div style={{ textAlign: 'center', padding: '40px', border: '4px solid green', fontSize: '24px' }}>hello</div>
      </div>
    );
  })
  .add('Stacked Layout', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <API apiDescriptionUrl={apiDescriptionUrl()} layout="stacked" />
      </div>
    );
  });
