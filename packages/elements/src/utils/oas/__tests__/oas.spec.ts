import { mapUriToOperation } from '../index';
import { computeOas2UriMap } from '../oas2';
import { computeOas3UriMap } from '../oas3';

const oas3Header = {
  openapi: '3.0.0',
  info: {
    title: 'test',
    version: '1.0.0',
  },
};

const schema = {
  title: 'User',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
} as const;

describe('computeUriMap', () => {
  it('should compute uris for operation with operationId', () => {
    const uriMap = computeOas3UriMap({
      ...oas3Header,
      paths: {
        '/users/{userId}': {
          get: {
            operationId: 'get-user',
          },
        },
      },
    });

    expect(uriMap).toMatchObject({
      '/operations/get-user': expect.objectContaining({}),
    });
  });

  it('should compute uris for operation without operationId', () => {
    const uriMap = computeOas3UriMap({
      ...oas3Header,
      paths: {
        '/users/{userId}': {
          get: {},
        },
      },
    });

    expect(uriMap).toMatchObject({
      '/paths/users-userId/get': expect.objectContaining({}),
    });
  });

  it('should compute oas2 models', () => {
    const uriMap = computeOas2UriMap({
      swagger: '2.0',
      info: {
        title: 'test',
        version: '1.0.0',
      },
      paths: {},
      definitions: {
        User: schema,
      },
    });

    expect(uriMap).toMatchObject({
      '/schemas/User': expect.objectContaining({}),
    });
  });

  it('should compute oas3 models', () => {
    const uriMap = computeOas3UriMap({
      ...oas3Header,
      paths: {},
      components: {
        schemas: {
          User: schema,
        },
      },
    });

    expect(uriMap).toMatchObject({
      '/schemas/User': expect.objectContaining({}),
    });
  });

  it('translates uriMap to operationMap', () => {
    const uriMap = computeOas3UriMap({
      ...oas3Header,
      paths: {
        '/users': {
          post: {},
        },
        '/users/{userId}': {
          get: {
            operationId: 'get-user',
          },
        },
      },
      components: {
        schemas: {
          User: schema,
        },
      },
    });

    const operationMap = mapUriToOperation(uriMap);

    expect(operationMap).toEqual({
      '/paths/users/post': 'post',
      '/operations/get-user': 'get',
    });
  });
});
