import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { InlineRefResolverProvider, useDocument, useInlineRefResolver, useResolvedObject } from './InlineRefResolver';

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

      expect(firstReturnedFunction).toBe(secondReturnedFunction);
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
});
