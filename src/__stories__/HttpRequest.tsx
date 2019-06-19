import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as httpRequest from '../__fixtures__/http-request.json';
import { HttpRequest } from '../components/HttpRequest';

storiesOf('HttpRequest', module).add('kitchen sink', () => (
  <div className="p-12">
    <HttpRequest value={httpRequest} />
  </div>
));
