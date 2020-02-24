import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { operation, request } from '../../../../__fixtures__/operations/simple';
import { RequestBody } from '../../../../components/RequestMaker';
import { RequestMakerProvider } from '../../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../../stores/request-maker';

storiesOf('components/RequestMaker/Request/Body', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      operation: object('operation', operation),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestBody className="border rounded" />
      </RequestMakerProvider>
    );
  })
  .add('with request', () => {
    const store = new RequestMakerStore({
      request: object('request', request),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestBody className="border rounded" />
      </RequestMakerProvider>
    );
  });
