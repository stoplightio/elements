import { object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { TryIt } from '../../components/TryIt';

const knobs = () => ({
  value: object('value', require('../../__fixtures__/operations/put-todos.json')),
});

storiesOf('components/TryIt', module).add('Http Operation', () => (
  <div className="p-12">
    <TryIt value={knobs().value} padding="16" />
  </div>
));
