import { computePageToc } from '../toc';

describe('toc', () => {
  describe('computePageToc()', () => {
    it('returns proper page TOC', () => {
      expect(computePageToc(fixture)).toEqual([
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
      ]);
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
