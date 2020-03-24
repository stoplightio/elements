import { graph as todoFullInboundGraph } from '../../__fixtures__/dependencies/inbound/todo-full';
import { graph as todoFullOutboundGraph } from '../../__fixtures__/dependencies/outbound/todo-full';
import { INodeInfo } from '../../types';
import { computeVisGraph } from '../useComputeVisGraph';

describe('computeVisGraph', () => {
  it('should match snapshot for todo-full inbound graph', async () => {
    expect(
      computeVisGraph(
        { srn: 'gh/stoplightio/studio-demo/reference/models/todo-full.v1.json', id: 1 } as INodeInfo,
        todoFullInboundGraph,
      ),
    ).toMatchSnapshot();
  });
  it('should match snapshot for todo-full outbound graph', async () => {
    expect(
      computeVisGraph(
        { srn: 'gh/stoplightio/studio-demo/reference/models/todo-full.v1.json', id: 1 } as INodeInfo,
        todoFullOutboundGraph,
      ),
    ).toMatchSnapshot();
  });
});
