import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as httpService from '../../__fixtures__/http-service.json';
import { HttpService } from '../../components/HttpService';

storiesOf('components/HttpService', module).add('kitchen sink', () => (
  <div className="p-12">
    <HttpService value={httpService} />
  </div>
));
