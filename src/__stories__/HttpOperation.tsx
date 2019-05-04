import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as httpOperation from '../__fixtures__/http-operation.json';
import { HttpOperation } from '../HttpOperation';

storiesOf('HttpOperation', module)
  .add('kitchen sink', () => (
    <div className="p-12">
      <HttpOperation value={httpOperation} />
    </div>
  ))
  .add('without a summary', () => (
    <div className="p-12">
      <HttpOperation value={{ ...httpOperation, summary: undefined }} />
    </div>
  ));
