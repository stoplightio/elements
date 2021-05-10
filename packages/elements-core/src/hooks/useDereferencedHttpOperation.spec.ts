import { Dictionary, IHttpOperation, NodeType } from '@stoplight/types';
import { renderHook } from '@testing-library/react-hooks';

import { ParsedNode } from '../types';
import { useDereferencedHttpOperation } from './useDereferencedHttpOperation';

jest.mock('@stoplight/json-schema-ref-parser', () => ({
  __esModule: true,
  default: {
    dereference: (input: Dictionary<unknown>) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if ('__error' in input) {
            reject({
              files: {
                schema: {
                  ...input,
                  __errored: true,
                },
              },
            });
          } else {
            resolve({ ...input, __dereferenced: true });
          }
        }, 100);
      }),
  },
}));

const simpleHttpOperation: IHttpOperation = { method: 'get', path: '/', id: 'abc', responses: [] };
const simpleParsedNode: ParsedNode = { type: NodeType.HttpOperation, data: simpleHttpOperation };

describe('useDereferencedData', () => {
  it('provides the input value before dereferencing happens', () => {
    const input = simpleParsedNode;
    const { result } = renderHook(() => useDereferencedHttpOperation(input));
    expect(result.current?.data).toEqual(input.data);
  });

  it('uses ref parser correctly', async () => {
    const input = simpleParsedNode;
    const { result, waitForNextUpdate } = renderHook(() => useDereferencedHttpOperation(simpleParsedNode));
    await waitForNextUpdate({ timeout: 300 });
    expect(result.current?.data).toEqual({ ...input.data, __dereferenced: true });
  });

  it('handles dereferencing errors', async () => {
    const input: ParsedNode = { type: NodeType.HttpOperation, data: { ...simpleHttpOperation, __error: true } as any };
    const { result, waitForNextUpdate } = renderHook(() => useDereferencedHttpOperation(input));
    await waitForNextUpdate({ timeout: 300 });
    expect(result.current?.data).toEqual({ ...input.data, __errored: true });
  });

  it('is not prone to race conditions', async () => {
    let input: ParsedNode = simpleParsedNode;

    const { result, waitForNextUpdate, rerender } = renderHook(() => useDereferencedHttpOperation(input));

    input = { type: NodeType.Article, data: 'Some **markdown**' };
    rerender();

    expect(result.current).toMatchObject({ type: 'article' });

    // Let's make sure the original dereferencing operation does not override the new input

    await expect(waitForNextUpdate({ timeout: 300 })).rejects.toBeInstanceOf(Error);
  });
});
