import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { invalidOperation } from '../../../__fixtures__/operations/invalid-response-example';
import { operation, request } from '../../../__fixtures__/operations/simple';
import { RequestEditor, RequestEndpoint } from '../../../components/RequestMaker/Request';
import { ResponseViewer } from '../../../components/RequestMaker/Response';
import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';

storiesOf('components/RequestMaker', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      mockUrl: text('mock URL', ''),
      // @ts-ignore — Unfortunately the types are doomed.
      operation: select('operation', { operation, invalidOperation }, operation),
    });

    return (
      <div className="RequestMaker my-10">
        <RequestMakerProvider value={store}>
          <RequestEndpoint />

          <RequestEditor />

          <ResponseViewer />
        </RequestMakerProvider>
      </div>
    );
  })
  .add('with request', () => {
    const store = new RequestMakerStore({
      request: object('request', request),
    });

    return (
      <div className="RequestMaker my-10">
        <RequestMakerProvider value={store}>
          <RequestEndpoint />

          <RequestEditor />

          <ResponseViewer />
        </RequestMakerProvider>
      </div>
    );
  });
