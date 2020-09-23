import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { operation, request } from '../../__fixtures__/operations/simple';
import { RequestMaker } from '../../components/RequestMaker';

storiesOf('components/StoplightProject', module)
  .addDecorator(withKnobs())
  .add('Request Maker', () => {
    return (
      <div>
        <RequestMaker request={request} operation={operation} />
      </div>
    );
  });
