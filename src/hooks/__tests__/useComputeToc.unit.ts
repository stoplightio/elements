import { contents, nodes } from '../../__fixtures__/project-nodes';
import { computeToc } from '../useComputeToc';

describe('computeToc', () => {
  it('should return the correct table of contents', () => {
    expect(computeToc(nodes)).toEqual(contents);
  });
});
