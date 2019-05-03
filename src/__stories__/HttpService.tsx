import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as httpService from '../__fixtures__/http-service.json';
import { HttpService } from '../HttpService';

storiesOf('HttpService', module).add('kitchen sink', () => (
  <div className="p-12">
    <HttpService value={httpService} />
  </div>
));
