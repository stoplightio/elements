import { object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RequestMakerStore } from '../../../../stores/request-maker';
import { operation, request } from '../__fixtures__/http';
import { RequestMakerProvider } from '../../../../hooks';
import { RequestParameters } from '../../../../components/RequestMaker';

const getText = () => select('type', ['query', 'path', 'header', 'formData', 'urlEncoded'], 'query');

storiesOf('components/RequestMaker/Request/Parameters', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      operation: object('operation', operation),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestParameters type={getText()} className="border rounded" />
      </RequestMakerProvider>
    );
  })
  .add('with request', () => {
    const store = new RequestMakerStore({
      request: object('request', request),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestParameters type={getText()} className="border rounded" />
      </RequestMakerProvider>
    );
  });
