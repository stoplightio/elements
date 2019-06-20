import { IHttpOperation } from '@stoplight/types';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

const httpOperation: IHttpOperation = require('../__fixtures__/http-operation.json');
import { HttpOperation } from '../HttpOperation';

export const darkMode = () => boolean('dark mode', false);

storiesOf('HttpOperation', module)
  .addDecorator(withKnobs)
  .add('kitchen sink', () => (
    <div className={cn('p-12', { 'bp3-dark bg-gray-8': darkMode() })}>
      <HttpOperation value={httpOperation} />
    </div>
  ))
  .add('without a summary', () => (
    <div className={cn('p-12', { 'bp3-dark bg-gray-8': darkMode() })}>
      <HttpOperation value={{ ...httpOperation, summary: undefined }} />
    </div>
  ))
  .add('error boundary', () => (
    <div className={cn('p-12', { 'bp3-dark bg-gray-8': darkMode() })}>
      <HttpOperation value={null} />
    </div>
  ));
