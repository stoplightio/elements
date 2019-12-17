const nock = require('nock');
const simpleSchema = require('../../__fixtures__/schemas/simple.json');
const todoFullSchema = require('../../__fixtures__/schemas/todo-full.v1.json');
const todoPartialSchema = require('../../__fixtures__/schemas/todo-partial.v1.json');
const userSchema = require('../../__fixtures__/schemas/user.v1.json');

import { IResolveResult } from '@stoplight/json-ref-resolver/types';
import { INodeInfo } from '../../types';
import { createResolver } from '../../utils/createResolver';
import { computeVisGraph } from '../useComputeVisGraph';

beforeEach(() => {
  nock('https://stoplight.io/api')
    .persist()
    .get('/nodes.raw?srn=gh/stoplightio/studio-demo/reference/todos/models/todo-full.v1.json')
    .reply(200, todoFullSchema)
    .get('/nodes.raw?srn=gh/stoplightio/studio-demo/reference/todos/models/todo-partial.v1.json')
    .reply(200, todoPartialSchema)
    .get('/nodes.raw?srn=gh/stoplightio/studio-demo/reference/todos/models/user.v1.json')
    .reply(200, userSchema);
});

afterEach(() => {
  nock.cleanAll();
});

describe('computeVisGraph', () => {
  test('it works with a simple example', async () => {
    const { graph } = await createResolver('https://stoplight.io/api').resolve(simpleSchema);

    expect(computeVisGraph({ srn: '' } as INodeInfo, graph, '')).toMatchSnapshot();
  });

  test('it handles circular references to the root node', async () => {
    const nodeData = {
      root: {
        data: {},
        refMap: {
          '#/property/path': 'http://stoplight.io/nodes.raw?srn=some/other/node',
        },
      },
      'http://stoplight.io/nodes.raw?srn=some/other/node': {
        data: {},
        refMap: {
          '#/property/path': 'http://stoplight.io/nodes.raw?srn=root/node/srn',
        },
      },
      'http://stoplight.io/nodes.raw?srn=root/node/srn': {
        data: {},
        refMap: {
          '#/property/path': 'http://stoplight.io/nodes.raw?srn=some/other/node',
        },
      },
    };

    const graph = {
      getNodeData: (id: string) => nodeData[id],
    } as IResolveResult['graph'];

    expect(computeVisGraph({ srn: 'root/node/srn' } as INodeInfo, graph, 'root')).toEqual({
      nodes: [
        {
          id: 'http://stoplight.io/nodes.raw?srn=some/other/node',
          level: 1,
          label: 'Node',
          color: '#f5f8fa',
          font: {
            color: '#10161a',
          },
        },
        {
          id: 'root',
          level: 0,
          color: '#ef932b',
          font: {
            color: '#ffffff',
          },
        },
      ],
      edges: [
        {
          from: 'http://stoplight.io/nodes.raw?srn=some/other/node',
          to: 'root',
          label: '',
          title: 'path',
          color: '#738694',
          font: {
            align: 'top',
          },
        },
        {
          from: 'root',
          to: 'http://stoplight.io/nodes.raw?srn=some/other/node',
          label: '',
          title: 'path',
          color: '#738694',
          font: {
            align: 'top',
          },
        },
      ],
    });
  });
});
