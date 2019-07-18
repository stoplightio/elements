import { contents, nodes } from '../../__fixtures__/project-nodes';
import { computeToc } from '../../hooks/useComputeToc';

describe('computeToc', () => {
  it('should return the correct table of contents', () => {
    expect(computeToc(nodes)).toEqual(contents);
  });
});
