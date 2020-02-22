import { array, object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { RequestMakerStore } from '../../../../stores/request-maker';
import { ResponseTab, ResponseViewer } from '../../../../components/RequestMaker';
import { RequestMakerProvider } from '../../../../hooks';
import { response as jsonResponse } from '../__fixtures__/http';

const requestMaker = new RequestMakerStore();

storiesOf('components/RequestMaker/Response/Viewer', module)
  .addDecorator(withKnobs)
  .add('with response', () => {
    const tabs = array('tabs', [ResponseTab.BODY, ResponseTab.HEADERS, ResponseTab.ORIGINAL]);
    const response = object('response', {
      body: jsonResponse,
      statusCode: 200,
      responseTime: 121,
      headers: {
        'x-stuff': 'test',
      },
      originalRequest: {
        method: 'get',
        url: 'https://stoplight.io/api',
        data: {
          foo: 'bar',
        },
        headers: {
          apikey: 123,
        },
        query: {
          srn: 'gh/stoplightio/studio',
        },
      },
    });

    Object.assign(requestMaker.response, response);

    return (
      <RequestMakerProvider value={requestMaker}>
        //@ts-ignore
        <ResponseViewer className="border-t rounded" tabs={tabs} />
      </RequestMakerProvider>
    );
  });
