const nock = require('nock');
const simpleSchema = require('../../__fixtures__/schemas/simple.json');
const todoFullSchema = require('../../__fixtures__/schemas/todo-full.v1.json');
const todoPartialSchema = require('../../__fixtures__/schemas/todo-partial.v1.json');
const userSchema = require('../../__fixtures__/schemas/user.v1.json');

import { createResolver } from '../../utils/createResolver';
import { computeVisGraph, useComputeVisGraph } from '../useComputeVisGraph';

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

    expect(computeVisGraph('', graph)).toMatchSnapshot();
  });
  test('it handles circular references to the root node', async () => {
    const nodeData = {
      root: {
        data: {},
        refMap: {
          'property/path': 'some/other/node',
        },
      },
      'some/other/node': {
        data: {},
        refMap: {
          'property/path': 'root/node/srn',
        },
      },
      'root/node/srn': {
        data: {},
        refMap: {
          'property/path': 'some/other/node',
        },
      },
    };

    const graph = {
      overallOrder: () => ['root', 'some/other/node', 'root/node/srn'],
      dependantsOf: (name: string) => [name],
      dependenciesOf: (name: string) => [name],
      getNodeData: (id: string) => nodeData[id],
      size: () => 3,
      addNode: () => {},
      removeNode: () => {},
      hasNode: (node: string) => {
        return node ? true : false;
      },
      setNodeData: () => {},
      setNodeDependency: () => {},
      addDependency: () => {},
      removeDependency: () => {},
      clone: () => graph,
    };

    const visGraph = {
      nodes: [
        // whatever we expect the resulting nodes to be
      ],
      edges: [
        // whatever we expect the resulting edges to be
      ],
    };

    expect(computeVisGraph('#/root/node/srn', graph)).toEqual(visGraph);
  });
});
