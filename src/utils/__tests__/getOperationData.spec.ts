import { IApiKeySecurityScheme, IBasicSecurityScheme } from '@stoplight/types';

import { getOperationData } from '../getOperationData';

describe('getOperationData()', () => {
  it('should add security params to their correct location', () => {
    expect(
      getOperationData({
        security: [
          [{ key: 'basic', type: 'http', scheme: 'basic' } as IBasicSecurityScheme],
          [
            {
              key: 'apikey',
              type: 'apiKey',
              name: 'apikey',
              in: 'query',
              description: "Use `?apikey=123` to authenticate requests. It's super secure.",
            } as IApiKeySecurityScheme,
          ],
        ],
      }),
    ).toEqual({
      method: 'get',
      templatedPath: '',
      body: '',
      contentType: 'none',
      publicBaseUrl: '',
      publicServers: [],
      pathParams: [],
      headerParams: [],
      queryParams: [
        {
          name: 'apikey',
          value: '',
          isEnabled: true,
          schema: {
            type: 'apiKey',
            description: "Use `?apikey=123` to authenticate requests. It's super secure.",
          },
          required: true,
        },
      ],
      auth: { username: '', password: '' },
    });
  });

  it('should handle invalid query parameter', () => {
    expect(
      getOperationData({
        request: {
          query: {
            // @ts-ignore
            foo: null,
          },
        },
      }),
    ).toEqual({
      method: 'get',
      templatedPath: '',
      body: '',
      contentType: 'none',
      publicBaseUrl: '',
      publicServers: [],
      pathParams: [],
      headerParams: [],
      queryParams: [],
    });
  });

  it('should handle invalid header parameter', () => {
    expect(
      getOperationData({
        request: {
          // @ts-ignore
          header: {
            foo: null,
          },
        },
      }),
    ).toEqual({
      method: 'get',
      templatedPath: '',
      body: '',
      contentType: 'none',
      publicBaseUrl: '',
      publicServers: [],
      pathParams: [],
      headerParams: [],
      queryParams: [],
    });
  });
});
