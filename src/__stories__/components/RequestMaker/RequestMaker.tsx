import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RequestMakerStore } from '../../../stores/request-maker';
import { operation, request } from './__fixtures__/http';
import { RequestMakerProvider } from '../../../hooks';
import { RequestEndpoint, RequestEditor, ResponseViewer } from '../../../components/RequestMaker';


storiesOf('components/RequestMaker', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      mockUrl: text('mock URL', ''),
      operation: object('operation', operation),
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
