// get annoying error about displayName from ui-kit when running this in jest...
// import { processMarkdown } from '@stoplight/markdown-viewer';

import { IRoot } from '@stoplight/markdown';

import { computePageToc } from '../useComputePageToc';

describe('toc', () => {
  describe('computePageToc()', () => {
    it('returns proper page headings', () => {
      // const tree = processMarkdown(fixture);

      expect(computePageToc(fixtureTree)).toEqual([
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

const fixtureTree: IRoot = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'h1',
          position: {
            start: {
              line: 1,
              column: 3,
              offset: 2,
            },
            end: {
              line: 1,
              column: 5,
              offset: 4,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 1,
          column: 5,
          offset: 4,
        },
        indent: [],
      },
      data: {
        hProperties: {
          id: 'h1',
        },
        id: 'h1',
      },
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'text',
          position: {
            start: {
              line: 2,
              column: 1,
              offset: 5,
            },
            end: {
              line: 2,
              column: 5,
              offset: 9,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 2,
          column: 1,
          offset: 5,
        },
        end: {
          line: 2,
          column: 5,
          offset: 9,
        },
        indent: [],
      },
    },
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'h2',
          position: {
            start: {
              line: 3,
              column: 4,
              offset: 13,
            },
            end: {
              line: 3,
              column: 6,
              offset: 15,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 3,
          column: 1,
          offset: 10,
        },
        end: {
          line: 3,
          column: 6,
          offset: 15,
        },
        indent: [],
      },
      data: {
        hProperties: {
          id: 'h2',
        },
        id: 'h2',
      },
    },
    {
      type: 'code',
      lang: 'bash',
      meta: null,
      value: 'code',
      position: {
        start: {
          line: 4,
          column: 1,
          offset: 16,
        },
        end: {
          line: 6,
          column: 4,
          offset: 32,
        },
        indent: [1, 1],
      },
    },
    {
      type: 'heading',
      depth: 3,
      children: [
        {
          type: 'text',
          value: 'h3',
          position: {
            start: {
              line: 7,
              column: 5,
              offset: 37,
            },
            end: {
              line: 7,
              column: 7,
              offset: 39,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 7,
          column: 1,
          offset: 33,
        },
        end: {
          line: 7,
          column: 7,
          offset: 39,
        },
        indent: [],
      },
      data: {
        hProperties: {
          id: 'h3',
        },
        id: 'h3',
      },
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'moar text',
          position: {
            start: {
              line: 8,
              column: 1,
              offset: 40,
            },
            end: {
              line: 8,
              column: 10,
              offset: 49,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 8,
          column: 1,
          offset: 40,
        },
        end: {
          line: 8,
          column: 10,
          offset: 49,
        },
        indent: [],
      },
    },
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'h2 2',
          position: {
            start: {
              line: 9,
              column: 4,
              offset: 53,
            },
            end: {
              line: 9,
              column: 8,
              offset: 57,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 9,
          column: 1,
          offset: 50,
        },
        end: {
          line: 9,
          column: 8,
          offset: 57,
        },
        indent: [],
      },
      data: {
        hProperties: {
          id: 'h2-2',
        },
        id: 'h2-2',
      },
    },
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'h1 2',
          position: {
            start: {
              line: 10,
              column: 3,
              offset: 60,
            },
            end: {
              line: 10,
              column: 7,
              offset: 64,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 10,
          column: 1,
          offset: 58,
        },
        end: {
          line: 10,
          column: 7,
          offset: 64,
        },
        indent: [],
      },
      data: {
        hProperties: {
          id: 'h1-2',
        },
        id: 'h1-2',
      },
    },
    {
      type: 'heading',
      depth: 3,
      children: [
        {
          type: 'text',
          value: 'h3 2',
          position: {
            start: {
              line: 11,
              column: 5,
              offset: 69,
            },
            end: {
              line: 11,
              column: 9,
              offset: 73,
            },
            indent: [],
          },
        },
      ],
      position: {
        start: {
          line: 11,
          column: 1,
          offset: 65,
        },
        end: {
          line: 11,
          column: 9,
          offset: 73,
        },
        indent: [],
      },
      data: {
        hProperties: {
          id: 'h3-2',
        },
        id: 'h3-2',
      },
    },
  ],
};
