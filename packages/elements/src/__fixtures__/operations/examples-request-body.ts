import { IHttpOperation } from '@stoplight/types';

import requestBody from './request-body';

const examplelessRequestBody = Object.create(requestBody);

examplelessRequestBody.request.body.contents[0].examples = [
  {
    key: 'example-1',
    value: {
      name: 'Andrew',
      age: 19,
      trial: true,
    },
  },
  {
    key: 'named example',
    value: {
      name: 'Jane',
      age: 36,
      trial: false,
    },
  },
  {
    key: 'example-3',
    value: {
      name: 'Max',
      age: 23,
      trial: true,
    },
  },
];

export const examplesRequestBody: IHttpOperation = examplelessRequestBody;

export default examplesRequestBody;
