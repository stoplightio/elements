import { useNodeInfo } from '../useNodeInfo';
import { usePageToc } from '../usePageToc';

jest.mock('../useNodeInfo');

describe('usePageToc()', () => {
  it('returns isLoading properly', () => {
    (useNodeInfo as jest.Mock).mockImplementation(() => ({ isLoading: true }));
    expect(usePageToc('a/b/c')).toEqual(expect.objectContaining({ isLoading: true }));
  });

  it('returns proper page TOC', () => {
    (useNodeInfo as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: { data: fixture },
    }));
    expect(usePageToc('a/b/c')).toEqual({
      isLoading: false,
      headings: [
        {
          depth: 1,
          id: 'h2',
          title: 'h2',
        },
        {
          depth: 2,
          id: 'h3',
          title: 'h3',
        },
        {
          depth: 1,
          id: 'h2-2',
          title: 'h2 2',
        },
        {
          depth: 2,
          id: 'h3-2',
          title: 'h3 2',
        },
      ],
    });
  });
});

const fixture = `
# h1
text
## h2
\`\`\`bash
code
\`\`\`
### h3
moar text
## h2 2
# h1 2
### h3 2`;
