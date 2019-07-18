import { IHttpService } from '@stoplight/types';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const httpService: IHttpService = require('../../__fixtures__/http-service.json');
import { HttpService } from '../../components/HttpService';

storiesOf('components/HttpService', module).add('kitchen sink', () => (
  <div className="p-12">
    <HttpService value={httpService} />
  </div>
));
