import '@testing-library/jest-dom';

import { renderHook } from '@testing-library/react-hooks';

import { simpleApiWithInternalOperations } from '../../__fixtures__/api-descriptions/simpleApiWithInternalOperations';
import { useGetOasNavTree } from './useGetOasNavTree';

describe('useGetOasNavTree returns array of endpoints and grouped schema objects', () => {
  it('Returns expected output', () => {
    const testArray = [
      {
        id: '/',
        slug: '/',
        title: 'Overview',
        type: 'overview',
        meta: '',
      },
      {
        title: 'Endpoints',
      },
      {
        title: 'Todos',
        items: [
          {
            id: '/operations/GET_todo',
            slug: '/operations/GET_todo',
            title: 'Get Todo',
            type: 'http_operation',
            meta: 'get',
          },
          {
            id: '/operations/PUT_todos',
            slug: '/operations/PUT_todos',
            title: 'Update Todo',
            type: 'http_operation',
            meta: 'put',
          },
          {
            id: '/operations/DELETE_todo',
            slug: '/operations/DELETE_todo',
            title: 'Delete Todo',
            type: 'http_operation',
            meta: 'delete',
          },
          {
            id: '/operations/POST_todos',
            slug: '/operations/POST_todos',
            title: 'Create Todo',
            type: 'http_operation',
            meta: 'post',
          },
          {
            id: '/operations/GET_todos',
            slug: '/operations/GET_todos',
            title: 'List Todos',
            type: 'http_operation',
            meta: 'get',
          },
        ],
      },
      {
        title: 'Schemas',
        items: [
          {
            id: '/schemas/InternalSchema',
            slug: '/schemas/InternalSchema',
            title: 'Internal Schema',
            type: 'model',
            meta: '',
          },
        ],
      },
    ];
    const { result } = renderHook(() => useGetOasNavTree(simpleApiWithInternalOperations));
    expect(result.current).toStrictEqual(testArray);
  });
});
