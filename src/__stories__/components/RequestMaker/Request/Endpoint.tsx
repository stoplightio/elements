import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RequestMakerStore } from '../../../../stores/request-maker';
import { operation, request } from '../__fixtures__/http';
import { RequestMakerProvider } from '../../../../hooks';
import { RequestEndpoint } from '../../../../components/RequestMaker';


storiesOf('components/RequestMaker/Request/Endpoint', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      operation: object('operation', operation),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>
    );
  })
  .add('with request', () => {
    const store = new RequestMakerStore({
      request: object('request', request),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestEndpoint />
      </RequestMakerProvider>
    );
  });
