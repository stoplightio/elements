import { OpenAPIObject } from 'openapi3-ts';

import { getToCFromOpenApiDocument } from '../API';

describe('API Table of Contents', () => {
  it('orders endpoints according to specificed tags', () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      tags: [
        {
          name: 'beta',
        },
        {
          name: 'alpha',
        },
      ],
      paths: {
        '/a': {
          get: {
            tags: ['alpha'],
          },
        },
        '/b': {
          get: {
            tags: ['beta'],
          },
        },
      },
    };

    const { tree } = getToCFromOpenApiDocument(apiDocument);

    expect(tree.items).toEqual([
      { type: 'item', title: 'Overview', uri: '/' },
      { type: 'divider', title: 'Endpoints' },
      { type: 'group', title: 'beta', items: [{ type: 'item', title: '/b', uri: '/paths/~1b/get' }] },
      { type: 'group', title: 'alpha', items: [{ type: 'item', title: '/a', uri: '/paths/~1a/get' }] },
    ]);
  });

  it("within the tags it doesn't reorder the endpoints", () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      tags: [
        {
          name: 'beta',
        },
        {
          name: 'alpha',
        },
      ],
      paths: {
        '/a': {
          get: {
            tags: ['alpha'],
          },
        },
        '/c': {
          get: {
            tags: ['beta'],
          },
        },
        '/b': {
          get: {
            tags: ['beta'],
          },
        },
      },
    };

    const { tree } = getToCFromOpenApiDocument(apiDocument);

    expect(tree.items).toEqual([
      { type: 'item', title: 'Overview', uri: '/' },
      { type: 'divider', title: 'Endpoints' },
      {
        type: 'group',
        title: 'beta',
        items: [
          { type: 'item', title: '/c', uri: '/paths/~1c/get' },
          { type: 'item', title: '/b', uri: '/paths/~1b/get' },
        ],
      },
      { type: 'group', title: 'alpha', items: [{ type: 'item', title: '/a', uri: '/paths/~1a/get' }] },
    ]);
  });

  it("within the tags it doesn't reorder the methods", () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      tags: [
        {
          name: 'beta',
        },
        {
          name: 'alpha',
        },
      ],
      paths: {
        '/a': {
          get: {
            tags: ['alpha'],
          },
        },
        '/b': {
          get: {
            tags: ['beta'],
          },
          delete: {
            tags: ['beta'],
          },
        },
      },
    };

    const { tree } = getToCFromOpenApiDocument(apiDocument);

    expect(tree.items).toEqual([
      { type: 'item', title: 'Overview', uri: '/' },
      { type: 'divider', title: 'Endpoints' },
      {
        type: 'group',
        title: 'beta',
        items: [
          { type: 'item', title: '/b', uri: '/paths/~1b/get' },
          { type: 'item', title: '/b', uri: '/paths/~1b/delete' },
        ],
      },
      { type: 'group', title: 'alpha', items: [{ type: 'item', title: '/a', uri: '/paths/~1a/get' }] },
    ]);
  });

  it("doesn't reorder the schemas", () => {
    const apiDocument: OpenAPIObject = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      paths: {},
      components: {
        schemas: {
          'b schema': {
            title: 'B Schema',
          },
          'a schema': {
            title: 'A Schema',
          },
        },
      },
    };

    const { tree } = getToCFromOpenApiDocument(apiDocument);

    expect(tree.items).toEqual([
      { type: 'item', title: 'Overview', uri: '/' },
      { type: 'divider', title: 'Schemas' },
      { type: 'item', title: 'B Schema', uri: '/components/schemas/b schema' },
      { type: 'item', title: 'A Schema', uri: '/components/schemas/a schema' },
    ]);
  });
});
