import { storiesOf } from '@storybook/react';
import * as React from 'react';

import operation from '../../__fixtures__/operations/put-todos';
import { TryIt } from '../../components/TryIt';

const knobs = () => ({
  value: operation,
});

storiesOf('components/TryIt', module).add('Http Operation', () => (
  <div className="p-12">
    <TryIt value={knobs().value} padding="16" />
  </div>
));
