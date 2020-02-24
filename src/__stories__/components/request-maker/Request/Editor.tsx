import { array, object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { operation, request } from '../../../../__fixtures__/operations/simple';
import { RequestEditor, RequestEditorProps, RequestEditorTab } from '../../../../components/RequestMaker';
import { RequestMakerProvider } from '../../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../../stores/request-maker';

const requestEditorKnobs = (): RequestEditorProps => ({
  tabs: array('tabs', [RequestEditorTab.BODY, RequestEditorTab.HEADERS]),
});

storiesOf('components/RequestMaker/Request/Editor', module)
  .addDecorator(withKnobs)
  .add('with operation', () => {
    const store = new RequestMakerStore({
      operation: object('operation', operation),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestEditor className="border-t" />
      </RequestMakerProvider>
    );
  })
  .add('with request', () => {
    const store = new RequestMakerStore({
      request: object('request', request),
    });
    return (
      <RequestMakerProvider value={store}>
        <RequestEditor className="border-t" />
      </RequestMakerProvider>
    );
  })
  .add('with selected tabs', () => {
    const store = new RequestMakerStore();
    return (
      <RequestMakerProvider value={store}>
        <RequestEditor className="border-t" {...requestEditorKnobs()} />
      </RequestMakerProvider>
    );
  });
