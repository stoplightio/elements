const nock = require('nock');
const circularSchema = require('../../__fixtures__/schemas/circular').default;
const simpleSchema = require('../../__fixtures__/schemas/simple.json');
const todoFullSchema = require('../../__fixtures__/schemas/todo-full.v1.json');
const todoPartialSchema = require('../../__fixtures__/schemas/todo-partial.v1.json');
const userSchema = require('../../__fixtures__/schemas/user.v1.json');

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

    expect(computeVisGraph(graph)).toMatchSnapshot();
  });
});
