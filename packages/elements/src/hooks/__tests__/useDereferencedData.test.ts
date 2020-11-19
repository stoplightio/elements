import { Dictionary, NodeType } from '@stoplight/types';
import { renderHook } from '@testing-library/react-hooks';

import { useDereferencedData } from '../useDereferencedData';

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

describe('useDereferencedData', () => {
  it('provides the input value before dereferencing happens', () => {
    const input = { a: 5 };
    const { result } = renderHook(() => useDereferencedData(NodeType.HttpOperation, JSON.stringify(input)));
    expect(result.current).toEqual(input);
  });

  it('uses ref parser correctly', async () => {
    const input = { a: 5 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useDereferencedData(NodeType.HttpOperation, JSON.stringify(input)),
    );
    await waitForNextUpdate({ timeout: 300 });
    expect(result.current).toEqual({ ...input, __dereferenced: true });
  });

  it('handles dereferencing errors', async () => {
    const input = { a: 5, __error: true };
    const { result, waitForNextUpdate } = renderHook(() =>
      useDereferencedData(NodeType.HttpOperation, JSON.stringify(input)),
    );
    await waitForNextUpdate({ timeout: 300 });
    expect(result.current).toEqual({ ...input, __errored: true });
  });

  it('is not prone to race conditions', async () => {
    const input = { a: 5 };
    let type = NodeType.HttpOperation;

    const { result, waitForNextUpdate, rerender } = renderHook(() => useDereferencedData(type, JSON.stringify(input)));

    type = NodeType.Article;
    rerender();

    // Articles should not be dereferenced.
    expect(result.current).toEqual(JSON.stringify(input));

    // Let's make sure the original dereferencing operation does not override the new input

    await expect(waitForNextUpdate({ timeout: 300 })).rejects.toBeInstanceOf(Error);
  });
});
