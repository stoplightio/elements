import { NodeType } from '@stoplight/types';

import { INodeGraph } from '../../../types';

export const graph: INodeGraph = {
  nodes: [
    {
      depth: 1,
      groupNodeId: 17,
      type: 'http_operation' as NodeType,
      name: 'Get Todo',
      uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/get',
      version: '1',
      groupSlug: 'master',
      projectName: 'studio-demo',
      srn: 'gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/get',
    },
    {
      depth: 1,
      groupNodeId: 18,
      type: 'http_operation' as NodeType,
      name: 'Update Todo',
      uri: '/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put',
      version: '1',
      groupSlug: 'master',
      projectName: 'studio-demo',
      srn: 'gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos~1{todoId}/put',
    },
    {
      depth: 1,
      groupNodeId: 20,
      type: 'http_operation' as NodeType,
      name: 'Create Todo',
      uri: '/reference/todos/openapi.v1.json/paths/~1todos/post',
      version: '1',
      groupSlug: 'master',
      projectName: 'studio-demo',
      srn: 'gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos/post',
    },
    {
      depth: 1,
      groupNodeId: 21,
      type: 'http_operation' as NodeType,
      name: 'List Todos',
      uri: '/reference/todos/openapi.v1.json/paths/~1todos/get',
      version: '1',
      groupSlug: 'master',
      projectName: 'studio-demo',
      srn: 'gh/stoplightio/studio-demo/reference/todos/openapi.v1.json/paths/~1todos/get',
    },
  ],
  edges: [
    {
      fromGroupNodeId: 17,
      fromPath: '#/responses/200/schema',
      toGroupNodeId: 9,
      toPath: '#/',
    },
    {
      fromGroupNodeId: 18,
      fromPath: '#/responses/200/schema',
      toGroupNodeId: 9,
      toPath: '#/',
    },
    {
      fromGroupNodeId: 20,
      fromPath: '#/responses/201/schema',
      toGroupNodeId: 9,
      toPath: '#/',
    },
    {
      fromGroupNodeId: 21,
      fromPath: '#/responses/200/schema/items',
      toGroupNodeId: 9,
      toPath: '#/',
    },
  ],
};
