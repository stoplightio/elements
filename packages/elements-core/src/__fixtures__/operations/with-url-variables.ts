import { IHttpOperation } from '@stoplight/types';

export const operationWithUrlVariables: IHttpOperation = {
  id: '?http-operation-id?',
  iid: 'GET-simple',
  method: 'get',
  path: '/todos',
  summary: 'Get 200',
  responses: [
    {
      code: '200',
      description: 'OK',
    },
  ],
  servers: [
    {
      url: '{protocol}://{namespace}.stoplight.io/api/{location}',
      variables: {
        protocol: {
          default: 'ftp',
        },
        namespace: {
          default: 'default-namespace',
        },
        location: {
          default: 'eu',
        },
      },
    },
  ],
};
