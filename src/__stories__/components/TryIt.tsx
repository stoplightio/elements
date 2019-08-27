import { IHttpOperation } from '@stoplight/types';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const httpOperation: IHttpOperation = require('../../__fixtures__/http-operation.json');
import { TryIt } from '../../components/TryIt';
import { TryIt as NewTryIt } from '../../components/TryItComponent';

storiesOf('components/TryIt', module)
  .add('TryIt', () => (
    <div className="p-12">
      <TryIt value={httpOperation} />
    </div>
  ))
  .add('RM TryIt', () => (
    <div className="p-12">
      <NewTryIt operation={httpOperation} />
    </div>
  ));
