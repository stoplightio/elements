import { nodes, tree } from '../__fixtures__/personal-space';
import { computeTree } from '../useComputeTree';

describe('computeTree', () => {
  it('should return the correct tree', () => {
    expect(computeTree(nodes)).toEqual(tree);
  });
});
