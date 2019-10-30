import { IRoot } from '@stoplight/markdown';

import { computeMarkdownHeadings } from '../useComputeMarkdownHeadings';

describe('toc', () => {
  describe('useComputeMarkdownHeadings()', () => {
    it('returns proper page headings', () => {
      expect(computeMarkdownHeadings(fixtureTree)).toEqual([
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
        },
      ],
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
        },
      ],
    },
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'h2',
        },
      ],
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
    },
    {
      type: 'heading',
      depth: 3,
      children: [
        {
          type: 'text',
          value: 'h3',
        },
      ],
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
        },
      ],
    },
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'h2 2',
        },
      ],
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
        },
      ],
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
        },
      ],
      data: {
        hProperties: {
          id: 'h3-2',
        },
        id: 'h3-2',
      },
    },
  ],
};
