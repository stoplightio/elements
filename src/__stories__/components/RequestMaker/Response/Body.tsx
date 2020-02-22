import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ProblemJsonError } from '@stoplight/prism-http';
import { UNPROCESSABLE_ENTITY } from '@stoplight/prism-http/dist/mocker/errors';
import { RequestMakerStore } from '../../../../stores/request-maker';
import { ResponseStore } from '../../../../stores/request-maker/response';
import { RequestMakerProvider } from '../../../../hooks';
import { ResponseBody } from '../../../../components/RequestMaker';
import { response as jsonResponse } from '../__fixtures__/http';

storiesOf('components/RequestMaker/Response/Body', module)
  .addDecorator(withKnobs)
  .add('with response', () => {
    const requestMaker = new RequestMakerStore();

    requestMaker.response = ResponseStore.fromMockObjectResponse({
      data: jsonResponse,
      headers: {
        'Content-Type': 'application/json',
        'x-stuff': 'test',
      },
      status: 200,
    });
    requestMaker.response.responseTime = 121;

    return (
      <RequestMakerProvider value={requestMaker}>
        <ResponseBody className="border rounded" />
      </RequestMakerProvider>
    );
  })
  .add('with prism error', () => {
    const requestMaker = new RequestMakerStore();

    requestMaker.response = ResponseStore.fromError(
      ProblemJsonError.fromTemplate(
        UNPROCESSABLE_ENTITY,
        'Your request is not valid and no HTTP validation response was found in the spec, so Prism is generating this error for you.',
        {
          validation: [
            {
              location: ['body'],
              severity: 'Error',
              code: 'type',
              message: 'should be object',
            },
            {
              location: ['header'],
              severity: 'Error',
              code: 'required',
              message: "should have required property 'account-id'",
            },
          ],
        },
      ),
    );

    return (
      <RequestMakerProvider value={requestMaker}>
        <ResponseBody className="border rounded" />
      </RequestMakerProvider>
    );
  });
