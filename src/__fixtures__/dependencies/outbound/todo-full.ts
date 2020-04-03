import { NodeType } from '@stoplight/types';

import { INodeGraph } from '../../../types';

export const graph: INodeGraph = {
  nodes: [
    {
      depth: 1,
      groupNodeId: 10,
      type: 'model' as NodeType,
      name: 'Todo Partial',
      uri: '/reference/todos/models/todo-partial.v1.json',
      version: '1',
      groupSlug: 'master',
      projectName: 'studio-demo',
      srn: 'gh/stoplightio/studio-demo/reference/todos/models/todo-partial.v1.json',
    },
    {
      depth: 1,
      groupNodeId: 11,
      type: 'model' as NodeType,
      name: 'User',
      uri: '/reference/todos/models/user.v1.json',
      version: '1',
      groupSlug: 'master',
      projectName: 'studio-demo',
      srn: 'gh/stoplightio/studio-demo/reference/todos/models/user.v1.json',
    },
  ],
  edges: [
    {
      fromGroupNodeId: 9,
      fromPath: '#/allOf/0',
      toGroupNodeId: 10,
      toPath: '#/',
    },
    {
      fromGroupNodeId: 9,
      fromPath: '#/allOf/1/properties/user',
      toGroupNodeId: 11,
      toPath: '#/',
    },
  ],
};
