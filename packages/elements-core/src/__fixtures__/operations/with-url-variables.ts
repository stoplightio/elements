import { IHttpOperation } from '@stoplight/types';

export const operationWithUrlVariables: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET-simple',
  method: 'get',
  path: '/todos',
  summary: 'Get 200',
  responses: [
    {
      id: '?http-response-200?',
      code: '200',
      description: 'OK',
    },
  ],
  servers: [
    {
      id: '?http-server?',
      url: '{protocol}://{namespace}.stoplight.io/api/{location}',
      variables: {
        protocol: {
          default: 'ftp',
          enum: ['https', 'http', 'ftp'],
        },
        namespace: {
          default: 'default-namespace',
        },
        location: {
          default: 'eu',
        },
      },
    },
    {
      id: 'PR Environment',
      url: '{protocol}://x-{namespace}.stoplight.io/api/',
      variables: {
        protocol: {
          default: 'ftp',
          enum: ['https', 'http', 'ftp'],
        },
        namespace: {
          default: 'default-namespace',
        },
      },
    },
  ],
};
