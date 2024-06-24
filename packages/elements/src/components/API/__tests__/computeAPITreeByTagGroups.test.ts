import { NodeType } from '@stoplight/types';
import { OpenAPIObject as _OpenAPIObject, PathObject } from 'openapi3-ts';

import { transformOasToServiceNode } from '../../../utils/oas';
import { computeAPITree } from '../computeAPITree';

type OpenAPIObject = Partial<_OpenAPIObject> & {
  webhooks?: PathObject;
};
describe.each([['paths', NodeType.HttpOperation, 'path']] as const)(
  'when grouping from "%s" as %s',
  (pathProp, nodeType, parentKeyProp) => {
    describe('computeAPITreeByTagGroups', () => {
      it('generates API ToC tree', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          [pathProp]: {
            '/something': {
              get: {
                tags: ['Account Closure'],
                responses: {
                  200: {
                    schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                  },
                },
              },
            },
            '/something/process': {
              get: {
                tags: ['Account Processes'],
                responses: {
                  200: {
                    schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                  },
                },
              },
            },
          },
          components: {
            schemas: {
              ImportantSchema: {
                type: 'object',
                properties: {
                  a: { type: 'string' },
                },
              },
            },
          },
        };

        const apiTree = computeAPITree(transformOasToServiceNode(apiDocument)!);
        expect(apiTree).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          {
            title: 'Endpoints',
          },
          {
            title: 'Accounts',
          },
          {
            title: 'Account Closure',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something/get',
                meta: 'get',
                slug: '/paths/something/get',
                title: '/something',
                type: 'http_operation',
              },
            ],
          },
          {
            title: 'Processes',
          },
          {
            title: 'Account Processes',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something-process/get',
                meta: 'get',
                slug: '/paths/something-process/get',
                title: '/something/process',
                type: 'http_operation',
              },
            ],
          },
          {
            title: 'Schemas',
          },
          {
            id: '/schemas/ImportantSchema',
            meta: '',
            slug: '/schemas/ImportantSchema',
            title: 'ImportantSchema',
            type: 'model',
          },
        ]);
      });

      it('allows to customise tag name with x-displayName extension', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          tags: [
            {
              name: 'Account Closure',
              'x-displayName': 'Account Offboarding Processes',
            },
            {
              name: 'Account Processes',
              'x-displayName': 'Account Onboarding Processes',
            },
          ],
          [pathProp]: {
            '/something': {
              get: {
                tags: ['Account Closure'],
                responses: {
                  200: {
                    schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                  },
                },
              },
            },
            '/something/process': {
              get: {
                tags: ['Account Processes'],
                responses: {
                  200: {
                    schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                  },
                },
              },
            },
          },
          components: {
            schemas: {
              ImportantSchema: {
                type: 'object',
                properties: {
                  a: { type: 'string' },
                },
              },
            },
          },
        };

        const apiTree = computeAPITree(transformOasToServiceNode(apiDocument)!);
        expect(apiTree).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          {
            title: 'Endpoints',
          },
          {
            title: 'Accounts',
          },
          {
            title: 'Account Offboarding Processes',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something/get',
                meta: 'get',
                slug: '/paths/something/get',
                title: '/something',
                type: 'http_operation',
              },
            ],
          },
          {
            title: 'Processes',
          },
          {
            title: 'Account Onboarding Processes',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something-process/get',
                meta: 'get',
                slug: '/paths/something-process/get',
                title: '/something/process',
                type: 'http_operation',
              },
            ],
          },
          {
            title: 'Schemas',
          },
          {
            id: '/schemas/ImportantSchema',
            meta: '',
            slug: '/schemas/ImportantSchema',
            title: 'ImportantSchema',
            type: 'model',
          },
        ]);
      });

      it('allows to hide schemas from ToC', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          [pathProp]: {
            '/something': {
              get: {
                tags: ['Account Closure'],
                responses: {
                  200: {
                    schema: { $ref: '#/definitions/schemas/ImportantSchema' },
                  },
                },
              },
            },
          },
          components: {
            schemas: {
              ImportantSchema: {
                type: 'object',
                properties: {
                  a: { type: 'string' },
                },
              },
            },
          },
        };

        expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideSchemas: true })).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          {
            title: 'Endpoints',
          },
          {
            title: 'Accounts',
          },
          {
            title: 'Account Closure',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something/get',
                meta: 'get',
                slug: '/paths/something/get',
                title: '/something',
                type: 'http_operation',
              },
            ],
          },
        ]);
      });

      it('allows to hide internal operations from ToC', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          [pathProp]: {
            '/something': {
              get: {
                tags: ['Account Closure'],
              },
              post: {
                tags: ['Account Closure'],
                'x-internal': true,
              },
            },
          },
        };

        const apiTree = computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true });
        expect(apiTree).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          {
            title: 'Endpoints',
          },
          {
            title: 'Accounts',
          },
          {
            title: 'Account Closure',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something/get',
                slug: '/paths/something/get',
                title: '/something',
                type: 'http_operation',
                meta: 'get',
              },
            ],
          },
        ]);
      });

      it('allows to hide nested internal operations from ToC', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          tags: [
            {
              name: 'Account Processes',
            },
          ],
          [pathProp]: {
            '/something': {
              get: {
                tags: ['Account Processes'],
              },
              post: {
                'x-internal': true,
                tags: ['Account Processes'],
              },
            },
          },
        };

        expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          {
            title: 'Endpoints',
          },
          {
            title: 'Processes',
          },
          {
            title: 'Account Processes',
            itemsType: 'http_operation',
            items: [
              {
                id: '/paths/something/get',
                meta: 'get',
                slug: '/paths/something/get',
                title: '/something',
                type: 'http_operation',
              },
            ],
          },
        ]);
      });

      it('allows to hide internal models from ToC', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          [pathProp]: {},
          components: {
            schemas: {
              SomeInternalSchema: {
                'x-internal': true,
              },
            },
          },
        };

        expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
        ]);
      });

      it('allows to hide nested internal models from ToC', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          tags: [
            {
              name: 'Account Processes',
            },
          ],
          [pathProp]: {},
          components: {
            schemas: {
              a: {
                'x-tags': ['Account Processes'],
              },
              b: {
                'x-tags': ['Account Processes'],
                'x-internal': true,
              },
            },
          },
        };

        expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          { title: 'Schemas' },
          {
            title: 'Processes',
          },
          {
            title: 'Account Processes',
            itemsType: NodeType.Model,
            items: [
              {
                id: '/schemas/a',
                slug: '/schemas/a',
                title: 'a',
                type: 'model',
                meta: '',
              },
            ],
          },
        ]);
      });

      it('excludes groups with no items', () => {
        const apiDocument: OpenAPIObject = {
          openapi: '3.0.0',
          info: {
            title: 'some api',
            version: '1.0.0',
            description: 'some description',
          },
          'x-tagGroups': [
            {
              name: 'Accounts',
              tags: ['Account Closure'],
            },
            {
              name: 'Processes',
              tags: ['Account Processes'],
            },
          ],
          tags: [
            {
              name: 'Account Processes',
            },
          ],
          [pathProp]: {
            '/something': {
              post: {
                'x-internal': true,
                tags: ['Account Processes'],
              },
            },
            '/something-else': {
              post: {
                tags: ['Account Processes'],
              },
            },
          },
          components: {
            schemas: {
              a: {
                'x-tags': ['Account Processes'],
                'x-internal': true,
              },
            },
          },
        };

        expect(computeAPITree(transformOasToServiceNode(apiDocument)!, { hideInternal: true })).toEqual([
          {
            id: '/',
            meta: '',
            slug: '/',
            title: 'Overview',
            type: 'overview',
          },
          {
            title: 'Endpoints',
          },
          {
            title: 'Processes',
          },
          {
            title: 'Account Processes',
            itemsType: nodeType,
            items: [
              {
                id: `/${pathProp}/something-else/post`,
                meta: 'post',
                slug: `/${pathProp}/something-else/post`,
                title: '/something-else',
                type: nodeType,
              },
            ],
          },
        ]);
      });
    });
  },
);
