import { OpenAPIObject } from 'openapi3-ts';

import { computeOasNodes } from '../../../utils/oas';
import { computeAPITree } from '../utils';

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

    const oasNodes = computeOasNodes(apiDocument);
    expect(oasNodes && computeAPITree(oasNodes.serviceNode, oasNodes.childNodes)).toEqual([
      {
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
      },
      { title: 'Endpoints' },
      {
        title: 'beta',
        items: [{ id: '/paths/b/get', slug: '/paths/b/get', title: '/b', type: 'http_operation', meta: 'get' }],
      },
      {
        title: 'alpha',
        items: [{ id: '/paths/a/get', slug: '/paths/a/get', title: '/a', type: 'http_operation', meta: 'get' }],
      },
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

    const oasNodes = computeOasNodes(apiDocument);
    expect(oasNodes && computeAPITree(oasNodes.serviceNode, oasNodes.childNodes)).toEqual([
      {
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
      },
      { title: 'Endpoints' },
      {
        title: 'beta',
        items: [
          { id: '/paths/c/get', slug: '/paths/c/get', title: '/c', type: 'http_operation', meta: 'get' },
          { id: '/paths/b/get', slug: '/paths/b/get', title: '/b', type: 'http_operation', meta: 'get' },
        ],
      },
      {
        title: 'alpha',
        items: [{ id: '/paths/a/get', slug: '/paths/a/get', title: '/a', type: 'http_operation', meta: 'get' }],
      },
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

    const oasNodes = computeOasNodes(apiDocument);
    expect(oasNodes && computeAPITree(oasNodes.serviceNode, oasNodes.childNodes)).toEqual([
      {
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
      },
      { title: 'Endpoints' },
      {
        title: 'beta',
        items: [
          { id: '/paths/b/get', slug: '/paths/b/get', title: '/b', type: 'http_operation', meta: 'get' },
          { id: '/paths/b/delete', slug: '/paths/b/delete', title: '/b', type: 'http_operation', meta: 'delete' },
        ],
      },
      {
        title: 'alpha',
        items: [{ id: '/paths/a/get', slug: '/paths/a/get', title: '/a', type: 'http_operation', meta: 'get' }],
      },
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

    const oasNodes = computeOasNodes(apiDocument);
    expect(oasNodes && computeAPITree(oasNodes.serviceNode, oasNodes.childNodes)).toEqual([
      {
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
      },
      { title: 'Schemas' },
      { id: '/schemas/b schema', slug: '/schemas/b schema', title: 'B Schema', type: 'model', meta: '' },
      { id: '/schemas/a schema', slug: '/schemas/a schema', title: 'A Schema', type: 'model', meta: '' },
    ]);
  });

  it('should not throw with incorrect tags value', () => {
    const apiDocument = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
        description: 'some description',
      },
      paths: {},
      tags: {
        $ref: './tags',
      },
    };

    const oasNodes = computeOasNodes(apiDocument);
    expect(oasNodes && computeAPITree(oasNodes.serviceNode, oasNodes.childNodes)).toEqual([
      {
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
      },
    ]);
  });

  it('should not display overview when no info description', () => {
    const apiDocument = {
      openapi: '3.0.0',
      info: {
        title: 'some api',
        version: '1.0.0',
      },
      paths: {
        '/a': {
          get: {},
        },
      },
    };

    const oasNodes = computeOasNodes(apiDocument);
    expect(oasNodes && computeAPITree(oasNodes.serviceNode, oasNodes.childNodes)).toEqual([
      { title: 'Endpoints' },
      { id: '/paths/a/get', slug: '/paths/a/get', title: '/a', type: 'http_operation', meta: 'get' },
    ]);
  });
});
