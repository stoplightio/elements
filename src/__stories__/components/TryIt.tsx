import { withKnobs } from '@storybook/addon-knobs';
import { object, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import operation from '../../__fixtures__/operations/put-todos';
import { TryIt } from '../../components/TryIt';

const knobs = () => ({
  value: object('operation', operation, 'operation'),
  mockUrl: text('hosted mock server base URL', '', 'hosted mock server base URL'),
});

storiesOf('components/TryIt', module)
  .addDecorator(withKnobs)
  .add('Http Operation', () => (
    <div className="p-12">
      <TryIt value={knobs().value} mockUrl={knobs().mockUrl} padding="16" />
    </div>
  ));
