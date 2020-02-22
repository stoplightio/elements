import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RequestHeaders } from '../../../../components/RequestMaker';
import { RequestMakerProvider } from '../../../../hooks';
import { RequestMakerStore } from '../../../../stores/request-maker';
import { operation, request } from '../__fixtures__/http';

storiesOf('components/RequestMaker/Request/Headers', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      operation: object('operation', operation),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestHeaders className="border rounded" />
      </RequestMakerProvider>
    );
  })
  .add('with request', () => {
    const store = new RequestMakerStore({
      request: object('request', request),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestHeaders className="border rounded" />
      </RequestMakerProvider>
    );
  });
