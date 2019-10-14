import { IHttpOperation } from '@stoplight/types';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const httpOperation: IHttpOperation = require('../../__fixtures__/operations/put-todos.json');
import { TryIt } from '../../components/TryIt';

storiesOf('components/TryIt', module).add('Http Operation', () => (
  <div className="p-12">
    <TryIt value={httpOperation} />
  </div>
));
