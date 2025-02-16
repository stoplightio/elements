import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import type { ReferenceInfo } from '../utils/ref-resolving/ReferenceResolver';
import {
  InlineRefResolverProvider,
  useDocument,
  useInlineRefResolver,
  useResolvedObject,
  useSchemaInlineRefResolver,
} from './InlineRefResolver';

describe('InlineRefResolver', () => {
  describe('useDocument hook', () => {
    it('does not return document if it is not a proper object', () => {
      const document = 'This is not an object, so should not be returned from useDocument hook';

      const wrapper: React.FC<{ document: unknown }> = ({ children, document }) => (
        <InlineRefResolverProvider document={document}>{children}</InlineRefResolverProvider>
      );
      const { result } = renderHook(() => useDocument(), { wrapper, initialProps: { document } });

      expect(result.current).toBeUndefined();
    });
  });

  describe('useInlineRefResolver hook', () => {
    it('returns the same function on every rerender', () => {
      const document = { some: 'document object' };

      const wrapper: React.FC<{ document: object }> = ({ children, document }) => (
        <InlineRefResolverProvider document={document}>{children}</InlineRefResolverProvider>
      );
      const { result, rerender } = renderHook(() => useInlineRefResolver(), { wrapper, initialProps: { document } });

      const firstReturnedFunction = result.current;

      rerender({ document });

      const secondReturnedFunction = result.current;

      expect(firstReturnedFunction?.resolver).toBe(secondReturnedFunction?.resolver);
    });
  });

  describe('useResolvedObject hook', () => {
    it('returns the same proxy, given the same object', () => {
      const wrapper: React.FC = ({ children }) => <InlineRefResolverProvider>{children}</InlineRefResolverProvider>;
      const objectToResolve = { some: 'object' };
      const { result, rerender } = renderHook(() => useResolvedObject(objectToResolve), { wrapper });

      const firstReturnedObject = result.current;

      rerender();

      const secondReturnedObject = result.current;

      expect(firstReturnedObject).toBe(secondReturnedObject);
    });
  });

  describe('useSchemaInlineRefResolver', () => {
    const wrapper: React.FC<{ document: Record<string, unknown> }> = ({ children, document }) => (
      <InlineRefResolverProvider document={document}>{children}</InlineRefResolverProvider>
    );

    let document: Record<string, unknown>;

    beforeEach(() => {
      document = {
        openapi: '3.0.0',
        paths: {
          '/user': {
            post: {
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            User: {
              type: 'object',
              nullable: true,
              properties: {
                id: {
                  type: 'integer',
                  nullable: true,
                },
                stars: {
                  type: 'number',
                  format: 'int32',
                },
              },
            },
          },
        },
      };
    });

    it('translates resolved schema', () => {
      const { result } = renderHook(() => useSchemaInlineRefResolver(), { wrapper, initialProps: { document } });

      const resolved = result.current[0](
        {
          source: null,
          pointer: '#/components/schemas/User',
        },
        [],
        {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
          },
          $schema: 'http://json-schema.org/draft-07/schema#',
          'x-stoplight': {
            id: 'd3bf5ceb7dd53',
          },
        },
      );

      expect(resolved).toEqual({
        type: ['object', 'null'],
        properties: {
          id: {
            type: ['integer', 'null'],
          },
          stars: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
            minimum: -2147483648,
            'x-stoplight': {
              explicitProperties: ['type', 'format'],
            },
          },
        },
      });
    });

    it('retains the result', () => {
      const refInfo: ReferenceInfo = {
        source: null,
        pointer: '#/components/schemas/User',
      };
      const currentObject = {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/User',
          },
        },
        $schema: 'http://json-schema.org/draft-07/schema#',
        'x-stoplight': {
          id: 'd3bf5ceb7dd53',
        },
      };

      const renderedHook = renderHook(() => useSchemaInlineRefResolver(), { wrapper, initialProps: { document } });
      const renderedHook2 = renderHook(() => useSchemaInlineRefResolver(), { wrapper, initialProps: { document } });

      const resolved = renderedHook.result.current[0]({ ...refInfo }, [], JSON.parse(JSON.stringify(currentObject)));

      expect(renderedHook2.result.current[0]({ ...refInfo }, [], JSON.parse(JSON.stringify(currentObject)))).toBe(
        resolved,
      );
    });
  });
});
