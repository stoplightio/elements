import { getOperationData } from '../getOperationData';

describe('getOperationData()', () => {
  it('should add security params to their correct location', () => {
    expect(
      getOperationData({
        security: [
          [{ key: 'basic', type: 'http', scheme: 'basic' }],
          [
            {
              key: 'apikey',
              type: 'apiKey',
              name: 'apikey',
              in: 'query',
              description: "Use `?apikey=123` to authenticate requests. It's super secure.",
            },
          ],
        ],
      }),
    ).toMatchObject({
      queryParams: [
        {
          name: 'apikey',
          value: '',
          isEnabled: true,
          schema: {
            type: 'string',
            description: "Use `?apikey=123` to authenticate requests. It's super secure.",
          },
          required: true,
        },
      ],
      auth: { username: '', password: '' },
    });
  });

  it('should generate sample from schema', () => {
    expect(
      typeof getOperationData({
        request: {
          body: {
            contents: [
              {
                mediaType: 'application/json',
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                  },
                },
              },
            ],
          },
        },
      }).body.id,
    ).toBe('number');
  });

  it('should handle invalid ref', () => {
    expect(
      getOperationData({
        request: {
          body: {
            contents: [
              {
                mediaType: 'application/json',
                schema: {
                  $ref: 'https://nonexistent.external.ref',
                },
              },
            ],
          },
        },
      }),
    ).toMatchObject({
      method: 'get',
      body: '',
    });
  });
});
