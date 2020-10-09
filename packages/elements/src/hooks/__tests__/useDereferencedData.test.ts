import { NodeType } from '@stoplight/types';
import { renderHook } from '@testing-library/react-hooks';

import { useDereferencedData } from '../useDereferencedData';

jest.mock('@stoplight/json-schema-ref-parser', () => ({
  __esModule: true,
  default: {
    dereference: (input: any) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({ ...input, __dereferenced: true });
          console.log('hello');
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
    await waitForNextUpdate({ timeout: 3000 });
    expect(result.current).toEqual({ ...input, __dereferenced: true });
  });
});
